---
servico: AWS IAM Identity Center
fonte: "[[1 - Seguranca (30%)/IAM Identity Center/2 - Decorar|2 - Decorar]]"
---

# IAM Identity Center — Flashcards

#flashcards/saa-c03/d1-seguranca/iam-identity-center

Público do IAM Identity Center?::**Funcionários** da organização (SSO para contas AWS e apps)

Três fontes de identidade do Identity Center?::**Diretório próprio**, **Active Directory** e **IdP externo**

Que tipo de diretório AD não funciona com o Identity Center?::**Simple AD** (baseado em Samba 4)

Quantos diretórios AD o Identity Center conecta por vez?::Apenas **um**

Onde o AD precisa estar para conectar ao Identity Center?::Na conta de **gerenciamento** da Organization, na **mesma Região**

Protocolos para integrar IdP externo (Okta, Entra ID) ao Identity Center?::**SAML 2.0** (autenticação) + **SCIM** (provisionamento)

No que um permission set se transforma nas contas atribuídas?::Numa **IAM role**

Atribuição no Identity Center deve ser por usuário ou por grupo?::Por **grupo**, para onboarding e offboarding num ato só

Que tipo de credencial o Identity Center entrega?::**Sempre temporária** (via STS)

Comando de CLI para login com o Identity Center?::`aws sso login`

Quanto custa o IAM Identity Center?::**Sem cobrança adicional**

Além de contas AWS, para que mais o Identity Center dá SSO?::Para **aplicações SAML** de terceiros

O que um permission set pode conter?::Policies **AWS managed**, **customer managed**, **inline**, permissions boundary e duração de sessão
