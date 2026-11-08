---
tags: [saa-c03, aws-backup, detalhes]
servico: AWS Backup
atualizado: 2026-11-08
---

# AWS Backup — Detalhes

## 1. Por que centralizar

Sem o AWS Backup, a proteção de dados fica espalhada: Data Lifecycle Manager para EBS, janela de backup do RDS, PITR do DynamoDB, backup automático do FSx, versionamento do S3. Cada um com sua configuração, sua retenção e seu lugar.

Três problemas disso em escala:

1. **Deriva** — alguém cria um volume sem DLM, uma tabela sem PITR
2. **Auditoria impossível** — "todos os recursos de produção têm backup com 35 dias?" exige varrer serviço por serviço
3. **Nenhuma proteção contra exclusão** — quem pode criar o snapshot pode apagá-lo

O AWS Backup resolve os três: um **plan** aplicado por **tag**, **Audit Manager** para provar, e **Vault Lock** para impedir exclusão.

## 2. Vault Lock — o WORM do backup

> *"You can use AWS Backup Vault Lock to prevent anyone (including you) from deleting backups or altering their retention period. AWS Backup Vault Lock helps you enforce a write-once-read-many (WORM) model."*

O "including you" é o ponto. É o equivalente, no mundo de backup, do **S3 Object Lock em modo Compliance**.

Combinado com cópia **cross-account**, forma a defesa contra ransomware que a prova espera: mesmo que a conta de produção seja totalmente comprometida, a cópia na conta de archive não pode ser apagada.

## 3. Cross-Region e cross-account

**Cross-Region**: *"copy backups to multiple different AWS Regions on demand or automatically as part of a scheduled backup plan."* É o mecanismo de **backup and restore** como estratégia de DR entre regiões — e a forma de atender requisito de "cópia fora da região primária".

**Cross-account**: *"copy backups to multiple different AWS accounts inside your AWS Organizations management structure."* Exige AWS Organizations. É o que tira o backup do raio de explosão da conta de produção.

As duas podem ser combinadas: backup na conta A região X → cópia na conta B região Y.

## 4. Lifecycle do backup

O backup plan define a transição para **cold storage** e a expiração. Isso importa para custo: backup de 7 anos em storage quente é caro; a transição para frio reduz drasticamente.

A mesma lógica das classes do S3 se aplica — e há um mínimo de permanência em cold storage antes de poder expirar.

## 5. Backup Audit Manager

Cria **frameworks** de controle ("todo recurso com tag `env=prod` deve ter backup diário com 35 dias de retenção e cópia cross-Region") e produz **relatórios de conformidade**.

É a resposta para *"provar ao auditor que o backup existe e está na retenção certa"* — distinto do **AWS Audit Manager** (que é evidência de compliance geral) e do **AWS Config** (configuração dos recursos).

## 6. Backup × DR — como se encaixam

| Estratégia de DR | Papel do AWS Backup |
|---|---|
| **Backup and restore** | **É a estratégia.** Backups replicados cross-Region + IaC para reprovisionar |
| **Pilot light** | Complementa: os dados já estão replicados continuamente (não por backup) |
| **Warm standby** | Complementa |
| **Multi-site active/active** | Complementa |

O whitepaper de DR lembra que, em qualquer estratégia, *"you should always deploy using infrastructure as code (IaC)"* — backup sem IaC deixa você com os dados e sem o ambiente.

## 7. O que o AWS Backup NÃO cobre

A lista de suportados é grande, mas **não é universal**. Serviços fora dela precisam do mecanismo nativo ou de automação própria. Em prova, confira se o serviço do enunciado está na lista — se o enunciado cita um serviço exótico, desconfie da alternativa com AWS Backup.

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[Disaster Recovery (RPO e RTO)]] · [[S3]] · [[EBS]] · [[RDS]] · [[DynamoDB]] · [[FSx]] · [[Organizations e Control Tower]]
