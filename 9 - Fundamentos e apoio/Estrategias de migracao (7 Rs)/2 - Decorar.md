---
tags: [saa-c03, migracao, 7rs, decorar]
conceito: Estratégias de migração (7 Rs)
atualizado: 2026-11-08
---

# 7 Rs — Decorar

## A tabela, com o serviço de cada um

| R | Muda o código? | Muda a plataforma? | Esforço | Serviço típico da AWS |
|---|---|---|---|---|
| **Retire** | — | — | nenhum | — (desligar; **Cost Explorer** / **Trusted Advisor** acham o ocioso) |
| **Retain** | — | — | nenhum | — (talvez **Direct Connect** / **Outposts** para conviver) |
| **Rehost** | **Não** | Não (IaaS) | **baixo** | **AWS Application Migration Service (MGN)**, **Server Migration**, **VM Import/Export** |
| **Relocate** | **Não** | Não (o hypervisor vai junto) | baixo | **VMware Cloud on AWS**, **Outposts** |
| **Repurchase** | — (abandona) | SaaS | médio | Marketplace / produto de terceiro |
| **Replatform** | **Pouco ou nada** | **Sim**, para gerenciado | **médio** | **DMS** (banco), **RDS/Aurora**, **ECS/EKS**, **Elastic Beanstalk**, **ElastiCache**, **MQ**, **MSK** |
| **Refactor** | **Sim** | Sim, nativo | **alto** | **Lambda**, **API Gateway**, **DynamoDB**, **SQS/SNS/EventBridge**, **Step Functions**, **Fargate** |

## Palavra no enunciado → R

| Enunciado | R |
|---|---|
| *"lift and shift"*, *"as is"* (como está), *"sem alterar a aplicação"*, *"o mais rápido possível"* | **Rehost** |
| *"mover o ambiente VMware"*, *"sem adquirir hardware novo nem mudar operação"* | **Relocate** |
| *"substituir pelo equivalente SaaS"*, *"deixar de manter o produto"* | **Repurchase** |
| *"manter o mesmo engine, sem gerenciar servidores"*, *"reduzir sobrecarga operacional do banco"* | **Replatform** |
| *"redesenhar"*, *"serverless"*, *"microsserviços"*, *"escala elástica"*, *"aproveitar recursos nativos"* | **Refactor** |
| *"ninguém usa"*, *"desativar"*, *"obsoleto"* | **Retire** |
| *"depende de hardware/licença que não vai"*, *"será aposentado em 2 anos"* | **Retain** |

## Os serviços de migração por tipo de dado

| Migrar | Serviço |
|---|---|
| **Servidores** (VM → EC2) | **AWS Application Migration Service (MGN)** |
| **Banco de dados** — os **dados** | **DMS** (com **CDC** para migração contínua, downtime mínimo) |
| **Banco de dados** — o **schema**, entre engines diferentes | **AWS SCT** (Schema Conversion Tool) |
| **Arquivos / NFS / SMB / S3** pela rede | **DataSync** |
| **Petabytes** sem rede suficiente | **Snow Family** (**Snowball Edge**, **Snowmobile**) |
| **Fluxo contínuo de arquivos de parceiros** | **Transfer Family** (SFTP/FTPS/FTP) |
| **Resiliência / DR de servidores** | **Elastic Disaster Recovery (DRS)** |

> [!warning] A dupla que a prova separa
> **DMS = dados.** **SCT = schema.** Migração **homogênea** (Oracle → Oracle) usa só **DMS**. **Heterogênea** (Oracle → Aurora PostgreSQL) usa **SCT + DMS**.

## As fases oficiais da migração

**Assess → Mobilize → Migrate and modernize**

| Fase | Ferramenta |
|---|---|
| **Assess** (descobrir e dimensionar) | **AWS Application Discovery Service**, **Migration Evaluator** |
| **Mobilize** (landing zone, piloto) | **Control Tower**, **Organizations**, **CloudFormation** |
| **Migrate** (executar e acompanhar) | **MGN**, **DMS**, **DataSync**, **Migration Hub** (painel único) |

## Links

- [[9 - Fundamentos e apoio/Estrategias de migracao (7 Rs)/1 - O que e|1 - O que e]] · [[9 - Fundamentos e apoio/Estrategias de migracao (7 Rs)/3 - Detalhes|3 - Detalhes]] · [[9 - Fundamentos e apoio/Estrategias de migracao (7 Rs)/4 - Questoes|4 - Questoes]]
