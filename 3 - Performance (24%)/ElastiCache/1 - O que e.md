---
tags: [saa-c03, elasticache, cache, redis, memcached]
servico: Amazon ElastiCache
tipo: Cache em memória
dominios: [3, 4]
atualizado: 2026-11-08
---

# Amazon ElastiCache — O que é

> [!info] Em uma frase
> Cache em memória gerenciado, nos sabores **Redis** (ou Valkey) e **Memcached** — para reduzir latência e tirar carga do banco.

## Redis × Memcached — a decisão

| | **Redis** | **Memcached** |
|---|---|---|
| Replicação | **Sim** | **Não** |
| Failover automático (Multi-AZ) | **Sim** | **Não** |
| Persistência / snapshot | **Sim** | **Não** |
| Estruturas de dados | **list, set, sorted set, hash, stream** | Só **chave-valor** |
| Pub/sub | **Sim** | Não |
| Transações | **Sim** | Não |
| Multithread | Não (single-thread por nó) | **Sim** |
| Escala | Cluster mode com **sharding** + réplicas | Horizontal, adicionando nós |

**Regra**: se o enunciado menciona **leaderboard, sorted set, pub/sub, sessão que não pode ser perdida, failover ou persistência** → **Redis**. Se é **cache simples e descartável, com multithread** → **Memcached**.

## Os casos de uso que caem

| Caso | Por quê |
|---|---|
| **Cache de banco relacional** | Tira carga de leitura do RDS/Aurora |
| **Sessão de usuário** | Torna a aplicação **stateless** (e o ASG funcional) |
| **Leaderboard / ranking** | **sorted set** do Redis |
| **Rate limiting / contadores** | Operações atômicas |
| **Pub/sub** | Mensagens leves entre componentes |

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[DAX]] · [[RDS]] · [[Aurora]] · [[ELB (Load Balancers)]] · [[Custo de banco de dados]]
