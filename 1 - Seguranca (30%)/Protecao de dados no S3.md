---
tags: [saa-c03, dominio-1, s3, criptografia, object-lock, versionamento]
dominio: 1
tasks: [1.3]
atualizado: 2026-11-08
---

# Proteção de dados no S3

## 🧩 Em 30 segundos

- **SSE-S3 é o padrão.** Desde 05/01/2023, *"all new object uploads to Amazon S3 are automatically encrypted at no additional cost"*.
- Opções: **SSE-S3** · **SSE-KMS** · **DSSE-KMS** (dupla camada) · **SSE-C** (você manda a chave em cada request) · **client-side**.
- **S3 Bucket Keys** reduzem o custo do SSE-KMS: *"decrease the number of transactions from Amazon S3 to AWS KMS"*.
- **Object Lock** exige **versionamento**. Modo **Compliance** = ninguém apaga, nem o root. Modo **Governance** = quem tem permissão especial apaga.
- **Block Public Access** tem 4 configurações e vence a bucket policy: *"S3 applies the most restrictive combination"*.

## 🧠 Teste-se primeiro

> [!question]- As cinco formas de criptografar no S3, com o nome exato
> **SSE-S3** — server-side encryption with Amazon S3 managed keys (**padrão**)
> **SSE-KMS** — server-side encryption with AWS KMS keys
> **DSSE-KMS** — **dual-layer** server-side encryption with AWS KMS keys
> **SSE-C** — server-side encryption with customer-provided keys (a chave vai no request; o S3 **não** a armazena)
> **Client-side** — você criptografa antes de enviar
>
> No **default do bucket** você pode configurar SSE-S3, SSE-KMS ou DSSE-KMS. **SSE-C não** pode ser padrão de bucket — é sempre por requisição.

> [!question]- Mudei a criptografia padrão do bucket para SSE-KMS. O que acontece com os objetos antigos?
> **Nada.** O default vale só para objetos **novos**. Para recriptografar o acervo: **S3 Batch Operations (Copy)** ou `CopyObject`.

> [!question]- Replicação de bucket criptografado: a réplica usa a criptografia do destino?
> **Não.** *"the replicas use the same type of encryption as the source objects. The default encryption settings of the destination bucket are not used."*

> [!question]- Governance × Compliance no Object Lock
> **Compliance**: *"a protected object version can't be overwritten or deleted by any user, including the root user"*. O período não encurta. *"The only way to delete an object under the compliance mode before its retention date expires is to delete the associated AWS account."*
> **Governance**: quem tem `s3:BypassGovernanceRetention` **e** envia o header `x-amz-bypass-governance-retention:true` consegue apagar.
> **Legal hold**: *"has no expiration date... remains in place until you explicitly remove it"*. Independente do período de retenção.

## Versionamento

| Estado | Comportamento |
|---|---|
| **Unversioned** | Padrão |
| **Versioning-enabled** | Cada PUT cria versão; DELETE insere **delete marker** |
| **Versioning-suspended** | Para de versionar, mas mantém as versões existentes |

- *"After you version-enable a bucket, it can never return to an unversioned state."* Você só **suspende**.
- Objetos que já existiam antes de habilitar ficam com version ID **`null`**.
- **Cada versão é cobrada como um objeto completo** — é custo esquecido em prova de otimização. Combine com lifecycle para expirar versões antigas.
- **MFA Delete** exige MFA para deletar versão ou alterar o estado do versionamento (configurável só pelo root do bucket, via API/CLI).

## Block Public Access

Quatro configurações, nomes exatos: **`BlockPublicAcls`** · **`IgnorePublicAcls`** · **`BlockPublicPolicy`** · **`RestrictPublicBuckets`**.

- Níveis: **organização** (via Organizations, aplicando as quatro juntas), **conta**, **bucket** e **access point**.
- *"S3 applies the most restrictive combination"* entre access point, bucket e conta.
- Não altera as policies nem as ACLs existentes — apenas **ignora/bloqueia** o efeito público.
- Recomendação oficial: *"turn on all four settings for block public access for your account"*.
- Para access point, as configurações só podem ser definidas **na criação**.

## Replicação (CRR e SRR)

| Item | Regra |
|---|---|
| Tipo | **Assíncrona**. *"automatic, asynchronous copying of objects across Amazon S3 buckets"* |
| CRR × SRR | Cross-Region (DR, latência, compliance) × Same-Region (agregação de log, separação de contas, sandbox) |
| Requisito | *"Both source and destination buckets must have versioning enabled"* |
| Objetos pré-existentes | **Não** são replicados. Use **S3 Batch Replication** |
| Falhas e re-replicação | S3 Batch Replication também cobre objetos que **falharam** |
| Bidirecional | Suportado (com *replica modification sync* para propagar mudanças de metadados) |
| **S3 RTC** | *"replicates most objects... in seconds, and 99.9 percent of those objects within 15 minutes"*, com SLA |
| Object Lock | Se a origem tem Object Lock, o **destino também precisa** |
| Destino | **Não** pode ser bucket com Requester Pays |

> [!tip] Replicação não é backup
> Replicação copia **mudanças**, incluindo exclusões lógicas se você habilitar delete marker replication. Contra ransomware e erro humano, a resposta é **versionamento + Object Lock + MFA Delete** (ou **AWS Backup** com Vault Lock), não replicação.

## Outros controles que caem

| Recurso | Para quê |
|---|---|
| **Access Points** | Endpoint nomeado por aplicação, com policy própria e BPA própprio. Simplifica bucket policy gigante |
| **Bucket Owner Enforced** (Object Ownership) | Desativa ACLs; o dono do bucket é dono de tudo. **Pré-requisito do OAC do CloudFront** |
| **Requester Pays** | Requisitante paga requisição e download; dono sempre paga o **armazenamento**. **Proíbe acesso anônimo** |
| **Server access logging** | Bucket de destino precisa usar **SSE-S3** |
| **S3 Storage Lens / Storage Class Analysis** | Visibilidade de uso e recomendação de classe (Standard → Standard-IA) |

## ❓ Questões de prova

> [!example]- Q1 — Requisito regulatório: objetos de auditoria não podem ser apagados nem modificados por **7 anos**, por ninguém, incluindo administradores. Qual configuração?
> **A)** Versionamento + MFA Delete
> **B)** **S3 Object Lock em modo Compliance, com retenção de 7 anos, em bucket com versionamento** ✅
> **C)** Bucket policy com Deny em `s3:DeleteObject`
> **D)** Glacier Deep Archive com lifecycle
>
> **Por que B**: só o modo **Compliance** impede o root. É o controle WORM que a AWS atesta para SEC 17a-4, CFTC e FINRA.
> **A errada**: MFA Delete dificulta, mas quem tem o MFA do root apaga.
> **C errada**: um administrador com poder de alterar a policy remove o Deny.
> **D errada**: classe de armazenamento é custo, não imutabilidade. (Pode ser combinado, mas não resolve o requisito.)

> [!example]- Q2 — Um bucket precisa que o acervo **existente** seja replicado para outra região, além das gravações novas. O que configurar?
> **A)** Habilitar CRR — ela cobre os objetos existentes
> **B)** **Habilitar CRR para os novos e rodar S3 Batch Replication para os existentes** ✅
> **C)** Usar o AWS DataSync entre os dois buckets
> **D)** Habilitar S3 Replication Time Control
>
> **Por que B**: a replicação "live" (CRR/SRR) **não** replica objetos anteriores à configuração da regra; o acervo exige **Batch Replication**.
> **A errada**: é exatamente a suposição que a prova testa.
> **C errada**: DataSync resolveria a cópia, mas é esforço a mais quando existe recurso nativo e contínuo.
> **D errada**: RTC adiciona SLA de 15 minutos aos objetos **novos**; não alcança o acervo (*"S3 RTC does not apply to Batch Replication"*).

> [!example]- Q3 — Um bucket precisa ser acessível por uma distribuição CloudFront e por **mais ninguém**. Qual configuração?
> **A)** Bucket público com geo restriction no CloudFront
> **B)** **Origin Access Control (OAC) no CloudFront + bucket policy permitindo o principal `cloudfront.amazonaws.com` com condição `AWS:SourceArn` da distribuição, e Object Ownership em Bucket owner enforced** ✅
> **C)** Origin Access Identity (OAI)
> **D)** Presigned URL gerada pelo backend
>
> **Por que B**: OAC é o mecanismo atual e recomendado. A doc lista o que ele suporta e o OAI não: *"All Amazon S3 buckets in all AWS Regions"*, **SSE-KMS** e *"Dynamic requests (PUT and DELETE)"*. A condição `AWS:SourceArn` é a proteção contra confused deputy.
> **A errada**: bucket público viola o requisito.
> **C errada**: funciona, mas é **legado** (*"legacy, not recommended"*) e não suporta SSE-KMS nem regiões novas.
> **D errada**: presigned URL resolve acesso temporário direto ao S3, não "só via CloudFront".

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Preciso habilitar criptografia no S3 | **SSE-S3 já é o padrão** em todo bucket |
| SSE-C pode ser o default do bucket | **Não.** Só por requisição |
| Mudar o default recriptografa o acervo | Só objetos **novos** |
| Replicação replica o que já existe | Só o que vem **depois**. Acervo = Batch Replication |
| Versionamento pode ser desligado | Só **suspenso** |
| Bucket policy ganha do Block Public Access | **BPA ganha**, e é a combinação mais restritiva entre conta, bucket e access point |
| Object Lock funciona sem versionamento | *"works only in buckets that have S3 Versioning enabled"* |
| Governance mode é imutável | Quem tem `s3:BypassGovernanceRetention` apaga |
| Legal hold expira | **Não expira.** Precisa ser removido explicitamente |
| Requester Pays transfere o custo de armazenamento | Transfere **requisição e download**. Armazenamento é sempre do dono — e **acesso anônimo fica proibido** |
| OAI e OAC são equivalentes | OAC suporta **SSE-KMS**, PUT/DELETE e todas as regiões; OAI é legado |

## Links

- [[01 - Dominio 1 - Design Secure Architectures (30%)]]
- [[Criptografia - KMS, CloudHSM e ACM]]
- [[Armazenamento - S3, EBS, EFS e FSx]]
- [[Custo de armazenamento - classes do S3 e lifecycle]]
- [Criptografia no S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingEncryption.html)
- [S3 Object Lock](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html)
