---
tags: [saa-c03, opensearch, detalhes]
servico: Amazon OpenSearch Service
atualizado: 2026-11-08
---

# OpenSearch Service — Detalhes

## 1. Por que não resolver busca com SQL

Busca textual tem três exigências que um `WHERE coluna LIKE '%termo%'` não atende:

1. **Relevância** — resultados ordenados por quão bem casam, não por data ou ID
2. **Análise linguística** — stemming (*"correndo"* casa *"correr"*), stop words, sinônimos, acentuação
3. **Tolerância a erro** — fuzzy matching, autocomplete, "você quis dizer"

O **índice invertido** do OpenSearch resolve isso. Um `LIKE` com wildcard à esquerda, além de não fazer nada disso, **não usa índice** — faz varredura completa.

É por isso que o padrão de arquitetura é: o **banco** é a fonte de verdade (DynamoDB, RDS), e o OpenSearch é o **índice de busca**, alimentado por **Streams → Lambda**.

## 2. Log analytics — o segundo caso de uso

Centralizar logs de dezenas de serviços e **procurar** neles é o outro uso. O OpenSearch indexa o texto, e o **OpenSearch Dashboards** (ex-Kibana) monta visualizações.

Comparação que a prova faz:

| | **CloudWatch Logs Insights** | **OpenSearch** |
|---|---|---|
| Infraestrutura | **Nenhuma** | Domínio (ou Serverless) |
| Linguagem | Própria, por log group | Query DSL / SQL / PPL |
| Busca textual com relevância | Limitada | **Forte** |
| Dashboards ricos | Básico | **OpenSearch Dashboards** |
| Retenção longa barata | Export para S3 | **UltraWarm / cold** |
| Esforço operacional | **Menor** | Maior |

Regra: *"consultar logs pontualmente"* → **Logs Insights**. *"plataforma de busca e dashboards sobre logs de toda a empresa"* → **OpenSearch**.

## 3. Como os dados chegam

| Origem | Caminho |
|---|---|
| **Kinesis Data Firehose** | Destino nativo — é o caminho mais simples para stream |
| **CloudWatch Logs** | **Subscription filter** → Lambda ou Firehose → OpenSearch |
| **DynamoDB** | **Streams** → Lambda → OpenSearch (materializa o índice de busca) |
| **RDS/Aurora** | CDC via **DMS** ou trigger → Lambda |
| **Aplicação** | API REST, SDK, bulk API |
| **Agentes** | Fluent Bit, Logstash, OpenTelemetry |

O par **Firehose → OpenSearch** é o que a prova usa para *"ingerir stream de logs e permitir busca"*.

## 4. Camadas de storage — a alavanca de custo

| Camada | Onde | Para quê |
|---|---|---|
| **Hot** | SSD nos nós de dados | Dado recente, consulta rápida |
| **UltraWarm** | **S3** + cache local | Dado mais antigo, consulta menos frequente, muito mais barato |
| **Cold** | S3 | Arquivamento; precisa ser "reanexado" para consultar |

Retenção de log de 1 ano em hot é caro. O desenho correto: **7-30 dias em hot**, o resto em **UltraWarm**, e o histórico longo em **cold** (ou export para S3 + Athena).

**Index State Management (ISM)** automatiza essas transições e a exclusão — é o equivalente ao lifecycle do S3.

## 5. Provisioned × Serverless

**Provisioned (domain)**: você escolhe tipo e quantidade de nós de dados, nós master dedicados, e as camadas UltraWarm/cold. Dá controle e custo previsível, mas exige dimensionar.

**OpenSearch Serverless**: sem dimensionar cluster, paga por uso. É a resposta quando o enunciado pede **menor esforço operacional** ou a carga é imprevisível.

Para HA no modo provisioned: **3 nós master dedicados** e nós de dados distribuídos em **múltiplas AZs**.

## 6. Segurança

| Controle | Detalhe |
|---|---|
| **VPC access** | Domínio dentro da VPC, com security group (recomendado) |
| **Public access** | Com access policy e, idealmente, assinatura SigV4 |
| **Fine-grained access control** | Controle por índice, documento e campo |
| **Cognito** | Autenticação no OpenSearch Dashboards |
| **Criptografia** | KMS em repouso, TLS em trânsito, node-to-node |
| **AWS WAF** | Pode proteger via CloudFront/ALB na frente |
| **ACM** | OpenSearch custom domain está na lista de serviços integrados ao ACM |

⚠️ **OpenSearch não** está entre os engines que respeitam o **Lake Formation** — que são *"Amazon Athena, Amazon Quick, Amazon Redshift Spectrum, Amazon EMR, and AWS Glue"*.

## Links

- [[3 - Performance (24%)/OpenSearch Service/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/OpenSearch Service/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/OpenSearch Service/4 - Questoes|4 - Questoes]]
- [[2 - Resiliencia (26%)/CloudWatch/1 - O que e|CloudWatch]] · [[3 - Performance (24%)/Kinesis Data Firehose/1 - O que e|Kinesis Data Firehose]] · [[3 - Performance (24%)/DynamoDB/1 - O que e|DynamoDB]] · [[3 - Performance (24%)/Athena/1 - O que e|Athena]] · [[3 - Performance (24%)/Lake Formation/1 - O que e|Lake Formation]] · [[1 - Seguranca (30%)/Cognito/1 - O que e|Cognito]] · [[1 - Seguranca (30%)/ACM (Certificate Manager)/1 - O que e|ACM (Certificate Manager)]]
