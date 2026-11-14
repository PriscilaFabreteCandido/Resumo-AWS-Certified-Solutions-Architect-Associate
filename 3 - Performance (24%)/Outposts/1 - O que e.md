---
tags: [saa-c03, outposts, hibrido]
servico: AWS Outposts
tipo: AWS no seu datacenter
dominios: [3, 4]
atualizado: 2026-11-08
---

# AWS Outposts — O que é

> [!info] Em uma frase
> **Hardware da AWS instalado no seu datacenter**, rodando serviços AWS (EC2, EBS, S3 on Outposts, RDS, ECS/EKS) com a mesma API, operado pela AWS.

## Os três gatilhos de prova

Só três requisitos justificam Outposts. Fora deles, a resposta é a **região**.

| Requisito | Por quê |
|---|---|
| **Latência de único dígito de ms** para sistemas no datacenter | A ida até a região não cabe |
| **Residência de dados** (o dado não pode sair do prédio/país) | Regulatório |
| **Operar com o link caído** | Fábrica, hospital, navio, site remoto |

## Onde o guia cita

**Task 4.2**, no Knowledge of: *"Hybrid compute options (for example, AWS Outposts)"*.

## A família híbrida

| Opção | O que é |
|---|---|
| **Outposts** | Rack ou servidor da AWS **no seu datacenter** |
| **Local Zones** | Infraestrutura da AWS **perto da cidade** |
| **Wavelength** | Dentro da rede **5G** da operadora |
| **ECS/EKS Anywhere** | O orquestrador roda nos **seus** servidores |
| **Storage Gateway** | Acesso local de arquivo/bloco/fita, dado na AWS |
| **VMware Cloud on AWS** | vSphere rodando **na AWS** (o inverso do Outposts) |

## Links

- [[3 - Performance (24%)/Outposts/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/Outposts/3 - Detalhes|3 - Detalhes]] · [[3 - Performance (24%)/Outposts/4 - Questoes|4 - Questoes]]
- [[3 - Performance (24%)/EC2/1 - O que e|EC2]] · [[3 - Performance (24%)/Storage Gateway/1 - O que e|Storage Gateway]] · [[3 - Performance (24%)/Direct Connect/1 - O que e|Direct Connect]] · [[9 - Fundamentos e apoio/Regioes, AZs e infraestrutura global/1 - O que e|Regioes, AZs e infraestrutura global]]
