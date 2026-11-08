---
tags: [saa-c03, fargate, containers, serverless]
servico: AWS Fargate
tipo: Compute serverless para containers
dominios: [2, 3, 4]
atualizado: 2026-11-08
---

# AWS Fargate — O que é

> [!info] Em uma frase
> Capacidade **serverless para containers**: você roda tasks do **ECS** ou pods do **EKS** sem provisionar, patchear ou dimensionar instâncias EC2.

## O que ele elimina

A doc do ECS descreve o Fargate como: *"pay-as-you-go... you don't need to manage servers, handle capacity planning, or isolate container workloads for security."*

| Com EC2 | Com Fargate |
|---|---|
| Você escolhe o tipo e a quantidade de instâncias | Você declara **vCPU e memória da task** |
| Você patcheia o SO e a AMI | A AWS cuida |
| Você dimensiona o cluster (e sobra capacidade ociosa) | Paga só o que a task consome |
| Você isola workloads | *"isolate container workloads for security"* vem pronto |

## Fargate não é um serviço separado

É um **launch type / capacity provider** do **ECS** e do **EKS**. Você não "usa Fargate" sozinho — você roda ECS **no** Fargate ou EKS **no** Fargate.

## Quando NÃO usar Fargate

| Necessidade | Use **EC2** |
|---|---|
| **GPU** | Sim |
| Acesso ao **host** (daemon, agente, kernel module) | Sim |
| Tipo de instância específico, ou licença por core | Sim |
| **Instance store** / disco local de alta performance | Sim |
| Densidade alta e carga constante, com RI/Savings Plans | Pode sair mais barato |

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[ECS]] · [[EKS]] · [[Lambda]] · [[Opcoes de compra do EC2 (Spot, RI, Savings Plans)]]
- [Launch types do ECS](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/launch_types.html)
