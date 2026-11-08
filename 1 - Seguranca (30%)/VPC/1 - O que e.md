---
tags: [saa-c03, vpc, rede]
servico: Amazon VPC
tipo: Rede
dominios: [1, 3, 4]
atualizado: 2026-11-08
---

# Amazon VPC — O que é

> [!info] Em uma frase
> Sua **rede privada isolada** dentro de uma região da AWS, onde você define a faixa de IPs (CIDR), divide em **subnets** (cada uma em uma AZ) e controla o roteamento com **route tables**.

## O que é, em palavras simples

É o "datacenter virtual". Nada entra nem sai de uma VPC sem você ter criado um caminho explícito. Essa é a ideia central: **a VPC é fechada por padrão**, e você abre portas de forma deliberada.

As peças, na ordem em que você monta:

1. **VPC** — a faixa de IPs (ex.: `10.0.0.0/16`)
2. **Subnets** — pedaços da faixa, **uma por AZ** (`10.0.1.0/24` na AZ-a, `10.0.2.0/24` na AZ-b)
3. **Route tables** — para onde vai o tráfego de cada subnet
4. **Internet Gateway (IGW)** — a saída para a internet (subnet com rota para o IGW = **pública**)
5. **NAT Gateway** — saída para a internet **sem** entrada (para subnets privadas)
6. **Security Groups** e **NACLs** — o firewall
7. **Endpoints** — caminho privado para serviços da AWS

## Pública × privada — a única diferença

Uma subnet é **pública** se a route table dela tem uma rota `0.0.0.0/0` apontando para um **internet gateway**. É só isso. Não existe um "flag de pública".

## Onde aparece na prova

| Domínio | Como aparece |
|---|---|
| **1 – Segurança** | Segmentação em camadas, SG, NACL, endpoints, NAT |
| **3 – Performance** | Design de subnets, endereçamento, topologia (peering, TGW, PrivateLink) |
| **4 – Custo** | NAT gateway, tráfego cross-AZ, gateway endpoint grátis |

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[Security Groups]] · [[NACL (Network ACL)]] · [[NAT Gateway]] · [[VPC Endpoints e PrivateLink]] · [[VPC Peering]] · [[Transit Gateway]]
- [Documentação oficial da VPC](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html)
