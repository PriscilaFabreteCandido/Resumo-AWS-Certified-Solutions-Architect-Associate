---
tags: [saa-c03, elb, alb, nlb, gwlb]
servico: Elastic Load Balancing
tipo: Balanceamento de carga
dominios: [2, 3, 4]
atualizado: 2026-11-08
---

# Elastic Load Balancing — O que é

> [!info] Em uma frase
> Distribui tráfego entre vários destinos em **várias AZs**, verifica a saúde deles e *"routes traffic only to the healthy targets"*. Escala automaticamente.

## Os quatro tipos

| Tipo | Camada OSI | Para quê |
|---|---|---|
| **ALB** (Application) | **7** | HTTP/HTTPS, roteamento por **host e path**, WAF, Lambda como target |
| **NLB** (Network) | **4** | TCP/UDP/TLS/QUIC, **IP estático**, latência mínima, milhões de req/s |
| **GWLB** (Gateway) | **3** | Enviar tráfego para **appliances de inspeção** de terceiro (GENEVE) |
| **CLB** (Classic) | — | Geração anterior. *"We recommend that you migrate to a current generation load balancer"* |

## A regra de decisão

| Enunciado diz | Tipo |
|---|---|
| HTTP, HTTPS, roteamento por **path** ou **host**, WAF, Lambda | **ALB** |
| TCP, UDP, **IP estático** para allowlist, latência ultrabaixa, preservar IP de origem | **NLB** |
| Firewall virtual, IDS/IPS, inspeção por appliance de terceiro | **GWLB** |
| "legacy", "migrar para geração atual" | sair do **CLB** |

## Dois fatos que decidem questões

1. **O ALB exige 2+ AZs**: *"With an Application Load Balancer however, it is a requirement that you enable at least two or more Availability Zones."*
2. **Cross-zone load balancing**: *"With Application Load Balancers, cross-zone load balancing is always enabled at the load balancer level"*; já *"With Network Load Balancers and Gateway Load Balancers, cross-zone load balancing is disabled by default."*

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[Auto Scaling (EC2)]] · [[Route 53]] · [[WAF]] · [[CloudFront]] · [[Global Accelerator]]
- [Como o ELB funciona](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/how-elastic-load-balancing-works.html)
