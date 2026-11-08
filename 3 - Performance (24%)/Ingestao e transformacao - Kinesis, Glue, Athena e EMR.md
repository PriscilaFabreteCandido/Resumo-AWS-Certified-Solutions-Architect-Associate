---
tags: [saa-c03, dominio-3, kinesis, firehose, glue, athena, emr, lake-formation, msk]
dominio: 3
tasks: [3.5]
atualizado: 2026-11-08
---

# Ingestão e transformação — Kinesis, Firehose, Glue, Athena, EMR

## 🧩 Em 30 segundos

| Precisa de | Serviço |
|---|---|
| Ingestão em **tempo real**, múltiplos consumidores, **replay** | **Kinesis Data Streams** |
| **Entregar** stream em S3/Redshift/OpenSearch/Splunk, sem código | **Amazon Data Firehose** |
| Agregação, janela, SQL sobre stream | **Managed Service for Apache Flink** |
| App que **já usa Kafka** | **Amazon MSK** |
| ETL serverless + catálogo + crawler | **AWS Glue** |
| SQL **direto no S3**, ad-hoc, serverless | **Athena** |
| Spark/Hadoop/Hive/Presto com **controle do cluster** | **EMR** |
| Permissão **fina** (coluna, linha, célula) no data lake | **Lake Formation** |
| Dashboard / visualização | **Amazon Quick** |
| Mover TB pela rede entre storages | **DataSync** |

## 🧠 Teste-se primeiro

> [!question]- Kinesis Data Streams: números por shard
> **Escrita**: *"up to 1 MB/sec or 1,000 records/sec"* por shard.
> **Leitura**: *"up to 2 MB/sec or 2,000 records/sec"*, com **5** chamadas `GetRecords` por segundo.
> **Registro**: até **1 MiB**. `PutRecords`: até **500** registros, 10 MiB por requisição.
> **Retenção**: mínimo **24 horas**, máximo **8.760 horas (365 dias)**.
> **On-demand**: começa com 4 MB/s de escrita e 8 MB/s de leitura; escala até 10 GB/s de escrita nas regiões principais. Troca de modo: **2 vezes em 24 h**.

> [!question]- Enhanced fan-out: o que muda?
> **Consumidor compartilhado**: os 2 MB/s do shard são **divididos** entre todos. Latência média *"around 200 ms"* com 1 consumidor, *"around 1000 ms"* com 5.
> **Enhanced fan-out**: *"up to 2 MB of data per second per shard"* **por consumidor**, dedicado, por push via HTTP/2 (`SubscribeToShard`). Latência *"typically an average of 70 ms whether you have one consumer or five"*.
> Até **20** consumidores registrados por stream.

> [!question]- Data Streams × Firehose
> | | **Kinesis Data Streams** | **Amazon Data Firehose** |
> |---|---|---|
> | Latência | tempo real (*"typically less than 1 second"* do put ao get) | buffer: **1-128 MB** ou **0-900 s** (padrão 5 MB / 300 s no S3) |
> | Armazena? | **Sim**, 24 h a 365 dias — permite **replay** | Não armazena; **entrega** |
> | Consumidores | Vários, com ordem por shard, KCL, enhanced fan-out | Destinos fixos |
> | Gestão | Você dimensiona shards (ou usa on-demand) | Totalmente gerenciado, *"you don't need to write applications or manage resources"* |
> | Destinos | O que você programar | **S3 · Redshift · OpenSearch (e Serverless) · Splunk · Apache Iceberg Tables · HTTP endpoint** e parceiros (Datadog, Dynatrace, New Relic, MongoDB…) |
>
> **A primeira condição satisfeita dispara a entrega** (tamanho **ou** intervalo). Buffer de **0 s** entrega *"within a few seconds"*. Para Redshift, o caminho é **S3 primeiro, depois COPY**.

> [!question]- Athena × EMR × Redshift Spectrum
> **Athena**: *"serverless, so there is no infrastructure to set up or manage, and you pay only for the queries you run"*. Consulta S3 com SQL padrão. Formatos: CSV, JSON, **Parquet**, **ORC**. Integra com o **Glue Data Catalog**.
> **EMR**: *"if you use custom code to process and analyze extremely large datasets with the latest big data processing frameworks such as Spark, Hadoop, Presto, or Hbase"*, e *"gives you full control over the configuration of your clusters"*.
> **Redshift Spectrum**: feature do **Redshift** para alcançar o S3 sem carregar. Precisa de cluster (ou Serverless).

> [!question]- Como reduzir o custo do Athena?
> Athena cobra por **TB escaneado** (o exemplo oficial usa **US$ 5/TB**). Três alavancas, com os números do próprio exemplo da AWS:
> 1. **Compressão**: 3 TB de texto = US$ 15 → GZIP a 3:1 = 1 TB = **US$ 5**
> 2. **Formato colunar**: Parquet a 3:1, lendo **1 de 4 colunas** = 0,25 TB = **US$ 1,25** (*"Athena can read only the column that is relevant for the query"*)
> 3. **Particionamento**: *"restrict the amount of data scanned by each query, thus improving performance and reducing cost"* — com a partição no `WHERE`, *"Athena scans the data only from that partition"*
>
> É o cenário por trás do skill oficial *"Transforming data between formats (for example, .csv to .parquet)"*.

## Glue e Lake Formation

| Componente | O que é |
|---|---|
| **AWS Glue** | *"a serverless data integration service"*. Conecta a *"more than 70 diverse data sources"* |
| **Glue Data Catalog** | Catálogo central de metadados — usado por **Athena, EMR, Redshift Spectrum, Lake Formation** |
| **Crawler** | *"automatically infer schema information and integrate it into your AWS Glue Data Catalog"* |
| **Glue Studio** | Interface gráfica para criar jobs, sobre o engine *"Apache Spark–based serverless ETL"*. Engines: **Spark** ou **Ray** |
| **Glue DataBrew** | *"A visual data preparation tool... without writing any code"* |
| **Triggers** | Agendado, on-demand ou **por evento** |
| **Lake Formation** | Adiciona **permissão fina**: *"granular controls at the column, row, and cell-levels"*, com grant/revoke e **LF-Tags** (tag-based access control). *"provides its own permissions model that augments the IAM permissions model"* |

Engines que respeitam as permissões do Lake Formation: **Athena, Amazon Quick, Redshift Spectrum, EMR e Glue**.

> [!tip] Glue × EMR, o divisor
> **Glue** quando o enunciado diz "serverless", "sem gerenciar cluster", "catalogar automaticamente", "ETL simples".
> **EMR** quando diz "código Spark customizado", "framework específico", "controle da configuração do cluster", "usar Spot para reduzir custo do processamento".

## EMR

- Frameworks: **Hadoop, Spark, Hive, Pig, Presto, HBase**.
- **Cluster transiente**: *"If you configure your cluster to be automatically terminated, it is terminated after all the steps complete"* — padrão para job em lote.
- Storage: **HDFS** (dado que não sobrevive ao cluster) ou **EMRFS** (*"uses S3 as a data layer... so that you can separate your compute and storage"*).
- **Spot**: *"Spot Instances can offer significant savings—as low as a tenth of on-demand pricing in some cases"*, e a doc recomenda *"use On-Demand Instances in one group for guaranteed processing power together with Spot Instances in another group"*.

> [!important] O padrão de prova para custo no EMR
> **Master e core nodes** em On-Demand (ou Reserved), **task nodes** em **Spot**. Core node guarda HDFS; perder um core node por interrupção de Spot arrisca o dado. Task node só processa — é o lugar certo para o Spot.

## MSK

- *"a fully managed service that enables you to build and run applications that use Apache Kafka"*, rodando *"open-source versions of Apache Kafka"*, então as aplicações funcionam *"without requiring changes to application code"*.
- Modos: **MSK Provisioned** (brokers Standard ou Express) e **MSK Serverless**.
- Extras: **MSK Connect**, **MSK Replicator**.
- **Gatilho de prova**: o enunciado nomeia **Kafka** ou diz "migrar sem alterar o código da aplicação" → **MSK**. Aplicação nova de streaming na AWS → **Kinesis**.

## ❓ Questões de prova

> [!example]- Q1 — Um stream recebe 5 MB/s e precisa ser consumido por **quatro** aplicações independentes, cada uma sem atrasar as outras. Qual configuração?
> **A)** 5 shards com quatro consumidores compartilhados
> **B)** **5 shards (ou mais) com os quatro consumidores registrados em enhanced fan-out** ✅
> **C)** Data Firehose com quatro destinos
> **D)** Uma fila SQS por aplicação
>
> **Por que B**: no modo compartilhado, os 2 MB/s de leitura por shard são divididos e a latência sobe (*"around 1000 ms"* com 5 consumidores). Enhanced fan-out dá **2 MB/s dedicados por consumidor por shard**, com ~70 ms.
> **A errada**: é exatamente o cenário de contenção que o enunciado quer evitar.
> **C errada**: Firehose entrega para destinos, não oferece quatro consumidores de aplicação com replay.
> **D errada**: perderia o replay e a ordem por shard; precisaria de um produtor que publica em quatro filas.

> [!example]- Q2 — Logs em CSV no S3 somam 3 TB por mês e são consultados ad-hoc com SQL. A conta do Athena está alta. O que reduz o custo com o menor esforço?
> **A)** Migrar para Redshift
> **B)** **Converter para Parquet comprimido e particionar por data** ✅
> **C)** Usar EMR com Spark
> **D)** Reduzir a retenção dos logs
>
> **Por que B**: é a alavanca direta — colunar + compressão + partição ataca o **TB escaneado**, que é a base da cobrança. No exemplo da própria AWS, 3 TB de texto (US$ 15) vira US$ 1,25 em Parquet lendo uma coluna.
> **A errada**: traz cluster para gerenciar e custo fixo, para consulta **ad-hoc**.
> **C errada**: EMR é mais esforço operacional, não menos.
> **D errada**: perde dado — não é otimização, é redução de escopo.

> [!example]- Q3 — Um pipeline precisa entregar eventos de clique em um bucket S3 em formato Parquet, com latência de até 5 minutos, sem código de infraestrutura. Qual serviço?
> **A)** Kinesis Data Streams com consumidor em Lambda
> **B)** **Amazon Data Firehose com transformação para Parquet e buffer de 5 MB / 300 s** ✅
> **C)** EMR com Spark Streaming
> **D)** DataSync agendado
>
> **Por que B**: Firehose é *"a fully managed service for delivering real-time streaming data"*, converte formato antes de entregar, e o buffer padrão de S3 (5 MB / **300 s**) encaixa na latência pedida.
> **A errada**: funciona, mas você escreve e opera o consumidor — mais esforço.
> **C errada**: cluster para gerenciar.
> **D errada**: DataSync move arquivos entre storages; não consome stream.

> [!example]- Q4 — Um data lake no S3 precisa que analistas de um time vejam só **algumas colunas** de uma tabela, com a permissão valendo no Athena e no Redshift Spectrum. Qual serviço?
> **A)** Bucket policy por prefixo
> **B)** **AWS Lake Formation com permissão em nível de coluna** ✅
> **C)** IAM policy com condição de tag
> **D)** Glue Data Catalog com resource policy
>
> **Por que B**: Lake Formation é o que dá *"granular controls at the column, row, and cell-levels"*, e é respeitado por **Athena, Amazon Quick, Redshift Spectrum, EMR e Glue**.
> **A errada**: S3 controla **objeto/prefixo**, não coluna.
> **C errada**: IAM não entende esquema de tabela.
> **D errada**: o catálogo guarda metadado; a camada de autorização fina é o Lake Formation.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Firehose é tempo real como o Data Streams | Tem **buffer** (padrão 5 MB / 300 s no S3). Com 0 s, entrega *"within a few seconds"* |
| Firehose guarda os dados para replay | Não armazena. Replay é **Data Streams** (retenção de 24 h a 365 dias) |
| Shard de Kinesis escala sozinho | Em modo **provisionado**, você dimensiona. **On-demand** escala |
| Enhanced fan-out é só mais caro | Dá **2 MB/s dedicados por consumidor** e ~70 ms de latência |
| Athena precisa carregar os dados | Consulta o **S3 direto** |
| Athena cobra por consulta | Cobra por **TB escaneado** |
| Redshift Spectrum dispensa cluster | É feature do **Redshift** |
| Glue e EMR fazem a mesma coisa | Glue é **serverless**; EMR dá **controle do cluster** |
| Lake Formation substitui o IAM | *"augments the IAM permissions model"* |
| MSK é para app novo | É para quem **já usa Kafka** |
| Spot em qualquer nó do EMR | **Task nodes** sim. Core node guarda HDFS |
| DataSync serve para streaming | Serve para **transferência de arquivo/objeto** entre storages |

## Links

- [[03 - Dominio 3 - Design High-Performing Architectures (24%)]]
- [[Bancos de alta performance - DynamoDB, DAX, ElastiCache e Redshift]]
- [[Migracao e hibrido - 7 Rs, Snow, DataSync, Storage Gateway e DMS]]
- [[Desacoplamento - SQS, SNS e EventBridge]]
- [Quotas do Kinesis Data Streams](https://docs.aws.amazon.com/streams/latest/dev/service-sizes-and-limits.html)
- [O que é o AWS Glue](https://docs.aws.amazon.com/glue/latest/dg/what-is-glue.html)
