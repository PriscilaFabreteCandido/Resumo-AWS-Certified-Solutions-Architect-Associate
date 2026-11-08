---
tags: [saa-c03, ec2, compute]
servico: Amazon EC2
tipo: Computação (máquina virtual)
dominios: [2, 3, 4]
atualizado: 2026-11-08
---

# Amazon EC2 — O que é

> [!info] Em uma frase
> Máquina virtual na AWS: você escolhe **família e tamanho** da instância, a **imagem (AMI)**, o **disco (EBS ou instance store)**, a **rede (VPC, subnet, security group)** e a **forma de pagar** (On-Demand, Spot, Reserved, Savings Plans, Dedicated).

## O que é, em palavras simples

É o servidor "cru". Você é responsável pelo sistema operacional para cima — patch, usuários, aplicação. A AWS é responsável pelo hardware, hipervisor e rede física.

Por isso, na prova, **EC2 quase nunca é a resposta quando o enunciado pede "least operational overhead"**. Ele é a resposta quando o enunciado pede controle: licença própria, GPU, kernel customizado, software legado, daemon no host.

## As cinco decisões de uma instância

| Decisão | Opções |
|---|---|
| **Família e tamanho** | T (burstable) · M (geral) · C (CPU) · R/X/z (memória) · I/D (storage local) · P/G/Inf/Trn (GPU e aceleradores) · Hpc |
| **Imagem** | AMI da AWS, do Marketplace, ou sua (criada por EC2 Image Builder) |
| **Disco** | **EBS** (persistente, de rede) ou **instance store** (NVMe local, **efêmero**) |
| **Rede** | VPC + subnet (que define a **AZ**) + security group + IP público ou privado |
| **Pagamento** | On-Demand · Spot · Reserved Instances · Savings Plans · Dedicated Hosts/Instances · Capacity Reservations |

## Onde aparece na prova

| Domínio | Como aparece |
|---|---|
| **3 – Performance** | Escolha de família e tamanho, instance store, enhanced networking, placement groups |
| **4 – Custo** | Opções de compra, rightsizing, hibernação, desligar fora de horário |
| **2 – Resiliência** | Multi-AZ via Auto Scaling, substituição de instância, immutable infrastructure |
| **1 – Segurança** | IAM role na instância (nunca access key), security group, acesso via Session Manager |

## O que o EC2 **não** é

| Não é | Use |
|---|---|
| Serverless | **Lambda** ou **Fargate** |
| Orquestrador de container | **ECS** ou **EKS** |
| Banco gerenciado | **RDS**, **Aurora**, **DynamoDB** |
| Armazenamento compartilhado | **EFS** ou **FSx** |

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[Auto Scaling (EC2)]] · [[Placement Groups]] · [[EBS]] · [[Opcoes de compra do EC2 (Spot, RI, Savings Plans)]]
- [Documentação oficial do EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html)
