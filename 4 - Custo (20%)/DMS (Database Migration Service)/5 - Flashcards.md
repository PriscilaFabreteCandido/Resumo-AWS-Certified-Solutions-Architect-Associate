---
servico: AWS DMS
fonte: "[[4 - Custo (20%)/DMS (Database Migration Service)/2 - Decorar|2 - Decorar]]"
---

# DMS — Flashcards

#flashcards/saa-c03/d4-custo/dms

Na migração de banco, o que o DMS faz e o que ele não faz?::Migra **os dados**; converter **o schema** é com **DMS Schema Conversion / AWS SCT**

Migração homogênea (ex.: MySQL → Aurora MySQL): quais ferramentas?::Só o **DMS**

Migração heterogênea (ex.: Oracle → Aurora PostgreSQL): quais ferramentas?::**DMS + Schema Conversion / SCT**

Por que a migração heterogênea dá mais esforço?::É preciso converter **procedures, triggers e tipos** entre engines

Quais são os três modos de replicação do DMS?::**Full load**, **full load + CDC** e **CDC only**

Qual modo do DMS dá downtime mínimo?::**Full load + CDC**: carga inicial e replicação contínua

O que faz o modo CDC only?::Replica **só as mudanças**

Qual componente do DMS descobre o inventário de bancos antes de migrar?::**DMS Fleet Advisor**

Como o DMS criptografa em repouso e em trânsito?::**KMS** em repouso; **SSL** em trânsito

Como o DMS oferece failover automático?::Com um **servidor de replicação de backup**

Qual serviço migra servidores inteiros (não só o banco)?::**Application Migration Service (MGN)**

Qual a alavanca de custo para sair de licença Oracle/SQL Server?::**DMS + SCT** migrando para **Aurora**
