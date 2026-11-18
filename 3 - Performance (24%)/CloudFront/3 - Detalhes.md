---
tags: [saa-c03, cloudfront, detalhes]
servico: Amazon CloudFront
atualizado: 2026-11-08
---

# CloudFront — Detalhes

## 1. A hierarquia de cache

```
Viewer → POP (edge location) → REGIONAL EDGE CACHE → Origem
```

Os **POPs** são a primeira camada. Os **regional edge caches** ficam entre eles e a origem, com cache maior — *"bring more of your content closer to your viewers, even when the content is not popular enough to stay at a POP"*.

O caminho é **pulado** em três casos:
- Métodos **PUT, POST, PATCH, OPTIONS, DELETE** — *"go directly to the origin from the POPs"*
- Requisições **dinâmicas**
- Origem **S3 na mesma região** do regional edge cache ótimo

Isso explica por que o CloudFront ajuda pouco em **API dinâmica de escrita** — a resposta ali é **Global Accelerator** (rede) ou cache no **API Gateway**.

## 2. Cache behaviors e TTL

O **TTL padrão é 24 horas**, com mínimo de 0 s e **sem máximo**. Você controla por **cache behavior** (por path pattern), definindo:

- O que entra na **cache key** (query strings, headers, cookies)
- TTL mínimo, máximo e padrão
- Métodos permitidos e métodos cacheados
- Compressão
- Política de origem (quais headers repassar)

Regra prática: quanto **menos** entra na cache key, melhor o hit rate. Repassar todos os headers e cookies destrói o cache.

Para invalidar antes do TTL: **invalidation** (por path) ou **versionamento de objeto** (`style.v2.css`) — a segunda é mais barata e mais previsível.

## 3. Origem privada — OAC

O **OAC** é o mecanismo atual para que o bucket seja acessível **só** pelo CloudFront. A doc lista o que **só o OAC** suporta:

1. *"All Amazon S3 buckets in all AWS Regions, including opt-in Regions launched after December 2022"*
2. **SSE-KMS**
3. *"Dynamic requests (PUT and DELETE) to Amazon S3"*

O **OAI** é *"legacy, not recommended"* (geração antiga, não recomendado) e não suporta nada disso (nem regiões lançadas após jan/2023).

A configuração completa:
- Object Ownership em **Bucket owner enforced** (desativa ACLs)
- Bucket policy com principal `cloudfront.amazonaws.com` e condição **`AWS:SourceArn`** (proteção contra confused deputy)
- Com SSE-KMS: **key policy** liberando `kms:Decrypt`, `kms:Encrypt`, `kms:GenerateDataKey*`
- Signing em `always` (*"Sign requests (recommended)"*)

⚠️ Se o bucket é usado como **website endpoint** (para index documents e redirects), ele vira **custom origin** e *"you can't use OAC (or OAI)"*.

## 4. HTTPS e certificado

> *"To use a certificate in AWS Certificate Manager (ACM) to require HTTPS between viewers and CloudFront, make sure you request (or import) the certificate in the US East (N. Virginia) Region (`us-east-1`)."*

E a exceção que também cai: *"If you want to require HTTPS between CloudFront and your origin, and you're using a load balancer in Elastic Load Balancing as your origin, you can request or import the certificate in any AWS Region."* (se você quer exigir HTTPS entre o CloudFront e a origem, e está usando um load balancer do Elastic Load Balancing como origem, pode solicitar ou importar o certificado em qualquer Região)

Outros detalhes: formato **X.509 PEM**; chave privada de terceiro *"cannot be encrypted with a password"*; o SAN precisa casar o alternate domain name (exato ou wildcard no mesmo nível); certificado incompatível na origem devolve **502**; renove *"at least 24 hours before the `NotAfter` value"* (pelo menos 24 horas antes do valor `NotAfter`).

## 5. Origin failover

Um **origin group** tem *"two origins: a primary and a secondary"*. O failover dispara nos status **400, 403, 404, 416, 429, 500, 502, 503, 504** (você escolhe quais), e só para métodos **`GET`, `HEAD`, `OPTIONS`**.

Timeouts: conexão **10 s** (1-10), **3** tentativas (1-3), resposta **30 s** (1-120). O delay típico é *"as long as 30 seconds (3 connection attempts of 10 seconds each)"*.

⚠️ E não é sticky: *"CloudFront routes all incoming requests to the primary origin, even when a previous request failed over."*

## 6. Conteúdo restrito

**Signed URL** para *"individual files"* ou cliente sem cookie. **Signed cookie** para *"multiple restricted files"* (HLS, área de assinante) sem mudar as URLs. *"Signed URLs take precedence over signed cookies."*

A recomendação é **trusted key groups** (em vez de trusted signers legados).

**Geo restriction** é por **país**, com allow list ou block list, devolve **403**, e usa *"a third-party database"* com precisão declarada de **99,8%**. Se a localização é desconhecida, *"CloudFront serves the content"*.

Para controle mais fino (cidade, CEP), a doc indica serviço de geolocalização de terceiro + **signed URLs**.

Geo restriction do CloudFront × **WAF geo match**: a primeira vale para a **distribuição toda**; a segunda combina país com path, header e rate.

## 7. Lógica na borda

| | **CloudFront Functions** | **Lambda@Edge** |
|---|---|---|
| Use para | Reescrever URL, manipular header, redirect, A/B test, normalizar cache key | Chamar API, ler o body, autenticação complexa, transformação pesada |
| Escala | *"millions of requests per second"* (milhões de requisições por segundo) | *"10,000 requests per second per Region"* (10.000 requisições por segundo por Região) |

Functions roda em **submilissegundo** com **2 MB** de memória e **10 KB** de código, **sem** acesso a rede ou ao body. Lambda@Edge vai até **30 s**, tem rede e body, e roda nos **4** triggers.

## 8. CloudFront como alavanca de custo e de segurança

| Benefício | Detalhe |
|---|---|
| **Egress mais barato** | Origem AWS → CloudFront é **grátis**, e a saída pela borda tem tarifa menor |
| **Menos carga na origem** | O cache absorve as requisições repetidas |
| **Superfície reduzida** | Com OAC, o bucket não é público; com custom origin, o ALB pode aceitar só o CloudFront |
| **WAF na borda** | Filtra no POP, antes de consumir banda e capacidade na região |
| **Shield** | Standard automático; recursos do CloudFront são protegidos pelo Advanced |

## Links

- [[3 - Performance (24%)/CloudFront/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/CloudFront/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/CloudFront/4 - Questoes|4 - Questoes]]
- [[3 - Performance (24%)/S3/1 - O que e|S3]] · [[1 - Seguranca (30%)/ACM (Certificate Manager)/1 - O que e|ACM (Certificate Manager)]] · [[1 - Seguranca (30%)/WAF/1 - O que e|WAF]] · [[1 - Seguranca (30%)/Shield/1 - O que e|Shield]] · [[3 - Performance (24%)/Global Accelerator/1 - O que e|Global Accelerator]] · [[2 - Resiliencia (26%)/Route 53/1 - O que e|Route 53]] · [[4 - Custo (20%)/04 - Dominio 4 - Design Cost-Optimized Architectures (20%)|Custo (dominio 4)]]
