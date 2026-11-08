---
tags: [saa-c03, directory-service, active-directory]
servico: AWS Directory Service
tipo: Diretório gerenciado
dominios: [1]
atualizado: 2026-11-08
---

# AWS Directory Service — O que é

> [!info] Em uma frase
> Oferece **Active Directory** na AWS em três sabores: **AWS Managed Microsoft AD** (AD de verdade, gerenciado), **AD Connector** (proxy para o AD on-premises) e **Simple AD** (compatível com AD, baseado em Samba 4).

## Quando é a resposta

Quando a aplicação **depende de Active Directory**, não quando você quer apenas controlar acesso à AWS:

- **FSx for Windows File Server** (autenticação SMB)
- **RDS for SQL Server** com Windows Authentication
- **WorkSpaces**, **AppStream**
- Aplicações .NET legadas que falam LDAP/Kerberos
- Join de instâncias EC2 Windows num domínio

## As três opções

| Opção | O que é | Use quando |
|---|---|---|
| **AWS Managed Microsoft AD** | *"powered by an actual Microsoft Windows Server Active Directory (AD), managed by AWS in the AWS Cloud"* | Precisa de AD real na AWS, com trust para o AD on-premises |
| **AD Connector** | *"a proxy service that provides an easy way to connect compatible AWS applications... to your existing on-premises Microsoft Active Directory"* | Quer usar o AD on-premises sem replicar usuários para a AWS |
| **Simple AD** | *"a Microsoft Active Directory–compatible directory from AWS Directory Service that is powered by Samba 4"* | Diretório *"low-scale, low-cost"*, sem recursos avançados |

## As duas incompatibilidades que caem

> **AD Connector**: *"AD Connector is not compatible with RDS SQL Server."*

> **Simple AD**: *"Simple AD does not support multi-factor authentication (MFA), trust relationships, DNS dynamic update, schema extensions, communication over LDAPS, PowerShell AD cmdlets, or FSMO role transfer. Simple AD is not compatible with RDS SQL Server."*

Ou seja: para **RDS SQL Server com Windows Auth**, só **AWS Managed Microsoft AD**.

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[IAM Identity Center]] · [[FSx]] · [[RDS]] · [[Cognito]]
- [O que é o Directory Service](https://docs.aws.amazon.com/directoryservice/latest/admin-guide/what_is.html)
