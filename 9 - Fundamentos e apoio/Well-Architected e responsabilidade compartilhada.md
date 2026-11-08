---
tags: [saa-c03, fundamentos, well-architected, shared-responsibility]
tasks: [1.1]
atualizado: 2026-11-08
---

# Well-Architected e responsabilidade compartilhada

> [!important] Por que esta nota vem primeiro
> O guia oficial diz, na primeira linha: a prova *"validates a candidate's ability to design solutions based on the AWS Well-Architected Framework"*.
> Os quatro domínios da prova são, literalmente, quatro pilares do framework: **secure** (Security), **resilient** (Reliability), **high-performing** (Performance Efficiency), **cost-optimized** (Cost Optimization). Entender o framework é entender a lógica das respostas.

## 🧩 Em 30 segundos — os seis pilares

| Pilar | Definição oficial (trecho) |
|---|---|
| **Operational Excellence** | *"a commitment to build software correctly while consistently delivering a great customer experience"* |
| **Security** | *"the ability to protect data, systems, and assets to take advantage of cloud technologies to improve your security"* |
| **Reliability** | *"the ability of a workload to perform its intended function correctly and consistently when it's expected to"* |
| **Performance Efficiency** | *"the ability to use cloud resources efficiently to meet performance requirements, and to maintain that efficiency as demand changes"* |
| **Cost Optimization** | *"the ability to run systems to deliver business value at the lowest price point"* |
| **Sustainability** | *"focuses on environmental impacts, especially energy consumption and efficiency"* |

Mnemônico: **O-S-R-P-C-S** — "Operações Seguras, Resilientes, Performáticas, Custeadas e Sustentáveis".

## 🧠 Teste-se primeiro

> [!question]- Quais são as áreas de boas práticas de cada pilar?
> **Operational Excellence** (4): Organization · Prepare · Operate · Evolve
> **Security** (7): Security foundations · Identity and access management · Detection · Infrastructure protection · Data protection · Incident response · Application security
> **Reliability** (4): Foundations · Workload architecture · Change management · Failure management
> **Performance Efficiency** (5): Architecture selection · Compute and hardware · Data management · Networking and content delivery · Process and culture
> **Cost Optimization** (5): Practice Cloud Financial Management · Expenditure and usage awareness · Cost-effective resources · Manage demand and supply resources · Optimize over time
> **Sustainability** (6): Region selection · Alignment to demand · Software and architecture · Data · Hardware and services · Process and culture

> [!question]- Onde fica a fronteira da responsabilidade compartilhada?
> A AWS é responsável pela **segurança da nuvem**: data centers, hardware, rede física, hipervisor, e o software dos serviços gerenciados.
> Você é responsável pela segurança **na nuvem**: seus dados, classificação, criptografia, patch do SO (quando é EC2), configuração de rede (SG, NACL, route table), IAM, e configuração do serviço.
> A doc do pilar de segurança resume: *"Because AWS physically secures the infrastructure that supports our cloud services, as an AWS customer you can focus on using services to accomplish your goals."*
>
> ⚠️ A fronteira **se move com o serviço**: em **EC2** você patcheia o SO; em **RDS** a AWS patcheia o engine mas você gerencia usuários e schema; em **Lambda/S3/DynamoDB** você só cuida de dados, IAM e configuração.

> [!question]- Como a prova usa a responsabilidade compartilhada?
> Em duas formas:
> 1. **"De quem é a tarefa X?"** — patch do SO em EC2 (seu), patch do hipervisor (AWS), criptografia dos seus objetos (sua configuração), segurança física (AWS).
> 2. **Escolha de serviço gerenciado**: "least operational overhead" é, no fundo, "empurre a fronteira para a AWS". Fargate em vez de EC2, RDS em vez de MySQL no EC2, Aurora Serverless em vez de Aurora provisionado.

## O framework como gabarito de prova

Cada pilar tem um reflexo prático em como a prova é respondida:

| Pilar | Como vira resposta |
|---|---|
| **Operational Excellence** | IaC (CloudFormation), automação, observabilidade, deploy imutável. Elimina alternativas com "script manual" e "atualizar no lugar" |
| **Security** | Menor privilégio, criptografia em repouso e em trânsito, defesa em camadas, credencial temporária. Elimina "access key no código", "bucket público", "0.0.0.0/0" |
| **Reliability** | Multi-AZ, desacoplamento, auto scaling, DR com RPO/RTO definido, quota conferida. Elimina Single-AZ e ponto único de falha |
| **Performance Efficiency** | Serviço purpose-built, cache, escala horizontal, serverless. Elimina "instância maior" como reflexo |
| **Cost Optimization** | Classe/tipo certo, compromisso quando a carga é estável, desligar o que não se usa, não pagar HA em dev |
| **Sustainability** | Região com menor impacto, right-sizing, gerenciado em vez de próprio. Raramente é a resposta sozinha, mas reforça serverless e rightsizing |

> [!tip] O princípio que resolve o maior número de questões
> **"Use purpose-built AWS services for workloads"** — frase que aparece **literalmente duas vezes** no guia oficial (skills de 2.1 e 2.2).
> Na prática: quando uma alternativa usa o serviço **feito para aquilo** e outra usa um serviço genérico adaptado, a primeira é a resposta. Timestream para série temporal, Neptune para grafo, Athena para SQL no S3, Lustre para HPC, Transfer Family para SFTP.

## Infraestrutura global

| Conceito | O que é |
|---|---|
| **Region** | Área geográfica com várias AZs. Isolamento de falha e de dado. Preço e disponibilidade de serviço variam |
| **Availability Zone** | Um ou mais data centers com energia, rede e refrigeração independentes, próximos o bastante para replicação síncrona |
| **Local Zone** | Extensão da região mais perto do usuário final, para latência de único dígito de ms |
| **Wavelength Zone** | Dentro da rede 5G de operadora |
| **Edge location / POP** | Borda do CloudFront, Global Accelerator e Route 53 |
| **Outposts** | Hardware AWS **no seu** data center |

Regras que caem:
- A maioria dos serviços é **regional**; IAM, Route 53, CloudFront e WAF (para CloudFront) são **globais**.
- **Multi-AZ** protege contra falha de data center. **Multi-Region** protege contra falha regional e atende requisito de latência global ou residência de dado.
- Dado **não** sai da região automaticamente: replicação entre regiões é sempre uma decisão explícita sua.

## AWS Artifact e compliance

**AWS Artifact** é onde você baixa os relatórios de compliance da AWS (SOC, PCI DSS, ISO) e aceita acordos. É a resposta para *"Aligning AWS technologies to meet compliance requirements"* quando o enunciado diz "o auditor pediu a evidência de conformidade da AWS".
Não confundir com **Security Hub** (postura da **sua** conta) nem com **Config** (conformidade dos **seus** recursos).

## ❓ Questões de prova

> [!example]- Q1 — Quem é responsável por aplicar patches de segurança no sistema operacional de uma instância EC2?
> **A)** AWS
> **B)** **O cliente** ✅
> **C)** Compartilhado igualmente
> **D)** AWS, se a instância usar uma AMI da AWS
>
> **Por que B**: EC2 é IaaS — a AWS cuida da infraestrutura **da** nuvem (hipervisor, hardware, rede física); o SO convidado é do cliente.
> **D errada**: a AMI ser da AWS não transfere a responsabilidade contínua de patch. (O que a AWS oferece é **Systems Manager Patch Manager** para você automatizar — ainda sua responsabilidade.)
> ⚠️ Compare com **RDS**: ali a AWS aplica patch do engine e do SO subjacente; você cuida de usuários, schema, parameter group e criptografia.

> [!example]- Q2 — Uma aplicação precisa armazenar métricas de sensores com timestamp, consultadas por janela de tempo. Qual serviço, segundo o princípio de "purpose-built"?
> **A)** RDS PostgreSQL com índice no campo de data
> **B)** **Amazon Timestream** ✅
> **C)** DynamoDB com sort key de timestamp
> **D)** S3 com Athena
>
> **Por que B**: série temporal é o caso de uso do Timestream — o guia pede *"Determining cost-effective AWS database types (for example, time series format, columnar format)"*.
> **A errada**: relacional genérico para série temporal custa mais e escala pior.
> **C errada**: funciona (é um padrão real), mas não é o serviço purpose-built; perde em compressão e em funções de janela temporal.
> **D errada**: bom para análise em lote, não para consulta operacional por janela.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| São 5 pilares | **Seis** (Sustainability entrou em 2021) |
| A AWS cuida da segurança, ponto | A AWS cuida **da** nuvem; você cuida **na** nuvem |
| A fronteira é fixa | **Move com o serviço**: EC2 ≠ RDS ≠ Lambda |
| AWS Artifact mostra a conformidade da minha conta | Mostra a conformidade **da AWS**. A sua é Security Hub / Config |
| Multi-AZ protege de falha regional | Protege de falha de **AZ**. Falha regional = multi-Region |
| Todos os serviços são regionais | IAM, Route 53, CloudFront e WAF-para-CloudFront são **globais** |
| Dado replica entre regiões por padrão | **Nunca.** É sempre decisão explícita |

## Links

- [[00 - START HERE (indice da prova)]]
- [[01 - Dominio 1 - Design Secure Architectures (30%)]]
- [[IAM, STS e Organizations]]
- [Os pilares do Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/the-pillars-of-the-framework.html)
