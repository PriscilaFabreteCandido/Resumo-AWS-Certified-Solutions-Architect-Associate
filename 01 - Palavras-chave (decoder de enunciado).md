---
tags: [saa-c03, decoder, palavras-chave, alta-prioridade]
atualizado: 2026-11-08
---

# 🔑 Palavras-chave — decoder de enunciado

> [!important] Como usar esta nota
> A SAA-C03 raramente pergunta definição. Ela descreve um **requisito de negócio** e espera que você mapeie para o serviço. Quase toda questão tem 1 ou 2 palavras que já eliminam 3 alternativas.
> Leia o enunciado **de trás para frente**: a última frase quase sempre contém o critério de decisão ("com o **menor custo operacional**", "com a **menor latência**", "sem **alterar a aplicação**").

## 🧩 Em 30 segundos — os 6 qualificadores que decidem a resposta

| Frase no enunciado | O que ela está pedindo | Como ela elimina alternativas |
|---|---|---|
| **"least operational overhead" / "minimal management"** | Gerenciado / serverless | Mata qualquer resposta com EC2, instalar software, cron, script próprio |
| **"most cost-effective" / "lowest cost"** | Custo é o critério, não performance | Mata Provisioned IOPS, instâncias maiores, Multi-AZ desnecessário |
| **"highly available"** | ≥ 2 AZs | Mata tudo que é Single-AZ (One Zone-IA, FSx Single-AZ, 1 NAT GW) |
| **"fault tolerant" / "no single point of failure"** | Tolerar falha **sem perda** | Mais forte que HA: pede redundância ativa, não só failover |
| **"without changing the application" / "legacy app"** | Nada de refatorar | Mata Lambda, DynamoDB, reescrita. Puxa ELB, EFS, RDS Proxy, Global Accelerator |
| **"real time" vs "near real time"** | Streams vs Firehose | "real time" → Kinesis Data Streams. "near real time" / batch → Firehose |

> [!tip] A regra do "menor esforço operacional"
> Quando o enunciado diz *least operational overhead*, existe uma hierarquia quase sempre válida:
> **serverless gerenciado > gerenciado com instância > você gerencia a instância**.
> Ex.: Fargate > ECS no EC2 > Docker instalado na mão. Aurora Serverless > Aurora provisionado > MySQL no EC2.

---

## 🧠 Teste-se primeiro

> [!question]- "Usuários globais, conteúdo estático, cache na borda" — e se fosse "jogo TCP/UDP com IP fixo"?
> Estático em cache → **CloudFront**. TCP/UDP com IP estático anycast e sem cache → **AWS Global Accelerator**.
> O divisor é **cache**: CloudFront armazena conteúdo, Global Accelerator só roteia pela rede da AWS.

> [!question]- "Preciso conectar on-premises à AWS com banda previsível" — e se fosse "o mais rápido de montar"?
> Banda previsível / consistente / privada → **Direct Connect**.
> Rápido de montar / barato / temporário / backup → **Site-to-Site VPN**.
> *Padrão clássico de prova*: DX como primário + VPN como backup.

> [!question]- "Arquivo compartilhado entre várias instâncias Linux" — e Windows? E HPC?
> Linux/NFS → **Amazon EFS**. Windows/SMB + Active Directory → **FSx for Windows File Server**. HPC/ML com throughput extremo e integração com S3 → **FSx for Lustre**.
> EBS **não** é a resposta: um volume EBS comum anexa a uma instância (Multi-Attach existe só em io1/io2 e não é file system compartilhado).

> [!question]- "Quem fez essa chamada de API?" vs "a CPU está alta?" vs "essa configuração mudou quando?"
> Quem fez a chamada → **CloudTrail**. Métrica/log de performance → **CloudWatch**. Histórico de configuração e conformidade → **AWS Config**.

---

## 1. Rede e borda

| Palavra-chave no enunciado | Serviço |
|---|---|
| cache de conteúdo, usuários globais, estático, latência de download | **CloudFront** |
| IP estático anycast, TCP/UDP, failover regional rápido, jogo/VoIP/IoT | **Global Accelerator** |
| banda dedicada, consistente, previsível, não passa pela internet, 1/10/100/400 Gbps | **Direct Connect** |
| rápido de provisionar, criptografado sobre internet, backup do DX, 2 túneis | **Site-to-Site VPN** |
| conectar centenas de VPCs, hub-and-spoke, roteamento transitivo | **Transit Gateway** |
| conectar 2 VPCs, barato, sem transitividade | **VPC peering** |
| acessar S3/DynamoDB sem internet, **de graça** | **Gateway endpoint** |
| acessar outros serviços AWS por IP privado, ENI na sua subnet | **Interface endpoint (PrivateLink)** |
| expor **meu** serviço para outra conta por IP privado | **PrivateLink / endpoint service** |
| saída para internet de subnet privada (IPv4) | **NAT gateway** |
| saída para internet de subnet privada (**IPv6**) | **Egress-only internet gateway** |
| inspeção por appliance de terceiro (firewall virtual), GENEVE | **Gateway Load Balancer** |
| roteamento por latência / geolocalização / peso / failover de DNS | **Route 53** |
| apontar o **ápice do domínio** (example.com) para um ELB/CloudFront/S3 | **Alias record** do Route 53 |

## 2. Balanceamento

| Palavra-chave | Serviço |
|---|---|
| HTTP/HTTPS, roteamento por **path** ou **host**, WAF, Lambda como target | **ALB** (camada 7) |
| TCP/UDP/TLS, **IP estático**, milhões de req/s, latência ultrabaixa, preservar IP de origem | **NLB** (camada 4) |
| appliance de inspeção (firewall, IDS/IPS) de terceiro | **GWLB** (camada 3) |
| "legacy", migrar para geração atual | **Classic Load Balancer** (geração anterior) |

## 3. Armazenamento

| Palavra-chave | Resposta |
|---|---|
| objeto, estático, data lake, backup, 11 noves | **S3** |
| acesso frequente, mais de 1x por mês | **S3 Standard** |
| padrão de acesso **desconhecido / variável / imprevisível** | **S3 Intelligent-Tiering** |
| acessado ~1x por mês, pode pagar taxa de retrieval | **S3 Standard-IA** |
| **reproduzível**, pode perder, 20% mais barato que IA | **S3 One Zone-IA** |
| arquivo morto mas com acesso em **milissegundos** | **S3 Glacier Instant Retrieval** |
| arquivo, aceita **minutos a horas**, 90 dias mínimos | **S3 Glacier Flexible Retrieval** |
| retenção **7-10 anos**, compliance, 12-48 h, mais barato de todos | **S3 Glacier Deep Archive** |
| WORM, imutável, não pode deletar nem com root | **S3 Object Lock, modo Compliance** |
| bloco, anexado a 1 instância, boot volume | **EBS** |
| NFS, várias instâncias Linux, elástico | **EFS** |
| SMB, Windows, Active Directory | **FSx for Windows File Server** |
| HPC, ML, throughput de centenas de GB/s, ligado a bucket S3 | **FSx for Lustre** |
| multiprotocolo (NFS+SMB+iSCSI), snapshot/clone estilo NetApp | **FSx for NetApp ONTAP** |
| migrar servidor ZFS/Linux para AWS | **FSx for OpenZFS** |

## 4. Híbrido e migração

| Palavra-chave | Serviço |
|---|---|
| on-premises grava em NFS/SMB e vira objeto no S3, cache local | **S3 File Gateway** |
| on-premises grava em **iSCSI**, cópia no S3, snapshot EBS | **Volume Gateway** (cached = dados no S3; stored = dados locais) |
| substituir fitas físicas / biblioteca de fitas virtual | **Tape Gateway** |
| copiar TBs **pela rede**, agendado, NFS/SMB/HDFS → S3/EFS/FSx | **DataSync** |
| cliente/parceiro envia arquivos por **SFTP/FTPS/FTP/AS2** | **Transfer Family** |
| sem banda / link ruim / dezenas de TB → dispositivo físico | **Snow Family** (⚠️ suporte encerra 31/12/2026) |
| migrar banco **mantendo o mesmo engine**, com downtime mínimo | **DMS** (replicação contínua) |
| migrar banco **trocando o engine** (Oracle → PostgreSQL) | **DMS + Schema Conversion (SCT)** |
| migrar servidores inteiros (lift & shift) | **Application Migration Service (MGN)** |
| descobrir o que existe no datacenter antes de migrar | **Application Discovery Service** |
| backup centralizado de vários serviços e contas, WORM | **AWS Backup** (+ **Vault Lock**) |

## 5. Bancos de dados

| Palavra-chave | Resposta |
|---|---|
| relacional, MySQL/PostgreSQL/Oracle/SQL Server/MariaDB/Db2 | **RDS** |
| **alta disponibilidade** do RDS, standby **não lê** | **Multi-AZ instance deployment** |
| HA do RDS **com 2 standbys que leem**, failover < 35 s | **Multi-AZ DB cluster** |
| **escalar leitura** | **Read replica** (assíncrona) |
| 5x MySQL, 3x PostgreSQL, 6 cópias em 3 AZs, até 15 réplicas | **Aurora** |
| carga imprevisível/intermitente, pagar por segundo, escala em 0,5 ACU | **Aurora Serverless v2** |
| **multi-região** com RPO em segundos e RTO em minutos | **Aurora Global Database** |
| chave-valor, escala ilimitada, single-digit ms, serverless | **DynamoDB** |
| DynamoDB mais rápido ainda, cache em memória, dentro da VPC | **DAX** |
| DynamoDB **multi-região ativo-ativo** | **Global Tables** |
| cache de sessão, leaderboard, Redis/Memcached | **ElastiCache** |
| data warehouse, OLAP, petabytes, BI, SQL analítico | **Redshift** |
| consultar o S3 com SQL **sem carregar nada** | **Athena** (ou **Redshift Spectrum**, se já tem cluster) |
| grafo, relacionamento, rede social, detecção de fraude | **Neptune** |
| MongoDB compatível | **DocumentDB** |
| Cassandra compatível | **Keyspaces** |
| "esgotando conexões", "muitas conexões abertas", Lambda + RDS | **RDS Proxy** |

## 6. Mensageria e integração

| Palavra-chave | Resposta |
|---|---|
| desacoplar, fila, buffer, 1 consumidor por mensagem, retry | **SQS** |
| **ordem** garantida e **sem duplicata** | **SQS FIFO** |
| fan-out, 1 → N, push, pub/sub | **SNS** |
| roteamento por **conteúdo do evento**, eventos de serviços AWS, cron | **EventBridge** |
| orquestrar passos, state machine, retry/catch, workflow visual | **Step Functions** |
| migrar app que já usa **RabbitMQ / ActiveMQ / AMQP / MQTT / JMS** | **Amazon MQ** |
| app que já usa **Apache Kafka** | **Amazon MSK** |
| ingestão em **tempo real**, múltiplos consumidores lendo o mesmo stream, replay | **Kinesis Data Streams** |
| **entregar** stream em S3/Redshift/OpenSearch/Splunk sem código | **Data Firehose** |
| agregação/janela/SQL sobre stream | **Managed Service for Apache Flink** |

## 7. Computação

| Palavra-chave | Resposta |
|---|---|
| carga estável 24/7 por 1-3 anos, compromisso de uso | **Savings Plans** (Compute, ou EC2 Instance para mais desconto) |
| carga estável + **precisa reservar capacidade** em uma AZ | **Reserved Instances** (zonal) ou **Capacity Reservation** |
| batch, tolerante a interrupção, pode reiniciar, aviso de 2 minutos | **Spot** |
| licença **per-socket / per-core** própria, compliance de hardware | **Dedicated Hosts** |
| hardware single-tenant, cobrado por hora, sem controle do host | **Dedicated Instances** |
| função curta, orientada a evento, pagar por invocação | **Lambda** |
| container sem gerenciar servidor | **Fargate** |
| container com controle do host / precisa de GPU / daemon | **ECS no EC2** |
| **Kubernetes** (já usa, quer portabilidade) | **EKS** |
| job em lote com fila e dependências | **AWS Batch** |
| Hadoop, Spark, Hive, Presto, HBase | **EMR** |
| rodar AWS **dentro do seu datacenter** | **Outposts** |
| latência de 5G / borda de operadora | **Wavelength** |

## 8. Segurança

| Palavra-chave | Resposta |
|---|---|
| SQL injection, XSS, filtrar requisição HTTP, rate limiting por IP | **AWS WAF** |
| DDoS camada 3/4, incluído e de graça | **Shield Standard** |
| DDoS grande, SRT (Shield Response Team), engajamento proativo | **Shield Advanced** |
| aplicar WAF/Shield/SG/NACL em **várias contas** de uma vez | **Firewall Manager** |
| atividade maliciosa, mineração de cripto, IP suspeito, CloudTrail+VPC Flow+DNS | **GuardDuty** |
| achar **PII / dado sensível** no S3 | **Macie** |
| **vulnerabilidade de software / CVE** em EC2, ECR, Lambda | **Inspector** |
| painel único de postura, agregar achados, checar contra padrões | **Security Hub** |
| **investigar** a causa raiz de um achado, grafo de comportamento | **Detective** |
| gerenciar chave de criptografia, integrado com os serviços AWS | **KMS** |
| HSM **single-tenant**, FIPS 140-3 nível 3, eu controlo tudo | **CloudHSM** |
| certificado TLS público **grátis**, renovação automática | **ACM** |
| senha de banco com **rotação automática** | **Secrets Manager** |
| configuração / parâmetro, hierarquia, tier padrão **grátis** | **Parameter Store** |
| login de usuário final em app web/mobile, JWT, social login | **Cognito user pool** |
| trocar token por **credencial AWS temporária** | **Cognito identity pool** |
| acesso humano a várias contas com SSO | **IAM Identity Center** |
| acesso de aplicação/serviço entre contas, credencial temporária | **IAM role + STS AssumeRole** |
| guardrail: "nenhuma conta pode usar região X" | **SCP (Organizations)** |
| compartilhar subnet / Transit Gateway / License entre contas | **AWS RAM** |
| acessar EC2 **sem porta 22 aberta, sem bastion, sem chave SSH** | **Systems Manager Session Manager** |

## 9. Custo e governança

| Palavra-chave | Resposta |
|---|---|
| visualizar e prever gasto, 13 meses de histórico, 18 meses de forecast | **Cost Explorer** |
| **alertar** quando passar de X dólares/uso | **AWS Budgets** |
| dado bruto de billing, mais detalhado possível, para Athena/QuickSight | **Cost and Usage Report (CUR)** |
| fatura única para muitas contas, desconto por volume | **Organizations** (consolidated billing) |
| criar landing zone com guardrails prontos | **Control Tower** |
| "a instância está superdimensionada", rightsizing | **Compute Optimizer** |
| relatório de compliance (SOC, PCI, ISO) para auditor | **AWS Artifact** |
| catálogo de produtos aprovados para os times usarem | **Service Catalog** |

---

## ⚠️ Armadilhas de vocabulário

| Parece | É |
|---|---|
| "highly available" e "fault tolerant" são sinônimos | **Não.** HA = recupera rápido (Multi-AZ com failover). Fault tolerant = continua servindo **sem interrupção**. Multi-AZ DB *instance* é HA; ativo-ativo é fault tolerant. |
| "real time" e "near real time" dá no mesmo | **Não.** É o divisor Kinesis Data Streams × Data Firehose. Firehose tem buffer (padrão 5 MB / 300 s no S3). |
| "cache" sempre significa CloudFront | Pode ser **ElastiCache** (banco), **DAX** (DynamoDB), **CloudFront** (borda) ou **cache do API Gateway**. Olhe **o que** está sendo cacheado. |
| "encrypt data in transit" → KMS | **Não.** Em trânsito = **TLS/ACM**. KMS é **em repouso**. |
| "serverless" exclui container | Fargate é serverless e roda container. |
| "menor custo" sempre é Spot | Só se a carga **tolerar interrupção**. Para produção estável, é Savings Plans. |
| Direct Connect é criptografado | A documentação do DX **não** afirma criptografia por padrão. Para criptografar, use **IPsec VPN sobre DX** (ou MACsec). |
| "multi-region" sempre pede réplica de leitura | Pode ser **S3 CRR**, **Aurora Global Database**, **DynamoDB Global Tables** ou **Route 53 failover** — depende do que é replicado. |

## Links

- [[02 - Numeros para decorar]]
- [[03 - Pegadinhas mestre]]
- [[00 - START HERE (indice da prova)]]
