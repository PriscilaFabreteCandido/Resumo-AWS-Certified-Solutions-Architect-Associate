---
tags: [saa-c03, step-functions, detalhes]
servico: AWS Step Functions
atualizado: 2026-11-08
---

# Step Functions — Detalhes

## 1. Standard — para workflow longo e não idempotente

A doc posiciona o Standard para *"long-running, auditable workflows"* e cita explicitamente os casos **não idempotentes**: *"starting an Amazon EMR cluster or processing payments"*.

A razão é a semântica **exactly-once**: o Step Functions garante que cada passo execute uma vez. Num workflow de pagamento, "executar duas vezes" é inaceitável — e é exatamente o que o Express (**at-least-once**) pode fazer.

Além da semântica, o Standard dá:
- **Até 1 ano** de duração — permite `Wait` de dias e aprovação humana
- **Histórico de execução por 90 dias** no próprio serviço, visualizável passo a passo (auditoria)
- **`.sync`** e **`.waitForTaskToken`**
- **Distributed Map** e **Activities**

## 2. Express — para volume alto e idempotente

Express é *"better suited for orchestrating idempotent actions"*: ingestão de IoT, processamento de stream, backend mobile. Até **100.000 execuções/s** e transições *"nearly unlimited"*.

O preço muda de modelo: Standard cobra por **transição de estado** (caro em workflow com muitos passos e muitas execuções); Express cobra por **número e duração** de execuções mais memória (barato em alto volume, curto).

Limites: **5 minutos**, histórico só em **CloudWatch Logs**, e sem `.sync`/`.waitForTaskToken`/Distributed Map/Activities. Síncrono pela console expira em **60 s**.

## 3. Os três padrões de integração — quando usar

**Request Response** é o padrão: dispara e segue. Serve quando você não precisa do resultado do passo.

**Run a job (`.sync`)** é o que faz o workflow **esperar** um job longo terminar: uma task do ECS, um job do Glue, um cluster do EMR. Sem isso, você teria que fazer polling numa Lambda.

**Wait for callback (`.waitForTaskToken`)** pausa a execução até alguém chamar `SendTaskSuccess` com o token. É o padrão de:
- **Aprovação humana** (o workflow manda um e-mail com um link e espera)
- **Integração com sistema externo** assíncrono (o parceiro responde quando terminar)

Esses dois **não existem no Express** — é a razão mais comum para escolher Standard mesmo em workflow curto.

## 4. Tratamento de erro

É o principal motivo para usar Step Functions em vez de encadear Lambdas:

```
Task "cobrar"
  Retry:
    - ErrorEquals: ["States.Timeout", "ServiceUnavailable"]
      IntervalSeconds: 2, BackoffRate: 2, MaxAttempts: 3
  Catch:
    - ErrorEquals: ["States.ALL"]
      Next: "reverterReserva"      ← compensação (padrão saga)
```

Erros nativos: `States.Timeout`, `States.TaskFailed`, `States.Permissions`, `States.ALL`. O **Catch** permite implementar **compensação** (desfazer passos anteriores) — o padrão *saga* para transações distribuídas sem banco único.

## 5. Map e Distributed Map

**Map** itera sobre uma lista, com concorrência configurável. **Distributed Map** (só **Standard**) escala para **milhões** de itens, lendo direto de um bucket S3 e rodando execuções filhas — é a resposta para "processar milhões de arquivos em paralelo".

## 6. Step Functions × as alternativas

| Abordagem | Problema |
|---|---|
| **Lambda chamando Lambda** | Você reimplementa retry, estado, observabilidade; e o teto de **15 min** por função se acumula |
| **SQS entre etapas** | Dá buffer e retry, mas **não** dá ramificação, paralelismo, espera nem visão do processo |
| **EventBridge** | Roteia eventos; **não** mantém estado de um processo |
| **Step Functions** | Estado, ramificação, retry, paralelismo e histórico como configuração |

Combinação frequente em prova: **EventBridge** dispara → **Step Functions** orquestra → **Lambda/ECS/Glue** executam.

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[Lambda]] · [[EventBridge]] · [[SQS]] · [[ECS]] · [[Glue]] · [[EMR]]
