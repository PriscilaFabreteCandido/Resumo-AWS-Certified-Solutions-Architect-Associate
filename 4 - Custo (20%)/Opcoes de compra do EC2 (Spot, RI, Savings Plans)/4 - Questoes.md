---
tags: [saa-c03, custo, questoes]
servico: Opções de compra do EC2
atualizado: 2026-11-08
---

# Opções de compra — Questões

> [!question]- Q1. Carga de produção 24/7 em m6i. O time ainda não decidiu se migra para Graviton, para outra região, ou para containers.
> **A)** Reserved Instances Standard de 3 anos
> **B)** **Compute Savings Plans** ✅
> **C)** EC2 Instance Savings Plans
> **D)** Spot com capacity rebalancing
>
> **Por que B**: aplica-se *"regardless of instance family, instance size, OS, tenancy, or AWS Region"* (independentemente de família, tamanho de instância, sistema operacional, tenancy ou Região) e **cobre Fargate e Lambda** — sobrevive a toda essa indecisão.
> **A errada**: Standard RI *"can't be exchanged"* (não podem ser trocadas) e amarra tipo e região por 3 anos.
> **C errada**: amarra **família e região**, justamente o que está em aberto.
> **D errada**: produção 24/7 não tolera interrupção.

> [!question]- Q2. Carga estável 24/7, família e região **definidas**, e o time quer o **maior desconto**.
> **A)** Compute Savings Plans
> **B)** **EC2 Instance Savings Plans** ✅
> **C)** Convertible RI
> **D)** On-Demand com Auto Scaling
>
> **Por que B**: até **72%**, contra 66% do Compute — em troca de amarrar família e região.
> **C errada**: Convertible dá **menos** desconto que Standard, e a AWS recomenda Savings Plans sobre RI.

> [!question]- Q3. Um pipeline de renderização processa milhares de frames independentes e reiniciáveis; custo é prioridade.
> **A)** On-Demand com Auto Scaling
> **B)** **Spot via EC2 Fleet com `price capacity optimized` e capacity rebalancing** ✅
> **C)** Reserved Instances de 1 ano
> **D)** Spot Fleet com `lowest price`
>
> **Por que B**: trabalho idempotente e reiniciável é o caso de uso do Spot; *price capacity optimized* é a estratégia **recomendada**.
> **D errada**: `lowest-price` é **"(not recommended)"** e *"has the highest risk of interruption"* (tem o maior risco de interrupção) — mas é o **default da CLI**, por isso aparece tanto.

> [!question]- Q4. A empresa precisa **garantir capacidade** numa AZ específica para um evento, sem assumir compromisso de 1 ou 3 anos.
> **A)** Reserved Instance regional
> **B)** **On-Demand Capacity Reservation** ✅
> **C)** Compute Savings Plans
> **D)** Spot com persistent request
>
> **Por que B**: *"Reserve capacity for your EC2 instances in a specific Availability Zone"* (reserve capacidade para suas instâncias EC2 numa Zona de Disponibilidade específica), sem compromisso de prazo.
> **A errada**: a RI **regional** é **só desconto** — não reserva capacidade.
> **C errada**: Savings Plans é desconto, nunca capacidade.

> [!question]- Q5. Aplicação licenciada **por socket físico**.
> **A)** Dedicated Instances
> **B)** **Dedicated Hosts, com AWS License Manager** ✅
> **C)** RI com tenancy dedicada
> **D)** Cluster placement group
>
> **Por que B**: só o Dedicated Host expõe sockets e cores e permite *"bring your existing per-socket, per-core, or per-VM software licenses"* (traga suas licenças de software existentes, por soquete, por núcleo ou por VM).
> **A e C erradas**: dão hardware single-tenant, **sem** visibilidade de socket.

> [!question]- Q6. Ambientes de desenvolvimento rodam 24/7 em on-demand, mas são usados de 8h às 19h em dias úteis.
> **A)** Reserved Instances de 1 ano
> **B)** **Parar as instâncias fora do horário (scheduled scaling / automação)** ✅
> **C)** Migrar para Spot
> **D)** Reduzir o tamanho das instâncias
>
> **Por que B**: de 168 h/semana para ~55 h corta mais de 65%, sem compromisso e sem risco.
> **A errada**: comprometer-se 24/7 com algo usado 1/3 do tempo **aumenta** o desperdício.
> **C errada**: Spot é opção válida para dev, mas sem desligar você continua pagando 24/7.

> [!question]- Q7. Um cluster de containers em **Fargate** roda estável 24/7. Como reduzir o custo?
> **A)** Reserved Instances
> **B)** **Compute Savings Plans** ✅
> **C)** Fargate Spot para toda a carga
> **D)** Reduzir a memória das tasks
>
> **Por que B**: Compute SP cobre *"Fargate and Lambda usage"*.
> **A errada**: RI é para instâncias EC2.
> **C errada**: Spot não serve para produção que não tolera interrupção (embora parte da capacidade possa ser Spot).

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Savings Plans tem 3 tipos | **Quatro**: Compute, **Database**, EC2 Instance, SageMaker AI |
| Compute SP dá o maior desconto | **EC2 Instance SP** chega a **72%**; Compute vai a 66% com mais flexibilidade |
| Savings Plans cobre Spot | *"Spot Instances are not covered by Savings Plans"* (instâncias Spot não são cobertas por Savings Plans) |
| Savings Plans cobre os encargos do EKS | *"EKS charges will not be covered... but the underlying EC2 instances will be"* |
| RI reserva capacidade | Só a **zonal**. A regional é **desconto** |
| RI pode ser cancelada | **Não.** Standard: modificar ou vender. Convertible: trocar |
| Convertible dá mais desconto | Dá **menos** |
| Spot avisa 5 minutos antes | **2 minutos** |
| `lowest-price` é a melhor estratégia de Spot | **"(not recommended)"** — e é o default da CLI |
| A doc publica o desconto do Spot | Só *"steep discounts"* (descontos expressivos) |
| Dedicated Host = Dedicated Instance | Host = **licença por socket/core** e controle do hardware |
| Dedicated Host entra em placement group | **Não pode** |
| Comprometer-se é sempre bom | Primeiro **rightsizing**, depois compra |

## Links

- [[4 - Custo (20%)/Opcoes de compra do EC2 (Spot, RI, Savings Plans)/1 - O que e|1 - O que e]] · [[4 - Custo (20%)/Opcoes de compra do EC2 (Spot, RI, Savings Plans)/2 - Decorar|2 - Decorar]] · [[4 - Custo (20%)/Opcoes de compra do EC2 (Spot, RI, Savings Plans)/3 - Detalhes|3 - Detalhes]]
