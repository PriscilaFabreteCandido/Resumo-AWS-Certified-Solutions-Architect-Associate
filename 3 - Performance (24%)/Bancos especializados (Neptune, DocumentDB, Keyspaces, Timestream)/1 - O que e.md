---
tags: [saa-c03, neptune, documentdb, keyspaces, timestream, banco]
servico: Bancos especializados
tipo: Purpose-built databases
dominios: [3, 4]
atualizado: 2026-11-08
---

# Bancos especializados — O que é

> [!info] Em uma frase
> Quatro bancos **purpose-built**: cada um existe porque um modelo de dados específico fica caro e lento num banco genérico.

## Os quatro, em uma linha cada

| Serviço | Modelo | Gatilho no enunciado |
|---|---|---|
| **Amazon Neptune** | **Grafo** | "relacionamento", "rede social", "detecção de fraude", "grafo de conhecimento", "recomendação" |
| **Amazon DocumentDB** | **Documento**, compatível com **MongoDB** | "**MongoDB**", "documento JSON", "migrar do MongoDB" |
| **Amazon Keyspaces** | **Wide-column**, compatível com **Cassandra** | "**Cassandra**", "CQL", "migrar do Cassandra" |
| **Amazon Timestream** | **Série temporal** | "série temporal", "métricas de sensores", "IoT", "consulta por janela de tempo" |

## O princípio que a prova testa

O guia repete, duas vezes, a skill: **"Using purpose-built AWS services for workloads"** (em 2.1 e 2.2). E em **Task 4.3** pede *"Determining cost-effective AWS database types (for example, time series format, columnar format)"*.

Tradução: quando uma alternativa usa o serviço **feito para aquilo** e outra usa um banco genérico adaptado, a primeira é a resposta.

| Modelo errado | Custo |
|---|---|
| Grafo em SQL com self-joins recursivos | Query exponencial, impossível de manter |
| Documento em tabelas relacionais normalizadas | Joins caros, schema rígido |
| Série temporal em RDS | Storage caro, consulta por janela lenta |

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[DynamoDB]] · [[RDS]] · [[Aurora]] · [[Redshift]] · [[Custo de banco de dados]]
