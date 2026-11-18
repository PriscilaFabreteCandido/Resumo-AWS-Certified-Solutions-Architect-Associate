---
tags: [saa-c03, vpn, decorar]
servico: AWS Site-to-Site VPN
atualizado: 2026-11-08
---

# Site-to-Site VPN — Decorar

## Os números

| Item | Valor |
|---|---|
| **Túneis por conexão** | **2** — *"which you can simultaneously use for high availability"* |
| Banda **padrão** por túnel | **1,25 Gbps** |
| **Large Bandwidth Tunnel** | **até 5 Gbps** por túnel — *"Available for VPN connections attached to Transit Gateway or Cloud WAN"* (disponível para conexões VPN anexadas a um Transit Gateway ou ao Cloud WAN) |
| Criptografia | **IPsec**, **AES 256-bit**, **IKEv2** |
| NAT traversal | Suportado |
| Roteamento | **estático** ou **dinâmico (BGP)** |

## Limitações documentadas

| Limitação | Detalhe |
|---|---|
| **IPv6 no virtual private gateway** | *"IPv6 traffic is not supported for VPN connections on a virtual private gateway"* |
| IPv6 externo no túnel | Só com **Transit Gateway** e Cloud WAN |
| **Path MTU Discovery** | *"An Site-to-Site VPN connection does not support Path MTU Discovery"* (uma conexão Site-to-Site VPN não oferece suporte a Path MTU Discovery) |
| MTU sobre VPN (via TGW) | **1.500 bytes** (contra 8.500 entre VPCs) |
| BGP e IPsec | *"when you use BGP, both the IPsec and the BGP sessions must be terminated on the same user gateway device"* |

## Accelerated VPN

> *"When you create an accelerated VPN connection, we create and manage two accelerators on your behalf."* (quando você cria uma conexão VPN acelerada, criamos e gerenciamos dois aceleradores em seu nome)

Os accelerators são cobrados pelo **AWS Global Accelerator**. O tráfego entra pela borda da AWS, melhorando a latência e a estabilidade do túnel.

## VPN CloudHub

Modelo **hub-and-spoke** para conectar **vários escritórios remotos** entre si, através da AWS, usando o virtual private gateway como hub.

## Redundância

> *"The virtual private gateway also supports and encourages multiple user gateway connections so that you can implement redundancy and failover on your side."* (o virtual private gateway também suporta, e incentiva, múltiplas conexões de gateway do cliente, para que você implemente redundância e failover do seu lado)

Ou seja: a AWS entrega **2 túneis**; a redundância do **seu** lado (dois roteadores, dois links) é sua responsabilidade.

## Os padrões de prova

| Enunciado | Resposta |
|---|---|
| "criptografado, rápido de montar, barato" | **Site-to-Site VPN** |
| "banda previsível, consistente" | **Direct Connect** |
| "banda previsível **e** criptografado" | **DX + IPsec VPN sobre DX** |
| "backup do Direct Connect" | **Site-to-Site VPN** |
| "conectar vários escritórios entre si pela AWS" | **VPN CloudHub** |
| "mais de 1,25 Gbps por túnel" | **Large Bandwidth Tunnel** (exige **TGW**) |
| "centenas de VPCs e on-premises" | **Transit Gateway** como endpoint da VPN |

## Links

- [[3 - Performance (24%)/VPN (Site-to-Site)/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/VPN (Site-to-Site)/3 - Detalhes|3 - Detalhes]] · [[3 - Performance (24%)/VPN (Site-to-Site)/4 - Questoes|4 - Questoes]]
