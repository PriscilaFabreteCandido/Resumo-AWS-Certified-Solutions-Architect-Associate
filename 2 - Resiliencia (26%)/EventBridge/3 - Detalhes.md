---
tags: [saa-c03, eventbridge, detalhes]
servico: Amazon EventBridge
atualizado: 2026-11-08
---

# EventBridge — Detalhes

## 1. Por que ele existe, se já há SNS e SQS

SNS e SQS transportam **mensagens que você produz**. O EventBridge nasceu para duas coisas que eles não fazem:

**1. Consumir eventos que a AWS já emite.** Toda mudança de estado relevante nos serviços AWS gera um evento no barramento **default**: instância EC2 mudou de estado, snapshot terminou, build falhou, Health Dashboard reportou degradação, tarefa do ECS parou. Sem EventBridge, você faria **polling**.

**2. Rotear pelo conteúdo.** O *event pattern* casa campos aninhados do JSON. Isso permite uma regra como "só eventos de instâncias que terminaram, na conta X, com a tag `env=prod`" — sem que o produtor saiba nada dos consumidores.

## 2. Padrões de arquitetura que a prova usa

**Automação reativa a eventos da AWS**

```
EBS snapshot completo  →  regra  →  Lambda (copia para outra região)
Instância terminada    →  regra  →  Lambda (limpa registro no inventário)
Achado do GuardDuty    →  regra  →  Lambda (isola a instância) + SNS
Config noncompliant    →  regra  →  SSM Automation (remedia)
```

**Fan-out com roteamento**

```
                 ┌─ detail.tipo = "pedido"   → Step Functions
Custom bus  ─────┼─ detail.tipo = "cancelamento" → fila SQS
                 └─ detail.valor > 10000    → fila de fraude
```

**Agendamento**

```
EventBridge Scheduler (cron)  →  Lambda / ECS task / qualquer API da AWS
```

Isso substitui cron em EC2 — e é a resposta para **atraso maior que 15 minutos**, já que o *delay queue* do SQS para em 15 min (a própria doc do SQS aponta o Scheduler para isso).

**Enriquecimento ponto a ponto (Pipes)**

```
DynamoDB Stream  →  PIPE (filtra + enriquece com Lambda)  →  event bus  →  N targets
```

## 3. Archive e replay

O EventBridge pode **arquivar** eventos de um bus e **reprocessá-los** depois. É o único dos serviços de integração da AWS com essa capacidade nativa de replay sobre um barramento.

Usos de prova: reprocessar um dia de eventos depois de corrigir um bug no consumidor; popular um ambiente novo com eventos reais.

(O **Kinesis Data Streams** também permite reler, pela retenção de até **365 dias** — mas é stream com shards, não barramento com regras.)

## 4. Confiabilidade

| Mecanismo | Detalhe |
|---|---|
| **Retry** | Automático, com backoff, por target |
| **DLQ** | Fila SQS por target, para o que não pôde ser entregue |
| **Idempotência** | Entrega é **at-least-once** — o consumidor precisa tolerar duplicata |
| **Cross-Region** | Um bus pode encaminhar para um bus em outra região (útil em DR) |

## 5. Quando NÃO é EventBridge

| Enunciado | Serviço |
|---|---|
| E-mail, SMS, push para pessoas | **SNS** |
| Fila com buffer e retry por consumidor | **SQS** |
| Stream de alto volume com ordem por shard e replay longo | **Kinesis Data Streams** |
| Orquestrar passos com estado, retry e paralelismo | **Step Functions** |
| App que já usa AMQP/MQTT/JMS | **Amazon MQ** |
| App que já usa Kafka | **Amazon MSK** |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[SNS]] · [[SQS]] · [[Step Functions]] · [[Lambda]] · [[Kinesis Data Streams]] · [[Config]] · [[GuardDuty]]
