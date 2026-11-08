---
tags: [saa-c03, directory-service, questoes]
servico: AWS Directory Service
atualizado: 2026-11-08
---

# Directory Service — Questões

> [!question]- Q1. Migrar um app que usa **RDS for SQL Server com Windows Authentication**, mantendo o AD on-premises como fonte de verdade.
> **A)** AD Connector
> **B)** Simple AD
> **C)** **AWS Managed Microsoft AD com trust para o AD on-premises** ✅
> **D)** Cognito user pool federado por SAML
>
> **Por que C**: é AD real, suporta trust, e é a única opção compatível com RDS SQL Server.
> **A errada**: *"AD Connector is not compatible with RDS SQL Server."*
> **B errada**: Simple AD também é *"not compatible with RDS SQL Server"* e não suporta trust.
> **D errada**: Cognito é identidade de **usuário final de app**.

> [!question]- Q2. Um compartilhamento **FSx for Windows File Server** precisa autenticar usuários do AD corporativo.
> **A)** Simple AD
> **B)** **AWS Managed Microsoft AD com trust, ou o AD on-premises diretamente** ✅
> **C)** Cognito identity pool
> **D)** IAM Identity Center
>
> **Por que B**: FSx for Windows usa **SMB** e exige Active Directory.
> **A errada**: Simple AD não suporta trust — não alcançaria os usuários corporativos.
> **C e D erradas**: não falam SMB/Kerberos com o file system.

> [!question]- Q3. A empresa quer que nenhum dado de identidade seja replicado para a AWS, mas aplicações AWS devem usar o AD existente.
> **A)** Managed Microsoft AD com trust
> **B)** **AD Connector** ✅
> **C)** Simple AD
> **D)** IAM Identity Center com diretório próprio
>
> **Por que B**: é **proxy** — encaminha a autenticação, sem armazenar usuários na AWS.
> **A errada**: funciona, mas cria um diretório na AWS (com trust), o que o enunciado quer evitar.

> [!question]- Q4. Um diretório pequeno e barato para 200 usuários, só para domain join de instâncias Linux, sem MFA nem LDAPS.
> **A)** Managed Microsoft AD Enterprise
> **B)** **Simple AD** ✅
> **C)** AD Connector
> **D)** Managed Microsoft AD Standard
>
> **Por que B**: é a opção *"low-scale, low-cost"*, e o enunciado dispensa justamente o que ela não suporta.
> **C errada**: AD Connector exige um AD on-premises existente, que o enunciado não menciona.
> **D errada**: atende, mas custa mais do que o necessário.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| AD Connector guarda usuários na AWS | É **proxy**; os usuários ficam on-premises |
| AD Connector serve RDS SQL Server | *"not compatible with RDS SQL Server"* |
| Simple AD é "Managed AD mais barato" | Não suporta MFA, trust, LDAPS, schema extension nem RDS SQL Server |
| Directory Service dá acesso à console AWS | Isso é **IAM Identity Center** (que pode usar o diretório como fonte) |
| Qualquer opção serve para FSx for Windows | Precisa de AD real: Managed Microsoft AD ou o AD on-premises |
| Cognito pode substituir o AD | Cognito é identidade de **usuário final de app** |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
