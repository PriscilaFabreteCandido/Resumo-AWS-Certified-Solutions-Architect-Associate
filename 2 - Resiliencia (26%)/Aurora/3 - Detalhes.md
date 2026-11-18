---
tags: [saa-c03, aurora, detalhes]
servico: Amazon Aurora
atualizado: 2026-11-08
---

# Aurora — Detalhes

## 1. O cluster volume

*"Aurora synchronously replicates the data across Availability Zones to six storage nodes associated with your cluster volume."* (o Aurora replica os dados de forma síncrona entre Zonas de Disponibilidade, para seis nós de armazenamento associados ao volume do cluster) O volume *"consists of copies of the data across three Availability Zones in a single AWS Region"* (consiste em cópias dos dados em três Zonas de Disponibilidade, dentro de uma mesma Região).

Duas consequências que a prova explora:

**A quantidade de cópias não depende das instâncias.** *"The amount of replication is independent of the number of DB instances in your cluster."* (o volume de replicação independe da quantidade de instâncias no seu cluster) Um cluster com **uma** instância já tem as 6 cópias — e *"an Aurora configuration with only a single DB instance is still a cluster"* (uma configuração do Aurora com uma única instância ainda é um cluster).

**As réplicas não copiam dados.** As Aurora Replicas leem o **mesmo** cluster volume. Por isso adicionar réplica é rápido e o lag é mínimo (ao contrário do read replica do RDS, que replica logicamente).

O volume **cresce e encolhe** automaticamente: *"Aurora cluster volume can grow up to 256 tebibytes (TiB) for specific engine versions"* (o volume de cluster do Aurora pode crescer até 256 tebibytes (TiB) em determinadas versões de engine), e libera espaço quando dados são apagados.

## 2. Failover

| Cenário | Tempo |
|---|---|
| **Com** Aurora Replica | *"service is typically restored in less than 60 seconds, and often less than 30 seconds"* (o serviço normalmente é restabelecido em menos de 60 segundos, e frequentemente em menos de 30) |
| **Sem** réplica | *"the primary instance is recreated in the same AZ... typically takes less than 10 minutes"* (a instância primária é recriada na mesma AZ... normalmente leva menos de 10 minutos) |

A doc acrescenta: *"Promoting an Aurora Replica to the primary instance is much faster than creating a new primary instance."* (promover uma réplica do Aurora a instância primária é muito mais rápido do que criar uma instância primária nova)

**Prioridade (promotion tier)**: *"Priorities range from 0 for the highest priority to 15 for the lowest priority."* (as prioridades vão de 0, a mais alta, até 15, a mais baixa) Empate → a **maior** instância; empate de novo → arbitrária. E: *"After five unsuccessful failover attempts, promotion tiers are no longer considered."* (depois de cinco tentativas de failover malsucedidas, os níveis de promoção deixam de ser considerados) Mudar a prioridade **não** dispara failover.

As Aurora Replicas usam replicação **assíncrona** para servir leitura: *"Aurora Replicas use asynchronous replication to support high availability without affecting primary instance performance."* (as réplicas do Aurora usam replicação assíncrona para dar alta disponibilidade sem afetar o desempenho da instância primária)

Durante o failover em **Aurora MySQL**: *"Aurora restarts only the writer DB instance and the reader instance to which it fails over. Other reader instances in the cluster remain available."* (o Aurora reinicia apenas a instância de escrita e a de leitura para a qual o failover ocorre; as demais instâncias de leitura do cluster continuam disponíveis)

⚠️ Nuance do reader endpoint: *"During a failover, the reader endpoint might direct connections to the new primary DB instance of a DB cluster for a short time after an Aurora Replica is promoted."* (durante um failover, o endpoint de leitura pode direcionar conexões para a nova instância primária do cluster por um curto período depois que uma réplica do Aurora é promovida)

E uma dica operacional da própria doc: *"the fastest path to recovery is often to restart or to fail over to the same DB instance. Restarting is faster and involves less overhead than failover."* (o caminho mais rápido para a recuperação costuma ser reiniciar ou fazer failover para a mesma instância; reiniciar é mais rápido e tem menos sobrecarga que o failover)

## 3. Os endpoints — qual usar

**Cluster endpoint** (writer): *"Connect to the primary instance of your cluster to develop and test applications, and perform transformations like INSERT statements and DDL, DML, and ETL operations."* (conectar à instância primária do cluster para desenvolver e testar aplicações, e executar transformações como INSERT e operações de DDL, DML e ETL) Sempre representa a primária atual.

**Reader endpoint**: *"Perform queries. Aurora automatically performs connection-balancing among all the Aurora Replicas."* (executar consultas; o Aurora faz automaticamente o balanceamento de conexões entre todas as réplicas)

**Custom endpoint**: *"Connect to different subsets of DB instances on the DB cluster. This is useful when you have different instance capacities and configurations within your DB cluster."* (conectar a subconjuntos diferentes de instâncias do cluster; é útil quando você tem capacidades e configurações diferentes dentro do mesmo cluster) O caso clássico: duas instâncias grandes dedicadas a relatórios pesados, sem afetar as que servem a aplicação.

**Instance endpoint**: *"Examine details about a specific DB instance for diagnosis or tuning."* (examinar detalhes de uma instância específica, para diagnóstico ou ajuste) **Não** redireciona no failover — se a aplicação usa instance endpoint, você gerencia a descoberta.

## 4. Aurora Global Database

Estrutura: *"one primary AWS Region where your data is written, and up to 10 read-only secondary AWS Regions"* (uma Região primária, onde seus dados são gravados, e até 10 Regiões secundárias somente de leitura). O lag é *"typically under a second"* (normalmente abaixo de um segundo), com *"dedicated infrastructure"* (infraestrutura dedicada).

Cada cluster secundário suporta **16** instâncias de leitura — *"rather than the usual limit of 15 for a single Aurora cluster"* (em vez do limite usual de 15 de um único cluster do Aurora), porque não precisa de writer.

**Switchover × failover** — a distinção mais importante:

| Operação | Quando | RPO |
|---|---|---|
| **Switchover** (antes *"managed planned failover"* (failover planejado e gerenciado)) | Operação **planejada** (rotação regional, teste de DR) | **0** — *"synchronizes secondary DB clusters with the primary before making any other changes"* (sincroniza os clusters secundários com o primário antes de fazer qualquer outra mudança) |
| **Failover** | **Desastre** na região primária | *"a non-zero value measured in seconds"* (CLI exige `--allow-data-loss`) |

RTO geral: *"can be in the order of minutes"* (pode ser da ordem de minutos). Em versões qualificadas, o switchover leva *"typically under 30 seconds"* (normalmente abaixo de 30 segundos).

**Write forwarding**: *"secondary clusters in an Aurora global database forward SQL statements that perform write operations to the primary cluster."* (os clusters secundários de um banco global do Aurora encaminham ao cluster primário as instruções SQL que fazem operações de escrita) Ou seja: **não é multi-master** — a escrita sempre acaba na primária.

Limitações documentadas: sem **Aurora Auto Scaling** nas secundárias, sem **Backtrack**, não dá para parar/iniciar clusters individualmente, e *"Secrets Manager doesn't support Aurora Global Database"* (o Secrets Manager não oferece suporte ao Aurora Global Database).

Para Aurora PostgreSQL há controle de RPO: o parâmetro `rds.global_db_rpo` aceita *"from 20 seconds to 2,147,483,647 seconds"* (de 20 segundos a 2.147.483.647 segundos) e **bloqueia a transação** se o lag das secundárias exceder o RPO definido.

## 5. Aurora Serverless v2

*"an on-demand, autoscaling configuration... Capacity is adjusted automatically based on application demand. You're charged only for the resources that your DB clusters consume."* (uma configuração sob demanda, com escala automática... a capacidade é ajustada conforme a demanda da aplicação, e você paga apenas pelos recursos que seus clusters consomem)

**1 ACU ≈ 2 GiB** de memória. Mínimo **0,5 ACU**; com **0 ACU** o cluster **pausa automaticamente**.

A escala é fina e sem interrupção: *"Aurora serverless can add half an ACU when only a little more capacity is needed"* (o Aurora Serverless consegue adicionar meia ACU quando só um pouco mais de capacidade é necessário), *"Scaling can change capacity by as little as 0.5 ACUs, instead of doubling or halving"* (a escala pode variar a capacidade em apenas 0,5 ACU, em vez de dobrar ou reduzir pela metade), e *"Scaling typically happens with no pause in processing at all"* (a escala normalmente acontece sem nenhuma pausa no processamento) — inclusive *"while SQL statements are running and transactions are open"* (enquanto instruções SQL estão em execução e transações estão abertas).

Diferença estrutural com o provisionado: *"For a provisioned cluster, scaling up requires adding a whole new DB instance."* (num cluster provisionado, escalar para cima exige adicionar uma instância inteira nova) E a conversão é sem recriar: *"You can modify existing DB instances from provisioned to Aurora serverless or from Aurora serverless to provisioned."* (você pode modificar instâncias existentes de provisionadas para Aurora Serverless, e vice-versa)

⚠️ `max_connections` é derivado do **máximo de ACU** e é **estático** — mudar o máximo exige reboot.

## 6. Custo: Standard × I/O-Optimized

| Configuração | Quando |
|---|---|
| **Aurora Standard** | *"best choice when your I/O spending is less than 25%"* (melhor escolha quando seu gasto com I/O é menor que 25%) da fatura |
| **Aurora I/O-Optimized** | *"best choice when your I/O spending is 25% or more"* (melhor escolha quando seu gasto com I/O é de 25% ou mais) — sem cobrança por I/O |

Troca de Standard para I/O-Optimized: *"once every 30 days"* (uma vez a cada 30 dias).

## Links

- [[2 - Resiliencia (26%)/Aurora/1 - O que e|1 - O que e]] · [[2 - Resiliencia (26%)/Aurora/2 - Decorar|2 - Decorar]] · [[2 - Resiliencia (26%)/Aurora/4 - Questoes|4 - Questoes]]
- [[2 - Resiliencia (26%)/RDS/1 - O que e|RDS]] · [[2 - Resiliencia (26%)/RDS Proxy/1 - O que e|RDS Proxy]] · [[9 - Fundamentos e apoio/Disaster Recovery (RPO e RTO)/1 - O que e|Disaster Recovery (RPO e RTO)]] · [[4 - Custo (20%)/04 - Dominio 4 - Design Cost-Optimized Architectures (20%)|Custo (dominio 4)]] · [[1 - Seguranca (30%)/Secrets Manager/1 - O que e|Secrets Manager]]
- [Alta disponibilidade no Aurora](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Concepts.AuroraHighAvailability.html)
- [Aurora Global Database](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html)
