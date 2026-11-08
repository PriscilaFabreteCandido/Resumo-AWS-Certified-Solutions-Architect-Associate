---
tags: [saa-c03, ec2, detalhes]
servico: Amazon EC2
atualizado: 2026-11-08
---

# Amazon EC2 — Detalhes

## 1. Escolhendo família e tamanho

A prova pede *"Selecting the appropriate compute options and features (for example, EC2 instance types) to meet business requirements"*. O raciocínio é sempre: **qual recurso é o gargalo?**

- Gargalo de **CPU** → família **C**
- Gargalo de **memória** → **R**, **X** ou **z**
- Gargalo de **I/O local** → **I** ou **D** (instance store NVMe)
- Gargalo de **GPU** → **P** (training) ou **G** (inference, gráficos)
- Nenhum gargalo claro, carga leve e irregular → **T**

### A armadilha da família T

A família T é **burstable**: tem um baseline de CPU e acumula **créditos** quando fica abaixo dele. Sob carga **constante** acima do baseline, os créditos esgotam e a instância é estrangulada (ou, em modo *unlimited*, passa a cobrar o excedente).

Sintoma de prova: "a aplicação fica lenta depois de alguns minutos de carga". Resposta: migrar para **M** ou **C**.

### Graviton

Instâncias com sufixo `g` (m7g, c7g, r7g) usam processadores **AWS Graviton** (ARM) e oferecem melhor relação preço/performance. O custo de adoção é **validar a aplicação em ARM** — por isso a prova costuma oferecer Graviton quando diz "aplicação containerizada" ou "linguagem interpretada", onde a migração é trivial.

## 2. Disco: instance store × EBS

**Instance store** é disco fisicamente anexado ao host. Entrega o IOPS mais alto possível e latência mínima, sem custo de volume separado. Mas é **efêmero**: perde os dados em **stop**, **hibernate** e falha do host. Não pode ser desanexado nem snapshotado.

**EBS** é volume de rede: persistente, com snapshot, criptografia e redimensionamento. Um volume vive em **uma AZ**; o **snapshot** é regional (e copiável entre regiões).

Gatilhos de prova:
- "cache", "buffer", "scratch", "dados temporários de alta performance" → **instance store**
- Qualquer coisa que precise sobreviver a um reboot ou a uma substituição de instância → **EBS**

> [!warning] Instâncias não-Nitro limitam IOPS
> A doc do EBS avisa: *"Other instance types can be attached to volumes provisioned with up to 64,000 IOPS, but can achieve up to 32,000 IOPS."* Provisionar io2 Block Express com 100.000 IOPS numa instância antiga não entrega o que você pagou.

## 3. Opções de compra, em detalhe

### Savings Plans (a AWS recomenda sobre RI)

A documentação é explícita: *"We recommend Savings Plans over Reserved Instances."*

São **quatro** tipos: *"Compute Savings Plans, Database Savings Plans, EC2 Instance Savings Plans, and SageMaker AI Savings Plans."*

- **Compute** (até **66%**): aplica-se *"regardless of instance family, instance size, OS, tenancy, or AWS Region"*, e cobre **Fargate e Lambda**. É a escolha quando a arquitetura pode mudar.
- **EC2 Instance** (até **72%**): compromisso com *"a specific instance family in a chosen AWS Region"*, flexível em tamanho, SO e tenancy dentro disso. Maior desconto, menor flexibilidade.

Termos: **1 ou 3 anos**. Pagamento: All upfront, Partial upfront, No upfront. *"The terms of the commitment can't be changed after purchase."*

### Reserved Instances

*"are not physical instances, but rather a billing discount applied to the use of On-Demand Instances in your account"*. O preço depende de **instance type, Region, tenancy e platform**.

- **Standard**: *"provide the most significant discount, but can only be modified. Standard Reserved Instances can't be exchanged."*
- **Convertible**: *"provide a lower discount... but can be exchanged for another Convertible Reserved Instance with different instance attributes."*

Não renovam automaticamente e **não podem ser canceladas**. A opção **No Upfront** exige *"a successful billing history"*.

**Zonal × regional**: só a RI **zonal** reserva capacidade. A regional é apenas desconto de billing. Para garantir capacidade sem compromisso longo, use **On-Demand Capacity Reservation**.

### Spot

*"available for less than the On-Demand price"*, com *"steep discounts"* — a doc não publica um percentual fixo.

A EC2 *"terminates, stops, or hibernates your Spot Instance when Amazon EC2 needs the capacity back"*, com **aviso de dois minutos**: *"gives the instance a two-minute warning before it is interrupted."* Antes disso pode vir o **rebalance recommendation**: *"an instance rebalance recommendation signal to notify you that a Spot Instance is at an elevated risk of interruption."*

A requisição é **one-time** ou **persistent** — *"Amazon EC2 automatically resubmits a persistent Spot Instance request after the Spot Instance associated with the request is interrupted."*

Casos de uso que a doc cita: *"data analysis, batch jobs, background processing, and optional tasks."*

⚠️ *"Spot Instances are not covered by Savings Plans."*

**Estratégias de alocação do EC2 Fleet / Spot Fleet**:
- **price capacity optimized** — **recomendada**: pools com maior capacidade disponível, e entre eles o mais barato
- **capacity optimized** — pools *"most likely to have the lowest chance of interruption in the near term"* (variante *prioritized* respeita sua ordem em best-effort)
- **diversified** — espalha por todos os pools
- **lowest price** — marcada *"(not recommended)"*: *"has the highest risk of interruption"*. É o **default da CLI**, por isso é distrator comum

**Capacity Rebalancing** lança o substituto **antes** da interrupção: `launch-before-terminate` (com `termination-delay` de **120 s a 7.200 s**) ou `launch`. Só em fleet tipo **maintain**, e **não pode ser alterado** depois de criado.

### Dedicated Hosts × Dedicated Instances

| | **Dedicated Hosts** | **Dedicated Instances** |
|---|---|---|
| Você paga | *"a physical host that is fully dedicated to running your instances"* | *"by the hour, for instances that run on single-tenant hardware"* |
| Licença própria | **Sim** — *"bring your existing per-socket, per-core, or per-VM software licenses"* | Não é o caso de uso |
| Vê sockets e cores | **Sim**, e controla o placement | Não |
| Placement group | **Não pode** | Pode (partition: máx. 2; spread: não suportado) |

**Gatilho**: a palavra **licença por socket/core** → **Dedicated Hosts**. Só "hardware isolado por compliance" → **Dedicated Instances**.

## 4. Placement groups

*"Placement groups are optional"* e *"There is no charge for creating a placement group."* Uma instância pertence a **um** grupo; grupos não se fundem; **Dedicated Hosts não podem lançar em placement group**.

**Cluster** — *"Packs instances close together inside an Availability Zone."* **Uma AZ só.** Fluxo único de **10 Gbps** dentro do grupo (5 Gbps fora, e 5 Gbps também para internet e Direct Connect). Recomendado usar o mesmo tipo de instância. Não disponível para T2, Mac1 e M7i-flex.

**Spread** — *"a group of instances that are each placed on distinct hardware."* Pode abranger várias AZs na mesma região, *"but it supports a maximum of seven running instances in each Availability Zone"* (3 AZs = 21). Não suportado em Dedicated Instances.

**Partition** — *"Spreads your instances across logical partitions"*, cada partição com racks próprios. *"A partition placement group can have a maximum of seven partitions per Availability Zone"* (2 com Dedicated Instances). Casos citados: HDFS, HBase, Cassandra, Kafka, Hadoop.

**Precision time** — acesso ao Amazon Time Sync aprimorado, sem custo extra.

## 5. Segurança e acesso

- **Nunca** coloque access key na instância. Use **IAM role** (instance profile) — a credencial é temporária e rotacionada.
- **Acesso administrativo**: use **SSM Session Manager**, que *"provides secure node management without the need to open inbound ports, maintain bastion hosts, or manage SSH keys"*.
- **IMDS** (`169.254.169.254`) entrega credenciais da role e metadados. **Não** é filtrado por security group nem NACL — use **IMDSv2** para mitigar SSRF.
- **Criptografia**: volumes EBS criptografados com KMS; você pode ativar criptografia por padrão na região.

## 6. Hibernação e economia

O guia cita *"EC2 hibernation"* em **Task 4.2**. A hibernação grava a RAM no volume EBS raiz e permite retomar o estado — útil para carga intermitente que tem boot longo. Você continua pagando o **EBS**.

Outras alavancas:
- **Parar fora do horário comercial** (scheduled scaling) — maior economia em dev/teste
- **Rightsizing** com **Compute Optimizer** (janela de **14 dias**, 93 com enhanced metrics)
- **Graviton**
- **Fargate/Lambda** quando a carga é intermitente

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[Auto Scaling (EC2)]] · [[Placement Groups]] · [[EBS]] · [[Opcoes de compra do EC2 (Spot, RI, Savings Plans)]] · [[Systems Manager (e Parameter Store)]]
- [Opções de compra](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-purchasing-options.html)
- [Placement groups](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-groups.html)
