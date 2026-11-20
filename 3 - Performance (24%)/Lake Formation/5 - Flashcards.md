---
servico: AWS Lake Formation
fonte: "[[3 - Performance (24%)/Lake Formation/2 - Decorar|2 - Decorar]]"
---

# Lake Formation — Flashcards

#flashcards/saa-c03/d3-performance/lake-formation

Níveis de granularidade de permissão do Lake Formation?::**Coluna, linha e célula**

Bucket policy ou IAM no S3 restringem por coluna ou linha?::**Não**: só por objeto/prefixo

Engines que respeitam as permissões do Lake Formation?::**Athena, Amazon Quick, Redshift Spectrum, EMR e Glue**

O OpenSearch Service respeita as permissões do Lake Formation?::**Não**, ele não está na lista

Relação entre o modelo de permissões do Lake Formation e o IAM?::Modelo **próprio** que **complementa** o do IAM

Estilo do mecanismo de permissão do Lake Formation?::**Grant/revoke**, estilo banco de dados, em vez de JSON de policy

O que são LF-Tags?::Tags em recursos para conceder acesso **por tag** (ABAC no data lake), escalando melhor que grants individuais

Recurso do Lake Formation para compartilhar tabelas com outras contas?::**Cross-account sharing**

Recurso para conviver com permissões IAM existentes durante a migração?::**Hybrid access mode**

Recurso do Lake Formation para ingerir fontes no lake?::**Blueprints**

Recurso do Lake Formation que dá transações ACID no lake?::**Governed tables**

Camadas da pilha do data lake (dado, metadado, acesso)?::**S3** (dado) → **Glue Data Catalog** (metadado) → **Lake Formation** (quem vê o quê)
