---
tags: [saa-c03, security-group, rede, seguranca]
servico: Security Groups
tipo: Firewall de instância (stateful)
dominios: [1]
atualizado: 2026-11-08
---

# Security Groups — O que é

> [!info] Em uma frase
> **Firewall virtual no nível do recurso** (instância, ENI, RDS, ELB), **stateful** e **só com regras de permissão** — o que não está explicitamente liberado, está bloqueado.

## O que é, em palavras simples

Um security group é uma lista de "quem pode falar comigo e em qual porta". A doc oficial: *"A security group controls the traffic that is allowed to reach and leave the resources that it is associated with."* Ele *"acts as a virtual firewall"*.

Duas propriedades definem tudo:

**1. É stateful.** Se a conexão saiu, a resposta volta — não importa a regra de entrada. *"if you send a request from an instance, the response traffic for that request is allowed to reach the instance regardless of the inbound security group rules."* O contrário também vale.

**2. Só tem allow.** Não existe regra de negação. Para bloquear um IP específico, você precisa de **NACL** (rede) ou **WAF** (camada 7).

## O que cada regra tem

| Direção | Campos |
|---|---|
| **Inbound** | source, port range, protocol |
| **Outbound** | destination, port range, protocol |

O **source** pode ser um CIDR, um **prefix list**, ou **outro security group** — e essa última forma é a mais importante da prova.

## Onde se aplica

Associa-se a **recursos**, não a subnets: instância EC2 (na verdade, à ENI), RDS, ELB, interface endpoint, Lambda em VPC, ECS task em modo `awsvpc`. Um recurso pode ter **vários** SGs — as regras se somam.

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[NACL (Network ACL)]] · [[VPC]]
- [Documentação oficial](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html)
