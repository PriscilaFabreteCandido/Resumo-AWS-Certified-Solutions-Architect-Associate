---
tags: [saa-c03, dominio-4, cost-explorer, budgets, cur, organizations, alta-prioridade]
dominio: 4
tasks: [4.1, 4.2, 4.3, 4.4]
atualizado: 2026-11-08
---

# Ferramentas de custo — Cost Explorer, Budgets, CUR e Organizations

> [!important] Garantia de questão
> Estas ferramentas aparecem nos **quatro** task statements do domínio 4, com a mesma redação: *"AWS cost management tools with appropriate use cases (for example, AWS Cost Explorer, AWS Budgets, AWS Cost and Usage Report)"*.
> Se há um item do domínio 4 que vale decorar, é este.

## 🧩 Em 30 segundos

| Ferramenta | Verbo |
|---|---|
| **Cost Explorer** | **Visualizar e prever** (13 meses de histórico, 18 meses de forecast) |
| **AWS Budgets** | **Alertar e agir** (6 tipos de budget, até 3 atualizações/dia) |
| **Cost and Usage Report (CUR)** | **Exportar o dado bruto** para um bucket S3 |
| **Organizations** | **Consolidar a fatura** e compartilhar descontos |
| **Compute Optimizer** | **Recomendar rightsizing** |
| **Cost allocation tags** | **Atribuir** custo a time/projeto/ambiente |
| **Control Tower** | *"apply pre-packaged governance rules for security, operations, and compliance"* |

## 🧠 Teste-se primeiro

> [!question]- Cost Explorer: histórico, forecast e atualização
> Histórico: *"view data for up to the last 13 months"*.
> Forecast: *"forecast how much you're likely to spend for the next 18 months"*.
> Atualização: *"Cost Explorer refreshes your cost data at least once every 24 hours"*; o mês corrente aparece *"in about 24 hours"*.
> Também recomenda compra de RI. ⚠️ Chamada de API: *"Each paginated API request incurs a charge of $0.01"* — o console é grátis.

> [!question]- Os seis tipos de budget
> **Cost budgets** — limite de gasto
> **Usage budgets** — limite de uso (horas, GB)
> **RI utilization budgets** — alerta quando a utilização das RIs cai abaixo do limiar
> **RI coverage budgets** — alerta quando a cobertura por RI cai
> **Savings Plans utilization budgets**
> **Savings Plans coverage budgets**
>
> Notificação: *"to an Amazon SNS topic, to an email address, or to both"*, tanto em valor **real** quanto **previsto**. **Budget actions** podem aplicar uma policy IAM (ex.: impedir novos lançamentos). Atualização: *"up to three times a day"*. Base de custo: blended, unblended, net unblended, amortized, net amortized.

> [!question]- Cost Explorer × Budgets × CUR, em uma frase cada
> **Cost Explorer**: painel para **entender e prever** o gasto.
> **Budgets**: **alerta** (e opcionalmente **age**) quando um limite é atingido ou previsto.
> **CUR**: *"the most comprehensive set of cost and usage data available"*, publicado num **bucket S3 seu**, em **CSV**, atualizado **ao menos 1x/dia** (até 3x), com granularidade de **hora, dia ou mês**, para integrar com **Athena, Redshift ou Amazon Quick**.

> [!question]- O que o Organizations faz pelo custo?
> *"Organizations provides you with a single consolidated bill"* e *"The owner of the management account is responsible for paying for all usage"*. O serviço é **sem custo adicional**.
> Tags de alocação de custo das contas membro aparecem na fatura consolidada.
> Benefício prático (muito citado em prova, embora não afirmado nas páginas que conferi): o uso agregado das contas atinge faixas de desconto por volume mais cedo, e Savings Plans / RIs podem ser compartilhados entre contas da organização.

## Cost allocation tags — o detalhe que a prova testa

1. Você **aplica** a tag no recurso (`Projeto=alpha`, `Ambiente=prod`, `Time=pagamentos`).
2. Você **ativa** a tag como *cost allocation tag* no console de **Billing**.
3. Só **depois disso** ela passa a aparecer como dimensão no Cost Explorer e no CUR.

Existem **tags geradas pela AWS** (`aws:createdBy`) e as **definidas por você**. A ativação não é retroativa para dados anteriores.

> [!warning] A pegadinha
> "Aplicamos tags em todos os recursos mas o Cost Explorer não mostra o custo por time." A causa é **não ter ativado a tag no console de billing**. Alternativa errada típica: "criar um CUR por time".

## Observabilidade de custo e governança

| Serviço | Papel |
|---|---|
| **Compute Optimizer** | *"analyzes your AWS resources' configuration and utilization metrics to provide you with rightsizing recommendations and identify idle resources"*. Janela de **14 dias** (93 com enhanced infrastructure metrics). **Só recomenda** |
| **Trusted Advisor** | Checagens de custo, performance, segurança, tolerância a falha e limites de serviço |
| **AWS Config** | Registra configuração e conformidade — útil para pegar recurso fora de padrão (e caro) |
| **Service Catalog** | Catálogo de produtos aprovados: impede que times subam arquiteturas caras fora do padrão |
| **Control Tower** | Landing zone com guardrails prontos |
| **SCPs** | Guardrail preventivo de custo: negar regiões não aprovadas, negar famílias de instância caras |

> [!tip] SCP como controle de custo
> "Impedir que qualquer conta use a região X" ou "proibir instâncias `p4d`" é **SCP**, não Budgets. Budgets **avisa depois**; SCP **impede antes**. Quando o enunciado diz "prevenir", é SCP.

## ❓ Questões de prova

> [!example]- Q1 — A diretoria quer ser notificada quando o gasto mensal **previsto** passar de US$ 50.000, e que novos lançamentos de EC2 sejam bloqueados nesse caso. Qual solução?
> **A)** Cost Explorer com relatório mensal por e-mail
> **B)** **AWS Budgets com budget de custo, alerta em valor previsto para SNS/e-mail e budget action aplicando uma policy IAM restritiva** ✅
> **C)** CUR com query no Athena e alarme no CloudWatch
> **D)** SCP negando `ec2:RunInstances`
>
> **Por que B**: Budgets é a única ferramenta que alerta em **valor previsto** e tem **budget actions** para aplicar policy IAM.
> **A errada**: Cost Explorer **não alerta**.
> **C errada**: construção caseira, com mais peças, para um recurso que já existe.
> **D errada**: SCP bloquearia **sempre**, não condicionado ao gasto.

> [!example]- Q2 — O FinOps precisa analisar o custo por hora, por recurso, cruzando com dados do ERP, usando SQL. Qual fonte?
> **A)** Cost Explorer com granularidade horária
> **B)** **Cost and Usage Report entregue em S3 e consultado no Athena** ✅
> **C)** AWS Budgets com relatório
> **D)** API do Cost Explorer
>
> **Por que B**: o CUR é *"the most comprehensive set of cost and usage data available"*, com granularidade de **hora**, entregue num bucket S3 e preparado para *"integration with Amazon Athena, Amazon Redshift, or Quick"*.
> **A errada**: Cost Explorer é painel, não permite join com dado externo.
> **C errada**: Budgets alerta.
> **D errada**: a API serve para automação, cobra **US$ 0,01 por requisição paginada** e não entrega o nível de detalhe do CUR.

> [!example]- Q3 — Uma empresa precisa garantir que nenhuma das 30 contas possa criar recursos fora de `us-east-1` e `sa-east-1`, por motivo de custo e compliance. O que usar?
> **A)** AWS Budgets por região
> **B)** **SCP na raiz da organização com `Deny` condicionado a `aws:RequestedRegion`** ✅
> **C)** Config rule com remediação
> **D)** IAM policy em todos os roles
>
> **Por que B**: SCP é o guardrail **preventivo** e alcança todas as contas membro, incluindo o root delas.
> **A errada**: Budgets avisa depois do gasto.
> **C errada**: Config detecta e remedia **depois** da criação.
> **D errada**: inviável manter em 30 contas e não alcança o root.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Cost Explorer alerta | Quem alerta é o **Budgets** |
| CUR é um painel | É **dado bruto** em CSV num bucket S3 seu |
| Budgets só alerta em valor real | Alerta também em valor **previsto** |
| Cost Explorer tem 12 meses | **13 meses** de histórico e **18 meses** de forecast |
| Cost Explorer é cobrado | O console é grátis; a **API** custa US$ 0,01 por requisição paginada |
| Tag aplicada já aparece no relatório | Precisa ser **ativada** como cost allocation tag no Billing |
| Compute Optimizer aplica a correção | Só **recomenda** |
| Organizations cobra | **Sem custo adicional** (igual ao AWS RAM) |
| Budgets impede o gasto | Com **budget action** pode aplicar policy; mas o guardrail preventivo forte é **SCP** |
| Budgets atualiza em tempo real | *"up to three times a day"* |

## Links

- [[04 - Dominio 4 - Design Cost-Optimized Architectures (20%)]]
- [[IAM, STS e Organizations]]
- [[05 - Plano de estudo (e como praticar sem levar susto na fatura)]]
- [O que é o Cost Explorer](https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html)
- [Gerenciando custo com Budgets](https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html)
- [O que é o CUR](https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html)
