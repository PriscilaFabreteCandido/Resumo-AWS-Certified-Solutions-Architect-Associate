---
servico: Amazon MQ e Amazon MSK
fonte: "[[2 - Resiliencia (26%)/Mensageria gerenciada (Amazon MQ e MSK)/2 - Decorar|2 - Decorar]]"
---

# Amazon MQ e MSK — Flashcards

#flashcards/saa-c03/d2-resiliencia/mq-msk

Enunciado cita AMQP, MQTT, STOMP, JMS ou OpenWire: qual serviço?::**Amazon MQ**

Enunciado cita Apache Kafka: qual serviço?::**Amazon MSK**

Quais engines o Amazon MQ oferece?::**ActiveMQ** e **RabbitMQ**

Topologias de broker do Amazon MQ?::**Single-instance** ou **active/standby** (Multi-AZ)

Principal caso de uso do Amazon MQ na prova?::**Migração** de app legado que já fala esses protocolos

O Amazon MQ é serverless e escala sozinho?::**Não**; é um broker em que você escolhe instância e storage

Modos de implantação do MSK?::**Provisioned** (brokers Standard ou **Express**) e **Serverless**

Recursos do MSK para conectores e replicação entre clusters?::**MSK Connect** (conectores) e **MSK Replicator** (replicação)

Os controllers KRaft do MSK têm custo extra?::**Não**, estão incluídos sem custo adicional

Retenção do Kinesis Data Streams?::**24 h a 365 dias**

Streaming novo na AWS, sem código Kafka existente: MSK ou Kinesis?::**Kinesis Data Streams** (menor esforço operacional)

Stream com múltiplos leitores, ordem por shard e replay: qual serviço?::**Kinesis Data Streams**

Roteamento por conteúdo, eventos da AWS e cron: qual serviço?::**EventBridge**
