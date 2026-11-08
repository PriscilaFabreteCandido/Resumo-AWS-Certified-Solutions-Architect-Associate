---
tags: [saa-c03, elb, decorar]
servico: Elastic Load Balancing
atualizado: 2026-11-08
---

# ELB — Decorar

## A tabela que mais cai

| | **ALB** | **NLB** | **GWLB** |
|---|---|---|---|
| **Camada OSI** | **7** (application) | **4** (transport) | **3** (network) |
| **Protocolos** | HTTP/0.9, 1.0, 1.1, **HTTP/2** (só em listener HTTPS), gRPC no backend, WebSocket | TCP, UDP, TCP_UDP, TLS, **QUIC**, TCP_QUIC | **todos os pacotes IP, todas as portas** |
| **Endereço** | DNS name | **IP estático por AZ** (+ EIP opcional) | — |
| **Cross-zone** | **sempre ligado** no LB (desligável por target group) | **desligado por padrão** | **desligado por padrão** |
| **Targets** | EC2, container, **IP** (inclusive fora da VPC), **Lambda** | instance ID, IP, **um ALB** | appliances virtuais |
| **Roteamento** | **host**, **path**, header HTTP, query string, source IP; redirect; fixed response | hash de fluxo (5-tuple) | hash de fluxo (5-tuple, 3-tuple ou 2-tuple) |
| **AWS WAF** | **✅** | ❌ | ❌ |
| **AZs mínimas** | **2+** | — | — |
| **MTU (jumbo)** | 9001 | 9001 | **8500** |

## Números

| Item | Valor |
|---|---|
| **TTL do DNS** do load balancer | **60 segundos** |
| **GENEVE** (GWLB) | porta **6081** |
| **Connection draining** (deregistration delay) | **300 s** por padrão |
| Algoritmo padrão do ALB | round robin (ou *least outstanding requests*) |
| NLB: conexão TCP | *"Each individual TCP connection is routed to a single target for the life of the connection"* |

## Alvos de alias no Route 53

O ALB, o NLB e o CLB podem ser alvo de **alias record** — e por isso funcionam no **ápice do domínio** (`exemplo.com`), onde CNAME não funciona.

## Health check

O ELB *"routes traffic only to the healthy targets"*. O health check é configurado no **target group** (protocolo, porta, caminho, intervalo, threshold).

⚠️ No **Auto Scaling**, o health check do ELB **não vem ligado** — só o EC2 status check. Sem ativá-lo, o ASG não substitui instância cuja **aplicação** morreu.

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[02 - Numeros para decorar]]
