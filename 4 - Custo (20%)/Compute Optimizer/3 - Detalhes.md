---
tags: [saa-c03, compute-optimizer, detalhes]
servico: AWS Compute Optimizer
atualizado: 2026-11-08
---

# Compute Optimizer — Detalhes

## 1. Por que ele vem antes de comprar desconto

A sequência correta de otimização de custo é:

```
1. RIGHTSIZING        → pagar pelo tamanho certo       (Compute Optimizer)
2. DESLIGAR o ocioso  → não pagar o que não se usa     (scheduled scaling)
3. ESCALAR            → acompanhar a demanda           (Auto Scaling)
4. COMPROMETER        → desconto no que resta          (Savings Plans / RI)
```

Inverter a ordem é o erro clássico: comprometer-se com 1 ano de uma instância **superdimensionada** congela o desperdício. O Compute Optimizer existe para o passo 1.

## 2. A janela de 14 dias — e quando ela engana

> *"the last 14 days"* (93 dias com **enhanced infrastructure metrics**)

Isso importa em três cenários:

| Cenário | Problema com 14 dias |
|---|---|
| Pico **mensal** (fechamento contábil, folha) | O pico pode ficar fora da janela |
| Pico **sazonal** (Black Friday, matrícula) | Certamente fica fora |
| Workload **novo** | Ainda não há dado suficiente |

Para os dois primeiros, habilite **enhanced infrastructure metrics** (93 dias). Para o terceiro, espere.

## 3. Memória — a métrica que falta

O Compute Optimizer trabalha com métricas do **CloudWatch**. E as métricas padrão do EC2 **não incluem memória** (o hipervisor não a enxerga).

Consequência: sem o **CloudWatch agent** publicando memória, as recomendações para cargas **memory-bound** são menos precisas — o Optimizer pode sugerir uma instância menor olhando só CPU, quando o gargalo é RAM.

É a ligação que a prova faz entre os dois serviços: instalar o **CloudWatch agent** melhora a qualidade do rightsizing.

## 4. O que ele cobre

| Recurso | O que recomenda |
|---|---|
| **Instâncias EC2** | Tipo e tamanho; identifica ociosas |
| **Auto Scaling groups** | Tipo das instâncias do grupo |
| **Volumes EBS** | Tipo e configuração (IOPS/throughput) |
| **Funções Lambda** | **Memória** (que define a CPU e o custo) |
| **Serviços ECS no Fargate** | CPU e memória da task |

A recomendação de **Lambda** é especialmente útil pelo efeito contraintuitivo: mais memória dá mais CPU, pode reduzir o tempo e **baixar** o custo total.

## 5. Compute Optimizer × os outros

| Ferramenta | Verbo |
|---|---|
| **Compute Optimizer** | **Recomenda** rightsizing (por utilização) |
| **Trusted Advisor** | **Recomenda** nos 5 pilares (checagens prontas) |
| **Cost Explorer** | **Mostra e prevê** o gasto |
| **AWS Budgets** | **Alerta** (e pode agir, com budget actions) |
| **CUR** | **Exporta** o dado bruto |
| **Service Quotas** | **Aumenta** quota |

Nenhum deles **aplica** a mudança de tamanho — isso é seu, via launch template, instance refresh, ou modificação do volume.

## 6. O fluxo completo de rightsizing

```
CloudWatch (+ agent para memória)
        ↓
COMPUTE OPTIMIZER  →  recomendação por recurso
        ↓
Avaliar (a carga realmente cabe?)
        ↓
Nova versão do launch template
        ↓
Auto Scaling INSTANCE REFRESH  →  troca a fleet
        ↓
Cost Explorer confirma a economia
```

## Links

- [[4 - Custo (20%)/Compute Optimizer/1 - O que e|1 - O que e]] · [[4 - Custo (20%)/Compute Optimizer/2 - Decorar|2 - Decorar]] · [[4 - Custo (20%)/Compute Optimizer/4 - Questoes|4 - Questoes]]
- [[2 - Resiliencia (26%)/CloudWatch/1 - O que e|CloudWatch]] · [[2 - Resiliencia (26%)/Auto Scaling (EC2)/1 - O que e|Auto Scaling (EC2)]] · [[3 - Performance (24%)/EC2/1 - O que e|EC2]] · [[2 - Resiliencia (26%)/Lambda/1 - O que e|Lambda]] · [[3 - Performance (24%)/EBS/1 - O que e|EBS]] · [[4 - Custo (20%)/Ferramentas de custo (Cost Explorer, Budgets, CUR)/1 - O que e|Ferramentas de custo (Cost Explorer, Budgets, CUR)]] · [[4 - Custo (20%)/Opcoes de compra do EC2 (Spot, RI, Savings Plans)/1 - O que e|Opcoes de compra do EC2 (Spot, RI, Savings Plans)]]
