---
tags: [saa-c03, sns, detalhes]
servico: Amazon SNS
atualizado: 2026-11-08
---

# SNS — Detalhes

## 1. Por que SNS sozinho não é suficiente

O SNS é **push** e **não armazena**. Se o assinante está indisponível, o SNS tenta conforme a política de retry e depois desiste (ou manda para a DLQ).

Para **SQS e Lambda** o retry é generoso — *"retries delivery up to 100,015 times, over 23 days"*. Para **SMS, push e e-mail**, é *"50 times over 6 hours"*. Para **HTTP/HTTPS**, a política é sua.

Mas erro de **cliente** (4xx) **não é retentado**: a mensagem é descartada, a menos que haja DLQ.

Daí o padrão **SNS → SQS**: a fila absorve, retém até 14 dias, e o consumidor processa quando puder. A doc: *"integrating Amazon SNS with Amazon SQS queue messages ensures consistent delivery"*.

## 2. Fan-out — o padrão central

```
                      ┌──> Fila SQS "faturamento"  → consumidor
Pedido criado ──> SNS ─┼──> Fila SQS "estoque"      → consumidor
                      ├──> Fila SQS "analytics"    → consumidor
                      └──> Lambda "notificação"
```

Vantagens sobre o produtor chamar os quatro:

1. **Desacoplamento** — adicionar um quinto consumidor não toca no produtor
2. **Durabilidade por consumidor** — cada fila tem sua retenção e sua DLQ
3. **Ritmo independente** — o consumidor lento não atrasa os outros
4. **Retry isolado** — falha num consumidor não afeta os demais

## 3. Message filtering — evite N tópicos

Com **filter policy** na subscription, um único tópico atende vários consumidores interessados em subconjuntos diferentes.

Exemplo: tópico `pedidos`, e a fila de fraude só quer `valor > 10000`:

```json
{ "valor": [{"numeric": [">", 10000]}] }
```

O filtro pode avaliar **message attributes** (padrão) ou o **corpo** da mensagem (escopo configurado na subscription, exigindo JSON bem formado).

Alternativa errada típica em prova: *"criar um tópico por tipo de evento"*.

## 4. SNS FIFO

Tópico FIFO oferece ordenação, agrupamento por message group, deduplicação, filtragem e archive/replay. Integra com **SQS FIFO**.

Use quando a ordem precisa ser preservada **através** do fan-out — por exemplo, eventos de mudança de estado de um pedido que dois sistemas precisam ver na mesma sequência.

## 5. Segurança

| Controle | Detalhe |
|---|---|
| **Topic policy** | Política de recurso: quem publica e quem assina (inclusive cross-account) |
| **Criptografia** | SSE com chave KMS |
| **VPC endpoint** | Publicar sem sair para a internet |
| ⚠️ DLQ criptografada | Fila SQS com chave KMS própria precisa de **key policy** liberando o principal do SNS |

## 6. Quando NÃO é SNS

| Enunciado | Serviço |
|---|---|
| Roteamento pelo **conteúdo** do evento | **EventBridge** |
| Evento de um **serviço AWS** | **EventBridge** |
| **Agendamento** (cron, rate) | **EventBridge Scheduler** |
| Preciso **guardar** a mensagem | **SQS** (ou SNS → SQS) |
| Preciso de **ordem** e um consumidor | **SQS FIFO** |
| **Replay** de eventos | **EventBridge** archive, ou **Kinesis Data Streams** |
| App que já usa **AMQP/MQTT/JMS** | **Amazon MQ** |
| **Streaming** de alto volume com múltiplos leitores e replay | **Kinesis Data Streams** |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[SQS]] · [[EventBridge]] · [[Lambda]] · [[KMS]] · [[Mensageria gerenciada (Amazon MQ e MSK)]]
