---
tags: [saa-c03, opensearch, busca, log-analytics]
servico: Amazon OpenSearch Service
tipo: Busca e análise de logs
dominios: [3]
atualizado: 2026-11-08
---

# Amazon OpenSearch Service — O que é

> [!info] Em uma frase
> Busca e análise gerenciadas (fork do Elasticsearch), para **busca textual**, **log analytics** e **dashboards de observabilidade**.

## Os dois casos de uso

| Caso | Por quê |
|---|---|
| **Busca textual** | Índice invertido, relevância (scoring), autocomplete, fuzzy, agregações por faceta |
| **Log analytics / observabilidade** | Ingerir logs, buscar por texto livre, montar **dashboards** (OpenSearch Dashboards, ex-Kibana) |

## Quando é a resposta

| Enunciado | OpenSearch? |
|---|---|
| "busca por texto livre", "relevância", "autocomplete" | **Sim** |
| "centralizar e **buscar** logs de aplicação" | **Sim** |
| "dashboards de log / observabilidade" | **Sim** |
| Métrica, alarme, escala | **Não** → **CloudWatch** |
| SQL analítico ad-hoc no S3 | **Não** → **Athena** |
| BI recorrente em petabytes | **Não** → **Redshift** |
| Chave-valor com latência de ms | **Não** → **DynamoDB** |

> [!warning] O nome antigo ainda aparece
> Material antigo diz **"Amazon Elasticsearch Service"**. O serviço foi renomeado para **Amazon OpenSearch Service** — e é esse o nome na lista oficial de serviços em escopo.

## Links

- [[3 - Performance (24%)/OpenSearch Service/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/OpenSearch Service/3 - Detalhes|3 - Detalhes]] · [[3 - Performance (24%)/OpenSearch Service/4 - Questoes|4 - Questoes]]
- [[2 - Resiliencia (26%)/CloudWatch/1 - O que e|CloudWatch]] · [[3 - Performance (24%)/Athena/1 - O que e|Athena]] · [[3 - Performance (24%)/Kinesis Data Firehose/1 - O que e|Kinesis Data Firehose]] · [[3 - Performance (24%)/DynamoDB/1 - O que e|DynamoDB]] · [[3 - Performance (24%)/Redshift/1 - O que e|Redshift]]
