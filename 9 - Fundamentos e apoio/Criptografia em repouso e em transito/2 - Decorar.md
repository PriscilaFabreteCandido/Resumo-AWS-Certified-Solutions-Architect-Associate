---
tags: [saa-c03, criptografia, decorar]
conceito: Criptografia em repouso e em trânsito
atualizado: 2026-11-08
---

# Criptografia — Decorar

## Os números

| Item | Valor |
|---|---|
| Algoritmo padrão em repouso | **AES-256** (AES-GCM) |
| TLS mínimo recomendado | **1.2** |
| **Limite do `Encrypt` do KMS** | **4.096 bytes** (4 KB) |
| Dado maior que isso | **Envelope encryption** com **data key** (`GenerateDataKey`) |
| Rotação da chave **AWS managed** | **Anual, automática** |
| Rotação da **customer managed** | **Opcional**; se habilitada, **anual** (período configurável) |
| Período de espera para deletar chave | **7 a 30 dias** (padrão **30**) |
| Certificado público do ACM | **gratuito** e **renovado automaticamente** |
| Certificado ACM para **CloudFront** | obrigatoriamente em **us-east-1** |

## As opções de criptografia do S3

| Opção | Quem gerencia a chave | Quem criptografa | Auditoria do uso | Quando usar |
|---|---|---|---|---|
| **SSE-S3** | A **AWS**, transparente | **S3** (servidor) | **Não** | Criptografia básica, sem requisito especial — **é o padrão** do S3 |
| **SSE-KMS** | **KMS**, com **controle seu** | **S3** (servidor) | **Sim** (CloudTrail) | **Controle de acesso à chave**, **auditoria**, **compliance**, **cross-account** |
| **DSSE-KMS** | **KMS**, **duas camadas** | **S3** (duas vezes) | **Sim** | Requisito **regulatório de criptografia dupla** |
| **SSE-C** | **Você** — manda a chave **em cada requisição** | **S3**, com a sua chave (e a descarta) | **Por sua conta** | A chave **não pode ficar na AWS** |
| **Client-side (CSE)** | **Você** | **Sua aplicação**, antes de enviar | **Por sua conta** | **Nem a AWS** pode ver o dado em claro |

> [!warning] Perder a chave do SSE-C = perder o objeto
> A AWS **não guarda** cópia da chave do SSE-C. E o SSE-C **não pode** ser a criptografia padrão do bucket.

> [!important] Desde janeiro de 2023 todo objeto novo no S3 é cifrado com **SSE-S3 por padrão**. Então *"habilitar criptografia em repouso no S3"* raramente é a resposta — a pergunta real é **qual** opção.

## Criptografia por serviço

| Serviço | Em repouso |
|---|---|
| **S3** | **Padrão SSE-S3**; SSE-KMS / DSSE-KMS / SSE-C / CSE |
| **EBS** | KMS; **pode ser padrão na conta por Região** |
| **RDS / Aurora** | KMS — **só na criação**; para cifrar depois: snapshot → **copiar cifrado** → restaurar |
| **DynamoDB** | **Sempre cifrado**; escolhe entre AWS owned / AWS managed / customer managed |
| **EFS** | KMS (habilitar na criação do filesystem) |
| **Redshift / OpenSearch / SQS / SNS / Kinesis / CloudWatch Logs / Lambda env vars** | KMS |
| **Secrets Manager / Parameter Store (SecureString)** | KMS |

## Em trânsito

| Onde | Como |
|---|---|
| Cliente → **CloudFront** | HTTPS + certificado do **ACM em us-east-1** |
| Cliente → **ALB / NLB / API Gateway** | HTTPS/TLS listener + certificado ACM |
| **ALB → alvo** | HTTPS no target group (para *end-to-end*) |
| Aplicação → **RDS** | Parâmetro `rds.force_ssl` / `require_secure_transport` + CA bundle da AWS |
| Aplicação → **S3** | HTTPS + policy com `aws:SecureTransport: false` → **Deny** |
| **Entre AZs** | Criptografado **pela AWS** |
| **VPN / Direct Connect** | VPN é cifrada por IPsec; **DX não é** → use **MACsec** ou **VPN sobre DX** |

## Links

- [[9 - Fundamentos e apoio/Criptografia em repouso e em transito/1 - O que e|1 - O que e]] · [[9 - Fundamentos e apoio/Criptografia em repouso e em transito/3 - Detalhes|3 - Detalhes]] · [[9 - Fundamentos e apoio/Criptografia em repouso e em transito/4 - Questoes|4 - Questoes]]
