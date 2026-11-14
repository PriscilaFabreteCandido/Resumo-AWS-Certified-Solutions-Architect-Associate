---
tags: [saa-c03, direct-connect, decorar]
servico: AWS Direct Connect
atualizado: 2026-11-08
---

# Direct Connect — Decorar

## As velocidades

| Tipo | Velocidades | Quem provisiona |
|---|---|---|
| **Dedicated connection** | **1, 10, 100 e 400 Gbps** | **Você** (console/CLI/API) |
| **Hosted connection** | **50, 100, 200, 300, 400, 500 Mbps, 1, 2, 5, 10 e 25 Gbps** | **Parceiro** (AWS Direct Connect Partner) |

Detalhes das **dedicated**: *"It can take up to 72 business hours for AWS to review your request and provision a port"*; o **LOA-CFA** precisa ser respondido em **7 dias** ou a conexão é deletada; a velocidade **não muda** depois (é nova conexão).

Detalhes das **hosted**: só parceiros qualificados criam 1, 2, 5, 10 e 25 Gbps; as de **25 Gbps** existem *"only in Direct Connect locations where 100 Gbps port speeds are available"*; você precisa **aceitar** a conexão; a AWS aplica **traffic policing**.

## Os três tipos de virtual interface (VIF)

| VIF | Alcança |
|---|---|
| **Private VIF** | *"access an Amazon Virtual Private Cloud (VPC) using private IP addresses"*. **Uma VPC por VIF** — ou **várias** via **Direct Connect gateway** |
| **Public VIF** | *"access all AWS public services using public IP addresses"* |
| **Transit VIF** | *"access one or more Amazon VPC Transit Gateways associated with Direct Connect gateways"* |

**Direct Connect gateway**: liga um private VIF a *"multiple virtual private gateways across any account and AWS Region"*. E: *"There are no additional charges to use a multi-account AWS Direct Connect gateway."*

## Requisitos técnicos

| Item | Valor |
|---|---|
| Fibra | **monomodo** |
| VLAN | **802.1Q** |
| Roteamento | **BGP** com **MD5** |
| **BFD** | Opcional, *"automatically enabled for each Direct Connect virtual interface... but does not take effect until you configure it on your router"* |
| **MTU** | **1522 ou 9023 bytes** |
| Transceivers | 1000BASE-LX (1 GbE), 10GBASE-LR (10 GbE), 100GBASE-LR4 (100 GbE), 400GBASE-LR4 (400 Gbps) |
| **LAG** | Existe; a conexão *"must be on the same AWS device and must use the same bandwidth as the LAG"*. ⚠️ Máximo de conexões por LAG: **a doc lida não informa** |

## Cobrança

> *"two billing elements: port hours and outbound data transfer."*

## HA em Direct Connect (ordem de robustez)

1. **Duas** conexões DX em **locais diferentes** (ideal)
2. Duas conexões no **mesmo** local (protege porta/roteador, não o local)
3. **DX + Site-to-Site VPN de backup** (mais econômico)
4. **Uma** conexão DX → **não é HA**

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
