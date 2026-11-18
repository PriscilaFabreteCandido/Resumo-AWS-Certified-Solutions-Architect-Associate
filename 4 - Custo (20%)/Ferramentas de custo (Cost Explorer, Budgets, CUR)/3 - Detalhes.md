---
tags: [saa-c03, custo, detalhes]
servico: Ferramentas de custo
atualizado: 2026-11-08
---

# Ferramentas de custo — Detalhes

## 1. Os três verbos — e por que a prova insiste neles

| Ferramenta | O que faz | O que **não** faz |
|---|---|---|
| **Cost Explorer** | Visualiza e **prevê** | **Não alerta** |
| **AWS Budgets** | **Alerta** (e pode agir) | Não analisa em profundidade |
| **CUR** | **Exporta** o dado bruto | Não visualiza nem alerta |

A questão típica oferece as três e descreve **um** verbo. Se o enunciado diz *"me avise"*, é **Budgets** — mesmo que o Cost Explorer pareça "a ferramenta de custo".

## 2. Cost Explorer

Mostra gasto e uso por serviço, conta, região, tag e tipo de uso, com **13 meses** de histórico e **18 meses** de forecast. Atualiza *"at least once every 24 hours"* (pelo menos uma vez a cada 24 horas), e o mês corrente aparece *"in about 24 hours"* (em cerca de 24 horas).

Também *"get recommendations for what Reserved Instances to purchase"* (receber recomendações de quais Instâncias Reservadas comprar) — baseadas no uso real.

Dois detalhes de prova:
- O **console é grátis**; a **API** cobra *"$0.01"* por requisição paginada
- Usa **a mesma base de dados** do CUR — a diferença é a apresentação

## 3. AWS Budgets — e os quatro tipos que ninguém decora

Todo mundo lembra de **cost** e **usage**. Os outros quatro são sobre **eficiência do compromisso**:

| Tipo | Responde |
|---|---|
| **RI utilization** | *"Estou usando as RIs que comprei?"* |
| **RI coverage** | *"Que fração do meu uso está coberta por RI?"* |
| **SP utilization** | O mesmo, para Savings Plans |
| **SP coverage** | O mesmo, para Savings Plans |

Esses quatro existem porque comprometer-se e **não usar** é desperdício — e você só descobre monitorando.

Alertas vão *"to an Amazon SNS topic, to an email address, or to both"* (para um tópico do Amazon SNS, para um endereço de e-mail, ou para ambos), tanto em valor **real** quanto **previsto**. O alerta de **previsto** é o que permite reagir **antes** do fim do mês.

**Budget actions** podem aplicar uma **policy IAM** — por exemplo, negar `ec2:RunInstances` ao atingir 100% do orçamento.

Atualização: *"up to three times a day"* (até três vezes por dia) — não é tempo real.

## 4. CUR — quando o painel não basta

O CUR é *"the most comprehensive set of cost and usage data available"* (o conjunto mais completo de dados de custo e uso disponível), publicado *"to an Amazon S3 bucket that you own"*, em **CSV**, com granularidade de **hora, dia ou mês**, atualizado *"at least once a day"* (até 3×).

Use quando precisa de:
- **Granularidade horária** por recurso
- **Join** com dado externo (centro de custo do ERP, receita por cliente)
- **Showback/chargeback** próprio
- Retenção longa do histórico

A doc indica integração com *"Amazon Athena, Amazon Redshift, or Quick"*. O padrão: **CUR → S3 → Athena → Amazon Quick**.

## 5. Cost allocation tags — o passo que todos esquecem

```
1. Aplicar a tag no recurso          (Projeto=alpha, Time=pagamentos)
2. ATIVAR a tag como cost allocation tag no console de BILLING  ← o passo esquecido
3. Só então ela aparece como dimensão no Cost Explorer e no CUR
```

Existem tags **geradas pela AWS** (`aws:createdBy`) e as **definidas por você**. A ativação **não é retroativa**.

Sintoma de prova: *"aplicamos tags em todos os recursos mas o Cost Explorer não mostra o custo por time"* → **faltou ativar no Billing**.

E a alternativa de arquitetura: quando os times precisam de isolamento forte (não só visibilidade), a resposta é **conta separada** na Organization.

## 6. Organizations — consolidated billing

> *"Organizations provides you with a single consolidated bill"* (o Organizations entrega uma fatura única consolidada), e *"The owner of the management account is responsible for paying for all usage, data, and resources used by the accounts in the organization."* (o dono da conta de gerenciamento é responsável por pagar todo o uso, dados e recursos consumidos pelas contas da organização)

O serviço é *"offered at no additional charge"* (oferecido sem cobrança adicional).

Dois efeitos de custo (muito citados, embora as páginas lidas não os detalhem): o uso **agregado** atinge faixas de desconto por volume mais cedo, e **Savings Plans / RIs** podem ser compartilhados entre contas da organização.

## 7. Prevenir × detectar × alertar

| Objetivo | Serviço |
|---|---|
| **Impedir** gasto (região, tipo de instância proibidos) | **SCP** |
| **Alertar** sobre gasto | **AWS Budgets** |
| **Agir** ao atingir o orçamento | **Budget actions** (policy IAM) |
| **Analisar** o gasto | **Cost Explorer** / **CUR** |
| **Reduzir** o desperdício | **Compute Optimizer** · desligar ocioso · Savings Plans |
| **Padronizar** o que os times podem criar | **Service Catalog** |

Budgets **avisa depois**; SCP **impede antes**. Quando o enunciado diz *"prevenir"*, é SCP.

## Links

- [[4 - Custo (20%)/Ferramentas de custo (Cost Explorer, Budgets, CUR)/1 - O que e|1 - O que e]] · [[4 - Custo (20%)/Ferramentas de custo (Cost Explorer, Budgets, CUR)/2 - Decorar|2 - Decorar]] · [[4 - Custo (20%)/Ferramentas de custo (Cost Explorer, Budgets, CUR)/4 - Questoes|4 - Questoes]]
- [[4 - Custo (20%)/Compute Optimizer/1 - O que e|Compute Optimizer]] · [[1 - Seguranca (30%)/Organizations e Control Tower/1 - O que e|Organizations e Control Tower]] · [[3 - Performance (24%)/Athena/1 - O que e|Athena]] · [[4 - Custo (20%)/Opcoes de compra do EC2 (Spot, RI, Savings Plans)/1 - O que e|Opcoes de compra do EC2 (Spot, RI, Savings Plans)]] · [[1 - Seguranca (30%)/Governanca (Artifact, Trusted Advisor, Service Catalog)/1 - O que e|Governanca (Artifact, Trusted Advisor, Service Catalog)]]
