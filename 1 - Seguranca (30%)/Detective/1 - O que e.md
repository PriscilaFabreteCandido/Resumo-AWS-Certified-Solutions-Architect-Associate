---
tags: [saa-c03, deteccao, seguranca]
servico: Amazon Detective
tipo: Detecção e postura de segurança
dominios: [1]
atualizado: 2026-11-08
---

# Amazon Detective — O que é

> [!info] Em uma frase
> Serviço de **investigação**: monta um grafo de comportamento para você analisar e identificar a **causa raiz** de um achado de segurança ou de uma atividade suspeita.

## O verbo deste serviço

**Investiga a causa raiz. Entra **depois** da detecção.**

A prova de SAA raramente pede detalhe de configuração destes cinco serviços. Ela pede **qual deles resolve o problema descrito**. Então o que você precisa é o verbo e a fonte de dados:

| Serviço | Verbo | Fonte de dados |
|---|---|---|
| **GuardDuty** | Detecta **ameaça** (comportamento) | CloudTrail, VPC Flow Logs, DNS logs |
| **Macie** | Descobre **dado sensível** (PII) | Buckets S3 |
| **Inspector** | Encontra **vulnerabilidade** (CVE) | EC2, imagens no ECR, Lambda |
| **Security Hub** | **Agrega** achados e mede **postura** | Os outros + controles via AWS Config |
| **Detective** | **Investiga** causa raiz | CloudTrail + VPC Flow Logs + achados do GuardDuty |

## Fonte de dados deste serviço

Extrai eventos temporais (*"login attempts, API calls, and network traffic"* (tentativas de login, chamadas de API e tráfego de rede)) do **CloudTrail** e dos **VPC Flow Logs**, e ingere **achados do GuardDuty**. Retém **até um ano** de histórico.

## Links

- [[1 - Seguranca (30%)/Detective/2 - Decorar|2 - Decorar]] · [[1 - Seguranca (30%)/Detective/3 - Detalhes|3 - Detalhes]] · [[1 - Seguranca (30%)/Detective/4 - Questoes|4 - Questoes]]
- [[1 - Seguranca (30%)/GuardDuty/1 - O que e|GuardDuty]] · [[1 - Seguranca (30%)/Macie/1 - O que e|Macie]] · [[1 - Seguranca (30%)/Inspector/1 - O que e|Inspector]] · [[1 - Seguranca (30%)/Security Hub/1 - O que e|Security Hub]] · [[1 - Seguranca (30%)/Detective/1 - O que e|Detective]]
