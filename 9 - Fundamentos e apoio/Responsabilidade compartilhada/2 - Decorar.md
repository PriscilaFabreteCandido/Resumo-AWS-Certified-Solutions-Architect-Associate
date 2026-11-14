---
tags: [saa-c03, responsabilidade-compartilhada, decorar]
conceito: Modelo de responsabilidade compartilhada
atualizado: 2026-11-08
---

# Responsabilidade compartilhada — Decorar

## A divisão básica

| **AWS** — segurança **DA** nuvem | **Você** — segurança **NA** nuvem |
|---|---|
| Data centers, energia, refrigeração | **Seus dados** e a classificação deles |
| Hardware e descarte de mídia | **IAM**: usuários, roles, policies |
| Rede física e global | **Configuração** de rede (SG, NACL, route table) |
| **Hipervisor** / virtualização | **Criptografia** (escolher e configurar) |
| Software dos serviços **gerenciados** | **SO e patch** — **quando é EC2** |
| Conformidade da infraestrutura (SOC, PCI, ISO) | Conformidade do **seu** uso |

## A fronteira por serviço

| Serviço | Você patcheia o SO? | Você gerencia o engine? |
|---|---|---|
| **EC2** | **Sim** | — |
| **ECS no EC2** | **Sim** (as instâncias) | — |
| **Fargate** | Não | — |
| **RDS / Aurora** | Não | Não (mas sim usuários e schema) |
| **Lambda** | Não | Não |
| **S3 / DynamoDB** | Não | Não |

Regra: **mais gerenciado = menos responsabilidade sua**.

## As duas formas que a prova usa

**1. "De quem é a tarefa X?"**

| Tarefa | Responsável |
|---|---|
| Patch do **SO em EC2** | **Você** |
| Patch do **hipervisor** | **AWS** |
| Patch do **engine do RDS** | **AWS** |
| Criptografar seus objetos no S3 | **Você** (configurar) |
| Segurança física do data center | **AWS** |
| Descarte seguro de disco | **AWS** |
| Configurar security group | **Você** |
| Gerenciar usuários do banco | **Você** |

**2. "Qual serviço dá menor esforço operacional?"**
→ O que empurra mais responsabilidade para a AWS.

## Quem prova o quê

| Pergunta | Serviço |
|---|---|
| Conformidade **da AWS** (SOC, PCI, ISO) | **AWS Artifact** |
| Conformidade **dos meus recursos** | **AWS Config** |
| Minha **postura** de segurança agregada | **Security Hub** |
| **Evidência** para um framework | **AWS Audit Manager** |

## Links

- [[9 - Fundamentos e apoio/Responsabilidade compartilhada/1 - O que e|1 - O que e]] · [[9 - Fundamentos e apoio/Responsabilidade compartilhada/3 - Detalhes|3 - Detalhes]] · [[9 - Fundamentos e apoio/Responsabilidade compartilhada/4 - Questoes|4 - Questoes]]
