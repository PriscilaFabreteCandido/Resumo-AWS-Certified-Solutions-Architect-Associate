---
tags: [saa-c03, iam, decorar]
servico: AWS IAM
atualizado: 2026-11-08
---

# IAM — Decorar

## A ordem de avaliação (decore esta sequência)

| # | Etapa | Se falhar |
|---|---|---|
| 1 | **Deny explícito** em qualquer política | **Nega e para** |
| 2 | **RCPs** (resource control policies) | Sem Allow aplicável → **Deny** |
| 3 | **SCPs** | Sem Allow aplicável → **Deny** |
| 4 | **Resource-based policy** | Pode **conceder sozinha** no mesmo account |
| 5 | **Identity-based policy** | Sem Allow → deny implícito |
| 6 | **Permissions boundary** | Fora do boundary → deny implícito |
| 7 | **Session policy** | Fora da session policy → deny |

## As duas frases que resolvem metade das questões

> *"An explicit deny overrides an explicit allow."* (um deny explícito prevalece sobre um allow explícito)

> *"By default, all requests are implicitly denied with the exception of the AWS account root user, which has full access."* (por padrão, todas as requisições são negadas implicitamente, com exceção do usuário raiz da conta AWS, que tem acesso total)

## União × interseção

| Combinação | Resultado |
|---|---|
| Identity-based **+** resource-based (mesmo account) | **União** — *"If an action is allowed by an identity-based policy, a resource-based policy, or both, then AWS allows the action"* (se uma ação é permitida por uma policy de identidade, por uma de recurso, ou por ambas, a AWS permite a ação) |
| Identity-based **+** permissions boundary | **Interseção** |
| Identity-based **+** SCP **+** RCP | **Interseção** — *"an action must be allowed by all three policy types"* |

## Cross-account: precisa dos DOIS lados

> *"the requester in the trusted AccountA must have an identity-based policy... Additionally, the resource-based policy in AccountB must allow the requester in AccountA to access the resource."* E: *"AWS allows the request only if both account policy evaluations allow the request."* (a AWS permite a requisição somente se as avaliações de policy das duas contas permitirem)

**Exceções que exigem Allow explícito ao principal, sempre:**
- **Trust policy de role IAM**
- **Key policy do KMS**

## SCP — o que NÃO alcança

| Não afeta | Citação |
|---|---|
| **Conta de gerenciamento** | *"SCPs don't affect users or roles in the management account"* |
| **Service-linked roles** | *"SCPs do not affect any service-linked role"* (SCPs não afetam nenhuma service-linked role) |
| Principals **fora** da organização | — |

E: *"No permissions are granted by an SCP."* (uma SCP não concede permissão nenhuma) · *"A user without any IAM permission policies has no access, even if the applicable SCPs allow all services and all actions."* (um usuário sem nenhuma policy de permissão do IAM não tem acesso, mesmo que as SCPs aplicáveis liberem todos os serviços e todas as ações) · SCP **afeta o root das contas membro**.

## Estrutura de uma política

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "NomeOpcional",
    "Effect": "Allow",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::meu-bucket/*",
    "Condition": {"StringEquals": {"aws:PrincipalOrgID": "o-exemplo"}}
  }]
}
```

Em política de **recurso** e **trust policy**, existe também o campo **`Principal`**.

## Condições que caem

| Chave | Uso |
|---|---|
| `aws:PrincipalOrgID` | Restringe a uma AWS Organizations |
| `aws:SourceArn` / `aws:SourceAccount` | **Confused deputy** com serviço AWS (ex.: OAC do CloudFront) |
| `sts:ExternalId` | **Confused deputy** com terceiro |
| `aws:RequestedRegion` | Restringir regiões (típico em SCP) |
| `aws:MultiFactorAuthPresent` | Exigir MFA |
| `aws:SecureTransport` | Exigir HTTPS |
| `aws:SourceVpce` / `aws:SourceVpc` | Limitar a um VPC endpoint |

## Usuário raiz (root) — decorar

### A lista clássica, em 5 pontos

| # | Prática |
|---|---|
| 1 | **Senha forte** para o console, em nível de conta |
| 2 | **Nunca compartilhar** senha nem chaves de acesso do root |
| 3 | Se **tem** chave de acesso do root → **excluir**. Se precisar manter → **alterar regularmente**. Nunca guardar no S3 |
| 4 | Se **não tem** chave de acesso do root → **não criar**, salvo se absolutamente necessário |
| 5 | **Habilitar MFA** no root |

**Resumo em três palavras: senha forte · MFA · nenhuma chave de acesso.**

> [!warning] O que mudou na doc atual
> O título oficial hoje é **"Don't create access keys for the root user"** (não crie chaves de acesso para o usuário raiz) — a orientação não é mais rotacionar, é **não criar**. E **MFA no root é exigência**, não recomendação: *"require MFA to be configured for their root user"* (exigem que o MFA esteja configurado para o usuário raiz), com registro em até **14 dias** do primeiro login.
> Na prova, *"não criar chave de acesso para o root"* é a resposta mais segura — ela vale nas duas versões.

### Tarefas que SÓ o root faz

| Tarefa |
|---|
| Alterar e-mail, senha e chaves do root (conta **standalone**) |
| **Encerrar** e **reabrir** a conta (standalone) |
| **Restaurar permissões de IAM** quando o único admin se bloqueou |
| **Ativar o acesso do IAM** ao console de Billing |
| Configurar **MFA Delete** num bucket S3 |
| Editar/excluir **bucket policy ou policy de SQS que nega todos os principais** |
| Registrar-se como vendedor no **Reserved Instance Marketplace** |
| Inscrever-se no **AWS GovCloud (US)** |

**Por que o root resolve bucket policy que nega todos**: ele é a única identidade **sem deny implícito**.

### A hierarquia de credencial (ordem da própria doc)

```
1. PESSOAS      → federação + credencial temporária (IAM Identity Center / IdP)
2. WORKLOADS    → IAM role (EC2, ECS, Lambda)
3. Access key de longo prazo → último recurso
4. Access key do ROOT       → NUNCA
```

⚠️ Alternativa que cria **IAM user com access key** para uma aplicação = **errada**. A resposta é **role**.

## Fatos

| Item | Valor |
|---|---|
| Escopo | **Global** (não é regional) |
| Custo | **Grátis** |
| Root user | Deny implícito **não se aplica** a ele |

## Links

- [[1 - Seguranca (30%)/IAM/1 - O que e|1 - O que e]] · [[1 - Seguranca (30%)/IAM/3 - Detalhes|3 - Detalhes]] · [[1 - Seguranca (30%)/IAM/4 - Questoes|4 - Questoes]]
- [[02 - Numeros para decorar]]
