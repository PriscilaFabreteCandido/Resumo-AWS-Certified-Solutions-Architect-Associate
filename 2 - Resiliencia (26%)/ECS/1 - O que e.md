---
tags: [saa-c03, ecs, containers]
servico: Amazon ECS
tipo: Orquestração de containers
dominios: [2, 3, 4]
atualizado: 2026-11-08
---

# Amazon ECS — O que é

> [!info] Em uma frase
> *"fully managed container orchestration service"* (serviço totalmente gerenciado de orquestração de contêineres) da AWS: você descreve a aplicação numa **task definition** e o ECS a roda num **cluster**, sobre **Fargate** (serverless) ou **EC2** (você gerencia).

## O vocabulário (definições oficiais)

| Termo | Definição |
|---|---|
| **Task definition** | *"The blueprint for the application"* (a planta da aplicação) — JSON com imagem, portas, volumes, parâmetros |
| **Cluster** | *"The infrastructure your application runs on"* (a infraestrutura em que sua aplicação roda) |
| **Task** | *"An application such as a batch job that performs work, and then stops"* (uma aplicação como um job em lote, que faz o trabalho e depois para) |
| **Service** | *"A long running stateless application"* (uma aplicação sem estado, de execução longa) — o scheduler mantém o *desired count*, substituindo tasks que falham |
| **Capacity provider** | Liga o service à capacidade (Fargate, Fargate Spot, ASG de EC2) |

## As opções de capacidade

| Opção | Quem gerencia as instâncias |
|---|---|
| **AWS Fargate** | **A AWS** — *"you don't need to manage servers, handle capacity planning, or isolate container workloads for security"* (você não precisa gerenciar servidores, planejar capacidade nem isolar cargas de contêiner por segurança) |
| **ECS Managed Instances** | A AWS gerencia provisionamento, patch e escala das EC2 |
| **Amazon EC2 instances** | **Você** — *"You choose the instance type, the number of instances, and manage the capacity"* (você escolhe o tipo de instância, a quantidade, e gerencia a capacidade) |
| **ECS Anywhere** | Seus servidores/VMs **on-premises** |

## ECS × EKS — o divisor

| Enunciado diz | Resposta |
|---|---|
| "container na AWS", sem mais contexto, **menor esforço operacional** | **ECS** |
| **Kubernetes**, Helm, operators, CRDs | **EKS** |
| **Portabilidade** entre nuvens ou com on-premises | **EKS** |
| "sem gerenciar servidor" (em qualquer um dos dois) | **Fargate** |

## Links

- [[2 - Resiliencia (26%)/ECS/2 - Decorar|2 - Decorar]] · [[2 - Resiliencia (26%)/ECS/3 - Detalhes|3 - Detalhes]] · [[2 - Resiliencia (26%)/ECS/4 - Questoes|4 - Questoes]]
- [[2 - Resiliencia (26%)/Fargate/1 - O que e|Fargate]] · [[2 - Resiliencia (26%)/EKS/1 - O que e|EKS]] · [[2 - Resiliencia (26%)/ELB (Load Balancers)/1 - O que e|ELB (Load Balancers)]] · [[2 - Resiliencia (26%)/Lambda/1 - O que e|Lambda]]
- [O que é o Amazon ECS](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html)
