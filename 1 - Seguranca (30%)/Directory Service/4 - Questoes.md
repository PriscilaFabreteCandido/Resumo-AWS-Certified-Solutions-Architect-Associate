---
tags: [saa-c03, directory-service, questoes]
servico: AWS Directory Service
atualizado: 2026-11-08
---

# Directory Service — Questões

> [!question] Q1. Migrar um app que usa **RDS for SQL Server com Windows Authentication**, mantendo o AD on-premises como fonte de verdade.
> **A)** AD Connector
> **B)** Simple AD
> **C)** AWS Managed Microsoft AD com trust para o AD on-premises
> **D)** Cognito user pool federado por SAML
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: é AD real, suporta trust, e é a única opção compatível com RDS SQL Server.
> > **A errada**: *"AD Connector is not compatible with RDS SQL Server."* (o AD Connector não é compatível com o RDS SQL Server)
> > **B errada**: Simple AD também é *"not compatible with RDS SQL Server"* (não é compatível com o RDS SQL Server) e não suporta trust.
> > **D errada**: Cognito é identidade de **usuário final de app**.

> [!question] Q2. Um compartilhamento **FSx for Windows File Server** precisa autenticar usuários do AD corporativo.
> **A)** Simple AD
> **B)** AWS Managed Microsoft AD com trust, ou o AD on-premises diretamente
> **C)** Cognito identity pool
> **D)** IAM Identity Center
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: FSx for Windows usa **SMB** e exige Active Directory.
> > **A errada**: Simple AD não suporta trust — não alcançaria os usuários corporativos.
> > **C e D erradas**: não falam SMB/Kerberos com o file system.

> [!question] Q3. A empresa quer que nenhum dado de identidade seja replicado para a AWS, mas aplicações AWS devem usar o AD existente.
> **A)** Managed Microsoft AD com trust
> **B)** AD Connector
> **C)** Simple AD
> **D)** IAM Identity Center com diretório próprio
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é **proxy** — encaminha a autenticação, sem armazenar usuários na AWS.
> > **A errada**: funciona, mas cria um diretório na AWS (com trust), o que o enunciado quer evitar.

> [!question] Q4. Um diretório pequeno e barato para 200 usuários, só para domain join de instâncias Linux, sem MFA nem LDAPS.
> **A)** Managed Microsoft AD Enterprise
> **B)** Simple AD
> **C)** AD Connector
> **D)** Managed Microsoft AD Standard
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é a opção *"low-scale, low-cost"* (de pequena escala e baixo custo), e o enunciado dispensa justamente o que ela não suporta.
> > **C errada**: AD Connector exige um AD on-premises existente, que o enunciado não menciona.
> > **D errada**: atende, mas custa mais do que o necessário.

> [!question] Q5. A empresa tem AD on-premises e 20 contas AWS. Quer que os funcionários façam login no console com a identidade de rede, sem replicar usuários para a AWS.
> **A)** Criar IAM users em cada conta e sincronizar senhas com o AD
> **B)** AD Connector ligando a AWS ao AD on-premises, integrado ao IAM Identity Center, com permission sets atribuídos por grupo do AD
> **C)** Simple AD como fonte de identidade do Identity Center
> **D)** AWS Managed Microsoft AD replicando os usuários do AD on-premises
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é a cadeia padrão. O AD Connector é *"a directory gateway... without caching any information in the cloud"* (um gateway de diretório... sem fazer cache de nenhuma informação na nuvem), o Identity Center faz *"pass-through authentication to the source AD instance"* (autenticação pass-through contra a instância de AD de origem), e os permission sets atribuem acesso por grupo.
> > **C errada**: *"IAM Identity Center does not work with SAMBA4-based Simple AD directories."* (o IAM Identity Center não funciona com diretórios Simple AD, baseados em SAMBA4)
> > **D errada**: atende, mas **replica** identidade para a AWS — o enunciado proibiu.

> [!question] Q6. Com AD Connector + Identity Center, o que fica armazenado na AWS?
> **A)** Nada — o AD Connector não guarda informação na nuvem
> **B)** Metadados de usuário, grupo e participação no identity store do Identity Center; a senha, não
> **C)** Uma réplica completa do AD, incluindo hashes de senha
> **D)** Só o nome de usuário
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: são duas afirmações diferentes e as duas são oficiais. O **AD Connector** não faz cache — *"without caching any information in the cloud"* (sem fazer cache de nenhuma informação na nuvem). Mas o **Identity Center** sincroniza metadados: *"synchronize user, group, and membership information from your source directory in Active Directory to the IAM Identity Center identity store."* (sincronizar informações de usuário, grupo e participação do seu diretório de origem no Active Directory para o identity store do IAM Identity Center) A credencial é que nunca sai: *"No password information is synchronized to IAM Identity Center."* (nenhuma informação de senha é sincronizada para o IAM Identity Center)
> > **A errada**: é a leitura apressada da frase do AD Connector — vale para ele, não para o conjunto.

> [!question] Q7. A empresa tem **três florestas** de Active Directory e quer SSO nas contas AWS.
> **A)** Um AD Connector para cada floresta, todos no Identity Center
> **B)** AWS Managed Microsoft AD com trust para as florestas
> **C)** AD Connector apontando para a floresta raiz
> **D)** Simple AD consolidando as três
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: a doc é literal — *"If you need to support multiple domains or forests, use Directory Service for Microsoft Active Directory."* (se você precisa atender vários domínios ou florestas, use o Directory Service for Microsoft Active Directory)
> > **A errada**: *"You can connect only one AD Connector directory or one directory in AWS Managed Microsoft AD at a time."* (você pode conectar apenas um diretório do AD Connector ou um do AWS Managed Microsoft AD por vez) E a relação é 1-para-1 com **um domínio**.
> > **C errada**: *"AD Connector does not support Active Directory transitive trusts."* (o AD Connector não oferece suporte a trusts transitivos do Active Directory)

> [!question] Q8. O requisito diz: *"o login nas contas AWS deve continuar funcionando mesmo se o enlace com o data center cair"*.
> **A)** AD Connector com duas VPNs redundantes
> **B)** AWS Managed Microsoft AD
> **C)** AD Connector com cache habilitado
> **D)** Simple AD
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o AD Connector **encaminha** tudo e não guarda cópia, então sem link não há autenticação. O Managed Microsoft AD é um AD **de verdade rodando na AWS** e sobrevive sozinho.
> > **C errada**: **não existe** cache no AD Connector — a definição é *"without caching any information in the cloud"* (sem fazer cache de nenhuma informação na nuvem).
> > **A errada**: reduz a chance de queda, mas não remove a dependência.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| AD Connector guarda usuários na AWS | É **proxy**; os usuários ficam on-premises |
| AD Connector serve RDS SQL Server | *"not compatible with RDS SQL Server"* (não é compatível com o RDS SQL Server) |
| Simple AD é "Managed AD mais barato" | Não suporta MFA, trust, LDAPS, schema extension nem RDS SQL Server |
| Directory Service dá acesso à console AWS | Isso é **IAM Identity Center** (que pode usar o diretório como fonte) |
| Qualquer opção serve para FSx for Windows | Precisa de AD real: Managed Microsoft AD ou o AD on-premises |
| Cognito pode substituir o AD | Cognito é identidade de **usuário final de app** |
| AD Connector não serve para SSO multi-conta | Serve **como fonte de identidade do Identity Center** — é a montagem padrão. O que ele não faz sozinho é atribuir acesso |
| Com AD Connector nada é guardado na AWS | A **senha** não. O Identity Center sincroniza **metadados** de usuário e grupo |
| AD Connector atende várias florestas | **1-para-1 com um domínio**; várias florestas → **Managed Microsoft AD** |
| Dá para resetar a senha pelo portal da AWS | Com AD Connector o reset é **só dentro do AD** |
| AD Connector funciona com o link caído | **Não tem cache** — sem conectividade, não autentica |

## Links

- [[1 - Seguranca (30%)/Directory Service/1 - O que e|1 - O que e]] · [[1 - Seguranca (30%)/Directory Service/2 - Decorar|2 - Decorar]] · [[1 - Seguranca (30%)/Directory Service/3 - Detalhes|3 - Detalhes]]
