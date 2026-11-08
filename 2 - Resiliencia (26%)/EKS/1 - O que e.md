---
tags: [saa-c03, eks, kubernetes, containers]
servico: Amazon EKS
tipo: Kubernetes gerenciado
dominios: [2, 3]
atualizado: 2026-11-08
---

# Amazon EKS — O que é

> [!info] Em uma frase
> **Kubernetes gerenciado**: a AWS opera o *control plane* (API server, etcd) em várias AZs, e você roda os *worker nodes* em **EC2**, em **Fargate**, ou on-premises (**EKS Anywhere**).

## Quando é a resposta

A palavra **Kubernetes** no enunciado é o gatilho. Mais especificamente:

| Enunciado diz | Por que EKS |
|---|---|
| **Kubernetes**, `kubectl`, Helm, operators, CRDs | É o único que fala Kubernetes |
| **Portabilidade** entre nuvens ou com on-premises | API padrão da indústria |
| A equipe **já tem** manifestos e expertise K8s | Migração sem reescrever |
| Ecossistema CNCF específico (Istio, ArgoCD, Prometheus operator) | Depende de Kubernetes |

Se o enunciado diz apenas "containers na AWS" **com menor esforço operacional**, a resposta é **ECS**.

## As opções de capacidade

| Opção | Quem gerencia |
|---|---|
| **Managed node groups** (EC2) | A AWS provisiona e atualiza o grupo; você escolhe o tipo |
| **Self-managed nodes** (EC2) | **Você** |
| **Fargate** (via *Fargate profiles*) | **A AWS** — sem nó para gerenciar |
| **EKS Anywhere** | Seus servidores **on-premises** |
| **EKS Distro** | A distribuição Kubernetes da AWS, para rodar onde quiser |

## O trade-off central

| | **ECS** | **EKS** |
|---|---|---|
| API | Proprietária AWS | **Kubernetes** |
| Esforço operacional | **Menor** | Maior (versões, add-ons, upgrades) |
| Portabilidade | Baixa | **Alta** |
| Custo do control plane | **Sem cobrança** | **Cobrado por hora por cluster** |

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[ECS]] · [[Fargate]] · [[EC2]] · [[ELB (Load Balancers)]]
