---
tags: [saa-c03, fargate, decorar]
servico: AWS Fargate
atualizado: 2026-11-08
---

# Fargate — Decorar

## As opções de capacidade do ECS (nomes oficiais)

| Opção | Quem gerencia as instâncias |
|---|---|
| **AWS Fargate** (serverless) | **A AWS.** *"you don't need to manage servers, handle capacity planning, or isolate container workloads for security"* |
| **Amazon ECS Managed Instances** | A AWS gerencia provisionamento, patch e escala das instâncias EC2 |
| **Amazon EC2 instances** | **Você**: *"You choose the instance type, the number of instances, and manage the capacity"* |
| **Amazon ECS Anywhere** | Seus servidores/VMs **on-premises** |

## Lambda × Fargate × EC2

| | **Lambda** | **Fargate** | **EC2** |
|---|---|---|---|
| Unidade | Função | **Container (task/pod)** | Instância |
| Duração máxima | **15 min** | **Sem limite** | Sem limite |
| Gerencia SO? | Não | **Não** | **Sim** |
| GPU | Não | **Não** | **Sim** |
| Acesso ao host | Não | **Não** | **Sim** |
| Cobrança | Invocação + GB-s | **vCPU e memória da task, por segundo** | Instância por segundo |
| Cold start | Sim | Start de task (segundos) | Boot da instância |

## Rede

| Launch type | Onde a task roda |
|---|---|
| **EC2** | Na subnet **da instância** (definida na criação do cluster) |
| **Fargate** | Subnet definida no `run-task` ou na criação do **service** |

Saída para internet, nos dois casos: subnet pública com **internet gateway**, subnet privada com **NAT gateway**, ou **AWS PrivateLink**.

## Fargate Spot

Existe **Fargate Spot** (capacidade com desconto, interrompível). Use a mesma lógica do Spot em EC2: só para workload **tolerante a interrupção**.

Combinação típica: **capacity provider strategy** misturando `FARGATE` (base garantida) e `FARGATE_SPOT` (excedente barato).

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
