---
tags: [saa-c03, batch, computacao]
servico: AWS Batch
tipo: Processamento em lote gerenciado
dominios: [2, 3, 4]
atualizado: 2026-11-08
---

# AWS Batch — O que é

> [!info] Em uma frase
> Executa **jobs em lote** em escala: você submete o job numa **fila**, e o Batch provisiona a capacidade (EC2, inclusive **Spot**, ou Fargate), roda, e desliga.

## Quando é a resposta

| Enunciado | Batch? |
|---|---|
| "**milhares de jobs** em lote", "processamento noturno" | **Sim** |
| "jobs com **dependências** entre si" | **Sim** |
| "simulação científica, renderização, análise genômica, risco financeiro" | **Sim** |
| "tolerante a interrupção, queremos **Spot**" | **Sim** |
| Processamento curto, orientado a evento | **Lambda** |
| Serviço de longa duração (API, worker contínuo) | **ECS service** / **Fargate** |
| Big data com Spark/Hadoop | **EMR** |
| Orquestrar passos com estado e aprovação | **Step Functions** |

## As peças

| Peça | O que é |
|---|---|
| **Job definition** | O molde do job: imagem, vCPU, memória, retry, role |
| **Job queue** | Onde os jobs esperam, com **prioridade** |
| **Compute environment** | A capacidade: **managed** (o Batch provisiona) ou **unmanaged** |
| **Job** | A execução. Pode ser **array job** (N cópias) ou ter **dependências** |

## O gatilho de custo

O Batch é o serviço onde **Spot** faz mais sentido: job em lote é, por definição, tolerante a interrupção e reiniciável. O guia cita *"AWS Batch"* em **Task 3.2** como opção de compute.

## Links

- [[2 - Resiliencia (26%)/AWS Batch/2 - Decorar|2 - Decorar]] · [[2 - Resiliencia (26%)/AWS Batch/3 - Detalhes|3 - Detalhes]] · [[2 - Resiliencia (26%)/AWS Batch/4 - Questoes|4 - Questoes]]
- [[3 - Performance (24%)/EC2/1 - O que e|EC2]] · [[2 - Resiliencia (26%)/Fargate/1 - O que e|Fargate]] · [[2 - Resiliencia (26%)/Lambda/1 - O que e|Lambda]] · [[3 - Performance (24%)/EMR/1 - O que e|EMR]] · [[2 - Resiliencia (26%)/Step Functions/1 - O que e|Step Functions]] · [[4 - Custo (20%)/Opcoes de compra do EC2 (Spot, RI, Savings Plans)/1 - O que e|Opcoes de compra do EC2 (Spot, RI, Savings Plans)]]
