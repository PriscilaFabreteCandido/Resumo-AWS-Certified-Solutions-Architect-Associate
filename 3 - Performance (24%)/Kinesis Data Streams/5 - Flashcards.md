---
servico: Amazon Kinesis Data Streams
fonte: "[[3 - Performance (24%)/Kinesis Data Streams/2 - Decorar|2 - Decorar]]"
---

# Kinesis Data Streams — Flashcards

#flashcards/saa-c03/d3-performance/kinesis-data-streams

Limite de escrita por shard no Kinesis Data Streams?::**1 MB/s** ou **1.000 registros/s**

Limite de leitura por shard (consumidor compartilhado)?::**2 MB/s** ou **2.000 registros/s**, dividido entre todos os consumidores

Quantas chamadas GetRecords por segundo por shard?::Até **5** transações de leitura/s

Limite de uma chamada PutRecords?::Até **500** registros e **10 MiB** por requisição

Tamanho máximo de registro no Kinesis Data Streams?::**1 MiB**

Retenção mínima e máxima do Kinesis Data Streams?::Mínimo **24 horas**; máximo **365 dias** (8.760 h)

Throughput do enhanced fan-out?::**2 MB/s por shard por consumidor**

Latência média do consumidor compartilhado × enhanced fan-out?::Compartilhado **~200 ms** (~1000 ms com 5 consumidores); enhanced fan-out **~70 ms**

Modelo de entrega do enhanced fan-out?::**Push** via HTTP/2 (`SubscribeToShard`)

Quantos consumidores enhanced fan-out por stream?::**20** (50 com On-demand Advantage em regiões selecionadas)

Capacidade inicial do modo on-demand do Kinesis Data Streams?::**4 MB/s** de escrita e **8 MB/s** de leitura

Quantas vezes dá para trocar de modo de capacidade?::**2 vezes em 24 horas**

Tempo real, múltiplos consumidores e replay: qual serviço?::**Kinesis Data Streams**

Agregação por janela ou SQL sobre stream: qual serviço?::**Managed Service for Apache Flink**

Aplicação que já usa Kafka: qual serviço?::**Amazon MSK**
