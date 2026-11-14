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

- [[3 - Performance (24%)/ElastiCache/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/ElastiCache/3 - Detalhes|3 - Detalhes]] · [[3 - Performance (24%)/ElastiCache/4 - Questoes|4 - Questoes]]
- [[3 - Performance (24%)/DAX/1 - O que e|DAX]] · [[2 - Resiliencia (26%)/RDS/1 - O que e|RDS]] · [[2 - Resiliencia (26%)/Aurora/1 - O que e|Aurora]] · [[2 - Resiliencia (26%)/ELB (Load Balancers)/1 - O que e|ELB (Load Balancers)]] · [[4 - Custo (20%)/04 - Dominio 4 - Design Cost-Optimized Architectures (20%)|Custo (dominio 4)]]
