---
tags: [saa-c03, directory-service, detalhes]
servico: AWS Directory Service
atualizado: 2026-11-08
---

# Directory Service — Detalhes

## 1. Qual escolher — a árvore de decisão

```
A aplicação precisa de AD?
├── Não  →  IAM Identity Center (pessoas) ou Cognito (usuários do app)
└── Sim
    ├── É RDS SQL Server, FSx for Windows, ou precisa de trust/MFA/LDAPS?
    │      →  AWS MANAGED MICROSOFT AD
    ├── Os usuários devem permanecer SÓ on-premises, sem replicar?
    │      →  AD CONNECTOR
    └── Diretório pequeno, simples, barato, sem recursos avançados?
           →  SIMPLE AD
```

## 2. AWS Managed Microsoft AD

É Active Directory de verdade rodando em Windows Server gerenciado pela AWS, em **duas AZs** por padrão.

O que o torna a escolha padrão:
- Suporta **trust** (floresta/domínio) com o AD on-premises — os usuários continuam no AD corporativo, mas os recursos AWS confiam nele
- Suporta **MFA**, **LDAPS**, **extensão de schema**, **cmdlets do PowerShell AD**
- É a **única** opção compatível com **RDS for SQL Server**
- Instâncias EC2 Windows e Linux podem fazer **domain join**
- É fonte de identidade válida para o **IAM Identity Center**

Editções: **Standard** (até ~30.000 objetos) e **Enterprise** (até ~500.000 objetos).

## 3. AD Connector

É **proxy**, não diretório: *"a proxy service that provides an easy way to connect compatible AWS applications... to your existing on-premises Microsoft Active Directory."*

Nada é replicado para a AWS — a autenticação é encaminhada para o AD on-premises. Isso tem duas consequências:

**A favor**: nenhum dado de identidade sai do datacenter; é a opção de menor impacto para quem tem requisito de residência de identidade.

**Contra**: depende da conectividade (DX ou VPN) estar no ar; e *"AD Connector is not compatible with RDS SQL Server."*

## 4. Simple AD

Compatível com AD, implementado sobre **Samba 4**. Serve para *"a low-scale, low-cost directory"*.

A lista do que **não** suporta é o que a prova cobra: *"multi-factor authentication (MFA), trust relationships, DNS dynamic update, schema extensions, communication over LDAPS, PowerShell AD cmdlets, or FSMO role transfer"*. E também *"not compatible with RDS SQL Server"*.

Se o enunciado menciona **qualquer** item dessa lista, Simple AD está errado.

## 5. Os serviços que dependem de AD

| Serviço | Dependência |
|---|---|
| **FSx for Windows File Server** | AD para autenticação **SMB** — Managed Microsoft AD ou AD on-premises via trust |
| **RDS for SQL Server** (Windows Auth) | **Managed Microsoft AD** obrigatoriamente |
| **WorkSpaces**, **AppStream** | Diretório |
| **EC2 Windows** em domínio | Domain join |
| **Amazon FSx for NetApp ONTAP** (SMB) | AD |

Essa é a ligação que a prova faz: a questão parece ser sobre **FSx** ou **RDS**, mas a resposta correta inclui o **Directory Service**.

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[FSx]] · [[RDS]] · [[IAM Identity Center]] · [[Cognito]]
