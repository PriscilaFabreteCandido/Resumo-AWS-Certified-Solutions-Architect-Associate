---
servico: Opções de compra do EC2
fonte: "[[4 - Custo (20%)/Opcoes de compra do EC2 (Spot, RI, Savings Plans)/2 - Decorar|2 - Decorar]]"
---

# Opções de compra do EC2 — Flashcards

#flashcards/saa-c03/d4-custo/opcoes-compra-ec2

Quantos e quais são os tipos de Savings Plans?::**Quatro**: Compute, Database, EC2 Instance e SageMaker AI

Compute Savings Plans: desconto máximo e o que cobre?::Até **66%**; cobre **EC2, Fargate e Lambda**, independente de família, tamanho, SO, tenancy ou Região

EC2 Instance Savings Plans: desconto máximo e a que fica amarrado?::Até **72%**; amarrado a uma **família de instâncias numa Região**

Database Savings Plans: desconto máximo?::Até **35%**

Termos e opções de pagamento dos Savings Plans?::**1 ou 3 anos**; **All upfront, Partial upfront ou No upfront**

Savings Plans cobre as cobranças do EKS?::**Não** cobre o EKS, mas cobre as **instâncias EC2** por baixo

Reserved Instance é uma instância física?::**Não.** É um **desconto de faturamento** aplicado ao uso On-Demand

RI Standard × Convertible: qual pode ser trocada?::**Convertible** (desconto menor). Standard dá o maior desconto e só pode ser **modificada**

Qual RI reserva capacidade?::Só a **zonal**; a **regional** é só desconto

RI renova automaticamente? Pode cancelar?::**Não** renova e **não** pode cancelar

Spot: quanto tempo de aviso antes da interrupção?::**2 minutos** (e antes disso pode vir a **rebalance recommendation**)

Spot é coberto por Savings Plans?::**Não**

Qual estratégia de alocação Spot é a recomendada, e qual tem maior risco de interrupção?::Recomendada: **price capacity optimized**. Maior risco: **lowest price** (que é o default da CLI)

Faixa do termination-delay no Capacity Rebalancing com launch-before-terminate?::**120 a 7.200 s**

Licença per-socket/per-core: Dedicated Host ou Dedicated Instance?::**Dedicated Host** (você paga o host físico e vê sockets e cores)
