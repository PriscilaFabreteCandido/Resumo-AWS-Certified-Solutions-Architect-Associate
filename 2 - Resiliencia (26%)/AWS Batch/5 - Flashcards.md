---
servico: AWS Batch
fonte: "[[2 - Resiliencia (26%)/AWS Batch/2 - Decorar|2 - Decorar]]"
---

# AWS Batch — Flashcards

#flashcards/saa-c03/d2-resiliencia/aws-batch

Quais são os quatro componentes do AWS Batch?::**Job definition**, **job queue**, **compute environment** e **job**

O que a job definition do Batch define?::Imagem, **vCPU**, **memória**, retry e **IAM role**

O que a job queue do Batch define e para onde aponta?::Define a **prioridade** e aponta para **1 ou mais compute environments**

Tipo de job do Batch para rodar N cópias do mesmo job com índice?::**Array job**

Como fazer um job do Batch só rodar depois de outro?::Job **com dependências** (`dependsOn`)

Tipo de job do Batch para HPC com MPI em vários nós?::**Multi-node parallel**

Compute environment managed × unmanaged no Batch?::**Managed**: o Batch provisiona e desliga a capacidade. **Unmanaged**: você gerencia o cluster ECS

Opções de capacidade num compute environment do Batch?::**EC2 On-Demand**, **EC2 Spot**, **Fargate** e **Fargate Spot**

Opção de compute do Batch com maior economia?::**EC2 Spot**

Por que não usar Lambda para jobs em lote longos com dependências?::Lambda roda no máximo **15 min** e não tem **fila de jobs com dependência**

ECS run-task × Batch para job pontual: o que falta no run-task?::**Fila**, **prioridade** e **dependências**

Workloads Spark, Hadoop, Hive ou Presto: Batch ou outro serviço?::**EMR**

Padrão comum para orquestrar jobs do Batch com estado e ramificação?::**Step Functions** submete o job com integração **`.sync`** (espera o job terminar)
