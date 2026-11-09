---
tags: [saa-c03, api-gateway, questoes]
servico: Amazon API Gateway
atualizado: 2026-11-08
---

# API Gateway — Questões

> [!question]- Q1. Uma API deve ser consumida **apenas** por aplicações dentro da VPC, sem exposição à internet.
> **A)** HTTP API regional com resource policy
> **B)** **REST API com endpoint `private`, acessada por interface endpoint, com resource policy restringindo o VPC endpoint** ✅
> **C)** REST API regional atrás de um NLB interno
> **D)** HTTP API com Lambda authorizer
>
> **Por que B**: o endpoint privado existe para isso, e a resource policy (com `aws:SourceVpce`) amarra o acesso.
> **A errada**: a **HTTP API não suporta** endpoint privado nem resource policy.
> **C errada**: o endpoint regional continua público.
> **D errada**: authorizer autentica; não deixa a API privada.

> [!question]- Q2. Limitar cada parceiro a 10.000 chamadas por dia, com tiers diferentes.
> **A)** WAF com rate-based rule
> **B)** **Usage plans com API keys na REST API** ✅
> **C)** Throttling por stage
> **D)** Lambda authorizer contando no DynamoDB
>
> **Por que B**: usage plan dá **quota por período** e throttle por **API key** — medição por cliente.
> **A errada**: rate-based rule limita por IP, em janela de 1 ou 5 min; não dá quota diária por parceiro.
> **C errada**: throttle de stage é global.
> **D errada**: reinventa o recurso nativo.

> [!question]- Q3. Absorver um pico de requisições e processar depois, com o menor esforço operacional e sem código de ingestão.
> **A)** API Gateway → Lambda → SQS
> **B)** **API Gateway com integração direta para SQS (AWS service integration)** ✅
> **C)** ALB → ECS → SQS
> **D)** API Gateway com cache
>
> **Por que B**: a integração direta elimina a Lambda do caminho — menos código, menos custo, menos ponto de falha.
> **D errada**: cache serve leitura repetida, não ingestão de escrita.

> [!question]- Q4. Reduzir a carga no backend para endpoints de leitura cujos dados mudam a cada 5 minutos.
> **A)** Aumentar o throttle
> **B)** **Habilitar o cache do API Gateway no stage, com TTL de 5 minutos** ✅
> **C)** Mudar para HTTP API
> **D)** Adicionar provisioned concurrency na Lambda
>
> **Por que B**: o cache responde sem chamar o backend. ⚠️ Recurso **só da REST API**.
> **C errada**: a HTTP API **não tem cache**.

> [!question]- Q5. Uma API pública precisa ser protegida contra SQL injection.
> **A)** HTTP API com WAF
> **B)** **REST API com uma web ACL do WAF** ✅
> **C)** Throttling por método
> **D)** Resource policy por IP
>
> **Por que B**: a lista oficial de recursos do WAF diz **"Amazon API Gateway REST API"**.
> **A errada**: a HTTP API não é suportada pelo WAF.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| HTTP API é só "REST mais nova" | Tem **menos** features: sem cache, sem usage plan, sem endpoint privado, sem WAF, sem X-Ray |
| HTTP API suporta endpoint privado | **Não.** Só REST |
| API key autentica | Serve para **medir e limitar**, não autenticar |
| WAF funciona em qualquer API Gateway | Só na **REST API** |
| Cache é por API | É por **stage** |
| Preciso de Lambda para gravar numa fila | Integração direta **API Gateway → SQS** existe |
| Edge-optimized é sempre melhor | Se os clientes estão na mesma região, **regional** tem menos latência |
| Throttle padrão é por API | É **10.000 req/s** por conta/região |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
