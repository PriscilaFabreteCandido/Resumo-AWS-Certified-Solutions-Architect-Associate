---
tags: [saa-c03, kms, detalhes]
servico: AWS KMS
atualizado: 2026-11-08
---

# KMS — Detalhes

## 1. Envelope encryption, passo a passo

A API `Encrypt` *"Encrypts plaintext of up to 4,096 bytes using a KMS key"*, e o próprio parâmetro tem a restrição: *"Length Constraints: Minimum length of 1. Maximum length of 4096."*

A doc orienta o uso pretendido: *"You can use this operation to encrypt small amounts of arbitrary data, such as a personal identifier or database password."* E para o resto: *"The GenerateDataKey and GenerateDataKeyPair operations return a plaintext data key and an encrypted copy of that data key."*

O fluxo:

```
                      ┌──────────── AWS KMS ────────────┐
   GenerateDataKey ──>│  KMS key (wrapping key)         │
                      │  nunca sai do HSM               │
                      └────┬───────────────────────┬────┘
                           │                       │
              data key em texto claro      data key criptografada
                           │                       │
                 criptografa o arquivo       guardada AO LADO
                 localmente, e é            do arquivo
                 descartada da memória
```

Para ler: envia a data key criptografada para `Decrypt`, recebe a versão em texto claro, decifra o arquivo.

**Por que isso importa na prova**: toda questão com "criptografar um arquivo de X MB/GB com KMS" tem como resposta **envelope encryption**, nunca `Encrypt` direto. E as alternativas erradas costumam oferecer "usar chave assimétrica" — que é **pior**, porque o limite cai para centenas de bytes.

## 2. Os três tipos de chave, em detalhe

**Customer managed key** — *"Exclusively controlled by the customer"*. Você define key policy, IAM, grants, rotação, localização regional e deleção. Tem tarifa mensal **mais** tarifa por uso. Rotação automática é **opcional**.

**AWS managed key** — alias no formato `aws/{service-name}` (`aws/s3`, `aws/rds`, `aws/ebs`). *"Controlled by service; viewable by customer"*. *"AWS KMS manages rotation (annual)"* e a rotação é *"Required. Every year (approximately 365 days)"* — você **não** pode ligar nem desligar. **Sem tarifa mensal.** A doc nota que, desde 2021, novos serviços AWS não criam mais esse tipo (é legado).

**AWS owned key** — *"Exclusively controlled and only viewable by the AWS service"*. *"Not viewable by the customer"* para fins de log. E o ponto decisivo: *"you cannot change their policies, you cannot audit activities on these keys, and you cannot delete them."* Sem custo.

> [!important] A regra de decisão
> Precisa de **auditoria**, **controle de acesso próprio**, **compartilhamento cross-account** ou **rotação definida por você** → **customer managed key**.
> Caso contrário, a AWS managed key resolve e não tem tarifa mensal.
> Para **S3 cross-account com SSE-KMS**, a doc do S3 é explícita: *"If you want to grant cross-account access to your S3 objects, use a customer managed key."*

## 3. Rotação

A rotação automática é *"supported only on symmetric encryption KMS keys with key material that AWS KMS generates (AWS_KMS origin)"*. O período padrão: *"If you do not specify a value for RotationPeriodInDays when you enable automatic key rotation, the default value is 365 days."*

Não suportam rotação automática (só manual): **assimétricas**, **HMAC** e chaves em **custom key store**.

Dois pontos que a prova explora:

**Rotação não toca nos dados.** *"Key rotation has no effect on the data that the KMS key protects. It does not rotate the data keys that the KMS key generated or re-encrypt any data protected by the KMS key."* A KMS retém **todas** as versões do material: *"AWS KMS retains all key material for a KMS key with AWS_KMS origin, even if key rotation is disabled. AWS KMS deletes key material only when you delete the KMS key."*

**O decrypt escolhe a versão certa automaticamente.** *"When you use the rotated KMS key to decrypt ciphertext, AWS KMS uses the same version of the key material that was used to encrypt it."*

Monitoramento: evento **"KMS CMK Rotation"** no EventBridge e **`RotateKey`** no CloudTrail.

## 4. Controle de acesso

**Key policy** é obrigatória e é a base. Diferente de uma bucket policy, ela **não** funciona por união com a policy de identidade: a doc do IAM classifica key policy do KMS como exceção que *"must explicitly allow access for principals"*.

O erro prático mais comum: criar um snapshot de EBS ou uma AMI criptografada com chave da conta A, compartilhar com a conta B, e a conta B não conseguir usar — porque a **key policy** não libera a conta B.

**IAM policy** concede ações `kms:*` a identidades, mas só vale se a key policy delegar ao IAM.

**Grants** são delegação temporária e granular, com escopo por operação e por encryption context. É o mecanismo que serviços AWS usam internamente.

**Encryption context** é um par chave-valor que entra no AAD: se não for apresentado igual no decrypt, a operação falha. Só funciona em chave **simétrica**, e a doc diz que é *"strongly recommended"* — além de aparecer no CloudTrail, o que ajuda auditoria.

## 5. Multi-Region keys

Chaves com o mesmo material em várias regiões, com ID prefixado por **`mrk-`**. Servem para que um ciphertext gerado numa região seja decriptável em outra **sem** chamar a KMS da região original.

Pontos de prova: a rotação é *"shared property"* e se configura **só na chave primária**. Multi-Region key replica a **chave**, não os dados — a replicação dos dados é S3 CRR, snapshot copy, etc.

## 6. KMS × CloudHSM × ACM

| Pergunta | Serviço |
|---|---|
| Chave gerenciada, integrada com os serviços AWS | **KMS** |
| HSM **single-tenant**, FIPS 140-3 nível 3, eu gerencio os usuários | **CloudHSM** |
| Certificado **TLS** para HTTPS | **ACM** |

A própria doc do CloudHSM diz: *"If you want a managed service for creating and controlling your encryption keys but you don't want or need to operate your own HSMs, consider using AWS Key Management Service."*

E lembre: **KMS = em repouso. ACM/TLS = em trânsito.** Essa confusão é explorada direto.

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[CloudHSM]] · [[ACM (Certificate Manager)]] · [[Secrets Manager]] · [[Criptografia em repouso e em transito]] · [[IAM]]
- [Rotação de chaves](https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html)
- [API Encrypt](https://docs.aws.amazon.com/kms/latest/APIReference/API_Encrypt.html)
