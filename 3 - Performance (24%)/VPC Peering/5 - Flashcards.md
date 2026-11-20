---
servico: VPC Peering
fonte: "[[3 - Performance (24%)/VPC Peering/2 - Decorar|2 - Decorar]]"
---

# VPC Peering — Flashcards

#flashcards/saa-c03/d3-performance/vpc-peering

Com peering A↔B e B↔C, A fala com C?::**Não**: VPC peering **não é transitivo**

VPCs com CIDR sobreposto podem fazer peering?::**Não**: não há NAT no peering

Custo para criar uma conexão de VPC peering?::**Grátis**

Custo do tráfego de peering dentro da mesma AZ, entre AZs e entre regiões?::Mesma AZ **grátis** (mesmo entre contas); entre AZs e regiões **cobrado**

Fórmula de conexões para malha completa de N VPCs com peering?::**N(N-1)/2**

Quantas conexões de peering para malha completa de 12 VPCs?::**66**

Passos obrigatórios depois de solicitar o peering?::**Aceitar** a solicitação e **criar rotas nas duas** VPCs

Um security group pode referenciar o SG da VPC pareada?::**Sim** (mesma região; cross-region com restrições)

O tráfego de peering inter-Region é criptografado?::**Sim**, antes de sair das instalações da AWS

VPC peering tem ponto único de falha ou gargalo de banda?::**Não**: não há gateway nem hardware

CIDR sobreposto e precisa expor um serviço: qual alternativa?::**PrivateLink**

Evitar criar uma VPC por conta: qual recurso?::**VPC sharing (RAM)**
