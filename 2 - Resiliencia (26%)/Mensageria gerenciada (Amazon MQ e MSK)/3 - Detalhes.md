---
tags: [saa-c03, amazon-mq, msk, detalhes]
servico: Amazon MQ e Amazon MSK
atualizado: 2026-11-08
---

# Amazon MQ e MSK — Detalhes

## 1. Por que esses serviços existem

SQS, SNS, EventBridge e Kinesis são **melhores** que um broker tradicional em quase todo aspecto: serverless, escala automática, sem patch, mais baratos em pequena escala.

O problema é **migração**. Uma aplicação que fala **JMS** ou **AMQP** não troca de protocolo sem reescrever a camada de mensageria — e às vezes essa camada está num binário legado que ninguém mantém.

Amazon MQ e MSK resolvem isso: você move a aplicação para a AWS **sem mexer no código**, e a AWS cuida do broker.

É por isso que o gatilho de prova é tão mecânico: **protocolo ou produto nomeado → serviço gerenciado equivalente**.

## 2. Amazon MQ — detalhes

Suporta **ActiveMQ** e **RabbitMQ**, com os protocolos **AMQP 0-9-1, MQTT, STOMP, OpenWire e JMS**.

A tabela oficial da doc do SQS mostra por que ele é diferente: é o único dos três que suporta **síncrono**, **filas**, **pub/sub** **e** é um **broker**. A frase da doc do SQS sobre o SQS, por contraste: *"Amazon SQS... processes messages through a single subscriber typically."*

Características operacionais:
- **Single-instance** (dev) ou **active/standby** em duas AZs (produção)
- Você escolhe o **tipo de instância** e o **storage** — não é serverless
- Escala **verticalmente** (broker maior) ou por *network of brokers*
- Fica numa **VPC**, com security group

Consequência de prova: Amazon MQ tem **mais esforço operacional** e **menos escala** que SQS/SNS. Se o enunciado diz "aplicação nova" ou "escala praticamente ilimitada", não é MQ.

## 3. Amazon MSK — detalhes

Roda *"open-source versions of Apache Kafka"*, o que garante compatibilidade de clientes, conectores e ferramentas.

| Modo | Quando |
|---|---|
| **MSK Provisioned** | Você dimensiona brokers (Standard ou **Express**) — controle e custo previsível |
| **MSK Serverless** | *"you only provision your Kafka server resources at a cluster level"* — sem dimensionar broker |

Componentes adicionais citados na doc: **MSK Connect** (roda conectores Kafka Connect gerenciados), **MSK Replicator** (replica entre clusters, inclusive cross-Region, útil para DR), e os controllers **KRaft** *"included at no additional cost"* (substituem o ZooKeeper).

## 4. MSK × Kinesis Data Streams — como decidir

Ambos são streams particionados, duráveis, com múltiplos consumidores e replay. A diferença prática:

| Pergunta | Se sim → |
|---|---|
| O time já tem produtores/consumidores **Kafka**? | **MSK** |
| Precisa de **Kafka Connect** ou **Kafka Streams**? | **MSK** |
| Quer **portabilidade** para outra nuvem/on-premises? | **MSK** |
| É um stream **novo**, e quer o menor esforço operacional? | **Kinesis** |
| Precisa de integração nativa com **Firehose**, Lambda, Flink? | **Kinesis** |
| Quer pagar por uso, sem pensar em brokers? | **Kinesis on-demand** (ou MSK Serverless) |

Tanto Kinesis quanto MSK são **event source** para Lambda.

## 5. Checklist de migração de mensageria

| App usa | Migre para |
|---|---|
| **ActiveMQ / RabbitMQ / JMS / AMQP / MQTT / STOMP** | **Amazon MQ** (lift and shift) |
| **Kafka** | **Amazon MSK** |
| Fila proprietária ou código próprio | Refatorar para **SQS** (+ SNS para fan-out) |
| MSMQ, IBM MQ | Amazon MQ, ou refatorar para SQS |

A escolha "lift and shift para MQ/MSK **agora**, refatorar para SQS/SNS **depois**" é uma resposta legítima de arquitetura — e aparece em prova como **rehost** seguido de **refactor** (ver os 7 Rs).

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[SQS]] · [[SNS]] · [[EventBridge]] · [[Kinesis Data Streams]] · [[Estrategias de migracao (7 Rs)]]
