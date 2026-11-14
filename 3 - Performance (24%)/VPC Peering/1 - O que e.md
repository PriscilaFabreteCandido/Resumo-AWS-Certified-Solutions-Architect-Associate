---
tags: [saa-c03, vpc-peering, rede]
servico: VPC Peering
tipo: Conexão entre duas VPCs
dominios: [3, 4]
atualizado: 2026-11-08
---

# VPC Peering — O que é

> [!info] Em uma frase
> *"a networking connection between two VPCs that enables you to route traffic between them using private IPv4 addresses or IPv6 addresses"* — simples, barato e **não transitivo**.

## Como funciona

> *"AWS uses the existing infrastructure of a VPC to create a VPC peering connection; it is neither a gateway nor a VPN connection, and does not rely on a separate piece of physical hardware. There is no single point of failure for communication or a bandwidth bottleneck."*

Ou seja: não há appliance, não há gargalo de banda, não há ponto único de falha. É roteamento na própria infraestrutura.

## As três características que definem tudo

| Característica | Detalhe |
|---|---|
| **Não é transitivo** | A↔B e B↔C **não** dá A↔C |
| **CIDR não pode sobrepor** | Impede a conexão |
| **Criação grátis** | *"There is no charge to create a VPC peering connection"* |

## Escopo

> *"The VPCs can be in different Regions (also known as an inter-Region VPC peering connection)."*

Cross-account e cross-Region são suportados. Tráfego inter-Region *"is encrypted before leaving AWS facilities"*.

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[Transit Gateway]] · [[VPC]] · [[VPC Endpoints e PrivateLink]] · [[Custo de rede e transferencia de dados]]
- [O que é VPC peering](https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html)
