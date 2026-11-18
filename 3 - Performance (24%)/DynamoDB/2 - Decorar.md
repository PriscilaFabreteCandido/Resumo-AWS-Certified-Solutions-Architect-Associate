---
tags: [saa-c03, dynamodb, decorar]
servico: Amazon DynamoDB
atualizado: 2026-11-08
---

# DynamoDB — Decorar

## Capacidade

| Unidade | O que compra |
|---|---|
| **1 RCU** | 1 leitura **forte** de 4 KB **ou 2 eventuais** |
| **1 WCU** | 1 escrita de **1 KB** |

Exemplo oficial: item de **3 KB** ÷ 4 KB = 0,75 → arredonda para **1 RCU**.
*"Strongly consistent reads consume twice as many database resources as eventually consistent reads."*

## Limites de item e chave

| Item | Valor |
|---|---|
| **Item máximo** | **400 KB** (nome + valor do atributo contam) |
| **Partition key** | **1 a 2048 bytes** |
| **Sort key** | **1 a 1024 bytes** |
| Aninhamento | até **32 níveis** |
| Tipos de chave | **string, number ou binary** (escalar) |
| Itens por tabela | *"no limit"* |

## Limites de operação

| Operação | Limite |
|---|---|
| **Query / Scan** | **1 MB** por chamada |
| **Transação** | **100** itens e **4 MB** |
| **`BatchGetItem`** | **100** itens / 16 MB |
| **`BatchWriteItem`** | **25** itens / 16 MB |
| Expressão | **4 KB**; **300** operadores; **100** operandos em `IN` |

## Throughput e quotas

| Item | Valor |
|---|---|
| Por tabela | **40.000 RCU** e **40.000 WCU** (on-demand: 40.000 RRU/WRU) |
| Por conta (provisionado) | **80.000 RCU** e **80.000 WCU** |
| Mínimo por tabela/GSI | **1 RCU** e **1 WCU** |
| Tabelas por região | **2.500** (até 10.000 com o time de conta) |
| Decreases | **4 por dia** + 1 por hora, até **27** por dia (UTC) |
| Troca provisionado → on-demand | **4 vezes** em 24 h rolantes |
| Troca on-demand → provisionado | **a qualquer momento** |
| Auto scaling | alvo recomendado **70%**; dispara após **2 min** consecutivos |

## Índices — GSI × LSI

| | **GSI** | **LSI** |
|---|---|---|
| Quantidade | **20** por tabela | **5** por tabela |
| Chave | simples **ou** composta | **sempre composta**, com a **mesma** partition key da tabela |
| Criação | **na criação ou depois**; deletável | **só na criação**; não deletável |
| Tamanho | *"no size restrictions"* (sem restrição de tamanho) | **10 GB** por valor de partition key |
| Consistência | *"eventual consistency only"* (somente consistência eventual) | **eventual ou forte** |
| Capacidade | **própria** | consome a da **tabela base** |
| Atributo não projetado | **não** devolve | **busca na tabela** |
| Escopo da query | *"across all partitions"* (em todas as partições) | *"over a single partition"* |

Atributos projetados: **100** no total para todos os índices (projeção INCLUDE).

## Features

| Feature | Número |
|---|---|
| **Streams** | registros vivem **24 horas**; 2 leitores simultâneos por shard |
| **PITR** | **1 a 35 dias**; restaura **sempre em tabela nova**; `LatestRestorableDateTime` ≈ **5 min** atrás |
| Tabela deletada | backup de sistema por **35 dias**, sem custo |
| **TTL** | atributo **Number** em epoch de **segundos**; apaga *"within a few days"*; 1ª exclusão **não consome WCU** |
| **Global Tables** | **multi-ativo**. **MREC** (eventual, padrão) ou **MRSC** (forte). **Last-writer-wins**. Modo **não muda** depois |
| **DAX** | cache em memória, **na VPC** |

## Links

- [[3 - Performance (24%)/DynamoDB/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/DynamoDB/3 - Detalhes|3 - Detalhes]] · [[3 - Performance (24%)/DynamoDB/4 - Questoes|4 - Questoes]]
- [[02 - Numeros para decorar]]
