---
tags: [saa-c03, regioes, az, detalhes]
conceito: Regiões, Zonas de Disponibilidade e infraestrutura global
atualizado: 2026-11-08
---

# Regiões e AZs — Detalhes

## 1. Região

Uma área geográfica com **múltiplas AZs isoladas e fisicamente separadas**. Propriedades que importam na prova:

- **Isolamento**: Regiões são independentes. Um problema em `us-east-1` não derruba `sa-east-1`.
- **Nada atravessa sozinho**: recursos não se replicam entre Regiões **a menos que você configure** (S3 CRR, DynamoDB Global Tables, Aurora Global Database, AMI copy, snapshot copy).
- **Preço varia** por Região.
- **Serviços variam**: um serviço novo não chega em todas ao mesmo tempo.
- **Regiões opt-in**: algumas precisam ser habilitadas na conta.

Como escolher (o que a prova cobra):

| Critério | Peso |
|---|---|
| **Conformidade / residência de dados** | **Decisivo** — se a lei exige, acaba a discussão |
| **Latência** para os usuários | Alto |
| **Preço** | Médio |
| **Disponibilidade do serviço** | Médio |
| **Sustentabilidade** | O pilar tem área de **Region selection** |

> [!important] `us-east-1` é especial
> Vários recursos **globais** só existem ou só se gerenciam lá: certificados do **ACM para CloudFront**, **WAF para CloudFront** (escopo CLOUDFRONT), métricas de faturamento no CloudWatch, zonas do Route 53. É pegadinha clássica: *"o certificado não aparece no CloudFront"* → foi emitido na Região errada.

## 2. Zona de Disponibilidade

> *"one or more discrete data centers with redundant power, networking, and connectivity in an AWS Region"*

E a geografia:

> *"AZs are physically separated by a meaningful distance, many kilometers, from any other AZ, although all are within 100 km (60 miles) of each other."* (as AZs são separadas fisicamente por uma distância significativa, de muitos quilômetros, de qualquer outra AZ — embora todas fiquem a até 100 km (60 milhas) umas das outras)

Três consequências diretas:

1. **Separadas o suficiente** para que enchente, incêndio ou queda de energia não atinja duas.
2. **Próximas o suficiente** (<100 km, metro fiber dedicada) para **replicação sincrônica** — é por isso que RDS Multi-AZ e Aurora conseguem ser sincrônicos sem destruir a performance.
3. **Tráfego entre AZs é criptografado** pela AWS — bom argumento de prova, mas transferência entre AZs **é cobrada**.

**Mapeamento de nomes**: `us-east-1a` na sua conta pode ser um data center físico diferente de `us-east-1a` na minha — a AWS randomiza para balancear. Para coordenar entre contas use o **AZ ID** (`use1-az1`), que é consistente.

## 3. Escopo de recurso — a origem de metade das pegadinhas

```
GLOBAL      IAM · Route 53 · CloudFront · Organizations · Global Accelerator · WAF(CF)
   │
REGIONAL    VPC · S3 · DynamoDB · SG · NACL · AMI · snapshot · ELB · ASG · SQS/SNS · KMS · Lambda
   │
ZONAL       Subnet · EC2 · EBS · instância RDS · NAT Gateway
```

Casos que a prova explora:

| Situação | O que acontece |
|---|---|
| Anexar EBS a instância em outra AZ | **Não dá**. Snapshot → volume na AZ destino |
| AMI em outra Região | **Copiar** a AMI |
| Subnet "multi-AZ" | **Não existe**. Uma subnet = uma AZ |
| ELB atende várias AZs | Sim, se você **habilitar as AZs** nele |
| NAT Gateway cobre a VPC | **Não** — é zonal. Um **por AZ**, senão a queda da AZ dele corta a saída das outras |
| EFS entre AZs | Sim (regional), com **mount target em cada AZ** |
| Certificado ACM no CloudFront | Precisa estar em **us-east-1** |

## 4. Infraestrutura fora das Regiões

**Edge Locations** — centenas de pontos de presença, em muito mais cidades que as Regiões. Servem **CloudFront** (cache), **Global Accelerator** (entrada na rede da AWS), **Route 53** (DNS) e **WAF/Shield** na borda. Reduzem latência sem replicar sua aplicação.

**Regional Edge Caches** — camada intermediária do CloudFront, maior que o edge, entre ele e a origem. Melhora o hit de conteúdo menos popular.

**Local Zones** — extensão da Região mais perto dos usuários, para **latência de milissegundo único**. Casos: games, streaming ao vivo, ML em tempo real, renderização. Oferecem um subconjunto de serviços (EC2, EBS, ELB, VPC).

**Wavelength Zones** — infraestrutura da AWS **dentro da rede 5G** das operadoras. Para o tráfego não sair da rede móvel.

**Outposts** — racks físicos da AWS **no seu data center**. Para residência de dados, latência com sistemas locais e migrações graduais. Ver [[3 - Performance (24%)/Outposts/1 - O que e|Outposts]].

## 5. Multi-AZ × Multi-Region — a decisão

| Enunciado diz | Resposta |
|---|---|
| *"se uma AZ falhar"* | **Multi-AZ** |
| *"se a Região ficar indisponível"* | **Multi-Region** |
| *"disaster recovery"* com RPO/RTO baixos | **Multi-Region** |
| *"usuários no mundo inteiro, menor latência de leitura"* | **CloudFront**, **réplica/global table** |
| *"dados não podem sair do país"* | **Uma Região** específica (ou Outposts) |
| *"alta disponibilidade"* sem citar Região | **Multi-AZ** (mais barato, atende) |

Serviços multi-Region que valem conhecer de nome:

| Serviço | Recurso |
|---|---|
| S3 | **Cross-Region Replication** |
| Aurora | **Global Database** |
| DynamoDB | **Global Tables** (multi-ativo) |
| RDS | **cross-Region read replica** |
| Route 53 | **failover**, **latency-based**, **geolocation** |
| KMS | **multi-Region keys** |
| AWS Backup | **cross-Region copy** |
| CloudFormation | **StackSets** |

## Links

- [[9 - Fundamentos e apoio/Regioes, AZs e infraestrutura global/1 - O que e|1 - O que e]] · [[9 - Fundamentos e apoio/Regioes, AZs e infraestrutura global/2 - Decorar|2 - Decorar]] · [[9 - Fundamentos e apoio/Regioes, AZs e infraestrutura global/4 - Questoes|4 - Questoes]]
- [[9 - Fundamentos e apoio/Disaster Recovery (RPO e RTO)/1 - O que e|Disaster Recovery (RPO e RTO)]] · [[1 - Seguranca (30%)/VPC/1 - O que e|VPC]] · [[3 - Performance (24%)/CloudFront/1 - O que e|CloudFront]] · [[2 - Resiliencia (26%)/Route 53/1 - O que e|Route 53]] · [[3 - Performance (24%)/Global Accelerator/1 - O que e|Global Accelerator]] · [[3 - Performance (24%)/Outposts/1 - O que e|Outposts]] · [[1 - Seguranca (30%)/NAT Gateway/1 - O que e|NAT Gateway]] · [[3 - Performance (24%)/EBS/1 - O que e|EBS]]
