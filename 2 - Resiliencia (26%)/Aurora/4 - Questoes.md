---
tags: [saa-c03, aurora, questoes]
servico: Amazon Aurora
atualizado: 2026-11-08
---

# Aurora — Questões

> [!question]- Q1. Aplicação global precisa de leitura local em 3 continentes e failover para outra região com RPO de segundos e RTO de minutos.
> **A)** Aurora com 15 réplicas na região principal
> **B)** **Aurora Global Database com clusters secundários nas regiões de leitura** ✅
> **C)** RDS Multi-AZ DB cluster
> **D)** Read replicas cross-Region do RDS MySQL
>
> **Por que B**: lag *"typically under a second"*, **RPO em segundos**, **RTO em minutos**, leitura local em até 10 regiões secundárias.
> **A errada**: réplicas na mesma região não resolvem latência global nem DR regional.
> **C errada**: Multi-AZ DB cluster é **intra-região**.
> **D errada**: funciona, mas a promoção é manual e o lag é menos previsível.

> [!question]- Q2. Relatórios pesados devem rodar só nas duas instâncias maiores do cluster, sem afetar as réplicas que servem a aplicação.
> **A)** Reader endpoint
> **B)** **Custom endpoint apontando para as duas instâncias grandes** ✅
> **C)** Instance endpoint de cada uma, com balanceamento no app
> **D)** Cluster endpoint com hint de leitura
>
> **Por que B**: *"Connect to different subsets of DB instances... useful when you have different instance capacities and configurations."*
> **A errada**: balanceia entre **todas** as réplicas.
> **C errada**: instance endpoint **não** redireciona no failover.
> **D errada**: cluster endpoint é o **writer**.

> [!question]- Q3. Um cluster Aurora de desenvolvimento fica ocioso à noite e nos fins de semana. Como reduzir custo?
> **A)** Aurora Serverless v2 com mínimo 0,5 ACU
> **B)** **Aurora Serverless v2 com mínimo 0 ACU (pausa automática)** ✅
> **C)** Parar o cluster manualmente
> **D)** Reduzir a instance class
>
> **Por que B**: só com mínimo **0 ACU** o cluster pausa — com 0,5 ACU ele fica sempre ligado.
> **C errada**: funciona, mas exige automação e o storage continua cobrando; a pausa do Serverless v2 é automática.

> [!question]- Q4. Um teste de DR precisa trocar a região primária do Global Database **sem perda de dados**.
> **A)** Failover com `--allow-data-loss`
> **B)** **Switchover (managed planned failover)** ✅
> **C)** Promover uma read replica
> **D)** Restaurar um snapshot na outra região
>
> **Por que B**: *"Because this feature synchronizes secondary DB clusters with the primary before making any other changes, RPO is 0 (no data loss)."*
> **A errada**: é para **desastre**, e o próprio nome do parâmetro admite perda.

> [!question]- Q5. Um cluster Aurora de produção tem I/O representando 40% da fatura.
> **A)** Reduzir a instance class
> **B)** **Mudar o cluster para Aurora I/O-Optimized** ✅
> **C)** Adicionar read replicas
> **D)** Migrar para RDS MySQL
>
> **Por que B**: *"best choice when your I/O spending is 25% or more"*.
> **C errada**: **adiciona** custo de compute.

> [!question]- Q6. Quanto tempo leva o failover de um cluster Aurora que tem **uma única** instância?
> **A)** Menos de 30 segundos
> **B)** Menos de 60 segundos
> **C)** **Menos de 10 minutos (a instância é recriada)** ✅
> **D)** Não há failover
>
> **Por que C**: sem réplica, *"the primary instance is recreated in the same AZ... typically takes less than 10 minutes"*. Os dados estão seguros (6 cópias em 3 AZs), mas o serviço fica fora até a instância subir.
> **D errada**: há failover — mas lento. É o argumento para ter ao menos uma réplica.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Aurora tem 3 cópias | **6 cópias, em 3 AZs** |
| As réplicas copiam os dados | Leem o **mesmo** cluster volume |
| Cluster de 1 instância não é multi-AZ | *"a single DB instance is still a cluster"* — o storage já abrange 3 AZs |
| Failover é sempre < 60 s | **Sem réplica**, é **< 10 min** |
| Instance endpoint sobrevive a failover | **Não redireciona**. Writer e reader sim |
| Aurora Global Database é multi-master | **1 primária escreve**; write forwarding encaminha para ela |
| Global Database tem RPO 0 sempre | **Switchover** = RPO 0. **Failover** de desastre = segundos |
| Global Database suporta Auto Scaling nas secundárias | *"doesn't support Aurora Auto Scaling for secondary DB clusters"* |
| Secrets Manager funciona com Global Database | *"Secrets Manager doesn't support Aurora Global Database"* |
| Serverless v2 sempre pausa | Só com mínimo **0 ACU** |
| I/O-Optimized é sempre melhor | Só a partir de **25%** de I/O na fatura |
| Aurora = Multi-AZ DB cluster do RDS | *"aren't the same as Aurora DB clusters"* |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
