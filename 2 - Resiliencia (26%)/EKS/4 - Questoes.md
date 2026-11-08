---
tags: [saa-c03, eks, questoes]
servico: Amazon EKS
atualizado: 2026-11-08
---

# EKS — Questões

> [!question]- Q1. A empresa roda Kubernetes no datacenter e quer migrar para a AWS mantendo os manifestos e as ferramentas (Helm, operators).
> **A)** ECS com Fargate
> **B)** **Amazon EKS** ✅
> **C)** EC2 com Docker Compose
> **D)** Lambda com imagens de container
>
> **Por que B**: é o único que fala a **API do Kubernetes** — manifestos e ecossistema funcionam sem reescrever.
> **A errada**: ECS tem modelo próprio (task/service); exigiria converter tudo.

> [!question]- Q2. Como dar a um pod permissão para ler um bucket S3, com menor privilégio?
> **A)** Access key num Secret do Kubernetes
> **B)** Instance profile do nó com permissão no bucket
> **C)** **IRSA: associar uma IAM role ao service account do pod** ✅
> **D)** Task role
>
> **Por que C**: o IRSA entrega credencial temporária **por pod**, via STS.
> **B errada**: funciona, mas dá a permissão a **todos** os pods daquele nó.
> **A errada**: credencial de longo prazo dentro do cluster.
> **D errada**: **task role** é vocabulário do **ECS**.

> [!question]- Q3. Um cluster EKS cresceu e os pods novos ficam `Pending` com erro de alocação de IP.
> **A)** Aumentar o tamanho das instâncias
> **B)** **O VPC CNI dá um IP da VPC a cada pod: a subnet esgotou — use subnets maiores/dedicadas, prefix delegation, ou Fargate** ✅
> **C)** Habilitar o Cluster Autoscaler
> **D)** Reduzir o número de réplicas
>
> **Por que B**: é a consequência de design do VPC CNI, e a causa mais comum de `Pending` em cluster grande.
> **C errada**: mais nós não criam IPs se a subnet está cheia.

> [!question]- Q4. Um agente de coleta de logs precisa rodar em **todos** os nós do cluster, que hoje usa apenas Fargate.
> **A)** DaemonSet no Fargate
> **B)** **Adicionar um managed node group (EC2) — o Fargate não suporta DaemonSet** ✅
> **C)** CronJob
> **D)** Sidecar em cada pod
>
> **Por que B**: o Fargate no EKS **não suporta DaemonSet**.
> **D errada**: é a alternativa real em Fargate (sidecar por pod), mas o enunciado pede *"em todos os nós"* — o que só faz sentido com nós EC2.

> [!question]- Q5. Containers na AWS, com o menor esforço operacional, e o time **não** conhece Kubernetes.
> **A)** EKS com Fargate profiles
> **B)** **ECS com Fargate** ✅
> **C)** EKS Anywhere
> **D)** EKS com managed node groups
>
> **Por que B**: o EKS adiciona o ciclo de vida do Kubernetes (versões, add-ons, upgrades) sem que o time precise disso.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| EKS é sempre melhor que ECS | EKS traz Kubernetes — mais poder e **mais esforço operacional** |
| O control plane do EKS é grátis | É **cobrado por hora, por cluster** (o do ECS não é) |
| Fargate no EKS é igual ao Fargate no ECS | No EKS: **1 pod por nó**, **sem DaemonSet**, sem privileged, **sem GPU** |
| Pods não consomem IP da VPC | Com **VPC CNI**, **cada pod** consome um IP da subnet |
| Instance profile do nó é a forma correta de dar IAM a pod | É **IRSA** |
| "task role" existe no EKS | É vocabulário do **ECS**; no EKS é **IRSA** |
| EKS Anywhere roda na AWS | Roda **on-premises** |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
