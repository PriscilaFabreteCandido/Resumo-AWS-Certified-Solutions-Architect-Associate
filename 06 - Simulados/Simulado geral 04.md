---
tags: [saa-c03, simulado]
gerado_por: scripts/gerar-simulados.mjs
---

# Simulado geral 04

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

> [!question] 2. Ambientes de desenvolvimento rodam 24/7 em on-demand, mas são usados de 8h às 19h em dias úteis.
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

> [!question] 3. Três filiais precisam se comunicar entre si e com a VPC, sem links diretos entre elas.
> **A)** Transit Gateway peering
> **B)** VPN CloudHub
> **C)** Três VPNs independentes
> **D)** VPC peering
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: CloudHub é o modelo **hub-and-spoke** em que os sites remotos se falam através do virtual private gateway.
> > **C errada**: sem o CloudHub, as filiais alcançam a VPC mas não umas às outras.
> >
> > Fonte: [[3 - Performance (24%)/VPN (Site-to-Site)/4 - Questoes|VPN (Site-to-Site)]]

> [!question] 4. Como ser notificado de manutenção programada que afeta instâncias específicas da sua conta?
> **A)** CloudWatch alarme
> **B)** AWS Health Dashboard (Your account health), com EventBridge para automação
> **C)** Trusted Advisor
> **D)** AWS Config
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: a visão "Your account health" mostra eventos que afetam **os seus** recursos, e gera eventos no EventBridge.
> >
> > Fonte: [[1 - Seguranca (30%)/Governanca (Artifact, Trusted Advisor, Service Catalog)/4 - Questoes|Governanca (Artifact, Trusted Advisor, Service Catalog)]]

> [!question] 5. Logs em CSV no S3 somam 3 TB/mês e são consultados ad-hoc com SQL. A conta do Athena está alta. O que reduz o custo com o menor esforço?
> **A)** Migrar para Redshift
> **B)** Converter para Parquet comprimido e particionar por data
> **C)** Usar EMR com Spark
> **D)** Reduzir a retenção dos logs
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: a cobrança é por **TB escaneado**. No exemplo oficial, 3 TB de texto (US$ 15) vira **US$ 1,25** em Parquet lendo uma coluna — e a partição reduz outra ordem de magnitude.
> > **A errada**: traz cluster e custo fixo para consulta **ad-hoc**.
> > **C errada**: mais esforço operacional, não menos.
> > **D errada**: perde dado — é redução de escopo, não otimização.
> >
> > Fonte: [[3 - Performance (24%)/Athena/4 - Questoes|Athena]]

> [!question] 6. Aplicação TCP de alta performance precisa de **IPs estáticos** para liberar em firewalls de clientes, com latência mínima.
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

> [!question] 7. 2.000 parâmetros de configuração, versionados, com o **menor custo possível**.
> **A)** Secrets Manager
> **B)** Parameter Store, tier Standard
> **C)** DynamoDB
> **D)** Arquivo JSON no S3
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: cabe nos 10.000 parâmetros e 4 KB do Standard, tem versionamento nativo (100 versões) e **não tem cobrança adicional**.
> > **A errada**: cobra **por secret por mês** — 2.000 secrets de configuração é desperdício.
> > **C e D erradas**: você reconstrói versionamento, hierarquia e controle de acesso por item.
> >
> > Fonte: [[1 - Seguranca (30%)/Secrets Manager/4 - Questoes|Secrets Manager]]

> [!question] 8. Qual a diferença essencial entre **pilot light** e **warm standby**?
> **A)** Pilot light fica na mesma Região
> **B)** No warm standby o ambiente é uma cópia reduzida mas totalmente funcional e ligada; no pilot light os servidores de aplicação estão desligados
> **C)** Pilot light não replica dados
> **D)** Warm standby não precisa de DNS failover
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: a palavra da doc é *"fully functional"* (totalmente funcional) para warm standby, contra *"switched off"* (desligados) no pilot light.
> > **C errada**: pilot light **replica** os dados — é o que o define.
> >
> > Fonte: [[9 - Fundamentos e apoio/Disaster Recovery (RPO e RTO)/4 - Questoes|Disaster Recovery (RPO e RTO)]]

> [!question] 9. O consumidor de fila em ASG não escala no pico; a CPU fica em 20% e a fila acumula.
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

> [!question] 10. Usuários **não autenticados** precisam de acesso de leitura a um bucket público-restrito. É possível com Cognito?
> **A)** Não
> **B)** Sim: o identity pool emite credencial para guest users
> **C)** Só com user pool
> **D)** Só com IAM user anônimo
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"An identity pool can also issue limited-privilege credentials to guest users who haven't signed in."* (um identity pool também pode emitir credenciais de privilégio limitado para usuários convidados que não fizeram login)
> >
> > Fonte: [[1 - Seguranca (30%)/Cognito/4 - Questoes|Cognito]]

> [!question] 11. Uma empresa precisa garantir que os restores Expedited **nunca** sejam recusados em pico de demanda.
> **A)** Usar o tier Standard
> **B)** Comprar provisioned capacity (Glacier Flexible Retrieval)
> **C)** Mudar para Deep Archive
> **D)** Usar S3 Batch Operations
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"Provisioned capacity helps ensure that your retrieval capacity for Expedited retrievals... is available when you need it."* (a capacidade provisionada ajuda a garantir que sua capacidade de recuperação Expedited... esteja disponível quando você precisar)
> >
> > Fonte: [[3 - Performance (24%)/S3 Glacier/4 - Questoes|S3 Glacier]]

> [!question] 12. 12 VPCs em 4 contas precisam se comunicar, com crescimento previsto.
> **A)** Transit Gateway
> **B)** VPC peering full mesh
> **C)** PrivateLink entre todas
> **D)** VPN entre cada par
>
> > [!success]- Resposta
> > **Resposta: A**
> >
> > **Por que A**: 12 VPCs em malha = **66** conexões, e peering **não é transitivo**.
> > **C errada**: PrivateLink expõe **serviço**, não conecta redes.
> >
> > Fonte: [[3 - Performance (24%)/VPC Peering/4 - Questoes|VPC Peering]]

> [!question] 13. Um stream do DynamoDB precisa ser filtrado, enriquecido com dados de uma API e entregue a vários consumidores.
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

> [!question] 14. Como dar a um pod permissão para ler um bucket S3, com menor privilégio?
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

> [!question] 15. 25 contas, política única de backup para EBS, RDS, DynamoDB e EFS, com cópia em outra região e proteção contra exclusão.
> **A)** Lambda agendada por conta criando snapshots
> **B)** AWS Backup com backup plan aplicado via Organizations, cópia cross-Region e Vault Lock
> **C)** Data Lifecycle Manager por conta
> **D)** AWS Config com remediação automática
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: cobre os quatro serviços, aplica centralmente, copia cross-Region e trava a retenção.
> > **A errada**: esforço alto e nenhuma proteção de retenção.
> > **C errada**: DLM cobre **EBS snapshots e AMIs** apenas, e não é centralizado.
> > **D errada**: Config avalia conformidade; não faz backup.
> >
> > Fonte: [[1 - Seguranca (30%)/AWS Backup/4 - Questoes|AWS Backup]]

> [!question] 16. Compliance exige que **nenhuma** conta possa desabilitar o CloudTrail, nem o root dela. Qual solução?
> **A)** Policy IAM com `Deny` em `cloudtrail:StopLogging` em todos os usuários
> **B)** SCP com `Deny` em `cloudtrail:StopLogging` e `cloudtrail:DeleteTrail` na raiz da organização
> **C)** Permissions boundary em todos os roles
> **D)** AWS Config rule que reativa o CloudTrail
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: SCP é o único controle que alcança o **root de uma conta membro** — *"SCPs affect the root user of member accounts"* (SCPs afetam o usuário raiz das contas-membro).
> > **A errada**: policy IAM não se aplica ao root.
> > **C errada**: boundary se aplica a users e roles, não ao root.
> > **D errada**: Config **detecta e remedia depois**; o enunciado pede prevenção.
> > ⚠️ Lembre: a SCP **não** afeta a **conta de gerenciamento**.
> >
> > Fonte: [[1 - Seguranca (30%)/IAM/4 - Questoes|IAM]]

> [!question] 17. Uma empresa quer montar uma estrutura multi-conta com contas de log e auditoria, Config e CloudTrail organizacionais e SSO, no menor tempo.
> **A)** Criar as contas manualmente e configurar cada serviço
> **B)** AWS Control Tower
> **C)** CloudFormation StackSets
> **D)** Service Catalog
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é a landing zone pronta — *"pre-packaged governance rules for security, operations, and compliance"* (regras de governança prontas, de segurança, operação e conformidade).
> > **C errada**: StackSets distribui stacks (e o Control Tower os usa internamente), mas não traz a estrutura opinativa pronta.
> > **D errada**: Service Catalog é catálogo de produtos para os times consumirem.
> >
> > Fonte: [[1 - Seguranca (30%)/Organizations e Control Tower/4 - Questoes|Organizations e Control Tower]]

> [!question] 18. Um agente de monitoramento precisa rodar **em cada host** do cluster.
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

> [!question] 19. Um workflow precisa subir um cluster EMR, esperar o job terminar e então seguir.
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

> [!question] 20. O time quer medir quantas requisições uma nova regra bloquearia, sem afetar os usuários.
> **A)** Associar a web ACL em modo de teste
> **B)** Configurar a ação da regra como `Count`
> **C)** Usar CloudWatch Logs Insights
> **D)** Criar a regra em outra web ACL
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: `Count` *"só conta"* — é exatamente o modo de avaliação sem impacto.
> >
> > Fonte: [[1 - Seguranca (30%)/WAF/4 - Questoes|WAF]]

> [!question] 21. Além de EC2, o que mais o Compute Optimizer analisa?
> **A)** Só EC2
> **B)** Auto Scaling groups, volumes EBS, funções Lambda e serviços ECS no Fargate
> **C)** Apenas EC2 e RDS
> **D)** Todos os serviços da AWS
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: inclui o rightsizing de **memória do Lambda**, que tem efeito direto no custo.
> >
> > Fonte: [[4 - Custo (20%)/Compute Optimizer/4 - Questoes|Compute Optimizer]]

> [!question] 22. A empresa tem **três florestas** de Active Directory e quer SSO nas contas AWS.
> **A)** Um AD Connector para cada floresta, todos no Identity Center
> **B)** AWS Managed Microsoft AD com trust para as florestas
> **C)** AD Connector apontando para a floresta raiz
> **D)** Simple AD consolidando as três
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: a doc é literal — *"If you need to support multiple domains or forests, use Directory Service for Microsoft Active Directory."* (se você precisa atender vários domínios ou florestas, use o Directory Service for Microsoft Active Directory)
> > **A errada**: *"You can connect only one AD Connector directory or one directory in AWS Managed Microsoft AD at a time."* (você pode conectar apenas um diretório do AD Connector ou um do AWS Managed Microsoft AD por vez) E a relação é 1-para-1 com **um domínio**.
> > **C errada**: *"AD Connector does not support Active Directory transitive trusts."* (o AD Connector não oferece suporte a trusts transitivos do Active Directory)
> >
> > Fonte: [[1 - Seguranca (30%)/Directory Service/4 - Questoes|Directory Service]]

> [!question] 23. Antes de aplicar uma mudança, o time precisa saber se o banco será recriado.
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

> [!question] 24. Um dataset de 100 TB no S3 precisa ser lido com throughput de centenas de GB/s por um cluster EMR.
> **A)** EMRFS direto no S3
> **B)** FSx for Lustre com o bucket S3 vinculado
> **C)** HDFS nos core nodes
> **D)** EFS com throughput Elastic
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: Lustre é o file system de HPC, e *"transparently presents S3 objects as files"* (apresenta os objetos do S3 como arquivos, de forma transparente) — o dataset fica no S3 e o cluster lê com throughput extremo.
> > **C errada**: exigiria copiar 100 TB para o HDFS primeiro.
> >
> > Fonte: [[3 - Performance (24%)/EMR/4 - Questoes|EMR]]

> [!question] 25. Como invalidar imediatamente todas as sessões temporárias já emitidas para uma role comprometida?
> **A)** Deletar a role
> **B)** Anexar à role uma policy com `Deny` condicionado a `aws:TokenIssueTime` anterior ao momento atual
> **C)** Chamar `sts:RevokeSession`
> **D)** Esperar a expiração
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: credencial temporária não é revogável, mas você pode negar o uso de tokens emitidos antes de um instante.
> > **A errada**: deletar a role quebra a aplicação inteira e não é o procedimento recomendado.
> > **C errada**: essa API não existe.
> > **D errada**: deixa a janela de ataque aberta.
> >
> > Fonte: [[1 - Seguranca (30%)/STS/4 - Questoes|STS]]

> [!question] 26. O requisito diz: *"as chaves devem ficar em HSM single-tenant validado em FIPS 140-3 nível 3, sob nosso controle exclusivo"*.
> **A)** KMS com customer managed key
> **B)** AWS CloudHSM
> **C)** Secrets Manager
> **D)** KMS com material de chave importado
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: as palavras **single-tenant**, **FIPS nível 3** e **controle exclusivo** apontam para CloudHSM. No KMS o HSM é **multi-tenant**.
> > **D errada**: importar material no KMS dá controle sobre a **origem** da chave, mas o HSM continua sendo da AWS e compartilhado.
> >
> > Fonte: [[9 - Fundamentos e apoio/Criptografia em repouso e em transito/4 - Questoes|Criptografia em repouso e em transito]]

> [!question] 27. Garantir que os logs do CloudTrail não possam ser apagados por ninguém, nem pelo root, por 5 anos.
> **A)** Bucket policy com Deny em `s3:DeleteObject`
> **B)** Versionamento + S3 Object Lock em modo Compliance com retenção de 5 anos, em bucket de outra conta
> **C)** MFA Delete
> **D)** Glacier Deep Archive
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: só o modo **Compliance** impede o root — *"can't be overwritten or deleted by any user, including the root user"* (não pode ser sobrescrito nem apagado por nenhum usuário, inclusive o usuário raiz).
> > **A errada**: quem edita a policy remove o Deny.
> > **C errada**: quem tem o MFA do root apaga.
> > **D errada**: classe de armazenamento é custo, não imutabilidade.
> >
> > Fonte: [[1 - Seguranca (30%)/CloudTrail/4 - Questoes|CloudTrail]]

> [!question] 28. A diretoria quer ser notificada quando o gasto mensal **previsto** passar de US$ 50.000, e que novos lançamentos de EC2 sejam bloqueados nesse caso.
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

> [!question] 29. Reduzir o custo de um cluster de containers com carga **estável 24/7**, sem voltar para EC2 gerenciado.
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

> [!question] 30. Depois de criar um workflow Express, o time percebe que precisa de exactly-once. O que fazer?
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

> [!question] 31. Um time precisa poder criar roles para suas aplicações, mas sem nunca conceder mais que leitura no S3. Qual mecanismo?
> **A)** SCP na conta do time
> **B)** Permissions boundary exigida nas roles que o time cria
> **C)** Session policy
> **D)** Grupo IAM com política de leitura
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: boundary é o mecanismo de **delegação segura** — o time cria roles, mas a permissão efetiva é a interseção com o teto.
> > **A errada**: SCP funcionaria como guardrail de conta, mas é grosseiro e gerenciado pela organização, não pelo dono da conta; o caso descrito é delegação de criação de role.
> > **C errada**: session policy vale para uma sessão, não para roles futuras.
> > **D errada**: grupo controla o que o time faz, não o que as roles criadas por ele podem fazer.
> >
> > Fonte: [[1 - Seguranca (30%)/IAM/4 - Questoes|IAM]]

> [!question] 32. Qual mecanismo criptografa os dados **em trânsito** entre o cliente e a aplicação?
> **A)** KMS com customer managed key
> **B)** TLS com certificado do ACM
> **C)** SSE-KMS
> **D)** CloudHSM
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o guia separa as skills — em repouso é KMS, em trânsito é *"ACM using TLS"* (ACM, usando TLS).
> > **A, C e D erradas**: todas tratam de dado **em repouso** (ou de gestão de chave).
> >
> > Fonte: [[1 - Seguranca (30%)/ACM (Certificate Manager)/4 - Questoes|ACM (Certificate Manager)]]

> [!question] 33. Um pipeline de CI/CD fora da AWS precisa fazer deploy sem armazenar access key. O que configurar?
> **A)** IAM user com access key rotacionada por Lambda
> **B)** OIDC identity provider na conta e `AssumeRoleWithWebIdentity`
> **C)** Credencial no Secrets Manager
> **D)** VPN para a VPC
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o pipeline apresenta um token OIDC assinado pelo provedor e recebe credencial temporária — **sem segredo armazenado**.
> > **A errada**: continua existindo uma credencial de longo prazo.
> > **C errada**: move o segredo de lugar; não o elimina (e o CI ainda precisaria de credencial para ler o secret).
> > **D errada**: rede não é autenticação.
> >
> > Fonte: [[1 - Seguranca (30%)/STS/4 - Questoes|STS]]

> [!question] 34. A empresa comprou Savings Plans e quer saber se está usando o que comprometeu.
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

> [!question] 35. O certificado criado no ACM não aparece para associar à distribuição do CloudFront.
> **A)** O certificado precisa ser importado, não emitido
> **B)** Para CloudFront, o certificado tem de estar em `us-east-1`
> **C)** CloudFront só aceita certificado de terceiros
> **D)** Falta validar por e-mail
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: CloudFront é global e lê certificados de **us-east-1** (N. Virginia). O mesmo vale para o **WAF com escopo CLOUDFRONT**.
> >
> > Fonte: [[9 - Fundamentos e apoio/Regioes, AZs e infraestrutura global/4 - Questoes|Regioes, AZs e infraestrutura global]]

> [!question] 36. A conta B precisa ler um secret da conta A. O acesso falha mesmo com a resource policy correta no secret. O que falta?
> **A)** Replicar o secret para a conta B
> **B)** A key policy da chave KMS (customer managed) precisa liberar a conta B
> **C)** Habilitar rotação
> **D)** Criar um VPC endpoint
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o secret é criptografado com KMS, e a key policy é exceção que *"must explicitly allow access for principals"* (precisam permitir o acesso explicitamente para os principais).
> > ⚠️ E se o secret estiver usando a **AWS managed key** `aws/secretsmanager`, o compartilhamento cross-account **não é possível** — precisa de customer managed key.
> >
> > Fonte: [[1 - Seguranca (30%)/Secrets Manager/4 - Questoes|Secrets Manager]]

> [!question] 37. Carregar um stream no **Redshift** com o Firehose. O que acontece por baixo?
> **A)** Insere direto no Redshift via JDBC
> **B)** Entrega no S3 primeiro e então emite um comando `COPY`
> **C)** Usa o Glue para carregar
> **D)** Usa Redshift Spectrum
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"streaming data is delivered to your S3 bucket first. Amazon Data Firehose then issues an Amazon Redshift COPY command."* (os dados de streaming são entregues primeiro ao seu bucket S3; em seguida o Amazon Data Firehose emite um comando COPY do Amazon Redshift)
> >
> > Fonte: [[3 - Performance (24%)/Kinesis Data Firehose/4 - Questoes|Kinesis Data Firehose]]

> [!question] 38. 50.000 jobs independentes de análise, cada um de ~20 minutos, com o menor custo e tolerantes a interrupção.
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

> [!question] 39. Requisito: HSM dedicado, FIPS 140-3 nível 3, e a AWS não pode acessar o material da chave.
> **A)** KMS com customer managed key e rotação anual
> **B)** AWS CloudHSM
> **C)** KMS com multi-Region key
> **D)** Secrets Manager com chave própria
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: os três gatilhos juntos. *"single tenant"* (inquilino único), FIPS nível 3, *"E2E encryption is not visible to AWS"* (a criptografia ponta a ponta não é visível para a AWS).
> > **A e C erradas**: KMS é multi-tenant e gerenciado pela AWS.
> > **D errada**: Secrets Manager guarda secret, não é cofre de chave em HSM.
> >
> > Fonte: [[1 - Seguranca (30%)/CloudHSM/4 - Questoes|CloudHSM]]

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

> [!question] 41. As mensagens para um endpoint HTTPS de parceiro estão sendo perdidas quando o parceiro fica fora do ar.
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

> [!question] 42. As VPCs A↔B e B↔C estão pareadas. A VPC A alcança a VPC C?
> **A)** Sim, via roteamento transitivo
> **B)** Não: VPC peering não é transitivo
> **C)** Sim, se B tiver uma rota
> **D)** Sim, com NAT em B
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: peering é **1:1**. Para transitividade, **Transit Gateway**.
> >
> > Fonte: [[3 - Performance (24%)/VPC Peering/4 - Questoes|VPC Peering]]

> [!question] 43. A empresa quer reduzir custo saindo das licenças Oracle.
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

> [!question] 44. Uma tabela atende leitura intensa de itens individuais em milissegundos, mas o time precisa de **microssegundos** sem mudar o modelo de dados.
> **A)** Aumentar as RCUs
> **B)** Adicionar um cluster DAX na frente da tabela
> **C)** ElastiCache for Redis como cache-aside
> **D)** Global Tables
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é o cache nativo do DynamoDB, com **API compatível** (mudança mínima) e write-through.
> > **A errada**: RCU resolve **throughput**, não latência.
> > **C errada**: funciona, mas você implementa cache-aside, invalidação e serialização à mão.
> > **D errada**: Global Tables resolve **geografia**, não latência local.
> > ⚠️ E a ressalva: se a aplicação exigir **leitura forte**, o DAX **não** ajuda.
> >
> > Fonte: [[3 - Performance (24%)/DAX/4 - Questoes|DAX]]

> [!question] 45. Uma aplicação IPv6 em subnet privada precisa baixar atualizações da internet, sem aceitar conexões de entrada.
> **A)** NAT gateway
> **B)** Egress-only internet gateway
> **C)** Internet gateway com NACL restritiva
> **D)** NAT instance com IPv6
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"is for use with IPv6 traffic only. To enable outbound-only internet communication over IPv4, use a NAT gateway instead."* (serve apenas para tráfego IPv6; para permitir comunicação de saída pela internet em IPv4, use um NAT gateway)
> > **A errada**: NAT gateway é a resposta para **IPv4**.
> > **C errada**: IGW é bidirecional; depender de NACL para simular saída-somente é frágil.
> > **D errada**: não é o mecanismo suportado para IPv6 de saída.
> >
> > Fonte: [[1 - Seguranca (30%)/VPC/4 - Questoes|VPC]]

> [!question] 46. 80 TB num NAS, link de 100 Mbps, migração em **duas semanas**.
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

> [!question] 47. Um NLB distribui desigualmente: a AZ com 2 instâncias recebe metade do tráfego, a AZ com 8 recebe a outra metade.
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

> [!question] 48. Um cluster de containers em **Fargate** roda estável 24/7. Como reduzir o custo?
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

> [!question] 49. Compliance exige que **nenhuma** conta possa desabilitar o CloudTrail, nem o root dela.
> **A)** Policy IAM com `Deny` em `cloudtrail:StopLogging` em todos os usuários
> **B)** SCP com `Deny` em `cloudtrail:StopLogging` e `cloudtrail:DeleteTrail` na raiz da organização
> **C)** Permissions boundary em todos os roles
> **D)** AWS Config rule que reativa o CloudTrail
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: SCP é o único controle que alcança o **root de uma conta membro**.
> > **A errada**: policy IAM não se aplica ao root.
> > **C errada**: boundary se aplica a users e roles, não ao root.
> > **D errada**: Config **detecta e remedia depois**; o enunciado pede prevenção.
> > ⚠️ A SCP **não** protege a **management account** — por isso não se roda workload nela.
> >
> > Fonte: [[1 - Seguranca (30%)/Organizations e Control Tower/4 - Questoes|Organizations e Control Tower]]

> [!question] 50. A aplicação demora minutos para voltar depois de um failover do Aurora, por cache de DNS.
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

> [!question] 51. Como eliminar a senha do banco da aplicação, mantendo rotação automática?
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

> [!question] 52. Parceiros enviam arquivos diários por **SFTP**. A empresa quer eliminar o servidor SFTP em EC2.
> **A)** DataSync
> **B)** AWS Transfer Family
> **C)** S3 File Gateway
> **D)** S3 Transfer Acceleration
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: endpoint **SFTP gerenciado** sobre S3/EFS — sem patch, HA ou disco para manter.
> > **A errada**: DataSync é **você** movendo dados, não terceiro enviando.
> > **C errada**: File Gateway é acesso **local** por NFS/SMB.
> > **D errada**: acelera upload para o S3, mas não fala SFTP.
> >
> > Fonte: [[3 - Performance (24%)/Transfer Family/4 - Questoes|Transfer Family]]

> [!question] 53. Logs são lidos muito nos primeiros 30 dias, raramente nos 11 meses seguintes, e precisam ficar 7 anos com acesso em até 12 h. Lifecycle mais econômico?
> **A)** Standard → Standard-IA (30 d) → Glacier Instant Retrieval (1 ano) → expira em 7 anos
> **B)** Standard → Standard-IA (30 d) → Glacier Flexible Retrieval (1 ano) → Deep Archive → expira em 7 anos
> **C)** Standard → One Zone-IA (30 d) → Deep Archive (1 ano)
> **D)** Intelligent-Tiering desde o início
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: respeita a cascata, usa IA no período de acesso raro e desce para arquivamento. Deep Archive atende "até 12 h" com Standard retrieval e é a classe mais barata.
> > **A errada**: Glacier IR é mais caro que FR/Deep para dado raramente lido, e desperdiça o requisito folgado de 12 h.
> > **C errada**: One Zone-IA para log de compliance é 1 AZ — risco inaceitável.
> > **D errada**: o padrão de acesso é **conhecido**; a taxa de monitoramento por objeto é desperdício.
> >
> > Fonte: [[3 - Performance (24%)/S3/4 - Questoes|S3]]

> [!question] 54. A aplicação sofre flood de requisições HTTP válidas de milhares de IPs distintos, com payload legítimo.
> **A)** Só Shield Standard
> **B)** WAF com rate-based rule (agrupando por header/token, não só por IP) + Shield Advanced para mitigação automática de camada 7
> **C)** NACL negando os IPs
> **D)** Security group restritivo
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: flood de camada 7 distribuído precisa de filtro de aplicação; com milhares de IPs, agrupar o rate por IP é fraco — agrupar por token/header é o ajuste. O Advanced adiciona a mitigação automática de L7.
> > **C errada**: milhares de IPs rotativos tornam a lista impraticável.
> >
> > Fonte: [[1 - Seguranca (30%)/Shield/4 - Questoes|Shield]]

> [!question] 55. Qual a capacidade usável do **Snowball Edge Storage Optimized**?
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

> [!question] 56. O data center fecha em **3 meses** e a equipe **não pode alterar as aplicações**.
> **A)** Refactor para serverless
> **B)** Rehost (lift and shift) com o AWS Application Migration Service
> **C)** Replatform de tudo para serviços gerenciados
> **D)** Repurchase por equivalentes SaaS
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: prazo curto + nenhuma mudança de código = **rehost**. O MGN replica os servidores em nível de bloco com cutover de minutos.
> > **A e C erradas**: exigem tempo e alterações que o enunciado proíbe.
> >
> > Fonte: [[9 - Fundamentos e apoio/Estrategias de migracao (7 Rs)/4 - Questoes|Estrategias de migracao (7 Rs)]]

> [!question] 57. Limitar quanto cada equipe pode escanear por mês, com cobrança separada.
> **A)** IAM policy por usuário
> **B)** Workgroups do Athena, com limite de dados escaneados
> **C)** AWS Budgets
> **D)** Capacity Reservations
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: workgroups isolam equipes, aplicam limite de escaneamento e separam a cobrança.
> > **C errada**: Budgets **alerta**, não limita a query.
> >
> > Fonte: [[3 - Performance (24%)/Athena/4 - Questoes|Athena]]

> [!question] 58. Carga estável 24/7, família e região **definidas**, e o time quer o **maior desconto**.
> **A)** Compute Savings Plans
> **B)** EC2 Instance Savings Plans
> **C)** Convertible RI
> **D)** On-Demand com Auto Scaling
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: até **72%**, contra 66% do Compute — em troca de amarrar família e região.
> > **C errada**: Convertible dá **menos** desconto que Standard, e a AWS recomenda Savings Plans sobre RI.
> >
> > Fonte: [[4 - Custo (20%)/Opcoes de compra do EC2 (Spot, RI, Savings Plans)/4 - Questoes|Opcoes de compra do EC2 (Spot, RI, Savings Plans)]]

> [!question] 59. Compartilhar tabelas do data lake com outra conta, mantendo permissão por coluna.
> **A)** Bucket policy cross-account
> **B)** Lake Formation cross-account sharing
> **C)** AWS RAM compartilhando o bucket
> **D)** Copiar os dados para a outra conta
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é o recurso nativo, preservando a granularidade.
> > **A errada**: dá acesso ao objeto inteiro.
> >
> > Fonte: [[3 - Performance (24%)/Lake Formation/4 - Questoes|Lake Formation]]

> [!question] 60. Um teste de DR precisa trocar a região primária do Global Database **sem perda de dados**.
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

> [!question] 61. Migrar MySQL on-premises para **Aurora MySQL** com downtime mínimo.
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

> [!question] 62. A aplicação recebe erros 503 Slow Down ao gravar milhares de objetos por segundo, todos no mesmo caminho. O que fazer?
> **A)** Abrir ticket para aumentar o limite do bucket
> **B)** Distribuir as chaves em vários prefixos e aplicar retry com backoff exponencial
> **C)** Habilitar Transfer Acceleration
> **D)** Migrar para o S3 Express One Zone
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o limite é **por prefixo** (3.500 escritas/s), e *"There are no limits to the number of prefixes in a bucket"* (não há limite para a quantidade de prefixos num bucket).
> > **A errada**: não existe limite por bucket para aumentar.
> > **C errada**: acelera upload de longe; não muda a taxa por prefixo.
> > **D errada**: é a resposta para centenas de milhares de req/s com latência de 1 dígito de ms — exagero aqui, e muda a classe/custo.
> >
> > Fonte: [[3 - Performance (24%)/S3/4 - Questoes|S3]]

> [!question] 63. O tráfego precisa passar de 1,25 Gbps por túnel.
> **A)** Criar uma segunda conexão VPN
> **B)** Large Bandwidth Tunnel (até 5 Gbps), que exige Transit Gateway ou Cloud WAN
> **C)** Aumentar o MTU
> **D)** Accelerated VPN
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"A tunnel configuration that supports up to 5 Gbps bandwidth per tunnel, compared to the standard 1.25 Gbps. Available for VPN connections attached to Transit Gateway or Cloud WAN."* (uma configuração de túnel que suporta até 5 Gbps por túnel, contra os 1,25 Gbps padrão; disponível para conexões VPN anexadas a Transit Gateway ou Cloud WAN)
> > **D errada**: Accelerated VPN melhora **latência e estabilidade**, não o teto de banda por túnel.
> >
> > Fonte: [[3 - Performance (24%)/VPN (Site-to-Site)/4 - Questoes|VPN (Site-to-Site)]]

> [!question] 64. Um cluster de **nó único** precisa de concurrency scaling.
> **A)** Habilitar no WLM
> **B)** Não é suportado em cluster de nó único
> **C)** Aumentar `max_concurrency_scaling_clusters`
> **D)** Usar Spectrum
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: a doc lista cluster de nó único entre os não suportados (junto com interleaved sort keys, tabelas temporárias e UDFs Python/Lambda).
> >
> > Fonte: [[3 - Performance (24%)/Redshift/4 - Questoes|Redshift]]

> [!question] 65. A senha do banco não pode aparecer no template nem nos parâmetros em texto claro.
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
