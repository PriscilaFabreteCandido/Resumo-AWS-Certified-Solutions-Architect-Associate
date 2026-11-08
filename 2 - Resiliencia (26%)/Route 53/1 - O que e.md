---
tags: [saa-c03, route53, dns]
servico: Amazon Route 53
tipo: DNS gerenciado
dominios: [2, 3, 4]
atualizado: 2026-11-08
---

# Amazon Route 53 — O que é

> [!info] Em uma frase
> DNS gerenciado com **8 políticas de roteamento**, **health checks** e registros **alias** que apontam para recursos AWS de graça — inclusive no **ápice do domínio**, onde CNAME não funciona.

## O que ele faz, além de resolver nomes

| Função | Como |
|---|---|
| **Registrar domínios** | Registrar de domínio |
| **Resolver nomes** | Hosted zones **públicas** e **privadas** (dentro da VPC) |
| **Distribuir tráfego** | 8 políticas de roteamento |
| **Failover** | Health checks + política failover (ou qualquer outra, para ativo-ativo) |
| **DNS híbrido** | **Route 53 Resolver** endpoints (inbound e outbound) |
| **Filtrar DNS** | **Resolver DNS Firewall** |

## As 8 políticas (texto oficial)

| Política | Uso |
|---|---|
| **Simple** | *"a single resource that performs a given function for your domain"*. ⚠️ **Não faz health check** |
| **Failover** | *"active-passive failover"* |
| **Geolocation** | *"route traffic based on the location of your users"* |
| **Geoproximity** | *"based on the location of your resources"*, com **bias** |
| **Latency** | *"the Region that provides the best latency"* |
| **IP-based** | Por **faixa de IP** de origem |
| **Multivalue answer** | *"up to eight healthy records selected at random"* |
| **Weighted** | *"in proportions that you specify"* |

## Alias × CNAME — a regra que mais cai

| | **Alias** | **CNAME** |
|---|---|---|
| Ápice do domínio (`exemplo.com`) | **Funciona** | **Não funciona** |
| Custo da consulta | **Grátis** (para recursos AWS) | **Cobrado** |
| TTL | Usa o do recurso | Você define |
| Alvo | Recursos AWS e registros da mesma zona | Qualquer nome DNS |

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[ELB (Load Balancers)]] · [[CloudFront]] · [[Global Accelerator]] · [[Disaster Recovery (RPO e RTO)]]
- [Políticas de roteamento](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html)
