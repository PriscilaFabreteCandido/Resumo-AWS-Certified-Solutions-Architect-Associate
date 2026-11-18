---
tags: [saa-c03, datasync, transferencia, hibrido]
servico: AWS DataSync
tipo: Transferência de dados
dominios: [3, 4]
atualizado: 2026-11-08
---

# AWS DataSync — O que é

> [!info] Em uma frase
> *"a secure, reliable, high-speed file transfer service that helps you quickly and easily transfer your file or object data to, from, and between AWS storage services."* (um serviço de transferência de arquivos seguro, confiável e de alta velocidade, que ajuda a mover dados de arquivo ou objeto para, a partir de, e entre os serviços de armazenamento da AWS)

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

> *"automatic encryption and data integrity validation"* (criptografia automática e validação de integridade dos dados)

E a arquitetura: *"purpose-built network protocol and a parallel, multi-threaded architecture"* (protocolo de rede feito sob medida e arquitetura paralela, multithread) — é otimizado para transferência, não um `rsync` genérico.

Suporta **VPC endpoints**, para transferir sem passar pela internet.

## Links

- [[3 - Performance (24%)/DataSync/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/DataSync/3 - Detalhes|3 - Detalhes]] · [[3 - Performance (24%)/DataSync/4 - Questoes|4 - Questoes]]
- [[3 - Performance (24%)/Storage Gateway/1 - O que e|Storage Gateway]] · [[3 - Performance (24%)/Transfer Family/1 - O que e|Transfer Family]] · [[4 - Custo (20%)/Snow Family/1 - O que e|Snow Family]] · [[3 - Performance (24%)/S3/1 - O que e|S3]] · [[3 - Performance (24%)/EFS/1 - O que e|EFS]] · [[3 - Performance (24%)/FSx/1 - O que e|FSx]]
- [O que é o DataSync](https://docs.aws.amazon.com/datasync/latest/userguide/what-is-datasync.html)
