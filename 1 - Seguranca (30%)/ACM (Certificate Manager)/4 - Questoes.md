---
tags: [saa-c03, acm, questoes]
servico: AWS Certificate Manager (ACM)
atualizado: 2026-11-08
---

# ACM — Questões

> [!question]- Q1. O time importou o certificado em `sa-east-1` e ele não aparece na console do CloudFront. Por quê?
> **A)** Falta validar o domínio por DNS
> **B)** CloudFront só aceita certificados emitidos pela ACM
> **C)** **O certificado precisa estar em `us-east-1` (N. Virginia)** ✅
> **D)** Falta habilitar SNI
>
> **Por que C**: regra literal da doc do CloudFront.
> **B errada**: certificado **importado** é aceito (PEM, chave privada sem senha).
> **A e D erradas**: não explicam o certificado não aparecer na lista.

> [!question]- Q2. Uma aplicação em EC2 precisa de certificado TLS gerenciado pela AWS. É possível?
> **A)** Sim, anexando o certificado ACM à instância
> **B)** **Só com AWS Nitro Enclaves; o padrão é encerrar o TLS num ALB/NLB/CloudFront com certificado ACM** ✅
> **C)** Sim, via Systems Manager
> **D)** Não, de forma alguma
>
> **Por que B**: *"Associating an ACM-managed certificate directly with an Amazon EC2 instance requires a Nitro Enclave."* O desenho normal é terminar TLS no balanceador.
> **D errada**: é possível, com Nitro Enclaves (ou ACME para certificado público no servidor).

> [!question]- Q3. Uma empresa precisa de HTTPS em ALBs de três regiões, com o mesmo domínio. Quantos certificados?
> **A)** Um, em us-east-1
> **B)** **Três: um por região** ✅
> **C)** Um, replicado automaticamente
> **D)** Um por AZ
>
> **Por que B**: *"you must request or import a certificate for each region"* e *"You cannot copy a certificate between regions."*
> **A errada**: us-east-1 é regra do **CloudFront**, não do ELB.

> [!question]- Q4. Qual mecanismo criptografa os dados **em trânsito** entre o cliente e a aplicação?
> **A)** KMS com customer managed key
> **B)** **TLS com certificado do ACM** ✅
> **C)** SSE-KMS
> **D)** CloudHSM
>
> **Por que B**: o guia separa as skills — em repouso é KMS, em trânsito é *"ACM using TLS"*.
> **A, C e D erradas**: todas tratam de dado **em repouso** (ou de gestão de chave).

> [!question]- Q5. O certificado importado no ALB vai expirar em 10 dias e ninguém foi avisado. Como evitar isso no futuro?
> **A)** Habilitar rotação automática no KMS
> **B)** **Emitir o certificado pela própria ACM com validação por DNS, que habilita renovação gerenciada** ✅
> **C)** Importar com validade maior
> **D)** Usar AWS Private CA
>
> **Por que B**: certificado **importado** é responsabilidade sua; certificado emitido pela ACM com validação DNS renova sozinho.
> **A errada**: KMS rotaciona chaves, não certificados.
> **C errada**: adia o problema.
> **D errada**: Private CA emite certificados **internos** — útil, mas não é o que o enunciado pede (e também há renovação gerenciada ali).

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Certificado ACM é global | **Regional**, e não se copia entre regiões |
| Qualquer região serve para CloudFront | **us-east-1**, sempre (para viewer↔CloudFront) |
| CloudFront↔ELB também exige us-east-1 | **Qualquer** região |
| ACM instala certificado em EC2 | Só com **Nitro Enclaves** |
| ACM cobra pelo certificado público | **Grátis** |
| Certificado importado renova sozinho | **Você** renova e reimporta |
| KMS criptografa em trânsito | Em trânsito é **TLS/ACM** |
| Certificado ACME funciona no ALB | *"cannot be used with AWS integrated services"* |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
- [[03 - Pegadinhas mestre]]
