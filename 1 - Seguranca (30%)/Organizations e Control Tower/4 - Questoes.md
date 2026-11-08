---
tags: [saa-c03, organizations, questoes]
servico: AWS Organizations e Control Tower
atualizado: 2026-11-08
---

# Organizations e Control Tower — Questões

> [!question]- Q1. Compliance exige que **nenhuma** conta possa desabilitar o CloudTrail, nem o root dela.
> **A)** Policy IAM com `Deny` em `cloudtrail:StopLogging` em todos os usuários
> **B)** **SCP com `Deny` em `cloudtrail:StopLogging` e `cloudtrail:DeleteTrail` na raiz da organização** ✅
> **C)** Permissions boundary em todos os roles
> **D)** AWS Config rule que reativa o CloudTrail
>
> **Por que B**: SCP é o único controle que alcança o **root de uma conta membro**.
> **A errada**: policy IAM não se aplica ao root.
> **C errada**: boundary se aplica a users e roles, não ao root.
> **D errada**: Config **detecta e remedia depois**; o enunciado pede prevenção.
> ⚠️ A SCP **não** protege a **management account** — por isso não se roda workload nela.

> [!question]- Q2. Um usuário tem policy IAM com `s3:*`, mas a SCP da OU dele só permite EC2. Ele acessa o S3?
> **A)** Sim, a policy IAM é mais específica
> **B)** **Não: a permissão efetiva é a interseção** ✅
> **C)** Sim, se o bucket for da mesma conta
> **D)** Depende da ordem de avaliação
>
> **Por que B**: *"the boundary, the SCP, and the identity-based policy must all allow the action"*.

> [!question]- Q3. Garantir que nenhuma das 30 contas crie recursos fora de `us-east-1` e `sa-east-1`.
> **A)** AWS Budgets por região
> **B)** **SCP na raiz com `Deny` condicionado a `aws:RequestedRegion`** ✅
> **C)** Config rule com remediação
> **D)** IAM policy em todos os roles
>
> **Por que B**: guardrail **preventivo** que alcança todas as contas membro, incluindo o root delas.
> **A errada**: Budgets avisa **depois** do gasto.
> **C errada**: Config detecta e remedia depois da criação.
> **D errada**: inviável manter em 30 contas e não alcança o root.

> [!question]- Q4. Uma empresa quer montar uma estrutura multi-conta com contas de log e auditoria, Config e CloudTrail organizacionais e SSO, no menor tempo.
> **A)** Criar as contas manualmente e configurar cada serviço
> **B)** **AWS Control Tower** ✅
> **C)** CloudFormation StackSets
> **D)** Service Catalog
>
> **Por que B**: é a landing zone pronta — *"pre-packaged governance rules for security, operations, and compliance"*.
> **C errada**: StackSets distribui stacks (e o Control Tower os usa internamente), mas não traz a estrutura opinativa pronta.
> **D errada**: Service Catalog é catálogo de produtos para os times consumirem.

> [!question]- Q5. Vários times precisam lançar recursos em subnets gerenciadas pelo time de rede, sem criar uma VPC por conta.
> **A)** VPC peering entre todas as contas
> **B)** **AWS RAM compartilhando as subnets da VPC do time de rede com as contas da organização** ✅
> **C)** Transit Gateway
> **D)** PrivateLink
>
> **Por que B**: é o caso de uso de **VPC sharing** via RAM — reduz VPCs, NAT gateways e conexões.
> **C errada**: TGW conecta VPCs **separadas**; o enunciado quer evitar criá-las.
> **D errada**: PrivateLink expõe **serviço**, não subnet.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| SCP concede permissão | *"No permissions are granted by an SCP."* |
| SCP protege a management account | **Não afeta** a management account |
| SCP limita service-linked role | *"SCPs do not affect any service-linked role."* |
| SCP não alcança o root | Alcança o root das **contas membro** |
| Organizations é pago | *"offered at no additional charge"* |
| Config previne | Config **detecta e remedia**. Prevenir é **SCP** |
| Control Tower substitui o Organizations | É construído **sobre** ele |
| RAM compartilha permissão | RAM compartilha **recurso**; permissão é IAM/SCP |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
