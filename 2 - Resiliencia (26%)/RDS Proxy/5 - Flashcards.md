---
servico: Amazon RDS Proxy
fonte: "[[2 - Resiliencia (26%)/RDS Proxy/2 - Decorar|2 - Decorar]]"
---

# RDS Proxy — Flashcards

#flashcards/saa-c03/d2-resiliencia/rds-proxy

Máximo de RDS Proxies por conta?::**20**

Máximo de secrets do Secrets Manager por proxy (e o efeito disso)?::**200**, limitando as conexões a até 200 contas de usuário diferentes

Máximo de endpoints adicionais por proxy?::**20**

Em quantas AZs fica o endpoint padrão do RDS Proxy?::Apenas **duas**

Quanto o RDS Proxy reduz o failover e o downtime de upgrade minor?::Failover em até **66%** (Aurora Multi-AZ); upgrade minor de Multi-AZ DB cluster em **1 segundo ou menos**

Tamanho de statement que causa pinning (fixa a sessão) no RDS Proxy?::Maior que **16 KB**

Portas do RDS Proxy para MySQL/MariaDB e PostgreSQL?::**3306** e **5432**

Quais engines o RDS Proxy suporta?::RDS for **MariaDB**, **SQL Server**, **MySQL**, **PostgreSQL** e **Aurora** (Oracle não é citado)

O RDS Proxy pode ser associado a uma read replica?::**Não**, só à **instância writer**

O RDS Proxy pode ser acessível publicamente?::**Não**; fica na **mesma VPC** do banco

Restrições do RDS Proxy com SQL Server?::Sem conexões via **Active Directory** e sem autenticação **IAM ponta a ponta**

Como o cliente se autentica no RDS Proxy sem senha na aplicação?::**IAM**

Como o RDS Proxy se autentica no banco?::**IAM database authentication** ou credencial do **Secrets Manager**
