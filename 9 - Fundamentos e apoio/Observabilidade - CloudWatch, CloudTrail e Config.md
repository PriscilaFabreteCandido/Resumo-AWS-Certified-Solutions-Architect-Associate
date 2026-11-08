---
tags: [saa-c03, fundamentos, cloudwatch, cloudtrail, config, x-ray]
tasks: [2.2]
atualizado: 2026-11-08
---

# Observabilidade — CloudWatch, CloudTrail, Config e X-Ray

## 🧩 Em 30 segundos

Quatro serviços, quatro perguntas diferentes. A prova testa só isso:

| Pergunta | Serviço |
|---|---|
| "A CPU está alta? O disco encheu? Quantas mensagens na fila?" | **CloudWatch** (métricas, alarmes, logs, dashboards) |
| "**Quem** chamou essa API, quando, de qual IP?" | **CloudTrail** |
| "Essa configuração mudou quando? Está conforme a regra?" | **AWS Config** |
| "Onde a requisição gastou tempo nesse caminho de microsserviços?" | **AWS X-Ray** |

## 🧠 Teste-se primeiro

> [!question]- As quatro definições oficiais, em uma linha cada
> **CloudWatch**: *"monitors your Amazon Web Services (AWS) resources and the applications you run on AWS in real time, and offers many tools to give you system-wide observability of your application performance, operational health, and resource utilization."*
> **CloudTrail**: *"helps you enable operational and risk auditing, governance, and compliance of your AWS account. Actions taken by a user, role, or an AWS service are recorded as events."*
> **AWS Config**: *"provides a detailed view of the configuration of AWS resources in your AWS account. This includes how the resources are related to one another and how they were configured in the past."*
> **X-Ray**: está em escopo e é citado no guia como *"Workload visibility (for example, AWS X-Ray)"* — rastreia a requisição ponta a ponta entre serviços.

> [!question]- CloudTrail: quanto tempo de histórico é grátis?
> **Event history**: *"the past 90 days of management events in an AWS Region"*, sem custo.
> Para mais tempo: **trail** gravando em S3 (retenção que você definir) ou **CloudTrail Lake** — *"up to 3,653 days (about 10 years)"* na opção de retenção estendida (ou até 2.557 dias, ~7 anos, na outra).
>
> Tipos de evento: **management events** (chamadas de plano de controle, gravadas por padrão) · **data events** (operações em dados, como `s3:GetObject` e `lambda:Invoke` — **não** gravados por padrão, e cobrados) · **insights events** (atividade anômala).

> [!question]- O que o CloudWatch NÃO vê por padrão numa instância EC2?
> Métricas de **dentro** do sistema operacional: **uso de memória** e **espaço em disco**. O hipervisor não enxerga isso.
> Para obtê-las, instale o **CloudWatch agent** (que também envia logs do SO e da aplicação).
> É pergunta direta de prova: "como monitorar memória da instância?" → **CloudWatch agent**.

> [!question]- Como centralizar logs e métricas de 40 contas?
> **CloudWatch cross-account observability** (contas de origem → conta de monitoramento), **organization trail** do CloudTrail (um trail para toda a organização), **Config aggregator** (visão multi-conta e multi-região da conformidade) e **Security Hub** para achados de segurança.

## CloudWatch — componentes

| Componente | Para quê |
|---|---|
| **Métricas** | Padrão (por serviço) e **custom metrics**. Resolução padrão **1 minuto**; **high-resolution** até **1 segundo** |
| **Alarmes** | Disparam SNS, ação de Auto Scaling, ação de EC2 (stop/terminate/reboot/recover). Estados: OK, ALARM, INSUFFICIENT_DATA |
| **Composite alarm** | Combina alarmes para reduzir ruído |
| **Logs** | Log groups e streams. ⚠️ Retenção padrão é **Never expire** — configure, ou vira custo |
| **Logs Insights** | Consulta os logs com linguagem própria |
| **Dashboards** | Painéis (podem ser cross-account e cross-Region) |
| **Metric filter** | Transforma padrão de log em métrica (e aí em alarme) |
| **Synthetics canary** | Monitoramento sintético de endpoint |
| **Container / Lambda Insights** | Observabilidade pré-montada |
| **Alarme de billing** | Métrica de billing existe só em **us-east-1** |

> [!tip] Métrica de escala não é sempre CPU
> O guia pede *"Identifying metrics and conditions to perform scaling actions"*. Para consumidor de fila, a métrica é **`ApproximateNumberOfMessagesVisible`** (ou backlog por instância), não CPU. Para web atrás de ALB, **`RequestCountPerTarget`** costuma ser melhor que CPU.

## AWS Config

- Registra **configuration items** e o **histórico** de cada recurso, mais as relações entre eles.
- **Config rules** (gerenciadas ou customizadas via Lambda) marcam recursos **noncompliant**; **remediation** pode corrigir automaticamente via SSM Automation.
- **Conformance packs**: conjuntos de regras por framework.
- **Aggregator**: visão consolidada multi-conta/multi-região.
- O **Security Hub** usa **service-linked rules do Config** para rodar seus controles.

> [!important] Config detecta, SCP previne
> Quando o enunciado diz **"impedir"**, **"não permitir que"**, **"prevenir"** → **SCP** (ou IAM).
> Quando diz **"detectar"**, **"auditar"**, **"relatar não conformidade"**, **"corrigir automaticamente"** → **AWS Config**.

## X-Ray

- Rastreia a requisição por vários serviços e mostra o **service map** com latência por segmento.
- Integra com Lambda, API Gateway (REST), ECS, EKS, EC2, Elastic Beanstalk, SDK.
- Resposta para "onde está o gargalo numa arquitetura de microsserviços" e "qual chamada downstream está lenta".
- ⚠️ Ele é o **único** item de Developer Tools na lista de serviços **em escopo** do SAA-C03.

## ❓ Questões de prova

> [!example]- Q1 — Auditoria quer saber qual usuário deletou um bucket S3 há 45 dias. Onde procurar?
> **A)** CloudWatch Logs
> **B)** **CloudTrail event history** ✅
> **C)** AWS Config
> **D)** VPC Flow Logs
>
> **Por que B**: CloudTrail registra *"Actions taken by a user, role, or an AWS service"*, e o event history cobre os **últimos 90 dias** de management events sem custo. `DeleteBucket` é management event.
> **A errada**: CloudWatch Logs guarda logs que você envia, não chamadas de API da conta.
> **C errada**: Config mostraria que o bucket **existia e deixou de existir**, e a configuração anterior — mas não **quem** fez a chamada.
> **D errada**: Flow Logs registram tráfego de rede.

> [!example]- Q2 — A equipe precisa de alerta quando o **uso de memória** de instâncias EC2 passar de 85%. O que é necessário?
> **A)** Criar um alarme na métrica `MemoryUtilization` do CloudWatch
> **B)** **Instalar o CloudWatch agent para publicar a métrica de memória e criar o alarme sobre ela** ✅
> **C)** Habilitar detailed monitoring
> **D)** Usar o Compute Optimizer
>
> **Por que B**: memória e espaço em disco são métricas **de dentro do SO** — o hipervisor não as expõe. Só existem com o agent.
> **A errada**: essa métrica não existe por padrão.
> **C errada**: detailed monitoring muda a **frequência** (1 min em vez de 5), não adiciona métricas de SO.
> **D errada**: Compute Optimizer recomenda rightsizing; não gera alarme operacional.

> [!example]- Q3 — Compliance exige detectar, em 30 contas, qualquer security group que libere a porta 22 para `0.0.0.0/0`, e corrigir automaticamente. Qual solução?
> **A)** SCP negando `ec2:AuthorizeSecurityGroupIngress`
> **B)** **AWS Config rule (restricted-ssh) com remediação automática, agregada pelas 30 contas** ✅
> **C)** GuardDuty
> **D)** Security Hub com controles habilitados
>
> **Por que B**: o enunciado pede **detectar e corrigir** — é a função de Config rule + remediation, com aggregator para a visão multi-conta.
> **A errada**: SCP **preveniria**, mas bloquearia também os usos legítimos da API; e o enunciado pede detecção e correção, não bloqueio.
> **C errada**: GuardDuty detecta **ameaça/comportamento**, não desvio de configuração.
> **D errada**: Security Hub **mostraria** o achado (ele roda controles via Config), mas a remediação automática configurada é do **Config**.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| CloudWatch registra quem chamou a API | Isso é **CloudTrail** |
| CloudTrail mostra métricas de performance | Isso é **CloudWatch** |
| Config mostra quem fez a mudança | Mostra **o que** mudou e **quando**. Quem fez é **CloudTrail** |
| CloudWatch vê memória e disco por padrão | Precisa do **CloudWatch agent** |
| Detailed monitoring adiciona métricas de SO | Só muda a **frequência** (5 min → 1 min) |
| Data events do CloudTrail vêm ligados | **Não.** Management events sim; data events são opcionais e cobrados |
| Log group tem retenção padrão curta | O padrão é **Never expire** — custo silencioso |
| Alarme de billing existe em qualquer região | Só em **us-east-1** |
| Config previne configuração errada | **Detecta e remedia.** Prevenir é **SCP/IAM** |
| X-Ray está fora de escopo porque é Developer Tools | **Está em escopo** — é o único dessa categoria |

## Links

- [[02 - Dominio 2 - Design Resilient Architectures (26%)]]
- [[Deteccao - GuardDuty, Macie, Inspector, Security Hub e Detective]]
- [[Alta disponibilidade - ELB, Auto Scaling e Route 53]]
- [[Ferramentas de custo - Cost Explorer, Budgets e CUR]]
- [O que é o CloudWatch](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html)
- [Guia do usuário do CloudTrail](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html)
