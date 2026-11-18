---
tags: [saa-c03, custo, decorar]
servico: Ferramentas de custo
atualizado: 2026-11-08
---

# Ferramentas de custo — Decorar

## Cost Explorer

| Item | Valor |
|---|---|
| **Histórico** | *"view data for up to the last 13 months"* (ver dados de até os últimos 13 meses) |
| **Forecast** | *"forecast how much you're likely to spend for the next 18 months"* (projetar quanto você provavelmente vai gastar nos próximos 18 meses) |
| Atualização | *"refreshes your cost data at least once every 24 hours"* (atualiza seus dados de custo pelo menos uma vez a cada 24 horas); mês corrente *"in about 24 hours"* (em cerca de 24 horas) |
| Recomendações | *"get recommendations for what Reserved Instances to purchase"* (receber recomendações de quais Instâncias Reservadas comprar) |
| **Custo da API** | *"Each paginated API request incurs a charge of $0.01"* (o console é grátis) |
| Granularidade (hora/dia/mês) | **A doc não informa** nessa página |
| Base de dados | A mesma do **CUR** |

## AWS Budgets — os 6 tipos

| Tipo | O que monitora |
|---|---|
| **Cost budgets** | *"Set spending limits for services and receive alerts"* (definir limites de gasto por serviço e receber alertas) |
| **Usage budgets** | *"Establish usage limits for one or more services"* (estabeleça limites de uso para um ou mais serviços) |
| **RI utilization budgets** | Alerta quando a **utilização** das RIs cai abaixo do limiar |
| **RI coverage budgets** | Alerta quando a **cobertura** por RI cai |
| **Savings Plans utilization budgets** | Utilização dos Savings Plans |
| **Savings Plans coverage budgets** | Cobertura dos Savings Plans |

| Item | Valor |
|---|---|
| Notificação | *"to an Amazon SNS topic, to an email address, or to both"* (para um tópico do Amazon SNS, para um endereço de e-mail, ou para ambos) |
| Tipos de alerta | **Real** e **previsto** |
| Atualização | *"up to three times a day"* (até três vezes por dia) |
| **Budget actions** | Podem aplicar uma **policy IAM** |
| Base de custo | blended, unblended, net unblended, **amortized**, net amortized |

## Cost and Usage Report (CUR)

| Item | Valor |
|---|---|
| Natureza | *"the most comprehensive set of cost and usage data available"* (o conjunto mais completo de dados de custo e uso disponível) |
| Destino | *"an Amazon S3 bucket that you own"* (um bucket do Amazon S3 que pertence a você) |
| Formato | **CSV** — *"AWS updates the report in your bucket once a day"* (a AWS atualiza o relatório no seu bucket uma vez por dia) |
| Frequência | *"Update the report up to three times a day"* (atualizar o relatório até três vezes por dia); *"at least once a day"* (pelo menos uma vez por dia) |
| **Granularidade** | **hora, dia ou mês** |
| Integrações | *"Amazon Athena, Amazon Redshift, or Quick"* |

## Organizations e cost allocation tags

| Item | Citação |
|---|---|
| Fatura única | *"Organizations provides you with a single consolidated bill"* (o Organizations entrega uma fatura única consolidada) |
| Quem paga | *"The owner of the management account is responsible for paying for all usage"* (o dono da conta de gerenciamento é responsável por pagar todo o uso) |
| Custo do serviço | *"AWS Organizations is offered at no additional charge"* (o AWS Organizations é oferecido sem cobrança adicional) |
| Tags | *"You can use cost allocation tags in individual AWS accounts... this allocation will be visible in the consolidated bill"* (você pode usar tags de alocação de custo em contas individuais... essa alocação fica visível na fatura consolidada) |

> [!warning] A pegadinha das tags
> Aplicar a tag **não basta**: ela precisa ser **ativada como cost allocation tag** no console de **Billing**. E a ativação **não é retroativa**.

## Links

- [[4 - Custo (20%)/Ferramentas de custo (Cost Explorer, Budgets, CUR)/1 - O que e|1 - O que e]] · [[4 - Custo (20%)/Ferramentas de custo (Cost Explorer, Budgets, CUR)/3 - Detalhes|3 - Detalhes]] · [[4 - Custo (20%)/Ferramentas de custo (Cost Explorer, Budgets, CUR)/4 - Questoes|4 - Questoes]]
- [[02 - Numeros para decorar]]
