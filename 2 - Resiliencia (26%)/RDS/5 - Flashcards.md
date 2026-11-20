---
servico: Amazon RDS
fonte: "[[2 - Resiliencia (26%)/RDS/2 - Decorar|2 - Decorar]]"
---

# RDS — Flashcards

#flashcards/saa-c03/d2-resiliencia/rds

Tipo de replicação do Multi-AZ instance, do Multi-AZ cluster e da read replica?::Instance: **síncrona**. Cluster: **semi-síncrona**. Read replica: **assíncrona**

O standby do Multi-AZ DB instance atende leitura?::**Não**; serve só para **HA**

Topologia do Multi-AZ DB cluster?::**1 writer + 2 readers** em **3 AZs**

Tempo de failover do Multi-AZ DB cluster?::Menos de **35 s**

Quais engines suportam Multi-AZ DB cluster?::**MySQL** e **PostgreSQL**

O que exige a replicação semi-síncrona do Multi-AZ cluster para efetivar uma mudança?::Confirmação de **pelo menos um reader**

A read replica tem failover automático?::**Não**, a promoção é **manual**

O RDS faz autoscaling de read replicas?::**Não**

Read replica cross-Region é suportada?::**Sim** (pode ser promovida como estratégia de DR)

Quais engines do RDS não suportam réplica em cascata (réplica de réplica)?::**Db2**, **Oracle** e **SQL Server**

O que acontece com as read replicas ao deletar a instância de origem?::As réplicas **na mesma região** são **promovidas** automaticamente

Backup automático × snapshot manual: qual sobrevive à exclusão da instância?::Só o **snapshot manual**

Como é cobrada uma read replica?::Como uma **instância de banco comum**

Quanto o RDS Proxy reduz o tempo de failover em Aurora Multi-AZ?::Em até **66%**
