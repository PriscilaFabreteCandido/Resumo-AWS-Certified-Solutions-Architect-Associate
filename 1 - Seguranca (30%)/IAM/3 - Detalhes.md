---
tags: [saa-c03, iam, detalhes]
servico: AWS IAM
atualizado: 2026-11-08
---

# IAM — Detalhes

## 1. A lógica de avaliação, passo a passo

A doc divide o processamento de uma requisição em três fases: autenticação, montagem do **request context**, e *"How AWS enforcement code logic evaluates requests to allow or deny access."*

A terceira fase segue esta ordem:

**1. Deny explícito.** O motor verifica **todas** as políticas aplicáveis (SCPs, RCPs, resource-based, identity-based, permissions boundaries, session policies) procurando um `Deny`. *"If the enforcement code finds even one explicit deny that applies, the enforcement code returns a final decision of Deny."*

**2. RCPs.** *"If the enforcement code does not find any applicable Allow statements in the RCPs, the enforcement code returns a final decision of Deny."* Quando RCPs são ativadas, a política `RCPFullAWSAccess` é anexada automaticamente e **não pode ser removida**.

**3. SCPs.** Mesma lógica: sem Allow aplicável, Deny.

**4. Resource-based policy.** Aqui está a sutileza mais testada: para principal do **mesmo account** (usuário IAM, sessão de role, sessão de usuário federado), a política de recurso **pode permitir sozinha**, mesmo com deny **implícito** na política de identidade. *"For most resources, you only need an explicit Allow for the principal in either an identity-based policy or a resource-based policy to grant access."*

Mas há exceção: *"IAM role trust policies and KMS key policies are exceptions... they must explicitly allow access for principals."*

**5. Identity-based policy.** *"If there are no identity-based policies or no statements... that allow the requested action, then the request is implicitly denied."*

**6. Permissions boundary.** *"If the policy that is used to set the permissions boundary does not allow the requested action, then the request is implicitly denied."*

**7. Session policy.** Se o principal não é uma sessão, a decisão final é Allow. Se nenhuma session policy foi passada, *"a default session policy is created."*

## 2. Cross-account — por que precisa dos dois lados

Dentro do **mesmo** account, identity-based e resource-based se **somam**: *"The resulting permissions are the union of the permissions of the two types."*

**Cross-account é diferente.** A doc é explícita: *"For cross-account requests, the requester in the trusted AccountA must have an identity-based policy. That policy must allow them to make a request to the resource in the trusting AccountB. Additionally, the resource-based policy in AccountB must allow the requester in AccountA to access the resource."* E conclui: *"AWS allows the request only if both account policy evaluations allow the request."*

> [!warning] A pegadinha
> "Dar acesso a um bucket de outra conta" **não** se resolve só com bucket policy. O role na conta de origem também precisa da permissão. A exceção é a **trust policy de role** (que é o que permite a outra conta *assumir* a role) e a **key policy do KMS**.

Para serviços que não são IAM nem KMS, a doc acrescenta: *"Resource-based policies for services other than IAM and AWS KMS may also require an explicit Allow statement within the same account to grant access."*

## 3. Roles — as quatro situações

| Situação | Solução |
|---|---|
| EC2, Lambda ou ECS precisa chamar a AWS | **Role de serviço** anexada ao recurso. **Nunca** access key no código ou em variável de ambiente |
| Conta A precisa acessar recurso da conta B | **Role na conta B**, com trust policy confiando na conta A; a conta A chama `sts:AssumeRole` |
| Usuário do Active Directory corporativo | **Federação** — IAM Identity Center (recomendado) ou SAML 2.0 → assume role |
| Usuário final de app mobile/web | **Cognito identity pool** → credencial temporária |

O guia oficial lista como skill: *"Determining when to federate a directory service with IAM roles"*.

### Confused deputy

Quando um **terceiro** assume role na sua conta, a trust policy deve exigir **`sts:ExternalId`**. Quando um **serviço AWS** assume, use **`aws:SourceArn`** e **`aws:SourceAccount`**. É o padrão que aparece, por exemplo, na bucket policy do OAC do CloudFront.

## 4. Permissions boundary × SCP × session policy

As três **limitam** e nunca concedem. A diferença é o escopo:

| | Aplicada a | Usada para |
|---|---|---|
| **SCP** | contas de uma organização | Guardrail organizacional ("ninguém usa a região X") |
| **Permissions boundary** | um usuário ou role | **Delegação segura**: permitir que um time crie roles, mas sem escapar de um teto |
| **Session policy** | uma sessão específica | Reduzir a permissão de uma sessão temporária |

Combinadas, a permissão efetiva é a **interseção**: a doc diz que, com boundary e SCP presentes, *"the boundary, the SCP, and the identity-based policy must all allow the action"*.

## 5. Boas práticas que a prova cobra

O guia lista como skill: *"Applying AWS security best practices to IAM users and root users (for example, multi-factor authentication [MFA])"*.

| Prática | Por quê |
|---|---|
| **MFA no root** e não usar o root | É a única identidade sem deny implícito |
| **Role em vez de usuário** | Credencial temporária, rotacionada, sem segredo armazenado |
| **IAM Identity Center** para pessoas | Centraliza acesso a várias contas, federado com o diretório |
| **Menor privilégio** | Comece restrito; use **IAM Access Analyzer** para gerar política a partir do uso real |
| **Políticas gerenciadas pela AWS como ponto de partida**, customer managed em produção | Versionáveis e auditáveis |
| **Grupos**, não políticas por usuário | Reduz deriva |
| **Access keys**: evitar; se existirem, rotacionar | Credencial de longo prazo é o principal vetor de vazamento |

**IAM Access Analyzer** merece destaque: identifica recursos acessíveis de fora da sua conta/organização, e gera políticas de menor privilégio a partir do CloudTrail.

## 6. Multi-conta

A razão de arquitetura: a **conta** é o limite de isolamento mais forte da AWS. "Separar dev de prod", "isolar carga regulada (PCI/HIPAA)", "limitar o estrago de uma credencial vazada" → **conta separada** numa AWS Organizations, com **SCP** de guardrail.

Não é sobre billing — é sobre raio de explosão.

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[STS]] · [[Organizations e Control Tower]] · [[IAM Identity Center]] · [[Cognito]] · [[KMS]]
- [Lógica de avaliação](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html)
- [Cross-account](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic-cross-account.html)
