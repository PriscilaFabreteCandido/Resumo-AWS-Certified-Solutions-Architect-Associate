---
tags: [saa-c03, sts, decorar]
servico: AWS STS
atualizado: 2026-11-08
---

# STS — Decorar

## O fluxo do `AssumeRole`

```
Conta A (origem)                       Conta B (destino)
┌──────────────────┐                  ┌──────────────────────┐
│ Role/usuário com │                  │ Role com TRUST       │
│ policy permitindo│ ──AssumeRole──>  │ POLICY confiando     │
│ sts:AssumeRole   │                  │ na conta A           │
└──────────────────┘                  └──────────┬───────────┘
         ▲                                       │
         └────── credencial temporária ──────────┘
                 (key + secret + SESSION TOKEN)
```

**Dois documentos, sempre:**
1. **Trust policy** (na role de destino) — *quem* pode assumir
2. **Permission policy** (na role de destino) — *o que* a role pode fazer

E na origem: policy permitindo `sts:AssumeRole` naquele ARN.

## As quatro operações principais

| Operação | Identidade de entrada |
|---|---|
| `AssumeRole` | Principal IAM (usuário ou role) |
| `AssumeRoleWithSAML` | Assertion SAML 2.0 (AD, ADFS, Okta) |
| `AssumeRoleWithWebIdentity` | Token OIDC (Cognito, Google, Apple) |
| `GetSessionToken` | Usuário IAM (tipicamente + MFA) |

## Condições de confiança que caem

| Chave | Protege contra |
|---|---|
| **`sts:ExternalId`** | Confused deputy com **terceiro** (fornecedor SaaS) |
| **`aws:SourceArn` / `aws:SourceAccount`** | Confused deputy com **serviço AWS** |
| **`aws:MultiFactorAuthPresent`** | Assumir role sem MFA |
| **`aws:PrincipalOrgID`** | Principal de fora da organização |

## Fatos

| Item | Valor |
|---|---|
| Escopo | **Global**, com endpoints regionais (use o regional para menor latência e resiliência) |
| Custo | **Grátis** |
| Credencial | Expira. **Não** pode ser revogada antes do prazo — mas você pode anexar uma policy de deny por `aws:TokenIssueTime` para invalidar sessões antigas |
| Role chaining | Assumir role a partir de outra role: a sessão fica limitada a **1 hora** |

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
