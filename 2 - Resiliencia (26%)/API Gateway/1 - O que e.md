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
| **HTTP API** | *"designed with minimal features so that they can be offered at a lower price"* (projetadas com o mínimo de recursos, para poderem ser oferecidas a um preço menor). JWT authorizer nativo, deploy automático |
| **WebSocket API** | *"stateful, full-duplex communication"*, roteando pelo **conteúdo** da mensagem |

## Os três tipos de endpoint

| Endpoint | Onde atende | REST | HTTP |
|---|---|---|---|
| **Edge-optimized** | Borda do CloudFront | ✅ | ❌ |
| **Regional** | Na região | ✅ | ✅ |
| **Private** | **Só dentro da VPC**, via interface endpoint | ✅ | ❌ |

## O número para decorar

> *"API Gateway has a default throttle limit of 10,000 requests per second, whereas Lambda has a default concurrency limit of 1,000."* (o API Gateway tem limite padrão de throttling de 10.000 requisições por segundo, enquanto o Lambda tem limite padrão de concorrência de 1.000)

## Links

- [[2 - Resiliencia (26%)/API Gateway/2 - Decorar|2 - Decorar]] · [[2 - Resiliencia (26%)/API Gateway/3 - Detalhes|3 - Detalhes]] · [[2 - Resiliencia (26%)/API Gateway/4 - Questoes|4 - Questoes]]
- [[2 - Resiliencia (26%)/Lambda/1 - O que e|Lambda]] · [[1 - Seguranca (30%)/Cognito/1 - O que e|Cognito]] · [[1 - Seguranca (30%)/WAF/1 - O que e|WAF]] · [[2 - Resiliencia (26%)/SQS/1 - O que e|SQS]] · [[3 - Performance (24%)/CloudFront/1 - O que e|CloudFront]]
- [REST × HTTP API](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-vs-rest.html)
