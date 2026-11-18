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

O SSM *"helps you centrally view, manage, and operate nodes at scale"* (ajuda a visualizar, gerenciar e operar nós em escala, de forma centralizada). Mas só funciona em **managed nodes**, e a definição é precisa:

> *"SSM Agent is installed on the machine and the agent can communicate with the Systems Manager service."* (o SSM Agent está instalado na máquina e consegue se comunicar com o serviço Systems Manager)

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

> *"Session Manager provides secure node management without the need to open inbound ports, maintain bastion hosts, or manage SSH keys."* (o Session Manager oferece gestão segura de nós sem precisar abrir portas de entrada, manter bastion hosts ou gerenciar chaves SSH)

É a resposta para qualquer enunciado que peça acesso administrativo sem porta 22, sem bastion e sem chave.

## Links

- [[1 - Seguranca (30%)/Systems Manager (e Parameter Store)/2 - Decorar|2 - Decorar]] · [[1 - Seguranca (30%)/Systems Manager (e Parameter Store)/3 - Detalhes|3 - Detalhes]] · [[1 - Seguranca (30%)/Systems Manager (e Parameter Store)/4 - Questoes|4 - Questoes]]
- [[1 - Seguranca (30%)/Secrets Manager/1 - O que e|Secrets Manager]] · [[3 - Performance (24%)/EC2/1 - O que e|EC2]] · [[1 - Seguranca (30%)/VPC Endpoints e PrivateLink/1 - O que e|VPC Endpoints e PrivateLink]] · [[1 - Seguranca (30%)/Config/1 - O que e|Config]] · [[1 - Seguranca (30%)/Inspector/1 - O que e|Inspector]]
- [O que é o Systems Manager](https://docs.aws.amazon.com/systems-manager/latest/userguide/what-is-systems-manager.html)
