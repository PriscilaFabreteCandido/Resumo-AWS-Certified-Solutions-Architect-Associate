---
tags: [saa-c03, organizations, detalhes]
servico: AWS Organizations e Control Tower
atualizado: 2026-11-08
---

# Organizations e Control Tower — Detalhes

## 1. Por que SCP não concede

É o conceito mais testado do domínio 1. A SCP define o **conjunto máximo** de ações possíveis numa conta. A permissão efetiva é:

```
permissão efetiva = IAM policy  ∩  SCP  ∩  permissions boundary  ∩  session policy
```

Duas consequências que viram questão:

**Caso 1 — SCP liberando tudo, IAM vazio.** Resultado: **nenhum acesso**. *"A user without any IAM permission policies has no access, even if the applicable SCPs allow all services and all actions."*

**Caso 2 — IAM com `s3:*`, SCP só permitindo EC2.** Resultado: **nenhum acesso ao S3**.

## 2. O que a SCP alcança (e o que não)

| Alcança | Não alcança |
|---|---|
| Usuários e roles das **contas membro** | Usuários e roles da **management account** |
| O **root** das contas membro | **Service-linked roles** |
| Delegated administrators | Principals de fora da organização |

> [!important] Por isso não se roda workload na management account
> A SCP não a protege. A boa prática (e o que o Control Tower monta) é manter a management account só para gestão da organização, com workloads em contas membro.

## 3. Estrutura típica de OUs

```
Root
├── SCP: nega regiões não aprovadas, nega deletar CloudTrail
│
├── Security OU
│     ├── Log Archive  (bucket central de logs, Object Lock)
│     └── Audit        (acesso de leitura para o time de segurança)
├── Infrastructure OU
│     ├── Network      (VPC compartilhada via RAM, TGW, DX)
│     └── Shared Services
├── Workloads OU
│     ├── Prod OU      (SCP mais restritiva)
│     └── NonProd OU   (SCP permite mais, para experimentação)
└── Sandbox OU         (SCP com limite de gasto e de tipos de instância)
```

As SCPs que aparecem em prova nessa estrutura:

| Objetivo | SCP |
|---|---|
| Restringir regiões | `Deny` com condição `aws:RequestedRegion` |
| Proteger a trilha de auditoria | `Deny` em `cloudtrail:StopLogging`, `cloudtrail:DeleteTrail` |
| Impedir saída de dados | `Deny` em `s3:PutBucketPolicy` sem `aws:PrincipalOrgID` |
| Limitar tipos de instância caros | `Deny` em `ec2:RunInstances` com condição em `ec2:InstanceType` |
| Impedir desativar GuardDuty/Config | `Deny` nas APIs de disable |

## 4. Consolidated billing

O dono da management account *"is responsible for paying for all usage, data, and resources used by the accounts in the organization"*, e a organização produz *"a single consolidated bill"*.

Dois efeitos práticos de custo:
- O uso **agregado** das contas atinge faixas de desconto por volume mais cedo
- **Savings Plans** e **Reserved Instances** podem ser compartilhados entre contas da organização

E as **cost allocation tags** das contas membro aparecem na fatura consolidada: *"You can use cost allocation tags in individual AWS accounts... this allocation will be visible in the consolidated bill."*

## 5. AWS RAM — compartilhar recursos

O Organizations compartilha **permissão**; o **AWS RAM** compartilha **recursos**: *"helps you securely share your resources across AWS accounts, within your organization or organizational units (OUs), and with IAM roles and users"*.

O caso de uso de prova é **VPC sharing**: a conta de rede compartilha **subnets** com as contas de workload. Isso reduz número de VPCs, NAT gateways e conexões — é resposta de custo e de simplificação.

Compartilhar dentro da organização precisa que o sharing esteja ativado; fora dela, exige convite.

## 6. Control Tower

É a landing zone opinativa: *"Use AWS Control Tower to apply pre-packaged governance rules for security, operations, and compliance for your AWS workloads."*

Ele provisiona as contas de **Log Archive** e **Audit**, habilita Config e CloudTrail em toda a organização, configura o **IAM Identity Center** e oferece o **Account Factory**.

Na prova, a escolha é:

| Enunciado | Resposta |
|---|---|
| "montar uma estrutura multi-conta **com guardrails prontos**, rápido" | **Control Tower** |
| "aplicar uma política específica em contas que já existem" | **SCP** direto no Organizations |
| "padronizar o provisionamento de contas novas" | **Account Factory** (Control Tower) |
| "catálogo de produtos aprovados para os times" | **Service Catalog** |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[IAM]] · [[AWS RAM]] · [[Config]] · [[CloudTrail]] · [[IAM Identity Center]] · [[Governanca (Artifact, Trusted Advisor, Service Catalog)]]
- [SCPs](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html)
