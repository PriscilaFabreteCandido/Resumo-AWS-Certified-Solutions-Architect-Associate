---
tags: [saa-c03, governanca, decorar]
servico: Artifact, Trusted Advisor e Service Catalog
atualizado: 2026-11-08
---

# Governança — Decorar

## Quem responde o quê

| Pergunta do enunciado | Serviço |
|---|---|
| "relatório **SOC / PCI / ISO** **da AWS** para o auditor" | **AWS Artifact** |
| "aceitar o **BAA** da HIPAA" | **AWS Artifact** |
| "recomendações de **custo, performance, segurança, tolerância a falha, limites**" | **Trusted Advisor** |
| "estou perto do **limite de serviço**?" | **Trusted Advisor** (ou **Service Quotas**) |
| "times devem lançar só arquiteturas **aprovadas**" | **Service Catalog** |
| "self-service com **governança**" | **Service Catalog** |
| "fazer a **revisão Well-Architected**" | **Well-Architected Tool** |
| "a AWS tem um incidente afetando **meus** recursos?" | **AWS Health Dashboard** |
| "rastrear **licenças** de software" | **License Manager** |
| "**rightsizing** de instância" | **Compute Optimizer** |

## Trusted Advisor — os 5 pilares de checagem

1. **Cost optimization** — recursos ociosos, RIs subutilizadas
2. **Performance** — configuração que limita performance
3. **Security** — SG permissivo, MFA no root, chaves expostas
4. **Fault tolerance** — sem Multi-AZ, sem backup, sem redundância
5. **Service limits** — uso próximo da quota

> [!note] Checagens completas exigem plano **Business** ou **Enterprise**. O plano básico libera um subconjunto.

## Service Catalog — vocabulário

| Termo | O que é |
|---|---|
| **Product** | Um template CloudFormation versionado |
| **Portfolio** | Conjunto de products, com permissões |
| **Constraint** | Limites: tipos de instância permitidos, região, role de lançamento |
| **Launch role** | A role que o Service Catalog usa para criar o recurso — o usuário **não** precisa de permissão ampla |

> [!tip] A ideia central do Service Catalog
> O usuário recebe permissão de **lançar o produto**, não de criar recursos. Quem cria é a **launch role**. Isso permite self-service sem distribuir `ec2:*`.

## Artifact × as ferramentas de postura

| | Mede a conformidade **da AWS** | Mede a conformidade **sua** |
|---|---|---|
| **Artifact** | ✅ | — |
| **Config** | — | ✅ (recursos) |
| **Security Hub** | — | ✅ (postura agregada) |
| **Audit Manager** | — | ✅ (evidência para framework) |

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
