---
servico: Amazon S3
fonte: "[[3 - Performance (24%)/S3/2 - Decorar|2 - Decorar]]"
---

# S3 — Flashcards

#flashcards/saa-c03/d3-performance/s3

Durabilidade das classes do S3?::**11 noves** em todas (exceto Reduced Redundancy, legado, 99,99%)

Quais classes do S3 ficam em apenas 1 AZ?::**One Zone-IA** e **Express One Zone**

Duração mínima de armazenamento do Standard-IA, One Zone-IA, Glacier IR, Glacier FR e Deep Archive?::IA e One Zone-IA **30 dias**; Glacier IR e FR **90 dias**; Deep Archive **180 dias**

Tamanho mínimo cobrado por objeto no Standard-IA, One Zone-IA e Glacier IR?::**128 KB**

Tempos de restore do Glacier Flexible Retrieval?::Expedited **1-5 min**; Standard **3-5 h**; Bulk **5-12 h** (grátis)

Tempos de restore do Glacier Deep Archive?::Standard **até 12 h**; Bulk **até 48 h**; **não tem** Expedited

Glacier Instant Retrieval precisa de restore?::**Não**: é `GET` direto, em ms

Após quantos dias sem acesso o Intelligent-Tiering move para Infrequent e para Archive Instant?::**30 dias** → Infrequent; **90 dias** → Archive Instant Access

O que o Intelligent-Tiering cobra e o que acontece com objetos menores que 128 KB?::Cobra **monitoramento por objeto**, sem taxa de retrieval; objetos **< 128 KB** nunca saem do Frequent Access

Para qual classe o One Zone-IA NÃO pode transicionar por lifecycle?::**Glacier Instant Retrieval** (só vai para Glacier FR e Deep Archive)

Como tirar um objeto do Deep Archive para outra classe?::Lifecycle **não** consegue; precisa de **restore + copy**

Lifecycle transiciona objetos menores que 128 KB por padrão?::**Não**; para forçar, use filtro de tamanho (`ObjectSizeGreaterThan`)

Limite de requisições por prefixo no S3?::**3.500** PUT/COPY/POST/DELETE e **5.500** GET/HEAD por segundo

Tamanho máximo de objeto e quando usar multipart upload?::Objeto até **48,8 TiB**; multipart a partir de **100 MB**

Limites do multipart upload (tamanho da parte e número de partes)?::Parte de **5 MiB a 5 GiB**; até **10.000** partes

Opção de criptografia do S3 com auditoria no CloudTrail e compartilhamento entre contas?::**SSE-KMS** com **customer managed key**

Como reduzir as chamadas ao KMS no SSE-KMS com muitos objetos?::Habilitar **S3 Bucket Keys**

A chave não pode ficar armazenada na AWS, mas o S3 pode cifrar: qual opção?::**SSE-C** (chave enviada em cada requisição, via HTTPS)

Modos do Object Lock e o requisito?::Exige **versionamento**; **Compliance**: nem o root apaga; **Governance**: só com `s3:BypassGovernanceRetention`

Replicação do S3 copia objetos já existentes e o que exige?::**Não** (use **Batch Replication**); exige **versionamento nos dois** buckets