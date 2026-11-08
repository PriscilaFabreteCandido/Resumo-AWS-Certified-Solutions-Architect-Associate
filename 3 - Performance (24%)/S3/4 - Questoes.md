---
tags: [saa-c03, s3, questoes]
servico: Amazon S3
atualizado: 2026-11-08
---

# Amazon S3 — Questões

> [!question]- Q1. Logs são lidos muito nos primeiros 30 dias, raramente nos 11 meses seguintes, e precisam ficar 7 anos com acesso em até 12 h. Lifecycle mais econômico?
> **A)** Standard → Standard-IA (30 d) → Glacier Instant Retrieval (1 ano) → expira em 7 anos
> **B)** **Standard → Standard-IA (30 d) → Glacier Flexible Retrieval (1 ano) → Deep Archive → expira em 7 anos** ✅
> **C)** Standard → One Zone-IA (30 d) → Deep Archive (1 ano)
> **D)** Intelligent-Tiering desde o início
>
> **Por que B**: respeita a cascata, usa IA no período de acesso raro e desce para arquivamento. Deep Archive atende "até 12 h" com Standard retrieval e é a classe mais barata.
> **A errada**: Glacier IR é mais caro que FR/Deep para dado raramente lido, e desperdiça o requisito folgado de 12 h.
> **C errada**: One Zone-IA para log de compliance é 1 AZ — risco inaceitável.
> **D errada**: o padrão de acesso é **conhecido**; a taxa de monitoramento por objeto é desperdício.

> [!question]- Q2. Objetos de auditoria não podem ser apagados por 7 anos, por ninguém, incluindo administradores. O que configurar?
> **A)** Versionamento + MFA Delete
> **B)** **Object Lock em modo Compliance, com retenção de 7 anos, em bucket com versionamento** ✅
> **C)** Bucket policy com `Deny` em `s3:DeleteObject`
> **D)** Glacier Deep Archive com lifecycle
>
> **Por que B**: só o modo Compliance impede o root — *"can't be overwritten or deleted by any user, including the root user"*.
> **A errada**: quem tem o MFA do root apaga.
> **C errada**: um administrador com poder de editar a policy remove o Deny.
> **D errada**: classe de armazenamento é custo, não imutabilidade.

> [!question]- Q3. O acervo existente de um bucket precisa ser replicado para outra região, além das gravações novas. O que fazer?
> **A)** Habilitar CRR — ela cobre os objetos existentes
> **B)** **Habilitar CRR para os novos e rodar S3 Batch Replication para os existentes** ✅
> **C)** Usar o DataSync entre os dois buckets
> **D)** Habilitar S3 Replication Time Control
>
> **Por que B**: a replicação "live" não alcança objetos anteriores à regra; o acervo exige Batch Replication.
> **A errada**: é exatamente a suposição que a prova testa.
> **C errada**: resolveria a cópia, mas é esforço a mais havendo recurso nativo e contínuo.
> **D errada**: RTC adiciona SLA de 15 min aos objetos **novos**, e *"S3 RTC does not apply to Batch Replication"*.

> [!question]- Q4. Uma regra de lifecycle move para Glacier Instant Retrieval no dia 5 e para Deep Archive no dia 30. A AWS rejeita. Por quê?
> **A)** Glacier IR não transiciona para Deep Archive
> **B)** **O mínimo de 90 dias do Glacier IR não foi respeitado: a transição precisa ser no dia 95 ou depois** ✅
> **C)** Deep Archive exige versionamento
> **D)** Só é permitida uma transição por regra
>
> **Por que B**: 5 + 90 = **95**. Não se transiciona antes do mínimo da classe atual.
> **A errada**: Glacier IR **pode** ir para Glacier FR e Deep Archive.
> **C errada**: não exige.
> **D errada**: várias transições por regra são normais.

> [!question]- Q5. Um bucket com versionamento cresceu 4x em um ano, apesar do volume de dados novos ser estável. Causa e correção?
> **A)** Falta compressão
> **B)** **Versões antigas acumulando; criar lifecycle com `NoncurrentVersionTransition` e `NoncurrentVersionExpiration`** ✅
> **C)** Replicação duplicando objetos
> **D)** Mudar para One Zone-IA
>
> **Por que B**: cada versão é cobrada como um objeto completo.
> **A errada**: o S3 não comprime objetos.
> **C errada**: replicação iria para outro bucket.
> **D errada**: reduz o preço por GB, não o **volume** — que é o problema.

> [!question]- Q6. A aplicação recebe erros 503 Slow Down ao gravar milhares de objetos por segundo, todos no mesmo caminho. O que fazer?
> **A)** Abrir ticket para aumentar o limite do bucket
> **B)** **Distribuir as chaves em vários prefixos e aplicar retry com backoff exponencial** ✅
> **C)** Habilitar Transfer Acceleration
> **D)** Migrar para o S3 Express One Zone
>
> **Por que B**: o limite é **por prefixo** (3.500 escritas/s), e *"There are no limits to the number of prefixes in a bucket"*.
> **A errada**: não existe limite por bucket para aumentar.
> **C errada**: acelera upload de longe; não muda a taxa por prefixo.
> **D errada**: é a resposta para centenas de milhares de req/s com latência de 1 dígito de ms — exagero aqui, e muda a classe/custo.

> [!question]- Q7. Qual opção mantém o bucket privado e servido só pelo CloudFront, com objetos criptografados em SSE-KMS?
> **A)** Origin Access Identity (OAI)
> **B)** **Origin Access Control (OAC) + bucket policy com principal `cloudfront.amazonaws.com` e condição `AWS:SourceArn`, com Object Ownership em "Bucket owner enforced", e key policy do KMS liberando o CloudFront** ✅
> **C)** Bucket público com geo restriction
> **D)** Presigned URL gerada pelo backend
>
> **Por que B**: a doc lista **SSE-KMS** como capacidade que **só o OAC** tem (OAI é *"legacy, not recommended"*).
> **A errada**: OAI não suporta SSE-KMS nem regiões novas.
> **C errada**: viola o requisito.
> **D errada**: dá acesso direto ao S3, não "via CloudFront".

## ⚠️ Armadilhas do S3

| Parece | É |
|---|---|
| One Zone-IA é só "IA mais barato" | É **1 AZ** |
| Standard-IA tem 1 AZ | Tem **≥ 3**. One Zone-IA é que tem 1 |
| Glacier Instant Retrieval precisa de restore | **Não.** `GET` direto em ms |
| Deep Archive tem Expedited | **Não existe** |
| Intelligent-Tiering é sempre mais barato | Cobra monitoramento **por objeto**; objeto < 128 KB nunca sai do Frequent Access |
| Lifecycle move qualquer classe para qualquer | É cascata; Glacier FR → só Deep Archive; de Deep Archive não sai |
| Apagar antes do mínimo economiza | **Cobra o período inteiro** |
| Replicação cobre o acervo | Só o que vem **depois**. Acervo = Batch Replication |
| Replicação precisa de versionamento só na origem | **Nos dois** |
| Versionamento pode ser desligado | Só **suspenso** |
| Bucket policy ganha do Block Public Access | **BPA ganha** (combinação mais restritiva) |
| Object Lock funciona sem versionamento | **Exige** versionamento |
| Governance mode é imutável | Quem tem `s3:BypassGovernanceRetention` apaga |
| Mudar o default recriptografa o acervo | Só objetos **novos** |
| SSE-C pode ser default do bucket | **Não.** Só por requisição |
| Transfer Acceleration acelera download | É **upload** |
| Requester Pays transfere o custo de armazenamento | Transfere **requisição e download**; e **proíbe acesso anônimo** |
| Multipart incompleto não custa | **Custa** até ser completado ou abortado |
| Limite de requisição é por bucket | É **por prefixo** |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
- [[03 - Pegadinhas mestre]]
