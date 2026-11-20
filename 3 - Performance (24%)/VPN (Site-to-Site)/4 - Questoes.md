---
tags: [saa-c03, vpn, questoes]
servico: AWS Site-to-Site VPN
atualizado: 2026-11-08
---

# Site-to-Site VPN — Questões

> [!question] Q1. Quantos túneis tem uma conexão Site-to-Site VPN, e para quê?
> **A)** 1, com failover para um segundo sob demanda
> **B)** 2, que podem ser usados simultaneamente para alta disponibilidade
> **C)** 4, um por AZ
> **D)** Depende do tipo de customer gateway
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"Each VPN connection includes two VPN tunnels which you can simultaneously use for high availability."* (cada conexão VPN inclui dois túneis, que você pode usar simultaneamente para alta disponibilidade)

> [!question] Q2. A empresa precisa de conectividade híbrida **criptografada** em poucas horas, para uma migração temporária.
> **A)** Direct Connect hosted de 1 Gbps
> **B)** Site-to-Site VPN
> **C)** Direct Connect dedicada
> **D)** Transit Gateway
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: IPsec nativo, monta em horas, sem compromisso de porta.
> > **A e C erradas**: DX leva semanas (*"up to 72 business hours"* (até 72 horas úteis) só para a porta, mais o circuito).
> > **D errada**: TGW é topologia dentro da AWS; não conecta on-premises por si.

> [!question] Q3. O tráfego precisa passar de 1,25 Gbps por túnel.
> **A)** Criar uma segunda conexão VPN
> **B)** Large Bandwidth Tunnel (até 5 Gbps), que exige Transit Gateway ou Cloud WAN
> **C)** Aumentar o MTU
> **D)** Accelerated VPN
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"A tunnel configuration that supports up to 5 Gbps bandwidth per tunnel, compared to the standard 1.25 Gbps. Available for VPN connections attached to Transit Gateway or Cloud WAN."* (uma configuração de túnel que suporta até 5 Gbps por túnel, contra os 1,25 Gbps padrão; disponível para conexões VPN anexadas a Transit Gateway ou Cloud WAN)
> > **D errada**: Accelerated VPN melhora **latência e estabilidade**, não o teto de banda por túnel.

> [!question] Q4. Uma VPN ligada a um **virtual private gateway** precisa transportar **IPv6**.
> **A)** Habilitar dual-stack no VGW
> **B)** Não é suportado: use Transit Gateway
> **C)** Criar um segundo túnel
> **D)** Usar Accelerated VPN
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"IPv6 traffic is not supported for VPN connections on a virtual private gateway."* (tráfego IPv6 não é suportado em conexões VPN sobre um virtual private gateway)

> [!question] Q5. O failover entre os dois túneis está levando muito tempo, com roteamento estático.
> **A)** Reduzir o MTU
> **B)** Migrar para BGP (roteamento dinâmico), terminando IPsec e BGP no mesmo dispositivo
> **C)** Criar uma terceira conexão
> **D)** Habilitar NAT traversal
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: com BGP as rotas são anunciadas e o failover é automático. E a doc exige: *"both the IPsec and the BGP sessions must be terminated on the same user gateway device"* (as sessões IPsec e BGP precisam terminar no mesmo dispositivo de gateway do cliente).

> [!question] Q6. Três filiais precisam se comunicar entre si e com a VPC, sem links diretos entre elas.
> **A)** Transit Gateway peering
> **B)** VPN CloudHub
> **C)** Três VPNs independentes
> **D)** VPC peering
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: CloudHub é o modelo **hub-and-spoke** em que os sites remotos se falam através do virtual private gateway.
> > **C errada**: sem o CloudHub, as filiais alcançam a VPC mas não umas às outras.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| A VPN tem 1 túnel | **2**, usáveis simultaneamente |
| Cada túnel entrega 5 Gbps | **1,25 Gbps** padrão; 5 Gbps só com **Large Bandwidth Tunnel + TGW** |
| VPN dá banda previsível | Trafega pela **internet** |
| VGW alcança várias VPCs | **Uma**. Várias = **Transit Gateway** |
| IPv6 funciona no VGW | *"not supported for VPN connections on a virtual private gateway"* (não é suportado em conexões VPN sobre um virtual private gateway) |
| VPN suporta Path MTU Discovery | *"does not support Path MTU Discovery"* (não oferece suporte a Path MTU Discovery) |
| A AWS garante a redundância dos dois lados | O lado AWS vem redundante; o **seu** lado é sua responsabilidade |
| Accelerated VPN aumenta a banda | Melhora **latência e estabilidade** |
| Client VPN e Site-to-Site são o mesmo | Client VPN conecta **usuário**; Site-to-Site conecta **rede** |

## Links

- [[3 - Performance (24%)/VPN (Site-to-Site)/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/VPN (Site-to-Site)/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/VPN (Site-to-Site)/3 - Detalhes|3 - Detalhes]]
