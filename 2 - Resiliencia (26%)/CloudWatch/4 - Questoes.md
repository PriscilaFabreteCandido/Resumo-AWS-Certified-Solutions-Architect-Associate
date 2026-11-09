---
tags: [saa-c03, cloudwatch, questoes]
servico: Amazon CloudWatch
atualizado: 2026-11-08
---

# CloudWatch — Questões

> [!question]- Q1. Alertar quando o **uso de memória** de instâncias EC2 passar de 85%.
> **A)** Criar alarme na métrica `MemoryUtilization`
> **B)** **Instalar o CloudWatch agent para publicar a métrica de memória, e criar o alarme sobre ela** ✅
> **C)** Habilitar detailed monitoring
> **D)** Usar o Compute Optimizer
>
> **Por que B**: memória e disco são métricas **de dentro do SO** — o hipervisor não as expõe.
> **A errada**: essa métrica não existe por padrão.
> **C errada**: detailed monitoring muda a **frequência** (5 min → 1 min), não adiciona métricas de SO.
> **D errada**: Compute Optimizer recomenda rightsizing; não gera alarme operacional.

> [!question]- Q2. A fatura do CloudWatch Logs cresce continuamente, mesmo com volume de log estável.
> **A)** Os logs estão duplicados
> **B)** **A retenção dos log groups está em "Never expire" (padrão) — configure a retenção** ✅
> **C)** Falta criptografia
> **D)** Falta um subscription filter
>
> **Por que B**: o padrão é nunca expirar; o acervo cresce para sempre.

> [!question]- Q3. Alertar quando a aplicação registrar mais de 10 erros `5xx` por minuto no log.
> **A)** Logs Insights com consulta agendada
> **B)** **Metric filter no log group, gerando métrica, com alarme sobre ela** ✅
> **C)** Synthetics canary
> **D)** CloudTrail
>
> **Por que B**: metric filter transforma padrão de log em métrica, e a métrica em alarme.
> **A errada**: Logs Insights consulta sob demanda; não é mecanismo de alarme.
> **C errada**: canary testa de fora; não lê o log da aplicação.

> [!question]- Q4. Centralizar métricas e logs de 40 contas numa visão única.
> **A)** Um dashboard por conta
> **B)** **CloudWatch cross-account observability, com uma conta de monitoramento** ✅
> **C)** CloudTrail organization trail
> **D)** AWS Config aggregator
>
> **Por que B**: é o recurso específico para observabilidade multi-conta.
> **C errada**: CloudTrail trata **chamadas de API**.
> **D errada**: Config trata **configuração e conformidade**.

> [!question]- Q5. Um consumidor de fila em ASG não escala; a CPU fica em 20% e a fila acumula.
> **A)** Alarme de CPU com limite menor
> **B)** **Target tracking sobre `ApproximateNumberOfMessagesVisible` (backlog por instância)** ✅
> **C)** Detailed monitoring
> **D)** Composite alarm
>
> **Por que B**: a métrica precisa refletir o **trabalho pendente**.

> [!question]- Q6. Detectar que o site está indisponível para o usuário final, antes de receber reclamação.
> **A)** Alarme de CPU
> **B)** **CloudWatch Synthetics canary** ✅
> **C)** Health check do ALB
> **D)** VPC Flow Logs
>
> **Por que B**: o canary faz requisições sintéticas do **ponto de vista do usuário**.
> **C errada**: o health check do ALB valida o target, não a experiência ponta a ponta (DNS, CDN, TLS).

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| CloudWatch vê memória e disco por padrão | Precisa do **CloudWatch agent** |
| Detailed monitoring adiciona métricas de SO | Só muda a **frequência** |
| CloudWatch mostra quem chamou a API | Isso é **CloudTrail** |
| CloudWatch mostra mudança de configuração | Isso é **AWS Config** |
| Log group tem retenção curta por padrão | É **"Never expire"** |
| Métrica que para de ser publicada vai para ALARM | Vai para **INSUFFICIENT_DATA** |
| Alarme de billing funciona em qualquer região | Só em **us-east-1** |
| Escalar é sempre por CPU | Para fila, é pela **profundidade da fila** |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
