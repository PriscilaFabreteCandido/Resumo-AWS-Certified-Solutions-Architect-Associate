---
tags: [saa-c03, vpn, detalhes]
servico: AWS Site-to-Site VPN
atualizado: 2026-11-08
---

# Site-to-Site VPN — Detalhes

## 1. Os dois túneis — e o que a AWS garante

Toda conexão vem com **dois túneis**, cada um terminando num endpoint diferente do lado da AWS: *"Each VPN connection includes two VPN tunnels which you can simultaneously use for high availability."*

A AWS descreve o serviço como *"AWS-managed VPN endpoint that includes automated redundancy and failover built into the AWS side"* — ou seja, a redundância do **lado AWS** vem pronta.

Mas o **seu** lado é sua responsabilidade: *"The virtual private gateway also supports and encourages multiple user gateway connections so that you can implement redundancy and failover on your side."* Um único roteador on-premises continua sendo ponto único de falha.

## 2. Banda — o teto que decide a arquitetura

| Configuração | Banda por túnel |
|---|---|
| **Padrão** | **1,25 Gbps** |
| **Large Bandwidth Tunnel** | **até 5 Gbps** — *"Available for VPN connections attached to Transit Gateway or Cloud WAN"* |

Duas consequências de prova:

1. Se o requisito passa de ~1,25 Gbps, a resposta é **Large Bandwidth Tunnel** (que exige **Transit Gateway**) ou **Direct Connect**.
2. Para somar banda além disso, use **múltiplas conexões VPN** com **ECMP** sobre Transit Gateway — mas note que a documentação lida **não** detalha o ECMP.

## 3. Virtual private gateway × Transit Gateway

| | **VGW** | **Transit Gateway** |
|---|---|---|
| VPCs alcançadas | *"a single VPC"* | **Muitas** |
| Large Bandwidth Tunnel | Não | **Sim** |
| IPv6 | *"not supported for VPN connections on a virtual private gateway"* | **Sim** (inclusive IP externo IPv6) |
| ECMP com várias VPNs | — | **Sim** |
| MTU | — | **1.500** sobre VPN |

Regra: **uma VPC** → VGW basta. **Várias VPCs**, ou banda acima de 1,25 Gbps por túnel, ou IPv6 → **Transit Gateway**.

## 4. Roteamento: estático × BGP

**Estático**: você declara os prefixos de cada lado. Simples, mas o failover entre túneis não é automático nem rápido.

**BGP (dinâmico)**: as rotas são anunciadas e o failover é automático. É o recomendado — e a doc avisa de um detalhe: *"when you use BGP, both the IPsec and the BGP sessions must be terminated on the same user gateway device."*

Com BGP você também controla preferência de caminho, o que é exatamente o que faz o padrão **DX primário + VPN backup** funcionar: você anuncia o prefixo com AS_PATH mais longo pela VPN, e ela só é usada se o DX cair.

## 5. Accelerated VPN

> *"When you create an accelerated VPN connection, we create and manage two accelerators on your behalf."*

O tráfego entra pela **borda da AWS** (anycast) e viaja pela rede privada da AWS até a região, em vez de atravessar a internet pública inteira. Resultado: latência menor e mais estável.

Os accelerators são cobrados pelo **AWS Global Accelerator**.

## 6. Client VPN × Site-to-Site VPN

Não confunda:

| | **Site-to-Site VPN** | **AWS Client VPN** |
|---|---|---|
| Conecta | **Rede** a rede (datacenter ↔ VPC) | **Usuário individual** (laptop) à VPC |
| Protocolo | IPsec | OpenVPN |
| Caso de uso | Híbrido | Acesso remoto de colaborador |

**Client VPN** está na lista oficial de serviços em escopo (categoria Networking).

## 7. VPN CloudHub

Com **vários** customer gateways conectados ao mesmo virtual private gateway, os sites remotos passam a se comunicar **entre si** através da AWS — um modelo **hub-and-spoke** para filiais, sem precisar de links diretos entre elas.

## 8. Onde a VPN é a resposta

| Enunciado | Por quê |
|---|---|
| "conectividade híbrida **rápida** e **criptografada**" | Monta em horas, IPsec nativo |
| "**backup** do Direct Connect" | Padrão clássico, com BGP |
| "**temporário**, durante a migração" | Sem compromisso de porta |
| "orçamento restrito, volume baixo" | Sem port hours |
| "conectar **filiais** entre si pela AWS" | **CloudHub** |
| "banda previsível e alta" | **Não** — é Direct Connect |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[Direct Connect]] · [[Transit Gateway]] · [[VPC]] · [[Global Accelerator]] · [[Custo de rede e transferencia de dados]]
