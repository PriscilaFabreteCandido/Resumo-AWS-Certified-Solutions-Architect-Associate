---
tags: [saa-c03, dms, detalhes]
servico: AWS DMS
atualizado: 2026-11-08
---

# DMS — Detalhes

## 1. Por que o DMS existe

Migrar um banco de 4 TB com um `dump` e `restore` significa **parar a aplicação** pelo tempo da cópia mais o tempo da restauração — horas ou dias.

O DMS resolve com **replicação contínua**: *"You can perform one-time migrations or replicate ongoing changes to keep sources and targets in sync."*

O fluxo:

```
1. FULL LOAD    → copia o estado atual, com a ORIGEM NO AR
2. CDC          → replica as mudanças que ocorreram durante a carga
3. (sincronizados)
4. CUTOVER      → aponta a aplicação para o destino  ← a única janela de downtime
```

A janela de indisponibilidade cai de horas para **minutos**.

## 2. Homogênea × heterogênea

**Homogênea** — mesmo engine (Oracle → RDS Oracle, MySQL → Aurora MySQL). O schema é compatível; o DMS sozinho resolve.

**Heterogênea** — engines diferentes (Oracle → Aurora PostgreSQL, SQL Server → MySQL). A doc confirma: *"AWS DMS supports fully heterogeneous data migrations between the supported engines"*. Mas os **dados** são só metade do problema: tipos de coluna, procedures, triggers, funções, packages e sintaxe precisam ser **convertidos**.

Para isso existem duas ferramentas:
- **DMS Schema Conversion** (no console): *"automatically assesses and converts your source schemas to a new target engine"*
- **AWS SCT** (instalado localmente): *"you can download the AWS Schema Conversion Tool (AWS SCT) to your local PC to convert your source schemas"*

> [!important] A divisão que a prova cobra
> **DMS = dados. Schema Conversion/SCT = schema.**
> Numa migração heterogênea, a resposta correta menciona **as duas**.

## 3. A migração heterogênea como alavanca de **custo**

Esse é o ângulo do domínio 4. Sair de **Oracle** ou **SQL Server** para **Aurora PostgreSQL/MySQL** elimina a **licença** comercial — e isso costuma superar qualquer otimização de instância.

O guia pede, em **Task 4.3**: *"Migrating database schemas and data to different locations and/or different database engines"*, e cita no Knowledge of *"Database engines with appropriate use cases (for example, heterogeneous migrations, homogeneous migrations)"*.

Por isso "trocar o engine" aparece tanto em questões de **custo de banco**, não só de migração.

## 4. Componentes e operação

| Componente | Papel |
|---|---|
| **Replication instance** | A instância EC2 gerenciada que faz o trabalho |
| **Endpoints** | Origem e destino (com credencial, tipicamente do **Secrets Manager**) |
| **Replication task** | Full load, full load + CDC, ou CDC only |
| **Table mappings** | Quais tabelas migrar, com transformações (renomear, filtrar) |
| **DMS Fleet Advisor** | **Descobre** o inventário de bancos no datacenter antes de migrar |
| **Failover** | *"automatic failover"* com servidor de replicação de backup |

Segurança: *"data at rest encrypted with AWS KMS"* e **SSL** para o dado em trânsito.

Dimensionar a **replication instance** importa: carga grande com muitas mudanças exige mais CPU e memória, e o CDC acumula se a instância não acompanhar.

## 5. Origens e destinos

O DMS cobre *"relational databases, data warehouses, NoSQL databases, and other types of data stores"*. Combinações que aparecem em prova:

| Origem | Destino |
|---|---|
| Oracle / SQL Server on-premises | **RDS**, **Aurora** |
| MySQL / PostgreSQL | **Aurora** (homogênea) |
| Oracle | **Aurora PostgreSQL** (heterogênea, + SCT) |
| Qualquer banco suportado | **S3** (para data lake), **Redshift**, **DynamoDB**, **OpenSearch** |
| On-premises | AWS — e também **entre nuvens** ou da AWS para on-premises |

O destino **S3** é útil para alimentar um data lake continuamente a partir de um banco transacional (CDC → S3 → Athena/Glue).

## 6. DMS × as alternativas

| Objetivo | Serviço |
|---|---|
| Migrar **banco**, com downtime mínimo | **DMS** |
| Converter **schema** entre engines | **DMS Schema Conversion** / **AWS SCT** |
| Migrar **servidores inteiros** (lift and shift) | **Application Migration Service (MGN)** |
| **Descobrir** o que existe no datacenter | **Application Discovery Service** (servidores) / **DMS Fleet Advisor** (bancos) |
| Mover **arquivos** | **DataSync** |
| Mover **sem banda** | **Snow Family** |
| Snapshot nativo do mesmo engine | Restore de snapshot (mais simples, mas com downtime) |

## 7. Onde entra nos 7 Rs

| Estratégia | Ferramenta |
|---|---|
| **Rehost** (lift and shift) | **MGN** |
| **Replatform** (ex.: SQL Server → RDS for SQL Server) | **DMS** (homogênea) |
| **Refactor** (ex.: Oracle → Aurora PostgreSQL) | **DMS + SCT** (heterogênea) |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[RDS]] · [[Aurora]] · [[S3]] · [[Redshift]] · [[DataSync]] · [[Snow Family]] · [[Estrategias de migracao (7 Rs)]] · [[Custo de banco de dados]] · [[Secrets Manager]]
