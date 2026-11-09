---
tags: [saa-c03, amazon-mq, msk, kafka, mensageria]
servico: Amazon MQ e Amazon MSK
tipo: Broker e Kafka gerenciados
dominios: [2, 3]
atualizado: 2026-11-08
---

# Amazon MQ e Amazon MSK — O que é

> [!info] Em uma frase
> Os dois serviços de mensageria para quando a aplicação **já fala um protocolo específico**: **Amazon MQ** (ActiveMQ, RabbitMQ) e **Amazon MSK** (Apache Kafka).

## O gatilho único de prova

| Enunciado menciona | Resposta |
|---|---|
| **AMQP, MQTT, STOMP, JMS, OpenWire** | **Amazon MQ** |
| **Apache Kafka** | **Amazon MSK** |
| "migrar **sem alterar o código** da aplicação" | **MQ** ou **MSK**, conforme o protocolo |
| Aplicação **nova** na AWS | **SQS / SNS / EventBridge / Kinesis** |

É quase sempre assim: se o enunciado **nomeia o protocolo ou o produto**, a resposta é o serviço gerenciado equivalente. Se é aplicação nova, a resposta é o serviço nativo da AWS (mais barato e sem servidor).

## Amazon MQ

Broker gerenciado de **ActiveMQ** e **RabbitMQ**. A tabela oficial do SQS compara:

| | Síncrono | Assíncrono | Filas | Pub/sub | Broker |
|---|---|---|---|---|---|
| **SNS** | ❌ | ✅ | ❌ | ✅ | ❌ |
| **SQS** | ❌ | ✅ | ✅ | ❌ | ❌ |
| **Amazon MQ** | **✅** | ✅ | ✅ | ✅ | **✅** |

Ele é o único que faz **tudo** — porque é um broker tradicional.

## Amazon MSK

> *"a fully managed service that enables you to build and run applications that use Apache Kafka to process streaming data."*

E o ponto decisivo: *"runs open-source versions of Apache Kafka"*, então as aplicações e ferramentas existentes funcionam *"without requiring changes to application code"*.

Modos: **MSK Provisioned** (brokers Standard ou Express) e **MSK Serverless**.

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[SQS]] · [[SNS]] · [[EventBridge]] · [[Kinesis Data Streams]]
- [O que é o Amazon MSK](https://docs.aws.amazon.com/msk/latest/developerguide/what-is-msk.html)
