---
tags: [saa-c03, dms, decorar]
servico: AWS DMS
atualizado: 2026-11-08
---

# DMS — Decorar

## As duas ferramentas

| Ferramenta | Faz |
|---|---|
| **AWS DMS** | Migra **os dados** (one-time ou contínuo) |
| **DMS Schema Conversion** / **AWS SCT** | Converte **o schema** (migração heterogênea) |

## Homogênea × heterogênea

| | **Homogênea** | **Heterogênea** |
|---|---|---|
| Engines | Iguais (MySQL → Aurora MySQL) | Diferentes (Oracle → Aurora PostgreSQL) |
| Ferramentas | **DMS** | **DMS + Schema Conversion/SCT** |
| Esforço | Baixo | Alto (procedures, triggers, tipos) |

## Modos de replicação

| Modo | Para quê |
|---|---|
| **Full load** | Carga única |
| **Full load + CDC** | Carga inicial **e** replicação contínua → **downtime mínimo** |
| **CDC only** | Só as mudanças |

A doc: *"replicate ongoing changes to keep sources and targets in sync"*. (O termo **CDC** não aparece nessa página de visão geral, mas é o nome do mecanismo.)

## Outros componentes citados

| Componente | Para quê |
|---|---|
| **DMS Fleet Advisor** | **Descoberta** do inventário de bancos antes de migrar |
| **Failover automático** | *"automatic failover"* com servidor de replicação de backup |
| Criptografia | **KMS** em repouso, **SSL** em trânsito |

## O que a doc lida NÃO afirma

- Os termos *"homogeneous"* e *"heterogeneous"* **não são definidos** nessa página (ela diz apenas *"fully heterogeneous data migrations between the supported engines"*)
- O termo **CDC** não é usado
- Se a **origem permanece disponível** durante a migração não é afirmado explicitamente — mas é o que a replicação contínua implica

## O gatilho de prova

| Enunciado | Resposta |
|---|---|
| "migrar banco mantendo o **mesmo engine**, com downtime mínimo" | **DMS** (full load + CDC) |
| "migrar **trocando o engine**" (Oracle → PostgreSQL) | **DMS + Schema Conversion / SCT** |
| "descobrir quais bancos existem no datacenter" | **DMS Fleet Advisor** |
| "migrar **servidores** inteiros" | **Application Migration Service (MGN)** |
| "sair de licença Oracle/SQL Server" | **DMS + SCT** para Aurora (alavanca de **custo**) |

## Links

- [[4 - Custo (20%)/DMS (Database Migration Service)/1 - O que e|1 - O que e]] · [[4 - Custo (20%)/DMS (Database Migration Service)/3 - Detalhes|3 - Detalhes]] · [[4 - Custo (20%)/DMS (Database Migration Service)/4 - Questoes|4 - Questoes]]
