---
tags: [saa-c03, lambda, serverless]
servico: AWS Lambda
tipo: Função serverless
dominios: [2, 3, 4]
atualizado: 2026-11-08
---

# AWS Lambda — O que é

> [!info] Em uma frase
> Executa código em resposta a um evento, sem servidor para gerenciar. Você paga por invocação e por tempo de execução × memória. Timeout máximo de **15 minutos**.

## Quando é a resposta

| Enunciado diz | Por que Lambda |
|---|---|
| "least operational overhead" + processamento curto | Zero servidor |
| "orientado a evento" (objeto no S3, mensagem na fila, registro no stream) | Integração nativa |
| "carga intermitente / imprevisível" | Paga só o que usa |
| "transformar dado em trânsito" | Firehose, Kinesis, DynamoDB Streams |
| "lógica customizada no API Gateway / ALB" | Target e integração nativos |

## Quando **não** é

| Situação | Alternativa |
|---|---|
| Precisa rodar mais de **15 min** | **Fargate**, **ECS**, **AWS Batch**, **Step Functions** orquestrando |
| Precisa de disco grande ou estado local | **EC2** / **ECS** |
| Precisa de GPU | **EC2** / **ECS** com GPU |
| Carga constante e alta 24/7 | **Fargate/EC2** com Savings Plans pode sair mais barato |
| Precisa de conexão persistente a banco relacional | Lambda + **RDS Proxy** |

## Os três limites que você precisa saber de cor

| Limite | Valor |
|---|---|
| **Timeout** | **900 s (15 min)** |
| **Memória** | **128 MB a 10.240 MB** (**1.769 MB ≈ 1 vCPU**) |
| **Concorrência padrão** | **1.000** por região (ajustável) |

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[Fargate]] · [[Step Functions]] · [[SQS]] · [[API Gateway]] · [[RDS Proxy]]
- [Quotas do Lambda](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html)
