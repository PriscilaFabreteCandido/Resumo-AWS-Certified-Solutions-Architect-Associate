---
tags: [saa-c03, ebs, decorar]
servico: Amazon EBS
atualizado: 2026-11-08
---

# EBS — Decorar

## A tabela oficial

| Spec | **gp3** | **gp2** | **io1** | **io2 Block Express** | **st1** | **sc1** |
|---|---|---|---|---|---|---|
| Tipo | SSD | SSD | SSD | SSD | **HDD** | **HDD** |
| **IOPS máx/volume** | **80.000** | **16.000** | **64.000** | **256.000** | **500** | **250** |
| **Throughput máx/volume** | **2.000 MiB/s** | **250 MiB/s** | **1.000 MiB/s** | **4.000 MiB/s** | **500 MiB/s** | **250 MiB/s** |
| **Tamanho** | 1 GiB – **64 TiB** | 1 GiB – 16 TiB | 4 GiB – 16 TiB | 4 GiB – **64 TiB** | 125 GiB – 16 TiB | 125 GiB – 16 TiB |
| **Durabilidade** | 99,8–99,9% | 99,8–99,9% | 99,8–99,9% | **99,999%** | 99,8–99,9% | 99,8–99,9% |
| **Multi-Attach** | ❌ | ❌ | **✅** | **✅** | ❌ | ❌ |
| **Boot volume** | ✅ | ✅ | ✅ | ✅ | **❌** | **❌** |

## Números soltos

| Item | Valor |
|---|---|
| **io2 Block Express: latência** | *"under 500 microseconds for 16KiB I/O operations"* |
| **Instância não-Nitro** | chega a **32.000 IOPS**, mesmo com volume provisionado acima |
| gp2: throughput | *"between 128 MiB/s and 250 MiB/s, depending on the volume size"* |
| io1 para 1.000 MiB/s | precisa de **64.000 IOPS** e instância **Nitro** |
| Magnético (legado) | 1 GiB – 1 TiB, 40–200 IOPS, ~**100 IOPS** em média |
| NVMe reservations | **io1 e io2 Block Express** (não gp2/gp3) |

## Quando usar cada um

| Requisito | Tipo |
|---|---|
| Qualquer coisa, por padrão | **gp3** |
| Mais de **80.000 IOPS** ou **2.000 MiB/s** | **io2 Block Express** |
| Durabilidade de **99,999%** | **io2 Block Express** |
| **Multi-Attach** (cluster que compartilha disco) | **io1** ou **io2** |
| Throughput **sequencial** barato (big data, log) | **st1** |
| Dado **frio**, acesso raro, menor custo por GB | **sc1** |
| Scratch temporário com IOPS máximo | **instance store** (não EBS) |

## Snapshot

| Fato | Detalhe |
|---|---|
| Natureza | **Incremental**, armazenado no S3 (gerenciado pela AWS) |
| Escopo | **Regional** (copiável para outra região) |
| Restore | Volume disponível rápido, mas blocos vêm **sob demanda** (**lazy load**) |
| AMI | É snapshot + metadado |
| Automação | **Data Lifecycle Manager** (EBS e AMI) ou **AWS Backup** |
| Criptografia | KMS; snapshot de volume criptografado é criptografado |

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[02 - Numeros para decorar]]
