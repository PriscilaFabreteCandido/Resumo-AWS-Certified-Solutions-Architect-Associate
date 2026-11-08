---
tags: [saa-c03, iam, questoes]
servico: AWS IAM
atualizado: 2026-11-08
---

# IAM — Questões

> [!question]- Q1. Um usuário tem policy IAM permitindo `s3:*`, mas a SCP da OU dele só permite EC2. Ele acessa o S3?
> **A)** Sim, a policy IAM é mais específica
> **B)** **Não: a permissão efetiva é a interseção, e a SCP é um teto** ✅
> **C)** Sim, se o bucket for da mesma conta
> **D)** Depende da ordem de avaliação
>
> **Por que B**: *"the boundary, the SCP, and the identity-based policy must all allow the action"*. E o inverso também: *"A user without any IAM permission policies has no access, even if the applicable SCPs allow all services and all actions."*

> [!question]- Q2. Compliance exige que **nenhuma** conta possa desabilitar o CloudTrail, nem o root dela. Qual solução?
> **A)** Policy IAM com `Deny` em `cloudtrail:StopLogging` em todos os usuários
> **B)** **SCP com `Deny` em `cloudtrail:StopLogging` e `cloudtrail:DeleteTrail` na raiz da organização** ✅
> **C)** Permissions boundary em todos os roles
> **D)** AWS Config rule que reativa o CloudTrail
>
> **Por que B**: SCP é o único controle que alcança o **root de uma conta membro** — *"SCPs affect the root user of member accounts"*.
> **A errada**: policy IAM não se aplica ao root.
> **C errada**: boundary se aplica a users e roles, não ao root.
> **D errada**: Config **detecta e remedia depois**; o enunciado pede prevenção.
> ⚠️ Lembre: a SCP **não** afeta a **conta de gerenciamento**.

> [!question]- Q3. Preciso dar acesso a um bucket da conta B para um role da conta A. O que configurar?
> **A)** Só a bucket policy na conta B
> **B)** Só a policy do role na conta A
> **C)** **As duas: policy no role (conta A) e bucket policy (conta B)** ✅
> **D)** Uma SCP na organização
>
> **Por que C**: *"AWS allows the request only if both account policy evaluations allow the request."*
> **A errada**: política de recurso sozinha só basta **dentro da mesma conta**.
> **D errada**: SCP não concede nada.

> [!question]- Q4. Uma aplicação em EC2 precisa ler um bucket S3. Forma recomendada?
> **A)** Access key e secret em variável de ambiente
> **B)** **IAM role anexada à instância, com permissão de leitura no bucket** ✅
> **C)** Credenciais no Parameter Store, lidas no boot
> **D)** Bucket público filtrado por IP
>
> **Por que B**: credencial temporária, rotacionada automaticamente, sem segredo armazenado.
> **A errada**: credencial de longo prazo em disco é o que a AWS manda evitar.
> **C errada**: melhor que A, mas ainda existe uma credencial de longo prazo para vazar.
> **D errada**: bucket público não autentica nada.

> [!question]- Q5. 15 contas AWS, acesso de console para vários times, usando as identidades do Active Directory existente. Menor esforço operacional?
> **A)** IAM users em cada conta, com senhas sincronizadas
> **B)** **IAM Identity Center integrado ao diretório, com permission sets atribuídos por grupo** ✅
> **C)** Uma conta central com IAM users e role switching manual para as outras 14
> **D)** AD Connector em cada conta com usuários IAM espelhados
>
> **Por que B**: é o serviço de acesso federado de **pessoas** a múltiplas contas, citado nominalmente no guia (*Task 1.1*).
> **A errada**: 15 × N usuários para gerenciar e revogar.
> **C errada**: funciona (padrão antigo), mas você mantém roles e trust policies à mão em 14 contas.
> **D errada**: AD Connector é proxy para apps AWS usarem o AD; não resolve atribuição multi-conta.

> [!question]- Q6. Um time precisa poder criar roles para suas aplicações, mas sem nunca conceder mais que leitura no S3. Qual mecanismo?
> **A)** SCP na conta do time
> **B)** **Permissions boundary exigida nas roles que o time cria** ✅
> **C)** Session policy
> **D)** Grupo IAM com política de leitura
>
> **Por que B**: boundary é o mecanismo de **delegação segura** — o time cria roles, mas a permissão efetiva é a interseção com o teto.
> **A errada**: SCP funcionaria como guardrail de conta, mas é grosseiro e gerenciado pela organização, não pelo dono da conta; o caso descrito é delegação de criação de role.
> **C errada**: session policy vale para uma sessão, não para roles futuras.
> **D errada**: grupo controla o que o time faz, não o que as roles criadas por ele podem fazer.

> [!question]- Q7. Um fornecedor externo precisa assumir uma role na sua conta. O que incluir na trust policy?
> **A)** Apenas o ARN da conta do fornecedor
> **B)** **O ARN da conta do fornecedor e a condição `sts:ExternalId`** ✅
> **C)** `aws:SourceArn` do fornecedor
> **D)** MFA obrigatório
>
> **Por que B**: `ExternalId` é a proteção contra **confused deputy** com terceiros — impede que o fornecedor use a mesma role em nome de outro cliente dele.
> **C errada**: `aws:SourceArn` é o padrão para **serviços AWS** assumindo role, não para terceiros.
> **D errada**: MFA é boa prática para humanos; não endereça o confused deputy de integração.

## ⚠️ Armadilhas do IAM

| Parece | É |
|---|---|
| SCP concede permissão | *"No permissions are granted by an SCP."* É teto |
| SCP alcança a conta de gerenciamento | **Não alcança** |
| SCP limita service-linked role | *"SCPs do not affect any service-linked role"* |
| Bucket policy resolve cross-account sozinha | Só **na mesma conta**. Cross-account exige os dois lados |
| Trust policy funciona por união | Trust policy e key policy do KMS **precisam** de Allow explícito ao principal |
| Permissions boundary concede acesso | É **interseção** |
| Deny implícito e explícito são iguais | Deny **explícito** não é revertido por nada |
| Root é só um usuário poderoso | É a **única** identidade sem deny implícito |
| IAM é regional | É **global** |
| Grupo pode ser principal de uma policy | **Não pode**. Nem pode ser aninhado |
| MFA só para humanos | A boa prática oficial inclui o **root** — e `aws:MultiFactorAuthPresent` pode ser exigido em política |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
- [[03 - Pegadinhas mestre]]
