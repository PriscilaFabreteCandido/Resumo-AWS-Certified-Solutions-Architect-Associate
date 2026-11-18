---
tags: [saa-c03, dynamodb, nosql, banco]
servico: Amazon DynamoDB
tipo: Banco NoSQL chave-valor
dominios: [3, 2, 4]
atualizado: 2026-11-08
---

# Amazon DynamoDB — O que é

> [!info] Em uma frase
> Banco **NoSQL** chave-valor e documento, **serverless**, com latência de **milissegundos de único dígito** em qualquer escala, e sem servidor para gerenciar.

## Quando é a resposta

| Enunciado | DynamoDB? |
|---|---|
| "chave-valor", "escala ilimitada", "milissegundos" | **Sim** |
| "serverless", "menor esforço operacional" para banco | **Sim** |
| "tráfego imprevisível, picos enormes" | **Sim** (on-demand) |
| "sessão de usuário", "carrinho", "perfil", "catálogo", "IoT" | **Sim** |
| **JOIN**, transação complexa, SQL ad-hoc | **Não** → RDS/Aurora |
| Analítico sobre histórico | **Não** → Redshift/Athena |
| Série temporal | **Não** → Timestream |

## O modelo de dados

| Conceito | O que é |
|---|---|
| **Table** | A tabela. *"no limit to the number of items you can store"* (sem limite para a quantidade de itens que você pode armazenar) |
| **Item** | O registro. Máximo **400 KB** |
| **Partition key** | Define **onde** o item mora. Com ela só, *"no two items can have the same partition key value"* (dois itens não podem ter o mesmo valor de partition key) |
| **Sort key** | Opcional. Com ela, vários itens compartilham a partition key, com sort keys diferentes |
| **Atributo** | Campo. Chave só aceita **string, number ou binary** (escalar) |

## Os números fundadores

| Item | Valor |
|---|---|
| **1 RCU** | 1 leitura **forte** de até **4 KB**, **ou 2 eventuais** |
| **1 WCU** | 1 escrita de até **1 KB** |
| **Item máximo** | **400 KB** |
| **Query/Scan** | resultado de **1 MB** por chamada |

⚠️ **O padrão da API é leitura eventual.** Leitura forte consome **o dobro**.

## Links

- [[3 - Performance (24%)/DynamoDB/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/DynamoDB/3 - Detalhes|3 - Detalhes]] · [[3 - Performance (24%)/DynamoDB/4 - Questoes|4 - Questoes]]
- [[3 - Performance (24%)/DAX/1 - O que e|DAX]] · [[3 - Performance (24%)/ElastiCache/1 - O que e|ElastiCache]] · [[2 - Resiliencia (26%)/RDS/1 - O que e|RDS]] · [[2 - Resiliencia (26%)/Aurora/1 - O que e|Aurora]] · [[4 - Custo (20%)/04 - Dominio 4 - Design Cost-Optimized Architectures (20%)|Custo (dominio 4)]]
- [Componentes do DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.CoreComponents.html)
