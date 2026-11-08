---
tags: [saa-c03, dominio-1, iam, sts, organizations]
dominio: 1
tasks: [1.1]
atualizado: 2026-11-08
---

# IAM, STS e Organizations

## 🧩 Em 30 segundos

- **Deny explícito ganha de tudo.** Sem allow em nenhum lugar = deny implícito.
- **Role + STS** é a resposta para qualquer "dar acesso a" — outra conta, um serviço, uma aplicação, um usuário federado. Nunca access key de longo prazo.
- **SCP é teto, não concessão.** Permissão efetiva = interseção de IAM ∩ SCP ∩ boundary.
- **Cross-account exige os dois lados**: policy de identidade na origem **e** policy de recurso no destino.
- **IAM Identity Center** = acesso de **pessoas** a várias contas (SSO). **Role** = acesso de **sistemas**.

## 🧠 Teste-se primeiro

> [!question]- Os 7 passos da lógica de avaliação, na ordem
> 1. **Deny explícito** em qualquer policy → nega e para
> 2. **RCPs** (resource control policies) → precisa de Allow aplicável
> 3. **SCPs** → precisa de Allow aplicável
> 4. **Policy de recurso** → pode conceder sozinha no mesmo account
> 5. **Policy de identidade**
> 6. **Permissions boundary**
> 7. **Session policy**

> [!question]- Quando a policy de recurso concede acesso sozinha?
> **No mesmo account**, para IAM user, sessão de role e sessão de usuário federado: *"For most resources, you only need an explicit Allow for the principal in either an identity-based policy or a resource-based policy."*
> **Exceções**: **trust policy de role IAM** e **key policy do KMS** — essas *"must explicitly allow access for principals"*.
> **Cross-account**: sempre os **dois** lados.

> [!question]- Identity-based + resource-based = união ou interseção? E com boundary?
> Mesmo account, identidade + recurso = **união** (*"the resulting permissions are the union"*).
> Com **permissions boundary** = **interseção** (*"the resulting permissions are the intersection of the two categories"*).

> [!question]- O que a SCP NÃO alcança?
> A **conta de gerenciamento** (*"SCPs don't affect users or roles in the management account"*), qualquer **service-linked role**, e principals de **fora** da organização.
> Alcança, sim, o **root user das contas membro** e os delegated administrators.

## Os tipos de política (e para que serve cada uma)

| Tipo | Anexada a | Função |
|---|---|---|
| **Identity-based** | user, group, role | Concede permissão |
| **Resource-based** | o recurso (bucket, fila, tópico, chave KMS) | Concede permissão, e define **quem de fora** pode entrar |
| **SCP** | raiz, OU ou conta (Organizations) | **Teto** máximo. Não concede |
| **RCP** | raiz, OU ou conta (Organizations) | Teto máximo **no lado do recurso** |
| **Permissions boundary** | user ou role | **Teto** para aquela identidade. Não concede |
| **Session policy** | passada no `AssumeRole`/federação | **Teto** para aquela sessão |
| **ACL** (legado) | objeto/bucket S3 | Controle cross-account antigo. A AWS recomenda desabilitar (Bucket owner enforced) |

> [!tip] Mnemônico das 3 que só limitam
> **S**CP, **B**oundary, **S**ession policy → "SBS": só **S**ubtraem, nunca **S**omam.

## Role: as quatro situações de prova

| Situação | Solução |
|---|---|
| EC2 / Lambda / ECS precisa chamar a AWS | **Role de serviço** anexada ao recurso. Nunca access key no código ou em variável de ambiente |
| Conta A precisa acessar recurso da conta B | **Role na conta B** com trust policy confiando na conta A; a conta A chama `sts:AssumeRole` |
| Usuário do Active Directory corporativo precisa entrar na AWS | **Federação**: IAM Identity Center (recomendado) ou SAML 2.0 → assume role. *"Determining when to federate a directory service with IAM roles"* é skill explícita do guia |
| Usuário final de app mobile/web precisa ler o S3 dele | **Cognito identity pool** → credencial temporária |

**STS** emite as credenciais temporárias. Operações que caem: `AssumeRole` (cross-account e serviços), `AssumeRoleWithSAML` (federação corporativa), `AssumeRoleWithWebIdentity` (Cognito / provedor social), `GetSessionToken` (MFA).

> [!important] Confused deputy
> Quando um **terceiro** assume role na sua conta, a trust policy deve exigir `sts:ExternalId`. Quando um **serviço AWS** assume, use as condições `aws:SourceArn` e `aws:SourceAccount`. É o padrão que aparece em bucket policy de OAC do CloudFront, por exemplo.

## Organizations

- **Consolidated billing**: *"Organizations provides you with a single consolidated bill"*; o dono da conta de gerenciamento paga tudo. **Sem custo adicional** pelo serviço.
- **OUs** organizam contas em árvore; SCP aplicada numa OU vale para toda a subárvore.
- **Control Tower**: *"apply pre-packaged governance rules for security, operations, and compliance"* — é a landing zone pronta, construída sobre Organizations + SCPs + Config.
- **AWS RAM**: compartilha **recursos** entre contas (subnet, Transit Gateway, License Manager, Route 53 Resolver rules…). *"you can share resources with all the other accounts in the organization or only those accounts contained by one or more specified organizational units (OUs)"*. **Sem custo adicional**.

> [!tip] Por que separar em contas é resposta de prova
> Conta é o **limite de isolamento mais forte** da AWS. "Separar dev de prod", "isolar carga regulada (PCI/HIPAA)", "limitar o estrago de uma credencial vazada" → **conta separada dentro de uma Organization**, com SCP de guardrail. Não é sobre billing.

## ❓ Questões de prova

> [!example]- Q1 — Uma aplicação em EC2 precisa ler um bucket S3. Qual é a forma recomendada?
> **A)** Gravar access key e secret em variável de ambiente
> **B)** **Anexar uma IAM role à instância com permissão de leitura no bucket** ✅
> **C)** Guardar as credenciais no Parameter Store e ler no boot
> **D)** Tornar o bucket público e filtrar por IP
>
> **Por que B**: role entrega credencial temporária, rotacionada automaticamente, sem segredo em nenhum lugar. É o princípio de menor privilégio aplicado.
> **A errada**: credencial de longo prazo em disco/variável é exatamente o que a AWS manda evitar.
> **C errada**: melhor que A, mas ainda existe uma credencial de longo prazo para vazar. Parameter Store é para **configuração**, não para substituir role.
> **D errada**: bucket público é falha de segurança; filtro por IP não autentica nada.

> [!example]- Q2 — Vários times precisam de acesso de console a 15 contas AWS, usando as identidades do Active Directory existente. Menor esforço operacional?
> **A)** Criar IAM users em cada conta e sincronizar senhas
> **B)** **AWS IAM Identity Center integrado ao diretório, com permission sets atribuídos por grupo** ✅
> **C)** Uma conta central com IAM users e role switching manual para as outras 14
> **D)** AD Connector em cada conta com usuários IAM espelhados
>
> **Por que B**: Identity Center é o serviço de **acesso federado de pessoas a múltiplas contas**, com atribuição por grupo. O guia cita o serviço nominalmente em *Task 1.1*.
> **A errada**: 15 × N usuários para gerenciar e revogar. Pior esforço operacional possível.
> **C errada**: funciona (é o padrão antigo), mas você gerencia roles e trust policies à mão em 14 contas.
> **D errada**: AD Connector é proxy para apps AWS usarem o AD; não resolve atribuição de acesso multi-conta por si.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| SCP concede permissão | É teto. IAM sem allow = sem acesso, mesmo com SCP liberando tudo |
| SCP protege a conta de gerenciamento | Não afeta a conta de gerenciamento |
| Bucket policy sozinha resolve cross-account | Precisa de allow nos **dois** lados |
| Trust policy de role funciona por união | Trust policy e key policy do KMS **precisam** de allow explícito ao principal |
| Deny implícito e explícito são equivalentes | Deny **explícito** não é revertido por nada |
| Root user é só um usuário com muito poder | É a única identidade com **deny implícito desligado**: *"all requests are implicitly denied with the exception of the AWS account root user, which has full access"* |
| IAM é regional | IAM é **global** |
| Policy de recurso é afetada por SCP | SCP limita o **principal**; a avaliação intersecta identidade, SCP e RCP |

## Links

- [[01 - Dominio 1 - Design Secure Architectures (30%)]]
- [[Identidade de aplicacao - Cognito e Directory Service]]
- [[Criptografia - KMS, CloudHSM e ACM]]
- [Lógica de avaliação de política IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html)
- [SCPs](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html)
