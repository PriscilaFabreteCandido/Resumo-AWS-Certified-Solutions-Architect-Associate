---
servico: AWS Storage Gateway
fonte: "[[3 - Performance (24%)/Storage Gateway/2 - Decorar|2 - Decorar]]"
---

# Storage Gateway — Flashcards

#flashcards/saa-c03/d3-performance/storage-gateway

Protocolos e destino do S3 File Gateway?::**NFS** e **SMB**; grava como **objeto no S3**

Protocolo e destino do FSx File Gateway?::**SMB**; cache local de um **FSx for Windows**

Protocolo exposto pelo Volume Gateway?::**iSCSI** (bloco), com dados no S3 e snapshots **EBS**

O que o Tape Gateway expõe e para que serve?::**VTL**; substitui **fita física** sem trocar o software de backup

Volume Gateway cached: onde fica o dado principal?::**No S3**; local fica só o **cache** do que é acessado

Volume Gateway stored: onde fica o dado principal e o que vai para a AWS?::**Local** (tudo); a AWS recebe **snapshots** point-in-time

Precisa de latência local total com backup offsite em bloco: qual modo?::Volume Gateway **stored**

On-premises grava arquivo e o dado precisa virar objeto para Athena/lifecycle?::**S3 File Gateway**

Como o S3 File Gateway entrega baixa latência?::Com **cache local** transparente

Onde dá para implantar o Storage Gateway?::VM (**ESXi, Hyper-V, KVM, Nutanix AHV**), **hardware appliance**, VMware Cloud on AWS ou **AMI no EC2**

Mover dados × continuar acessando com protocolo de arquivo/bloco/fita?::Mover: **DataSync**; continuar acessando: **Storage Gateway**
