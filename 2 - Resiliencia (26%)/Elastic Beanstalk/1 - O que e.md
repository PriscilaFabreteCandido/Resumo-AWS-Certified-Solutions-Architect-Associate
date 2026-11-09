---
tags: [saa-c03, beanstalk, paas]
servico: AWS Elastic Beanstalk
tipo: Plataforma gerenciada (PaaS)
dominios: [2]
atualizado: 2026-11-08
---

# AWS Elastic Beanstalk — O que é

> [!info] Em uma frase
> Você envia o código; o Beanstalk provisiona e gerencia **EC2, Auto Scaling group, load balancer, health check e deploy** por você — usando CloudFormation por baixo.

## Para que serve na prova

É a resposta quando o enunciado quer **menor esforço operacional** mas a aplicação é **tradicional** (não serverless, não containerizada por escolha):

| Enunciado | Beanstalk? |
|---|---|
| "aplicação web em Java/.NET/Python/Node, queremos focar no código" | **Sim** |
| "migrar app web existente com mínima mudança" | **Sim** |
| "precisamos de controle fino da infraestrutura" | **Não** — EC2/ECS direto |
| "serverless, orientado a evento" | **Não** — Lambda |
| "já usamos containers e Kubernetes" | **Não** — ECS/EKS |

## O que ele cria para você

Um **environment** com: instâncias EC2, **Auto Scaling group**, **Elastic Load Balancer** (em ambiente web server), security groups, health check e o pipeline de deploy.

Você mantém **acesso total** aos recursos criados — diferente de um PaaS fechado.

## Os dois tipos de environment

| Tipo | Para quê |
|---|---|
| **Web server environment** | Atende HTTP, com load balancer |
| **Worker environment** | Processa de uma **fila SQS** (o Beanstalk cria a fila e o daemon) |

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[EC2]] · [[Auto Scaling (EC2)]] · [[ELB (Load Balancers)]] · [[CloudFormation]] · [[ECS]]
