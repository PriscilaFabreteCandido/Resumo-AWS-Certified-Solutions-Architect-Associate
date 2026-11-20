---
servico: AWS Identity and Access Management (IAM)
fonte: "[[1 - Seguranca (30%)/IAM/2 - Decorar|2 - Decorar]]"
---

# IAM — Flashcards

#flashcards/saa-c03/d1-seguranca/iam

Primeira etapa da avaliação de policy no IAM, e o que ela faz?::**Deny explícito** em qualquer policy: **nega e para**

Qual é o padrão de toda requisição no IAM, e quem é exceção?::**Deny implícito**; exceção é o **root user**, com acesso total

Identity-based + resource-based na mesma conta: união ou interseção?::**União**

Identity-based + permissions boundary: união ou interseção?::**Interseção**

Identity-based + SCP + RCP: união ou interseção?::**Interseção** (os três precisam permitir)

Acesso cross-account exige o quê?::Policy de **identidade** na conta de origem **e** policy de **recurso** na conta destino permitindo

Quais policies sempre exigem Allow explícito ao principal?::**Trust policy de role IAM** e **key policy do KMS**

Quem a SCP não afeta?::**Conta de gerenciamento**, **service-linked roles** e principals de fora da organização

SCP concede permissão?::**Não**; só limita. Sem policy IAM, o usuário não tem acesso

SCP afeta o root das contas membro?::**Sim**

Condição para proteger contra confused deputy com terceiro?::`sts:ExternalId`

Condição para confused deputy com serviço AWS (ex.: OAC do CloudFront)?::`aws:SourceArn` / `aws:SourceAccount`

Condição para restringir acesso a uma AWS Organization?::`aws:PrincipalOrgID`

Credenciais do root em três palavras?::**Senha forte**, **MFA**, **nenhuma chave de acesso**

Aplicação em EC2 precisa acessar S3: user com access key ou role?::**IAM role** (access key de longo prazo é último recurso)
