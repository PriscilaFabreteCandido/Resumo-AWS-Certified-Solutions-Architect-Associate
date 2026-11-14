---
tags: [saa-c03, regioes, az, decorar]
conceito: Regiões, Zonas de Disponibilidade e infraestrutura global
atualizado: 2026-11-08
---

# Regiões e AZs — Decorar

## Os números

| Item | Valor |
|---|---|
| Distância entre AZs da mesma Região | **muitos km, mas todas dentro de 100 km (60 mi)** |
| Tráfego entre AZs | **criptografado** |
| AZs mínimas por Região | **3** nas Regiões recentes (algumas antigas têm 2) |
| Sub-rede | pertence a **exatamente uma AZ** |
| VPC | pertence a **exatamente uma Região** (abrange todas as AZs dela) |

> [!note] Quantidade de Regiões e AZs
> Muda com frequência. **Não decore o total** — a prova não pergunta "quantas Regiões existem".

## O escopo de cada recurso — a tabela mais cobrada

| Escopo | Recursos |
|---|---|
| **Zonal** (uma AZ) | **Subnet** · **EC2 instance** · **EBS volume** · instâncias do **RDS** · **NAT Gateway** · Elastic IP (associado) |
| **Regional** | **VPC** · **S3 bucket** · **DynamoDB table** · **Security Group** · **NACL** · **AMI** · **snapshot EBS** · **ELB** · **Auto Scaling group** · **SQS/SNS** · **KMS key** · **Lambda** · **EFS** (regional, com mount target por AZ) |
| **Global** | **IAM** (users, roles, policies) · **Route 53** · **CloudFront** · **WAF** (para CloudFront) · **Organizations** · **Global Accelerator** |

> [!warning] EBS é **zonal**
> Um volume EBS só anexa a uma instância **na mesma AZ**. Para mover: **snapshot** (regional) → criar volume na outra AZ.

## Multi-AZ × Multi-Region

| | **Multi-AZ** | **Multi-Region** |
|---|---|---|
| Protege de | falha de data center / AZ | **falha regional**, desastre |
| Latência | ms (metro fiber) | dezenas a centenas de ms |
| Custo de transferência | cobrado entre AZs | cobrado, mais caro |
| Exemplos | RDS Multi-AZ, ASG em 3 AZs, ELB | S3 CRR, Aurora Global Database, DynamoDB Global Tables, Route 53 failover |

## Fora das Regiões

| Infra | Para quê |
|---|---|
| **Edge Location** | Cache do **CloudFront**, entrada do **Global Accelerator**, **Route 53** |
| **Regional Edge Cache** | Camada intermediária do CloudFront (entre edge e origem) |
| **Local Zone** | **Latência de milissegundo único** numa metrópole |
| **Wavelength Zone** | Aplicações **5G** dentro da rede da operadora |
| **Outposts** | Hardware da AWS **no seu data center** (residência de dados, latência local) |

## Links

- [[9 - Fundamentos e apoio/Regioes, AZs e infraestrutura global/1 - O que e|1 - O que e]] · [[9 - Fundamentos e apoio/Regioes, AZs e infraestrutura global/3 - Detalhes|3 - Detalhes]] · [[9 - Fundamentos e apoio/Regioes, AZs e infraestrutura global/4 - Questoes|4 - Questoes]]
