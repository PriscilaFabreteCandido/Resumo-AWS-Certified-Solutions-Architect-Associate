---
tags: [moc, saa-c03, dominio-2, resiliencia]
dominio: 2
peso: 26%
atualizado: 2026-11-08
---

# 🛡️ Domínio 2 — Design Resilient Architectures (26%)

> [!info] Segundo maior peso
> **26% do conteúdo pontuado** — cerca de **13 das 50 questões** que valem nota. Dois task statements.
> Task 2.1 é sobre **desacoplar e escalar**. Task 2.2 é sobre **sobreviver a falha**.

## 🧩 Em 30 segundos — a espinha dorsal do domínio

| Pergunta da prova | Resposta estrutural |
|---|---|
| Como desacoplar dois componentes? | **Fila (SQS)** se é ponto a ponto · **tópico (SNS)** se é 1→N · **EventBridge** se o roteamento depende do conteúdo |
| Como escalar? | **Horizontal** (mais instâncias, via ASG) é a resposta quase sempre. Vertical só quando o enunciado diz que não pode paralelizar |
| Como sobreviver à perda de uma AZ? | Recursos em **≥ 2 AZs**, atrás de ELB, com ASG abrangendo as AZs |
| Como sobreviver à perda de uma região? | Depende do RPO/RTO: **backup & restore** → **pilot light** → **warm standby** → **multi-site active/active** |
| Como não ter ponto único de falha? | ELB em 2+ AZs · ASG multi-AZ · Multi-AZ no banco · NAT gateway por AZ · 2 conexões DX |
| Como orquestrar passos com retry? | **Step Functions** (Standard para não idempotente, Express para alto volume idempotente) |
| Como proteger um banco de excesso de conexões? | **RDS Proxy** |
| Como dar visibilidade ao workload? | **X-Ray** (citado literalmente no guia) |

---

## Task 2.1 — Design scalable and loosely coupled architectures

> [!quote] Knowledge of (guia oficial, lista completa)
> - API creation and management (for example, Amazon API Gateway, REST API)
> - AWS managed services with appropriate use cases (for example, AWS Transfer Family, Amazon SQS, AWS Secrets Manager)
> - Caching strategies
> - Design principles for microservices (for example, stateless workloads compared with stateful workloads)
> - Event-driven architectures
> - Horizontal scaling and vertical scaling
> - How to appropriately use edge accelerators (for example, content delivery network [CDN])
> - How to migrate applications into containers
> - Load balancing concepts (for example, Application Load Balancer [ALB])
> - Multi-tier architectures
> - Queuing and messaging concepts (for example, publish/subscribe)
> - Serverless technologies and patterns (for example, AWS Fargate, AWS Lambda)
> - Storage types with associated characteristics (for example, object, file, block)
> - The orchestration of containers (for example, Amazon ECS, Amazon EKS)
> - When to use read replicas
> - Workflow orchestration (for example, AWS Step Functions)


## Task 2.2 — Design highly available and/or fault-tolerant architectures

> [!quote] Knowledge of (lista completa)
> - AWS global infrastructure (for example, Availability Zones, AWS Regions, Amazon Route 53)
> - AWS managed services with appropriate use cases (for example, Amazon Comprehend, Amazon Polly)
> - Basic networking concepts (for example, route tables)
> - Disaster recovery (DR) strategies (for example, backup and restore, pilot light, warm standby, active-active failover, RPO, RTO)
> - Distributed design patterns
> - Failover strategies
> - Immutable infrastructure
> - Load balancing concepts (for example, ALB)
> - Proxy concepts (for example, Amazon RDS Proxy)
> - Service quotas and throttling
> - Storage options and characteristics (for example, durability, replication)
> - Workload visibility (for example, AWS X-Ray)


> [!tip] Duas pistas escondidas nessa lista
> **"AWS managed services with appropriate use cases (for example, Amazon Comprehend, Amazon Polly)"** — serviços de IA caem aqui, no domínio de **resiliência**, como "use o serviço gerenciado em vez de construir". Saiba a frase de uma linha de Comprehend (NLP, sentimento, entidades), Polly (texto → voz), Transcribe (voz → texto), Translate, Rekognition (imagem/vídeo), Textract (documento → texto estruturado), Lex (chatbot).
> **"Service quotas and throttling"** — a prova pergunta sobre **aumentar quota antes do evento** e sobre configurar quota no ambiente de **standby** (o guia diz literalmente: *"how to configure the service quotas for a workload in a standby environment"*). Isso é pegadinha de DR: o standby precisa ter quota suficiente **antes** do desastre.

---

## 🧠 Teste-se primeiro

> [!question]- Horizontal × vertical: qual a resposta padrão da prova?
> **Horizontal** (scale out). Adiciona instâncias, atende além do limite de uma máquina e tolera falha de instância.
> **Vertical** (scale up) só é a resposta quando o workload **não paralela** — tipicamente um banco relacional de escrita única (aí sim, instance class maior) ou software licenciado por nó.
> Para escalar horizontalmente, a aplicação precisa ser **stateless**: sessão no ElastiCache/DynamoDB, arquivo no S3/EFS, nada no disco local.

> [!question]- As quatro estratégias de DR, com RPO/RTO relativos
> | Estratégia | O que fica ligado | RPO/RTO | Custo |
> |---|---|---|---|
> | **Backup and restore** | Nada; só backup replicado | Horas | Mais baixo |
> | **Pilot light** | **Dados** replicados e infraestrutura núcleo provisionada; **servidores desligados** | Minutos a horas | Baixo |
> | **Warm standby** | Cópia **reduzida mas funcional**, sempre ligada | Minutos | Médio |
> | **Multi-site active/active** | Todas as regiões servindo tráfego | Quase zero | Mais alto |
>
> Citações: pilot light *"minimizes the ongoing cost of disaster recovery"* mas *"cannot process requests without additional action taken first"*. Warm standby *"can handle traffic (at reduced capacity levels) immediately"*. Active/active *"is the most complex and costly approach... but it can reduce your recovery time to near zero"*.

> [!question]- Qual a diferença entre "highly available" e "fault tolerant" para a prova?
> **HA**: o sistema **volta rápido** depois de uma falha (failover de Multi-AZ, substituição de instância pelo ASG). Existe uma janela de indisponibilidade.
> **Fault tolerant**: o sistema **continua servindo** durante a falha, sem janela. Exige redundância **ativa** (N+1 em cada AZ, ativo-ativo entre regiões).
> Quando o enunciado diz *"no interruption"* ou *"zero downtime"*, HA não basta.

> [!question]- Serviços regionais × zonais: quais são zonais?
> **Zonais** (vivem numa AZ): subnet, instância EC2, volume EBS, NAT gateway zonal, RDS DB instance (individual), nó de ElastiCache, FSx Single-AZ, EFS One Zone.
> **Regionais** (atravessam AZs por desenho): S3, DynamoDB, SQS, SNS, Lambda, ELB (quando você habilita 2+ AZs), Aurora cluster volume, snapshot EBS, EFS Regional.
> Isso responde "o que acontece se a AZ cair?" sem decorar caso por caso.

---

## ❓ Questões de prova

> [!example]- Q1 — Um processamento de pedidos perde requisições quando há pico de tráfego, porque o backend não acompanha. Qual mudança resolve com menor esforço?
> **A)** Aumentar o tipo de instância do backend
> **B)** **Colocar uma fila SQS entre o front-end e o backend, e escalar o backend por tamanho da fila** ✅
> **C)** Adicionar um ALB na frente do backend
> **D)** Habilitar cache no CloudFront
>
> **Por que B**: a fila **absorve o pico** (buffer) e desacopla produtor de consumidor; o ASG escala pela métrica de profundidade da fila. É o padrão canônico de "loosely coupled".
> **A errada**: escala vertical tem teto e continua perdendo requisição no pico seguinte.
> **C errada**: ALB distribui, mas não **armazena** requisição; se não há capacidade, as requisições falham igual.
> **D errada**: cache não ajuda em **escrita** de pedido.

> [!example]- Q2 — Uma aplicação precisa que **quatro** sistemas diferentes processem cada evento de "pedido criado", de forma independente e sem que um atrase o outro. Qual arquitetura?
> **A)** Uma fila SQS lida pelos quatro sistemas
> **B)** **Tópico SNS com quatro filas SQS inscritas (fan-out), cada sistema consumindo a sua fila** ✅
> **C)** Quatro chamadas HTTP síncronas a partir do produtor
> **D)** Kinesis Data Streams com um consumidor compartilhado
>
> **Por que B**: SQS entrega cada mensagem a **um** consumidor; para N processadores independentes, o padrão é **SNS → N SQS**. A fila intermediária dá durabilidade e retry por consumidor.
> **A errada**: os quatro competiriam pela mesma mensagem; cada evento seria processado uma vez só.
> **C errada**: acoplamento total — se um sistema cai, o produtor falha.
> **D errada**: Kinesis serve, mas com consumidor **compartilhado** os quatro dividem 2 MB/s por shard e se atrasam mutuamente (precisaria de enhanced fan-out). Para quatro aplicações de negócio desacopladas, SNS+SQS é mais simples.

> [!example]- Q3 — O RPO aceitável é de 15 minutos e o RTO de 1 hora, para uma aplicação web com RDS. Qual estratégia de DR entre regiões é a mais econômica que atende?
> **A)** Backup and restore
> **B)** **Pilot light: dados replicados continuamente e infraestrutura núcleo provisionada, servidores de aplicação desligados** ✅
> **C)** Warm standby
> **D)** Multi-site active/active
>
> **Por que B**: pilot light mantém **os dados sempre replicados** (atende RPO de 15 min) e a infraestrutura pronta, exigindo apenas ligar/escalar a camada de aplicação — cabe em 1 hora de RTO, com o menor custo contínuo entre as que atendem.
> **A errada**: restaurar backup e reprovisionar normalmente estoura RPO e RTO.
> **C e D erradas**: atendem com folga, mas custam mais. O enunciado pede **a mais econômica que atende** — leia sempre esse qualificador.

> [!example]- Q4 — Uma função Lambda com alta concorrência esgota as conexões do Aurora. Qual solução?
> **A)** Aumentar `max_connections` no parameter group
> **B)** **Amazon RDS Proxy entre a Lambda e o cluster** ✅
> **C)** Adicionar read replicas
> **D)** Reserved concurrency na Lambda
>
> **Por que B**: RDS Proxy existe para isso — *"allow your applications to pool and share database connections"*, e faz load shedding quando passa do limite. Bônus: reduz o tempo de failover *"by up to 66%"* no Aurora Multi-AZ.
> **A errada**: empurra o problema; conexões consomem memória do banco.
> **C errada**: ajuda em leitura, não no esgotamento de conexões de escrita.
> **D errada**: estrangula a aplicação em vez de resolver. É mitigação, não solução — e o guia pede desenho correto.

---

## ⚠️ Armadilhas do domínio 2

| Parece | É |
|---|---|
| Multi-AZ escala leitura | Standby **não lê**. Escalar leitura = read replica |
| HA e fault tolerance são a mesma coisa | HA recupera rápido; fault tolerant **não interrompe** |
| SQS entrega para vários consumidores | Um por mensagem. N consumidores = **SNS → N SQS** |
| SNS guarda mensagem | SNS é **push**; durabilidade vem da fila |
| Standard queue mantém ordem | Não. Ordem = **FIFO** |
| Express workflow é sempre melhor | Express é **at-least-once** e dura 5 min. Passo não idempotente → **Standard** |
| Um NAT gateway basta para HA | NAT gateway zonal vive em **uma AZ** |
| Quota de serviço é automática no standby | O guia cita explicitamente configurar quota **no ambiente de standby**. Quota não migra com o desastre |
| Escalar vertical é mais simples, então é a resposta | A prova premia **horizontal** + stateless |
| Immutable infrastructure é jargão | É resposta real: trocar instância em vez de atualizar no lugar (AMI nova + ASG instance refresh) |

---

## 🗂 Serviços e conceitos deste domínio

Cada pasta tem **quatro notas**: `1 - O que e` · `2 - Decorar` · `3 - Detalhes` · `4 - Questoes`.

- [[2 - Resiliencia (26%)/API Gateway/1 - O que e|API Gateway]]
- [[2 - Resiliencia (26%)/AWS Batch/1 - O que e|AWS Batch]]
- [[2 - Resiliencia (26%)/Aurora/1 - O que e|Aurora]]
- [[2 - Resiliencia (26%)/Auto Scaling (EC2)/1 - O que e|Auto Scaling (EC2)]]
- [[2 - Resiliencia (26%)/CloudFormation/1 - O que e|CloudFormation]]
- [[2 - Resiliencia (26%)/CloudWatch/1 - O que e|CloudWatch]]
- [[2 - Resiliencia (26%)/ECS/1 - O que e|ECS]]
- [[2 - Resiliencia (26%)/EKS/1 - O que e|EKS]]
- [[2 - Resiliencia (26%)/ELB (Load Balancers)/1 - O que e|ELB (Load Balancers)]]
- [[2 - Resiliencia (26%)/Elastic Beanstalk/1 - O que e|Elastic Beanstalk]]
- [[2 - Resiliencia (26%)/EventBridge/1 - O que e|EventBridge]]
- [[2 - Resiliencia (26%)/Fargate/1 - O que e|Fargate]]
- [[2 - Resiliencia (26%)/Lambda/1 - O que e|Lambda]]
- [[2 - Resiliencia (26%)/Mensageria gerenciada (Amazon MQ e MSK)/1 - O que e|Mensageria gerenciada (Amazon MQ e MSK)]]
- [[2 - Resiliencia (26%)/RDS/1 - O que e|RDS]]
- [[2 - Resiliencia (26%)/RDS Proxy/1 - O que e|RDS Proxy]]
- [[2 - Resiliencia (26%)/Route 53/1 - O que e|Route 53]]
- [[2 - Resiliencia (26%)/SNS/1 - O que e|SNS]]
- [[2 - Resiliencia (26%)/SQS/1 - O que e|SQS]]
- [[2 - Resiliencia (26%)/Step Functions/1 - O que e|Step Functions]]
- [[2 - Resiliencia (26%)/X-Ray/1 - O que e|X-Ray]]

## Links

- [[00 - START HERE (indice da prova)]]
- [[03 - Pegadinhas mestre]]
- [Domínio 2 no guia oficial](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain2.html)
