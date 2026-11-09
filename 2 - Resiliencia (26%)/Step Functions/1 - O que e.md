---
tags: [saa-c03, step-functions, orquestracao]
servico: AWS Step Functions
tipo: Orquestração de workflow
dominios: [2]
atualizado: 2026-11-08
---

# AWS Step Functions — O que é

> [!info] Em uma frase
> Orquestra passos de um processo numa **máquina de estados**: quem chama quem, em que ordem, com **retry**, **catch**, **paralelismo** e **espera** — sem que você escreva essa lógica no código.

## O que ele tira do seu código

Sem Step Functions, uma Lambda que chama outra Lambda carrega: tratamento de erro, retry com backoff, timeout, estado intermediário, log do que já aconteceu, e compensação quando um passo falha no meio.

Com Step Functions, isso é **configuração** (ASL, Amazon States Language) e vem com **histórico visual** de cada execução.

## Standard × Express — a decisão

| | **Standard** | **Express** |
|---|---|---|
| **Duração** | até **1 ano** | até **5 minutos** |
| **Semântica** | **exactly-once** | **at-least-once** (assíncrono) / at-most-once (síncrono) |
| **Taxa de execução** | 2.000/s | **100.000/s** |
| **Transições de estado** | 4.000/s | *"Nearly unlimited"* |
| **Preço** | por **transição de estado** | por **número e duração** de execuções + memória |
| **Histórico** | no Step Functions, **90 dias** | **CloudWatch Logs** |
| `.sync` e `.waitForTaskToken` | **Sim** | **Não** (só Request Response) |
| Distributed Map / Activities | **Sim** | **Não** |

> [!warning] A regra que decide
> Passo **não idempotente** (cobrar cartão, subir cluster EMR) → **Standard**, porque é *exactly-once*.
> A doc: Standard para *"long-running, auditable workflows"* e casos como *"starting an Amazon EMR cluster or processing payments"*; Express é *"better suited for orchestrating idempotent actions"*.
>
> ⚠️ O tipo de workflow é **imutável** depois de criado.

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[Lambda]] · [[EventBridge]] · [[SQS]] · [[ECS]]
- [Escolhendo o tipo de workflow](https://docs.aws.amazon.com/step-functions/latest/dg/choosing-workflow-type.html)
