---
tags: [saa-c03, opensearch, questoes]
servico: Amazon OpenSearch Service
atualizado: 2026-11-08
---

# OpenSearch Service — Questões

> [!question]- Q1. Um catálogo de produtos no DynamoDB precisa de busca por texto livre, com relevância e autocomplete.
> **A)** Scan com FilterExpression
> **B)** GSI com o nome do produto como chave
> **C)** **DynamoDB Streams → Lambda → OpenSearch Service, com a busca no OpenSearch** ✅
> **D)** Athena sobre um export do DynamoDB
>
> **Por que C**: busca textual com relevância exige **índice invertido**. O padrão é manter o DynamoDB como fonte de verdade e materializar o índice de busca.
> **A errada**: Scan lê tudo e você paga por tudo; e não faz relevância.
> **B errada**: GSI casa valor **exato** ou prefixo via sort key — não faz busca textual.
> **D errada**: Athena é analítico em lote, não busca interativa.

> [!question]- Q2. Centralizar logs de 40 serviços e permitir busca por texto livre com dashboards, para o time de operações.
> **A)** CloudWatch Logs Insights
> **B)** **OpenSearch Service (alimentado por Firehose ou subscription filter), com OpenSearch Dashboards** ✅
> **C)** S3 com Athena
> **D)** CloudTrail Lake
>
> **Por que B**: busca textual forte + dashboards ricos é o caso de uso.
> **A errada**: resolve consulta pontual; não é plataforma de busca e dashboards.
> **D errada**: CloudTrail Lake é para **chamadas de API**.

> [!question]- Q3. A retenção de log em OpenSearch precisa chegar a 1 ano, com o menor custo.
> **A)** Aumentar os nós de dados
> **B)** **Index State Management movendo índices de hot para UltraWarm e cold** ✅
> **C)** Reduzir a retenção para 30 dias
> **D)** Mudar para Serverless
>
> **Por que B**: UltraWarm usa **S3** com cache e custa muito menos que hot; o ISM automatiza a transição.
> **C errada**: descumpre o requisito.

> [!question]- Q4. Ingerir um stream de logs e disponibilizá-lo para busca, com o menor esforço operacional.
> **A)** Lambda lendo o stream e indexando
> **B)** **Kinesis Data Firehose com destino OpenSearch Service** ✅
> **C)** EMR com Spark Streaming
> **D)** CloudWatch Logs
>
> **Por que B**: OpenSearch é **destino nativo** do Firehose — sem código.
> **A errada**: você escreve e opera o consumidor, com retry e backpressure.

> [!question]- Q5. Qual destes **não** respeita as permissões do Lake Formation?
> **A)** Athena
> **B)** Redshift Spectrum
> **C)** EMR
> **D)** **OpenSearch Service** ✅
> 
> **Por que D**: a lista oficial é *"Amazon Athena, Amazon Quick, Amazon Redshift Spectrum, Amazon EMR, and AWS Glue"*.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| O serviço se chama Amazon Elasticsearch Service | Foi renomeado para **Amazon OpenSearch Service** |
| OpenSearch substitui o CloudWatch | CloudWatch é **métrica e alarme**; OpenSearch é **busca e dashboard de log** |
| OpenSearch é a fonte de verdade | O padrão é **banco como fonte** + OpenSearch como **índice** |
| `LIKE` no SQL resolve busca textual | Sem relevância, sem stemming, e **não usa índice** com wildcard à esquerda |
| Retenção longa em hot é normal | Use **UltraWarm** e **cold** (via ISM) |
| OpenSearch respeita o Lake Formation | **Não está** na lista |
| Só existe modo provisioned | Há **OpenSearch Serverless** |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
