---
tags: [saa-c03, eventbridge, questoes]
servico: Amazon EventBridge
atualizado: 2026-11-08
---

# EventBridge — Questões

> [!question]- Q1. Quando um snapshot de EBS terminar, uma Lambda deve copiá-lo para outra região. Menor esforço operacional?
> **A)** Lambda agendada a cada 5 minutos verificando snapshots
> **B)** **Regra do EventBridge no barramento default, casando o evento de conclusão do snapshot, com a Lambda como target** ✅
> **C)** SNS com o evento publicado pela aplicação
> **D)** CloudWatch alarme
>
> **Por que B**: o EventBridge consome os eventos que os serviços AWS **já emitem** — sem polling.
> **A errada**: polling custa e atrasa.
> **C errada**: a AWS não publica esse evento num tópico SNS seu.
> **D errada**: alarme é sobre **métrica**, não evento de conclusão.

> [!question]- Q2. Um barramento recebe eventos de pedido e cada consumidor quer um subconjunto diferente, filtrando por campos **aninhados** do JSON.
> **A)** SNS com message filtering por atributo
> **B)** **EventBridge com event patterns nas regras** ✅
> **C)** Uma fila SQS por consumidor, filtrando no código
> **D)** Kinesis com partition key
>
> **Por que B**: o event pattern casa **campos aninhados** do evento. O filtro do SNS trabalha com message attributes (ou corpo, mas sem a mesma expressividade de padrão).
> **C errada**: o consumidor paga por tudo que não interessa.

> [!question]- Q3. Uma tarefa precisa rodar 2 horas depois de um evento. O SQS delay não serve.
> **A)** SQS com delay de 15 minutos, repetido 8 vezes
> **B)** **EventBridge Scheduler com invocação one-time** ✅
> **C)** Step Functions com Wait state
> **D)** Lambda com sleep
>
> **Por que B**: o delay do SQS para em **15 minutos**, e a própria doc do SQS aponta o **EventBridge Scheduler** para atrasos maiores.
> **C**: também funciona (um `Wait` de 2 h num workflow Standard, que dura até 1 ano) — é resposta válida se já houver um workflow. Para um agendamento isolado, o Scheduler é mais simples.
> **D errada**: o Lambda para em 15 min, e pagar por sleep é desperdício.

> [!question]- Q4. Depois de corrigir um bug, o time precisa reprocessar os eventos do último dia.
> **A)** Reenviar manualmente da aplicação
> **B)** **Archive + replay do EventBridge** ✅
> **C)** DLQ redrive
> **D)** SNS retry
>
> **Por que B**: archive e replay são capacidade nativa do EventBridge.
> **C errada**: a DLQ só tem o que **falhou**, não todos os eventos.

> [!question]- Q5. Um stream do DynamoDB precisa ser filtrado, enriquecido com dados de uma API e entregue a vários consumidores.
> **A)** Lambda lendo o stream e chamando os consumidores
> **B)** **EventBridge Pipes (stream → filtro → enriquecimento) entregando num event bus com várias regras** ✅
> **C)** SNS fan-out
> **D)** Kinesis Data Firehose
>
> **Por que B**: é o padrão citado na própria doc — *"DynamoDB stream → pipe → event bus → multiple targets"*. O Pipes faz *"advanced transformations and enrichment"*.
> **A errada**: você reimplementa filtro, enriquecimento, retry e fan-out.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| EventBridge substitui o SNS | Para **e-mail, SMS, push**, é **SNS** |
| EventBridge guarda mensagem como fila | Não é fila. Buffer e retry por consumidor = **SQS** |
| Pipes e event bus são a mesma coisa | **Pipes é ponto a ponto**; o bus é muitos-para-muitos |
| Delay de horas se faz com SQS | SQS delay para em **15 min**. Use **Scheduler** (ou `Wait` do Step Functions) |
| Entrega é exactly-once | É **at-least-once** — o consumidor precisa ser idempotente |
| Só o barramento default existe | Há **default**, **custom** e **partner** |
| Replay é exclusividade do Kinesis | O EventBridge tem **archive e replay** |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
