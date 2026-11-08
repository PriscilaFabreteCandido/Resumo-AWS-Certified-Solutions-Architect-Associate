---
tags: [saa-c03, guardduty, decorar]
servico: Amazon GuardDuty
atualizado: 2026-11-08
---

# GuardDuty — Decorar

## A tabela que decide a questão

| Serviço | Verbo | Fonte de dados | Gatilho no enunciado |
|---|---|---|---|
| **GuardDuty** | Detecta **ameaça** | CloudTrail · VPC Flow Logs · DNS logs | "atividade maliciosa", "mineração de cripto", "IP suspeito", "comportamento anômalo" |
| **Macie** | Descobre **dado sensível** | Buckets **S3** | "PII", "CPF", "cartão de crédito", "classificar dados", "LGPD/GDPR" |
| **Inspector** | Encontra **vulnerabilidade** | EC2 · ECR · Lambda | "CVE", "vulnerabilidade de software", "patch pendente", "exposição de rede" |
| **Security Hub** | **Agrega** e mede postura | Os outros + AWS Config | "painel único", "várias contas", "aderência ao CIS/PCI", "postura de segurança" |
| **Detective** | **Investiga** causa raiz | CloudTrail · VPC Flow Logs · GuardDuty | "causa raiz", "investigar", "reconstruir o que aconteceu", "correlacionar" |

> [!tip] O atalho
> **Comportamento** → GuardDuty. **Conteúdo do dado** → Macie. **Software desatualizado** → Inspector. **Consolidar** → Security Hub. **Entender o incidente** → Detective.

## Fontes de dados do GuardDuty

| Fonte | Status |
|---|---|
| **CloudTrail management events** | **Fundacional** (sempre) |
| **VPC Flow Logs** | **Fundacional** |
| **DNS logs** | **Fundacional** |
| S3 data events | Plano opcional |
| EKS audit logs | Plano opcional |
| RDS login activity | Plano opcional |
| EBS volumes (Malware Protection) | Plano opcional |
| Lambda network activity | Plano opcional |

> [!important] As três fundacionais não precisam ser habilitadas por você
> O GuardDuty consome CloudTrail, VPC Flow Logs e DNS logs **direto**, sem que você ative ou pague esses logs separadamente. A alternativa errada clássica é *"habilitar VPC Flow Logs e enviar para o CloudWatch antes de ativar o GuardDuty"*.

## Definição oficial

> *"Amazon GuardDuty is a threat detection service that continuously monitors, analyzes, and processes AWS data sources and logs in your AWS environment."*

Usa **threat intelligence feeds** e **modelos de machine learning**.

## Onde o guia cita

**Task 1.2**, nominalmente: *"Security services with appropriate use cases (for example, Amazon Cognito, Amazon GuardDuty, Amazon Macie)"*.

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
