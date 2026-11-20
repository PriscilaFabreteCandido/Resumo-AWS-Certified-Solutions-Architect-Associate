---
tags: [saa-c03, simulado]
gerado_por: scripts/gerar-simulados.mjs
---

# Simulado — Dominio 3 (Performance)

> [!warning] Nota gerada automaticamente: não edite aqui
> Corrija a questão na nota `4 - Questoes` de origem (o link está na resposta) e rode `node scripts/gerar-simulados.mjs`.

Todas as questões do domínio, misturando os serviços. O nome do serviço só aparece depois da resposta.

**176 questões.** Responda de cabeça e anote a letra **antes** de abrir a resposta. Errou? Abra a **Fonte** e volte ao conteúdo daquele ponto.

---

> [!question] 1. Cinco VPCs precisam se comunicar entre si e com o datacenter, com crescimento previsto para 50 VPCs.
> **A)** VPC peering full mesh
> **B)** Transit Gateway com attachments de VPC e do Direct Connect gateway
> **C)** PrivateLink entre todas as VPCs
> **D)** VPN entre cada VPC e o datacenter
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é o *"network transit hub used to interconnect VPCs and on-premises networks"* (hub de trânsito de rede usado para interligar VPCs e redes on-premises), com roteamento transitivo e *"up to 5,000 attachments"* (até 5.000 attachments).
> > **A errada**: peering **não é transitivo** e 50 VPCs em malha = **1.225** conexões.
> > **C errada**: PrivateLink expõe **serviço**, não conecta redes inteiras.
> > **D errada**: 50 VPNs para gerenciar, e as VPCs não se falariam.
> >
> > Fonte: [[3 - Performance (24%)/Transit Gateway/4 - Questoes|Transit Gateway]]

> [!question] 2. O dataset do cache não cabe num único nó e a escrita precisa escalar.
> **A)** Cluster mode disabled com réplicas
> **B)** Redis com cluster mode enabled (sharding)
> **C)** Memcached com um nó grande
> **D)** DAX
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: cluster mode particiona os dados em **shards**, escalando memória **e** escrita.
> > **A errada**: réplicas escalam **leitura**, não memória nem escrita.
> >
> > Fonte: [[3 - Performance (24%)/ElastiCache/4 - Questoes|ElastiCache]]

> [!question] 3. Migrar uma aplicação que usa **MongoDB** para a AWS, sem reescrever o código de acesso a dados.
> **A)** DynamoDB
> **B)** Amazon DocumentDB
> **C)** RDS PostgreSQL com JSONB
> **D)** Keyspaces
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: compatível com a **API do MongoDB** — drivers e queries continuam funcionando.
> > **A errada**: DynamoDB tem API própria; exigiria reescrever.
> > **D errada**: Keyspaces é **Cassandra**.
> >
> > Fonte: [[3 - Performance (24%)/Bancos especializados (Neptune, DocumentDB, Keyspaces, Timestream)/4 - Questoes|Bancos especializados (Neptune, DocumentDB, Keyspaces, Timestream)]]

> [!question] 4. O enunciado exige **Dedicated Hosts** (licença por socket) e latência mínima entre nós.
> **A)** Cluster placement group com Dedicated Hosts
> **B)** Não é possível combinar: Dedicated Hosts não podem lançar em placement group
> **C)** Partition com 2 partições
> **D)** Spread com Dedicated Hosts
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: a doc é explícita — **Dedicated Hosts não podem** lançar em placement group.
> > **D errada**: spread também **não é suportado** com Dedicated Instances.
> >
> > Fonte: [[3 - Performance (24%)/Placement Groups/4 - Questoes|Placement Groups]]

> [!question] 5. Um servidor de backup grava em fitas LTO. A empresa quer eliminar as fitas **sem trocar o software**.
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

> [!question] 6. Uma tabela tem 100.000 partições e o `MSCK REPAIR TABLE` demora demais.
> **A)** Remover o particionamento
> **B)** Usar partition projection
> **C)** Migrar para Redshift Spectrum
> **D)** Aumentar o workgroup
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: a partition projection calcula os prefixos a partir de um **padrão**, sem consultar o catálogo — *"can significantly reduce query runtimes"* (pode reduzir significativamente o tempo de execução das consultas).
> >
> > Fonte: [[3 - Performance (24%)/Athena/4 - Questoes|Athena]]

> [!question] 7. Migrar 20 TB de um NAS on-premises para o S3, com link de 1 Gbps, validando a integridade.
> **A)** `aws s3 sync` num cron
> **B)** AWS DataSync
> **C)** Snow Family
> **D)** Storage Gateway
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"high-speed file transfer service"* (serviço de transferência de arquivos de alta velocidade) com *"automatic encryption and data integrity validation"* (criptografia automática e validação de integridade dos dados) e arquitetura paralela multi-thread.
> > **A errada**: sequencial, sem validação nem preservação de metadados.
> > **C errada**: 20 TB em 1 Gbps cabe em ~2 dias — não precisa de dispositivo físico.
> > **D errada**: Gateway é **acesso contínuo**, não migração.
> >
> > Fonte: [[3 - Performance (24%)/DataSync/4 - Questoes|DataSync]]

> [!question] 8. Um dataset de 100 TB no S3 precisa ser lido com throughput de centenas de GB/s por um cluster EMR.
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

> [!question] 9. O time precisa de uma versão específica do **HBase** e de bibliotecas customizadas no cluster.
> **A)** Glue job com Ray
> **B)** Amazon EMR
> **C)** Glue Studio
> **D)** Athena Spark
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: EMR *"gives you full control over the configuration of your clusters and the software installed on them"* (dá a você controle total sobre a configuração dos clusters e sobre o software instalado neles), e roda HBase.
> > **A errada**: o Glue não dá controle do cluster nem instala HBase.
> >
> > Fonte: [[3 - Performance (24%)/Glue/4 - Questoes|Glue]]

> [!question] 10. Três filiais precisam se comunicar entre si e com a VPC, sem links diretos entre elas.
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

> [!question] 11. Um bucket com versionamento cresceu 4x em um ano, apesar do volume de dados novos ser estável. Causa e correção?
> **A)** Falta compressão
> **B)** Versões antigas acumulando; criar lifecycle com `NoncurrentVersionTransition` e `NoncurrentVersionExpiration`
> **C)** Replicação duplicando objetos
> **D)** Mudar para One Zone-IA
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: cada versão é cobrada como um objeto completo.
> > **A errada**: o S3 não comprime objetos.
> > **C errada**: replicação iria para outro bucket.
> > **D errada**: reduz o preço por GB, não o **volume** — que é o problema.
> >
> > Fonte: [[3 - Performance (24%)/S3/4 - Questoes|S3]]

> [!question] 12. Um objeto no Glacier **Deep Archive** precisa ser recuperado em 2 horas.
> **A)** Restore com tier Expedited
> **B)** Não é possível: Deep Archive não tem Expedited (Standard até 12 h, Bulk até 48 h)
> **C)** Comprar provisioned capacity
> **D)** Mudar a classe para Glacier IR primeiro
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: a tabela oficial marca Expedited como **não disponível** no Deep Archive.
> > **C errada**: provisioned capacity só se aplica ao **Glacier Flexible Retrieval**.
> > **D errada**: de Deep Archive **não se sai** por lifecycle, e mudar a classe exigiria restaurar primeiro.
> >
> > Fonte: [[3 - Performance (24%)/S3 Glacier/4 - Questoes|S3 Glacier]]

> [!question] 13. Analistas de um time devem ver apenas **algumas colunas** de uma tabela do data lake, e a restrição deve valer no Athena **e** no Redshift Spectrum.
> **A)** Bucket policy por prefixo
> **B)** AWS Lake Formation com permissão em nível de coluna
> **C)** IAM policy com condição de tag
> **D)** Criar uma cópia da tabela só com as colunas permitidas
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"granular controls at the column, row, and cell-levels"* (controles granulares nos níveis de coluna, linha e célula), respeitados por *"Amazon Athena, Amazon Quick, Amazon Redshift Spectrum, Amazon EMR, and AWS Glue"*.
> > **A errada**: S3 controla **objeto/prefixo**, não coluna.
> > **C errada**: IAM não entende schema de tabela.
> > **D errada**: duplica storage, cria defasagem e multiplica manutenção.
> >
> > Fonte: [[3 - Performance (24%)/Lake Formation/4 - Questoes|Lake Formation]]

> [!question] 14. Reduzir custo de 200 volumes gp2 de 1 TiB cada, usados a 150 GiB, sem perder performance.
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

> [!question] 15. Q-lc 4. Um objeto está no **Deep Archive Access tier** do Intelligent-Tiering. Para onde o lifecycle pode movê-lo?
> **A)** Qualquer classe, como qualquer objeto em Intelligent-Tiering
> **B)** Glacier IR, Glacier FR ou Deep Archive
> **C)** Só para S3 Glacier Deep Archive
> **D)** Para nenhuma — Intelligent-Tiering não transiciona
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: as transições para fora do Intelligent-Tiering **dependem do access tier**, e o Deep Archive Access é o mais frio — só resta o Deep Archive. É por isso que, no diagrama oficial, as setas do Intelligent-Tiering são **tracejadas**: elas são condicionais.
> > **D errada**: Intelligent-Tiering transiciona, sim — e pode ser **origem** e **destino** de lifecycle.
> >
> > Fonte: [[3 - Performance (24%)/S3/4 - Questoes|S3]]

> [!question] 16. Objetos de auditoria não podem ser apagados por 7 anos, por ninguém, incluindo administradores. O que configurar?
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

> [!question] 17. ETL rotineiro de CSV para Parquet, sem framework específico, com o menor esforço operacional.
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

> [!question] 18. A empresa precisa de 2 Gbps consistentes para on-premises, **criptografados**, sem passar pela internet.
> **A)** Site-to-Site VPN com dois túneis
> **B)** Direct Connect dedicada de 10 Gbps
> **C)** Direct Connect + IPsec VPN sobre a conexão Direct Connect
> **D)** Transit Gateway com peering inter-region
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: o DX dá banda previsível fora da internet; a documentação **não afirma** criptografia por padrão, então a camada IPsec atende esse requisito. O whitepaper descreve a opção: *"IPsec VPN connection over private lines"* (conexão VPN IPsec sobre linhas privadas).
> > **A errada**: criptografada, mas trafega **pela internet**, com banda não previsível.
> > **B errada**: resolve banda, não criptografia.
> > **D errada**: TGW é topologia **dentro** da AWS.
> >
> > Fonte: [[3 - Performance (24%)/Direct Connect/4 - Questoes|Direct Connect]]

> [!question] 19. Precisa adicionar um índice com **leitura fortemente consistente** num sort key alternativo, numa tabela que já existe.
> **A)** Criar um LSI
> **B)** Não é possível: LSI só na criação da tabela. Alternativas: GSI (eventual) ou recriar a tabela
> **C)** Criar um GSI com consistência forte
> **D)** Habilitar DAX
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"Local secondary indexes are created at the same time that you create a table"* (índices secundários locais são criados no mesmo momento em que você cria a tabela), e *"Queries on global secondary indexes support eventual consistency only"* (consultas em índices secundários globais só oferecem consistência eventual).
> >
> > Fonte: [[3 - Performance (24%)/DynamoDB/4 - Questoes|DynamoDB]]

> [!question] 20. Depois de uma escrita, uma consulta `Query` pelo DAX devolve o resultado antigo.
> **A)** O write-through falhou
> **B)** O query cache guarda o conjunto de resultados e não é invalidado pela escrita; reduza o TTL do query cache (ou desative com zero)
> **C)** Falta habilitar Streams
> **D)** O item cache está cheio
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: write-through atualiza o **item cache**; o **query cache** guarda resultados de consulta e expira por TTL.
> >
> > Fonte: [[3 - Performance (24%)/DAX/4 - Questoes|DAX]]

> [!question] 21. As queries ficam em fila nos horários de pico, embora o cluster esteja dimensionado para a média.
> **A)** Adicionar compute nodes permanentemente
> **B)** Habilitar concurrency scaling na fila do WLM
> **C)** Mudar o distribution style para EVEN
> **D)** Migrar para Athena
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"eligible queries are sent to the concurrency-scaling cluster instead of waiting in a queue"* (as consultas elegíveis são enviadas ao cluster de concurrency scaling em vez de esperar numa fila), e você paga *"only for the time they're actively running queries"* (somente pelo tempo em que estão de fato executando consultas).
> > **A errada**: paga capacidade de pico 24/7.
> >
> > Fonte: [[3 - Performance (24%)/Redshift/4 - Questoes|Redshift]]

> [!question] 22. Processamento de vídeo precisa de disco local de altíssimo IOPS para arquivos temporários.
> **A)** EBS io2 Block Express
> **B)** Instance store NVMe
> **C)** EFS com throughput Provisioned
> **D)** EBS gp3 com 16.000 IOPS
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: dado **temporário** com IOPS máximo é o caso do instance store — anexado ao host, sem latência de rede e sem custo de volume.
> > **A errada**: IOPS alto, mas é volume de rede pago; desnecessário para scratch.
> > **C errada**: EFS é compartilhado via rede, latência maior.
> > **D errada**: menos IOPS e custo de volume para dado descartável.
> >
> > Fonte: [[3 - Performance (24%)/EC2/4 - Questoes|EC2]]

> [!question] 23. Ingerir um stream de logs e disponibilizá-lo para busca, com o menor esforço operacional.
> **A)** Lambda lendo o stream e indexando
> **B)** Kinesis Data Firehose com destino OpenSearch Service
> **C)** EMR com Spark Streaming
> **D)** CloudWatch Logs
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: OpenSearch é **destino nativo** do Firehose — sem código.
> > **A errada**: você escreve e opera o consumidor, com retry e backpressure.
> >
> > Fonte: [[3 - Performance (24%)/OpenSearch Service/4 - Questoes|OpenSearch Service]]

> [!question] 24. Uma aplicação global precisa que usuários de 3 regiões leiam **e escrevam** localmente.
> **A)** Read replicas cross-Region
> **B)** Global Tables
> **C)** DAX em cada região
> **D)** Aurora Global Database
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"multi-Region, and multi-active"* (multi-Região e multi-ativo) — *"Any global table replica can serve reads and writes"* (qualquer réplica de uma global table pode atender leituras e escritas).
> > **A errada**: DynamoDB não tem read replica; e réplica de leitura não aceitaria escrita.
> > **D errada**: Aurora Global Database tem **1 primária escrevendo**.
> >
> > Fonte: [[3 - Performance (24%)/DynamoDB/4 - Questoes|DynamoDB]]

> [!question] 25. Um job de processamento usa um FSx for Lustre **scratch** e o time quer guardar o resultado por 2 anos.
> **A)** Manter o scratch e habilitar backup
> **B)** Escrever o resultado de volta no S3 (ou usar Persistent), porque o scratch não replica nem persiste em falha
> **C)** Migrar para HDD
> **D)** Criar um segundo scratch
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"Data is not replicated and does not persist if a file server fails."* (os dados não são replicados e não persistem se um servidor de arquivos falhar) O padrão é processar em scratch e persistir no **S3**.
> >
> > Fonte: [[3 - Performance (24%)/FSx/4 - Questoes|FSx]]

> [!question] 26. Dados históricos de 3 anos estão no S3 e precisam ser consultados **junto** com os dados quentes do Redshift.
> **A)** Carregar tudo no Redshift com COPY
> **B)** Redshift Spectrum, com tabelas externas sobre o S3
> **C)** Athena, separadamente
> **D)** Glue para copiar para o Redshift
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"query and retrieve... data from files in Amazon S3 without having to load the data into Amazon Redshift tables"* (consultar e recuperar... dados de arquivos no Amazon S3 sem precisar carregá-los em tabelas do Amazon Redshift) — e permite **join** entre tabela interna e externa.
> > **A errada**: paga storage de nó para dado frio.
> > **C errada**: Athena não faz join com as tabelas internas do cluster.
> >
> > Fonte: [[3 - Performance (24%)/Redshift/4 - Questoes|Redshift]]

> [!question] 27. Cluster Cassandra de 12 nós: a falha de um rack não pode derrubar mais que uma fração.
> **A)** Cluster
> **B)** Spread
> **C)** Partition
> **D)** Nenhum; basta distribuir em 3 AZs
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: partition é a estratégia para *"HDFS, HBase, Cassandra, Kafka, Hadoop"* (HDFS, HBase, Cassandra, Kafka, Hadoop) — cada partição tem racks próprios.
> > **A errada**: concentra no mesmo bloco de hardware.
> > **B errada**: separa instância por instância, limita a 7 por AZ, e não tem noção de grupo de réplicas.
> >
> > Fonte: [[3 - Performance (24%)/Placement Groups/4 - Questoes|Placement Groups]]

> [!question] 28. Centralizar logs de 40 serviços e permitir busca por texto livre com dashboards, para o time de operações.
> **A)** CloudWatch Logs Insights
> **B)** OpenSearch Service (alimentado por Firehose ou subscription filter), com OpenSearch Dashboards
> **C)** S3 com Athena
> **D)** CloudTrail Lake
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: busca textual forte + dashboards ricos é o caso de uso.
> > **A errada**: resolve consulta pontual; não é plataforma de busca e dashboards.
> > **D errada**: CloudTrail Lake é para **chamadas de API**.
> >
> > Fonte: [[3 - Performance (24%)/OpenSearch Service/4 - Questoes|OpenSearch Service]]

> [!question] 29. Um jogo online usa **UDP** e os clientes precisam de **IPs fixos** para liberar em firewalls corporativos, com failover entre três regiões em segundos.
> **A)** CloudFront com origin group
> **B)** AWS Global Accelerator
> **C)** Route 53 com failover routing
> **D)** NLB em cada região com latency routing
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: dois IPv4 **anycast**, suporte a **UDP**, e *"reacts instantly to changes in health or configuration"* (reage instantaneamente a mudanças de saúde ou configuração).
> > **A errada**: CloudFront é HTTP/HTTPS.
> > **C errada**: DNS depende de **TTL** e cache do resolver — não garante "segundos", e o IP muda.
> > **D errada**: os IPs dos NLBs são por AZ/região; o cliente teria que liberar todos, e o failover ainda dependeria de DNS.
> >
> > Fonte: [[3 - Performance (24%)/Global Accelerator/4 - Questoes|Global Accelerator]]

> [!question] 30. Dar acesso a todos os segmentos de um vídeo em HLS, sem alterar as URLs existentes.
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

> [!question] 31. Armazenar métricas de 50.000 sensores, consultadas por janela de tempo, com dados recentes acessados muito mais que os antigos.
> **A)** RDS PostgreSQL com índice no timestamp
> **B)** Amazon Timestream
> **C)** DynamoDB com sort key de timestamp
> **D)** S3 com Athena
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: série temporal é o caso de uso — storage em camadas e funções de série temporal nativas. O guia cita *"time series format"* (formato de série temporal) em Task 4.3.
> > **A errada**: relacional genérico fica caro e lento nesse volume.
> > **C errada**: é um padrão real, mas sem compressão de série temporal nem funções de janela.
> > **D errada**: bom para análise em lote, não para consulta operacional.
> >
> > Fonte: [[3 - Performance (24%)/Bancos especializados (Neptune, DocumentDB, Keyspaces, Timestream)/4 - Questoes|Bancos especializados (Neptune, DocumentDB, Keyspaces, Timestream)]]

> [!question] 32. Qual destes **não** respeita as permissões do Lake Formation?
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

> [!question] 33. Entregar eventos de clique num bucket S3 em **Parquet**, com latência de até 5 minutos, sem código de infraestrutura.
> **A)** Kinesis Data Streams com consumidor em Lambda
> **B)** Amazon Data Firehose com conversão para Parquet e buffer de 5 MB / 300 s
> **C)** EMR com Spark Streaming
> **D)** DataSync agendado
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"You don't need to write applications or manage resources"* (você não precisa escrever aplicações nem gerenciar recursos), converte formato nativamente, e o buffer padrão do S3 (5 MB / **300 s**) encaixa na latência.
> > **A errada**: funciona, mas você escreve e opera o consumidor.
> > **C errada**: cluster para gerenciar.
> > **D errada**: DataSync move arquivos entre storages; não consome stream.
> >
> > Fonte: [[3 - Performance (24%)/Kinesis Data Firehose/4 - Questoes|Kinesis Data Firehose]]

> [!question] 34. Consultar os logs do CloudTrail e do VPC Flow Logs que já estão no S3, pontualmente, sem provisionar nada.
> **A)** Redshift com COPY
> **B)** Athena
> **C)** OpenSearch Service
> **D)** EMR
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"analyze data directly in Amazon S3"* (analisar dados diretamente no Amazon S3), serverless, *"you pay only for the queries you run"* (você paga apenas pelas consultas que executa).
> > **C errada**: OpenSearch é melhor para **busca textual** e dashboards contínuos — e exige domínio.
> >
> > Fonte: [[3 - Performance (24%)/Athena/4 - Questoes|Athena]]

> [!question] 35. O acervo existente de um bucket precisa ser replicado para outra região, além das gravações novas. O que fazer?
> **A)** Habilitar CRR — ela cobre os objetos existentes
> **B)** Habilitar CRR para os novos e rodar S3 Batch Replication para os existentes
> **C)** Usar o DataSync entre os dois buckets
> **D)** Habilitar S3 Replication Time Control
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: a replicação "live" não alcança objetos anteriores à regra; o acervo exige Batch Replication.
> > **A errada**: é exatamente a suposição que a prova testa.
> > **C errada**: resolveria a cópia, mas é esforço a mais havendo recurso nativo e contínuo.
> > **D errada**: RTC adiciona SLA de 15 min aos objetos **novos**, e *"S3 RTC does not apply to Batch Replication"* (o S3 RTC não se aplica à Batch Replication).
> >
> > Fonte: [[3 - Performance (24%)/S3/4 - Questoes|S3]]

> [!question] 36. Um job **Spark** customizado processa 50 TB por noite. Como reduzir o custo ao máximo?
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

> [!question] 37. Uma tabela precisa ser consultada por um atributo que **não** é a chave; hoje a aplicação faz Scan.
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

> [!question] 38. O RDS está com CPU alta por consultas de leitura repetidas, e a empresa quer reduzir **custo**.
> **A)** Aumentar a instance class
> **B)** ElastiCache na frente do banco, com lazy loading e TTL
> **C)** Multi-AZ
> **D)** Mudar para io2
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: cache costuma custar menos que subir instância ou adicionar réplicas — e o guia lista *"Caching strategies"* (estratégias de cache) também em **Task 4.3 (custo)**.
> > **C errada**: Multi-AZ é **HA**, e o standby **não lê**.
> >
> > Fonte: [[3 - Performance (24%)/ElastiCache/4 - Questoes|ElastiCache]]

> [!question] 39. A aplicação guarda sessão em disco local e, ao escalar, usuários são deslogados.
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

> [!question] 40. Um pipeline precisa converter CSV em Parquet particionado, diariamente, **sem gerenciar cluster**.
> **A)** EMR com Spark e cluster transiente
> **B)** AWS Glue job com trigger agendado
> **C)** Lambda com pandas
> **D)** Athena CTAS manual
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"serverless data integration service"* (serviço serverless de integração de dados) — ETL agendado sem cluster.
> > **A errada**: funciona, mas você gerencia o cluster (ainda que transiente).
> > **C errada**: Lambda tem teto de 15 min e 10 GB; não escala para ETL grande.
> > **D errada**: CTAS funciona, mas é manual e menos adequado para pipeline recorrente.
> >
> > Fonte: [[3 - Performance (24%)/Glue/4 - Questoes|Glue]]

> [!question] 41. O requisito mudou: a latência precisa ser de **segundos**.
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

> [!question] 42. O tráfego precisa passar de 1,25 Gbps por túnel.
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

> [!question] 43. Qual opção mantém o bucket privado e servido só pelo CloudFront, com objetos criptografados em SSE-KMS?
> **A)** Origin Access Identity (OAI)
> **B)** Origin Access Control (OAC) + bucket policy com principal `cloudfront.amazonaws.com` e condição `AWS:SourceArn`, com Object Ownership em "Bucket owner enforced", e key policy do KMS liberando o CloudFront
> **C)** Bucket público com geo restriction
> **D)** Presigned URL gerada pelo backend
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: a doc lista **SSE-KMS** como capacidade que **só o OAC** tem (OAI é *"legacy, not recommended"* (geração antiga, não recomendado)).
> > **A errada**: OAI não suporta SSE-KMS nem regiões novas.
> > **C errada**: viola o requisito.
> > **D errada**: dá acesso direto ao S3, não "via CloudFront".
> >
> > Fonte: [[3 - Performance (24%)/S3/4 - Questoes|S3]]

> [!question] 44. O time de rede deve governar a topologia, mas cada conta anexa a sua própria VPC.
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

> [!question] 45. Depois de habilitar TTL, os itens expirados continuam aparecendo nas consultas.
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

> [!question] 46. A empresa precisa de conectividade híbrida **criptografada** em poucas horas, para uma migração temporária.
> **A)** Direct Connect hosted de 1 Gbps
> **B)** Site-to-Site VPN
> **C)** Direct Connect dedicada
> **D)** Transit Gateway
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: IPsec nativo, monta em horas, sem compromisso de porta.
> > **A e C erradas**: DX leva semanas (*"up to 72 business hours"* (até 72 horas úteis) só para a porta, mais o circuito).
> > **D errada**: TGW é topologia dentro da AWS; não conecta on-premises por si.
> >
> > Fonte: [[3 - Performance (24%)/VPN (Site-to-Site)/4 - Questoes|VPN (Site-to-Site)]]

> [!question] 47. Carga de produção 24/7 em m6i. O time ainda não decidiu se migra para Graviton nem para outra região. Qual compra?
> **A)** Reserved Instances Standard de 3 anos
> **B)** Compute Savings Plans
> **C)** EC2 Instance Savings Plans
> **D)** Spot com capacity rebalancing
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: aplica-se *"regardless of instance family, instance size, OS, tenancy, or AWS Region"* (independentemente de família, tamanho de instância, sistema operacional, tenancy ou Região) e cobre Fargate e Lambda. É a opção que sobrevive à indecisão.
> > **A errada**: Standard RI *"can't be exchanged"* (não podem ser trocadas) e amarra tipo e região por 3 anos.
> > **C errada**: amarra **família e região** — exatamente o que está em aberto.
> > **D errada**: produção 24/7 não tolera interrupção.
> >
> > Fonte: [[3 - Performance (24%)/EC2/4 - Questoes|EC2]]

> [!question] 48. Uma aplicação em t3.medium fica lenta após ~20 minutos de carga constante. O que corrigir?
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

> [!question] 49. Dez instâncias EC2 Linux precisam ler e gravar no mesmo diretório, com crescimento imprevisível.
> **A)** EBS gp3 com Multi-Attach
> **B)** Amazon EFS
> **C)** S3 montado via FUSE
> **D)** FSx for Windows File Server
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: NFS compartilhado, elástico e multi-AZ.
> > **A errada**: **gp3 não suporta Multi-Attach**, e Multi-Attach não é file system compartilhado.
> > **C errada**: S3 não é POSIX; FUSE tem semântica e performance ruins para escrita concorrente.
> > **D errada**: SMB/Windows; os clientes são Linux.
> >
> > Fonte: [[3 - Performance (24%)/EFS/4 - Questoes|EFS]]

> [!question] 50. Q-lc 2. Objetos em **S3 Standard** devem ir para **Deep Archive** após 30 dias. Quantas transições a regra precisa?
> **A)** Três: Standard → IA → Glacier FR → Deep Archive
> **B)** Uma: Standard transiciona direto para Deep Archive
> **C)** Duas: Standard → Glacier FR → Deep Archive
> **D)** Não é possível pular classes
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o texto oficial lista, para S3 Standard, *"the S3 Standard-IA, S3 Intelligent-Tiering, S3 One Zone-IA, S3 Glacier Instant Retrieval, S3 Glacier Flexible Retrieval, or S3 Glacier Deep Archive"* (o S3 Standard-IA, o S3 Intelligent-Tiering, o S3 One Zone-IA, o S3 Glacier Instant Retrieval, o S3 Glacier Flexible Retrieval ou o S3 Glacier Deep Archive) — **todas**. A cascata permite **pular etapas**; o que ela proíbe é **subir**.
> > ⚠️ Passar por classes intermediárias seria **mais caro**: cada transição cobra por objeto, e cada classe tem mínimo de dias.
> >
> > Fonte: [[3 - Performance (24%)/S3/4 - Questoes|S3]]

> [!question] 51. Uma tabela de dimensão pequena é usada em join com uma tabela de fatos enorme, e o join está lento por redistribuição.
> **A)** Distribution style EVEN na dimensão
> **B)** Distribution style ALL na tabela de dimensão
> **C)** Sort key na tabela de fatos
> **D)** Concurrency scaling
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: `ALL` copia a dimensão em todos os nós, eliminando a redistribuição no join.
> > **C errada**: sort key acelera **filtro de faixa**, não o join.
> >
> > Fonte: [[3 - Performance (24%)/Redshift/4 - Questoes|Redshift]]

> [!question] 52. Um snapshot criptografado foi compartilhado com outra conta, que não consegue restaurá-lo.
> **A)** Snapshot criptografado não pode ser compartilhado
> **B)** A key policy da chave KMS não libera a conta destino (e a chave precisa ser customer managed)
> **C)** Falta copiar o snapshot para a região da outra conta
> **D)** Falta habilitar criptografia por padrão
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: key policy é exceção que *"must explicitly allow access for principals"* (precisam permitir o acesso explicitamente para os principais); e a **AWS managed key não é compartilhável**.
> >
> > Fonte: [[3 - Performance (24%)/EBS/4 - Questoes|EBS]]

> [!question] 53. Um ASG com spread placement group em 2 AZs não escala além de 14 instâncias.
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

> [!question] 54. A aplicação exige leitura **fortemente consistente**. O DAX reduz a latência?
> **A)** Sim, para todas as leituras
> **B)** Não: leitura forte passa direto para o DynamoDB e não é cacheada
> **C)** Sim, se o TTL for zero
> **D)** Sim, com réplicas de leitura no cluster
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"DAX passes the request through to DynamoDB. The results from DynamoDB are not cached in DAX."* (o DAX repassa a requisição ao DynamoDB, e os resultados vindos do DynamoDB não são armazenados em cache no DAX)
> >
> > Fonte: [[3 - Performance (24%)/DAX/4 - Questoes|DAX]]

> [!question] 55. Um relatório precisa agregar e fazer busca textual sobre 2 anos de dados da tabela.
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

> [!question] 56. Um cache simples, descartável, que precisa aproveitar bem um nó com muitas vCPUs.
> **A)** Redis cluster mode enabled
> **B)** Memcached
> **C)** DAX
> **D)** CloudFront
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: Memcached é **multithread** e simples; o enunciado dispensa replicação, persistência e estruturas de dados.
> >
> > Fonte: [[3 - Performance (24%)/ElastiCache/4 - Questoes|ElastiCache]]

> [!question] 57. Qual FSx tem failover documentado em ~60 segundos?
> **A)** Lustre Persistent
> **B)** OpenZFS Multi-AZ (HA) e Single-AZ (HA)
> **C)** Windows Single-AZ
> **D)** ONTAP Single-AZ
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"Failover typically completes within 60 seconds"* (o failover normalmente se completa em até 60 segundos); já o **Single-AZ (non-HA)** recupera em *"within 30 minutes"* (em até 30 minutos).
> >
> > Fonte: [[3 - Performance (24%)/FSx/4 - Questoes|FSx]]

> [!question] 58. Depois de configurar o Lake Formation, usuários continuam lendo o dado completo direto do S3.
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

> [!question] 59. Carga de **escrita intensa** com pouca leitura. DAX ajuda?
> **A)** Sim, write-through acelera a escrita
> **B)** Não: o write-through adiciona um hop de latência na escrita, e há pouca leitura para se beneficiar do cache
> **C)** Sim, se o TTL for alto
> **D)** Sim, com mais réplicas
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: DAX é para carga **read-heavy**.
> >
> > Fonte: [[3 - Performance (24%)/DAX/4 - Questoes|DAX]]

> [!question] 60. Uma empresa precisa garantir que os restores Expedited **nunca** sejam recusados em pico de demanda.
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

> [!question] 61. Um data lake tem 3.000 tabelas e permissões concedidas uma a uma. Como escalar?
> **A)** Um role por tabela
> **B)** LF-Tags (attribute-based access control), concedendo por tag
> **C)** Bucket policy por prefixo
> **D)** Um catálogo por domínio
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: marcar recursos e conceder por tag faz tabela nova **já nascer** com a permissão correta.
> >
> > Fonte: [[3 - Performance (24%)/Lake Formation/4 - Questoes|Lake Formation]]

> [!question] 62. Qual a diferença essencial entre DataSync e Storage Gateway?
> **A)** DataSync é mais rápido
> **B)** DataSync move os dados (operação que termina); Storage Gateway é um caminho de acesso permanente
> **C)** Storage Gateway só funciona com S3
> **D)** DataSync não criptografa
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é a distinção que a prova testa — **mover** × **continuar acessando**.
> > **C errada**: há FSx File Gateway, Volume Gateway e Tape Gateway.
> >
> > Fonte: [[3 - Performance (24%)/Storage Gateway/4 - Questoes|Storage Gateway]]

> [!question] 63. Uma aplicação usa **Cassandra** e o time não quer mais gerenciar o cluster.
> **A)** Cassandra em EC2 com Auto Scaling
> **B)** DocumentDB
> **C)** Amazon Keyspaces
> **D)** DynamoDB
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: compatível com **CQL**, e serverless — elimina anéis, compaction e reparo.
> > **A errada**: mantém todo o esforço operacional.
> > **D errada**: resolveria o modelo, mas exigiria reescrever a camada de acesso.
> >
> > Fonte: [[3 - Performance (24%)/Bancos especializados (Neptune, DocumentDB, Keyspaces, Timestream)/4 - Questoes|Bancos especializados (Neptune, DocumentDB, Keyspaces, Timestream)]]

> [!question] 64. Um ASG no Outpost para de escalar em 20 instâncias, com a métrica alta.
> **A)** Cota de vCPU da região
> **B)** A capacidade do Outpost é finita — é o hardware instalado
> **C)** Falta cross-zone
> **D)** Placement group limitando a 7 por AZ
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: capacidade no Outpost é **decisão de compra**, não de configuração.
> >
> > Fonte: [[3 - Performance (24%)/Outposts/4 - Questoes|Outposts]]

> [!question] 65. Carregar um stream no **Redshift** com o Firehose. O que acontece por baixo?
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

> [!question] 66. Duas VPCs com **CIDR sobreposto** precisam que uma consuma uma API da outra.
> **A)** Transit Gateway
> **B)** VPC peering
> **C)** AWS PrivateLink
> **D)** Transit Gateway com NAT
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: PrivateLink **não roteia redes** — expõe um serviço por uma ENI, então o CIDR sobreposto é irrelevante.
> > **A e B erradas**: roteiam redes e exigem CIDRs não sobrepostos.
> >
> > Fonte: [[3 - Performance (24%)/Transit Gateway/4 - Questoes|Transit Gateway]]

> [!question] 67. Migrar 80 TB com link de 100 Mbps, em **duas semanas**.
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

> [!question] 68. Após o upload por SFTP, o arquivo precisa ser validado, descompactado e movido.
> **A)** DataSync
> **B)** Managed File Transfer Workflows (ou S3 event notification → Lambda)
> **C)** Storage Gateway
> **D)** Glue crawler
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o MFTW encadeia passos após o upload; a alternativa nativa é **S3 event → Lambda/EventBridge/Step Functions**.
> >
> > Fonte: [[3 - Performance (24%)/Transfer Family/4 - Questoes|Transfer Family]]

> [!question] 69. Duas VPCs cross-account precisam trocar grande volume de dados. As instâncias estão na **mesma AZ**.
> **A)** O tráfego cross-account é sempre cobrado
> **B)** O tráfego na mesma AZ é grátis, "even if it's between different accounts"
> **C)** Precisa de Transit Gateway
> **D)** Precisa de PrivateLink
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: citação literal da doc. É um argumento de custo real a favor do peering.
> >
> > Fonte: [[3 - Performance (24%)/VPC Peering/4 - Questoes|VPC Peering]]

> [!question] 70. Migrar um servidor de arquivos **ZFS** on-premises para a AWS, mantendo compatibilidade.
> **A)** EFS
> **B)** FSx for Windows
> **C)** FSx for OpenZFS
> **D)** FSx for Lustre
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: *"easy to move data to AWS from on-premises ZFS or other Linux-based file servers"* (facilita mover dados para a AWS a partir de servidores de arquivos ZFS ou outros baseados em Linux, on-premises).
> >
> > Fonte: [[3 - Performance (24%)/FSx/4 - Questoes|FSx]]

> [!question] 71. Logs são lidos muito nos primeiros 30 dias, raramente nos 11 meses seguintes, e precisam ficar 7 anos com acesso em até 12 h. Lifecycle mais econômico?
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

> [!question] 72. Analistas de negócio precisam limpar e normalizar planilhas **sem escrever código**.
> **A)** Glue job em PySpark
> **B)** AWS Glue DataBrew
> **C)** Athena
> **D)** Glue crawler
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"A visual data preparation tool... without writing any code"* (uma ferramenta visual de preparação de dados... sem escrever código).
> >
> > Fonte: [[3 - Performance (24%)/Glue/4 - Questoes|Glue]]

> [!question] 73. Por que usar **EMRFS** em vez de HDFS para os dados de entrada e saída?
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

> [!question] 74. Depois de restaurar um volume de snapshot, a primeira leitura está lenta.
> **A)** O volume está com IOPS baixo
> **B)** O restore faz lazy load: os blocos vêm do backing store na primeira leitura
> **C)** O snapshot está corrompido
> **D)** Falta pré-aquecer com dd
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é comportamento esperado. Para eliminar, existe **Fast Snapshot Restore** (com custo).
> >
> > Fonte: [[3 - Performance (24%)/EBS/4 - Questoes|EBS]]

> [!question] 75. O peering está "Active", mas o tráfego não passa.
> **A)** Falta aceitar a solicitação
> **B)** Faltam as rotas nas route tables de uma (ou das duas) VPCs
> **C)** O CIDR está sobreposto
> **D)** Falta um gateway
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: são **dois** lados — rota na route table de cada VPC apontando para a peering connection.
> > **A errada**: se estivesse pendente, o estado não seria "Active".
> > **C errada**: CIDR sobreposto **impede a criação** da conexão.
> >
> > Fonte: [[3 - Performance (24%)/VPC Peering/4 - Questoes|VPC Peering]]

> [!question] 76. Um private VIF precisa alcançar **12 VPCs** em 3 regiões e 4 contas.
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

> [!question] 77. Um file system One Zone precisa de Max I/O para mais throughput agregado.
> **A)** Habilitar Max I/O nas configurações
> **B)** Não é possível: One Zone usa sempre General Purpose, e Max I/O não é suportado em One Zone nem com Elastic
> **C)** Migrar para Provisioned primeiro
> **D)** Criar um segundo mount target
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"One Zone file systems always use the General Purpose performance mode"* (sistemas de arquivos One Zone sempre usam o modo de performance General Purpose) e Max I/O é *"not supported for One Zone file systems or file systems that use Elastic throughput"* (não é suportado em sistemas de arquivos One Zone nem nos que usam throughput Elastic).
> >
> > Fonte: [[3 - Performance (24%)/EFS/4 - Questoes|EFS]]

> [!question] 78. Quanto custa um placement group?
> **A)** Por instância no grupo
> **B)** Nada: *"There is no charge for creating a placement group"* (não há cobrança para criar um placement group)
> **C)** Por hora de grupo
> **D)** Só o cluster é cobrado
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é opcional e gratuito — a decisão é puramente arquitetural.
> >
> > Fonte: [[3 - Performance (24%)/Placement Groups/4 - Questoes|Placement Groups]]

> [!question] 79. Um jogo mobile envia atualizações de pontuação para um backend que publica um ranking. A solução precisa aguentar **picos intensos**, processar **na ordem recebida**, gravar num banco de **alta disponibilidade** e ter **mínima sobrecarga de gerenciamento**.
> **A)** SQS → frota EC2 com Auto Scaling → RDS MySQL
> **B)** Kinesis Data Streams → Lambda → DynamoDB
> **C)** SNS → Lambda → banco SQL num EC2
> **D)** Kinesis Data Streams → frota EC2 com Auto Scaling → DynamoDB
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: cada requisito aponta para um serviço. **Kinesis** guarda os eventos durante o pico e mantém a **ordem por shard** (partition key = `playerId`). **DynamoDB** já replica em **3 AZs**. **Lambda + DynamoDB** são serverless, então não há servidor para gerenciar.
> > **"Mas a Lambda só roda 15 min?"**: o limite vale para **cada invocação**. O *event source mapping* lê os shards, monta **lotes** e chama a função; cada lote leva milissegundos e o próximo vem em seguida. Por padrão há **uma invocação por shard por vez**, e é isso que preserva a ordem. Para escalar, aumente os shards (ou use o *parallelization factor* até 10, com a ordem mantida por partition key). Detalhes em [[2 - Resiliencia (26%)/Lambda/3 - Detalhes#5. Event source mapping|Lambda — Event source mapping]].
> > **D errada**: **funciona**, mas falha em "mínima sobrecarga". Você cuida de patches, AMIs, da aplicação KCL (que tem tabela própria de checkpoint/lease) e das políticas de Auto Scaling. E com a KCL **cada shard é lido por um único worker**: se houver mais instâncias que shards, as excedentes ficam ociosas.
> > **A errada**: SQS **padrão** não garante ordem (precisaria de FIFO), EC2 traz sobrecarga e o RDS só tem alta disponibilidade com Multi-AZ configurado.
> > **C errada**: SNS padrão **não garante ordem** e **não armazena** (não absorve pico). SQL em EC2 próprio é o oposto de alta disponibilidade com pouco gerenciamento.
> >
> > **Para memorizar**: "tempo real + ordem + picos" → **Kinesis Data Streams**. "Mínima sobrecarga" → **Lambda + DynamoDB**. Se duas opções funcionam e só uma é serverless, é a serverless.
> >
> > Fonte: [[3 - Performance (24%)/Kinesis Data Streams/4 - Questoes|Kinesis Data Streams]]

> [!question] 80. Limitar quanto cada equipe pode escanear por mês, com cobrança separada.
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

> [!question] 81. Quantos túneis tem uma conexão Site-to-Site VPN, e para quê?
> **A)** 1, com failover para um segundo sob demanda
> **B)** 2, que podem ser usados simultaneamente para alta disponibilidade
> **C)** 4, um por AZ
> **D)** Depende do tipo de customer gateway
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"Each VPN connection includes two VPN tunnels which you can simultaneously use for high availability."* (cada conexão VPN inclui dois túneis, que você pode usar simultaneamente para alta disponibilidade)
> >
> > Fonte: [[3 - Performance (24%)/VPN (Site-to-Site)/4 - Questoes|VPN (Site-to-Site)]]

> [!question] 82. Precisa alcançar o **S3** pelo link privado, sem internet.
> **A)** Private VIF
> **B)** Public VIF (ou interface endpoint do S3 sobre o DX)
> **C)** Transit VIF
> **D)** Gateway endpoint
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o **public VIF** alcança *"all AWS public services using public IP addresses"* (todos os serviços públicos da AWS, usando endereços IP públicos) sem internet. A alternativa moderna é **interface endpoint** do S3 alcançado pelo DX (IP privado).
> > **D errada**: **gateway endpoint funciona só de dentro da VPC** — não de on-premises.
> >
> > Fonte: [[3 - Performance (24%)/Direct Connect/4 - Questoes|Direct Connect]]

> [!question] 83. O time já tem produtores e consumidores **Kafka** e dezenas de conectores.
> **A)** Kinesis Data Streams
> **B)** Amazon MSK
> **C)** SQS
> **D)** Firehose
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: roda *"open-source versions of Apache Kafka"* (versões open source do Apache Kafka), então funciona *"without requiring changes to application code"* (sem exigir mudanças no código da aplicação).
> >
> > Fonte: [[3 - Performance (24%)/Kinesis Data Streams/4 - Questoes|Kinesis Data Streams]]

> [!question] 84. Para economizar, o time quer que 20 contas usem o **NAT gateway** de uma VPC central, via peering.
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

> [!question] 85. Q-lc 3. Uma regra manda objetos para **Glacier Instant Retrieval no dia 4** e para **Deep Archive no dia 20**. O que acontece?
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

> [!question] 86. A empresa precisa trocar documentos **EDI** com fornecedores, com assinatura e recibo.
> **A)** Transfer Family com SFTP
> **B)** Transfer Family com AS2
> **C)** S3 com presigned URL
> **D)** Amazon MQ
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: **AS2** é o protocolo de EDI B2B, e está na lista oficial do Transfer Family. Nenhum outro serviço da AWS o oferece.
> >
> > Fonte: [[3 - Performance (24%)/Transfer Family/4 - Questoes|Transfer Family]]

> [!question] 87. Reduzir o custo de um EFS com 8 TiB, dos quais 90% não são acessados há meses.
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

> [!question] 88. Um cluster de **nó único** precisa de concurrency scaling.
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

> [!question] 89. Um compartilhamento de arquivos para usuários Windows, autenticado no AD corporativo.
> **A)** EFS com access points
> **B)** FSx for Windows File Server, integrado ao AWS Managed Microsoft AD (com trust para o AD on-premises)
> **C)** FSx for OpenZFS
> **D)** S3 File Gateway
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: SMB + Active Directory é exatamente o caso de uso.
> > **A errada**: EFS é NFS.
> > **C errada**: OpenZFS fala NFS.
> > **D errada**: File Gateway expõe NFS/SMB **sobre S3** — serve para manter acesso de arquivo on-premises com dado no S3, não como file server corporativo gerenciado.
> >
> > Fonte: [[3 - Performance (24%)/FSx/4 - Questoes|FSx]]

> [!question] 90. Aplicações on-premises precisam continuar lendo e gravando num compartilhamento **SMB**, mas o dado deve ficar no S3 para análise com Athena.
> **A)** DataSync agendado a cada hora
> **B)** S3 File Gateway expondo SMB, com os objetos gravados no S3
> **C)** FSx for Windows File Server
> **D)** Volume Gateway em modo cached
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"store and retrieve objects in Amazon S3 using industry-standard file protocols"* (armazenar e recuperar objetos no Amazon S3 usando protocolos de arquivo padrão de mercado) — a aplicação vê SMB, o Athena vê objetos.
> > **A errada**: copia, mas o storage local continua sendo a fonte de verdade, com defasagem.
> > **C errada**: FSx guarda num file system, **não** como objeto no S3 — o Athena não consultaria.
> > **D errada**: Volume Gateway é **iSCSI** (bloco), não objeto consultável.
> >
> > Fonte: [[3 - Performance (24%)/Storage Gateway/4 - Questoes|Storage Gateway]]

> [!question] 91. A carga tem picos curtos e fica quase ociosa o resto do tempo (relação média/pico de ~2%).
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

> [!question] 92. Relatórios de BI sobre 5 anos de vendas (petabytes), com joins complexos e 200 analistas concorrentes.
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

> [!question] 93. A retenção de log em OpenSearch precisa chegar a 1 ano, com o menor custo.
> **A)** Aumentar os nós de dados
> **B)** Index State Management movendo índices de hot para UltraWarm e cold
> **C)** Reduzir a retenção para 30 dias
> **D)** Mudar para Serverless
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: UltraWarm usa **S3** com cache e custa muito menos que hot; o ISM automatiza a transição.
> > **C errada**: descumpre o requisito.
> >
> > Fonte: [[3 - Performance (24%)/OpenSearch Service/4 - Questoes|OpenSearch Service]]

> [!question] 94. Bloquear o país X **exceto** para o caminho `/status`.
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

> [!question] 95. Um único Direct Connect atende a produção. Como torná-lo tolerante a falhas com o **menor custo**?
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

> [!question] 96. Aplicações on-premises precisam **continuar** gravando em SMB, com o dado indo para o S3.
> **A)** DataSync agendado a cada hora
> **B)** S3 File Gateway
> **C)** Transfer Family
> **D)** DataSync contínuo
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o requisito é **continuar acessando** com protocolo local — caminho permanente, não migração.
> > **A e D erradas**: copiam, mas a fonte de verdade continua local, com defasagem.
> >
> > Fonte: [[3 - Performance (24%)/DataSync/4 - Questoes|DataSync]]

> [!question] 97. As aplicações precisam de **latência de disco local total**, mas a empresa quer backup offsite e capacidade de levantar na AWS em desastre.
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

> [!question] 98. Num jogo multiplayer, cada jogador precisa ser roteado para a **instância específica** da sua partida.
> **A)** Standard accelerator com endpoint weight
> **B)** Custom routing accelerator
> **C)** ALB com sticky sessions
> **D)** NLB com flow hash
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"map one or more users to a specific destination among many destinations"* (mapear um ou mais usuários para um destino específico entre vários destinos), roteando para **IPs privados** de subnets de VPC.
> > **A errada**: standard manda para qualquer endpoint saudável do grupo.
> >
> > Fonte: [[3 - Performance (24%)/Global Accelerator/4 - Questoes|Global Accelerator]]

> [!question] 99. Analistas de um time devem ver apenas **algumas colunas** de uma tabela do data lake, e a restrição deve valer no Athena **e** no Redshift Spectrum.
> **A)** Bucket policy por prefixo
> **B)** AWS Lake Formation com permissão em nível de coluna
> **C)** IAM policy com condição de tag
> **D)** Workgroup separado no Athena
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o Lake Formation dá controle *"at the column, row, and cell-levels"* (nos níveis de coluna, linha e célula), respeitado por *"Amazon Athena, Amazon Quick, Amazon Redshift Spectrum, Amazon EMR, and AWS Glue"*.
> > **A errada**: S3 controla objeto/prefixo, não coluna.
> >
> > Fonte: [[3 - Performance (24%)/Athena/4 - Questoes|Athena]]

> [!question] 100. O attachment da VPC ao TGW existe, as route tables do TGW estão corretas, mas o tráfego não sai da subnet.
> **A)** Falta propagação BGP
> **B)** Falta a rota na route table da subnet apontando para o Transit Gateway
> **C)** Falta um NAT gateway
> **D)** O MTU está errado
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"With a VPC, you must create static routes to send traffic to the transit gateway."* (com uma VPC, você precisa criar rotas estáticas para enviar tráfego ao transit gateway) São **dois** lados: a route table da subnet **e** a do TGW.
> >
> > Fonte: [[3 - Performance (24%)/Transit Gateway/4 - Questoes|Transit Gateway]]

> [!question] 101. Os usuários do SFTP devem se autenticar com as credenciais do **Active Directory** corporativo.
> **A)** Service-managed users
> **B)** Integração com AWS Directory Service
> **C)** Cognito user pool
> **D)** IAM users
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o Transfer Family integra com o Directory Service para reaproveitar as identidades do AD.
> > **C errada**: Cognito é identidade de **usuário final de app**.
> >
> > Fonte: [[3 - Performance (24%)/Transfer Family/4 - Questoes|Transfer Family]]

> [!question] 102. Duas VPCs que só precisam se falar, com o **menor custo**.
> **A)** Transit Gateway
> **B)** VPC peering
> **C)** PrivateLink
> **D)** VPN entre as VPCs
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"There is no charge to create a VPC peering connection"* (não há cobrança para criar uma conexão de VPC peering), e dados na **mesma AZ são grátis**.
> > **A errada**: cobra **por attachment/hora + por GB**.
> >
> > Fonte: [[3 - Performance (24%)/VPC Peering/4 - Questoes|VPC Peering]]

> [!question] 103. Um bucket criptografado com **SSE-KMS** precisa ser servido pelo CloudFront, sem acesso público.
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

> [!question] 104. Migrar dados do **Azure Blob Storage** para o S3.
> **A)** Snow Family
> **B)** DataSync
> **C)** Storage Gateway
> **D)** S3 Replication
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: a doc lista **Azure Blob, Azure Files, Google Cloud Storage, Wasabi** entre as origens suportadas.
> > **D errada**: a replicação do S3 funciona entre buckets S3.
> >
> > Fonte: [[3 - Performance (24%)/DataSync/4 - Questoes|DataSync]]

> [!question] 105. Clientes Linux (NFS) e Windows (SMB) precisam acessar os **mesmos** arquivos, com snapshots e clones.
> **A)** EFS + FSx for Windows em paralelo
> **B)** FSx for NetApp ONTAP
> **C)** FSx for Lustre
> **D)** S3 com access points
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é o multiprotocolo — **NFS, SMB, iSCSI e NVMe** no mesmo FS, com snapshots, cloning, SnapMirror e SnapLock.
> > **A errada**: dois file systems separados significam dois conjuntos de dados.
> >
> > Fonte: [[3 - Performance (24%)/FSx/4 - Questoes|FSx]]

> [!question] 106. Uma VPN ligada a um **virtual private gateway** precisa transportar **IPv6**.
> **A)** Habilitar dual-stack no VGW
> **B)** Não é suportado: use Transit Gateway
> **C)** Criar um segundo túnel
> **D)** Usar Accelerated VPN
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"IPv6 traffic is not supported for VPN connections on a virtual private gateway."* (tráfego IPv6 não é suportado em conexões VPN sobre um virtual private gateway)
> >
> > Fonte: [[3 - Performance (24%)/VPN (Site-to-Site)/4 - Questoes|VPN (Site-to-Site)]]

> [!question] 107. Uma aplicação **nova** precisa guardar documentos JSON, com escala imprevisível e menor esforço operacional.
> **A)** DocumentDB
> **B)** DynamoDB
> **C)** RDS com JSONB
> **D)** Neptune
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: aplicação **nova** não tem restrição de API — DynamoDB é serverless, escala sozinho e sai mais barato.
> > **A errada**: DocumentDB existe para quem **já tem** MongoDB; aqui adiciona cluster para gerenciar.
> >
> > Fonte: [[3 - Performance (24%)/Bancos especializados (Neptune, DocumentDB, Keyspaces, Timestream)/4 - Questoes|Bancos especializados (Neptune, DocumentDB, Keyspaces, Timestream)]]

> [!question] 108. Identificar conexões suspeitas entre contas, dispositivos e endereços, percorrendo até 5 níveis de relacionamento, com baixa latência.
> **A)** RDS PostgreSQL com CTEs recursivas
> **B)** DynamoDB com GSI
> **C)** Amazon Neptune
> **D)** Redshift
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: percorrer arestas é a operação nativa de um banco de **grafo**.
> > **A errada**: funciona, mas o custo cresce exponencialmente com a profundidade.
> > **B errada**: DynamoDB não percorre grafo.
> > **D errada**: Redshift é analítico, não baixa latência transacional.
> >
> > Fonte: [[3 - Performance (24%)/Bancos especializados (Neptune, DocumentDB, Keyspaces, Timestream)/4 - Questoes|Bancos especializados (Neptune, DocumentDB, Keyspaces, Timestream)]]

> [!question] 109. Um sistema de controle de fábrica precisa de resposta em **1 dígito de ms** a partir do próprio galpão, e deve continuar operando se o link com a AWS cair.
> **A)** Local Zones
> **B)** AWS Outposts
> **C)** Direct Connect de 10 Gbps
> **D)** Wavelength
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: dois gatilhos juntos — latência local e **operação desconectada**. Só o Outpost roda **dentro** do galpão.
> > **A errada**: Local Zone é infraestrutura **da AWS**, fora do seu prédio.
> > **C errada**: link rápido não elimina a latência física nem resolve desconexão.
> > **D errada**: Wavelength é rede 5G de operadora.
> >
> > Fonte: [[3 - Performance (24%)/Outposts/4 - Questoes|Outposts]]

> [!question] 110. Reduzir o custo de consulta no Athena sobre os dados entregues pelo Firehose.
> **A)** Aumentar o buffer size
> **B)** Converter para Parquet e usar dynamic partitioning
> **C)** Usar zero buffering
> **D)** Comprimir com ZIP
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: Athena cobra por **TB escaneado**; colunar + particionamento atacam exatamente isso (no exemplo oficial, 3 TB de texto = US$ 15 → Parquet lendo 1 coluna = **US$ 1,25**).
> > **D errada**: compressão ajuda (GZIP 3:1 = US$ 5), mas Parquet + partição vai muito além.
> >
> > Fonte: [[3 - Performance (24%)/Kinesis Data Firehose/4 - Questoes|Kinesis Data Firehose]]

> [!question] 111. Um catálogo de produtos no DynamoDB precisa de busca por texto livre, com relevância e autocomplete.
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

> [!question] 112. A equipe quer custo **previsível** para o Athena, em vez de pagar por TB.
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

> [!question] 113. As instâncias não conseguem montar o EFS.
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

> [!question] 114. Os registros de um mesmo dispositivo precisam ser processados **em ordem**.
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

> [!question] 115. Arquivar 50 TB de dado frio do NAS direto para a classe mais barata, sem pagar Standard no caminho.
> **A)** DataSync para o S3 Standard + lifecycle
> **B)** DataSync gravando direto no S3 Glacier Deep Archive
> **C)** Storage Gateway em modo cached
> **D)** Snow Family
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: a doc cita arquivar para *"S3 Glacier Flexible Retrieval or S3 Glacier Deep Archive"* (S3 Glacier Flexible Retrieval ou S3 Glacier Deep Archive) — evita pagar Standard e a requisição de transição por objeto.
> > ⚠️ Atenção ao mínimo de **180 dias** e ao **overhead de 40 KB por objeto**.
> >
> > Fonte: [[3 - Performance (24%)/DataSync/4 - Questoes|DataSync]]

> [!question] 116. Usuários globais baixam vídeos grandes de um bucket S3. Qual acelera mais?
> **A)** Global Accelerator na frente do bucket
> **B)** CloudFront com o bucket como origem
> **C)** S3 Transfer Acceleration
> **D)** Route 53 latency routing
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: conteúdo **estático** repetido é caso de **cache**. O Global Accelerator **não cacheia** — o ganho seria muito menor, e o egress pelo CloudFront é mais barato.
> > **C errada**: Transfer Acceleration é para **upload**.
> >
> > Fonte: [[3 - Performance (24%)/Global Accelerator/4 - Questoes|Global Accelerator]]

> [!question] 117. O certificado foi importado em `sa-east-1` e não aparece na console do CloudFront.
> **A)** Falta validar por DNS
> **B)** CloudFront só aceita certificados emitidos pela ACM
> **C)** O certificado precisa estar em `us-east-1`
> **D)** Falta habilitar SNI
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: regra literal da doc, para HTTPS viewer↔CloudFront.
> > ⚠️ Para CloudFront↔**origem ELB**, o certificado pode estar em **qualquer** região.
> >
> > Fonte: [[3 - Performance (24%)/CloudFront/4 - Questoes|CloudFront]]

> [!question] 118. Em quais nós do EMR usar Spot?
> **A)** Todos
> **B)** Master e core
> **C)** Task nodes
> **D)** Nenhum
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: task nodes **só processam**. A doc recomenda *"use On-Demand Instances in one group for guaranteed processing power together with Spot Instances in another group"* (use instâncias sob demanda num grupo, para poder de processamento garantido, junto com instâncias Spot em outro grupo).
> >
> > Fonte: [[3 - Performance (24%)/EMR/4 - Questoes|EMR]]

> [!question] 119. Uma tabela atende leitura intensa de itens individuais em milissegundos, mas o time precisa de **microssegundos** sem mudar o modelo de dados.
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

> [!question] 120. Q-lc 1. Objetos em **S3 One Zone-IA** precisam ir para arquivamento com acesso em **milissegundos**. Qual regra de lifecycle usar?
> **A)** One Zone-IA → S3 Glacier Instant Retrieval
> **B)** Nenhuma: One Zone-IA só transiciona para Glacier Flexible Retrieval ou Deep Archive. Para chegar a Glacier IR seria preciso copiar o objeto
> **C)** One Zone-IA → Standard-IA → Glacier Instant Retrieval
> **D)** One Zone-IA → Intelligent-Tiering, que arquiva sozinho
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: a doc lista, para One Zone-IA, apenas *"the S3 Glacier Flexible Retrieval or S3 Glacier Deep Archive storage classes"* (as classes S3 Glacier Flexible Retrieval ou S3 Glacier Deep Archive). **Glacier Instant Retrieval não está na lista** — é a seta que falta no meio do waterfall.
> > **C e D erradas**: o modelo é **cascata**, só desce. Não dá para subir de One Zone-IA para Standard-IA nem para Intelligent-Tiering.
> >
> > Fonte: [[3 - Performance (24%)/S3/4 - Questoes|S3]]

> [!question] 121. Com **duas** VPCs que só precisam se falar, qual a opção mais econômica?
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

> [!question] 122. Arquivar 20 milhões de arquivos de log de ~15 KB cada no Deep Archive. Qual o problema?
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

> [!question] 123. Um banco em EC2 precisa de 100.000 IOPS sustentados e durabilidade de 99,999%.
> **A)** gp3 com IOPS máximo
> **B)** io2 Block Express
> **C)** io1 com Multi-Attach
> **D)** Dois gp3 em RAID 0
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: chega a **256.000 IOPS**, **4.000 MiB/s**, e é o único com **99,999%** de durabilidade.
> > **A errada**: gp3 para em **80.000 IOPS** e tem 99,8–99,9%.
> > **C errada**: io1 para em **64.000 IOPS**; Multi-Attach não aumenta IOPS.
> > **D errada**: RAID 0 soma IOPS mas **piora** a durabilidade — o oposto do requisito.
> > ⚠️ Confirme que a instância é **Nitro**: as outras chegam a **32.000 IOPS**.
> >
> > Fonte: [[3 - Performance (24%)/EBS/4 - Questoes|EBS]]

> [!question] 124. Descobrir se há **CPF** nas tabelas do data lake.
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

> [!question] 125. O cluster precisa de uma versão específica do **HBase** e de bibliotecas próprias.
> **A)** Glue job com Ray
> **B)** Amazon EMR
> **C)** Athena Spark
> **D)** AWS Batch
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"full control over the configuration of your clusters and the software installed on them"* (controle total sobre a configuração dos seus clusters e sobre o software instalado neles), e HBase está entre os frameworks suportados.
> >
> > Fonte: [[3 - Performance (24%)/EMR/4 - Questoes|EMR]]

> [!question] 126. O failover por DNS entre regiões está levando minutos; o requisito é segundos.
> **A)** Reduzir o TTL para 0
> **B)** AWS Global Accelerator
> **C)** Multivalue answer no Route 53
> **D)** Mais health checks
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o cliente mantém o **mesmo IP**; o accelerator troca o destino por trás, sem esperar DNS.
> > **A errada**: resolvers não respeitam TTL zero de forma confiável, e o volume de consultas explode.
> >
> > Fonte: [[3 - Performance (24%)/Global Accelerator/4 - Questoes|Global Accelerator]]

> [!question] 127. Produção e desenvolvimento estão anexadas ao mesmo TGW, mas **não devem** se comunicar. Ambas alcançam serviços compartilhados e o on-premises.
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

> [!question] 128. Um parceiro bancário exige **IPs fixos** para liberar no firewall dele.
> **A)** Endpoint público do Transfer Family
> **B)** Endpoint de VPC com Elastic IPs
> **C)** CloudFront na frente
> **D)** Global Accelerator
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o endpoint em VPC permite associar **Elastic IPs**, que o parceiro coloca na allowlist.
> > **A errada**: o hostname público não garante IPs fixos.
> >
> > Fonte: [[3 - Performance (24%)/Transfer Family/4 - Questoes|Transfer Family]]

> [!question] 129. Qual destes **não** é destino nativo do Firehose?
> **A)** Amazon OpenSearch Service
> **B)** Splunk
> **C)** Amazon SQS
> **D)** Apache Iceberg Tables
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: a lista oficial é S3, Redshift, OpenSearch (e Serverless), Splunk, Iceberg Tables, HTTP endpoint e parceiros. **SQS não está**.
> >
> > Fonte: [[3 - Performance (24%)/Kinesis Data Firehose/4 - Questoes|Kinesis Data Firehose]]

> [!question] 130. Simulação HPC com MPI, 40 nós, menor latência possível entre eles.
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

> [!question] 131. Um par de servidores de licença não pode cair junto por falha de hardware.
> **A)** Cluster
> **B)** Spread
> **C)** Partition
> **D)** Multi-AZ sem placement group
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"each placed on distinct hardware"* (cada uma num hardware distinto) — é exatamente o caso de **poucas instâncias críticas**.
> > **D errada**: multi-AZ protege de falha de AZ, mas duas instâncias na mesma AZ ainda podem compartilhar hardware.
> >
> > Fonte: [[3 - Performance (24%)/Placement Groups/4 - Questoes|Placement Groups]]

> [!question] 132. Athena, Redshift Spectrum e EMR precisam compartilhar a **mesma** definição de tabelas.
> **A)** Um bucket de metadados em JSON
> **B)** AWS Glue Data Catalog
> **C)** Lake Formation
> **D)** DynamoDB como metastore
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é o catálogo que os três consomem.
> > **C errada**: Lake Formation é a **camada de autorização** sobre o catálogo, não o catálogo.
> >
> > Fonte: [[3 - Performance (24%)/Glue/4 - Questoes|Glue]]

> [!question] 133. Cluster Cassandra de 12 nós: a falha de um rack não pode derrubar mais que uma fração dos nós.
> **A)** Cluster
> **B)** Spread
> **C)** Partition
> **D)** Nenhum; basta distribuir em 3 AZs
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: partition é a estratégia desenhada para *"HDFS, HBase, Cassandra, Kafka, Hadoop"* (HDFS, HBase, Cassandra, Kafka, Hadoop) — cada partição tem racks próprios.
> > **A errada**: concentra no mesmo bloco de hardware.
> > **B errada**: garante hardware distinto por instância, mas o teto de 7 por AZ e a falta de noção de grupo de réplicas não casam com o Cassandra.
> > **D errada**: ajuda, mas sem noção de rack dentro da AZ.
> >
> > Fonte: [[3 - Performance (24%)/EC2/4 - Questoes|EC2]]

> [!question] 134. Reescrever a URL e normalizar headers em **milhões de requisições por segundo**, com custo mínimo.
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

> [!question] 135. Uma tabela de teste recebe tráfego esporádico e imprevisível; hoje está com 500 RCU/500 WCU e utilização média de 3%.
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

> [!question] 136. Um jogo precisa de ranking em tempo real, com ordenação por pontuação e failover automático.
> **A)** ElastiCache for Redis
> **B)** ElastiCache for Memcached
> **C)** DynamoDB com GSI
> **D)** DAX
>
> > [!success]- Resposta
> > **Resposta: A**
> >
> > **Por que A**: **sorted set** é estrutura nativa do Redis, que também dá replicação e failover automático.
> > **B errada**: Memcached é só chave-valor, **sem** replicação e **sem** estruturas de dados.
> > **C errada**: funciona, mas sem a semântica de ranking em memória; latência maior e modelagem mais complexa.
> > **D errada**: DAX acelera DynamoDB; não oferece estrutura de dados.
> >
> > Fonte: [[3 - Performance (24%)/ElastiCache/4 - Questoes|ElastiCache]]

> [!question] 137. A aplicação recebe erros 503 Slow Down ao gravar milhares de objetos por segundo, todos no mesmo caminho. O que fazer?
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

> [!question] 138. Regulação exige que dados de pacientes **não saiam do prédio do hospital**.
> **A)** Região da AWS com criptografia KMS
> **B)** Outposts com S3 on Outposts e EBS locais
> **C)** Local Zone na mesma cidade
> **D)** Volume Gateway em modo stored
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: residência de dados no **próprio prédio** só se resolve com hardware no prédio.
> > **D errada**: stored mantém o dado local, mas envia **snapshots** para o S3 — o dado sai.
> >
> > Fonte: [[3 - Performance (24%)/Outposts/4 - Questoes|Outposts]]

> [!question] 139. Pipeline de renderização: milhares de frames independentes, pode reiniciar um frame perdido, custo é prioridade.
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

> [!question] 140. Um site estático no S3 usa o **website endpoint** (com index document). O time quer torná-lo privado com OAC.
> **A)** Habilitar OAC na distribuição
> **B)** Não é possível com website endpoint: use o REST endpoint do bucket como origem, com OAC
> **C)** Usar OAI
> **D)** Habilitar Block Public Access e OAC
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"you must set it up with CloudFront as a custom origin. That means you can't use OAC (or OAI)"* (você precisa configurá-lo no CloudFront como origem customizada, o que significa que não pode usar OAC (nem OAI)). Para origem privada, use o **REST endpoint**.
> >
> > Fonte: [[3 - Performance (24%)/CloudFront/4 - Questoes|CloudFront]]

> [!question] 141. Qual a diferença essencial entre Transfer Family e DataSync?
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

> [!question] 142. Arquivos de auditoria são lidos raramente, mas quando pedidos precisam estar disponíveis em **milissegundos**.
> **A)** Glacier Flexible Retrieval com Expedited
> **B)** Glacier Instant Retrieval
> **C)** Deep Archive
> **D)** Standard-IA
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"Data in this storage class is available for real-time access"* (os dados nessa classe de armazenamento ficam disponíveis para acesso em tempo real) — `GET` direto, sem restore.
> > **A errada**: Expedited leva **1-5 minutos**, não milissegundos.
> > **D errada**: funciona, mas custa mais para dado acessado ~1x por trimestre.
> >
> > Fonte: [[3 - Performance (24%)/S3 Glacier/4 - Questoes|S3 Glacier]]

> [!question] 143. O failover entre os dois túneis está levando muito tempo, com roteamento estático.
> **A)** Reduzir o MTU
> **B)** Migrar para BGP (roteamento dinâmico), terminando IPsec e BGP no mesmo dispositivo
> **C)** Criar uma terceira conexão
> **D)** Habilitar NAT traversal
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: com BGP as rotas são anunciadas e o failover é automático. E a doc exige: *"both the IPsec and the BGP sessions must be terminated on the same user gateway device"* (as sessões IPsec e BGP precisam terminar no mesmo dispositivo de gateway do cliente).
> >
> > Fonte: [[3 - Performance (24%)/VPN (Site-to-Site)/4 - Questoes|VPN (Site-to-Site)]]

> [!question] 144. Sincronizar diariamente um compartilhamento NFS on-premises com um EFS.
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

> [!question] 145. Clientes na Ásia, Europa e América do Sul reclamam de lentidão ao baixar vídeos de um bucket em `us-east-1`.
> **A)** Replicar o bucket para três regiões com latency routing
> **B)** CloudFront com o bucket como origem
> **C)** S3 Transfer Acceleration
> **D)** Global Accelerator na frente do bucket
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: conteúdo estático global é o caso canônico de CDN — e *"data transfer from your origin to CloudFront is always free"* (a transferência da sua origem para o CloudFront é sempre gratuita) com origem S3.
> > **A errada**: triplica armazenamento e exige sincronização.
> > **C errada**: Transfer Acceleration é para **upload**.
> > **D errada**: Global Accelerator **não cacheia** — o ganho seria muito menor.
> >
> > Fonte: [[3 - Performance (24%)/CloudFront/4 - Questoes|CloudFront]]

> [!question] 146. 500 TB de imagens médicas ficam 10 anos; acesso quase nulo e, quando ocorre, pode esperar 24 horas.
> **A)** Glacier Flexible Retrieval com Bulk
> **B)** Glacier Deep Archive
> **C)** One Zone-IA
> **D)** Intelligent-Tiering com Deep Archive Access ativado
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é a classe mais barata, e 24 h cabe folgado (Standard **até 12 h**, Bulk **até 48 h**).
> > **A errada**: custa mais que Deep Archive, e o requisito não precisa da velocidade.
> > **C errada**: 1 AZ — risco inaceitável para dado médico de retenção longa.
> > **D errada**: adiciona taxa de monitoramento por objeto sem ganho; o padrão de acesso é **conhecido**.
> >
> > Fonte: [[3 - Performance (24%)/S3 Glacier/4 - Questoes|S3 Glacier]]

> [!question] 147. Um stream recebe 5 MB/s e precisa ser consumido por **quatro** aplicações independentes, sem que uma atrase as outras.
> **A)** 5 shards com quatro consumidores compartilhados
> **B)** 5 shards (ou mais) com os quatro consumidores registrados em enhanced fan-out
> **C)** Data Firehose com quatro destinos
> **D)** Uma fila SQS por aplicação
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: no modo compartilhado os **2 MB/s de leitura por shard** são divididos, e a latência vai de ~200 ms (1 consumidor) para ~1.000 ms (5). O enhanced fan-out dá **2 MB/s dedicados por consumidor por shard**, com ~**70 ms**.
> > **A errada**: é exatamente o cenário de contenção a evitar.
> > **C errada**: Firehose entrega para destinos; não oferece quatro consumidores de aplicação com replay.
> > **D errada**: perderia o replay e a ordem por shard.
> >
> > Fonte: [[3 - Performance (24%)/Kinesis Data Streams/4 - Questoes|Kinesis Data Streams]]

> [!question] 148. Reduzir o storage on-premises de 500 TB para alguns TB, mantendo as aplicações que usam **iSCSI**.
> **A)** Volume Gateway em modo cached
> **B)** Volume Gateway em modo stored
> **C)** S3 File Gateway
> **D)** FSx for ONTAP
>
> > [!success]- Resposta
> > **Resposta: A**
> >
> > **Por que A**: cached mantém o dado no S3 e só um **cache** local — é o modo que reduz hardware.
> > **B errada**: stored mantém **tudo** local; não reduz storage.
> > **C errada**: expõe arquivo, não **bloco iSCSI**.
> >
> > Fonte: [[3 - Performance (24%)/Storage Gateway/4 - Questoes|Storage Gateway]]

> [!question] 149. 12 VPCs em 4 contas precisam se comunicar, com crescimento previsto.
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

> [!question] 150. Uma regra de lifecycle move para Glacier Instant Retrieval no dia 5 e para Deep Archive no dia 30. A AWS rejeita. Por quê?
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

> [!question] 151. Logs em CSV no S3 somam 3 TB/mês e são consultados ad-hoc com SQL. A conta do Athena está alta. O que reduz o custo com o menor esforço?
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

> [!question] 152. Quantas RCUs para 100 leituras **eventualmente consistentes** por segundo de itens de 6 KB?
> **A)** 100
> **B)** 100
> **C)** 200
> **D)** 50
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Cálculo**: 6 KB ÷ 4 KB = 1,5 → arredonda para **2 RCUs** por leitura **forte**. Eventual consome **metade**: 1 RCU por leitura. 100 leituras/s → **100 RCUs**.
> > (A e B são o mesmo valor de propósito: o que a prova testa é o **cálculo**, não a alternativa.)
> >
> > Fonte: [[3 - Performance (24%)/DynamoDB/4 - Questoes|DynamoDB]]

> [!question] 153. As VPCs A↔B e B↔C estão pareadas. A VPC A alcança a VPC C?
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

> [!question] 154. Depois de um bug no consumidor, o time precisa reprocessar as últimas 24 horas. O pipeline usa Firehose.
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

> [!question] 155. Um processamento de log faz leitura **sequencial** de arquivos grandes, com o menor custo.
> **A)** gp3
> **B)** io2 Block Express
> **C)** st1
> **D)** instance store
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: st1 entrega **500 MiB/s** com custo por GB muito menor que SSD, otimizado para sequencial.
> > ⚠️ st1 **não** serve como boot volume.
> >
> > Fonte: [[3 - Performance (24%)/EBS/4 - Questoes|EBS]]

> [!question] 156. Aplicação legada licenciada **por socket físico**. Como rodar na AWS atendendo o licenciamento?
> **A)** Dedicated Instances
> **B)** Dedicated Hosts, integrados ao AWS License Manager
> **C)** Reserved Instances com tenancy dedicada
> **D)** EC2 em cluster placement group
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: só o Dedicated Host expõe sockets e cores e permite *"bring your existing per-socket, per-core, or per-VM software licenses"* (traga suas licenças de software existentes, por soquete, por núcleo ou por VM).
> > **A e C erradas**: dão hardware single-tenant, mas **sem** visibilidade de socket.
> > **D errada**: placement group é topologia de rede — e Dedicated Hosts nem podem entrar em um.
> >
> > Fonte: [[3 - Performance (24%)/EC2/4 - Questoes|EC2]]

> [!question] 157. Simulação HPC com MPI, 40 nós, menor latência possível entre eles.
> **A)** Spread placement group em 3 AZs
> **B)** Cluster placement group numa AZ, mesmo tipo de instância, com EFA
> **C)** Partition placement group
> **D)** Instâncias em AZs diferentes atrás de um NLB
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: cluster *"packs instances close together inside an Availability Zone"* (agrupa as instâncias próximas umas das outras dentro de uma Zona de Disponibilidade), com 10 Gbps de fluxo único; EFA é o adaptador para MPI.
> > **A errada**: spread **distribui** (o oposto) e limita a 7 por AZ.
> > **C errada**: partition separa em racks — serve para dado distribuído, não para latência mínima.
> > **D errada**: tráfego entre AZs adiciona latência; NLB não participa de comunicação MPI.
> >
> > Fonte: [[3 - Performance (24%)/EC2/4 - Questoes|EC2]]

> [!question] 158. Um sistema de pedidos precisa inserir e atualizar registros com baixa latência, milhares de transações por segundo.
> **A)** Redshift
> **B)** RDS/Aurora (ou DynamoDB)
> **C)** Redshift Serverless
> **D)** Redshift com concurrency scaling
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: Redshift é **OLAP**. Transação é OLTP.
> > ⚠️ A pegadinha é a frase da doc: o Redshift **tem** funções OLTP, mas é *"optimized for... analysis and reporting"* (otimizado para... análise e relatórios).
> >
> > Fonte: [[3 - Performance (24%)/Redshift/4 - Questoes|Redshift]]

> [!question] 159. Renderização precisa de throughput de centenas de GB/s lendo um dataset que está num bucket S3, de centenas de instâncias Linux.
> **A)** EFS com throughput Elastic
> **B)** FSx for Lustre, com o bucket S3 vinculado ao file system
> **C)** EBS io2 Block Express com Multi-Attach
> **D)** S3 montado com cliente FUSE
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: Lustre é o FS de HPC/ML da AWS, com latência sub-ms, e *"transparently presents S3 objects as files"* (apresenta os objetos do S3 como arquivos, de forma transparente).
> > **A errada**: EFS escala bem, mas Lustre é o posicionado para *"machine learning, high performance computing (HPC), video processing"* (machine learning, computação de alto desempenho (HPC), processamento de vídeo).
> > **C errada**: Multi-Attach é limitado a poucas instâncias **na mesma AZ** e não é FS compartilhado POSIX.
> >
> > Fonte: [[3 - Performance (24%)/FSx/4 - Questoes|FSx]]

> [!question] 160. Qual destes **não** respeita as permissões do Lake Formation?
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

> [!question] 161. Quantos shards para 8 MB/s de escrita e 12.000 registros por segundo?
> **A)** 8
> **B)** 12
> **C)** 6
> **D)** 4
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Cálculo**: escrita = 8 MB/s ÷ **1 MB/s** = 8 shards. Registros = 12.000 ÷ **1.000/s** = 12 shards. Vale o **maior**: **12**.
> >
> > Fonte: [[3 - Performance (24%)/Kinesis Data Streams/4 - Questoes|Kinesis Data Streams]]

> [!question] 162. Dados novos chegam ao S3 com schema que muda ao longo do tempo. Como manter o catálogo atualizado?
> **A)** Editar o DDL manualmente
> **B)** Glue crawler agendado
> **C)** Athena `MSCK REPAIR TABLE`
> **D)** Lake Formation
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"automatically infer schema information and integrate it into your AWS Glue Data Catalog"* (inferir automaticamente as informações de schema e integrá-las ao seu AWS Glue Data Catalog).
> > **C errada**: atualiza **partições**, não o schema.
> >
> > Fonte: [[3 - Performance (24%)/Glue/4 - Questoes|Glue]]

> [!question] 163. Depois de atualizar um registro no banco, a aplicação continua lendo o valor antigo do cache.
> **A)** O cache falhou
> **B)** É lazy loading sem invalidação: reduza o TTL, ou invalide a chave na escrita, ou use write-through
> **C)** Falta habilitar Multi-AZ
> **D)** Falta criptografia em trânsito
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é o trade-off conhecido do cache-aside — e o **TTL** é o controle principal.
> >
> > Fonte: [[3 - Performance (24%)/ElastiCache/4 - Questoes|ElastiCache]]

> [!question] 164. Migrar 10% do tráfego para a nova região antes de completar a mudança.
> **A)** Weighted routing no Route 53
> **B)** Traffic dial no endpoint group do Global Accelerator
> **C)** Custom routing
> **D)** Origin group do CloudFront
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o traffic dial controla o **percentual** por endpoint group.
> > **A**: também funciona, e é resposta válida se o cenário for de DNS — mas depende de TTL e não mantém IP fixo.
> >
> > Fonte: [[3 - Performance (24%)/Global Accelerator/4 - Questoes|Global Accelerator]]

> [!question] 165. Compartilhar tabelas do data lake com outra conta, mantendo permissão por coluna.
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

> [!question] 166. Uma função Lambda precisa usar o DAX. O que é necessário?
> **A)** Nada, o DAX é público
> **B)** A Lambda precisa estar na VPC, com security group liberando o cluster DAX
> **C)** Um gateway endpoint para o DAX
> **D)** Um NAT gateway
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o DAX é *"designed to run within an Amazon Virtual Private Cloud"* (projetado para rodar dentro de uma Amazon Virtual Private Cloud) — é alcançável só de dentro da VPC.
> > **C errada**: gateway endpoint existe só para **S3 e DynamoDB**.
> >
> > Fonte: [[3 - Performance (24%)/DAX/4 - Questoes|DAX]]

> [!question] 167. Entregar um stream de logs no S3 em Parquet, com latência de até 5 minutos e **sem código**.
> **A)** Kinesis Data Streams com consumidor Lambda
> **B)** Amazon Data Firehose
> **C)** EMR com Spark Streaming
> **D)** Kinesis Data Streams com KCL
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: Firehose é gerenciado, converte formato e tem buffer de 5 MB / **300 s** por padrão no S3.
> > **A e D erradas**: funcionam, mas você escreve e opera o consumidor.
> >
> > Fonte: [[3 - Performance (24%)/Kinesis Data Streams/4 - Questoes|Kinesis Data Streams]]

> [!question] 168. Auditoria exige acabar com bastion hosts e chaves SSH, com registro das sessões administrativas em instâncias privadas sem internet.
> **A)** NAT gateway + SSH com chave rotacionada por Lambda
> **B)** SSM Session Manager com interface endpoints do Systems Manager na VPC e log em S3/CloudWatch Logs
> **C)** EC2 Instance Connect
> **D)** VPN cliente para a subnet privada
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: resolve os três requisitos — sem porta aberta, sem chave, com log. Os endpoints evitam depender de internet.
> > **A errada**: mantém porta 22, chave e NAT.
> > **C errada**: Instance Connect ainda usa SSH na 22.
> > **D errada**: dá rede, mas não elimina SSH, chave nem bastion.
> >
> > Fonte: [[3 - Performance (24%)/EC2/4 - Questoes|EC2]]

> [!question] 169. Um file system EFS de 50 GiB em modo Bursting fica lento depois de alguns minutos de carga intensa.
> **A)** Mudar para Max I/O
> **B)** Mudar para Elastic (ou Provisioned), porque o baseline do Bursting é proporcional ao tamanho armazenado
> **C)** Aumentar o número de clientes
> **D)** Mudar para One Zone
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o baseline do Bursting é **50 MiBps por TiB** — 50 GiB dá um baseline minúsculo, e os créditos esgotam.
> > **A errada**: Max I/O aumenta throughput agregado mas **piora a latência** por operação — e não é suportado com Elastic.
> >
> > Fonte: [[3 - Performance (24%)/EFS/4 - Questoes|EFS]]

> [!question] 170. Usuários de uma cidade precisam de latência de 1 dígito de ms, e a empresa **não quer** gerenciar hardware.
> **A)** Outposts servers
> **B)** AWS Local Zones
> **C)** Wavelength
> **D)** CloudFront
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: latência metropolitana **sem** hardware seu.
> > **D errada**: CloudFront acelera **conteúdo HTTP em cache**, não compute de baixa latência.
> >
> > Fonte: [[3 - Performance (24%)/Outposts/4 - Questoes|Outposts]]

> [!question] 171. Uma regra de lifecycle move para Glacier IR no dia 10 e para Deep Archive no dia 60. É aceita?
> **A)** Sim
> **B)** Não: o mínimo de 90 dias do Glacier IR exige a transição no dia 100 ou depois
> **C)** Sim, se o objeto tiver mais de 128 KB
> **D)** Não, porque Glacier IR não transiciona para Deep Archive
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: 10 + 90 = **100**.
> > **D errada**: Glacier IR **pode** ir para Flexible Retrieval e Deep Archive.
> >
> > Fonte: [[3 - Performance (24%)/S3 Glacier/4 - Questoes|S3 Glacier]]

> [!question] 172. Depois de corrigir um bug, o time precisa **reprocessar** os eventos das últimas 48 horas.
> **A)** SQS com DLQ redrive
> **B)** Kinesis Data Streams com retenção ≥ 48 h (até 365 dias)
> **C)** SNS com retry
> **D)** Firehose
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o Kinesis **armazena** (24 h a 365 dias), então dá para reler.
> > **A errada**: a DLQ só tem o que **falhou**.
> > **C errada**: SNS não armazena.
> > **D errada**: Firehose **entrega** e não guarda.
> >
> > Fonte: [[3 - Performance (24%)/Kinesis Data Streams/4 - Questoes|Kinesis Data Streams]]

> [!question] 173. A empresa quer começar com 500 Mbps e entregar rápido.
> **A)** Dedicated de 1 Gbps
> **B)** Hosted connection
> **C)** Dedicated de 10 Gbps
> **D)** VPN
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: hosted vai de **50 Mbps a 25 Gbps**, é provisionada pelo **parceiro** e entrega muito mais rápido. Dedicated começa em **1 Gbps** e leva *"up to 72 business hours"* (até 72 horas úteis) só para a porta.
> >
> > Fonte: [[3 - Performance (24%)/Direct Connect/4 - Questoes|Direct Connect]]

> [!question] 174. Parceiros enviam arquivos diários por **SFTP**. A empresa quer eliminar o servidor SFTP em EC2.
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

> [!question] 175. Dez instâncias Linux precisam ler e gravar no **mesmo diretório**.
> **A)** gp3 com Multi-Attach
> **B)** Amazon EFS
> **C)** io2 com Multi-Attach
> **D)** S3 montado via FUSE
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: EFS é NFS compartilhado, elástico e multi-AZ.
> > **A errada**: **gp3 não suporta Multi-Attach**.
> > **C errada**: Multi-Attach dá disco **bruto** compartilhado — não é file system; exigiria GFS2/OCFS2 e é limitado a uma AZ.
> >
> > Fonte: [[3 - Performance (24%)/EBS/4 - Questoes|EBS]]

> [!question] 176. Uma API de **escrita** (POST) tem usuários em 4 continentes e latência ruim. Cache não ajuda.
> **A)** CloudFront com TTL zero
> **B)** Global Accelerator na frente do ALB
> **C)** Route 53 geolocation
> **D)** API Gateway edge-optimized
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o ganho vem de **entrar na rede da AWS** no POP mais próximo — serve para escrita, que não se cacheia.
> > **A errada**: CloudFront com TTL zero ainda ajuda pela terminação TLS na borda, mas o Global Accelerator é o serviço posicionado para latência de **rede**.
> > **D errada**: edge-optimized já usa a borda do CloudFront e é uma resposta razoável — mas só se a API estiver no API Gateway, e não resolve IP fixo nem failover regional.
> >
> > Fonte: [[3 - Performance (24%)/Global Accelerator/4 - Questoes|Global Accelerator]]
