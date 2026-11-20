---
servico: AWS Step Functions
fonte: "[[2 - Resiliencia (26%)/Step Functions/2 - Decorar|2 - Decorar]]"
---

# Step Functions — Flashcards

#flashcards/saa-c03/d2-resiliencia/step-functions

Duração máxima de um workflow Standard e de um Express?::Standard **1 ano**; Express **5 minutos**

Semântica de execução do Standard e do Express?::Standard **exactly-once**; Express **at-least-once** (async) ou **at-most-once** (sync)

Execuções por segundo do Standard × Express?::Standard **2.000**; Express **100.000**

Como é cobrado o Standard e o Express?::Standard por **transição de estado**; Express por **número e duração** de execuções + memória

Onde fica o histórico de execução no Standard e no Express?::Standard: no Step Functions por **90 dias**. Express: no **CloudWatch Logs**

Recursos que só o workflow Standard suporta?::**`.sync`**, **`.waitForTaskToken`**, **Distributed Map** e **Activities**

Qual o tipo de workflow padrão e ele pode ser trocado depois?::**Standard**; o tipo é **imutável** após a criação

Timeout de um Express síncrono iniciado pela console?::**60 s** (via SDK/CLI vai até 5 min)

Padrão de integração que chama e espera o job terminar?::**Run a job (`.sync`)**

Padrão de integração para aprovação humana ou sistema externo?::**Wait for callback (`.waitForTaskToken`)**

Padrão de integração default do Step Functions?::**Request Response** (chama e segue, sem esperar)

Estado ASL para ramificação condicional?::**Choice**

Estado ASL para iterar sobre uma lista, e a versão para escala massiva?::**Map**; **Distributed Map** (só Standard)

Como tratar erros numa Task do Step Functions?::**Retry** (backoff e máximo de tentativas) e **Catch** (desvia para estado de tratamento)
