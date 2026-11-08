---
tags: [saa-c03, acm, detalhes]
servico: AWS Certificate Manager (ACM)
atualizado: 2026-11-08
---

# ACM — Detalhes

## 1. Em repouso × em trânsito — a confusão que a prova explora

| Onde o dado está | Mecanismo |
|---|---|
| **Parado** no disco, bucket, tabela, snapshot | **KMS** (ou SSE-S3, ou client-side) |
| **Trafegando** pela rede | **TLS**, com certificado do **ACM** |

O guia oficial separa as duas skills em **Task 1.3**:
- *"Encrypting data at rest (for example, AWS KMS)"*
- *"Encrypting data in transit (for example, AWS Certificate Manager [ACM] using TLS)"*

Se a alternativa oferece "usar KMS para criptografar em trânsito", está errada.

## 2. Onde o certificado tem que morar

Certificado ACM é **recurso regional**: *"To use a certificate with Elastic Load Balancing for the same fully qualified domain name (FQDN) or set of FQDNs in more than one AWS region, you must request or import a certificate for each region."* E não há atalho: *"You cannot copy a certificate between regions."*

A exceção importante é o **CloudFront**, que é global e lê certificados apenas de `us-east-1`:

> *"To use a certificate in AWS Certificate Manager (ACM) to require HTTPS between viewers and CloudFront, make sure you request (or import) the certificate in the US East (N. Virginia) Region (`us-east-1`)."*

E o contraexemplo, igualmente importante:

> *"If you want to require HTTPS between CloudFront and your origin, and you're using a load balancer in Elastic Load Balancing as your origin, you can request or import the certificate in any AWS Region."*

Ou seja: **viewer ↔ CloudFront** exige us-east-1; **CloudFront ↔ ELB** aceita qualquer região.

## 3. Terminação TLS — onde encerrar

| Encerrar em | Quando |
|---|---|
| **CloudFront** | Conteúdo global; aproveita a borda e o certificado em us-east-1 |
| **ALB** | Aplicação HTTP regional; o ALB também integra com **WAF** |
| **NLB** | TCP/TLS com IP estático; faz TLS offload na camada 4 |
| **API Gateway** | APIs; domínio customizado com certificado ACM |
| **Na instância** (end-to-end) | Requisito de compliance de criptografia ponta a ponta |

Para **end-to-end**, o padrão é: viewer → CloudFront (certificado ACM em us-east-1) → ALB (certificado ACM na região) → instância (certificado próprio ou ACM via Nitro Enclaves). O NLB em modo **TCP passthrough** também permite que o TLS seja encerrado só na instância.

## 4. Validação de domínio

Dois métodos: **DNS** (criar um registro CNAME na zona) e **e-mail** (mensagem para os contatos do WHOIS e endereços administrativos).

A validação por **DNS** é a preferida porque habilita a **renovação gerenciada**: enquanto o registro CNAME existir, a ACM revalida e renova sozinha. Com Route 53, a console cria o registro para você.

## 5. AWS Private CA

Para certificados **internos** (serviço a serviço, mTLS, dispositivos), o ACM entrega certificados assinados pela sua **AWS Private CA**. A doc nota que *"Certificates signed by AWS Private CA can be exported"* — diferente dos públicos emitidos pela ACM, cuja chave privada não sai.

Casos típicos de prova: **mutual TLS** no API Gateway, autenticação de cliente em ALB/NLB, e certificados para workloads que não podem confiar numa CA pública.

## 6. Renovação e rotação

O guia pede, em **Task 1.3**: *"Rotating encryption keys and renewing certificates"* — as duas coisas na mesma skill. Vale fixar o contraste:

| | **Chave KMS** | **Certificado ACM** |
|---|---|---|
| Rotação/renovação automática | Simétrica `AWS_KMS`, padrão **365 dias** | Emitido pela ACM + validação DNS |
| Manual obrigatória | Assimétrica, HMAC, custom key store | **Certificado importado** |
| Afeta os dados existentes | **Não** (KMS guarda as versões) | Não se aplica |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[KMS]] · [[CloudFront]] · [[ELB (Load Balancers)]] · [[API Gateway]] · [[Criptografia em repouso e em transito]]
- [Serviços integrados ao ACM](https://docs.aws.amazon.com/acm/latest/userguide/acm-services.html)
