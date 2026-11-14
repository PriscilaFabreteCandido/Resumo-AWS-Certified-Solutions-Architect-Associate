---
tags: [saa-c03, lake-formation, data-lake, seguranca]
servico: AWS Lake Formation
tipo: Governança de data lake
dominios: [3, 1]
atualizado: 2026-11-08
---

# AWS Lake Formation — O que é

> [!info] Em uma frase
> Camada de **governança e permissão fina** sobre o data lake: controla acesso em nível de **coluna, linha e célula**, com **grant e revoke** — algo que IAM e bucket policy não fazem.

## Definição oficial

> *"centrally govern, secure, and globally share data for analytics and machine learning."*

E o mecanismo:

> *"Lake Formation provides its own permissions model that augments the IAM permissions model."*

Com granularidade:

> *"enforced using granular controls at the column, row, and cell-levels"*

## O que ele adiciona sobre o Glue

| Camada | Papel |
|---|---|
| **S3** | Onde o dado está |
| **Glue Data Catalog** | O **metadado** (tabelas, schemas, partições) |
| **Lake Formation** | **Quem pode ver o quê** dentro do catálogo — *"an authorization layer that provides fine-grained access control to resources in the AWS Glue Data Catalog"* |

## Os engines que respeitam suas permissões (lista oficial)

> *"Amazon Athena, Amazon Quick, Amazon Redshift Spectrum, Amazon EMR, and AWS Glue"*

⚠️ **OpenSearch não está** nessa lista.

## Links

- [[3 - Performance (24%)/Lake Formation/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/Lake Formation/3 - Detalhes|3 - Detalhes]] · [[3 - Performance (24%)/Lake Formation/4 - Questoes|4 - Questoes]]
- [[3 - Performance (24%)/Glue/1 - O que e|Glue]] · [[3 - Performance (24%)/Athena/1 - O que e|Athena]] · [[3 - Performance (24%)/Redshift/1 - O que e|Redshift]] · [[3 - Performance (24%)/EMR/1 - O que e|EMR]] · [[3 - Performance (24%)/S3/1 - O que e|S3]] · [[1 - Seguranca (30%)/IAM/1 - O que e|IAM]]
- [O que é o Lake Formation](https://docs.aws.amazon.com/lake-formation/latest/dg/what-is-lake-formation.html)
