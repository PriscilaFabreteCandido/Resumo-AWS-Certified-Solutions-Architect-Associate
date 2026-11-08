---
tags: [saa-c03, sqs, detalhes]
servico: Amazon SQS
atualizado: 2026-11-08
---

# SQS — Detalhes

## 1. Visibility timeout — a causa nº 1 de duplicata

Quando um consumidor recebe uma mensagem, ela não é apagada: fica **invisível** para os outros durante o **visibility timeout** (padrão **30 s**). O consumidor precisa chamar `DeleteMessage` ao terminar.

Se o processamento demora **mais** que o timeout, a mensagem **reaparece** na fila e outro consumidor a pega — processamento duplicado.

Três formas de resolver:

| Solução | Quando |
|---|---|
| **Aumentar o visibility timeout** | A duração do processamento é previsível |
| **`ChangeMessageVisibility`** (heartbeat) | Duração variável — o consumidor estende enquanto trabalha |
| **Consumidor idempotente** | Sempre, em fila **standard** |

O limite máximo é **12 horas**, e a doc avisa: *"the visibility timeout has a maximum limit of 12 hours from when the message is first received. Extending the timeout doesn't reset this 12-hour limit."*

`VisibilityTimeout=0` devolve a mensagem imediatamente — útil para liberar quando o consumidor detecta que não pode processar.

## 2. Standard × FIFO — o trade-off

**Standard** é *at-least-once*: *"there's no absolute guarantee that a message won't be delivered more than once"*. Em troca, o throughput é praticamente ilimitado.

**FIFO** é *exactly-once* e ordenado — mas com teto: **300 TPS** por ação de API, ou **3.000 msg/s** com batch de 10 (*"The 3,000 messages per second represent 300 API calls, each with a batch of 10 messages"*).

**MessageGroupId** é a chave do paralelismo em FIFO: a ordem é garantida **dentro** do grupo, e grupos diferentes são processados em paralelo. Enquanto uma mensagem de um grupo está em voo, as seguintes **daquele grupo** esperam.

Padrão de prova: usar o **ID do cliente** (ou do pedido, ou da conta) como `MessageGroupId` — preserva a ordem por entidade **e** permite paralelismo entre entidades.

## 3. Long polling — sempre ligue

Short polling consulta *"a subset of its servers (based on a weighted random distribution)"*, então pode devolver vazio mesmo havendo mensagem. Long polling (até **20 s**) consulta todos e espera.

Benefícios: menos respostas vazias, **menos custo** (você paga por requisição), e menor latência de entrega. É resposta para "reduzir custo de polling" e "a aplicação recebe muitas respostas vazias".

Detalhe: com short polling, exceder o limite de in-flight devolve erro `OverLimit`; com long polling, não há erro — o SQS simplesmente não entrega novas mensagens.

## 4. Delay queue × visibility timeout

São confundidos de propósito:

| | **Delay queue** | **Visibility timeout** |
|---|---|---|
| Afeta | A **primeira** entrega | A entrega **após** um recebimento |
| Faixa | **0 a 15 min** | 0 s a **12 h** |
| Escopo | Fila (ou por mensagem, via *message timer*) | Por recebimento |

Para atraso maior que 15 minutos, a doc aponta o **EventBridge Scheduler**.

Nuance: em fila **standard**, mudar o delay da fila **não** é retroativo para mensagens já enfileiradas; em **FIFO**, é.

## 5. DLQ e redrive

A DLQ recebe mensagens que falharam `maxReceiveCount` vezes. Serve para:
- Não travar a fila com uma mensagem "veneno"
- Investigar o porquê da falha
- **Redrive** de volta para a origem depois de corrigir o bug

Detalhe das filas standard: *"where maxReceiveCount is greater than 3, if a message is received 3 or more times without being deleted, SQS moves it to the back of the queue"* — para não bloquear o processamento das outras.

## 6. Escalar o consumidor

A métrica certa **não é CPU**. É **`ApproximateNumberOfMessagesVisible`** (ou o *backlog por instância*: mensagens visíveis ÷ instâncias em serviço).

Sintoma de prova: *"a CPU fica em 20% enquanto a fila acumula"* → a política de escala está na métrica errada.

Para consumidor **Lambda**, o *event source mapping* escala automaticamente conforme a fila.

## 7. Padrões de arquitetura

| Padrão | Desenho |
|---|---|
| **Buffer contra pico** | API Gateway → **SQS** → Lambda/ASG |
| **Fan-out** | SNS → **N filas SQS** → N consumidores |
| **Ingestão sem código** | API Gateway → **SQS** (integração direta com serviço AWS) |
| **Payload grande** | Extended Client Library: ponteiro na fila, objeto no **S3** |
| **Prioridade** | Duas filas (alta e baixa) com consumidores dimensionados diferentes |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[SNS]] · [[EventBridge]] · [[Lambda]] · [[Auto Scaling (EC2)]] · [[API Gateway]] · [[S3]]
- [Visibility timeout](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html)
