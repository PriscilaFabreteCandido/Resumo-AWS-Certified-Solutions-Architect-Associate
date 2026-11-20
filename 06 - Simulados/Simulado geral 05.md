---
tags: [saa-c03, simulado]
gerado_por: scripts/gerar-simulados.mjs
---

# Simulado geral 05

> [!warning] Nota gerada automaticamente: não edite aqui
> Corrija a questão na nota `4 - Questoes` de origem (o link está na resposta) e rode `node scripts/gerar-simulados.mjs`.

65 questões no formato da prova, na proporção dos domínios (30% / 26% / 24% / 20%, com algumas de fundamentos). Faça de uma vez, cronometrado, e só confira as respostas no final.

> [!note] O domínio 4 (Custo) tem poucas questões próprias, então elas se repetem entre os simulados gerais.

**65 questões.** Responda de cabeça e anote a letra **antes** de abrir a resposta. Errou? Abra a **Fonte** e volte ao conteúdo daquele ponto.

---

> [!question] 1. Simulação HPC com MPI, 40 nós, menor latência possível entre eles.
> **A)** Spread em 3 AZs
> **B)** Cluster placement group numa AZ, mesmo tipo de instância, com EFA
> **C)** Partition placement group
> **D)** Instâncias em AZs diferentes atrás de um NLB
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"Packs instances close together inside an Availability Zone"* (agrupa as instâncias próximas umas das outras dentro de uma Zona de Disponibilidade), com 10 Gbps de fluxo único; EFA é o adaptador para MPI.
> > **A errada**: spread **separa** (o oposto) e limita a **7 por AZ** — 40 nós não cabem.
> > **C errada**: partition separa em racks; serve para dado distribuído, não latência mínima.
> > **D errada**: tráfego entre AZs adiciona latência; NLB não participa de MPI.
> >
> > Fonte: [[3 - Performance (24%)/Placement Groups/4 - Questoes|Placement Groups]]

> [!question] 2. Quando um snapshot de EBS terminar, uma Lambda deve copiá-lo para outra região. Menor esforço operacional?
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

> [!question] 3. Garantir que nenhuma das 30 contas crie recursos fora de `us-east-1` e `sa-east-1`, por custo e compliance.
> **A)** AWS Budgets por região
> **B)** SCP com `Deny` condicionado a `aws:RequestedRegion`
> **C)** Config rule com remediação
> **D)** Cost Explorer com filtro por região
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o verbo é **impedir** → guardrail preventivo.
> > **A errada**: Budgets avisa **depois** do gasto.
> > **C errada**: Config detecta e remedia **depois** da criação.
> >
> > Fonte: [[4 - Custo (20%)/Ferramentas de custo (Cost Explorer, Budgets, CUR)/4 - Questoes|Ferramentas de custo (Cost Explorer, Budgets, CUR)]]

> [!question] 4. Uma aplicação **nova** precisa de fila com buffer e retry, com escala praticamente ilimitada e menor esforço operacional.
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

> [!question] 5. Bloquear o país X **exceto** para o caminho `/status`.
> **A)** Geo restriction do CloudFront
> **B)** WAF com geo match rule combinada com condição de path
> **C)** NACL por faixa de IP
> **D)** Route 53 geolocation
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: a geo restriction do CloudFront vale para a **distribuição toda**.
> > **D errada**: geolocation routing escolhe **para onde** mandar, não bloqueia.
> >
> > Fonte: [[3 - Performance (24%)/CloudFront/4 - Questoes|CloudFront]]

> [!question] 6. Depois de o Inspector achar uma CVE crítica em 200 instâncias, como corrigir com menor esforço?
> **A)** O Inspector corrige automaticamente
> **B)** Systems Manager Patch Manager com patch policy, ou AMI nova + instance refresh no Auto Scaling
> **C)** Recriar as instâncias manualmente
> **D)** Security Hub com remediação
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: Inspector **detecta**; a correção é Patch Manager (in-place) ou substituição imutável da fleet.
> > **A errada**: o Inspector não aplica patch.
> > **D errada**: Security Hub consolida achados; a remediação vem de Config/SSM.
> >
> > Fonte: [[1 - Seguranca (30%)/Inspector/4 - Questoes|Inspector]]

> [!question] 7. Ingestão de IoT: 50.000 execuções por segundo, cada uma com 3 passos idempotentes de poucos segundos.
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

> [!question] 8. Uma função Lambda com alta concorrência esgota as conexões do banco.
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

> [!question] 9. ETL rotineiro de CSV para Parquet, sem framework específico, com o menor esforço operacional.
> **A)** EMR com cluster transiente
> **B)** AWS Glue
> **C)** EMR on EKS
> **D)** AWS Batch
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: sem framework nomeado e sem necessidade de controle do cluster, o serverless ganha.
> >
> > Fonte: [[3 - Performance (24%)/EMR/4 - Questoes|EMR]]

> [!question] 10. Mensagens da fila SQS estão sendo processadas em duplicidade pela Lambda. O processamento leva 100 s.
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

> [!question] 11. Reduzir o custo de um EFS com 8 TiB, dos quais 90% não são acessados há meses.
> **A)** Mudar para One Zone
> **B)** Habilitar lifecycle management para mover para EFS IA e Archive
> **C)** Mudar para Bursting
> **D)** Reduzir o número de mount targets
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o lifecycle move arquivos frios para classes muito mais baratas automaticamente.
> > **A errada**: reduz o preço por GB, mas abandona a resiliência multi-AZ de todo o file system.
> >
> > Fonte: [[3 - Performance (24%)/EFS/4 - Questoes|EFS]]

> [!question] 12. Qual destes **não** respeita as permissões do Lake Formation?
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
> > Fonte: [[3 - Performance (24%)/Lake Formation/4 - Questoes|Lake Formation]]

> [!question] 13. Vários times precisam lançar recursos em subnets gerenciadas pelo time de rede, sem criar uma VPC por conta.
> **A)** VPC peering entre todas as contas
> **B)** AWS RAM compartilhando as subnets da VPC do time de rede com as contas da organização
> **C)** Transit Gateway
> **D)** PrivateLink
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é o caso de uso de **VPC sharing** via RAM — reduz VPCs, NAT gateways e conexões.
> > **C errada**: TGW conecta VPCs **separadas**; o enunciado quer evitar criá-las.
> > **D errada**: PrivateLink expõe **serviço**, não subnet.
> >
> > Fonte: [[1 - Seguranca (30%)/Organizations e Control Tower/4 - Questoes|Organizations e Control Tower]]

> [!question] 14. É preciso **revogar imediatamente** o acesso a dados cifrados, com possibilidade de voltar atrás.
> **A)** Agendar a exclusão da KMS key
> **B)** Desabilitar a KMS key (ou ajustar a key policy)
> **C)** Deletar os objetos
> **D)** Rotacionar a chave
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: desabilitar é **imediato e reversível**.
> > **A errada**: a exclusão tem espera de **7 a 30 dias** e é **irreversível** ao final.
> > **D errada**: a rotação **mantém** o material antigo para decifrar o que já estava cifrado — não revoga nada.
> >
> > Fonte: [[9 - Fundamentos e apoio/Criptografia em repouso e em transito/4 - Questoes|Criptografia em repouso e em transito]]

> [!question] 15. Um auditor pede evidência de que os buckets estiveram criptografados durante todo o trimestre.
> **A)** AWS Artifact
> **B)** AWS Config: histórico de configuração + conformance pack, ou AWS Audit Manager para montar a evidência
> **C)** CloudTrail Lake
> **D)** Security Hub
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: histórico de conformidade ao longo do tempo é exatamente o que o Config guarda; o Audit Manager empacota como evidência.
> > **A errada**: Artifact traz a conformidade **da AWS**, não a sua.
> >
> > Fonte: [[1 - Seguranca (30%)/Config/4 - Questoes|Config]]

> [!question] 16. Qual destes o Firewall Manager **não** gerencia?
> **A)** AWS WAF
> **B)** Security groups
> **C)** IAM policies
> **D)** Route 53 Resolver DNS Firewall
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: a lista é WAF, Shield Advanced, security groups, NACLs, Network Firewall e DNS Firewall. IAM é governado por **SCP** e IAM.
> >
> > Fonte: [[1 - Seguranca (30%)/Firewall Manager/4 - Questoes|Firewall Manager]]

> [!question] 17. Qual a ordem correta para otimizar o custo de uma fleet estável?
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

> [!question] 18. RDS MySQL com CPU alta por relatórios de leitura, e o negócio exige failover automático entre AZs.
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

> [!question] 19. É preciso aplicar uma AMI corrigida em toda a fleet, sem downtime e sem alterar instâncias no lugar.
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

> [!question] 20. Q-root 4. Numa organização com 200 contas no AWS Organizations, como reduzir o risco das credenciais de root das contas-membro?
> **A)** Habilitar MFA no root de cada uma das 200 contas manualmente
> **B)** Habilitar o centralized root access e remover as credenciais de root das contas-membro
> **C)** Aplicar uma SCP negando `iam:*` ao root
> **D)** Trocar a senha do root de cada conta a cada 90 dias
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: a doc recomenda — *"we recommend removing root user credentials from member accounts to help prevent unauthorized use"* (recomendamos remover as credenciais de usuário raiz das contas-membro, para ajudar a evitar uso não autorizado). Sem credencial, a conta-membro não consegue nem fazer login no root nem recuperar a senha. Contas novas criadas na Organization já nascem **sem credencial de root**.
> > **A errada**: funciona, mas não escala e não remove o risco — só o mitiga.
> >
> > Fonte: [[1 - Seguranca (30%)/IAM/4 - Questoes|IAM]]

> [!question] 21. Migrar um Oracle on-premises de 4 TB para **Aurora PostgreSQL**, com downtime máximo de 30 minutos.
> **A)** Snapshot e restore no Aurora
> **B)** AWS SCT (ou DMS Schema Conversion) para converter o schema + DMS com full load e replicação contínua, cortando na janela de 30 min
> **C)** DMS sozinho
> **D)** `pg_dump` e restore
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é migração **heterogênea** — precisa de conversão de schema **e** de replicação contínua, para que a carga inicial ocorra com o Oracle no ar.
> > **A errada**: snapshot de Oracle não restaura em PostgreSQL.
> > **C errada**: o DMS migra **dados**, não converte procedures, triggers e tipos entre engines diferentes.
> > **D errada**: `pg_dump` lê PostgreSQL, não Oracle — e 4 TB estouraria a janela.
> >
> > Fonte: [[4 - Custo (20%)/DMS (Database Migration Service)/4 - Questoes|DMS (Database Migration Service)]]

> [!question] 22. Migrar 200 **servidores** (não bancos) para a AWS, lift and shift.
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

> [!question] 23. O Macie pode varrer um banco RDS em busca de CPFs?
> **A)** Sim, habilitando o plano de RDS
> **B)** Não: o Macie cobre buckets S3
> **C)** Sim, via AWS Config
> **D)** Sim, exportando para o S3 primeiro
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o escopo do Macie é S3.
> > **D errada**: tecnicamente, se você exportar o dado para o S3 o Macie o lê — mas isso não é "o Macie varrer o RDS", e a questão testa o escopo.
> >
> > Fonte: [[1 - Seguranca (30%)/Macie/4 - Questoes|Macie]]

> [!question] 24. Um time quer usar o NAT gateway também como bastion para acessar as instâncias privadas por SSH.
> **A)** Configurar port forwarding no NAT gateway
> **B)** Não é suportado; use SSM Session Manager (ou um bastion dedicado)
> **C)** Associar um Elastic IP adicional
> **D)** Usar NAT instance em modo bastion
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: a tabela oficial marca **bastion** e **port forwarding** como *"Not supported"* (não suportado) no NAT gateway. A solução moderna é Session Manager, *"without the need to open inbound ports, maintain bastion hosts, or manage SSH keys"* (sem precisar abrir portas de entrada, manter bastion hosts ou gerenciar chaves SSH).
> > **D errada**: funciona tecnicamente (NAT instance suporta bastion), mas é a resposta pior — você volta a gerenciar HA, patch e chave SSH.
> >
> > Fonte: [[1 - Seguranca (30%)/NAT Gateway/4 - Questoes|NAT Gateway]]

> [!question] 25. 80 TB num NAS, link de 100 Mbps, migração em **duas semanas**.
> **A)** DataSync pela internet
> **B)** AWS Snow Family (dispositivo físico)
> **C)** S3 Transfer Acceleration com multipart
> **D)** Direct Connect de 1 Gbps
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: faça a conta — 80 TB em 100 Mbps passa de **70 dias**. Link insuficiente é o gatilho.
> > **A errada**: o DataSync é limitado pelo link.
> > **C errada**: acelera, mas não cria banda.
> > **D errada**: provisionar DX leva *"up to 72 business hours"* (até 72 horas úteis) só para a porta, mais o circuito do parceiro — não cabe em 2 semanas.
> >
> > Fonte: [[4 - Custo (20%)/Snow Family/4 - Questoes|Snow Family]]

> [!question] 26. Um agente de monitoramento precisa rodar **em cada host** do cluster.
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

> [!question] 27. Aplicação licenciada **por socket físico**.
> **A)** Dedicated Instances
> **B)** Dedicated Hosts, com AWS License Manager
> **C)** RI com tenancy dedicada
> **D)** Cluster placement group
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: só o Dedicated Host expõe sockets e cores e permite *"bring your existing per-socket, per-core, or per-VM software licenses"* (traga suas licenças de software existentes, por soquete, por núcleo ou por VM).
> > **A e C erradas**: dão hardware single-tenant, **sem** visibilidade de socket.
> >
> > Fonte: [[4 - Custo (20%)/Opcoes de compra do EC2 (Spot, RI, Savings Plans)/4 - Questoes|Opcoes de compra do EC2 (Spot, RI, Savings Plans)]]

> [!question] 28. "Impedir que qualquer conta crie recursos fora de us-east-1 e sa-east-1."
> **A)** Config rule com remediação
> **B)** SCP com `Deny` condicionado a `aws:RequestedRegion`
> **C)** IAM policy em todos os roles
> **D)** Firewall Manager
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o verbo é **impedir** → guardrail preventivo.
> > **A errada**: Config detecta **depois** da criação.
> > **C errada**: inviável manter em todas as contas, e não alcança o root.
> >
> > Fonte: [[1 - Seguranca (30%)/Config/4 - Questoes|Config]]

> [!question] 29. Depois de configurar o Lake Formation, usuários continuam lendo o dado completo direto do S3.
> **A)** Falta um crawler
> **B)** O acesso direto ao bucket precisa ser restrito: o enforcement acontece nos engines, não no S3
> **C)** Falta habilitar o Glue
> **D)** Falta criptografia
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: a filtragem é aplicada pelo **engine de consulta**. Quem lê o objeto direto do S3 contorna o Lake Formation.
> > ⚠️ O **hybrid access mode** existe justamente para a transição controlada.
> >
> > Fonte: [[3 - Performance (24%)/Lake Formation/4 - Questoes|Lake Formation]]

> [!question] 30. Um domínio precisa servir `/api/*` por um conjunto de instâncias e `/*` por outro.
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

> [!question] 31. Quantos pilares tem o framework, e quais?
> **A)** 5: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization
> **B)** 6: os cinco acima + Sustainability
> **C)** 4, correspondendo aos domínios da prova
> **D)** 7
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"operational excellence, security, reliability, performance efficiency, cost optimization, and sustainability"* (excelência operacional, segurança, confiabilidade, eficiência de performance, otimização de custo e sustentabilidade). Material antigo lista cinco.
> >
> > Fonte: [[9 - Fundamentos e apoio/Well-Architected Framework/4 - Questoes|Well-Architected Framework]]

> [!question] 32. A empresa quer **manter o mesmo engine MySQL e o código da aplicação**, mas **parar de administrar backup, patch e failover do banco**.
> **A)** Rehost: MySQL numa instância EC2
> **B)** Replatform: migrar para o Amazon RDS for MySQL
> **C)** Refactor: migrar para o DynamoDB
> **D)** Retain
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é a definição de **replatform** — pouca ou nenhuma mudança no código, plataforma gerenciada. A combinação *"sem reescrever"* + *"reduzir sobrecarga operacional"* é a assinatura dele.
> > **A errada**: continuaria administrando tudo.
> > **C errada**: DynamoDB mudaria o modelo de dados e exigiria reescrever a aplicação.
> >
> > Fonte: [[9 - Fundamentos e apoio/Estrategias de migracao (7 Rs)/4 - Questoes|Estrategias de migracao (7 Rs)]]

> [!question] 33. Um private VIF precisa alcançar **12 VPCs** em 3 regiões e 4 contas.
> **A)** Um private VIF por VPC
> **B)** Direct Connect gateway associado ao private VIF
> **C)** Public VIF
> **D)** VPC peering entre as 12
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o DX gateway liga a *"multiple virtual private gateways across any account and AWS Region"* (vários virtual private gateways, em qualquer conta e Região) — e *"There are no additional charges to use a multi-account AWS Direct Connect gateway."* (não há cobrança adicional para usar um Direct Connect gateway multi-conta)
> > **A errada**: *"directly to a single VPC per private virtual interface"* (diretamente a uma única VPC por interface virtual privada) — 12 VIFs para manter.
> > ⚠️ Se as VPCs já estiverem atrás de um **Transit Gateway**, a resposta é **transit VIF** + DX gateway.
> >
> > Fonte: [[3 - Performance (24%)/Direct Connect/4 - Questoes|Direct Connect]]

> [!question] 34. Replicar um cluster Kafka para outra região, para DR.
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

> [!question] 35. Criar um alarme do CloudWatch e uma fila SQS junto com o environment, versionados com o código.
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

> [!question] 36. `exemplo.com` (ápice) precisa apontar para uma distribuição CloudFront.
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

> [!question] 37. Um bucket criptografado com **SSE-KMS** precisa ser servido pelo CloudFront, sem acesso público.
> **A)** Origin Access Identity (OAI)
> **B)** Origin Access Control (OAC), com a key policy do KMS liberando `cloudfront.amazonaws.com`
> **C)** Bucket público com geo restriction
> **D)** Presigned URL gerada no backend
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: **SSE-KMS** é uma das capacidades que **só o OAC** tem.
> > **A errada**: OAI é *"legacy, not recommended"* (geração antiga, não recomendado) e não suporta SSE-KMS.
> > ⚠️ Lembre também: Object Ownership em **Bucket owner enforced** e condição `AWS:SourceArn` na bucket policy.
> >
> > Fonte: [[3 - Performance (24%)/CloudFront/4 - Questoes|CloudFront]]

> [!question] 38. A empresa quer saber se as 400 instâncias EC2 estão superdimensionadas, com base no uso real.
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

> [!question] 39. Limitar cada parceiro a 10.000 chamadas por dia, com tiers diferentes.
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

> [!question] 40. Um cliente novo precisa de transferência física segura de grande volume. O que a AWS recomenda?
> **A)** Snowball Edge
> **B)** AWS Data Transfer Terminal (ou soluções de parceiros); DataSync para transferência online
> **C)** Snowmobile
> **D)** Storage Gateway
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"AWS Snowball Edge is no longer available to new customers. New customers should explore AWS DataSync for online transfers, AWS Data Transfer Terminal for secure physical transfers, or AWS Partner solutions."* (o AWS Snowball Edge não está mais disponível para novos clientes; eles devem considerar o AWS DataSync para transferências online, o AWS Data Transfer Terminal para transferências físicas seguras, ou soluções de parceiros da AWS)
> >
> > Fonte: [[4 - Custo (20%)/Snow Family/4 - Questoes|Snow Family]]

> [!question] 41. Containers na AWS, com o menor esforço operacional, e o time **não** conhece Kubernetes.
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

> [!question] 42. Times devem poder subir ambientes de teste sozinhos, mas só com tipos de instância aprovados e sem receber `ec2:*`.
> **A)** SCP limitando tipos de instância
> **B)** AWS Service Catalog, com products, constraints e launch role
> **C)** CloudFormation com templates no S3
> **D)** IAM policy com condição em `ec2:InstanceType`
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o usuário ganha permissão de **lançar o produto**; os recursos são criados pela **launch role**. Constraints limitam os parâmetros.
> > **A errada**: é guardrail, mas não oferece self-service nem padroniza a arquitetura.
> > **C errada**: padroniza, mas o usuário ainda precisaria de permissão para criar os recursos.
> > **D errada**: ainda concede permissão direta de EC2 ao usuário.
> >
> > Fonte: [[1 - Seguranca (30%)/Governanca (Artifact, Trusted Advisor, Service Catalog)/4 - Questoes|Governanca (Artifact, Trusted Advisor, Service Catalog)]]

> [!question] 43. Q-root 3. Uma aplicação em EC2 precisa ler um bucket do S3. Qual a abordagem correta?
> **A)** Criar um IAM user, gerar access key e colocar no arquivo de configuração
> **B)** Usar a chave de acesso do root, que já tem permissão total
> **C)** Anexar uma IAM role à instância (instance profile) com permissão só naquele bucket
> **D)** Criar um IAM user e guardar a access key no Secrets Manager
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: a boa prática nº 2 da doc é literal — *"Require workloads to use temporary credentials with IAM roles to access AWS"* (exija que as cargas de trabalho usem credenciais temporárias, com roles do IAM, para acessar a AWS). A role entrega credencial **temporária e rotacionada automaticamente**, sem segredo armazenado.
> > **D errada**: é melhor que A, mas continua sendo **credencial de longo prazo**; o Secrets Manager protege o segredo, não elimina a necessidade dele.
> > **B errada**: chave do root nunca.
> >
> > Fonte: [[1 - Seguranca (30%)/IAM/4 - Questoes|IAM]]

> [!question] 44. Uma tabela de teste recebe tráfego esporádico e imprevisível; hoje está com 500 RCU/500 WCU e utilização média de 3%.
> **A)** Reduzir para 50/50
> **B)** Mudar para on-demand
> **C)** Auto scaling com alvo de 70%
> **D)** Mudar a table class para Standard-IA
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: tráfego **esporádico e imprevisível** é o caso de uso do on-demand — pagando por requisição, ambiente ocioso quase não gera custo.
> > **A errada**: continua pagando capacidade 24/7.
> > **C errada**: auto scaling tem piso e leva **2 minutos** para reagir — em tráfego esporádico fica sempre atrasado.
> > **D errada**: Standard-IA reduz **storage** e aumenta o custo de requisição; o problema é capacidade ociosa.
> >
> > Fonte: [[3 - Performance (24%)/DynamoDB/4 - Questoes|DynamoDB]]

> [!question] 45. As instâncias não conseguem montar o EFS.
> **A)** Falta um Elastic IP
> **B)** O security group do mount target não libera NFS (porta 2049) a partir do SG dos clientes
> **C)** Falta habilitar Max I/O
> **D)** Falta um gateway endpoint
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é o erro de configuração mais comum — o mount target tem ENI com security group próprio.
> >
> > Fonte: [[3 - Performance (24%)/EFS/4 - Questoes|EFS]]

> [!question] 46. O auditor pediu o relatório **SOC 2 da AWS**. Onde obter?
> **A)** Security Hub
> **B)** AWS Config
> **C)** AWS Artifact
> **D)** AWS Audit Manager
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: Artifact é o portal dos relatórios de compliance **da AWS**.
> > **A e B erradas**: medem a **sua** postura e configuração.
> > **D errada**: Audit Manager coleta evidência do **seu** ambiente contra frameworks.
> >
> > Fonte: [[1 - Seguranca (30%)/Governanca (Artifact, Trusted Advisor, Service Catalog)/4 - Questoes|Governanca (Artifact, Trusted Advisor, Service Catalog)]]

> [!question] 47. Processar 100.000 arquivos do S3, um por job, com o mínimo de configuração.
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

> [!question] 48. É preciso habilitar e pagar algo para ter proteção contra DDoS de camada 3 e 4?
> **A)** Sim, o Shield Standard precisa ser habilitado
> **B)** Não: o Shield Standard é automático e sem custo adicional
> **C)** Sim, é preciso Shield Advanced
> **D)** Sim, é preciso WAF
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"provided automatically and at no extra charge when you use AWS"* (fornecido automaticamente e sem custo extra quando você usa a AWS) e *"AWS automatically mitigates network and transport layer (layer 3 and layer 4) DDoS attacks"* (a AWS mitiga automaticamente ataques DDoS nas camadas de rede e transporte (camadas 3 e 4)).
> >
> > Fonte: [[1 - Seguranca (30%)/Shield/4 - Questoes|Shield]]

> [!question] 49. Picos de requisição de um único IP estão derrubando a aplicação atrás de um ALB.
> **A)** Security group restringindo portas
> **B)** WAF com rate-based rule no ALB
> **C)** Shield Standard
> **D)** Aumentar o Auto Scaling
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: rate-based rule bloqueia ou conta requisições que *"exceed a specified number of requests in a minute or in five minutes"* (ultrapassem um número definido de requisições em um ou em cinco minutos).
> > **A errada**: SG trabalha em porta/protocolo/IP, não em taxa de requisição.
> > **D errada**: trata o sintoma e aumenta o custo; não bloqueia o abuso.
> >
> > Fonte: [[1 - Seguranca (30%)/WAF/4 - Questoes|WAF]]

> [!question] 50. Os registros de um mesmo dispositivo precisam ser processados **em ordem**.
> **A)** Fila FIFO do SQS
> **B)** Kinesis Data Streams com o ID do dispositivo como partition key
> **C)** SNS FIFO
> **D)** Firehose
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: a partition key manda o registro para o **mesmo shard**, e a ordem é preservada por shard.
> > **A**: também garante ordem (por message group) — é resposta válida se o cenário for **fila de trabalho**; para **stream com múltiplos consumidores e replay**, é Kinesis.
> >
> > Fonte: [[3 - Performance (24%)/Kinesis Data Streams/4 - Questoes|Kinesis Data Streams]]

> [!question] 51. 20 TB para o S3, com link de 1 Gbps disponível e sem prazo apertado.
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

> [!question] 52. Uma API exposta por **Network Load Balancer** sofre SQL injection. O que fazer?
> **A)** Associar uma web ACL do WAF ao NLB
> **B)** Colocar um ALB (ou CloudFront) na frente e associar o WAF a ele
> **C)** Ativar Shield Advanced no NLB
> **D)** NACL negando os IPs de origem
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: WAF **não** se associa a NLB. Precisa de um recurso de camada 7 na frente.
> > **C errada**: Shield é DDoS, não filtro de payload.
> > **D errada**: não detecta SQL injection, e o atacante troca de IP.
> >
> > Fonte: [[1 - Seguranca (30%)/WAF/4 - Questoes|WAF]]

> [!question] 53. Quatro sistemas precisam processar cada evento de forma independente, com garantia de que nenhum perca a mensagem se estiver fora do ar.
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

> [!question] 54. Para economizar, o time quer que 20 contas usem o **NAT gateway** de uma VPC central, via peering.
> **A)** Funciona com rotas apropriadas
> **B)** Não funciona: peering não permite usar o internet gateway nem o NAT gateway da VPC pareada
> **C)** Funciona com Transit Gateway em vez de peering
> **D)** Funciona com PrivateLink
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é a limitação clássica. Para consolidar NAT, a resposta é **VPC sharing via AWS RAM** (uma VPC central com NAT por AZ, compartilhada).
> > **C**: o TGW **pode** encaminhar para uma VPC de egress centralizada — desenho válido, mas mais complexo e cobrado por GB.
> >
> > Fonte: [[3 - Performance (24%)/VPC Peering/4 - Questoes|VPC Peering]]

> [!question] 55. Guardar e consultar 7 anos de eventos do CloudTrail com SQL, para auditoria regulatória.
> **A)** CloudWatch Logs com retenção estendida
> **B)** CloudTrail Lake
> **C)** Amazon Detective
> **D)** Event history
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: retém *"up to 3,653 days (about 10 years)"* (ou 2.557 dias, ~7 anos) e permite consulta SQL.
> > **C errada**: Detective retém **até 1 ano** e é ferramenta de investigação.
> > **D errada**: 90 dias.
> > ⚠️ Alternativa igualmente válida: **trail → S3** com lifecycle para Glacier e consulta via **Athena** — mais barato, menos conveniente.
> >
> > Fonte: [[1 - Seguranca (30%)/CloudTrail/4 - Questoes|CloudTrail]]

> [!question] 56. Relatórios de BI sobre 5 anos de vendas (petabytes), com joins complexos e 200 analistas concorrentes.
> **A)** RDS PostgreSQL com read replicas
> **B)** Amazon Redshift
> **C)** DynamoDB com GSI
> **D)** Athena sobre CSV no S3
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: data warehouse colunar, *"optimized for high-performance analysis and reporting of very large datasets"* (otimizado para análise e relatórios de alta performance sobre conjuntos de dados muito grandes), com WLM e concurrency scaling para a concorrência.
> > **A errada**: relacional por linha não escala para analítico em petabytes.
> > **C errada**: DynamoDB não faz join nem agregação.
> > **D errada**: Athena serve ad-hoc; para BI recorrente com 200 usuários e joins complexos, o Redshift é o indicado (e CSV ainda seria caro por TB escaneado).
> >
> > Fonte: [[3 - Performance (24%)/Redshift/4 - Questoes|Redshift]]

> [!question] 57. Compliance exige HSM dedicado, FIPS 140-3 nível 3, e que a AWS não tenha acesso ao material da chave.
> **A)** KMS com customer managed key
> **B)** AWS CloudHSM
> **C)** KMS com multi-Region key
> **D)** Secrets Manager com chave própria
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: três gatilhos juntos — *"general purpose, single tenant"* (uso geral, single tenant), FIPS nível 3, e *"E2E encryption is not visible to AWS"* (a criptografia ponta a ponta não é visível para a AWS).
> > **A e C erradas**: KMS é multi-tenant e gerenciado pela AWS. Customer managed dá controle de **política**, não de hardware dedicado.
> > **D errada**: Secrets Manager guarda secret de aplicação, não é cofre de chave em HSM.
> >
> > Fonte: [[1 - Seguranca (30%)/KMS/4 - Questoes|KMS]]

> [!question] 58. As recomendações para uma aplicação **memory-bound** parecem agressivas demais.
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

> [!question] 59. Antes de migrar, o time precisa descobrir quais bancos existem no datacenter e seus tamanhos.
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

> [!question] 60. Uma aplicação em t3.medium fica lenta após ~20 minutos de carga constante. O que corrigir?
> **A)** Aumentar o volume EBS
> **B)** Migrar para uma família não-burstable (M ou C) dimensionada para a carga sustentada
> **C)** Habilitar enhanced networking
> **D)** Mudar para instance store
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: a família T é burstable — esgota créditos de CPU sob carga constante acima do baseline.
> > **A errada**: o gargalo é CPU, não disco.
> > **C errada**: enhanced networking afeta rede.
> > **D errada**: afeta I/O local.
> > ⚠️ Alternativa paliativa real: ligar o modo *unlimited* do T — mas aí você paga o excedente, e a prova prefere a família correta.
> >
> > Fonte: [[3 - Performance (24%)/EC2/4 - Questoes|EC2]]

> [!question] 61. Uma aplicação em 3 AZs usa **um** NAT gateway e envia 50 TB/mês para um bucket S3 na mesma região. Qual mudança reduz mais o custo?
> **A)** Criar um NAT gateway por AZ
> **B)** Gateway endpoint para o S3 nas route tables das subnets privadas
> **C)** Substituir o NAT gateway por NAT instances
> **D)** Habilitar Transfer Acceleration no bucket
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: elimina os 50 TB do GB processado do NAT **e** o cross-AZ, sem custo adicional de endpoint.
> > **A errada**: corta o cross-AZ, mas você continua pagando por GB no NAT.
> > **C errada**: troca uma cobrança por outra e adiciona esforço de HA e patch.
> > **D errada**: **adiciona** custo, e é para upload de fora da AWS.
> >
> > Fonte: [[1 - Seguranca (30%)/NAT Gateway/4 - Questoes|NAT Gateway]]

> [!question] 62. Um pipeline de renderização processa milhares de frames independentes e reiniciáveis; custo é prioridade.
> **A)** On-Demand com Auto Scaling
> **B)** Spot via EC2 Fleet com `price capacity optimized` e capacity rebalancing
> **C)** Reserved Instances de 1 ano
> **D)** Spot Fleet com `lowest price`
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: trabalho idempotente e reiniciável é o caso de uso do Spot; *price capacity optimized* é a estratégia **recomendada**.
> > **D errada**: `lowest-price` é **"(not recommended)"** e *"has the highest risk of interruption"* (tem o maior risco de interrupção) — mas é o **default da CLI**, por isso aparece tanto.
> >
> > Fonte: [[4 - Custo (20%)/Opcoes de compra do EC2 (Spot, RI, Savings Plans)/4 - Questoes|Opcoes de compra do EC2 (Spot, RI, Savings Plans)]]

> [!question] 63. Descobrir que instâncias usavam uma AMI vulnerável há três semanas.
> **A)** CloudTrail event history
> **B)** AWS Config, consultando o histórico de configuração
> **C)** Inspector
> **D)** CloudWatch Logs
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o Config mantém o **histórico de configuração** e as relações entre recursos.
> > **A errada**: o CloudTrail mostra as **chamadas** (quem lançou), mas reconstruir o inventário histórico a partir delas é trabalhoso.
> > **C errada**: Inspector mostra a vulnerabilidade **agora**, não o inventário passado.
> >
> > Fonte: [[1 - Seguranca (30%)/Config/4 - Questoes|Config]]

> [!question] 64. Uma VPC com subnets em 3 AZs tem **um** NAT Gateway na AZ A. A AZ A falha.
> **A)** O NAT Gateway migra automaticamente
> **B)** As instâncias privadas das AZs B e C perdem a saída para a internet
> **C)** Nada acontece — NAT Gateway é regional
> **D)** O ALB assume o roteamento
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: **NAT Gateway é zonal**. A boa prática é **um por AZ**, com a route table de cada subnet privada apontando para o da sua própria AZ — isso também evita cobrança de tráfego entre AZs.
> >
> > Fonte: [[9 - Fundamentos e apoio/Regioes, AZs e infraestrutura global/4 - Questoes|Regioes, AZs e infraestrutura global]]

> [!question] 65. Reduzir custo de 200 volumes gp2 de 1 TiB cada, usados a 150 GiB, sem perder performance.
> **A)** Reduzir o tamanho dos volumes para 200 GiB
> **B)** Migrar para gp3 e provisionar IOPS/throughput independentemente do tamanho
> **C)** Migrar para sc1
> **D)** Migrar para io2
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: no gp2 o tamanho era inflado só para ganhar IOPS; no gp3 você desacopla e paga menos.
> > **A errada**: em gp2, reduzir o tamanho **reduz os IOPS**.
> > **C errada**: sc1 é HDD com 250 IOPS — mataria a performance.
> >
> > Fonte: [[3 - Performance (24%)/EBS/4 - Questoes|EBS]]
