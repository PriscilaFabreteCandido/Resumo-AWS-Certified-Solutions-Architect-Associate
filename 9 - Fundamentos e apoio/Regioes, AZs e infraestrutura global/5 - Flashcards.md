---
servico: Regiões, Zonas de Disponibilidade e infraestrutura global
fonte: "[[9 - Fundamentos e apoio/Regioes, AZs e infraestrutura global/2 - Decorar|2 - Decorar]]"
---

# Regiões e AZs — Flashcards

#flashcards/saa-c03/fundamentos/regioes-azs

Distância máxima entre AZs da mesma Região?::Todas dentro de **100 km (60 mi)**

O tráfego entre AZs é criptografado?::**Sim**

Mínimo de AZs nas Regiões recentes?::**3** (algumas antigas têm 2)

Uma sub-rede pertence a quantas AZs? E uma VPC?::Sub-rede: **exatamente uma AZ**. VPC: **uma Região** (abrange todas as AZs dela)

Escopo de um volume EBS?::**Zonal** (uma AZ)

Como levar um volume EBS para outra AZ?::**Snapshot** (regional) → criar volume na outra AZ

Escopo de VPC, S3 bucket, Security Group, AMI e KMS key?::**Regional**

Escopo de IAM, Route 53, CloudFront e Global Accelerator?::**Global**

Escopo do NAT Gateway e da instância EC2?::**Zonal**

Multi-AZ × Multi-Region: do que cada um protege?::Multi-AZ: falha de **AZ / data center**. Multi-Region: **falha regional** e desastre

Latência de milissegundo único numa metrópole: qual infra?::**Local Zone**

Aplicações 5G dentro da rede da operadora: qual infra?::**Wavelength Zone**

Hardware da AWS no seu data center: qual infra?::**Outposts**

Camada intermediária do CloudFront entre a edge e a origem?::**Regional Edge Cache**
