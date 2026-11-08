---
tags: [saa-c03, sns, decorar]
servico: Amazon SNS
atualizado: 2026-11-08
---

# SNS — Decorar

## Os números

| Item | Valor |
|---|---|
| **Tamanho da mensagem** | **262.144 bytes (256 KiB)** |
| Atributos de mensagem | **10** (para subscription SQS com raw delivery) |
| **Retry para SQS e Lambda** | até **100.015** tentativas, ao longo de **23 dias** |
| **Retry para SMS, push e e-mail** | **50** tentativas em **6 horas** |
| **Retry para HTTP/HTTPS** | política **definida por você** |
| Erro de **cliente** | **Não é retentado** — vai para a DLQ, se houver |

## DLQ do SNS

| Fato | Detalhe |
|---|---|
| Tipo | *"A dead-letter queue is an Amazon SQS queue"* |
| Escopo | Mesma **conta e região** |
| Granularidade | Por **subscription**, não por tópico |
| Tópico FIFO | DLQ precisa ser fila **FIFO** |
| Retenção recomendada | **14 dias** |

## Message filtering

Em vez de criar um tópico por tipo de evento, use **um** tópico com **filter policies** por subscription.

| Escopo do filtro | Detalhe |
|---|---|
| **MessageAttributes** | Padrão |
| **MessageBody** | Configurável na subscription; exige JSON bem formado |

Tipos de atributo: `String`, `String.Array`, `Number`, `Binary`. Nome até **256** caracteres; não pode começar com `AWS.` nem `Amazon.`.

## Standard × FIFO topic

| | **Standard topic** | **FIFO topic** |
|---|---|---|
| Ordem | Não garantida | **Ordenada**, com message group |
| Deduplicação | Não | **Sim** |
| Assinantes | Todos os tipos | Integra com **SQS FIFO** |
| DLQ | Fila standard | Fila **FIFO** |

## SNS × SQS × Amazon MQ (tabela oficial)

| | Síncrono | Assíncrono | Filas | Pub/sub | Broker |
|---|---|---|---|---|---|
| **SNS** | ❌ | ✅ | ❌ | ✅ | ❌ |
| **SQS** | ❌ | ✅ | ✅ | ❌ | ❌ |
| **Amazon MQ** | ✅ | ✅ | ✅ | ✅ | ✅ |

## SNS × EventBridge

| Critério | Resposta |
|---|---|
| Fan-out simples, alto throughput, barato | **SNS** |
| Canais humanos (**e-mail, SMS, push**) | **SNS** |
| Roteamento pelo **conteúdo** do evento | **EventBridge** |
| Eventos de **serviços AWS** ("quando o snapshot terminar") | **EventBridge** |
| **Agendamento** (cron) | **EventBridge Scheduler** |
| **Replay** / archive de eventos | **EventBridge** |

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
