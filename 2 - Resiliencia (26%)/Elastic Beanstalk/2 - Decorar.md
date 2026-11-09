---
tags: [saa-c03, beanstalk, decorar]
servico: AWS Elastic Beanstalk
atualizado: 2026-11-08
---

# Elastic Beanstalk — Decorar

## As políticas de deploy (tabela de decisão)

| Política | Downtime | Custo extra | Rollback |
|---|---|---|---|
| **All at once** | **Sim** | Nenhum | Redeploy (lento) |
| **Rolling** | Não (capacidade reduzida) | Nenhum | Redeploy |
| **Rolling with additional batch** | Não (**capacidade mantida**) | Instâncias extras temporárias | Redeploy |
| **Immutable** | **Não** | **Fleet nova temporária** | **Rápido** (descarta a nova) |
| **Traffic splitting** | Não | Fleet nova temporária | **Rápido**, com **canary** |
| **Blue/green** (manual, via swap de CNAME) | **Não** | **Ambiente duplicado** | **Instantâneo** (swap de volta) |

> [!tip] A regra de prova
> **"Zero downtime" + "rollback rápido"** → **Immutable** (ou **blue/green** com swap de CNAME).
> **"Menor custo, aceita indisponibilidade"** → **All at once**.
> **"Canary / porcentagem de tráfego"** → **Traffic splitting**.

## Blue/green no Beanstalk

Não é uma política de deploy: é um **procedimento**. Você cria um **ambiente novo** (green), valida, e faz **swap de CNAME** entre os dois. Rollback = swap de volta.

## Configuração

| Mecanismo | O que faz |
|---|---|
| **`.ebextensions`** | Arquivos `.config` (YAML/JSON) no código, para customizar recursos e opções |
| **Saved configuration** | Salva o conjunto de opções do environment |
| **Platform** | Java, .NET, PHP, Node.js, Python, Ruby, Go, **Docker** |

## Fatos

| Item | Detalhe |
|---|---|
| Custo do serviço | **Grátis** — paga só os recursos (EC2, ELB, etc.) |
| Por baixo | Usa **CloudFormation** |
| Acesso aos recursos | **Total** (você pode entrar nas instâncias) |
| Banco de dados | Pode ser criado **dentro** do environment (⚠️ apagado com ele) ou **fora** (recomendado para produção) |

> [!warning] RDS dentro do environment
> Se o RDS é criado **pelo** environment, apagar o environment **apaga o banco**. Em produção, crie o RDS **fora** e passe o endpoint por variável de ambiente.

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
