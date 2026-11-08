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
| Custo | *"provided automatically and at no extra charge when you use AWS"* | **Pago** (assinatura) |
| Camadas | 3 e 4, e vetores conhecidos na 7 | + **mitigação automática na camada 7** |
| Visibilidade | Básica | *"advanced event visibility"* |
| Suporte | — | **Shield Response Team (SRT)** e **engajamento proativo** |
| Recursos protegidos | Todos | **EC2, ELB, CloudFront, Route 53 hosted zones, Global Accelerator (standard accelerators)** |

## Classes de ataque que o Shield trata

| Camada | Exemplo |
|---|---|
| **3 — rede volumétrico** | UDP reflection, amplificação |
| **4 — protocolo de transporte** | **TCP SYN flood** |
| **7 — aplicação** | Flood de requisições web |

A doc: *"AWS automatically mitigates network and transport layer (layer 3 and layer 4) DDoS attacks"* — isso é o **Standard**, para todo mundo.

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[WAF]] · [[Firewall Manager]] · [[CloudFront]] · [[Global Accelerator]]
- [Proteção DDoS na AWS](https://docs.aws.amazon.com/waf/latest/developerguide/ddos-overview.html)
