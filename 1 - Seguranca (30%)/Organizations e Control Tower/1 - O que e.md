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
| **Consolidated billing** | *"Organizations provides you with a single consolidated bill"* (o Organizations entrega uma fatura única consolidada) |
| **Control Tower** | *"apply pre-packaged governance rules for security, operations, and compliance for your AWS workloads"* (aplicar regras de governança prontas, de segurança, operação e conformidade, às suas cargas de trabalho) |

## A frase que resolve metade das questões de SCP

> *"SCPs do not grant permissions to the IAM users and IAM roles in your organization. No permissions are granted by an SCP."* (SCPs não concedem permissões aos usuários e roles do IAM da sua organização; uma SCP não concede permissão nenhuma)

E o complemento: *"A user without any IAM permission policies has no access, even if the applicable SCPs allow all services and all actions."* (um usuário sem nenhuma policy de permissão do IAM não tem acesso, mesmo que as SCPs aplicáveis liberem todos os serviços e todas as ações)

## Links

- [[1 - Seguranca (30%)/Organizations e Control Tower/2 - Decorar|2 - Decorar]] · [[1 - Seguranca (30%)/Organizations e Control Tower/3 - Detalhes|3 - Detalhes]] · [[1 - Seguranca (30%)/Organizations e Control Tower/4 - Questoes|4 - Questoes]]
- [[1 - Seguranca (30%)/IAM/1 - O que e|IAM]] · [[1 - Seguranca (30%)/AWS RAM/1 - O que e|AWS RAM]] · [[1 - Seguranca (30%)/IAM Identity Center/1 - O que e|IAM Identity Center]] · [[4 - Custo (20%)/Ferramentas de custo (Cost Explorer, Budgets, CUR)/1 - O que e|Ferramentas de custo (Cost Explorer, Budgets, CUR)]]
- [Introdução ao Organizations](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html)
