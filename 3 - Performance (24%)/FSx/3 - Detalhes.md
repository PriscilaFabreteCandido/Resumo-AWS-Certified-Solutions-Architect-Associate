---
tags: [saa-c03, fsx, detalhes]
servico: Amazon FSx
atualizado: 2026-11-08
---

# FSx — Detalhes

## 1. FSx for Windows File Server

Fala **SMB** (*"supporting versions 2.0 to 3.1.1"*) e precisa de **Active Directory** — AWS Managed Microsoft AD, ou o AD on-premises via trust. É a ligação que a prova faz: a questão parece ser sobre FSx, mas a resposta completa inclui **Directory Service**.

| Item | Detalhe |
|---|---|
| Deployment | **Single-AZ** e **Multi-AZ** |
| Storage | **SSD** e **HDD** |
| Backup | **Automático diário, ligado por padrão** |
| Criptografia | KMS em repouso |
| Extras | Shadow copies, DFS Namespaces, quotas de usuário |

Casos citados: *"business applications, home directories, web serving, content management, data analytics, software build setups, and media processing workloads"* (aplicações corporativas, diretórios de usuário, servidores web, gestão de conteúdo, análise de dados, ambientes de build e processamento de mídia).

## 2. FSx for Lustre — e a integração com S3

Lustre é o file system paralelo de HPC. A doc posiciona para *"workloads where speed matters, such as machine learning, high performance computing (HPC), video processing, and financial modeling"*, com latência sub-milissegundo.

**A integração com S3 é o diferencial de prova:**

> *"When linked to an Amazon S3 bucket, an FSx for Lustre file system transparently presents S3 objects as files."*

> *"Amazon FSx imports listings of all existing files in your S3 bucket at file system creation. Amazon FSx can also import listings of files added to the data repository after the file system is created."*

> *"The file system also makes it possible for you to write file system data back to S3."*

O padrão: o dataset vive no **S3** (barato, durável); quando o cluster precisa processá-lo com throughput de HPC, você cria um FSx for Lustre **vinculado ao bucket**, processa, escreve o resultado de volta no S3, e **apaga o file system**.

**Scratch × Persistent** é a decisão crítica:

| | **Scratch** | **Persistent** |
|---|---|---|
| Replicação | **Não** | **Sim** |
| Sobrevive a falha de servidor | **Não** | **Sim** (servidores são substituídos) |
| Use para | Processamento temporário, curto | Armazenamento de longo prazo, throughput sustentado |

⚠️ Se o enunciado diz *"durável"*, *"não pode perder dados"* ou *"longo prazo"*, **scratch está errado**.

## 3. FSx for NetApp ONTAP

O **multiprotocolo**: **NFS, SMB, iSCSI e NVMe** no mesmo file system. É a resposta quando clientes Linux **e** Windows precisam dos mesmos dados.

Features do ecossistema NetApp que a doc cita: **snapshots**, **cloning** (cópia instantânea para dev/teste), **SnapMirror** (replicação), **tiering** (dado frio para storage mais barato) e **SnapLock WORM** (imutabilidade).

Posicionamento oficial: *"migrate, back up, or burst your file-based applications from on-premises to AWS"* (migrar, fazer backup ou expandir suas aplicações baseadas em arquivo do on-premises para a AWS). Deployment **Multi-AZ** e **Single-AZ**.

Gatilho de prova: o enunciado menciona **NetApp**, **ONTAP**, **SnapMirror**, ou exige **NFS e SMB juntos**.

## 4. FSx for OpenZFS

Fala **NFS** (v3, v4.0, 4.1, 4.2) e é posicionado para *"easy to move data to AWS from on-premises ZFS or other Linux-based file servers"* (facilita mover dados para a AWS a partir de servidores de arquivos ZFS ou outros baseados em Linux, on-premises).

Três deployments, com tempos documentados:

| Deployment | Failover/recuperação |
|---|---|
| **Multi-AZ (HA)** | *"Failover typically completes within 60 seconds"* (o failover normalmente se completa em até 60 segundos) |
| **Single-AZ (HA)** | *"Failover typically completes within 60 seconds"* (o failover normalmente se completa em até 60 segundos) |
| **Single-AZ (non-HA)** | *"Recovery typically completes within 30 minutes"* |

## 5. FSx × EFS — a decisão

O EFS é o NFS **elástico e simples**: não dimensiona, não precisa de AD, cresce sozinho. É o padrão para Linux.

O FSx entra quando há um **requisito de ecossistema**:

| Requisito | Serviço |
|---|---|
| SMB + AD (Windows) | **FSx for Windows** |
| Throughput de HPC + dataset no S3 | **FSx for Lustre** |
| NFS **e** SMB no mesmo FS, snapshots/clones NetApp | **FSx for ONTAP** |
| Compatibilidade ZFS | **FSx for OpenZFS** |
| Nada disso — só NFS compartilhado e elástico | **EFS** |

## 6. Backup e DR

- **FSx for Windows** e os outros têm **backup automático diário** (ligado por padrão no Windows File Server).
- **AWS Backup** suporta **todos os quatro** (Lustre, Windows File Server, NetApp ONTAP, OpenZFS) — é a resposta para política centralizada com retenção e **Vault Lock**.
- **ONTAP** tem **SnapMirror** para replicação nativa.

## Links

- [[3 - Performance (24%)/FSx/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/FSx/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/FSx/4 - Questoes|4 - Questoes]]
- [[3 - Performance (24%)/EFS/1 - O que e|EFS]] · [[3 - Performance (24%)/S3/1 - O que e|S3]] · [[1 - Seguranca (30%)/Directory Service/1 - O que e|Directory Service]] · [[1 - Seguranca (30%)/AWS Backup/1 - O que e|AWS Backup]] · [[3 - Performance (24%)/EMR/1 - O que e|EMR]] · [[3 - Performance (24%)/Storage Gateway/1 - O que e|Storage Gateway]]
