---
tags: [saa-c03, compute-optimizer, custo, rightsizing]
servico: AWS Compute Optimizer
tipo: Recomendação de rightsizing
dominios: [4]
atualizado: 2026-11-08
---

# AWS Compute Optimizer — O que é

> [!info] Em uma frase
> *"analyzes your AWS resources' configuration and utilization metrics to provide you with rightsizing recommendations and identify idle resources."* (analisa a configuração e as métricas de uso dos seus recursos AWS para dar recomendações de dimensionamento e identificar recursos ociosos)

## O verbo: **recomendar**

Ele **não aplica** nada. Gera recomendações que você avalia e executa.

| Pergunta | Serviço |
|---|---|
| "Esta instância está **superdimensionada**?" | **Compute Optimizer** |
| "Quanto estou **gastando** e quanto vou gastar?" | **Cost Explorer** |
| "Me **avise** se passar de X" | **AWS Budgets** |
| "Quero o **dado bruto** de billing" | **CUR** |
| "Recomendações **amplas** nos 5 pilares" | **Trusted Advisor** |

## A janela de análise

| Modo | Período |
|---|---|
| Padrão | *"the last 14 days"* (os últimos 14 dias) |
| **Enhanced infrastructure metrics** | **93 dias** |

> [!warning] Por que a janela importa
> Com **14 dias**, uma carga com pico **mensal** (fechamento contábil, Black Friday) pode não aparecer — e a recomendação sugere reduzir uma instância que você vai precisar. Para esses casos, habilite **enhanced infrastructure metrics (93 dias)**.

## Links

- [[4 - Custo (20%)/Compute Optimizer/2 - Decorar|2 - Decorar]] · [[4 - Custo (20%)/Compute Optimizer/3 - Detalhes|3 - Detalhes]] · [[4 - Custo (20%)/Compute Optimizer/4 - Questoes|4 - Questoes]]
- [[4 - Custo (20%)/Ferramentas de custo (Cost Explorer, Budgets, CUR)/1 - O que e|Ferramentas de custo (Cost Explorer, Budgets, CUR)]] · [[4 - Custo (20%)/Opcoes de compra do EC2 (Spot, RI, Savings Plans)/1 - O que e|Opcoes de compra do EC2 (Spot, RI, Savings Plans)]] · [[3 - Performance (24%)/EC2/1 - O que e|EC2]] · [[2 - Resiliencia (26%)/CloudWatch/1 - O que e|CloudWatch]]
- [O que é o Compute Optimizer](https://docs.aws.amazon.com/compute-optimizer/latest/ug/what-is-compute-optimizer.html)
