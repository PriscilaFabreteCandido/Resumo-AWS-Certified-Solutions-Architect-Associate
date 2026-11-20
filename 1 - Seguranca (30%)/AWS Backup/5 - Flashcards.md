---
servico: AWS Backup
fonte: "[[1 - Seguranca (30%)/AWS Backup/2 - Decorar|2 - Decorar]]"
---

# AWS Backup — Flashcards

#flashcards/saa-c03/d1-seguranca/aws-backup

No AWS Backup, onde se definem frequência, janela, retenção e transição para cold storage?::No **backup plan**

Onde os backups ficam armazenados no AWS Backup?::No **backup vault**, separado das instâncias de origem

Recurso do AWS Backup que impede qualquer pessoa (inclusive você) de apagar backups ou mudar retenção?::**Vault Lock** (WORM)

Qual componente valida se os planos de backup estão sendo cumpridos, gerando evidência para auditor?::**Backup Audit Manager**

Os backups do AWS Backup são completos ou incrementais?::**Incrementais**

No RDS, qual backup sobrevive à exclusão da instância?::Só o **snapshot manual**

Janela do PITR do DynamoDB?::**1 a 35 dias**

Ao restaurar backup do DynamoDB, onde o dado vai?::Sempre numa **tabela nova**

Como o EBS restaura blocos a partir de snapshot?::Com **lazy load** dos blocos

Qual tipo de FSx não é durável?::FSx for Lustre **scratch**

Como fazer backup nativo do EFS?::Via **AWS Backup**

Combinação contra exclusão maliciosa de backups?::Cópia **cross-account** para vault em conta separada + **Vault Lock** com retenção mínima

Equivalente no S3 da proteção WORM de backups?::**Versionamento + Object Lock em modo Compliance**

Replicação protege de quê, e backup com WORM protege de quê?::Replicação: falha de **infraestrutura**. Backup: **erro humano, ransomware**, exclusão maliciosa
