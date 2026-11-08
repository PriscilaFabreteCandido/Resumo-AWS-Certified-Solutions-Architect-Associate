---
tags: [saa-c03, sts, detalhes]
servico: AWS STS
atualizado: 2026-11-08
---

# STS — Detalhes

## 1. Por que o STS existe

A credencial de longo prazo (access key de um usuário IAM) tem três problemas: fica armazenada em algum lugar, não expira sozinha, e quando vaza o estrago é permanente até alguém notar.

O STS resolve isso trocando "guardar um segredo" por "provar quem você é e receber um segredo temporário". É a base de:

- **Role em instância EC2** (instance profile) — a credencial chega pelo IMDS e é rotacionada automaticamente
- **Role de execução do Lambda** — a credencial vem nas variáveis de ambiente da invocação
- **Acesso cross-account** — sem compartilhar chave
- **Federação** — o funcionário entra com a identidade corporativa
- **Cognito identity pool** — o usuário do app recebe credencial restrita

## 2. Os dois documentos de uma role

É o ponto que mais gera confusão.

**Trust policy** (também chamada *assume role policy*) fica **na role** e responde "**quem** pode me assumir". Tem o campo `Principal`. Exemplo para uma role assumida pela conta `111122223333`:

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": {"AWS": "arn:aws:iam::111122223333:root"},
    "Action": "sts:AssumeRole",
    "Condition": {"StringEquals": {"sts:ExternalId": "id-combinado"}}
  }]
}
```

**Permission policy** também fica na role e responde "**o que** eu posso fazer depois de assumida".

E na conta de origem, o principal precisa de uma policy permitindo `sts:AssumeRole` naquele ARN.

> [!important] Trust policy é exceção à regra da união
> A doc do IAM diz que políticas de recurso podem conceder sozinhas no mesmo account, **mas**: *"IAM role trust policies and KMS key policies are exceptions... they must explicitly allow access for principals."*
> Ou seja: sem o principal listado na trust policy, não há `AssumeRole`, ponto.

## 3. Confused deputy — os dois padrões

**Com terceiro (SaaS, fornecedor):** use **`sts:ExternalId`**. O problema que resolve: um fornecedor atende você e outros clientes. Se ele só precisa do ARN da sua role, um cliente malicioso dele poderia induzi-lo a acessar a **sua** conta. O `ExternalId` é um valor que só você e ele conhecem, verificado na trust policy.

**Com serviço AWS:** use **`aws:SourceArn`** e **`aws:SourceAccount`**. O problema: um serviço AWS assume role em seu nome; sem a condição, um recurso de outra conta poderia induzir o serviço a agir na sua. É o padrão da bucket policy do **OAC do CloudFront**, que inclui `"AWS:SourceArn"` com o ARN da distribuição.

## 4. Federação

| Cenário | Caminho |
|---|---|
| Funcionários acessando várias contas | **IAM Identity Center** (recomendado; federado com AD, Okta, Entra ID) |
| Federação SAML direta | IdP → `AssumeRoleWithSAML` → role |
| Usuário final de app | **Cognito user pool** (autentica) → **identity pool** → `AssumeRoleWithWebIdentity` |
| Workload fora da AWS (CI/CD, Kubernetes externo) | **OIDC provider** na conta → `AssumeRoleWithWebIdentity`, sem access key |

O guia oficial lista como skill: *"Determining when to federate a directory service with IAM roles"* e *"Designing a role-based access control strategy (for example, AWS STS, role switching, cross-account access)"*.

## 5. Sessão: duração e revogação

A duração da sessão é definida pelo **`DurationSeconds`** da chamada, limitado pelo **`MaxSessionDuration`** da role. **Role chaining** (assumir role a partir de uma sessão de role) limita a sessão a **1 hora**.

Credencial temporária **não pode ser revogada** antes de expirar. A técnica de contenção é anexar à role uma policy com `Deny` condicionado a `aws:TokenIssueTime` anterior a um instante — o que invalida todas as sessões emitidas antes daquele momento.

## 6. Endpoints regionais

O STS tem um endpoint global (`sts.amazonaws.com`) e endpoints **regionais** (`sts.sa-east-1.amazonaws.com`). A recomendação é usar o **regional**: menor latência e menor raio de falha. Em algumas regiões o STS precisa ser **ativado** explicitamente.

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[IAM]] · [[Cognito]] · [[IAM Identity Center]] · [[KMS]]
