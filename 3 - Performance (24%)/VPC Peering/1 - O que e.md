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

> *"AWS uses the existing infrastructure of a VPC to create a VPC peering connection; it is neither a gateway nor a VPN connection, and does not rely on a separate piece of physical hardware. There is no single point of failure for communication or a bandwidth bottleneck."* (a AWS usa a infraestrutura existente da VPC para criar uma conexão de peering; ela não é um gateway nem uma conexão VPN, e não depende de hardware físico separado. Não há ponto único de falha na comunicação nem gargalo de banda)

Ou seja: não há appliance, não há gargalo de banda, não há ponto único de falha. É roteamento na própria infraestrutura.

## As três características que definem tudo

| Característica | Detalhe |
|---|---|
| **Não é transitivo** | A↔B e B↔C **não** dá A↔C |
| **CIDR não pode sobrepor** | Impede a conexão |
| **Criação grátis** | *"There is no charge to create a VPC peering connection"* (não há cobrança para criar uma conexão de VPC peering) |

## Escopo

> *"The VPCs can be in different Regions (also known as an inter-Region VPC peering connection)."* (as VPCs podem estar em Regiões diferentes (o chamado peering entre Regiões))

Cross-account e cross-Region são suportados. Tráfego inter-Region *"is encrypted before leaving AWS facilities"* (é criptografado antes de sair das instalações da AWS).

## Links

- [[3 - Performance (24%)/VPC Peering/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/VPC Peering/3 - Detalhes|3 - Detalhes]] · [[3 - Performance (24%)/VPC Peering/4 - Questoes|4 - Questoes]]
- [[3 - Performance (24%)/Transit Gateway/1 - O que e|Transit Gateway]] · [[1 - Seguranca (30%)/VPC/1 - O que e|VPC]] · [[1 - Seguranca (30%)/VPC Endpoints e PrivateLink/1 - O que e|VPC Endpoints e PrivateLink]] · [[4 - Custo (20%)/04 - Dominio 4 - Design Cost-Optimized Architectures (20%)|Custo (dominio 4)]]
- [O que é VPC peering](https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html)
