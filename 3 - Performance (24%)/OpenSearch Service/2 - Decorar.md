---
tags: [saa-c03, opensearch, decorar]
servico: Amazon OpenSearch Service
atualizado: 2026-11-08
---

# OpenSearch Service — Decorar

## Busca × análise × métrica — quem faz o quê

| Pergunta | Serviço |
|---|---|
| "Buscar **texto livre** com relevância" | **OpenSearch** |
| "Buscar nos **logs** e montar dashboard" | **OpenSearch** |
| "A CPU está alta? Criar alarme" | **CloudWatch** |
| "Consultar os **logs** com linguagem de query, sem cluster" | **CloudWatch Logs Insights** |
| "SQL **ad-hoc** sobre arquivos no S3" | **Athena** |
| "BI recorrente, joins, petabytes" | **Redshift** |
| "Chave-valor, ms, escala ilimitada" | **DynamoDB** |

## Como os dados chegam

| Origem | Caminho |
|---|---|
| **Kinesis Data Firehose** | Destino nativo (*"Amazon OpenSearch Service"* e *"OpenSearch Serverless"* estão na lista de destinos) |
| **CloudWatch Logs** | **Subscription filter** → Lambda/Firehose → OpenSearch |
| **DynamoDB** | **Streams** → Lambda → OpenSearch |
| **Aplicação** | API REST / SDK direto |
| **Logstash / Fluent Bit / OTel** | Agentes |

## Modos

| Modo | Detalhe |
|---|---|
| **Provisioned (domain)** | Você dimensiona nós de dados, master e UltraWarm/cold |
| **OpenSearch Serverless** | Sem dimensionar cluster; paga por uso |

Camadas de storage: **hot** (SSD) → **UltraWarm** (S3 + cache) → **cold** — a alavanca de custo para retenção longa de log.

## Lake Formation

**OpenSearch não** está entre os engines que respeitam as permissões do Lake Formation. Os que respeitam: *"Amazon Athena, Amazon Quick, Amazon Redshift Spectrum, Amazon EMR, and AWS Glue"*.

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
