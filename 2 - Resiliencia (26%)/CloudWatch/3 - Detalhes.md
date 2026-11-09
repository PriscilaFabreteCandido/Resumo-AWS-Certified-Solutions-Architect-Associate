---
tags: [saa-c03, cloudwatch, detalhes]
servico: Amazon CloudWatch
atualizado: 2026-11-08
---

# CloudWatch — Detalhes

## 1. O que o hipervisor vê — e o que não vê

As métricas padrão do EC2 vêm do **hipervisor**: CPU, rede, operações de disco, status checks. Ele **não** enxerga dentro do sistema operacional, então **uso de memória** e **espaço livre em disco** simplesmente não existem como métrica padrão.

Para obtê-las, instale o **CloudWatch agent** (que também envia logs do SO e da aplicação). Isso exige uma **IAM role** na instância com permissão de `cloudwatch:PutMetricData` e `logs:*`.

⚠️ **Detailed monitoring** é frequentemente oferecido como distrator: ele muda a **frequência** (5 min → 1 min), **não** adiciona métricas de dentro do SO.

## 2. Alarmes

Um alarme avalia uma métrica (ou uma expressão de *metric math*) contra um limite, por N períodos.

| Ação | Uso |
|---|---|
| **SNS** | Notificar pessoa ou disparar Lambda |
| **Auto Scaling** | Escalar o ASG (base do step e do simple scaling) |
| **Ação de EC2** | **Recover** (instância com falha de hardware), stop, terminate, reboot |
| **Systems Manager** | Abrir incidente / rodar automação |

**Composite alarm** combina alarmes com lógica booleana — serve para reduzir ruído ("alarme só se CPU alta **E** latência alta").

**`INSUFFICIENT_DATA`** importa: uma métrica que deixa de ser publicada (porque a instância morreu) não vai para ALARM — vai para INSUFFICIENT_DATA. Configure o tratamento de dados ausentes conforme o caso.

## 3. Logs

**Log group** (por aplicação/serviço) → **log streams** (por instância/execução).

Pontos de prova:

| Fato | Detalhe |
|---|---|
| Retenção padrão | **"Never expire"** — fonte de custo silencioso. Em lab, configure 1 ou 3 dias |
| **Metric filter** | Transforma padrão de log (`ERROR`, `5xx`) em **métrica**, e daí em **alarme** |
| **Logs Insights** | Consulta com linguagem própria, sobre log groups |
| **Subscription filter** | Envia logs em tempo quase real para **Lambda**, **Firehose**, **Kinesis** ou **OpenSearch** |
| **Export para S3** | Arquivamento barato, consultável depois com Athena |
| Criptografia | KMS no log group |

O padrão "alertar sobre erro na aplicação" é: log → **metric filter** → métrica → **alarme** → SNS.

## 4. Dashboards e Synthetics

**Dashboards** podem ser **cross-account e cross-Region** — é o painel único de operação.

**Synthetics canary** faz requisições sintéticas a um endpoint em intervalos, medindo disponibilidade e latência do ponto de vista do usuário. Resposta para "detectar que o site está fora **antes** do cliente reclamar".

## 5. Multi-conta

**CloudWatch cross-account observability** liga contas de origem a uma **conta de monitoramento**, que passa a ver métricas, logs e traces de todas. É a resposta para "centralizar observabilidade de 40 contas".

## 6. CloudWatch × CloudTrail × Config × X-Ray

| | **CloudWatch** | **CloudTrail** | **AWS Config** | **X-Ray** |
|---|---|---|---|---|
| Registra | **Métricas e logs** | **Chamadas de API** | **Configuração** e histórico | **Trace** da requisição |
| Responde | *"A CPU está alta?"* | *"Quem deletou o bucket?"* | *"Como estava configurado? Está conforme?"* | *"Onde está o gargalo?"* |

Eles se complementam: Config diz **o que** mudou, CloudTrail diz **quem** mudou, CloudWatch diz **qual foi o efeito**, X-Ray diz **onde** dói.

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[CloudTrail]] · [[Config]] · [[X-Ray]] · [[Auto Scaling (EC2)]] · [[SQS]] · [[Ferramentas de custo (Cost Explorer, Budgets, CUR)]]
