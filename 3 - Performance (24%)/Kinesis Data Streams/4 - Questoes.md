---
tags: [saa-c03, kinesis, questoes]
servico: Amazon Kinesis Data Streams
atualizado: 2026-11-08
---

# Kinesis Data Streams — Questões

> [!question]- Q1. Um stream recebe 5 MB/s e precisa ser consumido por **quatro** aplicações independentes, sem que uma atrase as outras.
> **A)** 5 shards com quatro consumidores compartilhados
> **B)** **5 shards (ou mais) com os quatro consumidores registrados em enhanced fan-out** ✅
> **C)** Data Firehose com quatro destinos
> **D)** Uma fila SQS por aplicação
>
> **Por que B**: no modo compartilhado os **2 MB/s de leitura por shard** são divididos, e a latência vai de ~200 ms (1 consumidor) para ~1.000 ms (5). O enhanced fan-out dá **2 MB/s dedicados por consumidor por shard**, com ~**70 ms**.
> **A errada**: é exatamente o cenário de contenção a evitar.
> **C errada**: Firehose entrega para destinos; não oferece quatro consumidores de aplicação com replay.
> **D errada**: perderia o replay e a ordem por shard.

> [!question]- Q2. Depois de corrigir um bug, o time precisa **reprocessar** os eventos das últimas 48 horas.
> **A)** SQS com DLQ redrive
> **B)** **Kinesis Data Streams com retenção ≥ 48 h (até 365 dias)** ✅
> **C)** SNS com retry
> **D)** Firehose
>
> **Por que B**: o Kinesis **armazena** (24 h a 365 dias), então dá para reler.
> **A errada**: a DLQ só tem o que **falhou**.
> **C errada**: SNS não armazena.
> **D errada**: Firehose **entrega** e não guarda.

> [!question]- Q3. Quantos shards para 8 MB/s de escrita e 12.000 registros por segundo?
> **A)** 8
> **B)** **12** ✅
> **C)** 6
> **D)** 4
>
> **Cálculo**: escrita = 8 MB/s ÷ **1 MB/s** = 8 shards. Registros = 12.000 ÷ **1.000/s** = 12 shards. Vale o **maior**: **12**.

> [!question]- Q4. Entregar um stream de logs no S3 em Parquet, com latência de até 5 minutos e **sem código**.
> **A)** Kinesis Data Streams com consumidor Lambda
> **B)** **Amazon Data Firehose** ✅
> **C)** EMR com Spark Streaming
> **D)** Kinesis Data Streams com KCL
>
> **Por que B**: Firehose é gerenciado, converte formato e tem buffer de 5 MB / **300 s** por padrão no S3.
> **A e D erradas**: funcionam, mas você escreve e opera o consumidor.

> [!question]- Q5. Os registros de um mesmo dispositivo precisam ser processados **em ordem**.
> **A)** Fila FIFO do SQS
> **B)** **Kinesis Data Streams com o ID do dispositivo como partition key** ✅
> **C)** SNS FIFO
> **D)** Firehose
>
> **Por que B**: a partition key manda o registro para o **mesmo shard**, e a ordem é preservada por shard.
> **A**: também garante ordem (por message group) — é resposta válida se o cenário for **fila de trabalho**; para **stream com múltiplos consumidores e replay**, é Kinesis.

> [!question]- Q6. O time já tem produtores e consumidores **Kafka** e dezenas de conectores.
> **A)** Kinesis Data Streams
> **B)** **Amazon MSK** ✅
> **C)** SQS
> **D)** Firehose
>
> **Por que B**: roda *"open-source versions of Apache Kafka"*, então funciona *"without requiring changes to application code"*.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Shard escala sozinho | Em **provisionado**, você dimensiona. **On-demand** escala |
| Leitura é 2 MB/s por consumidor | É **2 MB/s por shard, dividido** — por consumidor só com **enhanced fan-out** |
| Enhanced fan-out é só mais caro | Dá **2 MB/s dedicados** e latência de ~**70 ms** |
| Retenção máxima é 7 dias | **365 dias** (8.760 h) |
| Firehose guarda para replay | **Não armazena.** Replay é **Data Streams** |
| Kinesis é fila | É **stream**: o dado permanece e vários consumidores leem o mesmo |
| Ordem é global no stream | Ordem é **por shard** (via partition key) |
| Troca de modo é livre | **2 vezes em 24 h** |

## Links

- [[3 - Performance (24%)/Kinesis Data Streams/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/Kinesis Data Streams/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/Kinesis Data Streams/3 - Detalhes|3 - Detalhes]]
