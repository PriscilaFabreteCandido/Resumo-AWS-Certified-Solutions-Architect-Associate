---
tags: [saa-c03, aws-backup, decorar]
servico: AWS Backup
atualizado: 2026-11-08
---

# AWS Backup — Decorar

## As peças

| Peça | O que é |
|---|---|
| **Backup plan** | *"backup policies known as backup plans"* — frequência, janela, retenção, transição para cold storage |
| **Backup vault** | Onde os backups ficam, *"which separates them safely from their source instances"* |
| **Vault Lock** | **WORM**: *"prevent anyone (including you) from deleting backups or altering their retention period"* |
| **Backup Audit Manager** | Valida se os planos estão sendo cumpridos (evidência para auditor) |
| **Cópia cross-Region / cross-account** | Sob demanda ou dentro do plano agendado |

Backups são **incrementais**.

## Backup nativo por serviço (quando o AWS Backup é opcional)

| Serviço | Mecanismo nativo | Detalhe de prova |
|---|---|---|
| **EBS** | Snapshot (incremental, **regional**) | Restore faz **lazy load** dos blocos |
| **RDS / Aurora** | Backup automático + snapshot manual | ⚠️ **Só o snapshot manual sobrevive** à exclusão da instância |
| **DynamoDB** | **PITR (1 a 35 dias)** + on-demand | Restaura **sempre em tabela nova**; tabela deletada guarda backup por **35 dias** |
| **S3** | Versionamento + replicação + Object Lock | Versionamento é a proteção contra sobrescrita e exclusão |
| **FSx** | Backup automático diário (**ligado por padrão**) | ⚠️ FSx for Lustre **scratch** não é durável |
| **EFS** | Via **AWS Backup** | — |

## Proteção contra exclusão maliciosa — a combinação

```
Backup plan
    ↓
Vault na própria conta
    ↓ cópia cross-account
Vault numa conta SEPARADA (ex.: Log Archive)
    ↓
VAULT LOCK (WORM) + retenção mínima
```

O equivalente, no S3, é **versionamento + Object Lock em modo Compliance**.

## Replicação ≠ backup

| Mecanismo | Protege de |
|---|---|
| **Replicação** (S3 CRR, read replica) | Falha de **infraestrutura** |
| **Backup com retenção e WORM** | **Erro humano**, **ransomware**, exclusão maliciosa |

Replicação propaga a mudança ruim. Backup guarda o estado anterior.

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
