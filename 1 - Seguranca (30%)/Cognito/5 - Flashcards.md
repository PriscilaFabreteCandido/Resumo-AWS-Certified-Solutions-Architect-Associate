---
servico: Amazon Cognito
fonte: "[[1 - Seguranca (30%)/Cognito/2 - Decorar|2 - Decorar]]"
---

# Cognito — Flashcards

#flashcards/saa-c03/d1-seguranca/cognito

Qual componente do Cognito faz autenticação?::**User pool**

Qual componente do Cognito dá autorização a recursos AWS?::**Identity pool**

O que o user pool entrega após o login?::**JWT** (OIDC)

O que o identity pool entrega?::**Credencial AWS temporária** (via STS)

Qual pool do Cognito suporta acesso guest (não autenticado)?::**Identity pool**

Modelos de controle de acesso do identity pool?::**RBAC** e **ABAC** (role por regra ou atributo)

Como o API Gateway REST valida o token do Cognito?::**Cognito authorizer**

E no API Gateway HTTP, qual authorizer valida o token do Cognito?::**JWT authorizer**

Usuário final do app × funcionário acessando contas AWS: qual serviço para cada?::Usuário final → **Cognito**; funcionário → **IAM Identity Center**

App que precisa de Active Directory: qual serviço?::**Directory Service**

Provedores de federação do user pool?::**Google, Facebook, Apple, SAML, OIDC**

Qual recurso do Cognito pode ter uma web ACL do WAF associada?::O **user pool**

Ordem do fluxo combinado do Cognito?::Login no **user pool** → JWT → **identity pool** → **STS** → credencial temporária → S3/DynamoDB
