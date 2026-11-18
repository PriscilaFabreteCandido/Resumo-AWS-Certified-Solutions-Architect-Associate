---
tags: [saa-c03, placement-groups, ec2]
servico: EC2 Placement Groups
tipo: Posicionamento de instâncias
dominios: [3]
atualizado: 2026-11-08
---

# EC2 Placement Groups — O que é

> [!info] Em uma frase
> Controla **onde**, fisicamente, as instâncias são colocadas — para **aproximá-las** (latência mínima) ou **separá-las** (reduzir falha correlacionada).

## As quatro estratégias

| Estratégia | O que faz | Limite |
|---|---|---|
| **Cluster** | *"Packs instances close together inside an Availability Zone"* (agrupa as instâncias próximas umas das outras dentro de uma Zona de Disponibilidade) | **1 AZ só**; fluxo único **10 Gbps** no grupo (5 Gbps fora) |
| **Spread** | *"a group of instances that are each placed on distinct hardware"* | **7 instâncias por AZ** |
| **Partition** | *"Spreads your instances across logical partitions"* (racks próprios) | **7 partições por AZ** (2 com Dedicated Instances) |
| **Precision time** | Acesso ao Amazon Time Sync aprimorado | Sem custo extra |

## A regra de decisão

| Objetivo | Estratégia |
|---|---|
| **Menor latência** entre nós (HPC, MPI) | **Cluster** |
| **Separar** poucas instâncias críticas em hardware distinto | **Spread** |
| Dado distribuído com noção de **rack** (HDFS, Cassandra, Kafka) | **Partition** |
| Sincronização de tempo precisa | **Precision time** |

## Fatos gerais

> *"Placement groups are optional."* (placement groups são opcionais) · *"There is no charge for creating a placement group."* (não há cobrança para criar um placement group)

- Uma instância pertence a **um** grupo só
- Grupos **não** se fundem
- **Dedicated Hosts não podem** lançar em placement group
- Spot com stop/hibernate na interrupção **não pode** lançar em placement group
- **Capacity Reservations não reservam** capacidade em grupos **partition** ou **spread**

## Links

- [[3 - Performance (24%)/Placement Groups/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/Placement Groups/3 - Detalhes|3 - Detalhes]] · [[3 - Performance (24%)/Placement Groups/4 - Questoes|4 - Questoes]]
- [[3 - Performance (24%)/EC2/1 - O que e|EC2]] · [[2 - Resiliencia (26%)/Auto Scaling (EC2)/1 - O que e|Auto Scaling (EC2)]] · [[2 - Resiliencia (26%)/AWS Batch/1 - O que e|AWS Batch]]
- [Placement groups](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-groups.html)
