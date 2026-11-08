---
tags: [saa-c03, dominio-1, kms, cloudhsm, acm, criptografia]
dominio: 1
tasks: [1.3]
atualizado: 2026-11-08
---

# Criptografia — KMS, CloudHSM e ACM

## 🧩 Em 30 segundos

- **Em repouso = KMS.** **Em trânsito = TLS com certificado do ACM.** Essa única frase resolve muitas questões.
- `Encrypt` da KMS aceita **4.096 bytes**. Arquivo grande → **envelope encryption** com `GenerateDataKey`: a KMS é a *wrapping key*, nunca toca o dado.
- **Rotação automática** da KMS: padrão **365 dias**, só em chave **simétrica** com material gerado pela própria KMS.
- **CloudHSM** quando o requisito é **single-tenant + FIPS 140-3 nível 3 + eu controlo os usuários**. Caso contrário, KMS.
- **Certificado do ACM é regional** e, para CloudFront, **tem que estar em us-east-1**.

## 🧠 Teste-se primeiro

> [!question]- Os três tipos de chave KMS e quem controla cada um
> **Customer managed**: você controla key policy, IAM, grants, rotação, deleção. Tarifa mensal + por uso. Rotação **opcional**.
> **AWS managed** (alias `aws/<serviço>`): política controlada pelo serviço (você só vê). **Sem** tarifa mensal. Rotação **obrigatória, anual**, não desligável.
> **AWS owned**: *"Exclusively controlled and only viewable by the AWS service"* — você não vê, não audita, não apaga. Sem custo.
>
> Regra de prova: se o requisito é **auditar o uso da chave**, **controlar quem usa** ou **compartilhar entre contas** → **customer managed**.

> [!question]- Como criptografar 5 GB com KMS?
> Envelope encryption. `GenerateDataKey` devolve a data key em **texto claro** (você criptografa o arquivo com ela localmente e descarta da memória) e **criptografada** (guarda ao lado do arquivo). Para ler, manda a versão criptografada para a KMS decriptar.
> Nas palavras da doc: *"Instead of encrypting data, wrapping keys encrypt the data keys that encrypt your data."*

> [!question]- Rotação de chave recriptografa os dados existentes?
> **Não.** *"Key rotation has no effect on the data that the KMS key protects. It does not rotate the data keys that the KMS key generated or re-encrypt any data."*
> A KMS guarda **todas** as versões do material: *"When you use the rotated KMS key to decrypt ciphertext, AWS KMS uses the same version of the key material that was used to encrypt it."*

> [!question]- Qual chave NÃO pode ter rotação automática?
> **Assimétrica**, **HMAC** e chave em **custom key store** — só rotação manual. Automática é *"supported only on symmetric encryption KMS keys with key material that AWS KMS generates (AWS_KMS origin)"*.
> **AWS managed key** também não: rotação é obrigatória e você não liga nem desliga.

## KMS — o que cai

| Item | Valor / regra |
|---|---|
| Limite do `Encrypt` | **4.096 bytes** de plaintext (SYMMETRIC_DEFAULT) |
| Para dado maior | `GenerateDataKey` → envelope encryption |
| Rotação automática | Padrão **365 dias** (`RotationPeriodInDays`); só simétrica com origem `AWS_KMS` |
| Rotação on-demand | Simétrica `AWS_KMS` e simétrica `EXTERNAL` (material importado) |
| AWS managed key | Rotação **anual obrigatória**, não controlável |
| Multi-Region key | ID com prefixo `mrk-`. Rotação se configura **só na chave primária** e é propriedade compartilhada |
| Controle de acesso | **Key policy** (obrigatória, no recurso) + IAM + **grants** (delegação temporária e granular) |
| Encryption context | Par chave-valor que entra no AAD. Só em chave **simétrica**. *"strongly recommended"* |
| Assimétrica: quando usar | *"If your use case requires encryption outside of AWS by users who cannot call AWS KMS"*. Serviços AWS integrados usam **só simétrica** |

> [!warning] Key policy não é opcional
> Diferente do S3, a chave KMS **sempre** tem key policy e ela **precisa** liberar o principal explicitamente — não existe "união" com a policy de identidade aqui. Esquecer isso é a causa nº 1 de `AccessDeniedException` em KMS.
>
> Erro clássico de arquitetura: criar snapshot/AMI criptografado com chave da conta A e tentar compartilhar com a conta B **sem** dar `kms:Decrypt` na key policy. A conta B vê o snapshot e não consegue usar.

## CloudHSM × KMS

| | **AWS KMS** | **AWS CloudHSM** |
|---|---|---|
| Tenancy | Multi-tenant gerenciado | *"general purpose, single tenant"* |
| FIPS | — | **140-2 ou 140-3 nível 3** (em FIPS mode) |
| Quem controla usuários | IAM | **Você**, fora do IAM |
| AWS vê a chave? | Não vê o material, mas gerencia o serviço | *"E2E encryption is not visible to AWS"* |
| Integração com serviços AWS | Nativa em quase todos | Via custom key store da KMS, ou direto na sua app |
| APIs | API da AWS | **PKCS #11, JCE, CNG, KSP** |
| Esforço | Baixo | *"you have more responsibility than if you used a managed AWS service"* |

A própria doc do CloudHSM diz: *"If you want a managed service for creating and controlling your encryption keys but you don't want or need to operate your own HSMs, consider using AWS Key Management Service."*

> [!tip] Gatilho de prova para CloudHSM
> Só três frases puxam CloudHSM: **"FIPS 140-2/140-3 level 3"**, **"single-tenant HSM"** e **"a AWS não pode ter acesso nenhum ao material da chave"**. Fora disso, é KMS.

## ACM

| Item | Regra |
|---|---|
| Custo | *"You are not subject to an additional charge for SSL/TLS certificates that you manage with AWS Certificate Manager."* Certificado **público é grátis** |
| Escopo | **Regional.** *"You cannot copy a certificate between regions"* |
| CloudFront | *"you must request or import the certificate in the US East (N. Virginia) region"* |
| Exceção | Para HTTPS entre CloudFront e a **origem**, se a origem é um ELB, o certificado pode estar em **qualquer** região |
| EC2 | Só com **Nitro Enclaves**. *"Associating an ACM-managed certificate directly with an Amazon EC2 instance requires a Nitro Enclave"* |
| Serviços integrados | ELB · CloudFront · EKS (via ACK) · Cognito · Elastic Beanstalk · App Runner · API Gateway · Nitro Enclaves · CloudFormation · Amplify · OpenSearch Service · Network Firewall |
| Privado | **AWS Private CA** emite certificados internos |
| Renovação | Renovação gerenciada para certificados emitidos pela ACM e validados por DNS. Certificado **importado** você renova/reimporta na mão |

## ❓ Questões de prova

> [!example]- Q1 — Requisito regulatório: as chaves de criptografia precisam estar em HSM **dedicado**, validado **FIPS 140-3 nível 3**, e a AWS não pode ter acesso ao material. O que usar?
> **A)** KMS com chave customer managed e rotação anual
> **B)** **AWS CloudHSM** ✅
> **C)** KMS com chave multi-Region
> **D)** Secrets Manager com chave customer managed
>
> **Por que B**: três gatilhos juntos — dedicado (single tenant), FIPS nível 3, AWS sem acesso.
> **A e C erradas**: KMS é multi-tenant e gerenciado pela AWS. Customer managed dá controle de **política**, não de hardware dedicado.
> **D errada**: Secrets Manager guarda **secret de aplicação**, não é cofre de chave criptográfica em HSM.

> [!example]- Q2 — Uma distribuição CloudFront precisa servir `www.exemplo.com` por HTTPS com certificado próprio. O time importou o certificado em `sa-east-1` e ele não aparece na console do CloudFront. Por quê?
> **A)** Falta validar o domínio por DNS
> **B)** CloudFront aceita apenas certificados emitidos pela ACM, não importados
> **C)** **O certificado precisa estar em us-east-1 (N. Virginia)** ✅
> **D)** Falta habilitar SNI na distribuição
>
> **Por que C**: regra literal da doc do CloudFront. Certificado ACM é regional e o CloudFront só lê de us-east-1.
> **B errada**: certificado importado **é** aceito (em PEM, com chave privada sem senha).
> **A e D erradas**: nada a ver com o certificado não aparecer na lista.

> [!example]- Q3 — Uma aplicação precisa criptografar arquivos de até 200 MB antes de gravar em disco, usando chave gerenciada pela AWS e auditável. Qual desenho?
> **A)** Chamar `kms:Encrypt` para cada arquivo
> **B)** **Chamar `kms:GenerateDataKey`, criptografar o arquivo localmente com a data key em texto claro e armazenar a data key criptografada ao lado do arquivo** ✅
> **C)** Usar chave assimétrica e o algoritmo RSAES_OAEP_SHA_256
> **D)** Usar CloudHSM com PKCS #11
>
> **Por que B**: é envelope encryption, o padrão para qualquer dado acima de 4 KB.
> **A errada**: `Encrypt` recusa plaintext acima de **4.096 bytes**.
> **C errada**: assimétrica é **pior** nesse aspecto — RSA_4096 com OAEP SHA-256 aceita **446 bytes**.
> **D errada**: resolve, mas é esforço operacional desnecessário; o enunciado não pede HSM dedicado.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| KMS criptografa arquivo | Até **4 KB**. Acima: envelope encryption |
| Rotação de chave exige recriptografar os dados | Não exige nada: a KMS guarda as versões antigas |
| Toda chave KMS pode rotacionar automaticamente | Só **simétrica com material da KMS** |
| Multi-Region key replica os dados | Replica a **chave**, para que o mesmo ciphertext seja decriptável em outra região. Os dados você replica por outro meio (S3 CRR, por exemplo) |
| Certificado ACM é global | **Regional**, e us-east-1 para CloudFront |
| ACM instala certificado em EC2 | Só com Nitro Enclaves |
| ACM cobra pelo certificado público | **Grátis** |
| "Criptografar em trânsito" é KMS | É **TLS/ACM** |
| CloudHSM é só "KMS mais caro" | Single-tenant, FIPS nível 3, você gerencia usuários e a AWS não vê o material |

## Links

- [[01 - Dominio 1 - Design Secure Architectures (30%)]]
- [[Protecao de dados no S3]]
- [[Secrets Manager e Parameter Store]]
- [Conceitos do KMS](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html)
- [Rotação de chaves](https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html)
- [Visão geral do ACM](https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html)
