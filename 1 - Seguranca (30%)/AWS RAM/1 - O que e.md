---
tags: [saa-c03, ram, multi-conta]
servico: AWS Resource Access Manager (RAM)
tipo: Compartilhamento de recursos entre contas
dominios: [1, 4]
atualizado: 2026-11-08
---

# AWS RAM — O que é

> [!info] Em uma frase
> Compartilha **recursos** (não permissões) entre contas AWS: subnets, Transit Gateway, licenças, regras do Route 53 Resolver, portfólios do Service Catalog.

## Definição oficial

> *"AWS Resource Access Manager (AWS RAM) helps you securely share your resources across AWS accounts, within your organization or organizational units (OUs), and with AWS Identity and Access Management (IAM) roles and users for supported resource types."*

## A distinção que define o serviço

| Serviço | Compartilha |
|---|---|
| **IAM / SCP** | **Permissão** (o que um principal pode fazer) |
| **AWS RAM** | **Recurso** (o próprio objeto, usável por outra conta) |

## O caso de uso nº 1 de prova: VPC sharing

A conta de rede cria a VPC e compartilha **subnets** com as contas de workload. Cada conta lança seus recursos nas subnets compartilhadas, mas **não** gerencia a VPC.

Ganhos: menos VPCs, menos **NAT gateways**, menos conexões (peering/TGW/DX), e endereçamento centralizado. É resposta de **custo** e de **simplificação**.

## Custo

> *"There are no additional charges for using AWS RAM or for creating resource shares."*

(Você paga o uso dos recursos, normalmente.)

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[Organizations e Control Tower]] · [[VPC]] · [[Transit Gateway]] · [[NAT Gateway]]
- [O que é o AWS RAM](https://docs.aws.amazon.com/ram/latest/userguide/what-is.html)
