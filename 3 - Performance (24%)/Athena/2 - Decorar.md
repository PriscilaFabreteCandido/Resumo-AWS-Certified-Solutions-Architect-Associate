---
tags: [saa-c03, athena, decorar]
servico: Amazon Athena
atualizado: 2026-11-08
---

# Athena — Decorar

## Custo — os três exemplos oficiais

Partindo de **3 TB** de dados e **US$ 5/TB**:

| Cenário | Dados escaneados | Custo |
|---|---|---|
| **Texto sem compressão** | 3 TB | **US$ 15** |
| **GZIP (3:1)** | 1 TB | **US$ 5** |
| **Parquet (3:1), lendo 1 de 4 colunas** | 0,25 TB | **US$ 1,25** |

Outros preços citados: Spark **US$ 0,35 por DPU-hora**; Capacity Reservations **US$ 0,30 por DPU-hora**.
Consultas **federadas** (fora do S3): *"rounded up to the nearest megabyte with a 10 megabyte minimum per query"*.

## Particionamento

> *"restrict the amount of data scanned by each query, thus improving performance and reducing cost."*
> *"If you query a partitioned table and specify the partition in the `WHERE` clause, Athena scans the data only from that partition."* (se você consulta uma tabela particionada e indica a partição na cláusula `WHERE`, o Athena varre apenas os dados daquela partição)

**Partition projection**: *"can significantly reduce query runtimes"* (pode reduzir significativamente o tempo de execução das consultas) — útil quando há muitas partições e o `MSCK REPAIR` fica lento.

## Formatos

| Suportados | Melhor custo |
|---|---|
| CSV, JSON, Parquet, ORC | **Parquet** e **ORC** (colunar) |

A doc: *"Athena can read only the column that is relevant for the query being run."* (o Athena consegue ler apenas a coluna relevante para a consulta em execução)

## Integrações

| Com | Para quê |
|---|---|
| **AWS Glue Data Catalog** | *"Athena integrates with the AWS Glue Data Catalog"* (o Athena se integra ao AWS Glue Data Catalog) — o metadado das tabelas |
| **Glue crawlers** | Descobrem o schema automaticamente |
| **Lake Formation** | **Respeita** as permissões finas (coluna, linha, célula) |
| **Amazon Quick** | Visualização |
| **CUR** | Consultar o Cost and Usage Report |
| **Firehose** | O Firehose grava Parquet particionado; o Athena consulta |

## As citações sobre storage

> *"there are no additional storage charges for querying your data with Athena"* (não há cobrança adicional de armazenamento para consultar seus dados com o Athena)

Ou seja: você paga o **S3** pelo armazenamento e o **Athena** pelo escaneamento. Não há duplicação.

## Links

- [[3 - Performance (24%)/Athena/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/Athena/3 - Detalhes|3 - Detalhes]] · [[3 - Performance (24%)/Athena/4 - Questoes|4 - Questoes]]
