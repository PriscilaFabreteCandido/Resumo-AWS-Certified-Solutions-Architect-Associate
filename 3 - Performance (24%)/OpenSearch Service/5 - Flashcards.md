---
servico: Amazon OpenSearch Service
fonte: "[[3 - Performance (24%)/OpenSearch Service/2 - Decorar|2 - Decorar]]"
---

# OpenSearch Service — Flashcards

#flashcards/saa-c03/d3-performance/opensearch-service

Busca de texto livre com relevância: qual serviço?::**Amazon OpenSearch Service**

Buscar nos logs e montar dashboard: qual serviço?::**OpenSearch Service**

Consultar logs com linguagem de query, sem cluster: qual serviço?::**CloudWatch Logs Insights**

SQL ad-hoc sobre arquivos no S3: OpenSearch ou outro?::**Athena**

Serviço com destino nativo para OpenSearch, sem código?::**Kinesis Data Firehose**

Como levar CloudWatch Logs para o OpenSearch?::**Subscription filter** → Lambda/Firehose → OpenSearch

Como indexar dados do DynamoDB no OpenSearch?::**DynamoDB Streams** → Lambda → OpenSearch

Dois modos de implantação do OpenSearch Service?::**Provisioned (domain)**, você dimensiona os nós; **Serverless**, paga por uso

Camadas de storage do OpenSearch e para que servem?::**Hot** (SSD) → **UltraWarm** (S3 + cache) → **cold**; reduzem custo de retenção longa

O OpenSearch respeita as permissões do Lake Formation?::**Não**

Métrica de CPU alta com alarme: OpenSearch ou outro?::**CloudWatch**
