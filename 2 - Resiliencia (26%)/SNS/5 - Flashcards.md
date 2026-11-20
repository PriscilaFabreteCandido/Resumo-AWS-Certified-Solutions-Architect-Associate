---
servico: Amazon SNS
fonte: "[[2 - Resiliencia (26%)/SNS/2 - Decorar|2 - Decorar]]"
---

# SNS — Flashcards

#flashcards/saa-c03/d2-resiliencia/sns

Tamanho máximo de mensagem no SNS?::**256 KiB** (262.144 bytes)

Política de retry do SNS para endpoints SQS e Lambda?::Até **100.015** tentativas ao longo de **23 dias**

Política de retry do SNS para SMS, push e e-mail?::**50** tentativas em **6 horas**

Quem define a política de retry do SNS para HTTP/HTTPS?::**Você**

O SNS retenta erro de cliente?::**Não**; vai para a **DLQ**, se houver

O que é a DLQ do SNS e qual sua granularidade?::Uma fila **SQS**, na mesma conta e região, configurada **por subscription** (não por tópico)

Retenção recomendada para a DLQ do SNS?::**14 dias**

Como evitar criar um tópico por tipo de evento no SNS?::Um tópico com **filter policies** por subscription

Sobre o que a filter policy do SNS filtra por padrão, e qual a alternativa?::**MessageAttributes** por padrão; ou **MessageBody** (exige JSON bem formado)

Tópico SNS FIFO integra com que tipo de assinante e DLQ?::**SQS FIFO**; a DLQ também precisa ser **FIFO**

Fan-out simples ou e-mail/SMS/push: SNS ou EventBridge?::**SNS**

Roteamento por conteúdo, eventos de serviços AWS ou replay: SNS ou EventBridge?::**EventBridge**

Entre SNS, SQS e Amazon MQ, qual suporta comunicação síncrona e é broker?::**Amazon MQ**
