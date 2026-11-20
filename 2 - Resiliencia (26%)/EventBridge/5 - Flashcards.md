---
servico: Amazon EventBridge
fonte: "[[2 - Resiliencia (26%)/EventBridge/2 - Decorar|2 - Decorar]]"
---

# EventBridge — Flashcards

#flashcards/saa-c03/d2-resiliencia/eventbridge

Quais são os três tipos de event bus do EventBridge?::**Default**, **custom** e **partner**

Qual event bus recebe os eventos dos serviços AWS da conta?::**Default**

Qual event bus recebe eventos de SaaS (Zendesk, Datadog, Shopify)?::**Partner**

Filtro do EventBridge × filtro do SNS: o que o EventBridge olha?::O **conteúdo estruturado** do evento (event pattern), não só atributos

Que tipos de expressão o EventBridge Scheduler aceita?::**cron**, **rate** e **one-time**

Como agendar uma ação com atraso maior que 15 min (o que o delay do SQS não faz)?::**EventBridge Scheduler**

Event bus × Pipes: topologia de cada um?::Bus: **muitos para muitos**. Pipes: **ponto a ponto** (uma origem, um destino)

Qual recurso do EventBridge enriquece eventos com Lambda, Step Functions ou API?::**Pipes**

Como guardar eventos e reprocessá-los depois no EventBridge?::**Archive e replay**

Como enviar eventos para uma API HTTP externa com autenticação e rate limiting?::**API destinations**

Como levar eventos para outra conta ou região?::Usar um **event bus como target** de outro bus

Onde fica a DLQ no EventBridge?::**Por target**, numa fila **SQS**

O que o schema registry do EventBridge faz?::Gera **código** a partir do schema do evento
