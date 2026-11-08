---
tags: [saa-c03, ecs, decorar]
servico: Amazon ECS
atualizado: 2026-11-08
---

# ECS — Decorar

## Task × Service

| | **Task** | **Service** |
|---|---|---|
| Natureza | *"performs work, and then stops"* | *"A long running stateless application"* |
| Scheduler | Roda uma vez | Mantém o **desired count**, substitui o que falha |
| Integra com ELB | Não | **Sim** (target group) |
| Auto scaling | Não | **Sim** (Service Auto Scaling) |
| Use para | Job em lote, migração, tarefa pontual | API, worker, site |

## EC2 × Fargate — quem faz o quê

| | **EC2** | **Fargate** |
|---|---|---|
| Escolher tipo de instância | **Você** | — |
| Patch do SO / AMI | **Você** | **AWS** |
| Dimensionar o cluster | **Você** | — |
| Declarar vCPU e memória | Da task, dentro da instância | **Da task** (é o que você paga) |
| **GPU** | **Sim** | **Não** |
| **Instance store** | **Sim** | **Não** |
| Estratégia **daemon** (1 por host) | **Sim** | **Não** |
| Cobrança | Instância por segundo | **vCPU e memória da task, por segundo** |

## Rede

| Launch type | Subnet da task |
|---|---|
| **EC2** | A subnet **da instância** (definida na criação do cluster) |
| **Fargate** | Definida no `run-task` ou na criação do **service** |

Saída para internet: subnet pública com **internet gateway** · subnet privada com **NAT gateway** · **AWS PrivateLink**.

## Fatos que caem

| Item | Detalhe |
|---|---|
| **Fargate Spot** | Capacidade com desconto, interrompível |
| **Capacity provider strategy** | Mistura `FARGATE` (base) e `FARGATE_SPOT` (excedente) |
| **Compute Savings Plans** | **Cobrem Fargate** |
| **Service Auto Scaling** | Target tracking em CPU, memória ou `ALBRequestCountPerTarget` |
| **IAM** | **Task role** (o que o container pode chamar) × **task execution role** (puxar imagem do ECR, escrever log) |
| Registro de imagem | **Amazon ECR** |

> [!tip] Task role × task execution role
> **Task role** = permissão **da sua aplicação** (ler um bucket, gravar no DynamoDB).
> **Task execution role** = permissão **do agente ECS** (baixar a imagem do ECR, enviar logs ao CloudWatch).
> Confundir as duas é erro clássico de troubleshooting.

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
