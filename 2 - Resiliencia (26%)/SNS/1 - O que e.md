---
tags: [saa-c03, sns, mensageria]
servico: Amazon SNS
tipo: Pub/sub gerenciado
dominios: [2]
atualizado: 2026-11-08
---

# Amazon SNS — O que é

> [!info] Em uma frase
> Pub/sub gerenciado: o publicador manda uma mensagem para um **tópico**, e o SNS a **empurra (push)** para **todos** os inscritos — filas SQS, Lambda, HTTP(S), e-mail, SMS, push mobile, Firehose.

## Como funciona

> *"publishers send messages to a topic, which is a logical access point and communication channel."*

E o fan-out: *"a message published to an SNS topic is replicated and pushed to multiple endpoints... This allows for parallel asynchronous processing."*

## Tipos de assinante (lista oficial)

| Assinante |
|---|
| **Amazon SQS** |
| **AWS Lambda** |
| **HTTP(S) endpoints** |
| **E-mail** |
| **Mobile push notifications** |
| **SMS (mobile text messages)** |
| **Amazon Data Firehose** |
| Service providers (Datadog, MongoDB, Splunk) |

## SNS × SQS — a diferença estrutural

| | **SNS** | **SQS** |
|---|---|---|
| Modelo | **Push** (empurra) | **Pull** (o consumidor puxa) |
| Destinatários | **N** inscritos recebem cada mensagem | **1** consumidor processa cada mensagem |
| Armazena? | **Não** — entrega e desiste (ou manda para DLQ) | **Sim**, até 14 dias |
| Pub/sub | **Sim** | Não |

## O padrão canônico: fan-out

```
Publicador → TÓPICO SNS ─┬─> Fila SQS A → consumidor A
                          ├─> Fila SQS B → consumidor B
                          └─> Lambda C
```

A fila intermediária dá **durabilidade** e **retry por consumidor**. A doc: *"integrating Amazon SNS with Amazon SQS queue messages ensures consistent delivery"* quando os assinantes estão offline.

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[SQS]] · [[EventBridge]] · [[Lambda]] · [[Kinesis Data Firehose]]
- [O que é o Amazon SNS](https://docs.aws.amazon.com/sns/latest/dg/welcome.html)
