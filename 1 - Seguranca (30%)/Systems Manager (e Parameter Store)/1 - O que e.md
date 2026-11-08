---
tags: [saa-c03, systems-manager, ssm, parameter-store]
servico: AWS Systems Manager
tipo: Gestão de nós e configuração
dominios: [1]
atualizado: 2026-11-08
---

# AWS Systems Manager — O que é

> [!info] Em uma frase
> Conjunto de ferramentas para **gerenciar nós em escala**: acesso sem SSH (**Session Manager**), aplicação de patches (**Patch Manager**), execução de comandos (**Run Command**), automação (**Automation**) e configuração (**Parameter Store**).

## Definição e pré-requisito

O SSM *"helps you centrally view, manage, and operate nodes at scale"*. Mas só funciona em **managed nodes**, e a definição é precisa:

> *"SSM Agent is installed on the machine and the agent can communicate with the Systems Manager service."*

Na prática, isso exige três coisas: **SSM Agent** instalado, **instance profile** com a policy do SSM, e **rota** até o serviço (NAT gateway ou **interface endpoints** do SSM).

## As ferramentas que caem na prova

| Ferramenta | Para quê |
|---|---|
| **Session Manager** | Shell **sem porta aberta, sem bastion, sem chave SSH** |
| **Patch Manager** | Aplicar patches de SO em escala |
| **Run Command** | Executar comando em N instâncias, sem SSH |
| **Parameter Store** | Configuração e secrets simples (tier Standard **grátis**) |
| **Automation** | Runbooks (criar AMI, remediar, aplicar patch) |
| **Inventory / Fleet Manager** | Inventário de software e gestão de nós |

## A frase do Session Manager

> *"Session Manager provides secure node management without the need to open inbound ports, maintain bastion hosts, or manage SSH keys."*

É a resposta para qualquer enunciado que peça acesso administrativo sem porta 22, sem bastion e sem chave.

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[Secrets Manager]] · [[EC2]] · [[VPC Endpoints e PrivateLink]] · [[Config]] · [[Inspector]]
- [O que é o Systems Manager](https://docs.aws.amazon.com/systems-manager/latest/userguide/what-is-systems-manager.html)
