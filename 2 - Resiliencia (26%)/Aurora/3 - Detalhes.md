---
tags: [saa-c03, aurora, detalhes]
servico: Amazon Aurora
atualizado: 2026-11-08
---

# Aurora — Detalhes

## 1. O cluster volume

*"Aurora synchronously replicates the data across Availability Zones to six storage nodes associated with your cluster volume."* O volume *"consists of copies of the data across three Availability Zones in a single AWS Region"*.

Duas consequências que a prova explora:

**A quantidade de cópias não depende das instâncias.** *"The amount of replication is independent of the number of DB instances in your cluster."* Um cluster com **uma** instância já tem as 6 cópias — e *"an Aurora configuration with only a single DB instance is still a cluster"*.

**As réplicas não copiam dados.** As Aurora Replicas leem o **mesmo** cluster volume. Por isso adicionar réplica é rápido e o lag é mínimo (ao contrário do read replica do RDS, que replica logicamente).

O volume **cresce e encolhe** automaticamente: *"Aurora cluster volume can grow up to 256 tebibytes (TiB) for specific engine versions"*, e libera espaço quando dados são apagados.

## 2. Failover

| Cenário | Tempo |
|---|---|
| **Com** Aurora Replica | *"service is typically restored in less than 60 seconds, and often less than 30 seconds"* |
| **Sem** réplica | *"the primary instance is recreated in the same AZ... typically takes less than 10 minutes"* |

A doc acrescenta: *"Promoting an Aurora Replica to the primary instance is much faster than creating a new primary instance."*

**Prioridade (promotion tier)**: *"Priorities range from 0 for the highest priority to 15 for the lowest priority."* Empate → a **maior** instância; empate de novo → arbitrária. E: *"After five unsuccessful failover attempts, promotion tiers are no longer considered."* Mudar a prioridade **não** dispara failover.

As Aurora Replicas usam replicação **assíncrona** para servir leitura: *"Aurora Replicas use asynchronous replication to support high availability without affecting primary instance performance."*

Durante o failover em **Aurora MySQL**: *"Aurora restarts only the writer DB instance and the reader instance to which it fails over. Other reader instances in the cluster remain available."*

⚠️ Nuance do reader endpoint: *"During a failover, the reader endpoint might direct connections to the new primary DB instance of a DB cluster for a short time after an Aurora Replica is promoted."*

E uma dica operacional da própria doc: *"the fastest path to recovery is often to restart or to fail over to the same DB instance. Restarting is faster and involves less overhead than failover."*

## 3. Os endpoints — qual usar

**Cluster endpoint** (writer): *"Connect to the primary instance of your cluster to develop and test applications, and perform transformations like INSERT statements and DDL, DML, and ETL operations."* Sempre representa a primária atual.

**Reader endpoint**: *"Perform queries. Aurora automatically performs connection-balancing among all the Aurora Replicas."*

**Custom endpoint**: *"Connect to different subsets of DB instances on the DB cluster. This is useful when you have different instance capacities and configurations within your DB cluster."* O caso clássico: duas instâncias grandes dedicadas a relatórios pesados, sem afetar as que servem a aplicação.

**Instance endpoint**: *"Examine details about a specific DB instance for diagnosis or tuning."* **Não** redireciona no failover — se a aplicação usa instance endpoint, você gerencia a descoberta.

## 4. Aurora Global Database

Estrutura: *"one primary AWS Region where your data is written, and up to 10 read-only secondary AWS Regions"*. O lag é *"typically under a second"*, com *"dedicated infrastructure"*.

Cada cluster secundário suporta **16** instâncias de leitura — *"rather than the usual limit of 15 for a single Aurora cluster"*, porque não precisa de writer.

**Switchover × failover** — a distinção mais importante:

| Operação | Quando | RPO |
|---|---|---|
| **Switchover** (antes *"managed planned failover"*) | Operação **planejada** (rotação regional, teste de DR) | **0** — *"synchronizes secondary DB clusters with the primary before making any other changes"* |
| **Failover** | **Desastre** na região primária | *"a non-zero value measured in seconds"* (CLI exige `--allow-data-loss`) |

RTO geral: *"can be in the order of minutes"*. Em versões qualificadas, o switchover leva *"typically under 30 seconds"*.

**Write forwarding**: *"secondary clusters in an Aurora global database forward SQL statements that perform write operations to the primary cluster."* Ou seja: **não é multi-master** — a escrita sempre acaba na primária.

Limitações documentadas: sem **Aurora Auto Scaling** nas secundárias, sem **Backtrack**, não dá para parar/iniciar clusters individualmente, e *"Secrets Manager doesn't support Aurora Global Database"*.

Para Aurora PostgreSQL há controle de RPO: o parâmetro `rds.global_db_rpo` aceita *"from 20 seconds to 2,147,483,647 seconds"* e **bloqueia a transação** se o lag das secundárias exceder o RPO definido.

## 5. Aurora Serverless v2

*"an on-demand, autoscaling configuration... Capacity is adjusted automatically based on application demand. You're charged only for the resources that your DB clusters consume."*

**1 ACU ≈ 2 GiB** de memória. Mínimo **0,5 ACU**; com **0 ACU** o cluster **pausa automaticamente**.

A escala é fina e sem interrupção: *"Aurora serverless can add half an ACU when only a little more capacity is needed"*, *"Scaling can change capacity by as little as 0.5 ACUs, instead of doubling or halving"*, e *"Scaling typically happens with no pause in processing at all"* — inclusive *"while SQL statements are running and transactions are open"*.

Diferença estrutural com o provisionado: *"For a provisioned cluster, scaling up requires adding a whole new DB instance."* E a conversão é sem recriar: *"You can modify existing DB instances from provisioned to Aurora serverless or from Aurora serverless to provisioned."*

⚠️ `max_connections` é derivado do **máximo de ACU** e é **estático** — mudar o máximo exige reboot.

## 6. Custo: Standard × I/O-Optimized

| Configuração | Quando |
|---|---|
| **Aurora Standard** | *"best choice when your I/O spending is less than 25%"* da fatura |
| **Aurora I/O-Optimized** | *"best choice when your I/O spending is 25% or more"* — sem cobrança por I/O |

Troca de Standard para I/O-Optimized: *"once every 30 days"*.

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[RDS]] · [[RDS Proxy]] · [[Disaster Recovery (RPO e RTO)]] · [[Custo de banco de dados]] · [[Secrets Manager]]
- [Alta disponibilidade no Aurora](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Concepts.AuroraHighAvailability.html)
- [Aurora Global Database](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html)
