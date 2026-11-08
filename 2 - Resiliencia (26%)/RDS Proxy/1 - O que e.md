---
tags: [saa-c03, rds-proxy, banco]
servico: Amazon RDS Proxy
tipo: Pool de conexões gerenciado
dominios: [2, 3]
atualizado: 2026-11-08
---

# Amazon RDS Proxy — O que é

> [!info] Em uma frase
> Pool de conexões gerenciado na frente do RDS/Aurora: **compartilha e reutiliza** conexões, protege o banco de picos de conexão, e **reduz o tempo de failover**.

## O problema que resolve

> *"By using Amazon RDS Proxy, you can allow your applications to pool and share database connections to improve their ability to scale."*

Cada conexão de banco consome memória no servidor. Aplicações serverless e em contêiner abrem conexões de forma explosiva: 1.000 Lambdas concorrentes = 1.000 tentativas de conexão. A doc descreve o sintoma: *"unpredictable surges in database traffic"* que causam *"oversubscribing connections or new connections being created at a fast rate"*.

O proxy enfileira ou estrangula: *"If connection requests exceed the limits you specify, RDS Proxy rejects application connections (that is, it sheds load)."*

## O segundo benefício: failover

> *"RDS Proxy makes applications more resilient to database failures by automatically connecting to a standby DB instance while preserving application connections."*

E o número: reduz o tempo de failover *"by up to 66% for Aurora Multi-AZ databases"* (porque *"bypasses Domain Name System (DNS) caches"*), e o downtime de upgrade de minor version de Multi-AZ DB cluster a *"one second or less"*.

## O gatilho de prova

| Enunciado diz | Resposta |
|---|---|
| "esgotando conexões", "too many connections" | **RDS Proxy** |
| "Lambda + RDS com alta concorrência" | **RDS Proxy** |
| "reduzir o tempo de failover sem mudar a aplicação" | **RDS Proxy** |
| "gerenciar a credencial do banco de forma segura" | RDS Proxy + **Secrets Manager** / **IAM auth** |

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[RDS]] · [[Aurora]] · [[Lambda]] · [[Secrets Manager]] · [[IAM]]
- [RDS Proxy](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html)
