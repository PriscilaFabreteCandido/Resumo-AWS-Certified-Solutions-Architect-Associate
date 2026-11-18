---
tags: [saa-c03, redshift, detalhes]
servico: Amazon Redshift
atualizado: 2026-11-08
---

# Redshift — Detalhes

## 1. Por que colunar importa

Num banco **por linha** (OLTP), ler uma coluna de 500 milhões de registros significa ler **todas** as colunas de todos eles. Num banco **colunar**, você lê só a coluna pedida.

Para analítico — `SUM`, `AVG`, `GROUP BY` sobre bilhões de linhas e poucas colunas — isso muda a ordem de magnitude. É a mesma lógica que faz o **Parquet** ser mais barato no Athena.

A doc resume o posicionamento: *"optimized for high-performance analysis and reporting of very large datasets"* (otimizado para análise e relatórios de alta performance sobre conjuntos de dados muito grandes) — mesmo tendo *"OLTP functions such as inserting and deleting data"*.

## 2. Arquitetura e Redshift Managed Storage

**Leader node** recebe a query, monta o plano e distribui — e existe *"If a cluster is provisioned with two or more compute nodes"* (se um cluster é provisionado com dois ou mais nós de computação). **Compute nodes** executam, divididos em **node slices** (o número depende do tamanho do nó).

**Redshift Managed Storage** é o que torna o Redshift moderno: *"scale your storage to petabytes using Amazon S3 storage"* (escalar seu armazenamento para petabytes usando o Amazon S3), com cache local em SSD. O efeito prático é que **compute e storage escalam independentemente** — você dimensiona nós pela carga de query, não pelo volume de dados.

## 3. Spectrum — alcançar o data lake

> *"you can efficiently query and retrieve structured and semi-structured data from files in Amazon S3 without having to load the data into Amazon Redshift tables."* (você consulta e recupera com eficiência dados estruturados e semiestruturados de arquivos no Amazon S3, sem precisar carregá-los em tabelas do Amazon Redshift)

O desenho típico: dados **quentes** carregados em tabelas do Redshift; dados **históricos** ficam no S3 e são consultados por **tabelas externas** via Spectrum. A query pode fazer **join** entre as duas.

Onde roda: em **RA3**, *"a dedicated server fleet outside of the cluster"* (uma frota de servidores dedicada, fora do cluster); em **RG** e **Serverless**, *"an integrated data lake query engine that runs on the cluster's own compute resources"* (um motor de consulta de data lake integrado, que roda nos próprios recursos de computação do cluster). Escala: *"can potentially use thousands of instances"* (pode chegar a usar milhares de instâncias).

O catálogo vem do **Glue Data Catalog** (ou do catálogo do Athena, ou de um Hive metastore) — o mesmo catálogo que o Athena e o EMR usam, o que permite **um** metadado para o data lake inteiro.

⚠️ Spectrum **não** suporta **update** em tabelas externas.

## 4. Concurrency scaling

Quando muitas queries chegam juntas, elas entram em **fila** no WLM. O concurrency scaling resolve isso: *"automatically adds additional cluster capacity"*, e *"eligible queries are sent to the concurrency-scaling cluster instead of waiting in a queue"* (as consultas elegíveis são enviadas ao cluster de concurrency scaling em vez de esperar numa fila).

Cobrança: *"You're charged for concurrency-scaling clusters only for the time they're actively running queries."*

Configuração: por **fila do WLM**, com *"Concurrency Scaling mode"* (modo Concurrency Scaling) em `auto`. O padrão é **um** cluster adicional (`max_concurrency_scaling_clusters`).

Suporta escrita: **COPY, INSERT, DELETE, UPDATE, CTAS, VACUUM**.

Restrições: node types `rg.*` e `ra3.*` (**máx. 32** compute nodes), e **não** funciona em cluster de **nó único**, nem com interleaved sort keys, tabelas temporárias ou UDFs Python/Lambda.

## 5. Modelagem para performance

| Alavanca | Quando |
|---|---|
| **Distribution style KEY** | Tabelas grandes que fazem join pela mesma coluna (coloca as linhas correspondentes no mesmo slice) |
| **Distribution style ALL** | Tabela de dimensão **pequena** (copia em todos os nós, elimina redistribuição no join) |
| **Distribution style EVEN** | Sem padrão de join claro |
| **AUTO** | Deixa o Redshift decidir |
| **Sort key** | Coluna usada em filtro de faixa (data, tipicamente) — permite pular blocos |
| **Compressão** | Automática no `COPY`; reduz I/O |
| **VACUUM / ANALYZE** | Reorganiza e atualiza estatísticas |

## 6. Carga e integração

| Origem | Como |
|---|---|
| **S3** | `COPY` (a forma mais eficiente; paralelo entre slices) |
| **Kinesis Data Firehose** | Entrega no **S3 primeiro**, depois o Firehose *"issues an Amazon Redshift COPY command"* |
| **DMS** | Migração de outro banco |
| **Glue** | ETL antes de carregar |
| **Spectrum** | Sem carregar |
| **Federated query** | Consulta RDS/Aurora direto |

## 7. Redshift × Athena × EMR × OpenSearch

| Pergunta | Serviço |
|---|---|
| BI recorrente, joins complexos, muitos usuários concorrentes | **Redshift** |
| Consulta **ad-hoc** no S3, sem cluster, pagando por TB escaneado | **Athena** |
| Preciso de **código** Spark/Hadoop e controle do cluster | **EMR** |
| **Busca textual**, log analytics, dashboards de observabilidade | **OpenSearch Service** |
| Já tenho Redshift e quero o S3 | **Spectrum** |

## 8. Custo

| Alavanca | Detalhe |
|---|---|
| **Reserved nodes** | Carga estável 24/7 |
| **Redshift Serverless** | Carga intermitente — paga por uso |
| **Pausar o cluster** | Dev/teste fora do horário |
| **Spectrum** | Histórico no S3 (barato) em vez de nós a mais |
| **Concurrency scaling** | Cobrado só enquanto roda |
| **Compressão e colunar** | Menos I/O, menos nós |

## Links

- [[3 - Performance (24%)/Redshift/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/Redshift/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/Redshift/4 - Questoes|4 - Questoes]]
- [[3 - Performance (24%)/Athena/1 - O que e|Athena]] · [[3 - Performance (24%)/Glue/1 - O que e|Glue]] · [[3 - Performance (24%)/EMR/1 - O que e|EMR]] · [[3 - Performance (24%)/OpenSearch Service/1 - O que e|OpenSearch Service]] · [[3 - Performance (24%)/Kinesis Data Firehose/1 - O que e|Kinesis Data Firehose]] · [[3 - Performance (24%)/S3/1 - O que e|S3]] · [[4 - Custo (20%)/04 - Dominio 4 - Design Cost-Optimized Architectures (20%)|Custo (dominio 4)]]
- [Spectrum](https://docs.aws.amazon.com/redshift/latest/dg/c-using-spectrum.html)
- [Concurrency scaling](https://docs.aws.amazon.com/redshift/latest/dg/concurrency-scaling.html)
