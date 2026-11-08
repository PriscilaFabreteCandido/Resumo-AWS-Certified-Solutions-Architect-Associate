---
tags: [saa-c03, rds-proxy, questoes]
servico: Amazon RDS Proxy
atualizado: 2026-11-08
---

# RDS Proxy — Questões

> [!question]- Q1. Uma função Lambda com alta concorrência esgota as conexões do Aurora.
> **A)** Aumentar `max_connections` no parameter group
> **B)** **RDS Proxy entre a Lambda e o cluster** ✅
> **C)** Adicionar read replicas
> **D)** Reserved concurrency na Lambda
>
> **Por que B**: *"allow your applications to pool and share database connections"*, com load shedding no excesso. Bônus: reduz o failover *"by up to 66%"*.
> **A errada**: conexões consomem memória do banco; só adia o problema.
> **C errada**: ajuda em leitura, não no esgotamento de conexões.
> **D errada**: limita a aplicação em vez de resolver.

> [!question]- Q2. A aplicação demora minutos para voltar depois de um failover do Aurora, por cache de DNS.
> **A)** Reduzir o TTL do Route 53
> **B)** **RDS Proxy, que contorna o cache de DNS e preserva as conexões da aplicação** ✅
> **C)** Multi-AZ DB cluster
> **D)** Read replica promovida
>
> **Por que B**: *"bypasses Domain Name System (DNS) caches to reduce failover times by up to 66%"* e *"automatically connecting to a standby DB instance while preserving application connections"*.
> **A errada**: o endpoint do Aurora não é gerenciado por você no Route 53, e o cache pode ser do cliente/JVM.

> [!question]- Q3. O time quer apontar o RDS Proxy para as read replicas, para escalar leitura.
> **A)** Criar um proxy por réplica
> **B)** **Não é suportado: o proxy se associa apenas ao writer; a aplicação deve usar o reader endpoint direto** ✅
> **C)** Usar um endpoint adicional do proxy
> **D)** Habilitar read-only no proxy
>
> **Por que B**: *"you can associate a proxy only with the writer DB instance, not a read replica."*

> [!question]- Q4. Como eliminar a senha do banco da aplicação, mantendo rotação automática?
> **A)** Hardcode com rotação manual
> **B)** **IAM authentication do cliente para o proxy, e o proxy buscando a credencial no Secrets Manager** ✅
> **C)** Parameter Store `SecureString`
> **D)** KMS
>
> **Por que B**: é a combinação documentada — *"enforce IAM authentication for clients connecting to the proxy, and the proxy can connect to databases using either IAM database authentication or credentials stored in AWS Secrets Manager"*.
> **C errada**: Parameter Store não rotaciona (*"None"*).

> [!question]- Q5. O proxy foi configurado, mas o número de conexões no banco não caiu.
> **A)** Falta aumentar o `max_connections`
> **B)** **As sessões estão sendo fixadas (pinning) — por exemplo, statements maiores que 16 KB, temp tables ou variáveis de sessão** ✅
> **C)** O proxy precisa ser público
> **D)** Falta um read replica
>
> **Por que B**: no pinning o proxy deixa de multiplexar e dedica uma conexão de banco por sessão da aplicação.
> **C errada**: o proxy *"can't be publicly accessible"* — e isso não teria relação.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| RDS Proxy funciona com read replica | **Só com o writer** |
| RDS Proxy pode ser público | *"can't be publicly accessible"* |
| O proxy sempre multiplexa | **Pinning** desfaz o pool (statement > 16 KB, temp tables, variáveis de sessão) |
| Suporta Oracle | A doc lida cita **MariaDB, SQL Server, MySQL, PostgreSQL** e Aurora. Oracle **não** é citado |
| Suporta AD no SQL Server | *"doesn't support connections that use Active Directory"* |
| Resolve escala de leitura | Resolve **conexões**. Leitura é read replica / reader endpoint |
| Posso criar quantos proxies quiser | **20 por conta**; **200 secrets** por proxy |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
