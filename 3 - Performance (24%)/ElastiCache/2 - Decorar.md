---
tags: [saa-c03, elasticache, decorar]
servico: Amazon ElastiCache
atualizado: 2026-11-08
---

# ElastiCache — Decorar

## A tabela Redis × Memcached

| Recurso | **Redis** | **Memcached** |
|---|---|---|
| **Replicação** | ✅ | ❌ |
| **Failover automático / Multi-AZ** | ✅ | ❌ |
| **Snapshot / persistência** | ✅ | ❌ |
| **Estruturas de dados** | ✅ (list, set, **sorted set**, hash, stream) | ❌ (só chave-valor) |
| **Pub/sub** | ✅ | ❌ |
| **Transações / Lua** | ✅ | ❌ |
| **Multithread** | ❌ | ✅ |
| **Sharding** | Cluster mode | Adicionar nós |
| **Criptografia em trânsito/repouso e AUTH** | ✅ | limitado |

## Estratégias de cache (o guia pede "caching strategies")

| Estratégia | Como funciona | Trade-off |
|---|---|---|
| **Lazy loading / cache-aside** | Lê do cache; em **miss**, busca no banco e grava no cache | Só guarda o que é pedido, mas o 1º acesso é lento e o dado pode envelhecer |
| **Write-through** | Grava no cache a **cada escrita** no banco | Cache sempre fresco, mas gasta espaço com dado nunca lido e encarece a escrita |
| **TTL** | Expira a entrada | Limita a validade em qualquer das duas |

A prática comum: **lazy loading + TTL**, com write-through para o dado quente.

## Quando é qual

| Enunciado | Resposta |
|---|---|
| "leaderboard", "ranking", "sorted set" | **Redis** |
| "pub/sub" | **Redis** |
| "sessão **não pode ser perdida**", "failover" | **Redis** |
| "cache simples, pode perder, multithread" | **Memcached** |
| "cache do **DynamoDB**" | **DAX** |
| "cache de **conteúdo na borda**" | **CloudFront** |
| "cache de **resposta de API**" | **API Gateway** (por stage, só REST) |

## Sessão e stateless

Guardar sessão no **ElastiCache** (ou DynamoDB) é o que torna a aplicação **stateless** — pré-requisito para escala horizontal e para não depender de **sticky sessions** no ALB.

## Links

- [[3 - Performance (24%)/ElastiCache/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/ElastiCache/3 - Detalhes|3 - Detalhes]] · [[3 - Performance (24%)/ElastiCache/4 - Questoes|4 - Questoes]]
