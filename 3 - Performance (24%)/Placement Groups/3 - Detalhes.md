---
tags: [saa-c03, placement-groups, detalhes]
servico: EC2 Placement Groups
atualizado: 2026-11-08
---

# Placement Groups — Detalhes

## 1. Cluster — juntar para reduzir latência

*"Packs instances close together inside an Availability Zone."* As instâncias ficam no mesmo bloco de hardware de baixa latência, o que habilita **10 Gbps de fluxo único** dentro do grupo (contra 5 Gbps fora).

Para que isso rende: **HPC com MPI**, simulação, cálculo de risco, qualquer coisa em que os nós conversam intensamente entre si.

Restrições:
- **Uma AZ só** — então um cluster placement group **não é resiliente** à perda da AZ
- Recomendado usar o **mesmo tipo de instância** (para capacidade homogênea)
- **Não** disponível para **T2**, **Mac1** e **M7i-flex**
- Tráfego para internet ou **Direct Connect** fica limitado a **5 Gbps**

O par natural é o **EFA (Elastic Fabric Adapter)**: adaptador que faz bypass do kernel para MPI e NCCL. **Cluster placement group + EFA** é a combinação de HPC que a prova espera.

## 2. Spread — separar para não cair junto

*"a group of instances that are each placed on distinct hardware."* Cada instância vai para um hardware diferente, reduzindo a chance de uma falha física derrubar várias.

O limite é o ponto de prova: **7 instâncias por AZ**. Com 3 AZs, o máximo é **21**.

Isso define o caso de uso: **poucas instâncias críticas** que não podem cair juntas — um par de controladores, nós de um quorum, servidores de licença. **Não** serve para uma fleet grande.

E: **não é suportado com Dedicated Instances**. Host-level spread existe **só em Outposts**.

## 3. Partition — separar em grupos com noção de rack

*"Spreads your instances across logical partitions"*, e cada partição tem **seu próprio conjunto de racks**. Instâncias de partições diferentes não compartilham rack.

Limite: *"A partition placement group can have a maximum of seven partitions per Availability Zone"* (e **2** com Dedicated Instances).

Por que isso importa: sistemas distribuídos como **HDFS, HBase, Cassandra, Kafka e Hadoop** — todos citados na doc — colocam réplicas em "racks" diferentes. Mapeando partições para racks, a falha de um rack atinge **uma** partição, e as réplicas nas outras sobrevivem.

É a diferença com spread: spread separa **instância por instância** (e limita a 7 por AZ); partition separa **grupos** de instâncias (permitindo fleets grandes).

## 4. Como escolher — a árvore

```
Os nós conversam muito entre si e a latência é crítica?
├── SIM  →  CLUSTER  (1 AZ, + EFA, mesmo tipo de instância)
└── NÃO
    ├── São poucas instâncias críticas que não podem cair juntas?
    │      →  SPREAD   (máx. 7 por AZ)
    └── É um sistema distribuído com réplicas e noção de rack?
           →  PARTITION  (máx. 7 partições por AZ)
```

## 5. Restrições que viram questão

| Restrição | Implicação |
|---|---|
| **Dedicated Hosts** não entram | Se o enunciado exige Dedicated Host (licença por socket), **não há** placement group |
| **Spot** com stop/hibernate na interrupção não entra | Para Spot em placement group, a interrupção precisa ser **terminate** |
| **Capacity Reservations** não reservam em partition/spread | Reserva de capacidade só funciona com cluster (ou sem grupo) |
| Uma instância, **um** grupo | Não dá para combinar estratégias na mesma instância |
| Grupos **não** se fundem | Planeje antes |
| **Grátis** | Não há trade-off de custo — só de arquitetura |

## 6. Placement group × Auto Scaling × Multi-AZ

Um **cluster** placement group é **single-AZ**, o que entra em conflito com "alta disponibilidade". A resolução depende do requisito:

| Requisito | Desenho |
|---|---|
| Latência mínima **e** HA | Dois clusters, um por AZ, com a aplicação tolerando a partição |
| HA simples | **Sem** placement group, ASG multi-AZ |
| Poucas instâncias críticas, HA | **Spread** multi-AZ |
| Dado distribuído, HA | **Partition** multi-AZ |

O ASG aceita placement group no launch template — mas lembre que **spread limita a 7 por AZ**, o que impõe teto ao scaling.

## Links

- [[3 - Performance (24%)/Placement Groups/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/Placement Groups/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/Placement Groups/4 - Questoes|4 - Questoes]]
- [[3 - Performance (24%)/EC2/1 - O que e|EC2]] · [[2 - Resiliencia (26%)/Auto Scaling (EC2)/1 - O que e|Auto Scaling (EC2)]] · [[2 - Resiliencia (26%)/AWS Batch/1 - O que e|AWS Batch]] · [[4 - Custo (20%)/Opcoes de compra do EC2 (Spot, RI, Savings Plans)/1 - O que e|Opcoes de compra do EC2 (Spot, RI, Savings Plans)]]
