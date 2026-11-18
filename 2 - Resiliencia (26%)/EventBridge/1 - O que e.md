---
tags: [saa-c03, eventbridge, mensageria]
servico: Amazon EventBridge
tipo: Barramento de eventos
dominios: [2]
atualizado: 2026-11-08
---

# Amazon EventBridge — O que é

> [!info] Em uma frase
> Barramento de eventos serverless que roteia eventos **pelo conteúdo** deles, integra nativamente com **eventos dos serviços AWS** e de SaaS, e também **agenda** execuções (cron).

## As três coisas que só ele faz

| Capacidade | Por que importa |
|---|---|
| **Roteamento por conteúdo** | A regra olha dentro do JSON do evento: `{"detail":{"state":["FAILED"]}}` |
| **Eventos dos serviços AWS** | "quando um snapshot de EBS terminar", "quando uma instância mudar de estado" — sem polling |
| **Agendamento** | **EventBridge Scheduler**: cron e rate, *"billions of one-time or recurring API actions"* (bilhões de ações de API, pontuais ou recorrentes) |

## Os componentes

| Componente | O que é |
|---|---|
| **Event bus** | O canal. O barramento **default** recebe os eventos dos serviços AWS; você cria **custom** para os seus; **partner** para SaaS |
| **Rule** | Padrão de evento (*event pattern*) + **targets** |
| **Target** | Lambda, SQS, SNS, Step Functions, ECS task, API destination (HTTP), outro bus… |
| **EventBridge Pipes** | *"intended for point-to-point integrations; each pipe receives events from a single source... to a single target"* (pensado para integrações ponto a ponto; cada pipe recebe eventos de uma única origem... para um único destino), com filtro e **enriquecimento** |
| **EventBridge Scheduler** | *"create schedules using cron and rate expressions for recurring patterns, or configure one-time invocations"* (criar agendamentos com expressões cron e rate para padrões recorrentes, ou configurar invocações únicas) |
| **Schema registry** | Descobre e versiona o schema dos eventos |

## SNS × EventBridge

| Critério | Resposta |
|---|---|
| Fan-out simples, alto throughput, barato | **SNS** |
| Canais humanos (e-mail, SMS, push) | **SNS** |
| Roteamento pelo **conteúdo** do evento | **EventBridge** |
| Evento de um **serviço AWS** | **EventBridge** |
| **Agendamento** (cron) | **EventBridge Scheduler** |
| **Archive e replay** de eventos | **EventBridge** |

## Links

- [[2 - Resiliencia (26%)/EventBridge/2 - Decorar|2 - Decorar]] · [[2 - Resiliencia (26%)/EventBridge/3 - Detalhes|3 - Detalhes]] · [[2 - Resiliencia (26%)/EventBridge/4 - Questoes|4 - Questoes]]
- [[2 - Resiliencia (26%)/SNS/1 - O que e|SNS]] · [[2 - Resiliencia (26%)/SQS/1 - O que e|SQS]] · [[2 - Resiliencia (26%)/Step Functions/1 - O que e|Step Functions]] · [[2 - Resiliencia (26%)/Lambda/1 - O que e|Lambda]] · [[2 - Resiliencia (26%)/CloudWatch/1 - O que e|CloudWatch]]
- [O que é o EventBridge](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html)
