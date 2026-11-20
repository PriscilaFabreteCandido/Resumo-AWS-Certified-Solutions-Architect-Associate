---
servico: AWS Security Token Service (STS)
fonte: "[[1 - Seguranca (30%)/STS/2 - Decorar|2 - Decorar]]"
---

# STS — Flashcards

#flashcards/saa-c03/d1-seguranca/sts

Quais dois documentos a role de destino precisa num AssumeRole cross-account?::**Trust policy** (quem pode assumir) e **permission policy** (o que pode fazer)

O que a identidade na conta de origem precisa para assumir a role?::Policy permitindo **`sts:AssumeRole`** no ARN da role

O que compõe a credencial temporária do STS?::Access key + secret + **session token**

Operação do STS para assertion SAML 2.0 (AD, ADFS, Okta)?::**`AssumeRoleWithSAML`**

Operação do STS para token OIDC (Cognito, Google, Apple)?::**`AssumeRoleWithWebIdentity`**

Operação do STS para usuário IAM, tipicamente com MFA?::**`GetSessionToken`**

Condição contra confused deputy com fornecedor SaaS terceiro?::**`sts:ExternalId`**

Condição que exige MFA para assumir role?::**`aws:MultiFactorAuthPresent`**

Escopo do STS e qual endpoint preferir?::**Global**, com endpoints regionais; use o **regional** (latência e resiliência)

Quanto custa o STS?::**Grátis**

Dá para revogar uma credencial temporária antes de expirar?::Não diretamente; anexe policy de **deny por `aws:TokenIssueTime`** para invalidar sessões antigas

Duração máxima da sessão em role chaining?::**1 hora**
