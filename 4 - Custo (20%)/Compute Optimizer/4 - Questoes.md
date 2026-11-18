---
tags: [saa-c03, compute-optimizer, questoes]
servico: AWS Compute Optimizer
atualizado: 2026-11-08
---

# Compute Optimizer — Questões

> [!question]- Q1. A empresa quer saber se as 400 instâncias EC2 estão superdimensionadas, com base no uso real.
> **A)** Trusted Advisor
> **B)** **AWS Compute Optimizer** ✅
> **C)** Cost Explorer
> **D)** CloudWatch dashboards
>
> **Por que B**: *"analyzes your AWS resources' configuration and utilization metrics to provide you with rightsizing recommendations and identify idle resources."* (analisa a configuração e as métricas de uso dos seus recursos AWS para dar recomendações de dimensionamento e identificar recursos ociosos)
> **A errada**: Trusted Advisor sinaliza instância ociosa, mas o rightsizing por utilização com recomendação de tipo é do Compute Optimizer.
> **C errada**: Cost Explorer mostra **gasto**, não adequação de tamanho.

> [!question]- Q2. As recomendações sugerem reduzir instâncias que, no fechamento mensal, ficam no limite. O que fazer?
> **A)** Ignorar as recomendações
> **B)** **Habilitar enhanced infrastructure metrics, que estende a janela de 14 para 93 dias** ✅
> **C)** Instalar o CloudWatch agent
> **D)** Usar o Trusted Advisor
>
> **Por que B**: a janela padrão é *"the last 14 days"* (os últimos 14 dias) — um pico mensal pode ficar fora. Com 93 dias, ele entra na análise.
> **C**: também melhora a qualidade (memória), mas não resolve a **janela**.

> [!question]- Q3. As recomendações para uma aplicação **memory-bound** parecem agressivas demais.
> **A)** A janela é curta
> **B)** **Falta o CloudWatch agent publicando a métrica de memória — o hipervisor não a expõe** ✅
> **C)** Falta habilitar detailed monitoring
> **D)** O Compute Optimizer não cobre EC2
>
> **Por que B**: sem memória nas métricas, o Optimizer decide olhando CPU.
> **C errada**: detailed monitoring muda a **frequência** (5 → 1 min), não adiciona métricas de SO.

> [!question]- Q4. Qual a ordem correta para otimizar o custo de uma fleet estável?
> **A)** Comprar Savings Plans e depois fazer rightsizing
> **B)** **Rightsizing → desligar o ocioso → auto scaling → comprometer com Savings Plans** ✅
> **C)** Migrar tudo para Spot
> **D)** Comprar Reserved Instances de 3 anos
>
> **Por que B**: comprometer-se com capacidade **superdimensionada** congela o desperdício por 1-3 anos.

> [!question]- Q5. O Compute Optimizer aplica automaticamente o novo tipo de instância?
> **A)** Sim, se autorizado
> **B)** **Não: ele só recomenda. A troca é sua (launch template + instance refresh)** ✅
> **C)** Sim, via Systems Manager
> **D)** Sim, em Auto Scaling groups
>
> **Por que B**: o verbo é **recomendar**.

> [!question]- Q6. Além de EC2, o que mais o Compute Optimizer analisa?
> **A)** Só EC2
> **B)** **Auto Scaling groups, volumes EBS, funções Lambda e serviços ECS no Fargate** ✅
> **C)** Apenas EC2 e RDS
> **D)** Todos os serviços da AWS
>
> **Por que B**: inclui o rightsizing de **memória do Lambda**, que tem efeito direto no custo.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Compute Optimizer aplica a mudança | Só **recomenda** |
| A janela é sempre suficiente | **14 dias** (93 com enhanced metrics) — pico mensal/sazonal pode ficar fora |
| Ele enxerga memória por padrão | Precisa do **CloudWatch agent** |
| É igual ao Trusted Advisor | Trusted Advisor cobre **5 pilares**; o Optimizer é **rightsizing** por utilização |
| Cobre só EC2 | Cobre **ASG, EBS, Lambda e ECS/Fargate** também |
| Comprar desconto vem primeiro | **Rightsizing primeiro**, compromisso depois |
| Cost Explorer faz rightsizing | Cost Explorer **mostra e prevê** gasto (e recomenda **RI**) |

## Links

- [[4 - Custo (20%)/Compute Optimizer/1 - O que e|1 - O que e]] · [[4 - Custo (20%)/Compute Optimizer/2 - Decorar|2 - Decorar]] · [[4 - Custo (20%)/Compute Optimizer/3 - Detalhes|3 - Detalhes]]
