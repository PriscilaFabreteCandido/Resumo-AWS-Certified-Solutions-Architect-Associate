---
tags: [saa-c03, dax, cache, dynamodb]
servico: Amazon DynamoDB Accelerator (DAX)
tipo: Cache em memória para DynamoDB
dominios: [3]
atualizado: 2026-11-08
---

# DAX — O que é

> [!info] Em uma frase
> Cache em memória **específico do DynamoDB**, com **API compatível** (a aplicação quase não muda), rodando **dentro da sua VPC**.

## O que ele cacheia

Dois caches independentes:

| Cache | Guarda o resultado de |
|---|---|
| **Item cache** | **`GetItem`** e **`BatchGetItem`** |
| **Query cache** | **`Query`** e **`Scan`** |

## As três coisas que decidem a questão

**1. É write-through.** As escritas (`PutItem`, `UpdateItem`, `DeleteItem`, `BatchWriteItem`) passam pelo DAX: *"The operation is successful only if the data is successfully written to **both** the table and to DAX."*

**2. Leitura forte NÃO é cacheada.** *"DAX passes the request through to DynamoDB. The results from DynamoDB are not cached in DAX."* (o DAX repassa a requisição ao DynamoDB, e os resultados vindos do DynamoDB não são armazenados em cache no DAX)

**3. Roda na VPC.** *"designed to run within an Amazon Virtual Private Cloud (Amazon VPC) environment."*

## DAX × ElastiCache

| Critério | **DAX** | **ElastiCache** |
|---|---|---|
| Para qual banco | **Só DynamoDB** | Qualquer (RDS, Aurora, aplicação) |
| Mudança na aplicação | **Mínima** (API compatível) | Você implementa cache-aside |
| Estruturas de dados | Não | Redis: list, set, sorted set, pub/sub |
| Escolha | DynamoDB + leitura repetida | Banco relacional, sessão, leaderboard |

## Links

- [[3 - Performance (24%)/DAX/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/DAX/3 - Detalhes|3 - Detalhes]] · [[3 - Performance (24%)/DAX/4 - Questoes|4 - Questoes]]
- [[3 - Performance (24%)/DynamoDB/1 - O que e|DynamoDB]] · [[3 - Performance (24%)/ElastiCache/1 - O que e|ElastiCache]] · [[1 - Seguranca (30%)/VPC/1 - O que e|VPC]]
- [Conceitos do DAX](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.concepts.html)
