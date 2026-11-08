---
tags: [saa-c03, eks, decorar]
servico: Amazon EKS
atualizado: 2026-11-08
---

# EKS — Decorar

## ECS × EKS (a tabela de decisão)

| Critério | **ECS** | **EKS** |
|---|---|---|
| API / modelo | Proprietária AWS (task, service) | **Kubernetes** (pod, deployment, service) |
| Control plane | **Grátis** | **Cobrado por hora, por cluster** |
| Esforço operacional | **Menor** | Maior: versões do K8s, add-ons, upgrades |
| Portabilidade | Baixa | **Alta** (multi-nuvem, on-premises) |
| Capacidade serverless | **Fargate** | **Fargate** (via Fargate profiles) |
| Gatilho no enunciado | "containers", "menor esforço operacional" | **"Kubernetes"**, "portabilidade", Helm, operators |

## Capacidade no EKS

| Opção | Detalhe |
|---|---|
| **Managed node groups** | A AWS provisiona e faz upgrade do ASG de EC2 |
| **Self-managed nodes** | Você cuida de tudo |
| **Fargate profiles** | Seletores por **namespace** e **label** decidem quais pods vão para Fargate |
| **EKS Anywhere** | On-premises, com plano de controle local |
| **EKS Distro** | Distribuição K8s da AWS, autogerenciada |

## Limitações do Fargate no EKS (caem em prova)

- **Um pod por "nó"** Fargate
- **Sem DaemonSet**
- **Sem privileged**
- **Sem GPU**

Por isso clusters EKS reais frequentemente **misturam** managed node groups (EC2) com Fargate profiles.

## Integrações AWS que a prova menciona

| Integração | Para quê |
|---|---|
| **AWS Load Balancer Controller** | Cria **ALB** (Ingress) e **NLB** (Service type LoadBalancer) |
| **IRSA** (IAM Roles for Service Accounts) | Dá **IAM role a um pod** — o equivalente da task role do ECS |
| **VPC CNI** | Cada pod recebe **IP da VPC** (consome IPs da subnet) |
| **EBS / EFS CSI drivers** | Volumes persistentes |
| **ECR** | Registro de imagens |
| **Cluster Autoscaler / Karpenter** | Escala os nós |

> [!warning] O VPC CNI consome IPs da subnet
> Cada pod ganha um IP da VPC. Em cluster grande, isso **esgota a subnet** — razão para planejar CIDR amplo (um `/28` dá 11 IPs utilizáveis).

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
