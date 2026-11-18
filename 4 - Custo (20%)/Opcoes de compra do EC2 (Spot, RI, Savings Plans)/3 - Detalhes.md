---
tags: [saa-c03, custo, detalhes]
servico: Opções de compra do EC2
atualizado: 2026-11-08
---

# Opções de compra — Detalhes

## 1. A árvore de decisão

```
A carga tolera INTERRUPÇÃO?
├── SIM  →  SPOT  (batch, CI, render, analytics)
└── NÃO
    ├── É estável e previsível por 1-3 anos?
    │   ├── Preciso reservar CAPACIDADE numa AZ?
    │   │      →  RI ZONAL  ou  CAPACITY RESERVATION
    │   ├── Sei a família e a região, e quero o maior desconto?
    │   │      →  EC2 INSTANCE SAVINGS PLANS  (até 72%)
    │   └── Não sei ainda, ou pode mudar (inclusive para Fargate/Lambda)?
    │          →  COMPUTE SAVINGS PLANS  (até 66%)
    ├── Tenho licença per-socket/per-core?
    │      →  DEDICATED HOSTS
    ├── Preciso de hardware single-tenant por compliance?
    │      →  DEDICATED INSTANCES
    └── É imprevisível ou de curta duração?
           →  ON-DEMAND  (ou Lambda/Fargate)
```

## 2. Savings Plans — por que a AWS os prefere

> *"We recommend Savings Plans over Reserved Instances."* (recomendamos Savings Plans em vez de Instâncias Reservadas)

A razão é a flexibilidade: a RI compromete-se com **configuração** (tipo, região, tenancy, plataforma); o Savings Plan compromete-se com **valor por hora**.

**Compute Savings Plans** (até **66%**) aplica-se *"regardless of instance family, instance size, OS, tenancy, or AWS Region"* (independentemente de família, tamanho de instância, sistema operacional, tenancy ou Região), e — o ponto que mais cai — cobre **Fargate e Lambda**. Isso significa que modernizar a arquitetura (EC2 → containers → serverless) **não desperdiça** o compromisso.

**EC2 Instance Savings Plans** (até **72%**) dá mais desconto em troca de amarrar *"a specific instance family in a chosen AWS Region"* (uma família de instâncias específica, numa Região escolhida), mantendo flexibilidade de **tamanho, SO e tenancy** dentro disso.

**Database Savings Plans** (até **35%**) é o tipo que material antigo não menciona: cobre **Aurora, RDS, DynamoDB, ElastiCache, DocumentDB, Timestream, Neptune, Keyspaces, DMS e OpenSearch**, *"regardless of engine, instance family, size, Availability Zone (AZ), or Region"* (independentemente de engine, família de instância, tamanho, Zona de Disponibilidade ou Região).

⚠️ Dois detalhes: *"The terms of the commitment can't be changed after purchase"* (os termos do compromisso não podem ser alterados depois da compra), e no EKS *"Amazon EKS charges will not be covered by Savings Plans, but the underlying EC2 instances will be"* (as cobranças do Amazon EKS não são cobertas por Savings Plans, mas as instâncias EC2 subjacentes são).

## 3. Reserved Instances — e a confusão desconto × capacidade

A RI *"not physical instances, but rather a billing discount applied to the use of On-Demand Instances in your account"*. Os atributos que definem o preço: **instance type, Region, tenancy, platform**.

**Standard × Convertible**:

| | **Standard** | **Convertible** |
|---|---|---|
| Desconto | **Maior** | Menor |
| Modificar | **Sim** | Sim |
| **Trocar** | **"can't be exchanged"** (não podem ser trocadas) | **Sim**, por outra Convertible |

E as regras: **não renovam** automaticamente, **não podem ser canceladas**. A opção **No Upfront** exige *"a successful billing history"* (um histórico de pagamentos em dia).

> [!important] Zonal × regional — o ponto mais confundido
> Só a RI **zonal** (atrelada a uma AZ específica) **reserva capacidade**.
> A RI **regional** é **apenas desconto de billing**.
> Para garantir capacidade **sem** compromisso de 1-3 anos, use **On-Demand Capacity Reservation**.

## 4. Spot — o contrato real

A EC2 *"terminates, stops, or hibernates your Spot Instance when Amazon EC2 needs the capacity back"* (encerra, para ou hiberna sua instância Spot quando o Amazon EC2 precisa da capacidade de volta), com **dois minutos** de aviso. Antes disso pode vir o **rebalance recommendation**, sinalizando *"an elevated risk of interruption"*.

A requisição é **one-time** ou **persistent** — a persistente *"automatically resubmits"* (reenvia automaticamente) depois da interrupção.

A doc **não publica** um percentual de desconto (só *"steep discounts"* (descontos expressivos)), e é explícita: *"Spot Instances are not covered by Savings Plans."* (instâncias Spot não são cobertas por Savings Plans)

Casos de uso citados: *"data analysis, batch jobs, background processing, and optional tasks."* (análise de dados, jobs em lote, processamento em segundo plano e tarefas opcionais)

**As estratégias de alocação** importam porque mudam a taxa de interrupção:

| Estratégia | Avaliação |
|---|---|
| **price capacity optimized** | **Recomendada** — capacidade primeiro, preço depois |
| **capacity optimized** | Menor chance de interrupção |
| **diversified** | Espalha o risco |
| **lowest price** | **"(not recommended)"**, *"highest risk of interruption"* — e é o **default da CLI** |

**Capacity Rebalancing** lança o substituto **antes** da interrupção: `launch-before-terminate` (delay de **120 a 7.200 s**) ou `launch`. Só em fleet **maintain**, e **imutável** depois de criado.

## 5. Dedicated Hosts × Dedicated Instances — o gatilho de licença

A doc do Dedicated Host: *"bring your existing per-socket, per-core, or per-VM software licenses to reduce costs"*. O Dedicated Instance é só *"instances that run on single-tenant hardware"*, por hora.

| Gatilho no enunciado | Resposta |
|---|---|
| Licença **por socket / por core** (Oracle, SQL Server, Windows) | **Dedicated Hosts** (+ **License Manager**) |
| "hardware isolado por compliance", sem falar de licença | **Dedicated Instances** |

⚠️ **Dedicated Hosts não podem** lançar em placement group.

## 6. As alavancas que não são compra

Antes de comprometer-se, a prova espera que você considere:

| Alavanca | Efeito |
|---|---|
| **Desligar fora do horário** | Dev/teste: ~65% de economia, sem compromisso |
| **Rightsizing** (**Compute Optimizer**) | Pagar pelo tamanho certo |
| **Graviton** | Melhor preço/performance (exige validar ARM) |
| **Auto Scaling** | Não pagar capacidade ociosa |
| **Serverless** (Lambda/Fargate) | Pagar por uso |
| **Hibernação** | Carga intermitente com boot longo (⚠️ paga o EBS) |

Comprometer-se com capacidade **ociosa** é o pior dos mundos: primeiro dimensione, depois compre.

## Links

- [[4 - Custo (20%)/Opcoes de compra do EC2 (Spot, RI, Savings Plans)/1 - O que e|1 - O que e]] · [[4 - Custo (20%)/Opcoes de compra do EC2 (Spot, RI, Savings Plans)/2 - Decorar|2 - Decorar]] · [[4 - Custo (20%)/Opcoes de compra do EC2 (Spot, RI, Savings Plans)/4 - Questoes|4 - Questoes]]
- [[3 - Performance (24%)/EC2/1 - O que e|EC2]] · [[2 - Resiliencia (26%)/Auto Scaling (EC2)/1 - O que e|Auto Scaling (EC2)]] · [[4 - Custo (20%)/Compute Optimizer/1 - O que e|Compute Optimizer]] · [[4 - Custo (20%)/Ferramentas de custo (Cost Explorer, Budgets, CUR)/1 - O que e|Ferramentas de custo (Cost Explorer, Budgets, CUR)]] · [[2 - Resiliencia (26%)/Fargate/1 - O que e|Fargate]] · [[2 - Resiliencia (26%)/Lambda/1 - O que e|Lambda]] · [[2 - Resiliencia (26%)/AWS Batch/1 - O que e|AWS Batch]] · [[3 - Performance (24%)/EMR/1 - O que e|EMR]]
