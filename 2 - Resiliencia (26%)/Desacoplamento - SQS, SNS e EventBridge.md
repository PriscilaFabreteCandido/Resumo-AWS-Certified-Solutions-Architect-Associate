---
tags: [saa-c03, dominio-2, sqs, sns, eventbridge, mensageria]
dominio: 2
tasks: [2.1]
atualizado: 2026-11-08
---

# Desacoplamento — SQS, SNS, EventBridge (e Amazon MQ)

## 🧩 Em 30 segundos

| Serviço | Modelo | Use quando |
|---|---|---|
| **SQS** | Fila, **pull**, 1 consumidor por mensagem | Buffer contra pico, retry, desacoplar produtor e consumidor |
| **SNS** | Tópico, **push**, 1→N | Fan-out, notificação (e-mail, SMS, push, HTTP), disparar várias filas |
| **EventBridge** | Barramento de eventos com **roteamento por conteúdo** | Eventos de serviços AWS, SaaS, cron, roteamento por regra |
| **Amazon MQ** | Broker gerenciado (ActiveMQ, RabbitMQ) | **Migrar** app que já fala AMQP, MQTT, STOMP, JMS, OpenWire |

**Padrão canônico**: `SNS → várias SQS → consumidores`. Dá fan-out **com** durabilidade e retry por consumidor.

## 🧠 Teste-se primeiro

> [!question]- Standard × FIFO no SQS
> **Standard**: *"at-least-once message delivery"* — pode **duplicar** e não garante ordem. Throughput *"nearly unlimited"*.
> **FIFO**: *"exactly-once message processing"* + ordem estrita **dentro do message group**. Throughput **300 TPS** por ação de API, ou **3.000 msg/s com batch de 10**. Em high-throughput mode, muito mais.
> Deduplicação FIFO: janela de **5 minutos**, por `MessageDeduplicationId` explícito ou por **content-based** (hash SHA-256 do **corpo**, não dos atributos).

> [!question]- Visibility timeout: o que é, padrão e máximo?
> Tempo em que a mensagem fica **invisível** para outros consumidores depois de recebida. Padrão **30 s**, máximo **12 horas** — e o máximo conta **do primeiro recebimento**: *"Extending the timeout doesn't reset this 12-hour limit."*
> Se o processamento demora mais que o timeout, outro consumidor pega a mesma mensagem → **duplicata**. Solução: `ChangeMessageVisibility` (heartbeat) ou timeout maior. `VisibilityTimeout=0` devolve a mensagem imediatamente.

> [!question]- Short × long polling
> **Short polling** (padrão, `WaitTimeSeconds=0`): consulta *"a subset of its servers (based on a weighted random distribution)"* — pode devolver vazio mesmo tendo mensagem.
> **Long polling** (até **20 s**): consulta todos os servidores, reduz respostas vazias e **reduz custo**. É sempre a resposta quando o enunciado fala de "requisições vazias" ou "reduzir custo de polling".

> [!question]- DLQ: como funciona o `maxReceiveCount`?
> É *"the number of times a consumer can receive a message from a source queue before it is moved to a dead-letter queue"*.
> Regras: a DLQ precisa ser do **mesmo tipo** (fila FIFO → DLQ FIFO), na **mesma conta e região**; boa prática é dar à DLQ uma retenção **maior** que a da fila de origem.
> ⚠️ *"Don't use a dead-letter queue with a FIFO queue if you don't want to break the exact order."*

## SQS — números

| Item | Valor |
|---|---|
| Retenção | padrão **4 dias**; de **60 s a 14 dias** |
| Visibility timeout | padrão **30 s**; máx **12 h** |
| Long polling | até **20 s** |
| Delay queue / message timer | **0 s** a **15 min** |
| Tamanho da mensagem | **1 MiB** pela página de quotas atual (material antigo diz 256 KB) |
| Batch | **10** mensagens |
| In-flight (standard) | ~**120.000** |
| FIFO throughput | **300 TPS**/ação, **3.000 msg/s** com batch |
| Payload grande | **Extended Client Library** + S3, até **2 GB** — **só em Java** |
| Criptografia | SSE gerenciada pelo SQS, ou chave KMS própria |

> [!tip] Delay queue × visibility timeout
> **Delay queue** atrasa a **primeira** entrega da mensagem (0-15 min). **Visibility timeout** esconde a mensagem **depois** de ela ser recebida. São coisas diferentes e a prova troca uma pela outra.
> Para agendamento além de 15 minutos, a doc aponta o **EventBridge Scheduler**.

## SNS — o que cai

| Item | Valor / regra |
|---|---|
| Tamanho da mensagem | **262.144 bytes (256 KiB)** |
| Assinantes | SQS · Lambda · HTTP(S) · e-mail · push mobile · **SMS** · **Data Firehose** · provedores (Datadog, MongoDB, Splunk) |
| Message filtering | Filtra por **message attributes** (padrão) ou pelo **corpo** da mensagem (escopo configurado na subscription) |
| Retry para SQS/Lambda | até **100.015** tentativas, ao longo de **23 dias** |
| Retry para SMS/push/e-mail | **50** tentativas em **6 horas** |
| HTTP/HTTPS | política de retry **definida por você** |
| DLQ | *"A dead-letter queue is an Amazon SQS queue"*, mesma conta e região, por **subscription** (não por tópico). Tópico FIFO → DLQ FIFO |
| Erro de cliente | **não** é retentado; vai para a DLQ se houver |
| FIFO topic | Existe, com ordenação, agrupamento, deduplicação, filtragem e replay. Integra com **SQS FIFO** |

> [!important] Message filtering economiza arquitetura
> Em vez de criar um tópico por tipo de evento, use **um** tópico e **filter policies** por subscription. A prova oferece "criar N tópicos" como distrator.

## EventBridge

- Barramento serverless que roteia **eventos** por **regra**, com transformação opcional.
- **Event bus**: o padrão (eventos dos serviços AWS), **custom** (seus eventos) e **partner** (SaaS).
- **EventBridge Scheduler**: *"create schedules using cron and rate expressions for recurring patterns, or configure one-time invocations"* — substitui "CloudWatch Events rule" e cron em EC2.
- **EventBridge Pipes**: *"intended for point-to-point integrations; each pipe receives events from a single source... to a single target"*, com enriquecimento e transformação. Padrão citado na doc: **DynamoDB Stream → pipe → event bus → vários targets**.
- **Schema registry**: descobre e versiona o schema dos eventos.

> [!tip] SNS × EventBridge, o divisor
> **SNS**: fan-out simples, alto throughput, canais humanos (e-mail, SMS, push). Mais barato por mensagem.
> **EventBridge**: roteamento **baseado no conteúdo** do evento, integração nativa com **eventos de serviços AWS** (ex.: "quando um snapshot de EBS terminar"), SaaS de terceiros, **agendamento** e **replay/archive**.
> Se o enunciado menciona "evento de um serviço AWS", "regra de roteamento por atributo do evento" ou "agendar", é EventBridge.

## Amazon MQ

Está na lista oficial de serviços em escopo. A tabela da doc do SQS compara:

| | Síncrono | Assíncrono | Filas | Pub/sub | Broker |
|---|---|---|---|---|---|
| **SNS** | ❌ | ✅ | ❌ | ✅ | ❌ |
| **SQS** | ❌ | ✅ | ✅ | ❌ | ❌ |
| **Amazon MQ** | ✅ | ✅ | ✅ | ✅ | ✅ |

**Gatilho de prova**: o enunciado nomeia um **protocolo** (AMQP, MQTT, STOMP, JMS, OpenWire) ou diz *"migrate without changing the application"* → **Amazon MQ**. Aplicação **nova** na AWS → SQS/SNS.

## ❓ Questões de prova

> [!example]- Q1 — Mensagens estão sendo processadas duas vezes. O processamento leva ~90 segundos e a fila é standard com configuração padrão. Qual a causa provável e a correção?
> **A)** Fila standard sempre duplica; migrar para FIFO
> **B)** **O visibility timeout de 30 s expira antes do fim do processamento; aumentar o timeout (ou estendê-lo com `ChangeMessageVisibility`)** ✅
> **C)** Falta habilitar long polling
> **D)** Falta uma DLQ
>
> **Por que B**: com 30 s de timeout e 90 s de processamento, a mensagem reaparece na fila no meio do trabalho e outro consumidor a pega. É a causa mecânica da duplicata aqui.
> **A errada**: standard **pode** duplicar, mas o enunciado descreve o sintoma clássico de timeout curto. Migrar para FIFO limita o throughput a 300 TPS sem necessidade.
> **C errada**: long polling afeta respostas vazias e custo, não duplicação.
> **D errada**: DLQ trata mensagem que falha repetidamente, não reprocessamento por timeout.

> [!example]- Q2 — Um app precisa publicar atualizações de pedido para e-mail, SMS, uma fila de faturamento e um endpoint HTTP de parceiro. Menor esforço operacional?
> **A)** Lambda chamando cada destino
> **B)** **Tópico SNS com quatro subscriptions (e-mail, SMS, SQS, HTTPS)** ✅
> **C)** Quatro filas SQS e quatro consumidores
> **D)** EventBridge com quatro regras
>
> **Por que B**: SNS entrega nativamente para **e-mail, SMS, SQS e HTTP(S)** — é literalmente a lista de endpoints suportados. Zero código.
> **A errada**: você reimplementa retry, backoff e DLQ para cada canal.
> **C errada**: SQS não entrega e-mail nem SMS.
> **D errada**: funciona para SQS e HTTP, mas **e-mail e SMS** são canais do SNS. Mais peças sem ganho.

> [!example]- Q3 — Um sistema de pagamento precisa processar transações **na ordem recebida por cliente** e **sem duplicidade**. Qual configuração?
> **A)** Fila standard com consumidor idempotente
> **B)** **Fila FIFO com `MessageGroupId` igual ao ID do cliente** ✅
> **C)** Kinesis Data Streams com partition key do cliente
> **D)** Fila standard com visibility timeout alto
>
> **Por que B**: FIFO garante *"exactly-once message processing"* e ordem **dentro do message group**. Usar o ID do cliente como group ID preserva ordem por cliente **e** permite paralelismo entre clientes.
> **A e D erradas**: standard não garante ordem; idempotência resolve duplicata, não ordenação.
> **C errada**: Kinesis preserva ordem por shard e seria aceitável em um cenário de streaming, mas é *at-least-once* e o requisito explícito de "sem duplicidade" aponta FIFO. Kinesis também é a ferramenta errada para fila de trabalho transacional.
>
> ⚠️ Lembre do trade-off: FIFO limita a **300 TPS** por ação (3.000 msg/s com batch). Se o enunciado exigir throughput maior, considere high-throughput mode ou **mais message groups** — a doc recomenda *"increasing the number of message groups"*.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| SQS entrega para N consumidores | **1 por mensagem.** N = SNS → N SQS |
| Standard garante ordem | **Não.** At-least-once, sem ordem |
| FIFO é só "standard ordenada" | Também é **exactly-once**, mas com teto de throughput |
| Deduplicação FIFO olha os atributos | Content-based usa hash **do corpo** |
| Delay queue = visibility timeout | Delay atrasa a **primeira** entrega; visibility esconde **depois** de receber |
| Visibility timeout pode passar de 12 h estendendo | O limite de 12 h conta do **primeiro** recebimento |
| Long polling custa mais | Custa **menos** |
| DLQ do SNS pode ser Lambda ou SNS | **É uma fila SQS** |
| SNS tem retry infinito para HTTP | Para HTTP a política é **sua**. Para SQS/Lambda: 100.015 tentativas em 23 dias |
| Mensagem de 5 MB cabe no SQS | Use **Extended Client Library + S3** (só Java) |
| EventBridge substitui SNS | Para e-mail/SMS/push, é **SNS** |
| Amazon MQ é para app novo | É para **migração** de app que já usa protocolo de broker |

## Links

- [[02 - Dominio 2 - Design Resilient Architectures (26%)]]
- [[Containers e serverless - ECS, EKS, Fargate, Lambda e Step Functions]]
- [[Ingestao e transformacao - Kinesis, Glue, Athena e EMR]]
- [O que é o Amazon SQS](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html)
- [Visibility timeout](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html)
