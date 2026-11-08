---
tags: [saa-c03, lambda, detalhes]
servico: AWS Lambda
atualizado: 2026-11-08
---

# Lambda — Detalhes

## 1. Memória, CPU e custo — a relação contraintuitiva

Você configura **só memória** (128 MB a 10.240 MB); a CPU vem proporcional, e **1.769 MB ≈ 1 vCPU**.

Consequência que a prova explora: **mais memória pode custar menos**. Uma função CPU-bound com 512 MB que leva 10 s pode levar 2 s com 2.048 MB. O custo é `memória × tempo`, então 2.048 × 2 pode ser menor que 512 × 10 — e a latência cai 5×.

O guia pede isso literalmente em **Task 3.2**: *"Selecting the appropriate resource type and size (for example, the amount of Lambda memory) to meet business requirements."*

## 2. Concorrência — reserved × provisioned

**Reserved concurrency** *"sets both the maximum and minimum number of concurrent instances"* e *"incurs no additional charges"*. Dois usos:

- **Garantir cota**: reservar 200 para a função crítica, para que outras funções não consumam toda a cota da conta
- **Estrangular**: reserved = **0** desliga a função; um valor baixo protege um backend frágil (um RDS, uma API de terceiro com rate limit)

Você pode reservar até *"Unreserved account concurrency value minus 100"* — a AWS mantém 100 de folga.

**Provisioned concurrency** *"the number of pre-initialized execution environments... designed to make functions available with double-digit millisecond response times"* e *"incurs additional charges"*. É o remédio para **cold start** em carga interativa.

A doc nota que *"asynchronous workloads usually do not need it"* — processamento em background tolera o cold start.

## 3. Cold start — o que realmente ajuda

| Medida | Efeito |
|---|---|
| **Provisioned concurrency** | Elimina o cold start nos ambientes pré-aquecidos |
| **Mais memória** | Inicialização mais rápida (mais CPU) |
| **Pacote menor** | Menos tempo para baixar e descompactar |
| **Evitar VPC desnecessária** | Historicamente o maior custo; hoje muito reduzido, mas ainda há setup de ENI |
| **Inicializar fora do handler** | Conexões e SDK no escopo global são reaproveitados entre invocações |
| **Reserved concurrency** | **Não ajuda** — é a troca errada da prova |

## 4. Lambda em VPC

Para alcançar recursos privados (RDS, ElastiCache, serviço interno), a função roda com ENIs na sua VPC. Implicações:

- Consome **ENIs da VPC** (quota de 3.000, compartilhada)
- A função **perde** acesso à internet, a menos que haja **NAT gateway** (ou interface endpoints para serviços AWS)
- Para alcançar S3/DynamoDB sem NAT: **gateway endpoint** (grátis)

⚠️ Combinação clássica: **Lambda em VPC + RDS Proxy**, para não esgotar as conexões do banco.

## 5. Event source mapping

Para fontes de **poll** (SQS, Kinesis, DynamoDB Streams, MSK, Amazon MQ), o Lambda mantém um *event source mapping* que lê e invoca em lote:

| Fonte | Comportamento |
|---|---|
| **SQS** | Escala conforme a profundidade da fila; respeita o visibility timeout (que deve ser ≥ timeout da função) |
| **Kinesis / DynamoDB Streams** | Um processador por shard (ou mais, com paralelização); mantém **ordem** por shard |
| **MSK / Amazon MQ** | Consome tópicos/filas |

⚠️ Com SQS, o **visibility timeout da fila** deve ser maior que o **timeout da função** — senão a mensagem reaparece e é processada em duplicidade.

## 6. Tratamento de erro

| Invocação | Retry | Destino de falha |
|---|---|---|
| **Síncrona** | Nenhum (o chamador decide) | — |
| **Assíncrona** | **2 retries** automáticos | **DLQ** ou **destination** (SQS, SNS, Lambda, EventBridge) |
| **Stream** (Kinesis/DynamoDB) | Até o registro expirar ou o retry acabar | `on-failure destination`; `bisect on function error` para isolar o registro ruim |

## 7. Versionamento

**Versions** são imutáveis; **aliases** apontam para versões e suportam **weighted routing** (canary: 90% na versão 1, 10% na versão 2). É o mecanismo de deploy gradual de função.

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[SQS]] · [[API Gateway]] · [[Step Functions]] · [[RDS Proxy]] · [[VPC Endpoints e PrivateLink]] · [[Fargate]]
- [Concorrência](https://docs.aws.amazon.com/lambda/latest/dg/configuration-concurrency.html)
