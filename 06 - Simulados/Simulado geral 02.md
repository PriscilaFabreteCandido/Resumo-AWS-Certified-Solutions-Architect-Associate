---
tags: [saa-c03, simulado]
gerado_por: scripts/gerar-simulados.mjs
---

# Simulado geral 02

> [!warning] Nota gerada automaticamente: não edite aqui
> Corrija a questão na nota `4 - Questoes` de origem (o link está na resposta) e rode `node scripts/gerar-simulados.mjs`.

65 questões no formato da prova, na proporção dos domínios (30% / 26% / 24% / 20%, com algumas de fundamentos). Faça de uma vez, cronometrado, e só confira as respostas no final.

> [!note] O domínio 4 (Custo) tem poucas questões próprias, então elas se repetem entre os simulados gerais.

**65 questões.** Responda de cabeça e anote a letra **antes** de abrir a resposta. Errou? Abra a **Fonte** e volte ao conteúdo daquele ponto.

---

> [!question] 1. As recomendações para uma aplicação **memory-bound** parecem agressivas demais.
> **A)** A janela é curta
> **B)** Falta o CloudWatch agent publicando a métrica de memória — o hipervisor não a expõe
> **C)** Falta habilitar detailed monitoring
> **D)** O Compute Optimizer não cobre EC2
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: sem memória nas métricas, o Optimizer decide olhando CPU.
> > **C errada**: detailed monitoring muda a **frequência** (5 → 1 min), não adiciona métricas de SO.
> >
> > Fonte: [[4 - Custo (20%)/Compute Optimizer/4 - Questoes|Compute Optimizer]]

> [!question] 2. Migrar 80 TB com link de 100 Mbps, em **duas semanas**.
> **A)** DataSync pela internet
> **B)** Snow Family (dispositivo físico)
> **C)** S3 Transfer Acceleration
> **D)** Direct Connect de 1 Gbps
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: 80 TB em 100 Mbps passa de **70 dias**. Link insuficiente é o gatilho do dispositivo físico.
> > **A errada**: o DataSync é limitado pelo link.
> > **C errada**: acelera, mas não cria banda.
> > **D errada**: provisionar DX leva semanas, e depois ainda levaria ~8 dias.
> > ⚠️ O suporte ao Snowball encerra em **31/12/2026** — mas o cenário "link insuficiente + prazo curto" continua apontando Snow Family na prova.
> >
> > Fonte: [[3 - Performance (24%)/DataSync/4 - Questoes|DataSync]]

> [!question] 3. Distribuir a mesma baseline (Config, CloudTrail, roles) para 40 contas e 3 regiões, com contas novas recebendo automaticamente.
> **A)** Executar o template em cada conta
> **B)** CloudFormation StackSets com alvo em OUs da organização
> **C)** Service Catalog
> **D)** SCP
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: StackSets aplica a mesma stack a N contas e regiões, com *automatic deployment* para contas novas da OU.
> > **C errada**: Service Catalog publica produtos para os **times lançarem**; não aplica baseline por cima.
> > **D errada**: SCP nega ações; não cria recursos.
> >
> > Fonte: [[2 - Resiliencia (26%)/CloudFormation/4 - Questoes|CloudFormation]]

> [!question] 4. A equipe quer custo **previsível** para o Athena, em vez de pagar por TB.
> **A)** Workgroups
> **B)** Capacity Reservations (US$ 0,30 por DPU-hora)
> **C)** Query result reuse
> **D)** Partition projection
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: reserva capacidade dedicada, cobrada por DPU-hora em vez de por TB escaneado.
> >
> > Fonte: [[3 - Performance (24%)/Athena/4 - Questoes|Athena]]

> [!question] 5. "Quem baixou aquele objeto do S3 no mês passado?" O CloudTrail não mostra nada. Por quê?
> **A)** O event history só guarda 7 dias
> **B)** `GetObject` é data event, e data events não são gravados por padrão
> **C)** Falta habilitar o AWS Config
> **D)** O bucket está em outra região
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: data events precisam ser habilitados **antes** do fato, e são cobrados.
> > **A errada**: o event history guarda **90 dias** — mas só de management events.
> >
> > Fonte: [[1 - Seguranca (30%)/CloudTrail/4 - Questoes|CloudTrail]]

> [!question] 6. Instâncias privadas iniciam HTTPS para a internet, mas as respostas não chegam. A NACL tem só uma regra outbound TCP 443. O que falta?
> **A)** Mudar o security group para stateful
> **B)** Regra inbound na NACL liberando as portas efêmeras (1024-65535)
> **C)** Rota para o internet gateway
> **D)** Elastic IP nas instâncias
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: NACL é **stateless** — *"responses to that traffic are not automatically allowed"* (as respostas a esse tráfego não são permitidas automaticamente). A resposta volta para uma porta efêmera da instância, não para a 443.
> > **A errada**: SG **já é** stateful.
> > **C errada**: o enunciado diz que as conexões **saem**, então a rota existe (via NAT).
> > **D errada**: instância privada não leva EIP; a saída é pelo NAT gateway.
> >
> > Fonte: [[1 - Seguranca (30%)/VPC/4 - Questoes|VPC]]

> [!question] 7. O time de rede deve governar a topologia, mas cada conta anexa a sua própria VPC.
> **A)** Um TGW por conta, com peering
> **B)** TGW criado na conta de rede e compartilhado via AWS RAM
> **C)** VPC sharing via RAM
> **D)** PrivateLink
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: governança central da topologia e das route tables, com autonomia de VPC por conta.
> > **C errada**: VPC sharing compartilha **subnets** — resposta para "não criar uma VPC por conta", não para "conectar VPCs separadas".
> >
> > Fonte: [[3 - Performance (24%)/Transit Gateway/4 - Questoes|Transit Gateway]]

> [!question] 8. Um worker processa mensagens de uma fila continuamente, com execuções que levam até 40 minutos.
> **A)** Lambda com event source mapping
> **B)** Fargate service, escalando pela profundidade da fila
> **C)** Lambda com provisioned concurrency
> **D)** Step Functions Express
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: duração acima dos 15 min do Lambda, e processo contínuo é caso de **service** em Fargate.
> > **D errada**: Express dura **5 minutos**.
> >
> > Fonte: [[2 - Resiliencia (26%)/Fargate/4 - Questoes|Fargate]]

> [!question] 9. Uma aplicação Java usa JCE para falar com um HSM on-premises e será migrada para a AWS com mínima alteração de código.
> **A)** Reescrever para a API do KMS
> **B)** AWS CloudHSM, que expõe PKCS #11, JCE, CNG e KSP
> **C)** Secrets Manager
> **D)** KMS com envelope encryption
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: a doc diz que cargas com essas interfaces *"can migrate to AWS CloudHSM with fewer changes"* (consegue migrar para o AWS CloudHSM com menos alterações).
> > **A e D erradas**: exigem reescrever a camada de criptografia.
> >
> > Fonte: [[1 - Seguranca (30%)/CloudHSM/4 - Questoes|CloudHSM]]

> [!question] 10. Instâncias privadas iniciam HTTPS para a internet, mas as respostas não chegam. A NACL tem só `outbound ALLOW TCP 443`. O que falta?
> **A)** Mudar o SG para stateful
> **B)** `inbound ALLOW TCP 1024-65535`
> **C)** Rota para o internet gateway
> **D)** Elastic IP nas instâncias
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: NACL é stateless — *"responses to that traffic are not automatically allowed"* (as respostas a esse tráfego não são permitidas automaticamente). A resposta HTTPS volta para uma **porta efêmera** da instância.
> > **A errada**: SG **já é** stateful.
> > **C errada**: o enunciado diz que as conexões **saem**, então a rota existe.
> > **D errada**: instância privada não usa EIP.
> >
> > Fonte: [[1 - Seguranca (30%)/NACL (Network ACL)/4 - Questoes|NACL (Network ACL)]]

> [!question] 11. A empresa comprou Savings Plans e quer saber se está usando o que comprometeu.
> **A)** Cost Explorer
> **B)** AWS Budgets do tipo Savings Plans utilization (e coverage)
> **C)** Compute Optimizer
> **D)** CUR
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: são dois dos **6 tipos** de budget, feitos exatamente para monitorar eficiência do compromisso.
> > **A errada**: o Cost Explorer **mostra** a utilização, mas não **alerta**.
> >
> > Fonte: [[4 - Custo (20%)/Ferramentas de custo (Cost Explorer, Budgets, CUR)/4 - Questoes|Ferramentas de custo (Cost Explorer, Budgets, CUR)]]

> [!question] 12. Detectar, em 30 contas, qualquer security group que libere a porta 22 para `0.0.0.0/0`, e corrigir automaticamente.
> **A)** SCP negando `ec2:AuthorizeSecurityGroupIngress`
> **B)** Config rule (`restricted-ssh`) com remediação automática, com aggregator nas 30 contas
> **C)** GuardDuty
> **D)** Security Hub com controles habilitados
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o enunciado pede **detectar e corrigir** — é a função de Config rule + remediation.
> > **A errada**: SCP **preveniria**, mas bloquearia todo uso legítimo da API.
> > **C errada**: GuardDuty detecta **ameaça**, não desvio de configuração.
> > **D errada**: Security Hub **mostraria** o achado (ele roda controles via Config), mas a remediação configurada é do **Config**.
> >
> > Fonte: [[1 - Seguranca (30%)/Config/4 - Questoes|Config]]

> [!question] 13. Um consumidor de fila em ASG não escala; a CPU fica em 20% e a fila acumula.
> **A)** Alarme de CPU com limite menor
> **B)** Target tracking sobre `ApproximateNumberOfMessagesVisible` (backlog por instância)
> **C)** Detailed monitoring
> **D)** Composite alarm
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: a métrica precisa refletir o **trabalho pendente**.
> >
> > Fonte: [[2 - Resiliencia (26%)/CloudWatch/4 - Questoes|CloudWatch]]

> [!question] 14. Compartilhar um portfólio do Service Catalog com outras 10 contas da organização.
> **A)** Copiar os templates para cada conta
> **B)** Compartilhar o portfólio via AWS RAM
> **C)** SCP permitindo acesso
> **D)** Bucket S3 com os templates
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: portfólios do Service Catalog estão entre os recursos compartilháveis pelo RAM.
> >
> > Fonte: [[1 - Seguranca (30%)/Governanca (Artifact, Trusted Advisor, Service Catalog)/4 - Questoes|Governanca (Artifact, Trusted Advisor, Service Catalog)]]

> [!question] 15. A empresa roda Kubernetes no datacenter e quer migrar para a AWS mantendo os manifestos e as ferramentas (Helm, operators).
> **A)** ECS com Fargate
> **B)** Amazon EKS
> **C)** EC2 com Docker Compose
> **D)** Lambda com imagens de container
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é o único que fala a **API do Kubernetes** — manifestos e ecossistema funcionam sem reescrever.
> > **A errada**: ECS tem modelo próprio (task/service); exigiria converter tudo.
> >
> > Fonte: [[2 - Resiliencia (26%)/EKS/4 - Questoes|EKS]]

> [!question] 16. Um catálogo de produtos no DynamoDB precisa de busca por texto livre, com relevância e autocomplete.
> **A)** Scan com FilterExpression
> **B)** GSI com o nome do produto como chave
> **C)** DynamoDB Streams → Lambda → OpenSearch Service, com a busca no OpenSearch
> **D)** Athena sobre um export do DynamoDB
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: busca textual com relevância exige **índice invertido**. O padrão é manter o DynamoDB como fonte de verdade e materializar o índice de busca.
> > **A errada**: Scan lê tudo e você paga por tudo; e não faz relevância.
> > **B errada**: GSI casa valor **exato** ou prefixo via sort key — não faz busca textual.
> > **D errada**: Athena é analítico em lote, não busca interativa.
> >
> > Fonte: [[3 - Performance (24%)/OpenSearch Service/4 - Questoes|OpenSearch Service]]

> [!question] 17. Uma aplicação em EC2 precisa de certificado TLS gerenciado pela AWS. É possível?
> **A)** Sim, anexando o certificado ACM à instância
> **B)** Só com AWS Nitro Enclaves; o padrão é encerrar o TLS num ALB/NLB/CloudFront com certificado ACM
> **C)** Sim, via Systems Manager
> **D)** Não, de forma alguma
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"Associating an ACM-managed certificate directly with an Amazon EC2 instance requires a Nitro Enclave."* (associar um certificado gerenciado pelo ACM diretamente a uma instância EC2 exige um Nitro Enclave) O desenho normal é terminar TLS no balanceador.
> > **D errada**: é possível, com Nitro Enclaves (ou ACME para certificado público no servidor).
> >
> > Fonte: [[1 - Seguranca (30%)/ACM (Certificate Manager)/4 - Questoes|ACM (Certificate Manager)]]

> [!question] 18. Uma plataforma de petróleo precisa processar dados localmente, sem conectividade confiável, de forma permanente.
> **A)** Snowball Edge Compute Optimized
> **B)** AWS Outposts
> **C)** Snowcone
> **D)** DataSync
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: a própria doc aponta: *"For edge computing, explore AWS Outposts."* (para computação na borda, considere o AWS Outposts) E o suporte ao Snowball encerra em **31/12/2026** — não serve para necessidade **permanente**.
> >
> > Fonte: [[4 - Custo (20%)/Snow Family/4 - Questoes|Snow Family]]

> [!question] 19. Um job **Spark** customizado processa 50 TB por noite. Como reduzir o custo ao máximo?
> **A)** Cluster long-running com Reserved Instances
> **B)** Cluster transiente, com EMRFS no S3, master e core em On-Demand e task nodes em Spot
> **C)** Migrar para Glue
> **D)** Todos os nós em Spot
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: cluster transiente paga só o processamento; Spot nos **task nodes** dá *"as low as a tenth of on-demand pricing"* (até um décimo do preço sob demanda) sem arriscar o HDFS nem o master.
> > **A errada**: paga 24/7 para um job noturno.
> > **C errada**: o enunciado diz **código Spark customizado** — critério da doc para EMR.
> > **D errada**: perder o **master** derruba o cluster; perder **core** arrisca o HDFS.
> >
> > Fonte: [[3 - Performance (24%)/EMR/4 - Questoes|EMR]]

> [!question] 20. Um ASG com spread placement group em 2 AZs não escala além de 14 instâncias.
> **A)** A cota de vCPU foi atingida
> **B)** O spread suporta no máximo 7 instâncias por AZ (2 AZs = 14)
> **C)** Falta habilitar cross-zone
> **D)** O launch template está errado
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"it supports a maximum of seven running instances in each Availability Zone"* (suporta no máximo sete instâncias em execução em cada Zona de Disponibilidade).
> >
> > Fonte: [[3 - Performance (24%)/Placement Groups/4 - Questoes|Placement Groups]]

> [!question] 21. Alertar quando o **uso de memória** de instâncias EC2 passar de 85%.
> **A)** Criar alarme na métrica `MemoryUtilization`
> **B)** Instalar o CloudWatch agent para publicar a métrica de memória, e criar o alarme sobre ela
> **C)** Habilitar detailed monitoring
> **D)** Usar o Compute Optimizer
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: memória e disco são métricas **de dentro do SO** — o hipervisor não as expõe.
> > **A errada**: essa métrica não existe por padrão.
> > **C errada**: detailed monitoring muda a **frequência** (5 min → 1 min), não adiciona métricas de SO.
> > **D errada**: Compute Optimizer recomenda rightsizing; não gera alarme operacional.
> >
> > Fonte: [[2 - Resiliencia (26%)/CloudWatch/4 - Questoes|CloudWatch]]

> [!question] 22. Um cluster de containers em **Fargate** roda estável 24/7. Como reduzir o custo?
> **A)** Reserved Instances
> **B)** Compute Savings Plans
> **C)** Fargate Spot para toda a carga
> **D)** Reduzir a memória das tasks
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: Compute SP cobre *"Fargate and Lambda usage"* (uso de Fargate e Lambda).
> > **A errada**: RI é para instâncias EC2.
> > **C errada**: Spot não serve para produção que não tolera interrupção (embora parte da capacidade possa ser Spot).
> >
> > Fonte: [[4 - Custo (20%)/Opcoes de compra do EC2 (Spot, RI, Savings Plans)/4 - Questoes|Opcoes de compra do EC2 (Spot, RI, Savings Plans)]]

> [!question] 23. A política manda rotacionar as chaves anualmente. Após habilitar a rotação automática, o que acontece com os dados já criptografados?
> **A)** Ficam inacessíveis até serem recriptografados
> **B)** São recriptografados automaticamente pela KMS
> **C)** Nada: a KMS mantém as versões antigas e usa a correta no decrypt
> **D)** Precisam ser migrados para uma chave nova
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: *"Key rotation has no effect on the data that the KMS key protects"* (a rotação de chave não tem efeito sobre os dados que a chave do KMS protege) e *"AWS KMS uses the same version of the key material that was used to encrypt it."* (o AWS KMS usa a mesma versão do material de chave que foi usada para criptografar)
> >
> > Fonte: [[1 - Seguranca (30%)/KMS/4 - Questoes|KMS]]

> [!question] 24. Qual a diferença essencial entre Transfer Family e DataSync?
> **A)** Transfer Family é mais rápido
> **B)** Transfer Family é um endpoint para terceiros enviarem (SFTP/FTPS/FTP/AS2); DataSync é você movendo dados entre storages
> **C)** DataSync não criptografa
> **D)** Transfer Family só funciona com EFS
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o divisor é **quem inicia** a transferência e **qual protocolo**.
> > **D errada**: funciona com **S3 e EFS**.
> >
> > Fonte: [[3 - Performance (24%)/Transfer Family/4 - Questoes|Transfer Family]]

> [!question] 25. A diretoria quer ser notificada quando o gasto mensal **previsto** passar de US$ 50.000, e que novos lançamentos de EC2 sejam bloqueados nesse caso.
> **A)** Cost Explorer com relatório mensal por e-mail
> **B)** AWS Budgets com alerta em valor previsto para SNS/e-mail e budget action aplicando policy IAM
> **C)** CUR com query no Athena e alarme no CloudWatch
> **D)** SCP negando `ec2:RunInstances`
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: Budgets é a única ferramenta que alerta em **valor previsto** e tem **budget actions**.
> > **A errada**: Cost Explorer **não alerta**.
> > **C errada**: construção caseira para algo que já existe.
> > **D errada**: bloquearia **sempre**, não condicionado ao gasto.
> >
> > Fonte: [[4 - Custo (20%)/Ferramentas de custo (Cost Explorer, Budgets, CUR)/4 - Questoes|Ferramentas de custo (Cost Explorer, Budgets, CUR)]]

> [!question] 26. Com AD Connector + Identity Center, o que fica armazenado na AWS?
> **A)** Nada — o AD Connector não guarda informação na nuvem
> **B)** Metadados de usuário, grupo e participação no identity store do Identity Center; a senha, não
> **C)** Uma réplica completa do AD, incluindo hashes de senha
> **D)** Só o nome de usuário
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: são duas afirmações diferentes e as duas são oficiais. O **AD Connector** não faz cache — *"without caching any information in the cloud"* (sem fazer cache de nenhuma informação na nuvem). Mas o **Identity Center** sincroniza metadados: *"synchronize user, group, and membership information from your source directory in Active Directory to the IAM Identity Center identity store."* (sincronizar informações de usuário, grupo e participação do seu diretório de origem no Active Directory para o identity store do IAM Identity Center) A credencial é que nunca sai: *"No password information is synchronized to IAM Identity Center."* (nenhuma informação de senha é sincronizada para o IAM Identity Center)
> > **A errada**: é a leitura apressada da frase do AD Connector — vale para ele, não para o conjunto.
> >
> > Fonte: [[1 - Seguranca (30%)/Directory Service/4 - Questoes|Directory Service]]

> [!question] 27. Uma aplicação legada usa **JMS** com ActiveMQ no datacenter e será migrada sem alterar o código.
> **A)** SQS
> **B)** Amazon MQ
> **C)** Amazon MSK
> **D)** EventBridge
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: Amazon MQ é broker gerenciado de **ActiveMQ e RabbitMQ**, falando **JMS, AMQP, MQTT, STOMP e OpenWire**.
> > **A errada**: SQS tem API própria — exigiria reescrever a camada de mensageria.
> > **C errada**: MSK é **Kafka**.
> >
> > Fonte: [[2 - Resiliencia (26%)/Mensageria gerenciada (Amazon MQ e MSK)/4 - Questoes|Mensageria gerenciada (Amazon MQ e MSK)]]

> [!question] 28. A fatura do CloudWatch Logs cresce continuamente, mesmo com volume de log estável.
> **A)** Os logs estão duplicados
> **B)** A retenção dos log groups está em "Never expire" (padrão) — configure a retenção
> **C)** Falta criptografia
> **D)** Falta um subscription filter
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o padrão é nunca expirar; o acervo cresce para sempre.
> >
> > Fonte: [[2 - Resiliencia (26%)/CloudWatch/4 - Questoes|CloudWatch]]

> [!question] 29. Arquivar 20 milhões de arquivos de log de ~15 KB cada no Deep Archive. Qual o problema?
> **A)** Deep Archive não aceita objetos pequenos
> **B)** O overhead de 40 KB por objeto (32 KB Glacier + 8 KB Standard) pode custar mais que o dado; agregue antes de arquivar
> **C)** O mínimo de 180 dias não se aplica
> **D)** Falta habilitar versionamento
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: 20 M × 40 KB = 800 GB de overhead, contra 300 GB de dado. A resposta de arquitetura é **empacotar**.
> >
> > Fonte: [[3 - Performance (24%)/S3 Glacier/4 - Questoes|S3 Glacier]]

> [!question] 30. 20 TB para o S3, com link de 1 Gbps disponível e sem prazo apertado.
> **A)** Snowball Edge
> **B)** AWS DataSync
> **C)** Snowmobile
> **D)** Transfer Family
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: 20 TB em 1 Gbps cabe em ~2 dias — não há motivo para dispositivo físico, e a própria AWS aponta o DataSync para *"online transfers"* (transferências online).
> >
> > Fonte: [[4 - Custo (20%)/Snow Family/4 - Questoes|Snow Family]]

> [!question] 31. Uma mensagem de 5 MB precisa trafegar pela fila.
> **A)** Aumentar o limite da fila
> **B)** Usar a SQS Extended Client Library com S3 (até 2 GB)
> **C)** Dividir em 5 mensagens de 1 MB
> **D)** Usar SNS
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é o mecanismo oficial — ponteiro na fila, objeto no S3.
> > **A errada**: o limite não é ajustável.
> > **C errada**: funciona, mas você reimplementa reassembly e perde atomicidade.
> > ⚠️ A Extended Client Library existe **só para Java**.
> >
> > Fonte: [[2 - Resiliencia (26%)/SQS/4 - Questoes|SQS]]

> [!question] 32. Um único Direct Connect atende a produção. Como torná-lo tolerante a falhas com o **menor custo**?
> **A)** Segunda conexão DX em outro local
> **B)** Site-to-Site VPN como backup, com BGP para failover automático
> **C)** LAG com duas conexões
> **D)** Transit Gateway
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é o padrão mais econômico — a VPN assume (com banda degradada) se o DX cair.
> > **A errada**: é o desenho **mais robusto**, mas o enunciado pede **menor custo**.
> > **C errada**: LAG exige conexões *"on the same AWS device"* (no mesmo dispositivo da AWS) — não protege contra falha do dispositivo ou do local.
> >
> > Fonte: [[3 - Performance (24%)/Direct Connect/4 - Questoes|Direct Connect]]

> [!question] 33. Como garantir que **nenhum** acesso a um bucket S3 ocorra sem HTTPS?
> **A)** Habilitar SSE-KMS
> **B)** Bucket policy que nega quando `aws:SecureTransport` é `false`
> **C)** Ativar o Block Public Access
> **D)** Colocar o bucket atrás do CloudFront com HTTPS only
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é a condição global que distingue requisição HTTP de HTTPS.
> > **A errada**: SSE-KMS é **em repouso**.
> > **D errada**: ajuda para o tráfego **via CloudFront**, mas o endpoint do bucket continuaria aceitando HTTP.
> >
> > Fonte: [[9 - Fundamentos e apoio/Criptografia em repouso e em transito/4 - Questoes|Criptografia em repouso e em transito]]

> [!question] 34. Uma tabela precisa ser consultada por um atributo que **não** é a chave; hoje a aplicação faz Scan.
> **A)** Aumentar as RCUs provisionadas
> **B)** Criar um GSI com esse atributo como partition key e usar Query
> **C)** Criar um LSI
> **D)** Habilitar DAX
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: GSI permite query *"across all partitions"* (em todas as partições) por uma chave diferente — e pode ser criado numa tabela **existente**.
> > **A errada**: paga mais pelo mesmo Scan ruim.
> > **C errada**: **LSI só na criação** da tabela, e exige a **mesma** partition key.
> > **D errada**: DAX cacheia o resultado, mas não corrige o padrão de acesso — o primeiro Scan continua lendo tudo.
> >
> > Fonte: [[3 - Performance (24%)/DynamoDB/4 - Questoes|DynamoDB]]

> [!question] 35. A aplicação depende de um **appliance de hardware** que não tem equivalente na nuvem, e o contrato dele vai até 2029.
> **A)** Refactor para remover a dependência
> **B)** Retain, com Direct Connect para integrar o que já está na AWS
> **C)** Rehost
> **D)** Retire
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: **retain** é uma decisão legítima, não uma falha de planejamento. O Direct Connect (ou o Outposts) permite conviver.
> >
> > Fonte: [[9 - Fundamentos e apoio/Estrategias de migracao (7 Rs)/4 - Questoes|Estrategias de migracao (7 Rs)]]

> [!question] 36. Garantir que nem um administrador com credencial comprometida possa apagar os backups.
> **A)** SCP negando `backup:DeleteRecoveryPoint`
> **B)** Vault Lock, com os backups copiados para um vault em outra conta
> **C)** MFA obrigatório no console
> **D)** Backup em bucket S3 com versionamento
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: Vault Lock impede a exclusão *"including you"* (inclusive você), e a cópia cross-account tira o alvo do raio de ação da conta comprometida.
> > **A errada**: SCP ajuda, mas não alcança a management account e pode ser alterada por quem controla a organização.
> > **C errada**: MFA protege o login, não o recurso.
> > **D errada**: versionamento sem Object Lock ainda permite exclusão de versão.
> >
> > Fonte: [[1 - Seguranca (30%)/AWS Backup/4 - Questoes|AWS Backup]]

> [!question] 37. Uma instância tem dois security groups: um libera a porta 80 de `0.0.0.0/0`, outro não libera nada. A porta 80 está acessível?
> **A)** Não, porque o segundo SG restringe
> **B)** Sim: com vários SGs, a permissão é a união das regras
> **C)** Depende da ordem de associação
> **D)** Só se os dois liberarem
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o SG *"Evaluates all rules before deciding whether to allow traffic"* (avalia todas as regras antes de decidir se permite o tráfego), e múltiplos SGs se somam. SG não tem deny, então um SG vazio não restringe nada.
> > **C errada**: não existe ordem em SG.
> >
> > Fonte: [[1 - Seguranca (30%)/Security Groups/4 - Questoes|Security Groups]]

> [!question] 38. O requisito diz: *"o login nas contas AWS deve continuar funcionando mesmo se o enlace com o data center cair"*.
> **A)** AD Connector com duas VPNs redundantes
> **B)** AWS Managed Microsoft AD
> **C)** AD Connector com cache habilitado
> **D)** Simple AD
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o AD Connector **encaminha** tudo e não guarda cópia, então sem link não há autenticação. O Managed Microsoft AD é um AD **de verdade rodando na AWS** e sobrevive sozinho.
> > **C errada**: **não existe** cache no AD Connector — a definição é *"without caching any information in the cloud"* (sem fazer cache de nenhuma informação na nuvem).
> > **A errada**: reduz a chance de queda, mas não remove a dependência.
> >
> > Fonte: [[1 - Seguranca (30%)/Directory Service/4 - Questoes|Directory Service]]

> [!question] 39. A empresa quer reduzir custo saindo das licenças Oracle.
> **A)** Rightsizing das instâncias Oracle
> **B)** Migrar para Aurora PostgreSQL com DMS + SCT
> **C)** Reserved Instances para o RDS Oracle
> **D)** Aurora I/O-Optimized
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: eliminar a **licença comercial** costuma superar qualquer otimização de instância. O guia cita, em Task 4.3, *"Migrating database schemas and data to different locations and/or different database engines"* (migrar schemas e dados de banco para outros locais e/ou outros engines).
> > **C errada**: dá desconto, mas a licença continua.
> >
> > Fonte: [[4 - Custo (20%)/DMS (Database Migration Service)/4 - Questoes|DMS (Database Migration Service)]]

> [!question] 40. **Quatro** sistemas precisam processar cada evento de "pedido criado", de forma independente.
> **A)** Uma fila SQS lida pelos quatro
> **B)** Tópico SNS com quatro filas SQS inscritas (fan-out)
> **C)** Quatro chamadas HTTP síncronas do produtor
> **D)** Kinesis Data Streams com consumidor compartilhado
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: SQS entrega cada mensagem a **um** consumidor. Para N processadores independentes, SNS → N SQS.
> > **A errada**: os quatro competiriam pela mesma mensagem.
> > **C errada**: acoplamento total.
> > **D errada**: serve, mas com consumidor compartilhado os quatro dividem 2 MB/s por shard e se atrasam mutuamente.
> >
> > Fonte: [[2 - Resiliencia (26%)/SQS/4 - Questoes|SQS]]

> [!question] 41. Uma função não crítica está consumindo toda a cota de concorrência da conta e estrangulando a API de produção.
> **A)** Provisioned concurrency na função de produção
> **B)** Reserved concurrency: limitar a função não crítica e reservar cota para a de produção
> **C)** Aumentar a cota da conta
> **D)** Mover para outra região
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: reserved define **teto e piso** de concorrência, sem custo adicional — exatamente para isolar funções.
> > **C errada**: ajuda, mas não impede a função não crítica de consumir tudo de novo.
> >
> > Fonte: [[2 - Resiliencia (26%)/Lambda/4 - Questoes|Lambda]]

> [!question] 42. Workflow de pagamento com 6 passos, até 2 horas de duração, e **nenhum passo pode executar duas vezes**.
> **A)** Express workflow
> **B)** Standard workflow
> **C)** Lambda chamando Lambda em cadeia
> **D)** SQS FIFO com um consumidor por etapa
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: Standard é **exactly-once**, dura até **1 ano**, e a doc o recomenda explicitamente para *"processing payments"*.
> > **A errada**: Express é **at-least-once** e morre em **5 minutos** — falha nos dois requisitos.
> > **C errada**: Lambda tem teto de 15 min e você reimplementa retry, estado e observabilidade.
> > **D errada**: dá ordem e exactly-once por mensagem, mas não orquestra ramificação, retry por passo nem espera.
> >
> > Fonte: [[2 - Resiliencia (26%)/Step Functions/4 - Questoes|Step Functions]]

> [!question] 43. A aplicação guarda sessão em disco local e, ao escalar, usuários são deslogados.
> **A)** Habilitar sticky sessions no ALB
> **B)** Mover a sessão para o ElastiCache for Redis (ou DynamoDB), tornando a aplicação stateless
> **C)** Usar EFS para o diretório de sessão
> **D)** Reduzir o scale-in do ASG
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é a resposta arquitetural — stateless permite escala horizontal e substituição de instância.
> > **A errada**: sticky session mitiga, mas prejudica a distribuição e quebra quando a instância morre.
> > **C errada**: funciona tecnicamente, mas sessão em file system compartilhado é mais lento e frágil que cache em memória.
> >
> > Fonte: [[3 - Performance (24%)/ElastiCache/4 - Questoes|ElastiCache]]

> [!question] 44. Qual a capacidade usável do **Snowball Edge Storage Optimized**?
> **A)** 80 TB
> **B)** 210 TB
> **C)** 100 TB
> **D)** 28 TB
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"210 TB usable (for object and NFS data transfer)"* (210 TB utilizáveis (para transferência de objetos e NFS)).
> > **D errada**: **28 TB** é o NVMe SSD do **Compute Optimized**, dedicado às instâncias.
> >
> > Fonte: [[4 - Custo (20%)/Snow Family/4 - Questoes|Snow Family]]

> [!question] 45. Uma regra de lifecycle move para Glacier Instant Retrieval no dia 5 e para Deep Archive no dia 30. A AWS rejeita. Por quê?
> **A)** Glacier IR não transiciona para Deep Archive
> **B)** O mínimo de 90 dias do Glacier IR não foi respeitado: a transição precisa ser no dia 95 ou depois
> **C)** Deep Archive exige versionamento
> **D)** Só é permitida uma transição por regra
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: 5 + 90 = **95**. Não se transiciona antes do mínimo da classe atual.
> > **A errada**: Glacier IR **pode** ir para Glacier FR e Deep Archive.
> > **C errada**: não exige.
> > **D errada**: várias transições por regra são normais.
> >
> > Fonte: [[3 - Performance (24%)/S3/4 - Questoes|S3]]

> [!question] 46. Quem é responsável por aplicar patches de segurança no **sistema operacional** de uma instância EC2?
> **A)** AWS
> **B)** O cliente
> **C)** Compartilhado igualmente
> **D)** AWS, se a instância usar uma AMI da AWS
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: EC2 é IaaS — a AWS cuida da infraestrutura **da** nuvem (hipervisor, hardware, rede física); o SO convidado é do cliente.
> > **D errada**: a AMI ser da AWS não transfere a responsabilidade **contínua**. A AWS oferece a **ferramenta** (**SSM Patch Manager**), não o serviço de patch.
> >
> > Fonte: [[9 - Fundamentos e apoio/Responsabilidade compartilhada/4 - Questoes|Responsabilidade compartilhada]]

> [!question] 47. O consumidor em Auto Scaling não escala no pico; a CPU fica em 20% e a fila acumula.
> **A)** Instâncias com mais CPU
> **B)** Target tracking sobre o backlog da fila (`ApproximateNumberOfMessagesVisible` por instância)
> **C)** Aumentar o cooldown
> **D)** Habilitar long polling
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: a métrica tem que refletir o **trabalho pendente**, não a CPU.
> > **C errada**: cooldown maior escala **menos**.
> >
> > Fonte: [[2 - Resiliencia (26%)/SQS/4 - Questoes|SQS]]

> [!question] 48. A aplicação não pode perder conexões durante a rotação da senha. Qual configuração?
> **A)** Rotação single user, de madrugada
> **B)** Rotação alternating users, idealmente com RDS Proxy na frente
> **C)** Desabilitar a rotação
> **D)** Replicar o secret para outra região
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: alternating users mantém dois usuários válidos, então não existe instante em que a credencial antiga pare de funcionar. O RDS Proxy ainda preserva as conexões da aplicação.
> > **A errada**: reduz o impacto, mas ainda há janela.
> > **D errada**: replicação é para DR, não para rotação sem downtime.
> >
> > Fonte: [[1 - Seguranca (30%)/Secrets Manager/4 - Questoes|Secrets Manager]]

> [!question] 49. Um servidor de backup grava em fitas LTO. A empresa quer eliminar as fitas **sem trocar o software**.
> **A)** S3 File Gateway
> **B)** Tape Gateway
> **C)** AWS Backup
> **D)** DataSync para o S3 Glacier
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: apresenta uma **biblioteca de fitas virtual** ao software existente.
> > **A errada**: expõe NFS/SMB, não fitas.
> > **C errada**: AWS Backup protege recursos **da AWS**.
> > **D errada**: move arquivos; o software continuaria esperando fitas.
> >
> > Fonte: [[3 - Performance (24%)/Storage Gateway/4 - Questoes|Storage Gateway]]

> [!question] 50. Migrar 200 **servidores** (não bancos) para a AWS, lift and shift.
> **A)** DMS
> **B)** AWS Application Migration Service (MGN)
> **C)** DataSync
> **D)** Snow Family
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: DMS é para **banco de dados**; servidor inteiro é **MGN** (estratégia **rehost**).
> >
> > Fonte: [[4 - Custo (20%)/DMS (Database Migration Service)/4 - Questoes|DMS (Database Migration Service)]]

> [!question] 51. O failover por DNS está levando minutos. O requisito é segundos.
> **A)** Reduzir o TTL para 0
> **B)** AWS Global Accelerator (IP anycast, failover quase instantâneo)
> **C)** Multivalue answer
> **D)** Mais health checks
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: DNS depende de TTL e de cache do resolver. O Global Accelerator *"reacts instantly to changes in health or configuration"* (reage instantaneamente a mudanças de saúde ou configuração), e o cliente mantém o mesmo IP.
> > **A errada**: TTL baixo ajuda, mas resolvers não respeitam TTL zero de forma confiável, e aumenta muito o volume de consultas.
> >
> > Fonte: [[2 - Resiliencia (26%)/Route 53/4 - Questoes|Route 53]]

> [!question] 52. Depois de um bug no consumidor, o time precisa reprocessar as últimas 24 horas. O pipeline usa Firehose.
> **A)** Replay no Firehose
> **B)** Não é possível no Firehose: ele não armazena. Reprocessar a partir do destino (S3) ou pôr um Kinesis Data Stream antes dele
> **C)** Aumentar o buffer
> **D)** DLQ do Firehose
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o Firehose **entrega** e não guarda. O padrão para ter replay é **Data Streams → Firehose**.
> >
> > Fonte: [[3 - Performance (24%)/Kinesis Data Firehose/4 - Questoes|Kinesis Data Firehose]]

> [!question] 53. A empresa quer saber se as 400 instâncias EC2 estão superdimensionadas, com base no uso real.
> **A)** Trusted Advisor
> **B)** AWS Compute Optimizer
> **C)** Cost Explorer
> **D)** CloudWatch dashboards
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"analyzes your AWS resources' configuration and utilization metrics to provide you with rightsizing recommendations and identify idle resources."* (analisa a configuração e as métricas de uso dos seus recursos AWS para dar recomendações de dimensionamento e identificar recursos ociosos)
> > **A errada**: Trusted Advisor sinaliza instância ociosa, mas o rightsizing por utilização com recomendação de tipo é do Compute Optimizer.
> > **C errada**: Cost Explorer mostra **gasto**, não adequação de tamanho.
> >
> > Fonte: [[4 - Custo (20%)/Compute Optimizer/4 - Questoes|Compute Optimizer]]

> [!question] 54. Migrar um app que usa **RDS for SQL Server com Windows Authentication**, mantendo o AD on-premises como fonte de verdade.
> **A)** AD Connector
> **B)** Simple AD
> **C)** AWS Managed Microsoft AD com trust para o AD on-premises
> **D)** Cognito user pool federado por SAML
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: é AD real, suporta trust, e é a única opção compatível com RDS SQL Server.
> > **A errada**: *"AD Connector is not compatible with RDS SQL Server."* (o AD Connector não é compatível com o RDS SQL Server)
> > **B errada**: Simple AD também é *"not compatible with RDS SQL Server"* (não é compatível com o RDS SQL Server) e não suporta trust.
> > **D errada**: Cognito é identidade de **usuário final de app**.
> >
> > Fonte: [[1 - Seguranca (30%)/Directory Service/4 - Questoes|Directory Service]]

> [!question] 55. Auditar as chamadas de API de 40 contas numa visão única, sem que as contas possam desabilitar.
> **A)** Um trail em cada conta, com bucket próprio
> **B)** Organization trail criado na management account, gravando num bucket na conta de Log Archive
> **C)** CloudWatch cross-account observability
> **D)** Security Hub
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o organization trail não pode ser desabilitado pelas contas membro e consolida tudo num bucket.
> > **A errada**: 40 configurações para manter, e cada conta pode desligar a sua.
> > **C errada**: CloudWatch trata métricas e logs, não chamadas de API.
> > **D errada**: Security Hub agrega achados de segurança.
> >
> > Fonte: [[1 - Seguranca (30%)/CloudTrail/4 - Questoes|CloudTrail]]

> [!question] 56. Um time precisa que cada desenvolvedor veja apenas os recursos do seu próprio projeto, sem criar um permission set por projeto.
> **A)** Um permission set por time
> **B)** ABAC: propagar o atributo de projeto como tag de sessão e usar `aws:PrincipalTag` nas políticas
> **C)** Uma conta AWS por projeto
> **D)** SCP por OU
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é a skill *"Designing a flexible authorization model"* (projetar um modelo de autorização flexível) — um permission set atende N times.
> > **A errada**: é o que o enunciado quer evitar.
> > **C errada**: funciona (isolamento forte), mas é desproporcional se o requisito é só visibilidade por projeto.
> >
> > Fonte: [[1 - Seguranca (30%)/IAM Identity Center/4 - Questoes|IAM Identity Center]]

> [!question] 57. Q-lc 3. Uma regra manda objetos para **Glacier Instant Retrieval no dia 4** e para **Deep Archive no dia 20**. O que acontece?
> **A)** Funciona normalmente
> **B)** A regra é inválida: Glacier IR tem mínimo de 90 dias, então a transição para Deep Archive tem de ser no dia 94 ou depois
> **C)** Funciona, mas cobra o dobro
> **D)** O objeto fica preso em Glacier IR
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é o exemplo literal da doc — *"In this case the S3 Glacier Deep Archive transition must occur after at least 94 days."* (nesse caso, a transição para o S3 Glacier Deep Archive precisa ocorrer depois de pelo menos 94 dias)
> > 💡 A doc acrescenta uma saída: *"You can specify two rules to accomplish this, but you pay the minimum duration storage charges."* (você pode usar duas regras para conseguir isso, mas paga as cobranças de duração mínima de armazenamento)
> >
> > Fonte: [[3 - Performance (24%)/S3/4 - Questoes|S3]]

> [!question] 58. Ambientes de desenvolvimento rodam 24/7 em on-demand, mas são usados de 8h às 19h em dias úteis.
> **A)** Reserved Instances de 1 ano
> **B)** Parar as instâncias fora do horário (scheduled scaling / automação)
> **C)** Migrar para Spot
> **D)** Reduzir o tamanho das instâncias
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: de 168 h/semana para ~55 h corta mais de 65%, sem compromisso e sem risco.
> > **A errada**: comprometer-se 24/7 com algo usado 1/3 do tempo **aumenta** o desperdício.
> > **C errada**: Spot é opção válida para dev, mas sem desligar você continua pagando 24/7.
> >
> > Fonte: [[4 - Custo (20%)/Opcoes de compra do EC2 (Spot, RI, Savings Plans)/4 - Questoes|Opcoes de compra do EC2 (Spot, RI, Savings Plans)]]

> [!question] 59. A empresa quer **aproveitar ao máximo os recursos nativos da nuvem**, com **escala para zero** fora do horário comercial, e **aceita reescrever** a aplicação.
> **A)** Rehost
> **B)** Replatform para Elastic Beanstalk
> **C)** Refactor para Lambda + API Gateway + DynamoDB
> **D)** Relocate para VMware Cloud on AWS
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: *"máximo dos recursos nativos"* + *"escala para zero"* + *"aceita reescrever"* = **refactor**. É o único R que entrega custo **por invocação**.
> > **B errada**: Beanstalk reduz operação, mas as instâncias continuam ligadas.
> >
> > Fonte: [[9 - Fundamentos e apoio/Estrategias de migracao (7 Rs)/4 - Questoes|Estrategias de migracao (7 Rs)]]

> [!question] 60. Um agente de coleta de logs precisa rodar em **todos** os nós do cluster, que hoje usa apenas Fargate.
> **A)** DaemonSet no Fargate
> **B)** Adicionar um managed node group (EC2) — o Fargate não suporta DaemonSet
> **C)** CronJob
> **D)** Sidecar em cada pod
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o Fargate no EKS **não suporta DaemonSet**.
> > **D errada**: é a alternativa real em Fargate (sidecar por pod), mas o enunciado pede *"em todos os nós"* — o que só faz sentido com nós EC2.
> >
> > Fonte: [[2 - Resiliencia (26%)/EKS/4 - Questoes|EKS]]

> [!question] 61. Painel único em 60 contas, medindo aderência a CIS e PCI DSS.
> **A)** GuardDuty com conta administradora
> **B)** AWS Security Hub com os padrões habilitados, administrado via Organizations
> **C)** AWS Config aggregator
> **D)** CloudTrail organization trail
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"helps you assess your AWS environment against security industry standards and best practices"* (ajuda a avaliar seu ambiente AWS em relação a padrões e boas práticas de segurança do setor), com modelo administrador/membro.
> > **A errada**: GuardDuty detecta ameaça; não avalia padrões de conformidade.
> > **C errada**: Config aggregator dá visão multi-conta de **configuração e regras**, mas não agrega achados de GuardDuty/Inspector/Macie nem traz os padrões prontos.
> > **D errada**: CloudTrail registra chamadas de API.
> >
> > Fonte: [[1 - Seguranca (30%)/Security Hub/4 - Questoes|Security Hub]]

> [!question] 62. Uma instância EC2 não aparece no Session Manager. O que verificar?
> **A)** Se a porta 22 está aberta no security group
> **B)** Se o SSM Agent está instalado, se a instance profile tem a policy do SSM, e se há rota até o serviço (NAT ou endpoints)
> **C)** Se a instância tem Elastic IP
> **D)** Se o CloudTrail está habilitado
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: são os três requisitos de um **managed node**.
> > **A errada**: o Session Manager **não** usa porta de entrada.
> >
> > Fonte: [[1 - Seguranca (30%)/Systems Manager (e Parameter Store)/4 - Questoes|Systems Manager (e Parameter Store)]]

> [!question] 63. Transações de pagamento precisam ser processadas **na ordem por cliente** e **sem duplicidade**.
> **A)** Fila standard com consumidor idempotente
> **B)** Fila FIFO com `MessageGroupId` = ID do cliente
> **C)** Kinesis com partition key do cliente
> **D)** Fila standard com visibility timeout alto
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: FIFO garante *exactly-once* e ordem **dentro do grupo**; o ID do cliente preserva a ordem por cliente e permite paralelismo entre clientes.
> > **A e D erradas**: standard não garante ordem.
> > **C errada**: Kinesis preserva ordem por shard, mas é *at-least-once*.
> >
> > Fonte: [[2 - Resiliencia (26%)/SQS/4 - Questoes|SQS]]

> [!question] 64. Migrar MySQL on-premises para **Aurora MySQL** com downtime mínimo.
> **A)** DMS + AWS SCT
> **B)** DMS com full load + replicação contínua
> **C)** Snapshot e restore
> **D)** DataSync
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é **homogênea** — o schema é compatível, então o DMS sozinho resolve.
> > **A errada**: a conversão de schema é desnecessária (e é esforço a mais).
> > **D errada**: DataSync move **arquivos**, não replica banco.
> >
> > Fonte: [[4 - Custo (20%)/DMS (Database Migration Service)/4 - Questoes|DMS (Database Migration Service)]]

> [!question] 65. Requisito de compliance: usuários da União Europeia devem ser atendidos **sempre** pela região de Frankfurt.
> **A)** Latency-based routing
> **B)** Geolocation routing
> **C)** Geoproximity com bias
> **D)** Weighted routing
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: geolocation roteia *"based on the location of your users"* (com base na localização dos seus usuários) — é a política para requisito legal/regulatório.
> > **A errada**: latência pode mandar um usuário europeu para outra região.
> > **C errada**: geoproximity parte da localização dos **recursos** e serve para **deslocar** carga, não para garantir origem.
> >
> > Fonte: [[2 - Resiliencia (26%)/Route 53/4 - Questoes|Route 53]]
