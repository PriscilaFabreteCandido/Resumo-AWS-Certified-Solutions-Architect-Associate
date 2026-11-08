---
tags: [saa-c03, security-hub, questoes]
servico: AWS Security Hub (CSPM)
atualizado: 2026-11-08
---

# Security Hub — Questões

> [!question]- Q1. Painel único em 60 contas, medindo aderência a CIS e PCI DSS.
> **A)** GuardDuty com conta administradora
> **B)** **AWS Security Hub com os padrões habilitados, administrado via Organizations** ✅
> **C)** AWS Config aggregator
> **D)** CloudTrail organization trail
>
> **Por que B**: *"helps you assess your AWS environment against security industry standards and best practices"*, com modelo administrador/membro.
> **A errada**: GuardDuty detecta ameaça; não avalia padrões de conformidade.
> **C errada**: Config aggregator dá visão multi-conta de **configuração e regras**, mas não agrega achados de GuardDuty/Inspector/Macie nem traz os padrões prontos.
> **D errada**: CloudTrail registra chamadas de API.

> [!question]- Q2. O Security Hub foi habilitado, mas os controles aparecem sem dados. Por quê?
> **A)** Falta habilitar o GuardDuty
> **B)** **Falta habilitar o AWS Config, de onde vêm as service-linked rules dos controles** ✅
> **C)** Falta criar um trail do CloudTrail
> **D)** Os padrões precisam ser comprados
>
> **Por que B**: os controles do Security Hub rodam **via AWS Config**.
> **A errada**: GuardDuty afeta os **achados de ameaça**, não os controles de postura.

> [!question]- Q3. Qual serviço entrega o relatório SOC 2 **da AWS** para o auditor?
> **A)** Security Hub
> **B)** AWS Config
> **C)** **AWS Artifact** ✅
> **D)** AWS Audit Manager
>
> **Por que C**: Artifact é onde ficam os relatórios de compliance **da AWS**.
> **A e B erradas**: medem a **sua** postura e configuração.
> **D errada**: Audit Manager coleta evidência do **seu** ambiente contra frameworks.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Security Hub detecta ameaça | **Agrega.** Detecção é GuardDuty/Inspector/Macie |
| Security Hub funciona sozinho | Os controles dependem do **AWS Config** |
| Security Hub substitui o Config | Ele **usa** o Config |
| Security Hub investiga o incidente | Investigação é **Detective** |
| Security Hub entrega o relatório de compliance da AWS | Isso é **AWS Artifact** |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
