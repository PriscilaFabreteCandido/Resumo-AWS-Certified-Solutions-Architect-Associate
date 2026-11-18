---
tags: [saa-c03, elb, alb, nlb, gwlb]
servico: Elastic Load Balancing
tipo: Balanceamento de carga
dominios: [2, 3, 4]
atualizado: 2026-11-08
---

# Elastic Load Balancing — O que é

> [!info] Em uma frase
> Distribui tráfego entre vários destinos em **várias AZs**, verifica a saúde deles e *"routes traffic only to the healthy targets"* (roteia o tráfego somente para os alvos saudáveis). Escala automaticamente.

## Os quatro tipos

| Tipo | Camada OSI | Para quê |
|---|---|---|
| **ALB** (Application) | **7** | HTTP/HTTPS, roteamento por **host e path**, WAF, Lambda como target |
| **NLB** (Network) | **4** | TCP/UDP/TLS/QUIC, **IP estático**, latência mínima, milhões de req/s |
| **GWLB** (Gateway) | **3** | Enviar tráfego para **appliances de inspeção** de terceiro (GENEVE) |
| **CLB** (Classic) | — | Geração anterior. *"We recommend that you migrate to a current generation load balancer"* (recomendamos migrar para um load balancer da geração atual) |

## A regra de decisão

| Enunciado diz | Tipo |
|---|---|
| HTTP, HTTPS, roteamento por **path** ou **host**, WAF, Lambda | **ALB** |
| TCP, UDP, **IP estático** para allowlist, latência ultrabaixa, preservar IP de origem | **NLB** |
| Firewall virtual, IDS/IPS, inspeção por appliance de terceiro | **GWLB** |
| "legacy", "migrar para geração atual" | sair do **CLB** |

## Dois fatos que decidem questões

1. **O ALB exige 2+ AZs**: *"With an Application Load Balancer however, it is a requirement that you enable at least two or more Availability Zones."* (já num Application Load Balancer, é obrigatório habilitar pelo menos duas Zonas de Disponibilidade)
2. **Cross-zone load balancing**: *"With Application Load Balancers, cross-zone load balancing is always enabled at the load balancer level"* (em Application Load Balancers, o balanceamento entre zonas está sempre habilitado no nível do load balancer); já *"With Network Load Balancers and Gateway Load Balancers, cross-zone load balancing is disabled by default."* (em Network Load Balancers e Gateway Load Balancers, o balanceamento entre zonas vem desabilitado por padrão)

## Links

- [[2 - Resiliencia (26%)/ELB (Load Balancers)/2 - Decorar|2 - Decorar]] · [[2 - Resiliencia (26%)/ELB (Load Balancers)/3 - Detalhes|3 - Detalhes]] · [[2 - Resiliencia (26%)/ELB (Load Balancers)/4 - Questoes|4 - Questoes]]
- [[2 - Resiliencia (26%)/Auto Scaling (EC2)/1 - O que e|Auto Scaling (EC2)]] · [[2 - Resiliencia (26%)/Route 53/1 - O que e|Route 53]] · [[1 - Seguranca (30%)/WAF/1 - O que e|WAF]] · [[3 - Performance (24%)/CloudFront/1 - O que e|CloudFront]] · [[3 - Performance (24%)/Global Accelerator/1 - O que e|Global Accelerator]]
- [Como o ELB funciona](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/how-elastic-load-balancing-works.html)
