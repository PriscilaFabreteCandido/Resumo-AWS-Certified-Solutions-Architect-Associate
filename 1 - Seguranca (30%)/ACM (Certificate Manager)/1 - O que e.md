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

A doc: *"AWS Certificate Manager (ACM) handles the complexity of creating, storing, and renewing public and private SSL/TLS X.509 certificates and keys that protect your AWS websites and applications."* (o AWS Certificate Manager (ACM) cuida da complexidade de criar, armazenar e renovar certificados e chaves SSL/TLS X.509, públicos e privados, que protegem seus sites e aplicações na AWS)

## Duas regras que decidem questões

**1. Certificado público é grátis.** *"You are not subject to an additional charge for SSL/TLS certificates that you manage with AWS Certificate Manager. You pay only for the AWS resources that you create to run your website or application."* (você não paga nada a mais pelos certificados SSL/TLS gerenciados pelo AWS Certificate Manager; paga apenas pelos recursos da AWS que criar para rodar seu site ou aplicação)

**2. O certificado é regional, e para CloudFront tem que estar em `us-east-1`.** *"Certificates in ACM are regional resources"* (certificados no ACM são recursos regionais), *"You cannot copy a certificate between regions"* (não é possível copiar um certificado entre Regiões) e *"To use an ACM certificate with Amazon CloudFront, you must request or import the certificate in the US East (N. Virginia) region."* (para usar um certificado do ACM com o Amazon CloudFront, você precisa solicitar ou importar o certificado na Região Norte da Virgínia)

## Público × privado

| | Público | Privado |
|---|---|---|
| Emitido por | CA pública da Amazon | **AWS Private CA** |
| Confiado por navegadores | **Sim** | Só por quem confia na sua CA |
| Custo | **Grátis** | AWS Private CA é cobrada |
| Use para | Site e API na internet | Comunicação interna, mTLS, dispositivos |

## Links

- [[1 - Seguranca (30%)/ACM (Certificate Manager)/2 - Decorar|2 - Decorar]] · [[1 - Seguranca (30%)/ACM (Certificate Manager)/3 - Detalhes|3 - Detalhes]] · [[1 - Seguranca (30%)/ACM (Certificate Manager)/4 - Questoes|4 - Questoes]]
- [[1 - Seguranca (30%)/KMS/1 - O que e|KMS]] · [[3 - Performance (24%)/CloudFront/1 - O que e|CloudFront]] · [[2 - Resiliencia (26%)/ELB (Load Balancers)/1 - O que e|ELB (Load Balancers)]] · [[9 - Fundamentos e apoio/Criptografia em repouso e em transito/1 - O que e|Criptografia em repouso e em transito]]
- [Visão geral do ACM](https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html)
