---
tags: [saa-c03, dominio-4, rds, aurora, dynamodb, custo]
dominio: 4
tasks: [4.3]
atualizado: 2026-11-08
---

# Custo de banco de dados

## 🧩 Em 30 segundos

- **On-demand × provisionado** no DynamoDB: carga imprevisível ou intermitente → on-demand. Carga estável e previsível → **provisionado com auto scaling** (mais barato por unidade).
- **Aurora Serverless v2** para carga intermitente; mínimo **0 ACU** faz o cluster **pausar**.
- **Aurora I/O-Optimized** vale quando I/O é **≥ 25%** da fatura do cluster.
- **Não pague HA em dev**: Multi-AZ, read replica e PITR longo são decisões de produção.
- **Cache (ElastiCache / DAX) costuma ser mais barato que escalar o banco** para carga de leitura repetida.

## 🧠 Teste-se primeiro

> [!question]- DynamoDB: quando on-demand é mais caro?
> On-demand é *"the default and recommended throughput option for most DynamoDB workloads"*, mas cobra por **requisição**. Para tráfego **constante e previsível**, provisionado com auto scaling (alvo de **70%** de utilização) sai mais barato por unidade — e você pode comprar **reserved capacity** (até 1.000.000 de unidades provisionadas por conta).
> ⚠️ Troca de modo: provisionado → on-demand **4 vezes** em 24 h rolantes; on-demand → provisionado **a qualquer momento**.

> [!question]- Quando Aurora I/O-Optimized compensa?
> Citação: I/O-Optimized é *"the best choice when your I/O spending is 25% or more"* da fatura do cluster; Aurora Standard é *"the best choice when your I/O spending is less than 25%"*.
> I/O-Optimized tem preço de compute/storage maior, mas **sem cobrança por I/O**. Troca de Standard → I/O-Optimized permitida *"once every 30 days"*.

> [!question]- Como reduzir custo sem reduzir performance num banco com leitura repetida?
> **Cache**. Uma instância de ElastiCache (ou um cluster DAX) frequentemente custa menos que subir a instance class do banco ou adicionar read replicas — e melhora a latência.
> O guia lista *"Caching strategies"* dentro de **Task 4.3 (custo de banco)**, não só em performance. É proposital.

> [!question]- O que mais gera custo esquecido em banco?
> **Storage de snapshot manual** (não expira sozinho) · **PITR com retenção máxima** sem necessidade (1-35 dias no DynamoDB; o preço não varia com o período configurado, mas varia com o **tamanho** da tabela) · **read replicas ociosas** (*"billed as standard DB instances"*) · **instância parada do RDS** (o **storage continua cobrando**) · **Multi-AZ em ambiente não produtivo** · **Aurora Serverless v2 com mínimo 0,5 ACU**, que nunca pausa.

## Decisões de custo por serviço

| Decisão | Quando economiza |
|---|---|
| **Aurora Serverless v2** (mín. 0 ACU) | Carga intermitente, dev/teste, ambientes que ficam ociosos à noite |
| **Aurora Standard × I/O-Optimized** | Pelo percentual de I/O na fatura (corte em **25%**) |
| **Graviton** (`db.r7g`, `db.m7g`) | Melhor preço/performance no RDS e Aurora |
| **DynamoDB provisionado + auto scaling** | Tráfego previsível; alvo recomendado **70%** |
| **DynamoDB on-demand** | Tráfego imprevisível, picos, dev |
| **DynamoDB Standard-IA table class** | Dado acessado raramente, armazenamento dominando o custo |
| **TTL no DynamoDB** | *"a cost-effective method for deleting items that are no longer relevant"*; a exclusão inicial **não consome WCU** |
| **RDS Reserved Instances / Database Savings Plans** | Banco de produção estável 24/7 (Database SP: até **35%**, cobrindo Aurora, RDS, DynamoDB, ElastiCache, DocumentDB, Neptune, Keyspaces, Timestream, DMS e OpenSearch) |
| **Parar instância RDS** | Dev/teste fora do horário. ⚠️ Storage continua cobrando, e o RDS limita o tempo máximo parado |
| **Evitar Multi-AZ em dev** | Dobra o custo de compute por HA que o ambiente não exige |
| **Right-sizing** | Compute Optimizer e Performance Insights |

> [!tip] O tipo certo de banco é a maior economia
> O guia pede *"Determining cost-effective AWS database types (for example, time series format, columnar format)"*.
> Série temporal em RDS relacional é caro e lento → **Timestream**. Analítico em RDS → **Redshift** (colunar) ou **Athena** (S3). Chave-valor de alto volume em RDS → **DynamoDB**. Escolher o engine errado custa mais que qualquer otimização de instância.

## Migração de engine e custo

| Situação | Serviço |
|---|---|
| Mesmo engine (Oracle on-prem → RDS Oracle) | **DMS** (migração **homogênea**), com replicação contínua para downtime mínimo |
| Engine diferente (Oracle → Aurora PostgreSQL) | **DMS + Schema Conversion** (ou **AWS SCT** local) — *"automatically assesses and converts your source schemas to a new target engine"* |
| Sair de licença comercial | Oracle/SQL Server → **Aurora PostgreSQL/MySQL** elimina licença. É resposta de custo, não só técnica |

O guia pede, em 4.3: *"Migrating database schemas and data to different locations and/or different database engines"* — e cita *"heterogeneous migrations, homogeneous migrations"* no Knowledge of.

## ❓ Questões de prova

> [!example]- Q1 — Uma tabela DynamoDB de ambiente de teste recebe tráfego esporádico e imprevisível. Hoje está provisionada com 500 RCU e 500 WCU, com utilização média de 3%. Qual mudança?
> **A)** Reduzir para 50 RCU / 50 WCU
> **B)** **Mudar para o modo on-demand** ✅
> **C)** Habilitar auto scaling com alvo de 70%
> **D)** Mudar a table class para Standard-IA
>
> **Por que B**: tráfego **esporádico e imprevisível** é o caso de uso do on-demand — você paga por requisição, e um ambiente de teste ocioso praticamente não gera custo.
> **A errada**: continua pagando capacidade reservada 24/7 por algo usado 3% do tempo.
> **C errada**: auto scaling ajuda, mas tem piso de capacidade e leva 2 minutos consecutivos para reagir — em tráfego esporádico, ele fica sempre atrasado e no piso.
> **D errada**: Standard-IA reduz o preço de **armazenamento** e **aumenta** o de requisição; o problema aqui é capacidade ociosa.

> [!example]- Q2 — Um cluster Aurora de produção tem fatura em que o I/O representa 40% do total. Qual mudança reduz custo?
> **A)** Reduzir a instance class
> **B)** **Mudar o cluster para Aurora I/O-Optimized** ✅
> **C)** Adicionar read replicas
> **D)** Migrar para RDS MySQL
>
> **Por que B**: a própria doc dá o corte — I/O-Optimized é *"the best choice when your I/O spending is 25% or more"*. Com 40%, compensa.
> **A errada**: pode degradar a aplicação e não endereça o I/O.
> **C errada**: **adiciona** custo de compute.
> **D errada**: migração grande, com risco, sem relação com o componente de custo identificado.

> [!example]- Q3 — Um banco RDS de produção roda 24/7 com carga estável há dois anos. O time quer reduzir a fatura sem mudar nada da arquitetura.
> **A)** Migrar para Aurora Serverless v2
> **B)** **Comprar Reserved Instances do RDS ou um Database Savings Plan** ✅
> **C)** Reduzir a retenção de backup para 1 dia
> **D)** Desabilitar o Multi-AZ
>
> **Por que B**: carga estável 24/7 com compromisso é exatamente o caso de RI/Savings Plans — desconto sem mudar nada.
> **A errada**: Serverless v2 é para carga **variável**; em carga constante não há economia (e pode custar mais).
> **C errada**: economia marginal e **reduz a proteção** — troca indevida.
> **D errada**: economiza compute, mas **remove a HA de produção**. A prova pune trocar disponibilidade de produção por custo quando o enunciado não autoriza.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| On-demand é sempre mais barato no DynamoDB | Para carga **constante**, provisionado + auto scaling sai mais barato |
| Posso alternar o modo de capacidade à vontade | Provisionado → on-demand **4 vezes** em 24 h |
| Instância RDS parada não custa nada | O **storage continua cobrando** |
| Read replica ociosa não custa | *"billed as standard DB instances"* |
| Aurora Serverless v2 sempre pausa | Só com mínimo **0 ACU** |
| I/O-Optimized é sempre melhor | Só a partir de **25%** de I/O na fatura |
| Snapshot manual expira sozinho | **Não expira.** É custo acumulado |
| Multi-AZ em dev é boa prática | É custo dobrado sem requisito |
| Trocar engine é só decisão técnica | Sair de licença comercial (Oracle/SQL Server → Aurora) é alavanca de **custo** |
| PITR com 35 dias custa mais que com 7 | *"The configured maximum recovery period doesn't impact the price"* — o preço vem do **tamanho** da tabela |

## Links

- [[04 - Dominio 4 - Design Cost-Optimized Architectures (20%)]]
- [[Bancos resilientes - RDS, Aurora e read replicas]]
- [[Bancos de alta performance - DynamoDB, DAX, ElastiCache e Redshift]]
- [[Migracao e hibrido - 7 Rs, Snow, DataSync, Storage Gateway e DMS]]
