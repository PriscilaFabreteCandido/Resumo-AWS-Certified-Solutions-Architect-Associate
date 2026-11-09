---
tags: [saa-c03, step-functions, questoes]
servico: AWS Step Functions
atualizado: 2026-11-08
---

# Step Functions — Questões

> [!question]- Q1. Workflow de pagamento com 6 passos, até 2 horas de duração, e **nenhum passo pode executar duas vezes**.
> **A)** Express workflow
> **B)** **Standard workflow** ✅
> **C)** Lambda chamando Lambda em cadeia
> **D)** SQS FIFO com um consumidor por etapa
>
> **Por que B**: Standard é **exactly-once**, dura até **1 ano**, e a doc o recomenda explicitamente para *"processing payments"*.
> **A errada**: Express é **at-least-once** e morre em **5 minutos** — falha nos dois requisitos.
> **C errada**: Lambda tem teto de 15 min e você reimplementa retry, estado e observabilidade.
> **D errada**: dá ordem e exactly-once por mensagem, mas não orquestra ramificação, retry por passo nem espera.

> [!question]- Q2. Ingestão de IoT: 50.000 execuções por segundo, cada uma com 3 passos idempotentes de poucos segundos.
> **A)** Standard workflow
> **B)** **Express workflow** ✅
> **C)** Lambda com event source mapping
> **D)** Kinesis Data Firehose
>
> **Por que B**: Express chega a **100.000 execuções/s**, é *"better suited for orchestrating idempotent actions"*, e o modelo de preço por execução/duração é muito mais barato nesse volume que o Standard (por transição de estado).
> **A errada**: 2.000 execuções/s de teto, e o custo por transição explodiria.

> [!question]- Q3. Um workflow precisa pausar e esperar a **aprovação de um gerente** antes de continuar.
> **A)** Express com Wait state
> **B)** **Standard com `.waitForTaskToken` (callback)** ✅
> **C)** Lambda em loop verificando um banco
> **D)** SQS delay queue
>
> **Por que B**: o padrão *wait for callback* pausa até alguém devolver o token — e **só existe no Standard**.
> **A errada**: Express não suporta `.waitForTaskToken` e dura 5 min.

> [!question]- Q4. Um workflow precisa subir um cluster EMR, esperar o job terminar e então seguir.
> **A)** Express com Request Response
> **B)** **Standard com integração `.sync` (run a job)** ✅
> **C)** Lambda fazendo polling do estado do cluster
> **D)** EventBridge rule
>
> **Por que B**: `.sync` faz o workflow **esperar** o job terminar; e subir cluster EMR é caso não idempotente, citado na doc como motivo para Standard.
> **C errada**: polling em Lambda consome tempo de execução e reimplementa o que o `.sync` já faz.

> [!question]- Q5. Processar 2 milhões de arquivos de um bucket S3 em paralelo.
> **A)** Map state comum
> **B)** **Distributed Map (Standard)** ✅
> **C)** Lambda com 1.000 de concorrência reservada
> **D)** Express com Parallel
>
> **Por que B**: o Distributed Map escala para milhões de itens lendo direto do S3 — e existe **só no Standard**.

> [!question]- Q6. Depois de criar um workflow Express, o time percebe que precisa de exactly-once. O que fazer?
> **A)** Mudar o tipo nas configurações
> **B)** **Criar um novo workflow Standard: o tipo é imutável** ✅
> **C)** Habilitar idempotência
> **D)** Usar `.sync`
>
> **Por que B**: o tipo de workflow **não pode ser alterado** depois da criação.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Express é melhor por ser mais rápido | É **at-least-once** e dura **5 min** |
| Posso trocar Standard ↔ Express depois | O tipo é **imutável** |
| Express suporta aprovação humana | `.waitForTaskToken` só no **Standard** |
| Express suporta `.sync` | Só **Request Response** |
| Standard é sempre mais barato | Cobra por **transição de estado** — em alto volume, Express sai muito mais barato |
| Step Functions substitui o SQS | SQS dá **buffer**; Step Functions dá **estado e orquestração** |
| Lambda encadeada faz o mesmo | Sem retry, catch, histórico nem estado — e o teto de 15 min por função se acumula |
| Standard guarda histórico para sempre | **90 dias** no serviço |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
