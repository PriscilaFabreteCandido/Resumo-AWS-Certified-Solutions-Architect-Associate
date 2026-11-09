---
tags: [saa-c03, cloudformation, iac]
servico: AWS CloudFormation
tipo: Infrastructure as Code
dominios: [2]
atualizado: 2026-11-08
---

# AWS CloudFormation — O que é

> [!info] Em uma frase
> Descreve a infraestrutura num **template** (YAML/JSON) e a cria, atualiza e **apaga como uma unidade** — a **stack**. O serviço é grátis; você paga só os recursos criados.

## Por que a prova se importa

O whitepaper de DR é explícito: *"you should always deploy using infrastructure as code (IaC)"*. Sem IaC, a estratégia de **backup and restore** não cumpre o RTO — você tem os dados e não tem o ambiente.

E o pilar de **Operational Excellence** do Well-Architected se apoia nisso: ambiente reproduzível, versionado e revisável.

## As peças

| Peça | O que é |
|---|---|
| **Template** | O arquivo (YAML/JSON) com os recursos |
| **Stack** | A instância do template — criar, atualizar, **deletar junto** |
| **Change set** | O "diff" antes de aplicar: o que vai ser criado, alterado ou **substituído** |
| **StackSet** | A mesma stack em **várias contas e regiões** |
| **Nested stack** | Stack dentro de stack (reuso de componentes) |
| **Drift detection** | Detecta mudanças feitas **fora** do CloudFormation |

## Seções de um template

`AWSTemplateFormatVersion` · `Description` · **`Parameters`** (entrada) · `Mappings` · **`Conditions`** · **`Resources`** (a única obrigatória) · **`Outputs`** (exporta valores para outras stacks)

## O fato que mais ajuda em laboratório

**`delete-stack` apaga tudo junto** — NAT gateway, ALB, EIP, volume. É a forma mais segura de fazer lab sem esquecer recurso caro ligado.

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[Disaster Recovery (RPO e RTO)]] · [[Organizations e Control Tower]] · [[Governanca (Artifact, Trusted Advisor, Service Catalog)]]
