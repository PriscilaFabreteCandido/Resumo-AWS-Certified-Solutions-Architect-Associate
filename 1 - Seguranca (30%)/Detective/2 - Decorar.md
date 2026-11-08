---
tags: [saa-c03, detective, decorar]
servico: Amazon Detective
atualizado: 2026-11-08
---

# Detective — Decorar

## A tabela que decide a questão

| Serviço | Verbo | Fonte de dados | Gatilho no enunciado |
|---|---|---|---|
| **GuardDuty** | Detecta **ameaça** | CloudTrail · VPC Flow Logs · DNS logs | "atividade maliciosa", "mineração de cripto", "IP suspeito" |
| **Macie** | Descobre **dado sensível** | Buckets **S3** | "PII", "CPF", "cartão", "classificar dados", "LGPD" |
| **Inspector** | Encontra **vulnerabilidade** | EC2 · ECR · Lambda | "CVE", "vulnerabilidade de software", "patch pendente" |
| **Security Hub** | **Agrega** e mede postura | Os outros + AWS Config | "painel único", "várias contas", "CIS/PCI", "postura" |
| **Detective** | **Investiga** causa raiz | CloudTrail · VPC Flow Logs · GuardDuty | "causa raiz", "investigar", "correlacionar" |

> [!tip] O atalho
> **Comportamento** → GuardDuty. **Conteúdo do dado** → Macie. **Software desatualizado** → Inspector. **Consolidar** → Security Hub. **Entender o incidente** → Detective.

## Definição oficial

> *"Amazon Detective helps you analyze, investigate, and quickly identify the root cause of security findings or suspicious activities."*

## Fonte de dados e retenção

> *"Detective automatically extracts time-based events such as login attempts, API calls, and network traffic from AWS CloudTrail and Amazon VPC flow logs. It also ingests findings detected by GuardDuty."*

| Item | Valor |
|---|---|
| Fontes | **CloudTrail** · **VPC Flow Logs** · achados do **GuardDuty** |
| Retenção de histórico | **até 1 ano** |
| Modelo | Grafo de comportamento (behavior graph) |

## O lugar dele na linha do tempo



Detective entra **depois** da detecção. Ele não gera achado — ele explica o achado.

## Gatilhos no enunciado

| Frase | Por que Detective |
|---|---|
| "**causa raiz**" | É a palavra literal da definição |
| "investigar", "analisar o incidente" | Função primária |
| "reconstruir o que aconteceu antes e depois" | Eventos temporais em grafo |
| "correlacionar automaticamente CloudTrail e Flow Logs" | É o que ele monta sozinho |
| "últimos 6 meses de atividade daquele role" | Retenção de até 1 ano |

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
