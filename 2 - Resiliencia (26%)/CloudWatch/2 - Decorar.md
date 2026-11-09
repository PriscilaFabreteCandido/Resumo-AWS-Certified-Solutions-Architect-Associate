---
tags: [saa-c03, cloudwatch, decorar]
servico: Amazon CloudWatch
atualizado: 2026-11-08
---

# CloudWatch — Decorar

## O que precisa de agente

| Métrica | Vem por padrão? |
|---|---|
| CPU, rede, disco **I/O**, status check | **✅ Sim** (do hipervisor) |
| **Uso de memória** | **❌ CloudWatch agent** |
| **Espaço livre em disco** | **❌ CloudWatch agent** |
| Logs do SO e da aplicação | **❌ CloudWatch agent** |

> [!warning] Memória e disco não são visíveis ao hipervisor
> Pergunta direta de prova: "como monitorar memória da instância?" → **CloudWatch agent**.

## Resolução e retenção

| Item | Valor |
|---|---|
| Resolução padrão | **1 minuto** |
| **High-resolution** | até **1 segundo** |
| Detailed monitoring (EC2) | muda de **5 min** para **1 min** — ⚠️ **não** adiciona métricas de SO |
| Retenção de log group | **"Never expire"** por padrão — **configure** |
| Métrica de **billing** | só em **us-east-1** |

## Estados de alarme

**OK** · **ALARM** · **INSUFFICIENT_DATA**

Ações possíveis: **SNS**, **Auto Scaling**, **ação de EC2** (stop, terminate, reboot, recover), **Systems Manager**.

## Métrica de escala — não é sempre CPU

| Workload | Métrica |
|---|---|
| Web atrás de ALB | **`RequestCountPerTarget`** ou CPU |
| **Consumidor de fila** | **`ApproximateNumberOfMessagesVisible`** (backlog por instância) |
| Conexão longa | `ActiveConnectionCount` |
| Métrica de negócio | **custom metric** |

## Multi-conta

| Necessidade | Recurso |
|---|---|
| Métricas e logs de N contas numa só | **CloudWatch cross-account observability** |
| Chamadas de API de N contas | **CloudTrail organization trail** |
| Conformidade de N contas | **AWS Config aggregator** |
| Achados de segurança de N contas | **Security Hub** |

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
