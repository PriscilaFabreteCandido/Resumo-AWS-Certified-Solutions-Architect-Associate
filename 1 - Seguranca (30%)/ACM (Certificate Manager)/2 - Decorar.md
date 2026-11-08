---
tags: [saa-c03, acm, decorar]
servico: AWS Certificate Manager (ACM)
atualizado: 2026-11-08
---

# ACM — Decorar

## As três regras de ouro

| # | Regra |
|---|---|
| 1 | **Certificado público é grátis** |
| 2 | **É regional e não se copia entre regiões** |
| 3 | **CloudFront exige `us-east-1` (N. Virginia)** |

**Exceção da regra 3**: para HTTPS entre CloudFront e a **origem**, se a origem é um ELB, o certificado pode estar em **qualquer** região.

## Os 12 serviços integrados (lista oficial)

1. **Elastic Load Balancing**
2. **Amazon CloudFront** (us-east-1)
3. Amazon EKS (via ACK controllers)
4. Amazon Cognito (proxy CloudFront para domínio customizado)
5. AWS Elastic Beanstalk
6. AWS App Runner
7. **Amazon API Gateway**
8. **AWS Nitro Enclaves**
9. AWS CloudFormation
10. AWS Amplify
11. Amazon OpenSearch Service
12. AWS Network Firewall (inspeção TLS)

> [!warning] EC2 só com Nitro Enclaves
> *"Associating an ACM-managed certificate directly with an Amazon EC2 instance requires a Nitro Enclave."*
> Para servidor comum em EC2, a doc aponta o protocolo **ACME**. E certificados ACME *"cannot be used with AWS integrated services"*.

## Renovação

| Tipo | Renovação |
|---|---|
| Emitido pela ACM, validado por **DNS** | **Automática** (gerenciada) |
| Emitido pela ACM, validado por **e-mail** | Requer ação |
| **Importado** | **Você** renova e reimporta |

Para CloudFront, a doc avisa: renove ou reimporte *"at least 24 hours before the `NotAfter` value"*.

## Importação

| Requisito | Valor |
|---|---|
| Formato | **X.509 PEM** |
| Chave privada | **Não pode ter senha** |
| Chaves suportadas (CloudFront) | RSA 1024/2048/3072/4096 · ECDSA 256/384 |
| ACM emite RSA até | **2048 bits** |

## Wildcard e SAN

- *"ACM wildcard certificates can protect an unlimited number of subdomains"* (`*.exemplo.com`).
- Para alternate domain name no CloudFront: *"the SAN field must contain an exact match for the alternate domain name, or contain a wildcard at the same level"*.
- Certificado da origem incompatível → CloudFront devolve **502 Bad Gateway**.

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
