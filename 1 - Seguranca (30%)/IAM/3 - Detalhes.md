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

## 5b. Usuário raiz (root) — as boas práticas

É o tema que a prova cobra de forma mais literal, porque o guia oficial lista como skill:
*"Applying AWS security best practices to IAM users and root users (for example, multi-factor authentication [MFA])"*.

### A lista clássica (a que mais aparece em prova e em material de estudo)

1. **Use uma senha forte** para proteger o acesso ao Console de Gerenciamento em nível de conta.
2. **Nunca compartilhe** a senha nem as chaves de acesso do usuário raiz com ninguém.
3. Se você **tem** uma chave de acesso para o root, **exclua-a**. Se precisar mantê-la, **altere-a regularmente**. Não guarde as chaves no Amazon S3, nem mesmo criptografadas.
4. Se você **não tem** chave de acesso para o root, **não crie uma** — a menos que seja absolutamente necessário.
5. **Habilite o MFA** na conta do usuário raiz.

> [!important] Decore essa lista para a prova
> É a formulação que aparece nos enunciados. Os cinco pontos se resumem em três ideias: **senha forte**, **MFA**, e **nenhuma chave de acesso para o root**.

### O que a doc atual diz — e onde ela já mudou

A página oficial de boas práticas do root hoje tem **nove** recomendações, nesta ordem:

| # | Recomendação (título oficial) |
|---|---|
| 1 | *"Secure your root user credentials to prevent unauthorized use"* |
| 2 | *"Use a strong root user password to help protect access"* |
| 3 | *"Secure your root user sign-in with multi-factor authentication (MFA)"* |
| 4 | **"Don't create access keys for the root user"** |
| 5 | *"Use multi-person approval for root user sign-in wherever possible"* |
| 6 | *"Use a group email address for root user credentials"* |
| 7 | *"Restrict access to account recovery mechanisms"* |
| 8 | *"Secure your AWS Organizations account root user credentials"* |
| 9 | *"Monitor access and usage"* |

> [!warning] Três pontos em que a lista clássica está desatualizada
> **1. Chave de acesso do root: a orientação não é mais "rotacionar", é "não criar".** O título atual é literal — *"Don't create access keys for the root user"* — e o texto diz: *"We strongly recommend that you do not create access keys for your root user because the root user has full access to all AWS services and resources in the account, including billing information."* Para acesso programático, a doc hoje aponta para o comando `aws login` com as credenciais do root, **não** para criar chaves. **A doc atual não dá nenhuma orientação de rotação para chaves de root.**
>
> **2. A frase "não criptografe as chaves nem as salve no S3" não existe mais** nas páginas atuais de boas práticas do IAM nem do root. Ela vem de material antigo. A ideia por trás continua certa (credencial de longo prazo não se guarda em bucket), mas não cite como texto oficial.
>
> **3. MFA no root deixou de ser recomendação e passou a ser exigência.** A doc diz: *"All AWS account types (standalone, management, and member accounts) require MFA to be configured for their root user. Users must register MFA within 14 days of their first sign-in attempt to access the AWS Management Console if MFA is not already enabled."*
>
> Na prova, se a alternativa disser *"rotacionar regularmente a chave de acesso do root"*, ela provavelmente é tratada como aceitável (a prova acompanha a doc com atraso) — mas **"não criar chave de acesso para o root"** é sempre a resposta mais correta, nas duas versões.

### O recurso novo: centralized root access (Organizations)

Para quem usa **AWS Organizations**, a doc recomenda **remover as credenciais de root das contas-membro**:

> *"For multiple AWS accounts managed through AWS Organizations, we recommend removing root user credentials from member accounts to help prevent unauthorized use. You can remove the root user password, access keys, signing certificates, and deactivate and delete multi-factor authentication (MFA). Member accounts can't sign in to their root user or perform password recovery for their root user."*

E, importante: *"New accounts you create in Organizations have no root user credentials by default."*

Com o **centralized root access** habilitado, a conta de gerenciamento pode executar, de forma centralizada, três tarefas privilegiadas que antes exigiam o root da conta-membro:

- remover as credenciais de root da conta-membro (e permitir a recuperação de senha quando necessário);
- *"Remove a misconfigured bucket policy that denies all principals from accessing an Amazon S3 bucket."*
- *"Delete an Amazon Simple Queue Service resource-based policy that denies all principals from accessing an Amazon SQS queue."*

> [!tip] Por que essas duas tarefas precisavam do root
> Uma bucket policy (ou policy de fila SQS) que nega **todos os principais** se tranca por fora: nem o administrador consegue alterá-la, porque alterá-la exige uma permissão que a própria policy nega. O **root não tem deny implícito**, e por isso era a única saída. Hoje, dentro de uma Organization, o centralized root access resolve sem o root da conta-membro.

### As tarefas que **exigem** o usuário raiz

É uma lista de prova: se o enunciado descreve uma dessas, a resposta **é** o root (ou o centralized root access).

| Categoria | Tarefa |
|---|---|
| **Conta** | Alterar configurações da conta (em conta **standalone**: e-mail, senha do root e chaves de acesso do root) |
| **Conta** | **Encerrar** a conta (standalone) e **reabri-la** no período pós-encerramento |
| **Conta** | **Restaurar permissões de IAM** quando o único administrador revogou as próprias permissões |
| **Billing** | **Ativar o acesso do IAM** ao console de Billing and Cost Management |
| **Billing** | Algumas tarefas de faturamento e a visualização de certas notas fiscais |
| **S3** | Configurar um bucket para **MFA Delete** |
| **S3** | **Editar ou excluir uma bucket policy que nega todos os principais** |
| **SQS** | Editar ou excluir uma policy de fila que **nega todos os principais** |
| **EC2** | Registrar-se como vendedor no **Reserved Instance Marketplace** |
| **GovCloud** | Inscrever-se no AWS GovCloud (US) |

> [!note] Atenção à distinção "standalone"
> A doc ressalva que **contas standalone** (fora de uma Organization) exigem o root para atualizar e-mail, senha e chaves, e para encerrar a conta. Outras configurações — nome da conta, contatos, contato alternativo, moeda de pagamento e Regiões — **não** exigem o root.

### As 14 boas práticas gerais de IAM (títulos oficiais)

A página de boas práticas do IAM tem esta ordem — e os **dois primeiros** itens são a espinha dorsal das respostas de prova:

| # | Título oficial |
|---|---|
| **1** | ***"Require human users to use federation with an identity provider to access AWS using temporary credentials"*** |
| **2** | ***"Require workloads to use temporary credentials with IAM roles to access AWS"*** |
| 3 | *"Require multi-factor authentication (MFA)"* |
| 4 | *"Update access keys when needed for use cases that require long-term credentials"* |
| 5 | *"Follow best practices to protect your root user credentials"* |
| 6 | *"Apply least-privilege permissions"* |
| 7 | *"Get started with AWS managed policies and move toward least-privilege permissions"* |
| 8 | *"Use IAM Access Analyzer to generate least-privilege policies based on access activity"* |
| 9 | *"Regularly review and remove unused users, roles, permissions, policies, and credentials"* |
| 10 | *"Use conditions in IAM policies to further restrict access"* |
| 11 | *"Verify public and cross-account access to resources with IAM Access Analyzer"* |
| 12 | *"Use IAM Access Analyzer to validate your IAM policies for secure and functional permissions"* |
| 13 | *"Establish permissions guardrails across multiple accounts"* |
| 14 | *"Use permissions boundaries to delegate permissions management within an account"* |

> [!important] A hierarquia que resolve as questões de identidade
> A ordem da própria doc é a ordem de preferência:
> **pessoas → federação com credencial temporária** (IAM Identity Center / IdP) ·
> **aplicações e workloads → IAM role** ·
> **chave de acesso de longo prazo → último recurso**, e **nunca** para o root.
> Qualquer alternativa que crie um **IAM user com access key** para uma aplicação em EC2, ECS ou Lambda está errada: a resposta é **role**.

## 6. Multi-conta

A razão de arquitetura: a **conta** é o limite de isolamento mais forte da AWS. "Separar dev de prod", "isolar carga regulada (PCI/HIPAA)", "limitar o estrago de uma credencial vazada" → **conta separada** numa AWS Organizations, com **SCP** de guardrail.

Não é sobre billing — é sobre raio de explosão.

## Links

- [[1 - Seguranca (30%)/IAM/1 - O que e|1 - O que e]] · [[1 - Seguranca (30%)/IAM/2 - Decorar|2 - Decorar]] · [[1 - Seguranca (30%)/IAM/4 - Questoes|4 - Questoes]]
- [[1 - Seguranca (30%)/STS/1 - O que e|STS]] · [[1 - Seguranca (30%)/Organizations e Control Tower/1 - O que e|Organizations e Control Tower]] · [[1 - Seguranca (30%)/IAM Identity Center/1 - O que e|IAM Identity Center]] · [[1 - Seguranca (30%)/Cognito/1 - O que e|Cognito]] · [[1 - Seguranca (30%)/KMS/1 - O que e|KMS]]
- [Lógica de avaliação](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html)
- [Cross-account](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic-cross-account.html)
