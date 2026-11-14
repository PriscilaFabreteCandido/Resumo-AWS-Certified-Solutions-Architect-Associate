---
tags: [saa-c03, firehose, decorar]
servico: Amazon Data Firehose
atualizado: 2026-11-08
---

# Firehose — Decorar

## Buffer por destino (tabela oficial)

| Destino | Buffer size (MB) | Intervalo (s) |
|---|---|---|
| **Amazon S3** | **1-128** (padrão **5**) | **0-900** (padrão **300**) |
| Apache Iceberg Tables | 1-128 (5) | 0-900 (300) |
| **Amazon Redshift** | 1-128 (5) | 0-900 (300) |
| OpenSearch / OpenSearch Serverless | 1-100 (5) | 0-900 (300) |
| **Splunk** | 1-5 (5) | 0-60 (**60**) |
| HTTP endpoint | 1-64 (5) | 0-900 (**60**) |
| Snowflake | 1-128 (**1**) | 0-900 (**0**) |

**Regra**: *"The first buffer condition that is satisfied triggers Firehose to deliver the data."*

## Latência mínima

> *"To meet lower latencies of real-time use cases, you can use zero buffering interval hint... Firehose will not buffer data and will deliver data within a few seconds."*

⚠️ Zero buffering *"is only available for the application destinations and is not available for Amazon S3 backup destination"*.
⚠️ Para S3 com intervalo **menor que 60 s**, o Firehose usa **multipart upload** — *"you will see some increase in S3 PUT API costs"*.

## Outros números

| Item | Valor |
|---|---|
| **Registro máximo** | *"as large as 1,000 KB"* |
| Semântica | *"at-least-once"* — duplicatas possíveis, **exceto** em S3, Iceberg e Snowflake |
| Buffer hints | aplicam-se *"on a shard or partition level"* |
| Dynamic partitioning | usa nível de stream/tópico; **incompatível** com zero buffering |

## O que ele faz além de entregar

| Recurso | Detalhe |
|---|---|
| **Conversão de formato** | JSON → **Parquet** ou **ORC** (usando o schema do **Glue Data Catalog**) |
| **Compressão** | GZIP, Snappy, ZIP |
| **Transformação** | **Lambda** antes da entrega |
| **Dynamic partitioning** | Particiona no S3 por valor do dado (`ano/mes/dia`) |
| **Criptografia** | KMS |
| **Backup no S3** | Guarda os registros originais (ou só os que falharam) |

## Fontes

| Fonte |
|---|
| **Direct PUT** (SDK, agente) |
| **Kinesis Data Stream** existente |
| **Amazon MSK** |
| CloudWatch Logs (via subscription filter) |

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
