---
tags: [saa-c03, iam, decorar]
servico: AWS IAM
atualizado: 2026-11-08
---

# IAM — Decorar

## A ordem de avaliação (decore esta sequência)

| # | Etapa | Se falhar |
|---|---|---|
| 1 | **Deny explícito** em qualquer política | **Nega e para** |
| 2 | **RCPs** (resource control policies) | Sem Allow aplicável → **Deny** |
| 3 | **SCPs** | Sem Allow aplicável → **Deny** |
| 4 | **Resource-based policy** | Pode **conceder sozinha** no mesmo account |
| 5 | **Identity-based policy** | Sem Allow → deny implícito |
| 6 | **Permissions boundary** | Fora do boundary → deny implícito |
| 7 | **Session policy** | Fora da session policy → deny |

## As duas frases que resolvem metade das questões

> *"An explicit deny overrides an explicit allow."*

> *"By default, all requests are implicitly denied with the exception of the AWS account root user, which has full access."*

## União × interseção

| Combinação | Resultado |
|---|---|
| Identity-based **+** resource-based (mesmo account) | **União** — *"If an action is allowed by an identity-based policy, a resource-based policy, or both, then AWS allows the action"* |
| Identity-based **+** permissions boundary | **Interseção** |
| Identity-based **+** SCP **+** RCP | **Interseção** — *"an action must be allowed by all three policy types"* |

## Cross-account: precisa dos DOIS lados

> *"the requester in the trusted AccountA must have an identity-based policy... Additionally, the resource-based policy in AccountB must allow the requester in AccountA to access the resource."* E: *"AWS allows the request only if both account policy evaluations allow the request."*

**Exceções que exigem Allow explícito ao principal, sempre:**
- **Trust policy de role IAM**
- **Key policy do KMS**

## SCP — o que NÃO alcança

| Não afeta | Citação |
|---|---|
| **Conta de gerenciamento** | *"SCPs don't affect users or roles in the management account"* |
| **Service-linked roles** | *"SCPs do not affect any service-linked role"* |
| Principals **fora** da organização | — |

E: *"No permissions are granted by an SCP."* · *"A user without any IAM permission policies has no access, even if the applicable SCPs allow all services and all actions."* · SCP **afeta o root das contas membro**.

## Estrutura de uma política

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "NomeOpcional",
    "Effect": "Allow",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::meu-bucket/*",
    "Condition": {"StringEquals": {"aws:PrincipalOrgID": "o-exemplo"}}
  }]
}
```

Em política de **recurso** e **trust policy**, existe também o campo **`Principal`**.

## Condições que caem

| Chave | Uso |
|---|---|
| `aws:PrincipalOrgID` | Restringe a uma AWS Organizations |
| `aws:SourceArn` / `aws:SourceAccount` | **Confused deputy** com serviço AWS (ex.: OAC do CloudFront) |
| `sts:ExternalId` | **Confused deputy** com terceiro |
| `aws:RequestedRegion` | Restringir regiões (típico em SCP) |
| `aws:MultiFactorAuthPresent` | Exigir MFA |
| `aws:SecureTransport` | Exigir HTTPS |
| `aws:SourceVpce` / `aws:SourceVpc` | Limitar a um VPC endpoint |

## Fatos

| Item | Valor |
|---|---|
| Escopo | **Global** (não é regional) |
| Custo | **Grátis** |
| Root user | Deny implícito **não se aplica** a ele |

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[02 - Numeros para decorar]]
