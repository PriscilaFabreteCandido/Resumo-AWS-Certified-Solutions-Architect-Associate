---
tags: [saa-c03, pegadinhas, armadilhas, alta-prioridade, vespera]
atualizado: 2026-11-08
---

# ⚠️ Pegadinhas mestre

> [!important] Esta é a nota da véspera
> Toda armadilha aqui é um erro que a prova explora **de propósito**: duas alternativas plausíveis, uma delas sutilmente errada. Leia esta nota inteira na noite anterior.
> Organizada por tema, não por domínio — porque as pegadinhas não respeitam domínio.

## 🧩 Em 30 segundos — as 10 que derrubam mais gente

1. **One Zone-IA não é "IA mais barato"** — é 1 AZ. Se o enunciado diz *highly available* ou *critical*, está errado.
2. **Standby do Multi-AZ não aceita leitura.** Escalar leitura é read replica.
3. **NACL é stateless** — você precisa liberar as **portas efêmeras** na volta. SG é stateful e resolve sozinho.
4. **SCP não concede permissão.** Com SCP liberando tudo e IAM sem nada, o usuário não faz nada.
5. **Explicit deny sempre ganha.** Nenhuma política em lugar nenhum desfaz um `Deny` explícito.
6. **Gateway endpoint é grátis e só serve S3/DynamoDB.** Interface endpoint é cobrado e serve o resto.
7. **KMS criptografa no máximo 4 KB.** Para arquivo, é envelope encryption (`GenerateDataKey`).
8. **Certificado do CloudFront tem que estar em us-east-1.** Sempre.
9. **CNAME não funciona no ápice do domínio.** Alias funciona.
10. **"Least operational overhead" nunca é EC2 com script.**

---

## 1. S3

| Parece | É |
|---|---|
| One Zone-IA é só "IA mais barato" | É **1 AZ**. *"Not resilient to the loss of the Availability Zone."* Só para dado **reproduzível**. |
| Intelligent-Tiering é sempre a resposta mais barata | Cobra **taxa de monitoramento por objeto**. Para padrão de acesso **conhecido**, classe fixa é mais barata. E objeto **< 128 KB nunca sai** do Frequent Access. |
| Glacier Deep Archive tem Expedited | **Não tem.** Standard até 12 h, Bulk até 48 h. |
| Lifecycle pode mover qualquer classe para qualquer classe | É **cascata, só de quente para frio**. Glacier FR → só Deep Archive. De Deep Archive **não sai**. |
| Posso mover para Deep Archive no dia 10 depois de ter ido para Glacier IR no dia 4 | **Não.** O mínimo de 90 dias do Glacier IR vale: só a partir do dia **94**. |
| Replicação replica o que já estava no bucket | **Não.** CRR/SRR replica só objetos **novos**. Para o acervo existente: **S3 Batch Replication**. |
| Replicação precisa de versionamento só na origem | **Nos dois.** *"Both source and destination buckets must have versioning enabled."* |
| Object Lock protege até do root | Só no modo **Compliance**. No modo **Governance**, quem tem `s3:BypassGovernanceRetention` apaga. |
| Habilitar versionamento é reversível | Pode **suspender**, mas **nunca volta** ao estado unversioned. |
| Mudar a criptografia padrão do bucket recriptografa o que já existe | **Não.** Só vale para objetos **novos**. Para os antigos: S3 Batch Operations (Copy). |
| Transfer Acceleration é para download | É para **upload** de longe (usa a borda do CloudFront). Para download é CloudFront. |
| Requester Pays faz o requisitante pagar o armazenamento | **Não.** *"The bucket owner always pays the cost of storing data."* O requisitante paga **requisição e download**. E **acesso anônimo fica proibido**. |
| Bucket público é liberado por bucket policy | Block Public Access tem **4 configurações** e vence: *"S3 applies the most restrictive combination"* entre conta, bucket e access point. |

## 2. EBS, EFS, FSx

| Parece | É |
|---|---|
| HDD (st1/sc1) pode ser boot volume | **Não pode.** |
| EBS é compartilhável entre instâncias | Só **io1/io2** com **Multi-Attach**, e mesmo assim não é file system compartilhado. Para compartilhar, use **EFS** (Linux) ou **FSx** (Windows). |
| gp3 é só "gp2 mais novo" | gp3 desacopla IOPS e throughput do tamanho (80.000 IOPS / 2.000 MiB/s contra 16.000 / 250). |
| EBS é replicado entre AZs | **Não.** Um volume vive em **uma AZ**. Snapshot é que é regional. |
| Snapshot é incremental mas restaurar é instantâneo | É incremental, mas o volume restaurado **carrega blocos sob demanda** (lazy load) — primeira leitura é mais lenta. |
| FSx for Lustre sempre é durável | **Scratch** não replica: *"Data is not replicated and does not persist if a file server fails."* Para durabilidade, **Persistent**. |
| FSx for Windows é Linux também | É **SMB**. Para NFS/Linux: EFS, FSx for OpenZFS ou FSx for ONTAP. |

## 3. VPC e rede

| Parece | É |
|---|---|
| NACL e SG fazem a mesma coisa em níveis diferentes | NACL é **stateless** (precisa liberar **portas efêmeras** no retorno) e tem **deny**; SG é **stateful** e **só allow**. |
| SG pode negar um IP específico | **Não.** SG só tem allow. Para bloquear IP: **NACL** (ou WAF). |
| NACL avalia todas as regras | Avalia **em ordem crescente e para na primeira que casa**. Deny tem que ter número **menor** que o allow mais amplo. |
| NAT gateway aceita security group | **Não aceita.** Controle o tráfego com NACL na subnet dele ou com SG nos recursos atrás dele. |
| 1 NAT gateway é suficiente para ser HA | O NAT gateway zonal vive em **uma AZ**. Para zona-independência: **um por AZ** (isso também economiza data transfer entre AZs). |
| NAT gateway serve IPv6 | Para **saída IPv6**, o certo é **egress-only internet gateway**. NAT gateway trata IPv4 (e IPv6 só via DNS64/NAT64). |
| Posso usar NAT gateway como bastion | **Não suportado.** Nem port forwarding. Para isso, NAT **instance** — ou melhor, **SSM Session Manager**. |
| VPC peering é transitivo | **Não é.** A→B e B→C não dá A→C. Para isso: **Transit Gateway**. |
| Transit Gateway resolve CIDR sobreposto | Não resolve. A recomendação da AWS é sempre **CIDR não sobreposto**. |
| Direct Connect é criptografado | A doc do DX **não afirma isso**. Para criptografar: **IPsec VPN sobre DX**. |
| Direct Connect já é HA | Uma conexão única é ponto único de falha. HA = **duas conexões** (locais diferentes) ou **DX + VPN de backup**. |
| Interface endpoint e gateway endpoint custam igual | **Gateway endpoint é grátis.** Interface endpoint (PrivateLink) é cobrado por hora e por GB. |
| Interface endpoint serve S3 | Serve, mas o **gateway endpoint** é o padrão para S3/DynamoDB porque é grátis. Interface endpoint para S3 se usa quando precisa acessar de **on-premises**. |
| Um /28 dá 16 IPs utilizáveis | Dá **11**. A AWS reserva 5. |

## 4. Route 53

| Parece | É |
|---|---|
| CNAME pode apontar o ápice (example.com) | **Não pode.** *"You can't create a CNAME record that has the same name as the hosted zone."* Use **alias**. |
| Alias e CNAME custam igual | *"Route 53 doesn't charge for alias queries to AWS resources."* CNAME é cobrado. |
| Posso definir TTL no alias | Não, se apontar para recurso AWS: o Route 53 usa o TTL do recurso. |
| Simple routing faz health check | **Não faz.** *"although you can specify multiple IP addresses, they are not health checked."* Para health check com múltiplos valores: **multivalue answer**. |
| Latency routing escolhe o mais perto geograficamente | Escolhe a **menor latência medida**, que não é sempre o mais perto. Para geografia, é **geolocation**. |
| Failover routing é ativo-ativo | **Ativo-passivo.** Ativo-ativo se faz com **qualquer outra** política (weighted, latency, multivalue). |

## 5. Load balancers

| Parece | É |
|---|---|
| NLB faz roteamento por path | **Não.** Path e host-based é só **ALB** (camada 7). |
| ALB tem IP estático | **Não.** ALB tem **DNS name**. IP estático é **NLB** (e Elastic IP opcional por AZ). |
| Cross-zone load balancing vem ligado em tudo | **ALB**: sempre ligado no nível do LB. **NLB e GWLB**: *"disabled by default"*. |
| WAF funciona com NLB | **ALB**, CloudFront, API Gateway REST, AppSync, Cognito user pool, App Runner, Verified Access, Amplify. **Não NLB.** |
| ALB pode rodar em 1 AZ | *"it is a requirement that you enable at least two or more Availability Zones."* |
| Lambda pode ser target de NLB | **Lambda é target de ALB.** NLB aceita instance ID, IP e **ALB**. |

## 6. EC2, Auto Scaling, Spot

| Parece | É |
|---|---|
| Spot Instance perde dados sem aviso | Tem aviso de **2 minutos** (e *rebalance recommendation* antes disso). |
| Spot cobre Savings Plans | *"Spot Instances are not covered by Savings Plans."* |
| Dedicated Host = Dedicated Instance | **Host**: você paga o servidor físico e traz **licença per-socket/per-core**. **Instance**: hardware single-tenant cobrado **por hora**, sem visibilidade do host. |
| Reserved Instance reserva capacidade sempre | Só a **zonal**. RI **regional** é só desconto de billing. Para garantir capacidade: **Capacity Reservation**. |
| Savings Plans tem 3 tipos | **Quatro**: Compute, **Database**, EC2 Instance e SageMaker AI. |
| Spread placement group aceita quantas instâncias eu quiser | **7 por AZ.** Partition: **7 partições por AZ**. |
| Cluster placement group é multi-AZ | **Uma AZ só.** Partition e spread podem ser multi-AZ. |
| ASG respeita a política de terminação acima de tudo | *"Maintaining Zonal balance takes precedence over the termination policy."* |
| ASG espera o cooldown para trocar instância doente | **Não espera.** *"does not wait for the cooldown period to end before replacing the unhealthy instance."* |
| Grace period é sempre 300 s | **300 s no console, 0 s via CLI/SDK.** |
| Health check do ELB vem ligado no ASG | **Não.** O padrão é só **EC2 status check**. ELB health check precisa ser ativado — pegadinha clássica: "a instância está UP para o ASG mas a aplicação morreu". |
| Target tracking usa cooldown | Target tracking e step scaling usam **instance warmup**; cooldown é coisa de **simple scaling** (que a AWS recomenda não usar). |

## 7. Bancos de dados

| Parece | É |
|---|---|
| Multi-AZ escala leitura | **Não.** Standby não lê. |
| Multi-AZ DB cluster = Aurora cluster | *"Multi-AZ DB clusters aren't the same as Aurora DB clusters."* |
| Read replica é um backup | Não é backup. É cópia **assíncrona** para leitura (promovível, isso sim, como DR). |
| Aurora Serverless v2 pausa automaticamente | Só se o mínimo for **0 ACU**. Com 0,5 ACU, fica sempre ligado. |
| Aurora Global Database é multi-master | É **1 primária escrevendo + até 10 secundárias só leitura**. Escrita de secundária só com **write forwarding** (que encaminha para a primária). |
| Aurora Global Database tem RPO 0 | **Falha**: RPO em segundos. **Switchover planejado**: RPO 0. |
| GSI pode fazer leitura forte | *"Queries on global secondary indexes support eventual consistency only."* **LSI** faz leitura forte. |
| GSI consome capacidade da tabela | GSI tem **capacidade própria**. **LSI** consome a da tabela base. |
| GSI devolve atributo não projetado | **Não.** GSI só devolve o que foi projetado. **LSI** busca o resto na tabela. |
| DAX acelera leitura forte | **Não.** Leitura forte **passa direto** para o DynamoDB e **não é cacheada**. |
| TTL do DynamoDB apaga na hora | *"within a few days of their expiration time"*. Itens expirados ainda aparecem em Scan/Query — filtre. |
| PITR restaura a tabela no lugar | *"always restores to a new table."* |
| ElastiCache Redis = Memcached | Redis: replicação, persistência, HA, estruturas de dados. Memcached: multithread, simples, sem replicação. |
| Redshift é para OLTP | É **OLAP** (analítico). Para OLTP: RDS/Aurora/DynamoDB. |
| Athena e Redshift Spectrum são a mesma coisa | Athena é **independente e serverless**. Spectrum é **feature do Redshift** (precisa de cluster ou Serverless workgroup). |
| RDS Proxy funciona com read replica | *"you can associate a proxy only with the writer DB instance, not a read replica."* |

## 8. Mensageria

| Parece | É |
|---|---|
| SQS garante ordem | **Standard não garante** (é *at-least-once*, pode duplicar e desordenar). Ordem = **FIFO**. |
| SQS entrega para vários consumidores | SQS = **um consumidor processa cada mensagem**. Para N consumidores: **SNS → várias SQS** (fan-out). |
| SNS guarda a mensagem se o consumidor estiver fora | SNS é **push**: se não entregar, tenta e desiste (ou manda para DLQ). Para durabilidade: **SNS → SQS**. |
| DLQ do SNS pode ser qualquer coisa | *"A dead-letter queue is an Amazon SQS queue."* Mesma conta e região. Tópico FIFO exige fila FIFO. |
| Aumentar visibility timeout resolve mensagem duplicada | Reduz reprocessamento, mas a aplicação ainda precisa ser **idempotente** em fila standard. |
| Long polling custa mais | Custa **menos** (menos respostas vazias). |
| EventBridge substitui SNS sempre | EventBridge roteia por **conteúdo do evento** e integra com serviços AWS; SNS é fan-out barato e de alto throughput para e-mail/SMS/push/HTTP. |
| Kinesis Data Streams e Firehose são intercambiáveis | **Streams**: tempo real, múltiplos consumidores, **replay** (retenção até 365 dias), você gerencia shards. **Firehose**: entrega com buffer, sem replay, sem código. |
| Step Functions Express é melhor porque é mais rápido | Express é **at-least-once** e dura **5 min**. Para passo **não idempotente** (cobrar cartão, subir cluster EMR), é **Standard** (exactly-once, até 1 ano). |

## 9. Segurança e IAM

| Parece | É |
|---|---|
| SCP concede permissão | *"No permissions are granted by an SCP."* É **teto**, não concessão. |
| SCP afeta a conta de gerenciamento | *"SCPs don't affect users or roles in the management account."* |
| SCP afeta service-linked role | *"SCPs do not affect any service-linked role."* |
| Policy de recurso sozinha resolve cross-account | Em **cross-account** precisa dos **dois lados**: policy de identidade na conta A **e** policy de recurso na conta B. Exceções: **trust policy de role** e **key policy do KMS**, que precisam liberar o principal explicitamente. |
| Permissions boundary concede acesso | Boundary é **interseção**, nunca concessão. |
| Deny implícito e deny explícito são iguais | Deny **explícito** não pode ser revertido por nada. Deny **implícito** (ausência de allow) pode ser resolvido por uma policy de recurso no mesmo account. |
| KMS criptografa qualquer arquivo | `Encrypt` aceita **4.096 bytes**. Para arquivo: **envelope encryption**. |
| Rotação do KMS recriptografa os dados | *"It does not rotate the data keys that the KMS key generated or re-encrypt any data."* |
| Posso rotacionar chave assimétrica automaticamente | **Não.** Só simétrica com material gerado pela KMS. |
| CloudHSM e KMS são equivalentes | CloudHSM é **single-tenant**, **FIPS nível 3**, você gerencia usuários e as chaves não são visíveis à AWS. KMS é gerenciado e integrado com os serviços. |
| ACM emite certificado para EC2 | Só com **Nitro Enclaves**. *"Associating an ACM-managed certificate directly with an Amazon EC2 instance requires a Nitro Enclave."* |
| Certificado ACM funciona em qualquer região | É **regional**, não copia entre regiões — e para **CloudFront tem que ser us-east-1**. |
| GuardDuty escaneia vulnerabilidade | GuardDuty detecta **ameaça/comportamento** (CloudTrail + VPC Flow + DNS). **Vulnerabilidade/CVE é Inspector.** **PII no S3 é Macie.** |
| Security Hub detecta ameaça | Security Hub **agrega e avalia postura**. Quem detecta é GuardDuty/Inspector/Macie. Quem **investiga** é Detective. |
| Shield Standard precisa ser contratado | *"provided automatically and at no extra charge."* |
| Cognito user pool dá acesso ao S3 | **User pool autentica** (emite JWT). Quem troca token por **credencial AWS** é o **identity pool**. |
| Secrets Manager e Parameter Store são iguais | **Secrets Manager**: rotação automática nativa, cobrado por secret. **Parameter Store**: sem rotação, tier Standard **grátis**. |

## 10. Custo

| Parece | É |
|---|---|
| Data transfer dentro da AWS é grátis | Entre **AZs** e entre **regiões** é cobrado. Dentro da **mesma AZ** via VPC peering é grátis. Da origem AWS **para o CloudFront** é grátis. |
| NAT gateway é barato | Cobra **por hora + por GB processado**. Tráfego para S3/DynamoDB pode sair do NAT e ir para **gateway endpoint grátis** — economia clássica de prova. |
| Cost Explorer alerta | Cost Explorer **mostra e prevê**. Quem **alerta** é o **Budgets**. |
| CUR serve para visualizar | CUR é **dado bruto** num bucket, para Athena/Redshift/QuickSight. Visualização pronta é Cost Explorer. |
| Compute Optimizer corrige o tamanho | Só **recomenda** (rightsizing). |
| Reserved Instance pode ser cancelada | **Não pode.** Standard pode ser modificada ou vendida no Marketplace; Convertible pode ser trocada. |

---

## ⚠️ A pegadinha específica de quem vem do Developer Associate

Se você estudou (ou vai estudar) o DVA, cuidado: vários serviços que são **centrais** no DVA estão **fora de escopo** na SAA.

**Fora de escopo na SAA-C03**: AWS CDK, CodeBuild, CodeCommit, CodeDeploy, CodeArtifact, CloudShell, Fault Injection Simulator, SDKs e ferramentas.

Ver [[04 - Fora de escopo (nao estude isso)]].

## Links

- [[01 - Palavras-chave (decoder de enunciado)]]
- [[02 - Numeros para decorar]]
