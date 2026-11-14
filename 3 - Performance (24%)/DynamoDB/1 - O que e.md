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
| **Table** | A tabela. *"no limit to the number of items you can store"* |
| **Item** | O registro. Máximo **400 KB** |
| **Partition key** | Define **onde** o item mora. Com ela só, *"no two items can have the same partition key value"* |
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

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[DAX]] · [[ElastiCache]] · [[RDS]] · [[Aurora]] · [[Custo de banco de dados]]
- [Componentes do DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/HowItWorks.CoreComponents.html)
