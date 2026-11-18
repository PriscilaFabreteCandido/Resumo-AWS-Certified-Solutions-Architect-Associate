---
tags: [saa-c03, disaster-recovery, resiliencia, fundamentos]
conceito: Disaster Recovery (RPO e RTO)
dominios: [2, 4]
atualizado: 2026-11-08
---

# Disaster Recovery (RPO e RTO) — O que é

> [!info] Em uma frase
> **RPO** = quanto **dado** você aceita perder (mede para trás, em tempo); **RTO** = quanto **tempo** você aceita ficar fora (mede para frente). Juntos, eles escolhem **uma** das quatro estratégias oficiais de DR.

## As duas métricas

```
        ┌──── RPO ────┐ DESASTRE ┌──── RTO ────┐
        │             │     ✕    │             │
   último backup   dado perdido      serviço de volta

RPO = perda de DADOS aceitável   (ex.: "no máximo 15 minutos de transações")
RTO = tempo de INDISPONIBILIDADE aceitável (ex.: "de volta em 1 hora")
```

> [!tip] Mnemônico
> **RP**O → **R**ecovery **P**oint → aponta para o **P**assado → **P**erda de dados.
> **RT**O → **R**ecovery **T**ime → **T**empo até voltar.

## As quatro estratégias oficiais

| Estratégia | RPO / RTO | Infra no site de DR | Custo |
|---|---|---|---|
| **Backup and restore** | **Horas** | Nenhuma (só backups) | **Menor** |
| **Pilot light** | **Minutos** (dados) / **dezenas de minutos** (RTO) | Dados replicados + infra **desligada** | Baixo |
| **Warm standby** | **Segundos** / **minutos** | Cópia **funcional, reduzida, ligada** | Médio |
| **Multi-site active/active** | **Zero ou quase** | Cópia **completa atendendo tráfego** | **Maior** |

As definições da AWS:

> **Backup and restore** — *"Backup and restore is a suitable approach for mitigating against data loss or corruption."* (backup e restore é uma abordagem adequada para mitigar perda ou corrupção de dados)

> **Pilot light** — *"With the pilot light approach, you replicate your data from one Region to another and provision a copy of your core workload infrastructure. Resources required to support data replication and backup, such as databases and object storage, are always on. Other elements, such as application servers, are loaded with application code and configurations, but are switched off and are only used during testing or when disaster recovery failover is invoked."*

> **Warm standby** — *"The warm standby approach involves ensuring that there is a scaled down, but fully functional, copy of your production environment in another Region."*

> **Multi-site active/active** — *"...you can run your workload simultaneously in multiple Regions... this is the most complex and costly approach to disaster recovery."*

## A regra de ouro da prova

**RPO e RTO menores ⇒ mais infraestrutura ligada ⇒ mais caro.** A questão quase sempre pede a estratégia **mais barata que ainda atende** os números do enunciado.

## Links

- [[9 - Fundamentos e apoio/Disaster Recovery (RPO e RTO)/2 - Decorar|2 - Decorar]] · [[9 - Fundamentos e apoio/Disaster Recovery (RPO e RTO)/3 - Detalhes|3 - Detalhes]] · [[9 - Fundamentos e apoio/Disaster Recovery (RPO e RTO)/4 - Questoes|4 - Questoes]]
- [[9 - Fundamentos e apoio/Regioes, AZs e infraestrutura global/1 - O que e|Regioes, AZs e infraestrutura global]] · [[1 - Seguranca (30%)/AWS Backup/1 - O que e|AWS Backup]] · [[2 - Resiliencia (26%)/Route 53/1 - O que e|Route 53]] · [[2 - Resiliencia (26%)/Aurora/1 - O que e|Aurora]] · [[3 - Performance (24%)/S3/1 - O que e|S3]] · [[9 - Fundamentos e apoio/Well-Architected Framework/1 - O que e|Well-Architected Framework]]
- [[9 - Fundamentos e apoio/Estrategias de migracao (7 Rs)/1 - O que e|Estrategias de migracao (7 Rs)]]
