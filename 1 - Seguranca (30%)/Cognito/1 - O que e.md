---
tags: [saa-c03, cognito, identidade]
servico: Amazon Cognito
tipo: Identidade de usuário final
dominios: [1, 2]
atualizado: 2026-11-08
---

# Amazon Cognito — O que é

> [!info] Em uma frase
> Identidade para **usuários finais** do seu app web ou mobile. Tem duas peças independentes: **user pool** (autentica e emite JWT) e **identity pool** (troca token por **credencial AWS temporária**).

## Definição oficial

> *"Amazon Cognito is an identity platform for web and mobile apps. It's a user directory, an authentication server, and an authorization service for OAuth 2.0 access tokens and AWS credentials."*

## As duas peças — e a pergunta que cada uma responde

| Peça | Pergunta | O que entrega |
|---|---|---|
| **User pool** | *"Who is this user?"* | **JWT** (ID, access e refresh token) |
| **Identity pool** | *"What AWS resources may this user reach?"* | **Credencial AWS temporária** |

**User pool** — *"a user directory that draws from the OpenID Connect (OIDC) standard to authenticate users and issue JSON web tokens (JWTs) to your app or API."*

**Identity pool** — *"exchanges a trusted token... for temporary, limited-privilege AWS credentials so that your app can call services like Amazon S3 and Amazon DynamoDB."* E também: *"can issue limited-privilege credentials to guest users who haven't signed in."*

> [!important] São independentes
> User pool não exige identity pool, e vice-versa. O padrão combinado é: autentica no user pool → troca o JWT no identity pool → recebe credencial AWS.

## A pegadinha central

**User pool sozinho NÃO dá acesso ao S3.** Ele emite JWT. Quem entrega credencial AWS é o **identity pool**.

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[IAM]] · [[STS]] · [[IAM Identity Center]] · [[API Gateway]]
- [O que é o Amazon Cognito](https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html)
