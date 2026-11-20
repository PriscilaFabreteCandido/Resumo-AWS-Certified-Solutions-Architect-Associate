---
tags: [saa-c03, simulado]
gerado_por: scripts/gerar-simulados.mjs
---

# Simulado geral 03

> [!warning] Nota gerada automaticamente: não edite aqui
> Corrija a questão na nota `4 - Questoes` de origem (o link está na resposta) e rode `node scripts/gerar-simulados.mjs`.

65 questões no formato da prova, na proporção dos domínios (30% / 26% / 24% / 20%, com algumas de fundamentos). Faça de uma vez, cronometrado, e só confira as respostas no final.

> [!note] O domínio 4 (Custo) tem poucas questões próprias, então elas se repetem entre os simulados gerais.

**65 questões.** Responda de cabeça e anote a letra **antes** de abrir a resposta. Errou? Abra a **Fonte** e volte ao conteúdo daquele ponto.

---

> [!question] 1. O time quer apontar o RDS Proxy para as read replicas, para escalar leitura.
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

> [!question] 2. Precisa habilitar criptografia em repouso num RDS que foi criado sem ela.
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

> [!question] 3. Produção e desenvolvimento estão anexadas ao mesmo TGW, mas **não devem** se comunicar. Ambas alcançam serviços compartilhados e o on-premises.
> **A)** NACLs em todas as subnets
> **B)** Route tables separadas no Transit Gateway, associando cada grupo de attachments à sua
> **C)** Dois Transit Gateways
> **D)** Security groups referenciando SGs
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"Each attachment is associated with exactly one route table"* (cada attachment está associado a exatamente uma route table) — é o mecanismo de segmentação do TGW.
> > **C errada**: funciona, mas dobra o custo de attachment e perde o compartilhamento dos serviços comuns.
> >
> > Fonte: [[3 - Performance (24%)/Transit Gateway/4 - Questoes|Transit Gateway]]

> [!question] 4. Migrar as instâncias de Ubuntu 20.04 para 22.04 em escala.
> **A)** Patch Manager com patch baseline atualizada
> **B)** Não é Patch Manager: construir AMI nova (EC2 Image Builder) e substituir a fleet via Auto Scaling instance refresh
> **C)** Run Command com `apt upgrade`
> **D)** Automation com documento de upgrade
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"Patch Manager... doesn't support upgrading major versions of operating systems."* (o Patch Manager... não oferece suporte a upgrade de versões maiores de sistema operacional) A troca de versão maior é substituição imutável.
> > **C errada**: `apt upgrade` não faz release upgrade, e fazê-lo in-place em escala é frágil.
> >
> > Fonte: [[1 - Seguranca (30%)/Systems Manager (e Parameter Store)/4 - Questoes|Systems Manager (e Parameter Store)]]

> [!question] 5. O auditor pediu o relatório **SOC 2 da AWS**. Onde obter?
> **A)** AWS Config
> **B)** Security Hub
> **C)** AWS Artifact
> **D)** AWS Audit Manager
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: Artifact entrega a conformidade **da AWS** — o lado dela no modelo.
> > **A e B erradas**: medem a conformidade e a postura **dos seus** recursos.
> >
> > Fonte: [[9 - Fundamentos e apoio/Responsabilidade compartilhada/4 - Questoes|Responsabilidade compartilhada]]

> [!question] 6. Alimentar continuamente um data lake no S3 a partir de um banco transacional.
> **A)** Snapshot diário para o S3
> **B)** DMS com CDC e destino S3
> **C)** DataSync
> **D)** Glue crawler no banco
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o DMS suporta **S3 como destino** e replica as mudanças continuamente — depois Glue/Athena consomem.
> > **A errada**: dado defasado e carga pesada no banco.
> >
> > Fonte: [[4 - Custo (20%)/DMS (Database Migration Service)/4 - Questoes|DMS (Database Migration Service)]]

> [!question] 7. O Firewall Manager foi configurado, mas não detecta recursos em duas contas. O que verificar?
> **A)** Se o Shield Advanced está assinado
> **B)** Se o AWS Config está habilitado naquelas contas e regiões
> **C)** Se o WAF está na mesma região
> **D)** Se as contas têm um ALB
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o Config fornece o inventário de recursos ao Firewall Manager.
> >
> > Fonte: [[1 - Seguranca (30%)/Firewall Manager/4 - Questoes|Firewall Manager]]

> [!question] 8. As tasks precisam de security groups diferentes entre si, na mesma subnet.
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

> [!question] 9. 15 contas AWS, acesso de console para vários times, usando as identidades do Active Directory existente. Menor esforço operacional?
> **A)** IAM users em cada conta, com senhas sincronizadas
> **B)** IAM Identity Center integrado ao diretório, com permission sets atribuídos por grupo
> **C)** Uma conta central com IAM users e role switching manual para as outras 14
> **D)** AD Connector em cada conta com usuários IAM espelhados
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é o serviço de acesso federado de **pessoas** a múltiplas contas, citado nominalmente no guia (*Task 1.1*).
> > **A errada**: 15 × N usuários para gerenciar e revogar.
> > **C errada**: funciona (padrão antigo), mas você mantém roles e trust policies à mão em 14 contas.
> > **D errada**: AD Connector é proxy para apps AWS usarem o AD; não resolve atribuição multi-conta.
> >
> > Fonte: [[1 - Seguranca (30%)/IAM/4 - Questoes|IAM]]

> [!question] 10. Quanto tempo de histórico o Cost Explorer mostra, e quanto prevê?
> **A)** 12 meses de histórico, 12 de forecast
> **B)** 13 meses de histórico, 18 meses de forecast
> **C)** 6 meses e 6 meses
> **D)** 24 meses e 12 meses
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"up to the last 13 months"* (até os últimos 13 meses) e *"the next 18 months"* (os próximos 18 meses).
> >
> > Fonte: [[4 - Custo (20%)/Ferramentas de custo (Cost Explorer, Budgets, CUR)/4 - Questoes|Ferramentas de custo (Cost Explorer, Budgets, CUR)]]

> [!question] 11. Instâncias em subnet privada precisam de saída **IPv6** para a internet, sem aceitar conexões de entrada.
> **A)** NAT gateway
> **B)** Egress-only internet gateway
> **C)** Internet gateway com NACL restritiva
> **D)** NAT instance com IPv6
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"is for use with IPv6 traffic only. To enable outbound-only internet communication over IPv4, use a NAT gateway instead."* (serve apenas para tráfego IPv6; para permitir comunicação de saída pela internet em IPv4, use um NAT gateway)
> >
> > Fonte: [[1 - Seguranca (30%)/NAT Gateway/4 - Questoes|NAT Gateway]]

> [!question] 12. Uma aplicação precisa criptografar arquivos de até 200 MB com chave gerenciada e auditável. Qual desenho?
> **A)** Chamar `kms:Encrypt` para cada arquivo
> **B)** `kms:GenerateDataKey`, criptografar localmente com a data key em texto claro e guardar a data key criptografada ao lado do arquivo
> **C)** Chave assimétrica com RSAES_OAEP_SHA_256
> **D)** CloudHSM com PKCS #11
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: envelope encryption é o padrão para qualquer dado acima de 4 KB.
> > **A errada**: `Encrypt` recusa plaintext acima de **4.096 bytes**.
> > **C errada**: **pior** — RSA_4096 com OAEP SHA-256 aceita **446 bytes**.
> > **D errada**: resolve, mas é esforço desnecessário; o enunciado não pede HSM dedicado.
> >
> > Fonte: [[1 - Seguranca (30%)/KMS/4 - Questoes|KMS]]

> [!question] 13. Uma API atrás de **NLB** sofre SQL injection. O que fazer?
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

> [!question] 14. Por que não é necessário liberar portas efêmeras no security group?
> **A)** Porque a AWS libera automaticamente a faixa 1024-65535
> **B)** Porque o SG é stateful: a resposta a uma conexão permitida volta independentemente das regras
> **C)** Porque o SG opera na camada 7
> **D)** Porque o NAT gateway faz a tradução
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"Responses to allowed inbound traffic are allowed to leave the instance, regardless of the outbound rules."* (as respostas ao tráfego de entrada permitido podem sair da instância, independentemente das regras de saída)
> > **A errada**: não há liberação implícita de faixa — há **rastreamento de estado**.
> > **C errada**: SG opera em protocolo/porta/endereço.
> > **D errada**: o NAT não tem papel nisso (e o comportamento vale também sem NAT).
> >
> > Fonte: [[1 - Seguranca (30%)/Security Groups/4 - Questoes|Security Groups]]

> [!question] 15. Descobrir se há **CPF** nas tabelas do data lake.
> **A)** Lake Formation
> **B)** Amazon Macie
> **C)** AWS Config
> **D)** Glue crawler
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: Macie *"discovers sensitive data by using machine learning and pattern matching"* (descobre dados sensíveis usando machine learning e correspondência de padrões) nos buckets S3.
> > **A errada**: Lake Formation **controla acesso**; não descobre conteúdo.
> > **D errada**: o crawler infere **schema**, não classifica conteúdo.
> >
> > Fonte: [[3 - Performance (24%)/Lake Formation/4 - Questoes|Lake Formation]]

> [!question] 16. Publicar atualizações de pedido para e-mail, SMS, uma fila de faturamento e um endpoint HTTP de parceiro. Menor esforço operacional?
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

> [!question] 17. A empresa precisa guardar e consultar 7 anos de eventos do CloudTrail com SQL, para auditoria regulatória.
> **A)** Amazon Detective
> **B)** CloudTrail Lake
> **C)** CloudWatch Logs com retenção estendida
> **D)** Security Hub
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o CloudTrail Lake retém *"up to 3,653 days (about 10 years)"* (ou 2.557 dias na outra opção) e permite consulta SQL.
> > **A errada**: Detective retém **até 1 ano** e é ferramenta de investigação, não de arquivo de auditoria.
> >
> > Fonte: [[1 - Seguranca (30%)/Detective/4 - Questoes|Detective]]

> [!question] 18. O requisito mudou: a latência precisa ser de **segundos**.
> **A)** Reduzir o buffer size para 1 MB
> **B)** Usar zero buffering interval
> **C)** Migrar para Kinesis Data Streams
> **D)** Aumentar o número de shards
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"you can use zero buffering interval hint... Firehose will not buffer data and will deliver data within a few seconds"* (você pode usar o hint de intervalo de buffer zero... o Firehose não faz buffer e entrega os dados em poucos segundos).
> > ⚠️ Mas note: zero buffering não vale para o **destino de backup no S3**, e intervalo abaixo de 60 s no S3 usa multipart upload, com *"some increase in S3 PUT API costs"* (algum aumento nos custos de requisições PUT do S3).
> > **C**: é a resposta se a exigência fosse **sub-segundo** ou replay.
> >
> > Fonte: [[3 - Performance (24%)/Kinesis Data Firehose/4 - Questoes|Kinesis Data Firehose]]

> [!question] 19. A empresa replica o bucket S3 para outra região e considera isso seu backup. Qual o problema?
> **A)** Replicação é síncrona e custa caro
> **B)** Replicação propaga mudanças, inclusive exclusões; não protege de erro humano nem de ransomware
> **C)** Replicação não funciona entre regiões
> **D)** Replicação não suporta versionamento
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: replicação protege de falha de **infraestrutura**. Contra erro e ataque, é **versionamento + Object Lock** (ou AWS Backup com Vault Lock).
> >
> > Fonte: [[1 - Seguranca (30%)/AWS Backup/4 - Questoes|AWS Backup]]

> [!question] 20. Durante um DDoS volumétrico, a empresa quer acesso direto a especialistas da AWS e mitigação assistida.
> **A)** Plano de suporte Business
> **B)** Assinatura do AWS Shield Advanced
> **C)** Shield Standard com um caso de suporte urgente
> **D)** WAF com managed rule group anti-DDoS
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o SRT e o engajamento proativo são benefícios do **Advanced**.
> > **A errada**: o Advanced exige plano Business ou Enterprise, mas o plano sozinho não dá acesso ao SRT.
> > **C errada**: o Standard não dá acesso ao SRT.
> > **D errada**: ajuda na camada 7, mas não fornece equipe nem mitigação volumétrica assistida.
> >
> > Fonte: [[1 - Seguranca (30%)/Shield/4 - Questoes|Shield]]

> [!question] 21. Sincronizar diariamente um compartilhamento NFS on-premises com um EFS.
> **A)** Storage Gateway
> **B)** DataSync com tarefa agendada
> **C)** rsync via VPN
> **D)** Transfer Family
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: transferência **incremental agendada**, com validação de integridade.
> >
> > Fonte: [[3 - Performance (24%)/DataSync/4 - Questoes|DataSync]]

> [!question] 22. Uma instância RDS foi deletada e o time descobriu que não havia snapshot manual. Os backups automáticos servem?
> **A)** Sim, ficam retidos pelo período configurado
> **B)** Não: backups automáticos são removidos com a instância; só o snapshot manual sobrevive
> **C)** Sim, se o AWS Backup estava habilitado
> **D)** Só se a instância era Multi-AZ
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é a diferença clássica entre backup automático e snapshot manual.
> > **C**: na prática, um backup feito pelo **AWS Backup** fica no **vault** e sobrevive — é por isso que centralizar protege. Mas a afirmação sobre os **backups automáticos** do RDS continua sendo "não".
> >
> > Fonte: [[1 - Seguranca (30%)/AWS Backup/4 - Questoes|AWS Backup]]

> [!question] 23. Uma aplicação web precisa de processamento assíncrono de tarefas longas, desacoplado do front-end.
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

> [!question] 24. Qual serviço entrega o relatório SOC 2 **da AWS** para o auditor?
> **A)** Security Hub
> **B)** AWS Config
> **C)** AWS Artifact
> **D)** AWS Audit Manager
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: Artifact é onde ficam os relatórios de compliance **da AWS**.
> > **A e B erradas**: medem a **sua** postura e configuração.
> > **D errada**: Audit Manager coleta evidência do **seu** ambiente contra frameworks.
> >
> > Fonte: [[1 - Seguranca (30%)/Security Hub/4 - Questoes|Security Hub]]

> [!question] 25. Qual a diferença de escopo entre SG e NACL?
> **A)** SG é por VPC, NACL é por região
> **B)** SG é por recurso (instance level); NACL é por subnet (subnet level)
> **C)** SG é por subnet, NACL é por instância
> **D)** Ambos são por subnet
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é a primeira linha da tabela oficial de comparação.
> >
> > Fonte: [[1 - Seguranca (30%)/NACL (Network ACL)/4 - Questoes|NACL (Network ACL)]]

> [!question] 26. Uma Lambda em VPC precisa gravar no S3 e não consegue.
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

> [!question] 27. Um barramento recebe eventos de pedido e cada consumidor quer um subconjunto diferente, filtrando por campos **aninhados** do JSON.
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

> [!question] 28. Avaliar a versão nova com **10% do tráfego real** antes de completar o deploy.
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

> [!question] 29. Rodar containers em produção com o **menor esforço operacional**, sem gerenciar instâncias, e o time não usa Kubernetes.
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

> [!question] 30. Uma plataforma de petróleo precisa processar dados localmente, sem conectividade confiável, de forma permanente.
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

> [!question] 31. Instâncias privadas precisam gravar num bucket S3 da mesma região, sem internet e **sem custo adicional**.
> **A)** NAT gateway em cada AZ
> **B)** Interface endpoint para o S3
> **C)** Gateway endpoint para o S3
> **D)** Internet gateway com rota restrita
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: *"There is no additional charge for using gateway endpoints."* (não há cobrança adicional pelo uso de gateway endpoints)
> > **A errada**: NAT gateway cobra por hora **e por GB**.
> > **B errada**: funciona, mas é **cobrado**.
> > **D errada**: coloca a subnet na internet.
> >
> > Fonte: [[1 - Seguranca (30%)/VPC Endpoints e PrivateLink/4 - Questoes|VPC Endpoints e PrivateLink]]

> [!question] 32. O Compute Optimizer aplica automaticamente o novo tipo de instância?
> **A)** Sim, se autorizado
> **B)** Não: ele só recomenda. A troca é sua (launch template + instance refresh)
> **C)** Sim, via Systems Manager
> **D)** Sim, em Auto Scaling groups
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o verbo é **recomendar**.
> >
> > Fonte: [[4 - Custo (20%)/Compute Optimizer/4 - Questoes|Compute Optimizer]]

> [!question] 33. Objetos de auditoria não podem ser apagados por 7 anos, por ninguém, incluindo administradores. O que configurar?
> **A)** Versionamento + MFA Delete
> **B)** Object Lock em modo Compliance, com retenção de 7 anos, em bucket com versionamento
> **C)** Bucket policy com `Deny` em `s3:DeleteObject`
> **D)** Glacier Deep Archive com lifecycle
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: só o modo Compliance impede o root — *"can't be overwritten or deleted by any user, including the root user"* (não pode ser sobrescrito nem apagado por nenhum usuário, inclusive o usuário raiz).
> > **A errada**: quem tem o MFA do root apaga.
> > **C errada**: um administrador com poder de editar a policy remove o Deny.
> > **D errada**: classe de armazenamento é custo, não imutabilidade.
> >
> > Fonte: [[3 - Performance (24%)/S3/4 - Questoes|S3]]

> [!question] 34. Pipeline de renderização: milhares de frames independentes, pode reiniciar um frame perdido, custo é prioridade.
> **A)** On-Demand com Auto Scaling
> **B)** Spot via EC2 Fleet com `price capacity optimized` e capacity rebalancing
> **C)** Reserved Instances de 1 ano
> **D)** Spot Fleet com `lowest price`
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: trabalho idempotente e reiniciável é o caso de uso do Spot; *price capacity optimized* é a estratégia **recomendada**.
> > **A errada**: paga preço cheio sem necessidade.
> > **C errada**: compromisso de 1 ano para carga variável.
> > **D errada**: `lowest-price` está marcada *"(not recommended)"* e *"has the highest risk of interruption"* (tem o maior risco de interrupção) — é o default da CLI, por isso aparece tanto.
> >
> > Fonte: [[3 - Performance (24%)/EC2/4 - Questoes|EC2]]

> [!question] 35. As recomendações sugerem reduzir instâncias que, no fechamento mensal, ficam no limite. O que fazer?
> **A)** Ignorar as recomendações
> **B)** Habilitar enhanced infrastructure metrics, que estende a janela de 14 para 93 dias
> **C)** Instalar o CloudWatch agent
> **D)** Usar o Trusted Advisor
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: a janela padrão é *"the last 14 days"* (os últimos 14 dias) — um pico mensal pode ficar fora. Com 93 dias, ele entra na análise.
> > **C**: também melhora a qualidade (memória), mas não resolve a **janela**.
> >
> > Fonte: [[4 - Custo (20%)/Compute Optimizer/4 - Questoes|Compute Optimizer]]

> [!question] 36. Uma instância RDS foi deletada e não havia snapshot manual. Os backups automáticos servem?
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

> [!question] 37. Um processamento leva 25 minutos. Qual serviço?
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

> [!question] 38. Por que usar **EMRFS** em vez de HDFS para os dados de entrada e saída?
> **A)** É mais rápido que HDFS
> **B)** Os dados persistem depois que o cluster é encerrado, separando compute de storage
> **C)** É obrigatório no EMR
> **D)** Permite usar Spot no master
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"EMRFS uses S3 as a data layer... so that you can separate your compute and storage."* (o EMRFS usa o S3 como camada de dados... para que você separe computação de armazenamento) É o que habilita o cluster transiente.
> > **A errada**: HDFS local costuma ser mais rápido — por isso serve de **scratch** intermediário.
> >
> > Fonte: [[3 - Performance (24%)/EMR/4 - Questoes|EMR]]

> [!question] 39. 2.000 parâmetros de configuração, versionados, com o **menor custo possível**.
> **A)** Secrets Manager
> **B)** Parameter Store, tier Standard
> **C)** DynamoDB
> **D)** Arquivo JSON no S3
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: cabe nos 10.000 parâmetros e 4 KB do Standard, tem versionamento (100 versões) e **não tem cobrança adicional**.
> > **A errada**: cobra **por secret por mês**.
> >
> > Fonte: [[1 - Seguranca (30%)/Systems Manager (e Parameter Store)/4 - Questoes|Systems Manager (e Parameter Store)]]

> [!question] 40. RPO de 5 minutos, RTO de 20 minutos, e a empresa **não quer pagar servidores de aplicação ociosos**.
> **A)** Backup and restore com cópia cross-Region
> **B)** Pilot light
> **C)** Warm standby
> **D)** Multi-site active/active
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é exatamente a definição — *"Resources required to support data replication and backup, such as databases and object storage, are always on. Other elements, such as application servers, are loaded with application code and configurations, but are switched off."* (os recursos necessários para sustentar a replicação e o backup, como bancos de dados e armazenamento de objetos, ficam sempre ligados; os demais, como servidores de aplicação, ficam com o código e as configurações carregados, mas desligados)
> > **A errada**: RTO em horas.
> > **C e D erradas**: atendem, mas mantêm computação ligada — contrariam a restrição de custo.
> >
> > Fonte: [[9 - Fundamentos e apoio/Disaster Recovery (RPO e RTO)/4 - Questoes|Disaster Recovery (RPO e RTO)]]

> [!question] 41. Carga de produção 24/7 em m6i. O time ainda não decidiu se migra para Graviton, para outra região, ou para containers.
> **A)** Reserved Instances Standard de 3 anos
> **B)** Compute Savings Plans
> **C)** EC2 Instance Savings Plans
> **D)** Spot com capacity rebalancing
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: aplica-se *"regardless of instance family, instance size, OS, tenancy, or AWS Region"* (independentemente de família, tamanho de instância, sistema operacional, tenancy ou Região) e **cobre Fargate e Lambda** — sobrevive a toda essa indecisão.
> > **A errada**: Standard RI *"can't be exchanged"* (não podem ser trocadas) e amarra tipo e região por 3 anos.
> > **C errada**: amarra **família e região**, justamente o que está em aberto.
> > **D errada**: produção 24/7 não tolera interrupção.
> >
> > Fonte: [[4 - Custo (20%)/Opcoes de compra do EC2 (Spot, RI, Savings Plans)/4 - Questoes|Opcoes de compra do EC2 (Spot, RI, Savings Plans)]]

> [!question] 42. Como bloquear um único IP malicioso que está atacando as instâncias?
> **A)** Regra de deny no security group
> **B)** Regra DENY na NACL da subnet, com número menor que o allow mais amplo
> **C)** Remover o IP do SG
> **D)** Security group com `0.0.0.0/0` exceto aquele IP
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: SG **não tem deny**. A NACL tem, e avalia *"in ascending order until a match for the traffic is found"* (em ordem crescente, até encontrar uma correspondência para o tráfego) — por isso o deny precisa ter número **menor**.
> > **A errada**: *"Allow rules only"* (somente regras de allow).
> > **C errada**: não há o que remover; o IP nunca foi listado individualmente.
> > **D errada**: SG não permite exceção — não existe "exceto".
> > ⚠️ Se o ataque for na camada 7 (SQL injection, flood HTTP), a resposta vira **AWS WAF**.
> >
> > Fonte: [[1 - Seguranca (30%)/Security Groups/4 - Questoes|Security Groups]]

> [!question] 43. Depois de habilitar TTL, os itens expirados continuam aparecendo nas consultas.
> **A)** O TTL não funcionou
> **B)** É esperado: a exclusão ocorre "within a few days"; use filter expressions para remover expirados de Scan e Query
> **C)** Falta habilitar Streams
> **D)** O atributo precisa ser String
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é comportamento documentado.
> > **D errada**: o atributo precisa ser **Number** em epoch de segundos — atributo de outro tipo é **ignorado** pelo TTL.
> >
> > Fonte: [[3 - Performance (24%)/DynamoDB/4 - Questoes|DynamoDB]]

> [!question] 44. O FinOps precisa analisar custo **por hora, por recurso**, cruzando com dados do ERP, usando SQL.
> **A)** Cost Explorer com granularidade horária
> **B)** CUR entregue no S3 e consultado no Athena
> **C)** AWS Budgets
> **D)** API do Cost Explorer
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o CUR é *"the most comprehensive set of cost and usage data available"* (o conjunto mais completo de dados de custo e uso disponível), com granularidade de **hora**, preparado para *"integration with Amazon Athena, Amazon Redshift, or Quick"*.
> > **A errada**: painel não faz join com dado externo.
> > **D errada**: cobra **US$ 0,01** por requisição paginada e não entrega o detalhe do CUR.
> >
> > Fonte: [[4 - Custo (20%)/Ferramentas de custo (Cost Explorer, Budgets, CUR)/4 - Questoes|Ferramentas de custo (Cost Explorer, Budgets, CUR)]]

> [!question] 45. O environment de produção foi apagado por engano e o banco RDS foi junto. Como evitar?
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

> [!question] 46. 12 times precisam ter o custo atribuído, sem criar contas novas. As tags já estão aplicadas, mas o Cost Explorer não mostra nada por time.
> **A)** Criar um CUR por time
> **B)** Ativar as tags como cost allocation tags no console de Billing
> **C)** AWS Budgets por time
> **D)** Resource groups
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é o passo esquecido — a tag só aparece como dimensão **depois de ativada** (e não é retroativo).
> > **A errada**: o CUR é um só, e **usa** as tags.
> > **C errada**: Budgets alerta; não atribui custo.
> >
> > Fonte: [[4 - Custo (20%)/Ferramentas de custo (Cost Explorer, Budgets, CUR)/4 - Questoes|Ferramentas de custo (Cost Explorer, Budgets, CUR)]]

> [!question] 47. Quantos dispositivos num cluster Snowball Edge, e para quê?
> **A)** 2 a 8, para velocidade
> **B)** 3 a 16, para durabilidade do dado no site
> **C)** 1 a 10, para capacidade
> **D)** Não existe cluster
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"cluster Snowball Edge devices for local storage and compute jobs to achieve data durability across 3 to 16 devices"* (agrupar dispositivos Snowball Edge em cluster, para armazenamento e processamento local, obtendo durabilidade de dados entre 3 e 16 dispositivos).
> >
> > Fonte: [[4 - Custo (20%)/Snow Family/4 - Questoes|Snow Family]]

> [!question] 48. Quanto tempo leva o failover de um cluster Aurora que tem **uma única** instância?
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

> [!question] 49. A carga tem picos curtos e fica quase ociosa o resto do tempo (relação média/pico de ~2%).
> **A)** Provisioned
> **B)** Elastic
> **C)** Bursting
> **D)** Max I/O
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o critério oficial é *"average-to-peak ratio of 5% or less"* (razão entre média e pico de 5% ou menos) → **Elastic**.
> > **A errada**: Provisioned é para *"5% or more"* (carga constante) e você pagaria o pico 24 h.
> >
> > Fonte: [[3 - Performance (24%)/EFS/4 - Questoes|EFS]]

> [!question] 50. Um time precisa de uma chave para criptografar objetos no S3, com rotação anual, **sem tarifa mensal de chave**, e não precisa auditar o uso nem compartilhar entre contas.
> **A)** Customer managed key com rotação habilitada
> **B)** A AWS managed key `aws/s3`
> **C)** AWS owned key
> **D)** CloudHSM
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: AWS managed key tem rotação *"Required. Every year"* (obrigatória; todo ano), **sem tarifa mensal**, e é visualizável pelo cliente.
> > **A errada**: atende, mas tem tarifa mensal — e o enunciado descarta os motivos que justificariam customer managed.
> > **C errada**: AWS owned key não é selecionável nem visualizável; é usada internamente por serviços.
> > **D errada**: esforço e custo desproporcionais.
> >
> > Fonte: [[1 - Seguranca (30%)/KMS/4 - Questoes|KMS]]

> [!question] 51. Um relatório precisa agregar e fazer busca textual sobre 2 anos de dados da tabela.
> **A)** Scan com FilterExpression
> **B)** Streams → Lambda → OpenSearch (busca) ou Redshift/Athena (analítico)
> **C)** GSI com projeção ALL
> **D)** PITR
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: DynamoDB não faz agregação nem busca textual; o padrão é materializar num serviço adequado.
> > **A errada**: Scan lê tudo e você paga por tudo.
> >
> > Fonte: [[3 - Performance (24%)/DynamoDB/4 - Questoes|DynamoDB]]

> [!question] 52. Preciso dar acesso a um bucket da conta B para um role da conta A. O que configurar?
> **A)** Só a bucket policy na conta B
> **B)** Só a policy do role na conta A
> **C)** As duas: policy no role (conta A) e bucket policy (conta B)
> **D)** Uma SCP na organização
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: *"AWS allows the request only if both account policy evaluations allow the request."* (a AWS permite a requisição somente se as avaliações de policy das duas contas permitirem)
> > **A errada**: política de recurso sozinha só basta **dentro da mesma conta**.
> > **D errada**: SCP não concede nada.
> >
> > Fonte: [[1 - Seguranca (30%)/IAM/4 - Questoes|IAM]]

> [!question] 53. É possível bloquear as consultas DNS da VPC usando NACL?
> **A)** Sim, negando a porta 53
> **B)** Não: o tráfego do Route 53 Resolver (VPC+2) não passa pela NACL; use Route 53 Resolver DNS Firewall
> **C)** Sim, negando o IP VPC+2
> **D)** Só com security group
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: a doc lista explicitamente que as requisições DNS do Resolver não são filtradas e indica *"use Route 53 Resolver DNS Firewall instead"* (use o Route 53 Resolver DNS Firewall em vez disso).
> >
> > Fonte: [[1 - Seguranca (30%)/NACL (Network ACL)/4 - Questoes|NACL (Network ACL)]]

> [!question] 54. Qual destes **não** respeita as permissões do Lake Formation?
> **A)** Athena
> **B)** Redshift Spectrum
> **C)** EMR
> **D)** OpenSearch Service
>
> > [!success]- Resposta
> > **Resposta: D**
> >
> > **Por que D**: a lista oficial é *"Amazon Athena, Amazon Quick, Amazon Redshift Spectrum, Amazon EMR, and AWS Glue"*.
> >
> > Fonte: [[3 - Performance (24%)/OpenSearch Service/4 - Questoes|OpenSearch Service]]

> [!question] 55. A empresa precisa **garantir capacidade** numa AZ específica para um evento, sem assumir compromisso de 1 ou 3 anos.
> **A)** Reserved Instance regional
> **B)** On-Demand Capacity Reservation
> **C)** Compute Savings Plans
> **D)** Spot com persistent request
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"Reserve capacity for your EC2 instances in a specific Availability Zone"* (reserve capacidade para suas instâncias EC2 numa Zona de Disponibilidade específica), sem compromisso de prazo.
> > **A errada**: a RI **regional** é **só desconto** — não reserva capacidade.
> > **C errada**: Savings Plans é desconto, nunca capacidade.
> >
> > Fonte: [[4 - Custo (20%)/Opcoes de compra do EC2 (Spot, RI, Savings Plans)/4 - Questoes|Opcoes de compra do EC2 (Spot, RI, Savings Plans)]]

> [!question] 56. Dar acesso a todos os segmentos de um vídeo em HLS, sem alterar as URLs existentes.
> **A)** Signed URL por segmento
> **B)** Signed cookies
> **C)** Geo restriction
> **D)** OAC
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"You want to provide access to multiple restricted files, for example, all of the files for a video in HLS format"* (você quer dar acesso a vários arquivos restritos — por exemplo, todos os arquivos de um vídeo em formato HLS) e *"You don't want to change your current URLs"* (você não quer mudar suas URLs atuais).
> > **A errada**: exigiria assinar centenas de URLs e mudar os manifests.
> >
> > Fonte: [[3 - Performance (24%)/CloudFront/4 - Questoes|CloudFront]]

> [!question] 57. Antes de migrar, o time precisa descobrir quais bancos existem no datacenter e seus tamanhos.
> **A)** Application Discovery Service
> **B)** DMS Fleet Advisor
> **C)** AWS Config
> **D)** Trusted Advisor
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é o componente de **descoberta de bancos** do DMS.
> > **A errada**: Application Discovery Service descobre **servidores** (para migração de VMs).
> >
> > Fonte: [[4 - Custo (20%)/DMS (Database Migration Service)/4 - Questoes|DMS (Database Migration Service)]]

> [!question] 58. Instâncias continuam rodando, mas usuários recebem 502. O processo da aplicação travou; o SO está no ar.
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

> [!question] 59. Qual a ordem correta para otimizar o custo de uma fleet estável?
> **A)** Comprar Savings Plans e depois fazer rightsizing
> **B)** Rightsizing → desligar o ocioso → auto scaling → comprometer com Savings Plans
> **C)** Migrar tudo para Spot
> **D)** Comprar Reserved Instances de 3 anos
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: comprometer-se com capacidade **superdimensionada** congela o desperdício por 1-3 anos.
> >
> > Fonte: [[4 - Custo (20%)/Compute Optimizer/4 - Questoes|Compute Optimizer]]

> [!question] 60. Aplicação precisa do **maior IOPS possível** para um cache temporário que pode ser reconstruído.
> **A)** io2 Block Express
> **B)** Instance store
> **C)** gp3 com 16.000 IOPS
> **D)** EFS com throughput provisionado
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: disco **físico** da máquina hospedeira — o menor caminho possível. O enunciado diz **temporário e reconstruível**, que é exatamente o perfil dele.
> > **A errada**: entrega muito IOPS, mas é desnecessário (e caro) quando o dado é descartável.
> >
> > Fonte: [[9 - Fundamentos e apoio/Tipos de armazenamento (objeto, arquivo, bloco)/4 - Questoes|Tipos de armazenamento (objeto, arquivo, bloco)]]

> [!question] 61. Relatórios pesados devem rodar só nas duas instâncias maiores do cluster, sem afetar as réplicas que servem a aplicação.
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

> [!question] 62. Reescrever a URL e normalizar headers em **milhões de requisições por segundo**, com custo mínimo.
> **A)** Lambda@Edge em viewer request
> **B)** CloudFront Functions em viewer request
> **C)** ALB com regras de redirect
> **D)** Lambda no origin request
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: Functions roda em **submilissegundo** e escala para *"millions of requests per second"* (milhões de requisições por segundo); Lambda@Edge para em *"10,000 requests per second per Region"* (10.000 requisições por segundo por Região).
> > ⚠️ Mas Functions **não** tem acesso a rede nem ao body — se precisasse chamar uma API, seria Lambda@Edge.
> >
> > Fonte: [[3 - Performance (24%)/CloudFront/4 - Questoes|CloudFront]]

> [!question] 63. As aplicações precisam de **latência de disco local total**, mas a empresa quer backup offsite e capacidade de levantar na AWS em desastre.
> **A)** Volume Gateway cached
> **B)** Volume Gateway stored
> **C)** S3 File Gateway
> **D)** DataSync
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"store all your data locally. Then asynchronously back up point-in-time snapshots of this data to Amazon S3"* (guardar todos os dados localmente e, de forma assíncrona, fazer backup de snapshots pontuais desses dados no Amazon S3) — e os snapshots criam **volumes EBS** na AWS para DR.
> >
> > Fonte: [[3 - Performance (24%)/Storage Gateway/4 - Questoes|Storage Gateway]]

> [!question] 64. Com **duas** VPCs que só precisam se falar, qual a opção mais econômica?
> **A)** Transit Gateway
> **B)** VPC peering
> **C)** PrivateLink
> **D)** VPN entre as VPCs
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"There is no charge to create a VPC peering connection"* (não há cobrança para criar uma conexão de VPC peering) e dados na **mesma AZ são grátis**. O TGW cobra **por attachment/hora + por GB**.
> >
> > Fonte: [[3 - Performance (24%)/Transit Gateway/4 - Questoes|Transit Gateway]]

> [!question] 65. Qual destes recursos é **global**?
> **A)** Security Group
> **B)** IAM role
> **C)** Subnet
> **D)** VPC
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: IAM (users, roles, policies) é global. Também globais: **Route 53, CloudFront, Organizations, Global Accelerator**.
> > **A e D erradas**: regionais. **C errada**: zonal.
> >
> > Fonte: [[9 - Fundamentos e apoio/Regioes, AZs e infraestrutura global/4 - Questoes|Regioes, AZs e infraestrutura global]]
