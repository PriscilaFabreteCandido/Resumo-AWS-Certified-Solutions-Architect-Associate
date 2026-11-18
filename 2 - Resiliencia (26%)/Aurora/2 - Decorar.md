---
tags: [saa-c03, aurora, decorar]
servico: Amazon Aurora
atualizado: 2026-11-08
---

# Aurora — Decorar

## Os números

| Item | Valor |
|---|---|
| **Cópias dos dados** | **6 cópias em 3 AZs**, replicação **síncrona** |
| **Aurora Replicas** | até **15** |
| **Volume do cluster** | até **128 TiB** (*"up to 256 tebibytes (TiB) for specific engine versions"* (até 256 tebibytes (TiB) em determinadas versões de engine)) |
| **Failover com réplica** | *"less than 60 seconds, and often less than 30 seconds"* (menos de 60 segundos, e frequentemente menos de 30) |
| **Failover sem réplica** | *"typically takes less than 10 minutes"* (recria a instância) |
| **Prioridade de failover** | **tier 0** (maior) a **15** (menor) |
| Empate de prioridade | promove a **maior** instância; se empatar de novo, arbitrária |
| Após 5 tentativas falhas | *"promotion tiers are no longer considered"* (os níveis de promoção deixam de ser considerados) |
| **I/O-Optimized** | vale quando I/O ≥ **25%** da fatura; troca permitida **1× a cada 30 dias** |

## Aurora Global Database

| Item | Valor |
|---|---|
| Regiões | 1 primária + **até 10 secundárias** |
| Lag de replicação | *"typically under a second"* (normalmente abaixo de um segundo) |
| Instâncias de leitura na secundária | **16** (vs 15 num cluster normal) |
| **RTO** | *"can be in the order of minutes"* (pode ser da ordem de minutos) |
| **RPO** | *"typically measured in seconds"* (normalmente medido em segundos) |
| **Switchover** (planejado) | **RPO = 0** — *"synchronizes secondary DB clusters with the primary before making any other changes"* (sincroniza os clusters secundários com o primário antes de fazer qualquer outra mudança) |
| Switchover em versões qualificadas | *"typically under 30 seconds"* (normalmente abaixo de 30 segundos) |
| **Failover** (desastre) | RPO *"a non-zero value measured in seconds"* (um valor diferente de zero, medido em segundos); CLI exige `--allow-data-loss` |
| Writer endpoint global | Sempre aponta para a primária, mesmo após troca de região |

⚠️ Limitações documentadas: **não** suporta Aurora Auto Scaling nas secundárias · **não** suporta Backtrack · **não** dá para parar/iniciar clusters individualmente · **Secrets Manager não suporta** Global Database.

## Aurora Serverless v2

| Item | Valor |
|---|---|
| **1 ACU** | ≈ **2 GiB** de memória |
| Mínimo | **0,5 ACU** (instância sempre ligada) ou **0 ACU** (**pausa automática**) |
| Granularidade de escala | **0,5 ACU** — *"instead of doubling or halving"* (em vez de dobrar ou reduzir pela metade) |
| Cobrança | **por segundo** |
| Mínimos recomendados | **2 ACUs** com Performance Insights · **8 ACUs** para Global Database (região primária) |
| `max_connections` | derivado do **máximo de ACU**; parâmetro **estático** (reboot ao mudar o máximo) |

## Os quatro endpoints

| Endpoint | Para quê | Redireciona no failover? |
|---|---|---|
| **Cluster (writer)** | Escrita, DDL, DML, ETL | **Sim** |
| **Reader** | Leitura, com *"connection-balancing among all the Aurora Replicas"* (balanceamento de conexões entre todas as réplicas do Aurora) | **Sim** |
| **Custom** | Subconjunto de instâncias (ex.: só as grandes, para relatório) | — |
| **Instance** | Uma instância específica, para diagnóstico | **Não** |

> *"Unlike the instance endpoints, the writer and reader endpoints automatically change which DB instance they connect to if a DB instance in your cluster becomes unavailable."* (ao contrário dos endpoints de instância, os endpoints de escrita e de leitura mudam automaticamente a qual instância se conectam se alguma do cluster ficar indisponível)

## Links

- [[2 - Resiliencia (26%)/Aurora/1 - O que e|1 - O que e]] · [[2 - Resiliencia (26%)/Aurora/3 - Detalhes|3 - Detalhes]] · [[2 - Resiliencia (26%)/Aurora/4 - Questoes|4 - Questoes]]
- [[02 - Numeros para decorar]]
