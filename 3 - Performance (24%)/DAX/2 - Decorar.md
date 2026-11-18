---
tags: [saa-c03, dax, decorar]
servico: Amazon DynamoDB Accelerator (DAX)
atualizado: 2026-11-08
---

# DAX — Decorar

## Os dois caches e seus TTLs

| Cache | Guarda | TTL |
|---|---|---|
| **Item cache** | `GetItem`, `BatchGetItem` | **5 minutos** por padrão |
| **Query cache** | `Query`, `Scan` | Definido **na criação do cluster** |

- TTL de **zero** no item cache: os itens só saem por **LRU** ou por write-through.
- TTL de **zero** no query cache: *"the query response will not be cached"*.
- Evicção: **LRU** nos dois, *"not user-configurable"* (não é configurável pelo usuário).

## Os três fatos decisivos

| Fato | Citação |
|---|---|
| **Write-through** | *"The operation is successful only if the data is successfully written to **both** the table and to DAX."* (a operação só é bem-sucedida se o dado for gravado com sucesso **tanto** na tabela **quanto** no DAX) |
| **Leitura forte passa direto** | *"DAX passes the request through to DynamoDB. The results from DynamoDB are not cached in DAX."* (o DAX repassa a requisição ao DynamoDB, e os resultados vindos do DynamoDB não são armazenados em cache no DAX) |
| **Na VPC** | *"designed to run within an Amazon Virtual Private Cloud (Amazon VPC) environment"* |

## O que o DAX NÃO faz

- **Não** cacheia leitura **fortemente consistente**
- **Não** lida com APIs de **gerenciamento de tabela** (CreateTable, UpdateTable…)
- **Não** substitui o DynamoDB — é uma camada na frente

## Quando usar — e quando não

| Situação | DAX? |
|---|---|
| Leitura **repetida** dos mesmos itens, latência de ms → µs | **Sim** |
| Carga **read-heavy** com hot keys | **Sim** |
| Quer cache **sem reescrever** a aplicação | **Sim** (API compatível) |
| A aplicação exige **leitura forte** | **Não** (passa direto) |
| Escrita intensa, leitura rara | **Não** (write-through adiciona latência) |
| Cache de banco **relacional**, sessão, leaderboard | **Não** → **ElastiCache** |

## Links

- [[3 - Performance (24%)/DAX/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/DAX/3 - Detalhes|3 - Detalhes]] · [[3 - Performance (24%)/DAX/4 - Questoes|4 - Questoes]]
