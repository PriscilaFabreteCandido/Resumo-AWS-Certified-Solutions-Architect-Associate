---
servico: Amazon Detective
fonte: "[[1 - Seguranca (30%)/Detective/2 - Decorar|2 - Decorar]]"
---

# Detective — Flashcards

#flashcards/saa-c03/d1-seguranca/detective

Função principal do Detective?::**Investigar** e identificar a **causa raiz** de achados ou atividades suspeitas

Fontes de dados do Detective?::**CloudTrail**, **VPC Flow Logs** e achados do **GuardDuty**

Retenção de histórico do Detective?::**Até 1 ano**

Modelo de dados usado pelo Detective?::**Behavior graph** (grafo de comportamento)

O Detective gera achados?::Não, ele **explica** o achado; entra **depois** da detecção

Comportamento malicioso, IP suspeito, mineração de cripto: qual serviço?::**GuardDuty**

PII em buckets S3: qual serviço?::**Macie**

CVE e patch pendente em EC2, ECR, Lambda: qual serviço?::**Inspector**

Painel único de postura, várias contas, CIS/PCI: qual serviço?::**Security Hub**

Enunciado pede "últimos 6 meses de atividade daquele role": qual serviço e por quê?::**Detective**, porque retém até **1 ano** de histórico

Fontes de dados do GuardDuty?::**CloudTrail**, **VPC Flow Logs** e **DNS logs**
