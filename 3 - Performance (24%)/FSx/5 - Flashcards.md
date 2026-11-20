---
servico: Amazon FSx
fonte: "[[3 - Performance (24%)/FSx/2 - Decorar|2 - Decorar]]"
---

# FSx — Flashcards

#flashcards/saa-c03/d3-performance/fsx

Protocolo e requisito de diretório do FSx for Windows File Server?::**SMB**; **Active Directory obrigatório**

Protocolos suportados pelo FSx for NetApp ONTAP?::**NFS, SMB, iSCSI e NVMe**

Protocolo do FSx for OpenZFS?::**NFS** (v3 a v4.2)

Dois tipos de deployment do FSx for Lustre?::**Scratch** e **Persistent**

Diferença entre Lustre Scratch e Persistent?::Scratch: dados **não replicados**, perdidos se o servidor falhar; Persistent: **replicados** e servidores substituídos

O que o FSx for Lustre faz com um bucket S3 vinculado?::Apresenta objetos do S3 **como arquivos** e pode **gravar de volta** no S3

Classes de storage do FSx for Lustre?::**SSD, Intelligent-Tiering e HDD**

Qual FSx tem backup automático diário ligado por padrão?::**FSx for Windows File Server**

Features do FSx for ONTAP citadas para a prova?::Snapshots, **cloning**, **SnapMirror**, **tiering** e **SnapLock WORM**

Tempo de failover do FSx for OpenZFS HA × non-HA?::HA: **~60 s**; Single-AZ non-HA: **~30 min**

Precisa de NFS e SMB no mesmo file system: qual FSx?::**FSx for NetApp ONTAP**

HPC/ML com centenas de GB/s ligado ao S3: qual serviço?::**FSx for Lustre**

Migrar ZFS on-premises: qual serviço?::**FSx for OpenZFS**

NFS Linux elástico, sem dimensionar: FSx ou outro?::**EFS**
