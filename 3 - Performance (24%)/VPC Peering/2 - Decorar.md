---
tags: [saa-c03, vpc-peering, decorar]
servico: VPC Peering
atualizado: 2026-11-08
---

# VPC Peering — Decorar

## Os três fatos que decidem a questão

| Fato | Detalhe |
|---|---|
| **Não transitivo** | A↔B e B↔C **não** dá A↔C |
| **CIDR sobreposto impede** | Não há NAT no peering |
| **Criação grátis** | *"There is no charge to create a VPC peering connection"* (não há cobrança para criar uma conexão de VPC peering) |

## Custo (citação oficial)

> *"There is no charge to create a VPC peering connection. All data transfer over a VPC peering connection that stays within an Availability Zone is free, even if it's between different accounts. Charges apply for data transfer... that cross Availability Zones and Regions."*

| Tráfego | Custo |
|---|---|
| Mesma **AZ** | **Grátis** (mesmo entre contas diferentes) |
| Entre **AZs** | Cobrado |
| Entre **regiões** | Cobrado |

## A matemática da malha

| VPCs | Conexões para malha completa |
|---|---|
| 3 | 3 |
| 5 | 10 |
| 12 | **66** |
| 50 | **1.225** |

Fórmula: **N(N-1)/2**. É a razão de existir do Transit Gateway.

## Peering × TGW × PrivateLink

| | **Peering** | **Transit Gateway** | **PrivateLink** |
|---|---|---|---|
| **Transitivo** | **Não** | **Sim** | — |
| **CIDR sobreposto** | **Impede** | Não resolve | **Irrelevante** |
| Escala | O(n²) | **5.000 attachments** | 1 serviço/endpoint |
| Criação | **Grátis** | Por attachment/hora | Por hora |
| Dados mesma AZ | **Grátis** | **Cobrado** | Cobrado |
| Expõe | A **rede** | A **rede** | **Um serviço** |

## Quando é a resposta

| Enunciado | Resposta |
|---|---|
| **2 ou 3 VPCs**, barato, sem transitividade | **VPC peering** |
| Muitas VPCs, on-premises, transitivo | **Transit Gateway** |
| **CIDR sobreposto** | **PrivateLink** |
| Expor um serviço a muitas contas | **PrivateLink** |
| Não criar uma VPC por conta | **VPC sharing (RAM)** |

## Fatos adicionais

- **Security group** de uma VPC **pode referenciar** o SG da VPC pareada (mesma região; cross-region com restrições) — mantém o padrão SG-para-SG.
- Inter-Region: tráfego *"is encrypted before leaving AWS facilities"* (é criptografado antes de sair das instalações da AWS).
- Não há gateway nem hardware: *"There is no single point of failure for communication or a bandwidth bottleneck."*
- É preciso **aceitar** a solicitação de peering e **criar rotas nas duas** VPCs.

## Links

- [[3 - Performance (24%)/VPC Peering/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/VPC Peering/3 - Detalhes|3 - Detalhes]] · [[3 - Performance (24%)/VPC Peering/4 - Questoes|4 - Questoes]]
