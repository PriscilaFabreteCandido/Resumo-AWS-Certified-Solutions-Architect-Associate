---
tags: [saa-c03, dominio-2, rds, aurora, read-replica, multi-az]
dominio: 2
tasks: [2.2]
atualizado: 2026-11-08
---

# Bancos resilientes — RDS, Aurora e read replicas

## 🧩 Em 30 segundos

| Objetivo | Solução |
|---|---|
| **Alta disponibilidade** no RDS | **Multi-AZ DB instance** — 1 standby **síncrono**, que **não lê** |
| HA **+ capacidade de leitura** no RDS | **Multi-AZ DB cluster** — 1 writer + **2 readers** em **3 AZs**, semi-síncrono, failover **< 35 s** |
| **Escalar leitura** | **Read replica** — **assíncrona**, até cross-Region, promovível |
| HA + performance + escala | **Aurora** — **6 cópias em 3 AZs**, até **15** réplicas, failover **< 60 s** (com réplica) |
| DR **multi-região** gerenciado | **Aurora Global Database** — até **10** regiões secundárias, RPO em **segundos**, RTO em **minutos** |
| Carga imprevisível | **Aurora Serverless v2** — **1 ACU ≈ 2 GiB**, passos de **0,5 ACU**, cobrado por segundo |

## 🧠 Teste-se primeiro

> [!question]- Multi-AZ DB instance × Multi-AZ DB cluster × read replica
> | | Multi-AZ **instance** | Multi-AZ **cluster** | **Read replica** |
> |---|---|---|---|
> | Topologia | 1 primária + 1 standby | 1 writer + **2 readers**, **3 AZs** | N réplicas |
> | Replicação | **Síncrona** | **Semi-síncrona** (*"acknowledgment from at least one reader"*) | **Assíncrona** |
> | Standby/réplica lê? | **Não** | **Sim** | **Sim** |
> | Failover automático | Sim | Sim, *"typically under 35 seconds"* | Não (promoção manual) |
> | Objetivo | **HA** | HA + leitura + **menor latência de escrita** | **Escala de leitura** / DR |
>
> Citações: *"Multi-AZ DB instance deployment has one standby DB instance that provides failover support, but doesn't serve read traffic."* · *"A Multi-AZ DB cluster has a writer DB instance and two reader DB instances in three separate Availability Zones."*
> ⚠️ *"Multi-AZ DB clusters aren't the same as Aurora DB clusters."*

> [!question]- Aurora: cópias, réplicas, failover
> **6 cópias dos dados em 3 AZs**: *"Aurora synchronously replicates the data across Availability Zones to six storage nodes"*.
> Até **15 Aurora Replicas** além da primária. Prioridade de failover de **tier 0** (maior) a **15** (menor); empate → a **maior** instância; empate de novo → arbitrária. *"After five unsuccessful failover attempts, promotion tiers are no longer considered."*
> Failover **com** réplica: *"typically restored in less than 60 seconds, and often less than 30 seconds"*. **Sem** réplica: recria a instância, *"typically takes less than 10 minutes"*.
> Volume do cluster cresce automaticamente até **128 TiB** (até 256 TiB em versões específicas) e **encolhe** quando você apaga dados.

> [!question]- Os quatro endpoints do Aurora
> **Cluster endpoint** (writer): *"Connect to the primary instance... INSERT statements and DDL, DML, and ETL"*. Sempre aponta para a primária atual.
> **Reader endpoint**: *"Aurora automatically performs connection-balancing among all the Aurora Replicas"*.
> **Custom endpoint**: *"Connect to different subsets of DB instances"* — útil quando as instâncias têm tamanhos diferentes (ex.: endpoint só para relatórios nas instâncias grandes).
> **Instance endpoint**: uma instância específica, para diagnóstico. **Não** redireciona em failover.
>
> *"Unlike the instance endpoints, the writer and reader endpoints automatically change which DB instance they connect to if a DB instance in your cluster becomes unavailable."*

> [!question]- Aurora Global Database: números e RPO/RPO
> 1 região primária + **até 10 secundárias**. Lag *"typically under a second"*. Cluster secundário suporta **16** instâncias de leitura (contra 15 no normal).
> **RTO**: *"can be in the order of minutes"*. **RPO**: *"typically measured in seconds"*.
> **Switchover** (planejado, antes chamado *managed planned failover*): **RPO 0** — *"Because this feature synchronizes secondary DB clusters with the primary before making any other changes, RPO is 0 (no data loss)"*. Em versões qualificadas, *"switchover recovery time... is typically under 30 seconds"*.
> **Failover** (desastre): RPO *"a non-zero value measured in seconds"*. CLI exige `--allow-data-loss`.
> **Write forwarding**: secundárias encaminham escrita para a primária.
> O **writer endpoint do global database** sempre aponta para a primária, mesmo depois de trocar de região.

## Read replicas — detalhes

| Item | Regra |
|---|---|
| Replicação | **Assíncrona** |
| Cross-Region | Suportado; a AWS monta um canal seguro |
| Promoção | Pode ser promovida a instância autônoma (é estratégia de DR) |
| Autoscaling | *"RDS doesn't support autoscaling of read replicas"* |
| Cascata | MariaDB, MySQL e certas versões de PostgreSQL **permitem** réplica de réplica. **Db2, Oracle e SQL Server não permitem** |
| Replicação circular | Não suportada |
| Se deletar a origem | Réplicas na **mesma região** são **promovidas** automaticamente a instâncias autônomas |
| Billing | *"Read replicas are billed as standard DB instances."* Transferência na mesma região é grátis |
| Storage | Pode ter tipo de storage diferente; aumento mínimo de **10%** |
| Db2 standby e Oracle mounted replicas | *"don't accept user connections"* — servem para DR cross-Region |

## Aurora Serverless v2

- **1 ACU ≈ 2 GiB** de memória.
- Mínimo **0,5 ACU** com a instância sempre ligada, ou **0 ACU** para **pausar automaticamente**.
- Escala em passos de **0,5 ACU**: *"Scaling can change capacity by as little as 0.5 ACUs, instead of doubling or halving"*, e *"Scaling typically happens with no pause in processing at all"*.
- Cobrado **por segundo**.
- Conversão provisionado ⇄ serverless **sem** recriar o cluster.
- Mínimos recomendados: **2 ACUs** com Performance Insights, **8 ACUs** para global database (na região primária).
- ⚠️ `max_connections` é derivado do **máximo de ACU** e é parâmetro estático (reboot ao mudar o máximo).

## RDS Proxy

- Problema que resolve: *"allow your applications to pool and share database connections to improve their ability to scale"*. Faz **load shedding** quando passa do limite configurado.
- Resiliência: *"automatically connecting to a standby DB instance while preserving application connections"*; reduz o failover *"by up to 66% for Aurora Multi-AZ databases"*; reduz downtime de upgrade de minor version de Multi-AZ DB cluster a *"one second or less"*.
- Integra com **IAM auth** e **Secrets Manager** (até **200** secrets por proxy).
- Limites: **20** proxies por conta; endpoint padrão abrange **só duas AZs**; **não** pode ser público; ⚠️ *"you can associate a proxy only with the writer DB instance, not a read replica"*.
- Engines documentados: MariaDB, SQL Server, MySQL, PostgreSQL (e Aurora).

## ❓ Questões de prova

> [!example]- Q1 — Um banco RDS MySQL está com CPU alta por causa de relatórios de leitura, e o negócio também exige failover automático entre AZs. Qual combinação?
> **A)** Multi-AZ DB instance e apontar os relatórios para o standby
> **B)** **Multi-AZ DB instance (para HA) + uma ou mais read replicas (para os relatórios)** ✅
> **C)** Só read replicas em duas AZs
> **D)** Aumentar a instance class
>
> **Por que B**: são **dois requisitos diferentes**. Multi-AZ resolve failover; read replica resolve leitura. (Alternativa também correta em prova: **Multi-AZ DB cluster**, cujos 2 readers atendem leitura e dão failover — se estiver entre as opções e o engine for MySQL/PostgreSQL, é a resposta mais elegante.)
> **A errada**: *"You can't use a standby replica to serve read traffic."* É a pegadinha central do tema.
> **C errada**: read replica **não** faz failover automático.
> **D errada**: trata o sintoma, com teto e sem HA.

> [!example]- Q2 — Uma aplicação global precisa de leitura local em 3 continentes e failover para outra região com RPO de segundos e RTO de minutos. Qual solução?
> **A)** Aurora com 15 réplicas na região principal
> **B)** **Aurora Global Database com clusters secundários nas regiões de leitura** ✅
> **C)** RDS Multi-AZ DB cluster
> **D)** Read replicas cross-Region do RDS MySQL
>
> **Por que B**: é literalmente o produto para esse requisito — lag *"typically under a second"*, **RPO em segundos**, **RTO em minutos**, leitura local em até 10 regiões secundárias.
> **A errada**: réplicas na mesma região não resolvem latência global nem DR regional.
> **C errada**: Multi-AZ DB cluster é **intra-região**.
> **D errada**: funciona, mas a promoção é manual, o lag é menos previsível e você gerencia o failover — pior RTO e mais esforço operacional.

> [!example]- Q3 — Um cluster Aurora precisa que relatórios pesados rodem apenas nas duas instâncias maiores, sem afetar as réplicas que servem a aplicação. Como configurar a conexão?
> **A)** Reader endpoint
> **B)** **Custom endpoint apontando para as duas instâncias grandes** ✅
> **C)** Instance endpoint de cada instância grande, com balanceamento no app
> **D)** Cluster endpoint com hint de leitura
>
> **Por que B**: custom endpoint existe para isso — *"Connect to different subsets of DB instances on the DB cluster. This is useful when you have different instance capacities and configurations"*.
> **A errada**: reader endpoint balanceia entre **todas** as réplicas, inclusive as pequenas.
> **C errada**: funciona, mas instance endpoint **não** redireciona em failover e você reimplementa balanceamento.
> **D errada**: cluster endpoint é o **writer**.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Standby do Multi-AZ lê | **Não lê** (no Multi-AZ *instance*) |
| Multi-AZ DB cluster é Aurora | *"aren't the same as Aurora DB clusters"* |
| Read replica é síncrona | **Assíncrona** |
| Read replica faz failover automático | Promoção é **manual** |
| Read replica tem autoscaling | *"RDS doesn't support autoscaling of read replicas"* |
| Qualquer engine permite réplica de réplica | **Não**: Db2, Oracle e SQL Server não permitem |
| Aurora tem 3 cópias | **6, em 3 AZs** |
| Aurora sem réplica tem o mesmo failover | **< 10 min** (recria a instância), contra < 60 s com réplica |
| Instance endpoint sobrevive a failover | **Não redireciona.** Writer e reader endpoints redirecionam |
| Aurora Global Database é multi-master | **1 primária escrevendo.** Secundárias escrevem só com **write forwarding**, que encaminha para a primária |
| Aurora Global tem RPO 0 sempre | **Switchover** planejado = RPO 0. **Failover** de desastre = segundos |
| Aurora Serverless v2 pausa sozinho | Só com mínimo **0 ACU** |
| RDS Proxy funciona com read replica | **Só com o writer** |
| Aurora Global Database tem Auto Scaling na secundária | *"doesn't support Aurora Auto Scaling for secondary DB clusters"* |

## Links

- [[02 - Dominio 2 - Design Resilient Architectures (26%)]]
- [[Bancos de alta performance - DynamoDB, DAX, ElastiCache e Redshift]]
- [[Disaster Recovery (RTO e RPO)]]
- [[Custo de banco de dados]]
- [Multi-AZ no RDS](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html)
- [Alta disponibilidade no Aurora](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Concepts.AuroraHighAvailability.html)
