---
servico: AWS DataSync
fonte: "[[3 - Performance (24%)/DataSync/2 - Decorar|2 - Decorar]]"
---

# DataSync — Flashcards

#flashcards/saa-c03/d3-performance/datasync

Mover TBs pela rede, uma vez ou agendado, para a AWS: qual serviço?::**AWS DataSync**

On-premises precisa continuar vendo arquivo, bloco ou fita com dados na AWS: qual serviço?::**Storage Gateway**

Parceiro ou cliente envia arquivos por SFTP, FTPS, FTP ou AS2: qual serviço?::**Transfer Family**

Sem banda suficiente, dezenas de TB, prazo curto: qual serviço?::**Snow Family**

Upload de clientes do mundo todo para um bucket S3, mais rápido: qual recurso?::**S3 Transfer Acceleration**

Protocolos on-premises suportados pelo DataSync?::**NFS, SMB, HDFS** e object storage (também Google Cloud Storage, Azure Blob/Files, Wasabi)

Destinos AWS do DataSync?::**S3**, **EFS** e os quatro **FSx** (Windows, Lustre, OpenZFS, NetApp ONTAP)

O que já vem incluso no DataSync em segurança?::**Criptografia automática** e **validação de integridade** dos dados

Por que o DataSync é rápido?::Protocolo de rede próprio e arquitetura **paralela, multithread**

O DataSync pode gravar direto em classe de arquivo do S3?::**Sim**: direto em **Glacier Flexible Retrieval** ou **Deep Archive**, sem passar pelo Standard

O DataSync precisa de agente em qual tipo de transferência?::**De/para on-premises** (VM no datacenter); entre serviços AWS **não** precisa

Como manter o tráfego do DataSync em rede privada?::Usando **VPC endpoints**
