---
tags: [saa-c03, migracao, 7rs, detalhes]
conceito: Estratégias de migração (7 Rs)
atualizado: 2026-11-08
---

# 7 Rs — Detalhes

## 1. Onde isso cai na prova

Não há um domínio "migração", mas o tema aparece em **Task 4.1** (*"Design cost-optimized storage solutions"* (projetar soluções de armazenamento otimizadas em custo)) e sobretudo nos enunciados que descrevem **uma empresa saindo do data center**. A pergunta real é: *"qual a abordagem que atende este requisito com o menor esforço?"*

E os 7 Rs são a resposta estruturada para isso.

## 2. Cada R, com o critério de escolha

### Retire
A aplicação **não é mais necessária**. Na prática, descobertas de inventário mostram que uma fatia considerável do portfólio não é usada. É a opção de **maior retorno** — custo zero, esforço zero.
Na AWS: **Application Discovery Service** mostra o que ninguém acessa; **Cost Explorer** e **Trusted Advisor** apontam recursos ociosos.

### Retain
**Fica onde está**, por um motivo concreto:
- Dependência de **hardware específico** (mainframe, appliance).
- **Licença** que não acompanha.
- **Latência** com um sistema local que não migra.
- A aplicação vai ser **aposentada** em breve — migrar seria desperdício.
- **Compliance** que exige o dado no local.

Na prova, *"não pode sair do data center"* combinado com *"mas queremos usar serviços AWS"* aponta para **Outposts**, **Direct Connect** ou **Storage Gateway** — conviver, não migrar.

### Rehost — *lift and shift*
Move **como está**, sem tocar no código. É o mais **rápido** e o que **menos** aproveita a nuvem (você leva para lá também os desperdícios).

Serviço: **AWS Application Migration Service (MGN)** — replicação em nível de bloco do servidor de origem, com cutover de poucos minutos.

Quando é a resposta: *"prazo curto"*, *"data center fecha em X meses"*, *"a equipe não tem como alterar a aplicação"*, *"sem mudanças no código"*.

### Relocate
Move a **infraestrutura em bloco**, sem mudar código, operação ou comprar hardware. O caso canônico é **VMware Cloud on AWS**: as VMs continuam VMs, as ferramentas continuam as mesmas.

Distinção com rehost: no **rehost** a VM se torna uma **instância EC2** (muda a plataforma de virtualização); no **relocate** o **hypervisor vai junto**.

### Repurchase — *drop and shop*
**Abandona** a aplicação e **compra outra**, normalmente **SaaS**. Clássico: CRM próprio → produto de mercado; servidor de e-mail → serviço gerenciado.

Quando é a resposta: *"deixar de manter"*, *"solução comercial equivalente"*, *"não queremos mais desenvolver isso"*.

### Replatform — *lift, tinker and shift*
Mantém a aplicação, **troca um componente por um serviço gerenciado**. É o **meio-termo mais rentável** e por isso a resposta mais frequente da prova.

Exemplos exatos:

| De | Para | Ganho |
|---|---|---|
| MySQL/PostgreSQL em EC2 | **RDS** / **Aurora** | Backup, patch, Multi-AZ gerenciados |
| Redis/Memcached em EC2 | **ElastiCache** | Idem |
| ActiveMQ/RabbitMQ em EC2 | **Amazon MQ** | Idem, **sem mudar o protocolo** |
| Kafka auto-gerenciado | **MSK** | Idem |
| Tomcat/Node em EC2 com script | **Elastic Beanstalk** / **ECS** / **EKS** | Deploy e escala gerenciados |
| Servidor SFTP em EC2 | **Transfer Family** | Sem servidor |
| Servidor de arquivos Windows | **FSx for Windows** | Sem servidor |

Quando é a resposta: *"sem reescrever a aplicação"* **junto com** *"reduzir a sobrecarga operacional"*.

> [!tip] A combinação que define o replatform
> *"minimal changes to the application"* (alterações mínimas na aplicação) + *"reduce operational overhead"* = **replatform**.
> Se dissesse *"no changes at all"* (nenhuma alteração) e *"as fast as possible"* (o mais rápido possível) → **rehost**. Se dissesse *"take full advantage of cloud-native"* (aproveitar ao máximo os recursos nativos de nuvem) → **refactor**.

### Refactor / Re-architect
**Reescreve** a arquitetura. Monólito → microsserviços; servidor → **Lambda + API Gateway**; banco relacional forçado → **DynamoDB**; batch em cron → **Step Functions** + **EventBridge**.

É o mais caro e demorado, e o único que entrega **escala elástica real**, custo por uso e as vantagens plenas dos pilares. É a resposta quando o enunciado diz *"aproveitar ao máximo os recursos nativos"*, *"escalar para zero"*, *"adicionar funcionalidades que a arquitetura atual não permite"*.

## 3. A ordem de esforço — e como a prova a usa

```
Retire ─ Retain        (não migram)
   │
Rehost                 copia a VM                       ← mais rápido
   │
Relocate               move o hypervisor
   │
Repurchase             troca por SaaS
   │
Replatform             troca componentes por gerenciados ← melhor custo/benefício
   │
Refactor               reescreve                         ← mais caro e demorado
```

A questão típica dá **um requisito restritivo** e espera que você pare no primeiro R que o satisfaz:

| Restrição citada | Primeiro R que atende |
|---|---|
| *"o data center fecha em 3 meses"* | **Rehost** |
| *"sem alterar o código, mas sem administrar o banco"* | **Replatform** |
| *"queremos escalar para zero fora do horário comercial"* | **Refactor** (serverless) |
| *"não queremos mais manter este software"* | **Repurchase** |

## 4. Os serviços, em detalhe

### Servidores
**AWS Application Migration Service (MGN)** — replicação contínua em nível de bloco; a origem continua rodando até o cutover. É o serviço oficial de **rehost** (sucedeu o Server Migration Service).

### Bancos de dados — a distinção DMS × SCT

| Ferramenta | Migra |
|---|---|
| **DMS** | **Os dados** |
| **SCT** (Schema Conversion Tool) | **O schema e o código** (procedures, views, funções) entre engines **diferentes** |

| Migração | Ferramentas |
|---|---|
| **Homogênea** (Oracle → Oracle, MySQL → RDS MySQL) | **DMS** sozinho |
| **Heterogênea** (Oracle → Aurora PostgreSQL, SQL Server → MySQL) | **SCT** (converte o schema) **+ DMS** (move os dados) |

**CDC (Change Data Capture)** é o recurso do DMS que mantém a origem e o destino sincronizados **durante** a migração — é a resposta para *"downtime mínimo"*.

### Dados em arquivo
| Volume / situação | Serviço |
|---|---|
| Pela rede, agendado ou contínuo, para S3/EFS/FSx | **DataSync** |
| Acesso **contínuo** por NFS/SMB/iSCSI mantendo o dado na AWS | **Storage Gateway** |
| **Petabytes** sem banda suficiente | **Snow Family** |
| Fluxo de arquivos de **parceiros externos** | **Transfer Family** |

> [!warning] Snowball tem data de validade
> O **AWS Snowball Edge** não está mais disponível para novos clientes e o **suporte termina em 31/12/2026**. A AWS orienta usar **DataSync**, **AWS Data Transfer Terminal** ou **Outposts**. Para a prova, conheça o conceito (transferência offline quando a rede é insuficiente) — mas saiba que o serviço está em descontinuação.

### Governança da migração
| Serviço | Papel |
|---|---|
| **Application Discovery Service** | Inventariar e dimensionar o on-premises |
| **Migration Evaluator** | Estimar o custo na AWS |
| **Migration Hub** | **Painel único** do andamento de todas as migrações |
| **Control Tower** | Montar a **landing zone** multi-conta |

## 5. A conta de "pela rede ou pelo caminhão"

A pergunta que decide entre **DataSync** e **Snow Family**:

```
Tempo pela rede (dias) ≈ Volume / Banda disponível

10 TB a 100 Mbps  ≈  10 dias     → ainda viável pela rede
100 TB a 100 Mbps ≈  100 dias    → Snow Family
500 TB a 1 Gbps   ≈  ~46 dias    → Snow Family
```

O enunciado sempre dá **volume + banda + prazo**. Se o tempo pela rede excede o prazo, a resposta é **offline**.

## Links

- [[9 - Fundamentos e apoio/Estrategias de migracao (7 Rs)/1 - O que e|1 - O que e]] · [[9 - Fundamentos e apoio/Estrategias de migracao (7 Rs)/2 - Decorar|2 - Decorar]] · [[9 - Fundamentos e apoio/Estrategias de migracao (7 Rs)/4 - Questoes|4 - Questoes]]
- [[4 - Custo (20%)/DMS (Database Migration Service)/1 - O que e|DMS (Database Migration Service)]] · [[4 - Custo (20%)/Snow Family/1 - O que e|Snow Family]] · [[3 - Performance (24%)/DataSync/1 - O que e|DataSync]] · [[3 - Performance (24%)/Storage Gateway/1 - O que e|Storage Gateway]] · [[3 - Performance (24%)/Transfer Family/1 - O que e|Transfer Family]] · [[9 - Fundamentos e apoio/Disaster Recovery (RPO e RTO)/1 - O que e|Disaster Recovery (RPO e RTO)]] · [[3 - Performance (24%)/Outposts/1 - O que e|Outposts]] · [[3 - Performance (24%)/Direct Connect/1 - O que e|Direct Connect]]
