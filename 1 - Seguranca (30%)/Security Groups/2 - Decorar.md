---
tags: [saa-c03, security-group, decorar]
servico: Security Groups
atualizado: 2026-11-08
---

# Security Groups — Decorar

## A tabela oficial SG × NACL

| Característica | **Security group** | **Network ACL** |
|---|---|---|
| Nível de operação | **Instance level** | Subnet level |
| Escopo | Todos os recursos associados ao SG | Todas as instâncias nas subnets associadas |
| Tipo de regra | **Allow rules only** | Allow **e** deny |
| Avaliação | **Avalia todas as regras** antes de decidir | Em ordem crescente, **para na primeira que casa** |
| Tráfego de retorno | **Automaticamente permitido (stateful)** | **Precisa ser liberado (stateless)** |

## O SG default de toda VPC

| Direção | Regra |
|---|---|
| **Inbound** | Source = **o próprio SG** (o ID dele mesmo), All protocols, All ports |
| **Outbound** | `0.0.0.0/0`, All/All (e `::/0` se a VPC tiver IPv6) |

- **Não pode ser deletado** (erro `Client.CannotDelete`). Pode ser modificado.
- As regras default **não** liberam tráfego vindo de internet gateway ou NAT gateway.
- A AWS recomenda *"create security groups for specific resources... instead of using the default security group"* (crie security groups para recursos específicos... em vez de usar o security group padrão).

## Fatos para decorar

| Item | Valor |
|---|---|
| Custo | *"There is no additional charge for using security groups"* (não há cobrança adicional pelo uso de security groups) |
| SGs por recurso | Vários (as regras se somam) |
| Regra de negação | **Não existe** |
| Source possível | CIDR · **prefix list** · **outro security group** |
| Escopo | **Regional** — um SG não atravessa VPC nem região |

## O que SG **não** filtra

Amazon DNS (Route 53 Resolver, o VPC+2), DHCP, **metadados da instância (IMDS)**, metadados de task do ECS, ativação de licença Windows, Amazon Time Sync, e os IPs reservados do router da VPC.

## Boa prática citada na doc

Para as portas **22 (SSH)** e **3389 (RDP)**: *"authorize only specific IP address ranges"* (autorizar apenas faixas de endereço IP específicas). E o alerta: *"If you specify 0.0.0.0/0 (IPv4) and ::/ (IPv6), this enables anyone to access your instances."* (se você especificar 0.0.0.0/0 (IPv4) e ::/ (IPv6), qualquer pessoa poderá acessar suas instâncias)

## Links

- [[1 - Seguranca (30%)/Security Groups/1 - O que e|1 - O que e]] · [[1 - Seguranca (30%)/Security Groups/3 - Detalhes|3 - Detalhes]] · [[1 - Seguranca (30%)/Security Groups/4 - Questoes|4 - Questoes]]
