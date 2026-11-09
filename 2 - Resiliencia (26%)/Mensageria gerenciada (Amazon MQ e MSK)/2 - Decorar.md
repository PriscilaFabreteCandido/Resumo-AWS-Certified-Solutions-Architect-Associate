---
tags: [saa-c03, amazon-mq, msk, decorar]
servico: Amazon MQ e Amazon MSK
atualizado: 2026-11-08
---

# Amazon MQ e MSK — Decorar

## A tabela de decisão de mensageria

| Enunciado | Serviço |
|---|---|
| Fila simples, buffer, 1 consumidor por mensagem | **SQS** |
| Fan-out 1→N, e-mail/SMS/push | **SNS** |
| Roteamento por conteúdo, eventos da AWS, cron | **EventBridge** |
| Stream com múltiplos leitores, ordem por shard, **replay** | **Kinesis Data Streams** |
| **AMQP, MQTT, STOMP, JMS, OpenWire** | **Amazon MQ** |
| **Apache Kafka** | **Amazon MSK** |

## Amazon MQ

| Item | Detalhe |
|---|---|
| Engines | **ActiveMQ** e **RabbitMQ** |
| Protocolos | **AMQP 0-9-1, MQTT, STOMP, OpenWire, JMS**, WebSocket |
| Topologia | Single-instance ou **active/standby** (Multi-AZ) |
| Natureza | **Broker** — você escolhe o tipo de instância e o storage |
| Use para | **Migração** de app legado que já fala esses protocolos |
| ⚠️ | Não é serverless; escala por tipo de broker, não automaticamente |

## Amazon MSK

| Item | Detalhe |
|---|---|
| Natureza | **Apache Kafka** gerenciado, versões open-source |
| Modos | **Provisioned** (brokers Standard / **Express**) e **Serverless** |
| MSK Serverless | *"MSK manages the broker nodes... you only provision your Kafka server resources at a cluster level"* |
| Extras | **MSK Connect** (conectores), **MSK Replicator** (replicação entre clusters) |
| Controllers | **KRaft** *"included at no additional cost"* |
| Compatibilidade | *"without requiring changes to application code"* |

## MSK × Kinesis Data Streams

A doc do MSK **não** compara os dois. O critério prático:

| Critério | **MSK** | **Kinesis Data Streams** |
|---|---|---|
| API | **Kafka** | AWS |
| Já tenho código Kafka | **Sim** | Teria que reescrever |
| Serverless nativo | MSK Serverless | **Sim** (on-demand) |
| Esforço operacional | Maior (tópicos, partições, versões) | **Menor** |
| Retenção | Configurável por tópico | **24 h a 365 dias** |
| Ecossistema | Kafka Connect, Streams, Schema Registry | KCL, Firehose, Flink |

**Regra**: o enunciado nomeia **Kafka** → MSK. Streaming novo na AWS → **Kinesis**.

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
