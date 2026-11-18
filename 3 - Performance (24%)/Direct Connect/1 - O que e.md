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
| *"More predictable network performance"* (desempenho de rede mais previsível) | Banda e latência consistentes |
| *"Reduced bandwidth costs"* (custos de banda reduzidos) | Egress por GB mais barato que pela internet |
| *"Supports BGP peering and routing policies"* | Roteamento dinâmico |

Limitação: *"Might require additional telecom and hosting provider relationships or new network circuits to be provisioned."* (pode exigir contratos adicionais com operadoras e provedores de hospedagem, ou o provisionamento de novos circuitos de rede)

## ⚠️ O fato que mais cai: não é criptografado por padrão

A documentação do Direct Connect **não afirma** que o tráfego é criptografado. Para criptografar, o padrão é **IPsec VPN sobre o DX** — o whitepaper descreve essa opção como *"IPsec VPN connection over private lines"* (conexão VPN IPsec sobre linhas privadas).

| Requisito | Resposta |
|---|---|
| Banda previsível, fora da internet | **Direct Connect** |
| Criptografado | **Site-to-Site VPN** |
| Banda previsível **e** criptografado | **DX + IPsec VPN sobre o DX** |

## Links

- [[3 - Performance (24%)/Direct Connect/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/Direct Connect/3 - Detalhes|3 - Detalhes]] · [[3 - Performance (24%)/Direct Connect/4 - Questoes|4 - Questoes]]
- [[3 - Performance (24%)/VPN (Site-to-Site)/1 - O que e|VPN (Site-to-Site)]] · [[3 - Performance (24%)/Transit Gateway/1 - O que e|Transit Gateway]] · [[1 - Seguranca (30%)/VPC/1 - O que e|VPC]] · [[4 - Custo (20%)/04 - Dominio 4 - Design Cost-Optimized Architectures (20%)|Custo (dominio 4)]]
- [O que é o Direct Connect](https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html)
