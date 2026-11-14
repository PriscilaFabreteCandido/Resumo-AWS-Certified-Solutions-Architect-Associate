---
tags: [saa-c03, glacier, s3, arquivamento]
servico: S3 Glacier
tipo: Arquivamento de longo prazo
dominios: [3, 4]
atualizado: 2026-11-08
---

# S3 Glacier — O que é

> [!info] Em uma frase
> As três **classes de arquivamento** do S3, para dado que você precisa guardar mas quase nunca lê — com a troca entre **custo** e **tempo de recuperação**.

## As três classes

| Classe | Latência | Mín. dias | Restore? |
|---|---|---|---|
| **Glacier Instant Retrieval** | **milissegundos** | **90** | **Não precisa** |
| **Glacier Flexible Retrieval** | minutos a horas | **90** | **Sim** |
| **Glacier Deep Archive** | horas | **180** | **Sim** |

> *"S3 Glacier Instant Retrieval storage class are immediately available using `GET`"*, enquanto para Flexible Retrieval e Deep Archive *"you first need to retrieve data using the RestoreObject REST API"*.

## A tabela de restore (a mais cobrada do tema)

| Classe | **Expedited** | **Standard** | **Bulk** |
|---|---|---|---|
| **Glacier Flexible Retrieval** | **1-5 min** | **3-5 h** | **5-12 h** (**grátis**) |
| **Glacier Deep Archive** | **não existe** | **até 12 h** | **até 48 h** |

**Standard** é o tier padrão quando você não especifica.

## A regra de decisão

| Enunciado | Classe |
|---|---|
| "arquivo morto, mas acesso em **milissegundos**" | **Glacier Instant Retrieval** |
| "~1x por ano, aceita **minutos a horas**" | **Glacier Flexible Retrieval** |
| "compliance de **7-10 anos**, aceita **horas**, mais barato possível" | **Glacier Deep Archive** |

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[S3]] · [[Custo de armazenamento - classes do S3 e lifecycle]] · [[AWS Backup]]
- [Opções de recuperação de arquivo](https://docs.aws.amazon.com/AmazonS3/latest/userguide/restoring-objects-retrieval-options.html)
