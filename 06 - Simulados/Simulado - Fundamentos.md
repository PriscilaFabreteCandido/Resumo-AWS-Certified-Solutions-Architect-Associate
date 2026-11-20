---
tags: [saa-c03, simulado]
gerado_por: scripts/gerar-simulados.mjs
---

# Simulado — Fundamentos

> [!warning] Nota gerada automaticamente: não edite aqui
> Corrija a questão na nota `4 - Questoes` de origem (o link está na resposta) e rode `node scripts/gerar-simulados.mjs`.

Todas as questões do domínio, misturando os serviços. O nome do serviço só aparece depois da resposta.

**49 questões.** Responda de cabeça e anote a letra **antes** de abrir a resposta. Errou? Abra a **Fonte** e volte ao conteúdo daquele ponto.

---

> [!question] 1. O requisito é *"proteger contra a exclusão acidental ou maliciosa de objetos no S3"*.
> **A)** Cross-Region Replication
> **B)** Versionamento + MFA Delete (e Object Lock, se for exigida imutabilidade)
> **C)** S3 Standard-IA
> **D)** Multi-site active/active
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: proteção contra **erro lógico** não vem de replicação.
> > **A errada**: a replicação **propaga** o problema — é a pegadinha. (Com versionamento no destino a deleção não é replicada como permanente, mas o mecanismo de proteção é o **versionamento**, não a replicação.)
> >
> > Fonte: [[9 - Fundamentos e apoio/Disaster Recovery (RPO e RTO)/4 - Questoes|Disaster Recovery (RPO e RTO)]]

> [!question] 2. O time quer reduzir ao máximo a responsabilidade operacional de um banco relacional.
> **A)** MySQL em EC2 com scripts de backup
> **B)** RDS MySQL
> **C)** Aurora Serverless v2
> **D)** DynamoDB
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: dentro de "banco relacional", é o que empurra mais a fronteira para a AWS (sem instância para dimensionar, cobrado por segundo).
> > **D errada**: reduziria ainda mais a responsabilidade, mas **não é relacional** — mudaria o modelo de dados.
> >
> > Fonte: [[9 - Fundamentos e apoio/Responsabilidade compartilhada/4 - Questoes|Responsabilidade compartilhada]]

> [!question] 3. RPO de 5 minutos, RTO de 20 minutos, e a empresa **não quer pagar servidores de aplicação ociosos**.
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

> [!question] 4. O certificado criado no ACM não aparece para associar à distribuição do CloudFront.
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

> [!question] 5. Um servidor on-premises deve continuar gravando por **NFS**, mas os dados precisam ficar no S3.
> **A)** Montar o bucket com Mountpoint no servidor
> **B)** S3 File Gateway (Storage Gateway)
> **C)** DataSync
> **D)** Direct Connect + EFS
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o File Gateway expõe **NFS/SMB** localmente e grava como **objeto no S3**, com cache local.
> > **C errada**: DataSync **transfere** dados (one-off ou agendado); não é um share contínuo.
> >
> > Fonte: [[9 - Fundamentos e apoio/Tipos de armazenamento (objeto, arquivo, bloco)/4 - Questoes|Tipos de armazenamento (objeto, arquivo, bloco)]]

> [!question] 6. Um banco RDS é **Multi-AZ**. A Região inteira fica indisponível.
> **A)** O failover Multi-AZ resolve
> **B)** Multi-AZ não protege contra falha regional — é necessária uma read replica cross-Region (ou Aurora Global Database)
> **C)** O backup automático restaura em outra Região automaticamente
> **D)** O Route 53 redireciona sozinho
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: Multi-AZ é **HA dentro da Região**. Para DR regional: **cross-Region read replica** promovível, **Aurora Global Database** ou **cópia cross-Region de backups**.
> >
> > Fonte: [[9 - Fundamentos e apoio/Disaster Recovery (RPO e RTO)/4 - Questoes|Disaster Recovery (RPO e RTO)]]

> [!question] 7. Um bucket S3 foi exposto publicamente e houve vazamento. De quem é a responsabilidade?
> **A)** Da AWS, por não impedir
> **B)** Do cliente: a configuração de acesso é responsabilidade dele
> **C)** Compartilhada
> **D)** Da AWS, se o bucket usava SSE-S3
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: configuração é sempre do cliente. A AWS oferece **Block Public Access** (recomendando *"turn on all four settings"* (ative as quatro configurações)), **Config**, **Macie** e **Security Hub** — mas a decisão é sua.
> >
> > Fonte: [[9 - Fundamentos e apoio/Responsabilidade compartilhada/4 - Questoes|Responsabilidade compartilhada]]

> [!question] 8. O auditor pediu o relatório **SOC 2 da AWS**. Onde obter?
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

> [!question] 9. O requisito diz: *"as chaves devem ficar em HSM single-tenant validado em FIPS 140-3 nível 3, sob nosso controle exclusivo"*.
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

> [!question] 10. A empresa quer sobreviver à indisponibilidade de uma **Região** inteira.
> **A)** RDS Multi-AZ
> **B)** ASG em 3 AZs atrás de um ALB
> **C)** Replicação para outra Região (ex.: Aurora Global Database ou S3 CRR) com failover no Route 53
> **D)** Aumentar o número de AZs para 6
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: **Multi-AZ não protege contra falha regional**. É a pegadinha nº 1 do domínio 2.
> > **A e B erradas**: resolvem falha de **AZ**.
> >
> > Fonte: [[9 - Fundamentos e apoio/Regioes, AZs e infraestrutura global/4 - Questoes|Regioes, AZs e infraestrutura global]]

> [!question] 11. A empresa quer **aproveitar ao máximo os recursos nativos da nuvem**, com **escala para zero** fora do horário comercial, e **aceita reescrever** a aplicação.
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

> [!question] 12. Um snapshot EBS cifrado precisa ser compartilhado com outra conta AWS.
> **A)** Funciona com qualquer chave KMS
> **B)** Só funciona se o snapshot estiver cifrado com uma customer managed key, compartilhada via key policy
> **C)** É preciso descriptografar antes
> **D)** Snapshots cifrados não podem ser compartilhados
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: snapshots cifrados com a chave **AWS managed** (`aws/ebs`) **não podem** ser compartilhados. Com CMK, você concede `kms:Decrypt`/`kms:CreateGrant` à outra conta na key policy.
> >
> > Fonte: [[9 - Fundamentos e apoio/Criptografia em repouso e em transito/4 - Questoes|Criptografia em repouso e em transito]]

> [!question] 13. Aplicação precisa do **maior IOPS possível** para um cache temporário que pode ser reconstruído.
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

> [!question] 14. Qual a diferença entre **rehost** e **relocate**?
> **A)** São sinônimos
> **B)** No rehost a VM se torna uma instância EC2; no relocate a infraestrutura de virtualização vai junto (ex.: VMware Cloud on AWS), sem mudar operação nem comprar hardware
> **C)** Relocate exige mudança de código
> **D)** Rehost só funciona para Windows
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: nenhum dos dois muda o **código** — a diferença está em **o que acontece com a plataforma de virtualização**.
> >
> > Fonte: [[9 - Fundamentos e apoio/Estrategias de migracao (7 Rs)/4 - Questoes|Estrategias de migracao (7 Rs)]]

> [!question] 15. O enunciado diz *"com o menor esforço operacional"*. Qual pilar está em jogo, e o que isso elimina?
> **A)** Cost Optimization; elimina serviços caros
> **B)** Operational Excellence; elimina script manual, cron em EC2 e "atualizar no lugar"
> **C)** Reliability; elimina Single-AZ
> **D)** Security; elimina acesso público
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: a hierarquia é **serverless gerenciado > gerenciado com instância > você gerencia a instância**.
> >
> > Fonte: [[9 - Fundamentos e apoio/Well-Architected Framework/4 - Questoes|Well-Architected Framework]]

> [!question] 16. Uma frota de 40 instâncias Linux precisa **ler e escrever os mesmos arquivos**, com semântica POSIX.
> **A)** Um volume EBS gp3 compartilhado
> **B)** Amazon EFS
> **C)** S3 com Mountpoint
> **D)** FSx for Windows File Server
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é armazenamento de **arquivo**, NFS, regional, montável por milhares de clientes.
> > **A errada**: EBS é **bloco e zonal** — anexa a uma instância (Multi-Attach chega a 16, **na mesma AZ**, e exige filesystem com suporte a cluster).
> > **C errada**: Mountpoint é otimizado para **leitura** sequencial; não dá semântica POSIX completa de escrita concorrente.
> > **D errada**: SMB/Windows.
> >
> > Fonte: [[9 - Fundamentos e apoio/Tipos de armazenamento (objeto, arquivo, bloco)/4 - Questoes|Tipos de armazenamento (objeto, arquivo, bloco)]]

> [!question] 17. O plano de DR prevê subir 150 instâncias na Região secundária. O que foi esquecido?
> **A)** Nada — basta o CloudFormation
> **B)** Verificar as quotas de serviço na Região de DR (são por conta e por Região) e testar o failover
> **C)** Copiar os security groups
> **D)** Criar a VPC com o mesmo CIDR
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: quotas são **por conta e por Região** — é a falha clássica, descoberta só durante o desastre. Junte a isso: AMIs e snapshots **copiados**, chave **KMS** na Região de destino e **certificado ACM** lá.
> >
> > Fonte: [[9 - Fundamentos e apoio/Disaster Recovery (RPO e RTO)/4 - Questoes|Disaster Recovery (RPO e RTO)]]

> [!question] 18. Duas alternativas atendem o RPO e o RTO: pilot light e multi-site active/active. O enunciado diz *"a mais econômica que atende"*.
> **A)** Multi-site active/active, por ser mais robusta
> **B)** Pilot light
> **C)** Backup and restore
> **D)** Warm standby
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: quando os pilares conflitam, o **qualificador do enunciado** decide. "A mais econômica que atende" é Cost Optimization vencendo — e o active/active é *"the most complex and costly approach"* (a abordagem mais complexa e mais cara).
> > **C errada**: o enunciado diz que pilot light **atende**; backup and restore pode não atender.
> >
> > Fonte: [[9 - Fundamentos e apoio/Well-Architected Framework/4 - Questoes|Well-Architected Framework]]

> [!question] 19. Qual destes recursos é **global**?
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

> [!question] 20. A aplicação depende de um **appliance de hardware** que não tem equivalente na nuvem, e o contrato dele vai até 2029.
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

> [!question] 21. Cluster de HPC precisa processar um dataset que **já está no S3**, com latência de sub-milissegundo.
> **A)** EFS com Elastic Throughput
> **B)** Copiar para EBS io2 em cada nó
> **C)** FSx for Lustre vinculado ao bucket S3
> **D)** Ler direto do S3 com Mountpoint
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: Lustre é o filesystem de HPC da AWS e **integra com o S3** — apresenta os objetos como arquivos e grava os resultados de volta.
> > **B errada**: cada nó teria sua cópia, sem compartilhamento.
> >
> > Fonte: [[9 - Fundamentos e apoio/Tipos de armazenamento (objeto, arquivo, bloco)/4 - Questoes|Tipos de armazenamento (objeto, arquivo, bloco)]]

> [!question] 22. O data center fecha em **3 meses** e a equipe **não pode alterar as aplicações**.
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

> [!question] 23. Qual é a distância máxima entre AZs da mesma Região?
> **A)** 10 km
> **B)** 100 km (60 milhas)
> **C)** 500 km
> **D)** Não há limite definido
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"AZs are physically separated by a meaningful distance, many kilometers, from any other AZ, although all are within 100 km (60 miles) of each other."* (as AZs são separadas fisicamente por uma distância significativa, de muitos quilômetros, de qualquer outra AZ — embora todas fiquem a até 100 km (60 milhas) umas das outras)
> > É esse teto que permite **replicação sincrônica** (RDS Multi-AZ, Aurora) sem latência inviável.
> >
> > Fonte: [[9 - Fundamentos e apoio/Regioes, AZs e infraestrutura global/4 - Questoes|Regioes, AZs e infraestrutura global]]

> [!question] 24. Um volume EBS está em `us-east-1a`. A instância que precisa dele está em `us-east-1b`.
> **A)** Anexar normalmente — EBS é regional
> **B)** Habilitar multi-attach
> **C)** Criar um snapshot e, a partir dele, um volume em `us-east-1b`
> **D)** Mover o volume pela console
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: **EBS é zonal**; o **snapshot é regional**, e é ele que atravessa AZs (e, copiado, Regiões).
> > **B errada**: Multi-Attach anexa um volume io1/io2 a várias instâncias — **todas na mesma AZ**.
> >
> > Fonte: [[9 - Fundamentos e apoio/Regioes, AZs e infraestrutura global/4 - Questoes|Regioes, AZs e infraestrutura global]]

> [!question] 25. RTO de **30 minutos**, e os backups estão em **Glacier Deep Archive**.
> **A)** Está adequado, é a classe mais barata
> **B)** Inadequado: a recuperação do Deep Archive leva 12 h (standard) a 48 h (bulk)
> **C)** Basta usar recuperação expedited
> **D)** Adequado se usar o S3 Transfer Acceleration
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: Deep Archive **não oferece** expedited. Para um RTO de 30 min, o backup precisa estar em **Standard/Standard-IA** ou **Glacier Instant Retrieval** (acesso em milissegundos).
> > **C errada**: expedited (1–5 min) existe no **Glacier Flexible Retrieval**, não no Deep Archive.
> >
> > Fonte: [[9 - Fundamentos e apoio/Disaster Recovery (RPO e RTO)/4 - Questoes|Disaster Recovery (RPO e RTO)]]

> [!question] 26. Milhões de arquivos de **50 KB** cada, acessados raramente. O time quer o menor custo.
> **A)** S3 Standard-IA
> **B)** S3 One Zone-IA
> **C)** Avaliar: com objetos de 50 KB, as classes IA cobram o mínimo de 128 KB por objeto — S3 Standard (ou agregar os arquivos) pode sair mais barato
> **D)** Glacier Deep Archive
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: as classes infrequentes cobram por **no mínimo 128 KB** por objeto e por um **mínimo de dias** (30 em Standard-IA e One Zone-IA). Para objetos de 50 KB você pagaria por 128 KB.
> > **D errada**: além dos mínimos (180 dias), a recuperação leva horas.
> >
> > Fonte: [[9 - Fundamentos e apoio/Tipos de armazenamento (objeto, arquivo, bloco)/4 - Questoes|Tipos de armazenamento (objeto, arquivo, bloco)]]

> [!question] 27. Um certificado do ACM precisa ser instalado num servidor web **em EC2**.
> **A)** Exportar o certificado público do ACM e instalar
> **B)** Não é possível exportar certificado público do ACM — use o ACM Private CA (exportável) ou importe um certificado de terceiros
> **C)** Associar o certificado à instância pela console
> **D)** Usar o ACM apenas com o IMDS
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o ACM **não libera a chave privada** de certificados públicos; eles só se associam a serviços integrados (ALB, NLB, CloudFront, API Gateway). Para instalar num servidor, é **Private CA** ou certificado importado.
> >
> > Fonte: [[9 - Fundamentos e apoio/Criptografia em repouso e em transito/4 - Questoes|Criptografia em repouso e em transito]]

> [!question] 28. Um sistema interno de relatórios **não é acessado por ninguém** há mais de um ano.
> **A)** Rehost, por segurança
> **B)** Retain
> **C)** Retire
> **D)** Replatform
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: é o R de **maior retorno** — custo e esforço zero. O **Application Discovery Service** é o que revela esses casos no inventário.
> >
> > Fonte: [[9 - Fundamentos e apoio/Estrategias de migracao (7 Rs)/4 - Questoes|Estrategias de migracao (7 Rs)]]

> [!question] 29. Quantos pilares tem o framework, e quais?
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

> [!question] 30. Um jogo precisa de latência de **milissegundo único** para jogadores de uma única metrópole.
> **A)** CloudFront
> **B)** Global Accelerator
> **C)** AWS Local Zones
> **D)** Mais AZs na Região
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: Local Zones existem exatamente para *single-digit millisecond latency* em metrópoles.
> > **A errada**: CloudFront acelera conteúdo **cacheável**, não computação com estado.
> > **B errada**: melhora o caminho de rede até a Região, mas a computação continua lá.
> >
> > Fonte: [[9 - Fundamentos e apoio/Regioes, AZs e infraestrutura global/4 - Questoes|Regioes, AZs e infraestrutura global]]

> [!question] 31. A equipe quer **criptografia de ponta a ponta** atrás de um ALB.
> **A)** Listener HTTPS no ALB basta
> **B)** Listener HTTPS no ALB e target group em HTTPS (ou NLB com passthrough TCP)
> **C)** Habilitar criptografia em repouso nas instâncias
> **D)** Usar Global Accelerator
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: só terminar TLS no ALB deixa o trecho ALB→instância em claro.
> >
> > Fonte: [[9 - Fundamentos e apoio/Criptografia em repouso e em transito/4 - Questoes|Criptografia em repouso e em transito]]

> [!question] 32. Um banco **RDS já em produção** não está cifrado. A auditoria exige criptografia em repouso.
> **A)** Habilitar a criptografia na instância pela console
> **B)** Modificar o parameter group
> **C)** Criar um snapshot, copiar o snapshot habilitando a criptografia, restaurar a cópia e apontar a aplicação para o novo endpoint
> **D)** Habilitar SSL/TLS nas conexões
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: no RDS a criptografia em repouso **só se habilita na criação**. O caminho oficial é snapshot → **cópia cifrada** → restore.
> > **D errada**: TLS é **em trânsito** — outra coisa.
> >
> > Fonte: [[9 - Fundamentos e apoio/Criptografia em repouso e em transito/4 - Questoes|Criptografia em repouso e em transito]]

> [!question] 33. Migrar um banco **Oracle** on-premises para **Aurora PostgreSQL** com **downtime mínimo**.
> **A)** Só DMS
> **B)** Só SCT
> **C)** SCT para converter o schema e o código, e DMS com CDC para os dados
> **D)** Snowball Edge
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: é migração **heterogênea** — engines diferentes. **SCT = schema**, **DMS = dados**, e o **CDC** mantém a sincronia durante a migração, permitindo um cutover curto.
> > **A errada**: o DMS não converte procedures, views e funções entre engines diferentes.
> >
> > Fonte: [[9 - Fundamentos e apoio/Estrategias de migracao (7 Rs)/4 - Questoes|Estrategias de migracao (7 Rs)]]

> [!question] 34. Requisito: *"RPO e RTO próximos de zero; usuários na América e na Europa devem ser atendidos localmente"*.
> **A)** Warm standby na Europa
> **B)** Multi-site active/active
> **C)** Pilot light na Europa
> **D)** CloudFront com origem única
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: as duas Regiões **servem produção** — atende latência e DR ao mesmo tempo. A doc avisa que é *"the most complex and costly approach"* (a abordagem mais complexa e mais cara), mas o enunciado pediu zero.
> > **D errada**: CloudFront acelera conteúdo cacheável; não dá DR da aplicação nem do banco.
> >
> > Fonte: [[9 - Fundamentos e apoio/Disaster Recovery (RPO e RTO)/4 - Questoes|Disaster Recovery (RPO e RTO)]]

> [!question] 35. Uma instância EC2 foi terminada, mas a fatura do EBS continua.
> **A)** Erro de cobrança
> **B)** O volume não tinha "delete on termination" e continua provisionado — EBS cobra por GB provisionado, mesmo desanexado
> **C)** Snapshots automáticos
> **D)** EBS cobra 30 dias mínimos
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: EBS cobra **capacidade provisionada**, independentemente de uso ou de estar anexado. Volumes órfãos são um achado clássico do **Trusted Advisor** e do **Cost Explorer**.
> >
> > Fonte: [[9 - Fundamentos e apoio/Tipos de armazenamento (objeto, arquivo, bloco)/4 - Questoes|Tipos de armazenamento (objeto, arquivo, bloco)]]

> [!question] 36. E no **RDS**, quem patcheia o engine do banco?
> **A)** O cliente
> **B)** A AWS
> **C)** Compartilhado
> **D)** Depende do engine
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: no RDS a AWS gerencia o SO subjacente e o engine. Ao cliente cabem **usuários, schema, parameter group, criptografia e os dados**.
> > ⚠️ É a demonstração de que a fronteira **se move com o serviço**.
> >
> > Fonte: [[9 - Fundamentos e apoio/Responsabilidade compartilhada/4 - Questoes|Responsabilidade compartilhada]]

> [!question] 37. Uma aplicação precisa armazenar métricas de sensores, consultadas por janela de tempo.
> **A)** RDS PostgreSQL com índice no timestamp
> **B)** Amazon Timestream
> **C)** DynamoDB com sort key de timestamp
> **D)** S3 com Athena
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é o princípio *"Using purpose-built AWS services for workloads"* (usar serviços da AWS feitos sob medida para cada carga de trabalho), citado **duas vezes** no guia. O guia também pede, em Task 4.3, *"cost-effective AWS database types (for example, time series format...)"* (tipos de banco da AWS mais econômicos (por exemplo, formato de série temporal...)).
> > **A errada**: relacional genérico adaptado — funciona, custa mais e escala pior.
> >
> > Fonte: [[9 - Fundamentos e apoio/Well-Architected Framework/4 - Questoes|Well-Architected Framework]]

> [!question] 38. Qual destas tarefas é **sempre** do cliente, em qualquer serviço?
> **A)** Patch do SO
> **B)** Gerenciar IAM e a configuração do serviço
> **C)** Descarte seguro de mídia
> **D)** Patch do hipervisor
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: mesmo em S3, Lambda e DynamoDB, **IAM, dados e configuração** são do cliente.
> > **A errada**: é do cliente **só** em EC2 (e similares).
> >
> > Fonte: [[9 - Fundamentos e apoio/Responsabilidade compartilhada/4 - Questoes|Responsabilidade compartilhada]]

> [!question] 39. A empresa quer **manter o mesmo engine MySQL e o código da aplicação**, mas **parar de administrar backup, patch e failover do banco**.
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

> [!question] 40. Migrar **600 TB** de arquivos. A banda disponível é de **500 Mbps** e o prazo é de **2 semanas**.
> **A)** DataSync pela internet
> **B)** Transferência offline da Snow Family
> **C)** S3 Transfer Acceleration
> **D)** Direct Connect novo
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: 600 TB a 500 Mbps levaria **mais de 100 dias** — muito além do prazo. Quando o tempo pela rede excede o prazo, a resposta é **offline**.
> > **D errada**: provisionar um Direct Connect leva semanas e, mesmo a 1 Gbps, não cabe em 2 semanas.
> > ⚠️ Saiba que o **Snowball Edge** não está mais disponível para novos clientes e o suporte termina em **31/12/2026** — a AWS aponta para **DataSync**, **Data Transfer Terminal** ou **Outposts**.
> >
> > Fonte: [[9 - Fundamentos e apoio/Estrategias de migracao (7 Rs)/4 - Questoes|Estrategias de migracao (7 Rs)]]

> [!question] 41. Uma VPC com subnets em 3 AZs tem **um** NAT Gateway na AZ A. A AZ A falha.
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

> [!question] 42. Qual a diferença essencial entre **pilot light** e **warm standby**?
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

> [!question] 43. É preciso **revogar imediatamente** o acesso a dados cifrados, com possibilidade de voltar atrás.
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

> [!question] 44. É preciso cifrar um arquivo de **10 MB** usando o KMS.
> **A)** Chamar `Encrypt` com o arquivo
> **B)** Chamar `GenerateDataKey`, cifrar o arquivo localmente com a data key e guardar a data key cifrada junto do arquivo
> **C)** Usar CloudHSM, pois o KMS não cifra arquivos
> **D)** Dividir o arquivo em blocos de 4 KB e chamar `Encrypt` em cada
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é **envelope encryption**. O `Encrypt` do KMS aceita no máximo **4.096 bytes**.
> > **D errada**: tecnicamente funcionaria e é absurdo — 2.560 chamadas de API para um arquivo.
> >
> > Fonte: [[9 - Fundamentos e apoio/Criptografia em repouso e em transito/4 - Questoes|Criptografia em repouso e em transito]]

> [!question] 45. Quem é responsável por aplicar patches de segurança no **sistema operacional** de uma instância EC2?
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

> [!question] 46. Qual ferramenta conduz a revisão Well-Architected?
> **A)** Trusted Advisor
> **B)** AWS Well-Architected Tool
> **C)** AWS Config
> **D)** Security Hub
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é o serviço específico, na lista oficial em escopo.
> > **A errada**: Trusted Advisor dá checagens prontas nos 5 pilares de **custo, performance, segurança, tolerância a falha e limites** — útil, mas não é a revisão do framework.
> >
> > Fonte: [[9 - Fundamentos e apoio/Well-Architected Framework/4 - Questoes|Well-Architected Framework]]

> [!question] 47. Um file share **Windows** com autenticação no **Active Directory** e ACLs NTFS.
> **A)** EFS
> **B)** FSx for Windows File Server
> **C)** FSx for Lustre
> **D)** S3 File Gateway
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: SMB nativo + integração com AD + ACLs NTFS.
> > **A errada**: EFS é **NFS**, para Linux.
> >
> > Fonte: [[9 - Fundamentos e apoio/Tipos de armazenamento (objeto, arquivo, bloco)/4 - Questoes|Tipos de armazenamento (objeto, arquivo, bloco)]]

> [!question] 48. Replicar **servidores** (on-premises e EC2) para outra Região com RPO de **segundos**, sem pagar a frota parada.
> **A)** AWS Backup com cópia cross-Region
> **B)** AWS Elastic Disaster Recovery (DRS)
> **C)** Snapshots EBS a cada hora copiados entre Regiões
> **D)** Warm standby
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: DRS faz replicação **contínua em nível de bloco**, com RPO de segundos e RTO de minutos, cobrando pouco até o failover.
> > **C errada**: RPO de 1 hora.
> > **D errada**: atende o RPO, mas **paga a frota ligada**.
> >
> > Fonte: [[9 - Fundamentos e apoio/Disaster Recovery (RPO e RTO)/4 - Questoes|Disaster Recovery (RPO e RTO)]]

> [!question] 49. Como garantir que **nenhum** acesso a um bucket S3 ocorra sem HTTPS?
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
