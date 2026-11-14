---
tags: [saa-c03, firehose, streaming]
servico: Amazon Data Firehose
tipo: Entrega de stream
dominios: [3]
atualizado: 2026-11-08
---

# Amazon Data Firehose — O que é

> [!info] Em uma frase
> *"a fully managed service for delivering real-time streaming data"* a destinos como S3, Redshift, OpenSearch e Splunk — **sem escrever código** e **sem gerenciar recursos**.

## Definição oficial

> *"You don't need to write applications or manage resources."*

E ele pode **transformar** os dados antes de entregar (formato, compressão, Lambda).

> [!note] Mudou de nome
> Era **Kinesis Data Firehose**; hoje a doc o chama de **Amazon Data Firehose**. Material antigo usa o nome anterior.

## Os destinos (lista oficial)

| Destino |
|---|
| **Amazon S3** |
| **Amazon Redshift** |
| **Amazon OpenSearch Service** e **OpenSearch Serverless** |
| **Splunk** |
| **Apache Iceberg Tables** |
| **HTTP endpoint** customizado |
| Parceiros: Datadog, Dynatrace, LogicMonitor, MongoDB, New Relic, Coralogix, Elastic |

⚠️ Para **Redshift**: *"streaming data is delivered to your S3 bucket first. Amazon Data Firehose then issues an Amazon Redshift COPY command."*

## Streams × Firehose

| | **Kinesis Data Streams** | **Firehose** |
|---|---|---|
| Latência | tempo real (< 1 s) | **buffer** (padrão 5 MB / 300 s no S3) |
| Armazena / replay | **Sim** (24 h-365 dias) | **Não** |
| Consumidores | vários | destinos fixos |
| Gestão | shards | **nenhuma** |

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[Kinesis Data Streams]] · [[S3]] · [[Redshift]] · [[OpenSearch Service]] · [[Glue]]
- [O que é o Amazon Data Firehose](https://docs.aws.amazon.com/firehose/latest/dev/what-is-this-service.html)
