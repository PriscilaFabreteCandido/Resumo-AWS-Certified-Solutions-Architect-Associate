---
servico: Amazon SQS
fonte: "[[2 - Resiliencia (26%)/SQS/2 - Decorar|2 - Decorar]]"
---

# SQS — Flashcards

#flashcards/saa-c03/d2-resiliencia/sqs

Retenção de mensagens no SQS: padrão e faixa?::Padrão **4 dias**; faixa de **60 s a 14 dias**

Visibility timeout do SQS: padrão e máximo?::Padrão **30 s**; máximo **12 horas** (contado a partir do primeiro recebimento)

Tempo máximo de espera do long polling no SQS?::**20 s** (`WaitTimeSeconds` de 1 a 20)

Faixa do delay queue / message timer no SQS?::**0 s** (padrão) a **15 minutos**

Tamanho máximo de mensagem no SQS hoje (e o valor antigo que ainda aparece em material velho)?::**1 MiB** pela página de quotas atual; material antigo diz **256 KB**

Como enviar payload maior que o limite do SQS, e qual a restrição?::**Extended Client Library** com S3 (até **2 GB**), e **só em Java**

Quantas mensagens cabem num batch do SQS?::**10**

Throughput da fila FIFO sem e com batch (modo normal)?::**300 TPS** por ação de API; **3.000 msg/s** com batch de 10

Como a doc recomenda escalar uma fila FIFO?::Aumentar a quantidade de **message groups** (ou usar o modo **high throughput**)

Janela de deduplicação da FIFO?::**5 minutos**

Na deduplicação content-based da FIFO, o hash é calculado sobre o quê?::**SHA-256 do corpo** da mensagem (não dos atributos)

Requisitos da DLQ em relação à fila de origem?::Mesma **conta** e mesma **região**; fila FIFO exige DLQ **FIFO**; boa prática: retenção da DLQ **maior** que a da origem

O que o `maxReceiveCount` define?::Quantas vezes uma mensagem pode ser recebida antes de ir para a **DLQ**

Por que evitar DLQ numa fila FIFO?::Ela **quebra a ordem exata** das mensagens

Short × long polling: qual consulta todos os servidores e custa menos?::**Long polling**: consulta todos os servidores, quase não devolve resposta vazia e é **mais barato**. Short polling (padrão) consulta um subconjunto
