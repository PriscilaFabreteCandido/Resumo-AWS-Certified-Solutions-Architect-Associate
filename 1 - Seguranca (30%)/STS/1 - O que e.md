---
tags: [saa-c03, sts, seguranca, identidade]
servico: AWS STS
tipo: Credenciais temporárias
dominios: [1]
atualizado: 2026-11-08
---

# AWS STS — O que é

> [!info] Em uma frase
> O serviço que **emite credenciais temporárias**. Toda vez que alguém "assume uma role", é o STS que entrega a chave de acesso, a secret e o **token de sessão** — com prazo de validade.

## O que é, em palavras simples

IAM define **o que** pode ser feito. STS entrega **a credencial** para fazer, por tempo limitado.

É a peça que torna possível a recomendação central da AWS: **nunca use access key de longo prazo**. Em vez disso, assuma uma role e receba uma credencial que expira.

Uma credencial do STS tem **três** partes (a de longo prazo tem duas):

1. Access key ID
2. Secret access key
3. **Session token** ← a diferença

## As operações que caem na prova

| Operação | Quando |
|---|---|
| **`AssumeRole`** | Cross-account, role de serviço, troca de role. **A mais importante** |
| **`AssumeRoleWithSAML`** | Federação com diretório corporativo via SAML 2.0 |
| **`AssumeRoleWithWebIdentity`** | Cognito, Google, Facebook, OIDC |
| **`GetSessionToken`** | Credencial temporária para usuário IAM, tipicamente com **MFA** |
| **`GetFederationToken`** | Federação sem role (uso legado) |
| **`GetCallerIdentity`** | "Quem sou eu?" — diagnóstico, não exige permissão |

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[IAM]] · [[Cognito]] · [[IAM Identity Center]]
- [Documentação oficial do STS](https://docs.aws.amazon.com/STS/latest/APIReference/welcome.html)
