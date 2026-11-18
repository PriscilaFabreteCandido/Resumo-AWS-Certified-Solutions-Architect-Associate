---
tags: [saa-c03, redshift, decorar]
servico: Amazon Redshift
atualizado: 2026-11-08
---

# Redshift — Decorar

## O que decorar sobre a arquitetura

| Fato | Detalhe |
|---|---|
| Natureza | **OLAP**, colunar, baseado em **PostgreSQL** |
| **Leader node** | Só quando há **2 ou mais** compute nodes |
| **Compute nodes** | Divididos em **node slices** |
| **Redshift Managed Storage** | Escala para **petabytes** usando **S3**, com cache local SSD |
| Compute × storage | **Escalam independentemente** |
| Multi-AZ | A doc de arquitetura **não informa**; historicamente o cluster é **single-AZ** (há opção Multi-AZ em configurações RA3) |

## Redshift Spectrum

> *"you can efficiently query and retrieve structured and semi-structured data from files in Amazon S3 without having to load the data into Amazon Redshift tables."*

| Fato | Detalhe |
|---|---|
| Onde roda | Em **RA3**: *"a dedicated server fleet outside of the cluster"* (uma frota de servidores dedicada, fora do cluster). Em **RG** e **Serverless**: *"an integrated data lake query engine that runs on the cluster's own compute resources"* (um motor de consulta de data lake integrado, que roda nos próprios recursos de computação do cluster) |
| Catálogo | **AWS Glue Data Catalog**, catálogo do Athena, ou Hive metastore próprio |
| Escala | *"can potentially use thousands of instances"* (pode chegar a usar milhares de instâncias) |
| Concorrência | Vários clusters podem consultar o **mesmo** dataset no S3 |
| ⚠️ Limitação | **Não** suporta operações de **update** em tabelas externas |

## Concurrency scaling

> *"automatically adds additional cluster capacity to process an increase in both read and write queries"*

| Fato | Detalhe |
|---|---|
| Como funciona | *"eligible queries are sent to the concurrency-scaling cluster instead of waiting in a queue"* (as consultas elegíveis são enviadas ao cluster de concurrency scaling em vez de esperar numa fila) |
| Configuração | Por fila do **WLM** (*"Concurrency Scaling mode"* (modo Concurrency Scaling) = `auto`) |
| Cobrança | *"only for the time they're actively running queries"* (somente pelo tempo em que estão de fato executando consultas) |
| Clusters adicionais padrão | **um** (controlado por `max_concurrency_scaling_clusters`) |
| Operações de escrita suportadas | **COPY, INSERT, DELETE, UPDATE, CTAS, VACUUM** |
| Node types exigidos | `rg.*` e `ra3.*` (lista na doc); **máx. 32** compute nodes |
| **Não** suportado | cluster de **nó único**, interleaved sort keys, tabelas temporárias, UDFs Python e Lambda |

## Performance

| Alavanca | O que faz |
|---|---|
| **Distribution style** | Como as linhas se distribuem entre slices (KEY, ALL, EVEN, AUTO) |
| **Sort key** | Ordem física dos dados — acelera filtro por faixa |
| **Compressão por coluna** | Reduz I/O (é colunar) |
| **Concurrency scaling** | Absorve pico de concorrência |
| **Spectrum** | Alcança o S3 sem carregar |
| **Workload Management (WLM)** | Filas e prioridade de query |

## Links

- [[3 - Performance (24%)/Redshift/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/Redshift/3 - Detalhes|3 - Detalhes]] · [[3 - Performance (24%)/Redshift/4 - Questoes|4 - Questoes]]
