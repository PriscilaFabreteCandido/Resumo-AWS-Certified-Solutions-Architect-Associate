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

> *"migrate relational databases, data warehouses, NoSQL databases, and other types of data stores."* (migrar bancos relacionais, data warehouses, bancos NoSQL e outros tipos de repositório de dados)

E o modo de operação:

> *"You can perform one-time migrations or replicate ongoing changes to keep sources and targets in sync."* (você pode fazer migrações pontuais ou replicar as mudanças continuamente, mantendo origem e destino sincronizados)

É essa replicação contínua que permite **downtime mínimo**: a carga inicial acontece com a origem funcionando, e você corta quando os dois estão sincronizados.

## Homogênea × heterogênea

| Tipo | Exemplo | Precisa de |
|---|---|---|
| **Homogênea** (mesmo engine) | Oracle on-prem → RDS Oracle | **DMS** |
| **Heterogênea** (engine diferente) | Oracle → Aurora PostgreSQL | **DMS + conversão de schema** |

> *"AWS DMS supports fully heterogeneous data migrations between the supported engines."* (o AWS DMS suporta migrações de dados totalmente heterogêneas entre os engines compatíveis)

Para a conversão: *"DMS Schema Conversion"* no console, que *"automatically assesses and converts your source schemas to a new target engine"* (avalia e converte automaticamente os schemas de origem para um novo engine de destino); ou *"you can download the AWS Schema Conversion Tool (AWS SCT) to your local PC"* (você pode baixar o AWS Schema Conversion Tool (AWS SCT) para o seu computador).

> [!warning] A divisão de trabalho
> **DMS migra os dados. A conversão de schema é outra ferramenta** (DMS Schema Conversion ou AWS SCT). Alternativa que diz "o DMS converte o schema" está errada.

## Links

- [[4 - Custo (20%)/DMS (Database Migration Service)/2 - Decorar|2 - Decorar]] · [[4 - Custo (20%)/DMS (Database Migration Service)/3 - Detalhes|3 - Detalhes]] · [[4 - Custo (20%)/DMS (Database Migration Service)/4 - Questoes|4 - Questoes]]
- [[2 - Resiliencia (26%)/RDS/1 - O que e|RDS]] · [[2 - Resiliencia (26%)/Aurora/1 - O que e|Aurora]] · [[9 - Fundamentos e apoio/Estrategias de migracao (7 Rs)/1 - O que e|Estrategias de migracao (7 Rs)]] · [[4 - Custo (20%)/04 - Dominio 4 - Design Cost-Optimized Architectures (20%)|Custo (dominio 4)]]
- [O que é o AWS DMS](https://docs.aws.amazon.com/dms/latest/userguide/Welcome.html)
