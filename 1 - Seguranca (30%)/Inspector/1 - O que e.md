---
tags: [saa-c03, deteccao, seguranca]
servico: Amazon Inspector
tipo: Detecção e postura de segurança
dominios: [1]
atualizado: 2026-11-08
---

# Amazon Inspector — O que é

> [!info] Em uma frase
> Serviço de **gestão de vulnerabilidades** que descobre workloads automaticamente e os varre continuamente em busca de **vulnerabilidades de software (CVE)** e **exposição de rede não intencional**.

## O verbo deste serviço

**Encontra vulnerabilidade de software. Nada a ver com comportamento nem com conteúdo de dado.**

A prova de SAA raramente pede detalhe de configuração destes cinco serviços. Ela pede **qual deles resolve o problema descrito**. Então o que você precisa é o verbo e a fonte de dados:

| Serviço | Verbo | Fonte de dados |
|---|---|---|
| **GuardDuty** | Detecta **ameaça** (comportamento) | CloudTrail, VPC Flow Logs, DNS logs |
| **Macie** | Descobre **dado sensível** (PII) | Buckets S3 |
| **Inspector** | Encontra **vulnerabilidade** (CVE) | EC2, imagens no ECR, Lambda |
| **Security Hub** | **Agrega** achados e mede **postura** | Os outros + controles via AWS Config |
| **Detective** | **Investiga** causa raiz | CloudTrail + VPC Flow Logs + achados do GuardDuty |

## Fonte de dados deste serviço

**Instâncias EC2**, **imagens de container no Amazon ECR** e **funções Lambda**.

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[GuardDuty]] · [[Macie]] · [[Inspector]] · [[Security Hub]] · [[Detective]]
