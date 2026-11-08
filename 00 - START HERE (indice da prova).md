---
tags: [moc, indice, saa-c03]
exame: AWS Certified Solutions Architect - Associate (SAA-C03)
guia_oficial: versao 1.1, publicada em 29/10/2026
atualizado: 2026-11-08
---

# 🎯 START HERE — Índice da prova SAA-C03

> [!info] Qual prova é esta
> **AWS Certified Solutions Architect – Associate**, código **SAA-C03**.
> O guia oficial está na versão **1.1, publicada em 29/10/2026**. Não existe SAA-C04 anunciado pela AWS — se você vir "SAA-C04" em blog de terceiro, ignore: confira sempre a [página oficial do exame](https://aws.amazon.com/certification/certified-solutions-architect-associate/).
> O que o exame valida, nas palavras da AWS: *"the ability to design solutions based on the AWS Well-Architected Framework"*.

## Como a prova é montada

| Item | Valor |
|---|---|
| Questões que contam nota | **50** |
| Questões não pontuadas (não identificadas na tela) | **15** |
| Total que você vê | 65 |
| Nota mínima | **720** (escala de 100 a 1.000) |
| Modelo de nota | **Compensatório** — não precisa passar em cada domínio, só no total |
| Questão em branco | Conta como **errada**. *"Unanswered questions are scored as incorrect; there is no penalty for guessing."* |
| Tipos de questão | *Multiple choice* (1 certa de 4) e *multiple response* (2+ certas de 5+) |
| Experiência esperada | *"at least 1 year of hands-on experience designing cloud solutions"* |

> [!warning] Em *multiple response* você só pontua acertando **todas** as corretas. Não existe nota parcial.
> O guia oficial **não informa a duração** do exame. Confira no momento do agendamento.

## Os 4 domínios

| # | Domínio | Peso | Pasta / MOC |
|---|---|---|---|
| 1 | **Design Secure Architectures** | **30%** | [[01 - Dominio 1 - Design Secure Architectures (30%)]] |
| 2 | **Design Resilient Architectures** | **26%** | [[02 - Dominio 2 - Design Resilient Architectures (26%)]] |
| 3 | **Design High-Performing Architectures** | **24%** | [[03 - Dominio 3 - Design High-Performing Architectures (24%)]] |
| 4 | **Design Cost-Optimized Architectures** | **20%** | [[04 - Dominio 4 - Design Cost-Optimized Architectures (20%)]] |

Traduzindo em questões pontuadas (sobre as 50 que valem nota):

```
Seguranca     ███████████████  ~15 questões  (30%)
Resiliencia   █████████████    ~13 questões  (26%)
Performance   ████████████     ~12 questões  (24%)
Custo         ██████████       ~10 questões  (20%)
```

> [!tip] Leitura do peso
> **Segurança + Resiliência = 56%** da prova. Se o tempo for curto, é aí que rende mais.
> Mas atenção: os quatro domínios são **os mesmos serviços vistos por ângulos diferentes**. S3 aparece nos 4. RDS aparece em 3. A prova não pergunta "o que é o S3" — pergunta "qual classe do S3, considerando custo, durabilidade e latência".

## 🗂 Como as pastas estão organizadas

```
1 - Seguranca (30%)      IAM, STS e Organizations · KMS, CloudHSM e ACM
                         Rede segura (SG, NACL, endpoints) · WAF, Shield e Firewall Manager
                         Deteccao (GuardDuty, Macie, Inspector, Security Hub, Detective)
                         Identidade de aplicacao (Cognito, Directory Service, Secrets)
                         Protecao de dados no S3

2 - Resiliencia (26%)    Desacoplamento (SQS, SNS, EventBridge)
                         Alta disponibilidade (ELB, Auto Scaling, Route 53)
                         Bancos resilientes (RDS Multi-AZ, Read Replicas, Aurora)
                         Disaster Recovery (RTO e RPO)
                         Containers e serverless (ECS, EKS, Fargate, Lambda, Step Functions)

3 - Performance (24%)    Armazenamento (S3, EBS, EFS, FSx)
                         Computacao elastica (EC2, placement groups)
                         Bancos de alta performance (DynamoDB, DAX, ElastiCache, Redshift)
                         Rede e borda (CloudFront, Global Accelerator, DX, VPN, TGW)
                         Ingestao e transformacao (Kinesis, Glue, Athena, EMR)

4 - Custo (20%)          Custo de armazenamento (classes S3, lifecycle, EBS)
                         Custo de computacao (Spot, RI, Savings Plans)
                         Custo de rede (NAT, data transfer, endpoints)
                         Ferramentas de custo (Cost Explorer, Budgets, CUR)

9 - Fundamentos e apoio  Well-Architected e responsabilidade compartilhada
                         Migracao (7 Rs, Snow, DataSync, Storage Gateway, DMS)
                         Observabilidade (CloudWatch, CloudTrail, Config)
```

## 🚀 As 4 notas que você mais vai reler

1. [[01 - Palavras-chave (decoder de enunciado)]] — tradução de frase do enunciado → serviço. É o atalho mais rentável da prova.
2. [[02 - Numeros para decorar]] — tudo que é número, numa página só.
3. [[03 - Pegadinhas mestre]] — a tabela "o que parece × o que é". Releia na véspera.
4. [[04 - Fora de escopo (nao estude isso)]] — o que a AWS declara fora da prova. Evita semanas desperdiçadas.

Apoio: [[05 - Plano de estudo (e como praticar sem levar susto na fatura)]]

## 📖 Como estudar com estas notas

Toda nota segue a mesma ordem, desenhada para você **recuperar** a informação em vez de reler:

| Seção | O que fazer |
|---|---|
| **🧩 Em 30 segundos** | O essencial absoluto. Na véspera, leia **só isso** em todas as notas. |
| **🧠 Teste-se primeiro** | Perguntas dobráveis. Responda de cabeça, **depois** clique. Não abra antes. |
| **Conteúdo** | Blocos curtos, com os números e as citações oficiais. |
| **❓ Questões de prova** | Alternativas A-D dobráveis, com **por que cada errada está errada**. |
| **⚠️ Armadilhas** | A tabela "parece × é". |

> [!tip] A rotina que rende mais
> **1ª passada**: leia a nota inteira, uma vez.
> **Depois**: volte só no *Teste-se primeiro* e nas *Questões*, sem reler o conteúdo. Se errar, aí sim abra a seção.
> Reler nota já lida é a forma menos eficiente de estudar; se testar é a mais eficiente.

> [!warning] Os callouts dobráveis precisam ser clicados
> Se as perguntas aparecerem já abertas, o tema do Obsidian não suporta callouts recolhíveis. Troque para o tema padrão (Configurações → Aparência).

## Fontes oficiais

- [Exam guide SAA-C03 (HTML)](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html)
- [Technologies and Concepts](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/saa-technologies-concepts.html)
- [Serviços em escopo](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/saa-03-in-scope-services.html)
- [Serviços fora de escopo](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/saa-03-out-of-scope-services.html)
- [Revisões do guia](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/saa-03-revisions.html)

> [!note] O guia avisa: *"Exam guide updates will be published approximately one month before updates will be reflected on your exam."*
> Vale reconferir o guia **um mês antes** da sua data.
>
> Todo conteúdo deste vault foi conferido contra `docs.aws.amazon.com` em **08/11/2026**. Onde a documentação oficial não afirma um número, a nota diz isso em vez de inventar.
