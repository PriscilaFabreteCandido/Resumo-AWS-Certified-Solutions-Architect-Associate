---
tags: [saa-c03, datasync, detalhes]
servico: AWS DataSync
atualizado: 2026-11-08
---

# DataSync — Detalhes

## 1. "Mover" × "dar acesso" — a distinção central

É a confusão que a prova explora mais nesse grupo de serviços:

**DataSync** é uma **operação que termina**: você define origem, destino e uma tarefa; ela roda (uma vez ou agendada), copia, valida e acaba. Depois disso, o DataSync não está no caminho dos dados.

**Storage Gateway** é um **caminho permanente**: a aplicação on-premises continua usando NFS/SMB/iSCSI/VTL para sempre, e o dado vive na AWS.

| Enunciado | Resposta |
|---|---|
| *"migrar 80 TB do NAS para o S3"* | **DataSync** |
| *"a aplicação precisa continuar gravando em SMB, com o dado no S3"* | **Storage Gateway (File Gateway)** |
| *"sincronizar diariamente o compartilhamento on-premises com o EFS"* | **DataSync** (agendado) |
| *"parceiros enviam arquivos por SFTP"* | **Transfer Family** |

## 2. Os três cenários de transferência

**On-premises → AWS**: o caso clássico de migração. Origem em **NFS, SMB, HDFS** ou object storage; destino em **S3, EFS ou FSx**. Usa um **agente** (VM no datacenter) que lê a origem e fala com o serviço.

**AWS → AWS**: entre serviços de storage da AWS (S3 ↔ EFS, EFS ↔ FSx, S3 de uma região para outra). **Não** precisa de agente.

**Outra nuvem → AWS**: a doc lista **Google Cloud Storage, Azure Blob, Azure Files, Wasabi** e outras — relevante para migração multi-nuvem.

## 3. O que o DataSync resolve que um script não resolve

| Recurso | Por quê importa |
|---|---|
| *"automatic encryption and data integrity validation"* | Garante que o que chegou é igual ao que saiu, sem você escrever verificação |
| *"purpose-built network protocol and a parallel, multi-threaded architecture"* | Satura o link; um `aws s3 sync` sequencial não |
| **Preservação de metadados** | Permissões, timestamps, propriedade (importante em NFS/SMB) |
| **Transferência incremental** | Nas execuções seguintes, só o que mudou |
| **Agendamento** | Sincronização recorrente sem cron próprio |
| **Filtros** | Incluir/excluir por padrão |
| **VPC endpoints** | Transferir sem passar pela internet |
| **Relatórios e métricas** | CloudWatch |

## 4. Direto para classe de arquivo

A doc cita, entre os casos de uso, arquivar dado frio para *"S3 Glacier Flexible Retrieval or S3 Glacier Deep Archive"*.

Isso é relevante para custo: em vez de copiar para o S3 Standard e depois esperar o lifecycle mover (pagando Standard no intervalo e uma requisição de transição por objeto), o DataSync grava **direto** na classe de arquivo.

⚠️ Mas lembre dos mínimos: **90 dias** (Glacier FR) e **180 dias** (Deep Archive), e o **overhead de 40 KB por objeto** nessas classes.

## 5. DataSync × Snow Family — a conta de banda

Quando o link não dá conta, nem o melhor protocolo resolve. A conta que a prova espera:

```
Tempo ≈ Volume ÷ Banda útil
```

| Volume | Banda | Tempo aproximado |
|---|---|---|
| 10 TB | 1 Gbps | ~1 dia |
| 80 TB | 100 Mbps | **> 70 dias** |
| 100 TB | 10 Gbps | ~1 dia |
| 500 TB | 1 Gbps | ~46 dias |

Se o tempo calculado não cabe no prazo, a resposta é **Snow Family** (dispositivo físico).

⚠️ E a nota importante: o suporte ao **Snowball** encerra em **31/12/2026**, e a própria doc já aponta: *"New customers should explore AWS DataSync for online transfers, AWS Data Transfer Terminal for secure physical transfers, or AWS Partner solutions."*

## 6. Padrões de arquitetura

| Padrão | Desenho |
|---|---|
| **Migração de file server** | NAS → DataSync → **FSx for Windows** (ou EFS) |
| **Migração para data lake** | NAS/HDFS → DataSync → **S3** → Glue/Athena |
| **Arquivamento** | NAS → DataSync → **S3 Glacier Deep Archive** |
| **DR / cópia contínua** | On-premises → DataSync agendado → S3 de outra região |
| **Multi-nuvem** | Azure Blob → DataSync → S3 |
| **Entre serviços AWS** | EFS → DataSync → S3 (ou entre regiões) |

## Links

- [[3 - Performance (24%)/DataSync/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/DataSync/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/DataSync/4 - Questoes|4 - Questoes]]
- [[3 - Performance (24%)/Storage Gateway/1 - O que e|Storage Gateway]] · [[3 - Performance (24%)/Transfer Family/1 - O que e|Transfer Family]] · [[4 - Custo (20%)/Snow Family/1 - O que e|Snow Family]] · [[3 - Performance (24%)/S3/1 - O que e|S3]] · [[3 - Performance (24%)/S3 Glacier/1 - O que e|S3 Glacier]] · [[3 - Performance (24%)/EFS/1 - O que e|EFS]] · [[3 - Performance (24%)/FSx/1 - O que e|FSx]] · [[9 - Fundamentos e apoio/Estrategias de migracao (7 Rs)/1 - O que e|Estrategias de migracao (7 Rs)]]
