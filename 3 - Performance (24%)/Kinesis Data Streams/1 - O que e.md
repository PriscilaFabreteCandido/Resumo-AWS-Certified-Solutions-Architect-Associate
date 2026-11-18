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

> *"collect and process large streams of data records in real time."* (coletar e processar grandes fluxos de registros de dados em tempo real)

E a latência: *"the put-to-get delay is typically less than 1 second"* (o atraso entre gravar e ler costuma ser inferior a 1 segundo).

## As três coisas que só ele faz

| Capacidade | Por quê importa |
|---|---|
| **Múltiplos consumidores** | *"Multiple Kinesis Data Streams applications can consume data from a stream"* (várias aplicações do Kinesis Data Streams podem consumir dados do mesmo stream) — cada um no seu ritmo |
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

- [[3 - Performance (24%)/Kinesis Data Streams/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/Kinesis Data Streams/3 - Detalhes|3 - Detalhes]] · [[3 - Performance (24%)/Kinesis Data Streams/4 - Questoes|4 - Questoes]]
- [[3 - Performance (24%)/Kinesis Data Firehose/1 - O que e|Kinesis Data Firehose]] · [[2 - Resiliencia (26%)/Lambda/1 - O que e|Lambda]] · [[2 - Resiliencia (26%)/SQS/1 - O que e|SQS]] · [[2 - Resiliencia (26%)/Mensageria gerenciada (Amazon MQ e MSK)/1 - O que e|Mensageria gerenciada (Amazon MQ e MSK)]]
- [Introdução ao Kinesis Data Streams](https://docs.aws.amazon.com/streams/latest/dev/introduction.html)
