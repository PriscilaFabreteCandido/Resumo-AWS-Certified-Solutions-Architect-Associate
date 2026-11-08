---
tags: [saa-c03, aurora, banco]
servico: Amazon Aurora
tipo: Banco relacional cloud-native
dominios: [2, 3, 4]
atualizado: 2026-11-08
---

# Amazon Aurora — O que é

> [!info] Em uma frase
> Banco relacional compatível com **MySQL e PostgreSQL**, com storage distribuído que mantém **6 cópias dos dados em 3 AZs**, até **15 réplicas de leitura** e failover em **menos de 60 segundos**.

## O que o torna diferente do RDS

A arquitetura separa **compute** de **storage**. O *cluster volume* é *"a virtual database storage volume that spans multiple Availability Zones, with each Availability Zone having a copy of the DB cluster data"*.

Consequências:

| Característica | Detalhe |
|---|---|
| **Durabilidade** | *"six storage nodes"* em **3 AZs**, com replicação **síncrona** |
| **Réplicas** | Até **15 Aurora Replicas**, que compartilham o **mesmo** storage (não copiam dados) |
| **Storage elástico** | Cresce e **encolhe** automaticamente, até **128 TiB** (256 TiB em versões específicas) |
| **Failover rápido** | *"less than 60 seconds, and often less than 30 seconds"* com réplica |
| **Multi-AZ por desenho** | *"an Aurora configuration with only a single DB instance is still a cluster"* |

## As variantes

| Variante | Para quê |
|---|---|
| **Aurora provisionado** | Carga previsível; você escolhe a instance class |
| **Aurora Serverless v2** | Carga variável; **1 ACU ≈ 2 GiB**, passos de **0,5 ACU**, cobrado por segundo |
| **Aurora Global Database** | Multi-região: 1 primária + **até 10 secundárias**, RPO em **segundos** |
| **Aurora I/O-Optimized** | Sem cobrança por I/O — vale quando I/O é **≥ 25%** da fatura |

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[RDS]] · [[RDS Proxy]] · [[Disaster Recovery (RPO e RTO)]] · [[Custo de banco de dados]]
- [Visão geral do Aurora](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Overview.html)
