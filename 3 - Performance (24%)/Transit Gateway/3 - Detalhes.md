---
tags: [saa-c03, transit-gateway, detalhes]
servico: AWS Transit Gateway
atualizado: 2026-11-08
---

# Transit Gateway — Detalhes

## 1. O problema do peering em malha

VPC peering é **1:1** e **não transitivo**. Conectar todas as VPCs entre si exige **N(N-1)/2** conexões:

| VPCs | Conexões de peering |
|---|---|
| 5 | 10 |
| 12 | **66** |
| 20 | 190 |
| 50 | **1.225** |

Cada uma com route tables de ambos os lados para manter. É insustentável — e foi para isso que o TGW existe: cada VPC tem **um** attachment, e o hub roteia.

## 2. Route tables — o mecanismo de segmentação

> *"A transit gateway has a default route table and can optionally have additional route tables."*
> *"Each attachment is associated with exactly one route table. Each route table can be associated with zero to many attachments."*

Isso é mais poderoso do que parece. Com **route tables separadas**, você cria **domínios de roteamento isolados** no mesmo TGW:

```
TGW
├── Route table "PROD"      ← attachments das VPCs de produção + DX
├── Route table "DEV"       ← attachments das VPCs de desenvolvimento
└── Route table "SHARED"    ← VPC de serviços compartilhados (alcançada pelos dois)
```

Resultado: produção e desenvolvimento **não se falam**, mas ambos alcançam os serviços compartilhados e o on-premises. Isso substitui dezenas de regras de peering e NACL.

## 3. Propagação de rotas — o detalhe que quebra laboratórios

| Attachment | Rotas |
|---|---|
| **VPC** | **Estáticas.** *"With a VPC, you must create static routes to send traffic to the transit gateway"* |
| **Peering de TGW** | **Estáticas** |
| **VPN** | **BGP** |
| **Direct Connect gateway** | **BGP** |

E há **dois** lados para configurar:
1. A **route table da subnet** da VPC precisa de uma rota apontando para o **TGW**
2. A **route table do TGW** precisa de uma rota para a VPC de destino

Esquecer o primeiro é o erro mais comum: o attachment existe, o TGW sabe rotear, mas o tráfego nunca sai da subnet.

## 4. Inter-Region e criptografia

O peering entre TGWs de regiões diferentes usa a infraestrutura global da AWS, e: *"All network traffic between AWS data centers is automatically encrypted at the physical layer."*

Há também um controle opcional de **encryption control**, que **exige** criptografia em trânsito para as VPCs anexadas — útil para requisito de compliance.

## 5. MTU

| Caminho | MTU |
|---|---|
| VPC, Direct Connect, Connect, peering | **8.500 bytes** |
| **VPN** | **1.500 bytes** |

Importa para workloads sensíveis a throughput: jumbo frames funcionam entre VPCs via TGW, mas **não** sobre VPN.

## 6. Compartilhamento via RAM

O padrão de rede multi-conta: a conta **Network** cria o TGW e o compartilha via **AWS RAM**. Cada conta de workload cria o **attachment** da sua VPC.

Resultado: topologia e route tables sob governança do time de rede; autonomia de VPC para cada time. É a resposta para *"o time de rede governa a topologia, mas cada conta anexa a sua VPC"*.

## 7. Custo — o trade-off explícito

> *"You are charged hourly for each attachment on a transit gateway, and you are charged for the amount of traffic processed."*

Compare com o peering: *"There is no charge to create a VPC peering connection. All data transfer over a VPC peering connection that stays within an Availability Zone is free."*

| | **Peering** | **TGW** |
|---|---|---|
| Criação | **Grátis** | — |
| Dados na mesma AZ | **Grátis** | **Cobrado por GB** |
| Attachment | — | **Cobrado por hora** |
| Operabilidade | Ruim em escala | **Boa** |

A prova testa esse trade-off: **2 ou 3 VPCs** → peering é mais barato. **Dezenas de VPCs + on-premises** → o TGW se paga em operabilidade.

## 8. O que o TGW não resolve

| Problema | Solução |
|---|---|
| **CIDR sobreposto** | **PrivateLink** (expõe serviço, não rede) |
| Expor um serviço a centenas de contas | **PrivateLink** |
| Alcançar S3/DynamoDB sem internet | **Gateway endpoint** |
| Inspeção de tráfego | **Network Firewall** ou **GWLB** (que podem ser anexados ao desenho) |

A doc do whitepaper de conectividade reforça: *"We recommend allocating a single, contiguous, non-overlapping CIDR block to be used by each VPC."*

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[VPC Peering]] · [[VPC]] · [[Direct Connect]] · [[VPN (Site-to-Site)]] · [[VPC Endpoints e PrivateLink]] · [[AWS RAM]] · [[Custo de rede e transferencia de dados]]
