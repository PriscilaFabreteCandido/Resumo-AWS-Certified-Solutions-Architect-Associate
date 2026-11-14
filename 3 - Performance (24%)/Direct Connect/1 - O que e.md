---
tags: [saa-c03, direct-connect, hibrido, rede]
servico: AWS Direct Connect
tipo: Link privado para a AWS
dominios: [3, 4]
atualizado: 2026-11-08
---

# AWS Direct Connect — O que é

> [!info] Em uma frase
> Link **privado e dedicado** entre o seu datacenter e a AWS, por fibra: *"links your internal network to a Direct Connect location over a standard Ethernet fiber-optic cable"*, **sem passar pela internet**.

## O que ele entrega

> *"you can create virtual interfaces directly to public AWS services... or to Amazon VPC, bypassing internet service providers in your network path."*

| Vantagem (whitepaper) | Detalhe |
|---|---|
| *"More predictable network performance"* | Banda e latência consistentes |
| *"Reduced bandwidth costs"* | Egress por GB mais barato que pela internet |
| *"Supports BGP peering and routing policies"* | Roteamento dinâmico |

Limitação: *"Might require additional telecom and hosting provider relationships or new network circuits to be provisioned."*

## ⚠️ O fato que mais cai: não é criptografado por padrão

A documentação do Direct Connect **não afirma** que o tráfego é criptografado. Para criptografar, o padrão é **IPsec VPN sobre o DX** — o whitepaper descreve essa opção como *"IPsec VPN connection over private lines"*.

| Requisito | Resposta |
|---|---|
| Banda previsível, fora da internet | **Direct Connect** |
| Criptografado | **Site-to-Site VPN** |
| Banda previsível **e** criptografado | **DX + IPsec VPN sobre o DX** |

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[VPN (Site-to-Site)]] · [[Transit Gateway]] · [[VPC]] · [[Custo de rede e transferencia de dados]]
- [O que é o Direct Connect](https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html)
