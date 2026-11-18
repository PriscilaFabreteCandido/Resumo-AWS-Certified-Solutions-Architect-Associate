---
tags: [saa-c03, responsabilidade-compartilhada, fundamentos]
conceito: Modelo de responsabilidade compartilhada
dominios: [1]
atualizado: 2026-11-08
---

# Responsabilidade compartilhada — O que é

> [!info] Em uma frase
> A AWS é responsável pela segurança **DA** nuvem (infraestrutura física, hipervisor, rede, software dos serviços gerenciados); você é responsável pela segurança **NA** nuvem (seus dados, IAM, configuração, e o SO quando é EC2).

## A citação oficial

O pilar de Segurança do Well-Architected:

> *"The AWS Shared Responsibility Model helps organizations that adopt the cloud to achieve their security and compliance goals. Because AWS physically secures the infrastructure that supports our cloud services, as an AWS customer you can focus on using services to accomplish your goals."*

> [!note] Sobre a frase "security OF the cloud / IN the cloud"
> É a formulação consagrada do modelo, mas **não aparece** nas páginas de documentação que conferi. Use-a como mnemônico, não como citação.

## O guia cita nominalmente

**Task 1.1**, no Knowledge of: *"The AWS shared responsibility model"*.

## A fronteira **se move** com o serviço

É o ponto que a prova realmente testa:

| Serviço | Quem patcheia o SO | Quem gerencia o engine | Você cuida de |
|---|---|---|---|
| **EC2** | **Você** | — | SO, aplicação, dados, IAM, rede |
| **RDS** | **AWS** | **AWS** | Usuários, schema, parameter group, criptografia, dados |
| **Lambda / S3 / DynamoDB** | **AWS** | **AWS** | **Dados, IAM, configuração** |

Quanto mais gerenciado o serviço, **menos** cabe a você — e é por isso que *"least operational overhead"* (menor esforço operacional) é, no fundo, "empurre a fronteira para a AWS".

## Links

- [[9 - Fundamentos e apoio/Responsabilidade compartilhada/2 - Decorar|2 - Decorar]] · [[9 - Fundamentos e apoio/Responsabilidade compartilhada/3 - Detalhes|3 - Detalhes]] · [[9 - Fundamentos e apoio/Responsabilidade compartilhada/4 - Questoes|4 - Questoes]]
- [[9 - Fundamentos e apoio/Well-Architected Framework/1 - O que e|Well-Architected Framework]] · [[1 - Seguranca (30%)/Governanca (Artifact, Trusted Advisor, Service Catalog)/1 - O que e|Governanca (Artifact, Trusted Advisor, Service Catalog)]] · [[1 - Seguranca (30%)/IAM/1 - O que e|IAM]]
