---
tags: [saa-c03, batch, questoes]
servico: AWS Batch
atualizado: 2026-11-08
---

# AWS Batch — Questões

> [!question]- Q1. 50.000 jobs independentes de análise, cada um de ~20 minutos, com o menor custo e tolerantes a interrupção.
> **A)** Lambda com event source mapping
> **B)** **AWS Batch com compute environment em EC2 Spot (allocation strategy `price capacity optimized`)** ✅
> **C)** ECS service com 50.000 tasks
> **D)** EMR com Spark
>
> **Por que B**: fila de jobs com provisionamento automático, e Spot é o caso de uso canônico para lote reiniciável.
> **A errada**: 20 min cabe no Lambda (15 min? não — **estoura**), e Lambda não tem fila de jobs com prioridade/dependência.
> **C errada**: `service` é para processo **contínuo**, não job que termina.
> **D errada**: EMR é para **Spark/Hadoop**; o enunciado não menciona framework.

> [!question]- Q2. Processar 100.000 arquivos do S3, um por job, com o mínimo de configuração.
> **A)** 100.000 submissões individuais
> **B)** **Um array job de 100.000, usando o índice para escolher o arquivo** ✅
> **C)** Um job com loop interno
> **D)** Step Functions Map
>
> **Por que B**: o array job é feito para isso, com `AWS_BATCH_JOB_ARRAY_INDEX`.
> **D**: **Distributed Map** do Step Functions Standard também escala para milhões de itens — alternativa legítima, especialmente se houver ramificação no fluxo.

> [!question]- Q3. O pipeline precisa: preparar dados → processar em paralelo → agregar. A ordem deve ser respeitada.
> **A)** Três filas separadas
> **B)** **Jobs com `dependsOn` no AWS Batch (ou Step Functions orquestrando)** ✅
> **C)** CloudWatch Events em cadeia
> **D)** SQS com delay
>
> **Por que B**: dependências entre jobs são nativas do Batch; Step Functions é a opção quando há ramificação e estado.

> [!question]- Q4. Jobs críticos precisam ser agendados antes dos jobs de relatório, na mesma capacidade.
> **A)** Dois compute environments
> **B)** **Duas job queues com prioridades diferentes, apontando para o mesmo compute environment** ✅
> **C)** Array job com índice
> **D)** Aumentar a memória dos jobs críticos
>
> **Por que B**: a prioridade é atributo da **job queue**.

> [!question]- Q5. Uma simulação HPC com MPI precisa abranger 20 nós que se comunicam.
> **A)** Array job de 20
> **B)** **Multi-node parallel job, com cluster placement group e EFA** ✅
> **C)** 20 jobs independentes
> **D)** Lambda com 10 GB
>
> **Por que B**: array job roda cópias **independentes**; MPI exige nós que se comunicam, que é o *multi-node parallel job*.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Batch e EMR fazem o mesmo | EMR é **Spark/Hadoop**; Batch é **qualquer código em container** |
| Batch é para processo contínuo | É para **job que termina**. Contínuo = ECS **service** |
| Array job serve para MPI | Array job roda cópias **independentes**; MPI é **multi-node parallel** |
| Prioridade é do compute environment | É da **job queue** |
| Batch só roda em EC2 | Também em **Fargate** (e Fargate Spot) |
| Spot é arriscado para lote | É o caso de uso **canônico** — com retry na job definition |
| Lambda substitui o Batch | Lambda para em **15 min** e não tem fila com prioridade/dependência |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
