---
tags: [saa-c03, custo, decorar]
servico: Opções de compra do EC2
atualizado: 2026-11-08
---

# Opções de compra — Decorar

## Savings Plans — são **quatro** tipos

> *"AWS offers four types of Savings Plans: Compute Savings Plans, Database Savings Plans, EC2 Instance Savings Plans, and SageMaker AI Savings Plans."*

| Tipo | Desconto | Cobre | Flexibilidade |
|---|---|---|---|
| **Compute** | até **66%** | EC2 + **Fargate** + **Lambda** | *"regardless of instance family, instance size, OS, tenancy, or AWS Region"* (independentemente de família, tamanho de instância, sistema operacional, tenancy ou Região) |
| **EC2 Instance** | até **72%** | Só EC2 | Amarrado a *"a specific instance family in a chosen AWS Region"* (uma família de instâncias específica, numa Região escolhida); flexível em tamanho, SO e tenancy |
| **Database** | até **35%** | Aurora, RDS, DynamoDB, ElastiCache, DocumentDB, Timestream, Neptune, Keyspaces, DMS, OpenSearch | *"regardless of engine, instance family, size, Availability Zone (AZ), or Region"* (independentemente de engine, família de instância, tamanho, Zona de Disponibilidade ou Região) |
| **SageMaker AI** | até **64%** | SageMaker AI | *"regardless of your instance family, instance size, component, or AWS Region"* |

Claim geral: *"You can save up to 72% on your AWS compute workloads."*
Termos: **1 ou 3 anos**. Pagamento: **All upfront · Partial upfront · No upfront**.
⚠️ *"The terms of the commitment can't be changed after purchase."* (os termos do compromisso não podem ser alterados depois da compra)
⚠️ **EKS**: *"Amazon EKS charges will not be covered by Savings Plans, but the underlying EC2 instances will be."*

## Reserved Instances

| Item | Detalhe |
|---|---|
| Natureza | *"not physical instances, but rather a billing discount applied to the use of On-Demand Instances"* |
| Atributos que definem o preço | **Instance type · Region · Tenancy · Platform** |
| Termos | **1 ano** = 31.536.000 s (365 dias) · **3 anos** = 94.608.000 s (1.095 dias) |
| Pagamento | **All Upfront · Partial Upfront · No Upfront** (este exige *"a successful billing history"* (um histórico de pagamentos em dia)) |
| **Standard** | *"the most significant discount, but can only be modified. Standard Reserved Instances can't be exchanged."* |
| **Convertible** | *"a lower discount... but can be exchanged for another Convertible Reserved Instance with different instance attributes"* |
| Renovação | **Não** renovam automaticamente |
| Cancelamento | **Não** pode cancelar |
| **Capacidade** | Só a **zonal** reserva capacidade; a **regional** é só desconto |

## Spot

| Item | Detalhe |
|---|---|
| **Aviso de interrupção** | **2 minutos** — *"two-minute Spot Instance interruption notice"* |
| Aviso antecipado | **Rebalance recommendation** — *"at an elevated risk of interruption"* |
| O que a AWS faz | *"terminates, stops, or hibernates your Spot Instance when Amazon EC2 needs the capacity back"* (encerra, para ou hiberna sua instância Spot quando o Amazon EC2 precisa da capacidade de volta) |
| Tipos de requisição | **one-time** ou **persistent** (*"automatically resubmits"* (reenvia automaticamente)) |
| ⚠️ Savings Plans | *"Spot Instances are not covered by Savings Plans"* (instâncias Spot não são cobertas por Savings Plans) |
| Casos de uso citados | *"data analysis, batch jobs, background processing, and optional tasks"* (análise de dados, jobs em lote, processamento em segundo plano e tarefas opcionais) |
| Histórico de preço | Últimos **3 meses**; página de preço atualizada *"every five minutes"* |
| Desconto % | **A doc não publica** um número fixo (*"steep discounts"* (descontos expressivos)) |

## Estratégias de alocação (EC2 Fleet / Spot Fleet)

| Estratégia | O que faz |
|---|---|
| **price capacity optimized** | **Recomendada**: pools com mais capacidade, e entre eles o mais barato |
| **capacity optimized** | *"lowest chance of interruption in the near term"* (variante *prioritized* respeita sua ordem) |
| **diversified** | Espalha por todos os pools |
| **lowest price** | **"(not recommended)"** — *"has the highest risk of interruption"* (tem o maior risco de interrupção). É o **default da CLI** |

**Capacity Rebalancing**: `launch-before-terminate` (com `termination-delay` de **120 a 7.200 s**) ou `launch`. Só em fleet tipo **maintain**, e **não** pode ser alterado depois.

## Dedicated Hosts × Dedicated Instances

| | **Dedicated Hosts** | **Dedicated Instances** |
|---|---|---|
| Você paga | **O host físico** | **Por hora**, hardware single-tenant |
| Licença **per-socket/per-core** | **Sim** | Não é o caso de uso |
| Vê sockets e cores | **Sim** | Não |
| Placement group | **Não pode** | Pode (partition: máx. 2; spread: não suportado) |

## Links

- [[4 - Custo (20%)/Opcoes de compra do EC2 (Spot, RI, Savings Plans)/1 - O que e|1 - O que e]] · [[4 - Custo (20%)/Opcoes de compra do EC2 (Spot, RI, Savings Plans)/3 - Detalhes|3 - Detalhes]] · [[4 - Custo (20%)/Opcoes de compra do EC2 (Spot, RI, Savings Plans)/4 - Questoes|4 - Questoes]]
- [[02 - Numeros para decorar]]
