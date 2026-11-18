---
tags: [saa-c03, directory-service, decorar]
servico: AWS Directory Service
atualizado: 2026-11-08
---

# Directory Service — Decorar

## A tabela de decisão

| | **Managed Microsoft AD** | **AD Connector** | **Simple AD** |
|---|---|---|---|
| Natureza | **AD real** (Windows Server AD) | **Proxy** para o AD on-premises | Compatível com AD (**Samba 4**) |
| Usuários ficam | Na AWS | **On-premises** | Na AWS |
| Trust com AD on-premises | **Sim** | Não se aplica (é proxy) | **Não suporta** |
| MFA | Sim | Sim (via RADIUS) | **Não suporta** |
| LDAPS | Sim | Sim | **Não suporta** |
| Schema extension | Sim | — | **Não suporta** |
| **RDS SQL Server** | **Sim** | **Não compatível** | **Não compatível** |
| Edições | **Standard** (~30.000 objetos) e **Enterprise** (~500.000 objetos) | — | Small e Large |

## Os números das edições

| Edição | Capacidade |
|---|---|
| **Standard** | *"up to 5,000 employees... up to 30,000* directory objects"* (até 5.000 funcionários... até 30.000 objetos de diretório) |
| **Enterprise** | *"up to 500,000* directory objects"* (até 500.000 objetos de diretório) |

Há também uma **Hybrid Edition** (estender um AD self-managed existente).

## A regra de ouro

> **RDS for SQL Server com Windows Authentication → somente AWS Managed Microsoft AD.**

As duas outras opções dizem literalmente *"not compatible with RDS SQL Server"* (não é compatível com o RDS SQL Server).

## A cadeia AD Connector → Identity Center → permission sets

A montagem mais cobrada para "SSO nas contas AWS com o AD que já existe":

```
AD on-premises  ──VPN/DX──►  AD Connector  ──►  IAM Identity Center  ──►  permission sets
 (fonte da verdade)          (gateway, não      (pass-through auth +      (grupo do AD ►
                              guarda nada)       atribuição multi-conta)   acesso nas contas)
```

| Peça | O que faz |
|---|---|
| **AD on-premises** | Guarda usuários, grupos e **senhas** |
| **AD Connector** | **Encaminha** as requisições. *"without caching any information in the cloud"* (sem fazer cache de nenhuma informação na nuvem) |
| **IAM Identity Center** | Autentica **pass-through** no AD e atribui acesso nas contas |
| **Permission set** | Traduz **grupo do AD** em permissão nas contas AWS |

Resultado: login com o usuário de rede, **credencial temporária**, zero usuário IAM, e desligamento no AD corta o acesso à AWS.

### Pré-requisitos do AD Connector

| Item | Valor |
|---|---|
| Conectividade | **VPN ou Direct Connect** |
| Subnets | **2**, em **AZs diferentes** |
| Portas | **53** DNS · **88** Kerberos · **389** LDAP |
| Conta de serviço | permissão de **ler usuários e grupos** |
| Onde fica | conta de **gerenciamento** da Organization, **mesma Região** do Identity Center |

### O que quebra essa montagem

| Se o enunciado disser | Resposta muda para |
|---|---|
| **Vários domínios ou florestas** | **Managed Microsoft AD** (*"If you need to support multiple domains or forests, use Directory Service for Microsoft Active Directory."* (se você precisa atender vários domínios ou florestas, use o Directory Service for Microsoft Active Directory)) |
| **Reset de senha pelo portal da AWS** | Não dá com AD Connector — reset só **dentro do AD** |
| **Login precisa funcionar com o link caído** | **Managed Microsoft AD** (AD Connector não tem cache) |
| **RDS SQL Server com Windows Auth** | **Managed Microsoft AD** |
| Diretório **Simple AD** | *"IAM Identity Center does not work with SAMBA4-based Simple AD directories."* (o IAM Identity Center não funciona com diretórios Simple AD, baseados em SAMBA4) |

> [!warning] "Sem cache na nuvem" vale para a SENHA
> O Identity Center **sincroniza metadados** (usuário, grupo, participação) para o **identity store** dele. O que nunca sai do domain controller é a **credencial**.

## Directory Service × Identity Center × Cognito

| Objetivo | Serviço |
|---|---|
| Aplicação precisa falar **LDAP/Kerberos** com um AD | **Directory Service** |
| **Funcionários** acessando contas AWS com SSO | **IAM Identity Center** (que pode usar o Directory Service como fonte) |
| **Usuários finais** do seu app | **Cognito** |

A única menção a Identity Center na página do Directory Service está sob **AWS Managed Microsoft AD**: *"With AWS IAM Identity Center, you can also obtain short-term credentials for use with the AWS SDK and CLI, and use preconfigured SAML integrations to sign in to many cloud applications."* (com o IAM Identity Center você também obtém credenciais de curta duração para usar com o SDK e a CLI da AWS, e usa integrações SAML pré-configuradas para entrar em muitas aplicações de nuvem)

## Links

- [[1 - Seguranca (30%)/Directory Service/1 - O que e|1 - O que e]] · [[1 - Seguranca (30%)/Directory Service/3 - Detalhes|3 - Detalhes]] · [[1 - Seguranca (30%)/Directory Service/4 - Questoes|4 - Questoes]]
