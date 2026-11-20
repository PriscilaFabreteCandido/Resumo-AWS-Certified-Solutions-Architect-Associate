---
servico: Amazon Data Firehose
fonte: "[[3 - Performance (24%)/Kinesis Data Firehose/2 - Decorar|2 - Decorar]]"
---

# Kinesis Data Firehose — Flashcards

#flashcards/saa-c03/d3-performance/kinesis-data-firehose

Buffer size padrão e faixa do Firehose para destino S3?::Padrão **5 MB**; faixa **1 a 128 MB**

Buffer interval padrão e faixa do Firehose para destino S3?::Padrão **300 s**; faixa **0 a 900 s**

Buffer interval padrão do Firehose para Splunk e HTTP endpoint?::**60 s**

Com buffer de tamanho e de tempo configurados, quando o Firehose entrega?::Na **primeira** condição de buffer satisfeita

Como obter a menor latência no Firehose, e quanto fica?::**Zero buffering** (intervalo 0); entrega em **poucos segundos**

Onde o zero buffering do Firehose não está disponível?::No destino de **backup no S3**; e é **incompatível** com dynamic partitioning

Efeito de intervalo abaixo de 60 s com destino S3 no Firehose?::Usa **multipart upload**: aumenta o custo de **PUT** no S3

Tamanho máximo de registro no Firehose?::**1.000 KB**

Semântica de entrega do Firehose?::**At-least-once** (duplicatas possíveis, exceto em S3, Iceberg e Snowflake)

Conversão de formato que o Firehose faz e de onde vem o schema?::JSON → **Parquet** ou **ORC**, com schema do **Glue Data Catalog**

Como transformar registros no Firehose antes da entrega?::Com uma função **Lambda**

Recurso do Firehose que particiona no S3 por valor do dado (ano/mes/dia)?::**Dynamic partitioning**

Fontes de dados do Firehose?::**Direct PUT**, **Kinesis Data Stream**, **Amazon MSK** e CloudWatch Logs (subscription filter)

Compressões suportadas pelo Firehose?::**GZIP, Snappy, ZIP**
