---
tags: [saa-c03, batch, detalhes]
servico: AWS Batch
atualizado: 2026-11-08
---

# AWS Batch — Detalhes

## 1. O que ele resolve

Rodar 10.000 jobs em lote exige responder: quantas instâncias subir, de que tipo, quando desligar, o que fazer quando um job falha, como respeitar prioridade e dependência.

O AWS Batch responde tudo isso: você submete à **fila**, ele dimensiona o **compute environment**, roda, aplica **retry**, e **desliga** a capacidade quando a fila esvazia.

Sem Batch, você construiria isso com ASG + SQS + lógica própria de orquestração.

## 2. Spot — onde o Batch brilha

Job em lote é o caso de uso canônico do **Spot**: a doc do EC2 lista *"data analysis, batch jobs, background processing, and optional tasks"* como workloads adequados.

O compute environment pode ser **EC2 Spot** ou **Fargate Spot**, com **allocation strategy** (prefira **price capacity optimized**, a recomendada; evite `lowest-price`, marcada *"(not recommended)"*).

Se um job é interrompido, o Batch pode **retentar** automaticamente conforme a job definition. Combine com **Capacity Rebalancing** para substituir antes da interrupção.

Padrão de economia: fila com **dois** compute environments — Spot primeiro (ordem de preferência), On-Demand como fallback.

## 3. Array jobs e dependências

**Array job** submete N cópias do mesmo job, cada uma recebendo um **índice** (`AWS_BATCH_JOB_ARRAY_INDEX`). É como você processa 100.000 arquivos: um array job de 100.000, e cada cópia pega o arquivo correspondente ao índice.

**Dependências** (`dependsOn`) criam o grafo: *preparar dados* → *processar (array de 1.000)* → *agregar resultados*. O Batch respeita a ordem.

**Multi-node parallel** job abrange vários nós que se comunicam (MPI) — para HPC. Combina com **cluster placement group** e **EFA**.

## 4. Filas e prioridade

Uma **job queue** tem **prioridade** e aponta para um ou mais compute environments, em ordem de preferência.

Padrão de prova: duas filas no mesmo compute environment — `alta-prioridade` e `baixa-prioridade`. Jobs críticos entram na primeira e são agendados antes.

## 5. Armazenamento e dados

| Necessidade | Solução |
|---|---|
| Entrada e saída de dados | **S3** (o job baixa, processa, sobe) |
| Scratch local de alta performance | **instance store** (EC2) |
| Sistema de arquivos compartilhado | **EFS** ou **FSx for Lustre** |
| Dataset grande ligado ao S3, throughput de HPC | **FSx for Lustre** com bucket vinculado |

## 6. Batch × EMR — a confusão

| | **AWS Batch** | **Amazon EMR** |
|---|---|---|
| Unidade | **Container / job** | **Cluster** com frameworks |
| Frameworks | Qualquer código em container | **Hadoop, Spark, Hive, Presto, HBase** |
| Use quando | Código próprio, jobs independentes ou com dependências | Precisa de **Spark/Hadoop** |

Se o enunciado nomeia **Spark** ou **Hadoop**, é **EMR**. Se é "nosso código em container, milhares de execuções", é **Batch**.

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[EC2]] · [[Fargate]] · [[EMR]] · [[Step Functions]] · [[FSx]] · [[S3]] · [[Opcoes de compra do EC2 (Spot, RI, Savings Plans)]]
