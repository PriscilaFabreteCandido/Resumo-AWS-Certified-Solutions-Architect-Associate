---
servico: AWS Glue
fonte: "[[3 - Performance (24%)/Glue/2 - Decorar|2 - Decorar]]"
---

# Glue — Flashcards

#flashcards/saa-c03/d3-performance/glue

Componente do Glue que guarda o metadado central (tabelas, schemas, partições)?::**Glue Data Catalog**

Componente do Glue que descobre schema e partições automaticamente?::**Crawler**

Engines dos jobs de ETL do Glue?::**Spark** ou **Ray**, serverless

Preparar dados visualmente, sem escrever código: qual ferramenta?::**Glue DataBrew**

Interface gráfica para criar e monitorar jobs do Glue?::**Glue Studio**

Tipos de trigger de job no Glue?::**Agendado**, **on-demand** ou **por evento**

Recurso do Glue que transforma dado em trânsito?::**Streaming ETL**

Quais serviços consomem o Glue Data Catalog?::**Athena**, **Redshift Spectrum**, **EMR** (metastore), **Lake Formation** e **Firehose**

Para que o Firehose usa o Glue Data Catalog?::Usa o schema para converter em **Parquet/ORC**

Qual serviço adiciona permissão por coluna/linha sobre o Data Catalog?::**Lake Formation**

Unidade de cobrança do Glue?::**DPU-hora**

ETL serverless sem gerenciar cluster × código Spark com controle do cluster?::Serverless: **Glue**; controle do cluster: **EMR**
