---
tags: [saa-c03, bancos-especializados, decorar]
servico: Bancos especializados
atualizado: 2026-11-08
---

# Bancos especializados — Decorar

## A tabela de gatilhos

| Enunciado menciona | Serviço |
|---|---|
| **grafo**, relacionamento, rede social, fraude, recomendação, grafo de conhecimento | **Neptune** |
| **MongoDB**, documento JSON, coleção | **DocumentDB** |
| **Cassandra**, CQL, wide-column | **Keyspaces** |
| **série temporal**, sensores, IoT, métricas, janela de tempo | **Timestream** |
| chave-valor, escala ilimitada, single-digit ms | **DynamoDB** |
| SQL relacional, transação | **RDS** / **Aurora** |
| analítico, BI, colunar, petabytes | **Redshift** |
| busca textual, log analytics | **OpenSearch Service** |
| in-memory, cache, leaderboard | **ElastiCache** |

## O mapa completo "modelo → serviço"

```
Relacional          → RDS / Aurora
Chave-valor         → DynamoDB
Documento           → DocumentDB (MongoDB)
Wide-column         → Keyspaces (Cassandra)
Grafo               → Neptune
Série temporal      → Timestream
In-memory           → ElastiCache (Redis/Memcached)
Analítico (colunar) → Redshift
Busca / log         → OpenSearch Service
Ledger imutável     → QLDB
```

## Como estão na lista oficial

Todos os quatro estão na lista de **serviços em escopo** da SAA-C03, na categoria **Database**: **Amazon DocumentDB**, **Amazon Keyspaces**, **Amazon Neptune** — e **Timestream** aparece em escopo via **AWS Backup** (*"Amazon Timestream for LiveAnalytics"*) e no domínio de custo (*"time series format"* (formato de série temporal)).

## A frase do guia

> **"Using purpose-built AWS services for workloads"** (usar serviços da AWS feitos sob medida para cada carga de trabalho) — citada **duas vezes** (Task 2.1 e Task 2.2).

> **"Determining cost-effective AWS database types (for example, time series format, columnar format)"** (determinar os tipos de banco da AWS mais econômicos (por exemplo, formato de série temporal, formato colunar)) — Task 4.3.

## Links

- [[3 - Performance (24%)/Bancos especializados (Neptune, DocumentDB, Keyspaces, Timestream)/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/Bancos especializados (Neptune, DocumentDB, Keyspaces, Timestream)/3 - Detalhes|3 - Detalhes]] · [[3 - Performance (24%)/Bancos especializados (Neptune, DocumentDB, Keyspaces, Timestream)/4 - Questoes|4 - Questoes]]
