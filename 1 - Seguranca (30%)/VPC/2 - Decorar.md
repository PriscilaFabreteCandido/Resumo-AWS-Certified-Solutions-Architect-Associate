---
tags: [saa-c03, vpc, decorar]
servico: Amazon VPC
atualizado: 2026-11-08
---

# Amazon VPC — Decorar

## Os 5 IPs reservados em TODA subnet

Em `10.0.0.0/24`:

| IP | Reservado para |
|---|---|
| `10.0.0.0` | Endereço de rede |
| `10.0.0.1` | **Router da VPC** |
| `10.0.0.2` | **DNS** (base da faixa + 2) |
| `10.0.0.3` | Uso futuro da AWS |
| `10.0.0.255` | Broadcast (a VPC **não suporta** broadcast) |

**Logo: um `/28` (16 IPs) dá apenas 11 utilizáveis.**

## Máscaras permitidas

| | Faixa |
|---|---|
| Subnet IPv4 | **/28 a /16** |
| Subnet IPv6 | **/44 a /64**, em incrementos de /4 |

Subnets na mesma VPC **não podem sobrepor**. Subnet é **zonal** (vive em uma AZ).

## Gateways e saídas

| Componente | Direção | Protocolo |
|---|---|---|
| **Internet Gateway** | Entrada **e** saída | IPv4 e IPv6 |
| **NAT Gateway** | **Só saída** | IPv4 (e IPv6 via DNS64/NAT64) |
| **Egress-only Internet Gateway** | **Só saída** | **Só IPv6** |
| **Virtual Private Gateway** | VPN para on-premises | — |
| **Transit Gateway** | Hub de VPCs e on-premises | — |

## SG × NACL (tabela oficial)

| Característica | **Security group** | **Network ACL** |
|---|---|---|
| Nível | Instance level | Subnet level |
| Tipo de regra | **Allow rules only** | **Allow and deny rules** |
| Avaliação | **Avalia todas** as regras | **Em ordem crescente, para na primeira que casa** |
| Tráfego de retorno | **Automático (stateful)** | **Precisa ser liberado (stateless)** |

## Endpoints

| Tipo | Serviços | Custo |
|---|---|---|
| **Gateway endpoint** | **Só S3 e DynamoDB** | **Grátis** |
| **Interface endpoint** (PrivateLink) | Quase todos + serviços próprios | Por hora e por GB |
| **Gateway Load Balancer endpoint** | Appliance de inspeção | Cobrado |

## O que SG e NACL **não** filtram

Amazon DNS (Route 53 Resolver, o VPC+2), DHCP, **metadados da instância (IMDS)**, metadados de task do ECS, ativação de licença Windows, Amazon Time Sync e os IPs reservados do router da VPC.

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[02 - Numeros para decorar]]
