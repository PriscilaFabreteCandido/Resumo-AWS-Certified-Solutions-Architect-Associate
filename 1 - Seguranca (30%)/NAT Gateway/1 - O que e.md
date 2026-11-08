---
tags: [saa-c03, nat-gateway, rede]
servico: NAT Gateway
tipo: Saída para internet de subnet privada
dominios: [1, 4]
atualizado: 2026-11-08
---

# NAT Gateway — O que é

> [!info] Em uma frase
> Permite que recursos numa **subnet privada** iniciem conexões **para fora** (atualizações, APIs externas) **sem** que a internet consiga iniciar conexões para eles. Gerenciado pela AWS, escala até **100 Gbps**.

## Onde ele fica e como funciona

```
Subnet PRIVADA                  Subnet PÚBLICA              Internet
┌──────────────┐    0.0.0.0/0   ┌──────────────┐  0.0.0.0/0  ┌──────┐
│  instâncias  │ ─────────────> │ NAT GATEWAY  │ ──────────> │      │
│              │                │ + Elastic IP │             │      │
└──────────────┘                └──────────────┘             └──────┘
                                        ▲
                                  Internet Gateway
```

O NAT gateway vive numa subnet **pública** (com rota para o IGW) e tem um **Elastic IP**. A route table da subnet **privada** aponta `0.0.0.0/0` para ele.

## Os três fatos que mais caem

1. **Não aceita security group.** *"You cannot associate security groups with NAT gateways."* Controle por **NACL** na subnet dele ou por **SG nos recursos atrás**.
2. **É zonal.** *"Create a NAT gateway in each Availability Zone to ensure zone-independent architecture."* Um NAT só = ponto único de falha e tráfego cross-AZ cobrado.
3. **Cobra por hora + por GB processado.** É o vilão nº 1 de custo em laboratório e em arquitetura mal desenhada.

## IPv4 × IPv6

| Saída | Serviço |
|---|---|
| **IPv4** | **NAT gateway** |
| **IPv6** | **Egress-only internet gateway** |

A doc: *"A NAT gateway is for use with IPv4 or IPv6 traffic (using DNS64 and NAT64). Another option for enabling outbound-only internet communication over IPv6 is using an egress-only internet gateway."*

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[VPC]] · [[VPC Endpoints e PrivateLink]] · [[Security Groups]] · [[NACL (Network ACL)]]
- [NAT gateway](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html)
