---
tags: [saa-c03, escopo, triagem]
atualizado: 2026-11-08
fonte: guia oficial SAA-C03, listas in-scope e out-of-scope
---

# 🚫 Fora de escopo — não estude isso

> [!important] Por que esta nota existe
> O guia oficial publica **duas listas**: serviços em escopo e serviços **fora** de escopo. Saber o que não cai economiza semanas.
> Aviso da própria AWS nas duas listas: *"This list is non-exhaustive and is subject to change."* Serviços fora de escopo podem aparecer como **distrator** (alternativa errada) — você precisa reconhecer o nome, não dominar o serviço.

## 🧩 Em 30 segundos

Fora de escopo, por categoria oficial:

- **Developer Tools (quase tudo)**: AWS CDK · CloudShell · CodeArtifact · CodeBuild · CodeCommit · CodeDeploy · Corretto · Fault Injection Simulator · AWS Tools and SDKs
- **Compute**: Amazon Lightsail
- **Database**: Amazon RDS on VMware
- **Application Integration**: Amazon MWAA (Managed Workflows for Apache Airflow)
- **Internet of Things**: **todos** os serviços
- **Machine Learning**: Apache MXNet on AWS · Deep Learning AMIs · Deep Learning Containers · HealthLake · Inferentia · Personalize · PyTorch on AWS · TensorFlow on AWS
- **Management and Governance**: AWS Console Mobile Application · AWS Distro for OpenTelemetry
- **Media Services**: toda a família Elemental (Appliances and Software, MediaConnect, MediaConvert, MediaLive, MediaPackage, MediaTailor) · Amazon IVS
- **Front-End Web and Mobile**: Amazon Location Service
- **Game Tech**: Amazon GameLift
- **Migration and Transfer**: Migration Evaluator
- **Networking**: AWS Cloud Map
- **Quantum**: Amazon Braket
- **Satellite**: AWS Ground Station

> [!warning] AWS X-Ray **está** em escopo
> É o único item de "Developer Tools" na lista de serviços **em escopo**. Ele aparece em *Task 2.2* como "workload visibility". Não ignore.

---

## 🧠 Teste-se primeiro

> [!question]- CloudFormation cai? E CDK?
> **CloudFormation cai** (está em Management and Governance, em escopo). **CDK está explicitamente fora de escopo.**
> Faz sentido: a prova testa *infrastructure as code* como conceito de arquitetura ("you should always deploy using infrastructure as code"), não a ferramenta de desenvolvedor.

> [!question]- Lightsail cai?
> **Não.** Está na lista out-of-scope. Se aparecer numa alternativa, é distrator.

> [!question]- Quais serviços de ML caem?
> Os de **alto nível, prontos para usar**: Comprehend, Lex, Polly, Rekognition, SageMaker AI, Textract, Transcribe, Translate.
> Não caem os de **infraestrutura de ML**: DLAMI, Deep Learning Containers, PyTorch/TensorFlow/MXNet on AWS, Inferentia, Personalize, HealthLake.
> Padrão da prova: *"Task 2.2 — AWS managed services with appropriate use cases (for example, Amazon Comprehend, Amazon Polly)"*. Ou seja: **reconhecer qual serviço de IA resolve qual problema**, não treinar modelo.

---

## Mudanças do guia (versão 1.0 → 1.1, 29/10/2026)

| Mudança | Serviço |
|---|---|
| **Removido** da lista em escopo | Amazon Elastic Transcoder |
| **Removidos** da lista fora de escopo | AWS DeepComposer · Amazon DevOps Guru · Amazon Elastic Inference · Amazon Managed Blockchain · Amazon Sumerian |

> [!note] Sair da lista de "fora de escopo" não significa entrar em escopo
> A lista de fora-de-escopo exclui, nas palavras da AWS, *"AWS offerings that are entirely unrelated to the target job roles"*. Serviços descontinuados simplesmente saem das duas listas. Nenhum desses cinco entrou na lista em escopo.

## Serviços em escopo que valem pouco (não zere, mas não invista)

Estão na lista oficial em escopo, mas raramente são a **resposta certa** — aparecem mais como distrator ou como "reconheça o nome":

| Serviço | O mínimo que você precisa saber |
|---|---|
| **AWS Device Farm** | Testar app mobile em dispositivos reais |
| **AWS Amplify** | Hospedar e construir front-end web/mobile |
| **AWS Proton** | Templates de infraestrutura self-service para times de plataforma |
| **AWS Serverless Application Repository** | Catálogo de apps serverless prontos |
| **VMware Cloud on AWS** | Rodar vSphere dentro da AWS (lift & shift de ambiente VMware) |
| **AWS Wavelength** | Borda de rede 5G de operadora, latência ultrabaixa para mobile |
| **AWS License Manager** | Rastrear licença de software (liga com Dedicated Host) |
| **AWS Data Pipeline** | Orquestração de dados de geração anterior (hoje se usa Glue/Step Functions) |
| **AWS Data Exchange** | Assinar datasets de terceiros |
| **Amazon AppFlow** | Transferir dados entre SaaS (Salesforce, Zendesk) e AWS sem código |
| **Amazon Kinesis Video Streams** | Ingerir vídeo de câmeras |
| **Amazon Managed Grafana / Prometheus** | Observabilidade gerenciada compatível com o ecossistema open source |
| **Amazon ECS/EKS Anywhere, EKS Distro** | Rodar ECS/EKS no seu datacenter |
| **AWS Well-Architected Tool** | Fazer a revisão Well-Architected na console |
| **AWS Health Dashboard** | Eventos de saúde que afetam **seus** recursos |
| **AWS Artifact** | Baixar relatórios de compliance (SOC, PCI, ISO) para o auditor |

> [!tip] Como a prova usa esses serviços periféricos
> Quase sempre numa questão de "qual serviço faz X", onde as outras três alternativas são serviços conhecidos usados fora de propósito. Saber a **frase de uma linha** de cada um já resolve.

## Serviços em escopo que **parecem** periféricos mas pesam

Não caia na armadilha inversa — estes estão na lista e caem de verdade:

- **AWS Control Tower** e **AWS Organizations** → citados literalmente em *Task 1.1* ("AWS Control Tower, service control policies [SCPs]")
- **AWS Resource Access Manager (RAM)** → compartilhamento entre contas
- **AWS Transfer Family** → citado em *Task 2.1* e *Task 4.1*
- **Amazon RDS Proxy** → citado em *Task 2.2* ("Proxy concepts")
- **AWS Outposts** → citado em *Task 4.2* ("Hybrid compute options")
- **AWS Compute Optimizer** → rightsizing, domínio de custo
- **AWS Network Firewall** e **AWS Firewall Manager** → segurança multi-conta
- **Amazon Quick** (ex-QuickSight) → citado em *Task 3.5* ("Data analytics and visualization services")
- **AWS Lake Formation** e **AWS Glue** → *Task 3.5* inteira é sobre ingestão e transformação

## Links

- [Lista oficial de serviços em escopo](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/saa-03-in-scope-services.html)
- [Lista oficial de serviços fora de escopo](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/saa-03-out-of-scope-services.html)
- [[00 - START HERE (indice da prova)]]
