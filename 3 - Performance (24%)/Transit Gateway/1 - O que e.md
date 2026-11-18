---
tags: [saa-c03, transit-gateway, rede]
servico: AWS Transit Gateway
tipo: Hub de rede
dominios: [3, 4]
atualizado: 2026-11-08
---

# AWS Transit Gateway — O que é

> [!info] Em uma frase
> *"a network transit hub used to interconnect virtual private clouds (VPCs) and on-premises networks"* (um hub de trânsito de rede usado para interligar VPCs e redes on-premises) — com **roteamento transitivo**, que o VPC peering não tem.

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
| Cobrança | *"charged hourly for each attachment... and for the amount of traffic processed"* (cobrado por hora por cada attachment... e pelo volume de tráfego processado) |

## Links

- [[3 - Performance (24%)/Transit Gateway/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/Transit Gateway/3 - Detalhes|3 - Detalhes]] · [[3 - Performance (24%)/Transit Gateway/4 - Questoes|4 - Questoes]]
- [[3 - Performance (24%)/VPC Peering/1 - O que e|VPC Peering]] · [[1 - Seguranca (30%)/VPC/1 - O que e|VPC]] · [[3 - Performance (24%)/Direct Connect/1 - O que e|Direct Connect]] · [[3 - Performance (24%)/VPN (Site-to-Site)/1 - O que e|VPN (Site-to-Site)]] · [[1 - Seguranca (30%)/VPC Endpoints e PrivateLink/1 - O que e|VPC Endpoints e PrivateLink]] · [[1 - Seguranca (30%)/AWS RAM/1 - O que e|AWS RAM]]
- [O que é o Transit Gateway](https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html)
