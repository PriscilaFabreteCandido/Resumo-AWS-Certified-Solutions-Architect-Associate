---
tags: [saa-c03, kinesis, detalhes]
servico: Amazon Kinesis Data Streams
atualizado: 2026-11-08
---

# Kinesis Data Streams — Detalhes

## 1. Shards — a unidade de capacidade

Um **shard** entrega **1 MB/s ou 1.000 registros/s de escrita** e **2 MB/s ou 2.000 registros/s de leitura**. Para dobrar a capacidade, você dobra os shards.

A **partition key** determina em qual shard o registro cai — e é o que garante **ordem**: registros com a mesma partition key vão para o mesmo shard e são lidos em ordem. Partition key mal escolhida cria **hot shard** (um shard recebendo a maior parte do tráfego).

No modo **on-demand**, a AWS gerencia os shards: começa com **4 MB/s de escrita** e escala até **10 GB/s** nas regiões principais.

## 2. O gargalo de leitura — e o enhanced fan-out

No modo **compartilhado**, os **2 MB/s de leitura por shard** são **divididos** entre todos os consumidores. Com 4 aplicações lendo o mesmo stream, cada uma fica com ~500 KB/s — e a latência sobe: *"An average of around 200 ms"* com um consumidor, *"around 1000 ms"* com cinco.

O **enhanced fan-out** resolve: *"it gets its own 2 MB/sec allotment of read throughput"* — cada consumidor registrado recebe **2 MB/s dedicados por shard**, com entrega **push** via HTTP/2 (`SubscribeToShard`) e latência *"typically an average of 70 ms whether you have one consumer or five"*.

Limite: **20** consumidores registrados por stream (50 com On-demand Advantage em us-east-1, us-west-2 e eu-west-1).

> [!important] O gatilho de prova
> *"N aplicações independentes precisam processar o mesmo stream sem atrasar umas às outras"* → **enhanced fan-out**.

## 3. Retenção e replay

Retenção de **24 horas** (mínimo) a **8.760 horas / 365 dias** (máximo).

Isso é o que distingue o Kinesis do SQS e do SNS: o dado **permanece** depois de lido. Consequências:

- **Reprocessar** depois de corrigir um bug no consumidor
- **Adicionar** um consumidor novo que começa do início
- **Auditar** o que foi recebido

Nem SQS (a mensagem é apagada) nem SNS (não armazena) fazem isso. O **EventBridge** tem archive e replay, mas é barramento com regras, não stream particionado.

## 4. Produtores e consumidores

| Lado | Opções |
|---|---|
| **Produtores** | SDK (`PutRecord`, `PutRecords`), **KPL** (Kinesis Producer Library), **Kinesis Agent**, CloudWatch Logs subscription, IoT, Firehose |
| **Consumidores** | **KCL** (Kinesis Client Library), **Lambda** (event source mapping), **Managed Service for Apache Flink**, **Firehose**, aplicação própria |

A **KCL** cuida de checkpoint, balanceamento entre shards e tratamento de resharding — por isso é a forma recomendada de escrever consumidor próprio.

Com **Lambda**, o event source mapping mantém **um processador por shard** (ou mais, com paralelização) e preserva a **ordem por shard**.

## 5. Kinesis Data Streams × Firehose

| Critério | **Data Streams** | **Firehose** |
|---|---|---|
| Latência | **< 1 s** (put-to-get) | Buffer: 1-128 MB ou 0-900 s |
| Armazena / replay | **Sim** (24 h-365 dias) | **Não** |
| Consumidores | Vários (+ enhanced fan-out) | Destinos fixos |
| Transformação | Você escreve | Nativa (Lambda, formato) |
| Gestão | Shards (ou on-demand) | **Nenhuma** |
| Use quando | Tempo real, múltiplos consumidores, replay | Só **entregar** em S3/Redshift/OpenSearch/Splunk |

E eles **se combinam**: o Firehose pode **consumir** um Kinesis Data Stream e entregá-lo num destino — padrão comum quando você quer tempo real para uns consumidores e arquivamento no S3 para outros.

## 6. MSK × Kinesis

A doc do MSK **não** compara os dois. O critério prático:

| Pergunta | Resposta |
|---|---|
| O time já tem código **Kafka**? | **MSK** |
| Precisa de Kafka Connect / Streams? | **MSK** |
| Quer portabilidade multi-nuvem? | **MSK** |
| Stream **novo** com menor esforço operacional? | **Kinesis** |
| Integração nativa com Firehose, Lambda, Flink? | **Kinesis** |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[Kinesis Data Firehose]] · [[Lambda]] · [[SQS]] · [[SNS]] · [[EventBridge]] · [[Mensageria gerenciada (Amazon MQ e MSK)]]
- [Enhanced fan-out](https://docs.aws.amazon.com/streams/latest/dev/enhanced-consumers.html)
