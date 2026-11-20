---
tags: [saa-c03, firehose, questoes]
servico: Amazon Data Firehose
atualizado: 2026-11-08
---

# Firehose — Questões

> [!question] Q1. Entregar eventos de clique num bucket S3 em **Parquet**, com latência de até 5 minutos, sem código de infraestrutura.
> **A)** Kinesis Data Streams com consumidor em Lambda
> **B)** Amazon Data Firehose com conversão para Parquet e buffer de 5 MB / 300 s
> **C)** EMR com Spark Streaming
> **D)** DataSync agendado
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"You don't need to write applications or manage resources"* (você não precisa escrever aplicações nem gerenciar recursos), converte formato nativamente, e o buffer padrão do S3 (5 MB / **300 s**) encaixa na latência.
> > **A errada**: funciona, mas você escreve e opera o consumidor.
> > **C errada**: cluster para gerenciar.
> > **D errada**: DataSync move arquivos entre storages; não consome stream.

> [!question] Q2. O requisito mudou: a latência precisa ser de **segundos**.
> **A)** Reduzir o buffer size para 1 MB
> **B)** Usar zero buffering interval
> **C)** Migrar para Kinesis Data Streams
> **D)** Aumentar o número de shards
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"you can use zero buffering interval hint... Firehose will not buffer data and will deliver data within a few seconds"* (você pode usar o hint de intervalo de buffer zero... o Firehose não faz buffer e entrega os dados em poucos segundos).
> > ⚠️ Mas note: zero buffering não vale para o **destino de backup no S3**, e intervalo abaixo de 60 s no S3 usa multipart upload, com *"some increase in S3 PUT API costs"* (algum aumento nos custos de requisições PUT do S3).
> > **C**: é a resposta se a exigência fosse **sub-segundo** ou replay.

> [!question] Q3. Depois de um bug no consumidor, o time precisa reprocessar as últimas 24 horas. O pipeline usa Firehose.
> **A)** Replay no Firehose
> **B)** Não é possível no Firehose: ele não armazena. Reprocessar a partir do destino (S3) ou pôr um Kinesis Data Stream antes dele
> **C)** Aumentar o buffer
> **D)** DLQ do Firehose
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o Firehose **entrega** e não guarda. O padrão para ter replay é **Data Streams → Firehose**.

> [!question] Q4. Carregar um stream no **Redshift** com o Firehose. O que acontece por baixo?
> **A)** Insere direto no Redshift via JDBC
> **B)** Entrega no S3 primeiro e então emite um comando `COPY`
> **C)** Usa o Glue para carregar
> **D)** Usa Redshift Spectrum
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"streaming data is delivered to your S3 bucket first. Amazon Data Firehose then issues an Amazon Redshift COPY command."* (os dados de streaming são entregues primeiro ao seu bucket S3; em seguida o Amazon Data Firehose emite um comando COPY do Amazon Redshift)

> [!question] Q5. Qual destes **não** é destino nativo do Firehose?
> **A)** Amazon OpenSearch Service
> **B)** Splunk
> **C)** Amazon SQS
> **D)** Apache Iceberg Tables
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: a lista oficial é S3, Redshift, OpenSearch (e Serverless), Splunk, Iceberg Tables, HTTP endpoint e parceiros. **SQS não está**.

> [!question] Q6. Reduzir o custo de consulta no Athena sobre os dados entregues pelo Firehose.
> **A)** Aumentar o buffer size
> **B)** Converter para Parquet e usar dynamic partitioning
> **C)** Usar zero buffering
> **D)** Comprimir com ZIP
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: Athena cobra por **TB escaneado**; colunar + particionamento atacam exatamente isso (no exemplo oficial, 3 TB de texto = US$ 15 → Parquet lendo 1 coluna = **US$ 1,25**).
> > **D errada**: compressão ajuda (GZIP 3:1 = US$ 5), mas Parquet + partição vai muito além.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Firehose é tempo real como o Data Streams | Tem **buffer** (padrão 5 MB / 300 s no S3) |
| Firehose guarda para replay | **Não armazena** |
| Firehose grava direto no Redshift | Vai ao **S3 primeiro**, depois `COPY` |
| Zero buffering funciona em qualquer destino | Não no **destino de backup no S3** |
| SQS é destino do Firehose | **Não está** na lista |
| O nome é Kinesis Data Firehose | Hoje é **Amazon Data Firehose** |
| Entrega é exactly-once | *"at-least-once"*, exceto S3, Iceberg e Snowflake |
| Buffer menor é sempre melhor | Abaixo de 60 s no S3, aumenta o custo de **PUT** |

## Links

- [[3 - Performance (24%)/Kinesis Data Firehose/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/Kinesis Data Firehose/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/Kinesis Data Firehose/3 - Detalhes|3 - Detalhes]]
