---
tags: [saa-c03, auto-scaling, detalhes]
servico: Amazon EC2 Auto Scaling
atualizado: 2026-11-08
---

# Auto Scaling — Detalhes

## 1. As políticas, e por que target tracking ganha

**Target tracking** — você define a métrica e o alvo ("manter CPU média em 50%"), e o ASG calcula o resto. É a recomendada: *"we recommend target tracking over either simple scaling or step scaling."*

**Step scaling** — degraus por faixa de alarme ("se CPU > 60%, +1; se > 80%, +3"). Útil quando a resposta precisa ser desproporcional ao desvio.

**Simple scaling** — uma ação por alarme, com **cooldown** bloqueando a próxima. A AWS recomenda **não usar**: *"we recommend that you do not use simple scaling policies and scaling cooldowns."*

**Scheduled** — para padrão de calendário conhecido. Também pode *"start scaling immediately without waiting for the cooldown period"*.

**Predictive** — usa histórico para provisionar **antes** do pico: *"Scale proactively... in advance of daily and weekly patterns."* Combina com dynamic (predictive dimensiona a base, dynamic cobre o imprevisto).

## 2. Health check — a pegadinha completa

O padrão é **EC2 status checks e scheduled events**, sempre ligado. Os demais precisam ser ativados.

O que acontece quando cada um falha:

| Situação | Comportamento |
|---|---|
| Instância **não** está `running` (`stopping`, `stopped`, `shutting-down`, `terminated`) | Marcada Unhealthy e substituída **imediatamente** |
| Status check **`impaired`** | **Não** marca imediatamente — *"waits a few minutes for AWS to fix the issue"* |
| Status check `insufficient-data` | **Não** marca Unhealthy |
| **Scheduled event** (retirement) | Marcada Unhealthy e substituída; o shutdown começa no horário agendado |
| **ELB ou VPC Lattice** reporta Unhealthy | Marcada na próxima checagem periódica e substituída, respeitando connection draining |

E a regra de contenção: acima de 90% da capacidade desejada, no máximo **10%** das instâncias são substituídas por vez (mínimo de uma).

## 3. Grace period

> *"In the console, by default, the health check grace period is 300 seconds when you create an Auto Scaling group. Its default value is 0 seconds when you create an Auto Scaling group using the AWS CLI or an SDK. A value of 0 turns off the health check grace period."*

Aplica-se a instâncias **recém-lançadas**, voltando de **Standby**, ou **anexadas manualmente**. Se a instância sair do estado `running` durante o grace period, é marcada Unhealthy **na hora**.

Grace period curto demais → o ASG mata instâncias que ainda estão inicializando (loop de substituição). Grace period longo demais → instância morta fica servindo tráfego.

## 4. Terminação e equilíbrio entre AZs

A **ordem padrão** começa pela AZ com mais instâncias, depois pela configuração mais antiga, e por fim pela mais próxima da próxima hora de cobrança (a doc nota que *"most EC2 usage is now billed per second, so this optimization provides less benefit"*).

Duas regras que sobrepõem a política:
- *"Maintaining Zonal balance takes precedence over the termination policy."*
- Instância **unhealthy** salta a avaliação e é substituída direto.

No **rebalanceamento**, o ASG *"launches new instances before terminating the old ones"*, e pode exceder o máximo em **10%** (ou uma instância) temporariamente.

## 5. Lifecycle hooks

Pausam a instância num estado de espera para você executar algo antes de ela entrar em serviço (ou antes de terminar).

| Item | Valor |
|---|---|
| Timeout padrão | **1 hora** (heartbeat) |
| Timeout global | **48 h** ou **100×** o heartbeat, o menor |
| Resultados | **`continue`** ou **`abandon`** |
| Hook de launch | `EC2_INSTANCE_LAUNCHING` |
| Eventos | Vão para o **EventBridge** |

Usos: baixar configuração, aquecer cache, registrar no ELB só depois do bootstrap, drenar conexões antes de terminar.

⚠️ Com hook de launch, *"the health check grace period starts as soon as the instance reaches the InService state"*.
⚠️ Em interrupção de **Spot**, o hook *"does not prevent an instance from terminating"* — use **Capacity Rebalancing**.

## 6. Launch template e immutable infrastructure

**Launch template** (não launch configuration, que é legado) é versionado e permite misturar tipos de instância e **On-Demand com Spot** no mesmo ASG.

**Instance refresh** substitui a fleet por uma nova versão do template, em lotes com percentual mínimo de saúde. É a materialização de *"Immutable infrastructure"*, citada no guia em **Task 2.2**: em vez de corrigir a instância, você gera a AMI nova e troca a fleet.

## 7. Warm pools e Standby

**Warm pool** mantém instâncias pré-inicializadas (paradas ou hibernadas) para reduzir o tempo de scale-out de aplicações com boot longo.

**Standby** tira a instância de serviço sem terminá-la, para troubleshooting.

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[ELB (Load Balancers)]] · [[EC2]] · [[CloudWatch]] · [[SQS]] · [[Opcoes de compra do EC2 (Spot, RI, Savings Plans)]]
- [Health checks](https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-health-checks.html)
- [Políticas de terminação](https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-termination-policies.html)
