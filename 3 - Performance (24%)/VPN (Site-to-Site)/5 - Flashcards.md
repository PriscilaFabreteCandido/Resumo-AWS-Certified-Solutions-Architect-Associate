---
servico: AWS Site-to-Site VPN
fonte: "[[3 - Performance (24%)/VPN (Site-to-Site)/2 - Decorar|2 - Decorar]]"
---

# Site-to-Site VPN — Flashcards

#flashcards/saa-c03/d3-performance/vpn-site-to-site

Quantos túneis tem uma conexão Site-to-Site VPN?::**2**, usáveis simultaneamente para alta disponibilidade

Banda padrão por túnel da Site-to-Site VPN?::**1,25 Gbps**

Banda do Large Bandwidth Tunnel e seu requisito?::Até **5 Gbps** por túnel; exige **Transit Gateway** ou Cloud WAN

Criptografia usada pela Site-to-Site VPN?::**IPsec**, **AES 256-bit**, **IKEv2**

Opções de roteamento da Site-to-Site VPN?::**Estático** ou **dinâmico (BGP)**

A VPN sobre virtual private gateway suporta tráfego IPv6?::**Não** (IPv6 externo no túnel só com **TGW** e Cloud WAN)

A Site-to-Site VPN suporta Path MTU Discovery?::**Não**

Com BGP, onde as sessões IPsec e BGP precisam terminar?::No **mesmo** dispositivo de customer gateway

O que a AWS cria numa Accelerated VPN e como é cobrado?::**Dois accelerators**, cobrados pelo **Global Accelerator**

Conectar vários escritórios remotos entre si pela AWS?::**VPN CloudHub** (hub-and-spoke no VGW)

De quem é a responsabilidade pela redundância do lado on-premises na VPN?::**Sua** (dois roteadores, dois links); a AWS entrega os 2 túneis

Banda previsível e criptografada ao mesmo tempo?::**Direct Connect + IPsec VPN** sobre o DX

Backup econômico do Direct Connect?::**Site-to-Site VPN**
