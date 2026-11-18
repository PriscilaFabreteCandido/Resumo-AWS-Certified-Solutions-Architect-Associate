---
tags: [saa-c03, custo, questoes]
servico: Ferramentas de custo
atualizado: 2026-11-08
---

# Ferramentas de custo — Questões

> [!question]- Q1. A diretoria quer ser notificada quando o gasto mensal **previsto** passar de US$ 50.000, e que novos lançamentos de EC2 sejam bloqueados nesse caso.
> **A)** Cost Explorer com relatório mensal por e-mail
> **B)** **AWS Budgets com alerta em valor previsto para SNS/e-mail e budget action aplicando policy IAM** ✅
> **C)** CUR com query no Athena e alarme no CloudWatch
> **D)** SCP negando `ec2:RunInstances`
>
> **Por que B**: Budgets é a única ferramenta que alerta em **valor previsto** e tem **budget actions**.
> **A errada**: Cost Explorer **não alerta**.
> **C errada**: construção caseira para algo que já existe.
> **D errada**: bloquearia **sempre**, não condicionado ao gasto.

> [!question]- Q2. O FinOps precisa analisar custo **por hora, por recurso**, cruzando com dados do ERP, usando SQL.
> **A)** Cost Explorer com granularidade horária
> **B)** **CUR entregue no S3 e consultado no Athena** ✅
> **C)** AWS Budgets
> **D)** API do Cost Explorer
>
> **Por que B**: o CUR é *"the most comprehensive set of cost and usage data available"* (o conjunto mais completo de dados de custo e uso disponível), com granularidade de **hora**, preparado para *"integration with Amazon Athena, Amazon Redshift, or Quick"*.
> **A errada**: painel não faz join com dado externo.
> **D errada**: cobra **US$ 0,01** por requisição paginada e não entrega o detalhe do CUR.

> [!question]- Q3. 12 times precisam ter o custo atribuído, sem criar contas novas. As tags já estão aplicadas, mas o Cost Explorer não mostra nada por time.
> **A)** Criar um CUR por time
> **B)** **Ativar as tags como cost allocation tags no console de Billing** ✅
> **C)** AWS Budgets por time
> **D)** Resource groups
>
> **Por que B**: é o passo esquecido — a tag só aparece como dimensão **depois de ativada** (e não é retroativo).
> **A errada**: o CUR é um só, e **usa** as tags.
> **C errada**: Budgets alerta; não atribui custo.

> [!question]- Q4. Garantir que nenhuma das 30 contas crie recursos fora de `us-east-1` e `sa-east-1`, por custo e compliance.
> **A)** AWS Budgets por região
> **B)** **SCP com `Deny` condicionado a `aws:RequestedRegion`** ✅
> **C)** Config rule com remediação
> **D)** Cost Explorer com filtro por região
>
> **Por que B**: o verbo é **impedir** → guardrail preventivo.
> **A errada**: Budgets avisa **depois** do gasto.
> **C errada**: Config detecta e remedia **depois** da criação.

> [!question]- Q5. A empresa comprou Savings Plans e quer saber se está usando o que comprometeu.
> **A)** Cost Explorer
> **B)** **AWS Budgets do tipo Savings Plans utilization (e coverage)** ✅
> **C)** Compute Optimizer
> **D)** CUR
>
> **Por que B**: são dois dos **6 tipos** de budget, feitos exatamente para monitorar eficiência do compromisso.
> **A errada**: o Cost Explorer **mostra** a utilização, mas não **alerta**.

> [!question]- Q6. Quanto tempo de histórico o Cost Explorer mostra, e quanto prevê?
> **A)** 12 meses de histórico, 12 de forecast
> **B)** **13 meses de histórico, 18 meses de forecast** ✅
> **C)** 6 meses e 6 meses
> **D)** 24 meses e 12 meses
>
> **Por que B**: *"up to the last 13 months"* e *"the next 18 months"*.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Cost Explorer alerta | Quem alerta é o **Budgets** |
| CUR é um painel | É **dado bruto em CSV** num bucket S3 seu |
| Budgets só alerta em valor real | Alerta também em valor **previsto** |
| Cost Explorer tem 12 meses | **13 meses** de histórico e **18** de forecast |
| Cost Explorer é cobrado | O console é grátis; a **API** custa **US$ 0,01** por requisição paginada |
| Tag aplicada já aparece no relatório | Precisa ser **ativada** no Billing — e não é retroativo |
| Budgets tem 2 tipos | **Seis** (cost, usage, RI utilization/coverage, SP utilization/coverage) |
| Budgets atualiza em tempo real | *"up to three times a day"* (até três vezes por dia) |
| Budgets impede o gasto | **Alerta** (e com budget action aplica policy). Impedir é **SCP** |
| Organizations é pago | *"offered at no additional charge"* (oferecido sem cobrança adicional) |
| Compute Optimizer mostra o gasto | **Recomenda rightsizing**; gasto é Cost Explorer |

## Links

- [[4 - Custo (20%)/Ferramentas de custo (Cost Explorer, Budgets, CUR)/1 - O que e|1 - O que e]] · [[4 - Custo (20%)/Ferramentas de custo (Cost Explorer, Budgets, CUR)/2 - Decorar|2 - Decorar]] · [[4 - Custo (20%)/Ferramentas de custo (Cost Explorer, Budgets, CUR)/3 - Detalhes|3 - Detalhes]]
