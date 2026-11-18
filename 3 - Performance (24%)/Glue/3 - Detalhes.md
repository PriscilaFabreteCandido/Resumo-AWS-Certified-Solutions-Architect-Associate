---
tags: [saa-c03, glue, detalhes]
servico: AWS Glue
atualizado: 2026-11-08
---

# Glue — Detalhes

## 1. O Data Catalog é a peça central do data lake

Antes de ETL, o Glue resolve um problema de **metadado**: num bucket com milhões de objetos, o que é tabela, qual o schema, quais as partições?

O **Data Catalog** responde isso, e é consumido por **todos** os engines analíticos da AWS:

```
                   ┌──────────────────────┐
   Glue crawlers ──►│  GLUE DATA CATALOG  │◄── você, via DDL
                   └──────────┬───────────┘
                              │
      ┌──────────┬────────────┼────────────┬──────────────┐
   Athena   Redshift        EMR         Glue jobs     Firehose
            Spectrum                               (converte Parquet)
                              │
                     LAKE FORMATION
              (permissão fina sobre o catálogo)
```

Um catálogo, uma definição de schema, permissões num lugar só. É isso que torna "data lake" operável.

## 2. Crawlers

> *"Use AWS Glue crawlers to automatically infer schema information and integrate it into your AWS Glue Data Catalog."*

O crawler varre o S3 (ou outras fontes), detecta formato e schema, cria/atualiza a tabela e registra as **partições**. Pode rodar agendado.

É a resposta para *"descobrir automaticamente o schema de dados novos que chegam"* — sem crawler, você mantém o DDL à mão.

## 3. Jobs — Spark e Ray

Os jobs rodam sobre *"the Apache Spark–based serverless ETL engine"*, e também há **Ray**. Serverless: você define **DPUs**, não instâncias.

Formas de criar:
- **Glue Studio** — *"a graphical interface that makes it easy to create, run, and monitor data integration jobs"*
- **Script** (PySpark ou Scala)
- **DataBrew** — *"A visual data preparation tool... without writing any code"* (uma ferramenta visual de preparação de dados... sem escrever código), para limpeza e normalização

**Triggers**: agendado, on-demand ou **por evento** — o que permite encadear jobs e reagir à chegada de dados.

**Streaming ETL**: *"Clean and transform streaming data in transit"* (limpar e transformar dados de streaming em trânsito) — consome Kinesis ou MSK e transforma no caminho.

## 4. Glue × EMR — a decisão

A doc do EMR dá o critério: use EMR *"if you use custom code to process and analyze extremely large datasets with the latest big data processing frameworks such as Spark, Hadoop, Presto, or Hbase"*, e porque *"Amazon EMR gives you full control over the configuration of your clusters and the software installed on them"*.

| Pergunta | Resposta |
|---|---|
| Quero **zero** gestão de cluster? | **Glue** |
| Preciso de uma **versão específica** do Spark, ou de HBase/Presto/Hive? | **EMR** |
| Preciso de **Spot** para reduzir custo do processamento? | **EMR** (task nodes) |
| Preciso de **bibliotecas** e configuração customizadas no cluster? | **EMR** |
| É ETL rotineiro com transformações padrão? | **Glue** |
| Preciso do **catálogo**? | **Glue** (mesmo usando EMR por cima) |

Vale notar: os dois **se combinam**. O EMR pode usar o **Glue Data Catalog** como metastore.

## 5. Glue e o pipeline completo

Desenho típico de data lake que a prova usa:

```
Fontes  ──Firehose/DMS/DataSync──►  S3 (raw)
                                      │
                               GLUE CRAWLER  → Data Catalog
                                      │
                               GLUE JOB (ETL)
                              CSV → Parquet, particionado
                                      │
                                 S3 (curated)
                                      │
         ┌────────────────────────────┼────────────────────────┐
      ATHENA                     REDSHIFT                 Amazon QUICK
   (ad-hoc SQL)              (BI, via COPY ou Spectrum)   (dashboard)
                                      │
                              LAKE FORMATION
                      (permissão por coluna, linha, célula)
```

A transformação **CSV → Parquet** no job do Glue é o que torna a consulta barata depois — o skill literal do guia: *"Transforming data between formats (for example, .csv to .parquet)"* (transformar dados entre formatos (por exemplo, de .csv para .parquet)).

## 6. Lake Formation sobre o Glue

A doc do Glue descreve o Lake Formation como *"an authorization layer that provides fine-grained access control to resources in the AWS Glue Data Catalog"* (uma camada de autorização que oferece controle de acesso granular aos recursos do AWS Glue Data Catalog).

Ou seja: o **Glue** guarda o metadado; o **Lake Formation** controla **quem vê o quê** dentro dele, com granularidade de **coluna, linha e célula** — algo que IAM e bucket policy não fazem.

## Links

- [[3 - Performance (24%)/Glue/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/Glue/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/Glue/4 - Questoes|4 - Questoes]]
- [[3 - Performance (24%)/Athena/1 - O que e|Athena]] · [[3 - Performance (24%)/EMR/1 - O que e|EMR]] · [[3 - Performance (24%)/Lake Formation/1 - O que e|Lake Formation]] · [[3 - Performance (24%)/Redshift/1 - O que e|Redshift]] · [[3 - Performance (24%)/Kinesis Data Firehose/1 - O que e|Kinesis Data Firehose]] · [[3 - Performance (24%)/S3/1 - O que e|S3]] · [[4 - Custo (20%)/DMS (Database Migration Service)/1 - O que e|DMS (Database Migration Service)]]
