---
tags: [saa-c03, cost-explorer, budgets, cur, custo, alta-prioridade]
servico: Ferramentas de custo
tipo: Visibilidade e governança de gasto
dominios: [4]
atualizado: 2026-11-08
---

# Ferramentas de custo — O que é

> [!important] Garantia de questão
> Estas ferramentas aparecem nos **quatro** task statements do domínio 4, com a mesma redação: *"AWS cost management tools with appropriate use cases (for example, AWS Cost Explorer, AWS Budgets, AWS Cost and Usage Report)"* (ferramentas de gestão de custo da AWS e seus casos de uso apropriados (por exemplo, AWS Cost Explorer, AWS Budgets, AWS Cost and Usage Report)).

## As três, com seus verbos

| Ferramenta | Verbo | Uma linha |
|---|---|---|
| **Cost Explorer** | **Visualizar e prever** | Painel de gasto: **13 meses** de histórico, **18 meses** de forecast |
| **AWS Budgets** | **Alertar e agir** | **6 tipos** de budget, atualizado **até 3×/dia** |
| **Cost and Usage Report (CUR)** | **Exportar o dado bruto** | *"the most comprehensive set of cost and usage data available"* (o conjunto mais completo de dados de custo e uso disponível), num bucket S3 seu |

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

- [[4 - Custo (20%)/Ferramentas de custo (Cost Explorer, Budgets, CUR)/2 - Decorar|2 - Decorar]] · [[4 - Custo (20%)/Ferramentas de custo (Cost Explorer, Budgets, CUR)/3 - Detalhes|3 - Detalhes]] · [[4 - Custo (20%)/Ferramentas de custo (Cost Explorer, Budgets, CUR)/4 - Questoes|4 - Questoes]]
- [[4 - Custo (20%)/Compute Optimizer/1 - O que e|Compute Optimizer]] · [[1 - Seguranca (30%)/Organizations e Control Tower/1 - O que e|Organizations e Control Tower]] · [[3 - Performance (24%)/Athena/1 - O que e|Athena]] · [[4 - Custo (20%)/Opcoes de compra do EC2 (Spot, RI, Savings Plans)/1 - O que e|Opcoes de compra do EC2 (Spot, RI, Savings Plans)]]
- [Cost Explorer](https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html)
