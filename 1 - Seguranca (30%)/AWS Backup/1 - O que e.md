---
tags: [saa-c03, aws-backup, retencao]
servico: AWS Backup
tipo: Backup centralizado
dominios: [1]
atualizado: 2026-11-08
---

# AWS Backup — O que é

> [!info] Em uma frase
> Centraliza e automatiza backup de **muitos serviços**, em **muitas contas e regiões**, com **backup plans**, **vaults** e **Vault Lock** (WORM).

## Definição oficial

> *"a fully-managed service that makes it easy to centralize and automate data protection across AWS services, in the cloud, and on premises."*

## Quando é a resposta

Quando o enunciado diz **"centralizar"**, **"política única"**, **"várias contas"**, **"vários serviços"** ou **"proteger os backups de exclusão"**.

Se é um serviço só e o mecanismo nativo basta (snapshot de EBS, PITR do DynamoDB, versionamento do S3), o AWS Backup é opcional.

## Serviços suportados (lista oficial)

**EC2** (instâncias EBS-backed) · **S3** · **EBS** · **DynamoDB** · **RDS** (todos os engines) · **Aurora** · **Aurora DSQL** · **EFS** · **FSx** (Lustre, Windows File Server, NetApp ONTAP, OpenZFS) · **Storage Gateway (Volume Gateway)** · **DocumentDB** · **Neptune** · **Redshift** e **Redshift Serverless** · **Timestream for LiveAnalytics** · **VMware Cloud on AWS** (e em Outposts) · **CloudFormation stacks** · **SAP HANA no EC2** · **EKS**

## As três features que caem

| Feature | Citação |
|---|---|
| **Vault Lock** | *"prevent anyone (including you) from deleting backups or altering their retention period"* — modelo **WORM** |
| **Cross-Region** | *"copy backups to multiple different AWS Regions on demand or automatically as part of a scheduled backup plan"* |
| **Cross-account** | *"copy backups to multiple different AWS accounts inside your AWS Organizations management structure"* |

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[S3]] · [[EBS]] · [[RDS]] · [[DynamoDB]] · [[Disaster Recovery (RPO e RTO)]] · [[Organizations e Control Tower]]
- [O que é o AWS Backup](https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html)
