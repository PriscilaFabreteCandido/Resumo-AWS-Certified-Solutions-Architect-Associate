---
tags: [saa-c03, shield, ddos, seguranca]
servico: AWS Shield
tipo: Proteção DDoS
dominios: [1]
atualizado: 2026-11-08
---

# AWS Shield — O que é

> [!info] Em uma frase
> Proteção contra **DDoS**. O **Standard** é automático e **grátis** para todos; o **Advanced** é pago e adiciona mitigação de camada 7, visibilidade detalhada e acesso ao **Shield Response Team (SRT)**.

## Standard × Advanced

| | **Shield Standard** | **Shield Advanced** |
|---|---|---|
| Custo | *"provided automatically and at no extra charge when you use AWS"* (fornecido automaticamente e sem custo extra quando você usa a AWS) | **Pago** (assinatura) |
| Camadas | 3 e 4, e vetores conhecidos na 7 | + **mitigação automática na camada 7** |
| Visibilidade | Básica | *"advanced event visibility"* (visibilidade avançada de eventos) |
| Suporte | — | **Shield Response Team (SRT)** e **engajamento proativo** |
| Recursos protegidos | Todos | **EC2, ELB, CloudFront, Route 53 hosted zones, Global Accelerator (standard accelerators)** |

## Classes de ataque que o Shield trata

| Camada | Exemplo |
|---|---|
| **3 — rede volumétrico** | UDP reflection, amplificação |
| **4 — protocolo de transporte** | **TCP SYN flood** |
| **7 — aplicação** | Flood de requisições web |

A doc: *"AWS automatically mitigates network and transport layer (layer 3 and layer 4) DDoS attacks"* (a AWS mitiga automaticamente ataques DDoS nas camadas de rede e transporte (camadas 3 e 4)) — isso é o **Standard**, para todo mundo.

## Links

- [[1 - Seguranca (30%)/Shield/2 - Decorar|2 - Decorar]] · [[1 - Seguranca (30%)/Shield/3 - Detalhes|3 - Detalhes]] · [[1 - Seguranca (30%)/Shield/4 - Questoes|4 - Questoes]]
- [[1 - Seguranca (30%)/WAF/1 - O que e|WAF]] · [[1 - Seguranca (30%)/Firewall Manager/1 - O que e|Firewall Manager]] · [[3 - Performance (24%)/CloudFront/1 - O que e|CloudFront]] · [[3 - Performance (24%)/Global Accelerator/1 - O que e|Global Accelerator]]
- [Proteção DDoS na AWS](https://docs.aws.amazon.com/waf/latest/developerguide/ddos-overview.html)
