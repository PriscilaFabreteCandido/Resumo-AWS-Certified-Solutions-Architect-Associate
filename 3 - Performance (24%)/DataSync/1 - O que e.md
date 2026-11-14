---
tags: [saa-c03, datasync, transferencia, hibrido]
servico: AWS DataSync
tipo: Transferência de dados
dominios: [3, 4]
atualizado: 2026-11-08
---

# AWS DataSync — O que é

> [!info] Em uma frase
> *"a secure, reliable, high-speed file transfer service that helps you quickly and easily transfer your file or object data to, from, and between AWS storage services."*

## O verbo: **mover**

A distinção que decide a questão:

| Verbo | Serviço |
|---|---|
| **Mover** dados (uma vez ou agendado) | **DataSync** |
| **Continuar acessando** com protocolo local | **Storage Gateway** |
| **Terceiro envia** arquivos (SFTP/FTPS/FTP/AS2) | **Transfer Family** |
| Mover **sem banda**, por dispositivo físico | **Snow Family** |

## Origens e destinos

| Lado | O que suporta |
|---|---|
| **On-premises** | **NFS, SMB, HDFS**, object storage |
| **AWS** | **S3, EFS, FSx for Windows File Server, FSx for Lustre, FSx for OpenZFS, FSx for NetApp ONTAP** |
| **Outras nuvens** | Google Cloud Storage, Azure Blob, Azure Files, Wasabi e outras |

## O que ele faz por você

> *"automatic encryption and data integrity validation"*

E a arquitetura: *"purpose-built network protocol and a parallel, multi-threaded architecture"* — é otimizado para transferência, não um `rsync` genérico.

Suporta **VPC endpoints**, para transferir sem passar pela internet.

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[Storage Gateway]] · [[Transfer Family]] · [[Snow Family]] · [[S3]] · [[EFS]] · [[FSx]]
- [O que é o DataSync](https://docs.aws.amazon.com/datasync/latest/userguide/what-is-datasync.html)
