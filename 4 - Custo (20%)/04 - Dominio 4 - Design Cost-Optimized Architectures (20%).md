---
tags: [moc, saa-c03, dominio-4, custo]
dominio: 4
peso: 20%
atualizado: 2026-11-08
---

# 💰 Domínio 4 — Design Cost-Optimized Architectures (20%)

> [!info] 20% do conteúdo pontuado
> Cerca de **10 das 50 questões**. Quatro task statements, um por eixo: **storage, compute, banco e rede**.
> Boa notícia: este domínio **reaproveita** tudo que você já estudou. Classes do S3, tipos de EBS, opções de compra de EC2, read replica, NAT gateway — você só muda a lente.

## 🧩 Em 30 segundos — as cinco alavancas de custo

| Alavanca | Onde aplicar |
|---|---|
| **Pagar menos pela mesma capacidade** | Savings Plans, Reserved Instances, Spot, Graviton |
| **Usar menos capacidade** | Rightsizing (Compute Optimizer), auto scaling, serverless, hibernação |
| **Pagar pelo armazenamento certo** | Classe do S3, lifecycle, tipo de EBS, tiering do EFS |
| **Não pagar transferência desnecessária** | Gateway endpoint, CloudFront, NAT por AZ, evitar cross-AZ e cross-Region |
| **Enxergar e governar** | Cost Explorer, Budgets, CUR, cost allocation tags, Organizations |

> [!important] Os quatro task statements repetem três itens idênticos
> *AWS cost management service features (for example, cost allocation tags, multi-account billing)* e *AWS cost management tools with appropriate use cases (for example, AWS Cost Explorer, AWS Budgets, AWS Cost and Usage Report)* aparecem em **4.1, 4.2, 4.3 e 4.4**.
> Tradução: **as ferramentas de custo são garantia de questão**. Veja [[Ferramentas de custo - Cost Explorer, Budgets e CUR]].

---

## Task 4.1 — Design cost-optimized storage solutions

> [!quote] Knowledge of (lista completa)
> - Access options (for example, an S3 bucket with Requester Pays object storage)
> - AWS cost management service features (cost allocation tags, multi-account billing)
> - AWS cost management tools (Cost Explorer, Budgets, Cost and Usage Report)
> - AWS storage services with appropriate use cases (Amazon FSx, Amazon EFS, Amazon S3, Amazon EBS)
> - Backup strategies
> - Block storage options (HDD volume types, SSD volume types)
> - Data lifecycles
> - Hybrid storage options (AWS DataSync, AWS Transfer Family, AWS Storage Gateway)
> - Storage access patterns
> - Storage tiering (for example, cold tiering for object storage)
> - Storage types with associated characteristics (object, file, block)

> [!quote] Skills in
> - Designing appropriate storage strategies (batch uploads to Amazon S3 compared with individual uploads)
> - Determining the correct storage size for a workload
> - Determining the lowest cost method of transferring data for a workload to AWS storage
> - Determining when storage auto scaling is required
> - Managing S3 object lifecycles
> - Selecting the appropriate backup and/or archival solution
> - Selecting the appropriate service for data migration to storage services
> - Selecting the appropriate storage tier
> - Selecting the correct data lifecycle for storage
> - Selecting the most cost-effective storage service for a workload

**Nota**: [[Custo de armazenamento - classes do S3 e lifecycle]]

## Task 4.2 — Design cost-optimized compute solutions

> [!quote] Knowledge of
> - AWS cost management service features e tools (os três de sempre)
> - AWS global infrastructure (Availability Zones, AWS Regions)
> - AWS purchasing options (for example, Spot Instances, Reserved Instances, Savings Plans)
> - Distributed compute strategies (for example, edge processing)
> - Hybrid compute options (for example, AWS Outposts)
> - Instance types, families, and sizes (memory optimized, compute optimized, virtualization)
> - Optimization of compute utilization (containers, serverless computing, microservices)
> - Scaling strategies (for example, auto scaling, hibernation)

> [!quote] Skills in
> - Determining an appropriate load balancing strategy (ALB [Layer 7] compared with NLB [Layer 4] compared with Gateway Load Balancer)
> - Determining appropriate scaling methods and strategies for elastic workloads (horizontal compared with vertical, EC2 hibernation)
> - Determining cost-effective AWS compute services (AWS Lambda, Amazon EC2, AWS Fargate)
> - Determining the required availability for different classes of workloads (production compared with non-production)
> - Selecting the appropriate instance family e size for a workload

**Nota**: [[Custo de computacao - Spot, RI e Savings Plans]]

## Task 4.3 — Design cost-optimized database solutions

> [!quote] Knowledge of
> - AWS cost management service features e tools
> - Caching strategies
> - Data retention policies
> - Database capacity planning (for example, capacity units)
> - Database connections and proxies
> - Database engines with appropriate use cases (heterogeneous migrations, homogeneous migrations)
> - Database replication (for example, read replicas)
> - Database types and services (relational compared with non-relational, Amazon Aurora, Amazon DynamoDB)

> [!quote] Skills in
> - Designing appropriate backup and retention policies (for example, snapshot frequency)
> - Determining an appropriate database engine (MySQL compared with PostgreSQL)
> - Determining cost-effective AWS database services (DynamoDB compared with Amazon RDS, serverless)
> - Determining cost-effective AWS database types (time series format, columnar format)
> - Migrating database schemas and data to different locations and/or different database engines

**Nota**: [[Custo de banco de dados]]

## Task 4.4 — Design cost-optimized network architectures

> [!quote] Knowledge of
> - AWS cost management service features e tools
> - Load balancing concepts (for example, ALB)
> - NAT gateways (for example, NAT instance costs compared with NAT gateway costs)
> - Network connectivity (private lines, dedicated lines, VPNs)
> - Network routing, topology, and peering (AWS Transit Gateway, VPC peering)
> - Network services with appropriate use cases (for example, DNS)

> [!quote] Skills in
> - Configuring appropriate NAT gateway types (a single shared NAT gateway compared with NAT gateways for each Availability Zone)
> - Configuring appropriate network connections (Direct Connect compared with VPN compared with internet)
> - Configuring appropriate network routes to minimize network transfer costs (Region to Region, AZ to AZ, private to public, AWS Global Accelerator, VPC endpoints)
> - Determining strategic needs for CDNs and edge caching
> - Reviewing existing workloads for network optimizations
> - Selecting an appropriate throttling strategy
> - Selecting the appropriate bandwidth allocation for a network device (a single VPN compared with multiple VPNs, Direct Connect speed)

**Nota**: [[Custo de rede e transferencia de dados]]

---

## 🧠 Teste-se primeiro

> [!question]- O que a prova quer dizer com "cost allocation tags"?
> Tags que, uma vez **ativadas** no console de billing, viram dimensões de relatório no Cost Explorer e no CUR. Sem tag ativada, você não consegue responder "quanto o time X gastou".
> O guia cita o par **cost allocation tags + multi-account billing** nos quatro task statements: a resposta para "atribuir custo por time/projeto/ambiente" é **tag** (dentro da conta) ou **conta separada** (entre times).

> [!question]- "Determining the required availability for different classes of workloads" — o que isso vira em questão?
> Vira: **não pague HA em ambiente que não precisa**. Dev e teste podem rodar Single-AZ, sem read replica, sem Multi-AZ, com Spot, e **desligados fora do horário comercial**.
> Alternativa errada clássica: "habilitar Multi-AZ em todos os bancos, inclusive dev".

> [!question]- Qual é o único jeito de pagar menos por EC2 sem mudar nada da arquitetura?
> **Compromisso**: Savings Plans ou Reserved Instances. **Spot** paga muito menos, mas exige tolerância a interrupção. **Graviton** exige recompilar/validar.
> Tabela rápida: carga estável 24/7 → **Savings Plans** · precisa reservar capacidade numa AZ → **RI zonal / Capacity Reservation** · tolerante a interrupção → **Spot** · licença própria por socket/core → **Dedicated Hosts**.

---

## ❓ Questões de prova

> [!example]- Q1 — Ambientes de desenvolvimento rodam 24/7 em instâncias m6i on-demand, mas são usados só de 8h às 19h em dias úteis. Qual a economia mais direta?
> **A)** Comprar Reserved Instances de 1 ano
> **B)** **Usar scheduled scaling / automação para parar as instâncias fora do horário de uso** ✅
> **C)** Migrar para Spot
> **D)** Reduzir o tamanho das instâncias
>
> **Por que B**: desligar 24/7 → ~55 h/semana corta mais de 65% do custo, sem compromisso e sem risco. É o "determining the required availability for different classes of workloads" aplicado.
> **A errada**: comprometer-se 24/7 com algo usado 1/3 do tempo **aumenta** o desperdício.
> **C errada**: Spot é opção legítima para dev, mas o ganho principal aqui é não pagar as horas ociosas; Spot sem desligar continua pagando 24/7.
> **D errada**: ajuda, mas não endereça o desperdício principal.

> [!example]- Q2 — Instâncias em subnet privada enviam 20 TB/mês para um bucket S3 na mesma região, passando pelo NAT gateway. Como reduzir custo?
> **A)** Trocar o NAT gateway por NAT instance
> **B)** **Criar um gateway endpoint para o S3 e rotear o tráfego por ele** ✅
> **C)** Mover as instâncias para subnet pública
> **D)** Habilitar S3 Transfer Acceleration
>
> **Por que B**: gateway endpoint não tem cobrança adicional e tira 20 TB/mês do processamento do NAT gateway. É a questão de custo mais recorrente da prova.
> **A errada**: NAT instance pode sair mais barato em volume baixo, mas você passa a gerenciar HA, patch e banda — e o tráfego para o S3 continua desnecessariamente no caminho.
> **C errada**: resolve o custo do NAT, mas expõe as instâncias.
> **D errada**: Transfer Acceleration **adiciona** custo e é para upload de longe.

> [!example]- Q3 — Uma empresa quer saber quanto cada um dos 12 times gasta, sem criar contas novas. O que configurar?
> **A)** Um CUR por time
> **B)** **Tags de alocação de custo padronizadas nos recursos, ativadas no console de billing, e relatórios por tag no Cost Explorer** ✅
> **C)** AWS Budgets por serviço
> **D)** Resource groups
>
> **Por que B**: é exatamente o mecanismo de *cost allocation tags*. A ativação no billing é o passo que a prova testa — sem ela, a tag não aparece nos relatórios.
> **A errada**: o CUR é um só, por conta de pagamento; ele **usa** as tags, não as substitui.
> **C errada**: Budgets alerta; não atribui custo.
> **D errada**: resource groups organizam; não produzem relatório de custo.

---

## ⚠️ Armadilhas do domínio 4

| Parece | É |
|---|---|
| "Menor custo" sempre é Spot | Só com **tolerância a interrupção** |
| Reserved Instance pode ser cancelada | **Não.** Standard pode ser modificada ou vendida no Marketplace; Convertible pode ser trocada |
| Savings Plans tem 3 tipos | **Quatro**: Compute, **Database**, EC2 Instance, SageMaker AI |
| Data transfer dentro da AWS é grátis | Cross-AZ e cross-Region são cobrados |
| Cost Explorer alerta | Quem alerta é o **Budgets** |
| CUR é para visualizar | É **dado bruto** num bucket S3, para Athena/Redshift/Quick |
| Compute Optimizer corrige | Só **recomenda** |
| Tag já aparece no relatório | Precisa ser **ativada** como cost allocation tag |
| One Zone-IA é sempre a escolha barata | É **1 AZ**. Só para dado reproduzível |
| Intelligent-Tiering é sempre mais barato | Cobra monitoramento por objeto |

## Links

- [[00 - START HERE (indice da prova)]]
- [[02 - Numeros para decorar]]
- [[05 - Plano de estudo (e como praticar sem levar susto na fatura)]]
- [Domínio 4 no guia oficial](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain4.html)
