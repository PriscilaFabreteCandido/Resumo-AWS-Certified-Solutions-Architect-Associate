---
tags: [saa-c03, rds, decorar]
servico: Amazon RDS
atualizado: 2026-11-08
---

# RDS — Decorar

## A tabela central

| | Multi-AZ **instance** | Multi-AZ **cluster** | **Read replica** |
|---|---|---|---|
| Topologia | 1 primária + 1 standby | 1 writer + **2 readers**, **3 AZs** | N réplicas |
| Replicação | **Síncrona** | **Semi-síncrona** | **Assíncrona** |
| Standby/réplica lê? | **Não** | **Sim** | **Sim** |
| Failover automático | Sim | Sim, **< 35 s** | Não (promoção **manual**) |
| Objetivo | **HA** | HA + leitura + menor latência de escrita | **Escala de leitura** / DR |
| Engines | MariaDB, MySQL, Oracle, PostgreSQL, SQL Server, RDS Custom for SQL Server | MySQL e PostgreSQL | Db2, MariaDB, MySQL, Oracle, PostgreSQL, SQL Server |

**Semi-síncrono** (cluster): *"requires acknowledgment from at least one reader DB instance in order for a change to be committed. It doesn't require acknowledgment that events have been fully executed and committed on all replicas."*

## Read replicas — detalhes

| Item | Regra |
|---|---|
| Replicação | **Assíncrona** |
| Número máximo | **A doc não informa** um número |
| Cross-Region | **Suportado** |
| Promoção | Pode ser promovida a instância autônoma (estratégia de DR) |
| Autoscaling | *"RDS doesn't support autoscaling of read replicas"* |
| **Cascata** (réplica de réplica) | MariaDB, MySQL e **certas versões** de PostgreSQL: **sim**. **Db2, Oracle e SQL Server: não** |
| Replicação circular | **Não** suportada |
| Se deletar a origem | Réplicas **na mesma região** são **promovidas** automaticamente |
| Billing | *"Read replicas are billed as standard DB instances"* |
| Storage | Pode ter tipo diferente; aumento mínimo de **10%** |
| Db2 standby / Oracle mounted | *"don't accept user connections"* — só DR cross-Region |

## Backup

| Mecanismo | Sobrevive à exclusão da instância? |
|---|---|
| **Backup automático** (janela de retenção) | **❌ Não** |
| **Snapshot manual** | **✅ Sim** |

Multi-AZ DB cluster: *"RDS creates a storage volume snapshot of your DB cluster, backing up the entire cluster."*

## RDS Proxy — o número

Reduz o tempo de failover *"by up to 66% for Aurora Multi-AZ databases"*, e o downtime de upgrade de minor version de Multi-AZ DB cluster a *"one second or less"*.

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[02 - Numeros para decorar]]
