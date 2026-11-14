---
tags: [saa-c03, dms, migracao, banco]
servico: AWS DMS
tipo: Migração de banco de dados
dominios: [4, 3]
atualizado: 2026-11-08
---

# AWS DMS — O que é

> [!info] Em uma frase
> Migra bancos de dados para a AWS (ou entre bancos) com **replicação contínua**, mantendo a origem **no ar** até o corte.

## Definição oficial

> *"migrate relational databases, data warehouses, NoSQL databases, and other types of data stores."*

E o modo de operação:

> *"You can perform one-time migrations or replicate ongoing changes to keep sources and targets in sync."*

É essa replicação contínua que permite **downtime mínimo**: a carga inicial acontece com a origem funcionando, e você corta quando os dois estão sincronizados.

## Homogênea × heterogênea

| Tipo | Exemplo | Precisa de |
|---|---|---|
| **Homogênea** (mesmo engine) | Oracle on-prem → RDS Oracle | **DMS** |
| **Heterogênea** (engine diferente) | Oracle → Aurora PostgreSQL | **DMS + conversão de schema** |

> *"AWS DMS supports fully heterogeneous data migrations between the supported engines."*

Para a conversão: *"DMS Schema Conversion"* no console, que *"automatically assesses and converts your source schemas to a new target engine"*; ou *"you can download the AWS Schema Conversion Tool (AWS SCT) to your local PC"*.

> [!warning] A divisão de trabalho
> **DMS migra os dados. A conversão de schema é outra ferramenta** (DMS Schema Conversion ou AWS SCT). Alternativa que diz "o DMS converte o schema" está errada.

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[RDS]] · [[Aurora]] · [[Estrategias de migracao (7 Rs)]] · [[Custo de banco de dados]]
- [O que é o AWS DMS](https://docs.aws.amazon.com/dms/latest/userguide/Welcome.html)
