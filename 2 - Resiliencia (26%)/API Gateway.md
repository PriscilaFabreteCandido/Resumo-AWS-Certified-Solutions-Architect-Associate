---
tags: [saa-c03, dominio-2, api-gateway]
dominio: 2
tasks: [2.1]
atualizado: 2026-11-08
---

# Amazon API Gateway

## 🧩 Em 30 segundos

- **REST API**: mais features (cache, usage plans, API keys, WAF, X-Ray, validação de request, endpoint **privado**). Mais caro.
- **HTTP API**: *"designed with minimal features so that they can be offered at a lower price"*. JWT authorizer nativo, deploy automático.
- **WebSocket API**: *"stateful, full-duplex communication"*, roteia pelo **conteúdo** da mensagem.
- Throttle padrão: **10.000 requisições/s**.
- Tipos de endpoint: **edge-optimized**, **regional** e **private** — e só a REST API suporta os três.

## 🧠 Teste-se primeiro

> [!question]- REST × HTTP API: o que só a REST tem?
> **Cache** · **usage plans e API keys** · **resource policies** · endpoint **privado** · **edge-optimized** · **AWS WAF** · **X-Ray** · **throttling por cliente** · validação de request · transformação de body · **canary release** · respostas de gateway customizadas · integrações mock · certificados para autenticar no backend · response streaming.
> O que só a **HTTP API** tem: **deploy automático** e integração privada via **Cloud Map**.
> Ambas têm: IAM authorizer, **Lambda authorizer**, mutual TLS. Cognito: REST via **Cognito authorizer**, HTTP via **JWT authorizer**.

> [!question]- Os três tipos de endpoint
> **Edge-optimized**: distribuído pela borda do CloudFront; bom para clientes geograficamente dispersos. **Só REST.**
> **Regional**: atende na região; melhor quando os clientes estão na mesma região (ou quando você quer pôr seu próprio CloudFront na frente). REST e HTTP.
> **Private**: acessível **só** de dentro da VPC, via **interface endpoint**. **Só REST.**

> [!question]- Quando usar usage plan e API key?
> Quando você precisa **medir e limitar por cliente** (parceiro, tier free/pago). Usage plan define quota (requisições por dia/semana/mês) e throttle (rate e burst) por **API key**. **Só na REST API.**
> ⚠️ API key **não é autenticação**. Para autenticar: IAM, Cognito ou Lambda authorizer.

## Autorização — qual usar

| Mecanismo | Quando |
|---|---|
| **IAM** (SigV4) | Chamador é um principal AWS (outro serviço, aplicação com role) |
| **Cognito user pool authorizer** (REST) / **JWT authorizer** (HTTP) | Usuário final já autenticado no Cognito ou num provedor OIDC |
| **Lambda authorizer** | Lógica própria: token opaco, cabeçalho customizado, consulta a base externa |
| **Resource policy** (REST) | Restringir por VPC, VPC endpoint, conta, faixa de IP |
| **Mutual TLS** | Cliente apresenta certificado (B2B, dispositivo) |

## Outros detalhes

- **Stages** (`dev`, `prod`) com **stage variables**; **canary release** só na REST.
- **Cache** por stage, na REST: reduz chamadas ao backend (resposta para "diminuir carga no backend" e "reduzir latência de leitura repetida").
- **Throttling** em camadas: por conta/região, por stage, por método e por cliente (usage plan).
- **Integrações**: Lambda (proxy ou não), HTTP, **AWS service** (ex.: colocar direto numa fila SQS, sem Lambda), mock, VPC Link para recursos privados.

> [!tip] Padrão de prova: API Gateway → SQS, sem Lambda
> Quando o enunciado pede "absorver pico de requisições e processar depois com o menor esforço", a integração direta **API Gateway → SQS** (AWS service integration) elimina a Lambda do caminho de ingestão. É a resposta "serverless sem código".

## ❓ Questões de prova

> [!example]- Q1 — Uma API precisa ser consumida **apenas** por aplicações dentro da VPC, sem exposição à internet. Qual configuração?
> **A)** HTTP API regional com resource policy
> **B)** **REST API com endpoint do tipo `private`, acessada por interface endpoint, com resource policy restringindo o VPC endpoint** ✅
> **C)** REST API regional atrás de um NLB interno
> **D)** HTTP API com Lambda authorizer
>
> **Por que B**: endpoint privado existe exatamente para isso, e a resource policy é o controle que amarra ao VPC endpoint.
> **A errada**: **HTTP API não suporta endpoint privado** nem resource policy.
> **C errada**: não é como o API Gateway se torna privado; o endpoint regional continua público.
> **D errada**: authorizer autentica, não deixa a API privada.

> [!example]- Q2 — Uma API pública de parceiros precisa limitar cada parceiro a 10.000 chamadas por dia e cobrar por tier. Qual recurso?
> **A)** WAF com rate-based rule
> **B)** **Usage plans com API keys na REST API** ✅
> **C)** Throttling por stage
> **D)** Lambda authorizer contando as chamadas no DynamoDB
>
> **Por que B**: usage plan dá **quota por período** e throttle por **API key** — a medição por cliente que o enunciado pede. Recurso exclusivo da REST API.
> **A errada**: rate-based rule limita por IP, em janela de 1 ou 5 minutos; não dá quota diária por parceiro.
> **C errada**: throttle de stage é global, não por cliente.
> **D errada**: reinventa o recurso nativo.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| HTTP API é só "REST mais nova" | Tem **menos** features: sem cache, sem usage plan, sem endpoint privado, sem WAF, sem X-Ray |
| HTTP API suporta endpoint privado | **Não.** Só REST |
| API key autentica | API key é para **medir e limitar**, não autenticar |
| WAF funciona em qualquer API Gateway | Só na **REST API** (a lista oficial do WAF diz "API Gateway REST API") |
| Cache do API Gateway é por API | É por **stage** |
| Preciso de Lambda para gravar numa fila | Integração direta **API Gateway → SQS** existe |
| Edge-optimized é sempre melhor | Se os clientes estão na mesma região, **regional** tem menos latência |

## Links

- [[02 - Dominio 2 - Design Resilient Architectures (26%)]]
- [[Containers e serverless - ECS, EKS, Fargate, Lambda e Step Functions]]
- [[Rede e borda - CloudFront, Global Accelerator e conectividade hibrida]]
- [REST API × HTTP API](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-vs-rest.html)
