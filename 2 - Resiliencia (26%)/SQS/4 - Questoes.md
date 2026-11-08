---
tags: [saa-c03, sqs, questoes]
servico: Amazon SQS
atualizado: 2026-11-08
---

# SQS — Questões

> [!question]- Q1. Mensagens estão sendo processadas duas vezes. O processamento leva ~90 s e a fila é standard com configuração padrão.
> **A)** Fila standard sempre duplica; migrar para FIFO
> **B)** **O visibility timeout de 30 s expira antes do fim do processamento; aumentar o timeout (ou estendê-lo com `ChangeMessageVisibility`)** ✅
> **C)** Falta habilitar long polling
> **D)** Falta uma DLQ
>
> **Por que B**: com 30 s de timeout e 90 s de processamento, a mensagem reaparece no meio do trabalho.
> **A errada**: standard **pode** duplicar, mas o enunciado descreve o sintoma de timeout curto; migrar para FIFO limitaria a 300 TPS sem necessidade.
> **C errada**: long polling afeta respostas vazias e custo.
> **D errada**: DLQ trata falha repetida, não reprocessamento por timeout.

> [!question]- Q2. Um processamento de pedidos perde requisições no pico porque o backend não acompanha.
> **A)** Aumentar o tipo de instância do backend
> **B)** **Colocar uma fila SQS entre o front-end e o backend, e escalar o backend pela profundidade da fila** ✅
> **C)** Adicionar um ALB na frente do backend
> **D)** Habilitar cache no CloudFront
>
> **Por que B**: a fila **absorve o pico** e desacopla produtor de consumidor.
> **A errada**: escala vertical tem teto.
> **C errada**: ALB distribui, mas não **armazena** requisição.
> **D errada**: cache não ajuda em **escrita**.

> [!question]- Q3. **Quatro** sistemas precisam processar cada evento de "pedido criado", de forma independente.
> **A)** Uma fila SQS lida pelos quatro
> **B)** **Tópico SNS com quatro filas SQS inscritas (fan-out)** ✅
> **C)** Quatro chamadas HTTP síncronas do produtor
> **D)** Kinesis Data Streams com consumidor compartilhado
>
> **Por que B**: SQS entrega cada mensagem a **um** consumidor. Para N processadores independentes, SNS → N SQS.
> **A errada**: os quatro competiriam pela mesma mensagem.
> **C errada**: acoplamento total.
> **D errada**: serve, mas com consumidor compartilhado os quatro dividem 2 MB/s por shard e se atrasam mutuamente.

> [!question]- Q4. Transações de pagamento precisam ser processadas **na ordem por cliente** e **sem duplicidade**.
> **A)** Fila standard com consumidor idempotente
> **B)** **Fila FIFO com `MessageGroupId` = ID do cliente** ✅
> **C)** Kinesis com partition key do cliente
> **D)** Fila standard com visibility timeout alto
>
> **Por que B**: FIFO garante *exactly-once* e ordem **dentro do grupo**; o ID do cliente preserva a ordem por cliente e permite paralelismo entre clientes.
> **A e D erradas**: standard não garante ordem.
> **C errada**: Kinesis preserva ordem por shard, mas é *at-least-once*.

> [!question]- Q5. O consumidor em Auto Scaling não escala no pico; a CPU fica em 20% e a fila acumula.
> **A)** Instâncias com mais CPU
> **B)** **Target tracking sobre o backlog da fila (`ApproximateNumberOfMessagesVisible` por instância)** ✅
> **C)** Aumentar o cooldown
> **D)** Habilitar long polling
>
> **Por que B**: a métrica tem que refletir o **trabalho pendente**, não a CPU.
> **C errada**: cooldown maior escala **menos**.

> [!question]- Q6. Uma mensagem de 5 MB precisa trafegar pela fila.
> **A)** Aumentar o limite da fila
> **B)** **Usar a SQS Extended Client Library com S3 (até 2 GB)** ✅
> **C)** Dividir em 5 mensagens de 1 MB
> **D)** Usar SNS
>
> **Por que B**: é o mecanismo oficial — ponteiro na fila, objeto no S3.
> **A errada**: o limite não é ajustável.
> **C errada**: funciona, mas você reimplementa reassembly e perde atomicidade.
> ⚠️ A Extended Client Library existe **só para Java**.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| SQS entrega para N consumidores | **1 por mensagem.** N = SNS → N SQS |
| Standard garante ordem | **Não.** At-least-once, sem ordem |
| FIFO é só "standard ordenada" | Também é **exactly-once**, com teto de **300 TPS** |
| Deduplicação FIFO olha os atributos | Content-based usa hash **do corpo** |
| Delay queue = visibility timeout | Delay atrasa a **primeira** entrega |
| Visibility timeout passa de 12 h se estendido | O limite conta do **primeiro** recebimento |
| Long polling custa mais | Custa **menos** |
| Mensagem máxima é 256 KB | A página de quotas atual diz **1 MiB** |
| Escalar consumidor é por CPU | É pela **profundidade da fila** |
| DLQ pode ser de outra conta | **Mesma conta e região**, e mesmo tipo |
| DLQ com FIFO é sempre boa ideia | *"Don't use a dead-letter queue with a FIFO queue if you don't want to break the exact order"* |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
