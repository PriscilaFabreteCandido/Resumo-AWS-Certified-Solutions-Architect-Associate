---
tags: [saa-c03, vpn, hibrido, rede]
servico: AWS Site-to-Site VPN
tipo: Túnel IPsec sobre a internet
dominios: [3, 4]
atualizado: 2026-11-08
---

# AWS Site-to-Site VPN — O que é

> [!info] Em uma frase
> Túnel **IPsec criptografado** entre o seu datacenter e a AWS, **sobre a internet**: rápido de montar, barato, com **2 túneis** por conexão para alta disponibilidade.

## Definição oficial

> *"AWS-managed VPN endpoint that includes automated redundancy and failover built into the AWS side of the VPN connection."*

E o número que mais cai:

> *"Each VPN connection includes two VPN tunnels which you can simultaneously use for high availability."* (cada conexão VPN inclui dois túneis, que você pode usar simultaneamente para alta disponibilidade)

## Os dois endpoints do lado AWS

| Endpoint | Alcança |
|---|---|
| **Virtual private gateway (VGW)** | *"the VPN endpoint on the Amazon side... that can be attached to a single VPC"* |
| **Transit gateway** | *"A transit hub that can be used to interconnect multiple VPCs and on-premises networks, and as a VPN endpoint"* |

## VPN × Direct Connect

| | **Site-to-Site VPN** | **Direct Connect** |
|---|---|---|
| Caminho | **Internet** | Linha **privada** |
| Criptografia | **IPsec nativa** | **Não** por padrão |
| Banda | **1,25 Gbps** por túnel (5 Gbps com Large Bandwidth Tunnel + TGW) | 50 Mbps a **400 Gbps** |
| Previsibilidade | Depende da internet | **Alta** |
| Tempo de montagem | **Horas** | Semanas |
| Custo fixo | Hora de conexão | **Port hours** |

## Links

- [[3 - Performance (24%)/VPN (Site-to-Site)/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/VPN (Site-to-Site)/3 - Detalhes|3 - Detalhes]] · [[3 - Performance (24%)/VPN (Site-to-Site)/4 - Questoes|4 - Questoes]]
- [[3 - Performance (24%)/Direct Connect/1 - O que e|Direct Connect]] · [[3 - Performance (24%)/Transit Gateway/1 - O que e|Transit Gateway]] · [[1 - Seguranca (30%)/VPC/1 - O que e|VPC]] · [[9 - Fundamentos e apoio/Disaster Recovery (RPO e RTO)/1 - O que e|Disaster Recovery (RPO e RTO)]]
- [Site-to-Site VPN](https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html)
