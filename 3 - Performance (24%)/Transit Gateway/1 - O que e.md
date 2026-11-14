---
tags: [saa-c03, transit-gateway, rede]
servico: AWS Transit Gateway
tipo: Hub de rede
dominios: [3, 4]
atualizado: 2026-11-08
---

# AWS Transit Gateway — O que é

> [!info] Em uma frase
> *"a network transit hub used to interconnect virtual private clouds (VPCs) and on-premises networks"* — com **roteamento transitivo**, que o VPC peering não tem.

## O problema que resolve

Com **VPC peering**, conectar N VPCs em malha completa exige **N(N-1)/2** conexões: 12 VPCs = 66 conexões. E peering **não é transitivo**: A↔B e B↔C **não** dá A↔C.

O Transit Gateway é um **hub**: cada VPC tem **um** attachment, e o roteamento acontece nas route tables do TGW.

## O que pode ser anexado

| Attachment |
|---|
| **VPC** (uma ou mais) |
| **Direct Connect gateway** |
| **Site-to-Site VPN** |
| **Peering** com outro Transit Gateway (inclusive **inter-Region**) |
| **Connect** (SD-WAN / appliance de terceiro) |
| **VPN Concentrator** · **Client VPN endpoint** · network function attachment |

## Os números

| Item | Valor |
|---|---|
| **Attachments** | *"up to 5,000 attachments"* (whitepaper) |
| **MTU** | **8.500 bytes** entre VPCs, DX, Connect e peering; **1.500** sobre VPN |
| Cobrança | *"charged hourly for each attachment... and for the amount of traffic processed"* |

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[VPC Peering]] · [[VPC]] · [[Direct Connect]] · [[VPN (Site-to-Site)]] · [[VPC Endpoints e PrivateLink]] · [[AWS RAM]]
- [O que é o Transit Gateway](https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html)
