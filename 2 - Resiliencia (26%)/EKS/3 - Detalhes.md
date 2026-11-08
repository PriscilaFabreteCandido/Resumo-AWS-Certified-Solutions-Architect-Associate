---
tags: [saa-c03, eks, detalhes]
servico: Amazon EKS
atualizado: 2026-11-08
---

# EKS — Detalhes

## 1. O que a AWS gerencia, e o que fica com você

**A AWS gerencia** o *control plane*: API server, etcd, scheduler e controller manager, replicados em **múltiplas AZs**, com patch e disponibilidade.

**Você gerencia**: os *worker nodes* (a menos que use Fargate), a versão do Kubernetes (upgrades são seus, em janelas), os **add-ons** (VPC CNI, CoreDNS, kube-proxy), os manifestos, e o ecossistema que instalar.

É aí que está o custo operacional do EKS em relação ao ECS: o Kubernetes tem **ciclo de versões próprio**, e manter um cluster atualizado é trabalho recorrente.

## 2. Rede — o detalhe que mais surpreende

O **VPC CNI** dá a cada **pod** um **IP da VPC**. Vantagem: o pod é um cidadão de primeira classe na rede (security group, flow logs, roteamento direto). Custo: **consumo de IPs**.

Um cluster com 500 pods consome 500 IPs da subnet, mais os IPs dos nós e os reservados pela AWS (**5 por subnet**). Planejar CIDR estreito é um erro difícil de reverter — lembre que subnet vai de **/28 a /16**, e um `/28` dá **11** IPs utilizáveis.

Mitigações: subnets dedicadas e amplas para pods, *prefix delegation* no CNI, ou **Fargate** (que não consome IP de nó da mesma forma).

## 3. IRSA — IAM para pods

**IAM Roles for Service Accounts** associa uma **IAM role** a um *service account* do Kubernetes. O pod que usa aquele service account recebe credencial temporária via **STS** (`AssumeRoleWithWebIdentity`, com o OIDC provider do cluster).

É o equivalente da **task role** do ECS, e a resposta correta para "como dar permissão AWS a um pod":

| Abordagem | Avaliação |
|---|---|
| Access key em secret do K8s | **Errado** — credencial de longo prazo |
| **Instance profile do nó** | Funciona, mas dá a permissão a **todos** os pods do nó |
| **IRSA** | **Correto** — menor privilégio por pod |

## 4. Load balancing

O **AWS Load Balancer Controller** traduz objetos Kubernetes em recursos AWS:

| Objeto K8s | Recurso AWS |
|---|---|
| **Ingress** | **ALB** (roteamento por host/path, WAF, TLS do ACM) |
| **Service** type `LoadBalancer` | **NLB** (camada 4, IP estático) |

Com `targetType: ip` (VPC CNI), o tráfego vai direto do LB para o **pod**, sem passar pelo `kube-proxy` do nó.

## 5. Escala

| Camada | Mecanismo |
|---|---|
| **Pods** | HPA (Horizontal Pod Autoscaler), por CPU/memória/custom metric |
| **Nós** | **Cluster Autoscaler** (reativo, por ASG) ou **Karpenter** (provisiona o tipo de instância que serve, mais rápido e mais eficiente) |
| **Serverless** | **Fargate profiles** — sem nó para escalar |

## 6. Fargate no EKS — e seus limites

Os **Fargate profiles** usam seletores (namespace + labels) para decidir quais pods rodam em Fargate. Limitações que a prova usa:

- **Um pod por "nó"** Fargate
- **Sem DaemonSet** (agentes de log e monitoramento precisam ser sidecar)
- **Sem privileged**, **sem GPU**
- Sem acesso a instance store

Daí o padrão híbrido: cargas regulares em **Fargate**, cargas que precisam de GPU/daemon/instance store em **managed node groups**.

## 7. ECS ou EKS — como a prova decide

| Enunciado | Resposta |
|---|---|
| "containers na AWS" + **menor esforço operacional** | **ECS** (+ Fargate) |
| **"Kubernetes"** mencionado explicitamente | **EKS** |
| "migrar nossos manifestos K8s do datacenter" | **EKS** |
| "evitar lock-in", "portabilidade entre nuvens" | **EKS** |
| "o time não tem experiência com Kubernetes" | **ECS** |
| "rodar Kubernetes **on-premises** com suporte AWS" | **EKS Anywhere** |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[ECS]] · [[Fargate]] · [[ELB (Load Balancers)]] · [[VPC]] · [[IAM]] · [[STS]]
