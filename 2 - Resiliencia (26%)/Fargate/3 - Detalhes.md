---
tags: [saa-c03, fargate, detalhes]
servico: AWS Fargate
atualizado: 2026-11-08
---

# Fargate — Detalhes

## 1. O que muda na prática

Num cluster ECS no **EC2**, você convive com três problemas:

1. **Capacidade ociosa** — você dimensiona para o pico, e paga a instância inteira mesmo com tasks pequenas
2. **Patch do SO** — a AMI do ECS precisa ser atualizada e as instâncias substituídas
3. **Bin packing** — encaixar tasks de tamanhos diferentes nas instâncias disponíveis

Com **Fargate**, você declara `cpu` e `memory` na task definition e a AWS entrega exatamente isso. Não há instância para dimensionar, patchear ou encaixar.

O custo é por **vCPU e memória da task, por segundo** — então o desperdício sai da conta de instância e passa a ser o *overprovisioning da própria task*.

## 2. Quando o EC2 ainda ganha

| Requisito | Por que EC2 |
|---|---|
| **GPU** | O Fargate não oferece GPU |
| **Daemon / agente no host** | O Fargate não dá acesso ao host (não há `daemon` scheduling strategy) |
| **Instance store** | Disco local NVMe só em EC2 |
| **Licença por core/socket** | Exige Dedicated Hosts |
| **Carga constante e densa** | Com **Reserved Instances** ou **Savings Plans** e bin packing bom, EC2 pode custar menos |
| **Kernel customizado / privileged** | Fargate restringe |

Vale notar o meio-termo: **ECS Managed Instances** mantém EC2 (com GPU, instance store, escolha de tipo) mas a AWS cuida de provisionamento, patch e escala.

## 3. Fargate no EKS

O Fargate também é capacidade para o **EKS**, via **Fargate profiles** (seletores por namespace e label decidem quais pods vão para Fargate).

Limitações a considerar: um pod por "nó" Fargate, sem DaemonSet, sem privileged, sem GPU. Por isso, clusters EKS frequentemente misturam **managed node groups** (EC2) com **Fargate profiles**.

## 4. Fargate × Lambda — a fronteira

A prova compara os dois quando o enunciado diz "serverless":

| Pista | Resposta |
|---|---|
| Duração > **15 min** | **Fargate** |
| Precisa de **imagem de container** customizada e grande | Fargate (ou Lambda com imagem, até 10 GB) |
| Processo **longo e contínuo** (worker, daemon, servidor) | **Fargate** |
| Orientado a **evento**, curto, esporádico | **Lambda** |
| Já existe um `Dockerfile` e o time quer portabilidade | **Fargate** |
| Carga muito irregular, com longos períodos ociosos | **Lambda** (Fargate cobra enquanto a task roda) |

## 5. Escala

| Mecanismo | Detalhe |
|---|---|
| **Service Auto Scaling** (Application Auto Scaling) | Target tracking em CPU, memória ou `ALBRequestCountPerTarget` |
| **Capacity provider strategy** | Mistura `FARGATE` e `FARGATE_SPOT` com base e peso |
| **Scheduled scaling** | Padrão de calendário |

Para consumidor de fila em Fargate, a métrica certa é a **profundidade da fila** (custom metric), não CPU — mesmo princípio do Auto Scaling de EC2.

## 6. Custo

| Alavanca | Detalhe |
|---|---|
| **Dimensionar a task corretamente** | O desperdício agora é na task, não na instância |
| **Fargate Spot** | Desconto, para workload interrompível |
| **Compute Savings Plans** | **Cobrem Fargate** (e Lambda) — *"regardless of instance family... Also covers Fargate and Lambda usage"* |
| **Graviton** | Fargate suporta arquitetura ARM |
| **EC2 com RI** | Alternativa para carga constante e densa |

> [!tip] Compute Savings Plans cobrem Fargate
> É um ponto que a prova usa: carga de container estável 24/7 pode receber desconto de Savings Plans **sem** voltar para EC2.

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[ECS]] · [[EKS]] · [[Lambda]] · [[Opcoes de compra do EC2 (Spot, RI, Savings Plans)]] · [[SQS]]
