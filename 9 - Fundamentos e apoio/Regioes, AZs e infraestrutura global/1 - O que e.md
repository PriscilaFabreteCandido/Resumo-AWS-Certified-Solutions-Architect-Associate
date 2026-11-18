---
tags: [saa-c03, regioes, az, fundamentos]
conceito: Regiões, Zonas de Disponibilidade e infraestrutura global
dominios: [1, 2, 3, 4]
atualizado: 2026-11-08
---

# Regiões, AZs e infraestrutura global — O que é

> [!info] Em uma frase
> A AWS divide o mundo em **Regiões** (áreas geográficas isoladas), cada uma com várias **Zonas de Disponibilidade** (AZs — um ou mais data centers com energia, refrigeração e rede independentes), e espalha **Edge Locations** (CloudFront) por centenas de cidades.

## A hierarquia

```
Região (ex.: sa-east-1, São Paulo)
├── AZ (sa-east-1a) — 1+ data centers independentes
├── AZ (sa-east-1b)
└── AZ (sa-east-1c)

Fora das Regiões:
├── Edge Locations        → CloudFront, Global Accelerator, Route 53
├── Local Zones           → latência de milissegundo único em metrópoles
├── Wavelength Zones      → dentro da rede 5G das operadoras
└── Outposts              → racks da AWS no seu data center
```

## As definições oficiais

> *"Each AWS Region consists of multiple, isolated, and physically separate AZs within a geographic area."*

> *"An Availability Zone (AZ) is one or more discrete data centers with redundant power, networking, and connectivity in an AWS Region."* (uma Zona de Disponibilidade (AZ) é um ou mais data centers distintos, com energia, rede e conectividade redundantes, dentro de uma Região)

Sobre a distância entre AZs:

> *"All AZs in an AWS Region are interconnected with high-bandwidth, low-latency networking, over fully redundant, dedicated metro fiber... All traffic between AZs is encrypted. ... AZs are physically separated by a meaningful distance, many kilometers, from any other AZ, although all are within 100 km (60 miles) of each other."* (todas as AZs de uma Região são interligadas por rede de alta largura de banda e baixa latência, sobre fibra metropolitana dedicada e totalmente redundante... Todo o tráfego entre AZs é criptografado... As AZs são separadas fisicamente por uma distância significativa, de muitos quilômetros, embora todas fiquem a até 100 km (60 milhas) umas das outras)

## O que isso significa na prova

| Requisito | Resposta |
|---|---|
| Resistir à falha de **um data center** | **Multi-AZ** |
| Resistir à falha de **uma Região** | **Multi-Region** (DR, replicação) |
| **Soberania de dados** / residência | Escolher a **Região** |
| **Latência** para usuários globais | **CloudFront** / **Global Accelerator** |
| Latência de **milissegundo único** numa cidade | **Local Zones** |
| Processar no local, no seu data center | **Outposts** |

> [!warning] A pegadinha nº 1
> **Multi-AZ ≠ Multi-Region.** Multi-AZ protege contra falha de data center ou de AZ — não contra um evento regional. Se o enunciado fala em *"another AWS Region"*, *"regional outage"* (indisponibilidade regional) ou *"disaster recovery"* (recuperação de desastre), Multi-AZ **não** é a resposta.

## Links

- [[9 - Fundamentos e apoio/Regioes, AZs e infraestrutura global/2 - Decorar|2 - Decorar]] · [[9 - Fundamentos e apoio/Regioes, AZs e infraestrutura global/3 - Detalhes|3 - Detalhes]] · [[9 - Fundamentos e apoio/Regioes, AZs e infraestrutura global/4 - Questoes|4 - Questoes]]
- [[9 - Fundamentos e apoio/Disaster Recovery (RPO e RTO)/1 - O que e|Disaster Recovery (RPO e RTO)]] · [[1 - Seguranca (30%)/VPC/1 - O que e|VPC]] · [[3 - Performance (24%)/CloudFront/1 - O que e|CloudFront]] · [[3 - Performance (24%)/Outposts/1 - O que e|Outposts]] · [[3 - Performance (24%)/Global Accelerator/1 - O que e|Global Accelerator]]
- [Regiões e AZs](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html)
