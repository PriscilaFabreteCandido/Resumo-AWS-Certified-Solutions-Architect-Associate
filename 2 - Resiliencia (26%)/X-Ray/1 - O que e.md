---
tags: [saa-c03, x-ray, observabilidade]
servico: AWS X-Ray
tipo: Tracing distribuído
dominios: [2]
atualizado: 2026-11-08
---

# AWS X-Ray — O que é

> [!info] Em uma frase
> Rastreia uma requisição **ponta a ponta** por vários serviços e mostra onde ela gastou tempo — num mapa de serviços com latência por segmento.

## Por que ele está em escopo

O X-Ray é o **único** serviço da categoria "Developer Tools" na lista oficial de serviços **em escopo** da SAA-C03. O guia o cita nominalmente em **Task 2.2**:

> *"Workload visibility (for example, AWS X-Ray)"*

Ou seja: CDK, CodeBuild, CodeDeploy e CodeCommit estão **fora**; X-Ray está **dentro**.

## A pergunta que ele responde

**"Onde essa requisição demorou?"**

| Pergunta | Serviço |
|---|---|
| A CPU está alta? A fila cresceu? | **CloudWatch** |
| Quem chamou essa API? | **CloudTrail** |
| Como estava a configuração? | **AWS Config** |
| **Onde** a requisição gastou tempo entre microsserviços? | **X-Ray** |

## Onde integra

**Lambda** · **API Gateway (REST)** · **ECS** · **EKS** · **EC2** · **Elastic Beanstalk** · **SDK** da aplicação.

⚠️ Na **HTTP API** do API Gateway **não** há X-Ray — é um dos recursos que só a **REST API** tem.

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[CloudWatch]] · [[Lambda]] · [[API Gateway]] · [[ECS]]
