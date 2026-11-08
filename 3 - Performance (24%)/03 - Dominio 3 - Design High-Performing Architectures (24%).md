---
tags: [moc, saa-c03, dominio-3, performance]
dominio: 3
peso: 24%
atualizado: 2026-11-08
---

# ⚡ Domínio 3 — Design High-Performing Architectures (24%)

> [!info] 24% do conteúdo pontuado
> Cerca de **12 das 50 questões**. É o domínio com **mais task statements: cinco**. Cada um é um "qual serviço escolher" num eixo diferente: storage, compute, banco, rede e dados.

## 🧩 Em 30 segundos — os cinco eixos

| Task | Eixo | Pergunta central |
|---|---|---|
| **3.1** | Storage | Objeto, arquivo ou bloco? Qual classe/tipo? |
| **3.2** | Compute | EC2, container ou função? Como escalar? |
| **3.3** | Banco | Relacional ou não? Precisa de cache? De read replica? |
| **3.4** | Rede | Borda, balanceamento, topologia, conectividade híbrida |
| **3.5** | Dados | Como ingerir, transformar e consultar volume grande |

---

## Task 3.1 — Determine high-performing and/or scalable storage solutions

> [!quote] Knowledge of
> - Hybrid storage solutions to meet business requirements
> - Storage services with appropriate use cases (for example, Amazon S3, Amazon EFS, Amazon EBS)
> - Storage types with associated characteristics (for example, object, file, block)

> [!quote] Skills in
> - Determining storage services and configurations that meet performance demands
> - Determining storage services that can scale to accommodate future needs


## Task 3.2 — Design high-performing and elastic compute solutions

> [!quote] Knowledge of
> - AWS compute services with appropriate use cases (for example, AWS Batch, Amazon EMR, AWS Fargate)
> - Distributed computing concepts supported by AWS global infrastructure and edge services
> - Queuing and messaging concepts (for example, publish/subscribe)
> - Scalability capabilities with appropriate use cases (for example, Amazon EC2 Auto Scaling, AWS Auto Scaling)
> - Serverless technologies and patterns (for example, AWS Lambda, Fargate)
> - The orchestration of containers (for example, Amazon ECS, Amazon EKS)

> [!quote] Skills in
> - Decoupling workloads so that components can scale independently
> - Identifying metrics and conditions to perform scaling actions
> - Selecting the appropriate compute options and features (for example, EC2 instance types)
> - Selecting the appropriate resource type and size (for example, the amount of Lambda memory)


## Task 3.3 — Determine high-performing database solutions

> [!quote] Knowledge of
> - AWS global infrastructure (for example, Availability Zones, AWS Regions)
> - Caching strategies and services (for example, Amazon ElastiCache)
> - Data access patterns (for example, read-intensive compared with write-intensive)
> - Database capacity planning (for example, capacity units, instance types, Provisioned IOPS)
> - Database connections and proxies
> - Database engines with appropriate use cases (for example, heterogeneous migrations, homogeneous migrations)
> - Database replication (for example, read replicas)
> - Database types and services (for example, serverless, relational compared with non-relational, in-memory)


## Task 3.4 — Determine high-performing and/or scalable network architectures

> [!quote] Knowledge of
> - Edge networking services with appropriate use cases (for example, Amazon CloudFront, AWS Global Accelerator)
> - How to design network architecture (for example, subnet tiers, routing, IP addressing)
> - Load balancing concepts (for example, Application Load Balancer [ALB])
> - Network connection options (for example, AWS VPN, AWS Direct Connect, AWS PrivateLink)


## Task 3.5 — Determine high-performing data ingestion and transformation solutions

> [!quote] Knowledge of
> - Data analytics and visualization services with appropriate use cases (for example, Amazon Athena, AWS Lake Formation, Amazon Quick)
> - Data ingestion patterns (for example, frequency)
> - Data transfer services with appropriate use cases (for example, AWS DataSync, AWS Storage Gateway)
> - Data transformation services with appropriate use cases (for example, AWS Glue)
> - Secure access to ingestion access points
> - Sizes and speeds needed to meet business requirements
> - Streaming data services with appropriate use cases (for example, Amazon Kinesis)

> [!quote] Skills in
> - Building and securing data lakes
> - Designing data streaming architectures
> - Designing data transfer solutions
> - Implementing visualization strategies
> - Selecting appropriate compute options for data processing (for example, Amazon EMR)
> - Selecting appropriate configurations for ingestion
> - Transforming data between formats (for example, .csv to .parquet)


> [!important] Task 3.5 é a mais subestimada da prova
> Muita gente estuda SAA pensando em EC2, VPC e S3 e cai numa questão sobre **converter CSV para Parquet** ou **qual serviço transforma dado em trânsito**. O guia pede isso **literalmente**: *"Transforming data between formats (for example, .csv to .parquet)"*.
> O mínimo: **Kinesis Data Streams** (tempo real, shards, replay) · **Data Firehose** (entrega com buffer) · **Glue** (ETL serverless + Data Catalog + crawlers) · **Athena** (SQL direto no S3) · **EMR** (Spark/Hadoop com controle) · **Lake Formation** (permissão fina no data lake) · **Amazon Quick** (visualização) · **DataSync** e **Storage Gateway** (transferência).

---

## 🧠 Teste-se primeiro

> [!question]- Objeto × arquivo × bloco: quando cada um?
> **Objeto (S3)**: dado imutável acessado por API HTTP, qualquer volume, data lake, estático, backup. Não é POSIX.
> **Arquivo (EFS, FSx)**: vários clientes montam o mesmo sistema de arquivos, hierarquia POSIX ou SMB. Para app que espera caminho de arquivo.
> **Bloco (EBS, instance store)**: disco bruto para um host — banco de dados, boot volume, baixa latência.
>
> Pista do enunciado: "aplicação legada que escreve em disco compartilhado" → **arquivo**. "milhões de imagens de usuário" → **objeto**. "banco com IOPS alto" → **bloco**.

> [!question]- Latência: qual cache resolve o quê?
> **CloudFront** → latência de **entrega** ao usuário final (borda).
> **ElastiCache** → latência de **consulta** ao banco relacional.
> **DAX** → latência de **consulta** ao DynamoDB.
> **Cache do API Gateway** → latência de **resposta da API** (por stage).
> **Global Accelerator** → latência de **rede** para tráfego TCP/UDP, sem cachear nada.

> [!question]- Qual métrica usar para escalar?
> O guia pede *"Identifying metrics and conditions to perform scaling actions"*. A resposta não é sempre CPU:
> - Web síncrona → **CPU** ou **RequestCountPerTarget** do ALB
> - Consumidor de fila → **ApproximateNumberOfMessagesVisible** (ou backlog por instância)
> - Aplicação com conexão longa → **ActiveConnectionCount**
> - Dado customizado → **custom metric** no CloudWatch
>
> Para fila, CPU é a resposta **errada** clássica: o consumidor pode estar ocioso esperando I/O com a fila cheia.

---

## ❓ Questões de prova

> [!example]- Q1 — Uma aplicação de renderização precisa de throughput de centenas de GB/s lendo um dataset que está num bucket S3, em paralelo, de centenas de instâncias Linux. Qual armazenamento?
> **A)** EFS com throughput Elastic
> **B)** **Amazon FSx for Lustre, com o bucket S3 vinculado ao file system** ✅
> **C)** EBS io2 Block Express com Multi-Attach
> **D)** Montar o S3 com um cliente FUSE
>
> **Por que B**: Lustre é o file system de HPC/ML da AWS, com latência sub-milissegundo, e *"When linked to an Amazon S3 bucket, an FSx for Lustre file system transparently presents S3 objects as files"* — exatamente o cenário.
> **A errada**: EFS escala bem (Elastic chega a dezenas de GiBps), mas Lustre é o serviço posicionado para *"machine learning, high performance computing (HPC), video processing, and financial modeling"* com esse perfil de throughput.
> **C errada**: Multi-Attach existe só em io1/io2, é limitado a poucas instâncias **na mesma AZ** e não é file system compartilhado POSIX.
> **D errada**: não entrega throughput de HPC e adiciona esforço operacional.

> [!example]- Q2 — Um consumidor de fila SQS em Auto Scaling não escala nos picos; a CPU fica em 20% enquanto a fila acumula. O que corrigir?
> **A)** Trocar para instâncias com mais CPU
> **B)** **Trocar a política de escala para target tracking sobre o backlog da fila (mensagens visíveis por instância)** ✅
> **C)** Aumentar o cooldown
> **D)** Habilitar long polling
>
> **Por que B**: a métrica tem que refletir o trabalho pendente. CPU baixa com fila cheia é o sintoma clássico de métrica errada.
> **A errada**: a CPU não é o gargalo.
> **C errada**: cooldown maior escala **menos**.
> **D errada**: long polling reduz respostas vazias e custo; não escala.

> [!example]- Q3 — Clientes na Ásia, Europa e América do Sul reclamam de lentidão ao baixar vídeos armazenados num bucket em `us-east-1`. Qual solução?
> **A)** Replicar o bucket para três regiões e usar latency routing
> **B)** **CloudFront com o bucket como origem** ✅
> **C)** S3 Transfer Acceleration
> **D)** Global Accelerator na frente do bucket
>
> **Por que B**: conteúdo estático consumido globalmente é o caso canônico de CDN — cache na borda, e *"The data transfer from your origin to CloudFront is always free when using AWS origins like Amazon S3"*.
> **A errada**: funciona, mas triplica armazenamento e exige sincronização. Muito mais custo e esforço.
> **C errada**: Transfer Acceleration é para **upload** de longe, não download.
> **D errada**: Global Accelerator **não cacheia**; para conteúdo estático o ganho é muito menor que o do CloudFront.

---

## ⚠️ Armadilhas do domínio 3

| Parece | É |
|---|---|
| Performance sempre pede instância maior | A prova premia **horizontal + cache + o serviço certo** |
| Transfer Acceleration acelera download | É **upload** |
| Global Accelerator é um CDN | **Não cacheia.** É rede anycast para TCP/UDP |
| Provisioned IOPS é sempre a resposta para banco | gp3 entrega 80.000 IOPS; io2 só se precisar de mais que isso ou de 99,999% de durabilidade |
| CPU é a métrica de escala | Para consumidor de fila, use **profundidade da fila** |
| EBS pode ser compartilhado | Multi-Attach só io1/io2, mesma AZ, e não é file system |
| S3 tem limite de requisições por bucket | O limite é **por prefixo** (3.500 escritas / 5.500 leituras por segundo), e prefixos são ilimitados |
| Redshift serve para OLTP | É **OLAP** |
| Athena precisa carregar os dados | Consulta o **S3 direto** |

---

## 🗂 Serviços e conceitos deste domínio

Cada pasta tem **quatro notas**: `1 - O que e` · `2 - Decorar` · `3 - Detalhes` · `4 - Questoes`.

- [[3 - Performance (24%)/Athena/1 - O que e|Athena]]
- [[3 - Performance (24%)/Bancos especializados (Neptune, DocumentDB, Keyspaces, Timestream)/1 - O que e|Bancos especializados (Neptune, DocumentDB, Keyspaces, Timestream)]]
- [[3 - Performance (24%)/CloudFront/1 - O que e|CloudFront]]
- [[3 - Performance (24%)/DAX/1 - O que e|DAX]]
- [[3 - Performance (24%)/DataSync/1 - O que e|DataSync]]
- [[3 - Performance (24%)/Direct Connect/1 - O que e|Direct Connect]]
- [[3 - Performance (24%)/DynamoDB/1 - O que e|DynamoDB]]
- [[3 - Performance (24%)/EBS/1 - O que e|EBS]]
- [[3 - Performance (24%)/EC2/1 - O que e|EC2]]
- [[3 - Performance (24%)/EFS/1 - O que e|EFS]]
- [[3 - Performance (24%)/EMR/1 - O que e|EMR]]
- [[3 - Performance (24%)/ElastiCache/1 - O que e|ElastiCache]]
- [[3 - Performance (24%)/FSx/1 - O que e|FSx]]
- [[3 - Performance (24%)/Global Accelerator/1 - O que e|Global Accelerator]]
- [[3 - Performance (24%)/Glue/1 - O que e|Glue]]
- [[3 - Performance (24%)/Kinesis Data Firehose/1 - O que e|Kinesis Data Firehose]]
- [[3 - Performance (24%)/Kinesis Data Streams/1 - O que e|Kinesis Data Streams]]
- [[3 - Performance (24%)/Lake Formation/1 - O que e|Lake Formation]]
- [[3 - Performance (24%)/OpenSearch Service/1 - O que e|OpenSearch Service]]
- [[3 - Performance (24%)/Outposts/1 - O que e|Outposts]]
- [[3 - Performance (24%)/Placement Groups/1 - O que e|Placement Groups]]
- [[3 - Performance (24%)/Redshift/1 - O que e|Redshift]]
- [[3 - Performance (24%)/S3/1 - O que e|S3]]
- [[3 - Performance (24%)/S3 Glacier/1 - O que e|S3 Glacier]]
- [[3 - Performance (24%)/Storage Gateway/1 - O que e|Storage Gateway]]
- [[3 - Performance (24%)/Transfer Family/1 - O que e|Transfer Family]]
- [[3 - Performance (24%)/Transit Gateway/1 - O que e|Transit Gateway]]
- [[3 - Performance (24%)/VPC Peering/1 - O que e|VPC Peering]]
- [[3 - Performance (24%)/VPN (Site-to-Site)/1 - O que e|VPN (Site-to-Site)]]

## Links

- [[00 - START HERE (indice da prova)]]
- [[02 - Numeros para decorar]]
- [Domínio 3 no guia oficial](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain3.html)
