---
tags: [saa-c03, cognito, decorar]
servico: Amazon Cognito
atualizado: 2026-11-08
---

# Cognito — Decorar

## User pool × identity pool

| | **User pool** | **Identity pool** |
|---|---|---|
| Função | **Autenticação** | **Autorização na AWS** |
| Pergunta | *"Who is this user?"* | *"What AWS resources may this user reach?"* |
| Entrega | **JWT** (OIDC) | **Credencial AWS temporária** (via STS) |
| Guest / não autenticado | Não | **Sim** |
| Federação social/SAML | Sim (Google, Facebook, Apple, SAML, OIDC) | Aceita token de provedor confiável |
| Controle de acesso | Grupos e scopes | **RBAC** e **ABAC** (role por regra/atributo) |

## Fluxo combinado

```
Usuário  ──login──>  USER POOL  ──JWT──>  IDENTITY POOL  ──>  STS
                                                               │
                                            credencial AWS temporária
                                                               │
                                                     S3 / DynamoDB / etc.
```

## Onde o Cognito se encaixa

| Integração | Como |
|---|---|
| **API Gateway REST** | **Cognito authorizer** valida o JWT |
| **API Gateway HTTP** | **JWT authorizer** |
| **ALB** | Autenticação OIDC nativa |
| **AppSync** | Autorização por user pool |
| **AWS WAF** | Web ACL pode ser associada a um **Cognito user pool** |

## Quem é o público (não confunda)

| Público | Serviço |
|---|---|
| **Usuário final** do app | **Cognito** |
| **Funcionário** acessando contas AWS | **IAM Identity Center** |
| **Aplicação/serviço** | **IAM role + STS** |
| App que precisa de **Active Directory** | **Directory Service** |

## Onde o guia cita

**Task 1.2**, nominalmente: *"Security services with appropriate use cases (for example, Amazon Cognito, Amazon GuardDuty, Amazon Macie)"*.

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
