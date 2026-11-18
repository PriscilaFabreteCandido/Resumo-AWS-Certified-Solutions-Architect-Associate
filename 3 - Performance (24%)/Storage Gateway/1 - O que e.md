---
tags: [saa-c03, storage-gateway, hibrido]
servico: AWS Storage Gateway
tipo: Storage híbrido
dominios: [3, 4]
atualizado: 2026-11-08
---

# AWS Storage Gateway — O que é

> [!info] Em uma frase
> Mantém o **acesso on-premises** aos dados (por NFS, SMB, iSCSI ou fita virtual) enquanto o dado vive na **AWS**, com **cache local** para o que é acessado com frequência.

## Os quatro tipos (texto oficial)

> *"AWS Storage Gateway offers file-based (S3 File Gateway and FSx File Gateway), volume-based (Volume Gateway), and tape-based (Tape Gateway) storage solutions."*

| Gateway | Protocolo | Dado vai para |
|---|---|---|
| **S3 File Gateway** | **NFS** v3/v4.1 e **SMB** 2/3 | **S3** (como objeto) |
| **FSx File Gateway** | **SMB** | **FSx for Windows File Server** |
| **Volume Gateway** | **iSCSI** | **S3** (+ snapshots EBS) |
| **Tape Gateway** | **VTL** (biblioteca de fitas virtual) | S3 / Glacier |

## O gatilho de prova

A palavra-chave é **"continuar acessando"**:

| Enunciado | Serviço |
|---|---|
| "**mover** dados para a AWS, uma vez ou agendado" | **DataSync** |
| "on-premises precisa **continuar** vendo arquivo/bloco/fita" | **Storage Gateway** |
| "**parceiro envia** arquivos por SFTP/FTPS/FTP/AS2" | **Transfer Family** |
| "sem banda, dezenas de TB, dispositivo físico" | **Snow Family** |

## Volume Gateway: cached × stored

| Modo | Citação oficial |
|---|---|
| **Cached** | *"You store your data in Amazon S3 and retain a copy of frequently accessed data subsets locally."* (você armazena seus dados no Amazon S3 e mantém localmente uma cópia dos subconjuntos acessados com frequência) |
| **Stored** | *"configure your on-premises gateway to store all your data locally. Then asynchronously back up point-in-time snapshots of this data to Amazon S3."* (configure seu gateway on-premises para guardar todos os dados localmente e, de forma assíncrona, fazer backup de snapshots pontuais desses dados no Amazon S3) |

**Cached** = dado principal na AWS, cache local. **Stored** = dado principal local, backup na AWS.

## Links

- [[3 - Performance (24%)/Storage Gateway/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/Storage Gateway/3 - Detalhes|3 - Detalhes]] · [[3 - Performance (24%)/Storage Gateway/4 - Questoes|4 - Questoes]]
- [[3 - Performance (24%)/S3/1 - O que e|S3]] · [[3 - Performance (24%)/FSx/1 - O que e|FSx]] · [[3 - Performance (24%)/DataSync/1 - O que e|DataSync]] · [[3 - Performance (24%)/Transfer Family/1 - O que e|Transfer Family]] · [[4 - Custo (20%)/Snow Family/1 - O que e|Snow Family]]
- [Volume Gateway](https://docs.aws.amazon.com/storagegateway/latest/vgw/WhatIsStorageGateway.html)
