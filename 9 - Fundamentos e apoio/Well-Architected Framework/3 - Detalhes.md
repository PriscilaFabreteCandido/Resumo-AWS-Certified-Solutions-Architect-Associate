---
tags: [saa-c03, well-architected, detalhes]
conceito: AWS Well-Architected Framework
atualizado: 2026-11-08
---

# Well-Architected — Detalhes

## 1. Por que ele é o gabarito da prova

A SAA-C03 não pergunta "o que é o serviço X". Ela descreve um requisito e oferece quatro desenhos plausíveis. O que separa o certo dos errados é quase sempre um **princípio** do framework.

Por isso vale ler os seis pilares como **critérios de desempate**:

| Quando duas alternativas funcionam | Prefira a que |
|---|---|
| Uma usa script, outra usa serviço gerenciado | **Operational Excellence**: menos esforço operacional |
| Uma guarda credencial, outra usa role | **Security**: menor privilégio, credencial temporária |
| Uma é Single-AZ, outra é Multi-AZ | **Reliability** (se o enunciado pedir HA) |
| Uma aumenta a instância, outra adiciona cache | **Performance Efficiency**: serviço purpose-built |
| Uma paga 24/7, outra paga por uso | **Cost Optimization** (se o enunciado pedir custo) |

## 2. Os pilares, com o que cada um cobra na prática

**Operational Excellence** — *"a commitment to build software correctly while consistently delivering a great customer experience"* (o compromisso de construir software corretamente, entregando de forma consistente uma ótima experiência ao cliente). Áreas: Organization, Prepare, Operate, Evolve.
Na prova: **IaC** (CloudFormation), automação (SSM Automation, EventBridge), observabilidade (CloudWatch, X-Ray), **immutable infrastructure** (AMI nova + instance refresh).

**Security** — *"the ability to protect data, systems, and assets"*. Sete áreas, incluindo **Detection** e **Data protection**.
Na prova: é o domínio 1 inteiro — IAM, SCP, KMS, ACM, SG/NACL, WAF/Shield, GuardDuty/Macie/Inspector.

**Reliability** — *"perform its intended function correctly and consistently when it's expected to"*, incluindo *"the ability to operate and test the workload through its total lifecycle"* (a capacidade de operar e testar a carga de trabalho ao longo de todo o seu ciclo de vida). Áreas: Foundations, Workload architecture, Change management, **Failure management**.
Na prova: Multi-AZ, desacoplamento, Auto Scaling, DR com RPO/RTO, **quota conferida no standby**.

**Performance Efficiency** — *"use cloud resources efficiently... and to maintain that efficiency as demand changes and technologies evolve"*. Áreas: Architecture selection, Compute and hardware, Data management, Networking and content delivery, Process and culture.
Na prova: serviço purpose-built, cache (CloudFront/ElastiCache/DAX), escala horizontal, serverless.

**Cost Optimization** — *"run systems to deliver business value at the lowest price point"*. Áreas incluem **Practice Cloud Financial Management** e **Optimize over time**.
Na prova: classe/tipo correto, compromisso quando estável, desligar o ocioso, não pagar HA em dev.

**Sustainability** — *"environmental impacts, especially energy consumption and efficiency"*. Áreas incluem **Region selection**.
Na prova: raramente é a resposta sozinha, mas reforça rightsizing, serverless e gerenciado.

## 3. O princípio citado duas vezes

> **"Using purpose-built AWS services for workloads"** (usar serviços da AWS feitos sob medida para cada carga de trabalho) — skill repetida em **Task 2.1** e **Task 2.2**.

É o princípio mais rentável da prova. Exemplos:

| Problema | Purpose-built | Genérico adaptado (errado) |
|---|---|---|
| Grafo | **Neptune** | SQL com joins recursivos |
| Série temporal | **Timestream** | RDS com índice de data |
| Busca textual | **OpenSearch** | `LIKE '%termo%'` |
| HPC + S3 | **FSx for Lustre** | EFS |
| SFTP de parceiros | **Transfer Family** | Servidor SFTP em EC2 |
| Analítico em petabytes | **Redshift** | RDS com read replicas |
| Fila | **SQS** | Tabela de "jobs" no banco |

## 4. O trade-off que a prova sempre explicita

Os pilares **conflitam**, e o enunciado diz qual vence:

| Frase no enunciado | Pilar vencedor |
|---|---|
| *"most cost-effective"* / *"lowest cost"* | **Cost Optimization** |
| *"highly available"* (altamente disponível) / *"fault tolerant"* | **Reliability** |
| *"least operational overhead"* (menor esforço operacional) | **Operational Excellence** |
| *"lowest latency"* / *"highest throughput"* | **Performance Efficiency** |
| *"compliance"* / *"must not be accessible"* | **Security** |

Ler esse qualificador é metade da prova. Multi-AZ em dev viola Cost Optimization; Single-AZ em produção viola Reliability — qual está errado depende da frase.

## 5. A Well-Architected Tool

Conduz a revisão na console: você responde perguntas por pilar e recebe riscos classificados e um plano de melhoria. Está na lista oficial de serviços **em escopo** (categoria Management and Governance).

## Links

- [[9 - Fundamentos e apoio/Well-Architected Framework/1 - O que e|1 - O que e]] · [[9 - Fundamentos e apoio/Well-Architected Framework/2 - Decorar|2 - Decorar]] · [[9 - Fundamentos e apoio/Well-Architected Framework/4 - Questoes|4 - Questoes]]
- [[9 - Fundamentos e apoio/Responsabilidade compartilhada/1 - O que e|Responsabilidade compartilhada]] · [[9 - Fundamentos e apoio/Disaster Recovery (RPO e RTO)/1 - O que e|Disaster Recovery (RPO e RTO)]] · [[01 - Palavras-chave (decoder de enunciado)]] · [[1 - Seguranca (30%)/Governanca (Artifact, Trusted Advisor, Service Catalog)/1 - O que e|Governanca (Artifact, Trusted Advisor, Service Catalog)]]
