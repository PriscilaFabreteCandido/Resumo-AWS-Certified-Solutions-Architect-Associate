---
servico: Amazon API Gateway
fonte: "[[2 - Resiliencia (26%)/API Gateway/2 - Decorar|2 - Decorar]]"
---

# API Gateway — Flashcards

#flashcards/saa-c03/d2-resiliencia/api-gateway

Throttle padrão do API Gateway por conta/região?::**10.000 req/s**

Quais são as quatro camadas de throttling do API Gateway?::Por **conta/região**, por **stage**, por **método** e por **cliente** (via **usage plan**, só REST)

Cache, usage plans, WAF, X-Ray e canary release: REST API ou HTTP API?::Só **REST API**

Quais recursos são exclusivos da HTTP API?::**Deploy automático** e integração privada via **AWS Cloud Map**

Quais tipos de endpoint só a REST API oferece?::**Private** e **edge-optimized** (o **regional** existe nos dois tipos)

Para que serve uma API key no API Gateway?::**Medir e limitar** por cliente (usage plan); ela **não autentica**

Como autorizar usuários do Cognito na REST API e na HTTP API?::REST: **Cognito user pool authorizer**; HTTP: **JWT authorizer**

Qual autorização usar quando o chamador é um principal AWS?::**IAM** (assinatura SigV4)

Qual autorização usar para token opaco, header customizado ou consulta externa?::**Lambda authorizer**

Como restringir acesso a uma REST API por VPC, VPC endpoint, conta ou faixa de IP?::**Resource policy** (só REST)

Qual mecanismo usar quando o cliente precisa apresentar certificado (B2B, dispositivo)?::**Mutual TLS**

Em que nível fica o cache do API Gateway?::Por **stage** (só REST)

Como parametrizar ambientes como dev e prod no API Gateway?::**Stages** com **stage variables**
