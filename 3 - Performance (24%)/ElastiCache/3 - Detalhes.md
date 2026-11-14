---
tags: [saa-c03, elasticache, detalhes]
servico: Amazon ElastiCache
atualizado: 2026-11-08
---

# ElastiCache — Detalhes

## 1. Por que cache é resposta de **custo**, não só de performance

O guia lista *"Caching strategies"* não apenas em **Task 3.3** (performance de banco) mas também em **Task 4.3** (**custo** de banco). A razão: uma instância de ElastiCache frequentemente custa **menos** que subir a instance class do banco ou adicionar read replicas — e entrega latência melhor.

O raciocínio de prova: carga **read-heavy** com dados repetidos → cache. Carga de **escrita** ou leitura sempre diferente → cache não ajuda; aí é réplica ou instância maior.

## 2. Redis — por que é quase sempre a resposta

O Redis tem o que o Memcached não tem:

**Replicação e failover.** Cluster com nó primário e réplicas, Multi-AZ com **failover automático**. Memcached **não replica**: perder um nó é perder a parte do cache que estava nele.

**Persistência.** Snapshot e restore. Memcached é puramente volátil.

**Estruturas de dados.** `sorted set` (ranking), `list` (fila), `set` (conjunto), `hash` (objeto), `stream`. Memcached só tem chave-valor opaco.

**Pub/sub, transações, scripts Lua.**

O Memcached ganha em dois pontos: é **multithread** (melhor uso de um nó grande) e é mais simples. Por isso a prova o oferece quando o enunciado é explícito: *"cache simples que pode ser perdido"*.

## 3. Cluster mode (Redis)

| Modo | Topologia |
|---|---|
| **Cluster mode disabled** | Um shard: 1 primário + até N réplicas. Escala **vertical** (nó maior) e leitura por réplica |
| **Cluster mode enabled** | **Vários shards**, cada um com primário + réplicas. Escala **horizontal**, com os dados particionados |

Cluster mode é a resposta quando o **dataset não cabe num nó** ou quando a escrita precisa escalar além de um primário.

## 4. Estratégias de cache — em detalhe

**Lazy loading (cache-aside)** é o padrão:

```
ler(chave):
   v = cache.get(chave)
   se v existe        → devolve           (HIT)
   se não existe      → v = banco.get()   (MISS)
                        cache.set(chave, v, TTL)
                        devolve v
```

Vantagens: só o que é pedido ocupa memória; falha do cache não quebra a aplicação (degrada).
Desvantagens: o **primeiro** acesso paga o custo total, e o dado pode ficar **velho** até expirar.

**Write-through** grava no cache junto com o banco. O cache fica fresco, mas você guarda dado que talvez nunca seja lido, e cada escrita fica mais caro.

**TTL** é o que limita a validade em qualquer das duas — e é o controle mais importante contra dado velho.

A combinação usual: **lazy loading + TTL**, e write-through nos dados mais quentes.

## 5. Sessão — o padrão stateless

Guardar sessão **na instância** quebra a escala horizontal: se o ALB manda o usuário para outra instância, a sessão desaparece. As duas saídas são **sticky sessions** (ruim: prejudica distribuição e quebra quando a instância morre) ou **sessão externa**.

Sessão externa no **ElastiCache for Redis** (ou **DynamoDB**) é a resposta arquitetural: a aplicação fica **stateless**, qualquer instância atende qualquer requisição, e o ASG pode substituir instâncias livremente.

## 6. Segurança e rede

| Controle | Detalhe |
|---|---|
| **VPC** | O cluster vive numa subnet group, com **security group** |
| **Criptografia** | Em repouso e em trânsito (Redis); **AUTH**/RBAC |
| **Acesso** | Não é público; alcançável de dentro da VPC |
| **Backup** | Snapshot (Redis) |

## 7. ElastiCache × as alternativas de cache

| Onde cachear | Serviço |
|---|---|
| Consulta a banco **relacional** | **ElastiCache** |
| Consulta ao **DynamoDB** | **DAX** |
| **Resposta de API** | cache do **API Gateway** (por stage, só REST) |
| **Conteúdo** para o usuário final | **CloudFront** |
| Sessão | **ElastiCache for Redis** ou **DynamoDB** |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[DAX]] · [[DynamoDB]] · [[RDS]] · [[Aurora]] · [[ELB (Load Balancers)]] · [[CloudFront]] · [[API Gateway]]
