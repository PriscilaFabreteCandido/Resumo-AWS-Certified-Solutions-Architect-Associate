---
tags: [saa-c03, lambda, decorar]
servico: AWS Lambda
atualizado: 2026-11-08
---

# Lambda — Decorar

## A tabela de limites

| Item | Valor |
|---|---|
| **Memória** | **128 MB a 10.240 MB**, em passos de 1 MB |
| **vCPU** | **1.769 MB ≈ 1 vCPU** |
| **Timeout** | **900 s (15 min)** |
| **`/tmp`** | **512 MB a 10.240 MB** |
| **Pacote .zip** | **50 MB** comprimido · **250 MB** descomprimido (inclui layers) |
| **Imagem de container** | **10 GB** |
| **Payload síncrono** | **6 MB** request **e** 6 MB response |
| **Payload assíncrono** | **1 MB** |
| **Response streaming** | **200 MB** |
| **Layers** | **5** por função |
| **Variáveis de ambiente** | **4 KB** no total |
| **Resource policy** | 20 KB |
| **Concorrência padrão** | **1.000** por região — *"can be increased up to: Tens of thousands"* |
| **Velocidade de escala** | **1.000** ambientes a cada **10 s**, por função |
| **ENIs por VPC** | 3.000 (compartilhado com outros serviços) |

## Reserved × provisioned concurrency

| | **Reserved** | **Provisioned** |
|---|---|---|
| O que faz | *"sets both the maximum and minimum number of concurrent instances"* | *"the number of pre-initialized execution environments"* |
| Custo | *"incurs no additional charges"* | *"incurs additional charges"* |
| Resolve | **Cota garantida** e **estrangulamento** (valor **0** desliga a função) | **Cold start** — *"double-digit millisecond response times"* |
| Limite | Até *"Unreserved account concurrency value minus 100"* | — |

> [!warning] A troca mais comum da prova
> **Cold start → provisioned.** **Garantir/limitar cota → reserved.**

## Tipos de invocação

| Tipo | Quem | Payload | Retry |
|---|---|---|---|
| **Síncrona** | API Gateway, ALB, SDK direto | **6 MB** | Do chamador |
| **Assíncrona** | SNS, EventBridge, S3 | **1 MB** | **2 retries** + DLQ / destination |
| **Event source mapping** (poll) | SQS, Kinesis, DynamoDB Streams, MSK | — | Conforme o serviço |

## Comparação citada na doc

> *"API Gateway has a default throttle limit of 10,000 requests per second, whereas Lambda has a default concurrency limit of 1,000."*

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[02 - Numeros para decorar]]
