---
tags: [saa-c03, sns, questoes]
servico: Amazon SNS
atualizado: 2026-11-08
---

# SNS — Questões

> [!question]- Q1. Publicar atualizações de pedido para e-mail, SMS, uma fila de faturamento e um endpoint HTTP de parceiro. Menor esforço operacional?
> **A)** Lambda chamando cada destino
> **B)** **Tópico SNS com quatro subscriptions (e-mail, SMS, SQS, HTTPS)** ✅
> **C)** Quatro filas SQS e quatro consumidores
> **D)** EventBridge com quatro regras
>
> **Por que B**: SNS entrega nativamente para **e-mail, SMS, SQS e HTTP(S)** — é a lista oficial de endpoints. Zero código.
> **A errada**: você reimplementa retry, backoff e DLQ por canal.
> **C errada**: SQS não entrega e-mail nem SMS.
> **D errada**: funciona para SQS e HTTP, mas **e-mail e SMS** são do SNS.

> [!question]- Q2. Quatro sistemas precisam processar cada evento de forma independente, com garantia de que nenhum perca a mensagem se estiver fora do ar.
> **A)** SNS com quatro subscriptions Lambda
> **B)** **SNS com quatro filas SQS inscritas, cada sistema consumindo a sua** ✅
> **C)** Uma fila SQS lida pelos quatro
> **D)** Quatro tópicos SNS
>
> **Por que B**: a fila dá **durabilidade** (até 14 dias) e retry por consumidor. SNS sozinho não armazena.
> **A errada**: se a Lambda falha além do retry, a mensagem é perdida (sem DLQ).
> **C errada**: cada mensagem seria processada **uma** vez.
> **D errada**: quatro tópicos obrigam o produtor a publicar quatro vezes.

> [!question]- Q3. Um tópico publica 50 tipos de evento, e cada consumidor só quer alguns. Como evitar criar 50 tópicos?
> **A)** Filtrar no consumidor, descartando o que não interessa
> **B)** **Filter policy em cada subscription** ✅
> **C)** Criar um tópico por consumidor
> **D)** Usar EventBridge
>
> **Por que B**: message filtering existe para isso — por atributos ou pelo corpo.
> **A errada**: o consumidor paga (em requisições e processamento) por tudo que não interessa.
> **D errada**: EventBridge também roteia por conteúdo e é resposta válida em outros cenários; aqui, o recurso nativo do SNS resolve sem mudar de serviço.

> [!question]- Q4. Qual é o tamanho máximo de uma mensagem do SNS?
> **A)** 1 MiB
> **B)** **256 KiB (262.144 bytes)** ✅
> **C)** 64 KB
> **D)** 2 GB
>
> **Por que B**: é o valor oficial. ⚠️ Note que o **SQS** hoje aceita **1 MiB** — os dois são diferentes.

> [!question]- Q5. As mensagens para um endpoint HTTPS de parceiro estão sendo perdidas quando o parceiro fica fora do ar.
> **A)** Aumentar o tamanho da mensagem
> **B)** **Inscrever uma fila SQS no tópico (e o parceiro consome dela), ou configurar DLQ na subscription** ✅
> **C)** Mudar para tópico FIFO
> **D)** Usar SMS como fallback
>
> **Por que B**: para HTTP/HTTPS a política de retry é **sua** e o SNS não armazena. A fila dá durabilidade; a DLQ captura o que falhou.
> **C errada**: FIFO resolve ordem, não durabilidade.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| SNS guarda a mensagem | **Push**, não armazena. Durabilidade vem da **fila** |
| DLQ do SNS pode ser Lambda ou outro tópico | *"A dead-letter queue is an Amazon SQS queue"* |
| DLQ é por tópico | É por **subscription** |
| Mensagem do SNS é 1 MiB como no SQS | SNS: **256 KiB**. SQS: 1 MiB |
| SNS tem retry infinito para HTTP | Para HTTP a política é **sua**; para SQS/Lambda são 100.015 tentativas em 23 dias |
| Erro 4xx é retentado | Erro de **cliente não é retentado** |
| Preciso de um tópico por tipo de evento | Use **filter policy** |
| EventBridge substitui o SNS | Para e-mail/SMS/push, é **SNS** |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
