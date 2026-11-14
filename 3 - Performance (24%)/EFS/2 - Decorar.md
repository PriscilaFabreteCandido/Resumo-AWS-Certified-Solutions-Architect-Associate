---
tags: [saa-c03, efs, decorar]
servico: Amazon EFS
atualizado: 2026-11-08
---

# EFS — Decorar

## Modos de throughput

| Modo | Quando usar (critério oficial) |
|---|---|
| **Elastic** (recomendado) | *"average-to-peak ratio of 5% or less"* — carga irregular, com picos |
| **Provisioned** | *"average-to-peak ratio of 5% or more"* — carga constante e previsível |
| **Bursting** | Throughput *"that scales with the amount of storage"* |

## Modos de performance

| Modo | Detalhe |
|---|---|
| **General Purpose** | **Padrão**, menor latência por operação. *"One Zone file systems always use the General Purpose performance mode"* |
| **Max I/O** | *"previous generation performance type"*; **não** suportado em One Zone nem com **Elastic** |

## Latência

| Classe | Primeiro byte |
|---|---|
| **EFS Standard** | **~1 ms** leitura / **~2,7 ms** escrita |
| **EFS IA** e **EFS Archive** | *"tens of milliseconds"* |

One Zone: ~1 ms leitura / **~1,6 ms** escrita.

## Performance (General Purpose)

| Config | IOPS leitura | IOPS escrita | Throughput/FS leitura | Por cliente |
|---|---|---|---|---|
| **Regional, Elastic** | 900.000–2.500.000 | 500.000 | **20–60 GiBps** | **1.500 MiBps** |
| **Regional, Provisioned** | 55.000 | 25.000 | 3–10 GiBps | 500 MiBps |
| **Regional, Bursting** | 35.000 | 7.000 | 3–5 GiBps | 500 MiBps |
| **One Zone** | 35.000 | 7.000 | 3 GiBps | 500 MiBps |

Elastic por padrão: *"90,000 read IOPS for infrequently accessed data, 250,000 read IOPS for frequently accessed data, and 50,000 write IOPS"* (ampliável 10×).
O limite de **1.500 MiBps** por cliente exige `amazon-efs-utils` v2.0+ ou o **EFS CSI driver**.

## Bursting — os números

| Item | Valor |
|---|---|
| Baseline | **50 MiBps por TiB** (50 KiBps por GiB) |
| Burst | até **100 MiBps por TiB**, com **mínimo de 100 MiBps** |
| Sem créditos | até **50 MiBps por TiB**, mínimo **1 MiBps** |
| Saldo máximo de crédito | **2,1 TiB por TiB** armazenado |

> [!warning] Bursting é ruim para FS pequeno com muito I/O
> O baseline é **por TiB armazenado**. Um FS de 10 GiB tem baseline minúsculo.

## Classes e lifecycle

**EFS Standard** → **EFS IA** → **EFS Archive**, com transição automática por lifecycle. IA e Archive têm latência de dezenas de ms e custo por GB muito menor.

## Cobrança e restrições

- Cada requisição NFS conta como *"4 kilobyte (KB) of throughput, or its actual request and response size, whichever is larger"*. **Não** há cobrança separada de IOPS.
- Leituras são medidas a **1/3** da taxa das escritas.
- Após mudar para **Provisioned** (ou alterar o valor), você fica **24 horas** sem poder voltar para Elastic/Bursting nem reduzir o valor.

## Links

- [[3 - Performance (24%)/EFS/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/EFS/3 - Detalhes|3 - Detalhes]] · [[3 - Performance (24%)/EFS/4 - Questoes|4 - Questoes]]
