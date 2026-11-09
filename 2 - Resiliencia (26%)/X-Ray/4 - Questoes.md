---
tags: [saa-c03, x-ray, questoes]
servico: AWS X-Ray
atualizado: 2026-11-08
---

# X-Ray — Questões

> [!question]- Q1. Uma arquitetura de microsserviços está lenta, mas cada serviço mostra métricas normais no CloudWatch.
> **A)** Logs Insights consultando todos os log groups
> **B)** **AWS X-Ray, com o service map identificando onde a latência se concentra** ✅
> **C)** Container Insights
> **D)** VPC Flow Logs
>
> **Por que B**: métrica agregada por serviço não segue **uma** requisição; o trace, sim.
> **A errada**: você correlacionaria logs de N serviços à mão.
> **C errada**: dá métrica de infraestrutura do container, não o caminho da requisição.

> [!question]- Q2. É preciso filtrar traces por `tenant_id` para investigar a lentidão de um cliente específico.
> **A)** Gravar o `tenant_id` em **metadata**
> **B)** **Gravar o `tenant_id` em **annotation**** ✅
> **C)** Usar um log group por tenant
> **D)** Criar um trace ID customizado
>
> **Por que B**: **annotations são indexadas** e permitem filtrar traces; metadata não.

> [!question]- Q3. O time quer tracing numa API Gateway **HTTP API**.
> **A)** Habilitar X-Ray no stage
> **B)** **Não é suportado: a HTTP API não tem X-Ray — use REST API, ou instrumente a Lambda** ✅
> **C)** Instalar o daemon
> **D)** Habilitar detailed monitoring
>
> **Por que B**: X-Ray está na lista de recursos que **só a REST API** tem.

> [!question]- Q4. Rastrear 100% das requisições de um endpoint crítico e uma fração do resto, controlando custo.
> **A)** Habilitar active tracing em todas as funções
> **B)** **Configurar sampling rules específicas por URL/serviço** ✅
> **C)** Reduzir a retenção dos traces
> **D)** Usar metadata em vez de annotation
>
> **Por que B**: as sampling rules definem a taxa, e podem ser condicionadas a serviço, método e URL.

> [!question]- Q5. Qual destes está **em escopo** na SAA-C03?
> **A)** AWS CDK
> **B)** AWS CodeDeploy
> **C)** **AWS X-Ray** ✅
> **D)** AWS Distro for OpenTelemetry
>
> **Por que C**: X-Ray é o único item de "Developer Tools" na lista de serviços **em escopo**; os outros três estão na lista de **fora de escopo**.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| X-Ray está fora de escopo porque é Developer Tools | **Está em escopo** — é o único dessa categoria |
| Metadata permite filtrar traces | Só **annotation** é indexada |
| X-Ray funciona na HTTP API | Só na **REST API** |
| X-Ray substitui o CloudWatch | CloudWatch é **métrica e log**; X-Ray é **trace** |
| X-Ray rastreia 100% por padrão | Há **sampling** |
| Em ECS/EC2 funciona sem nada | Precisa do **daemon** (ou collector) e do **SDK** |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
