---
tags: [saa-c03, placement-groups, decorar]
servico: EC2 Placement Groups
atualizado: 2026-11-08
---

# Placement Groups — Decorar

## A tabela

| | **Cluster** | **Spread** | **Partition** |
|---|---|---|---|
| Efeito | **Junta** | **Separa** (hardware distinto) | Separa em **grupos** com racks próprios |
| AZs | **1 só** | Multi-AZ | Multi-AZ |
| **Limite** | — | **7 instâncias por AZ** | **7 partições por AZ** |
| Com Dedicated Instances | — | **não suportado** | máximo **2** partições |
| Objetivo | **Latência mínima** | Reduzir falha correlacionada | Tolerância a falha de rack |
| Casos citados | HPC, MPI | Poucas instâncias críticas | **HDFS, HBase, Cassandra, Kafka, Hadoop** |

## Cluster — os números de rede

| Item | Valor |
|---|---|
| Fluxo único **dentro** do grupo | **10 Gbps** (com enhanced networking) |
| Fluxo único **fora** do grupo | **5 Gbps** |
| Para internet / Direct Connect | **5 Gbps** |
| Recomendação | Mesmo **tipo de instância** |
| **Não** disponível para | **T2**, **Mac1**, **M7i-flex** |

## Spread — a conta

**7 instâncias por AZ.** Com 3 AZs: **21 instâncias** no máximo.
A doc: *"A rack-level spread placement group can span multiple Availability Zones in the same Region, but it supports a maximum of seven running instances in each Availability Zone."* (um spread placement group em nível de rack pode abranger várias Zonas de Disponibilidade na mesma Região, mas suporta no máximo sete instâncias em execução em cada uma)
Host-level spread existe **só em Outposts**.

## Restrições gerais (decore)

| Restrição | Detalhe |
|---|---|
| Custo | **Grátis** |
| Instância em N grupos | **Um só** |
| Fundir grupos | **Não é possível** |
| **Dedicated Hosts** | **Não podem** lançar em placement group |
| **Spot** com stop/hibernate na interrupção | **Não pode** lançar em placement group |
| **Capacity Blocks** | **Não suportam** placement groups |
| **Capacity Reservations** | **Não reservam** em partition nem spread |

## Combinação com HPC

Para HPC de verdade: **cluster placement group** + família **Hpc** (ou C/M otimizadas) + **EFA** (Elastic Fabric Adapter, para MPI com bypass de kernel) + **enhanced networking (ENA)**.

## Links

- [[3 - Performance (24%)/Placement Groups/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/Placement Groups/3 - Detalhes|3 - Detalhes]] · [[3 - Performance (24%)/Placement Groups/4 - Questoes|4 - Questoes]]
