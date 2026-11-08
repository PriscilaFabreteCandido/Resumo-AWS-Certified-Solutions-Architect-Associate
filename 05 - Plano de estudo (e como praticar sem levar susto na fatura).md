---
tags: [saa-c03, plano, custo-zero, pratica]
atualizado: 2026-11-08
---

# 📅 Plano de estudo — e como praticar sem levar susto na fatura

## 🧩 Em 30 segundos

- A prova premia **escolher entre serviços**, não decorar features. Estude sempre em pares: *"S3 Standard-IA × One Zone-IA"*, *"ALB × NLB"*, *"Multi-AZ × read replica"*.
- Ordem de rendimento: **Segurança (30%) → Resiliência (26%) → Performance (24%) → Custo (20%)**.
- Deixe **custo para o final**: ele reaproveita todo o resto (classes do S3, tipos de EBS, opções de compra do EC2 já foram estudadas nos outros domínios).
- As três notas transversais ([[01 - Palavras-chave (decoder de enunciado)]], [[02 - Numeros para decorar]], [[03 - Pegadinhas mestre]]) são para **reler várias vezes**, não para ler uma vez.

---

## Roteiro de 6 semanas

| Semana | Foco | Notas |
|---|---|---|
| **1** | Fundamentos: Well-Architected, responsabilidade compartilhada, regiões/AZs, IAM | [[Well-Architected e responsabilidade compartilhada]], [[IAM, STS e Organizations]] |
| **2** | Segurança: KMS/ACM, rede segura, WAF/Shield, detecção | pasta `1 - Seguranca (30%)` |
| **3** | Resiliência: ELB + Auto Scaling + Route 53, desacoplamento, DR | pasta `2 - Resiliencia (26%)` |
| **4** | Bancos: RDS, Aurora, DynamoDB, ElastiCache, Redshift | notas de banco nas pastas 2 e 3 |
| **5** | Performance: armazenamento, borda, ingestão de dados | pasta `3 - Performance (24%)` |
| **6** | Custo + revisão das 3 notas transversais + simulados | pasta `4 - Custo (20%)` |

> [!tip] Como estudar cada nota
> **1ª passada**: leia a nota inteira, uma vez. Não faça resumo do resumo.
> **A partir da 2ª**: abra só *🧠 Teste-se primeiro* e *❓ Questões de prova*. Responda de cabeça **antes** de clicar. Se errar, aí sim volte ao conteúdo daquele ponto.
> Isso é teste de recuperação: é a diferença entre reconhecer a resposta e saber a resposta.

## A técnica que mais ajuda nesta prova específica

Para cada questão de simulado que você errar, escreva **uma linha** no formato:

```
[enunciado em 5 palavras] → eu respondi X → era Y → o divisor era: ___
```

O "divisor" é a palavra do enunciado que decidia. Depois de 50 questões você terá seu próprio decoder — e vai perceber que erra sempre pelos mesmos 6 ou 7 divisores.

---

## 💰 Praticar sem levar susto na fatura

> [!important] Antes de criar qualquer recurso, monte as travas
> Isso leva 10 minutos e evita a conta de US$ 300 que todo mundo conta no Reddit.

### 1. Trava de orçamento (faça primeiro, sempre)

Crie um **AWS Budget** de custo em **US$ 1** com alerta em 1% — assim você é avisado no **primeiro centavo**, não quando já doeu.

```bash
aws budgets create-budget --account-id SEU_ACCOUNT_ID --budget '{"BudgetName":"guardrail-1-dolar","BudgetLimit":{"Amount":"1","Unit":"USD"},"TimeUnit":"MONTHLY","BudgetType":"COST"}'
```

Também ative, em **Billing preferences**, o alerta de **uso do nível gratuito** (*Free Tier usage alerts*) — ele avisa quando você chega a 85% de qualquer item do free tier.

### 2. Os recursos que cobram mesmo "paradinhos"

Esta é a lista que te protege. Todos estes cobram **por hora, estejam sendo usados ou não**:

| Recurso | Como evitar |
|---|---|
| **NAT gateway** | O vilão nº 1 de laboratório. Cobra por hora + por GB. **Delete ao fim de cada sessão.** Para estudar subnet privada, use **gateway endpoint** (grátis) ou **SSM Session Manager** em vez de NAT |
| **Elastic IP não associado** | EIP ociosa é cobrada. Libere ao terminar |
| **Load balancer (ALB/NLB)** | Cobra por hora + LCU. Delete depois do lab |
| **RDS / Aurora** | Mesmo parado, o **storage** continua cobrando. Delete a instância **e** os snapshots manuais |
| **Volume EBS órfão** | Terminar a instância não apaga volume com *delete on termination* desligado |
| **Snapshot EBS / AMI** | Acumula silenciosamente |
| **Interface endpoint (PrivateLink)** | Cobra por hora **por AZ**. Gateway endpoint é grátis |
| **Transit Gateway** | Cobra por attachment por hora |
| **Site-to-Site VPN** | Cobra por hora de conexão |
| **CloudWatch Logs** | Retenção **"Never expire"** é o padrão. Defina retenção de 1 ou 3 dias nos log groups de lab |
| **Aurora Serverless v2 com mínimo 0,5 ACU** | Fica sempre ligado. Para pausar, mínimo **0 ACU** |

### 3. O que você consegue estudar praticamente de graça

| Tema | Como praticar sem custo relevante |
|---|---|
| IAM, policies, SCPs, evaluation logic | **100% grátis**. Crie usuários, roles, policies e use o **IAM Policy Simulator** |
| S3: classes, lifecycle, versionamento, replicação, Block Public Access | Free tier de 5 GB; crie objetos de alguns KB. Configure lifecycle e veja a regra, sem precisar esperar |
| VPC: subnets, route tables, SG, NACL, peering | VPC, subnet, IGW, route table e SG **não têm custo**. Peering dentro da mesma AZ é grátis |
| Route 53 | Hosted zone custa ~US$ 0,50/mês. Para estudar só as políticas, a console deixa você montar os registros e ver o formulário sem precisar de domínio real |
| DynamoDB | Free tier de 25 GB e 25 WCU/RCU. Tabelas **on-demand** pequenas são praticamente gratuitas |
| Lambda, SQS, SNS, Step Functions, EventBridge | Free tier generoso e permanente. Monte um fan-out SNS → 2 SQS → Lambda: custo ~zero |
| EC2 | Free tier de 750 h/mês de t2.micro ou t3.micro no primeiro ano. Use **t3.micro**, **uma** instância, e **pare** quando não estiver usando |
| Auto Scaling + ALB | ASG é grátis; o **ALB não é**. Faça o lab inteiro numa sessão e delete o ALB no fim |
| CloudFormation | O serviço é grátis; você paga só os recursos criados. **Delete a stack** = tudo some junto, é a forma mais segura de fazer lab |
| Cost Explorer / Budgets | Cost Explorer na console é grátis (só a API custa US$ 0,01 por chamada) |

### 4. O ritual de encerramento de lab (2 minutos)

Sempre que terminar, nesta ordem:

```bash
aws cloudformation delete-stack --stack-name meu-lab
```

E se criou na mão, confira os seis suspeitos:

```bash
aws ec2 describe-nat-gateways --filter 'Name=state,Values=available' --query 'NatGateways[].NatGatewayId'
```

```bash
aws ec2 describe-addresses --query 'Addresses[?AssociationId==null].PublicIp'
```

```bash
aws elbv2 describe-load-balancers --query 'LoadBalancers[].LoadBalancerArn'
```

```bash
aws ec2 describe-volumes --filters 'Name=status,Values=available' --query 'Volumes[].VolumeId'
```

```bash
aws rds describe-db-instances --query 'DBInstances[].DBInstanceIdentifier'
```

```bash
aws ec2 describe-instances --filters 'Name=instance-state-name,Values=running' --query 'Reservations[].Instances[].InstanceId'
```

> [!tip] A regra de ouro do lab barato
> **Crie tudo por CloudFormation, mesmo o lab bobo.** Um `delete-stack` apaga NAT gateway, ALB, EIP e volume de uma vez — é impossível esquecer um recurso caro para trás.

### 5. Onde a prática realmente muda sua nota

A SAA-C03 é teórica em quase tudo, mas três coisas ficam **muito** mais claras depois de 20 minutos de console:

1. **Montar uma VPC do zero** (2 AZs, subnet pública e privada, IGW, route tables). Custo: **zero**. Isso destrava metade do domínio 1 e 3.
2. **Ver a tela de criação do RDS** com Multi-AZ, Multi-AZ DB cluster e read replica lado a lado. Não precisa criar — só abrir o formulário já fixa a diferença.
3. **Configurar uma regra de lifecycle no S3** e tentar colocar uma transição inválida: a console **recusa** e explica o mínimo de dias. Vale mais que decorar a tabela.

## Links

- [[00 - START HERE (indice da prova)]]
- [[04 - Fora de escopo (nao estude isso)]]
