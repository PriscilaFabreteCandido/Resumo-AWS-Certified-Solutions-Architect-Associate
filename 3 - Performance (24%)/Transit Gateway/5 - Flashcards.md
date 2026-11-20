---
servico: AWS Transit Gateway
fonte: "[[3 - Performance (24%)/Transit Gateway/2 - Decorar|2 - Decorar]]"
---

# Transit Gateway — Flashcards

#flashcards/saa-c03/d3-performance/transit-gateway

O Transit Gateway faz roteamento transitivo?::**Sim** (modelo hub)

Quantos attachments um Transit Gateway suporta?::Até **5.000**

Como o Transit Gateway é cobrado?::**Por attachment/hora + por GB** processado

Como compartilhar um Transit Gateway com outras contas?::Via **AWS RAM**

A quantas route tables cada attachment do TGW se associa?::**Exatamente uma** (cada route table aceita zero ou vários attachments)

Como isolar produção de desenvolvimento no mesmo TGW?::Com **múltiplas route tables** (segmentação)

Como as rotas chegam ao TGW por attachments de VPC e de peering?::**Estáticas**

Como as rotas chegam ao TGW por VPN e Direct Connect gateway?::**BGP** (propagação dinâmica)

MTU do TGW para VPC/DX/peering × para VPN?::**8.500** × **1.500** bytes

O tráfego de peering inter-Region do TGW é criptografado?::**Sim**, automaticamente na **camada física**

Recurso opcional do TGW que exige criptografia em trânsito nas VPCs anexadas?::**Encryption control**

CIDR sobreposto ou expor um serviço a muitas contas: TGW ou outro?::**PrivateLink**

2 VPCs, barato, sem transitividade: TGW ou outro?::**VPC peering**
