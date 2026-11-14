---
tags: [saa-c03, transfer-family, sftp, transferencia]
servico: AWS Transfer Family
tipo: Endpoint gerenciado de transferência
dominios: [3, 4]
atualizado: 2026-11-08
---

# AWS Transfer Family — O que é

> [!info] Em uma frase
> Endpoint **gerenciado** de **SFTP, FTPS, FTP e AS2** (mais transferência por navegador) sobre **S3** e **EFS** — para que **terceiros** enviem e recebam arquivos sem que você mantenha um servidor.

## Os protocolos (lista oficial)

> *"SFTP, AS2, FTPS, FTP, and web browser-based transfers"*

E o **SFTP** é *"version 3"*.

## Os backends

> *"Amazon Simple Storage Service (Amazon S3) storage"* e *"Amazon Elastic File System (Amazon EFS) Network File System (NFS) file systems"*

## O gatilho de prova

A palavra decisiva é **quem inicia** a transferência:

| Quem inicia | Serviço |
|---|---|
| **Você**, movendo dados | **DataSync** |
| **Terceiro** (parceiro, cliente, fornecedor) enviando | **Transfer Family** |
| A aplicação on-premises, continuamente | **Storage Gateway** |

Se o enunciado nomeia **SFTP, FTPS, FTP ou AS2**, a resposta é **Transfer Family**.

## Outros fatos

| Item | Detalhe |
|---|---|
| Rede | *"supports up to 3 Availability Zones"* |
| Workflows | **Managed File Transfer Workflows (MFTW)**, serverless, para pós-processamento |

## Links

- [[3 - Performance (24%)/Transfer Family/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/Transfer Family/3 - Detalhes|3 - Detalhes]] · [[3 - Performance (24%)/Transfer Family/4 - Questoes|4 - Questoes]]
- [[3 - Performance (24%)/DataSync/1 - O que e|DataSync]] · [[3 - Performance (24%)/Storage Gateway/1 - O que e|Storage Gateway]] · [[3 - Performance (24%)/S3/1 - O que e|S3]] · [[3 - Performance (24%)/EFS/1 - O que e|EFS]]
- [O que é o Transfer Family](https://docs.aws.amazon.com/transfer/latest/userguide/what-is-aws-transfer-family.html)
