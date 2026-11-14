---
tags: [saa-c03, emr, big-data, spark, hadoop]
servico: Amazon EMR
tipo: Cluster de big data gerenciado
dominios: [3, 4]
atualizado: 2026-11-08
---

# Amazon EMR — O que é

> [!info] Em uma frase
> *"a managed cluster platform that simplifies running big data frameworks, such as Apache Hadoop and Apache Spark"* — com **controle total** do cluster.

## Quando é a resposta

A doc dá o critério:

> *"You should use Amazon EMR if you use custom code to process and analyze extremely large datasets with the latest big data processing frameworks such as Spark, Hadoop, Presto, or Hbase."*

E o diferencial:

> *"Amazon EMR gives you full control over the configuration of your clusters and the software installed on them."*

| Enunciado | Resposta |
|---|---|
| **Spark**, **Hadoop**, **Hive**, **Presto**, **HBase** nomeados | **EMR** |
| "código customizado" sobre dataset enorme | **EMR** |
| "controle da configuração do cluster" | **EMR** |
| ETL rotineiro **serverless** | **Glue** |
| SQL **ad-hoc** no S3 | **Athena** |
| BI recorrente com joins | **Redshift** |

## HDFS × EMRFS — a decisão de storage

| | **HDFS** | **EMRFS** |
|---|---|---|
| Onde | Discos do cluster | **S3** |
| Sobrevive ao cluster | **Não** | **Sim** |
| Para quê | Dado intermediário, scratch | Dado de entrada e saída |

> *"EMRFS uses S3 as a data layer... so that you can separate your compute and storage."*

Separar compute de storage é o que permite **cluster transiente** — e é a resposta de custo.

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[Glue]] · [[Athena]] · [[Redshift]] · [[S3]] · [[FSx]] · [[Opcoes de compra do EC2 (Spot, RI, Savings Plans)]]
- [O que é o EMR](https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-what-is-emr.html)
