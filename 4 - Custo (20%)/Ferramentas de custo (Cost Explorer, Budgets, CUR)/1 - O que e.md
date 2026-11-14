---
tags: [saa-c03, cost-explorer, budgets, cur, custo, alta-prioridade]
servico: Ferramentas de custo
tipo: Visibilidade e governança de gasto
dominios: [4]
atualizado: 2026-11-08
---

# Ferramentas de custo — O que é

> [!important] Garantia de questão
> Estas ferramentas aparecem nos **quatro** task statements do domínio 4, com a mesma redação: *"AWS cost management tools with appropriate use cases (for example, AWS Cost Explorer, AWS Budgets, AWS Cost and Usage Report)"*.

## As três, com seus verbos

| Ferramenta | Verbo | Uma linha |
|---|---|---|
| **Cost Explorer** | **Visualizar e prever** | Painel de gasto: **13 meses** de histórico, **18 meses** de forecast |
| **AWS Budgets** | **Alertar e agir** | **6 tipos** de budget, atualizado **até 3×/dia** |
| **Cost and Usage Report (CUR)** | **Exportar o dado bruto** | *"the most comprehensive set of cost and usage data available"*, num bucket S3 seu |

## A regra que decide

> **Cost Explorer mostra. Budgets alerta. CUR exporta.**

| Enunciado | Resposta |
|---|---|
| "visualizar e prever o gasto" | **Cost Explorer** |
| "**me avise** quando passar de X" | **AWS Budgets** |
| "analisar com **SQL**, cruzar com dado externo" | **CUR** + Athena |
| "quanto cada **time** gastou" | **Cost allocation tags** (ativadas no Billing) |
| "fatura única para N contas" | **Organizations** |
| "a instância está superdimensionada" | **Compute Optimizer** |

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[Compute Optimizer]] · [[Organizations e Control Tower]] · [[Athena]] · [[Opcoes de compra do EC2 (Spot, RI, Savings Plans)]]
- [Cost Explorer](https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html)
