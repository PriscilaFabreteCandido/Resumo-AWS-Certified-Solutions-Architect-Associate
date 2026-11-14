---
tags: [saa-c03, efs, storage, arquivo]
servico: Amazon EFS
tipo: Sistema de arquivos NFS
dominios: [3, 4]
atualizado: 2026-11-08
---

# Amazon EFS — O que é

> [!info] Em uma frase
> Sistema de arquivos **NFS** gerenciado e **elástico**: vários clientes **Linux** montam o mesmo diretório, de várias AZs, e a capacidade cresce e diminui sozinha.

## Quando é a resposta

| Enunciado | EFS? |
|---|---|
| "**várias instâncias Linux** precisam do mesmo diretório" | **Sim** |
| "aplicação legada que escreve em **disco compartilhado**" | **Sim** |
| "crescimento **imprevisível**, não quero dimensionar volume" | **Sim** |
| "WordPress/CMS com uploads compartilhados" | **Sim** |
| Windows / **SMB** | **Não** → **FSx for Windows File Server** |
| HPC, throughput de centenas de GB/s | **Não** → **FSx for Lustre** |
| Disco de **uma** instância (boot, banco) | **Não** → **EBS** |
| Objeto por API HTTP | **Não** → **S3** |

## Regional × One Zone

| | **Regional** | **One Zone** |
|---|---|---|
| AZs | Múltiplas | **Uma** |
| Resiliência à perda da AZ | **Sim** | **Não** |
| Modos de performance | General Purpose, Max I/O | **Sempre General Purpose** |
| Modos de throughput | Elastic, Provisioned, Bursting | **Não** suporta Elastic nem Max I/O |
| Custo | Maior | Menor |

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[EBS]] · [[FSx]] · [[S3]] · [[Tipos de armazenamento (objeto, arquivo, bloco)]]
- [Performance do EFS](https://docs.aws.amazon.com/efs/latest/ug/performance.html)
