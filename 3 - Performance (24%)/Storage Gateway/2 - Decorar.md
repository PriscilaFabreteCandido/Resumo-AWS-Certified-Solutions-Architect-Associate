---
tags: [saa-c03, storage-gateway, decorar]
servico: AWS Storage Gateway
atualizado: 2026-11-08
---

# Storage Gateway — Decorar

## A tabela dos quatro

| Gateway | Protocolo exposto | Destino | Use quando |
|---|---|---|---|
| **S3 File Gateway** | **NFS v3/v4/v4.1** e **SMB 2/3** | **S3** (objeto) | On-premises grava arquivo, e o dado precisa ser **objeto** (para Athena, analytics, lifecycle) |
| **FSx File Gateway** | **SMB** | **FSx for Windows** | Cache local de um file share Windows na AWS |
| **Volume Gateway** | **iSCSI** (bloco) | S3 + snapshots **EBS** | Aplicação on-premises espera **disco** |
| **Tape Gateway** | **VTL** | S3 / Glacier | Substituir **fita física** sem trocar o software de backup |

## Volume Gateway — os dois modos

| | **Cached volumes** | **Stored volumes** |
|---|---|---|
| Dado **principal** | **No S3** | **Local** |
| Local | **Cache** do que é acessado | **Tudo** |
| AWS recebe | O dado | **Snapshots** point-in-time |
| Use quando | Quer reduzir storage local | Precisa de **latência local total** + backup offsite |

## S3 File Gateway — o que decora

> *"store and retrieve objects in Amazon S3 using industry-standard file protocols"* (armazenar e recuperar objetos no Amazon S3 usando protocolos de arquivo padrão de mercado)
> *"low-latency access to data through transparent local caching"* (acesso de baixa latência aos dados, por meio de cache local transparente)

Deployment: VM em **VMware ESXi, Microsoft Hyper-V, KVM ou Nutanix AHV**, **hardware appliance**, **VMware Cloud on AWS**, ou **AMI no EC2**.

Gateway no **EC2** serve *"for disaster recovery, data mirroring, and providing storage for applications hosted on Amazon EC2"*.

## A distinção que mais cai

| Preciso de | Serviço |
|---|---|
| **Mover** dados (uma vez / agendado) | **DataSync** |
| **Continuar acessando** com protocolo de arquivo/bloco/fita | **Storage Gateway** |
| **Terceiro envia** arquivos | **Transfer Family** |
| Dado principal **na AWS**, mas acesso de arquivo local | **File Gateway** |

## Links

- [[3 - Performance (24%)/Storage Gateway/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/Storage Gateway/3 - Detalhes|3 - Detalhes]] · [[3 - Performance (24%)/Storage Gateway/4 - Questoes|4 - Questoes]]
