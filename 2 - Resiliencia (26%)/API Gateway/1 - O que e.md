---
tags: [saa-c03, api-gateway]
servico: Amazon API Gateway
tipo: Porta de entrada de APIs
dominios: [2]
atualizado: 2026-11-08
---

# Amazon API Gateway — O que é

> [!info] Em uma frase
> A porta de entrada gerenciada para APIs: recebe a requisição, **autentica**, **limita a taxa**, opcionalmente **cacheia**, e encaminha para Lambda, HTTP, ou direto para um serviço da AWS.

## Os três tipos de API

| Tipo | Para quê |
|---|---|
| **REST API** | Mais recursos: **cache**, **usage plans e API keys**, endpoint **privado**, **WAF**, X-Ray, validação de request, canary |
| **HTTP API** | *"designed with minimal features so that they can be offered at a lower price"*. JWT authorizer nativo, deploy automático |
| **WebSocket API** | *"stateful, full-duplex communication"*, roteando pelo **conteúdo** da mensagem |

## Os três tipos de endpoint

| Endpoint | Onde atende | REST | HTTP |
|---|---|---|---|
| **Edge-optimized** | Borda do CloudFront | ✅ | ❌ |
| **Regional** | Na região | ✅ | ✅ |
| **Private** | **Só dentro da VPC**, via interface endpoint | ✅ | ❌ |

## O número para decorar

> *"API Gateway has a default throttle limit of 10,000 requests per second, whereas Lambda has a default concurrency limit of 1,000."*

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[Lambda]] · [[Cognito]] · [[WAF]] · [[SQS]] · [[CloudFront]]
- [REST × HTTP API](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-vs-rest.html)
