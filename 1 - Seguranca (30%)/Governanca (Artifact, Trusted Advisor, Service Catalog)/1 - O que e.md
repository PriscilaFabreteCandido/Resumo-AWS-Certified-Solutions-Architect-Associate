---
tags: [saa-c03, artifact, trusted-advisor, service-catalog, governanca]
servico: Artifact, Trusted Advisor e Service Catalog
tipo: Governança e compliance
dominios: [1, 4]
atualizado: 2026-11-08
---

# Governança — Artifact, Trusted Advisor e Service Catalog

> [!info] Em uma frase
> Três serviços de apoio que caem como **questão de uma linha**: **Artifact** entrega o compliance **da AWS**; **Trusted Advisor** dá recomendações; **Service Catalog** publica produtos aprovados para os times consumirem.

## Os três, em uma frase cada

| Serviço | O que faz |
|---|---|
| **AWS Artifact** | Portal onde você **baixa os relatórios de compliance da AWS** (SOC 1/2/3, PCI DSS, ISO 27001) e aceita acordos (BAA, HIPAA) |
| **AWS Trusted Advisor** | Checagens automáticas em cinco pilares: **custo**, **performance**, **segurança**, **tolerância a falha** e **limites de serviço** |
| **AWS Service Catalog** | Catálogo de **produtos aprovados** (templates CloudFormation) que os times lançam sem precisar de permissão ampla |

## A distinção crítica: Artifact × Security Hub × Config

| Pergunta | Serviço |
|---|---|
| "O auditor quer o **SOC 2 da AWS**" | **AWS Artifact** |
| "Qual a **minha** postura de segurança?" | **Security Hub** |
| "Meus **recursos** estão conformes?" | **AWS Config** |
| "Preciso montar **evidência** contra um framework" | **AWS Audit Manager** |

Artifact é sobre a conformidade **da AWS**, não a sua. É o lado da AWS no **modelo de responsabilidade compartilhada**.

## Também em escopo nesta família

| Serviço | Uma linha |
|---|---|
| **AWS Well-Architected Tool** | Faz a revisão Well-Architected na console, pilar por pilar |
| **AWS Health Dashboard** | Eventos de saúde da AWS que afetam **os seus** recursos |
| **AWS License Manager** | Rastreia licenças de software (liga com **Dedicated Hosts**) |
| **AWS Proton** | Templates de infraestrutura self-service para times de plataforma |

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[Config]] · [[Security Hub]] · [[Organizations e Control Tower]] · [[Responsabilidade compartilhada]]
