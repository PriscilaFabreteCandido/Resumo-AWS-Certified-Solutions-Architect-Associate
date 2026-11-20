---
tags: [saa-c03, emr, questoes]
servico: Amazon EMR
atualizado: 2026-11-08
---

# EMR — Questões

> [!question] Q1. Um job **Spark** customizado processa 50 TB por noite. Como reduzir o custo ao máximo?
> **A)** Cluster long-running com Reserved Instances
> **B)** Cluster transiente, com EMRFS no S3, master e core em On-Demand e task nodes em Spot
> **C)** Migrar para Glue
> **D)** Todos os nós em Spot
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: cluster transiente paga só o processamento; Spot nos **task nodes** dá *"as low as a tenth of on-demand pricing"* (até um décimo do preço sob demanda) sem arriscar o HDFS nem o master.
> > **A errada**: paga 24/7 para um job noturno.
> > **C errada**: o enunciado diz **código Spark customizado** — critério da doc para EMR.
> > **D errada**: perder o **master** derruba o cluster; perder **core** arrisca o HDFS.

> [!question] Q2. Em quais nós do EMR usar Spot?
> **A)** Todos
> **B)** Master e core
> **C)** Task nodes
> **D)** Nenhum
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: task nodes **só processam**. A doc recomenda *"use On-Demand Instances in one group for guaranteed processing power together with Spot Instances in another group"* (use instâncias sob demanda num grupo, para poder de processamento garantido, junto com instâncias Spot em outro grupo).

> [!question] Q3. O cluster precisa de uma versão específica do **HBase** e de bibliotecas próprias.
> **A)** Glue job com Ray
> **B)** Amazon EMR
> **C)** Athena Spark
> **D)** AWS Batch
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"full control over the configuration of your clusters and the software installed on them"* (controle total sobre a configuração dos seus clusters e sobre o software instalado neles), e HBase está entre os frameworks suportados.

> [!question] Q4. Por que usar **EMRFS** em vez de HDFS para os dados de entrada e saída?
> **A)** É mais rápido que HDFS
> **B)** Os dados persistem depois que o cluster é encerrado, separando compute de storage
> **C)** É obrigatório no EMR
> **D)** Permite usar Spot no master
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"EMRFS uses S3 as a data layer... so that you can separate your compute and storage."* (o EMRFS usa o S3 como camada de dados... para que você separe computação de armazenamento) É o que habilita o cluster transiente.
> > **A errada**: HDFS local costuma ser mais rápido — por isso serve de **scratch** intermediário.

> [!question] Q5. ETL rotineiro de CSV para Parquet, sem framework específico, com o menor esforço operacional.
> **A)** EMR com cluster transiente
> **B)** AWS Glue
> **C)** EMR on EKS
> **D)** AWS Batch
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: sem framework nomeado e sem necessidade de controle do cluster, o serverless ganha.

> [!question] Q6. Um dataset de 100 TB no S3 precisa ser lido com throughput de centenas de GB/s por um cluster EMR.
> **A)** EMRFS direto no S3
> **B)** FSx for Lustre com o bucket S3 vinculado
> **C)** HDFS nos core nodes
> **D)** EFS com throughput Elastic
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: Lustre é o file system de HPC, e *"transparently presents S3 objects as files"* (apresenta os objetos do S3 como arquivos, de forma transparente) — o dataset fica no S3 e o cluster lê com throughput extremo.
> > **C errada**: exigiria copiar 100 TB para o HDFS primeiro.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Spot em qualquer nó do EMR | **Task nodes.** Master nunca; core arrisca o HDFS |
| HDFS sobrevive ao cluster | **Não.** Para persistir, **EMRFS (S3)** |
| EMR e Glue fazem o mesmo | EMR = **frameworks + controle do cluster**; Glue = **serverless** |
| EMR e Athena são intercambiáveis | Athena é **SQL serverless**; EMR roda **código** |
| Cluster transiente é menos confiável | É o padrão de **custo** para job em lote |
| EMR não usa o Glue Data Catalog | **Pode** usá-lo como metastore |
| EMR não respeita Lake Formation | **Respeita** — está na lista oficial |
| EMR é só Hadoop | **Hadoop, Spark, Hive, Pig, Presto, HBase** |

## Links

- [[3 - Performance (24%)/EMR/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/EMR/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/EMR/3 - Detalhes|3 - Detalhes]]
