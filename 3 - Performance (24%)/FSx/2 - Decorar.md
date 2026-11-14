---
tags: [saa-c03, fsx, decorar]
servico: Amazon FSx
atualizado: 2026-11-08
---

# FSx — Decorar

## A tabela dos quatro

| | **Windows File Server** | **Lustre** | **NetApp ONTAP** | **OpenZFS** |
|---|---|---|---|---|
| **Protocolo** | **SMB** 2.0–3.1.1 | **Lustre** / POSIX | **NFS, SMB, iSCSI, NVMe** | **NFS** v3–v4.2 |
| **Active Directory** | **Obrigatório** | — | Sim (para SMB) | — |
| **Deployment** | Single-AZ e **Multi-AZ** | **Scratch** e **Persistent** | Single-AZ e **Multi-AZ** | Multi-AZ (HA), Single-AZ (HA), Single-AZ (non-HA) |
| **Storage** | SSD e HDD | SSD, Intelligent-Tiering, HDD | — | — |
| **Integração com S3** | — | **Sim** (bucket vinculado) | Tiering | — |
| **Backup automático diário** | **Ligado por padrão** | — | Snapshots | Snapshots |
| **Failover** | — | — | — | **~60 s** (HA) / **~30 min** (non-HA) |

## Lustre — o que decora

| Item | Detalhe |
|---|---|
| **Scratch** | *"Data is not replicated and does not persist if a file server fails"* |
| **Persistent** | *"data is replicated, and file servers are replaced if they fail"* |
| **S3 vinculado** | *"transparently presents S3 objects as files"* |
| Importação | Importa a listagem dos arquivos na criação; pode importar os novos depois |
| Escrita de volta | *"makes it possible for you to write file system data back to S3"* |
| Classes de storage | SSD, Intelligent-Tiering, HDD |

## ONTAP e OpenZFS — o que decora

| Serviço | Features citadas |
|---|---|
| **FSx for NetApp ONTAP** | Snapshots, **cloning**, replicação (**SnapMirror**), **tiering**, **SnapLock WORM**. Multi-AZ e Single-AZ |
| **FSx for OpenZFS** | Três deployments: **Multi-AZ (HA)** e **Single-AZ (HA)** com failover *"typically completes within 60 seconds"*; **Single-AZ (non-HA)** com recuperação *"typically completes within 30 minutes"* |

## EFS × FSx — quando cada um

| Requisito | Resposta |
|---|---|
| NFS Linux, elástico, sem dimensionar | **EFS** |
| **SMB** + Active Directory | **FSx for Windows** |
| **HPC/ML**, centenas de GB/s, ligado ao S3 | **FSx for Lustre** |
| **NFS + SMB** no mesmo file system | **FSx for ONTAP** |
| Migrar **ZFS** on-premises | **FSx for OpenZFS** |

## Links

- [[3 - Performance (24%)/FSx/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/FSx/3 - Detalhes|3 - Detalhes]] · [[3 - Performance (24%)/FSx/4 - Questoes|4 - Questoes]]
