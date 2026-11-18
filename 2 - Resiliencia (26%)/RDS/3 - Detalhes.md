---
tags: [saa-c03, rds, detalhes]
servico: Amazon RDS
atualizado: 2026-11-08
---

# RDS — Detalhes

## 1. Multi-AZ DB instance — só HA

A AWS *"automatically provisions and maintains a synchronous standby replica in a different Availability Zone"* (provisiona e mantém automaticamente uma réplica standby síncrona em outra Zona de Disponibilidade). O standby:

- Recebe as escritas **sincronamente** (o commit espera o standby, o que **aumenta a latência de escrita**)
- **Não aceita leitura**
- Assume automaticamente se a primária falhar (o endpoint é o mesmo — o DNS passa a apontar para o novo primário)

⚠️ A doc **não informa** um tempo típico de failover para o Multi-AZ **instance**. Se a questão pedir número, o número documentado é o do **cluster**: *"typically under 35 seconds"* (normalmente abaixo de 35 segundos).

Tecnologia de failover por engine: *"Multi-AZ deployments for MariaDB, MySQL, Oracle, PostgreSQL, and RDS Custom for SQL Server DB instances use the Amazon failover technology. Microsoft SQL Server DB instances use SQL Server Database Mirroring (DBM) or Always On Availability Groups (AGs)."* (implantações Multi-AZ de MariaDB, MySQL, Oracle, PostgreSQL e RDS Custom for SQL Server usam a tecnologia de failover da Amazon; instâncias do Microsoft SQL Server usam Database Mirroring (DBM) ou Always On Availability Groups (AGs))

## 2. Multi-AZ DB cluster — HA + leitura

*"a semisynchronous, high availability deployment mode of Amazon RDS with two readable replica DB instances"* (um modo de implantação semissíncrono e de alta disponibilidade do Amazon RDS, com duas réplicas legíveis) — 1 writer + 2 readers em **3 AZs**.

Três vantagens sobre o Multi-AZ instance:

1. **Os readers leem** — capacidade de leitura adicional sem read replica separada
2. **Failover < 35 s**
3. **Menor latência de escrita** — *"lower write latency when compared to Multi-AZ DB instance deployments"* (menor latência de escrita em comparação com implantações Multi-AZ de instância), porque o commit espera **um** reader, não todos

O failover escolhe o reader *"with the most recent change record"*.

Restrições: engines **MySQL e PostgreSQL**, e classes de instância com NVMe local (db.m5d, db.m6gd, db.r6gd, db.r6id, db.x2iedn etc.).

⚠️ E a frase que impede a confusão: *"Multi-AZ DB clusters aren't the same as Aurora DB clusters."* (clusters de banco Multi-AZ não são a mesma coisa que clusters do Aurora)

## 3. Read replica — escala e DR

Replicação **assíncrona**, o que significa **lag**. Consequências:

- Leitura na réplica pode ser **ligeiramente antiga** — bom para relatório, arriscado para "ler o que acabei de escrever"
- A réplica tem **endpoint próprio** — a aplicação precisa direcionar as leituras para ele
- **Não** faz failover automático; a promoção é **manual** (e é por isso que read replica cross-Region é estratégia de DR, não de HA)

A doc é explícita sobre a diferença: *"Replication with the standby replica is synchronous. Unlike a read replica, a standby replica can't serve read traffic."* (a replicação com a réplica standby é síncrona; ao contrário de uma réplica de leitura, a standby não atende tráfego de leitura)

Pontos operacionais:
- *"RDS doesn't support autoscaling of read replicas"* (o RDS não oferece escalabilidade automática de réplicas de leitura) — você adiciona e remove manualmente (ou automatiza)
- **Cascata** só em MariaDB, MySQL e certas versões de PostgreSQL. *"For RDS for Db2, RDS for Oracle, and RDS for SQL Server, you can't create a read replica from an existing read replica."* (no RDS for Db2, Oracle e SQL Server, não é possível criar uma réplica de leitura a partir de outra réplica de leitura)
- Deletar a origem **promove** as réplicas da mesma região a instâncias autônomas
- Transferência de dados de replicação **na mesma região** é grátis; cross-Region é cobrada

## 4. Combinando as três

A arquitetura completa que a prova espera:

```
                 Endpoint da primária (escrita)
                            │
        ┌───────────────────▼───────────────────┐
        │  AZ-a: PRIMÁRIA  ◄──sync──►  AZ-b: STANDBY  │   Multi-AZ (HA)
        └───────────────────┬───────────────────┘
                            │ async
        ┌───────────────────▼───────────────────┐
        │  Read replica 1  ·  Read replica 2    │   escala de leitura
        └───────────────────────────────────────┘
                            │ async, cross-Region
        ┌───────────────────▼───────────────────┐
        │  Read replica em outra região         │   DR (promoção manual)
        └───────────────────────────────────────┘
```

## 5. Backup e restore

**Backup automático**: snapshot diário na janela configurada + logs de transação, permitindo **point-in-time recovery**. ⚠️ É **removido junto com a instância**.

**Snapshot manual**: você cria, você apaga. **Sobrevive** à exclusão da instância, pode ser copiado entre regiões e compartilhado com outras contas (se criptografado, exige **customer managed key** e a key policy liberando a conta destino).

**AWS Backup** centraliza tudo isso com retenção travada por **Vault Lock**.

## 6. Performance e custo

| Alavanca | Detalhe |
|---|---|
| **Instance class** | Famílias `db.m` (geral), `db.r`/`db.x` (memória), `db.t` (burstable — ⚠️ créditos de CPU) |
| **Graviton** (`db.m7g`, `db.r7g`) | Melhor preço/performance |
| **Storage** | gp3 (padrão), io1/io2 (Provisioned IOPS), magnético (legado) |
| **Storage autoscaling** | Cresce o volume automaticamente ao atingir o limite |
| **Performance Insights** | Identifica query e espera que dominam a carga |
| **RDS Proxy** | Pool de conexões — resposta para "esgotando conexões" |
| **Parar a instância** | Economiza compute em dev/teste. ⚠️ O **storage continua cobrando** |
| **RI / Database Savings Plans** | Carga estável 24/7 |

## 7. Segurança

- Banco em **subnet privada**, sem rota de saída
- SG do banco liberando **o SG da aplicação** (não o CIDR)
- Criptografia em repouso com **KMS** (definida na criação; para habilitar depois, restaure um snapshot criptografado)
- TLS em trânsito
- **IAM database authentication** (MySQL, PostgreSQL) — token de 15 min, elimina a senha
- Senha no **Secrets Manager** com rotação automática
- **RDS for SQL Server com Windows Auth** exige **AWS Managed Microsoft AD**

## Links

- [[2 - Resiliencia (26%)/RDS/1 - O que e|1 - O que e]] · [[2 - Resiliencia (26%)/RDS/2 - Decorar|2 - Decorar]] · [[2 - Resiliencia (26%)/RDS/4 - Questoes|4 - Questoes]]
- [[2 - Resiliencia (26%)/Aurora/1 - O que e|Aurora]] · [[2 - Resiliencia (26%)/RDS Proxy/1 - O que e|RDS Proxy]] · [[1 - Seguranca (30%)/Secrets Manager/1 - O que e|Secrets Manager]] · [[1 - Seguranca (30%)/Directory Service/1 - O que e|Directory Service]] · [[1 - Seguranca (30%)/AWS Backup/1 - O que e|AWS Backup]] · [[4 - Custo (20%)/04 - Dominio 4 - Design Cost-Optimized Architectures (20%)|Custo (dominio 4)]]
- [Read replicas](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html)
