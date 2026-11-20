---
tags: [saa-c03, simulado]
gerado_por: scripts/gerar-simulados.mjs
---

# Simulado — Dominio 1 (Seguranca)

> [!warning] Nota gerada automaticamente: não edite aqui
> Corrija a questão na nota `4 - Questoes` de origem (o link está na resposta) e rode `node scripts/gerar-simulados.mjs`.

Todas as questões do domínio, misturando os serviços. O nome do serviço só aparece depois da resposta.

**142 questões.** Responda de cabeça e anote a letra **antes** de abrir a resposta. Errou? Abra a **Fonte** e volte ao conteúdo daquele ponto.

---

> [!question] 1. Usuários **não autenticados** precisam de acesso de leitura a um bucket público-restrito. É possível com Cognito?
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

> [!question] 2. Um interface endpoint foi criado, mas a aplicação continua chamando o endpoint público do serviço.
> **A)** Falta a rota na route table
> **B)** Falta habilitar o DNS privado do endpoint (e `enableDnsSupport`/`enableDnsHostnames` na VPC)
> **C)** Falta um Elastic IP
> **D)** Falta associar um NAT gateway
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o interface endpoint não usa rota — ele depende de **DNS** resolver o nome público para o IP privado da ENI.
> > **A errada**: rota é o mecanismo do **gateway** endpoint.
> >
> > Fonte: [[1 - Seguranca (30%)/VPC Endpoints e PrivateLink/4 - Questoes|VPC Endpoints e PrivateLink]]

> [!question] 3. Migrar um app que usa **RDS for SQL Server com Windows Authentication**, mantendo o AD on-premises como fonte de verdade.
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

> [!question] 4. Descobrir que instâncias usavam uma AMI vulnerável há três semanas.
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

> [!question] 5. O banco RDS deve aceitar conexões **apenas** das instâncias da aplicação, que escalam automaticamente.
> **A)** SG do RDS liberando o CIDR da subnet da aplicação
> **B)** SG do RDS liberando, na porta do banco, o security group da aplicação como source
> **C)** NACL liberando os IPs das instâncias
> **D)** SG do RDS em `0.0.0.0/0`, protegido por NACL
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: referência SG-para-SG acompanha o Auto Scaling e é o menor privilégio possível.
> > **A errada**: libera **qualquer** recurso que suba naquela subnet, agora ou depois.
> > **C errada**: IPs mudam a cada scaling.
> > **D errada**: expõe o banco; NACL é controle grosseiro e stateless.
> >
> > Fonte: [[1 - Seguranca (30%)/VPC/4 - Questoes|VPC]]

> [!question] 6. Uma aplicação em EC2 precisa de certificado TLS gerenciado pela AWS. É possível?
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

> [!question] 7. Garantir que nenhuma das 30 contas crie recursos fora de `us-east-1` e `sa-east-1`.
> **A)** AWS Budgets por região
> **B)** SCP na raiz com `Deny` condicionado a `aws:RequestedRegion`
> **C)** Config rule com remediação
> **D)** IAM policy em todos os roles
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: guardrail **preventivo** que alcança todas as contas membro, incluindo o root delas.
> > **A errada**: Budgets avisa **depois** do gasto.
> > **C errada**: Config detecta e remedia depois da criação.
> > **D errada**: inviável manter em 30 contas e não alcança o root.
> >
> > Fonte: [[1 - Seguranca (30%)/Organizations e Control Tower/4 - Questoes|Organizations e Control Tower]]

> [!question] 8. Instâncias em subnet privada precisam de saída **IPv6** para a internet, sem aceitar conexões de entrada.
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

> [!question] 9. É preciso habilitar e pagar algo para ter proteção contra DDoS de camada 3 e 4?
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

> [!question] 10. A empresa quer recomendações prontas de custo, segurança e tolerância a falha, sem construir nada.
> **A)** AWS Trusted Advisor
> **B)** AWS Config
> **C)** Compute Optimizer
> **D)** Cost Explorer
>
> > [!success]- Resposta
> > **Resposta: A**
> >
> > **Por que A**: checagens prontas nos cinco pilares.
> > **B errada**: Config avalia regras que **você** define (ou conformance packs).
> > **C errada**: Compute Optimizer é **só rightsizing**, baseado em utilização.
> > **D errada**: Cost Explorer mostra e prevê gasto.
> >
> > Fonte: [[1 - Seguranca (30%)/Governanca (Artifact, Trusted Advisor, Service Catalog)/4 - Questoes|Governanca (Artifact, Trusted Advisor, Service Catalog)]]

> [!question] 11. Reduzir o custo de NAT gateway em 20 contas que hoje têm uma VPC cada.
> **A)** Um NAT gateway compartilhado via peering
> **B)** VPC sharing via RAM: uma VPC central com NAT por AZ, compartilhada com as 20 contas
> **C)** NAT instance em cada conta
> **D)** Gateway endpoint em cada VPC
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: consolida de 20 conjuntos de NAT gateway para um, mantendo as contas separadas.
> > **A errada**: peering **não** permite usar o NAT gateway de outra VPC (o tráfego não é roteável para a internet por ali).
> > **D errada**: ajuda muito se o destino for S3/DynamoDB, mas não resolve a saída geral para a internet.
> >
> > Fonte: [[1 - Seguranca (30%)/AWS RAM/4 - Questoes|AWS RAM]]

> [!question] 12. Requisito: HSM dedicado, FIPS 140-3 nível 3, e a AWS não pode acessar o material da chave.
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

> [!question] 13. A empresa replica o bucket S3 para outra região e considera isso seu backup. Qual o problema?
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

> [!question] 14. Como bloquear um único IP malicioso que está atacando as instâncias?
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

> [!question] 15. Qual a ordem correta dos serviços num incidente?
> **A)** Detective → GuardDuty → Security Hub
> **B)** GuardDuty detecta → Security Hub consolida → Detective investiga
> **C)** Security Hub detecta → Detective consolida → GuardDuty investiga
> **D)** Inspector detecta → Detective corrige
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: cada um tem um verbo. Detective entra **depois** da detecção.
> >
> > Fonte: [[1 - Seguranca (30%)/Detective/4 - Questoes|Detective]]

> [!question] 16. Um usuário tem policy IAM permitindo `s3:*`, mas a SCP da OU dele só permite EC2. Ele acessa o S3?
> **A)** Sim, a policy IAM é mais específica
> **B)** Não: a permissão efetiva é a interseção, e a SCP é um teto
> **C)** Sim, se o bucket for da mesma conta
> **D)** Depende da ordem de avaliação
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"the boundary, the SCP, and the identity-based policy must all allow the action"* (o permissions boundary, a SCP e a policy de identidade precisam, todos, permitir a ação). E o inverso também: *"A user without any IAM permission policies has no access, even if the applicable SCPs allow all services and all actions."* (um usuário sem nenhuma policy de permissão do IAM não tem acesso, mesmo que as SCPs aplicáveis liberem todos os serviços e todas as ações)
> >
> > Fonte: [[1 - Seguranca (30%)/IAM/4 - Questoes|IAM]]

> [!question] 17. Usuários finais de um aplicativo móvel precisam fazer login com conta Google e gravar no S3. Qual serviço?
> **A)** IAM Identity Center
> **B)** Cognito (user pool federado + identity pool)
> **C)** Directory Service
> **D)** IAM users com federação
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: Identity Center é para **funcionários**; usuário final de app é **Cognito**.
> >
> > Fonte: [[1 - Seguranca (30%)/IAM Identity Center/4 - Questoes|IAM Identity Center]]

> [!question] 18. Uma empresa precisa de HTTPS em ALBs de três regiões, com o mesmo domínio. Quantos certificados?
> **A)** Um, em us-east-1
> **B)** Três: um por região
> **C)** Um, replicado automaticamente
> **D)** Um por AZ
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"you must request or import a certificate for each region"* (você precisa solicitar ou importar um certificado em cada Região) e *"You cannot copy a certificate between regions."* (não é possível copiar um certificado entre Regiões)
> > **A errada**: us-east-1 é regra do **CloudFront**, não do ELB.
> >
> > Fonte: [[1 - Seguranca (30%)/ACM (Certificate Manager)/4 - Questoes|ACM (Certificate Manager)]]

> [!question] 19. Durante um DDoS volumétrico, a empresa quer acesso direto a especialistas da AWS e mitigação assistida.
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

> [!question] 20. Um time criou uma NACL nova e a associou à subnet de produção. Todo o tráfego parou. Por quê?
> **A)** A NACL foi associada a mais de uma subnet
> **B)** Uma NACL criada pelo usuário começa apenas com a regra `*` DENY; nada é permitido até você escrever as regras
> **C)** A NACL conflitou com os security groups
> **D)** Faltou reiniciar as instâncias
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: só a NACL **default** nasce com ALLOW tudo. A customizada nasce fechada.
> > **C errada**: SG e NACL são avaliados de forma independente; não "conflitam" — ambos precisam permitir.
> >
> > Fonte: [[1 - Seguranca (30%)/NACL (Network ACL)/4 - Questoes|NACL (Network ACL)]]

> [!question] 21. Um pipeline de CI/CD fora da AWS precisa fazer deploy sem armazenar access key. O que configurar?
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

> [!question] 22. Auditoria quer saber qual usuário deletou um bucket S3 há 45 dias. Onde procurar?
> **A)** CloudWatch Logs
> **B)** CloudTrail event history
> **C)** AWS Config
> **D)** VPC Flow Logs
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: `DeleteBucket` é **management event**, gravado por padrão, e o event history cobre os **últimos 90 dias** sem custo.
> > **A errada**: CloudWatch Logs guarda logs que você envia.
> > **C errada**: Config mostraria que o bucket deixou de existir e como estava configurado — mas **não quem** fez a chamada.
> > **D errada**: Flow Logs registram tráfego de rede.
> >
> > Fonte: [[1 - Seguranca (30%)/CloudTrail/4 - Questoes|CloudTrail]]

> [!question] 23. Instâncias privadas iniciam HTTPS para a internet, mas as respostas não chegam. A NACL tem só uma regra outbound TCP 443. O que falta?
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

> [!question] 24. Uma instância EC2 está minerando criptomoeda sem autorização. Qual serviço detecta?
> **A)** Inspector
> **B)** GuardDuty
> **C)** Macie
> **D)** AWS Config
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: detecção de **comportamento anômalo** a partir de VPC Flow Logs e DNS logs — comunicação com pool de mineração é um achado nativo.
> > **A errada**: Inspector acha **CVE**, não comportamento.
> > **C errada**: Macie olha **conteúdo de dado no S3**.
> > **D errada**: Config olha **configuração**.
> >
> > Fonte: [[1 - Seguranca (30%)/GuardDuty/4 - Questoes|GuardDuty]]

> [!question] 25. O requisito diz: *"o login nas contas AWS deve continuar funcionando mesmo se o enlace com o data center cair"*.
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

> [!question] 26. O time quer medir quantas requisições uma nova regra bloquearia, sem afetar os usuários.
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

> [!question] 27. Painel único em 60 contas, medindo aderência a CIS e PCI DSS.
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

> [!question] 29. 2.000 parâmetros de configuração, versionados, com o **menor custo possível**.
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

> [!question] 30. A aplicação sofre flood de requisições HTTP válidas de milhares de IPs distintos, com payload legítimo.
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

> [!question] 31. Uma empresa quer que o time de rede governe a topologia do Transit Gateway, mas cada conta anexe sua própria VPC.
> **A)** Criar um TGW em cada conta
> **B)** Compartilhar o Transit Gateway via AWS RAM; cada conta cria o attachment da sua VPC
> **C)** VPC peering full mesh
> **D)** Compartilhar as subnets via RAM
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é o padrão de rede multi-conta — governança central, autonomia local.
> > **A errada**: TGWs separados não se falam sem peering de TGW, e multiplicam custo por attachment.
> >
> > Fonte: [[1 - Seguranca (30%)/AWS RAM/4 - Questoes|AWS RAM]]

> [!question] 32. Quais recursos o Shield Advanced protege?
> **A)** Qualquer recurso da conta
> **B)** EC2, Elastic Load Balancing, CloudFront, Route 53 hosted zones e Global Accelerator standard accelerators
> **C)** Só CloudFront e Route 53
> **D)** Apenas recursos numa VPC
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é a lista oficial.
> >
> > Fonte: [[1 - Seguranca (30%)/Shield/4 - Questoes|Shield]]

> [!question] 33. O Security Hub foi habilitado, mas os controles não mostram dados. O que falta?
> **A)** Habilitar o GuardDuty
> **B)** Habilitar o AWS Config, de onde vêm as service-linked rules dos controles
> **C)** Criar um trail do CloudTrail
> **D)** Assinar o Shield Advanced
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: os controles do Security Hub rodam via **AWS Config**.
> >
> > Fonte: [[1 - Seguranca (30%)/Config/4 - Questoes|Config]]

> [!question] 34. Q-root 3. Uma aplicação em EC2 precisa ler um bucket do S3. Qual a abordagem correta?
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

> [!question] 35. A conta B precisa ler um secret da conta A. O acesso falha mesmo com a resource policy correta no secret. O que falta?
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

> [!question] 36. Encontrar e corrigir, continuamente e em todas as contas, security groups que liberem a porta 3389 para `0.0.0.0/0`.
> **A)** SCP negando `ec2:AuthorizeSecurityGroupIngress`
> **B)** Firewall Manager com security group policy em modo Audit
> **C)** NACL em todas as subnets
> **D)** Inspector
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o modo **Audit** encontra SGs que violam o padrão e pode corrigir, em toda a organização.
> > **A errada**: bloquearia todo uso legítimo da API.
> > **C errada**: bloquearia RDP legítimo e não corrige o SG errado.
> > **D errada**: Inspector acha CVE e exposição de rede, não padroniza SG.
> > ⚠️ **AWS Config rule** (`restricted-rdp`) também é resposta aceitável quando o requisito é apenas **detectar e remediar**; Firewall Manager é a resposta quando é **aplicar o padrão**.
> >
> > Fonte: [[1 - Seguranca (30%)/Firewall Manager/4 - Questoes|Firewall Manager]]

> [!question] 37. Um compartilhamento **FSx for Windows File Server** precisa autenticar usuários do AD corporativo.
> **A)** Simple AD
> **B)** AWS Managed Microsoft AD com trust, ou o AD on-premises diretamente
> **C)** Cognito identity pool
> **D)** IAM Identity Center
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: FSx for Windows usa **SMB** e exige Active Directory.
> > **A errada**: Simple AD não suporta trust — não alcançaria os usuários corporativos.
> > **C e D erradas**: não falam SMB/Kerberos com o file system.
> >
> > Fonte: [[1 - Seguranca (30%)/Directory Service/4 - Questoes|Directory Service]]

> [!question] 38. Por que não é necessário liberar portas efêmeras no security group?
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

> [!question] 39. "Quem baixou aquele objeto do S3 no mês passado?" O CloudTrail não mostra nada. Por quê?
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

> [!question] 40. Qual a diferença de escopo entre SG e NACL?
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

> [!question] 41. Uma aplicação precisa criptografar arquivos de até 200 MB com chave gerenciada e auditável. Qual desenho?
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

> [!question] 42. Qual mecanismo criptografa os dados **em trânsito** entre o cliente e a aplicação?
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

> [!question] 43. Migrar as instâncias de Ubuntu 20.04 para 22.04 em escala.
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

> [!question] 44. Bloquear requisições do país X **exceto** para o caminho `/status`.
> **A)** Geo restriction do CloudFront
> **B)** WAF com geo match rule combinada com condição de path
> **C)** NACL por faixa de IP do país
> **D)** Route 53 geolocation routing
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: a geo restriction do CloudFront vale para a **distribuição toda**; a combinação país + path é do WAF.
> > **D errada**: geolocation routing escolhe **para onde** mandar, não bloqueia.
> >
> > Fonte: [[1 - Seguranca (30%)/WAF/4 - Questoes|WAF]]

> [!question] 45. O app já autentica via user pool. Por que ele ainda não consegue ler o DynamoDB diretamente?
> **A)** Falta habilitar MFA
> **B)** O user pool só emite JWT; é preciso um identity pool para obter credencial AWS
> **C)** O DynamoDB não aceita Cognito
> **D)** Falta um VPC endpoint
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é a pegadinha central do tema.
> >
> > Fonte: [[1 - Seguranca (30%)/Cognito/4 - Questoes|Cognito]]

> [!question] 46. Instâncias privadas precisam gravar num bucket S3 da mesma região, sem internet e **sem custo adicional**.
> **A)** NAT gateway em cada AZ
> **B)** Interface endpoint (PrivateLink) para o S3
> **C)** Gateway endpoint para o S3
> **D)** Internet gateway com rota restrita
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: *"There is no additional charge for using gateway endpoints."* (não há cobrança adicional pelo uso de gateway endpoints)
> > **A errada**: funciona, mas NAT gateway cobra **por hora + por GB**.
> > **B errada**: funciona, mas é **cobrado** por hora e por GB. Justifica-se quando o acesso vem de **on-premises**.
> > **D errada**: coloca a subnet na internet.
> >
> > Fonte: [[1 - Seguranca (30%)/VPC/4 - Questoes|VPC]]

> [!question] 47. Um time precisa poder criar roles para suas aplicações, mas sem nunca conceder mais que leitura no S3. Qual mecanismo?
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

> [!question] 48. Identificar, em 500 buckets S3, quais contêm dados pessoais de clientes, para classificação de compliance.
> **A)** GuardDuty
> **B)** Amazon Macie
> **C)** AWS Config com regra customizada
> **D)** Amazon Inspector
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: classificação de dado sensível no S3 é a razão de existir do Macie.
> > **A errada**: GuardDuty detecta **atividade** maliciosa.
> > **C errada**: Config avalia **configuração** do bucket (está público? tem versionamento?), não o **conteúdo** dos objetos.
> > **D errada**: Inspector é vulnerabilidade de software.
> >
> > Fonte: [[1 - Seguranca (30%)/Macie/4 - Questoes|Macie]]

> [!question] 49. Por que uma instância EC2 não aparece nos resultados do Inspector?
> **A)** Falta habilitar o GuardDuty
> **B)** A instância não é um managed node do Systems Manager (SSM Agent ausente ou sem permissão/rota)
> **C)** A instância está em subnet privada
> **D)** Falta o AWS Config
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: a varredura de EC2 depende de a instância ser gerenciada pelo Systems Manager.
> > **C errada**: subnet privada é normal — basta o SSM alcançar o serviço (via NAT ou interface endpoints).
> >
> > Fonte: [[1 - Seguranca (30%)/Inspector/4 - Questoes|Inspector]]

> [!question] 50. O auditor pediu o relatório **SOC 2 da AWS**. Onde obter?
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

> [!question] 51. Uma aplicação IPv6 em subnet privada precisa baixar atualizações da internet, sem aceitar conexões de entrada.
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

> [!question] 52. Vários times precisam lançar recursos em subnets gerenciadas pelo time de rede, sem criar uma VPC por conta.
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

> [!question] 53. Saber continuamente se instâncias EC2 e imagens no ECR têm CVEs conhecidas, sem instalar agente manualmente.
> **A)** Amazon Inspector
> **B)** AWS Security Hub
> **C)** GuardDuty com Malware Protection
> **D)** AWS Config
>
> > [!success]- Resposta
> > **Resposta: A**
> >
> > **Por que A**: varredura contínua de vulnerabilidade em EC2, ECR e Lambda, com descoberta automática.
> > **B errada**: Security Hub **agrega** achados (inclusive do Inspector); não faz o scan.
> > **C errada**: Malware Protection procura **malware em volumes EBS**, não CVE em pacotes.
> > **D errada**: Config é configuração e conformidade.
> >
> > Fonte: [[1 - Seguranca (30%)/Inspector/4 - Questoes|Inspector]]

> [!question] 54. Duas VPCs com **CIDR sobreposto**: a VPC A precisa consumir uma API hospedada na VPC B.
> **A)** VPC peering
> **B)** Transit Gateway
> **C)** AWS PrivateLink: endpoint service na VPC B (atrás de um NLB) + interface endpoint na VPC A
> **D)** Renumerar a VPC A
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: PrivateLink **não roteia redes** — expõe um serviço por uma ENI, então o CIDR sobreposto é irrelevante.
> > **A e B erradas**: exigem CIDRs não sobrepostos.
> > **D errada**: funciona, mas é a opção mais custosa e disruptiva.
> >
> > Fonte: [[1 - Seguranca (30%)/VPC Endpoints e PrivateLink/4 - Questoes|VPC Endpoints e PrivateLink]]

> [!question] 55. Garantir que **toda** distribuição CloudFront nova nas 60 contas receba a web ACL corporativa.
> **A)** SCP exigindo WAF
> **B)** Firewall Manager com policy de WAF aplicada à organização
> **C)** AWS Config rule com remediação
> **D)** CloudFormation StackSets distribuindo a web ACL
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: aplica e **mantém** a proteção continuamente, inclusive em recursos criados fora de pipeline.
> > **A errada**: SCP nega ações; não associa recursos nem condiciona à existência da web ACL.
> > **C errada**: detecta e remedia **depois**, e você escreve a remediação.
> > **D errada**: cria a web ACL, mas não garante a **associação** a recursos novos feitos à mão.
> >
> > Fonte: [[1 - Seguranca (30%)/Firewall Manager/4 - Questoes|Firewall Manager]]

> [!question] 56. Um fornecedor SaaS precisa acessar recursos na sua conta. Como configurar com segurança?
> **A)** Criar um IAM user e enviar a access key
> **B)** Criar uma role com trust policy para a conta do fornecedor, exigindo `sts:ExternalId`
> **C)** Compartilhar a credencial temporária por e-mail
> **D)** Tornar os recursos públicos com filtro de IP
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: role + `ExternalId` é o padrão contra **confused deputy** com terceiros.
> > **A errada**: credencial de longo prazo fora da sua organização.
> > **C errada**: credencial temporária expira e o acesso quebra; além de ser transporte inseguro.
> > **D errada**: não é controle de acesso.
> >
> > Fonte: [[1 - Seguranca (30%)/STS/4 - Questoes|STS]]

> [!question] 57. Provar ao auditor que todos os recursos de produção têm backup diário com 35 dias de retenção.
> **A)** AWS Config
> **B)** AWS Backup Audit Manager
> **C)** CloudTrail
> **D)** AWS Artifact
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é o componente que valida se os backup plans estão sendo cumpridos e gera relatório.
> > **A errada**: Config avalia configuração dos recursos (pode checar se o recurso está num plan, mas o relatório de conformidade de backup é do Audit Manager do Backup).
> > **D errada**: Artifact é compliance **da AWS**.
> >
> > Fonte: [[1 - Seguranca (30%)/AWS Backup/4 - Questoes|AWS Backup]]

> [!question] 58. Guardar e consultar 7 anos de eventos do CloudTrail com SQL, para auditoria regulatória.
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

> [!question] 59. Impedir que, pelo endpoint do S3, alguém copie dados para um bucket de fora da organização.
> **A)** Security group no gateway endpoint
> **B)** Endpoint policy restringindo os recursos (ex.: condição `aws:PrincipalOrgID`), e bucket policy exigindo `aws:SourceVpce`
> **C)** NACL negando o CIDR do S3
> **D)** SCP negando `s3:PutObject`
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: endpoint policy limita **o que pode ser feito através do endpoint**; a condição `aws:SourceVpce` na bucket policy fecha o outro lado.
> > **A errada**: gateway endpoint não é ENI — não tem security group.
> > **C errada**: bloquearia o S3 por completo.
> > **D errada**: impediria gravar em qualquer bucket, inclusive os legítimos.
> >
> > Fonte: [[1 - Seguranca (30%)/VPC Endpoints e PrivateLink/4 - Questoes|VPC Endpoints e PrivateLink]]

> [!question] 60. Q-root 2. Uma bucket policy foi gravada negando **todos os principais**. Nem o administrador consegue corrigi-la. O que fazer?
> **A)** Criar uma role com `AdministratorAccess` e assumi-la
> **B)** Entrar como usuário raiz da conta e editar ou excluir a bucket policy
> **C)** Abrir um caso no AWS Support para apagar o bucket
> **D)** Anexar uma policy de identidade com `Allow` em `s3:PutBucketPolicy`
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: a tarefa está na lista oficial das que **exigem** o root. Ele é a única identidade **sem deny implícito** — *"all requests are implicitly denied with the exception of the AWS account root user"* (todas as requisições são negadas implicitamente, com exceção do usuário raiz da conta AWS). Uma policy de recurso que nega todos vence qualquer `Allow` de identidade.
> > **D errada**: um `Deny` explícito na policy do recurso **sempre** vence um `Allow`.
> > 💡 Numa **AWS Organizations** com **centralized root access** habilitado, a conta de gerenciamento faz isso de forma centralizada, sem usar o root da conta-membro.
> >
> > Fonte: [[1 - Seguranca (30%)/IAM/4 - Questoes|IAM]]

> [!question] 61. Uma aplicação Java usa JCE para falar com um HSM on-premises e será migrada para a AWS com mínima alteração de código.
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

> [!question] 62. Compliance exige que **nenhuma** conta possa desabilitar o CloudTrail, nem o root dela.
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

> [!question] 63. Auditar as chamadas de API de 40 contas numa visão única, sem que as contas possam desabilitar.
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

> [!question] 64. Uma API no API Gateway REST precisa validar o token emitido pelo Cognito antes de invocar a Lambda.
> **A)** API key no usage plan
> **B)** Cognito authorizer no método do API Gateway
> **C)** IAM authorizer
> **D)** Resource policy
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o Cognito authorizer valida o JWT do user pool nativamente.
> > **A errada**: API key mede e limita uso; não autentica.
> > **C errada**: IAM authorizer é para chamador que assina com SigV4 (principal AWS).
> > ⚠️ Na **HTTP API**, o equivalente é o **JWT authorizer**.
> >
> > Fonte: [[1 - Seguranca (30%)/Cognito/4 - Questoes|Cognito]]

> [!question] 65. Com AD Connector + Identity Center, o que fica armazenado na AWS?
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

> [!question] 66. É possível bloquear as consultas DNS da VPC usando NACL?
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

> [!question] 67. Compliance exige HSM dedicado, FIPS 140-3 nível 3, e que a AWS não tenha acesso ao material da chave.
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

> [!question] 68. 15 contas AWS, acesso de console para vários times, usando as identidades do Active Directory existente. Menor esforço operacional?
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

> [!question] 69. O time importou o certificado em `sa-east-1` e ele não aparece na console do CloudFront. Por quê?
> **A)** Falta validar o domínio por DNS
> **B)** CloudFront só aceita certificados emitidos pela ACM
> **C)** O certificado precisa estar em `us-east-1` (N. Virginia)
> **D)** Falta habilitar SNI
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: regra literal da doc do CloudFront.
> > **B errada**: certificado **importado** é aceito (PEM, chave privada sem senha).
> > **A e D erradas**: não explicam o certificado não aparecer na lista.
> >
> > Fonte: [[1 - Seguranca (30%)/ACM (Certificate Manager)/4 - Questoes|ACM (Certificate Manager)]]

> [!question] 70. Q-root 4. Numa organização com 200 contas no AWS Organizations, como reduzir o risco das credenciais de root das contas-membro?
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

> [!question] 71. A política exige rotação automática da senha do banco a cada 30 dias.
> **A)** Parameter Store `SecureString` com Lambda agendada
> **B)** Secrets Manager com rotação habilitada
> **C)** Parameter Store Advanced com parameter policy
> **D)** KMS com rotação anual
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: Parameter Store tem rotação **"None"**.
> > **C errada**: parameter policy faz expiração e notificação, **não** rotaciona a credencial.
> > **D errada**: KMS rotaciona **chave**, não senha.
> >
> > Fonte: [[1 - Seguranca (30%)/Systems Manager (e Parameter Store)/4 - Questoes|Systems Manager (e Parameter Store)]]

> [!question] 72. Um time precisa de uma chave para criptografar objetos no S3, com rotação anual, **sem tarifa mensal de chave**, e não precisa auditar o uso nem compartilhar entre contas.
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

> [!question] 73. A empresa quer que nenhum dado de identidade seja replicado para a AWS, mas aplicações AWS devem usar o AD existente.
> **A)** Managed Microsoft AD com trust
> **B)** AD Connector
> **C)** Simple AD
> **D)** IAM Identity Center com diretório próprio
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é **proxy** — encaminha a autenticação, sem armazenar usuários na AWS.
> > **A errada**: funciona, mas cria um diretório na AWS (com trust), o que o enunciado quer evitar.
> >
> > Fonte: [[1 - Seguranca (30%)/Directory Service/4 - Questoes|Directory Service]]

> [!question] 74. Um usuário tem policy IAM com `s3:*`, mas a SCP da OU dele só permite EC2. Ele acessa o S3?
> **A)** Sim, a policy IAM é mais específica
> **B)** Não: a permissão efetiva é a interseção
> **C)** Sim, se o bucket for da mesma conta
> **D)** Depende da ordem de avaliação
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"the boundary, the SCP, and the identity-based policy must all allow the action"* (o permissions boundary, a SCP e a policy de identidade precisam, todos, permitir a ação).
> >
> > Fonte: [[1 - Seguranca (30%)/Organizations e Control Tower/4 - Questoes|Organizations e Control Tower]]

> [!question] 75. 15 contas AWS, acesso de console para vários times, usando as identidades do Active Directory existente. Menor esforço operacional?
> **A)** IAM users em cada conta, com senhas sincronizadas
> **B)** IAM Identity Center integrado ao diretório, com permission sets atribuídos por grupo
> **C)** Uma conta central com IAM users e role switching manual para as outras 14
> **D)** AD Connector em cada conta com usuários IAM espelhados
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é o serviço de acesso federado de **pessoas** a múltiplas contas, citado nominalmente no guia.
> > **A errada**: 15 × N usuários para gerenciar e revogar.
> > **C errada**: funciona, mas você mantém roles e trust policies à mão em 14 contas.
> > **D errada**: o erro está em **"em cada conta" com usuários IAM espelhados**. O AD Connector é um **gateway** para o AD, e um só, na conta de gerenciamento, é a forma correta de usá-lo — mas quem atribui acesso às 15 contas é o **Identity Center**, não ele.
> > ⚠️ Cuidado para não generalizar: **AD Connector + Identity Center é a montagem padrão** para SSO multi-conta com AD on-premises. Ver [[1 - Seguranca (30%)/Directory Service/3 - Detalhes|Directory Service - Detalhes]].
> >
> > Fonte: [[1 - Seguranca (30%)/IAM Identity Center/4 - Questoes|IAM Identity Center]]

> [!question] 76. Auditoria exige acabar com bastion hosts e chaves SSH, com log das sessões, em instâncias privadas **sem acesso à internet**.
> **A)** NAT gateway + SSH com chave rotacionada por Lambda
> **B)** SSM Session Manager, com interface endpoints do Systems Manager na VPC e log em S3/CloudWatch Logs
> **C)** EC2 Instance Connect
> **D)** VPN cliente para a subnet privada
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: resolve os três requisitos — *"without the need to open inbound ports, maintain bastion hosts, or manage SSH keys"* (sem precisar abrir portas de entrada, manter bastion hosts ou gerenciar chaves SSH) — e os endpoints evitam depender de internet.
> > **A errada**: mantém porta 22, chave e NAT.
> > **C errada**: Instance Connect ainda usa SSH na 22.
> > **D errada**: dá rede, mas não elimina SSH, chave nem bastion, e não registra a sessão.
> >
> > Fonte: [[1 - Seguranca (30%)/Systems Manager (e Parameter Store)/4 - Questoes|Systems Manager (e Parameter Store)]]

> [!question] 77. A empresa tem **três florestas** de Active Directory e quer SSO nas contas AWS.
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

> [!question] 78. A empresa precisa guardar e consultar 7 anos de eventos do CloudTrail com SQL, para auditoria regulatória.
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

> [!question] 79. Um diretório pequeno e barato para 200 usuários, só para domain join de instâncias Linux, sem MFA nem LDAPS.
> **A)** Managed Microsoft AD Enterprise
> **B)** Simple AD
> **C)** AD Connector
> **D)** Managed Microsoft AD Standard
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é a opção *"low-scale, low-cost"* (de pequena escala e baixo custo), e o enunciado dispensa justamente o que ela não suporta.
> > **C errada**: AD Connector exige um AD on-premises existente, que o enunciado não menciona.
> > **D errada**: atende, mas custa mais do que o necessário.
> >
> > Fonte: [[1 - Seguranca (30%)/Directory Service/4 - Questoes|Directory Service]]

> [!question] 80. Depois de o Inspector achar uma CVE crítica em 200 instâncias, como corrigir com menor esforço?
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

> [!question] 81. Q-root 1. Quais destas são boas práticas da AWS para o usuário raiz? (escolha as que se aplicam)
> **A)** Usar uma senha forte para o acesso ao console em nível de conta
> **B)** Nunca compartilhar a senha nem as chaves de acesso do root
> **C)** Criar uma chave de acesso para o root e guardá-la criptografada no S3
> **D)** Habilitar MFA na conta do usuário raiz
> **E)** Não criar chave de acesso para o root; se já existir, excluí-la
>
> > [!success]- Resposta
> > **Resposta: A, B, D, E**
> >
> > **Por que C é a errada**: a orientação é **não criar** a chave. O título oficial atual é literal — *"Don't create access keys for the root user"* (não crie chaves de acesso para o usuário raiz) — e guardar credencial de longo prazo em bucket, criptografada ou não, é exatamente o anti-padrão.
> > ⚠️ Material antigo acrescenta *"se precisar manter a chave, altere-a regularmente"*. A doc atual **não dá orientação de rotação** para chave de root: ela diz para não criar.
> >
> > Fonte: [[1 - Seguranca (30%)/IAM/4 - Questoes|IAM]]

> [!question] 82. Detectar ameaças em 40 contas de uma AWS Organizations, com visão central.
> **A)** Habilitar GuardDuty em cada conta e consolidar por script
> **B)** Designar uma conta administradora do GuardDuty via Organizations, com as demais como membros
> **C)** Security Hub apenas
> **D)** Detective em cada conta
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o modelo administrador/membro integrado ao Organizations é nativo.
> > **C errada**: Security Hub **agrega**; sem GuardDuty habilitado, não há achado de ameaça para agregar.
> > **D errada**: Detective investiga depois da detecção.
> >
> > Fonte: [[1 - Seguranca (30%)/GuardDuty/4 - Questoes|GuardDuty]]

> [!question] 83. Garantir que nem um administrador com credencial comprometida possa apagar os backups.
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

> [!question] 84. Qual destes o Firewall Manager **não** gerencia?
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

> [!question] 85. O banco deve aceitar conexões só da camada de aplicação, que está em Auto Scaling.
> **A)** SG do banco liberando o CIDR da subnet da aplicação
> **B)** SG do banco liberando o SG da aplicação como source
> **C)** NACL liberando os IPs atuais das instâncias
> **D)** Lista de prefixos com os IPs das instâncias
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: acompanha o scaling automaticamente e é o menor privilégio.
> > **A errada**: autoriza qualquer recurso que suba na subnet.
> > **C e D erradas**: os IPs mudam a cada evento de scaling — manutenção impossível.
> >
> > Fonte: [[1 - Seguranca (30%)/Security Groups/4 - Questoes|Security Groups]]

> [!question] 86. Ao achar PII em um bucket público, a empresa quer bloquear o acesso automaticamente.
> **A)** Macie bloqueia sozinho
> **B)** Achado do Macie → EventBridge → Lambda que aplica Block Public Access e notifica por SNS
> **C)** AWS Config com remediação
> **D)** SCP negando `s3:PutBucketPolicy`
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é o padrão de resposta automatizada; o Macie **detecta e publica o achado**, a ação é sua.
> > **A errada**: Macie *"enables automated protection"* (permite proteção automatizada) — habilita, via integração, não executa por conta própria.
> > **C errada**: Config detectaria o bucket público, mas não o **PII** — o enunciado condiciona a ação ao dado sensível.
> > **D errada**: previne mudanças futuras, não corrige o bucket atual.
> >
> > Fonte: [[1 - Seguranca (30%)/Macie/4 - Questoes|Macie]]

> [!question] 87. Instâncias privadas precisam gravar num bucket S3 da mesma região, sem internet e **sem custo adicional**.
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

> [!question] 88. Uma instância RDS foi deletada e o time descobriu que não havia snapshot manual. Os backups automáticos servem?
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

> [!question] 89. Quando alguém sai da empresa, o acesso à AWS precisa cessar imediatamente, sem ação em cada conta.
> **A)** Rotacionar as access keys
> **B)** Identity Center com SCIM: desativar no IdP desprovisiona automaticamente
> **C)** SCP negando o usuário
> **D)** Deletar os IAM users manualmente
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: SCIM sincroniza criação e remoção; a credencial do Identity Center é temporária e deixa de ser emitida.
> > **D errada**: é exatamente o processo manual e falível que se quer eliminar.
> >
> > Fonte: [[1 - Seguranca (30%)/IAM Identity Center/4 - Questoes|IAM Identity Center]]

> [!question] 90. Como restringir o tráfego que sai pelo NAT gateway usando security group?
> **A)** Associar um SG ao NAT gateway
> **B)** Não é possível: aplique o SG nos recursos atrás do NAT, ou uma NACL na subnet dele
> **C)** Usar uma NACL no NAT gateway
> **D)** Usar o Network Firewall no lugar do SG
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"You cannot associate security groups with NAT gateways."* (não é possível associar security groups a NAT gateways)
> > **C errada**: a NACL se associa à **subnet**, não ao gateway.
> > **D errada**: Network Firewall é a resposta para **inspeção** de saída, mas não é "usar security group".
> >
> > Fonte: [[1 - Seguranca (30%)/NAT Gateway/4 - Questoes|NAT Gateway]]

> [!question] 91. Antes de ativar o GuardDuty, o que é preciso habilitar?
> **A)** VPC Flow Logs enviados para o CloudWatch Logs
> **B)** Um trail do CloudTrail com data events
> **C)** Nada: CloudTrail management events, VPC Flow Logs e DNS logs são fontes fundacionais consumidas diretamente
> **D)** O AWS Config
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: as três fontes fundacionais não precisam ser habilitadas nem pagas separadamente.
> > **A e B erradas**: é a armadilha — parece razoável e está errado.
> >
> > Fonte: [[1 - Seguranca (30%)/GuardDuty/4 - Questoes|GuardDuty]]

> [!question] 92. Times devem poder subir ambientes de teste sozinhos, mas só com tipos de instância aprovados e sem receber `ec2:*`.
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

> [!question] 93. 2.000 parâmetros de configuração, versionados, com o **menor custo possível**.
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

> [!question] 94. Uma empresa quer montar uma estrutura multi-conta com contas de log e auditoria, Config e CloudTrail organizacionais e SSO, no menor tempo.
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

> [!question] 95. A política manda rotacionar as chaves anualmente. Após habilitar a rotação automática, o que acontece com os dados já criptografados?
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

> [!question] 96. Garantir que os logs do CloudTrail não possam ser apagados por ninguém, nem pelo root, por 5 anos.
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

> [!question] 97. Um auditor pede evidência de que os buckets estiveram criptografados durante todo o trimestre.
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

> [!question] 98. Picos de requisição de um único IP estão derrubando a aplicação atrás de um ALB.
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

> [!question] 99. Um role na conta A precisa assumir um role na conta B. O `AssumeRole` falha com AccessDenied. O que verificar?
> **A)** Só a trust policy na conta B
> **B)** Só a policy do role na conta A
> **C)** As duas: a trust policy na conta B deve listar o principal da conta A, e o role na conta A deve ter `sts:AssumeRole` naquele ARN
> **D)** A SCP da organização
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: são dois documentos independentes, e a trust policy é exceção à regra da união — *"must explicitly allow access for principals"* (precisam permitir o acesso explicitamente para os principais).
> > **D errada**: pode ser causa adicional (SCP é um teto), mas o que o enunciado descreve se resolve nos dois documentos. Se a SCP negasse, nenhuma das duas políticas ajudaria.
> >
> > Fonte: [[1 - Seguranca (30%)/STS/4 - Questoes|STS]]

> [!question] 100. O Security Hub foi habilitado, mas os controles aparecem sem dados. Por quê?
> **A)** Falta habilitar o GuardDuty
> **B)** Falta habilitar o AWS Config, de onde vêm as service-linked rules dos controles
> **C)** Falta criar um trail do CloudTrail
> **D)** Os padrões precisam ser comprados
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: os controles do Security Hub rodam **via AWS Config**.
> > **A errada**: GuardDuty afeta os **achados de ameaça**, não os controles de postura.
> >
> > Fonte: [[1 - Seguranca (30%)/Security Hub/4 - Questoes|Security Hub]]

> [!question] 101. O que diferencia uma credencial do STS de uma access key de usuário IAM?
> **A)** O tamanho da chave
> **B)** Ela tem um session token e expira
> **C)** Ela só funciona na mesma região
> **D)** Ela não precisa de permissão
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: credencial temporária = access key ID + secret + **session token**, com prazo de validade.
> >
> > Fonte: [[1 - Seguranca (30%)/STS/4 - Questoes|STS]]

> [!question] 102. Um app mobile precisa que usuários autenticados com conta Google gravem fotos em um prefixo próprio no S3.
> **A)** IAM user por usuário, com access key no app
> **B)** Cognito user pool federado com o Google + identity pool trocando o token por credencial AWS, com role restrita por prefixo
> **C)** API Gateway com API key por usuário
> **D)** Bucket público com nomes de pasta aleatórios
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: user pool autentica (incluindo federação social), identity pool entrega a credencial AWS.
> > **A errada**: IAM user não escala para usuário final e põe credencial de longo prazo no dispositivo.
> > **C errada**: API key é controle de **uso**, não identidade.
> > **D errada**: segurança por obscuridade.
> >
> > Fonte: [[1 - Seguranca (30%)/Cognito/4 - Questoes|Cognito]]

> [!question] 103. Servidores **on-premises** precisam alcançar o S3 por link privado, via Direct Connect.
> **A)** Gateway endpoint para o S3
> **B)** Interface endpoint para o S3
> **C)** NAT gateway na VPC
> **D)** VPC peering
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o gateway endpoint funciona apenas **de dentro da VPC** (é uma rota em route table). O interface endpoint tem IP privado alcançável de on-premises.
> > **A errada**: é a troca que a prova testa.
> >
> > Fonte: [[1 - Seguranca (30%)/VPC Endpoints e PrivateLink/4 - Questoes|VPC Endpoints e PrivateLink]]

> [!question] 104. Uma aplicação em EC2 precisa ler um bucket S3. Forma recomendada?
> **A)** Access key e secret em variável de ambiente
> **B)** IAM role anexada à instância, com permissão de leitura no bucket
> **C)** Credenciais no Parameter Store, lidas no boot
> **D)** Bucket público filtrado por IP
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: credencial temporária, rotacionada automaticamente, sem segredo armazenado.
> > **A errada**: credencial de longo prazo em disco é o que a AWS manda evitar.
> > **C errada**: melhor que A, mas ainda existe uma credencial de longo prazo para vazar.
> > **D errada**: bucket público não autentica nada.
> >
> > Fonte: [[1 - Seguranca (30%)/IAM/4 - Questoes|IAM]]

> [!question] 105. Uma instância EC2 não aparece no Session Manager. O que verificar?
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

> [!question] 106. 25 contas, política única de backup para EBS, RDS, DynamoDB e EFS, com cópia em outra região e proteção contra exclusão.
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

> [!question] 107. Qual serviço entrega o relatório SOC 2 **da AWS** para o auditor?
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

> [!question] 108. Um time precisa que cada desenvolvedor veja apenas os recursos do seu próprio projeto, sem criar um permission set por projeto.
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

> [!question] 109. A política exige que a senha do banco troque a cada 30 dias automaticamente, sem intervenção.
> **A)** Parameter Store SecureString com Lambda agendada por EventBridge
> **B)** AWS Secrets Manager com rotação habilitada, associado ao banco
> **C)** KMS com rotação automática anual
> **D)** IAM database authentication
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: rotação automática com integração nativa de banco é o diferencial documentado.
> > **A errada**: funciona, mas você constrói e mantém a rotação.
> > **C errada**: KMS rotaciona **chave de criptografia**, não senha — e não recriptografa nada.
> > **D errada**: elimina a senha (boa prática), mas muda o método de autenticação; não é "rotação de secret".
> >
> > Fonte: [[1 - Seguranca (30%)/Secrets Manager/4 - Questoes|Secrets Manager]]

> [!question] 110. Compliance exige que **nenhuma** conta possa desabilitar o CloudTrail, nem o root dela. Qual solução?
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

> [!question] 111. Uma API exposta por **Network Load Balancer** sofre SQL injection. O que fazer?
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

> [!question] 112. Vários times precisam lançar recursos em subnets gerenciadas pelo time de rede, sem criar uma VPC por conta.
> **A)** VPC peering entre todas as contas
> **B)** AWS RAM compartilhando as subnets da VPC do time de rede
> **C)** Transit Gateway
> **D)** PrivateLink
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é VPC sharing — reduz VPCs, NAT gateways e conexões, mantendo o isolamento de conta.
> > **C errada**: TGW conecta VPCs **separadas**; o enunciado quer evitar criá-las.
> > **D errada**: PrivateLink expõe **serviço**, não subnet.
> >
> > Fonte: [[1 - Seguranca (30%)/AWS RAM/4 - Questoes|AWS RAM]]

> [!question] 113. O endpoint de login está sofrendo credential stuffing. O que colocar na frente?
> **A)** NACL negando os IPs
> **B)** AWS WAF com rate-based rule associado ao Cognito user pool
> **C)** Shield Advanced
> **D)** Security group restritivo
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: a lista oficial de recursos do WAF inclui **Amazon Cognito user pool**, e rate-based rule é o controle para flood por IP.
> > **C errada**: Shield é DDoS volumétrico, não abuso de credencial.
> >
> > Fonte: [[1 - Seguranca (30%)/Cognito/4 - Questoes|Cognito]]

> [!question] 114. Uma aplicação em 3 AZs usa **um** NAT gateway e envia 50 TB/mês para um bucket S3 na mesma região. Qual mudança reduz mais o custo?
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

> [!question] 115. O Firewall Manager foi configurado, mas não detecta recursos em duas contas. O que verificar?
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

> [!question] 116. Esta NACL deveria bloquear `203.0.113.7`, mas o IP continua acessando. Por quê?
> ```
> 100  ALLOW  TCP 443  de 0.0.0.0/0
> 200  DENY   TCP 443  de 203.0.113.7/32
> ```
> **A)** Falta aplicar a NACL na subnet
> **B)** A regra 100 casa primeiro e a avaliação para; o DENY precisa ter número menor
> **C)** NACL não bloqueia por IP de origem
> **D)** Falta a regra de outbound
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"As soon as a rule matches traffic, it's applied regardless of any higher-numbered rule that might contradict it."* (assim que uma regra casa com o tráfego, ela é aplicada, independentemente de qualquer regra de número maior que possa contradizê-la) O DENY precisa ser, por exemplo, a regra **50**.
> > **C errada**: NACL bloqueia por IP de origem — é justamente o que SG não faz.
> >
> > Fonte: [[1 - Seguranca (30%)/NACL (Network ACL)/4 - Questoes|NACL (Network ACL)]]

> [!question] 117. Compartilhar um portfólio do Service Catalog com outras 10 contas da organização.
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

> [!question] 118. A equipe de segurança quer garantir que nenhuma conta da organização crie SG com a porta 22 aberta para `0.0.0.0/0`, com correção automática.
> **A)** SCP negando `ec2:AuthorizeSecurityGroupIngress`
> **B)** AWS Config rule (`restricted-ssh`) com remediação automática, agregada nas contas
> **C)** Security group default modificado
> **D)** NACL negando a porta 22 em todas as subnets
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o enunciado pede **detectar e corrigir** — função de Config rule + remediation.
> > **A errada**: SCP **preveniria**, mas bloquearia todo uso legítimo da API.
> > **C errada**: o default não impede criar outros SGs.
> > **D errada**: NACL em todas as subnets bloquearia SSH legítimo e não "corrige" o SG errado.
> > ⚠️ Para **aplicar e auditar SGs centralmente** em várias contas, a resposta também pode ser **Firewall Manager**.
> >
> > Fonte: [[1 - Seguranca (30%)/Security Groups/4 - Questoes|Security Groups]]

> [!question] 119. Preciso dar acesso a um bucket da conta B para um role da conta A. O que configurar?
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

> [!question] 120. O certificado importado no ALB vai expirar em 10 dias e ninguém foi avisado. Como evitar isso no futuro?
> **A)** Habilitar rotação automática no KMS
> **B)** Emitir o certificado pela própria ACM com validação por DNS, que habilita renovação gerenciada
> **C)** Importar com validade maior
> **D)** Usar AWS Private CA
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: certificado **importado** é responsabilidade sua; certificado emitido pela ACM com validação DNS renova sozinho.
> > **A errada**: KMS rotaciona chaves, não certificados.
> > **C errada**: adia o problema.
> > **D errada**: Private CA emite certificados **internos** — útil, mas não é o que o enunciado pede (e também há renovação gerenciada ali).
> >
> > Fonte: [[1 - Seguranca (30%)/ACM (Certificate Manager)/4 - Questoes|ACM (Certificate Manager)]]

> [!question] 121. A empresa precisa de HSM dedicado **e** que o S3 continue usando SSE-KMS normalmente. Como?
> **A)** Só CloudHSM, com criptografia client-side
> **B)** KMS com custom key store apoiado num cluster CloudHSM
> **C)** KMS com customer managed key
> **D)** Dois sistemas em paralelo
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: custom key store põe a chave no seu HSM e mantém a API da KMS para os serviços.
> > **A errada**: funciona, mas obriga a aplicação a criptografar tudo e abandona o SSE-KMS.
> > **C errada**: não atende "HSM dedicado".
> > ⚠️ Chave em custom key store **não** suporta rotação automática.
> >
> > Fonte: [[1 - Seguranca (30%)/CloudHSM/4 - Questoes|CloudHSM]]

> [!question] 122. Após a perda de uma AZ, instâncias privadas de outra AZ perderam acesso à internet. Por quê?
> **A)** O internet gateway falhou
> **B)** Havia um único NAT gateway, que vivia na AZ que caiu
> **C)** A NACL bloqueou
> **D)** O Elastic IP foi liberado
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o NAT gateway é **zonal** — *"Create a NAT gateway in each Availability Zone to ensure zone-independent architecture."* (crie um NAT gateway em cada Zona de Disponibilidade para garantir uma arquitetura independente de zona)
> > **A errada**: o internet gateway é regional e redundante.
> >
> > Fonte: [[1 - Seguranca (30%)/NAT Gateway/4 - Questoes|NAT Gateway]]

> [!question] 123. Como invalidar imediatamente todas as sessões temporárias já emitidas para uma role comprometida?
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

> [!question] 124. Como ser notificado de manutenção programada que afeta instâncias específicas da sua conta?
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

> [!question] 125. A empresa tem AD on-premises e 20 contas AWS. Quer que os funcionários façam login no console com a identidade de rede, sem replicar usuários para a AWS.
> **A)** Criar IAM users em cada conta e sincronizar senhas com o AD
> **B)** AD Connector ligando a AWS ao AD on-premises, integrado ao IAM Identity Center, com permission sets atribuídos por grupo do AD
> **C)** Simple AD como fonte de identidade do Identity Center
> **D)** AWS Managed Microsoft AD replicando os usuários do AD on-premises
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é a cadeia padrão. O AD Connector é *"a directory gateway... without caching any information in the cloud"* (um gateway de diretório... sem fazer cache de nenhuma informação na nuvem), o Identity Center faz *"pass-through authentication to the source AD instance"* (autenticação pass-through contra a instância de AD de origem), e os permission sets atribuem acesso por grupo.
> > **C errada**: *"IAM Identity Center does not work with SAMBA4-based Simple AD directories."* (o IAM Identity Center não funciona com diretórios Simple AD, baseados em SAMBA4)
> > **D errada**: atende, mas **replica** identidade para a AWS — o enunciado proibiu.
> >
> > Fonte: [[1 - Seguranca (30%)/Directory Service/4 - Questoes|Directory Service]]

> [!question] 126. Um fornecedor externo precisa assumir uma role na sua conta. O que incluir na trust policy?
> **A)** Apenas o ARN da conta do fornecedor
> **B)** O ARN da conta do fornecedor e a condição `sts:ExternalId`
> **C)** `aws:SourceArn` do fornecedor
> **D)** MFA obrigatório
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: `ExternalId` é a proteção contra **confused deputy** com terceiros — impede que o fornecedor use a mesma role em nome de outro cliente dele.
> > **C errada**: `aws:SourceArn` é o padrão para **serviços AWS** assumindo role, não para terceiros.
> > **D errada**: MFA é boa prática para humanos; não endereça o confused deputy de integração.
> >
> > Fonte: [[1 - Seguranca (30%)/IAM/4 - Questoes|IAM]]

> [!question] 127. Após um incidente, o analista precisa ver todas as chamadas de API e o tráfego de rede de um role comprometido nos últimos 30 dias, correlacionados automaticamente.
> **A)** CloudTrail Lake com query SQL
> **B)** Amazon Detective
> **C)** Security Hub
> **D)** CloudWatch Logs Insights
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"helps you analyze, investigate, and quickly identify the root cause"* (ajuda a analisar, investigar e identificar rapidamente a causa raiz), correlacionando CloudTrail + VPC Flow Logs + achados do GuardDuty num grafo, com até **1 ano** de histórico.
> > **A errada**: dá para fazer, mas você escreve as consultas e monta a correlação — mais esforço operacional.
> > **C errada**: Security Hub mostra o **achado**, não a investigação.
> > **D errada**: consulta logs; não correlaciona entidades de segurança.
> >
> > Fonte: [[1 - Seguranca (30%)/Detective/4 - Questoes|Detective]]

> [!question] 128. Garantir que **toda** distribuição CloudFront nova nas 60 contas receba a web ACL corporativa.
> **A)** SCP exigindo WAF
> **B)** AWS Firewall Manager com policy de WAF aplicada à organização
> **C)** AWS Config rule com remediação
> **D)** CloudFormation StackSets
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é o caso de uso do Firewall Manager — aplicar WAF/Shield/SG/NACL centralmente.
> > **A errada**: SCP nega ações; não **associa** recursos.
> > **C errada**: detecta e remedia depois, com mais peças.
> >
> > Fonte: [[1 - Seguranca (30%)/WAF/4 - Questoes|WAF]]

> [!question] 129. Varrer volumes EBS em busca de malware.
> **A)** Inspector
> **B)** GuardDuty Malware Protection
> **C)** Macie
> **D)** Systems Manager Patch Manager
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é o plano opcional do GuardDuty que varre **volumes EBS**.
> > **A errada**: Inspector procura **CVE em pacotes**, não malware em disco.
> > **D errada**: Patch Manager aplica patch, não procura malware.
> >
> > Fonte: [[1 - Seguranca (30%)/GuardDuty/4 - Questoes|GuardDuty]]

> [!question] 130. Sem requisito de HSM dedicado nem FIPS, qual serviço a AWS recomenda para criar e controlar chaves?
> **A)** CloudHSM em non-FIPS mode
> **B)** AWS KMS
> **C)** Parameter Store com SecureString
> **D)** CloudHSM com custom key store
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: citação direta — *"If you want a managed service for creating and controlling your encryption keys but you don't want or need to operate your own HSMs, consider using AWS Key Management Service."* (se você quer um serviço gerenciado para criar e controlar suas chaves de criptografia, mas não quer nem precisa operar os próprios HSMs, considere usar o AWS Key Management Service)
> >
> > Fonte: [[1 - Seguranca (30%)/CloudHSM/4 - Questoes|CloudHSM]]

> [!question] 131. Uma instância tem dois security groups: um libera a porta 80 de `0.0.0.0/0`, outro não libera nada. A porta 80 está acessível?
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

> [!question] 132. Instâncias privadas iniciam HTTPS para a internet, mas as respostas não chegam. A NACL tem só `outbound ALLOW TCP 443`. O que falta?
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

> [!question] 133. O AWS RAM pode ser usado para dar a outra conta permissão de ler um bucket S3?
> **A)** Sim, compartilhando o bucket
> **B)** Não: o S3 não é compartilhado via RAM; use bucket policy (e IAM na conta de origem)
> **C)** Sim, com RAM managed permissions
> **D)** Só dentro da mesma organização
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: RAM compartilha tipos de recurso suportados (subnet, TGW, resolver rules, licenças…). Acesso a bucket é **policy de recurso** + policy de identidade.
> >
> > Fonte: [[1 - Seguranca (30%)/AWS RAM/4 - Questoes|AWS RAM]]

> [!question] 134. A aplicação não pode perder conexões durante a rotação da senha. Qual configuração?
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

> [!question] 135. A conta A compartilhou um snapshot de EBS criptografado com a conta B. A conta B vê o snapshot, mas não consegue restaurá-lo. Por quê?
> **A)** Snapshot criptografado não pode ser compartilhado
> **B)** A key policy da chave KMS não permite a conta B
> **C)** Falta habilitar criptografia por padrão na conta B
> **D)** A chave precisa ser multi-Region
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: key policy é exceção à regra da união — *"must explicitly allow access for principals"* (precisam permitir o acesso explicitamente para os principais). Sem a conta B na key policy, nenhuma policy IAM dela resolve.
> > **A errada**: pode ser compartilhado, desde que criptografado com **customer managed key** (AWS managed key não é compartilhável).
> > **D errada**: multi-Region resolve **regiões**, não contas.
> >
> > Fonte: [[1 - Seguranca (30%)/KMS/4 - Questoes|KMS]]

> [!question] 136. Duas VPCs com CIDR sobreposto. A VPC A precisa consumir uma API hospedada na VPC B. O que usar?
> **A)** VPC peering
> **B)** Transit Gateway
> **C)** AWS PrivateLink (interface endpoint para o endpoint service da VPC B)
> **D)** Renumerar a VPC A
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: PrivateLink **não roteia redes** — expõe um serviço por uma ENI na VPC consumidora, então o CIDR sobreposto é irrelevante.
> > **A e B erradas**: peering e TGW roteiam redes e exigem CIDRs não sobrepostos.
> > **D errada**: funciona, mas é a opção mais custosa e disruptiva; a prova premia a solução que evita renumerar.
> >
> > Fonte: [[1 - Seguranca (30%)/VPC/4 - Questoes|VPC]]

> [!question] 137. O Macie pode varrer um banco RDS em busca de CPFs?
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

> [!question] 138. Detectar, em 30 contas, qualquer security group que libere a porta 22 para `0.0.0.0/0`, e corrigir automaticamente.
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

> [!question] 139. Um time quer usar o NAT gateway também como bastion para acessar as instâncias privadas por SSH.
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

> [!question] 140. Duas instâncias estão na **mesma** subnet. A NACL nega todo tráfego na porta 3306. Elas conseguem se comunicar nessa porta?
> **A)** Não, a NACL bloqueia
> **B)** Sim: a NACL só avalia o tráfego que entra e sai da subnet
> **C)** Depende da ordem das regras
> **D)** Só se estiverem no mesmo SG
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"We evaluate the network ACL rules when traffic enters and leaves the subnet, not as it is routed within a subnet."* (avaliamos as regras da network ACL quando o tráfego entra e sai da subnet, não enquanto ele é roteado dentro dela) Quem controla aí é o **security group**.
> >
> > Fonte: [[1 - Seguranca (30%)/NACL (Network ACL)/4 - Questoes|NACL (Network ACL)]]

> [!question] 141. Qual chave **não** pode ter rotação automática habilitada?
> **A)** Customer managed simétrica criada na KMS
> **B)** Chave assimétrica
> **C)** Chave simétrica com material importado
> **D)** Multi-Region key primária
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: automática é *"supported only on symmetric encryption KMS keys with key material that AWS KMS generates (AWS_KMS origin)"* (suportado apenas em chaves simétricas do KMS cujo material de chave é gerado pelo próprio AWS KMS (origem AWS_KMS)). Assimétrica, HMAC e custom key store só manual.
> > **C errada**: material importado (`EXTERNAL`) suporta rotação **on-demand**.
> > **D errada**: suporta — e a rotação se configura justamente **na primária**.
> >
> > Fonte: [[1 - Seguranca (30%)/KMS/4 - Questoes|KMS]]

> [!question] 142. Quantos IPs utilizáveis tem uma subnet `/28`?
> **A)** 16
> **B)** 14
> **C)** 11
> **D)** 13
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: 16 endereços totais, menos os **5** reservados pela AWS (os 4 primeiros e o último) = **11**.
> > **B errada**: 14 seria o cálculo de rede tradicional (menos rede e broadcast). A AWS reserva **cinco**, não dois.
> >
> > Fonte: [[1 - Seguranca (30%)/VPC/4 - Questoes|VPC]]
