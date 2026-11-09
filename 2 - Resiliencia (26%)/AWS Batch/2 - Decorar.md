---
tags: [saa-c03, batch, decorar]
servico: AWS Batch
atualizado: 2026-11-08
---

# AWS Batch — Decorar

## Os quatro componentes

```
JOB DEFINITION  (imagem, vCPU, memória, retry, IAM role)
       │
       ▼  submit
JOB QUEUE  (prioridade; aponta para 1+ compute environments)
       │
       ▼
COMPUTE ENVIRONMENT  (EC2 On-Demand / EC2 Spot / Fargate / Fargate Spot)
       │
       ▼
JOB  (array job, ou com dependências)
```

## Tipos de job

| Tipo | Para quê |
|---|---|
| **Single** | Um container, uma execução |
| **Array job** | **N cópias** do mesmo job, com índice (processar N arquivos) |
| **Com dependências** | Job B só roda depois do A (`dependsOn`) |
| **Multi-node parallel** | Job que abrange **vários nós** (HPC com MPI) |

## Compute environment

| Tipo | Detalhe |
|---|---|
| **Managed** | O Batch provisiona e desliga a capacidade |
| **Unmanaged** | Você gerencia o cluster ECS |
| **EC2** | Com **Spot** (maior economia) ou On-Demand; pode usar **allocation strategy** |
| **Fargate** | Sem gerenciar instância; e **Fargate Spot** |

## Batch × as alternativas

| Serviço | Natureza |
|---|---|
| **AWS Batch** | **Fila de jobs** com prioridade, dependências e provisionamento automático |
| **Lambda** | Evento, **≤ 15 min**, sem fila de jobs com dependência |
| **ECS service** | Processo **longo e contínuo** (não job que termina) |
| **ECS task** (run-task) | Job pontual, mas **sem** fila, prioridade nem dependências |
| **EMR** | **Spark / Hadoop / Hive / Presto** |
| **Step Functions** | **Orquestra** passos (pode orquestrar jobs do Batch) |

> [!tip] Batch + Step Functions
> Padrão comum: **Step Functions** orquestra o fluxo e submete jobs ao **Batch** com integração `.sync` (espera o job terminar). Isso junta estado/ramificação com execução em lote em escala.

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
