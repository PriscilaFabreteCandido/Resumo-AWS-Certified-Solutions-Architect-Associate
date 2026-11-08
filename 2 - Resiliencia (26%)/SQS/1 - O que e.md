---
tags: [saa-c03, sqs, mensageria]
servico: Amazon SQS
tipo: Fila gerenciada
dominios: [2]
atualizado: 2026-11-08
---

# Amazon SQS — O que é

> [!info] Em uma frase
> Fila gerenciada: o produtor coloca mensagens, o consumidor **puxa** (pull) e processa, e **cada mensagem é processada por um consumidor**. É o amortecedor entre componentes.

## Para que serve, na prática

Três funções, e a prova usa todas:

1. **Absorver pico** — o produtor despeja na fila, o consumidor processa no seu ritmo. Nada se perde.
2. **Desacoplar** — se o consumidor cai, as mensagens esperam. O produtor não sabe nem se importa.
3. **Escalar de forma independente** — o Auto Scaling do consumidor usa a **profundidade da fila** como métrica.

## Standard × FIFO

| | **Standard** | **FIFO** |
|---|---|---|
| Entrega | *"at-least-once message delivery"* — **pode duplicar** | *"exactly-once message processing"* |
| Ordem | **Não garante** | **Estrita, dentro do message group** |
| Throughput | *"nearly unlimited"* | **300 TPS** por ação (3.000 msg/s com batch de 10) |

## A regra que mais cai

**SQS = um consumidor por mensagem.** Se o enunciado pede que **N sistemas** processem o **mesmo** evento de forma independente, a resposta é **SNS → N filas SQS** (fan-out), não uma fila lida por N consumidores.

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[SNS]] · [[EventBridge]] · [[Lambda]] · [[Auto Scaling (EC2)]] · [[Mensageria gerenciada (Amazon MQ e MSK)]]
- [O que é o Amazon SQS](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html)
