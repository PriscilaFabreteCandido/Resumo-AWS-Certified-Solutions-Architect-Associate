---
tags: [saa-c03, dominio-1, cognito, directory-service, identity-center]
dominio: 1
tasks: [1.1, 1.2]
atualizado: 2026-11-08
---

# Identidade de aplicação — Cognito, Directory Service e Identity Center

## 🧩 Em 30 segundos

Três públicos diferentes, três serviços diferentes:

| Quem precisa de acesso | Serviço |
|---|---|
| **Usuário final** do seu app web/mobile | **Cognito** |
| **Funcionário** entrando na console/CLI de várias contas | **IAM Identity Center** (SSO) |
| **Aplicações AWS** que precisam falar com o **Active Directory** existente | **AWS Directory Service** |

E dentro do Cognito: **user pool autentica** (*"Who is this user?"*), **identity pool autoriza na AWS** (*"What AWS resources may this user reach?"*).

## 🧠 Teste-se primeiro

> [!question]- User pool × identity pool, em uma frase cada
> **User pool**: *"a user directory that draws from the OpenID Connect (OIDC) standard to authenticate users and issue JSON web tokens (JWTs) to your app or API."* É diretório + servidor de autenticação.
> **Identity pool**: *"exchanges a trusted token... for temporary, limited-privilege AWS credentials so that your app can call services like Amazon S3 and Amazon DynamoDB."* Também emite credencial para **guest** não autenticado.
>
> Eles são **independentes**: user pool não exige identity pool e vice-versa. O padrão combinado é: autentica no user pool → troca o token no identity pool → recebe credencial AWS.

> [!question]- Um app mobile precisa que cada usuário leia **só a sua pasta** num bucket S3. Qual peça faz isso?
> **Identity pool**, com **role-based ou attribute-based access control**. A role assumida recebe uma policy que usa variáveis da identidade para restringir o prefixo.
> User pool sozinho **não** dá acesso ao S3 — ele só emite JWT.

> [!question]- As três opções do Directory Service, e para que serve cada uma
> **AWS Managed Microsoft AD**: AD de verdade (Windows Server AD) gerenciado pela AWS. Edições **Standard** (até ~30.000 objetos) e **Enterprise** (até ~500.000). Suporta trust com AD on-premises.
> **AD Connector**: *"a proxy service"* para apps AWS usarem o **AD on-premises existente** — não armazena usuários na AWS. ⚠️ *"not compatible with RDS SQL Server"*.
> **Simple AD**: compatível com AD, baseado em **Samba 4**, para diretório *"low-scale, low-cost"*. ⚠️ **Não** suporta MFA, trust, schema extension, LDAPS, cmdlets do PowerShell AD nem transferência de FSMO.

## Cognito — o que mais cai

| Item | Detalhe |
|---|---|
| User pool emite | **JWT** (ID token, access token, refresh token) para app, servidor web ou API |
| Integra com | API Gateway (Cognito authorizer), ALB (autenticação OIDC), AppSync |
| Social / corporativo | Login com Google, Facebook, Apple, SAML, OIDC — federado no **user pool** |
| Identity pool: guest | *"can also issue limited-privilege credentials to guest users who haven't signed in"* |
| WAF | Web ACL pode ser associada a um **Cognito user pool** (está na lista de recursos suportados) |

> [!tip] O gatilho de prova
> "Usuários **finais** do aplicativo" → Cognito.
> "**Funcionários** acessando a AWS" → IAM Identity Center.
> "Aplicação que **já depende de Active Directory**" (RDS SQL Server com Windows Auth, FSx for Windows, WorkSpaces) → **Directory Service**.

## FSx, RDS e AD — a conexão que a prova faz

- **FSx for Windows File Server** precisa de **Active Directory** para autenticação SMB → AWS Managed Microsoft AD ou AD on-premises (via trust).
- **RDS for SQL Server** com Windows Authentication precisa de **AWS Managed Microsoft AD** (AD Connector **não** serve — está escrito na doc).

## ❓ Questões de prova

> [!example]- Q1 — Um app mobile precisa que usuários autenticados com conta Google gravem fotos em um prefixo próprio no S3. Qual desenho?
> **A)** IAM user por usuário, com access key no app
> **B)** **Cognito user pool federado com o Google + identity pool trocando o token por credencial AWS temporária com role restrita por prefixo** ✅
> **C)** API Gateway com API key por usuário
> **D)** Bucket público com nomes de pasta aleatórios
>
> **Por que B**: user pool autentica (incluindo federação social), identity pool entrega a credencial AWS. É o padrão documentado.
> **A errada**: IAM user não escala para usuário final e coloca credencial de longo prazo no dispositivo.
> **C errada**: API key é controle de **uso** (usage plan), não identidade — e não dá acesso ao S3.
> **D errada**: segurança por obscuridade. Não é controle de acesso.

> [!example]- Q2 — A empresa precisa migrar um app que usa **RDS for SQL Server com Windows Authentication** e manter o AD on-premises como fonte de verdade. Qual opção do Directory Service?
> **A)** AD Connector
> **B)** Simple AD
> **C)** **AWS Managed Microsoft AD com relação de confiança (trust) para o AD on-premises** ✅
> **D)** Cognito user pool federado por SAML
>
> **Por que C**: Managed Microsoft AD é AD real, suporta trust, e é o que o RDS SQL Server exige.
> **A errada**: a doc diz explicitamente *"AD Connector is not compatible with RDS SQL Server"*.
> **B errada**: Simple AD também é *"not compatible with RDS SQL Server"*, e não suporta trust.
> **D errada**: Cognito é identidade de **usuário final de app**, não autenticação Windows de banco.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| User pool dá acesso ao S3 | Dá **JWT**. Credencial AWS vem do **identity pool** |
| Identity pool precisa de user pool | São **independentes**. Identity pool aceita token de qualquer provedor confiável e até emite para guest |
| AD Connector guarda os usuários na AWS | É **proxy**; os usuários ficam no AD on-premises |
| AD Connector serve RDS SQL Server | **Não serve** |
| Simple AD é "Managed AD mais barato" | Não suporta MFA, trust, LDAPS, schema extension nem RDS SQL Server |
| IAM Identity Center é para usuários do app | É para **pessoas da organização** acessarem contas AWS |
| Cognito substitui o IAM | Cognito autentica pessoa de fora; o IAM continua autorizando o que a credencial temporária pode fazer |

## Links

- [[01 - Dominio 1 - Design Secure Architectures (30%)]]
- [[IAM, STS e Organizations]]
- [O que é o Amazon Cognito](https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html)
- [AWS Directory Service](https://docs.aws.amazon.com/directoryservice/latest/admin-guide/what_is.html)
