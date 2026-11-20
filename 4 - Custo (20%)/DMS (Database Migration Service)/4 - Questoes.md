---
tags: [saa-c03, dms, questoes]
servico: AWS DMS
atualizado: 2026-11-08
---

# DMS — Questões

> [!question] Q1. Migrar um Oracle on-premises de 4 TB para **Aurora PostgreSQL**, com downtime máximo de 30 minutos.
> **A)** Snapshot e restore no Aurora
> **B)** AWS SCT (ou DMS Schema Conversion) para converter o schema + DMS com full load e replicação contínua, cortando na janela de 30 min
> **C)** DMS sozinho
> **D)** `pg_dump` e restore
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é migração **heterogênea** — precisa de conversão de schema **e** de replicação contínua, para que a carga inicial ocorra com o Oracle no ar.
> > **A errada**: snapshot de Oracle não restaura em PostgreSQL.
> > **C errada**: o DMS migra **dados**, não converte procedures, triggers e tipos entre engines diferentes.
> > **D errada**: `pg_dump` lê PostgreSQL, não Oracle — e 4 TB estouraria a janela.

> [!question] Q2. Migrar MySQL on-premises para **Aurora MySQL** com downtime mínimo.
> **A)** DMS + AWS SCT
> **B)** DMS com full load + replicação contínua
> **C)** Snapshot e restore
> **D)** DataSync
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é **homogênea** — o schema é compatível, então o DMS sozinho resolve.
> > **A errada**: a conversão de schema é desnecessária (e é esforço a mais).
> > **D errada**: DataSync move **arquivos**, não replica banco.

> [!question] Q3. A empresa quer reduzir custo saindo das licenças Oracle.
> **A)** Rightsizing das instâncias Oracle
> **B)** Migrar para Aurora PostgreSQL com DMS + SCT
> **C)** Reserved Instances para o RDS Oracle
> **D)** Aurora I/O-Optimized
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: eliminar a **licença comercial** costuma superar qualquer otimização de instância. O guia cita, em Task 4.3, *"Migrating database schemas and data to different locations and/or different database engines"* (migrar schemas e dados de banco para outros locais e/ou outros engines).
> > **C errada**: dá desconto, mas a licença continua.

> [!question] Q4. Antes de migrar, o time precisa descobrir quais bancos existem no datacenter e seus tamanhos.
> **A)** Application Discovery Service
> **B)** DMS Fleet Advisor
> **C)** AWS Config
> **D)** Trusted Advisor
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é o componente de **descoberta de bancos** do DMS.
> > **A errada**: Application Discovery Service descobre **servidores** (para migração de VMs).

> [!question] Q5. Alimentar continuamente um data lake no S3 a partir de um banco transacional.
> **A)** Snapshot diário para o S3
> **B)** DMS com CDC e destino S3
> **C)** DataSync
> **D)** Glue crawler no banco
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o DMS suporta **S3 como destino** e replica as mudanças continuamente — depois Glue/Athena consomem.
> > **A errada**: dado defasado e carga pesada no banco.

> [!question] Q6. Migrar 200 **servidores** (não bancos) para a AWS, lift and shift.
> **A)** DMS
> **B)** AWS Application Migration Service (MGN)
> **C)** DataSync
> **D)** Snow Family
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: DMS é para **banco de dados**; servidor inteiro é **MGN** (estratégia **rehost**).

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| O DMS converte o schema | **Não.** Conversão é **DMS Schema Conversion** ou **AWS SCT** |
| O DMS exige parar a origem | A replicação contínua mantém origem e destino em sincronia até o corte |
| DMS serve para migrar servidores | Servidor inteiro é **MGN** |
| DMS só migra para RDS | Migra para **RDS, Aurora, S3, Redshift, DynamoDB, OpenSearch** e mais |
| Migração heterogênea é só técnica | É alavanca de **custo** (sair de licença Oracle/SQL Server) |
| Fleet Advisor descobre servidores | Descobre **bancos**. Servidores = **Application Discovery Service** |
| Snapshot/restore é equivalente | Só em **homogênea**, e com **downtime** |

## Links

- [[4 - Custo (20%)/DMS (Database Migration Service)/1 - O que e|1 - O que e]] · [[4 - Custo (20%)/DMS (Database Migration Service)/2 - Decorar|2 - Decorar]] · [[4 - Custo (20%)/DMS (Database Migration Service)/3 - Detalhes|3 - Detalhes]]
