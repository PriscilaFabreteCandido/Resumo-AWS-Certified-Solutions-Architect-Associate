---
tags: [saa-c03, redshift, olap, data-warehouse]
servico: Amazon Redshift
tipo: Data warehouse (OLAP)
dominios: [3, 4]
atualizado: 2026-11-08
---

# Amazon Redshift — O que é

> [!info] Em uma frase
> **Data warehouse** colunar para análise de grandes volumes: *"optimized for high-performance analysis and reporting of very large datasets"* (otimizado para análise e relatórios de alta performance sobre conjuntos de dados muito grandes).

## OLAP, não OLTP

> *"Although it provides the same functionality as a typical RDBMS, including online transaction processing (OLTP) functions such as inserting and deleting data, Amazon Redshift is optimized for high-performance analysis and reporting of very large datasets."*

Tradução para a prova: o Redshift **consegue** fazer INSERT e DELETE, mas é **otimizado para analítico**. Se o enunciado descreve transação, é **RDS/Aurora/DynamoDB**.

É baseado em **PostgreSQL** (*"based on open standard PostgreSQL"*) — o que explica a compatibilidade de driver e sintaxe.

## A arquitetura

| Componente | Papel |
|---|---|
| **Leader node** | Coordena. Existe *"If a cluster is provisioned with two or more compute nodes"* (se um cluster é provisionado com dois ou mais nós de computação) |
| **Compute nodes** | Fazem o trabalho, divididos em **node slices** |
| **Redshift Managed Storage (RMS)** | *"scale your storage to petabytes using Amazon S3 storage"* (escalar seu armazenamento para petabytes usando o Amazon S3), com cache local em SSD. **Compute e storage escalam independentemente** |

## Redshift × as alternativas analíticas

| Enunciado | Resposta |
|---|---|
| Data warehouse persistente, BI recorrente, joins complexos, concorrência alta | **Redshift** |
| SQL **ad-hoc** direto no S3, serverless | **Athena** |
| Código **Spark/Hadoop** com controle do cluster | **EMR** |
| Já tenho Redshift e quero alcançar o S3 sem carregar | **Redshift Spectrum** |
| Busca textual e log analytics | **OpenSearch Service** |

## Links

- [[3 - Performance (24%)/Redshift/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/Redshift/3 - Detalhes|3 - Detalhes]] · [[3 - Performance (24%)/Redshift/4 - Questoes|4 - Questoes]]
- [[3 - Performance (24%)/Athena/1 - O que e|Athena]] · [[3 - Performance (24%)/Glue/1 - O que e|Glue]] · [[3 - Performance (24%)/EMR/1 - O que e|EMR]] · [[3 - Performance (24%)/OpenSearch Service/1 - O que e|OpenSearch Service]] · [[3 - Performance (24%)/DynamoDB/1 - O que e|DynamoDB]]
- [Arquitetura do Redshift](https://docs.aws.amazon.com/redshift/latest/dg/c_high_level_system_architecture.html)
