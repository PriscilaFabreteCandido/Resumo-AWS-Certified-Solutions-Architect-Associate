---
tags: [saa-c03, datasync, decorar]
servico: AWS DataSync
atualizado: 2026-11-08
---

# DataSync — Decorar

## A tabela que decide (os quatro serviços de transferência)

| Enunciado | Serviço |
|---|---|
| **Mover** TBs **pela rede**, uma vez ou agendado | **DataSync** |
| On-premises precisa **continuar** vendo arquivo/bloco/fita | **Storage Gateway** |
| **Parceiro/cliente envia** por SFTP, FTPS, FTP, AS2 | **Transfer Family** |
| **Sem banda** suficiente, dezenas de TB, prazo curto | **Snow Family** |
| Upload de clientes **de todo o mundo** para um bucket | **S3 Transfer Acceleration** |

## Protocolos e destinos

| Lado | Suportado |
|---|---|
| **On-premises / outras nuvens** | **NFS · SMB · HDFS** · object storage · Google Cloud Storage · Azure Blob · Azure Files · Wasabi |
| **AWS** | **S3** · **EFS** · **FSx for Windows** · **FSx for Lustre** · **FSx for OpenZFS** · **FSx for NetApp ONTAP** |

## O que vem incluso

| Recurso | Citação |
|---|---|
| Criptografia e integridade | *"automatic encryption and data integrity validation"* |
| Performance | *"purpose-built network protocol and a parallel, multi-threaded architecture"* |
| Rede privada | **VPC endpoints** suportados |

## Caso de uso de custo citado

> Arquivar dado frio para *"S3 Glacier Flexible Retrieval or S3 Glacier Deep Archive"*

Ou seja: o DataSync pode mover **direto** para classe de arquivo, sem passar pelo Standard.

## O que a doc lida NÃO informa

- Detalhes do **agente** (a doc de visão geral não os descreve)
- Detalhes de **agendamento**

Na prática, transferências **de/para on-premises** usam um **agente** (VM no datacenter), e transferências **entre serviços AWS** não precisam dele.

## Links

- [[3 - Performance (24%)/DataSync/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/DataSync/3 - Detalhes|3 - Detalhes]] · [[3 - Performance (24%)/DataSync/4 - Questoes|4 - Questoes]]
