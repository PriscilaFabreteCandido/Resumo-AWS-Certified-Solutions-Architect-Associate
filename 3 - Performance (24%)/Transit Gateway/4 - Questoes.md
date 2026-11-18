---
tags: [saa-c03, transit-gateway, questoes]
servico: AWS Transit Gateway
atualizado: 2026-11-08
---

# Transit Gateway — Questões

> [!question]- Q1. Cinco VPCs precisam se comunicar entre si e com o datacenter, com crescimento previsto para 50 VPCs.
> **A)** VPC peering full mesh
> **B)** **Transit Gateway com attachments de VPC e do Direct Connect gateway** ✅
> **C)** PrivateLink entre todas as VPCs
> **D)** VPN entre cada VPC e o datacenter
>
> **Por que B**: é o *"network transit hub used to interconnect VPCs and on-premises networks"*, com roteamento transitivo e *"up to 5,000 attachments"* (até 5.000 attachments).
> **A errada**: peering **não é transitivo** e 50 VPCs em malha = **1.225** conexões.
> **C errada**: PrivateLink expõe **serviço**, não conecta redes inteiras.
> **D errada**: 50 VPNs para gerenciar, e as VPCs não se falariam.

> [!question]- Q2. Produção e desenvolvimento estão anexadas ao mesmo TGW, mas **não devem** se comunicar. Ambas alcançam serviços compartilhados e o on-premises.
> **A)** NACLs em todas as subnets
> **B)** **Route tables separadas no Transit Gateway, associando cada grupo de attachments à sua** ✅
> **C)** Dois Transit Gateways
> **D)** Security groups referenciando SGs
>
> **Por que B**: *"Each attachment is associated with exactly one route table"* (cada attachment está associado a exatamente uma route table) — é o mecanismo de segmentação do TGW.
> **C errada**: funciona, mas dobra o custo de attachment e perde o compartilhamento dos serviços comuns.

> [!question]- Q3. O attachment da VPC ao TGW existe, as route tables do TGW estão corretas, mas o tráfego não sai da subnet.
> **A)** Falta propagação BGP
> **B)** **Falta a rota na route table da subnet apontando para o Transit Gateway** ✅
> **C)** Falta um NAT gateway
> **D)** O MTU está errado
>
> **Por que B**: *"With a VPC, you must create static routes to send traffic to the transit gateway."* (com uma VPC, você precisa criar rotas estáticas para enviar tráfego ao transit gateway) São **dois** lados: a route table da subnet **e** a do TGW.

> [!question]- Q4. Duas VPCs com **CIDR sobreposto** precisam que uma consuma uma API da outra.
> **A)** Transit Gateway
> **B)** VPC peering
> **C)** **AWS PrivateLink** ✅
> **D)** Transit Gateway com NAT
>
> **Por que C**: PrivateLink **não roteia redes** — expõe um serviço por uma ENI, então o CIDR sobreposto é irrelevante.
> **A e B erradas**: roteiam redes e exigem CIDRs não sobrepostos.

> [!question]- Q5. Com **duas** VPCs que só precisam se falar, qual a opção mais econômica?
> **A)** Transit Gateway
> **B)** **VPC peering** ✅
> **C)** PrivateLink
> **D)** VPN entre as VPCs
>
> **Por que B**: *"There is no charge to create a VPC peering connection"* (não há cobrança para criar uma conexão de VPC peering) e dados na **mesma AZ são grátis**. O TGW cobra **por attachment/hora + por GB**.

> [!question]- Q6. O time de rede deve governar a topologia, mas cada conta anexa a sua própria VPC.
> **A)** Um TGW por conta, com peering
> **B)** **TGW criado na conta de rede e compartilhado via AWS RAM** ✅
> **C)** VPC sharing via RAM
> **D)** PrivateLink
>
> **Por que B**: governança central da topologia e das route tables, com autonomia de VPC por conta.
> **C errada**: VPC sharing compartilha **subnets** — resposta para "não criar uma VPC por conta", não para "conectar VPCs separadas".

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| VPC peering é transitivo | **Não é** |
| TGW resolve CIDR sobreposto | **Não resolve**. **PrivateLink** contorna |
| TGW é grátis como o peering | Cobra **por attachment/hora + por GB** |
| Rotas de VPC propagam por BGP | VPC e peering usam rotas **estáticas**; VPN e DX usam **BGP** |
| Basta o attachment para o tráfego fluir | Precisa da rota na **route table da subnet** também |
| Um TGW não segmenta | **Múltiplas route tables** criam domínios isolados |
| MTU é o mesmo em todos os caminhos | **8.500** entre VPCs/DX/peering; **1.500** sobre VPN |
| TGW inter-Region não é criptografado | *"automatically encrypted at the physical layer"* |

## Links

- [[3 - Performance (24%)/Transit Gateway/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/Transit Gateway/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/Transit Gateway/3 - Detalhes|3 - Detalhes]]
