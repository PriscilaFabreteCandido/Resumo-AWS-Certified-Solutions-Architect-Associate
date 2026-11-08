---
tags: [saa-c03, acm, tls, criptografia]
servico: AWS Certificate Manager (ACM)
tipo: Certificados TLS
dominios: [1]
atualizado: 2026-11-08
---

# ACM (Certificate Manager) — O que é

> [!info] Em uma frase
> Emite, armazena e **renova automaticamente** certificados **SSL/TLS** para proteger o tráfego **em trânsito**. Certificado público é **grátis** — você paga só os recursos que o usam.

## O que é, em palavras simples

Se a questão fala de **HTTPS**, **TLS** ou **"criptografar em trânsito"**, a peça é o ACM. Ele resolve a parte chata do TLS: emitir, validar o domínio, instalar no recurso e renovar antes de expirar.

A doc: *"AWS Certificate Manager (ACM) handles the complexity of creating, storing, and renewing public and private SSL/TLS X.509 certificates and keys that protect your AWS websites and applications."*

## Duas regras que decidem questões

**1. Certificado público é grátis.** *"You are not subject to an additional charge for SSL/TLS certificates that you manage with AWS Certificate Manager. You pay only for the AWS resources that you create to run your website or application."*

**2. O certificado é regional, e para CloudFront tem que estar em `us-east-1`.** *"Certificates in ACM are regional resources"*, *"You cannot copy a certificate between regions"* e *"To use an ACM certificate with Amazon CloudFront, you must request or import the certificate in the US East (N. Virginia) region."*

## Público × privado

| | Público | Privado |
|---|---|---|
| Emitido por | CA pública da Amazon | **AWS Private CA** |
| Confiado por navegadores | **Sim** | Só por quem confia na sua CA |
| Custo | **Grátis** | AWS Private CA é cobrada |
| Use para | Site e API na internet | Comunicação interna, mTLS, dispositivos |

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[KMS]] · [[CloudFront]] · [[ELB (Load Balancers)]] · [[Criptografia em repouso e em transito]]
- [Visão geral do ACM](https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html)
