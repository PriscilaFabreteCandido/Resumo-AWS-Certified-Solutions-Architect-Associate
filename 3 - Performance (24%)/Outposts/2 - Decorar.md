---
tags: [saa-c03, outposts, decorar]
servico: AWS Outposts
atualizado: 2026-11-08
---

# Outposts — Decorar

## A tabela da família híbrida

| Serviço | Hardware fica | Para quê |
|---|---|---|
| **Outposts** | **Seu datacenter** | Latência local, residência de dados, operar desconectado |
| **Local Zones** | AWS, **perto da cidade** | Latência de 1 dígito de ms sem hardware seu |
| **Wavelength** | Rede **5G** da operadora | Mobile com latência mínima |
| **ECS/EKS Anywhere** | Seus servidores | Container local |
| **Storage Gateway** | Seu datacenter (VM) | Acesso local, dado na AWS |
| **VMware Cloud on AWS** | **Na AWS** | vSphere na nuvem |

## Formatos

| Formato | Uso |
|---|---|
| **Outposts racks** | Rack completo, datacenter |
| **Outposts servers** | 1U/2U, espaço pequeno (loja, filial) |

## Serviços que rodam no Outpost

**EC2** · **EBS** · **S3 on Outposts** · **RDS on Outposts** · **ECS** · **EKS** · **ALB** · **EMR**

⚠️ É um **subconjunto**. O **plano de controle** fica na **região**.

## O número documentado

No Outpost, o **gp3** vai até **16 TiB, 16.000 IOPS e 1.000 MiB/s** — contra 64 TiB / 80.000 IOPS / 2.000 MiB/s na região.

## A regra de decisão

| Enunciado | Resposta |
|---|---|
| "latência de **1 dígito de ms** para sistemas no datacenter" | **Outposts** |
| "o dado **não pode sair** do nosso prédio" | **Outposts** |
| "precisa funcionar **se o link cair**" | **Outposts** |
| "latência baixa para usuários de uma **cidade**" | **Local Zones** |
| "aplicação mobile **5G**" | **Wavelength** |
| "acesso de arquivo local, dado na AWS" | **Storage Gateway** |
| Nada disso | **Região da AWS** |

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
