---
tags: [saa-c03, kinesis, streaming]
servico: Amazon Kinesis Data Streams
tipo: Stream de dados em tempo real
dominios: [3]
atualizado: 2026-11-08
---

# Kinesis Data Streams — O que é

> [!info] Em uma frase
> Stream durável para **coletar e processar grandes volumes de dados em tempo real**, com **múltiplos consumidores** lendo o mesmo dado e **replay** por até **365 dias**.

## Definição oficial

> *"collect and process large streams of data records in real time."*

E a latência: *"the put-to-get delay is typically less than 1 second"*.

## As três coisas que só ele faz

| Capacidade | Por quê importa |
|---|---|
| **Múltiplos consumidores** | *"Multiple Kinesis Data Streams applications can consume data from a stream"* — cada um no seu ritmo |
| **Replay** | Retenção de **24 h a 365 dias**: dá para reprocessar |
| **Ordem por shard** | Registros com a mesma partition key mantêm a ordem |

## Streams × Firehose — a comparação central

| | **Kinesis Data Streams** | **Amazon Data Firehose** |
|---|---|---|
| Latência | **Tempo real** (< 1 s) | **Buffer** (padrão 5 MB / 300 s no S3) |
| Armazena? | **Sim**, 24 h a 365 dias — **replay** | **Não** — entrega |
| Consumidores | **Vários**, com enhanced fan-out | Destinos fixos |
| Você gerencia | **Shards** (ou on-demand) | Nada |

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[Kinesis Data Firehose]] · [[Lambda]] · [[SQS]] · [[Mensageria gerenciada (Amazon MQ e MSK)]]
- [Introdução ao Kinesis Data Streams](https://docs.aws.amazon.com/streams/latest/dev/introduction.html)
