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

- [[2 - Resiliencia (26%)/EKS/2 - Decorar|2 - Decorar]] · [[2 - Resiliencia (26%)/EKS/3 - Detalhes|3 - Detalhes]] · [[2 - Resiliencia (26%)/EKS/4 - Questoes|4 - Questoes]]
- [[2 - Resiliencia (26%)/ECS/1 - O que e|ECS]] · [[2 - Resiliencia (26%)/Fargate/1 - O que e|Fargate]] · [[3 - Performance (24%)/EC2/1 - O que e|EC2]] · [[2 - Resiliencia (26%)/ELB (Load Balancers)/1 - O que e|ELB (Load Balancers)]]
