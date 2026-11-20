---
tags: [saa-c03, simulado]
gerado_por: scripts/gerar-simulados.mjs
---

# Simulado — Dominio 2 (Resiliencia)

> [!warning] Nota gerada automaticamente: não edite aqui
> Corrija a questão na nota `4 - Questoes` de origem (o link está na resposta) e rode `node scripts/gerar-simulados.mjs`.

Todas as questões do domínio, misturando os serviços. O nome do serviço só aparece depois da resposta.

**114 questões.** Responda de cabeça e anote a letra **antes** de abrir a resposta. Errou? Abra a **Fonte** e volte ao conteúdo daquele ponto.

---

> [!question] 1. Limitar cada parceiro a 10.000 chamadas por dia, com tiers diferentes.
> **A)** WAF com rate-based rule
> **B)** Usage plans com API keys na REST API
> **C)** Throttling por stage
> **D)** Lambda authorizer contando no DynamoDB
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: usage plan dá **quota por período** e throttle por **API key** — medição por cliente.
> > **A errada**: rate-based rule limita por IP, em janela de 1 ou 5 min; não dá quota diária por parceiro.
> > **C errada**: throttle de stage é global.
> > **D errada**: reinventa o recurso nativo.
> >
> > Fonte: [[2 - Resiliencia (26%)/API Gateway/4 - Questoes|API Gateway]]

> [!question] 2. Rodar containers em produção com o **menor esforço operacional**, sem gerenciar instâncias, e o time não usa Kubernetes.
> **A)** EKS com managed node groups
> **B)** ECS com Fargate
> **C)** ECS no EC2 com Auto Scaling group
> **D)** EC2 com Docker e scripts de deploy
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: ECS é o orquestrador mais simples na AWS e o Fargate elimina o gerenciamento de servidor.
> > **A errada**: traz o plano de controle Kubernetes para operar, sem que o time precise.
> > **C errada**: você volta a gerenciar AMI, patch e capacidade.
> > **D errada**: pior esforço operacional possível.
> >
> > Fonte: [[2 - Resiliencia (26%)/Fargate/4 - Questoes|Fargate]]

> [!question] 3. Uma função Lambda com alta concorrência esgota as conexões do banco.
> **A)** Aumentar `max_connections` no parameter group
> **B)** RDS Proxy entre a Lambda e o banco
> **C)** Adicionar read replicas
> **D)** Reserved concurrency na Lambda
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o proxy faz *"pool and share database connections"* (agrupar e compartilhar conexões de banco) e faz load shedding no excesso.
> > **A errada**: empurra o problema; conexões consomem memória do banco.
> > **C errada**: ajuda em leitura, não no esgotamento de conexões de escrita.
> > **D errada**: estrangula a aplicação em vez de resolver.
> >
> > Fonte: [[2 - Resiliencia (26%)/RDS/4 - Questoes|RDS]]

> [!question] 4. Um tópico publica 50 tipos de evento, e cada consumidor só quer alguns. Como evitar criar 50 tópicos?
> **A)** Filtrar no consumidor, descartando o que não interessa
> **B)** Filter policy em cada subscription
> **C)** Criar um tópico por consumidor
> **D)** Usar EventBridge
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: message filtering existe para isso — por atributos ou pelo corpo.
> > **A errada**: o consumidor paga (em requisições e processamento) por tudo que não interessa.
> > **D errada**: EventBridge também roteia por conteúdo e é resposta válida em outros cenários; aqui, o recurso nativo do SNS resolve sem mudar de serviço.
> >
> > Fonte: [[2 - Resiliencia (26%)/SNS/4 - Questoes|SNS]]

> [!question] 5. Um processamento de pedidos perde requisições no pico porque o backend não acompanha.
> **A)** Aumentar o tipo de instância do backend
> **B)** Colocar uma fila SQS entre o front-end e o backend, e escalar o backend pela profundidade da fila
> **C)** Adicionar um ALB na frente do backend
> **D)** Habilitar cache no CloudFront
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: a fila **absorve o pico** e desacopla produtor de consumidor.
> > **A errada**: escala vertical tem teto.
> > **C errada**: ALB distribui, mas não **armazena** requisição.
> > **D errada**: cache não ajuda em **escrita**.
> >
> > Fonte: [[2 - Resiliencia (26%)/SQS/4 - Questoes|SQS]]

> [!question] 6. Reduzir o custo de um cluster de containers com carga **estável 24/7**, sem voltar para EC2 gerenciado.
> **A)** Fargate Spot para toda a carga
> **B)** Compute Savings Plans, que cobrem Fargate
> **C)** Reserved Instances
> **D)** Reduzir a memória das tasks pela metade
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: Compute Savings Plans *"covers Fargate and Lambda usage"* (cobre o uso de Fargate e Lambda) — desconto sem mudar a arquitetura.
> > **A errada**: Spot não serve para produção que não tolera interrupção (embora uma **parte** da capacidade possa ser Spot).
> > **C errada**: RI é para instâncias EC2.
> > **D errada**: pode degradar a aplicação.
> >
> > Fonte: [[2 - Resiliencia (26%)/Fargate/4 - Questoes|Fargate]]

> [!question] 7. `exemplo.com` (ápice) precisa apontar para uma distribuição CloudFront.
> **A)** Registro CNAME para o domínio do CloudFront
> **B)** Registro alias de tipo A apontando para a distribuição
> **C)** Registro A com o IP da distribuição
> **D)** Registro NS delegando para o CloudFront
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: alias é o único que funciona no **ápice** — *"you can create an alias record at the top node of a DNS namespace"* (você pode criar um registro de alias no nó raiz de um namespace DNS) — e não é cobrado.
> > **A errada**: *"You can't create a CNAME record that has the same name as the hosted zone."* (não é possível criar um registro CNAME com o mesmo nome da hosted zone)
> > **C errada**: CloudFront não publica IP fixo.
> >
> > Fonte: [[2 - Resiliencia (26%)/Route 53/4 - Questoes|Route 53]]

> [!question] 8. Mensagens estão sendo processadas duas vezes. O processamento leva ~90 s e a fila é standard com configuração padrão.
> **A)** Fila standard sempre duplica; migrar para FIFO
> **B)** O visibility timeout de 30 s expira antes do fim do processamento; aumentar o timeout (ou estendê-lo com `ChangeMessageVisibility`)
> **C)** Falta habilitar long polling
> **D)** Falta uma DLQ
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: com 30 s de timeout e 90 s de processamento, a mensagem reaparece no meio do trabalho.
> > **A errada**: standard **pode** duplicar, mas o enunciado descreve o sintoma de timeout curto; migrar para FIFO limitaria a 300 TPS sem necessidade.
> > **C errada**: long polling afeta respostas vazias e custo.
> > **D errada**: DLQ trata falha repetida, não reprocessamento por timeout.
> >
> > Fonte: [[2 - Resiliencia (26%)/SQS/4 - Questoes|SQS]]

> [!question] 9. É preciso filtrar traces por `tenant_id` para investigar a lentidão de um cliente específico.
> **A)** Gravar o `tenant_id` em metadata
> **B)** Gravar o `tenant_id` em annotation
> **C)** Usar um log group por tenant
> **D)** Criar um trace ID customizado
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: **annotations são indexadas** e permitem filtrar traces; metadata não.
> >
> > Fonte: [[2 - Resiliencia (26%)/X-Ray/4 - Questoes|X-Ray]]

> [!question] 10. O consumidor de fila em ASG não escala no pico; a CPU fica em 20% e a fila acumula.
> **A)** Instâncias com mais CPU
> **B)** Target tracking sobre o backlog da fila (mensagens visíveis por instância)
> **C)** Aumentar o cooldown
> **D)** Habilitar long polling
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: a métrica precisa refletir o **trabalho pendente**. CPU baixa com fila cheia é o sintoma de métrica errada.
> > **C errada**: cooldown maior escala **menos**.
> >
> > Fonte: [[2 - Resiliencia (26%)/Auto Scaling (EC2)/4 - Questoes|Auto Scaling (EC2)]]

> [!question] 11. Um agente de coleta de logs precisa rodar em **todos** os nós do cluster, que hoje usa apenas Fargate.
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

> [!question] 12. Uma função não crítica está consumindo toda a cota de concorrência da conta e estrangulando a API de produção.
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

> [!question] 13. Um worker de SQS em ECS não escala no pico; a CPU fica baixa e a fila acumula.
> **A)** Aumentar a memória da task
> **B)** Service Auto Scaling com target tracking sobre a profundidade da fila (custom metric)
> **C)** Mudar para EC2
> **D)** Aumentar o desired count fixo
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: a métrica precisa refletir o **trabalho pendente**, não a CPU.
> > **D errada**: paga capacidade de pico o tempo todo.
> >
> > Fonte: [[2 - Resiliencia (26%)/ECS/4 - Questoes|ECS]]

> [!question] 14. Um container precisa ler um bucket S3. O que configurar?
> **A)** Access key nas variáveis de ambiente da task
> **B)** Task role com permissão de leitura no bucket
> **C)** Task execution role com permissão no bucket
> **D)** Instance profile da EC2
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: a **task role** é a credencial da aplicação.
> > **C errada**: a **task execution role** serve para o agente puxar a imagem do ECR e escrever logs.
> > **D errada**: não funciona em Fargate, e em EC2 daria a permissão a **todas** as tasks do host.
> >
> > Fonte: [[2 - Resiliencia (26%)/ECS/4 - Questoes|ECS]]

> [!question] 15. Quanto tempo leva o failover de um cluster Aurora que tem **uma única** instância?
> **A)** Menos de 30 segundos
> **B)** Menos de 60 segundos
> **C)** Menos de 10 minutos (a instância é recriada)
> **D)** Não há failover
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: sem réplica, *"the primary instance is recreated in the same AZ... typically takes less than 10 minutes"* (a instância primária é recriada na mesma AZ... normalmente leva menos de 10 minutos). Os dados estão seguros (6 cópias em 3 AZs), mas o serviço fica fora até a instância subir.
> > **D errada**: há failover — mas lento. É o argumento para ter ao menos uma réplica.
> >
> > Fonte: [[2 - Resiliencia (26%)/Aurora/4 - Questoes|Aurora]]

> [!question] 16. Uma instância RDS foi deletada e não havia snapshot manual. Os backups automáticos servem?
> **A)** Sim, ficam retidos pelo período configurado
> **B)** Não: os backups automáticos são removidos com a instância; só o snapshot manual sobrevive
> **C)** Sim, por 35 dias
> **D)** Só se era Multi-AZ
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é a distinção clássica entre backup automático e snapshot manual.
> > ⚠️ Se o recurso estivesse num **backup plan do AWS Backup**, a cópia no **vault** sobreviveria — razão para centralizar.
> >
> > Fonte: [[2 - Resiliencia (26%)/RDS/4 - Questoes|RDS]]

> [!question] 17. Mensagens da fila SQS estão sendo processadas em duplicidade pela Lambda. O processamento leva 100 s.
> **A)** Mudar para fila FIFO
> **B)** Aumentar o visibility timeout da fila para mais que o timeout da função
> **C)** Reduzir o batch size
> **D)** Habilitar provisioned concurrency
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: com visibility timeout menor que a duração, a mensagem reaparece no meio do processamento.
> > **A errada**: FIFO resolve ordem e duplicata de entrega, mas não o timeout — e limita a 300 TPS.
> >
> > Fonte: [[2 - Resiliencia (26%)/Lambda/4 - Questoes|Lambda]]

> [!question] 18. Um NLB distribui desigualmente: a AZ com 2 instâncias recebe metade do tráfego, a AZ com 8 recebe a outra metade.
> **A)** Mudar para ALB
> **B)** Habilitar cross-zone load balancing (ou equilibrar a capacidade entre AZs)
> **C)** Adicionar um target group
> **D)** Reduzir o TTL do DNS
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: no NLB, cross-zone é *"disabled by default"* — cada nó serve só a sua AZ. Habilitar distribui uniformemente (ao custo de tráfego cross-AZ).
> >
> > Fonte: [[2 - Resiliencia (26%)/ELB (Load Balancers)/4 - Questoes|ELB (Load Balancers)]]

> [!question] 19. Uma arquitetura de microsserviços está lenta, mas cada serviço mostra métricas normais no CloudWatch.
> **A)** Logs Insights consultando todos os log groups
> **B)** AWS X-Ray, com o service map identificando onde a latência se concentra
> **C)** Container Insights
> **D)** VPC Flow Logs
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: métrica agregada por serviço não segue **uma** requisição; o trace, sim.
> > **A errada**: você correlacionaria logs de N serviços à mão.
> > **C errada**: dá métrica de infraestrutura do container, não o caminho da requisição.
> >
> > Fonte: [[2 - Resiliencia (26%)/X-Ray/4 - Questoes|X-Ray]]

> [!question] 20. A empresa roda Kubernetes no datacenter e quer migrar para a AWS mantendo os manifestos e as ferramentas (Helm, operators).
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

> [!question] 21. A senha do banco não pode aparecer no template nem nos parâmetros em texto claro.
> **A)** Parâmetro com `Default` vazio
> **B)** `{{resolve:secretsmanager:...}}` (ou `NoEcho: true` com o valor fora do repositório)
> **C)** Mappings
> **D)** Outputs
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o CloudFormation resolve o segredo no deploy, sem armazená-lo no template.
> > **D errada**: `Outputs` **expõe** valores — o oposto do que se quer.
> >
> > Fonte: [[2 - Resiliencia (26%)/CloudFormation/4 - Questoes|CloudFormation]]

> [!question] 22. Um agente de monitoramento precisa rodar **em cada host** do cluster.
> **A)** Fargate com um service de 1 task
> **B)** ECS no EC2, com a estratégia `daemon`
> **C)** Fargate profile no EKS
> **D)** Lambda agendada
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: "um por host" exige acesso ao host e a estratégia **daemon**, que o Fargate não oferece.
> >
> > Fonte: [[2 - Resiliencia (26%)/Fargate/4 - Questoes|Fargate]]

> [!question] 23. O environment de produção foi apagado por engano e o banco RDS foi junto. Como evitar?
> **A)** Snapshot diário
> **B)** Criar o RDS fora do environment e passar o endpoint por variável de ambiente
> **C)** Usar Multi-AZ
> **D)** Habilitar termination protection no environment
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: RDS criado **dentro** do environment compartilha o ciclo de vida dele.
> > **A errada**: ajuda a recuperar, mas não evita.
> > **D errada**: reduz o risco de acidente, mas o acoplamento permanece.
> >
> > Fonte: [[2 - Resiliencia (26%)/Elastic Beanstalk/4 - Questoes|Elastic Beanstalk]]

> [!question] 24. Uma Lambda em VPC precisa gravar no S3 e não consegue.
> **A)** Adicionar um Elastic IP
> **B)** Criar um gateway endpoint para o S3 (ou um NAT gateway)
> **C)** Tirar a função da VPC
> **D)** Aumentar o timeout
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: função em VPC perde acesso à internet. Gateway endpoint é **grátis** e mantém o tráfego privado.
> > **C errada**: resolveria o S3, mas quebraria o acesso aos recursos privados que motivaram pôr a função na VPC.
> >
> > Fonte: [[2 - Resiliencia (26%)/Lambda/4 - Questoes|Lambda]]

> [!question] 25. Alertar quando a aplicação registrar mais de 10 erros `5xx` por minuto no log.
> **A)** Logs Insights com consulta agendada
> **B)** Metric filter no log group, gerando métrica, com alarme sobre ela
> **C)** Synthetics canary
> **D)** CloudTrail
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: metric filter transforma padrão de log em métrica, e a métrica em alarme.
> > **A errada**: Logs Insights consulta sob demanda; não é mecanismo de alarme.
> > **C errada**: canary testa de fora; não lê o log da aplicação.
> >
> > Fonte: [[2 - Resiliencia (26%)/CloudWatch/4 - Questoes|CloudWatch]]

> [!question] 26. Um cluster Aurora de desenvolvimento fica ocioso à noite e nos fins de semana. Como reduzir custo?
> **A)** Aurora Serverless v2 com mínimo 0,5 ACU
> **B)** Aurora Serverless v2 com mínimo 0 ACU (pausa automática)
> **C)** Parar o cluster manualmente
> **D)** Reduzir a instance class
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: só com mínimo **0 ACU** o cluster pausa — com 0,5 ACU ele fica sempre ligado.
> > **C errada**: funciona, mas exige automação e o storage continua cobrando; a pausa do Serverless v2 é automática.
> >
> > Fonte: [[2 - Resiliencia (26%)/Aurora/4 - Questoes|Aurora]]

> [!question] 27. A aplicação demora minutos para voltar depois de um failover do Aurora, por cache de DNS.
> **A)** Reduzir o TTL do Route 53
> **B)** RDS Proxy, que contorna o cache de DNS e preserva as conexões da aplicação
> **C)** Multi-AZ DB cluster
> **D)** Read replica promovida
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"bypasses Domain Name System (DNS) caches to reduce failover times by up to 66%"* (contorna os caches de DNS para reduzir o tempo de failover em até 66%) e *"automatically connecting to a standby DB instance while preserving application connections"* (conectando automaticamente a uma instância standby, preservando as conexões da aplicação).
> > **A errada**: o endpoint do Aurora não é gerenciado por você no Route 53, e o cache pode ser do cliente/JVM.
> >
> > Fonte: [[2 - Resiliencia (26%)/RDS Proxy/4 - Questoes|RDS Proxy]]

> [!question] 28. Um worker processa mensagens de uma fila continuamente, com execuções que levam até 40 minutos.
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

> [!question] 29. Um time tem produtores e consumidores **Kafka** e dezenas de conectores Kafka Connect.
> **A)** Kinesis Data Streams
> **B)** Amazon MSK
> **C)** Amazon MQ
> **D)** SNS com fan-out
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: roda *"open-source versions of Apache Kafka"* (versões open source do Apache Kafka), então os clientes funcionam *"without requiring changes to application code"* (sem exigir mudanças no código da aplicação) — e o **MSK Connect** roda os conectores.
> > **A errada**: Kinesis tem API própria; os conectores não funcionariam.
> >
> > Fonte: [[2 - Resiliencia (26%)/Mensageria gerenciada (Amazon MQ e MSK)/4 - Questoes|Mensageria gerenciada (Amazon MQ e MSK)]]

> [!question] 30. Um barramento recebe eventos de pedido e cada consumidor quer um subconjunto diferente, filtrando por campos **aninhados** do JSON.
> **A)** SNS com message filtering por atributo
> **B)** EventBridge com event patterns nas regras
> **C)** Uma fila SQS por consumidor, filtrando no código
> **D)** Kinesis com partition key
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o event pattern casa **campos aninhados** do evento. O filtro do SNS trabalha com message attributes (ou corpo, mas sem a mesma expressividade de padrão).
> > **C errada**: o consumidor paga por tudo que não interessa.
> >
> > Fonte: [[2 - Resiliencia (26%)/EventBridge/4 - Questoes|EventBridge]]

> [!question] 31. Um cluster Aurora de produção tem I/O representando 40% da fatura.
> **A)** Reduzir a instance class
> **B)** Mudar o cluster para Aurora I/O-Optimized
> **C)** Adicionar read replicas
> **D)** Migrar para RDS MySQL
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"best choice when your I/O spending is 25% or more"* (melhor escolha quando seu gasto com I/O é de 25% ou mais).
> > **C errada**: **adiciona** custo de compute.
> >
> > Fonte: [[2 - Resiliencia (26%)/Aurora/4 - Questoes|Aurora]]

> [!question] 32. O tráfego precisa passar por um firewall virtual de terceiro antes de chegar à aplicação.
> **A)** ALB com regras de bloqueio
> **B)** Gateway Load Balancer com GWLB endpoints, encaminhando por GENEVE na porta 6081
> **C)** NLB com TLS termination
> **D)** Network Firewall
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o GWLB existe para appliances de inspeção de terceiro.
> > **D errada**: Network Firewall é o firewall **gerenciado pela AWS** — resposta válida se o enunciado não exigir appliance de terceiro.
> >
> > Fonte: [[2 - Resiliencia (26%)/ELB (Load Balancers)/4 - Questoes|ELB (Load Balancers)]]

> [!question] 33. O time quer apontar o RDS Proxy para as read replicas, para escalar leitura.
> **A)** Criar um proxy por réplica
> **B)** Não é suportado: o proxy se associa apenas ao writer; a aplicação deve usar o reader endpoint direto
> **C)** Usar um endpoint adicional do proxy
> **D)** Habilitar read-only no proxy
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"you can associate a proxy only with the writer DB instance, not a read replica."* (você só pode associar um proxy à instância de escrita, não a uma réplica de leitura)
> >
> > Fonte: [[2 - Resiliencia (26%)/RDS Proxy/4 - Questoes|RDS Proxy]]

> [!question] 34. Quatro sistemas precisam processar cada evento de forma independente, com garantia de que nenhum perca a mensagem se estiver fora do ar.
> **A)** SNS com quatro subscriptions Lambda
> **B)** SNS com quatro filas SQS inscritas, cada sistema consumindo a sua
> **C)** Uma fila SQS lida pelos quatro
> **D)** Quatro tópicos SNS
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: a fila dá **durabilidade** (até 14 dias) e retry por consumidor. SNS sozinho não armazena.
> > **A errada**: se a Lambda falha além do retry, a mensagem é perdida (sem DLQ).
> > **C errada**: cada mensagem seria processada **uma** vez.
> > **D errada**: quatro tópicos obrigam o produtor a publicar quatro vezes.
> >
> > Fonte: [[2 - Resiliencia (26%)/SNS/4 - Questoes|SNS]]

> [!question] 35. Qual configuração dá failover automático **e** capacidade de leitura, em MySQL, com o menor tempo de indisponibilidade?
> **A)** Multi-AZ DB instance + 2 read replicas
> **B)** Multi-AZ DB cluster
> **C)** Aurora com 15 réplicas
> **D)** Read replica cross-Region promovida manualmente
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: 1 writer + 2 readers **legíveis** em 3 AZs, failover *"typically under 35 seconds"* (normalmente abaixo de 35 segundos), e menor latência de escrita.
> > **A errada**: funciona, mas o standby não lê e o tempo de failover não é documentado.
> > **C errada**: Aurora é outra arquitetura — resposta válida se o enunciado aceitar migrar, mas *"Multi-AZ DB clusters aren't the same as Aurora DB clusters"* (clusters de banco Multi-AZ não são a mesma coisa que clusters do Aurora).
> > **D errada**: promoção manual, RTO alto.
> >
> > Fonte: [[2 - Resiliencia (26%)/RDS/4 - Questoes|RDS]]

> [!question] 36. Uma função CPU-bound com 512 MB leva 10 s. Como reduzir **custo e latência**?
> **A)** Reduzir para 256 MB
> **B)** Aumentar a memória, medindo o tempo: mais CPU pode reduzir o tempo o suficiente para o custo total cair
> **C)** Provisioned concurrency
> **D)** Dividir em duas funções
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o custo é `memória × tempo`, e a CPU é proporcional à memória (1.769 MB ≈ 1 vCPU). É a skill *"the amount of Lambda memory"* (a quantidade de memória do Lambda) do guia.
> > **A errada**: menos CPU → mais tempo → possivelmente **mais** custo.
> >
> > Fonte: [[2 - Resiliencia (26%)/Lambda/4 - Questoes|Lambda]]

> [!question] 37. Antes de aplicar uma mudança, o time precisa saber se o banco será recriado.
> **A)** Drift detection
> **B)** Change set
> **C)** Stack policy
> **D)** Rollback configuration
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o change set classifica cada mudança e indica **Replacement** — o caso em que o recurso é recriado com novo ID.
> > **A errada**: drift detection compara o estado atual com o template; não prevê o efeito de uma mudança futura.
> >
> > Fonte: [[2 - Resiliencia (26%)/CloudFormation/4 - Questoes|CloudFormation]]

> [!question] 38. Qual destes está **em escopo** na SAA-C03?
> **A)** AWS CDK
> **B)** AWS CodeDeploy
> **C)** AWS X-Ray
> **D)** AWS Distro for OpenTelemetry
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: X-Ray é o único item de "Developer Tools" na lista de serviços **em escopo**; os outros três estão na lista de **fora de escopo**.
> >
> > Fonte: [[2 - Resiliencia (26%)/X-Ray/4 - Questoes|X-Ray]]

> [!question] 39. Containers na AWS, com o menor esforço operacional, e o time **não** conhece Kubernetes.
> **A)** EKS com Fargate profiles
> **B)** ECS com Fargate
> **C)** EKS Anywhere
> **D)** EKS com managed node groups
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o EKS adiciona o ciclo de vida do Kubernetes (versões, add-ons, upgrades) sem que o time precise disso.
> >
> > Fonte: [[2 - Resiliencia (26%)/EKS/4 - Questoes|EKS]]

> [!question] 40. Workflow de pagamento com 6 passos, até 2 horas de duração, e **nenhum passo pode executar duas vezes**.
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

> [!question] 41. Uma aplicação **nova** precisa de fila com buffer e retry, com escala praticamente ilimitada e menor esforço operacional.
> **A)** Amazon MQ com RabbitMQ
> **B)** Amazon SQS
> **C)** Amazon MSK Serverless
> **D)** EventBridge
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: aplicação **nova** não tem restrição de protocolo — SQS é serverless, escala sozinho e é mais barato.
> > **A errada**: MQ exige dimensionar broker e dá mais esforço operacional.
> >
> > Fonte: [[2 - Resiliencia (26%)/Mensageria gerenciada (Amazon MQ e MSK)/4 - Questoes|Mensageria gerenciada (Amazon MQ e MSK)]]

> [!question] 42. Deploy com **zero downtime** e **rollback rápido** se a versão nova falhar.
> **A)** All at once
> **B)** Rolling
> **C)** Immutable
> **D)** Rolling with additional batch
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: sobe uma fleet nova completa e só move o tráfego depois de validar; o rollback descarta a fleet nova.
> > **A errada**: tem **downtime**.
> > **B errada**: sem downtime, mas com **capacidade reduzida** e versões mistas em caso de falha no meio.
> > **D errada**: mantém a capacidade, mas o rollback ainda é um redeploy.
> > ⚠️ **Blue/green com swap de CNAME** é igualmente válido — e dá o rollback mais rápido (swap de volta).
> >
> > Fonte: [[2 - Resiliencia (26%)/Elastic Beanstalk/4 - Questoes|Elastic Beanstalk]]

> [!question] 43. Rastrear 100% das requisições de um endpoint crítico e uma fração do resto, controlando custo.
> **A)** Habilitar active tracing em todas as funções
> **B)** Configurar sampling rules específicas por URL/serviço
> **C)** Reduzir a retenção dos traces
> **D)** Usar metadata em vez de annotation
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: as sampling rules definem a taxa, e podem ser condicionadas a serviço, método e URL.
> >
> > Fonte: [[2 - Resiliencia (26%)/X-Ray/4 - Questoes|X-Ray]]

> [!question] 44. O pipeline precisa: preparar dados → processar em paralelo → agregar. A ordem deve ser respeitada.
> **A)** Três filas separadas
> **B)** Jobs com `dependsOn` no AWS Batch (ou Step Functions orquestrando)
> **C)** CloudWatch Events em cadeia
> **D)** SQS com delay
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: dependências entre jobs são nativas do Batch; Step Functions é a opção quando há ramificação e estado.
> >
> > Fonte: [[2 - Resiliencia (26%)/AWS Batch/4 - Questoes|AWS Batch]]

> [!question] 45. Uma API deve ser consumida **apenas** por aplicações dentro da VPC, sem exposição à internet.
> **A)** HTTP API regional com resource policy
> **B)** REST API com endpoint `private`, acessada por interface endpoint, com resource policy restringindo o VPC endpoint
> **C)** REST API regional atrás de um NLB interno
> **D)** HTTP API com Lambda authorizer
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o endpoint privado existe para isso, e a resource policy (com `aws:SourceVpce`) amarra o acesso.
> > **A errada**: a **HTTP API não suporta** endpoint privado nem resource policy.
> > **C errada**: o endpoint regional continua público.
> > **D errada**: authorizer autentica; não deixa a API privada.
> >
> > Fonte: [[2 - Resiliencia (26%)/API Gateway/4 - Questoes|API Gateway]]

> [!question] 46. Detectar que o site está indisponível para o usuário final, antes de receber reclamação.
> **A)** Alarme de CPU
> **B)** CloudWatch Synthetics canary
> **C)** Health check do ALB
> **D)** VPC Flow Logs
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o canary faz requisições sintéticas do **ponto de vista do usuário**.
> > **C errada**: o health check do ALB valida o target, não a experiência ponta a ponta (DNS, CDN, TLS).
> >
> > Fonte: [[2 - Resiliencia (26%)/CloudWatch/4 - Questoes|CloudWatch]]

> [!question] 47. Durante scale-in, o ASG está terminando instâncias de uma AZ que já tem menos instâncias que as outras. Possível?
> **A)** Sim, se a política for `NewestInstance`
> **B)** Não: o equilíbrio entre AZs tem precedência sobre a política de terminação
> **C)** Sim, se o cooldown estiver ativo
> **D)** Sim, sempre que houver proteção de scale-in
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"Maintaining Zonal balance takes precedence over the termination policy."* (manter o equilíbrio entre as zonas tem precedência sobre a política de encerramento)
> >
> > Fonte: [[2 - Resiliencia (26%)/Auto Scaling (EC2)/4 - Questoes|Auto Scaling (EC2)]]

> [!question] 48. Instâncias recém-lançadas estão sendo terminadas pelo ASG antes de terminar a inicialização (que leva 4 minutos).
> **A)** Mudar a política para step scaling
> **B)** Aumentar o health check grace period (e usar lifecycle hook para registrar no ELB só após o bootstrap)
> **C)** Desabilitar o ELB health check
> **D)** Aumentar o cooldown
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: grace period curto (ou 0, se o grupo foi criado via CLI) faz o ASG avaliar a instância antes de ela estar pronta.
> > **C errada**: desligaria a detecção real de falha da aplicação.
> >
> > Fonte: [[2 - Resiliencia (26%)/Auto Scaling (EC2)/4 - Questoes|Auto Scaling (EC2)]]

> [!question] 49. Garantir que a infraestrutura em produção corresponde ao template versionado.
> **A)** Change set
> **B)** Drift detection (e AWS Config para monitoramento contínuo)
> **C)** Rollback
> **D)** Nested stacks
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: drift detection encontra alterações feitas fora do CloudFormation.
> >
> > Fonte: [[2 - Resiliencia (26%)/CloudFormation/4 - Questoes|CloudFormation]]

> [!question] 50. Transações de pagamento precisam ser processadas **na ordem por cliente** e **sem duplicidade**.
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

> [!question] 51. Depois de corrigir um bug, o time precisa reprocessar os eventos do último dia.
> **A)** Reenviar manualmente da aplicação
> **B)** Archive + replay do EventBridge
> **C)** DLQ redrive
> **D)** SNS retry
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: archive e replay são capacidade nativa do EventBridge.
> > **C errada**: a DLQ só tem o que **falhou**, não todos os eventos.
> >
> > Fonte: [[2 - Resiliencia (26%)/EventBridge/4 - Questoes|EventBridge]]

> [!question] 52. RDS MySQL com CPU alta por relatórios de leitura, e o negócio exige failover automático entre AZs.
> **A)** Multi-AZ DB instance e apontar os relatórios para o standby
> **B)** Multi-AZ DB instance (HA) + read replicas (relatórios)
> **C)** Só read replicas em duas AZs
> **D)** Aumentar a instance class
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: são **dois requisitos distintos** — Multi-AZ resolve failover, read replica resolve leitura.
> > **A errada**: *"You can't use a standby replica to serve read traffic."* (não é possível usar uma réplica standby para atender tráfego de leitura) É a pegadinha central.
> > **C errada**: read replica **não** faz failover automático.
> > **D errada**: trata o sintoma, com teto e sem HA.
> > ⚠️ Se **Multi-AZ DB cluster** estiver entre as opções e o engine for MySQL/PostgreSQL, ele é a resposta mais elegante: os 2 readers atendem leitura **e** dão failover em < 35 s.
> >
> > Fonte: [[2 - Resiliencia (26%)/RDS/4 - Questoes|RDS]]

> [!question] 53. Uma API pública precisa ser protegida contra SQL injection.
> **A)** HTTP API com WAF
> **B)** REST API com uma web ACL do WAF
> **C)** Throttling por método
> **D)** Resource policy por IP
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: a lista oficial de recursos do WAF diz **"Amazon API Gateway REST API"**.
> > **A errada**: a HTTP API não é suportada pelo WAF.
> >
> > Fonte: [[2 - Resiliencia (26%)/API Gateway/4 - Questoes|API Gateway]]

> [!question] 54. Um workflow precisa subir um cluster EMR, esperar o job terminar e então seguir.
> **A)** Express com Request Response
> **B)** Standard com integração `.sync` (run a job)
> **C)** Lambda fazendo polling do estado do cluster
> **D)** EventBridge rule
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: `.sync` faz o workflow **esperar** o job terminar; e subir cluster EMR é caso não idempotente, citado na doc como motivo para Standard.
> > **C errada**: polling em Lambda consome tempo de execução e reimplementa o que o `.sync` já faz.
> >
> > Fonte: [[2 - Resiliencia (26%)/Step Functions/4 - Questoes|Step Functions]]

> [!question] 55. Criar um alarme do CloudWatch e uma fila SQS junto com o environment, versionados com o código.
> **A)** Console do Beanstalk
> **B)** Arquivos `.config` em `.ebextensions/`
> **C)** Saved configuration
> **D)** CloudFormation separado
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: `.ebextensions` permite criar recursos adicionais com sintaxe CloudFormation, versionados junto ao código.
> > **C errada**: saved configuration guarda **opções**, não recursos novos.
> >
> > Fonte: [[2 - Resiliencia (26%)/Elastic Beanstalk/4 - Questoes|Elastic Beanstalk]]

> [!question] 56. Uma aplicação legada usa **JMS** com ActiveMQ no datacenter e será migrada sem alterar o código.
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

> [!question] 57. Migrar gradualmente o tráfego do ambiente antigo para o novo, começando com 5%.
> **A)** Latency routing
> **B)** Weighted routing
> **C)** Multivalue answer
> **D)** Failover routing
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"in proportions that you specify"* (nas proporções que você especificar) — é o mecanismo de canary e migração gradual.
> >
> > Fonte: [[2 - Resiliencia (26%)/Route 53/4 - Questoes|Route 53]]

> [!question] 58. As tasks precisam de security groups diferentes entre si, na mesma subnet.
> **A)** Não é possível; o SG é da instância
> **B)** Usar network mode `awsvpc` (padrão no Fargate): cada task recebe a própria ENI e o próprio SG
> **C)** Criar um cluster por grupo de tasks
> **D)** Usar NACL por task
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: com `awsvpc`, cada task tem ENI e SG próprios.
> > **D errada**: NACL é por **subnet**.
> >
> > Fonte: [[2 - Resiliencia (26%)/ECS/4 - Questoes|ECS]]

> [!question] 59. Absorver um pico de requisições e processar depois, com o menor esforço operacional e sem código de ingestão.
> **A)** API Gateway → Lambda → SQS
> **B)** API Gateway com integração direta para SQS (AWS service integration)
> **C)** ALB → ECS → SQS
> **D)** API Gateway com cache
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: a integração direta elimina a Lambda do caminho — menos código, menos custo, menos ponto de falha.
> > **D errada**: cache serve leitura repetida, não ingestão de escrita.
> >
> > Fonte: [[2 - Resiliencia (26%)/API Gateway/4 - Questoes|API Gateway]]

> [!question] 60. Um cluster EKS cresceu e os pods novos ficam `Pending` com erro de alocação de IP.
> **A)** Aumentar o tamanho das instâncias
> **B)** O VPC CNI dá um IP da VPC a cada pod: a subnet esgotou — use subnets maiores/dedicadas, prefix delegation, ou Fargate
> **C)** Habilitar o Cluster Autoscaler
> **D)** Reduzir o número de réplicas
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é a consequência de design do VPC CNI, e a causa mais comum de `Pending` em cluster grande.
> > **C errada**: mais nós não criam IPs se a subnet está cheia.
> >
> > Fonte: [[2 - Resiliencia (26%)/EKS/4 - Questoes|EKS]]

> [!question] 61. O consumidor em Auto Scaling não escala no pico; a CPU fica em 20% e a fila acumula.
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

> [!question] 62. Um processamento leva 25 minutos. Qual serviço?
> **A)** Lambda com timeout aumentado
> **B)** Fargate, ECS ou AWS Batch (ou Step Functions orquestrando Lambdas menores)
> **C)** Lambda com provisioned concurrency
> **D)** Lambda com 10 GB de memória
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o timeout máximo do Lambda é **900 s (15 min)** e não é ajustável acima disso.
> > **C e D erradas**: não alteram o timeout.
> >
> > Fonte: [[2 - Resiliencia (26%)/Lambda/4 - Questoes|Lambda]]

> [!question] 63. O proxy foi configurado, mas o número de conexões no banco não caiu.
> **A)** Falta aumentar o `max_connections`
> **B)** As sessões estão sendo fixadas (pinning) — por exemplo, statements maiores que 16 KB, temp tables ou variáveis de sessão
> **C)** O proxy precisa ser público
> **D)** Falta um read replica
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: no pinning o proxy deixa de multiplexar e dedica uma conexão de banco por sessão da aplicação.
> > **C errada**: o proxy *"can't be publicly accessible"* (não pode ser acessível publicamente) — e isso não teria relação.
> >
> > Fonte: [[2 - Resiliencia (26%)/RDS Proxy/4 - Questoes|RDS Proxy]]

> [!question] 64. Uma aplicação de inferência de ML precisa de **GPU** em containers.
> **A)** Fargate com mais vCPU
> **B)** ECS (ou EKS) no EC2, com instâncias de GPU
> **C)** Lambda com 10 GB
> **D)** Fargate Spot
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o Fargate **não oferece GPU**.
> > **C errada**: Lambda também não tem GPU.
> >
> > Fonte: [[2 - Resiliencia (26%)/Fargate/4 - Questoes|Fargate]]

> [!question] 65. Como eliminar a senha do banco da aplicação, mantendo rotação automática?
> **A)** Hardcode com rotação manual
> **B)** IAM authentication do cliente para o proxy, e o proxy buscando a credencial no Secrets Manager
> **C)** Parameter Store `SecureString`
> **D)** KMS
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é a combinação documentada — *"enforce IAM authentication for clients connecting to the proxy, and the proxy can connect to databases using either IAM database authentication or credentials stored in AWS Secrets Manager"* (exigir autenticação IAM dos clientes que se conectam ao proxy, e o proxy pode se conectar aos bancos usando autenticação IAM de banco ou credenciais guardadas no AWS Secrets Manager).
> > **C errada**: Parameter Store não rotaciona (*"None"*).
> >
> > Fonte: [[2 - Resiliencia (26%)/RDS Proxy/4 - Questoes|RDS Proxy]]

> [!question] 66. Um teste de DR precisa trocar a região primária do Global Database **sem perda de dados**.
> **A)** Failover com `--allow-data-loss`
> **B)** Switchover (managed planned failover)
> **C)** Promover uma read replica
> **D)** Restaurar um snapshot na outra região
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"Because this feature synchronizes secondary DB clusters with the primary before making any other changes, RPO is 0 (no data loss)."* (como esse recurso sincroniza os clusters secundários com o primário antes de qualquer outra mudança, o RPO é 0 (sem perda de dados))
> > **A errada**: é para **desastre**, e o próprio nome do parâmetro admite perda.
> >
> > Fonte: [[2 - Resiliencia (26%)/Aurora/4 - Questoes|Aurora]]

> [!question] 67. 50.000 jobs independentes de análise, cada um de ~20 minutos, com o menor custo e tolerantes a interrupção.
> **A)** Lambda com event source mapping
> **B)** AWS Batch com compute environment em EC2 Spot (allocation strategy `price capacity optimized`)
> **C)** ECS service com 50.000 tasks
> **D)** EMR com Spark
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: fila de jobs com provisionamento automático, e Spot é o caso de uso canônico para lote reiniciável.
> > **A errada**: 20 min cabe no Lambda (15 min? não — **estoura**), e Lambda não tem fila de jobs com prioridade/dependência.
> > **C errada**: `service` é para processo **contínuo**, não job que termina.
> > **D errada**: EMR é para **Spark/Hadoop**; o enunciado não menciona framework.
> >
> > Fonte: [[2 - Resiliencia (26%)/AWS Batch/4 - Questoes|AWS Batch]]

> [!question] 68. Uma tarefa precisa rodar 2 horas depois de um evento. O SQS delay não serve.
> **A)** SQS com delay de 15 minutos, repetido 8 vezes
> **B)** EventBridge Scheduler com invocação one-time
> **C)** Step Functions com Wait state
> **D)** Lambda com sleep
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o delay do SQS para em **15 minutos**, e a própria doc do SQS aponta o **EventBridge Scheduler** para atrasos maiores.
> > **C**: também funciona (um `Wait` de 2 h num workflow Standard, que dura até 1 ano) — é resposta válida se já houver um workflow. Para um agendamento isolado, o Scheduler é mais simples.
> > **D errada**: o Lambda para em 15 min, e pagar por sleep é desperdício.
> >
> > Fonte: [[2 - Resiliencia (26%)/EventBridge/4 - Questoes|EventBridge]]

> [!question] 69. Aplicação global precisa de leitura local em 3 continentes e failover para outra região com RPO de segundos e RTO de minutos.
> **A)** Aurora com 15 réplicas na região principal
> **B)** Aurora Global Database com clusters secundários nas regiões de leitura
> **C)** RDS Multi-AZ DB cluster
> **D)** Read replicas cross-Region do RDS MySQL
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: lag *"typically under a second"* (normalmente abaixo de um segundo), **RPO em segundos**, **RTO em minutos**, leitura local em até 10 regiões secundárias.
> > **A errada**: réplicas na mesma região não resolvem latência global nem DR regional.
> > **C errada**: Multi-AZ DB cluster é **intra-região**.
> > **D errada**: funciona, mas a promoção é manual e o lag é menos previsível.
> >
> > Fonte: [[2 - Resiliencia (26%)/Aurora/4 - Questoes|Aurora]]

> [!question] 70. As mensagens para um endpoint HTTPS de parceiro estão sendo perdidas quando o parceiro fica fora do ar.
> **A)** Aumentar o tamanho da mensagem
> **B)** Inscrever uma fila SQS no tópico (e o parceiro consome dela), ou configurar DLQ na subscription
> **C)** Mudar para tópico FIFO
> **D)** Usar SMS como fallback
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: para HTTP/HTTPS a política de retry é **sua** e o SNS não armazena. A fila dá durabilidade; a DLQ captura o que falhou.
> > **C errada**: FIFO resolve ordem, não durabilidade.
> >
> > Fonte: [[2 - Resiliencia (26%)/SNS/4 - Questoes|SNS]]

> [!question] 71. Um domínio precisa servir `/api/*` por um conjunto de instâncias e `/*` por outro.
> **A)** Dois NLBs com Route 53 weighted
> **B)** Um ALB com regras de roteamento por path
> **C)** CloudFront com dois origins
> **D)** Um NLB com dois target groups
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"Support for Path conditions"* (suporte a condições de Path) é recurso do ALB (camada 7).
> > **D errada**: NLB não entende path.
> > **C errada**: CloudFront **consegue** rotear por path behavior e é válido se houver requisito de CDN — mas introduz cache e borda sem o enunciado pedir.
> >
> > Fonte: [[2 - Resiliencia (26%)/ELB (Load Balancers)/4 - Questoes|ELB (Load Balancers)]]

> [!question] 72. Distribuir a mesma baseline (Config, CloudTrail, roles) para 40 contas e 3 regiões, com contas novas recebendo automaticamente.
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

> [!question] 73. Como dar a um pod permissão para ler um bucket S3, com menor privilégio?
> **A)** Access key num Secret do Kubernetes
> **B)** Instance profile do nó com permissão no bucket
> **C)** IRSA: associar uma IAM role ao service account do pod
> **D)** Task role
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: o IRSA entrega credencial temporária **por pod**, via STS.
> > **B errada**: funciona, mas dá a permissão a **todos** os pods daquele nó.
> > **A errada**: credencial de longo prazo dentro do cluster.
> > **D errada**: **task role** é vocabulário do **ECS**.
> >
> > Fonte: [[2 - Resiliencia (26%)/EKS/4 - Questoes|EKS]]

> [!question] 74. O failover por DNS está levando minutos. O requisito é segundos.
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

> [!question] 75. Avaliar a versão nova com **10% do tráfego real** antes de completar o deploy.
> **A)** Immutable
> **B)** Traffic splitting
> **C)** Rolling
> **D)** All at once
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: traffic splitting envia uma **porcentagem** do tráfego para a fleet nova (canary).
> >
> > Fonte: [[2 - Resiliencia (26%)/Elastic Beanstalk/4 - Questoes|Elastic Beanstalk]]

> [!question] 76. É preciso aplicar uma AMI corrigida em toda a fleet, sem downtime e sem alterar instâncias no lugar.
> **A)** Run Command aplicando o patch
> **B)** Nova versão do launch template com a AMI nova + instance refresh
> **C)** Terminar as instâncias manualmente
> **D)** Aumentar o desired capacity
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é **immutable infrastructure** — citado no guia em Task 2.2. O instance refresh troca em lotes, respeitando saúde mínima.
> > **A errada**: corrige in-place, deixando a fleet heterogênea (e não resolve upgrade de versão maior de SO).
> >
> > Fonte: [[2 - Resiliencia (26%)/Auto Scaling (EC2)/4 - Questoes|Auto Scaling (EC2)]]

> [!question] 77. Uma API atrás de **NLB** sofre SQL injection. O que fazer?
> **A)** Associar uma web ACL do WAF ao NLB
> **B)** Pôr um ALB (ou CloudFront) na frente e associar o WAF a ele
> **C)** Shield Advanced no NLB
> **D)** NACL negando os IPs
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: WAF **não** se associa a NLB. (E o NLB aceita **um ALB** como target, o que permite manter o IP estático.)
> >
> > Fonte: [[2 - Resiliencia (26%)/ELB (Load Balancers)/4 - Questoes|ELB (Load Balancers)]]

> [!question] 78. Publicar atualizações de pedido para e-mail, SMS, uma fila de faturamento e um endpoint HTTP de parceiro. Menor esforço operacional?
> **A)** Lambda chamando cada destino
> **B)** Tópico SNS com quatro subscriptions (e-mail, SMS, SQS, HTTPS)
> **C)** Quatro filas SQS e quatro consumidores
> **D)** EventBridge com quatro regras
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: SNS entrega nativamente para **e-mail, SMS, SQS e HTTP(S)** — é a lista oficial de endpoints. Zero código.
> > **A errada**: você reimplementa retry, backoff e DLQ por canal.
> > **C errada**: SQS não entrega e-mail nem SMS.
> > **D errada**: funciona para SQS e HTTP, mas **e-mail e SMS** são do SNS.
> >
> > Fonte: [[2 - Resiliencia (26%)/SNS/4 - Questoes|SNS]]

> [!question] 79. Jobs críticos precisam ser agendados antes dos jobs de relatório, na mesma capacidade.
> **A)** Dois compute environments
> **B)** Duas job queues com prioridades diferentes, apontando para o mesmo compute environment
> **C)** Array job com índice
> **D)** Aumentar a memória dos jobs críticos
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: a prioridade é atributo da **job queue**.
> >
> > Fonte: [[2 - Resiliencia (26%)/AWS Batch/4 - Questoes|AWS Batch]]

> [!question] 80. Qual é o tamanho máximo de uma mensagem do SNS?
> **A)** 1 MiB
> **B)** 256 KiB (262.144 bytes)
> **C)** 64 KB
> **D)** 2 GB
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é o valor oficial. ⚠️ Note que o **SQS** hoje aceita **1 MiB** — os dois são diferentes.
> >
> > Fonte: [[2 - Resiliencia (26%)/SNS/4 - Questoes|SNS]]

> [!question] 81. O endpoint a monitorar está numa subnet privada, sem IP público. Como fazer health check?
> **A)** Endpoint health check pelo IP privado
> **B)** Health check do tipo CloudWatch alarm, baseado numa métrica da aplicação
> **C)** Calculated health check
> **D)** Não é possível
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o endpoint health check vem da internet e não alcança IP privado. O tipo **CloudWatch alarm** usa uma métrica como critério de saúde.
> > **C errada**: calculated combina **outros** health checks — ainda precisaria de um que funcionasse.
> >
> > Fonte: [[2 - Resiliencia (26%)/Route 53/4 - Questoes|Route 53]]

> [!question] 82. Uma função Lambda com alta concorrência esgota as conexões do Aurora.
> **A)** Aumentar `max_connections` no parameter group
> **B)** RDS Proxy entre a Lambda e o cluster
> **C)** Adicionar read replicas
> **D)** Reserved concurrency na Lambda
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"allow your applications to pool and share database connections"* (permitem que suas aplicações agrupem e compartilhem conexões de banco), com load shedding no excesso. Bônus: reduz o failover *"by up to 66%"* (em até 66%).
> > **A errada**: conexões consomem memória do banco; só adia o problema.
> > **C errada**: ajuda em leitura, não no esgotamento de conexões.
> > **D errada**: limita a aplicação em vez de resolver.
> >
> > Fonte: [[2 - Resiliencia (26%)/RDS Proxy/4 - Questoes|RDS Proxy]]

> [!question] 83. Um relatório precisa ler dados gravados há **1 segundo** e não tolera dado antigo.
> **A)** Read replica
> **B)** Ler da instância primária (ou do writer)
> **C)** Read replica cross-Region
> **D)** Multi-AZ standby
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: read replica é **assíncrona** — há lag. Leitura que exige consistência forte vai no primário.
> > **D errada**: o standby **não aceita leitura**.
> >
> > Fonte: [[2 - Resiliencia (26%)/RDS/4 - Questoes|RDS]]

> [!question] 84. Alertar quando o **uso de memória** de instâncias EC2 passar de 85%.
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

> [!question] 85. Apagar a stack não pode apagar o banco RDS de produção.
> **A)** Stack policy negando delete
> **B)** `DeletionPolicy: Retain` (ou `Snapshot`) no recurso do RDS
> **C)** Termination protection na stack
> **D)** Mover o RDS para outra stack
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: a `DeletionPolicy` governa o que acontece com o recurso quando a stack é apagada.
> > **A errada**: stack policy protege contra **update**, não contra delete da stack.
> > **C errada**: impede apagar a stack por acidente, mas não protege o recurso se o delete for intencional.
> >
> > Fonte: [[2 - Resiliencia (26%)/CloudFormation/4 - Questoes|CloudFormation]]

> [!question] 86. Instâncias continuam rodando, mas usuários recebem 502. O processo da aplicação travou; o SO está no ar.
> **A)** O cooldown está muito longo
> **B)** O health check do ELB não está habilitado no ASG; só o EC2 status check está ativo
> **C)** O grace period é 0
> **D)** O target group está com cross-zone desligado
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o EC2 status check valida **hipervisor e SO**, não a aplicação. O ELB health check **precisa ser ativado**.
> > **A errada**: *"does not wait for the cooldown period to end before replacing the unhealthy instance"* (não espera o período de cooldown terminar para substituir a instância não saudável).
> > **C errada**: grace period 0 faria o ASG checar **mais cedo**.
> > **D errada**: cross-zone afeta distribuição, não detecção.
> >
> > Fonte: [[2 - Resiliencia (26%)/Auto Scaling (EC2)/4 - Questoes|Auto Scaling (EC2)]]

> [!question] 87. Processar 2 milhões de arquivos de um bucket S3 em paralelo.
> **A)** Map state comum
> **B)** Distributed Map (Standard)
> **C)** Lambda com 1.000 de concorrência reservada
> **D)** Express com Parallel
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o Distributed Map escala para milhões de itens lendo direto do S3 — e existe **só no Standard**.
> >
> > Fonte: [[2 - Resiliencia (26%)/Step Functions/4 - Questoes|Step Functions]]

> [!question] 88. Uma mensagem de 5 MB precisa trafegar pela fila.
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

> [!question] 89. Relatórios pesados devem rodar só nas duas instâncias maiores do cluster, sem afetar as réplicas que servem a aplicação.
> **A)** Reader endpoint
> **B)** Custom endpoint apontando para as duas instâncias grandes
> **C)** Instance endpoint de cada uma, com balanceamento no app
> **D)** Cluster endpoint com hint de leitura
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"Connect to different subsets of DB instances... useful when you have different instance capacities and configurations."* (conectar a subconjuntos diferentes de instâncias... útil quando você tem capacidades e configurações diferentes)
> > **A errada**: balanceia entre **todas** as réplicas.
> > **C errada**: instance endpoint **não** redireciona no failover.
> > **D errada**: cluster endpoint é o **writer**.
> >
> > Fonte: [[2 - Resiliencia (26%)/Aurora/4 - Questoes|Aurora]]

> [!question] 90. O tráfego tem um padrão diário conhecido: sobe às 8h e cai às 19h. Qual configuração reduz latência no início do dia e custo à noite?
> **A)** Simple scaling com cooldown curto
> **B)** Scheduled scaling (ou predictive scaling) combinado com target tracking
> **C)** Step scaling por CPU
> **D)** Aumentar o desired capacity fixo
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: scheduled trata o padrão **conhecido**; predictive provisiona *"in advance of daily and weekly patterns"* (antecipando padrões diários e semanais); target tracking cobre o imprevisto.
> > **A errada**: a AWS recomenda **não usar** simple scaling.
> > **C errada**: reage **depois** do pico começar.
> > **D errada**: paga capacidade de pico 24 h.
> >
> > Fonte: [[2 - Resiliencia (26%)/Auto Scaling (EC2)/4 - Questoes|Auto Scaling (EC2)]]

> [!question] 91. Site em três regiões, servindo cada usuário pela região de menor latência, com failover automático.
> **A)** Geolocation routing com health checks
> **B)** Latency-based routing com health checks nos endpoints de cada região
> **C)** Failover routing com três registros
> **D)** Simple routing com os três IPs
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: latency escolhe *"the Region that provides the best latency"* (a Região que oferece a melhor latência), e com health check configura **ativo-ativo** (*"any routing policy... other than failover"* (qualquer política de roteamento... que não seja failover)).
> > **A errada**: geolocation roteia por **localização**, não por latência medida.
> > **C errada**: failover é **ativo-passivo**.
> > **D errada**: *"they are not health checked"* (eles não passam por verificação de saúde).
> >
> > Fonte: [[2 - Resiliencia (26%)/Route 53/4 - Questoes|Route 53]]

> [!question] 92. Quando um snapshot de EBS terminar, uma Lambda deve copiá-lo para outra região. Menor esforço operacional?
> **A)** Lambda agendada a cada 5 minutos verificando snapshots
> **B)** Regra do EventBridge no barramento default, casando o evento de conclusão do snapshot, com a Lambda como target
> **C)** SNS com o evento publicado pela aplicação
> **D)** CloudWatch alarme
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o EventBridge consome os eventos que os serviços AWS **já emitem** — sem polling.
> > **A errada**: polling custa e atrasa.
> > **C errada**: a AWS não publica esse evento num tópico SNS seu.
> > **D errada**: alarme é sobre **métrica**, não evento de conclusão.
> >
> > Fonte: [[2 - Resiliencia (26%)/EventBridge/4 - Questoes|EventBridge]]

> [!question] 93. Um consumidor de fila em ASG não escala; a CPU fica em 20% e a fila acumula.
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

> [!question] 94. Ingestão de IoT: 50.000 execuções por segundo, cada uma com 3 passos idempotentes de poucos segundos.
> **A)** Standard workflow
> **B)** Express workflow
> **C)** Lambda com event source mapping
> **D)** Kinesis Data Firehose
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: Express chega a **100.000 execuções/s**, é *"better suited for orchestrating idempotent actions"* (mais adequado para orquestrar ações idempotentes), e o modelo de preço por execução/duração é muito mais barato nesse volume que o Standard (por transição de estado).
> > **A errada**: 2.000 execuções/s de teto, e o custo por transição explodiria.
> >
> > Fonte: [[2 - Resiliencia (26%)/Step Functions/4 - Questoes|Step Functions]]

> [!question] 95. Aplicação TCP de alta performance precisa de **IPs estáticos** para liberar em firewalls de clientes, com latência mínima.
> **A)** ALB
> **B)** NLB
> **C)** Classic Load Balancer
> **D)** ALB atrás do Global Accelerator
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"Elastic Load Balancing creates a network interface for each Availability Zone you enable, and uses it to get a static IP address"* (o Elastic Load Balancing cria uma interface de rede para cada Zona de Disponibilidade habilitada, e a usa para obter um endereço IP estático), com EIP opcional. Camada 4, latência mínima.
> > **A errada**: ALB expõe **DNS name**, e camada 7 é overhead para TCP puro.
> > **C errada**: geração anterior.
> > **D errada**: Global Accelerator **também** dá IPs estáticos e é válido em cenário global — mas aqui adiciona custo sem necessidade.
> >
> > Fonte: [[2 - Resiliencia (26%)/ELB (Load Balancers)/4 - Questoes|ELB (Load Balancers)]]

> [!question] 96. Uma API precisa responder em menos de 100 ms, mas sofre cold start nos picos.
> **A)** Aumentar a memória da função
> **B)** Provisioned concurrency
> **C)** Reserved concurrency
> **D)** Migrar para Fargate
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: ambientes pré-inicializados, *"designed to make functions available with double-digit millisecond response times"* (projetado para deixar as funções disponíveis com tempos de resposta de dezenas de milissegundos).
> > **A errada**: acelera a execução, mas não elimina a inicialização.
> > **C errada**: reserved **limita** concorrência; não pré-inicializa nada. É a troca mais comum da prova.
> > **D errada**: resolve, mas é mudança de arquitetura desnecessária.
> >
> > Fonte: [[2 - Resiliencia (26%)/Lambda/4 - Questoes|Lambda]]

> [!question] 97. Uma aplicação web precisa de processamento assíncrono de tarefas longas, desacoplado do front-end.
> **A)** Um único environment com threads de background
> **B)** Web server environment publicando numa fila + worker environment consumindo
> **C)** All at once deploy
> **D)** Lambda com 15 minutos
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o **worker environment** provisiona a fila SQS e o daemon que entrega as mensagens à aplicação.
> > **D errada**: pode servir, mas muda a arquitetura e tem teto de 15 min.
> >
> > Fonte: [[2 - Resiliencia (26%)/Elastic Beanstalk/4 - Questoes|Elastic Beanstalk]]

> [!question] 98. Um workflow precisa pausar e esperar a **aprovação de um gerente** antes de continuar.
> **A)** Express com Wait state
> **B)** Standard com `.waitForTaskToken` (callback)
> **C)** Lambda em loop verificando um banco
> **D)** SQS delay queue
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o padrão *wait for callback* pausa até alguém devolver o token — e **só existe no Standard**.
> > **A errada**: Express não suporta `.waitForTaskToken` e dura 5 min.
> >
> > Fonte: [[2 - Resiliencia (26%)/Step Functions/4 - Questoes|Step Functions]]

> [!question] 99. Uma carga de IoT usa **MQTT** e será movida para a AWS, mantendo os dispositivos sem alteração.
> **A)** Kinesis Data Streams
> **B)** Amazon MQ (que suporta MQTT)
> **C)** SQS com long polling
> **D)** MSK
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: MQTT está na lista de protocolos do Amazon MQ.
> > ⚠️ Em arquitetura real de IoT a resposta seria **AWS IoT Core** — mas **todos os serviços de IoT estão fora de escopo** na SAA-C03, então ele não aparece como alternativa.
> >
> > Fonte: [[2 - Resiliencia (26%)/Mensageria gerenciada (Amazon MQ e MSK)/4 - Questoes|Mensageria gerenciada (Amazon MQ e MSK)]]

> [!question] 100. O time quer tracing numa API Gateway **HTTP API**.
> **A)** Habilitar X-Ray no stage
> **B)** Não é suportado: a HTTP API não tem X-Ray — use REST API, ou instrumente a Lambda
> **C)** Instalar o daemon
> **D)** Habilitar detailed monitoring
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: X-Ray está na lista de recursos que **só a REST API** tem.
> >
> > Fonte: [[2 - Resiliencia (26%)/X-Ray/4 - Questoes|X-Ray]]

> [!question] 101. Uma simulação HPC com MPI precisa abranger 20 nós que se comunicam.
> **A)** Array job de 20
> **B)** Multi-node parallel job, com cluster placement group e EFA
> **C)** 20 jobs independentes
> **D)** Lambda com 10 GB
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: array job roda cópias **independentes**; MPI exige nós que se comunicam, que é o *multi-node parallel job*.
> >
> > Fonte: [[2 - Resiliencia (26%)/AWS Batch/4 - Questoes|AWS Batch]]

> [!question] 102. Precisa habilitar criptografia em repouso num RDS que foi criado sem ela.
> **A)** Habilitar na console, com reboot
> **B)** Criar um snapshot, copiá-lo com criptografia, e restaurar uma nova instância a partir dele
> **C)** Mudar o parameter group
> **D)** Não é possível
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: a criptografia é definida na **criação**. O caminho é snapshot → cópia criptografada → restore.
> >
> > Fonte: [[2 - Resiliencia (26%)/RDS/4 - Questoes|RDS]]

> [!question] 103. **Quatro** sistemas precisam processar cada evento de "pedido criado", de forma independente.
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

> [!question] 104. Processar 100.000 arquivos do S3, um por job, com o mínimo de configuração.
> **A)** 100.000 submissões individuais
> **B)** Um array job de 100.000, usando o índice para escolher o arquivo
> **C)** Um job com loop interno
> **D)** Step Functions Map
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o array job é feito para isso, com `AWS_BATCH_JOB_ARRAY_INDEX`.
> > **D**: **Distributed Map** do Step Functions Standard também escala para milhões de itens — alternativa legítima, especialmente se houver ramificação no fluxo.
> >
> > Fonte: [[2 - Resiliencia (26%)/AWS Batch/4 - Questoes|AWS Batch]]

> [!question] 105. Replicar um cluster Kafka para outra região, para DR.
> **A)** MSK Connect
> **B)** MSK Replicator
> **C)** Kinesis Data Firehose
> **D)** DataSync
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o **MSK Replicator** é o componente de replicação entre clusters.
> > **A errada**: MSK Connect roda **conectores** (fonte/destino), não replicação de cluster.
> >
> > Fonte: [[2 - Resiliencia (26%)/Mensageria gerenciada (Amazon MQ e MSK)/4 - Questoes|Mensageria gerenciada (Amazon MQ e MSK)]]

> [!question] 106. Reduzir a carga no backend para endpoints de leitura cujos dados mudam a cada 5 minutos.
> **A)** Aumentar o throttle
> **B)** Habilitar o cache do API Gateway no stage, com TTL de 5 minutos
> **C)** Mudar para HTTP API
> **D)** Adicionar provisioned concurrency na Lambda
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o cache responde sem chamar o backend. ⚠️ Recurso **só da REST API**.
> > **C errada**: a HTTP API **não tem cache**.
> >
> > Fonte: [[2 - Resiliencia (26%)/API Gateway/4 - Questoes|API Gateway]]

> [!question] 107. Um ASG mantém instâncias rodando, mas usuários recebem 502. O processo da aplicação travou; o SO está no ar.
> **A)** O cooldown está longo
> **B)** O health check do ELB não está habilitado no Auto Scaling group
> **C)** O grace period é 0
> **D)** Cross-zone está desligado
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o EC2 status check valida hipervisor e SO, não a aplicação. O **ELB health check** precisa ser ativado no ASG.
> > **A errada**: *"does not wait for the cooldown period to end before replacing the unhealthy instance"* (não espera o período de cooldown terminar para substituir a instância não saudável).
> >
> > Fonte: [[2 - Resiliencia (26%)/ELB (Load Balancers)/4 - Questoes|ELB (Load Balancers)]]

> [!question] 108. Depois de criar um workflow Express, o time percebe que precisa de exactly-once. O que fazer?
> **A)** Mudar o tipo nas configurações
> **B)** Criar um novo workflow Standard: o tipo é imutável
> **C)** Habilitar idempotência
> **D)** Usar `.sync`
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o tipo de workflow **não pode ser alterado** depois da criação.
> >
> > Fonte: [[2 - Resiliencia (26%)/Step Functions/4 - Questoes|Step Functions]]

> [!question] 109. Um agente de monitoramento precisa rodar **em cada host** do cluster.
> **A)** Fargate com desired count alto
> **B)** ECS no EC2, com a estratégia de scheduling `daemon`
> **C)** Lambda agendada
> **D)** Service com 1 task
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: "um por host" exige acesso ao host e a estratégia **daemon** — que o Fargate não oferece.
> >
> > Fonte: [[2 - Resiliencia (26%)/ECS/4 - Questoes|ECS]]

> [!question] 110. A fatura do CloudWatch Logs cresce continuamente, mesmo com volume de log estável.
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

> [!question] 111. Um stream do DynamoDB precisa ser filtrado, enriquecido com dados de uma API e entregue a vários consumidores.
> **A)** Lambda lendo o stream e chamando os consumidores
> **B)** EventBridge Pipes (stream → filtro → enriquecimento) entregando num event bus com várias regras
> **C)** SNS fan-out
> **D)** Kinesis Data Firehose
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é o padrão citado na própria doc — *"DynamoDB stream → pipe → event bus → multiple targets"* (stream do DynamoDB → pipe → barramento de eventos → vários destinos). O Pipes faz *"advanced transformations and enrichment"* (transformações avançadas e enriquecimento).
> > **A errada**: você reimplementa filtro, enriquecimento, retry e fan-out.
> >
> > Fonte: [[2 - Resiliencia (26%)/EventBridge/4 - Questoes|EventBridge]]

> [!question] 112. Rodar containers em produção com o **menor esforço operacional**, e o time não usa Kubernetes.
> **A)** EKS com managed node groups
> **B)** ECS com Fargate
> **C)** ECS no EC2 com Auto Scaling group
> **D)** EC2 com Docker e scripts
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: ECS é o orquestrador mais simples na AWS, e o Fargate elimina o gerenciamento de servidor.
> > **A errada**: traz o plano de controle Kubernetes para operar sem necessidade.
> > **C errada**: você volta a gerenciar AMI, patch e capacidade.
> >
> > Fonte: [[2 - Resiliencia (26%)/ECS/4 - Questoes|ECS]]

> [!question] 113. Centralizar métricas e logs de 40 contas numa visão única.
> **A)** Um dashboard por conta
> **B)** CloudWatch cross-account observability, com uma conta de monitoramento
> **C)** CloudTrail organization trail
> **D)** AWS Config aggregator
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é o recurso específico para observabilidade multi-conta.
> > **C errada**: CloudTrail trata **chamadas de API**.
> > **D errada**: Config trata **configuração e conformidade**.
> >
> > Fonte: [[2 - Resiliencia (26%)/CloudWatch/4 - Questoes|CloudWatch]]

> [!question] 114. Requisito de compliance: usuários da União Europeia devem ser atendidos **sempre** pela região de Frankfurt.
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
