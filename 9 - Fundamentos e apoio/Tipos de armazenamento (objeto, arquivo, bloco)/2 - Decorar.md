---
tags: [saa-c03, storage, decorar]
conceito: Tipos de armazenamento (objeto, arquivo, bloco)
atualizado: 2026-11-08
---

# Tipos de armazenamento — Decorar

## Palavra no enunciado → tipo

| Enunciado | Resposta |
|---|---|
| *"boot volume"*, *"root device"* | **EBS** |
| *"banco de dados em EC2"*, *"low-latency block"* | **EBS** (io2 se IOPS extremo) |
| *"cache temporário"*, *"scratch"*, *"maior IOPS possível"*, aceita perder | **Instance store** |
| *"shared file system"*, *"multiple instances"*, *"NFS"*, *"POSIX"* | **EFS** |
| *"Windows"*, *"SMB"*, *"Active Directory"*, *"file share"* | **FSx for Windows File Server** |
| *"HPC"*, *"machine learning"*, *"sub-millisecond"*, *"vinculado ao S3"* | **FSx for Lustre** |
| *"ONTAP"*, *"SnapMirror"*, *"NFS e SMB juntos"*, *"dedup"* | **FSx for NetApp ONTAP** |
| *"ZFS"*, *"snapshots"*, *"migrar NAS Linux"* | **FSx for OpenZFS** |
| *"objetos"*, *"durabilidade de 11 noves"*, *"data lake"*, *"site estático"* | **S3** |
| *"arquivar"*, *"compliance por anos"*, *"raramente acessado"* | **S3 Glacier** (classe conforme o tempo de recuperação) |
| *"on-premises precisa continuar usando NFS/SMB/iSCSI, mas guardar na AWS"* | **Storage Gateway** |

## Escopo e compartilhamento

| Serviço | Escopo | Quantas instâncias anexam |
|---|---|---|
| **Instance store** | A instância | 1 (some ao parar) |
| **EBS** | **Uma AZ** | 1 (io1/io2 **Multi-Attach**: até **16**, mesma AZ) |
| **EFS** | **Regional** | Milhares |
| **FSx** | Depende do tipo | Muitas |
| **S3** | **Regional** | Não se anexa — API |

## Durabilidade e disponibilidade do S3

| Classe | Durabilidade | Disponibilidade | AZs |
|---|---|---|---|
| S3 Standard | **99,999999999%** (11 noves) | **99,99%** | ≥3 |
| S3 Standard-IA | 11 noves | **99,9%** | ≥3 |
| **S3 One Zone-IA** | 11 noves | **99,5%** | **1** |
| S3 Intelligent-Tiering | 11 noves | 99,9% | ≥3 |
| Glacier Instant Retrieval | 11 noves | 99,9% | ≥3 |
| Glacier Flexible / Deep Archive | 11 noves | 99,99% | ≥3 |

## Números para a véspera

| Item | Valor |
|---|---|
| Tamanho máximo de objeto no S3 | **48,8 TiB** (ver aviso abaixo) |
| PUT simples (sem multipart) | até **5 GB** |
| Upload pela **console** | até **160 GB** |
| Multipart recomendado a partir de | **100 MB**; **obrigatório** acima de 5 GB |
| Multipart: partes | **5 MiB a 5 GiB**, até **10.000** partes |
| Tamanho máximo de volume EBS (gp3/gp2) | **16 TiB** |
| gp3: baseline | **3.000 IOPS / 125 MiB/s**, até **16.000 IOPS / 1.000 MiB/s** |
| io2 Block Express | até **256.000 IOPS**, **4.000 MiB/s**, **64 TiB** |
| EBS Multi-Attach | até **16** instâncias, mesma AZ |
| EFS | **petabyte-scale**, elástico, sem provisionar |


> [!warning] O limite de tamanho de objeto mudou — e a doc nao esta uniforme
> Material de estudo antigo (e muitos simulados) dizem **5 TB**. As paginas oficiais hoje dizem:
> - **qfacts**: tabela com *"Maximum object size | 48.8 TiB"* (tamanho máximo de objeto: 48,8 TiB)
> - **upload-objects**: *"you can upload a single large object, up to 50 TB in size"* (você pode enviar um único objeto grande, de até 50 TB)
>
> Ou seja: **5 TB esta desatualizado**. Se a prova oferecer 5 TB como alternativa, provavelmente e o gabarito dela (a prova acompanha a doc com atraso) — mas saiba que **o numero atual e maior**. O que nao muda: **PUT simples ate 5 GB**, acima disso **multipart**.

## Links

- [[9 - Fundamentos e apoio/Tipos de armazenamento (objeto, arquivo, bloco)/1 - O que e|1 - O que e]] · [[9 - Fundamentos e apoio/Tipos de armazenamento (objeto, arquivo, bloco)/3 - Detalhes|3 - Detalhes]] · [[9 - Fundamentos e apoio/Tipos de armazenamento (objeto, arquivo, bloco)/4 - Questoes|4 - Questoes]]
