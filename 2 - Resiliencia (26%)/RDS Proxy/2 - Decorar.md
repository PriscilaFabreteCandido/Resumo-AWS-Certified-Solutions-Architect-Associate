---
tags: [saa-c03, rds-proxy, decorar]
servico: Amazon RDS Proxy
atualizado: 2026-11-08
---

# RDS Proxy — Decorar

## Os números

| Item | Valor |
|---|---|
| **Proxies por conta** | **20** |
| **Secrets do Secrets Manager por proxy** | **200** (*"thus limiting connections to up to 200 different user accounts"*) |
| Endpoints adicionais por proxy | até **20** |
| AZs do endpoint padrão | *"only two Availability Zones"* |
| Redução do tempo de failover (Aurora Multi-AZ) | *"by up to 66%"* |
| Downtime de upgrade minor (Multi-AZ DB cluster) | *"one second or less"* |
| Statement que fixa a sessão (*pinning*) | maior que **16 KB** |

## Portas

| Engine | Porta |
|---|---|
| MySQL e MariaDB | **3306** |
| PostgreSQL | **5432** |

## Engines suportados

**RDS for MariaDB · RDS for Microsoft SQL Server · RDS for MySQL · RDS for PostgreSQL** — e **Aurora** (a doc de HA do Aurora cita *"Amazon RDS Proxy for Aurora"*).
⚠️ **Oracle não é citado** na documentação lida.

## As restrições que caem em prova

| Restrição | Detalhe |
|---|---|
| **Só o writer** | *"you can associate a proxy only with the writer DB instance, not a read replica"* |
| **Não é público** | *"can't be publicly accessible"* |
| **Mesma VPC** | O proxy fica na VPC do banco |
| SQL Server | *"RDS Proxy doesn't support connections that use Active Directory"* e *"does not support end-to-end IAM authentication for RDS for SQL Server"* |

## Autenticação

> *"you can enforce AWS Identity and Access Management (IAM) authentication for clients connecting to the proxy, and the proxy can connect to databases using either IAM database authentication or credentials stored in AWS Secrets Manager."*

Duas camadas:
1. **Cliente → proxy**: IAM (sem senha na aplicação)
2. **Proxy → banco**: IAM database auth **ou** credencial do **Secrets Manager**

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
