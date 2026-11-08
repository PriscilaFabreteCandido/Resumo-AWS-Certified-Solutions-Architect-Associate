---
tags: [saa-c03, dominio-3, s3, ebs, efs, fsx, storage]
dominio: 3
tasks: [3.1]
atualizado: 2026-11-08
---

# Armazenamento — S3, EBS, EFS e FSx

## 🧩 Em 30 segundos

| Tipo | Serviço | Use quando |
|---|---|---|
| **Objeto** | **S3** | API HTTP, data lake, estático, backup, volume ilimitado |
| **Bloco** | **EBS** | Disco de uma instância: boot, banco, baixa latência |
| **Bloco efêmero** | **Instance store** | Cache/scratch local, NVMe, **perde no stop** |
| **Arquivo NFS** | **EFS** | Vários clientes **Linux** montando o mesmo FS, elástico |
| **Arquivo SMB** | **FSx for Windows File Server** | Windows + Active Directory |
| **Arquivo HPC** | **FSx for Lustre** | ML/HPC, throughput extremo, ligado a bucket S3 |
| **Multiprotocolo** | **FSx for NetApp ONTAP** | NFS + SMB + iSCSI + NVMe, snapshot/clone estilo NetApp |
| **ZFS** | **FSx for OpenZFS** | Migrar servidor ZFS/Linux |

## 🧠 Teste-se primeiro

> [!question]- Classes do S3: AZs, disponibilidade, mínimo de dias e tamanho mínimo
> | Classe | Disp. | AZs | Mín. dias | Mín. cobrado | Latência |
> |---|---|---|---|---|---|
> | **Standard** | 99,99% | ≥3 | — | — | ms |
> | **Intelligent-Tiering** | 99,9% | ≥3 | — | — | ms |
> | **Standard-IA** | 99,9% | ≥3 | **30** | **128 KB** | ms |
> | **One Zone-IA** | **99,5%** | **1** | **30** | **128 KB** | ms |
> | **Express One Zone** | 99,95% | **1** | — | — | **single-digit ms** |
> | **Glacier Instant Retrieval** | 99,9% | ≥3 | **90** | **128 KB** | **ms** |
> | **Glacier Flexible Retrieval** | 99,99% (após restore) | ≥3 | **90** | — | min a horas |
> | **Deep Archive** | 99,99% (após restore) | ≥3 | **180** | — | horas |
>
> Durabilidade: **11 noves** em todas (exceto Reduced Redundancy, que é legado com 99,99%).
> Só **One Zone-IA** e **Express One Zone** não são *"designed to be resilient to the physical loss of an Availability Zone"*.

> [!question]- Restore do Glacier: tiers e tempos
> **Glacier Flexible Retrieval**: Expedited **1-5 min** · Standard **3-5 h** (ou "minutos a 5 h" com S3 Batch Operations) · Bulk **5-12 h** (Bulk é **grátis** nessa classe).
> **Deep Archive**: Expedited **não existe** · Standard **até 12 h** · Bulk **até 48 h**.
> **Glacier Instant Retrieval** não precisa de restore: *"available for real-time access"*.
> **Provisioned capacity**: garante Expedited no Glacier Flexible Retrieval — *"Each unit of capacity provides that at least three Expedited retrievals can be performed every 5 minutes"*.

> [!question]- Intelligent-Tiering: quais tiers e quando cada transição acontece?
> **Frequent Access** (padrão na entrada) → **Infrequent Access** após **30 dias** sem acesso → **Archive Instant Access** após **90 dias** sem acesso.
> Opcionais (precisam ser ativados): **Archive Access** (mín. 90 dias, retrieval de minutos a horas) e **Deep Archive Access** (mín. 180 dias).
> Cobra **taxa de monitoramento por objeto**, mas **sem** taxa de retrieval. ⚠️ *"If the size of an object is less than 128 KB, it is not monitored and not eligible for auto-tiering."*

> [!question]- EBS: qual tipo para cada necessidade?
> **gp3** — padrão. 80.000 IOPS, 2.000 MiB/s, IOPS e throughput **independentes do tamanho**. Primeira escolha.
> **gp2** — geração anterior, 16.000 IOPS, 250 MiB/s.
> **io1 / io2 Block Express** — quando precisa de **mais** que gp3 (io2 BE: **256.000 IOPS**, **4.000 MiB/s**) ou de **99,999%** de durabilidade. Únicos com **Multi-Attach**.
> **st1** — HDD de throughput sequencial (500 MiB/s): big data, log processing.
> **sc1** — HDD frio, acesso raro, mais barato.
> ⚠️ **st1 e sc1 não servem como boot volume.**

## S3 — performance e limites

| Item | Valor |
|---|---|
| Requisições | **3.500** PUT/COPY/POST/DELETE e **5.500** GET/HEAD **por segundo, por prefixo**. *"There are no limits to the number of prefixes in a bucket"* |
| Objeto máximo | **48,8 TiB** |
| Multipart | recomendado a partir de **100 MB**; partes de **5 MiB a 5 GiB**; até **10.000** partes |
| Latência | **100-200 ms** para objeto pequeno |
| Transferência | *"up to 100 Gb/s on a single instance"* |
| Escalonamento | *"happens gradually and is not instantaneous"* — durante o aumento você pode ver **503 Slow Down** |
| Transfer Acceleration | usa a borda do **CloudFront** para **upload**; endpoint `bucket.s3-accelerate.amazonaws.com`; bucket sem ponto no nome |

> [!tip] Prefixo é a alavanca de performance do S3
> 10 prefixos = **55.000** leituras por segundo. Se a questão diz "aplicação recebe 503 Slow Down", a resposta é **distribuir as chaves em mais prefixos** (e usar retry com backoff), não "pedir aumento de limite".
> Para centenas de milhares de requisições por segundo com latência de **único dígito de ms**, a doc aponta **S3 Express One Zone**.

## EFS

| Item | Valor |
|---|---|
| Protocolo | **NFS** (Linux) |
| Tipos | **Regional** (multi-AZ) ou **One Zone** |
| Modos de throughput | **Elastic** (recomendado), **Provisioned**, **Bursting** |
| Modos de performance | **General Purpose** (padrão) e **Max I/O** (geração anterior) |
| Latência | **~1 ms** leitura / **~2,7 ms** escrita (Standard). IA e Archive: dezenas de ms |
| Bursting | baseline **50 MiB/s por TiB**, burst até **100 MiB/s por TiB** (mínimo 100 MiB/s) |
| Elastic (Regional) | até 2,5 M IOPS de leitura e 500 K de escrita; **20-60 GiBps** de leitura por FS |
| Classes | **Standard**, **Infrequent Access (IA)** e **Archive**, com lifecycle automático |
| One Zone | usa **sempre** General Purpose; **não** suporta Max I/O nem Elastic |

> [!warning] Elastic × Provisioned × Bursting
> A doc dá o critério numérico: **Elastic** para *"average-to-peak ratio of 5% or less"* (carga irregular, com picos). **Provisioned** para *"average-to-peak ratio of 5% or more"* (carga constante e previsível). **Bursting** escala com o **tamanho** armazenado — ruim para FS pequeno com muito I/O.
> Depois de mudar para Provisioned, você fica **24 horas** sem poder voltar nem reduzir.

## FSx — as quatro famílias

| | Protocolo | Para quê |
|---|---|---|
| **FSx for Windows File Server** | **SMB 2.0 a 3.1.1** | *"business applications, home directories, web serving, content management, data analytics, software build setups, and media processing"*. Integra com **Active Directory**. Single-AZ e Multi-AZ. SSD e HDD |
| **FSx for Lustre** | Lustre, **POSIX** | *"workloads where speed matters, such as machine learning, high performance computing (HPC), video processing, and financial modeling"*. Latência sub-ms |
| **FSx for NetApp ONTAP** | **NFS, SMB, iSCSI, NVMe** | Multiprotocolo; *"migrate, back up, or burst your file-based applications from on-premises to AWS"*. Snapshot, clone, SnapMirror, tiering, **SnapLock WORM** |
| **FSx for OpenZFS** | **NFS v3, v4.0, 4.1, 4.2** | *"easy to move data to AWS from on-premises ZFS or other Linux-based file servers"*. Multi-AZ HA com failover **~60 s** |

**FSx for Lustre — detalhes que caem**:
- Integração com S3: *"transparently presents S3 objects as files"*; importa a listagem de arquivos na criação, pode importar os novos depois e **escrever de volta** para o S3.
- Deployment types: **Scratch** — *"ideal for temporary storage and shorter-term processing... Data is not replicated and does not persist if a file server fails."* **Persistent** — *"data is replicated, and file servers are replaced if they fail."*
- Classes de storage: SSD, Intelligent-Tiering, HDD.

## ❓ Questões de prova

> [!example]- Q1 — Logs são consultados intensamente nos primeiros 30 dias, raramente nos 11 meses seguintes, e precisam ficar 7 anos por compliance com acesso em até 12 horas. Qual lifecycle, com o menor custo?
> **A)** Standard → Standard-IA (30 d) → Glacier Instant Retrieval (1 ano) → expira em 7 anos
> **B)** **Standard → Standard-IA (30 d) → Glacier Flexible Retrieval (1 ano) → Deep Archive (depois) → expira em 7 anos** ✅
> **C)** Standard → One Zone-IA (30 d) → Deep Archive (1 ano)
> **D)** Intelligent-Tiering desde o início
>
> **Por que B**: respeita a cascata de transições, usa IA para o acesso raro e desce para arquivamento. Deep Archive atende "até 12 horas" com **Standard retrieval (até 12 h)** e é a classe mais barata.
> **A errada**: Glacier IR é mais caro que Flexible/Deep para dado que raramente é lido, e você não aproveita o requisito folgado de 12 h.
> **C errada**: One Zone-IA para **log de compliance** é arriscado — 1 AZ, não resiliente à perda da AZ.
> **D errada**: Intelligent-Tiering cobra monitoramento por objeto e o padrão de acesso aqui é **conhecido**; classe fixa sai mais barata.

> [!example]- Q2 — Dez instâncias EC2 Linux precisam ler e gravar no **mesmo** diretório, com crescimento imprevisível. Qual armazenamento?
> **A)** EBS gp3 com Multi-Attach
> **B)** **Amazon EFS** ✅
> **C)** S3 montado via FUSE
> **D)** FSx for Windows File Server
>
> **Por que B**: EFS é NFS compartilhado, elástico e multi-AZ — o caso de uso literal.
> **A errada**: **gp3 não suporta Multi-Attach** (só io1/io2), e Multi-Attach não é file system compartilhado — exigiria um FS de cluster.
> **C errada**: S3 não é POSIX; FUSE tem semântica e performance ruins para escrita concorrente.
> **D errada**: SMB/Windows; os clientes são Linux.

> [!example]- Q3 — Um banco em EC2 precisa de 100.000 IOPS sustentados e durabilidade de 99,999%. Qual volume?
> **A)** gp3 com IOPS máximo
> **B)** **io2 Block Express** ✅
> **C)** io1 com Multi-Attach
> **D)** Dois gp3 em RAID 0
>
> **Por que B**: io2 Block Express chega a **256.000 IOPS**, **4.000 MiB/s** e é o único com durabilidade de **99,999%** (0,001% de falha anual).
> **A errada**: gp3 para em **80.000 IOPS** e tem durabilidade de 99,8%-99,9%.
> **C errada**: io1 para em **64.000 IOPS** e tem 99,8%-99,9% de durabilidade. Multi-Attach não aumenta IOPS do volume.
> **D errada**: RAID 0 soma IOPS mas **piora** a durabilidade (falha de um volume derruba o array) — o oposto do requisito.
>
> ⚠️ Atenção ao tipo de instância: *"Other instance types can be attached to volumes provisioned with up to 64,000 IOPS, but can achieve up to 32,000 IOPS"* — só instâncias **Nitro** entregam acima disso.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Standard-IA tem 1 AZ | Tem **≥ 3**. **One Zone-IA** tem 1 |
| Glacier Instant Retrieval precisa de restore | Não. É `GET` em ms |
| Deep Archive tem Expedited | **Não existe** |
| Intelligent-Tiering é sempre mais barato | Cobra monitoramento, e objeto < 128 KB nunca sai do Frequent Access |
| Limite de requisição é por bucket | É por **prefixo** |
| gp3 suporta Multi-Attach | Só **io1 e io2** |
| HDD serve de boot volume | **st1 e sc1 não** |
| Instance store sobrevive ao stop | **Não.** É efêmero |
| EBS é replicado entre AZs | Volume é **zonal**; snapshot é regional |
| EFS One Zone suporta Elastic | **Não.** One Zone usa sempre General Purpose e não aceita Max I/O nem Elastic |
| EFS Bursting é bom para FS pequeno | Baseline é **por TiB armazenado** — FS pequeno tem pouco baseline |
| FSx for Lustre é sempre durável | **Scratch** não replica |
| FSx for Windows atende Linux | É **SMB**. Linux → EFS, OpenZFS ou ONTAP |

## Links

- [[03 - Dominio 3 - Design High-Performing Architectures (24%)]]
- [[Protecao de dados no S3]]
- [[Custo de armazenamento - classes do S3 e lifecycle]]
- [[Migracao e hibrido - 7 Rs, Snow, DataSync, Storage Gateway e DMS]]
- [Classes de armazenamento do S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html)
- [Tipos de volume EBS](https://docs.aws.amazon.com/ebs/latest/userguide/ebs-volume-types.html)
