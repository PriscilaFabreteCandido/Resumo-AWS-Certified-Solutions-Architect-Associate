---
tags: [saa-c03, api-gateway, decorar]
servico: Amazon API Gateway
atualizado: 2026-11-08
---

# API Gateway — Decorar

## O que **só a REST API** tem

**Cache** · **usage plans e API keys** · **resource policies** · endpoint **private** · **edge-optimized** · **AWS WAF** · **X-Ray** · throttling **por cliente** · validação de request · transformação de body · **canary release** · gateway responses customizadas · integrações mock · certificados para autenticar no backend · response streaming.

## O que **só a HTTP API** tem

**Deploy automático** · integração privada via **AWS Cloud Map**.

## O que os dois têm

**IAM authorizer** · **Lambda authorizer** · **mutual TLS** · endpoint **regional**.
Cognito: REST via **Cognito authorizer**; HTTP via **JWT authorizer**.

## Autorização — qual usar

| Mecanismo | Quando |
|---|---|
| **IAM** (SigV4) | O chamador é um principal AWS |
| **Cognito user pool authorizer** (REST) / **JWT authorizer** (HTTP) | Usuário final autenticado no Cognito ou num provedor OIDC |
| **Lambda authorizer** | Lógica própria: token opaco, header customizado, consulta externa |
| **Resource policy** (REST) | Restringir por **VPC**, **VPC endpoint**, conta ou faixa de IP |
| **Mutual TLS** | Cliente apresenta certificado (B2B, dispositivo) |

⚠️ **API key não autentica.** Serve para **medir e limitar** por cliente (usage plan).

## Throttling — as camadas

1. Por **conta/região** (padrão **10.000 req/s**)
2. Por **stage**
3. Por **método**
4. Por **cliente**, via **usage plan** (só REST)

## Números e fatos

| Item | Valor |
|---|---|
| Throttle padrão | **10.000 req/s** |
| Cache | Por **stage** (só REST) |
| Stages | `dev`, `prod`… com **stage variables** |
| Canary release | Só **REST** |
| Timeout de integração | Limite de segundos por integração (configurável) |

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
