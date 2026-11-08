---
tags: [saa-c03, macie, decorar]
servico: Amazon Macie
atualizado: 2026-11-08
---

# Macie — Decorar

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

## Definição oficial

> *"Amazon Macie is a data security service that discovers sensitive data by using machine learning and pattern matching, provides visibility into data security risks, and enables automated protection against those risks."*

## O que o Macie faz, em três linhas

| Função | Detalhe |
|---|---|
| **Inventário de buckets** | Quais buckets existem, se são públicos, se são criptografados, se são compartilhados |
| **Avaliação de risco** | Política e controle de acesso de cada bucket |
| **Descoberta de dado sensível** | Inspeciona o **conteúdo** dos objetos: PII, credencial, dado financeiro, dado de saúde |

## Escopo

**Somente Amazon S3** (buckets de uso geral). Macie **não** olha EBS, RDS, DynamoDB nem EFS.

## Tipos de dado identificados

Identificadores gerenciados (CPF e equivalentes por país, cartão de crédito, chave de API, credencial AWS, dado de saúde, dado financeiro) e **identificadores customizados** que você define por regex.

## Onde o guia cita

**Task 1.2**, nominalmente: *"Security services with appropriate use cases (for example, Amazon Cognito, Amazon GuardDuty, Amazon Macie)"*.
E se conecta a **Task 1.3**: *"Data retention and classification"*.

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
