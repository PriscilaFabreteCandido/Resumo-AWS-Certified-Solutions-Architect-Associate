---
tags: [saa-c03, lake-formation, detalhes]
servico: AWS Lake Formation
atualizado: 2026-11-08
---

# Lake Formation — Detalhes

## 1. O problema que IAM e bucket policy não resolvem

Uma tabela de clientes no S3 tem colunas `nome`, `email`, `cpf`, `salario`. O time de marketing precisa de `nome` e `email`; o de RH precisa de `salario`; ninguém deveria ver `cpf` sem autorização.

Com **IAM e bucket policy**, o controle é por **objeto ou prefixo** — ou você libera o arquivo inteiro, ou nada. Não há como esconder uma coluna.

A saída artesanal seria criar **cópias** do dado por público (um bucket só com as colunas permitidas), o que duplica storage, cria defasagem e multiplica o esforço.

O Lake Formation resolve na camada de **autorização da consulta**: *"enforced using granular controls at the column, row, and cell-levels"*. O dado fica **num** lugar, e cada consulta vê só o que pode.

## 2. Como funciona

> *"Lake Formation provides its own permissions model that augments the IAM permissions model."*

O modelo é de banco de dados — *"a grant or revoke mechanism"*:

```
GRANT SELECT (nome, email) ON TABLE clientes TO ROLE marketing
GRANT SELECT                ON TABLE clientes TO ROLE auditoria
REVOKE ...
```

Quando o **Athena** (ou Spectrum, EMR, Glue, Quick) executa a consulta, ele consulta o Lake Formation e aplica a filtragem — **antes** de devolver o resultado. O engine, e não a política de S3, faz o enforcement.

Por isso a lista de engines importa: *"Amazon Athena, Amazon Quick, Amazon Redshift Spectrum, Amazon EMR, and AWS Glue"*. Um engine fora dessa lista (ou acesso direto ao S3) **não** respeita essas permissões — razão para restringir o acesso direto ao bucket.

## 3. LF-Tags — o que faz escalar

Conceder permissão tabela por tabela não escala num lake com milhares de tabelas. As **LF-Tags** resolvem: você marca bancos, tabelas e colunas com pares chave-valor, e concede **por tag**.

```
Tabelas marcadas:
   vendas_2026      → dominio=vendas,    classificacao=interno
   clientes         → dominio=vendas,    classificacao=confidencial
   folha_pagamento  → dominio=rh,        classificacao=restrito

Concessões:
   LF-Tag (dominio=vendas, classificacao=interno)      → role "analistas"
   LF-Tag (classificacao=confidencial)                 → role "dpo"
```

A doc chama isso de *"Attribute-based access control"*. Tabela nova marcada com as tags certas **já nasce** com as permissões corretas.

## 4. A pilha completa, e quem faz o quê

| Camada | Serviço | Responsabilidade |
|---|---|---|
| Dado | **S3** | Armazenar |
| Metadado | **Glue Data Catalog** | Schema, tabelas, partições |
| **Autorização fina** | **Lake Formation** | Coluna, linha, célula |
| Transformação | **Glue jobs / EMR** | ETL |
| Consulta | **Athena / Spectrum / EMR** | SQL e código |
| Visualização | **Amazon Quick** | Dashboard |

A doc do Glue descreve o Lake Formation como *"an authorization layer that provides fine-grained access control to resources in the AWS Glue Data Catalog"* — fica claro que um guarda o metadado e o outro governa o acesso a ele.

## 5. Cross-account e modo híbrido

**Cross-account sharing** permite compartilhar tabelas (ou tags) com outras contas — a base de uma arquitetura de **data mesh**, em que cada domínio publica seus dados e outros consomem com permissão controlada.

**Hybrid access mode** permite que o Lake Formation conviva com permissões **IAM existentes** durante a migração: você não precisa cortar o acesso direto ao S3 no dia um.

## 6. Quando NÃO é Lake Formation

| Necessidade | Serviço |
|---|---|
| Bloquear acesso público ao bucket | **S3 Block Public Access** |
| Criptografar o dado | **KMS / SSE-KMS** |
| Descobrir **PII** no bucket | **Macie** |
| Detectar bucket mal configurado | **AWS Config** |
| Permissão por **objeto/prefixo** | **IAM / bucket policy** |
| Catálogo de metadados | **Glue Data Catalog** |
| Permissão por **coluna, linha, célula** | **Lake Formation** |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[Glue]] · [[Athena]] · [[Redshift]] · [[EMR]] · [[S3]] · [[IAM]] · [[Macie]] · [[Protecao de dados no S3]]
