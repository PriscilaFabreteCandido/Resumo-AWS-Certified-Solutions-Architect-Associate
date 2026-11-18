---
tags: [saa-c03, storage, detalhes]
conceito: Tipos de armazenamento (objeto, arquivo, bloco)
atualizado: 2026-11-08
---

# Tipos de armazenamento — Detalhes

## 1. Por que a prova insiste nisso

O guia oficial pede, em **Task 3.1**, *"Choose a storage service, access pattern, data pattern, and data transfer method"* (escolher o serviço de armazenamento, o padrão de acesso, o padrão de dados e o método de transferência), e lista entre os conhecimentos *"storage types with associated characteristics (for example, object, file, block)"* (tipos de armazenamento e suas características (por exemplo, objeto, arquivo, bloco)). Em **Task 4.2**, cobra *"cost-effective storage"*.

Na prática, a questão típica descreve um requisito e oferece S3, EBS, EFS e FSx como alternativas. Escolher errado o **tipo** torna a resposta impossível, por mais que o serviço seja bom.

## 2. Bloco

Um dispositivo que o SO vê como disco: você formata, monta, escreve setores. **Latência mais baixa** e única opção para **boot** e para **banco de dados auto-gerenciado**.

**EBS** — volume de rede, **zonal**, persiste independentemente da instância.

| Tipo | Para quê |
|---|---|
| **gp3** | **Padrão**. Baseline de 3.000 IOPS / 125 MiB/s **independente do tamanho**; IOPS e throughput provisionáveis em separado |
| gp2 | Geração anterior; IOPS atrelados ao tamanho (3 IOPS/GiB) |
| **io2 / io2 Block Express** | **IOPS extremo**, bancos críticos, **Multi-Attach**, durabilidade maior |
| st1 | HDD de **throughput** (big data, log) |
| sc1 | HDD **mais frio e barato** |

**Instance store** — disco **físico** da máquina hospedeira. O maior IOPS possível e **efêmero**: os dados somem se a instância **parar**, hibernar ou terminar (um *reboot* preserva). Só para cache, scratch, buffer e dados replicados.

> [!warning] "Maior IOPS" não é automaticamente io2
> Se o enunciado disser *"dados temporários"*, *"cache"* ou *"pode ser perdido"*, a resposta é **instance store**. io2 é para quando os dados **precisam** sobreviver.

## 3. Arquivo

Um sistema de arquivos compartilhado, montado por **muitas** instâncias simultaneamente. A palavra-chave é **compartilhado**.

**EFS** — NFS, **regional**, elástico (*petabyte-scale*), cresce e encolhe sozinho, com **mount target por AZ**. Classes: Standard, **One Zone** e as infrequentes (**IA**, **Archive**) com lifecycle automático.

**FSx** — quatro sistemas de arquivos de terceiros, gerenciados:

| FSx | Protocolo | Escolha quando |
|---|---|---|
| **Windows File Server** | **SMB** | Windows, integração com **Active Directory**, ACLs NTFS, DFS |
| **Lustre** | Lustre / POSIX | **HPC**, ML, análise; latência de **sub-milissegundo**; **vincula a um bucket S3** |
| **NetApp ONTAP** | **NFS, SMB e iSCSI** | Multiprotocolo, migrar ONTAP on-premises, dedup/compressão, SnapMirror |
| **OpenZFS** | NFS | Migrar NAS Linux/ZFS, snapshots, clones |

## 4. Objeto

Chave → dados + metadados, acessado por **API HTTPS**. Não existe "diretório" (o `/` é convenção), não existe escrita parcial: alterar um objeto é **substituí-lo**.

**S3** — durabilidade de **11 noves**, capacidade ilimitada, objeto de até **48,8 TiB** (a doc antiga dizia 5 TB), versionamento, lifecycle, replicação, eventos, Object Lock. É o destino natural de backup, data lake, mídia, log e site estático.

Por que **não** usar S3 como se fosse disco:

| Limitação | Consequência |
|---|---|
| Sem escrita parcial | Alterar 1 byte = reescrever o objeto |
| Sem semântica POSIX completa | Não monta como sistema de arquivos de verdade |
| Latência de API | Inviável para arquivo de banco de dados |
| Consistência de leitura após escrita | Ótima hoje (strong read-after-write), mas ainda não é um filesystem |

**Mountpoint for Amazon S3** existe e monta um bucket, mas é otimizado para **leitura sequencial** de grandes arquivos — não substitui EFS para escrita concorrente.

## 5. A ponte com o on-premises: Storage Gateway

Quando o requisito é *"o sistema local continua usando NFS/SMB/iSCSI, mas quero os dados na AWS"*:

| Gateway | Protocolo local | Guarda em |
|---|---|---|
| **S3 File Gateway** | NFS, SMB | **S3** |
| **FSx File Gateway** | SMB | **FSx for Windows** |
| **Volume Gateway** | **iSCSI** (bloco) | Snapshots EBS no S3 |
| **Tape Gateway** | **iSCSI VTL** (fita virtual) | S3 / Glacier |

## 6. O custo — e o que a prova cobra em Task 4.2

| Tipo | Como cobra | Pegadinha |
|---|---|---|
| **EBS** | **Por GB provisionado**, não usado — **mesmo parado** | Volume órfão de instância terminada continua cobrando |
| **Instance store** | Incluído no preço da instância | Nenhum custo extra, mas é efêmero |
| **EFS** | Por GB **usado** + throughput | Classes IA/Archive via lifecycle reduzem muito |
| **FSx** | Por capacidade e throughput **provisionados** | Lustre **Scratch** é mais barato que **Persistent** (e sem replicação) |
| **S3** | GB/mês + requisições + transferência | **Mínimos** das classes frias: Standard-IA/One Zone-IA cobram **30 dias** e **128 KB**; Glacier Flexible **90 dias**; Deep Archive **180 dias** |

> [!important] A pegadinha de custo mais comum
> Arquivos **pequenos** em classe fria podem custar **mais** que em Standard, por causa do mínimo de **128 KB** por objeto e do mínimo de dias. E cada transição de lifecycle **cobra por objeto**.

## 7. Resumo da decisão

| Requisito literal | Tipo | Serviço |
|---|---|---|
| Boot da instância | Bloco | **EBS** |
| Banco auto-gerenciado em EC2 | Bloco | **EBS io2/gp3** |
| Scratch de altíssimo IOPS, descartável | Bloco | **Instance store** |
| 50 instâncias Linux lendo os mesmos arquivos | Arquivo | **EFS** |
| File share Windows com AD | Arquivo | **FSx for Windows** |
| HPC lendo dataset do S3 | Arquivo | **FSx for Lustre** |
| Backup, data lake, mídia, site estático | Objeto | **S3** |
| Arquivamento de longo prazo | Objeto | **S3 Glacier** |
| On-premises mantém NFS/SMB/iSCSI | Híbrido | **Storage Gateway** |

## Links

- [[9 - Fundamentos e apoio/Tipos de armazenamento (objeto, arquivo, bloco)/1 - O que e|1 - O que e]] · [[9 - Fundamentos e apoio/Tipos de armazenamento (objeto, arquivo, bloco)/2 - Decorar|2 - Decorar]] · [[9 - Fundamentos e apoio/Tipos de armazenamento (objeto, arquivo, bloco)/4 - Questoes|4 - Questoes]]
- [[3 - Performance (24%)/S3/1 - O que e|S3]] · [[3 - Performance (24%)/S3 Glacier/1 - O que e|S3 Glacier]] · [[3 - Performance (24%)/EBS/1 - O que e|EBS]] · [[3 - Performance (24%)/EFS/1 - O que e|EFS]] · [[3 - Performance (24%)/FSx/1 - O que e|FSx]] · [[3 - Performance (24%)/Storage Gateway/1 - O que e|Storage Gateway]] · [[9 - Fundamentos e apoio/Criptografia em repouso e em transito/1 - O que e|Criptografia em repouso e em transito]]
