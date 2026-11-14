---
tags: [saa-c03, glue, etl, catalogo]
servico: AWS Glue
tipo: ETL serverless e catálogo
dominios: [3]
atualizado: 2026-11-08
---

# AWS Glue — O que é

> [!info] Em uma frase
> *"AWS Glue is a serverless data integration service"* — faz **ETL** sem cluster, e mantém o **Data Catalog**, o metadado central do data lake.

## As duas funções

| Função | O que é |
|---|---|
| **ETL serverless** | Jobs que extraem, transformam e carregam, sobre *"the Apache Spark–based serverless ETL engine"* (ou **Ray**) |
| **Data Catalog** | O catálogo central de tabelas e schemas — usado por **Athena**, **Redshift Spectrum**, **EMR** e **Lake Formation** |

## Os componentes

| Componente | Para quê |
|---|---|
| **Data Catalog** | Metadado: bancos, tabelas, schemas, partições |
| **Crawler** | *"automatically infer schema information and integrate it into your AWS Glue Data Catalog"* |
| **Job** | O ETL (Spark ou Ray) |
| **Glue Studio** | *"a graphical interface that makes it easy to create, run, and monitor data integration jobs"* |
| **DataBrew** | *"A visual data preparation tool... without writing any code"* |
| **Trigger** | Agendado, on-demand ou **por evento** |
| **Streaming ETL** | *"Clean and transform streaming data in transit"* |

Conecta a *"more than 70 diverse data sources"*.

## Glue × EMR

| Enunciado | Resposta |
|---|---|
| "**serverless**", "sem gerenciar cluster", "catalogar automaticamente", ETL simples | **Glue** |
| "código **Spark** customizado", "framework específico", "controle da configuração do cluster", "Spot para reduzir custo" | **EMR** |

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[Athena]] · [[EMR]] · [[Lake Formation]] · [[Redshift]] · [[S3]]
- [O que é o AWS Glue](https://docs.aws.amazon.com/glue/latest/dg/what-is-glue.html)
