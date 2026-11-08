---
tags: [saa-c03, s3, decorar]
servico: Amazon S3
atualizado: 2026-11-08
---

# Amazon S3 — Decorar

> [!important] Esta nota é só número e tabela. Releia na véspera.

## As classes (a tabela mais importante do S3)

| Classe | Disponibilidade | AZs | Mín. dias | Mín. cobrado | Latência |
|---|---|---|---|---|---|
| **Standard** | 99,99% | ≥3 | — | — | ms |
| **Intelligent-Tiering** | 99,9% | ≥3 | — | — | ms |
| **Standard-IA** | 99,9% | ≥3 | **30** | **128 KB** | ms |
| **One Zone-IA** | **99,5%** | **1** | **30** | **128 KB** | ms |
| **Express One Zone** | 99,95% | **1** | — | — | **ms de 1 dígito** |
| **Glacier Instant Retrieval** | 99,9% | ≥3 | **90** | **128 KB** | **ms** |
| **Glacier Flexible Retrieval** | 99,99% (após restore) | ≥3 | **90** | — | min a horas |
| **Glacier Deep Archive** | 99,99% (após restore) | ≥3 | **180** | — | horas |

**Durabilidade: 11 noves em TODAS** (exceto Reduced Redundancy, legado, 99,99%).
**Só One Zone-IA e Express One Zone têm 1 AZ.**

## Restore do Glacier

| Classe | Expedited | Standard | Bulk |
|---|---|---|---|
| **Glacier Flexible Retrieval** | **1-5 min** | **3-5 h** | **5-12 h** (grátis) |
| **Glacier Deep Archive** | **não existe** | **até 12 h** | **até 48 h** |

**Glacier Instant Retrieval não precisa de restore** — é `GET` direto.

## Intelligent-Tiering — as transições

```
Frequent Access (entrada)
   ↓ 30 dias sem acesso
Infrequent Access
   ↓ 90 dias sem acesso
Archive Instant Access
   ↓ (opcional, precisa ativar) mín. 90 dias
Archive Access
   ↓ (opcional) mín. 180 dias
Deep Archive Access
```

Cobra **monitoramento por objeto**, **sem** taxa de retrieval. Objeto **< 128 KB nunca sai** do Frequent Access.

## Lifecycle — a cascata

```
Standard ──> IA ──> Intelligent-Tiering / One Zone-IA
                ──> Glacier IR ──> Glacier FR ──> Deep Archive
Glacier FR ──> SÓ Deep Archive
Deep Archive ──> SAÍDA NENHUMA
```

Regra: **não pode transicionar antes do mínimo da classe atual**. Glacier IR no dia 4 → Deep Archive só no dia **94**.

## Performance

| Item | Valor |
|---|---|
| Requisições **por prefixo** | **3.500** PUT/COPY/POST/DELETE · **5.500** GET/HEAD por segundo |
| Prefixos por bucket | **ilimitados** (10 prefixos = 55.000 leituras/s) |
| Objeto máximo | **48,8 TiB** |
| Multipart: usar a partir de | **100 MB** |
| Multipart: tamanho da parte | **5 MiB a 5 GiB** |
| Multipart: máximo de partes | **10.000** |
| Latência típica | **100-200 ms** |
| Erro de excesso de requisição | **503 Slow Down** |

## Criptografia

| Sigla | Quem gerencia a chave |
|---|---|
| **SSE-S3** | S3 — **é o padrão** desde 05/01/2023 |
| **SSE-KMS** | KMS (auditável, controlável, cross-account) |
| **DSSE-KMS** | KMS, **dupla camada** |
| **SSE-C** | **Você** manda a chave em cada requisição. Não pode ser padrão do bucket |
| **Client-side** | Você criptografa antes de enviar |

**S3 Bucket Keys** reduzem o custo do SSE-KMS (menos chamadas à KMS).

## Proteção de dados

| Recurso | Número / regra |
|---|---|
| Versionamento | 3 estados: Unversioned → **Enabled** (nunca volta) → Suspended |
| Object Lock | **Exige versionamento**. **Compliance** = nem o root apaga. **Governance** = só com `s3:BypassGovernanceRetention` |
| Legal hold | **Não expira**. Removido manualmente |
| Block Public Access | **4 flags**: `BlockPublicAcls`, `IgnorePublicAcls`, `BlockPublicPolicy`, `RestrictPublicBuckets`. **Vence a bucket policy** |
| Replicação | **Assíncrona**. Versionamento **nos dois** buckets. **Não** replica o acervo antigo (use **Batch Replication**) |
| S3 RTC | *"99.9 percent of those objects within 15 minutes"* |
| Overhead de arquivo (Glacier FR/Deep Archive) | **40 KB** por objeto: 32 KB na taxa do Glacier + 8 KB na do Standard |

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[02 - Numeros para decorar]]
