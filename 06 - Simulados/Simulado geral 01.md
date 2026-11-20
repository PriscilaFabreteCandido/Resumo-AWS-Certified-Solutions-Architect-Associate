---
tags: [saa-c03, simulado]
gerado_por: scripts/gerar-simulados.mjs
---

# Simulado geral 01

> [!warning] Nota gerada automaticamente: não edite aqui
> Corrija a questão na nota `4 - Questoes` de origem (o link está na resposta) e rode `node scripts/gerar-simulados.mjs`.

65 questões no formato da prova, na proporção dos domínios (30% / 26% / 24% / 20%, com algumas de fundamentos). Faça de uma vez, cronometrado, e só confira as respostas no final.

> [!note] O domínio 4 (Custo) tem poucas questões próprias, então elas se repetem entre os simulados gerais.

**65 questões.** Responda de cabeça e anote a letra **antes** de abrir a resposta. Errou? Abra a **Fonte** e volte ao conteúdo daquele ponto.

---

> [!question] 1. Uma arquitetura de microsserviços está lenta, mas cada serviço mostra métricas normais no CloudWatch.
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

> [!question] 2. Por que uma instância EC2 não aparece nos resultados do Inspector?
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

> [!question] 3. Saber continuamente se instâncias EC2 e imagens no ECR têm CVEs conhecidas, sem instalar agente manualmente.
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

> [!question] 4. Uma aplicação **nova** precisa guardar documentos JSON, com escala imprevisível e menor esforço operacional.
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

> [!question] 5. Garantir que **toda** distribuição CloudFront nova nas 60 contas receba a web ACL corporativa.
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

> [!question] 6. Carga estável 24/7, família e região **definidas**, e o time quer o **maior desconto**.
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

> [!question] 7. Como restringir o tráfego que sai pelo NAT gateway usando security group?
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

> [!question] 8. Um fornecedor externo precisa assumir uma role na sua conta. O que incluir na trust policy?
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

> [!question] 9. É preciso cifrar um arquivo de **10 MB** usando o KMS.
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

> [!question] 10. 80 TB num NAS, link de 100 Mbps, migração em **duas semanas**.
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

> [!question] 11. Depois de uma escrita, uma consulta `Query` pelo DAX devolve o resultado antigo.
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

> [!question] 12. Um cliente novo precisa de transferência física segura de grande volume. O que a AWS recomenda?
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

> [!question] 13. O proxy foi configurado, mas o número de conexões no banco não caiu.
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

> [!question] 14. O AWS RAM pode ser usado para dar a outra conta permissão de ler um bucket S3?
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

> [!question] 15. Arquivar 50 TB de dado frio do NAS direto para a classe mais barata, sem pagar Standard no caminho.
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

> [!question] 16. Um banco **RDS já em produção** não está cifrado. A auditoria exige criptografia em repouso.
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

> [!question] 17. Quanto tempo de histórico o Cost Explorer mostra, e quanto prevê?
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

> [!question] 18. Uma simulação HPC com MPI precisa abranger 20 nós que se comunicam.
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

> [!question] 19. Migrar 10% do tráfego para a nova região antes de completar a mudança.
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

> [!question] 20. Uma API precisa responder em menos de 100 ms, mas sofre cold start nos picos.
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

> [!question] 21. Um time tem produtores e consumidores **Kafka** e dezenas de conectores Kafka Connect.
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

> [!question] 22. Em quais nós do EMR usar Spot?
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

> [!question] 23. Um pipeline de renderização processa milhares de frames independentes e reiniciáveis; custo é prioridade.
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

> [!question] 24. Varrer volumes EBS em busca de malware.
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

> [!question] 25. Um file system One Zone precisa de Max I/O para mais throughput agregado.
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

> [!question] 26. Precisa adicionar um índice com **leitura fortemente consistente** num sort key alternativo, numa tabela que já existe.
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

> [!question] 27. A empresa precisa de HSM dedicado **e** que o S3 continue usando SSE-KMS normalmente. Como?
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

> [!question] 28. A equipe de segurança quer garantir que nenhuma conta da organização crie SG com a porta 22 aberta para `0.0.0.0/0`, com correção automática.
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

> [!question] 29. Site em três regiões, servindo cada usuário pela região de menor latência, com failover automático.
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

> [!question] 30. Garantir que nenhuma das 30 contas crie recursos fora de `us-east-1` e `sa-east-1`, por custo e compliance.
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

> [!question] 31. Um sistema de pedidos precisa inserir e atualizar registros com baixa latência, milhares de transações por segundo.
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

> [!question] 32. Uma tabela tem 100.000 partições e o `MSCK REPAIR TABLE` demora demais.
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

> [!question] 33. Vários times precisam lançar recursos em subnets gerenciadas pelo time de rede, sem criar uma VPC por conta.
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

> [!question] 34. 500 TB de imagens médicas ficam 10 anos; acesso quase nulo e, quando ocorre, pode esperar 24 horas.
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

> [!question] 35. O tráfego precisa passar por um firewall virtual de terceiro antes de chegar à aplicação.
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

> [!question] 36. Um ASG mantém instâncias rodando, mas usuários recebem 502. O processo da aplicação travou; o SO está no ar.
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

> [!question] 37. Qual chave **não** pode ter rotação automática habilitada?
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

> [!question] 38. Renderização precisa de throughput de centenas de GB/s lendo um dataset que está num bucket S3, de centenas de instâncias Linux.
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

> [!question] 39. Instâncias recém-lançadas estão sendo terminadas pelo ASG antes de terminar a inicialização (que leva 4 minutos).
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

> [!question] 40. Um processamento de pedidos perde requisições no pico porque o backend não acompanha.
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

> [!question] 41. Uma função Lambda com alta concorrência esgota as conexões do Aurora.
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

> [!question] 42. Cluster de HPC precisa processar um dataset que **já está no S3**, com latência de sub-milissegundo.
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

> [!question] 44. Aplicação licenciada **por socket físico**.
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

> [!question] 45. Absorver um pico de requisições e processar depois, com o menor esforço operacional e sem código de ingestão.
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

> [!question] 46. Um workflow precisa pausar e esperar a **aprovação de um gerente** antes de continuar.
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

> [!question] 47. Antes de migrar, o time precisa descobrir quais bancos existem no datacenter e seus tamanhos.
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

> [!question] 48. Q-lc 1. Objetos em **S3 One Zone-IA** precisam ir para arquivamento com acesso em **milissegundos**. Qual regra de lifecycle usar?
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

> [!question] 49. Migrar um Oracle on-premises de 4 TB para **Aurora PostgreSQL**, com downtime máximo de 30 minutos.
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

> [!question] 50. Replicar **servidores** (on-premises e EC2) para outra Região com RPO de **segundos**, sem pagar a frota parada.
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

> [!question] 51. Rodar containers em produção com o **menor esforço operacional**, e o time não usa Kubernetes.
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

> [!question] 52. A política exige que a senha do banco troque a cada 30 dias automaticamente, sem intervenção.
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

> [!question] 53. Após a perda de uma AZ, instâncias privadas de outra AZ perderam acesso à internet. Por quê?
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

> [!question] 54. Q-lc 4. Um objeto está no **Deep Archive Access tier** do Intelligent-Tiering. Para onde o lifecycle pode movê-lo?
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

> [!question] 55. Qual a ordem correta para otimizar o custo de uma fleet estável?
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

> [!question] 56. Q-root 1. Quais destas são boas práticas da AWS para o usuário raiz? (escolha as que se aplicam)
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

> [!question] 57. Um bucket com versionamento cresceu 4x em um ano, apesar do volume de dados novos ser estável. Causa e correção?
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

> [!question] 58. O tráfego tem um padrão diário conhecido: sobe às 8h e cai às 19h. Qual configuração reduz latência no início do dia e custo à noite?
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

> [!question] 59. Um role na conta A precisa assumir um role na conta B. O `AssumeRole` falha com AccessDenied. O que verificar?
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

> [!question] 60. A empresa precisa **garantir capacidade** numa AZ específica para um evento, sem assumir compromisso de 1 ou 3 anos.
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

> [!question] 61. O Security Hub foi habilitado, mas os controles não mostram dados. O que falta?
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

> [!question] 62. Duas instâncias estão na **mesma** subnet. A NACL nega todo tráfego na porta 3306. Elas conseguem se comunicar nessa porta?
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

> [!question] 63. Duas VPCs com **CIDR sobreposto**: a VPC A precisa consumir uma API hospedada na VPC B.
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

> [!question] 64. Clientes Linux (NFS) e Windows (SMB) precisam acessar os **mesmos** arquivos, com snapshots e clones.
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

> [!question] 65. Além de EC2, o que mais o Compute Optimizer analisa?
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
