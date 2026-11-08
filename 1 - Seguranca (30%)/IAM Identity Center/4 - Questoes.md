---
tags: [saa-c03, identity-center, questoes]
servico: AWS IAM Identity Center
atualizado: 2026-11-08
---

# IAM Identity Center — Questões

> [!question]- Q1. 15 contas AWS, acesso de console para vários times, usando as identidades do Active Directory existente. Menor esforço operacional?
> **A)** IAM users em cada conta, com senhas sincronizadas
> **B)** **IAM Identity Center integrado ao diretório, com permission sets atribuídos por grupo** ✅
> **C)** Uma conta central com IAM users e role switching manual para as outras 14
> **D)** AD Connector em cada conta com usuários IAM espelhados
>
> **Por que B**: é o serviço de acesso federado de **pessoas** a múltiplas contas, citado nominalmente no guia.
> **A errada**: 15 × N usuários para gerenciar e revogar.
> **C errada**: funciona, mas você mantém roles e trust policies à mão em 14 contas.
> **D errada**: AD Connector é proxy para apps AWS usarem o AD; não resolve atribuição multi-conta.

> [!question]- Q2. Quando alguém sai da empresa, o acesso à AWS precisa cessar imediatamente, sem ação em cada conta.
> **A)** Rotacionar as access keys
> **B)** **Identity Center com SCIM: desativar no IdP desprovisiona automaticamente** ✅
> **C)** SCP negando o usuário
> **D)** Deletar os IAM users manualmente
>
> **Por que B**: SCIM sincroniza criação e remoção; a credencial do Identity Center é temporária e deixa de ser emitida.
> **D errada**: é exatamente o processo manual e falível que se quer eliminar.

> [!question]- Q3. Um time precisa que cada desenvolvedor veja apenas os recursos do seu próprio projeto, sem criar um permission set por projeto.
> **A)** Um permission set por time
> **B)** **ABAC: propagar o atributo de projeto como tag de sessão e usar `aws:PrincipalTag` nas políticas** ✅
> **C)** Uma conta AWS por projeto
> **D)** SCP por OU
>
> **Por que B**: é a skill *"Designing a flexible authorization model"* — um permission set atende N times.
> **A errada**: é o que o enunciado quer evitar.
> **C errada**: funciona (isolamento forte), mas é desproporcional se o requisito é só visibilidade por projeto.

> [!question]- Q4. Usuários finais de um aplicativo móvel precisam fazer login com conta Google e gravar no S3. Qual serviço?
> **A)** IAM Identity Center
> **B)** **Cognito (user pool federado + identity pool)** ✅
> **C)** Directory Service
> **D)** IAM users com federação
>
> **Por que B**: Identity Center é para **funcionários**; usuário final de app é **Cognito**.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Identity Center é para usuários do app | É para **pessoas da organização** |
| Identity Center substitui o IAM | Ele **usa** IAM roles; o IAM continua autorizando |
| Identity Center emite access key de longo prazo | Credencial **sempre temporária** (STS) |
| Preciso criar roles em cada conta | O **permission set** é propagado automaticamente |
| Identity Center é cobrado | **Sem cobrança adicional** |
| AD Connector resolve SSO multi-conta | AD Connector é **proxy** para apps AWS usarem o AD |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
