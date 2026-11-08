---
tags: [saa-c03, directory-service, decorar]
servico: AWS Directory Service
atualizado: 2026-11-08
---

# Directory Service — Decorar

## A tabela de decisão

| | **Managed Microsoft AD** | **AD Connector** | **Simple AD** |
|---|---|---|---|
| Natureza | **AD real** (Windows Server AD) | **Proxy** para o AD on-premises | Compatível com AD (**Samba 4**) |
| Usuários ficam | Na AWS | **On-premises** | Na AWS |
| Trust com AD on-premises | **Sim** | Não se aplica (é proxy) | **Não suporta** |
| MFA | Sim | Sim (via RADIUS) | **Não suporta** |
| LDAPS | Sim | Sim | **Não suporta** |
| Schema extension | Sim | — | **Não suporta** |
| **RDS SQL Server** | **Sim** | **Não compatível** | **Não compatível** |
| Edições | **Standard** (~30.000 objetos) e **Enterprise** (~500.000 objetos) | — | Small e Large |

## Os números das edições

| Edição | Capacidade |
|---|---|
| **Standard** | *"up to 5,000 employees... up to 30,000* directory objects"* |
| **Enterprise** | *"up to 500,000* directory objects"* |

Há também uma **Hybrid Edition** (estender um AD self-managed existente).

## A regra de ouro

> **RDS for SQL Server com Windows Authentication → somente AWS Managed Microsoft AD.**

As duas outras opções dizem literalmente *"not compatible with RDS SQL Server"*.

## Directory Service × Identity Center × Cognito

| Objetivo | Serviço |
|---|---|
| Aplicação precisa falar **LDAP/Kerberos** com um AD | **Directory Service** |
| **Funcionários** acessando contas AWS com SSO | **IAM Identity Center** (que pode usar o Directory Service como fonte) |
| **Usuários finais** do seu app | **Cognito** |

A única menção a Identity Center na página do Directory Service está sob **AWS Managed Microsoft AD**: *"With AWS IAM Identity Center, you can also obtain short-term credentials for use with the AWS SDK and CLI, and use preconfigured SAML integrations to sign in to many cloud applications."*

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
