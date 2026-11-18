---
tags: [saa-c03, custo, spot, reserved-instances, savings-plans]
servico: Opções de compra do EC2
tipo: Modelos de precificação de compute
dominios: [4]
atualizado: 2026-11-08
---

# Opções de compra do EC2 — O que é

> [!info] Em uma frase
> O mesmo compute, com preços muito diferentes conforme o **compromisso** que você assume e a **tolerância a interrupção** que a carga tem.

## As opções (nomes oficiais)

| Opção | O que é |
|---|---|
| **On-Demand Instances** | Pago por segundo, sem compromisso |
| **Savings Plans** | *"commitment to a consistent amount of usage, in USD per hour, for a term of 1 or 3 years"* |
| **Reserved Instances** | *"commitment to a consistent instance configuration, including instance type and Region, for a term of 1 or 3 years"* |
| **Spot Instances** | Capacidade sobrando, com desconto e **interrupção** |
| **Dedicated Hosts** | *"Pay for a physical host... and bring your existing per-socket, per-core, or per-VM software licenses"* |
| **Dedicated Instances** | *"Pay, by the hour, for instances that run on single-tenant hardware"* |
| **Capacity Reservations** | *"Reserve capacity for your EC2 instances in a specific Availability Zone"* (reserve capacidade para suas instâncias EC2 numa Zona de Disponibilidade específica) |

## A orientação oficial

> *"If you can't make a commitment to a specific instance configuration, but you can commit to a usage amount, purchase Savings Plans to reduce your On-Demand Instance costs. If you require a capacity reservation, purchase Reserved Instances or Capacity Reservations for a specific Availability Zone. Capacity Blocks can be used to reserve a cluster of GPU instances. Spot Instances are a cost-effective choice if you can be flexible about when your applications run and if they can be interrupted. Dedicated Hosts or Dedicated Instances can help you address compliance requirements and reduce costs by using your existing server-bound software licenses."*

E a recomendação: **"We recommend Savings Plans over Reserved Instances."** (recomendamos Savings Plans em vez de Instâncias Reservadas)

## Links

- [[4 - Custo (20%)/Opcoes de compra do EC2 (Spot, RI, Savings Plans)/2 - Decorar|2 - Decorar]] · [[4 - Custo (20%)/Opcoes de compra do EC2 (Spot, RI, Savings Plans)/3 - Detalhes|3 - Detalhes]] · [[4 - Custo (20%)/Opcoes de compra do EC2 (Spot, RI, Savings Plans)/4 - Questoes|4 - Questoes]]
- [[3 - Performance (24%)/EC2/1 - O que e|EC2]] · [[2 - Resiliencia (26%)/Auto Scaling (EC2)/1 - O que e|Auto Scaling (EC2)]] · [[4 - Custo (20%)/Ferramentas de custo (Cost Explorer, Budgets, CUR)/1 - O que e|Ferramentas de custo (Cost Explorer, Budgets, CUR)]] · [[4 - Custo (20%)/Compute Optimizer/1 - O que e|Compute Optimizer]]
- [Opções de compra](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-purchasing-options.html)
