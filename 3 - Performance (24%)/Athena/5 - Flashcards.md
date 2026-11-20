---
servico: Amazon Athena
fonte: "[[3 - Performance (24%)/Athena/2 - Decorar|2 - Decorar]]"
---

# Athena — Flashcards

#flashcards/saa-c03/d3-performance/athena

Preço do Athena (consultas SQL) por volume escaneado?::**US$ 5 por TB** escaneado

Custo de consultar 3 TB em texto sem compressão no Athena?::**US$ 15** (escaneia os 3 TB)

Custo de consultar 3 TB comprimidos em GZIP (3:1) no Athena?::**US$ 5** (escaneia 1 TB)

Custo de consultar 3 TB em Parquet (3:1) lendo 1 de 4 colunas?::**US$ 1,25** (escaneia 0,25 TB)

Quais formatos dão o melhor custo no Athena, e por quê?::**Parquet** e **ORC** (colunares): o Athena lê só as colunas relevantes da consulta

Como o particionamento reduz custo no Athena?::Com a partição na cláusula **`WHERE`**, o Athena varre **só os dados daquela partição**

Recurso do Athena para muitas partições quando o `MSCK REPAIR` fica lento?::**Partition projection** (reduz bastante o tempo de execução)

Cobrança mínima de uma consulta federada (fora do S3) no Athena?::Arredondada para cima ao MB, com mínimo de **10 MB** por consulta

Preço do Athena Spark e das Capacity Reservations?::Spark **US$ 0,35/DPU-hora**; Capacity Reservations **US$ 0,30/DPU-hora**

De onde o Athena tira o metadado das tabelas?::Do **AWS Glue Data Catalog** (crawlers do Glue descobrem o schema)

O Athena respeita as permissões finas do Lake Formation?::**Sim**: permissões por **coluna, linha e célula**

O Athena cobra armazenamento adicional?::**Não**. Você paga o **S3** pelo armazenamento e o **Athena** pelo escaneamento

Combinação clássica de ingestão + consulta: quem grava Parquet particionado para o Athena consultar?::**Kinesis Data Firehose**
