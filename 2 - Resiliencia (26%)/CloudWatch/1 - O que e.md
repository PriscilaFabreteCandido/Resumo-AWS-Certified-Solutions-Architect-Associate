---
tags: [saa-c03, cloudwatch, observabilidade]
servico: Amazon CloudWatch
tipo: Métricas, logs e alarmes
dominios: [2, 3, 4]
atualizado: 2026-11-08
---

# Amazon CloudWatch — O que é

> [!info] Em uma frase
> *"monitors your Amazon Web Services (AWS) resources and the applications you run on AWS in real time"* — métricas, logs, alarmes e dashboards.

## A pergunta que ele responde

**"Como está o desempenho e a saúde?"**

| Pergunta | Serviço |
|---|---|
| A CPU está alta? A fila está crescendo? | **CloudWatch** |
| **Quem** chamou essa API? | **CloudTrail** |
| Essa **configuração** mudou quando? Está conforme? | **AWS Config** |
| Onde a requisição gastou tempo entre microsserviços? | **X-Ray** |

## Os componentes

| Componente | Para quê |
|---|---|
| **Métricas** | Padrão por serviço + **custom metrics** |
| **Alarmes** | Disparam SNS, ação de Auto Scaling, ação de EC2 (stop/terminate/reboot/recover) |
| **Composite alarm** | Combina alarmes para reduzir ruído |
| **Logs** | Log groups e streams |
| **Logs Insights** | Consulta os logs com linguagem própria |
| **Metric filter** | Transforma padrão de log em **métrica** (e daí em alarme) |
| **Dashboards** | Painéis, inclusive cross-account e cross-Region |
| **Synthetics canary** | Monitoramento sintético de endpoint |
| **Container / Lambda Insights** | Observabilidade pré-montada |

## Os dois fatos que mais caem

1. **Memória e espaço em disco não existem por padrão** — precisam do **CloudWatch agent**.
2. **A retenção padrão de log group é "Never expire"** — custo silencioso.

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[CloudTrail]] · [[Config]] · [[X-Ray]] · [[Auto Scaling (EC2)]] · [[SQS]]
- [O que é o CloudWatch](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html)
