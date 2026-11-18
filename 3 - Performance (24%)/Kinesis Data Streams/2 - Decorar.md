---
tags: [saa-c03, kinesis, decorar]
servico: Amazon Kinesis Data Streams
atualizado: 2026-11-08
---

# Kinesis Data Streams — Decorar

## Os números por shard

| Operação | Limite |
|---|---|
| **Escrita** | *"up to 1 MB/sec or 1,000 records/sec"* |
| **Leitura** | *"up to 2 MB/sec or 2,000 records/sec"* |
| `GetRecords` | *"up to five read transactions per second"*; máx. 10.000 registros e 10 MB por chamada |
| `PutRecords` | até **500** registros, **10 MiB** por requisição |
| **Registro máximo** | **1 MiB** (a doc também cita *"up to 10 MiB"* como limite de requisição) |

## Retenção

| Item | Valor |
|---|---|
| **Mínimo** | **24 horas** |
| **Máximo** | **8.760 horas = 365 dias** |

## Enhanced fan-out × consumidor compartilhado

| | **Compartilhado** | **Enhanced fan-out** |
|---|---|---|
| Throughput | *"Fixed at a total of 2 MB/sec per shard"* **dividido** entre todos | *"up to 2 MB of data per second per shard"* **por consumidor** |
| Latência (1 consumidor) | *"An average of around 200 ms"* (uma média de cerca de 200 ms) | *"Typically an average of 70 ms"* |
| Latência (5 consumidores) | *"around 1000 ms"* (cerca de 1000 ms) | *"70 ms whether you have one consumer or five"* |
| Entrega | Pull (`GetRecords`) | **Push** via HTTP/2 (`SubscribeToShard`) |
| Consumidores registrados | — | **20** por stream (50 com On-demand Advantage em regiões selecionadas) |

## Modos de capacidade

| Modo | Detalhe |
|---|---|
| **Provisionado** | Você define o número de **shards**. Cota de conta: **20.000** shards em us-east-1, us-west-2, eu-west-1; **1.000 ou 6.000** nas demais |
| **On-demand** | Começa com **4 MB/s de escrita** e **8 MB/s de leitura**; escala até **10 GB/s de escrita** e **20 GB/s de leitura** nas três regiões principais (200/400 MB/s nas outras). **50** streams por conta |

Troca de modo: **2 vezes em 24 horas**.

## Kinesis × as alternativas

| Enunciado | Resposta |
|---|---|
| Tempo real, **múltiplos consumidores**, **replay** | **Kinesis Data Streams** |
| **Entregar** em S3/Redshift/OpenSearch/Splunk, sem código | **Data Firehose** |
| Agregação, janela, SQL sobre stream | **Managed Service for Apache Flink** |
| App que já usa **Kafka** | **Amazon MSK** |
| Fila, 1 consumidor por mensagem | **SQS** |
| Fan-out push para e-mail/SMS/HTTP | **SNS** |

## Links

- [[3 - Performance (24%)/Kinesis Data Streams/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/Kinesis Data Streams/3 - Detalhes|3 - Detalhes]] · [[3 - Performance (24%)/Kinesis Data Streams/4 - Questoes|4 - Questoes]]
- [[02 - Numeros para decorar]]
