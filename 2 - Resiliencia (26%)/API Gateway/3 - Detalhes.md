---
tags: [saa-c03, api-gateway, detalhes]
servico: Amazon API Gateway
atualizado: 2026-11-08
---

# API Gateway — Detalhes

## 1. REST × HTTP — a decisão

A doc coloca assim: as duas são *"RESTful API products. REST APIs support more features than HTTP APIs, while HTTP APIs are designed with minimal features so that they can be offered at a lower price."*

Escolha **HTTP API** quando: só precisa de proxy para Lambda ou HTTP, autenticação JWT, e o critério é **custo e simplicidade**.

Escolha **REST API** quando precisa de **qualquer** destes: cache, usage plans/API keys, endpoint privado, WAF, X-Ray, validação de request, canary, transformação de payload, resource policy.

Na prova, a presença de **um** desses requisitos já decide por REST.

## 2. Endpoint privado — o padrão de API interna

A **REST API** com endpoint `private` é acessível **só de dentro da VPC**, via **interface endpoint** (`execute-api`). A **resource policy** amarra o acesso ao VPC endpoint específico, com a condição `aws:SourceVpce`.

⚠️ A **HTTP API não suporta** endpoint privado nem resource policy. Esse é o par mais testado do tema.

## 3. Integrações — e o padrão sem código

| Integração | Para quê |
|---|---|
| **Lambda proxy** | Repassa a requisição inteira para a função |
| **Lambda (não-proxy)** | Com mapping template (transforma entrada e saída) |
| **HTTP** | Backend próprio (ALB, EC2, serviço externo) |
| **AWS service** | Chama **direto** um serviço AWS, sem Lambda |
| **Mock** | Devolve resposta fixa (prototipagem) |
| **VPC Link** | Alcança recursos privados (NLB para REST, ALB/Cloud Map para HTTP) |

> [!tip] O padrão "API Gateway → SQS, sem Lambda"
> Para "absorver pico de requisições e processar depois com o menor esforço", a integração direta **API Gateway → SQS** (AWS service integration) elimina a Lambda do caminho de ingestão. É a resposta "serverless sem código".

## 4. Cache — o que ele resolve

O cache (por **stage**, só REST) guarda a resposta e evita chamar o backend. Resolve dois enunciados:

- "reduzir a carga no backend"
- "reduzir a latência de leituras repetidas"

Configurável por método, com TTL e invalidação por header.

## 5. Usage plans e API keys

Para **medir e limitar por cliente** (parceiro, tier free/pago): o usage plan define **quota** (requisições por dia/semana/mês) e **throttle** (rate e burst) por **API key**.

Exclusivo da **REST API**. E vale repetir: **API key não é autenticação** — qualquer um com a chave a usa. Para autenticar, IAM, Cognito ou Lambda authorizer.

## 6. Proteção

| Camada | Mecanismo |
|---|---|
| **DDoS** | **Shield Standard** (automático) |
| **Camada 7** (SQL injection, XSS, rate por IP) | **AWS WAF** — ⚠️ só na **REST API** |
| **Taxa** | Throttling por conta, stage, método e cliente |
| **Autenticação** | IAM, Cognito/JWT, Lambda authorizer, mutual TLS |
| **Rede** | Endpoint **private** + resource policy com `aws:SourceVpce` |

## 7. Edge-optimized × regional

**Edge-optimized** entra pela borda do CloudFront — bom para clientes **geograficamente dispersos**.

**Regional** atende na região. É melhor quando os clientes estão **na mesma região**, ou quando você quer pôr **seu próprio** CloudFront na frente (para controlar cache, WAF e certificado).

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[Lambda]] · [[Cognito]] · [[WAF]] · [[SQS]] · [[CloudFront]] · [[VPC Endpoints e PrivateLink]]
