---
tags: [saa-c03, cloudtrail, decorar]
servico: AWS CloudTrail
atualizado: 2026-11-08
---

# CloudTrail — Decorar

## Os números

| Item | Valor |
|---|---|
| **Event history** (grátis, na console) | *"the past 90 days of management events in an AWS Region"* |
| **CloudTrail Lake** — retenção estendida | *"up to 3,653 days (about 10 years)"* |
| **CloudTrail Lake** — retenção padrão | *"up to 2,557 days (about 7 years)"* |
| **Trail** em bucket S3 | Retenção que **você** definir (via lifecycle) |

## Tipos de evento

| Tipo | Padrão | Custo |
|---|---|---|
| **Management events** | **Gravados** | Primeira cópia grátis |
| **Data events** | **Não gravados** | **Cobrados** |
| **Insights events** | Não | Cobrados |

## Onde os eventos vão

| Destino | Para quê |
|---|---|
| **Event history** (console) | Últimos **90 dias** de management events, sem configurar nada |
| **Trail → S3** | Retenção longa, análise com **Athena**, Object Lock para imutabilidade |
| **Trail → CloudWatch Logs** | **Alarme** em tempo quase real (metric filter + alarme) |
| **CloudTrail Lake** | Consulta **SQL** sobre os eventos, retenção de até ~10 anos |
| **EventBridge** | Reagir a uma chamada de API específica |

## Organization trail

Um único trail, criado na **management account**, que grava os eventos de **todas** as contas da organização num bucket central. É a resposta para "auditar 40 contas".

## A combinação de prova para trilha inviolável

```
Organization trail
      ↓
Bucket na conta de Log Archive (outra conta)
      ↓
Versionamento + Object Lock (modo Compliance) + MFA Delete
      ↓
SCP negando cloudtrail:StopLogging e cloudtrail:DeleteTrail
```

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
