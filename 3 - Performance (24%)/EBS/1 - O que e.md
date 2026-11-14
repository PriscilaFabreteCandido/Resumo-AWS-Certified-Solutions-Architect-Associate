---
tags: [saa-c03, ebs, storage, bloco]
servico: Amazon EBS
tipo: Armazenamento de bloco
dominios: [3, 4]
atualizado: 2026-11-08
---

# Amazon EBS — O que é

> [!info] Em uma frase
> Volume de **bloco** de rede, anexado a uma instância EC2: persistente, com snapshot, criptografia e redimensionamento. Um volume vive em **uma AZ**.

## Bloco × arquivo × objeto

| Tipo | Serviço | Natureza |
|---|---|---|
| **Bloco** | **EBS** | Disco bruto para **um** host (boot, banco) |
| **Arquivo** | **EFS**, **FSx** | Vários clientes montam o mesmo FS (POSIX, SMB) |
| **Objeto** | **S3** | API HTTP, imutável, ilimitado |

## Os seis tipos

| Tipo | Natureza | Use para |
|---|---|---|
| **gp3** | SSD | **Padrão.** IOPS e throughput **independentes do tamanho** |
| **gp2** | SSD | Geração anterior (IOPS proporcional ao tamanho) |
| **io1** | SSD | Provisioned IOPS, **Multi-Attach** |
| **io2 Block Express** | SSD | IOPS extremo e durabilidade de **99,999%** |
| **st1** | HDD | Throughput sequencial (big data, log) |
| **sc1** | HDD | Frio, acesso raro, mais barato |

⚠️ **st1 e sc1 não servem como boot volume.**

## Os três fatos que mais caem

1. **Volume é zonal; snapshot é regional.** O volume vive numa AZ; o snapshot pode ser copiado para outra região.
2. **Multi-Attach só em io1/io2** — e não é file system compartilhado.
3. **Instâncias não-Nitro** chegam a **32.000 IOPS**, por mais que você provisione.

## Links

- [[3 - Performance (24%)/EBS/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/EBS/3 - Detalhes|3 - Detalhes]] · [[3 - Performance (24%)/EBS/4 - Questoes|4 - Questoes]]
- [[3 - Performance (24%)/EC2/1 - O que e|EC2]] · [[3 - Performance (24%)/S3/1 - O que e|S3]] · [[3 - Performance (24%)/EFS/1 - O que e|EFS]] · [[1 - Seguranca (30%)/AWS Backup/1 - O que e|AWS Backup]] · [[9 - Fundamentos e apoio/Tipos de armazenamento (objeto, arquivo, bloco)/1 - O que e|Tipos de armazenamento (objeto, arquivo, bloco)]]
- [Tipos de volume EBS](https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volume-types.html)
