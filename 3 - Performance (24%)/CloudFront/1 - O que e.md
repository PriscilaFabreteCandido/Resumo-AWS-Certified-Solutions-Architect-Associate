---
tags: [saa-c03, cloudfront, cdn, borda]
servico: Amazon CloudFront
tipo: CDN
dominios: [3, 1, 4]
atualizado: 2026-11-08
---

# Amazon CloudFront — O que é

> [!info] Em uma frase
> CDN que *"delivers your content through a worldwide network of data centers called edge locations"* — **cacheia** na borda, reduz latência e tira carga da origem.

## O que ele faz, além de cachear

| Função | Como |
|---|---|
| **Cache na borda** | TTL padrão **24 horas** |
| **Terminação TLS** | Certificado ACM, **obrigatoriamente em us-east-1** |
| **Proteção** | **AWS WAF** + **Shield** |
| **Origem privada** | **OAC** (Origin Access Control) para S3 |
| **Conteúdo restrito** | **Signed URLs** e **signed cookies** |
| **Restrição geográfica** | Allow list / block list por **país** |
| **Lógica na borda** | **CloudFront Functions** e **Lambda@Edge** |
| **Failover de origem** | **Origin group** com 2 origens |

## Origens suportadas

> *"an Amazon S3 bucket, a MediaPackage channel, or an HTTP server"* — e o HTTP server inclui **ALB**, **API Gateway**, **EC2** e servidores próprios.

## O fato de custo

> *"The data transfer from your origin to CloudFront is always free when using AWS origins like Amazon Simple Storage Service (Amazon S3), Elastic Load Balancing, or Amazon API Gateway."*

Servir 200 TB pelo CloudFront é **mais barato** que servir direto do S3.

## CloudFront × Global Accelerator

| | **CloudFront** | **Global Accelerator** |
|---|---|---|
| **Cacheia** | **Sim** | **Não** |
| Protocolo | HTTP/HTTPS | **TCP e UDP** |
| Endereço | DNS name | **2 IPs estáticos anycast** |

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[Global Accelerator]] · [[S3]] · [[ACM (Certificate Manager)]] · [[WAF]] · [[Route 53]] · [[Custo de rede e transferencia de dados]]
- [Como o CloudFront funciona](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/HowCloudFrontWorks.html)
