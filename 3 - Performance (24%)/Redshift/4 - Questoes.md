---
tags: [saa-c03, redshift, questoes]
servico: Amazon Redshift
atualizado: 2026-11-08
---

# Redshift — Questões

> [!question]- Q1. Relatórios de BI sobre 5 anos de vendas (petabytes), com joins complexos e 200 analistas concorrentes.
> **A)** RDS PostgreSQL com read replicas
> **B)** **Amazon Redshift** ✅
> **C)** DynamoDB com GSI
> **D)** Athena sobre CSV no S3
>
> **Por que B**: data warehouse colunar, *"optimized for high-performance analysis and reporting of very large datasets"* (otimizado para análise e relatórios de alta performance sobre conjuntos de dados muito grandes), com WLM e concurrency scaling para a concorrência.
> **A errada**: relacional por linha não escala para analítico em petabytes.
> **C errada**: DynamoDB não faz join nem agregação.
> **D errada**: Athena serve ad-hoc; para BI recorrente com 200 usuários e joins complexos, o Redshift é o indicado (e CSV ainda seria caro por TB escaneado).

> [!question]- Q2. As queries ficam em fila nos horários de pico, embora o cluster esteja dimensionado para a média.
> **A)** Adicionar compute nodes permanentemente
> **B)** **Habilitar concurrency scaling na fila do WLM** ✅
> **C)** Mudar o distribution style para EVEN
> **D)** Migrar para Athena
>
> **Por que B**: *"eligible queries are sent to the concurrency-scaling cluster instead of waiting in a queue"* (as consultas elegíveis são enviadas ao cluster de concurrency scaling em vez de esperar numa fila), e você paga *"only for the time they're actively running queries"* (somente pelo tempo em que estão de fato executando consultas).
> **A errada**: paga capacidade de pico 24/7.

> [!question]- Q3. Dados históricos de 3 anos estão no S3 e precisam ser consultados **junto** com os dados quentes do Redshift.
> **A)** Carregar tudo no Redshift com COPY
> **B)** **Redshift Spectrum, com tabelas externas sobre o S3** ✅
> **C)** Athena, separadamente
> **D)** Glue para copiar para o Redshift
>
> **Por que B**: *"query and retrieve... data from files in Amazon S3 without having to load the data into Amazon Redshift tables"* (consultar e recuperar... dados de arquivos no Amazon S3 sem precisar carregá-los em tabelas do Amazon Redshift) — e permite **join** entre tabela interna e externa.
> **A errada**: paga storage de nó para dado frio.
> **C errada**: Athena não faz join com as tabelas internas do cluster.

> [!question]- Q4. Uma tabela de dimensão pequena é usada em join com uma tabela de fatos enorme, e o join está lento por redistribuição.
> **A)** Distribution style EVEN na dimensão
> **B)** **Distribution style ALL na tabela de dimensão** ✅
> **C)** Sort key na tabela de fatos
> **D)** Concurrency scaling
>
> **Por que B**: `ALL` copia a dimensão em todos os nós, eliminando a redistribuição no join.
> **C errada**: sort key acelera **filtro de faixa**, não o join.

> [!question]- Q5. Um sistema de pedidos precisa inserir e atualizar registros com baixa latência, milhares de transações por segundo.
> **A)** Redshift
> **B)** **RDS/Aurora (ou DynamoDB)** ✅
> **C)** Redshift Serverless
> **D)** Redshift com concurrency scaling
>
> **Por que B**: Redshift é **OLAP**. Transação é OLTP.
> ⚠️ A pegadinha é a frase da doc: o Redshift **tem** funções OLTP, mas é *"optimized for... analysis and reporting"* (otimizado para... análise e relatórios).

> [!question]- Q6. Um cluster de **nó único** precisa de concurrency scaling.
> **A)** Habilitar no WLM
> **B)** **Não é suportado em cluster de nó único** ✅
> **C)** Aumentar `max_concurrency_scaling_clusters`
> **D)** Usar Spectrum
>
> **Por que B**: a doc lista cluster de nó único entre os não suportados (junto com interleaved sort keys, tabelas temporárias e UDFs Python/Lambda).

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Redshift serve para OLTP | É **OLAP**. Transação = RDS/Aurora/DynamoDB |
| Redshift Spectrum dispensa cluster | É **feature do Redshift** — precisa de cluster ou workgroup Serverless |
| Spectrum permite UPDATE em tabela externa | **Não suporta** update em externas |
| Concurrency scaling é cobrado sempre | Só *"for the time they're actively running queries"* (pelo tempo em que estão de fato executando consultas) |
| Concurrency scaling funciona em qualquer cluster | **Não** em nó único, nem com interleaved sort key / temp table / UDF Python-Lambda |
| Leader node sempre existe | Só com **2 ou mais** compute nodes |
| Storage e compute escalam juntos | Com **RMS**, escalam **independentemente** |
| Athena e Redshift são intercambiáveis | Athena = ad-hoc serverless; Redshift = warehouse com concorrência e joins |
| Firehose grava direto no Redshift | Grava no **S3 primeiro**, depois emite `COPY` |

## Links

- [[3 - Performance (24%)/Redshift/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/Redshift/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/Redshift/3 - Detalhes|3 - Detalhes]]
