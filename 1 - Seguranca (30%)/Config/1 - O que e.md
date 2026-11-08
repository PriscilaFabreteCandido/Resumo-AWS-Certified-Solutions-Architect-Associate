---
tags: [saa-c03, config, conformidade]
servico: AWS Config
tipo: Configuração e conformidade
dominios: [1]
atualizado: 2026-11-08
---

# AWS Config — O que é

> [!info] Em uma frase
> Registra **o estado de configuração** de cada recurso, mantém o **histórico** dessas mudanças, e avalia se os recursos estão **conformes** com regras que você define.

## Definição oficial

> *"AWS Config provides a detailed view of the configuration of AWS resources in your AWS account. This includes how the resources are related to one another and how they were configured in the past..."*

## A pergunta que ele responde

**"Como esse recurso estava configurado, e está conforme?"**

| Pergunta | Serviço |
|---|---|
| **Quem** chamou a API? | **CloudTrail** |
| **Como** o recurso estava configurado ontem? Está conforme? | **AWS Config** |
| Qual a **métrica** de performance? | **CloudWatch** |

## As peças

| Peça | O que é |
|---|---|
| **Configuration item** | Um retrato do recurso num instante |
| **Configuration history** | A linha do tempo de retratos |
| **Config rule** | A regra que marca o recurso como **compliant** ou **noncompliant** |
| **Remediation** | Ação (via SSM Automation) que corrige o recurso noncompliant |
| **Conformance pack** | Conjunto de regras por framework (PCI, HIPAA, CIS) |
| **Aggregator** | Visão consolidada **multi-conta e multi-região** |

## A frase que decide a questão

> **Config detecta e remedia. SCP previne.**

| Enunciado diz | Serviço |
|---|---|
| "**impedir**", "não permitir que", "**prevenir**" | **SCP** (ou IAM) |
| "**detectar**", "auditar", "relatar não conformidade", "**corrigir** automaticamente" | **AWS Config** |

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[CloudTrail]] · [[Security Hub]] · [[Organizations e Control Tower]] · [[Systems Manager (e Parameter Store)]]
- [O que é o AWS Config](https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html)
