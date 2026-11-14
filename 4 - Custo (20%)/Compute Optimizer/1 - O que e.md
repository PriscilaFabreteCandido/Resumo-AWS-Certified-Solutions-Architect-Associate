---
tags: [saa-c03, compute-optimizer, custo, rightsizing]
servico: AWS Compute Optimizer
tipo: Recomendação de rightsizing
dominios: [4]
atualizado: 2026-11-08
---

# AWS Compute Optimizer — O que é

> [!info] Em uma frase
> *"analyzes your AWS resources' configuration and utilization metrics to provide you with rightsizing recommendations and identify idle resources."*

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
| Padrão | *"the last 14 days"* |
| **Enhanced infrastructure metrics** | **93 dias** |

> [!warning] Por que a janela importa
> Com **14 dias**, uma carga com pico **mensal** (fechamento contábil, Black Friday) pode não aparecer — e a recomendação sugere reduzir uma instância que você vai precisar. Para esses casos, habilite **enhanced infrastructure metrics (93 dias)**.

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[Ferramentas de custo (Cost Explorer, Budgets, CUR)]] · [[Opcoes de compra do EC2 (Spot, RI, Savings Plans)]] · [[EC2]] · [[CloudWatch]]
- [O que é o Compute Optimizer](https://docs.aws.amazon.com/compute-optimizer/latest/ug/what-is-compute-optimizer.html)
