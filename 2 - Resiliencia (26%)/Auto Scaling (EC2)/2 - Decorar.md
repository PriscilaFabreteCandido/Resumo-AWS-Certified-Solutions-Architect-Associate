---
tags: [saa-c03, auto-scaling, decorar]
servico: Amazon EC2 Auto Scaling
atualizado: 2026-11-08
---

# Auto Scaling — Decorar

## Os números

| Item | Valor |
|---|---|
| **Cooldown padrão** | **300 s (5 min)** — e só se aplica a **simple scaling** |
| **Health check grace period** | **300 s** no console, **0 s** via CLI/SDK |
| **Lifecycle hook timeout** | **1 hora** (heartbeat); global **48 h** ou 100× o heartbeat |
| **Rebalanceamento entre AZs** | pode exceder o máximo em **10%** (ou 1 instância) |
| **Throttle de substituição** | acima de 90% da capacidade desejada, substitui no máximo **10%** por vez |
| **Connection draining do ELB** | **300 s** por padrão |
| **Auto scaling do DynamoDB** (comparação) | alvo **70%**, dispara após **2 min** consecutivos |

## Health checks — qual vem ligado

| Tipo | Padrão |
|---|---|
| EC2 status checks e scheduled events | **✅ ligado** |
| **Elastic Load Balancing** | ❌ **ativar** |
| VPC Lattice | ❌ ativar |
| Amazon EBS | ❌ ativar |
| Custom | ❌ via API |

## Ordem padrão de terminação (decore a sequência)

1. **AZ com mais instâncias** (e pelo menos uma sem proteção de scale-in)
2. Dentro dela, configuração mais antiga:
   - instâncias com **launch configuration**
   - instâncias com **launch template diferente** do atual
   - instâncias com a **versão mais antiga** do template atual
3. A mais próxima da **próxima hora de cobrança** (se empatar, aleatória)

> *"Maintaining Zonal balance takes precedence over the termination policy."*
> Instância marcada **unhealthy** é substituída **sem esperar cooldown**.

Políticas predefinidas: `Default`, `AllocationStrategy`, `OldestLaunchTemplate`, `OldestLaunchConfiguration`, `ClosestToNextInstanceHour`, `NewestInstance`, `OldestInstance`.

## Cooldown × warm-up

| | **Cooldown** | **Instance warmup** |
|---|---|---|
| Usado por | **Simple scaling** | **Target tracking** e **step scaling** |
| Efeito | Bloqueia novas ações de escala | Ignora a instância nas métricas até estar pronta |
| Padrão | **300 s** | Default instance warmup |

Target tracking e step *"can initiate a scale-out activity immediately without waiting for the cooldown period to end"*.

## Métrica de escala — não é sempre CPU

| Workload | Métrica |
|---|---|
| Web síncrona | **CPU** ou **`RequestCountPerTarget`** do ALB |
| **Consumidor de fila** | **`ApproximateNumberOfMessagesVisible`** (backlog por instância) |
| Conexão longa | `ActiveConnectionCount` |
| Métrica própria | **custom metric** no CloudWatch |

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[02 - Numeros para decorar]]
