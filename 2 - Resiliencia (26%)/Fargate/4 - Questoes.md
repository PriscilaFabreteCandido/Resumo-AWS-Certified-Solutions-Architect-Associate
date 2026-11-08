---
tags: [saa-c03, fargate, questoes]
servico: AWS Fargate
atualizado: 2026-11-08
---

# Fargate — Questões

> [!question]- Q1. Rodar containers em produção com o **menor esforço operacional**, sem gerenciar instâncias, e o time não usa Kubernetes.
> **A)** EKS com managed node groups
> **B)** **ECS com Fargate** ✅
> **C)** ECS no EC2 com Auto Scaling group
> **D)** EC2 com Docker e scripts de deploy
>
> **Por que B**: ECS é o orquestrador mais simples na AWS e o Fargate elimina o gerenciamento de servidor.
> **A errada**: traz o plano de controle Kubernetes para operar, sem que o time precise.
> **C errada**: você volta a gerenciar AMI, patch e capacidade.
> **D errada**: pior esforço operacional possível.

> [!question]- Q2. Uma aplicação de inferência de ML precisa de **GPU** em containers.
> **A)** Fargate com mais vCPU
> **B)** **ECS (ou EKS) no EC2, com instâncias de GPU** ✅
> **C)** Lambda com 10 GB
> **D)** Fargate Spot
>
> **Por que B**: o Fargate **não oferece GPU**.
> **C errada**: Lambda também não tem GPU.

> [!question]- Q3. Um worker processa mensagens de uma fila continuamente, com execuções que levam até 40 minutos.
> **A)** Lambda com event source mapping
> **B)** **Fargate service, escalando pela profundidade da fila** ✅
> **C)** Lambda com provisioned concurrency
> **D)** Step Functions Express
>
> **Por que B**: duração acima dos 15 min do Lambda, e processo contínuo é caso de **service** em Fargate.
> **D errada**: Express dura **5 minutos**.

> [!question]- Q4. Reduzir o custo de um cluster de containers com carga **estável 24/7**, sem voltar para EC2 gerenciado.
> **A)** Fargate Spot para toda a carga
> **B)** **Compute Savings Plans, que cobrem Fargate** ✅
> **C)** Reserved Instances
> **D)** Reduzir a memória das tasks pela metade
>
> **Por que B**: Compute Savings Plans *"covers Fargate and Lambda usage"* — desconto sem mudar a arquitetura.
> **A errada**: Spot não serve para produção que não tolera interrupção (embora uma **parte** da capacidade possa ser Spot).
> **C errada**: RI é para instâncias EC2.
> **D errada**: pode degradar a aplicação.

> [!question]- Q5. Um agente de monitoramento precisa rodar **em cada host** do cluster.
> **A)** Fargate com um service de 1 task
> **B)** **ECS no EC2, com a estratégia `daemon`** ✅
> **C)** Fargate profile no EKS
> **D)** Lambda agendada
>
> **Por que B**: "um por host" exige acesso ao host e a estratégia **daemon**, que o Fargate não oferece.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Fargate é um serviço independente | É **launch type / capacity provider** do **ECS** e do **EKS** |
| Fargate oferece GPU | **Não oferece** |
| Fargate dá acesso ao host | **Não.** Sem daemon, sem privileged, sem instance store |
| Fargate é sempre mais barato que EC2 | Em carga **constante e densa** com RI/Savings Plans, EC2 pode custar menos |
| Savings Plans não cobre container serverless | **Compute Savings Plans cobre Fargate e Lambda** |
| Fargate tem limite de 15 minutos | Isso é o **Lambda**. Fargate não tem limite de duração |
| Fargate só funciona com ECS | Também é capacidade do **EKS** (Fargate profiles) |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
