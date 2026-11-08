---
tags: [saa-c03, nat-gateway, detalhes]
servico: NAT Gateway
atualizado: 2026-11-08
---

# NAT Gateway — Detalhes

## 1. Por que ele não aceita security group

O NAT gateway é um serviço gerenciado, não uma ENI sua. A doc: *"You cannot associate security groups with NAT gateways. You can associate them with the resources behind the NAT gateway to control inbound and outbound traffic."*

Isso tem três consequências práticas:

1. **O controle fica nos recursos atrás** — o SG das instâncias privadas define o que elas podem alcançar.
2. **A NACL da subnet do NAT** é o único filtro de rede no caminho: *"Use a network ACL to control the traffic to and from the subnet in which your NAT gateway resides."*
3. **Se o requisito é filtrar o que sai por domínio ou por inspeção profunda**, o NAT gateway não serve — a resposta é **AWS Network Firewall** ou um appliance atrás de um **Gateway Load Balancer**.

## 2. Alta disponibilidade

O NAT gateway é *"Highly available. NAT gateways in each Availability Zone are implemented with redundancy"* — ou seja, redundante **dentro** da AZ, não entre AZs.

Arquitetura correta:

```
AZ-a: subnet pública (NAT-a)  ←  subnet privada A  (rota 0.0.0.0/0 -> NAT-a)
AZ-b: subnet pública (NAT-b)  ←  subnet privada B  (rota 0.0.0.0/0 -> NAT-b)
AZ-c: subnet pública (NAT-c)  ←  subnet privada C  (rota 0.0.0.0/0 -> NAT-c)
```

Cada subnet privada tem a **sua própria route table** apontando para o NAT da **mesma AZ**. Isso dá dois ganhos: sobrevive à perda de uma AZ, e evita tráfego cross-AZ (que é cobrado).

Existe também o **NAT gateway regional**, que *"automatically expands across Availability Zones based on your workload presence"* — mas ele *"do[es] not support private NAT"*, e a expansão pode levar *"up to 60 minutes"*.

## 3. Custo — a conta que a prova faz

O NAT gateway cobra **duas** coisas: hora de gateway **e** GB processado. A segunda é a que surpreende.

Cenário típico de questão: instâncias privadas enviando 50 TB/mês para um bucket S3 **na mesma região**, passando pelo NAT. Soluções, em ordem de eficácia:

| Solução | Efeito |
|---|---|
| **Gateway endpoint para S3/DynamoDB** | Elimina o GB processado **e** o cross-AZ. **Sem custo adicional** |
| **Um NAT por AZ** | Elimina só o cross-AZ |
| **Interface endpoint** | Tira da internet, mas **é cobrado** por hora e por GB |
| **NAT instance** | Troca a cobrança por GB pela da instância, ao preço de HA e patch manuais |

## 4. NAT privado

O tipo **Private** não tem Elastic IP e não alcança a internet. Serve para que recursos numa VPC alcancem **on-premises** (via DX/VPN/TGW) usando um IP de origem único e previsível, sem expor a faixa inteira.

## 5. Quando NAT gateway não é a resposta

| Necessidade | Serviço |
|---|---|
| Alcançar **S3 ou DynamoDB** | **Gateway endpoint** (grátis) |
| Alcançar **outro serviço AWS** por IP privado | **Interface endpoint (PrivateLink)** |
| Saída **IPv6** | **Egress-only internet gateway** |
| **Bastion** / acesso administrativo | **SSM Session Manager** |
| **Port forwarding** | NAT instance (ou SSM port forwarding) |
| **Inspeção/filtragem** do tráfego de saída | **Network Firewall** ou **GWLB** + appliance |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[VPC]] · [[VPC Endpoints e PrivateLink]] · [[Systems Manager (e Parameter Store)]]
- [NAT gateway × NAT instance](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-comparison.html)
