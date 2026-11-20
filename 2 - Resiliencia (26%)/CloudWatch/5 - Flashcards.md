---
servico: Amazon CloudWatch
fonte: "[[2 - Resiliencia (26%)/CloudWatch/2 - Decorar|2 - Decorar]]"
---

# CloudWatch — Flashcards

#flashcards/saa-c03/d2-resiliencia/cloudwatch

Como monitorar uso de memória e espaço livre em disco de uma EC2?::Instalar o **CloudWatch agent** (o hipervisor não enxerga isso)

Quais métricas de EC2 vêm por padrão, sem agente?::**CPU**, **rede**, **disco I/O** e **status check**

Resolução padrão e resolução máxima (high-resolution) de métricas no CloudWatch?::Padrão **1 minuto**; high-resolution até **1 segundo**

O que muda ao ativar detailed monitoring na EC2?::A frequência vai de **5 min** para **1 min**; **não** adiciona métricas de SO

Retenção padrão de um log group no CloudWatch Logs?::**Never expire** (precisa configurar)

Em que região ficam as métricas de billing?::Só em **us-east-1**

Quais são os três estados de um alarme do CloudWatch?::**OK**, **ALARM** e **INSUFFICIENT_DATA**

Que ações um alarme do CloudWatch pode disparar?::**SNS**, **Auto Scaling**, **ação de EC2** (stop, terminate, reboot, recover) e **Systems Manager**

Métrica para escalar consumidores de uma fila?::**`ApproximateNumberOfMessagesVisible`** (backlog por instância)

Como escalar por uma métrica de negócio?::Publicar uma **custom metric** no CloudWatch

Como centralizar métricas e logs de N contas numa só?::**CloudWatch cross-account observability**

Como centralizar chamadas de API e conformidade de N contas?::API: **CloudTrail organization trail**. Conformidade: **AWS Config aggregator**
