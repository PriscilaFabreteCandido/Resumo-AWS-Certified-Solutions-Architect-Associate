---
tags: [saa-c03, dominio-4, spot, reserved-instances, savings-plans, custo]
dominio: 4
tasks: [4.2]
atualizado: 2026-11-08
---

# Custo de computação — Spot, Reserved Instances e Savings Plans

## 🧩 Em 30 segundos

| Perfil da carga | Opção |
|---|---|
| Estável, 24/7, não quer se amarrar a configuração | **Compute Savings Plans** (até 66%) |
| Estável, 24/7, numa família e região definidas | **EC2 Instance Savings Plans** (até 72%) |
| Estável + **precisa reservar capacidade** numa AZ | **Reserved Instance zonal** ou **Capacity Reservation** |
| Tolerante a interrupção (batch, CI, render, analytics) | **Spot** (aviso de **2 minutos**) |
| Licença **per-socket / per-core** própria | **Dedicated Hosts** |
| Hardware single-tenant por compliance, cobrado por hora | **Dedicated Instances** |
| Imprevisível, curta, orientada a evento | **Lambda / Fargate** |
| Usado só em horário comercial | **Parar fora do horário** (scheduled scaling) |

## 🧠 Teste-se primeiro

> [!question]- Os quatro tipos de Savings Plans e seus descontos
> *"AWS offers four types of Savings Plans: Compute Savings Plans, Database Savings Plans, EC2 Instance Savings Plans, and SageMaker AI Savings Plans."*
> **Compute**: até **66%**. Cobre EC2 + **Fargate** + **Lambda**, *"regardless of instance family, instance size, OS, tenancy, or AWS Region"*.
> **EC2 Instance**: até **72%**. Amarrado a *"a specific instance family in a chosen AWS Region"*, flexível em tamanho, SO e tenancy.
> **Database**: até **35%**. Cobre Aurora, RDS, DynamoDB, ElastiCache, DocumentDB, Timestream, Neptune, Keyspaces, DMS e OpenSearch Service, *"regardless of engine, instance family, size, Availability Zone (AZ), or Region"*.
> **SageMaker AI**: até **64%**.
> Termos: **1 ou 3 anos**. Pagamento: **All upfront, Partial upfront, No upfront**. ⚠️ *"The terms of the commitment can't be changed after purchase."*

> [!question]- Reserved Instances: Standard × Convertible, e o que é desconto × capacidade
> **Standard**: *"provide the most significant discount, but can only be modified. Standard Reserved Instances can't be exchanged."*
> **Convertible**: *"provide a lower discount... but can be exchanged for another Convertible Reserved Instance with different instance attributes."*
> RI *"are not physical instances, but rather a billing discount applied to the use of On-Demand Instances"*. Atributos que definem o preço: **instance type, Region, tenancy, platform**. 1 ano = 365 dias; 3 anos = 1.095 dias. **Não renovam** automaticamente e **não podem ser canceladas**.
> ⚠️ Só a RI **zonal** reserva capacidade. A **regional** é só desconto. Para garantir capacidade sem compromisso de 1 ano, use **On-Demand Capacity Reservation**.
> E a própria AWS: *"We recommend Savings Plans over Reserved Instances."*

> [!question]- Spot: o que a doc garante e o que não garante
> **Garante**: *"two-minute Spot Instance interruption notice"*, mais um sinal antecipado — *"an instance rebalance recommendation signal to notify you that a Spot Instance is at an elevated risk of interruption"*.
> **Não garante**: que a instância continue rodando. A EC2 *"terminates, stops, or hibernates your Spot Instance when Amazon EC2 needs the capacity back"*.
> Requisição **one-time** ou **persistent** (*"automatically resubmits a persistent Spot Instance request after the Spot Instance... is interrupted"*).
> ⚠️ *"Spot Instances are not covered by Savings Plans."*
> Casos de uso que a doc cita: *"data analysis, batch jobs, background processing, and optional tasks."*

> [!question]- Estratégias de alocação do EC2 Fleet / Spot Fleet
> **price capacity optimized** — **recomendada**: pools com maior disponibilidade de capacidade, e entre esses, o mais barato.
> **capacity optimized** — pools *"most likely to have the lowest chance of interruption"*. Variante **capacity optimized prioritized** respeita a sua ordem de preferência em *best-effort*.
> **diversified** — espalha por todos os pools.
> **lowest price** — marcada **"(not recommended)"**: *"has the highest risk of interruption"*. É o default da CLI, o que faz dela distrator comum.
>
> **Capacity Rebalancing**: lança substituto **antes** da interrupção. `launch-before-terminate` (com `termination-delay` de **120 s a 7.200 s**) ou `launch`. Só em fleet do tipo **maintain**, e **não pode ser alterado** depois de criado.

## Dedicated Hosts × Dedicated Instances

| | **Dedicated Hosts** | **Dedicated Instances** |
|---|---|---|
| O que você paga | *"a physical host that is fully dedicated to running your instances"* | *"by the hour, for instances that run on single-tenant hardware"* |
| Licença BYO | **Sim** — *"bring your existing per-socket, per-core, or per-VM software licenses"* | Não é o caso de uso |
| Visibilidade do hardware | Você vê sockets e cores, e controla o placement | Não |
| Placement group | **Não pode** lançar em placement group | **Pode**, com limites (partition: máx. 2; spread: não suportado) |
| Integra com | **AWS License Manager** | — |

**Gatilho de prova**: a palavra **licença por socket/core** → **Dedicated Hosts**. Só "hardware isolado por compliance" → **Dedicated Instances**.

## Outras alavancas

| Alavanca | Detalhe |
|---|---|
| **Graviton** (`m7g`, `c7g`, `r7g`) | Melhor relação preço/performance; exige validar a aplicação em ARM |
| **Hibernação do EC2** | O guia cita *"EC2 hibernation"* em 4.2. Preserva a RAM em disco e retoma rápido — reduz custo em carga intermitente que não tolera boot longo. Você continua pagando o **EBS** |
| **Compute Optimizer** | *"analyzes your AWS resources' configuration and utilization metrics to provide you with rightsizing recommendations and identify idle resources"*. Janela de **14 dias** (93 com enhanced metrics) |
| **Fargate × EC2** | Fargate elimina capacidade ociosa do cluster; EC2 com RI/SP pode sair mais barato em carga constante e densa |
| **Lambda** | Pagar só por invocação; **reserved concurrency não custa nada**, **provisioned concurrency custa** |
| **Outposts** | Opção **híbrida** citada no guia; para requisito de latência local ou residência de dado |
| **Capacity Blocks for ML** | Reserva de cluster de GPU por período |

## ❓ Questões de prova

> [!example]- Q1 — Uma carga de produção roda 24/7 em instâncias m6i, e o time ainda não decidiu se vai migrar para Graviton nem para outra região. Qual compra?
> **A)** Reserved Instances Standard de 3 anos
> **B)** **Compute Savings Plans** ✅
> **C)** EC2 Instance Savings Plans
> **D)** Spot com capacity rebalancing
>
> **Por que B**: Compute SP se aplica *"regardless of instance family, instance size, OS, tenancy, or AWS Region"* — e cobre Fargate e Lambda se a arquitetura mudar. É a opção que sobrevive à indecisão.
> **A errada**: Standard RI *"can't be exchanged"* e amarra tipo e região por 3 anos.
> **C errada**: amarra **família e região**, justamente o que está em aberto.
> **D errada**: produção 24/7 não tolera interrupção.

> [!example]- Q2 — Um pipeline de renderização processa milhares de frames independentes, pode reiniciar um frame perdido, e o custo é a prioridade. Qual configuração?
> **A)** On-Demand com Auto Scaling
> **B)** **Spot via EC2 Fleet com estratégia price capacity optimized e capacity rebalancing** ✅
> **C)** Reserved Instances de 1 ano
> **D)** Spot Fleet com estratégia lowest price
>
> **Por que B**: trabalho idempotente e reiniciável é o caso de uso exato do Spot; *price capacity optimized* é a estratégia **recomendada** (capacidade disponível primeiro, menor preço depois) e o capacity rebalancing lança substituto antes da interrupção.
> **A errada**: paga o preço cheio sem necessidade.
> **C errada**: compromisso de 1 ano para carga variável de batch.
> **D errada**: `lowest-price` está marcada *"(not recommended)"* e *"has the highest risk of interruption"* — distrator clássico, porque é o default da CLI.

> [!example]- Q3 — Uma aplicação legada é licenciada **por socket físico**. Como rodar na AWS atendendo o licenciamento?
> **A)** Dedicated Instances
> **B)** **Dedicated Hosts, integrados ao AWS License Manager** ✅
> **C)** Reserved Instances com tenancy dedicada
> **D)** EC2 em placement group cluster
>
> **Por que B**: só Dedicated Hosts expõe sockets e cores e permite *"bring your existing per-socket, per-core, or per-VM software licenses"*.
> **A errada**: dá hardware single-tenant, mas **sem** visibilidade de socket para o licenciamento.
> **C errada**: tenancy dedicada é Dedicated Instance com desconto de RI; mesmo problema.
> **D errada**: placement group é topologia de rede, nada a ver — e Dedicated Hosts nem pode entrar em placement group.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Savings Plans tem 3 tipos | **Quatro** (Compute, Database, EC2 Instance, SageMaker AI) |
| Compute SP dá o maior desconto | **EC2 Instance SP** chega a 72%; Compute vai a 66%, mas é mais flexível |
| Savings Plans cobre Spot | *"Spot Instances are not covered by Savings Plans"* |
| RI reserva capacidade | Só a **zonal**. A regional é desconto |
| RI pode ser cancelada | **Não.** Standard: modificar ou vender. Convertible: trocar |
| Convertible dá mais desconto | Dá **menos**, em troca de flexibilidade |
| Spot avisa 5 minutos antes | **2 minutos** |
| `lowest-price` é a melhor estratégia de Spot | Marcada **"(not recommended)"** |
| Dedicated Host = Dedicated Instance | Host = licença por socket/core e controle do hardware |
| Hibernação é grátis | Você continua pagando o **EBS** |
| Compute Optimizer aplica a mudança | Só **recomenda** |
| Reserved concurrency do Lambda custa | *"incurs no additional charges"*. Provisioned é que custa |

## Links

- [[04 - Dominio 4 - Design Cost-Optimized Architectures (20%)]]
- [[Computacao elastica - EC2 e placement groups]]
- [[Containers e serverless - ECS, EKS, Fargate, Lambda e Step Functions]]
- [[Ferramentas de custo - Cost Explorer, Budgets e CUR]]
- [Opções de compra do EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-purchasing-options.html)
- [O que são Savings Plans](https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html)
