---
tags: [saa-c03, kms, questoes]
servico: AWS KMS
atualizado: 2026-11-08
---

# KMS — Questões

> [!question]- Q1. Uma aplicação precisa criptografar arquivos de até 200 MB com chave gerenciada e auditável. Qual desenho?
> **A)** Chamar `kms:Encrypt` para cada arquivo
> **B)** **`kms:GenerateDataKey`, criptografar localmente com a data key em texto claro e guardar a data key criptografada ao lado do arquivo** ✅
> **C)** Chave assimétrica com RSAES_OAEP_SHA_256
> **D)** CloudHSM com PKCS #11
>
> **Por que B**: envelope encryption é o padrão para qualquer dado acima de 4 KB.
> **A errada**: `Encrypt` recusa plaintext acima de **4.096 bytes**.
> **C errada**: **pior** — RSA_4096 com OAEP SHA-256 aceita **446 bytes**.
> **D errada**: resolve, mas é esforço desnecessário; o enunciado não pede HSM dedicado.

> [!question]- Q2. Compliance exige HSM dedicado, FIPS 140-3 nível 3, e que a AWS não tenha acesso ao material da chave.
> **A)** KMS com customer managed key
> **B)** **AWS CloudHSM** ✅
> **C)** KMS com multi-Region key
> **D)** Secrets Manager com chave própria
>
> **Por que B**: três gatilhos juntos — *"general purpose, single tenant"*, FIPS nível 3, e *"E2E encryption is not visible to AWS"*.
> **A e C erradas**: KMS é multi-tenant e gerenciado pela AWS. Customer managed dá controle de **política**, não de hardware dedicado.
> **D errada**: Secrets Manager guarda secret de aplicação, não é cofre de chave em HSM.

> [!question]- Q3. A conta A compartilhou um snapshot de EBS criptografado com a conta B. A conta B vê o snapshot, mas não consegue restaurá-lo. Por quê?
> **A)** Snapshot criptografado não pode ser compartilhado
> **B)** **A key policy da chave KMS não permite a conta B** ✅
> **C)** Falta habilitar criptografia por padrão na conta B
> **D)** A chave precisa ser multi-Region
>
> **Por que B**: key policy é exceção à regra da união — *"must explicitly allow access for principals"*. Sem a conta B na key policy, nenhuma policy IAM dela resolve.
> **A errada**: pode ser compartilhado, desde que criptografado com **customer managed key** (AWS managed key não é compartilhável).
> **D errada**: multi-Region resolve **regiões**, não contas.

> [!question]- Q4. A política manda rotacionar as chaves anualmente. Após habilitar a rotação automática, o que acontece com os dados já criptografados?
> **A)** Ficam inacessíveis até serem recriptografados
> **B)** São recriptografados automaticamente pela KMS
> **C)** **Nada: a KMS mantém as versões antigas e usa a correta no decrypt** ✅
> **D)** Precisam ser migrados para uma chave nova
>
> **Por que C**: *"Key rotation has no effect on the data that the KMS key protects"* e *"AWS KMS uses the same version of the key material that was used to encrypt it."*

> [!question]- Q5. Um time precisa de uma chave para criptografar objetos no S3, com rotação anual, **sem tarifa mensal de chave**, e não precisa auditar o uso nem compartilhar entre contas.
> **A)** Customer managed key com rotação habilitada
> **B)** **A AWS managed key `aws/s3`** ✅
> **C)** AWS owned key
> **D)** CloudHSM
>
> **Por que B**: AWS managed key tem rotação *"Required. Every year"*, **sem tarifa mensal**, e é visualizável pelo cliente.
> **A errada**: atende, mas tem tarifa mensal — e o enunciado descarta os motivos que justificariam customer managed.
> **C errada**: AWS owned key não é selecionável nem visualizável; é usada internamente por serviços.
> **D errada**: esforço e custo desproporcionais.

> [!question]- Q6. Qual chave **não** pode ter rotação automática habilitada?
> **A)** Customer managed simétrica criada na KMS
> **B)** **Chave assimétrica** ✅
> **C)** Chave simétrica com material importado
> **D)** Multi-Region key primária
>
> **Por que B**: automática é *"supported only on symmetric encryption KMS keys with key material that AWS KMS generates (AWS_KMS origin)"*. Assimétrica, HMAC e custom key store só manual.
> **C errada**: material importado (`EXTERNAL`) suporta rotação **on-demand**.
> **D errada**: suporta — e a rotação se configura justamente **na primária**.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| KMS criptografa arquivos | **Até 4.096 bytes.** Acima: envelope encryption |
| Chave assimétrica cifra mais dado | Cifra **menos** (190-470 bytes, conforme o algoritmo) |
| Rotação recriptografa os dados | **Não.** A KMS guarda as versões antigas |
| Toda chave rotaciona automaticamente | Só **simétrica com material da KMS** |
| AWS managed key pode ter rotação desligada | **Não.** É obrigatória e anual |
| AWS owned key pode ser auditada | *"you cannot audit activities on these keys"* |
| Policy IAM resolve acesso à chave | A **key policy** precisa liberar o principal |
| Multi-Region key replica os dados | Replica a **chave** |
| KMS criptografa em trânsito | Em trânsito é **TLS/ACM** |
| Snapshot com AWS managed key é compartilhável | Para compartilhar, precisa de **customer managed key** |
| CloudHSM é só KMS mais caro | Single-tenant, FIPS nível 3, você gerencia os usuários |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
- [[03 - Pegadinhas mestre]]
