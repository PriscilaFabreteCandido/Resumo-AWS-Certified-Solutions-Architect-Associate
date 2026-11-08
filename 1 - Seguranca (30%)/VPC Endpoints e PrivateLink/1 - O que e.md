---
tags: [saa-c03, vpc-endpoint, privatelink, rede]
servico: VPC Endpoints e AWS PrivateLink
tipo: Acesso privado a serviços
dominios: [1, 3, 4]
atualizado: 2026-11-08
---

# VPC Endpoints e PrivateLink — O que é

> [!info] Em uma frase
> Permitem alcançar serviços da AWS (ou serviços de terceiros, ou seus próprios) **sem passar pela internet**, sem internet gateway e sem NAT gateway.

## Os três tipos

| Tipo | Serviços | Como roteia | Custo |
|---|---|---|---|
| **Gateway endpoint** | **Só S3 e DynamoDB** | Rota com **prefix list** na route table | **Grátis** |
| **Interface endpoint** (PrivateLink) | Quase todos os serviços AWS, serviços de parceiros, **e o seu próprio** | **ENI com IP privado** na sua subnet, resolvida por DNS | Cobrado por hora e por GB |
| **Gateway Load Balancer endpoint** | Appliance de inspeção de terceiro | Route table → GWLB (**GENEVE**) | Cobrado |

## A frase que decide a questão

> *"There is no additional charge for using gateway endpoints."*

E a distinção estrutural: *"Gateway endpoints do not use AWS PrivateLink, unlike the other types of VPC endpoints."*

## Quando usar cada um

| Situação | Tipo |
|---|---|
| Subnet privada precisa do **S3 ou DynamoDB**, com menor custo | **Gateway endpoint** |
| Subnet privada precisa de **outro serviço AWS** (SSM, Secrets Manager, KMS, ECR…) | **Interface endpoint** |
| **On-premises** precisa alcançar o S3 por link privado | **Interface endpoint** (o gateway só funciona de dentro da VPC) |
| Quero **expor meu serviço** para outra conta/VPC por IP privado | **PrivateLink** (endpoint service + NLB) |
| VPCs com **CIDR sobreposto** precisam consumir um serviço | **PrivateLink** |
| Tráfego precisa passar por **firewall de terceiro** | **GWLB endpoint** |

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[VPC]] · [[NAT Gateway]] · [[S3]] · [[VPC Peering]] · [[Transit Gateway]]
- [Conceitos do PrivateLink](https://docs.aws.amazon.com/vpc/latest/privatelink/concepts.html)
