---
tags: [saa-c03, emr, decorar]
servico: Amazon EMR
atualizado: 2026-11-08
---

# EMR — Decorar

## Os frameworks

**Hadoop · Spark · Hive · Pig · Presto · HBase**

## Os três tipos de nó — e onde usar Spot

| Nó | Papel | Spot? |
|---|---|---|
| **Master** | Coordena o cluster | ❌ **Não** (perder o master mata o cluster) |
| **Core** | Processa **e guarda HDFS** | ⚠️ **Evite** (perder HDFS arrisca o dado) |
| **Task** | **Só processa** | ✅ **Sim — é o lugar do Spot** |

A doc sobre Spot: *"Spot Instances can offer significant savings—as low as a tenth of on-demand pricing in some cases"* (instâncias Spot podem trazer economia expressiva — em alguns casos, até um décimo do preço sob demanda), e recomenda *"use On-Demand Instances in one group for guaranteed processing power together with Spot Instances in another group"* (use instâncias sob demanda num grupo, para poder de processamento garantido, junto com instâncias Spot em outro grupo).

## Cluster transiente × long-running

> *"If you configure your cluster to be automatically terminated, it is terminated after all the steps complete. This is referred to as a transient cluster."* (se você configurar o cluster para ser encerrado automaticamente, ele é encerrado depois que todas as etapas terminam — é o que se chama de cluster transiente)

| | **Transiente** | **Long-running** |
|---|---|---|
| Vida | Termina após os steps | Fica ligado |
| Custo | **Paga só o processamento** | Paga 24/7 |
| Storage | **EMRFS (S3)** obrigatoriamente | HDFS possível |
| Use para | Job em lote agendado | Consultas interativas, HBase |

## HDFS × EMRFS

| | **HDFS** | **EMRFS** |
|---|---|---|
| Onde | Discos dos core nodes | **S3** |
| Persiste após o cluster | **Não** | **Sim** |
| Citação | — | *"uses S3 as a data layer... so that you can separate your compute and storage"* |

## EMR × Glue × Athena

| | **EMR** | **Glue** | **Athena** |
|---|---|---|---|
| Infraestrutura | **Cluster** | Nenhuma | Nenhuma |
| Controle | **Total** | Nenhum | Nenhum |
| Frameworks | Hadoop, Spark, Hive, Presto, HBase | Spark, Ray | Presto/Trino (SQL) |
| Spot | **Sim** (task nodes) | — | — |
| Cobrança | Instâncias | DPU-hora | **TB escaneado** |

Nota da doc: *"Amazon Athena supports many of the same data formats as Amazon EMR"* (o Amazon Athena oferece suporte a muitos dos mesmos formatos de dados do Amazon EMR) — o Athena consulta o que o EMR processou.

## Links

- [[3 - Performance (24%)/EMR/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/EMR/3 - Detalhes|3 - Detalhes]] · [[3 - Performance (24%)/EMR/4 - Questoes|4 - Questoes]]
