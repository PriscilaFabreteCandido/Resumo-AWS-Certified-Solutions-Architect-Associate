---
tags: [saa-c03, rds, banco]
servico: Amazon RDS
tipo: Banco relacional gerenciado
dominios: [2, 3, 4]
atualizado: 2026-11-08
---

# Amazon RDS — O que é

> [!info] Em uma frase
> Banco **relacional gerenciado**: a AWS cuida do provisionamento, patch, backup e failover; você cuida de schema, usuários, queries e índices.

## Engines suportados

**MySQL · PostgreSQL · MariaDB · Oracle · SQL Server · Db2** (e o **Aurora**, que é compatível com MySQL e PostgreSQL mas tem arquitetura própria).

## As três configurações que você precisa separar

| Configuração | Para quê | Replicação | Lê? |
|---|---|---|---|
| **Multi-AZ DB instance** | **Alta disponibilidade** | **Síncrona** | **❌ Não** |
| **Multi-AZ DB cluster** | HA **+ leitura** | **Semi-síncrona** | **✅ Sim (2 readers)** |
| **Read replica** | **Escalar leitura** / DR | **Assíncrona** | ✅ Sim |

As citações que definem:

> **Multi-AZ instance**: *"has one standby DB instance that provides failover support, but doesn't serve read traffic."*

> **Multi-AZ cluster**: *"a writer DB instance and two reader DB instances in three separate Availability Zones in the same AWS Region"*, com failover *"typically under 35 seconds"*.

> **Read replica**: *"Amazon RDS copies them asynchronously to the read replica."*

> ⚠️ *"Multi-AZ DB clusters aren't the same as Aurora DB clusters."*

## A pegadinha nº 1 do RDS

**O standby do Multi-AZ instance não aceita leitura.** *"You can't use a standby replica to serve read traffic."*
Escalar leitura = **read replica** (ou Multi-AZ **DB cluster**).

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[Aurora]] · [[RDS Proxy]] · [[DynamoDB]] · [[AWS Backup]] · [[Custo de banco de dados]]
- [Multi-AZ no RDS](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html)
