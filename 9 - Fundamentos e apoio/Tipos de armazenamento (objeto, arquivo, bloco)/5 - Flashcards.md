---
servico: Tipos de armazenamento (objeto, arquivo, bloco)
fonte: "[[9 - Fundamentos e apoio/Tipos de armazenamento (objeto, arquivo, bloco)/2 - Decorar|2 - Decorar]]"
---

# Tipos de armazenamento — Flashcards

#flashcards/saa-c03/fundamentos/tipos-armazenamento

Boot volume / root device: qual armazenamento?::**EBS**

Cache temporário com a maior IOPS possível, aceitando perder o dado: qual armazenamento?::**Instance store**

File system compartilhado NFS/POSIX entre várias instâncias Linux?::**EFS**

File share Windows com SMB e Active Directory?::**FSx for Windows File Server**

HPC/ML com latência sub-milissegundo vinculado ao S3?::**FSx for Lustre**

NFS e SMB juntos, SnapMirror, dedup?::**FSx for NetApp ONTAP**

On-premises continua usando NFS/SMB/iSCSI mas guarda na AWS?::**Storage Gateway**

EBS Multi-Attach: quais tipos e quantas instâncias?::**io1/io2**, até **16** instâncias na **mesma AZ**

Disponibilidade e número de AZs do S3 One Zone-IA?::**99,5%** em **1 AZ**

Disponibilidade do S3 Standard × Standard-IA?::Standard **99,99%**; Standard-IA **99,9%**

Limite do PUT simples no S3 e quando o multipart é obrigatório?::PUT simples até **5 GB**; multipart **obrigatório acima de 5 GB** (recomendado a partir de **100 MB**)

Multipart upload: tamanho de parte e número máximo de partes?::**5 MiB a 5 GiB**, até **10.000** partes

Tamanho máximo de objeto no S3 hoje (e o valor antigo dos simulados)?::**48,8 TiB** na doc atual; material antigo diz **5 TB**

gp3: baseline e máximo?::Baseline **3.000 IOPS / 125 MiB/s**; até **80.000 IOPS / 2.000 MiB/s**

io2 Block Express: limites?::Até **256.000 IOPS**, **4.000 MiB/s** e **64 TiB**
