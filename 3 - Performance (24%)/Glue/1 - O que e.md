---
tags: [saa-c03, glue, etl, catalogo]
servico: AWS Glue
tipo: ETL serverless e catálogo
dominios: [3]
atualizado: 2026-11-08
---

# AWS Glue — O que é

> [!info] Em uma frase
> *"AWS Glue is a serverless data integration service"* (o AWS Glue é um serviço serverless de integração de dados) — faz **ETL** sem cluster, e mantém o **Data Catalog**, o metadado central do data lake.

## As duas funções

| Função | O que é |
|---|---|
| **ETL serverless** | Jobs que extraem, transformam e carregam, sobre *"the Apache Spark–based serverless ETL engine"* (ou **Ray**) |
| **Data Catalog** | O catálogo central de tabelas e schemas — usado por **Athena**, **Redshift Spectrum**, **EMR** e **Lake Formation** |

## Os componentes

| Componente | Para quê |
|---|---|
| **Data Catalog** | Metadado: bancos, tabelas, schemas, partições |
| **Crawler** | *"automatically infer schema information and integrate it into your AWS Glue Data Catalog"* (inferir automaticamente as informações de schema e integrá-las ao seu AWS Glue Data Catalog) |
| **Job** | O ETL (Spark ou Ray) |
| **Glue Studio** | *"a graphical interface that makes it easy to create, run, and monitor data integration jobs"* (uma interface gráfica que facilita criar, executar e monitorar jobs de integração de dados) |
| **DataBrew** | *"A visual data preparation tool... without writing any code"* (uma ferramenta visual de preparação de dados... sem escrever código) |
| **Trigger** | Agendado, on-demand ou **por evento** |
| **Streaming ETL** | *"Clean and transform streaming data in transit"* (limpar e transformar dados de streaming em trânsito) |

Conecta a *"more than 70 diverse data sources"*.

## Glue × EMR

| Enunciado | Resposta |
|---|---|
| "**serverless**", "sem gerenciar cluster", "catalogar automaticamente", ETL simples | **Glue** |
| "código **Spark** customizado", "framework específico", "controle da configuração do cluster", "Spot para reduzir custo" | **EMR** |

## Links

- [[3 - Performance (24%)/Glue/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/Glue/3 - Detalhes|3 - Detalhes]] · [[3 - Performance (24%)/Glue/4 - Questoes|4 - Questoes]]
- [[3 - Performance (24%)/Athena/1 - O que e|Athena]] · [[3 - Performance (24%)/EMR/1 - O que e|EMR]] · [[3 - Performance (24%)/Lake Formation/1 - O que e|Lake Formation]] · [[3 - Performance (24%)/Redshift/1 - O que e|Redshift]] · [[3 - Performance (24%)/S3/1 - O que e|S3]]
- [O que é o AWS Glue](https://docs.aws.amazon.com/glue/latest/dg/what-is-glue.html)
