---
tags: [saa-c03, ec2, decorar]
servico: Amazon EC2
atualizado: 2026-11-08
---

# Amazon EC2 — Decorar

## Famílias — o que o enunciado sugere

| Pista no enunciado | Família |
|---|---|
| Carga irregular, barato, uso leve | **T** (burstable, consome créditos) |
| Uso geral, web, equilíbrio | **M** |
| CPU intensivo, batch, encoding, servidor de jogos | **C** |
| In-memory, cache, banco grande, SAP HANA | **R**, **X**, **z** |
| IOPS local altíssimo, NoSQL, storage denso | **I**, **D** |
| ML training/inference, renderização, CAD | **P**, **G**, **Inf**, **Trn** |
| Simulação HPC com MPI | **Hpc** + **EFA** + cluster placement group |
| Melhor custo-benefício em ARM | **Graviton** (sufixo `g`: m7g, c7g, r7g) |

## Opções de compra

| Opção | Desconto / característica |
|---|---|
| **On-Demand** | Preço cheio, pago por segundo |
| **Compute Savings Plans** | até **66%** · qualquer família, tamanho, SO, tenancy e **região** · cobre **Fargate e Lambda** |
| **EC2 Instance Savings Plans** | até **72%** · amarrado a **família + região**, flexível em tamanho/SO/tenancy |
| **Reserved Instances** | 1 ou 3 anos · All/Partial/No Upfront · **Standard** (maior desconto, não trocável) ou **Convertible** (trocável) |
| **Spot** | Aviso de **2 minutos** · não coberto por Savings Plans |
| **Dedicated Hosts** | Licença **per-socket/per-core** própria · integra com License Manager |
| **Dedicated Instances** | Hardware single-tenant, cobrado **por hora** |
| **Capacity Reservations** | Reserva capacidade numa **AZ**, sem compromisso de 1-3 anos |

**RI zonal reserva capacidade. RI regional é só desconto.**

## Instance store × EBS

| | **Instance store** | **EBS** |
|---|---|---|
| Onde fica | NVMe/SSD **no host físico** | Volume **de rede** |
| Persiste em stop/hibernate | **NÃO** | **Sim** |
| Snapshot | Não | Sim |
| Latência | Mínima | Baixa |
| Use para | Cache, buffer, scratch | Boot, banco, qualquer dado que precise sobreviver |

## Placement groups

| Estratégia | O que faz | Limite |
|---|---|---|
| **Cluster** | Agrupa perto, **1 AZ só** | Fluxo único **10 Gbps** no grupo (5 Gbps fora) |
| **Spread** | Hardware **distinto** por instância | **7 instâncias por AZ** |
| **Partition** | Partições com racks próprios | **7 partições por AZ** (2 com Dedicated Instances) |
| **Precision time** | Time Sync aprimorado | Sem custo extra |

**Grátis. Opcional. Uma instância em um grupo só. Dedicated Hosts não entram.**

## Rede da instância

| Recurso | Para quê |
|---|---|
| **ENA** | Enhanced networking: alto PPS, baixa latência |
| **EFA** | HPC/ML com MPI (bypass de kernel). Usar com cluster placement group |
| **Jumbo frames** | MTU 9001 (mas 1.500 para internet e Direct Connect) |

## Números

| Item | Valor |
|---|---|
| Spot: aviso | **2 minutos** |
| RI: 1 ano | 31.536.000 s (365 dias) |
| RI: 3 anos | 94.608.000 s (1.095 dias) |
| IOPS máximo em instância **não-Nitro** | **32.000** (mesmo com volume provisionado acima) |
| Metadados da instância | `169.254.169.254` (IMDS) — **não** passa por SG nem NACL |

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[02 - Numeros para decorar]]
