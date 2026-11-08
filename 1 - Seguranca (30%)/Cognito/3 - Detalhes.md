---
tags: [saa-c03, cognito, detalhes]
servico: Amazon Cognito
atualizado: 2026-11-08
---

# Cognito — Detalhes

## 1. Por que duas peças

A separação existe porque autenticar e autorizar na AWS são problemas diferentes.

**Caso em que você só precisa de user pool**: app com backend próprio. O usuário faz login, recebe JWT, e o **seu** backend valida o token e decide o que fazer. A AWS nunca recebe uma chamada do dispositivo.

**Caso em que você só precisa de identity pool**: o app já autentica com Google e você só quer dar acesso ao S3. O identity pool aceita o token do Google direto.

**Caso combinado**: app sem backend, que fala direto com S3/DynamoDB, e você quer seu próprio diretório de usuários.

## 2. Acesso por usuário — o padrão do S3

Este é o cenário de prova mais comum: cada usuário deve ler e gravar **só na sua pasta** de um bucket.

A role do identity pool recebe uma política com variável de identidade:

```json
{
  "Effect": "Allow",
  "Action": ["s3:GetObject", "s3:PutObject"],
  "Resource": "arn:aws:s3:::meu-bucket/usuarios/${cognito-identity.amazonaws.com:sub}/*"
}
```

Isso é **role-based access control** com variável de política. O identity pool também suporta **ABAC**, mapeando atributos do usuário para tags de sessão.

## 3. Recursos do user pool que aparecem

| Recurso | Para quê |
|---|---|
| **Hosted UI** | Tela de login pronta, customizável, com domínio próprio |
| **Federação** | Google, Facebook, Apple, Amazon, **SAML 2.0**, **OIDC** |
| **MFA** | SMS ou TOTP |
| **Grupos** | Agrupar usuários e associar uma IAM role ao grupo |
| **Lambda triggers** | Pré-signup, pós-confirmação, pré-geração de token (customizar claims) |
| **Fluxos de recuperação** | Esqueci a senha, verificação de e-mail/telefone |

Para **domínio customizado** no hosted UI, a doc do ACM lista o Cognito entre os serviços integrados — e o certificado passa por uma distribuição CloudFront gerenciada (por isso a exigência de **us-east-1**).

## 4. Proteção contra abuso

A doc do **AWS WAF** lista **Amazon Cognito user pool** entre os recursos aos quais uma web ACL pode ser associada. É a resposta para "proteger o endpoint de login contra credential stuffing e flood": **WAF com rate-based rule no user pool**.

## 5. Cognito × as outras identidades

| Enunciado | Resposta |
|---|---|
| "usuários do aplicativo", "clientes", "assinantes", "login social" | **Cognito** |
| "funcionários", "colaboradores", "times internos acessando a console" | **IAM Identity Center** |
| "a aplicação precisa chamar a API da AWS" | **IAM role** |
| "a aplicação usa autenticação Windows / LDAP" | **Directory Service** |
| "usuário do app precisa gravar direto no S3" | **Cognito identity pool** |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[IAM]] · [[STS]] · [[API Gateway]] · [[WAF]] · [[Directory Service]] · [[IAM Identity Center]]
