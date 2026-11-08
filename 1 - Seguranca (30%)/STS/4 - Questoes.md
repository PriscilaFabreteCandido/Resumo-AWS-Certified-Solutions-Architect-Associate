---
tags: [saa-c03, sts, questoes]
servico: AWS STS
atualizado: 2026-11-08
---

# STS — Questões

> [!question]- Q1. O que diferencia uma credencial do STS de uma access key de usuário IAM?
> **A)** O tamanho da chave
> **B)** **Ela tem um session token e expira** ✅
> **C)** Ela só funciona na mesma região
> **D)** Ela não precisa de permissão
>
> **Por que B**: credencial temporária = access key ID + secret + **session token**, com prazo de validade.

> [!question]- Q2. Um fornecedor SaaS precisa acessar recursos na sua conta. Como configurar com segurança?
> **A)** Criar um IAM user e enviar a access key
> **B)** **Criar uma role com trust policy para a conta do fornecedor, exigindo `sts:ExternalId`** ✅
> **C)** Compartilhar a credencial temporária por e-mail
> **D)** Tornar os recursos públicos com filtro de IP
>
> **Por que B**: role + `ExternalId` é o padrão contra **confused deputy** com terceiros.
> **A errada**: credencial de longo prazo fora da sua organização.
> **C errada**: credencial temporária expira e o acesso quebra; além de ser transporte inseguro.
> **D errada**: não é controle de acesso.

> [!question]- Q3. Um role na conta A precisa assumir um role na conta B. O `AssumeRole` falha com AccessDenied. O que verificar?
> **A)** Só a trust policy na conta B
> **B)** Só a policy do role na conta A
> **C)** **As duas: a trust policy na conta B deve listar o principal da conta A, e o role na conta A deve ter `sts:AssumeRole` naquele ARN** ✅
> **D)** A SCP da organização
>
> **Por que C**: são dois documentos independentes, e a trust policy é exceção à regra da união — *"must explicitly allow access for principals"*.
> **D errada**: pode ser causa adicional (SCP é um teto), mas o que o enunciado descreve se resolve nos dois documentos. Se a SCP negasse, nenhuma das duas políticas ajudaria.

> [!question]- Q4. Como invalidar imediatamente todas as sessões temporárias já emitidas para uma role comprometida?
> **A)** Deletar a role
> **B)** **Anexar à role uma policy com `Deny` condicionado a `aws:TokenIssueTime` anterior ao momento atual** ✅
> **C)** Chamar `sts:RevokeSession`
> **D)** Esperar a expiração
>
> **Por que B**: credencial temporária não é revogável, mas você pode negar o uso de tokens emitidos antes de um instante.
> **A errada**: deletar a role quebra a aplicação inteira e não é o procedimento recomendado.
> **C errada**: essa API não existe.
> **D errada**: deixa a janela de ataque aberta.

> [!question]- Q5. Um pipeline de CI/CD fora da AWS precisa fazer deploy sem armazenar access key. O que configurar?
> **A)** IAM user com access key rotacionada por Lambda
> **B)** **OIDC identity provider na conta e `AssumeRoleWithWebIdentity`** ✅
> **C)** Credencial no Secrets Manager
> **D)** VPN para a VPC
>
> **Por que B**: o pipeline apresenta um token OIDC assinado pelo provedor e recebe credencial temporária — **sem segredo armazenado**.
> **A errada**: continua existindo uma credencial de longo prazo.
> **C errada**: move o segredo de lugar; não o elimina (e o CI ainda precisaria de credencial para ler o secret).
> **D errada**: rede não é autenticação.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Trust policy e permission policy são a mesma coisa | **Duas** políticas: quem assume × o que pode fazer |
| Trust policy funciona por união com a policy de identidade | Trust policy **precisa** de Allow explícito ao principal |
| Credencial temporária pode ser revogada | **Não.** Use `Deny` por `aws:TokenIssueTime` |
| Role chaining mantém a duração configurada | Limita a sessão a **1 hora** |
| `ExternalId` e `aws:SourceArn` são equivalentes | `ExternalId` = **terceiro**. `SourceArn` = **serviço AWS** |
| STS é regional | É **global**, com endpoints regionais (prefira o regional) |
| STS custa | **Grátis** |
| `GetSessionToken` serve para cross-account | Cross-account é **`AssumeRole`** |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
- [[IAM]]
