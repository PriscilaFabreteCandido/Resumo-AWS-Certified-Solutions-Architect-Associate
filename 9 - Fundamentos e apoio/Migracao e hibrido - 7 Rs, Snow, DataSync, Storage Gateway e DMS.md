---
tags: [saa-c03, fundamentos, migracao, snow, datasync, storage-gateway, dms]
tasks: [3.5, 4.1]
atualizado: 2026-11-08
---

# Migração e híbrido — 7 Rs, Snow, DataSync, Storage Gateway e DMS

## 🧩 Em 30 segundos

| Situação | Serviço |
|---|---|
| Mover TBs **pela rede**, agendado, NFS/SMB/HDFS → S3/EFS/FSx | **DataSync** |
| Cliente/parceiro envia por **SFTP/FTPS/FTP/AS2** | **Transfer Family** |
| On-premises precisa continuar vendo **arquivo** (NFS/SMB) com dado no S3 | **S3 File Gateway** |
| On-premises precisa de **iSCSI** com cópia no S3 | **Volume Gateway** (cached ou stored) |
| Substituir biblioteca de **fitas** | **Tape Gateway** |
| Sem banda, dezenas de TB, dispositivo **físico** | **Snow Family** ⚠️ suporte encerra **31/12/2026** |
| Migrar **banco** (mesmo engine ou engine diferente) | **DMS** (+ **Schema Conversion / SCT** no heterogêneo) |
| Migrar **servidores** inteiros (lift & shift) | **Application Migration Service (MGN)** |
| Descobrir o que existe no datacenter | **Application Discovery Service** |

## 🧠 Teste-se primeiro

> [!question]- Os 7 Rs de migração
> **Retire** — desativar o que não é mais usado
> **Retain** — manter onde está (ou postergar)
> **Rehost** — *"lift and shift"*, mover sem alterar
> **Relocate** — mover para outra VPC, região, conta, ou para a versão gerenciada da plataforma (ex.: VMware Cloud on AWS)
> **Repurchase** — *"drop and shop"*, trocar por outro produto, geralmente SaaS
> **Replatform** — *"lift, tinker, and shift"*, otimizar um pouco (ex.: SQL Server → RDS for SQL Server)
> **Refactor / re-architect** — reescrever para cloud-native. *"the most complex and costly strategy"*
>
> As mais comuns em migração grande, segundo a AWS: **rehost, replatform, relocate e retire**.

> [!question]- Os quatro gateways do Storage Gateway, com protocolo
> *"AWS Storage Gateway offers file-based (S3 File Gateway and FSx File Gateway), volume-based (Volume Gateway), and tape-based (Tape Gateway) storage solutions."*
> **S3 File Gateway** — **NFS v3/v4.1** e **SMB 2/3**. *"store and retrieve objects in Amazon S3 using industry-standard file protocols"*, com *"low-latency access to data through transparent local caching"*.
> **FSx File Gateway** — SMB, cache local para FSx for Windows File Server.
> **Volume Gateway** — **iSCSI**. **Cached**: *"You store your data in Amazon S3 and retain a copy of frequently accessed data subsets locally."* **Stored**: *"store all your data locally. Then asynchronously back up point-in-time snapshots of this data to Amazon S3."*
> **Tape Gateway** — biblioteca de fitas virtual (VTL) para software de backup existente.

> [!question]- DataSync × Storage Gateway × Transfer Family
> **DataSync**: *"a secure, reliable, high-speed file transfer service"* para **mover** dado (uma vez ou agendado). Origens: NFS, SMB, HDFS, object storage on-premises, outras nuvens. Destinos: **S3, EFS, FSx (Windows, Lustre, OpenZFS, ONTAP)**. Faz *"automatic encryption and data integrity validation"*.
> **Storage Gateway**: mantém o **acesso híbrido contínuo** — on-premises continua usando arquivo/bloco/fita, e o dado vive na AWS.
> **Transfer Family**: endpoint gerenciado de **SFTP, AS2, FTPS, FTP** (e transferência por navegador) sobre **S3 e EFS**, para **terceiros** enviarem arquivos.
>
> Divisor: **mover** → DataSync. **continuar acessando** → Storage Gateway. **terceiro envia** → Transfer Family.

> [!question]- DMS: homogêneo × heterogêneo
> DMS migra *"relational databases, data warehouses, NoSQL databases, and other types of data stores"*, com *"one-time migrations or replicate ongoing changes to keep sources and targets in sync"* (replicação contínua — o que permite **downtime mínimo**).
> **Homogêneo** (Oracle → RDS Oracle, MySQL → Aurora MySQL): só DMS.
> **Heterogêneo** (Oracle → Aurora PostgreSQL): DMS **+ conversão de schema** — *"DMS Schema Conversion"* no console, ou o **AWS Schema Conversion Tool (AWS SCT)** instalado localmente.
> Extras: **DMS Fleet Advisor** para descoberta, failover automático do servidor de replicação, KMS em repouso e SSL em trânsito.

## Snow Family

> [!warning] Fim de suporte anunciado
> A página do Snowball Edge diz: *"AWS Snowball Edge is no longer available to new customers. New customers should explore AWS DataSync for online transfers, AWS Data Transfer Terminal for secure physical transfers, or AWS Partner solutions. For edge computing, explore AWS Outposts."*
> E o aviso de fim de suporte: *"On December 31, 2026, AWS will discontinue support for AWS Snowball devices in all AWS commercial Regions."*
>
> **Para a prova**: o guia do SAA-C03 (v1.1) ainda lista **AWS Snow Family** como serviço **em escopo**, então continue reconhecendo o cenário ("sem banda, dezenas de TB, dispositivo físico"). Mas se uma alternativa oferecer **DataSync** para transferência online e o enunciado não falar de link ruim, DataSync é a resposta moderna.

| Dispositivo | Capacidade / compute |
|---|---|
| **Snowball Edge Storage Optimized 210 TB** | **210 TB usáveis** (NVMe), 104 vCPUs, 416 GB de RAM utilizável |
| **Snowball Edge Compute Optimized** | até **104 vCPUs**, **416 GB** de memória, **28 TB** de NVMe SSD para as instâncias |

- Cluster de **3 a 16 dispositivos** para durabilidade local.
- Protocolos: **NFSv3/v4/v4.1** e **S3 sobre HTTP/HTTPS**.
- Rede até **100 Gbit/s**.
- As especificações do **Snowcone** não aparecem na documentação atual que conferi, coerente com a descontinuação.

## FSx e EFS como destino de migração

Padrões que a prova usa:

| Origem on-premises | Destino na AWS |
|---|---|
| Servidor de arquivos **Windows** com AD | **FSx for Windows File Server** (+ AWS Managed Microsoft AD ou trust) |
| **NFS** Linux | **EFS** ou **FSx for OpenZFS** |
| **NetApp ONTAP** | **FSx for NetApp ONTAP** (SnapMirror para replicar) |
| Cluster **Lustre** / HPC | **FSx for Lustre** |
| Fileserver genérico, quer virar objeto | **S3 via DataSync** ou **S3 File Gateway** |

## ❓ Questões de prova

> [!example]- Q1 — Uma empresa tem 80 TB em um NAS e link de 100 Mbps. Precisa migrar para o S3 em menos de duas semanas. Qual opção?
> **A)** DataSync pela internet
> **B)** **AWS Snow Family (dispositivo físico)** ✅
> **C)** S3 Transfer Acceleration com upload multipart
> **D)** Direct Connect de 1 Gbps
>
> **Por que B**: faça a conta — 80 TB em 100 Mbps, com 100% de utilização, passa de **70 dias**. Link insuficiente é o gatilho do dispositivo físico.
> **A errada**: DataSync é excelente, mas limitado pelo link.
> **C errada**: acelera, mas não cria banda que não existe.
> **D errada**: provisionar DX leva *"up to 72 business hours"* só para a porta, mais o circuito do parceiro — não cabe em duas semanas, e depois ainda levaria ~8 dias para transferir.
>
> ⚠️ Nota de contexto: o suporte ao Snowball encerra em **31/12/2026**. Na prova, o cenário "link insuficiente + prazo curto" continua apontando Snow Family.

> [!example]- Q2 — Um servidor de backup on-premises grava em fitas LTO. A empresa quer eliminar as fitas físicas **sem trocar o software de backup**. Qual solução?
> **A)** S3 File Gateway
> **B)** **Tape Gateway** ✅
> **C)** AWS Backup
> **D)** DataSync para o S3 Glacier
>
> **Por que B**: Tape Gateway apresenta uma **biblioteca de fitas virtual** ao software existente — o requisito "sem trocar o software" é o gatilho.
> **A errada**: expõe NFS/SMB, não VTL; o software de backup não enxergaria fitas.
> **C errada**: AWS Backup protege recursos **da AWS**, não substitui o software on-premises.
> **D errada**: move arquivos, mas o software de backup continua esperando fitas.

> [!example]- Q3 — Migrar um Oracle on-premises de 4 TB para Aurora PostgreSQL, com **downtime máximo de 30 minutos**. Qual abordagem?
> **A)** Snapshot e restore no Aurora
> **B)** **AWS SCT (ou DMS Schema Conversion) para converter o schema + DMS com replicação contínua (CDC), cortando para o Aurora na janela de 30 min** ✅
> **C)** DMS sozinho
> **D)** Dump com `pg_dump` e restore
>
> **Por que B**: é migração **heterogênea** — precisa de conversão de schema **e** de replicação contínua para que a carga inicial aconteça com o Oracle no ar, deixando só o corte final para a janela.
> **A errada**: snapshot de Oracle não restaura em PostgreSQL.
> **C errada**: DMS migra **dados**, mas não converte procedures, triggers e tipos entre engines diferentes.
> **D errada**: `pg_dump` lê PostgreSQL, não Oracle — e um dump/restore de 4 TB estouraria a janela.

> [!example]- Q4 — Aplicações on-premises precisam continuar lendo e gravando em um compartilhamento SMB, mas a empresa quer que o dado fique no S3 para análise com Athena. Qual solução?
> **A)** DataSync agendado a cada hora
> **B)** **S3 File Gateway expondo SMB, com os objetos gravados no S3** ✅
> **C)** FSx for Windows File Server
> **D)** Volume Gateway em modo cached
>
> **Por que B**: File Gateway é exatamente *"store and retrieve objects in Amazon S3 using industry-standard file protocols"* — a aplicação vê SMB, o Athena vê objetos no S3.
> **A errada**: DataSync copia; a aplicação continuaria dependendo do storage local como fonte de verdade, e haveria defasagem.
> **C errada**: FSx for Windows guarda o dado em um file system, **não** como objeto no S3 — o Athena não consultaria.
> **D errada**: Volume Gateway é **iSCSI** (bloco) e grava snapshots, não objetos consultáveis.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| DataSync e Storage Gateway fazem o mesmo | DataSync **move**; Storage Gateway dá **acesso híbrido contínuo** |
| Volume Gateway expõe arquivo | Expõe **iSCSI** (bloco). Arquivo é **File Gateway** |
| Volume Gateway cached guarda tudo local | **Cached** = dado no S3, cache local. **Stored** = tudo local, snapshot no S3 |
| Transfer Family é para migração em massa | É endpoint **SFTP/FTPS/FTP/AS2** para terceiros enviarem arquivos |
| DMS converte schema | **Não.** Conversão é **Schema Conversion / AWS SCT** |
| DMS exige parar a origem | Replicação contínua mantém origem e destino em sincronia até o corte |
| Snow é sempre a resposta para muitos TB | Só quando o **link** não dá conta no prazo. E o suporte encerra em 31/12/2026 |
| Rehost e replatform são a mesma coisa | **Rehost** = lift and shift, sem mudança. **Replatform** = "lift, tinker, and shift" |
| Relocate é o mesmo que rehost | Relocate move para outra VPC/região/conta ou para a versão gerenciada da plataforma |
| Refactor é o melhor caminho sempre | *"the most complex and costly strategy"* |

## Links

- [[Armazenamento - S3, EBS, EFS e FSx]]
- [[Custo de armazenamento - classes do S3 e lifecycle]]
- [[Custo de banco de dados]]
- [[Ingestao e transformacao - Kinesis, Glue, Athena e EMR]]
- [As 7 estratégias de migração](https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html)
- [O que é o DataSync](https://docs.aws.amazon.com/datasync/latest/userguide/what-is-datasync.html)
