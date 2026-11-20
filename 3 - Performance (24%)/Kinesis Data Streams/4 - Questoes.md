---
tags: [saa-c03, kinesis, questoes]
servico: Amazon Kinesis Data Streams
atualizado: 2026-11-08
---

# Kinesis Data Streams — Questões

> [!question] Q1. Um stream recebe 5 MB/s e precisa ser consumido por **quatro** aplicações independentes, sem que uma atrase as outras.
> **A)** 5 shards com quatro consumidores compartilhados
> **B)** 5 shards (ou mais) com os quatro consumidores registrados em enhanced fan-out
> **C)** Data Firehose com quatro destinos
> **D)** Uma fila SQS por aplicação
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: no modo compartilhado os **2 MB/s de leitura por shard** são divididos, e a latência vai de ~200 ms (1 consumidor) para ~1.000 ms (5). O enhanced fan-out dá **2 MB/s dedicados por consumidor por shard**, com ~**70 ms**.
> > **A errada**: é exatamente o cenário de contenção a evitar.
> > **C errada**: Firehose entrega para destinos; não oferece quatro consumidores de aplicação com replay.
> > **D errada**: perderia o replay e a ordem por shard.

> [!question] Q2. Depois de corrigir um bug, o time precisa **reprocessar** os eventos das últimas 48 horas.
> **A)** SQS com DLQ redrive
> **B)** Kinesis Data Streams com retenção ≥ 48 h (até 365 dias)
> **C)** SNS com retry
> **D)** Firehose
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o Kinesis **armazena** (24 h a 365 dias), então dá para reler.
> > **A errada**: a DLQ só tem o que **falhou**.
> > **C errada**: SNS não armazena.
> > **D errada**: Firehose **entrega** e não guarda.

> [!question] Q3. Quantos shards para 8 MB/s de escrita e 12.000 registros por segundo?
> **A)** 8
> **B)** 12
> **C)** 6
> **D)** 4
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Cálculo**: escrita = 8 MB/s ÷ **1 MB/s** = 8 shards. Registros = 12.000 ÷ **1.000/s** = 12 shards. Vale o **maior**: **12**.

> [!question] Q4. Entregar um stream de logs no S3 em Parquet, com latência de até 5 minutos e **sem código**.
> **A)** Kinesis Data Streams com consumidor Lambda
> **B)** Amazon Data Firehose
> **C)** EMR com Spark Streaming
> **D)** Kinesis Data Streams com KCL
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: Firehose é gerenciado, converte formato e tem buffer de 5 MB / **300 s** por padrão no S3.
> > **A e D erradas**: funcionam, mas você escreve e opera o consumidor.

> [!question] Q5. Os registros de um mesmo dispositivo precisam ser processados **em ordem**.
> **A)** Fila FIFO do SQS
> **B)** Kinesis Data Streams com o ID do dispositivo como partition key
> **C)** SNS FIFO
> **D)** Firehose
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: a partition key manda o registro para o **mesmo shard**, e a ordem é preservada por shard.
> > **A**: também garante ordem (por message group) — é resposta válida se o cenário for **fila de trabalho**; para **stream com múltiplos consumidores e replay**, é Kinesis.

> [!question] Q6. O time já tem produtores e consumidores **Kafka** e dezenas de conectores.
> **A)** Kinesis Data Streams
> **B)** Amazon MSK
> **C)** SQS
> **D)** Firehose
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: roda *"open-source versions of Apache Kafka"* (versões open source do Apache Kafka), então funciona *"without requiring changes to application code"* (sem exigir mudanças no código da aplicação).

> [!question] Q7. Um jogo mobile envia atualizações de pontuação para um backend que publica um ranking. A solução precisa aguentar **picos intensos**, processar **na ordem recebida**, gravar num banco de **alta disponibilidade** e ter **mínima sobrecarga de gerenciamento**.
> **A)** SQS → frota EC2 com Auto Scaling → RDS MySQL
> **B)** Kinesis Data Streams → Lambda → DynamoDB
> **C)** SNS → Lambda → banco SQL num EC2
> **D)** Kinesis Data Streams → frota EC2 com Auto Scaling → DynamoDB
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: cada requisito aponta para um serviço. **Kinesis** guarda os eventos durante o pico e mantém a **ordem por shard** (partition key = `playerId`). **DynamoDB** já replica em **3 AZs**. **Lambda + DynamoDB** são serverless, então não há servidor para gerenciar.
> > **"Mas a Lambda só roda 15 min?"**: o limite vale para **cada invocação**. O *event source mapping* lê os shards, monta **lotes** e chama a função; cada lote leva milissegundos e o próximo vem em seguida. Por padrão há **uma invocação por shard por vez**, e é isso que preserva a ordem. Para escalar, aumente os shards (ou use o *parallelization factor* até 10, com a ordem mantida por partition key). Detalhes em [[2 - Resiliencia (26%)/Lambda/3 - Detalhes#5. Event source mapping|Lambda — Event source mapping]].
> > **D errada**: **funciona**, mas falha em "mínima sobrecarga". Você cuida de patches, AMIs, da aplicação KCL (que tem tabela própria de checkpoint/lease) e das políticas de Auto Scaling. E com a KCL **cada shard é lido por um único worker**: se houver mais instâncias que shards, as excedentes ficam ociosas.
> > **A errada**: SQS **padrão** não garante ordem (precisaria de FIFO), EC2 traz sobrecarga e o RDS só tem alta disponibilidade com Multi-AZ configurado.
> > **C errada**: SNS padrão **não garante ordem** e **não armazena** (não absorve pico). SQL em EC2 próprio é o oposto de alta disponibilidade com pouco gerenciamento.
> >
> > **Para memorizar**: "tempo real + ordem + picos" → **Kinesis Data Streams**. "Mínima sobrecarga" → **Lambda + DynamoDB**. Se duas opções funcionam e só uma é serverless, é a serverless.

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
| Consumidor EC2 com Auto Scaling é o padrão | Funciona, mas Lambda é a resposta quando o enunciado pede **mínima sobrecarga** |
| Lambda não serve para stream contínuo (limite de 15 min) | O limite é **por invocação**; o stream vira muitas invocações curtas em lote |

## Links

- [[3 - Performance (24%)/Kinesis Data Streams/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/Kinesis Data Streams/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/Kinesis Data Streams/3 - Detalhes|3 - Detalhes]]
