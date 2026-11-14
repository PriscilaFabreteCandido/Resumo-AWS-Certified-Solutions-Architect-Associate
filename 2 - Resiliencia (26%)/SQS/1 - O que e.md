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

## Standard × FIFO — a tabela que decide a questão

| | **Standard** (fila padrão) | **FIFO** |
|---|---|---|
| **Ordem** | **Não garante**. *"best-effort ordering"* — pode chegar fora de ordem | **Estrita**, dentro do **message group** |
| **Duplicação** | **Pode duplicar**: *"at-least-once message delivery"* | **Não duplica**: *"exactly-once message processing"* (janela de dedup de **5 min**) |
| **Throughput** | *"nearly unlimited"* — sem teto prático | **300 TPS** por ação de API (**3.000 msg/s** com batch de 10); **high throughput** vai a 70.000 TPS em us-east-1/us-west-2/eu-west-1 |
| **Nome da fila** | qualquer | **tem de terminar em `.fifo`** |
| **Parâmetros obrigatórios** | nenhum | **`MessageGroupId`**; e `MessageDeduplicationId` (ou dedup por conteúdo) |
| **Paralelismo do consumo** | total | **um message group é processado por um consumidor de cada vez** |
| **Preço** | mais barato | mais caro por requisição |
| **Use quando** | a ordem **não importa** e volume é alto: processamento de imagens, envio de e-mail, log, tarefas independentes | a ordem **importa**: transações financeiras, eventos de um mesmo pedido/usuário, comandos de estado |

> [!important] Por que a ordem é "dentro do message group"
> FIFO não serializa a fila inteira — serializa **cada `MessageGroupId`**. Mensagens de grupos diferentes são processadas **em paralelo** e sem relação de ordem entre si.
> Na prática: use o **ID do pedido**, do **cliente** ou da **conta** como `MessageGroupId`. Assim os eventos de cada pedido ficam em ordem, sem estrangular o throughput total.
> E é exatamente por isso que a doc recomenda, para escalar FIFO: *"increasing the number of message groups is recommended."*

> [!warning] As três pegadinhas de Standard × FIFO
> 1. **"Pode duplicar" não é defeito, é contrato.** Numa fila standard o consumidor **precisa ser idempotente** (checar se já processou, por um ID). Se o enunciado diz *"o processamento não pode ocorrer duas vezes"* e **não** fala de ordem, duas respostas são válidas: **FIFO** ou **standard + consumidor idempotente** — veja qual o enunciado permite.
> 2. **FIFO não é para volume alto sem planejamento.** 300 TPS por ação é pouco. Se o enunciado dá um volume grande **e** pede ordem, a resposta envolve **muitos message groups** (ou high throughput mode).
> 3. **DLQ em fila FIFO quebra a ordem.** A doc avisa: *"Don't use a dead-letter queue with a FIFO queue if you don't want to break the exact order."*

### Como escolher, em uma pergunta

```
A ordem das mensagens importa?
├── NÃO ──► Fila STANDARD (mais barata, throughput ilimitado)
│            └─ e faça o consumidor IDEMPOTENTE (pode duplicar)
└── SIM ──► Fila FIFO
             └─ escolha o MessageGroupId que dá ordem onde precisa
                (ID do pedido/cliente) e paralelismo no resto
```

## A regra que mais cai

**SQS = um consumidor por mensagem.** Se o enunciado pede que **N sistemas** processem o **mesmo** evento de forma independente, a resposta é **SNS → N filas SQS** (fan-out), não uma fila lida por N consumidores.

## Links

- [[2 - Resiliencia (26%)/SQS/2 - Decorar|2 - Decorar]] · [[2 - Resiliencia (26%)/SQS/3 - Detalhes|3 - Detalhes]] · [[2 - Resiliencia (26%)/SQS/4 - Questoes|4 - Questoes]]
- [[2 - Resiliencia (26%)/SNS/1 - O que e|SNS]] · [[2 - Resiliencia (26%)/EventBridge/1 - O que e|EventBridge]] · [[2 - Resiliencia (26%)/Lambda/1 - O que e|Lambda]] · [[2 - Resiliencia (26%)/Auto Scaling (EC2)/1 - O que e|Auto Scaling (EC2)]] · [[2 - Resiliencia (26%)/Mensageria gerenciada (Amazon MQ e MSK)/1 - O que e|Mensageria gerenciada (Amazon MQ e MSK)]]
- [O que é o Amazon SQS](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html)
