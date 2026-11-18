---
tags: [saa-c03, nat-gateway, decorar]
servico: NAT Gateway
atualizado: 2026-11-08
---

# NAT Gateway — Decorar

## NAT gateway × NAT instance (tabela oficial, linhas que caem)

| Atributo | **NAT gateway** | **NAT instance** |
|---|---|---|
| Disponibilidade | *"Highly available... implemented with redundancy"* (dentro da AZ) | *"Use a script to manage failover between instances"* (usar um script para gerenciar o failover entre instâncias) |
| Banda | *"Scale up to 100 Gbps"* (escalar até 100 Gbps) | Depende do tipo de instância |
| Manutenção | *"Managed by AWS"* (gerenciado pela AWS) | **Você** patcheia |
| Custo | nº de gateways + duração + **GB processado** | nº de instâncias + duração + tipo/tamanho |
| **Security group** | **Não aceita** | Aceita |
| **Port forwarding** | **Não suportado** | Suportado |
| **Bastion** | **Não suportado** | Suportado |
| Timeout | Devolve **RST** | Devolve **FIN** |
| Fragmentação IP | UDP sim; **TCP e ICMP são descartados** | UDP, TCP e ICMP |

Recomendação oficial: *"We recommend that you use NAT gateways because they provide better availability and bandwidth and require less effort on your part to administer."* (recomendamos usar NAT gateways, porque oferecem melhor disponibilidade e banda e exigem menos esforço de administração da sua parte)

## Números

| Item | Valor |
|---|---|
| Banda | até **100 Gbps** |
| Onde fica | Subnet **pública**, com **Elastic IP** (tipo public) |
| Escopo | **Zonal** (o NAT regional expande entre AZs) |
| IPs por AZ | **8** no zonal, até **32** no regional |
| Tipos de conectividade | **Public** (padrão) e **Private** (sem EIP, para alcançar on-premises) |

## Um NAT ou um por AZ?

O guia pede literalmente: *"Configuring appropriate NAT gateway types for a network (for example, a single shared NAT gateway compared with NAT gateways for each Availability Zone)"* (configurar os tipos apropriados de NAT gateway para uma rede (por exemplo, um único NAT gateway compartilhado em comparação com um por Zona de Disponibilidade)).

| Escolha | Prós | Contras |
|---|---|---|
| **Um por AZ** | Zona-independente; **sem tráfego cross-AZ** | Mais horas de gateway |
| **Um compartilhado** | Menos horas de gateway | Ponto único de falha; todo tráfego das outras AZs vira **cross-AZ cobrado** |

**Regra prática**: volume alto → **um por AZ** (a economia de cross-AZ supera as horas). Volume muito baixo e ambiente não crítico → um compartilhado.

## A economia clássica de prova

> Subnet privada gravando muito no **S3/DynamoDB** pelo NAT gateway → trocar por **gateway endpoint** (**grátis**).

## Links

- [[1 - Seguranca (30%)/NAT Gateway/1 - O que e|1 - O que e]] · [[1 - Seguranca (30%)/NAT Gateway/3 - Detalhes|3 - Detalhes]] · [[1 - Seguranca (30%)/NAT Gateway/4 - Questoes|4 - Questoes]]
