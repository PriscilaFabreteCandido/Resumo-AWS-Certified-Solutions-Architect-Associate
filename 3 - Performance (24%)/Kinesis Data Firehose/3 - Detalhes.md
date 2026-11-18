---
tags: [saa-c03, firehose, detalhes]
servico: Amazon Data Firehose
atualizado: 2026-11-08
---

# Firehose — Detalhes

## 1. O que o buffer significa

O Firehose acumula registros até atingir **tamanho** ou **tempo** — *"The first buffer condition that is satisfied triggers Firehose to deliver the data"* (a primeira condição de buffer satisfeita faz o Firehose entregar os dados) — e então entrega em lote.

Para S3: **1-128 MB** (padrão **5 MB**) e **0-900 s** (padrão **300 s**). Ou seja, com a configuração padrão, o dado chega no S3 em **até 5 minutos**.

Isso é a diferença essencial com o **Kinesis Data Streams** (put-to-get *"typically less than 1 second"* (normalmente menos de 1 segundo)): o Firehose é **near-real-time** por desenho.

Para baixar a latência, existe o **zero buffering**: *"Firehose will not buffer data and will deliver data within a few seconds"* (o Firehose não faz buffer dos dados e os entrega em poucos segundos). Mas há duas ressalvas documentadas:
- *"only available for the application destinations and is not available for Amazon S3 backup destination"* (disponível apenas para os destinos de aplicação, não para o destino de backup no Amazon S3)
- Com intervalo menor que 60 s no S3, usa **multipart upload** e *"you will see some increase in S3 PUT API costs"* (você verá algum aumento nos custos de requisições PUT do S3)

## 2. Transformação — o que o Firehose faz por você

| Recurso | Para quê |
|---|---|
| **Conversão de formato** | JSON → **Parquet** ou **ORC**, usando o schema do **Glue Data Catalog** |
| **Compressão** | GZIP, Snappy, ZIP |
| **Transformação Lambda** | Enriquecer, filtrar, mascarar antes da entrega |
| **Dynamic partitioning** | Gravar no S3 particionado por valor do dado (`year=/month=/day=`) |
| **Backup no S3** | Guardar os originais, ou só os que falharam |

A conversão para **Parquet** com **particionamento** é o que torna o dado barato de consultar depois: no exemplo oficial de preço do Athena, 3 TB de texto (US$ 15) vira **US$ 1,25** em Parquet lendo uma coluna.

Esse é exatamente o skill do guia: *"Transforming data between formats (for example, .csv to .parquet)"* (transformar dados entre formatos (por exemplo, de .csv para .parquet)).

## 3. O caminho para o Redshift

> *"streaming data is delivered to your S3 bucket first. Amazon Data Firehose then issues an Amazon Redshift COPY command."* (os dados de streaming são entregues primeiro ao seu bucket S3; em seguida o Amazon Data Firehose emite um comando COPY do Amazon Redshift)

Importa porque explica dois efeitos: há um bucket S3 **intermediário** (que você configura), e a carga no Redshift usa `COPY` (a forma eficiente, paralela entre slices).

## 4. Semântica de entrega

> *"uses at-least-once semantics"* (usa semântica de pelo menos uma entrega) — duplicatas são possíveis, **exceto** nos destinos **S3**, **Iceberg** e **Snowflake**.

Para HTTP endpoints e OpenSearch, o consumidor precisa tolerar duplicata.

## 5. Firehose × Data Streams — como escolher

| Pergunta | Resposta |
|---|---|
| Preciso de **replay** / reprocessar? | **Data Streams** (retenção até 365 dias) |
| Preciso de **múltiplos consumidores** independentes? | **Data Streams** (+ enhanced fan-out) |
| Preciso de latência **sub-segundo**? | **Data Streams** |
| Só preciso **entregar** em S3/Redshift/OpenSearch/Splunk? | **Firehose** |
| Quero **zero** gestão de infraestrutura? | **Firehose** |
| Quero converter para **Parquet** sem código? | **Firehose** |

E eles **combinam**: o Firehose pode **consumir** um Kinesis Data Stream. Padrão comum:

```
Produtores → KINESIS DATA STREAMS ─┬→ Lambda (tempo real, alerta)
                                    ├→ Flink (agregação)
                                    └→ FIREHOSE → S3 (Parquet) → Athena
```

Assim você tem tempo real **e** arquivamento barato, com replay garantido pelo stream.

## 6. Onde o Firehose é a resposta

| Enunciado | Por quê |
|---|---|
| "entregar logs no S3 em Parquet, sem código" | Conversão nativa + buffer |
| "carregar stream no Redshift" | `COPY` automático via S3 |
| "indexar stream no OpenSearch" | Destino nativo |
| "mandar para o Splunk" | Destino nativo |
| "near real-time, até 5 minutos" | Buffer padrão de 300 s |
| "latência de segundos" | **Zero buffering** |
| "preciso reprocessar depois" | **Não é Firehose** — é Data Streams |

## Links

- [[3 - Performance (24%)/Kinesis Data Firehose/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/Kinesis Data Firehose/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/Kinesis Data Firehose/4 - Questoes|4 - Questoes]]
- [[3 - Performance (24%)/Kinesis Data Streams/1 - O que e|Kinesis Data Streams]] · [[3 - Performance (24%)/S3/1 - O que e|S3]] · [[3 - Performance (24%)/Redshift/1 - O que e|Redshift]] · [[3 - Performance (24%)/OpenSearch Service/1 - O que e|OpenSearch Service]] · [[3 - Performance (24%)/Glue/1 - O que e|Glue]] · [[3 - Performance (24%)/Athena/1 - O que e|Athena]] · [[2 - Resiliencia (26%)/Lambda/1 - O que e|Lambda]]
