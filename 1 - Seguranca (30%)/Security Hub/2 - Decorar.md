---
tags: [saa-c03, security-hub, decorar]
servico: AWS Security Hub (CSPM)
atualizado: 2026-11-08
---

# Security Hub — Decorar

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

Título da página: **"AWS Security Hub Cloud Security Posture Management (AWS Security Hub CSPM)"**.

> *"provides you with a comprehensive view of your security state in AWS and helps you assess your AWS environment against security industry standards and best practices."*

> *"collects security data across AWS accounts, AWS services, and supported third-party products."*

## As duas funções

| Função | Detalhe |
|---|---|
| **Agregar achados** | De **GuardDuty, Inspector, Macie** e produtos de parceiros, num formato único (ASFF) |
| **Rodar controles próprios** | Checagens contra padrões, usando **service-linked rules do AWS Config** |

> [!important] Security Hub depende do AWS Config
> Os controles do Security Hub rodam **através de service-linked rules do AWS Config**. Sem o Config habilitado na conta e região, os controles não avaliam nada. É pré-requisito que aparece em alternativa.

## Padrões (standards) que ele avalia

- **AWS Foundational Security Best Practices**
- **CIS AWS Foundations Benchmark**
- **PCI DSS**
- **NIST SP 800-53**

## Gatilhos no enunciado

| Frase | Por que Security Hub |
|---|---|
| "painel único de segurança" | É o agregador |
| "várias contas / toda a organização" | Modelo administrador/membro via Organizations |
| "aderência ao CIS / PCI / NIST" | Avalia contra os padrões |
| "postura de segurança" | É literalmente CSPM |
| "consolidar achados de GuardDuty, Inspector e Macie" | É a função primária |

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
