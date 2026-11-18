---
tags: [saa-c03, directory-service, detalhes]
servico: AWS Directory Service
atualizado: 2026-11-08
---

# Directory Service — Detalhes

## 1. Qual escolher — a árvore de decisão

```
A aplicação precisa de AD?
├── Não  →  IAM Identity Center (pessoas) ou Cognito (usuários do app)
└── Sim
    ├── É RDS SQL Server, FSx for Windows, ou precisa de trust/MFA/LDAPS?
    │      →  AWS MANAGED MICROSOFT AD
    ├── Os usuários devem permanecer SÓ on-premises, sem replicar?
    │      →  AD CONNECTOR
    └── Diretório pequeno, simples, barato, sem recursos avançados?
           →  SIMPLE AD
```

## 2. AWS Managed Microsoft AD

É Active Directory de verdade rodando em Windows Server gerenciado pela AWS, em **duas AZs** por padrão.

O que o torna a escolha padrão:
- Suporta **trust** (floresta/domínio) com o AD on-premises — os usuários continuam no AD corporativo, mas os recursos AWS confiam nele
- Suporta **MFA**, **LDAPS**, **extensão de schema**, **cmdlets do PowerShell AD**
- É a **única** opção compatível com **RDS for SQL Server**
- Instâncias EC2 Windows e Linux podem fazer **domain join**
- É fonte de identidade válida para o **IAM Identity Center**

Editções: **Standard** (até ~30.000 objetos) e **Enterprise** (até ~500.000 objetos).

## 3. AD Connector

É **gateway**, não diretório. A definição oficial vale decorar:

> *"AD Connector is a directory gateway with which you can redirect directory requests to your on-premises Microsoft Active Directory **without caching any information in the cloud**."* (o AD Connector é um gateway de diretório com o qual você redireciona requisições de diretório ao seu Microsoft Active Directory on-premises, **sem fazer cache de nenhuma informação na nuvem**)

Nada é replicado para a AWS — a autenticação é **encaminhada** para o AD on-premises:

> *"all of your directory data remains on your domain controllers. Directory Service does not replicate any of your directory data."*

Mecânica: *"AD Connector uses Kerberos for authentication and authorization of AWS applications. LDAP is only used for user and group object lookups (read operations)."* (o AD Connector usa Kerberos para autenticação e autorização das aplicações AWS; o LDAP só é usado para consultar objetos de usuário e grupo (operações de leitura))

**A favor**: nenhuma credencial sai do datacenter; é a opção de menor impacto para quem tem requisito de residência de identidade.

**Contra**: depende da conectividade (DX ou VPN) estar no ar; e *"AD Connector is not compatible with RDS SQL Server."* (o AD Connector não é compatível com o RDS SQL Server)

### Pré-requisitos

| Requisito | Detalhe |
|---|---|
| **Conectividade** | *"The VPC must be connected to your existing network through a virtual private network (VPN) connection or Direct Connect."* |
| **Subnets** | **Duas**, em **AZs diferentes**, do mesmo tipo de rede |
| **Portas** | **TCP/UDP 53** (DNS) · **88** (Kerberos) · **389** (LDAP) |
| **Conta de serviço** | No AD existente, com **"Read users and groups"** (ler usuários e grupos). Join/criação de objetos de computador só para Seamless Domain Join e WorkSpaces |
| **Functional level** | Windows Server 2003 ou superior |
| **Tenancy da VPC** | **Default** |
| Pré-autenticação Kerberos | Habilitada nas contas de usuário |

### 3b. A cadeia AD Connector → IAM Identity Center → permission sets

É a montagem que a prova mais usa para "SSO nas contas AWS usando o AD que já existe". São **três peças**, e cada uma faz uma coisa:

```
AD on-premises          (fonte da verdade: usuários, grupos, senhas)
      ▲
      │ VPN ou Direct Connect · portas 53/88/389
      │
AD Connector            (gateway: encaminha, não guarda)
      ▲
      │ fonte de identidade
      │
IAM Identity Center     (autenticação pass-through + atribuição multi-conta)
      │
      ▼
Permission sets         (grupo do AD ──► acesso nas contas AWS)
```

O texto oficial de cada elo:

| Elo | Citação |
|---|---|
| Identity Center aceita AD self-managed | *"With AWS IAM Identity Center, you can connect a self-managed directory in Active Directory (AD) or a directory in AWS Managed Microsoft AD by using AWS Directory Service."* |
| Como autentica | *"IAM Identity Center uses the connection provided by Directory Service to perform pass-through authentication to the source AD instance."* (o IAM Identity Center usa a conexão fornecida pelo Directory Service para fazer autenticação pass-through contra a instância de AD de origem) |
| A senha não é sincronizada | *"No password information is synchronized to IAM Identity Center, because user authentication takes place directly from the source directory in Active Directory."* (nenhuma informação de senha é sincronizada para o IAM Identity Center, porque a autenticação do usuário acontece diretamente no diretório de origem, no Active Directory) |
| Atribuição por grupo | *"After connecting your corporate directory to IAM Identity Center, you can then grant your AD users or groups access to AWS accounts, applications, or both."* (depois de conectar seu diretório corporativo ao IAM Identity Center, você pode conceder aos usuários ou grupos do AD acesso a contas AWS, a aplicações, ou a ambos) |

**O resultado**: a pessoa entra com o usuário de rede de sempre e recebe **credencial temporária** nas contas que o grupo dela permite. Sem usuário IAM, sem access key, e o desligamento no AD corta o acesso à AWS automaticamente.

> [!warning] "Não armazena nada na nuvem" vale para a SENHA, não para tudo
> O Identity Center **sincroniza metadados** — usuário, grupo e participação — para o identity store dele:
> *"IAM Identity Center uses the connection provided by Directory Service to synchronize user, group, and membership information from your source directory in Active Directory to the IAM Identity Center identity store."* (o IAM Identity Center usa a conexão fornecida pelo Directory Service para sincronizar informações de usuário, grupo e participação do seu diretório de origem no Active Directory para o identity store do Identity Center)
> O que nunca sai do seu domain controller é a **credencial**. A distinção é fina e dá alternativa de prova.

### 3c. Os limites dessa montagem

| Limitação | Texto oficial | Consequência |
|---|---|---|
| **Um domínio só** | *"IAM Identity Center only has access to the users and groups of the single domain to which AD Connector attaches. If you need to support multiple domains or forests, use Directory Service for Microsoft Active Directory."* (o IAM Identity Center só tem acesso aos usuários e grupos do único domínio ao qual o AD Connector se conecta; se você precisa atender vários domínios ou florestas, use o Directory Service for Microsoft Active Directory) | Várias florestas → **Managed Microsoft AD** com trust |
| **Reset de senha** | *"any future user password resets must be done from within AD... users will not be able to reset their passwords from the AWS access portal."* | Se pedirem autoatendimento de senha pelo portal, não serve |
| **Conta de gerenciamento** | *"make sure your AD Connector or directory in AWS Managed Microsoft AD in Directory Service resides within your AWS Organizations management account."* | E na **mesma Região** do Identity Center |
| **Um por vez** | *"You can connect only one AD Connector directory or one directory in AWS Managed Microsoft AD at a time."* (você pode conectar apenas um diretório do AD Connector ou um do AWS Managed Microsoft AD por vez) | — |
| **Relação 1-para-1** | *"AD Connectors and your on-premises Active Directory domains have a 1-to-1 relationship."* (a relação entre AD Connectors e seus domínios de Active Directory on-premises é de um para um) | — |
| **Não compartilha** | *"AD Connector cannot be shared with other AWS accounts."* (o AD Connector não pode ser compartilhado com outras contas AWS) e *"is also not multi-VPC aware"* | Apps como WorkSpaces têm de estar na **mesma VPC** |
| **Trusts transitivos** | *"AD Connector does not support Active Directory transitive trusts."* (o AD Connector não oferece suporte a trusts transitivos do Active Directory) | — |
| **Simple AD não serve** | *"IAM Identity Center does not work with SAMBA4-based Simple AD directories."* (o IAM Identity Center não funciona com diretórios Simple AD, baseados em SAMBA4) | — |

> [!important] A consequência que decorre do "sem cache"
> Como o AD Connector **não guarda cópia**, ele cria uma **dependência dura do link**. Se a VPN ou o Direct Connect cair, não há nada local para consultar e a autenticação **para**.
> Se o enunciado disser que o acesso à AWS precisa continuar funcionando mesmo sem conectividade com o data center, a resposta deixa de ser AD Connector e passa a ser **AWS Managed Microsoft AD** — sozinho, ou com trust para o AD on-premises.

## 4. Simple AD

Compatível com AD, implementado sobre **Samba 4**. Serve para *"a low-scale, low-cost directory"*.

A lista do que **não** suporta é o que a prova cobra: *"multi-factor authentication (MFA), trust relationships, DNS dynamic update, schema extensions, communication over LDAPS, PowerShell AD cmdlets, or FSMO role transfer"*. E também *"not compatible with RDS SQL Server"* (não é compatível com o RDS SQL Server).

Se o enunciado menciona **qualquer** item dessa lista, Simple AD está errado.

## 5. Os serviços que dependem de AD

| Serviço | Dependência |
|---|---|
| **FSx for Windows File Server** | AD para autenticação **SMB** — Managed Microsoft AD ou AD on-premises via trust |
| **RDS for SQL Server** (Windows Auth) | **Managed Microsoft AD** obrigatoriamente |
| **WorkSpaces**, **AppStream** | Diretório |
| **EC2 Windows** em domínio | Domain join |
| **Amazon FSx for NetApp ONTAP** (SMB) | AD |

Essa é a ligação que a prova faz: a questão parece ser sobre **FSx** ou **RDS**, mas a resposta correta inclui o **Directory Service**.

## Links

- [[1 - Seguranca (30%)/Directory Service/1 - O que e|1 - O que e]] · [[1 - Seguranca (30%)/Directory Service/2 - Decorar|2 - Decorar]] · [[1 - Seguranca (30%)/Directory Service/4 - Questoes|4 - Questoes]]
- [[3 - Performance (24%)/FSx/1 - O que e|FSx]] · [[2 - Resiliencia (26%)/RDS/1 - O que e|RDS]] · [[1 - Seguranca (30%)/IAM Identity Center/1 - O que e|IAM Identity Center]] · [[1 - Seguranca (30%)/Cognito/1 - O que e|Cognito]]
