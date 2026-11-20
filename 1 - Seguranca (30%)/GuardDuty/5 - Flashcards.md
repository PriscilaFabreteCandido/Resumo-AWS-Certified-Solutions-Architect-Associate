---
servico: Amazon GuardDuty
fonte: "[[1 - Seguranca (30%)/GuardDuty/2 - Decorar|2 - Decorar]]"
---

# GuardDuty — Flashcards

#flashcards/saa-c03/d1-seguranca/guardduty

O que o GuardDuty faz?::**Detecção de ameaças** contínua sobre fontes de dados e logs da AWS

Três fontes fundacionais do GuardDuty?::**CloudTrail management events**, **VPC Flow Logs** e **DNS logs**

Preciso habilitar VPC Flow Logs antes de ativar o GuardDuty?::**Não**: ele consome as fontes fundacionais direto, sem você ativar ou pagar esses logs

Fontes do GuardDuty que são planos opcionais?::S3 data events, EKS audit logs, RDS login activity, EBS (Malware Protection), Lambda network activity

Que técnicas o GuardDuty usa para detectar ameaças?::**Threat intelligence feeds** e **machine learning**

Malware em volume EBS: qual serviço?::**GuardDuty** (Malware Protection)

"Mineração de cripto", "IP suspeito", "comportamento anômalo": qual serviço?::**GuardDuty**

PII, CPF, cartão em buckets S3: qual serviço?::**Macie**

CVE e patch pendente: qual serviço?::**Inspector**

Painel único de postura em várias contas: qual serviço?::**Security Hub**

Causa raiz e correlação de um incidente: qual serviço?::**Detective**

Em que Task do guia o GuardDuty é citado nominalmente?::**Task 1.2** (serviços de segurança e seus casos de uso)
