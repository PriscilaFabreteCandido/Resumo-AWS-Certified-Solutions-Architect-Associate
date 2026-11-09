---
tags: [saa-c03, amazon-mq, msk, questoes]
servico: Amazon MQ e Amazon MSK
atualizado: 2026-11-08
---

# Amazon MQ e MSK — Questões

> [!question]- Q1. Uma aplicação legada usa **JMS** com ActiveMQ no datacenter e será migrada sem alterar o código.
> **A)** SQS
> **B)** **Amazon MQ** ✅
> **C)** Amazon MSK
> **D)** EventBridge
>
> **Por que B**: Amazon MQ é broker gerenciado de **ActiveMQ e RabbitMQ**, falando **JMS, AMQP, MQTT, STOMP e OpenWire**.
> **A errada**: SQS tem API própria — exigiria reescrever a camada de mensageria.
> **C errada**: MSK é **Kafka**.

> [!question]- Q2. Um time tem produtores e consumidores **Kafka** e dezenas de conectores Kafka Connect.
> **A)** Kinesis Data Streams
> **B)** **Amazon MSK** ✅
> **C)** Amazon MQ
> **D)** SNS com fan-out
>
> **Por que B**: roda *"open-source versions of Apache Kafka"*, então os clientes funcionam *"without requiring changes to application code"* — e o **MSK Connect** roda os conectores.
> **A errada**: Kinesis tem API própria; os conectores não funcionariam.

> [!question]- Q3. Uma aplicação **nova** precisa de fila com buffer e retry, com escala praticamente ilimitada e menor esforço operacional.
> **A)** Amazon MQ com RabbitMQ
> **B)** **Amazon SQS** ✅
> **C)** Amazon MSK Serverless
> **D)** EventBridge
>
> **Por que B**: aplicação **nova** não tem restrição de protocolo — SQS é serverless, escala sozinho e é mais barato.
> **A errada**: MQ exige dimensionar broker e dá mais esforço operacional.

> [!question]- Q4. Uma carga de IoT usa **MQTT** e será movida para a AWS, mantendo os dispositivos sem alteração.
> **A)** Kinesis Data Streams
> **B)** **Amazon MQ (que suporta MQTT)** ✅
> **C)** SQS com long polling
> **D)** MSK
>
> **Por que B**: MQTT está na lista de protocolos do Amazon MQ.
> ⚠️ Em arquitetura real de IoT a resposta seria **AWS IoT Core** — mas **todos os serviços de IoT estão fora de escopo** na SAA-C03, então ele não aparece como alternativa.

> [!question]- Q5. Replicar um cluster Kafka para outra região, para DR.
> **A)** MSK Connect
> **B)** **MSK Replicator** ✅
> **C)** Kinesis Data Firehose
> **D)** DataSync
>
> **Por que B**: o **MSK Replicator** é o componente de replicação entre clusters.
> **A errada**: MSK Connect roda **conectores** (fonte/destino), não replicação de cluster.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Amazon MQ é para aplicação nova | É para **migração** de app que já fala o protocolo |
| MSK e Kinesis são intercambiáveis | O enunciado nomeia **Kafka** → MSK; streaming novo → Kinesis |
| Amazon MQ é serverless | **Não.** Você escolhe tipo de broker e storage |
| Amazon MQ escala como o SQS | Escala **verticalmente** ou por *network of brokers* |
| MSK só existe provisionado | Há **MSK Serverless** |
| MSK ainda depende do ZooKeeper | Usa **KRaft**, *"included at no additional cost"* |
| MQTT em prova aponta para IoT Core | **Todos os serviços de IoT estão fora de escopo** na SAA-C03 |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
