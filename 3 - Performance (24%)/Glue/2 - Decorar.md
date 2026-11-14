---
tags: [saa-c03, glue, decorar]
servico: AWS Glue
atualizado: 2026-11-08
---

# Glue — Decorar

## Os componentes e o que cada um faz

| Componente | Uma linha |
|---|---|
| **Data Catalog** | Metadado central (bancos, tabelas, schemas, partições) |
| **Crawler** | Descobre schema e partições **automaticamente** |
| **Job** | ETL em **Spark** ou **Ray**, serverless |
| **Glue Studio** | Interface **gráfica** para criar e monitorar jobs |
| **DataBrew** | Preparação **visual** de dados, *"without writing any code"* |
| **Trigger** | **Agendado**, **on-demand** ou **por evento** |
| **Streaming ETL** | Transforma dado **em trânsito** |

## Quem consome o Data Catalog

| Serviço | Como usa |
|---|---|
| **Athena** | *"Athena integrates with the AWS Glue Data Catalog"* |
| **Redshift Spectrum** | Tabelas externas vêm do catálogo |
| **EMR** | Metastore |
| **Lake Formation** | *"an authorization layer that provides fine-grained access control to resources in the AWS Glue Data Catalog"* |
| **Firehose** | Usa o schema do catálogo para converter em **Parquet/ORC** |

Um catálogo, todos os engines.

## Glue × EMR × Athena

| | **Glue** | **EMR** | **Athena** |
|---|---|---|---|
| Natureza | **ETL serverless** + catálogo | **Cluster** com frameworks | **Consulta SQL** serverless |
| Infraestrutura | Nenhuma | Cluster (EC2/EKS/Serverless) | Nenhuma |
| Engine | Spark, Ray | Hadoop, **Spark**, Hive, Presto, HBase | Presto (Trino) |
| Controle do cluster | Não | **Total** |
| Spot | — | **Sim** (task nodes) | — |
| Cobrança | **DPU-hora** | Instâncias | **TB escaneado** |

## O gatilho de prova

| Enunciado | Resposta |
|---|---|
| "ETL **serverless**", "sem gerenciar cluster" | **Glue** |
| "descobrir o schema automaticamente" | **Glue crawler** |
| "catálogo central do data lake" | **Glue Data Catalog** |
| "preparar dados **sem código**" | **Glue DataBrew** |
| "código Spark customizado, controle do cluster" | **EMR** |
| "consultar com SQL, sem mover" | **Athena** |
| "permissão por **coluna/linha**" | **Lake Formation** |

## Links

- [[3 - Performance (24%)/Glue/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/Glue/3 - Detalhes|3 - Detalhes]] · [[3 - Performance (24%)/Glue/4 - Questoes|4 - Questoes]]
