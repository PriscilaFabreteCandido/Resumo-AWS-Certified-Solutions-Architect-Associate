---
tags: [saa-c03, security-hub, detalhes]
servico: AWS Security Hub (CSPM)
atualizado: 2026-11-08
---

# Security Hub — Detalhes

## 1. O lugar dele na arquitetura

```
GuardDuty  (ameaça)    ┐
Inspector  (CVE)       │
Macie      (PII)       ├──> SECURITY HUB ──> EventBridge ──> Lambda / SNS / ticket
Parceiros              │    (agrega + avalia      │
AWS Config (controles) ┘     contra padrões)      └──> Detective (investigar)
```

Security Hub é a **camada de consolidação**. Ele não detecta ameaça, não acha CVE e não classifica dado — ele junta tudo e mede.

## 2. Por que ele precisa do AWS Config

Os **controles** do Security Hub (as checagens tipo "o bucket X não deveria estar público", "a chave KMS deveria ter rotação") são implementados como **service-linked rules do AWS Config**.

Consequência prática: habilitar Security Hub sem habilitar Config resulta num painel que agrega achados de terceiros, mas **não** avalia postura. A prova usa isso como distrator ("habilitar apenas o Security Hub").

## 3. Multi-conta e multi-região

Como GuardDuty, Inspector e Macie, o Security Hub tem modelo **administrador/membro** via AWS Organizations.

Além disso tem **agregação cross-Region**: você designa uma região agregadora e vê os achados de todas as regiões num lugar. É a resposta para "visão única em 40 contas e 6 regiões".

## 4. Formato comum e automação

Todo achado é normalizado no **AWS Security Finding Format (ASFF)**. Isso permite:

- **Insights** — agrupamentos e consultas sobre os achados
- **Custom actions** → **EventBridge** → Lambda, SNS, Step Functions, ticket no sistema do time
- Integração bidirecional com parceiros (ferramentas de SIEM e de ticket)

## 5. Security Hub × Config × Audit Manager

| Pergunta | Serviço |
|---|---|
| Qual a minha **postura de segurança** agregada? | **Security Hub** |
| Qual a **configuração** deste recurso, e o histórico dela? | **AWS Config** |
| Preciso produzir **evidência de auditoria** para um framework | **AWS Audit Manager** |
| Preciso do relatório de compliance **da AWS** (SOC, PCI, ISO) | **AWS Artifact** |

Essa última distinção cai: **Artifact** entrega a conformidade **da AWS**; **Security Hub** e **Config** medem a **sua**.

## Links

- [[1 - Seguranca (30%)/Security Hub/1 - O que e|1 - O que e]] · [[1 - Seguranca (30%)/Security Hub/2 - Decorar|2 - Decorar]] · [[1 - Seguranca (30%)/Security Hub/4 - Questoes|4 - Questoes]]
- [[1 - Seguranca (30%)/Config/1 - O que e|Config]] · [[1 - Seguranca (30%)/GuardDuty/1 - O que e|GuardDuty]] · [[1 - Seguranca (30%)/Inspector/1 - O que e|Inspector]] · [[1 - Seguranca (30%)/Macie/1 - O que e|Macie]] · [[1 - Seguranca (30%)/Detective/1 - O que e|Detective]] · [[1 - Seguranca (30%)/Governanca (Artifact, Trusted Advisor, Service Catalog)/1 - O que e|Governanca (Artifact, Trusted Advisor, Service Catalog)]]
