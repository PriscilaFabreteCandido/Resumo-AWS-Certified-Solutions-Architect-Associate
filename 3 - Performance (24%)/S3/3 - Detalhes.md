---
tags: [saa-c03, s3, detalhes]
servico: Amazon S3
atualizado: 2026-11-08
---

# Amazon S3 — Detalhes

## 1. Escolhendo a classe

A decisão depende de **três** perguntas, nesta ordem:

**Com que frequência o objeto é lido?**
- Mais de uma vez por mês → **Standard**
- Cerca de uma vez por mês → **Standard-IA**
- Cerca de uma vez por trimestre → **Glacier Instant Retrieval**
- Cerca de uma vez por ano → **Glacier Flexible Retrieval**
- Menos de uma vez por ano → **Glacier Deep Archive**

**Qual latência é aceitável quando ele for lido?**
- Milissegundos → Standard, IA, One Zone-IA, **Glacier Instant Retrieval**
- Minutos a horas → Glacier Flexible Retrieval
- Horas → Deep Archive

**O dado é reproduzível?**
- Sim (thumbnail, cache, resultado recalculável) → **One Zone-IA** economiza ~20% sobre o IA
- Não → nunca One Zone

> [!warning] One Zone-IA é a armadilha mais frequente do S3
> A documentação é explícita: *"Not resilient to the loss of the Availability Zone."* Se o enunciado disser **highly available**, **critical**, **compliance** ou **production**, One Zone-IA está errado — mesmo sendo o mais barato entre os IA.

### Quando Intelligent-Tiering **não** é econômico

1. **Padrão de acesso conhecido** — a taxa de monitoramento por objeto vira desperdício.
2. **Muitos objetos pequenos** — a taxa é **por objeto**, e objeto abaixo de 128 KB *"is not monitored and not eligible for auto-tiering"*, ficando eternamente no Frequent Access (o tier mais caro).
3. **Dado que já nasce frio** — vá direto para a classe de arquivo.

## 2. Lifecycle

O lifecycle move ou apaga objetos automaticamente por idade. Duas regras governam tudo:

**Regra 1 — é cascata, só de quente para frio.** Glacier Flexible Retrieval transiciona **apenas** para Deep Archive: *"Objects that are stored in the S3 Glacier Flexible Retrieval storage class can only be transitioned to the S3 Glacier Deep Archive storage class."* E de Deep Archive **não sai**: *"You cannot use an S3 Lifecycle configuration rule to convert the storage class of an object from S3 Glacier Deep Archive to any other storage class."*

**Regra 2 — respeita o mínimo da classe atual.** *"You can't create a single Lifecycle rule that transitions objects from one storage class to another before the minimum storage duration period has passed."* O exemplo da própria doc: objeto que foi para Glacier IR no dia 4 só pode ir para Deep Archive no dia **94** (4 + 90).

### Objetos pequenos

Desde setembro de 2024, *"Objects smaller than 128 KB will not transition by default to any storage class"*. Para forçar, use filtro de tamanho (`ObjectSizeGreaterThan` / `ObjectSizeLessThan`) ou o header `x-amz-transition-default-minimum-object-size`.

E atenção: *"you are charged a transition request for each object"* — mover milhões de objetos minúsculos pode custar mais do que a economia.

### Ações esquecidas que economizam muito

| Ação | O que evita |
|---|---|
| `AbortIncompleteMultipartUpload` | Upload multipart inacabado **continua sendo cobrado** até ser completado ou abortado, e não aparece na listagem normal |
| `NoncurrentVersionExpiration` | Versões antigas acumulando — **cada versão é um objeto cobrado** |
| `ExpiredObjectDeleteMarker` | Delete markers órfãos |

> [!tip] A regra que todo bucket deveria ter
> `AbortIncompleteMultipartUpload` depois de 7 dias. É custo invisível puro.

## 3. Performance

O S3 escala por **prefixo**: *"your application can achieve at least 3,500 PUT/COPY/POST/DELETE or 5,500 GET/HEAD requests per second per partitioned Amazon S3 prefix"*, e *"There are no limits to the number of prefixes in a bucket"*.

Consequência prática: 10 prefixos de leitura = **55.000 requisições por segundo**. Se a aplicação recebe **503 Slow Down**, a resposta é **distribuir as chaves em mais prefixos** e aplicar retry com backoff — não "pedir aumento de limite".

O escalonamento *"happens gradually and is not instantaneous"*, então os 503 aparecem durante a subida.

**Multipart upload**: recomendado a partir de **100 MB**; partes de **5 MiB a 5 GiB** (a última parte não tem mínimo); até **10.000** partes. As partes podem subir em paralelo e fora de ordem — é o que dá throughput.

**Transfer Acceleration**: usa a borda do CloudFront para **upload**. A doc diz para usar quando *"Your customers upload to a centralized general purpose bucket from all over the world"*, quando você transfere *"gigabytes to terabytes of data on a regular basis across continents"*, ou quando *"You can't use all of your available bandwidth over the internet"*. Requer nome de bucket sem ponto, e o efeito pode levar *"up to 20 minutes"* para aparecer.

Para centenas de milhares de requisições por segundo com latência de **único dígito de milissegundo**, a classe indicada é **S3 Express One Zone** (*"up to 10x faster and with request costs 50 percent lower than S3 Standard"*).

## 4. Criptografia

Desde 5 de janeiro de 2023, *"all new object uploads to Amazon S3 are automatically encrypted at no additional cost and with no impact on performance"* com **SSE-S3**. Ou seja: **não existe objeto novo sem criptografia no S3**.

Pontos que a prova explora:

- **Mudar o default do bucket não recriptografa o acervo.** Só vale para objetos novos. Para os antigos: **S3 Batch Operations (Copy)** ou `CopyObject`.
- **Cross-account com SSE-KMS exige chave customer managed.** *"If you want to grant cross-account access to your S3 objects, use a customer managed key."* Se você não especificar a chave, o S3 usa a AWS managed key `aws/s3`, que não pode ser compartilhada.
- **Replicação preserva o tipo de criptografia da origem**: *"the replicas use the same type of encryption as the source objects. The default encryption settings of the destination bucket are not used."*
- **Bucket de log de acesso precisa ser SSE-S3**: *"the bucket must use Amazon S3 managed keys (SSE-S3)"*.
- **S3 Bucket Keys**: a KMS gera uma chave no nível do bucket, usada por um período limitado dentro do S3, o que *"decrease[s] the number of transactions from Amazon S3 to AWS KMS to reduce the cost of SSE-KMS"*.

## 5. Versionamento, Object Lock e Block Public Access

**Versionamento** tem três estados: Unversioned (padrão), Enabled e Suspended. A regra crítica: *"After you version-enable a bucket, it can never return to an unversioned state. But you can suspend versioning."* Objetos anteriores ficam com version ID `null`. Um `DELETE` simples insere um **delete marker** em vez de apagar.

**Object Lock** implementa WORM e *"works only in buckets that have S3 Versioning enabled"*. Dois mecanismos independentes:

- **Retention period** em modo **Compliance** — *"can't be overwritten or deleted by any user, including the root user in your AWS account"*. O período não encurta. *"The only way to delete an object under the compliance mode before its retention date expires is to delete the associated AWS account."*
- **Retention period** em modo **Governance** — quem tiver `s3:BypassGovernanceRetention` **e** enviar `x-amz-bypass-governance-retention:true` consegue apagar.
- **Legal hold** — *"has no expiration date... remains in place until you explicitly remove it"*.

**Block Public Access** tem quatro flags independentes e é avaliado assim: *"S3 applies the most restrictive combination"* entre access point, bucket e conta. Pode ser aplicado no nível de **organização** (as quatro juntas), conta, bucket ou access point. Não altera policies nem ACLs existentes — apenas neutraliza o efeito público delas.

## 6. Replicação

*"automatic, asynchronous copying of objects across Amazon S3 buckets"* — **CRR** (regiões diferentes) e **SRR** (mesma região).

| Fato | Detalhe |
|---|---|
| Versionamento | *"Both source and destination buckets must have versioning enabled"* |
| Acervo existente | **Não** é replicado. Use **S3 Batch Replication** (que também recobre objetos que **falharam**) |
| Bidirecional | Suportado, com *replica modification sync* para metadados |
| SLA | **S3 RTC**: *"99.9 percent of those objects within 15 minutes"* |
| Object Lock | Se a origem tem, o destino **precisa** ter |
| Destino | **Não** pode ser bucket com Requester Pays |

> [!warning] Replicação não é backup
> Replicação propaga mudanças, inclusive exclusões lógicas se você habilitar delete marker replication. Contra ransomware e erro humano, use **versionamento + Object Lock + MFA Delete**.

## 7. Outros recursos

| Recurso | Para quê |
|---|---|
| **Access Points** | Endpoint nomeado por aplicação, com policy e BPA próprios. Evita bucket policy gigante |
| **Bucket owner enforced** (Object Ownership) | Desativa ACLs. **Pré-requisito do OAC do CloudFront** |
| **Requester Pays** | *"the requester pays the cost of the request and the data download"*; *"The bucket owner always pays the cost of storing data"*. ⚠️ **Proíbe acesso anônimo** |
| **Storage Class Analysis** | *"analyze storage access patterns to help you decide when to transition"*. ⚠️ Só recomenda **Standard → Standard-IA**, e precisa de **30 dias ou mais** |
| **Storage Lens** | Painel de uso e atividade, com recomendações, em toda a organização |
| **Site estático** | Website endpoint. ⚠️ Com CloudFront, vira *custom origin* e **não** aceita OAC/OAI |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[Criptografia em repouso e em transito]] · [[KMS]] · [[CloudFront]] · [[S3 Glacier]]
- [Classes de armazenamento](https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html)
- [Transições de lifecycle](https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-transition-general-considerations.html)
