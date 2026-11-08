---
tags: [saa-c03, identity-center, sso, seguranca]
servico: AWS IAM Identity Center
tipo: SSO multi-conta
dominios: [1]
atualizado: 2026-11-08
---

# AWS IAM Identity Center — O que é

> [!info] Em uma frase
> O serviço de **acesso de pessoas** a várias contas AWS e a aplicações, com **login único (SSO)**, federado com o diretório corporativo. Substitui a prática de criar IAM user em cada conta.

## O que é, em palavras simples

Antes: 15 contas × N funcionários = centenas de IAM users para criar, revogar e auditar.
Depois: um conjunto de **permission sets**, atribuídos a **grupos** do seu diretório, válidos nas contas que você escolher.

A pessoa faz login num portal, escolhe a conta e o papel, e recebe credencial **temporária** (via STS). Nenhum segredo de longo prazo existe.

## As peças

| Peça | O que é |
|---|---|
| **Identity source** | De onde vêm os usuários: diretório do próprio Identity Center, **Active Directory** (via Directory Service), ou IdP externo (Okta, Entra ID, Ping) por SAML/SCIM |
| **Permission set** | Um conjunto de permissões (políticas gerenciadas e inline) que se torna uma **role** nas contas atribuídas |
| **Atribuição** | Grupo (ou usuário) × permission set × conta |
| **Portal de acesso** | Onde a pessoa escolhe conta e papel; também gera credencial para CLI |

## A regra de decisão

| Quem precisa de acesso | Serviço |
|---|---|
| **Funcionário** entrando na console/CLI de várias contas | **IAM Identity Center** |
| **Aplicação ou serviço** | **IAM role** (+ STS) |
| **Usuário final** do seu app web/mobile | **Cognito** |

O guia cita o serviço nominalmente em **Task 1.1** (*"AWS federated access and identity services (for example, IAM, AWS IAM Identity Center)"*) e em **Task 1.2**.

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[IAM]] · [[STS]] · [[Directory Service]] · [[Cognito]] · [[Organizations e Control Tower]]
