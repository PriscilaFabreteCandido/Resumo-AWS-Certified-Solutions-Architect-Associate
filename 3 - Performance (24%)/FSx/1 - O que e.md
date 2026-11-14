---
tags: [saa-c03, fsx, storage, arquivo]
servico: Amazon FSx
tipo: Sistemas de arquivos gerenciados
dominios: [3, 4]
atualizado: 2026-11-08
---

# Amazon FSx — O que é

> [!info] Em uma frase
> Quatro sistemas de arquivos gerenciados, cada um para um ecossistema específico: **Windows/SMB**, **Lustre/HPC**, **NetApp ONTAP** (multiprotocolo) e **OpenZFS**.

## Os quatro — e o protocolo de cada um

| Serviço | Protocolo | Para quê (texto oficial) |
|---|---|---|
| **FSx for Windows File Server** | **SMB** (2.0 a 3.1.1) | *"business applications, home directories, web serving, content management, data analytics, software build setups, and media processing workloads"*. Integra com **Active Directory** |
| **FSx for Lustre** | **Lustre**, POSIX | *"workloads where speed matters, such as machine learning, high performance computing (HPC), video processing, and financial modeling"*. Latência sub-ms |
| **FSx for NetApp ONTAP** | **NFS, SMB, iSCSI, NVMe** | Multiprotocolo. *"migrate, back up, or burst your file-based applications from on-premises to AWS"* |
| **FSx for OpenZFS** | **NFS** v3, v4.0, 4.1, 4.2 | *"easy to move data to AWS from on-premises ZFS or other Linux-based file servers"* |

## A árvore de decisão

```
Precisa de arquivo compartilhado?
├── Linux / NFS simples e elástico        → EFS
├── Windows / SMB + Active Directory      → FSx for WINDOWS FILE SERVER
├── HPC / ML, throughput extremo, + S3    → FSx for LUSTRE
├── NFS + SMB + iSCSI no mesmo FS         → FSx for NETAPP ONTAP
└── Migrar servidor ZFS/Linux             → FSx for OPENZFS
```

## O detalhe que mais cai: Lustre scratch × persistent

| Deployment | Citação oficial |
|---|---|
| **Scratch** | *"ideal for temporary storage and shorter-term processing of data. Data is not replicated and does not persist if a file server fails."* |
| **Persistent** | *"ideal for longer-term storage and throughput-focused workloads. In persistent file systems, data is replicated, and file servers are replaced if they fail."* |

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[EFS]] · [[EBS]] · [[S3]] · [[Directory Service]] · [[Storage Gateway]]
