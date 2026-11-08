---
tags: [saa-c03, vpc-endpoint, decorar]
servico: VPC Endpoints e AWS PrivateLink
atualizado: 2026-11-08
---

# VPC Endpoints — Decorar

## A tabela essencial

| | **Gateway endpoint** | **Interface endpoint** |
|---|---|---|
| Serviços | **S3 e DynamoDB** apenas | Quase todos + parceiros + o seu |
| Mecanismo | **Rota** com prefix list | **ENI** com IP privado |
| Usa PrivateLink? | **Não** | **Sim** |
| Custo | **Grátis** | Por **hora** e por **GB** |
| Funciona de **on-premises**? | **Não** (só de dentro da VPC) | **Sim** (via DX/VPN) |
| DNS | — | DNS privado resolve o nome público para o IP privado |
| Security group | — | **Sim** (é uma ENI) |

## Longest-prefix match (cai em prova)

> *"If there is a route that sends all internet traffic (0.0.0.0/0) to an internet gateway, the endpoint route takes precedence for traffic destined for the service... in the current Region."*

Tráfego para o serviço em **outra região** continua saindo pelo internet gateway.

## Detalhes que caem

| Fato | Detalhe |
|---|---|
| NACL | *"The network ACLs... must also allow traffic"* para os CIDRs do serviço |
| Prefix list em NACL | *"You can't reference prefix lists in network ACL rules"* |
| Subnet sem a rota | Continua usando o endpoint **público** do serviço |
| Rotas do gateway endpoint | A AWS as cria; você **não pode** modificar nem deletar diretamente |
| Interface endpoint: ENI | *"For each subnet that you specify when you create a VPC endpoint, we create an endpoint network interface in the subnet"* |

## PrivateLink — expor o seu serviço

```
CONTA PRODUTORA                      CONTA CONSUMIDORA
┌────────────────────┐              ┌────────────────────┐
│  Serviço           │              │  Aplicação         │
│     ↑              │              │     │              │
│  Network LB        │              │  Interface         │
│     ↑              │ <─────────── │  endpoint (ENI)    │
│  Endpoint SERVICE  │   PrivateLink│                     │
└────────────────────┘              └────────────────────┘
```

O produtor publica um **endpoint service** apoiado num **NLB** (ou GWLB). O consumidor cria um **interface endpoint** para ele. **CIDR sobreposto não importa** — não há roteamento de redes.

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
