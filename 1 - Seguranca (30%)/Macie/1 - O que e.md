---
tags: [saa-c03, deteccao, seguranca]
servico: Amazon Macie
tipo: Detecção e postura de segurança
dominios: [1]
atualizado: 2026-11-08
---

# Amazon Macie — O que é

> [!info] Em uma frase
> Serviço de **segurança de dados** que descobre **dado sensível** (PII, cartão, credencial) em buckets S3 usando machine learning e correspondência de padrões, e avalia o risco de exposição dos buckets.

## O verbo deste serviço

**Descobre dado sensível. É o único dos cinco que olha o **conteúdo** dos seus dados.**

A prova de SAA raramente pede detalhe de configuração destes cinco serviços. Ela pede **qual deles resolve o problema descrito**. Então o que você precisa é o verbo e a fonte de dados:

| Serviço | Verbo | Fonte de dados |
|---|---|---|
| **GuardDuty** | Detecta **ameaça** (comportamento) | CloudTrail, VPC Flow Logs, DNS logs |
| **Macie** | Descobre **dado sensível** (PII) | Buckets S3 |
| **Inspector** | Encontra **vulnerabilidade** (CVE) | EC2, imagens no ECR, Lambda |
| **Security Hub** | **Agrega** achados e mede **postura** | Os outros + controles via AWS Config |
| **Detective** | **Investiga** causa raiz | CloudTrail + VPC Flow Logs + achados do GuardDuty |

## Fonte de dados deste serviço

**Buckets S3 de uso geral** — inventário dos buckets, avaliação de política e acesso, e inspeção do **conteúdo** dos objetos.

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[GuardDuty]] · [[Macie]] · [[Inspector]] · [[Security Hub]] · [[Detective]]
