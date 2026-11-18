---
tags: [saa-c03, cloudfront, decorar]
servico: Amazon CloudFront
atualizado: 2026-11-08
---

# CloudFront — Decorar

## Os números

| Item | Valor |
|---|---|
| **TTL padrão** | **24 horas** (mínimo 0 s, **sem máximo**) |
| **Certificado ACM** | **us-east-1 (N. Virginia)**, obrigatoriamente, para HTTPS viewer↔CloudFront |
| Exceção | CloudFront↔**origem ELB**: certificado em **qualquer** região |
| **Origin group** | **2** origens (primária + secundária) |
| **Status que disparam failover** | **400, 403, 404, 416, 429, 500, 502, 503, 504** |
| Métodos com failover | só **`GET`, `HEAD`, `OPTIONS`** |
| Timeout de conexão | **10 s** (faixa 1-10) |
| Tentativas de conexão | **3** (faixa 1-3) |
| Timeout de resposta | **30 s** (faixa 1-120) |
| Delay típico de failover | *"as long as 30 seconds (3 connection attempts of 10 seconds each)"* |
| **Geo restriction** | bloqueio por **país**; devolve **403**; precisão declarada **99,8%** |
| Erro de certificado na origem | **502 Bad Gateway** |
| Renovar certificado | *"at least 24 hours before the `NotAfter` value"* (pelo menos 24 horas antes do valor `NotAfter`) |

## Regional edge caches

> *"CloudFront also has regional edge caches that bring more of your content closer to your viewers, even when the content is not popular enough to stay at a POP."*

Ficam **entre a origem e os POPs**, com cache maior. **Não** passam por eles:

- *"Proxy HTTP methods (`PUT`, `POST`, `PATCH`, `OPTIONS`, and `DELETE`) go directly to the origin from the POPs"*
- *"Dynamic requests, as determined at request time, do not flow through regional edge caches"*
- Origem **S3 na mesma região** do regional edge cache ótimo: *"the POP skips the regional edge cache"*

## OAC × OAI

| Capacidade | **OAC** | **OAI** (legado) |
|---|---|---|
| Buckets em **todas as regiões** | ✅ | ❌ (não as lançadas após jan/2023) |
| **SSE-KMS** | ✅ | ❌ |
| **PUT e DELETE** dinâmicos | ✅ | ❌ |
| Status | **Recomendado** | *"legacy, not recommended"* (geração antiga, não recomendado) |

**Pré-requisito do OAC**: Object Ownership em **Bucket owner enforced**.
Bucket policy: principal `cloudfront.amazonaws.com` + condição **`AWS:SourceArn`** (ARN da distribuição).
Com SSE-KMS: a **key policy** precisa liberar `kms:Decrypt`, `kms:Encrypt`, `kms:GenerateDataKey*`.
⚠️ **Website endpoint** do S3 vira *custom origin* e **não aceita** OAC nem OAI.

## Signed URL × signed cookie

| Use | Quando (texto oficial) |
|---|---|
| **Signed URL** | *"restrict access to individual files"*; cliente **não suporta cookie** |
| **Signed cookie** | *"provide access to multiple restricted files"* (ex.: HLS); *"don't want to change your current URLs"* |

> *"Signed URLs take precedence over signed cookies."* Recomendação: **trusted key groups**.

## CloudFront Functions × Lambda@Edge

| | **CloudFront Functions** | **Lambda@Edge** |
|---|---|---|
| Linguagem | **JavaScript** (ECMAScript 5.1) | **Node.js e Python** |
| Triggers | **viewer request/response** (2) | **viewer + origin** request/response (**4**) |
| Duração | **submilissegundo** | até **30 s** |
| Memória | **2 MB** | 128 MB (viewer) / **10 GB** (origin) |
| Código | **10 KB** | 50 MB |
| Acesso à **rede** | ❌ | ✅ |
| Acesso ao **body** | ❌ | ✅ |
| Geolocalização/device | ✅ | só em origin |
| **KeyValueStore** | ✅ | ❌ |
| Escala | *"millions of requests per second"* (milhões de requisições por segundo) | *"10,000 requests per second per Region"* (10.000 requisições por segundo por Região) |

## Links

- [[3 - Performance (24%)/CloudFront/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/CloudFront/3 - Detalhes|3 - Detalhes]] · [[3 - Performance (24%)/CloudFront/4 - Questoes|4 - Questoes]]
- [[02 - Numeros para decorar]]
