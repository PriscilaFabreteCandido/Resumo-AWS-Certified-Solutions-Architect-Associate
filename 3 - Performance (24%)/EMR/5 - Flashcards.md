---
servico: Amazon EMR
fonte: "[[3 - Performance (24%)/EMR/2 - Decorar|2 - Decorar]]"
---

# EMR — Flashcards

#flashcards/saa-c03/d3-performance/emr

Frameworks de big data suportados pelo EMR?::**Hadoop, Spark, Hive, Pig, Presto, HBase**

Três tipos de nó do EMR?::**Master** (coordena), **Core** (processa e guarda HDFS), **Task** (só processa)

Em qual tipo de nó do EMR o Spot é recomendado?::**Task** nodes

Por que não usar Spot no master node do EMR?::Perder o master **mata o cluster**

Por que evitar Spot nos core nodes do EMR?::Eles guardam o **HDFS**; perder o nó arrisca o dado

Economia que o Spot pode trazer no EMR, segundo a doc?::Até **um décimo** do preço On-Demand em alguns casos

O que é um cluster transiente no EMR?::Cluster que **encerra sozinho** após todos os steps; paga só o processamento

Storage obrigatório num cluster transiente do EMR?::**EMRFS (S3)**

Quando usar cluster long-running no EMR?::Consultas **interativas** e **HBase**

HDFS × EMRFS: qual persiste depois que o cluster acaba?::**EMRFS** (dados no S3); HDFS fica nos discos dos core nodes e **some**

Vantagem do EMRFS em arquitetura?::**Separa computação de armazenamento**

EMR × Glue: qual dá controle total do cluster?::**EMR** (Glue é serverless, sem controle)

Como cobram EMR, Glue e Athena?::EMR: **instâncias**; Glue: **DPU-hora**; Athena: **TB escaneado**
