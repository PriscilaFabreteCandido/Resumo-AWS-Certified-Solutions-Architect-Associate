---
tags: [saa-c03, deteccao, seguranca]
servico: Amazon GuardDuty
tipo: Detecção e postura de segurança
dominios: [1]
atualizado: 2026-11-08
---

# Amazon GuardDuty — O que é

> [!info] Em uma frase
> Serviço de **detecção de ameaças** que monitora continuamente logs e fontes de dados da AWS em busca de **comportamento malicioso ou anômalo** — acesso suspeito, mineração de criptomoeda, comunicação com IP conhecidamente malicioso.

## O verbo deste serviço

**Detecta ameaça pelo comportamento. Usa inteligência de ameaças e modelos de machine learning.**

A prova de SAA raramente pede detalhe de configuração destes cinco serviços. Ela pede **qual deles resolve o problema descrito**. Então o que você precisa é o verbo e a fonte de dados:

| Serviço | Verbo | Fonte de dados |
|---|---|---|
| **GuardDuty** | Detecta **ameaça** (comportamento) | CloudTrail, VPC Flow Logs, DNS logs |
| **Macie** | Descobre **dado sensível** (PII) | Buckets S3 |
| **Inspector** | Encontra **vulnerabilidade** (CVE) | EC2, imagens no ECR, Lambda |
| **Security Hub** | **Agrega** achados e mede **postura** | Os outros + controles via AWS Config |
| **Detective** | **Investiga** causa raiz | CloudTrail + VPC Flow Logs + achados do GuardDuty |

## Fonte de dados deste serviço

Fundacionais, consumidas direto e **sem você precisar habilitar nem pagar os logs separadamente**: **CloudTrail management events**, **VPC Flow Logs** e **DNS logs**. Planos opcionais adicionam: S3 data events, EKS audit logs, RDS login activity, EBS volumes (malware) e Lambda network activity.

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[GuardDuty]] · [[Macie]] · [[Inspector]] · [[Security Hub]] · [[Detective]]
