---
tags: [saa-c03, placement-groups, questoes]
servico: EC2 Placement Groups
atualizado: 2026-11-08
---

# Placement Groups — Questões

> [!question]- Q1. Simulação HPC com MPI, 40 nós, menor latência possível entre eles.
> **A)** Spread em 3 AZs
> **B)** **Cluster placement group numa AZ, mesmo tipo de instância, com EFA** ✅
> **C)** Partition placement group
> **D)** Instâncias em AZs diferentes atrás de um NLB
>
> **Por que B**: *"Packs instances close together inside an Availability Zone"* (agrupa as instâncias próximas umas das outras dentro de uma Zona de Disponibilidade), com 10 Gbps de fluxo único; EFA é o adaptador para MPI.
> **A errada**: spread **separa** (o oposto) e limita a **7 por AZ** — 40 nós não cabem.
> **C errada**: partition separa em racks; serve para dado distribuído, não latência mínima.
> **D errada**: tráfego entre AZs adiciona latência; NLB não participa de MPI.

> [!question]- Q2. Cluster Cassandra de 12 nós: a falha de um rack não pode derrubar mais que uma fração.
> **A)** Cluster
> **B)** Spread
> **C)** **Partition** ✅
> **D)** Nenhum; basta distribuir em 3 AZs
>
> **Por que C**: partition é a estratégia para *"HDFS, HBase, Cassandra, Kafka, Hadoop"* (HDFS, HBase, Cassandra, Kafka, Hadoop) — cada partição tem racks próprios.
> **A errada**: concentra no mesmo bloco de hardware.
> **B errada**: separa instância por instância, limita a 7 por AZ, e não tem noção de grupo de réplicas.

> [!question]- Q3. Um par de servidores de licença não pode cair junto por falha de hardware.
> **A)** Cluster
> **B)** **Spread** ✅
> **C)** Partition
> **D)** Multi-AZ sem placement group
>
> **Por que B**: *"each placed on distinct hardware"* (cada uma num hardware distinto) — é exatamente o caso de **poucas instâncias críticas**.
> **D errada**: multi-AZ protege de falha de AZ, mas duas instâncias na mesma AZ ainda podem compartilhar hardware.

> [!question]- Q4. Um ASG com spread placement group em 2 AZs não escala além de 14 instâncias.
> **A)** A cota de vCPU foi atingida
> **B)** **O spread suporta no máximo 7 instâncias por AZ (2 AZs = 14)** ✅
> **C)** Falta habilitar cross-zone
> **D)** O launch template está errado
>
> **Por que B**: *"it supports a maximum of seven running instances in each Availability Zone"* (suporta no máximo sete instâncias em execução em cada Zona de Disponibilidade).

> [!question]- Q5. O enunciado exige **Dedicated Hosts** (licença por socket) e latência mínima entre nós.
> **A)** Cluster placement group com Dedicated Hosts
> **B)** **Não é possível combinar: Dedicated Hosts não podem lançar em placement group** ✅
> **C)** Partition com 2 partições
> **D)** Spread com Dedicated Hosts
>
> **Por que B**: a doc é explícita — **Dedicated Hosts não podem** lançar em placement group.
> **D errada**: spread também **não é suportado** com Dedicated Instances.

> [!question]- Q6. Quanto custa um placement group?
> **A)** Por instância no grupo
> **B)** **Nada: *"There is no charge for creating a placement group"* (não há cobrança para criar um placement group)** ✅
> **C)** Por hora de grupo
> **D)** Só o cluster é cobrado
>
> **Por que B**: é opcional e gratuito — a decisão é puramente arquitetural.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Cluster é multi-AZ | **Uma AZ só** — logo, não é resiliente à perda da AZ |
| Spread aceita quantas instâncias eu quiser | **7 por AZ** |
| Partition não tem limite de partições | **7 por AZ** (2 com Dedicated Instances) |
| Placement group é cobrado | **Grátis** |
| Dedicated Host pode entrar em placement group | **Não pode** |
| Spread funciona com Dedicated Instances | **Não suportado** |
| Capacity Reservation garante capacidade em spread/partition | **Não reserva** nesses dois |
| Uma instância pode estar em dois grupos | **Um só** |
| Cluster dá 10 Gbps para a internet | **5 Gbps** para internet e Direct Connect |

## Links

- [[3 - Performance (24%)/Placement Groups/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/Placement Groups/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/Placement Groups/3 - Detalhes|3 - Detalhes]]
