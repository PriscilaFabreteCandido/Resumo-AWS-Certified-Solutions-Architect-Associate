---
tags: [saa-c03, aws-backup, questoes]
servico: AWS Backup
atualizado: 2026-11-08
---

# AWS Backup — Questões

> [!question]- Q1. 25 contas, política única de backup para EBS, RDS, DynamoDB e EFS, com cópia em outra região e proteção contra exclusão.
> **A)** Lambda agendada por conta criando snapshots
> **B)** **AWS Backup com backup plan aplicado via Organizations, cópia cross-Region e Vault Lock** ✅
> **C)** Data Lifecycle Manager por conta
> **D)** AWS Config com remediação automática
>
> **Por que B**: cobre os quatro serviços, aplica centralmente, copia cross-Region e trava a retenção.
> **A errada**: esforço alto e nenhuma proteção de retenção.
> **C errada**: DLM cobre **EBS snapshots e AMIs** apenas, e não é centralizado.
> **D errada**: Config avalia conformidade; não faz backup.

> [!question]- Q2. Garantir que nem um administrador com credencial comprometida possa apagar os backups.
> **A)** SCP negando `backup:DeleteRecoveryPoint`
> **B)** **Vault Lock, com os backups copiados para um vault em outra conta** ✅
> **C)** MFA obrigatório no console
> **D)** Backup em bucket S3 com versionamento
>
> **Por que B**: Vault Lock impede a exclusão *"including you"*, e a cópia cross-account tira o alvo do raio de ação da conta comprometida.
> **A errada**: SCP ajuda, mas não alcança a management account e pode ser alterada por quem controla a organização.
> **C errada**: MFA protege o login, não o recurso.
> **D errada**: versionamento sem Object Lock ainda permite exclusão de versão.

> [!question]- Q3. Uma instância RDS foi deletada e o time descobriu que não havia snapshot manual. Os backups automáticos servem?
> **A)** Sim, ficam retidos pelo período configurado
> **B)** **Não: backups automáticos são removidos com a instância; só o snapshot manual sobrevive** ✅
> **C)** Sim, se o AWS Backup estava habilitado
> **D)** Só se a instância era Multi-AZ
>
> **Por que B**: é a diferença clássica entre backup automático e snapshot manual.
> **C**: na prática, um backup feito pelo **AWS Backup** fica no **vault** e sobrevive — é por isso que centralizar protege. Mas a afirmação sobre os **backups automáticos** do RDS continua sendo "não".

> [!question]- Q4. A empresa replica o bucket S3 para outra região e considera isso seu backup. Qual o problema?
> **A)** Replicação é síncrona e custa caro
> **B)** **Replicação propaga mudanças, inclusive exclusões; não protege de erro humano nem de ransomware** ✅
> **C)** Replicação não funciona entre regiões
> **D)** Replicação não suporta versionamento
>
> **Por que B**: replicação protege de falha de **infraestrutura**. Contra erro e ataque, é **versionamento + Object Lock** (ou AWS Backup com Vault Lock).

> [!question]- Q5. Provar ao auditor que todos os recursos de produção têm backup diário com 35 dias de retenção.
> **A)** AWS Config
> **B)** **AWS Backup Audit Manager** ✅
> **C)** CloudTrail
> **D)** AWS Artifact
>
> **Por que B**: é o componente que valida se os backup plans estão sendo cumpridos e gera relatório.
> **A errada**: Config avalia configuração dos recursos (pode checar se o recurso está num plan, mas o relatório de conformidade de backup é do Audit Manager do Backup).
> **D errada**: Artifact é compliance **da AWS**.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Replicação é backup | Replicação propaga mudanças, inclusive as ruins |
| Snapshot está preso à AZ | Snapshot é **regional**; o **volume** é zonal |
| Restaurar snapshot é instantâneo | Volume fica disponível rápido, mas blocos vêm **sob demanda** (lazy load) |
| Backup automático do RDS sobrevive à exclusão | **Não.** Só o **snapshot manual** |
| PITR do DynamoDB restaura no lugar | *"always restores to a new table"* |
| AWS Backup cobre tudo | Lista grande, mas **não universal** |
| Vault Lock pode ser revertido pelo dono | É WORM: *"including you"* |
| FSx for Lustre é sempre durável | **Scratch** não replica |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
