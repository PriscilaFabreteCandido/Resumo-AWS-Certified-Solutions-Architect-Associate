---
tags: [saa-c03, fsx, questoes]
servico: Amazon FSx
atualizado: 2026-11-08
---

# FSx — Questões

> [!question]- Q1. Renderização precisa de throughput de centenas de GB/s lendo um dataset que está num bucket S3, de centenas de instâncias Linux.
> **A)** EFS com throughput Elastic
> **B)** **FSx for Lustre, com o bucket S3 vinculado ao file system** ✅
> **C)** EBS io2 Block Express com Multi-Attach
> **D)** S3 montado com cliente FUSE
>
> **Por que B**: Lustre é o FS de HPC/ML da AWS, com latência sub-ms, e *"transparently presents S3 objects as files"*.
> **A errada**: EFS escala bem, mas Lustre é o posicionado para *"machine learning, high performance computing (HPC), video processing"*.
> **C errada**: Multi-Attach é limitado a poucas instâncias **na mesma AZ** e não é FS compartilhado POSIX.

> [!question]- Q2. Um compartilhamento de arquivos para usuários Windows, autenticado no AD corporativo.
> **A)** EFS com access points
> **B)** **FSx for Windows File Server, integrado ao AWS Managed Microsoft AD (com trust para o AD on-premises)** ✅
> **C)** FSx for OpenZFS
> **D)** S3 File Gateway
>
> **Por que B**: SMB + Active Directory é exatamente o caso de uso.
> **A errada**: EFS é NFS.
> **C errada**: OpenZFS fala NFS.
> **D errada**: File Gateway expõe NFS/SMB **sobre S3** — serve para manter acesso de arquivo on-premises com dado no S3, não como file server corporativo gerenciado.

> [!question]- Q3. Um job de processamento usa um FSx for Lustre **scratch** e o time quer guardar o resultado por 2 anos.
> **A)** Manter o scratch e habilitar backup
> **B)** **Escrever o resultado de volta no S3 (ou usar Persistent), porque o scratch não replica nem persiste em falha** ✅
> **C)** Migrar para HDD
> **D)** Criar um segundo scratch
>
> **Por que B**: *"Data is not replicated and does not persist if a file server fails."* O padrão é processar em scratch e persistir no **S3**.

> [!question]- Q4. Clientes Linux (NFS) e Windows (SMB) precisam acessar os **mesmos** arquivos, com snapshots e clones.
> **A)** EFS + FSx for Windows em paralelo
> **B)** **FSx for NetApp ONTAP** ✅
> **C)** FSx for Lustre
> **D)** S3 com access points
>
> **Por que B**: é o multiprotocolo — **NFS, SMB, iSCSI e NVMe** no mesmo FS, com snapshots, cloning, SnapMirror e SnapLock.
> **A errada**: dois file systems separados significam dois conjuntos de dados.

> [!question]- Q5. Migrar um servidor de arquivos **ZFS** on-premises para a AWS, mantendo compatibilidade.
> **A)** EFS
> **B)** FSx for Windows
> **C)** **FSx for OpenZFS** ✅
> **D)** FSx for Lustre
>
> **Por que C**: *"easy to move data to AWS from on-premises ZFS or other Linux-based file servers"*.

> [!question]- Q6. Qual FSx tem failover documentado em ~60 segundos?
> **A)** Lustre Persistent
> **B)** **OpenZFS Multi-AZ (HA) e Single-AZ (HA)** ✅
> **C)** Windows Single-AZ
> **D)** ONTAP Single-AZ
>
> **Por que B**: *"Failover typically completes within 60 seconds"*; já o **Single-AZ (non-HA)** recupera em *"within 30 minutes"*.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| FSx for Windows atende Linux | É **SMB**. Linux → EFS, OpenZFS ou ONTAP |
| FSx for Lustre é sempre durável | **Scratch não replica** e não persiste em falha |
| FSx for Windows funciona sem AD | **Exige** Active Directory |
| Lustre serve para file share corporativo | É para **HPC/ML**; file share é Windows File Server ou ONTAP |
| EFS e FSx são intercambiáveis | FSx entra quando há **requisito de ecossistema** (SMB, Lustre, ONTAP, ZFS) |
| ONTAP só fala NFS | **NFS, SMB, iSCSI e NVMe** |
| AWS Backup não cobre FSx | Cobre **os quatro** |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
