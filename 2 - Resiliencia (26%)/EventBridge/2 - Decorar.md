---
tags: [saa-c03, eventbridge, decorar]
servico: Amazon EventBridge
atualizado: 2026-11-08
---

# EventBridge — Decorar

## Os três tipos de barramento

| Bus | Recebe |
|---|---|
| **Default** | Eventos dos **serviços AWS** da conta |
| **Custom** | Os **seus** eventos de aplicação |
| **Partner** | Eventos de **SaaS** (Zendesk, Datadog, Shopify…) |

## Anatomia de uma regra

```json
{
  "source": ["aws.ec2"],
  "detail-type": ["EC2 Instance State-change Notification"],
  "detail": { "state": ["terminated", "stopped"] }
}
```

A regra casa o **padrão** e envia para os **targets**. Diferente do SNS, o filtro olha o **conteúdo estruturado** do evento, não só atributos.

## Scheduler × regra agendada

| | **EventBridge Scheduler** | Rule com `schedule expression` |
|---|---|---|
| Expressões | **cron** e **rate**, e **one-time** | cron e rate |
| Escala | *"billions of one-time or recurring API actions without time limitations"* | — |
| Extras | **Flexible time window**, limite de retry, retenção de invocações falhas | — |
| Use para | Agendamento em escala, e **atraso > 15 min** (o que SQS delay não faz) | Cron simples |

## Pipes × Bus

| | **Event bus** | **Pipes** |
|---|---|---|
| Topologia | **muitos → muitos** | **ponto a ponto** (*"a single source... to a single target"*) |
| Enriquecimento | Não | **Sim** (Lambda, Step Functions, API) |
| Filtro | Event pattern | Sim |
| Padrão citado na doc | — | **DynamoDB Stream → pipe → event bus → vários targets** |

## Fatos que caem

| Fato | Detalhe |
|---|---|
| **Archive e replay** | Guarda eventos e os reprocessa depois — único entre os serviços de mensageria |
| **API destinations** | Target HTTP para APIs externas, com autenticação e rate limiting |
| **Cross-account / cross-Region** | Um bus pode ser target de outro bus em outra conta ou região |
| **DLQ** | Por target, numa fila SQS |
| **Schema registry** | Gera código a partir do schema do evento |

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
