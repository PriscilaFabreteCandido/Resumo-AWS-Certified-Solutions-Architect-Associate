---
tags: [saa-c03, organizations, decorar]
servico: AWS Organizations e Control Tower
atualizado: 2026-11-08
---

# Organizations e Control Tower — Decorar

## SCP — as cinco frases oficiais

| Fato | Citação |
|---|---|
| **Não concede** | *"No permissions are granted by an SCP."* |
| **Não afeta a management account** | *"SCPs don't affect users or roles in the management account. They affect only the member accounts."* |
| **Não afeta service-linked role** | *"SCPs do not affect any service-linked role."* |
| **Afeta o root das contas membro** | *"SCPs affect the root user of member accounts."* |
| **Combina por interseção** | *"the boundary, the SCP, and the identity-based policy must all allow the action"* |

## O que SCP não restringe

Ação da **management account** · permissões de **service-linked role** · registro de suporte Enterprise pelo root · e alguns serviços específicos (Alexa, Mechanical Turk).

## Tipos de política do Organizations

| Tipo | Para quê |
|---|---|
| **SCP** | Teto de permissão (lado do principal) |
| **RCP** | Teto de permissão (lado do recurso) |
| **Tag policy** | Padronizar tags |
| **Backup policy** | Padronizar planos do AWS Backup |
| **AI services opt-out policy** | Negar uso dos seus dados para melhoria dos serviços de IA |
| **Chat applications policy** | Governar integrações de chat |

## Custo

| Serviço | Custo |
|---|---|
| **AWS Organizations** | *"offered at no additional charge"* |
| **AWS RAM** | *"no additional charges"* |
| **Control Tower** | Sem taxa do serviço; você paga os recursos que ele provisiona (Config, CloudTrail, S3) |

## Control Tower — o que ele monta

- **Landing zone** com múltiplas contas (Log Archive e Audit)
- **OUs** e **SCPs** pré-configuradas (os *controls*, antes chamados de *guardrails*)
- **AWS Config** e **CloudTrail** organization-wide
- **IAM Identity Center** para acesso
- **Account Factory** para provisionar contas novas no padrão

Controls em três sabores: **preventive** (SCP), **detective** (Config rule) e **proactive** (CloudFormation hooks).

## Prevenir × detectar (cai muito)

| Enunciado diz | Serviço |
|---|---|
| "**impedir**", "não permitir que", "**prevenir**" | **SCP** |
| "**detectar**", "auditar", "relatar não conformidade", "**corrigir** automaticamente" | **AWS Config** |

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
