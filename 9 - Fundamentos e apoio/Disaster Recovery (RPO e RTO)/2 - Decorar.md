---
tags: [saa-c03, disaster-recovery, decorar]
conceito: Disaster Recovery (RPO e RTO)
atualizado: 2026-11-08
---

# DR — Decorar

## A tabela que resolve a questão

| Estratégia | RPO | RTO | O que está ligado no DR | Custo |
|---|---|---|---|---|
| **Backup and restore** | **horas** | **horas** (até 24h) | nada | $ |
| **Pilot light** | **minutos** | **dezenas de minutos** | banco e storage **ligados**; servidores **desligados** | $$ |
| **Warm standby** | **segundos** | **minutos** | **tudo ligado**, em escala reduzida | $$$ |
| **Multi-site active/active** | **~zero** | **~zero** (quase sem downtime) | **tudo ligado**, atendendo tráfego | $$$$ |

## Enunciado → estratégia

| O enunciado diz | Resposta |
|---|---|
| *"RTO de 24 horas"*, *"menor custo possível"* | **Backup and restore** |
| *"RTO de 10 a 30 minutos"*, *"não queremos pagar servidores ociosos"* | **Pilot light** |
| *"RTO de minutos"*, *"pode servir tráfego degradado"* | **Warm standby** |
| *"zero downtime"*, *"RPO e RTO próximos de zero"*, *"usuários em duas Regiões"* | **Multi-site active/active** |
| *"proteger contra corrupção/exclusão acidental de dados"* | **Backup** (+ **versionamento**, **Object Lock**) |
| *"a mais econômica que atende o RTO de X"* | A **menos** robusta que ainda cabe em X |

## Peças por estratégia

| Peça | Serve a |
|---|---|
| **AWS Backup** com **cross-Region copy** | Backup and restore |
| **S3 Cross-Region Replication** | Pilot light e acima |
| **Aurora Global Database** (RPO ~1s, RTO < 1 min no failover gerenciado) | Pilot light / warm standby |
| **RDS cross-Region read replica** (promovível) | Pilot light |
| **DynamoDB Global Tables** (multi-ativo) | Warm standby / active/active |
| **CloudFormation / StackSets** | Subir a infra no failover |
| **Route 53 failover / latency / health checks** | Direcionar o tráfego |
| **Global Accelerator** | Failover de **IP estático** em segundos |
| **AMI / snapshot copy entre Regiões** | Qualquer uma |
| **Elastic Disaster Recovery (DRS)** | Replicação contínua de servidores (RPO de segundos) |

## As armadilhas de número

| Item | Valor |
|---|---|
| Aurora Global Database — lag típico | **< 1 segundo** |
| Aurora Global Database — RTO do failover gerenciado | **< 1 minuto** |
| RDS Multi-AZ — protege de | falha de **AZ**, **não** de Região |
| Glacier Deep Archive — recuperação | **12 h** (standard) / **48 h** (bulk) → **inviável** para RTO curto |
| Glacier Flexible — recuperação | **1–5 min** (expedited) · **3–5 h** (standard) · **5–12 h** (bulk) |

> [!warning] Os dois testes que a prova cobra
> 1. **Teste o failover.** O pilar Reliability inclui *"the ability to operate and test the workload through its total lifecycle"*.
> 2. **Confira as quotas na Região de DR.** Limites de serviço são **por conta e por Região**. Um plano perfeito falha se a Região de DR não permite subir o número de instâncias necessário.

## Links

- [[9 - Fundamentos e apoio/Disaster Recovery (RPO e RTO)/1 - O que e|1 - O que e]] · [[9 - Fundamentos e apoio/Disaster Recovery (RPO e RTO)/3 - Detalhes|3 - Detalhes]] · [[9 - Fundamentos e apoio/Disaster Recovery (RPO e RTO)/4 - Questoes|4 - Questoes]]
