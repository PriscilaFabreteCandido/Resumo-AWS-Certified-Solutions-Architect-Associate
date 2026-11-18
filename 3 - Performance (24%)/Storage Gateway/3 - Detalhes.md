---
tags: [saa-c03, storage-gateway, detalhes]
servico: AWS Storage Gateway
atualizado: 2026-11-08
---

# Storage Gateway — Detalhes

## 1. O problema que resolve

Uma aplicação on-premises espera um **caminho de arquivo** (`\\servidor\share`) ou um **disco iSCSI**. Você quer que o dado viva na AWS — por custo, durabilidade ou para processá-lo com serviços AWS — mas **não pode reescrever a aplicação**.

O Storage Gateway é o tradutor: expõe o protocolo que a aplicação espera, e por trás grava na AWS, mantendo **cache local** do que é acessado com frequência.

É a diferença essencial com o **DataSync**: o DataSync **move** (e acaba), o Storage Gateway é um **caminho permanente**.

## 2. S3 File Gateway — o mais cobrado

Expõe **NFS** (v3, v4, v4.1) e **SMB** (2 e 3), e grava cada arquivo como **objeto no S3**. A doc: *"store and retrieve objects in Amazon S3 using industry-standard file protocols"* (armazenar e recuperar objetos no Amazon S3 usando protocolos de arquivo padrão de mercado), com *"low-latency access to data through transparent local caching"*.

O que o torna poderoso é o **resultado**: o dado fica como **objeto**, então você pode aplicar **lifecycle** (mover para Glacier), consultar com **Athena**, processar com **Glue/EMR**, replicar com **CRR** — tudo sem que a aplicação on-premises saiba.

Padrão de prova: *"aplicações on-premises precisam continuar gravando em SMB, mas o dado deve ficar no S3 para análise"* → **S3 File Gateway**.

Deployment: VM (**VMware ESXi, Hyper-V, KVM, Nutanix AHV**), **hardware appliance**, **VMware Cloud on AWS** ou **AMI no EC2**.

## 3. Volume Gateway — bloco via iSCSI

Expõe volumes **iSCSI**: *"cloud-backed storage volumes that you can mount as Internet Small Computer System Interface (iSCSI) devices from your on-premises application servers"*.

A escolha entre os dois modos é sobre **onde vive o dado principal**:

**Cached volumes** — *"You store your data in Amazon S3 and retain a copy of frequently accessed data subsets locally."* O storage local vira **cache**: você reduz drasticamente o hardware on-premises, ao custo de latência maior para dado frio.

**Stored volumes** — *"configure your on-premises gateway to store all your data locally. Then asynchronously back up point-in-time snapshots of this data to Amazon S3."* O dado **inteiro** fica local (latência total de disco local) e a AWS recebe **snapshots** — é backup offsite e DR, não redução de storage.

Os snapshots podem ser usados para criar **volumes EBS** — o que torna o Volume Gateway stored uma estratégia de **DR**: se o datacenter cai, você levanta na AWS a partir do snapshot.

## 4. Tape Gateway

Apresenta uma **biblioteca de fitas virtual (VTL)** ao software de backup existente (Veeam, NetBackup, Commvault, Backup Exec). Para o software, são fitas; por trás, é S3 e Glacier.

É a resposta **exata** para: *"eliminar as fitas físicas **sem trocar o software de backup**"*. Nenhum outro serviço faz isso — nem o File Gateway (que expõe NFS/SMB, não fitas) nem o AWS Backup (que protege recursos **da AWS**).

## 5. FSx File Gateway

Cache local para um **FSx for Windows File Server** na AWS, via **SMB**. Serve quando o file share corporativo já migrou para a AWS mas os usuários no escritório sofrem com latência.

## 6. Storage Gateway × as alternativas

| Objetivo | Serviço |
|---|---|
| **Mover** dados para a AWS (uma vez ou agendado) | **DataSync** |
| **Continuar acessando** com protocolo local | **Storage Gateway** |
| **Terceiro envia** por SFTP/FTPS/FTP/AS2 | **Transfer Family** |
| Dezenas de TB sem banda | **Snow Family** (⚠️ suporte encerra **31/12/2026**) |
| File share nativo na AWS (sem on-premises) | **EFS** ou **FSx** |
| Backup de recursos **da AWS** | **AWS Backup** (que também cobre **Volume Gateway**) |

## Links

- [[3 - Performance (24%)/Storage Gateway/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/Storage Gateway/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/Storage Gateway/4 - Questoes|4 - Questoes]]
- [[3 - Performance (24%)/S3/1 - O que e|S3]] · [[3 - Performance (24%)/FSx/1 - O que e|FSx]] · [[3 - Performance (24%)/DataSync/1 - O que e|DataSync]] · [[3 - Performance (24%)/Transfer Family/1 - O que e|Transfer Family]] · [[4 - Custo (20%)/Snow Family/1 - O que e|Snow Family]] · [[1 - Seguranca (30%)/AWS Backup/1 - O que e|AWS Backup]] · [[3 - Performance (24%)/Athena/1 - O que e|Athena]]
