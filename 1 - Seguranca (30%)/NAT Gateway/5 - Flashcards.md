---
servico: NAT Gateway
fonte: "[[1 - Seguranca (30%)/NAT Gateway/2 - Decorar|2 - Decorar]]"
---

# NAT Gateway — Flashcards

#flashcards/saa-c03/d1-seguranca/nat-gateway

Banda máxima do NAT gateway?::Até **100 Gbps**

Onde fica um NAT gateway do tipo public?::Em subnet **pública**, com **Elastic IP**

NAT gateway aceita security group?::**Não** (NAT instance aceita)

NAT gateway suporta port forwarding ou bastion?::**Não**; NAT instance suporta

Quem patcheia NAT gateway × NAT instance?::NAT gateway: **gerenciado pela AWS**. NAT instance: **você**

O que o NAT gateway devolve em timeout, e a NAT instance?::NAT gateway: **RST**. NAT instance: **FIN**

Como se faz failover em NAT instance?::Com um **script** que você gerencia

Componentes de custo do NAT gateway?::Nº de gateways + duração + **GB processado**

Escopo do NAT gateway e quantos IPs por AZ?::**Zonal**: **8** IPs por AZ (o regional vai até **32**)

Dois tipos de conectividade do NAT gateway?::**Public** (padrão) e **Private** (sem EIP, para alcançar on-premises)

Um NAT por AZ ou um compartilhado com volume alto de tráfego?::**Um por AZ**: zona-independente e sem tráfego **cross-AZ** cobrado

Contras de um NAT gateway compartilhado entre AZs?::**Ponto único de falha** e tráfego das outras AZs vira **cross-AZ cobrado**

Subnet privada gravando muito em S3/DynamoDB pelo NAT: como economizar?::Trocar por **gateway endpoint** (**grátis**)

Que fragmentos IP o NAT gateway descarta?::**TCP e ICMP** (UDP fragmentado passa)
