---
tags: [saa-c03, direct-connect, detalhes]
servico: AWS Direct Connect
atualizado: 2026-11-08
---

# Direct Connect — Detalhes

## 1. Dedicated × hosted — a escolha de entrada

**Dedicated connection** é uma **porta física** inteira para você: **1, 10, 100 ou 400 Gbps**. Você solicita pela console, recebe o **LOA-CFA** (a carta de autorização para cruzar o cabo no datacenter) e contrata um parceiro ou operadora para levar a fibra até lá. *"It can take up to 72 business hours"* (pode levar até 72 horas úteis) só para a AWS provisionar a porta.

**Hosted connection** é uma fatia de uma porta do parceiro: de **50 Mbps a 25 Gbps**. O parceiro provisiona e você **aceita**; o tempo de entrega é muito menor e o degrau de entrada é mais baixo. A AWS aplica **traffic policing** (corta o excedente).

| Situação | Tipo |
|---|---|
| Precisa de 10/100/400 Gbps, tem equipe de rede | **Dedicated** |
| Precisa de centenas de Mbps a poucos Gbps, rápido | **Hosted** |
| Quer começar pequeno e crescer | **Hosted** (e migrar para dedicated depois) |

## 2. Os três VIFs — e o Direct Connect gateway

**Private VIF** alcança a VPC por **IP privado**, mas *"directly to a single VPC per private virtual interface"* (diretamente a uma única VPC por interface virtual privada). Para alcançar **várias** VPCs, associe a um **Direct Connect gateway**, que liga a *"multiple virtual private gateways across any account and AWS Region (except the AWS China Regions)"*.

**Public VIF** alcança os **serviços públicos** da AWS (S3, DynamoDB, APIs) por IP público, **sem** passar pela internet. É a resposta quando o requisito é "alcançar o S3 pelo link privado" — embora **interface endpoint** sobre o DX também sirva, com IP privado.

**Transit VIF** alcança **Transit Gateways** associados a um Direct Connect gateway. É o desenho de escala: um DX, um transit VIF, e centenas de VPCs atrás do TGW.

```
On-premises ──DX──> Transit VIF ──> DX Gateway ──> TRANSIT GATEWAY ──> N VPCs
```

## 3. Criptografia — o ponto mais testado

A doc do Direct Connect **não afirma** criptografia por padrão. O tráfego é **privado** (não atravessa a internet), mas isso não é o mesmo que **criptografado**.

| Requisito | Solução |
|---|---|
| Fora da internet, banda previsível | **DX** |
| **Criptografado** | **Site-to-Site VPN** (IPsec) |
| **Os dois** | **IPsec VPN sobre DX** — o whitepaper chama de *"IPsec VPN connection over private lines"* (conexão VPN IPsec sobre linhas privadas) |
| Criptografia na camada 2 | **MACsec** (em conexões suportadas) |

Em prova, "banda previsível **e** criptografado" é sempre **DX + VPN**.

## 4. Alta disponibilidade

Uma conexão DX é **ponto único de falha**: a porta, o roteador, o cabo, o datacenter de colocation. As opções, em ordem:

| Desenho | Protege contra |
|---|---|
| **2 DX em locais diferentes** | Falha de porta, roteador **e local** |
| **2 DX no mesmo local** | Falha de porta e roteador |
| **DX + VPN de backup** | Falha do DX (com banda e latência degradadas) |
| **1 DX** | Nada — não é HA |

O padrão **DX + VPN** é o mais citado em prova por ser o mais econômico: o DX carrega o tráfego normal, e a VPN (sobre internet) assume se ele cair. Com **BGP**, o failover é automático; o **BFD** acelera a detecção.

**LAG** agrega várias conexões para somar banda e redundância de porta — mas todas *"must be on the same AWS device and must use the same bandwidth as the LAG"* (precisam estar no mesmo dispositivo da AWS e usar a mesma largura de banda do LAG), então **não** protege contra falha do dispositivo ou do local.

## 5. Custo

> *"two billing elements: port hours and outbound data transfer."* (dois elementos de cobrança: horas de porta e transferência de dados de saída)

A alavanca de custo: o **egress** pelo DX tem tarifa **por GB menor** que pela internet. O whitepaper lista *"Reduced bandwidth costs"* (custos de banda reduzidos) entre as vantagens. A partir de certo volume constante de saída para on-premises, o DX **se paga** — abaixo disso, a VPN é mais econômica (sem port hours).

E não esqueça: **Direct Connect gateway multi-conta não tem custo adicional**.

## 6. DX × VPN × internet

| | **Internet / VPN** | **Direct Connect** | **DX + VPN** |
|---|---|---|---|
| Banda previsível | Não | **Sim** | **Sim** |
| Criptografado | **Sim** (IPsec) | **Não** (por padrão) | **Sim** |
| Tempo de montagem | Horas | Semanas | Semanas |
| Custo fixo | Nenhum | **Port hours** | Port hours |
| Custo por GB de egress | Maior | **Menor** | Menor |
| HA nativo | 2 túneis por conexão | Precisa de 2ª conexão | — |

## Links

- [[3 - Performance (24%)/Direct Connect/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/Direct Connect/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/Direct Connect/4 - Questoes|4 - Questoes]]
- [[3 - Performance (24%)/VPN (Site-to-Site)/1 - O que e|VPN (Site-to-Site)]] · [[3 - Performance (24%)/Transit Gateway/1 - O que e|Transit Gateway]] · [[1 - Seguranca (30%)/VPC Endpoints e PrivateLink/1 - O que e|VPC Endpoints e PrivateLink]] · [[4 - Custo (20%)/04 - Dominio 4 - Design Cost-Optimized Architectures (20%)|Custo (dominio 4)]]
