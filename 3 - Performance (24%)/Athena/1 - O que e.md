---
tags: [saa-c03, athena, analytics, sql]
servico: Amazon Athena
tipo: Consulta SQL serverless
dominios: [3, 4]
atualizado: 2026-11-08
---

# Amazon Athena — O que é

> [!info] Em uma frase
> Consulta **SQL direto no S3**, **serverless**: *"there is no infrastructure to set up or manage, and you pay only for the queries you run"*.

## Definição oficial

> *"Athena SQL and Apache Spark on Amazon Athena are serverless, so there is no infrastructure to set up or manage, and you pay only for the queries you run."*

E o escopo: *"analyze data directly in Amazon S3"* (analisar dados diretamente no Amazon S3) com *"standard SQL"*.

## O modelo de cobrança — e as três alavancas

Athena cobra por **TB escaneado** (o exemplo oficial usa **US$ 5/TB**). As três formas de pagar menos:

| Alavanca | Exemplo oficial |
|---|---|
| **Compressão** | 3 TB de texto = US$ 15 → GZIP 3:1 = 1 TB = **US$ 5** |
| **Formato colunar** | Parquet 3:1, lendo **1 de 4** colunas = 0,25 TB = **US$ 1,25** |
| **Particionamento** | *"If you query a partitioned table and specify the partition in the `WHERE` clause, Athena scans the data only from that partition"* |

> *"there are no additional storage charges for querying your data with Athena"* (não há cobrança adicional de armazenamento para consultar seus dados com o Athena)

## Formatos suportados

> *"CSV, JSON, or columnar data formats such as Apache Parquet and Apache ORC"*

## Athena × as alternativas

| Enunciado | Resposta |
|---|---|
| SQL **ad-hoc** no S3, serverless, pagando por consulta | **Athena** |
| BI recorrente, joins complexos, muitos usuários | **Redshift** |
| Código **Spark/Hadoop** com controle do cluster | **EMR** |
| Já tenho Redshift e quero alcançar o S3 | **Redshift Spectrum** |
| Busca textual, log analytics | **OpenSearch Service** |

## Links

- [[3 - Performance (24%)/Athena/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/Athena/3 - Detalhes|3 - Detalhes]] · [[3 - Performance (24%)/Athena/4 - Questoes|4 - Questoes]]
- [[3 - Performance (24%)/Glue/1 - O que e|Glue]] · [[3 - Performance (24%)/Redshift/1 - O que e|Redshift]] · [[3 - Performance (24%)/EMR/1 - O que e|EMR]] · [[3 - Performance (24%)/Lake Formation/1 - O que e|Lake Formation]] · [[3 - Performance (24%)/S3/1 - O que e|S3]]
- [O que é o Athena](https://docs.aws.amazon.com/athena/latest/ug/what-is.html)
