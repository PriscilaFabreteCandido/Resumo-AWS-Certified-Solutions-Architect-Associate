---
tags: [saa-c03, well-architected, decorar]
conceito: AWS Well-Architected Framework
atualizado: 2026-11-08
---

# Well-Architected — Decorar

## As áreas de boas práticas de cada pilar

| Pilar | Áreas |
|---|---|
| **Operational Excellence** (4) | Organization · Prepare · Operate · Evolve |
| **Security** (7) | Security foundations · Identity and access management · **Detection** · Infrastructure protection · **Data protection** · Incident response · Application security |
| **Reliability** (4) | Foundations · Workload architecture · Change management · **Failure management** |
| **Performance Efficiency** (5) | Architecture selection · Compute and hardware · Data management · Networking and content delivery · Process and culture |
| **Cost Optimization** (5) | Practice Cloud Financial Management · Expenditure and usage awareness · Cost-effective resources · Manage demand and supply resources · **Optimize over time** |
| **Sustainability** (6) | **Region selection** · Alignment to demand · Software and architecture · Data · Hardware and services · Process and culture |

## O princípio mais rentável da prova

> **"Using purpose-built AWS services for workloads"** — citado **duas vezes** no guia (Task 2.1 e Task 2.2).

Quando uma alternativa usa o serviço **feito para aquilo** e outra usa um serviço genérico adaptado, a primeira é a resposta.

## Como cada pilar elimina alternativas

| Pilar | Elimina |
|---|---|
| **Operational Excellence** | "script manual", "atualizar no lugar", "cron em EC2" |
| **Security** | "access key no código", "bucket público", "0.0.0.0/0" |
| **Reliability** | Single-AZ, ponto único de falha, sem backup |
| **Performance Efficiency** | "instância maior" como reflexo; serviço genérico adaptado |
| **Cost Optimization** | Capacidade ociosa, HA em dev, classe de storage errada |
| **Sustainability** | Recurso superdimensionado |

## A ferramenta

**AWS Well-Architected Tool** conduz a revisão na console, pilar por pilar, e gera um plano de melhoria.

## Links

- [[9 - Fundamentos e apoio/Well-Architected Framework/1 - O que e|1 - O que e]] · [[9 - Fundamentos e apoio/Well-Architected Framework/3 - Detalhes|3 - Detalhes]] · [[9 - Fundamentos e apoio/Well-Architected Framework/4 - Questoes|4 - Questoes]]
