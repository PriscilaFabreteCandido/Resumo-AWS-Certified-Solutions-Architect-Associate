---
servico: Amazon Aurora
fonte: "[[2 - Resiliencia (26%)/Aurora/2 - Decorar|2 - Decorar]]"
---

# Aurora — Flashcards

#flashcards/saa-c03/d2-resiliencia/aurora

Quantas cópias dos dados o Aurora mantém e em quantas AZs?::**6 cópias em 3 AZs**, replicação **síncrona**

Máximo de Aurora Replicas num cluster?::**15**

Tamanho máximo do volume de um cluster Aurora?::**128 TiB** (até **256 TiB** em algumas versões de engine)

Tempo de failover do Aurora com réplica e sem réplica?::Com réplica: **menos de 60 s** (muitas vezes menos de 30 s). Sem réplica: normalmente **menos de 10 min**

Faixa de prioridade de failover (promotion tier) no Aurora e qual é a maior?::**Tier 0** (maior) a **15** (menor); em empate, promove a **maior** instância

Quando vale o Aurora I/O-Optimized e com que frequência pode trocar?::Quando I/O é **25% ou mais** da fatura; troca **1 vez a cada 30 dias**

Aurora Global Database: quantas regiões secundárias e lag típico?::Até **10 secundárias**; lag normalmente **abaixo de 1 segundo**

RTO e RPO típicos de failover no Aurora Global Database?::RTO da ordem de **minutos**; RPO medido em **segundos**

Switchover × failover no Aurora Global Database: qual tem RPO zero?::**Switchover** (planejado) tem **RPO = 0**; o failover (desastre) tem RPO em segundos e exige `--allow-data-loss`

Cite limitações do Aurora Global Database.::Sem **Auto Scaling** nas secundárias, sem **Backtrack**, sem parar/iniciar clusters individualmente, sem suporte do **Secrets Manager**

Quanto de memória vale 1 ACU no Aurora Serverless v2?::Cerca de **2 GiB**

Capacidade mínima do Aurora Serverless v2 e granularidade de escala?::Mínimo **0,5 ACU** (ou **0 ACU** com pausa automática); escala em passos de **0,5 ACU**

Quais endpoints do Aurora redirecionam automaticamente no failover?::**Cluster (writer)** e **reader**; o **instance endpoint** não

Endpoint do Aurora para mandar relatórios só para um subconjunto de instâncias?::**Custom endpoint**
