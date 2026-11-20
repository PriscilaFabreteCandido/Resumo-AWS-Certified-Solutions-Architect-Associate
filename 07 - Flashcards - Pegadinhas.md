---
fonte: "[[03 - Pegadinhas mestre]]"
---

# Pegadinhas — Flashcards

#flashcards/saa-c03/pegadinhas

## 1. S3

Verdadeiro ou falso: One Zone-IA é só "IA mais barato"?::**Falso.** Fica em **1 AZ** e não resiste à perda dela; só para dado **reproduzível**

Verdadeiro ou falso: Intelligent-Tiering é sempre a resposta mais barata?::**Falso.** Cobra **monitoramento por objeto**; com padrão de acesso conhecido, classe fixa sai mais barata. Objeto **< 128 KB** nunca sai do Frequent Access

Verdadeiro ou falso: Glacier Deep Archive tem recuperação Expedited?::**Falso.** Só **Standard** (até 12 h) e **Bulk** (até 48 h)

Verdadeiro ou falso: lifecycle pode mover qualquer classe para qualquer classe?::**Falso.** É cascata, **só de quente para frio**. Glacier FR só vai para Deep Archive; de Deep Archive **não sai**

Verdadeiro ou falso: a cascata do lifecycle obriga a passar por cada classe?::**Falso.** Pode **pular** (Standard direto para Deep Archive). O proibido é **subir**

Verdadeiro ou falso: One Zone-IA transiciona para Glacier Instant Retrieval?::**Falso.** Só para **Glacier FR** e **Deep Archive**

Verdadeiro ou falso: posso mover para Deep Archive no dia 10 depois de ir para Glacier IR no dia 4?::**Falso.** O mínimo de **90 dias** do Glacier IR vale: só a partir do dia **94**

Verdadeiro ou falso: a replicação do S3 replica o que já estava no bucket?::**Falso.** CRR/SRR replica só objetos **novos**; para o acervo existente, **S3 Batch Replication**

Verdadeiro ou falso: a replicação do S3 precisa de versionamento só na origem?::**Falso.** Precisa de versionamento **nos dois** buckets

Verdadeiro ou falso: Object Lock protege até do root em qualquer modo?::**Falso.** Só no modo **Compliance**; em **Governance**, quem tem `s3:BypassGovernanceRetention` apaga

Verdadeiro ou falso: habilitar versionamento é reversível?::**Falso.** Pode **suspender**, mas **nunca volta** a unversioned

Verdadeiro ou falso: mudar a criptografia padrão do bucket recriptografa o que já existe?::**Falso.** Vale só para objetos **novos**; para os antigos, **S3 Batch Operations (Copy)**

Verdadeiro ou falso: Transfer Acceleration é para download?::**Falso.** É para **upload** de longe (borda do CloudFront); download é **CloudFront**

Verdadeiro ou falso: Requester Pays faz o requisitante pagar o armazenamento?::**Falso.** O dono sempre paga o armazenamento; o requisitante paga **requisição e download**, e acesso anônimo fica proibido

Verdadeiro ou falso: uma bucket policy pública basta para liberar o bucket?::**Falso.** O **Block Public Access** (4 configurações) vence; vale a combinação **mais restritiva** entre conta, bucket e access point

## 2. EBS, EFS, FSx

Verdadeiro ou falso: HDD (st1/sc1) pode ser boot volume?::**Falso.** **Não pode**

Verdadeiro ou falso: EBS é compartilhável entre instâncias?::**Falso.** Só **io1/io2 com Multi-Attach**, e não é file system compartilhado; para compartilhar, **EFS** (Linux) ou **FSx** (Windows)

Verdadeiro ou falso: gp3 é só "gp2 mais novo"?::**Falso.** gp3 **desacopla IOPS e throughput do tamanho**

Verdadeiro ou falso: EBS é replicado entre AZs?::**Falso.** O volume vive em **uma AZ**; o **snapshot** é que é regional

Verdadeiro ou falso: restaurar um snapshot EBS é instantâneo?::**Falso.** O volume carrega blocos **sob demanda** (lazy load); a primeira leitura é mais lenta

Verdadeiro ou falso: FSx for Lustre sempre é durável?::**Falso.** **Scratch** não replica nem persiste se o servidor falhar; para durabilidade, **Persistent**

Verdadeiro ou falso: FSx for Windows serve também para Linux/NFS?::**Falso.** É **SMB**; para NFS/Linux, **EFS**, **FSx for OpenZFS** ou **FSx for ONTAP**

## 3. VPC e rede

Verdadeiro ou falso: NACL e SG fazem a mesma coisa em níveis diferentes?::**Falso.** NACL é **stateless** (libere **portas efêmeras** no retorno) e tem deny; SG é **stateful** e **só allow**

Verdadeiro ou falso: SG pode negar um IP específico?::**Falso.** SG só tem allow; para bloquear IP, **NACL** (ou WAF)

Verdadeiro ou falso: NACL avalia todas as regras?::**Falso.** Avalia em **ordem crescente** e **para na primeira** que casa; o deny precisa de número **menor**

Verdadeiro ou falso: NAT gateway aceita security group?::**Falso.** Controle com **NACL** na subnet dele ou **SG** nos recursos atrás dele

Verdadeiro ou falso: 1 NAT gateway é suficiente para ser HA?::**Falso.** Ele vive em **uma AZ**; use **um por AZ** (também economiza transferência entre AZs)

Verdadeiro ou falso: NAT gateway é o caminho para saída IPv6?::**Falso.** Para saída IPv6, **egress-only internet gateway**

Verdadeiro ou falso: posso usar NAT gateway como bastion?::**Falso.** Não é suportado (nem port forwarding); use **NAT instance** ou, melhor, **SSM Session Manager**

Verdadeiro ou falso: VPC peering é transitivo?::**Falso.** A→B e B→C não dá A→C; para isso, **Transit Gateway**

Verdadeiro ou falso: Transit Gateway resolve CIDR sobreposto?::**Falso.** A recomendação é sempre **CIDR não sobreposto**

Verdadeiro ou falso: Direct Connect é criptografado?::**Falso.** A doc não afirma isso; para cifrar, **IPsec VPN sobre DX**

Verdadeiro ou falso: Direct Connect já é HA?::**Falso.** Conexão única é ponto único de falha; HA = **duas conexões** em locais diferentes ou **DX + VPN de backup**

Verdadeiro ou falso: interface endpoint e gateway endpoint custam igual?::**Falso.** **Gateway endpoint é grátis**; interface endpoint é cobrado por hora e por GB

Verdadeiro ou falso: interface endpoint é o padrão para acessar S3?::**Falso.** O padrão para S3/DynamoDB é o **gateway endpoint** (grátis); interface para S3 quando precisa acessar de **on-premises**

Verdadeiro ou falso: um /28 dá 16 IPs utilizáveis?::**Falso.** Dá **11**; a AWS reserva **5**

## 4. Route 53

Verdadeiro ou falso: CNAME pode apontar o ápice do domínio (example.com)?::**Falso.** Não pode ter o mesmo nome da hosted zone; use **alias**

Verdadeiro ou falso: alias e CNAME custam igual?::**Falso.** Consultas de **alias a recursos AWS são grátis**; CNAME é cobrado

Verdadeiro ou falso: posso definir TTL num alias que aponta para recurso AWS?::**Falso.** O Route 53 usa o **TTL do recurso**

Verdadeiro ou falso: simple routing faz health check?::**Falso.** Os IPs não são checados; para health check com vários valores, **multivalue answer**

Verdadeiro ou falso: latency routing escolhe o mais perto geograficamente?::**Falso.** Escolhe a **menor latência medida**; para geografia, **geolocation**

Verdadeiro ou falso: failover routing é ativo-ativo?::**Falso.** É **ativo-passivo**; ativo-ativo usa weighted, latency ou multivalue

## 5. Load balancers

Verdadeiro ou falso: NLB faz roteamento por path?::**Falso.** Path e host-based é só **ALB** (camada 7)

Verdadeiro ou falso: ALB tem IP estático?::**Falso.** ALB tem **DNS name**; IP estático é **NLB** (Elastic IP opcional por AZ)

Verdadeiro ou falso: cross-zone load balancing vem ligado em todos os load balancers?::**Falso.** **ALB**: sempre ligado. **NLB e GWLB**: desligado por padrão

Verdadeiro ou falso: WAF funciona com NLB?::**Falso.** WAF atende **ALB, CloudFront, API Gateway REST**, AppSync, Cognito, entre outros, mas **não NLB**

Verdadeiro ou falso: ALB pode rodar em 1 AZ?::**Falso.** Exige **pelo menos duas AZs**

Verdadeiro ou falso: Lambda pode ser target de NLB?::**Falso.** Lambda é target de **ALB**; NLB aceita instance ID, IP e ALB

## 6. EC2, Auto Scaling, Spot

Verdadeiro ou falso: Spot Instance perde dados sem aviso?::**Falso.** Tem aviso de **2 minutos** (e rebalance recommendation antes)

Verdadeiro ou falso: Spot é coberto por Savings Plans?::**Falso.** Spot **não** é coberto por Savings Plans

Verdadeiro ou falso: Dedicated Host é o mesmo que Dedicated Instance?::**Falso.** **Host**: paga o servidor físico, serve licença **per-socket/per-core**. **Instance**: single-tenant por hora, sem ver o host

Verdadeiro ou falso: Reserved Instance sempre reserva capacidade?::**Falso.** Só a **zonal**; a regional é só desconto. Para garantir capacidade, **Capacity Reservation**

Verdadeiro ou falso: Savings Plans tem 3 tipos?::**Falso.** São **quatro**: Compute, **Database**, EC2 Instance e SageMaker AI

Verdadeiro ou falso: spread placement group aceita quantas instâncias eu quiser?::**Falso.** **7 por AZ**; partition tem **7 partições por AZ**

Verdadeiro ou falso: cluster placement group é multi-AZ?::**Falso.** É **uma AZ só**; partition e spread podem ser multi-AZ

Verdadeiro ou falso: o ASG respeita a política de terminação acima de tudo?::**Falso.** Manter o **equilíbrio entre AZs** tem precedência

Verdadeiro ou falso: o ASG espera o cooldown para trocar instância doente?::**Falso.** Substitui a instância não saudável **sem esperar** o cooldown

Verdadeiro ou falso: o grace period do ASG é sempre 300 s?::**Falso.** **300 s no console**, **0 s via CLI/SDK**

Verdadeiro ou falso: o health check do ELB vem ligado no ASG?::**Falso.** O padrão é só **EC2 status check**; o do ELB precisa ser ativado

Verdadeiro ou falso: target tracking usa cooldown?::**Falso.** Target tracking e step usam **instance warmup**; cooldown é de **simple scaling**

## 7. Bancos de dados

Verdadeiro ou falso: RDS Multi-AZ escala leitura?::**Falso.** O **standby não lê**; para leitura, read replica

Verdadeiro ou falso: Multi-AZ DB cluster é o mesmo que Aurora cluster?::**Falso.** São coisas **diferentes**

Verdadeiro ou falso: read replica é um backup?::**Falso.** É cópia **assíncrona** para leitura (promovível como DR)

Verdadeiro ou falso: Aurora Serverless v2 sempre pausa automaticamente?::**Falso.** Só se o mínimo for **0 ACU**; com 0,5 ACU fica sempre ligado

Verdadeiro ou falso: Aurora Global Database é multi-master?::**Falso.** **1 primária** escrevendo + até **10 secundárias** só leitura; escrita na secundária só via **write forwarding**

Verdadeiro ou falso: Aurora Global Database tem RPO 0 em caso de falha?::**Falso.** Em falha, RPO de **segundos**; RPO 0 só no **switchover planejado**

Verdadeiro ou falso: GSI pode fazer leitura forte?::**Falso.** GSI só tem **consistência eventual**; **LSI** faz leitura forte

Verdadeiro ou falso: GSI consome a capacidade da tabela?::**Falso.** GSI tem **capacidade própria**; LSI consome a da tabela base

Verdadeiro ou falso: GSI devolve atributo não projetado?::**Falso.** Só devolve o que foi **projetado**; LSI busca o resto na tabela

Verdadeiro ou falso: DAX acelera leitura forte?::**Falso.** Leitura forte **passa direto** para o DynamoDB e não é cacheada

Verdadeiro ou falso: o TTL do DynamoDB apaga o item na hora?::**Falso.** Apaga **em poucos dias** após expirar; itens expirados ainda aparecem em Scan/Query

Verdadeiro ou falso: PITR restaura a tabela no lugar?::**Falso.** Sempre restaura para uma **tabela nova**

Verdadeiro ou falso: ElastiCache Redis é o mesmo que Memcached?::**Falso.** **Redis**: replicação, persistência, HA, estruturas de dados. **Memcached**: multithread, simples, sem replicação

Verdadeiro ou falso: Redshift é para OLTP?::**Falso.** É **OLAP**; para OLTP, RDS/Aurora/DynamoDB

Verdadeiro ou falso: Athena e Redshift Spectrum são a mesma coisa?::**Falso.** Athena é **independente e serverless**; Spectrum é **feature do Redshift** (precisa de cluster ou Serverless)

Verdadeiro ou falso: RDS Proxy funciona com read replica?::**Falso.** Só se associa à instância de **escrita**

## 8. Mensageria

Verdadeiro ou falso: SQS garante ordem?::**Falso.** Standard é **at-least-once**, pode duplicar e desordenar; ordem = **FIFO**

Verdadeiro ou falso: SQS entrega cada mensagem para vários consumidores?::**Falso.** **Um consumidor** processa cada mensagem; para N, **SNS → várias SQS** (fan-out)

Verdadeiro ou falso: SNS guarda a mensagem se o consumidor estiver fora?::**Falso.** SNS é **push**: tenta e desiste (ou manda para DLQ); para durabilidade, **SNS → SQS**

Verdadeiro ou falso: a DLQ do SNS pode ser qualquer coisa?::**Falso.** É uma **fila SQS** na mesma conta e região; tópico FIFO exige fila FIFO

Verdadeiro ou falso: aumentar o visibility timeout resolve mensagem duplicada?::**Falso.** Reduz reprocessamento, mas a aplicação ainda precisa ser **idempotente** em fila standard

Verdadeiro ou falso: long polling custa mais?::**Falso.** Custa **menos** (menos respostas vazias)

Verdadeiro ou falso: EventBridge sempre substitui SNS?::**Falso.** EventBridge roteia por **conteúdo do evento**; SNS é **fan-out barato** e de alto throughput para e-mail/SMS/push/HTTP

Verdadeiro ou falso: Kinesis Data Streams e Firehose são intercambiáveis?::**Falso.** Streams: tempo real, vários consumidores, **replay** (até 365 dias), shards. Firehose: entrega com buffer, **sem replay**, sem código

Verdadeiro ou falso: Step Functions Express é sempre melhor porque é mais rápido?::**Falso.** Express é **at-least-once** e dura **5 min**; passo não idempotente pede **Standard** (exactly-once, até 1 ano)

## 9. Segurança e IAM

Verdadeiro ou falso: SCP concede permissão?::**Falso.** SCP é **teto**, nunca concessão

Verdadeiro ou falso: SCP afeta a conta de gerenciamento?::**Falso.** Não afeta usuários nem roles da **conta de gerenciamento**

Verdadeiro ou falso: SCP afeta service-linked role?::**Falso.** **Não afeta** nenhuma service-linked role

Verdadeiro ou falso: uma policy de recurso sozinha resolve cross-account?::**Falso.** Precisa dos **dois lados** (identidade na conta A e recurso na conta B); exceções: **trust policy de role** e **key policy do KMS**

Verdadeiro ou falso: permissions boundary concede acesso?::**Falso.** Boundary é **interseção**, nunca concessão

Verdadeiro ou falso: deny implícito e deny explícito são iguais?::**Falso.** **Explícito** não é revertido por nada; **implícito** pode ser resolvido por policy de recurso na mesma conta

Verdadeiro ou falso: o KMS criptografa qualquer arquivo diretamente?::**Falso.** `Encrypt` aceita **4.096 bytes**; para arquivo, **envelope encryption**

Verdadeiro ou falso: a rotação do KMS recriptografa os dados?::**Falso.** Não rotaciona as data keys **nem recriptografa** dado nenhum

Verdadeiro ou falso: posso rotacionar chave assimétrica do KMS automaticamente?::**Falso.** Só **simétrica** com material gerado pela KMS

Verdadeiro ou falso: CloudHSM e KMS são equivalentes?::**Falso.** CloudHSM é **single-tenant**, **FIPS nível 3**, você gerencia usuários e a AWS não vê as chaves; KMS é gerenciado e integrado

Verdadeiro ou falso: o ACM emite certificado para usar direto numa EC2?::**Falso.** Só com **Nitro Enclaves**

Verdadeiro ou falso: certificado ACM funciona em qualquer região?::**Falso.** É **regional** e não copia; para CloudFront tem que ser **us-east-1**

Verdadeiro ou falso: GuardDuty escaneia vulnerabilidade?::**Falso.** GuardDuty detecta **ameaça/comportamento**; vulnerabilidade/CVE é **Inspector**; PII no S3 é **Macie**

Verdadeiro ou falso: Security Hub detecta ameaça?::**Falso.** Ele **agrega e avalia postura**; detecta: GuardDuty/Inspector/Macie; investiga: **Detective**

Verdadeiro ou falso: Shield Standard precisa ser contratado?::**Falso.** Vem **automaticamente e sem custo extra**

Verdadeiro ou falso: Cognito user pool dá acesso ao S3?::**Falso.** User pool **autentica** (JWT); quem troca token por credencial AWS é o **identity pool**

Verdadeiro ou falso: Secrets Manager e Parameter Store são iguais?::**Falso.** **Secrets Manager**: rotação nativa, cobrado por secret. **Parameter Store**: sem rotação, tier Standard **grátis**

Verdadeiro ou falso: rotacionar regularmente a chave de acesso do root é boa prática?::**Falso.** A doc atual diz para **não criar** access key para o root

Verdadeiro ou falso: MFA no root é só recomendação?::**Falso.** É **exigência**, com registro em até **14 dias**

Verdadeiro ou falso: um Allow de administrador destrava uma bucket policy que nega todos?::**Falso.** **Deny explícito vence**; só o **root** ou o **centralized root access** resolvem

Verdadeiro ou falso: guardar a access key criptografada no S3 resolve?::**Falso.** Continua sendo credencial de **longo prazo**; a resposta é **IAM role**

## 10. Custo

Verdadeiro ou falso: data transfer dentro da AWS é grátis?::**Falso.** Entre **AZs** e entre **regiões** é cobrado; grátis na **mesma AZ** via peering e da origem AWS **para o CloudFront**

Verdadeiro ou falso: NAT gateway é barato?::**Falso.** Cobra **por hora + por GB**; tráfego para S3/DynamoDB pode ir para o **gateway endpoint grátis**

Verdadeiro ou falso: o Cost Explorer alerta?::**Falso.** Cost Explorer **mostra e prevê**; quem alerta é o **Budgets**

Verdadeiro ou falso: o CUR serve para visualizar custos?::**Falso.** CUR é **dado bruto** num bucket para Athena/Redshift/QuickSight; visualização pronta é o **Cost Explorer**

Verdadeiro ou falso: o Compute Optimizer corrige o tamanho da instância?::**Falso.** Só **recomenda** (rightsizing)

Verdadeiro ou falso: Reserved Instance pode ser cancelada?::**Falso.** Não pode; Standard pode ser **modificada** ou **vendida no Marketplace**; Convertible pode ser **trocada**
