---
tags: [saa-c03, storage, fundamentos]
conceito: Tipos de armazenamento (objeto, arquivo, bloco)
dominios: [2, 3, 4]
atualizado: 2026-11-08
---

# Tipos de armazenamento — O que é

> [!info] Em uma frase
> **Bloco** (EBS) = um "disco" cru anexado a **uma** instância; **arquivo** (EFS, FSx) = um sistema de arquivos montado por **muitas** instâncias ao mesmo tempo; **objeto** (S3) = chave→valor acessado por **API HTTP**, sem montar nada.

## As três famílias

| | **Bloco** | **Arquivo** | **Objeto** |
|---|---|---|---|
| Serviços | **EBS**, instance store | **EFS**, **FSx** | **S3**, **S3 Glacier** |
| Acesso | Anexado ao SO como disco | **NFS / SMB** (montado) | **API HTTPS** (GET/PUT) |
| Quem acessa | **Uma** instância (por vez) | **Milhares**, em paralelo | Qualquer um com permissão |
| Unidade | Bloco de bytes | Arquivo em diretórios | **Objeto** (chave + dados + metadados) |
| Alteração parcial | **Sim** (escreve o bloco) | **Sim** | **Não** — reescreve o objeto inteiro |
| Escopo | **Zonal** (uma AZ) | **Regional** | **Regional** (com nome global) |
| Caso típico | **Boot volume**, banco de dados | Diretório compartilhado, CMS, HPC | Backup, data lake, mídia, site estático |

## A árvore de decisão da prova

```
Precisa de boot volume ou disco para um banco auto-gerenciado?
   └─► BLOCO (EBS)  — gp3 padrão, io2 para IOPS extremo

Várias instâncias precisam ler e escrever os MESMOS arquivos?
   ├─ Linux / NFS ................. EFS
   ├─ Windows / SMB + Active Directory .... FSx for Windows File Server
   ├─ HPC, ML, integrado ao S3 ..... FSx for Lustre
   ├─ NetApp ONTAP / multiprotocolo .... FSx for NetApp ONTAP
   └─ ZFS / NFS com snapshots ...... FSx for OpenZFS

É dado que a aplicação acessa por API, versiona, arquiva, serve na web?
   └─► OBJETO (S3) — classe conforme o padrão de acesso
```

## Links

- [[9 - Fundamentos e apoio/Tipos de armazenamento (objeto, arquivo, bloco)/2 - Decorar|2 - Decorar]] · [[9 - Fundamentos e apoio/Tipos de armazenamento (objeto, arquivo, bloco)/3 - Detalhes|3 - Detalhes]] · [[9 - Fundamentos e apoio/Tipos de armazenamento (objeto, arquivo, bloco)/4 - Questoes|4 - Questoes]]
- [[3 - Performance (24%)/S3/1 - O que e|S3]] · [[3 - Performance (24%)/EBS/1 - O que e|EBS]] · [[3 - Performance (24%)/EFS/1 - O que e|EFS]] · [[3 - Performance (24%)/FSx/1 - O que e|FSx]] · [[3 - Performance (24%)/Storage Gateway/1 - O que e|Storage Gateway]] · [[3 - Performance (24%)/S3 Glacier/1 - O que e|S3 Glacier]]
