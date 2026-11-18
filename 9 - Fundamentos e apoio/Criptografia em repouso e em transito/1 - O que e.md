---
tags: [saa-c03, criptografia, seguranca, fundamentos]
conceito: Criptografia em repouso e em trânsito
dominios: [1]
atualizado: 2026-11-08
---

# Criptografia em repouso e em trânsito — O que é

> [!info] Em uma frase
> **Em repouso** = o dado gravado em disco está cifrado (quem obtiver o disco não lê) — o serviço é o **KMS**. **Em trânsito** = o dado viajando pela rede está cifrado (quem interceptar não lê) — o protocolo é **TLS/HTTPS** e o serviço que dá o certificado é o **ACM**.

## A divisão que a prova cobra

| | **Em repouso** (at rest) | **Em trânsito** (in transit) |
|---|---|---|
| Protege de | roubo de disco, snapshot vazado, bucket copiado | interceptação, *man-in-the-middle* |
| Tecnologia | **AES-256** (padrão) | **TLS 1.2+** |
| Serviço central | **AWS KMS** (e **CloudHSM** quando exigem FIPS 140-3 nível 3 / chave só sua) | **ACM** (certificados) |
| Onde se configura | No serviço de armazenamento (S3, EBS, RDS, DynamoDB…) | No endpoint (ALB/NLB, CloudFront, API Gateway) |
| Palavra no enunciado | *"encrypted at rest"* (criptografado em repouso), *"compliance"*, *"rotate keys"* | *"in transit"*, *"HTTPS"*, *"TLS"*, *"end-to-end encryption"* |

## O guia oficial cita

**Task 1.3** — *"Knowledge of: ... AWS managed encryption, data at rest, data in transit"* e pede *"Choosing data security options based on requirements"* (escolher opções de segurança de dados com base nos requisitos).

## O essencial do KMS

| Tipo de chave | Quem gerencia | Rotação | Policy própria |
|---|---|---|---|
| **AWS owned** | AWS (invisível) | AWS | Não |
| **AWS managed** (`aws/s3`, `aws/rds`) | AWS, na sua conta | **anual, automática** | Não (visível, não editável) |
| **Customer managed (CMK)** | **Você** | **opcional**, você escolhe | **Sim** — key policy |

> [!important] Quando a resposta é **customer managed key**
> Sempre que o enunciado pedir **controlar quem usa a chave**, **auditar o uso**, **rotação sob seu controle**, **compartilhar entre contas** ou **poder revogar/desabilitar**. Com chave AWS managed você não tem key policy.

## Links

- [[9 - Fundamentos e apoio/Criptografia em repouso e em transito/2 - Decorar|2 - Decorar]] · [[9 - Fundamentos e apoio/Criptografia em repouso e em transito/3 - Detalhes|3 - Detalhes]] · [[9 - Fundamentos e apoio/Criptografia em repouso e em transito/4 - Questoes|4 - Questoes]]
- [[1 - Seguranca (30%)/KMS/1 - O que e|KMS]] · [[1 - Seguranca (30%)/CloudHSM/1 - O que e|CloudHSM]] · [[1 - Seguranca (30%)/ACM (Certificate Manager)/1 - O que e|ACM (Certificate Manager)]] · [[1 - Seguranca (30%)/Secrets Manager/1 - O que e|Secrets Manager]] · [[3 - Performance (24%)/S3/1 - O que e|S3]] · [[9 - Fundamentos e apoio/Responsabilidade compartilhada/1 - O que e|Responsabilidade compartilhada]]
