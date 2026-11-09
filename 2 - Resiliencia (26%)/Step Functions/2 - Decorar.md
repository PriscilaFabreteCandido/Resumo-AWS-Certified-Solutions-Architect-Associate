---
tags: [saa-c03, step-functions, decorar]
servico: AWS Step Functions
atualizado: 2026-11-08
---

# Step Functions — Decorar

## Standard × Express (decore esta tabela)

| | **Standard** | **Express** |
|---|---|---|
| Duração máxima | **1 ano** | **5 minutos** |
| Semântica | **exactly-once** | **at-least-once** (async) / at-most-once (sync) |
| Execuções/s | 2.000 | **100.000** |
| Transições/s | 4.000 | *"Nearly unlimited"* |
| Cobrança | por **transição de estado** | por **nº e duração** de execuções + memória |
| Histórico | Step Functions, **90 dias** | **CloudWatch Logs** |
| `.sync` (run a job) | **✅** | ❌ |
| `.waitForTaskToken` (callback) | **✅** | ❌ |
| Distributed Map | **✅** | ❌ |
| Activities | **✅** | ❌ |
| Tipo padrão | **Standard** | — |

⚠️ **Imutável**: o tipo não muda depois de criado.
⚠️ Express **síncrono** pela console expira em **60 s**; via SDK/CLI vai até os 5 minutos.

## Os três padrões de integração

| Padrão | O que faz |
|---|---|
| **Request Response** (padrão) | Chama e segue, sem esperar o fim |
| **Run a job (`.sync`)** | Chama e **espera** o job terminar (ex.: task do ECS, job do Glue, cluster do EMR) |
| **Wait for callback (`.waitForTaskToken`)** | Pausa até alguém devolver o token — **aprovação humana**, sistema externo |

Só o **Standard** suporta os dois últimos.

## Tipos de estado (ASL)

| Estado | Para quê |
|---|---|
| **Task** | Faz o trabalho (Lambda, ECS, Glue, SDK de qualquer serviço AWS) |
| **Choice** | Ramificação condicional |
| **Parallel** | Ramos em paralelo |
| **Map** | Itera sobre uma lista (**Distributed Map** para escala massiva, só Standard) |
| **Wait** | Espera N segundos ou até um timestamp |
| **Pass** | Passa adiante, transformando a entrada |
| **Succeed** / **Fail** | Termina |

Em cada Task: **Retry** (com backoff e máximo de tentativas) e **Catch** (desvia para um estado de tratamento).

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
