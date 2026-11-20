---
tags: [saa-c03, simulado]
gerado_por: scripts/gerar-simulados.mjs
---

# Simulado — Dominio 4 (Custo)

> [!warning] Nota gerada automaticamente: não edite aqui
> Corrija a questão na nota `4 - Questoes` de origem (o link está na resposta) e rode `node scripts/gerar-simulados.mjs`.

Todas as questões do domínio, misturando os serviços. O nome do serviço só aparece depois da resposta.

**31 questões.** Responda de cabeça e anote a letra **antes** de abrir a resposta. Errou? Abra a **Fonte** e volte ao conteúdo daquele ponto.

---

> [!question] 1. A empresa precisa **garantir capacidade** numa AZ específica para um evento, sem assumir compromisso de 1 ou 3 anos.
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

> [!question] 2. A empresa quer reduzir custo saindo das licenças Oracle.
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

> [!question] 3. As recomendações para uma aplicação **memory-bound** parecem agressivas demais.
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

> [!question] 4. A diretoria quer ser notificada quando o gasto mensal **previsto** passar de US$ 50.000, e que novos lançamentos de EC2 sejam bloqueados nesse caso.
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

> [!question] 5. A empresa quer saber se as 400 instâncias EC2 estão superdimensionadas, com base no uso real.
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

> [!question] 6. Quanto tempo de histórico o Cost Explorer mostra, e quanto prevê?
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

> [!question] 7. Um cliente novo precisa de transferência física segura de grande volume. O que a AWS recomenda?
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

> [!question] 8. A empresa comprou Savings Plans e quer saber se está usando o que comprometeu.
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

> [!question] 9. Carga estável 24/7, família e região **definidas**, e o time quer o **maior desconto**.
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

> [!question] 10. Migrar MySQL on-premises para **Aurora MySQL** com downtime mínimo.
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

> [!question] 11. Qual a ordem correta para otimizar o custo de uma fleet estável?
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

> [!question] 12. Um pipeline de renderização processa milhares de frames independentes e reiniciáveis; custo é prioridade.
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

> [!question] 13. Aplicação licenciada **por socket físico**.
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

> [!question] 14. Um cluster de containers em **Fargate** roda estável 24/7. Como reduzir o custo?
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

> [!question] 15. 80 TB num NAS, link de 100 Mbps, migração em **duas semanas**.
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

> [!question] 16. Migrar um Oracle on-premises de 4 TB para **Aurora PostgreSQL**, com downtime máximo de 30 minutos.
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

> [!question] 17. Alimentar continuamente um data lake no S3 a partir de um banco transacional.
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

> [!question] 18. O FinOps precisa analisar custo **por hora, por recurso**, cruzando com dados do ERP, usando SQL.
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

> [!question] 19. Garantir que nenhuma das 30 contas crie recursos fora de `us-east-1` e `sa-east-1`, por custo e compliance.
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

> [!question] 20. As recomendações sugerem reduzir instâncias que, no fechamento mensal, ficam no limite. O que fazer?
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

> [!question] 21. 20 TB para o S3, com link de 1 Gbps disponível e sem prazo apertado.
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

> [!question] 22. Ambientes de desenvolvimento rodam 24/7 em on-demand, mas são usados de 8h às 19h em dias úteis.
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

> [!question] 23. 12 times precisam ter o custo atribuído, sem criar contas novas. As tags já estão aplicadas, mas o Cost Explorer não mostra nada por time.
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

> [!question] 24. Carga de produção 24/7 em m6i. O time ainda não decidiu se migra para Graviton, para outra região, ou para containers.
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

> [!question] 25. Qual a capacidade usável do **Snowball Edge Storage Optimized**?
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

> [!question] 26. Além de EC2, o que mais o Compute Optimizer analisa?
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

> [!question] 27. Antes de migrar, o time precisa descobrir quais bancos existem no datacenter e seus tamanhos.
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

> [!question] 28. O Compute Optimizer aplica automaticamente o novo tipo de instância?
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

> [!question] 29. Quantos dispositivos num cluster Snowball Edge, e para quê?
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

> [!question] 31. Migrar 200 **servidores** (não bancos) para a AWS, lift and shift.
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
