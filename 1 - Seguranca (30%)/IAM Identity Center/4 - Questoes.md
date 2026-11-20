---
tags: [saa-c03, identity-center, questoes]
servico: AWS IAM Identity Center
atualizado: 2026-11-08
---

# IAM Identity Center — Questões

> [!question] Q1. 15 contas AWS, acesso de console para vários times, usando as identidades do Active Directory existente. Menor esforço operacional?
> **A)** IAM users em cada conta, com senhas sincronizadas
> **B)** IAM Identity Center integrado ao diretório, com permission sets atribuídos por grupo
> **C)** Uma conta central com IAM users e role switching manual para as outras 14
> **D)** AD Connector em cada conta com usuários IAM espelhados
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é o serviço de acesso federado de **pessoas** a múltiplas contas, citado nominalmente no guia.
> > **A errada**: 15 × N usuários para gerenciar e revogar.
> > **C errada**: funciona, mas você mantém roles e trust policies à mão em 14 contas.
> > **D errada**: o erro está em **"em cada conta" com usuários IAM espelhados**. O AD Connector é um **gateway** para o AD, e um só, na conta de gerenciamento, é a forma correta de usá-lo — mas quem atribui acesso às 15 contas é o **Identity Center**, não ele.
> > ⚠️ Cuidado para não generalizar: **AD Connector + Identity Center é a montagem padrão** para SSO multi-conta com AD on-premises. Ver [[1 - Seguranca (30%)/Directory Service/3 - Detalhes|Directory Service - Detalhes]].

> [!question] Q2. Quando alguém sai da empresa, o acesso à AWS precisa cessar imediatamente, sem ação em cada conta.
> **A)** Rotacionar as access keys
> **B)** Identity Center com SCIM: desativar no IdP desprovisiona automaticamente
> **C)** SCP negando o usuário
> **D)** Deletar os IAM users manualmente
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: SCIM sincroniza criação e remoção; a credencial do Identity Center é temporária e deixa de ser emitida.
> > **D errada**: é exatamente o processo manual e falível que se quer eliminar.

> [!question] Q3. Um time precisa que cada desenvolvedor veja apenas os recursos do seu próprio projeto, sem criar um permission set por projeto.
> **A)** Um permission set por time
> **B)** ABAC: propagar o atributo de projeto como tag de sessão e usar `aws:PrincipalTag` nas políticas
> **C)** Uma conta AWS por projeto
> **D)** SCP por OU
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é a skill *"Designing a flexible authorization model"* (projetar um modelo de autorização flexível) — um permission set atende N times.
> > **A errada**: é o que o enunciado quer evitar.
> > **C errada**: funciona (isolamento forte), mas é desproporcional se o requisito é só visibilidade por projeto.

> [!question] Q4. Usuários finais de um aplicativo móvel precisam fazer login com conta Google e gravar no S3. Qual serviço?
> **A)** IAM Identity Center
> **B)** Cognito (user pool federado + identity pool)
> **C)** Directory Service
> **D)** IAM users com federação
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: Identity Center é para **funcionários**; usuário final de app é **Cognito**.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Identity Center é para usuários do app | É para **pessoas da organização** |
| Identity Center substitui o IAM | Ele **usa** IAM roles; o IAM continua autorizando |
| Identity Center emite access key de longo prazo | Credencial **sempre temporária** (STS) |
| Preciso criar roles em cada conta | O **permission set** é propagado automaticamente |
| Identity Center é cobrado | **Sem cobrança adicional** |
| AD Connector sozinho resolve SSO multi-conta | Ele é o **gateway** para o AD; quem atribui acesso às contas é o **Identity Center**. Juntos, são a montagem padrão |

## Links

- [[1 - Seguranca (30%)/IAM Identity Center/1 - O que e|1 - O que e]] · [[1 - Seguranca (30%)/IAM Identity Center/2 - Decorar|2 - Decorar]] · [[1 - Seguranca (30%)/IAM Identity Center/3 - Detalhes|3 - Detalhes]]
