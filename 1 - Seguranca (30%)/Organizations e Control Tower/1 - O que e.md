---
tags: [saa-c03, organizations, scp, control-tower, seguranca]
servico: AWS Organizations e Control Tower
tipo: Governança multi-conta
dominios: [1, 4]
atualizado: 2026-11-08
---

# Organizations e Control Tower — O que é

> [!info] Em uma frase
> **Organizations** agrupa várias contas AWS numa árvore, com **fatura única** e **guardrails (SCPs)**. **Control Tower** é a landing zone pronta construída sobre ela.

## Por que separar em contas

A **conta** é o limite de isolamento mais forte da AWS. Separar não é sobre billing — é sobre **raio de explosão**:

- Dev não derruba prod
- Carga regulada (PCI, HIPAA) fica isolada
- Credencial vazada em uma conta não alcança as outras
- Limites de serviço (quotas) são por conta

## As peças

| Peça | O que faz |
|---|---|
| **Management account** | A conta raiz da organização. Paga tudo. **SCPs não a afetam** |
| **OU (organizational unit)** | Agrupa contas em árvore. SCP numa OU vale para toda a subárvore |
| **SCP (service control policy)** | **Teto** de permissão. **Não concede nada** |
| **RCP (resource control policy)** | Teto no lado do **recurso** |
| **Consolidated billing** | *"Organizations provides you with a single consolidated bill"* |
| **Control Tower** | *"apply pre-packaged governance rules for security, operations, and compliance for your AWS workloads"* |

## A frase que resolve metade das questões de SCP

> *"SCPs do not grant permissions to the IAM users and IAM roles in your organization. No permissions are granted by an SCP."*

E o complemento: *"A user without any IAM permission policies has no access, even if the applicable SCPs allow all services and all actions."*

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[IAM]] · [[AWS RAM]] · [[IAM Identity Center]] · [[Ferramentas de custo (Cost Explorer, Budgets, CUR)]]
- [Introdução ao Organizations](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html)
