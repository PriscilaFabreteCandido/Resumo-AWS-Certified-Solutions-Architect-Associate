---
tags: [saa-c03, bancos-especializados, detalhes]
servico: Bancos especializados
atualizado: 2026-11-08
---

# Bancos especializados — Detalhes

## 1. Amazon Neptune — grafo

Banco de **grafo** gerenciado, com suporte a **Gremlin**, **openCypher** e **SPARQL**.

Por que não SQL: uma consulta como *"ache todos os amigos de amigos que compraram o produto X nos últimos 30 dias"* exige, em SQL, joins recursivos cujo custo cresce exponencialmente com a profundidade. Num banco de grafo, percorrer arestas é a operação nativa.

Casos de uso que a prova usa:
- **Rede social** (amigos, seguidores, recomendação)
- **Detecção de fraude** (conexões entre contas, dispositivos, endereços)
- **Grafo de conhecimento** (ontologias, catálogos relacionados)
- **Motor de recomendação** ("quem comprou isto também comprou")
- **Segurança de rede** (caminhos de ataque)

Arquitetura semelhante ao Aurora: cluster com primária e réplicas de leitura, storage distribuído em múltiplas AZs. Suportado pelo **AWS Backup**.

## 2. Amazon DocumentDB — documento (MongoDB)

Banco de **documento** compatível com a **API do MongoDB**. O gatilho é mecânico: o enunciado menciona **MongoDB** → DocumentDB.

Vale a mesma lógica do **Amazon MQ** e do **MSK**: o serviço existe para quem **já tem** código e drivers daquele ecossistema e quer migrar **sem reescrever**.

Para aplicação **nova** de documento na AWS, **DynamoDB** costuma ser a resposta (serverless, escala ilimitada, mais barato em pequena escala) — a menos que o enunciado exija recursos específicos de MongoDB (agregações complexas, índices de texto).

Suportado pelo **AWS Backup**.

## 3. Amazon Keyspaces — wide-column (Cassandra)

Compatível com **Apache Cassandra** e **CQL**, mas **serverless**: sem nós para dimensionar, com capacidade on-demand ou provisionada.

Gatilho: o enunciado menciona **Cassandra** ou **CQL**.

A vantagem sobre rodar Cassandra em EC2 é exatamente a que o guia valoriza: elimina o esforço operacional de um cluster distribuído (anéis, replicação, compaction, reparo).

## 4. Amazon Timestream — série temporal

Banco de **série temporal**: dados que são `(métrica, timestamp, valor, dimensões)`.

Por que não RDS: série temporal tem três características que quebram um relacional genérico —
1. **Volume de escrita** altíssimo e contínuo
2. **Dados recentes** são consultados com frequência; **antigos**, raramente
3. Consultas são sempre **por janela de tempo**, com funções de interpolação e agregação

O Timestream resolve com **storage em camadas** (memória para o recente, magnético para o histórico) e funções de série temporal nativas.

Gatilho: **sensores, IoT, métricas de aplicação, telemetria, DevOps monitoring**.

O guia cita em **Task 4.3**: *"Determining cost-effective AWS database types (for example, **time series format**, columnar format)"*. A versão suportada pelo AWS Backup é **Timestream for LiveAnalytics**.

## 5. A tabela de decisão completa

| Modelo de dados | Serviço | Alternativa genérica (e por que é pior) |
|---|---|---|
| **Relacional** | RDS / Aurora | — |
| **Chave-valor** | **DynamoDB** | RDS: não escala igual, custa mais |
| **Documento** | **DocumentDB** | DynamoDB serve, mas sem API MongoDB |
| **Wide-column** | **Keyspaces** | Cassandra em EC2: esforço operacional |
| **Grafo** | **Neptune** | SQL: joins recursivos exponenciais |
| **Série temporal** | **Timestream** | RDS: storage caro, consulta por janela lenta |
| **In-memory** | **ElastiCache** | — |
| **Analítico colunar** | **Redshift** | RDS: não escala para petabytes |
| **Busca textual / log** | **OpenSearch** | SQL `LIKE`: lento e sem relevância |

## 6. Como a prova monta a questão

O padrão é descrever o **problema de negócio** sem nomear o serviço, e oferecer uma alternativa com o banco **correto** e duas ou três com bancos genéricos adaptados:

> *"Uma aplicação precisa identificar conexões suspeitas entre contas, dispositivos e endereços, percorrendo até 5 níveis de relacionamento, com baixa latência."*

- RDS PostgreSQL com CTEs recursivas ❌ (funciona, não escala)
- DynamoDB com GSI ❌ (não percorre grafo)
- **Neptune** ✅
- Redshift ❌ (analítico, não baixa latência)

## Links

- [[3 - Performance (24%)/Bancos especializados (Neptune, DocumentDB, Keyspaces, Timestream)/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/Bancos especializados (Neptune, DocumentDB, Keyspaces, Timestream)/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/Bancos especializados (Neptune, DocumentDB, Keyspaces, Timestream)/4 - Questoes|4 - Questoes]]
- [[3 - Performance (24%)/DynamoDB/1 - O que e|DynamoDB]] · [[2 - Resiliencia (26%)/RDS/1 - O que e|RDS]] · [[2 - Resiliencia (26%)/Aurora/1 - O que e|Aurora]] · [[3 - Performance (24%)/Redshift/1 - O que e|Redshift]] · [[3 - Performance (24%)/OpenSearch Service/1 - O que e|OpenSearch Service]] · [[3 - Performance (24%)/ElastiCache/1 - O que e|ElastiCache]] · [[1 - Seguranca (30%)/AWS Backup/1 - O que e|AWS Backup]] · [[4 - Custo (20%)/04 - Dominio 4 - Design Cost-Optimized Architectures (20%)|Custo (dominio 4)]]
