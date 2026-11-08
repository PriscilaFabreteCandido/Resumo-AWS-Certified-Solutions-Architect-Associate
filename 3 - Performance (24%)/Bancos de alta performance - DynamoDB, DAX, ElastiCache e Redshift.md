---
tags: [saa-c03, dominio-3, dynamodb, dax, elasticache, redshift]
dominio: 3
tasks: [3.3]
atualizado: 2026-11-08
---

# Bancos de alta performance — DynamoDB, DAX, ElastiCache e Redshift

## 🧩 Em 30 segundos

| Precisa de | Serviço |
|---|---|
| Chave-valor com escala ilimitada e latência de ms | **DynamoDB** |
| DynamoDB ainda mais rápido (cache em memória, na VPC) | **DAX** |
| DynamoDB multi-região **ativo-ativo** | **Global Tables** |
| Cache de banco relacional, sessão, leaderboard | **ElastiCache** (Redis ou Memcached) |
| Data warehouse / OLAP / BI em petabytes | **Redshift** |
| SQL direto no S3, sem cluster | **Athena** |
| Grafo | **Neptune** · MongoDB → **DocumentDB** · Cassandra → **Keyspaces** |

**1 RCU** = 1 leitura **forte** de 4 KB **ou 2 eventuais**. **1 WCU** = 1 escrita de 1 KB. Item máximo **400 KB**.

## 🧠 Teste-se primeiro

> [!question]- GSI × LSI — a tabela completa
> | | **GSI** | **LSI** |
> |---|---|---|
> | Chave | partition key simples **ou** composta | **sempre composta**, com a **mesma** partition key da tabela |
> | Criação | **na criação ou depois**; pode ser deletado | **só na criação**; não pode ser adicionado nem removido |
> | Quantidade | **20** por tabela (default) | **5** por tabela |
> | Tamanho | *"no size restrictions"* | **10 GB** por valor de partition key |
> | Consistência | *"eventual consistency only"* | **eventual ou forte** |
> | Capacidade | **própria** (RCU/WCU do índice) | consome a da **tabela base** |
> | Atributo não projetado | **não** devolve | **busca na tabela** automaticamente |
> | Escopo da query | *"over the entire table, across all partitions"* | *"over a single partition"* |

> [!question]- DAX: o que ele cacheia e o que ele não resolve?
> Dois caches: **item cache** (resultados de `GetItem` e `BatchGetItem`, TTL padrão **5 minutos**) e **query cache** (resultados de `Query` e `Scan`, TTL definido na criação do cluster). Evicção **LRU**, não configurável.
> É **write-through**: *"The operation is successful only if the data is successfully written to both the table and to DAX."*
> ⚠️ **Leitura forte não é cacheada**: *"DAX passes the request through to DynamoDB. The results from DynamoDB are not cached in DAX."*
> Roda **dentro da VPC** (*"designed to run within an Amazon Virtual Private Cloud"*).

> [!question]- Redis × Memcached no ElastiCache
> **Redis**: replicação, failover automático (Multi-AZ), persistência, snapshot, estruturas de dados (list, set, sorted set, hash), pub/sub, transações, cluster mode com sharding. Escolha quando precisa de **durabilidade, HA ou estrutura de dados**.
> **Memcached**: multithread, simples, só chave-valor, **sem** replicação, **sem** persistência, escala horizontal por adicionar nós. Escolha quando precisa de **cache simples e barato** que pode ser perdido.
>
> Enunciado com "leaderboard", "sorted set", "pub/sub", "sessão que não pode ser perdida", "failover" → **Redis**.

> [!question]- Estratégias de cache (o guia pede "caching strategies")
> **Lazy loading / cache-aside**: lê do cache; se não achar (miss), busca no banco e grava no cache. Só armazena o que é pedido — mas o primeiro acesso é lento e o dado pode ficar velho.
> **Write-through**: grava no cache a cada escrita no banco. Cache sempre fresco, mas gasta espaço com dado nunca lido e encarece a escrita.
> **TTL**: expira a entrada; é o que limita a validade em qualquer das duas.
> A prática comum é **lazy loading + TTL** (e write-through para o dado quente).

## DynamoDB — números e features

| Item | Valor |
|---|---|
| Item | **400 KB** (nome + valor dos atributos contam) |
| Partition key | **1 a 2048 bytes** · Sort key **1 a 1024 bytes** |
| Aninhamento | até **32 níveis** |
| Query/Scan | resultado de **1 MB** por chamada |
| Transação | **100** itens e **4 MB** |
| `BatchGetItem` | **100** itens / 16 MB · `BatchWriteItem` **25** itens / 16 MB |
| Capacidade por tabela | **40.000 RCU** e **40.000 WCU** |
| Modo padrão | **On-demand** — *"the default and recommended throughput option for most DynamoDB workloads"* |
| Auto scaling (provisionado) | alvo recomendado **70%**; dispara após **2 minutos consecutivos** acima do alvo |
| Troca de modo | provisionado → on-demand **4 vezes** em 24 h; on-demand → provisionado a qualquer momento |
| Streams | registros vivem **24 horas** |
| PITR | **1 a 35 dias**; restaura **sempre em tabela nova**; `LatestRestorableDateTime` ≈ 5 min atrás |
| TTL | atributo **Number** em epoch de **segundos**; apaga *"within a few days"*; a primeira exclusão **não consome WCU** |
| Global Tables | **multi-ativo**: *"Any global table replica can serve reads and writes"*. **MREC** (eventual, padrão) ou **MRSC** (forte). Resolução de conflito **last-writer-wins**. O modo **não pode ser alterado** depois |

> [!warning] Scan × Query
> **Query** usa a chave e lê só a partição necessária. **Scan** lê a **tabela inteira** e filtra depois — consome capacidade de tudo que leu.
> Enunciado com "performance ruim", "consumo alto de RCU", "a aplicação faz Scan" → a resposta é **modelar um índice (GSI) e usar Query**, não aumentar a capacidade.
>
> Filtro não economiza: o `FilterExpression` é aplicado **depois** da leitura. Você paga pelo que foi lido, não pelo que voltou.

## Redshift

- **OLAP**, baseado em PostgreSQL: *"optimized for high-performance analysis and reporting of very large datasets"*.
- **Leader node** (quando há 2+ compute nodes) + **compute nodes** divididos em **slices**.
- **Redshift Managed Storage**: *"scale your storage to petabytes using Amazon S3 storage"*, com compute e storage escalando **independentemente** e cache local em SSD.
- **Redshift Spectrum**: *"query and retrieve structured and semi-structured data from files in Amazon S3 without having to load the data into Amazon Redshift tables"*. Em RA3, roda em *"a dedicated server fleet outside of the cluster"*; em RG e Serverless, usa a própria compute do cluster. Tabelas externas vêm do **Glue Data Catalog** (ou do catálogo do Athena, ou de um Hive metastore).
- **Concurrency scaling**: *"automatically adds additional cluster capacity to process an increase in both read and write queries"*, configurado por fila do WLM. Cobrado *"only for the time they're actively running queries"*; padrão **1** cluster adicional.
- **Distribution style** e **sort key** definem performance; **AQUA** e compressão por coluna completam.

> [!tip] Redshift × Athena × EMR
> **Redshift**: data warehouse persistente, BI recorrente, joins complexos, concorrência alta.
> **Athena**: consulta **ad-hoc** no S3, serverless, paga por TB escaneado. Sem cluster para manter.
> **EMR**: quando você precisa de **código** (Spark, Hadoop) e controle do cluster.
> **Spectrum**: quando **já tem** Redshift e quer alcançar o S3 sem carregar.

## ❓ Questões de prova

> [!example]- Q1 — Uma tabela DynamoDB precisa ser consultada por um atributo que **não** é a chave, e a consulta tem que varrer toda a tabela hoje. Qual mudança?
> **A)** Aumentar as RCUs provisionadas
> **B)** **Criar um global secondary index com esse atributo como partition key e usar Query** ✅
> **C)** Criar um local secondary index
> **D)** Habilitar DAX
>
> **Por que B**: GSI permite query *"over the entire table, across all partitions"* por uma chave diferente — e pode ser **criado numa tabela existente**.
> **A errada**: paga mais pelo mesmo Scan ruim.
> **C errada**: **LSI só pode ser criado junto com a tabela** e exige a **mesma partition key** da base.
> **D errada**: DAX cacheia resultado de Scan/Query, mas não corrige o padrão de acesso — o primeiro Scan continua lendo tudo, e o dado muda.

> [!example]- Q2 — Uma aplicação de jogos precisa de um ranking em tempo real, com operações de ordenação por pontuação e failover automático. Qual serviço?
> **A)** **ElastiCache for Redis** ✅
> **B)** ElastiCache for Memcached
> **C)** DynamoDB com GSI
> **D)** DAX
>
> **Por que A**: **sorted set** é estrutura nativa do Redis, que também dá replicação e failover automático.
> **B errada**: Memcached é só chave-valor, **sem** replicação, **sem** estruturas de dados.
> **C errada**: funciona, mas sem a semântica de ranking em memória; latência maior e modelagem mais complexa.
> **D errada**: DAX acelera DynamoDB; não oferece estrutura de dados nem ranking.

> [!example]- Q3 — Uma tabela DynamoDB atende leitura intensa de itens individuais com latência de milissegundos, mas o time precisa de **microssegundos** sem mudar o modelo de dados. Qual solução, e qual a limitação?
> **A)** Aumentar as RCUs
> **B)** **Adicionar um cluster DAX na frente da tabela — lembrando que leitura fortemente consistente passa direto e não é cacheada** ✅
> **C)** ElastiCache for Redis como cache-aside
> **D)** Global Tables
>
> **Por que B**: DAX é o cache nativo do DynamoDB, com API compatível (mudança mínima na aplicação) e write-through.
> **A errada**: RCU resolve throughput, não latência de leitura.
> **C errada**: funciona, mas você implementa a lógica de cache-aside, invalidação e serialização — mais esforço que o DAX.
> **D errada**: Global Tables resolve **geografia**, não latência local.
>
> ⚠️ A pegadinha a fixar: se a aplicação exige **leitura fortemente consistente**, DAX **não** entrega microssegundos para ela.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| 1 RCU = 1 leitura | 1 leitura **forte** de 4 KB **ou 2 eventuais** |
| O padrão da API é leitura forte | O padrão é **eventual** |
| Posso adicionar LSI depois | **Não.** Só GSI |
| GSI faz leitura forte | *"eventual consistency only"* |
| GSI consome capacidade da tabela | Tem capacidade **própria**. LSI é que consome da tabela |
| GSI devolve atributo não projetado | Não. **LSI** busca na tabela |
| FilterExpression economiza RCU | É aplicado **depois** da leitura |
| DAX acelera leitura forte | **Passa direto e não cacheia** |
| DAX é fora da VPC | Roda **dentro** da VPC |
| Memcached tem failover | **Não.** Redis tem |
| PITR restaura no lugar | *"always restores to a new table"* |
| Global Tables é ativo-passivo | É **multi-ativo** |
| Posso mudar o modo de consistência do Global Table depois | *"You cannot change a global table's consistency mode after creation"* |
| Redshift é OLTP | É **OLAP** |
| Redshift Spectrum dispensa cluster | É **feature do Redshift** — precisa de cluster ou workgroup Serverless |
| TTL do DynamoDB apaga na hora | *"within a few days"* — filtre os expirados em Scan/Query |

## Links

- [[03 - Dominio 3 - Design High-Performing Architectures (24%)]]
- [[Bancos resilientes - RDS, Aurora e read replicas]]
- [[Custo de banco de dados]]
- [[Ingestao e transformacao - Kinesis, Glue, Athena e EMR]]
- [Índices secundários no DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/SecondaryIndexes.html)
- [Conceitos do DAX](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.concepts.html)
