---
tags: [saa-c03, compute-optimizer, decorar]
servico: AWS Compute Optimizer
atualizado: 2026-11-08
---

# Compute Optimizer — Decorar

## Os números

| Item | Valor |
|---|---|
| Janela de análise padrão | **14 dias** |
| Com **enhanced infrastructure metrics** | **93 dias** |
| O que faz | **Recomenda** (não aplica) |

## O que ele analisa

**Instâncias EC2** · **Auto Scaling groups** · **volumes EBS** · **funções Lambda** · **serviços ECS no Fargate** · (e outros recursos, conforme a evolução do serviço)

E identifica **recursos ociosos**, além de recomendar tamanho.

## Quem faz o quê — a tabela de custo

| Pergunta | Serviço |
|---|---|
| "A instância está do tamanho certo?" | **Compute Optimizer** |
| "Quanto gastei? Quanto vou gastar?" | **Cost Explorer** (13 meses de histórico, 18 de forecast) |
| "Me avise ao passar de US$ X" | **AWS Budgets** |
| "Dado bruto para Athena/Quick" | **CUR** |
| "Checagens amplas de custo, segurança, performance, tolerância a falha, limites" | **Trusted Advisor** |
| "Aumentar uma quota" | **Service Quotas** |
| "Quanto cada time gastou?" | **Cost allocation tags** (ativadas no Billing) |

## A distinção com o Trusted Advisor

| | **Compute Optimizer** | **Trusted Advisor** |
|---|---|---|
| Escopo | **Rightsizing** por métricas de utilização | **5 pilares**: custo, performance, segurança, tolerância a falha, limites |
| Base | Métricas do CloudWatch (14 ou 93 dias) | Checagens pré-definidas |
| Profundidade no sizing | **Alta** (recomenda tipo específico) | Sinaliza instância ociosa |
| Plano de suporte | Disponível | Checagens completas exigem **Business/Enterprise** |

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
