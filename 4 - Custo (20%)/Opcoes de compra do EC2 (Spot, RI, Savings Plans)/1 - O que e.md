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
| **Savings Plans** | *"commitment to a consistent amount of usage, in USD per hour, for a term of 1 or 3 years"* (compromisso com um valor constante de uso, em dólares por hora, por um prazo de 1 ou 3 anos) |
| **Reserved Instances** | *"commitment to a consistent instance configuration, including instance type and Region, for a term of 1 or 3 years"* (compromisso com uma configuração constante de instância, incluindo tipo e Região, por um prazo de 1 ou 3 anos) |
| **Spot Instances** | Capacidade sobrando, com desconto e **interrupção** |
| **Dedicated Hosts** | *"Pay for a physical host... and bring your existing per-socket, per-core, or per-VM software licenses"* (pague por um host físico... e traga suas licenças de software existentes, por soquete, por núcleo ou por VM) |
| **Dedicated Instances** | *"Pay, by the hour, for instances that run on single-tenant hardware"* (pague por hora por instâncias que rodam em hardware de inquilino único) |
| **Capacity Reservations** | *"Reserve capacity for your EC2 instances in a specific Availability Zone"* (reserve capacidade para suas instâncias EC2 numa Zona de Disponibilidade específica) |

## A orientação oficial

> *"If you can't make a commitment to a specific instance configuration, but you can commit to a usage amount, purchase Savings Plans to reduce your On-Demand Instance costs. If you require a capacity reservation, purchase Reserved Instances or Capacity Reservations for a specific Availability Zone. Capacity Blocks can be used to reserve a cluster of GPU instances. Spot Instances are a cost-effective choice if you can be flexible about when your applications run and if they can be interrupted. Dedicated Hosts or Dedicated Instances can help you address compliance requirements and reduce costs by using your existing server-bound software licenses."* (se você não consegue se comprometer com uma configuração específica de instância, mas consegue se comprometer com um valor de uso, compre Savings Plans para reduzir o custo sob demanda. Se precisa de reserva de capacidade, compre Instâncias Reservadas ou Capacity Reservations numa Zona de Disponibilidade específica. Capacity Blocks servem para reservar um cluster de instâncias com GPU. Instâncias Spot são uma escolha econômica se você tem flexibilidade de horário e tolera interrupção. Dedicated Hosts ou Dedicated Instances ajudam a atender requisitos de conformidade e a reduzir custo aproveitando licenças de software atreladas a servidor)

E a recomendação: **"We recommend Savings Plans over Reserved Instances."** (recomendamos Savings Plans em vez de Instâncias Reservadas)

## Links

- [[4 - Custo (20%)/Opcoes de compra do EC2 (Spot, RI, Savings Plans)/2 - Decorar|2 - Decorar]] · [[4 - Custo (20%)/Opcoes de compra do EC2 (Spot, RI, Savings Plans)/3 - Detalhes|3 - Detalhes]] · [[4 - Custo (20%)/Opcoes de compra do EC2 (Spot, RI, Savings Plans)/4 - Questoes|4 - Questoes]]
- [[3 - Performance (24%)/EC2/1 - O que e|EC2]] · [[2 - Resiliencia (26%)/Auto Scaling (EC2)/1 - O que e|Auto Scaling (EC2)]] · [[4 - Custo (20%)/Ferramentas de custo (Cost Explorer, Budgets, CUR)/1 - O que e|Ferramentas de custo (Cost Explorer, Budgets, CUR)]] · [[4 - Custo (20%)/Compute Optimizer/1 - O que e|Compute Optimizer]]
- [Opções de compra](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-purchasing-options.html)
