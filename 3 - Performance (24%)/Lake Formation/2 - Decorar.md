---
tags: [saa-c03, lake-formation, decorar]
servico: AWS Lake Formation
atualizado: 2026-11-08
---

# Lake Formation — Decorar

## A granularidade — o diferencial

> *"enforced using granular controls at the column, row, and cell-levels"*

| Controle | Consegue restringir por **coluna**? | Por **linha**? |
|---|---|---|
| **Bucket policy / IAM no S3** | ❌ (só objeto/prefixo) | ❌ |
| **IAM policy** | ❌ | ❌ |
| **Lake Formation** | **✅** | **✅** (e por célula) |

## Os engines que respeitam (decore a lista)

**Athena** · **Amazon Quick** · **Redshift Spectrum** · **EMR** · **Glue**

⚠️ **OpenSearch Service NÃO está** na lista.

## O modelo de permissão

> *"Lake Formation provides its own permissions model that augments the IAM permissions model."*

Com mecanismo de *"a grant or revoke mechanism"* — estilo banco de dados (`GRANT SELECT ON tabela TO role`), em vez de JSON de policy.

## LF-Tags (tag-based access control)

Em vez de conceder tabela por tabela, você marca recursos com **LF-Tags** e concede por tag:

```
LF-Tag:  classificacao = confidencial
         dominio       = financeiro

GRANT  SELECT  ON  LF-Tag (dominio=financeiro)  TO  role "analistas-fin"
```

Isso é **attribute-based access control** no data lake, e escala muito melhor que grants individuais.

## Outros recursos

| Recurso | Para quê |
|---|---|
| **Cross-account sharing** | Compartilhar tabelas com outras contas |
| **Hybrid access mode** | Conviver com permissões IAM existentes durante a migração |
| **Blueprints** | Ingestão de fontes para o lake |
| **Governed tables** | Transações ACID no lake |

## A pilha do data lake

```
S3                  ← o dado
GLUE DATA CATALOG   ← o metadado
LAKE FORMATION      ← quem vê o quê (coluna, linha, célula)
ATHENA · SPECTRUM · EMR · GLUE · QUICK   ← os engines
```

## Links

- [[3 - Performance (24%)/Lake Formation/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/Lake Formation/3 - Detalhes|3 - Detalhes]] · [[3 - Performance (24%)/Lake Formation/4 - Questoes|4 - Questoes]]
