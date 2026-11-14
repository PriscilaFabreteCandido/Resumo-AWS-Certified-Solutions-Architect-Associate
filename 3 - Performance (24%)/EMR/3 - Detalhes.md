---
tags: [saa-c03, emr, detalhes]
servico: Amazon EMR
atualizado: 2026-11-08
---

# EMR — Detalhes

## 1. Quando o EMR vence o Glue e o Athena

O critério está na doc: EMR para *"custom code to process and analyze extremely large datasets with the latest big data processing frameworks such as Spark, Hadoop, Presto, or Hbase"*, com *"full control over the configuration of your clusters and the software installed on them"*.

Traduzindo para os gatilhos que a prova usa:

| Gatilho | Por que EMR |
|---|---|
| **Framework nomeado** (Spark, Hadoop, Hive, Presto, HBase) | Só o EMR roda esses |
| **Versão específica** do framework | Controle do software instalado |
| **Bibliotecas/configuração** customizadas | Bootstrap actions e configurações do cluster |
| **Spot** para reduzir o custo do processamento | Task nodes em Spot |
| Migração de um cluster Hadoop **on-premises** | Compatibilidade de ecossistema |

Se o enunciado diz apenas "transformar dados" ou "ETL", sem nomear framework, a resposta tende a ser **Glue** (serverless, menos esforço).

## 2. Os três tipos de nó — e o padrão de Spot

**Master node** coordena. Perder o master **derruba o cluster**. Nunca Spot.

**Core nodes** processam **e** guardam o **HDFS**. Perder um core node por interrupção de Spot arrisca blocos do HDFS. Evite Spot aqui (ou aceite o risco com replicação alta).

**Task nodes** **só processam** — não guardam HDFS. É onde o Spot pertence: se um for interrompido, o framework redistribui a tarefa.

A recomendação da doc confirma: *"use On-Demand Instances in one group for guaranteed processing power together with Spot Instances in another group"*. E o ganho: *"as low as a tenth of on-demand pricing in some cases"*.

> [!important] O padrão de custo que a prova espera
> **Master + core em On-Demand (ou Reserved); task nodes em Spot.**

## 3. HDFS × EMRFS — e o cluster transiente

**HDFS** vive nos discos dos core nodes: rápido, mas **morre com o cluster**.

**EMRFS** usa o **S3**: *"EMRFS uses S3 as a data layer... so that you can separate your compute and storage."*

Essa separação habilita o padrão mais econômico do EMR:

```
S3 (entrada)  →  CLUSTER TRANSIENTE  →  S3 (saída)
                 (sobe, roda os steps,
                  e se autodestrói)
```

> *"If you configure your cluster to be automatically terminated, it is terminated after all the steps complete. This is referred to as a transient cluster."*

Você paga **só o tempo de processamento**. O HDFS, nesse desenho, serve apenas como **scratch intermediário** entre etapas.

Cluster **long-running** se justifica para consultas interativas (Hive/Presto durante o dia) ou para **HBase** (que precisa de estado contínuo).

## 4. Opções de deployment

| Opção | Detalhe |
|---|---|
| **EMR on EC2** | O clássico: você escolhe tipos de instância e grupos |
| **EMR Serverless** | Sem dimensionar cluster (⚠️ a doc lida **não** detalha) |
| **EMR on EKS** | Roda os jobs em containers num cluster EKS (⚠️ também não detalhado na doc lida) |

Para a prova, o essencial é **EMR on EC2** com o padrão de Spot nos task nodes.

## 5. Integração com o resto do data lake

| Integração | Para quê |
|---|---|
| **S3 (EMRFS)** | Entrada e saída; separa compute de storage |
| **Glue Data Catalog** | Metastore compartilhado com Athena e Redshift Spectrum |
| **Lake Formation** | Respeita as permissões finas (EMR está na lista oficial) |
| **FSx for Lustre** | Throughput de HPC para o dataset, com bucket S3 vinculado |
| **Kinesis / MSK** | Fonte de streaming (Spark Streaming) |
| **Athena** | Consulta o resultado — *"supports many of the same data formats as Amazon EMR"* |

## 6. Segurança

| Controle | Detalhe |
|---|---|
| **VPC** | Cluster em subnet privada, com security groups |
| **Criptografia** | KMS em repouso (EBS, EMRFS/S3) e em trânsito |
| **IAM** | Service role, instance profile, e roles por usuário |
| **Lake Formation** | Permissão por coluna/linha no catálogo |
| **Kerberos** | Autenticação no cluster |

## 7. Custo — as alavancas

| Alavanca | Efeito |
|---|---|
| **Cluster transiente** | Paga só o processamento |
| **Spot em task nodes** | *"as low as a tenth of on-demand pricing"* |
| **Reserved / Savings Plans** | Para master e core de cluster long-running |
| **EMRFS (S3)** em vez de HDFS grande | Storage muito mais barato |
| **Graviton** | Melhor preço/performance |
| **Instance fleets** | Mistura tipos e purchase options automaticamente |

## Links

- [[3 - Performance (24%)/EMR/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/EMR/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/EMR/4 - Questoes|4 - Questoes]]
- [[3 - Performance (24%)/Glue/1 - O que e|Glue]] · [[3 - Performance (24%)/Athena/1 - O que e|Athena]] · [[3 - Performance (24%)/Redshift/1 - O que e|Redshift]] · [[3 - Performance (24%)/S3/1 - O que e|S3]] · [[3 - Performance (24%)/FSx/1 - O que e|FSx]] · [[3 - Performance (24%)/Lake Formation/1 - O que e|Lake Formation]] · [[4 - Custo (20%)/Opcoes de compra do EC2 (Spot, RI, Savings Plans)/1 - O que e|Opcoes de compra do EC2 (Spot, RI, Savings Plans)]] · [[2 - Resiliencia (26%)/AWS Batch/1 - O que e|AWS Batch]]
