---
tags: [saa-c03, dominio-1, aws-backup, retencao, snapshot]
dominio: 1
tasks: [1.3]
atualizado: 2026-11-08
---

# Backup, retenção e AWS Backup

## 🧩 Em 30 segundos

- **AWS Backup** centraliza backup de muitos serviços, em muitas contas e regiões, com **backup plans** e **vaults**.
- **Vault Lock** é o WORM do backup: *"prevent anyone (including you) from deleting backups or altering their retention period"*.
- Backup **cross-Region** e **cross-account** (via Organizations) são feature nativa — e são a resposta para "proteger contra exclusão acidental ou conta comprometida".
- Snapshot EBS é **incremental**, mas o restore faz **lazy load** dos blocos: a primeira leitura é mais lenta.
- Replicação ≠ backup. Para erro humano e ransomware: **versionamento + Object Lock** (S3) ou **Vault Lock** (AWS Backup).

## 🧠 Teste-se primeiro

> [!question]- Quais serviços o AWS Backup suporta?
> Lista da doc: **EC2** (instâncias EBS-backed) · **S3** · **EBS** · **DynamoDB** · **RDS** (todos os engines) · **Aurora** · **Aurora DSQL** · **EFS** · **FSx** (Lustre, Windows File Server, NetApp ONTAP, OpenZFS) · **Storage Gateway (Volume Gateway)** · **DocumentDB** · **Neptune** · **Redshift** e **Redshift Serverless** · **Timestream for LiveAnalytics** · **VMware Cloud on AWS** (e em Outposts) · **CloudFormation stacks** · **SAP HANA no EC2** · **EKS**.

> [!question]- Como garantir que um backup não possa ser apagado nem por um administrador comprometido?
> **AWS Backup Vault Lock** — modelo *"write-once-read-many (WORM)"*. É o equivalente, no mundo de backup, do Object Lock em modo Compliance do S3.
> Reforço adicional: **vault em outra conta** (cross-account), de modo que o comprometimento da conta de produção não alcance a cópia.

> [!question]- Qual é a diferença prática entre snapshot do RDS e read replica como estratégia de DR?
> **Snapshot** é ponto no tempo, restaura numa **nova** instância, RTO de minutos a horas. **Read replica cross-Region** fica continuamente sincronizada (assíncrona) e pode ser **promovida**, com RTO muito menor.
> Para RPO/RTO realmente baixos em multi-região com Aurora: **Aurora Global Database** (RPO em segundos, RTO em minutos).

## Backup por serviço — o que a prova espera

| Serviço | Mecanismo nativo | Observação de prova |
|---|---|---|
| **EBS** | Snapshot (incremental, armazenado no S3, **regional**) | Pode ser copiado para outra região; AMI é snapshot + metadado. Restore faz **lazy load** |
| **RDS / Aurora** | Backup automático (janela de retenção) + snapshot manual | Snapshot manual **sobrevive** à exclusão da instância; o automático não |
| **DynamoDB** | **PITR** (1 a 35 dias, restaura em **tabela nova**) + on-demand backup | Tabela deletada mantém um backup de sistema por **35 dias**, sem custo |
| **S3** | Versionamento, replicação, Object Lock | Versionamento é o "backup" contra sobrescrita e exclusão |
| **EFS** | AWS Backup | Backup automático diário é padrão no FSx; no EFS vem do AWS Backup |
| **FSx** | Backup automático diário (ligado por padrão) | FSx for Lustre **scratch** não é durável |
| **Tudo junto** | **AWS Backup** com backup plan | A resposta quando o enunciado diz "centralizar", "política única", "várias contas" |

## Retenção e ciclo de vida de backup

- O **backup plan** define frequência, janela, retenção e transição para **cold storage**.
- Backups são **incrementais**.
- **AWS Backup Audit Manager** valida se os planos estão sendo cumpridos (resposta para "provar ao auditor que o backup existe e está na retenção certa").
- Para S3, lifecycle de **versões não atuais** é o que controla custo de versionamento (`NoncurrentVersionExpiration`).

## ❓ Questões de prova

> [!example]- Q1 — A empresa tem 25 contas e precisa de uma política única de backup para EBS, RDS, DynamoDB e EFS, com cópia em outra região e proteção contra exclusão. Qual solução?
> **A)** Lambda agendada por conta criando snapshots
> **B)** **AWS Backup com backup plan aplicado via Organizations, cópia cross-Region e Vault Lock** ✅
> **C)** Data Lifecycle Manager por conta
> **D)** AWS Config com remediação automática
>
> **Por que B**: cobre os quatro serviços, aplica centralmente via Organizations, copia cross-Region e trava a retenção com Vault Lock.
> **A errada**: esforço operacional alto e nenhuma proteção de retenção.
> **C errada**: DLM cobre **EBS snapshots e AMIs**, não RDS, DynamoDB ou EFS, e não é centralizado.
> **D errada**: Config avalia conformidade; não faz backup.

> [!example]- Q2 — Após um incidente de ransomware, a empresa quer garantir que nem um administrador com credencial comprometida possa apagar os backups. O que configurar?
> **A)** SCP negando `backup:DeleteRecoveryPoint`
> **B)** **AWS Backup Vault Lock, com os backups copiados para um vault em outra conta** ✅
> **C)** MFA obrigatório no console
> **D)** Backup em bucket S3 com versionamento
>
> **Por que B**: Vault Lock impede a exclusão *"including you"*, e a cópia cross-account tira o alvo do raio de ação da conta comprometida.
> **A errada**: SCP ajuda, mas não alcança a conta de gerenciamento e pode ser alterada por quem controla a organização.
> **C errada**: MFA protege o login, não o recurso.
> **D errada**: versionamento sem Object Lock ainda permite exclusão de versão por quem tem permissão.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Replicação é backup | Replicação propaga mudanças — inclusive as ruins |
| Snapshot está preso à AZ | Snapshot é **regional** (e copiável entre regiões). O **volume** é que é zonal |
| Restaurar snapshot é instantâneo | Volume fica disponível rápido, mas os blocos vêm **sob demanda** (lazy load) |
| Backup automático do RDS sobrevive à exclusão da instância | **Não.** Só o **snapshot manual** sobrevive |
| PITR do DynamoDB restaura no lugar | *"always restores to a new table"* |
| AWS Backup cobre tudo | Cobre uma lista grande, mas **não é universal** — confirme o serviço do enunciado |
| FSx for Lustre é sempre durável | **Scratch** não replica e não persiste em falha de servidor |
| Vault Lock pode ser revertido pelo dono | É WORM: *"prevent anyone (including you) from deleting backups"* |

## Links

- [[01 - Dominio 1 - Design Secure Architectures (30%)]]
- [[Protecao de dados no S3]]
- [[Disaster Recovery (RTO e RPO)]]
- [O que é o AWS Backup](https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html)
