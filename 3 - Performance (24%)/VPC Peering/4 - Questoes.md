---
tags: [saa-c03, vpc-peering, questoes]
servico: VPC Peering
atualizado: 2026-11-08
---

# VPC Peering — Questões

> [!question]- Q1. As VPCs A↔B e B↔C estão pareadas. A VPC A alcança a VPC C?
> **A)** Sim, via roteamento transitivo
> **B)** **Não: VPC peering não é transitivo** ✅
> **C)** Sim, se B tiver uma rota
> **D)** Sim, com NAT em B
>
> **Por que B**: peering é **1:1**. Para transitividade, **Transit Gateway**.

> [!question]- Q2. Duas VPCs que só precisam se falar, com o **menor custo**.
> **A)** Transit Gateway
> **B)** **VPC peering** ✅
> **C)** PrivateLink
> **D)** VPN entre as VPCs
>
> **Por que B**: *"There is no charge to create a VPC peering connection"* (não há cobrança para criar uma conexão de VPC peering), e dados na **mesma AZ são grátis**.
> **A errada**: cobra **por attachment/hora + por GB**.

> [!question]- Q3. Para economizar, o time quer que 20 contas usem o **NAT gateway** de uma VPC central, via peering.
> **A)** Funciona com rotas apropriadas
> **B)** **Não funciona: peering não permite usar o internet gateway nem o NAT gateway da VPC pareada** ✅
> **C)** Funciona com Transit Gateway em vez de peering
> **D)** Funciona com PrivateLink
>
> **Por que B**: é a limitação clássica. Para consolidar NAT, a resposta é **VPC sharing via AWS RAM** (uma VPC central com NAT por AZ, compartilhada).
> **C**: o TGW **pode** encaminhar para uma VPC de egress centralizada — desenho válido, mas mais complexo e cobrado por GB.

> [!question]- Q4. O peering está "Active", mas o tráfego não passa.
> **A)** Falta aceitar a solicitação
> **B)** **Faltam as rotas nas route tables de uma (ou das duas) VPCs** ✅
> **C)** O CIDR está sobreposto
> **D)** Falta um gateway
>
> **Por que B**: são **dois** lados — rota na route table de cada VPC apontando para a peering connection.
> **A errada**: se estivesse pendente, o estado não seria "Active".
> **C errada**: CIDR sobreposto **impede a criação** da conexão.

> [!question]- Q5. 12 VPCs em 4 contas precisam se comunicar, com crescimento previsto.
> **A)** **Transit Gateway** ✅
> **B)** VPC peering full mesh
> **C)** PrivateLink entre todas
> **D)** VPN entre cada par
>
> **Por que A**: 12 VPCs em malha = **66** conexões, e peering **não é transitivo**.
> **C errada**: PrivateLink expõe **serviço**, não conecta redes.

> [!question]- Q6. Duas VPCs cross-account precisam trocar grande volume de dados. As instâncias estão na **mesma AZ**.
> **A)** O tráfego cross-account é sempre cobrado
> **B)** **O tráfego na mesma AZ é grátis, "even if it's between different accounts"** ✅
> **C)** Precisa de Transit Gateway
> **D)** Precisa de PrivateLink
>
> **Por que B**: citação literal da doc. É um argumento de custo real a favor do peering.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Peering é transitivo | **Não é** |
| Dá para usar o NAT/IGW da VPC pareada | **Não dá** |
| CIDR sobreposto se resolve com NAT | **Impede** a conexão. Contorno: **PrivateLink** |
| Peering tem gargalo de banda | *"no single point of failure for communication or a bandwidth bottleneck"* |
| Peering é cobrado por hora | **Criação grátis**; dados na mesma AZ **grátis** |
| Basta aceitar o peering | Precisa de **rotas nas duas** VPCs |
| Peering não funciona entre contas/regiões | Funciona nos dois casos |
| Peering escala | Cresce em **O(n²)** — 50 VPCs = 1.225 conexões |

## Links

- [[3 - Performance (24%)/VPC Peering/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/VPC Peering/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/VPC Peering/3 - Detalhes|3 - Detalhes]]
