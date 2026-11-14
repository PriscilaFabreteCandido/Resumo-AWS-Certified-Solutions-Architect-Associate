---
tags: [saa-c03, deteccao, seguranca]
servico: AWS Security Hub (CSPM)
tipo: Detecção e postura de segurança
dominios: [1]
atualizado: 2026-11-08
---

# AWS Security Hub (CSPM) — O que é

> [!info] Em uma frase
> Painel único que **agrega achados** de segurança de várias contas e serviços, e **avalia o ambiente** contra padrões e boas práticas do setor (CIS, PCI DSS, AWS Foundational Security Best Practices).

## O verbo deste serviço

**Agrega e mede postura. Não detecta nada por conta própria — consolida o que os outros detectam.**

A prova de SAA raramente pede detalhe de configuração destes cinco serviços. Ela pede **qual deles resolve o problema descrito**. Então o que você precisa é o verbo e a fonte de dados:

| Serviço | Verbo | Fonte de dados |
|---|---|---|
| **GuardDuty** | Detecta **ameaça** (comportamento) | CloudTrail, VPC Flow Logs, DNS logs |
| **Macie** | Descobre **dado sensível** (PII) | Buckets S3 |
| **Inspector** | Encontra **vulnerabilidade** (CVE) | EC2, imagens no ECR, Lambda |
| **Security Hub** | **Agrega** achados e mede **postura** | Os outros + controles via AWS Config |
| **Detective** | **Investiga** causa raiz | CloudTrail + VPC Flow Logs + achados do GuardDuty |

## Fonte de dados deste serviço

Achados do **GuardDuty, Inspector, Macie** e produtos de parceiros, mais os **controles próprios**, que rodam usando **service-linked rules do AWS Config**.

## Links

- [[1 - Seguranca (30%)/Security Hub/2 - Decorar|2 - Decorar]] · [[1 - Seguranca (30%)/Security Hub/3 - Detalhes|3 - Detalhes]] · [[1 - Seguranca (30%)/Security Hub/4 - Questoes|4 - Questoes]]
- [[1 - Seguranca (30%)/GuardDuty/1 - O que e|GuardDuty]] · [[1 - Seguranca (30%)/Macie/1 - O que e|Macie]] · [[1 - Seguranca (30%)/Inspector/1 - O que e|Inspector]] · [[1 - Seguranca (30%)/Security Hub/1 - O que e|Security Hub]] · [[1 - Seguranca (30%)/Detective/1 - O que e|Detective]]
