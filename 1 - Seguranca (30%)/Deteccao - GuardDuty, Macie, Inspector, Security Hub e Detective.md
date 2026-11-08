---
tags: [saa-c03, dominio-1, guardduty, macie, inspector, security-hub, detective]
dominio: 1
tasks: [1.2]
atualizado: 2026-11-08
---

# Detecção — GuardDuty, Macie, Inspector, Security Hub e Detective

## 🧩 Em 30 segundos

Cinco serviços, cinco verbos diferentes. A prova testa exatamente isso:

| Serviço | Verbo | Fonte de dados |
|---|---|---|
| **GuardDuty** | **Detecta ameaça** (comportamento) | CloudTrail management events, VPC Flow Logs, DNS logs (+ planos opcionais) |
| **Macie** | **Descobre dado sensível** (PII) | Buckets S3 (inventário, política e conteúdo dos objetos) |
| **Inspector** | **Encontra vulnerabilidade** (CVE) | EC2, imagens no ECR, funções Lambda |
| **Security Hub** | **Agrega e mede postura** | Achados dos outros + controles próprios via AWS Config |
| **Detective** | **Investiga causa raiz** | CloudTrail + VPC Flow Logs + achados do GuardDuty, em grafo |

## 🧠 Teste-se primeiro

> [!question]- Uma instância EC2 está minerando criptomoeda. Quem detecta?
> **GuardDuty.** É detecção de **comportamento anômalo** a partir de VPC Flow Logs e DNS logs. *"a threat detection service that continuously monitors, analyzes, and processes AWS data sources and logs"*.

> [!question]- Um bucket contém CPFs e cartões de crédito sem ninguém saber. Quem acha?
> **Macie.** *"discovers sensitive data by using machine learning and pattern matching"*. Fonte: **buckets S3 de uso geral**.

> [!question]- Uma AMI tem uma versão vulnerável do OpenSSL. Quem acha?
> **Inspector.** *"automatically discovers workloads and continually scans them for software vulnerabilities and unintended network exposure"*. Cobre **EC2, imagens de container no ECR e Lambda**.

> [!question]- Preciso de um painel único, em 60 contas, medindo aderência a CIS e PCI. Quem faz?
> **Security Hub** (AWS Security Hub CSPM). *"provides you with a comprehensive view of your security state in AWS and helps you assess your AWS environment against security industry standards and best practices"*. Usa **AWS Config service-linked rules** para rodar os controles e agrega achados de GuardDuty, Inspector, Macie e parceiros.

> [!question]- O GuardDuty achou um acesso suspeito às 3h. Quero reconstruir o que aconteceu antes e depois. Quem usa?
> **Detective.** Extrai eventos temporais (*"login attempts, API calls, and network traffic"*) do CloudTrail e dos VPC Flow Logs, ingere achados do GuardDuty e guarda **até um ano** de histórico.

## GuardDuty — fontes de dados

| Fonte | Status |
|---|---|
| **CloudTrail management events** | Fundacional (sempre) |
| **VPC Flow Logs** | Fundacional |
| **DNS logs** | Fundacional |
| S3 data events | Plano de proteção opcional |
| EKS audit logs | Plano opcional |
| RDS login activity | Plano opcional |
| EBS volumes (malware) | Plano opcional |
| Lambda network activity | Plano opcional |

> [!important] A pegadinha das fontes fundacionais
> GuardDuty lê CloudTrail, VPC Flow Logs e DNS logs **sem você precisar habilitar nem pagar** por esses logs separadamente. Alternativa errada típica: "habilitar VPC Flow Logs e enviar para o CloudWatch antes de ativar o GuardDuty".

## Onde cada um aparece no guia oficial

O guia cita nominalmente, em *Task 1.2*: *"Security services with appropriate use cases (for example, Amazon Cognito, Amazon GuardDuty, Amazon Macie)"*. Os três são citação literal — vale saber de cor.

## ❓ Questões de prova

> [!example]- Q1 — Uma empresa precisa identificar, em 500 buckets S3, quais contêm dados pessoais de clientes, para classificação de compliance. Qual serviço?
> **A)** GuardDuty
> **B)** **Amazon Macie** ✅
> **C)** AWS Config com regra customizada
> **D)** Amazon Inspector
>
> **Por que B**: classificação de dado sensível no S3 é a razão de existir do Macie.
> **A errada**: GuardDuty detecta **atividade** maliciosa, não classifica conteúdo.
> **C errada**: Config avalia **configuração** do bucket (está público? tem versionamento?), não o **conteúdo** dos objetos.
> **D errada**: Inspector é vulnerabilidade de software, não conteúdo de dados.

> [!example]- Q2 — O time de segurança quer saber se as instâncias EC2 e as imagens no ECR têm CVEs conhecidas, de forma contínua e sem agente a instalar manualmente. Qual serviço?
> **A)** **Amazon Inspector** ✅
> **B)** AWS Security Hub
> **C)** GuardDuty com malware protection
> **D)** AWS Config
>
> **Por que A**: varredura contínua de vulnerabilidade de software em EC2, ECR e Lambda.
> **B errada**: Security Hub **agrega** achados (inclusive do Inspector); não faz o scan de CVE.
> **C errada**: Malware Protection do GuardDuty procura **malware em volumes EBS**, não CVE em pacotes.
> **D errada**: Config é configuração e conformidade, não CVE.

> [!example]- Q3 — Depois de um incidente, o analista precisa ver todas as chamadas de API e o tráfego de rede relacionados a um role comprometido nos últimos 30 dias, correlacionados automaticamente. Qual serviço?
> **A)** CloudTrail Lake com query SQL
> **B)** **Amazon Detective** ✅
> **C)** Security Hub
> **D)** CloudWatch Logs Insights
>
> **Por que B**: Detective é feito para **investigação e causa raiz**, correlacionando CloudTrail + VPC Flow Logs + achados do GuardDuty num grafo de comportamento.
> **A errada**: dá para fazer, mas é consulta manual e você monta a correlação à mão — mais esforço operacional.
> **C errada**: Security Hub mostra o achado, não a investigação.
> **D errada**: Logs Insights consulta logs; não correlaciona entidades de segurança.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| GuardDuty escaneia vulnerabilidade | Vulnerabilidade/CVE é **Inspector** |
| Security Hub detecta ameaça | **Agrega** achados e avalia postura. Detecção é GuardDuty/Inspector/Macie |
| Detective detecta | **Investiga.** Quem detecta é o GuardDuty |
| Macie olha qualquer storage | **Buckets S3 de uso geral** |
| Inspector só cobre EC2 | Cobre **EC2, ECR e Lambda** |
| Preciso habilitar VPC Flow Logs para o GuardDuty funcionar | Não: CloudTrail, VPC Flow Logs e DNS logs são fontes **fundacionais** consumidas direto |
| Security Hub substitui o AWS Config | Security Hub **usa** service-linked rules do Config para rodar os controles |
| CloudTrail é um serviço de detecção | CloudTrail **registra** a chamada de API. Quem interpreta é GuardDuty/Detective |

## Links

- [[01 - Dominio 1 - Design Secure Architectures (30%)]]
- [[Protecao de borda - WAF, Shield e Firewall Manager]]
- [[Observabilidade - CloudWatch, CloudTrail e Config]]
