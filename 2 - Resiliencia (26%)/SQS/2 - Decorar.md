---
tags: [saa-c03, sqs, decorar]
servico: Amazon SQS
atualizado: 2026-11-08
---

# SQS — Decorar

## Os números

| Item | Valor |
|---|---|
| **Retenção** | padrão **4 dias**; faixa **60 s a 14 dias** |
| **Visibility timeout** | padrão **30 s**; máximo **12 horas** (contados do **primeiro** recebimento) |
| **Long polling** | máximo **20 s** de espera |
| **Delay queue / message timer** | **0 s** (padrão) a **15 minutos** |
| **Tamanho da mensagem** | **1 MiB (1.048.576 bytes)** pela página de quotas atual ⚠️ |
| **Batch** | **10** mensagens |
| **In-flight (standard)** | ~**120.000** |
| **Atributos de mensagem** | **10** |
| **MessageGroupId (FIFO)** | **128** caracteres |

> [!warning] O tamanho da mensagem mudou
> A página de quotas atual diz **1 MiB**. Material antigo diz **256 KB**. Para payload maior, use a **Extended Client Library** com S3 — até **2 GB**, e **só em Java**: *"You can't do this with the AWS CLI, the Amazon SQS console, the Amazon SQS HTTP API, or any of the other AWS SDKs."*

## FIFO — throughput

| Modo | Sem batch | Com batch de 10 |
|---|---|---|
| **Normal** | **300 TPS** por ação de API | **3.000 msg/s** |
| **High throughput** | 70.000 TPS (us-east-1, us-west-2, eu-west-1) · 2.400 em outras regiões | 700.000 msg/s (idem) |

Recomendação da doc para escalar FIFO: *"increasing the number of message groups is recommended."*

## Deduplicação FIFO

| Item | Detalhe |
|---|---|
| Janela | **5 minutos** |
| Por `MessageDeduplicationId` | Você fornece o ID |
| **Content-based** | Hash **SHA-256 do corpo** (⚠️ **não** dos atributos) |

## DLQ (dead-letter queue)

| Item | Detalhe |
|---|---|
| `maxReceiveCount` | *"the number of times a consumer can receive a message from a source queue before it is moved to a dead-letter queue"* |
| Mesma conta e região | **Obrigatório** |
| Mesmo tipo | Fila FIFO → DLQ **FIFO** |
| Boa prática | Retenção da DLQ **maior** que a da origem |
| Redrive allow policy | allow all (padrão), **byQueue** (até 10 ARNs) ou denyAll |
| ⚠️ FIFO | *"Don't use a dead-letter queue with a FIFO queue if you don't want to break the exact order."* |

## Short × long polling

| | **Short polling** (padrão) | **Long polling** |
|---|---|---|
| `WaitTimeSeconds` | **0** | **1 a 20** |
| Como consulta | *"a subset of its servers (based on a weighted random distribution)"* | **Todos** os servidores |
| Resposta vazia | Comum | Rara |
| Custo | **Maior** | **Menor** |

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[02 - Numeros para decorar]]
