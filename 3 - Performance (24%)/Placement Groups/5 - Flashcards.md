---
servico: EC2 Placement Groups
fonte: "[[3 - Performance (24%)/Placement Groups/2 - Decorar|2 - Decorar]]"
---

# Placement Groups — Flashcards

#flashcards/saa-c03/d3-performance/placement-groups

Placement group para latência mínima entre instâncias (HPC, MPI)?::**Cluster** (junta tudo em **1 AZ**)

Placement group para poucas instâncias críticas em hardware distinto?::**Spread**

Placement group para HDFS, HBase, Cassandra, Kafka?::**Partition** (partições com racks próprios)

Limite do spread placement group?::**7 instâncias por AZ** (3 AZs = 21 instâncias)

Limite do partition placement group?::**7 partições por AZ** (máx. **2** com Dedicated Instances)

Spread placement group com Dedicated Instances?::**Não suportado**

Fluxo único máximo dentro e fora de um cluster placement group?::Dentro **10 Gbps**; fora (e internet/Direct Connect) **5 Gbps**

Tipos de instância que não suportam cluster placement group?::**T2, Mac1, M7i-flex**

Recomendação de tipo de instância num cluster placement group?::Usar o **mesmo tipo** de instância

Custo de um placement group?::**Grátis**

Em quantos placement groups uma instância pode estar, e dá para fundir grupos?::Em **um só**; **não** dá para fundir

Dedicated Hosts podem ser lançados em placement group?::**Não**

Onde existe spread em nível de host?::**Só em Outposts**

Combinação para HPC de verdade com placement group?::**Cluster** + família **Hpc** + **EFA** + **ENA**
