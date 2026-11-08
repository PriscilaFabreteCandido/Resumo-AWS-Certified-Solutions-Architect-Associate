---
tags: [saa-c03, dominio-3, ec2, placement-group, escalabilidade]
dominio: 3
tasks: [3.2]
atualizado: 2026-11-08
---

# Computação elástica — EC2, famílias e placement groups

## 🧩 Em 30 segundos

- **Horizontal (scale out) é a resposta padrão.** Vertical só quando não paralela.
- Famílias: **T** (burstable) · **M** (geral) · **C** (compute) · **R / X / z** (memória) · **I / D** (storage) · **P / G / Inf / Trn** (GPU e aceleradores) · **HPC**.
- **Placement groups**: **cluster** (baixa latência, 1 AZ) · **spread** (hardware distinto, **7 por AZ**) · **partition** (**7 partições por AZ**) · **precision time**.
- **Instance store** é NVMe local e **efêmero**; **EBS** persiste.
- **Enhanced networking / ENA / EFA** para throughput e HPC.

## 🧠 Teste-se primeiro

> [!question]- As três estratégias clássicas de placement group e seus limites
> **Cluster** — *"Packs instances close together inside an Availability Zone"*. **Uma AZ só.** Fluxo único de **10 Gbps** dentro do grupo (5 Gbps fora, e também 5 Gbps para internet/Direct Connect). Para HPC e tráfego node-to-node intenso. Não disponível para T2, Mac1 nem M7i-flex.
> **Spread** — *"a group of instances that are each placed on distinct hardware"*. Multi-AZ, mas **máximo 7 instâncias por AZ** (3 AZs = 21). Para reduzir falha correlacionada em poucas instâncias críticas. **Não** suportado em Dedicated Instances.
> **Partition** — *"Spreads your instances across logical partitions"*, cada partição com racks próprios. Multi-AZ, **máximo 7 partições por AZ** (2 com Dedicated Instances). Para HDFS, HBase, Cassandra, Kafka, Hadoop.
> **Precision time** — acesso ao Amazon Time Sync aprimorado, sem custo extra.
>
> Regras gerais: placement group é **opcional** e **gratuito**; uma instância pertence a **um** grupo; grupos **não** se fundem; **Dedicated Hosts não** podem lançar em placement group.

> [!question]- Por que uma instância T está "travando" sob carga constante?
> Família **T** é **burstable**: tem baseline de CPU e acumula/consome **créditos**. Carga constante acima do baseline esgota os créditos e a instância é limitada (ou cobra *unlimited*).
> Resposta de prova: migrar para **M** (geral) ou **C** (compute) quando a carga é sustentada. T serve para carga irregular e barata.

> [!question]- Instance store × EBS
> **Instance store**: disco NVMe/SSD **fisicamente anexado ao host**. IOPS máximo e latência mínima. **Perde os dados** em stop, hibernate ou falha do host. Não pode ser detachado nem snapshotado.
> **EBS**: volume de rede, **persistente**, snapshot, criptografia, redimensionável.
> Enunciado com "cache", "buffer", "scratch", "dados temporários de alta performance" → **instance store**. Qualquer coisa que precise sobreviver → **EBS**.

## Famílias de instância — o que o enunciado sugere

| Pista no enunciado | Família |
|---|---|
| "carga irregular, baixo custo, uso leve" | **T** (t3/t4g) — burstable |
| "aplicação web de uso geral", equilíbrio | **M** |
| "CPU intensivo", batch, encoding, HPC, servidor de jogos | **C** |
| "in-memory", cache, banco grande, SAP HANA, analítico em memória | **R**, **X**, **z** |
| "IOPS local altíssimo", NoSQL, data warehouse, armazenamento denso | **I**, **D** |
| "ML training/inference", renderização, CAD | **P**, **G**, **Inf**, **Trn** |
| "simulação HPC com MPI" | família **Hpc** + **EFA** + cluster placement group |
| "ARM, melhor custo-benefício" | **Graviton** (sufixo `g`: m7g, c7g, r7g) |

## Rede da instância

| Recurso | Para quê |
|---|---|
| **ENA** (Elastic Network Adapter) | Enhanced networking: alto PPS, baixa latência e jitter |
| **EFA** (Elastic Fabric Adapter) | HPC/ML com MPI e NCCL — bypass do kernel. Usa com **cluster placement group** |
| **Jumbo frames** | MTU 9001; mas tráfego para internet/Direct Connect fica em 1.500 |
| **Placement group cluster** | Até 10 Gbps de fluxo único dentro do grupo |

## Escala

- **EC2 Auto Scaling** para instâncias; **AWS Auto Scaling** para o plano unificado (ASG, DynamoDB, Aurora replicas, ECS service, Spot Fleet).
- Políticas e números: ver [[Alta disponibilidade - ELB, Auto Scaling e Route 53]].
- **AWS Batch**: fila de jobs com dependências, provisiona compute (inclusive **Spot**) e roda o job. Resposta para "milhares de jobs em lote".
- **EMR**: Hadoop/Spark/Hive/Presto/HBase gerenciado — ver [[Ingestao e transformacao - Kinesis, Glue, Athena e EMR]].

## ❓ Questões de prova

> [!example]- Q1 — Uma simulação HPC com MPI precisa da menor latência possível entre 40 nós. Qual configuração?
> **A)** Spread placement group em 3 AZs
> **B)** **Cluster placement group numa única AZ, com instâncias do mesmo tipo e EFA** ✅
> **C)** Partition placement group
> **D)** Instâncias em AZs diferentes atrás de um NLB
>
> **Por que B**: cluster *"packs instances close together inside an Availability Zone"*, com 10 Gbps de fluxo único dentro do grupo; EFA é o adaptador para MPI.
> **A errada**: spread **distribui** em hardware distinto — o oposto do requisito — e limita a 7 por AZ (21 no total), insuficiente para 40 nós numa configuração desejada.
> **C errada**: partition separa em racks; serve para dado distribuído tolerante a falha, não para latência mínima.
> **D errada**: tráfego entre AZs adiciona latência; NLB não tem papel em comunicação node-to-node MPI.

> [!example]- Q2 — Um cluster Cassandra de 12 nós precisa que a falha de um rack não derrube mais que uma fração dos nós. Qual placement group?
> **A)** Cluster
> **B)** Spread
> **C)** **Partition** ✅
> **D)** Nenhum; basta distribuir em 3 AZs
>
> **Por que C**: partition é a estratégia desenhada para *"HDFS, HBase, Cassandra, Kafka, Hadoop"* — cada partição tem seu próprio conjunto de racks, então a falha de um rack atinge só uma partição.
> **A errada**: cluster concentra tudo no mesmo bloco de hardware — aumenta a falha correlacionada.
> **B errada**: spread garante hardware distinto por instância, mas o teto de **7 por AZ** e a falta de noção de "grupo de réplicas" não casam com o modelo de rack do Cassandra.
> **D errada**: ajuda, mas sem noção de rack dentro da AZ e sem o alinhamento com a topologia do Cassandra.

> [!example]- Q3 — Uma aplicação de processamento de vídeo precisa de disco local de altíssimo IOPS para arquivos temporários durante a conversão. Qual armazenamento?
> **A)** EBS io2 Block Express
> **B)** **Instance store NVMe** ✅
> **C)** EFS com throughput Provisioned
> **D)** EBS gp3 com 16.000 IOPS
>
> **Por que B**: dado **temporário** com IOPS máximo é o caso de uso do instance store — disco anexado ao host, sem latência de rede, e sem custo adicional de volume.
> **A errada**: entrega IOPS alto, mas é volume de rede pago; desnecessário para scratch.
> **C errada**: EFS é compartilhado via rede; latência maior que disco local.
> **D errada**: menos IOPS e custo de volume para dado que será descartado.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Cluster placement group é multi-AZ | **Uma AZ só** |
| Spread aceita quantas instâncias eu quiser | **7 por AZ** |
| Partition não tem limite de partições | **7 por AZ** (2 com Dedicated Instances) |
| Placement group é cobrado | *"There is no charge for creating a placement group"* |
| Dedicated Host pode entrar em placement group | **Não pode** |
| Instance store é "EBS mais rápido" | É **efêmero**: perde no stop/hibernate/falha do host |
| Família T serve para carga constante | Esgota créditos. Use **M** ou **C** |
| Escala vertical é a resposta de performance | A prova premia **horizontal** |
| Qualquer instância atinge o IOPS provisionado do EBS | Instâncias **não-Nitro** chegam a 32.000 IOPS |

## Links

- [[03 - Dominio 3 - Design High-Performing Architectures (24%)]]
- [[Alta disponibilidade - ELB, Auto Scaling e Route 53]]
- [[Custo de computacao - Spot, RI e Savings Plans]]
- [Placement groups](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-groups.html)
