---
tags: [saa-c03, identity-center, decorar]
servico: AWS IAM Identity Center
atualizado: 2026-11-08
---

# IAM Identity Center — Decorar

## Quem é o público de cada serviço de identidade

| Serviço | Público | Entrega |
|---|---|---|
| **IAM Identity Center** | **Funcionários** da organização | SSO para contas AWS e apps, credencial temporária |
| **IAM role + STS** | **Aplicações e serviços** | Credencial temporária |
| **Cognito user pool** | **Usuários finais** do app | **JWT** |
| **Cognito identity pool** | **Usuários finais** do app | **Credencial AWS** temporária |
| **Directory Service** | Aplicações que precisam de **Active Directory** | Diretório AD gerenciado ou proxy |

## Fontes de identidade suportadas

1. **Diretório do próprio Identity Center** (para organizações pequenas, sem AD)
2. **Active Directory** — AWS Managed Microsoft AD ou AD on-premises (via **AD Connector** ou **trust**)
   - ⚠️ **Simple AD não serve**: *"IAM Identity Center does not work with SAMBA4-based Simple AD directories."* (o IAM Identity Center não funciona com diretórios Simple AD, baseados em SAMBA4)
   - Só **um** por vez: *"You can connect only one AD Connector directory or one directory in AWS Managed Microsoft AD at a time."* (você pode conectar apenas um diretório do AD Connector ou um do AWS Managed Microsoft AD por vez)
   - Tem de estar na conta de **gerenciamento** da Organization e na **mesma Região**
3. **IdP externo** — Okta, Microsoft Entra ID, Ping, OneLogin, via **SAML 2.0** (autenticação) + **SCIM** (provisionamento automático de usuários e grupos)

## Permission set

- É o molde que vira uma **IAM role** nas contas atribuídas
- Contém políticas gerenciadas da AWS, políticas customer managed e policy inline
- Pode ter **permissions boundary**
- Tem **duração de sessão** configurável

## Atribuição

```
GRUPO (do diretório)  ×  PERMISSION SET  ×  CONTA
   "Desenvolvedores"       "PowerUser"       "Dev-01"
   "Desenvolvedores"       "ReadOnly"        "Prod-01"
   "SRE"                   "Administrator"   "Prod-01"
```

Atribuir por **grupo**, nunca por usuário — é o que torna onboarding e offboarding um ato só no diretório.

## Fatos

| Item | Detalhe |
|---|---|
| Custo | **Sem cobrança adicional** |
| Pré-requisito | Funciona melhor com **AWS Organizations** (acesso multi-conta) |
| Região | Habilitado numa região (a *home region*) |
| Credencial | **Sempre temporária** (via STS) |
| CLI | `aws sso login` — credencial curta, sem access key no disco |
| Também faz | SSO para **aplicações** SAML de terceiros |

## Links

- [[1 - Seguranca (30%)/IAM Identity Center/1 - O que e|1 - O que e]] · [[1 - Seguranca (30%)/IAM Identity Center/3 - Detalhes|3 - Detalhes]] · [[1 - Seguranca (30%)/IAM Identity Center/4 - Questoes|4 - Questoes]]
