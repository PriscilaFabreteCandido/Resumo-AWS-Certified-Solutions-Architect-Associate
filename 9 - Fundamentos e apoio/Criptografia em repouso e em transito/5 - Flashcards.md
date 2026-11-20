---
servico: Criptografia em repouso e em trânsito
fonte: "[[9 - Fundamentos e apoio/Criptografia em repouso e em transito/2 - Decorar|2 - Decorar]]"
---

# Criptografia — Flashcards

#flashcards/saa-c03/fundamentos/criptografia

Limite de dados da operação Encrypt do KMS?::**4.096 bytes** (4 KB)

Como cifrar um dado maior que o limite do KMS?::**Envelope encryption** com **data key** (`GenerateDataKey`)

Rotação da chave AWS managed × customer managed no KMS?::AWS managed: **anual, automática**. Customer managed: **opcional**; se habilitada, anual (configurável)

Período de espera para deletar uma chave do KMS?::**7 a 30 dias** (padrão **30**)

Em que Região precisa estar o certificado ACM usado no CloudFront?::**us-east-1**

Qual a criptografia padrão de objetos novos no S3 desde janeiro de 2023?::**SSE-S3**

Qual opção do S3 dá controle de acesso à chave e auditoria no CloudTrail?::**SSE-KMS**

Requisito regulatório de criptografia dupla no S3: qual opção?::**DSSE-KMS**

A chave não pode ficar na AWS, mas o S3 cifra no servidor: qual opção?::**SSE-C** (você manda a chave em cada requisição)

O que acontece se você perder a chave do SSE-C?::Perde o **objeto**: a AWS **não guarda** cópia da chave

Nem a AWS pode ver o dado em claro: qual opção?::**Client-side encryption** (a aplicação cifra antes de enviar)

Como cifrar um RDS que foi criado sem criptografia?::**Snapshot → copiar cifrado → restaurar** (KMS só se habilita na criação)

Como forçar HTTPS no acesso a um bucket S3?::Bucket policy com **Deny** quando `aws:SecureTransport` é **false**

Direct Connect é cifrado? Como cifrar?::**Não.** Use **MACsec** ou **VPN sobre DX**

TLS mínimo recomendado e algoritmo padrão em repouso?::**TLS 1.2**; **AES-256** (AES-GCM)
