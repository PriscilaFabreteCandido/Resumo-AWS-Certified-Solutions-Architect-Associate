---
tags: [saa-c03, transit-gateway, decorar]
servico: AWS Transit Gateway
atualizado: 2026-11-08
---

# Transit Gateway — Decorar

## TGW × VPC peering × PrivateLink

| | **Transit Gateway** | **VPC peering** | **PrivateLink** |
|---|---|---|---|
| **Transitivo** | **Sim** (hub) | **Não** | — (não roteia rede) |
| **CIDR sobreposto** | Não resolve | **Impede** | **Irrelevante** |
| Escala | *"up to 5,000 attachments"* | 1:1, cresce em O(n²) | 1 serviço por endpoint |
| Cross-Region | **Sim** (peering de TGW) | **Sim** | **Sim** |
| Cross-account | Sim (via **RAM**) | Sim | Sim |
| **Custo** | **por attachment/hora + por GB** | **Criação grátis**; dados na **mesma AZ grátis** | por hora e por GB |
| O que expõe | A **rede** | A **rede** | **Um serviço** |

## Route tables

> *"A transit gateway has a default route table and can optionally have additional route tables."*
> *"Each attachment is associated with exactly one route table. Each route table can be associated with zero to many attachments."*

Isso é o mecanismo de **segmentação**: route tables diferentes criam domínios de roteamento isolados (produção não fala com desenvolvimento, mesmo ambos anexados ao TGW).

## Propagação de rotas

| Attachment | Como as rotas chegam |
|---|---|
| **VPC** | **Estática** — *"With a VPC, you must create static routes to send traffic to the transit gateway"* |
| **Peering** de TGW | **Estática** |
| **VPN** | **BGP** (propagação dinâmica) |
| **Direct Connect gateway** | **BGP** |

## Números e fatos

| Item | Valor |
|---|---|
| Attachments | *"up to 5,000"* |
| MTU | **8.500** (VPC, DX, Connect, peering) · **1.500** (VPN) |
| Inter-Region peering | *"All network traffic between AWS data centers is automatically encrypted at the physical layer"* |
| Cobrança | **por attachment/hora + por GB processado** |
| Compartilhamento | Via **AWS RAM** (uma conta de rede governa, as outras anexam) |
| Encryption control | Feature opcional que **exige** criptografia em trânsito nas VPCs anexadas |

## A regra de decisão

| Enunciado | Resposta |
|---|---|
| 2 VPCs, barato, sem transitividade | **VPC peering** |
| Muitas VPCs + on-premises, roteamento transitivo | **Transit Gateway** |
| **CIDR sobreposto** | **PrivateLink** |
| Expor **um serviço** a muitas contas | **PrivateLink** |
| Time de rede governa a topologia, times anexam | **TGW compartilhado via RAM** |
| Segmentar prod/dev no mesmo hub | **Múltiplas route tables** do TGW |

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
