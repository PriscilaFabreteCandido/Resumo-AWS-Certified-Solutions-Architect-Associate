---
tags: [saa-c03, dominio-2, ecs, eks, fargate, lambda, step-functions]
dominio: 2
tasks: [2.1]
atualizado: 2026-11-08
---

# Containers e serverless — ECS, EKS, Fargate, Lambda e Step Functions

## 🧩 Em 30 segundos

| Precisa de | Escolha |
|---|---|
| Função curta, orientada a evento, pagar por invocação | **Lambda** |
| Container sem gerenciar servidor | **Fargate** (como capacidade do ECS ou do EKS) |
| Container com controle do host, GPU, daemon, instância específica | **ECS no EC2** |
| Kubernetes (já usa, quer portabilidade/ecossistema) | **EKS** |
| Orquestrar vários passos com retry, catch, paralelismo | **Step Functions** |
| Job em lote com fila e dependências | **AWS Batch** |

**Lambda**: **15 min** de timeout, **10.240 MB** de memória, **1.000** de concorrência padrão.
**Step Functions**: **Standard** = exactly-once, até 1 ano. **Express** = at-least-once, até 5 min.

## 🧠 Teste-se primeiro

> [!question]- Limites do Lambda, de cabeça
> Memória **128 MB a 10.240 MB** (1 MB de passo; **1.769 MB ≈ 1 vCPU**) · timeout **900 s (15 min)** · `/tmp` **512 MB a 10.240 MB** · pacote **.zip 50 MB comprimido / 250 MB descomprimido** (inclui layers) · imagem de container **10 GB** · payload **6 MB** síncrono (request e response) e **1 MB** assíncrono · response streaming **200 MB** · **5 layers** · variáveis de ambiente **4 KB** no total · concorrência padrão **1.000** por região · escala de **1.000** ambientes a cada **10 s** por função.

> [!question]- Reserved × provisioned concurrency
> **Reserved**: *"sets both the maximum and minimum number of concurrent instances"*. **Sem custo adicional.** Garante cota para a função **e** serve para estrangular (valor **0** desliga a função). Você pode reservar até *"Unreserved account concurrency value minus 100"*.
> **Provisioned**: *"the number of pre-initialized execution environments... designed to make functions available with double-digit millisecond response times"*. **Tem custo adicional.** É a resposta para **cold start** em carga interativa e sensível a latência.

> [!question]- Standard × Express no Step Functions
> | | **Standard** | **Express** |
> |---|---|---|
> | Duração | até **1 ano** | até **5 minutos** |
> | Semântica | **exactly-once** | **at-least-once** (assíncrono) / at-most-once (síncrono) |
> | Taxa de execução | 2.000/s | **100.000/s** |
> | Transições de estado | 4.000/s | *"Nearly unlimited"* |
> | Preço | por **transição de estado** | por **número e duração** de execuções + memória |
> | Histórico | no Step Functions, **90 dias** | **CloudWatch Logs** |
> | Suporta `.sync` e `.waitForTaskToken` | **Sim** | **Não** (só Request Response) |
> | Distributed Map / Activities | Sim | Não |
>
> Citação decisiva: Standard é para *"long-running, auditable workflows"* e casos **não idempotentes** como *"starting an Amazon EMR cluster or processing payments"*. Express é *"better suited for orchestrating idempotent actions"*.
> ⚠️ O tipo de workflow é **imutável** depois de criado.

> [!question]- ECS: o que o Fargate tira das suas mãos?
> Com **EC2**: *"You choose the instance type, the number of instances, and manage the capacity"* — você patcheia o SO, dimensiona o cluster, gerencia AMI.
> Com **Fargate**: *"you don't need to manage servers, handle capacity planning, or isolate container workloads for security"*.
> Existe também **ECS Managed Instances** (a AWS gerencia provisionamento, patch e escala das instâncias EC2) e **ECS Anywhere** (seus servidores on-premises).

## ECS — vocabulário que cai

| Termo | Definição oficial |
|---|---|
| **Task definition** | *"The blueprint for the application"* — JSON com imagem, portas, volumes, parâmetros |
| **Cluster** | *"The infrastructure your application runs on"* |
| **Task** | *"An application such as a batch job that performs work, and then stops"* |
| **Service** | *"A long running stateless application"* — o scheduler substitui tasks que falham para manter o *desired count* |
| **Capacity provider** | Liga o service à capacidade (Fargate, EC2 Auto Scaling group) |

Rede: task em **EC2** roda na subnet da instância; task em **Fargate** tem a subnet definida no `run-task` ou no service. Saída para internet: subnet pública com IGW, subnet privada com **NAT gateway**, ou **PrivateLink**.

> [!tip] ECS × EKS, o divisor de prova
> **EKS** quando o enunciado diz **Kubernetes**, menciona ferramentas do ecossistema (Helm, operators), ou fala de **portabilidade entre nuvens / on-premises**.
> **ECS** quando é "container na AWS" sem mais contexto — menos esforço operacional, integração nativa mais simples.
> Em **ambos**, o Fargate é a resposta para "sem gerenciar servidor".

## ❓ Questões de prova

> [!example]- Q1 — Uma API precisa responder em menos de 100 ms, mas tem picos de tráfego e sofre cold start no Lambda. O que configurar?
> **A)** Aumentar a memória da função
> **B)** **Provisioned concurrency** ✅
> **C)** Reserved concurrency
> **D)** Migrar para Fargate
>
> **Por que B**: ambientes pré-inicializados, *"designed to make functions available with double-digit millisecond response times"*. É literalmente o remédio para cold start.
> **A errada**: mais memória dá mais CPU e acelera a execução, mas não elimina a inicialização.
> **C errada**: reserved **limita** concorrência (teto e piso de cota) — não pré-inicializa nada. É a troca mais comum na prova.
> **D errada**: resolve cold start, mas é mudança de arquitetura sem necessidade; o enunciado só pede latência previsível.

> [!example]- Q2 — Um workflow de processamento de pagamento tem 6 passos, pode levar até 2 horas, e **nenhum passo pode executar duas vezes**. Qual solução?
> **A)** Step Functions Express workflow
> **B)** **Step Functions Standard workflow** ✅
> **C)** Lambda chamando Lambda em cadeia
> **D)** SQS FIFO com um consumidor por etapa
>
> **Por que B**: Standard é **exactly-once**, dura até **1 ano** e é recomendada explicitamente para casos não idempotentes como *"processing payments"*.
> **A errada**: Express é **at-least-once** e morre em **5 minutos** — falha nos dois requisitos.
> **C errada**: Lambda tem teto de **15 min** e você reimplementa retry, estado e observabilidade.
> **D errada**: dá ordem e exactly-once por mensagem, mas não orquestra ramificação, retry por passo nem espera; é construir Step Functions na mão.

> [!example]- Q3 — Um time quer rodar containers em produção com o **menor esforço operacional**, sem gerenciar instâncias, e não usa Kubernetes hoje. Qual escolha?
> **A)** EKS com nós gerenciados
> **B)** **ECS com Fargate** ✅
> **C)** ECS no EC2 com Auto Scaling group
> **D)** EC2 com Docker e scripts de deploy
>
> **Por que B**: ECS é o orquestrador mais simples na AWS e o Fargate elimina o gerenciamento de servidor — *"you don't need to manage servers, handle capacity planning"*.
> **A errada**: EKS traz o plano de controle Kubernetes para operar, sem que o time precise disso.
> **C errada**: você volta a gerenciar AMI, patch e capacidade.
> **D errada**: pior esforço operacional possível.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Lambda roda até 5 minutos | **15 minutos (900 s)**. O limite de 5 min é do Step Functions **Express** |
| Lambda tem 512 MB de memória máxima | **10.240 MB**. 512 MB é o **mínimo** do `/tmp` |
| Reserved concurrency evita cold start | **Provisioned** é que evita. Reserved limita cota |
| Reserved concurrency custa a mais | *"incurs no additional charges"*. **Provisioned** é que custa |
| Lambda não roda em VPC | Roda — e aí consome ENIs da VPC |
| Payload de 10 MB cabe em invocação síncrona | **6 MB** síncrono, **1 MB** assíncrono |
| Express é melhor por ser mais rápido | **At-least-once** e 5 min. Para passo não idempotente, Standard |
| Posso trocar Standard para Express depois | O tipo é **imutável** |
| Fargate é só para ECS | Fargate também é capacidade para **EKS** |
| Fargate dá acesso ao host | Não. Se precisa de GPU, daemon ou controle do host, é **EC2** |
| EKS é "ECS com Kubernetes", dá no mesmo | EKS traz o plano de controle Kubernetes — mais poder e **mais esforço operacional** |

## Links

- [[02 - Dominio 2 - Design Resilient Architectures (26%)]]
- [[Desacoplamento - SQS, SNS e EventBridge]]
- [[API Gateway]]
- [[Custo de computacao - Spot, RI e Savings Plans]]
- [Quotas do Lambda](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html)
- [Escolhendo o tipo de workflow](https://docs.aws.amazon.com/step-functions/latest/dg/choosing-workflow-type.html)
