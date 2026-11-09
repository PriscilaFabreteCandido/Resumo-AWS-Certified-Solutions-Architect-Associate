---
tags: [saa-c03, x-ray, detalhes]
servico: AWS X-Ray
atualizado: 2026-11-08
---

# X-Ray — Detalhes

## 1. O problema que só ele resolve

Numa arquitetura de microsserviços, a requisição passa por API Gateway → Lambda → DynamoDB → outra Lambda → serviço externo. Quando o usuário reclama de lentidão, o CloudWatch mostra que **cada** serviço está dentro do normal — mas a soma não está.

O X-Ray costura os pedaços: cada serviço emite um **segment** com o mesmo **trace ID**, e o X-Ray monta o **trace** completo e o **service map**.

Resultado: você vê que 80% do tempo está numa chamada a um serviço externo, ou numa query específica — informação que métrica agregada não dá.

## 2. Como os dados chegam

| Ambiente | Como |
|---|---|
| **Lambda** | Habilitar *Active tracing* na função (o runtime emite os segments) |
| **API Gateway (REST)** | Habilitar X-Ray no stage |
| **ECS / EKS / EC2** | Rodar o **X-Ray daemon** (ou o OpenTelemetry collector) como sidecar/processo |
| **Elastic Beanstalk** | Opção de configuração da plataforma |
| **Código** | **X-Ray SDK** instrumenta chamadas de saída (SDK AWS, HTTP, SQL) |

O **trace ID** é propagado pelo header `X-Amzn-Trace-Id` — é o que liga os segments de serviços diferentes.

## 3. Sampling

Rastrear 100% das requisições é caro e desnecessário. As **sampling rules** definem a taxa: por padrão, algo como "1 requisição por segundo, mais 5% do excedente".

Regras podem ser condicionadas a serviço, método HTTP, URL — então você pode rastrear **100%** de um endpoint crítico e 1% do resto.

## 4. Annotations e metadata

Ambos adicionam contexto ao segment, mas só **annotations** são **indexadas**:

| | **Annotation** | **Metadata** |
|---|---|---|
| Indexada | **Sim** | Não |
| Permite filtrar traces | **Sim** | Não |
| Use para | `tenant_id`, `customer_tier`, `feature_flag` | Payload, detalhe de debug |

Na prova: *"identificar os traces de um cliente específico"* → **annotation**.

## 5. X-Ray × as alternativas

| Ferramenta | Natureza |
|---|---|
| **X-Ray** | **Trace** da requisição entre serviços, com service map |
| **CloudWatch metrics** | Agregado por serviço — não segue a requisição |
| **CloudWatch Logs Insights** | Consulta logs; você correlaciona à mão |
| **CloudWatch ServiceLens** | Junta X-Ray + métricas + logs numa visão |
| **Container / Lambda Insights** | Métricas de infraestrutura de container e função |
| **Amazon Managed Grafana / Prometheus** | Observabilidade compatível com ecossistema open source |
| ⚠️ **AWS Distro for OpenTelemetry** | **Fora de escopo** na SAA-C03 |

## 6. Onde ele aparece em prova

| Enunciado | Resposta |
|---|---|
| "identificar o **gargalo** numa arquitetura de microsserviços" | **X-Ray** |
| "qual chamada **downstream** está lenta" | **X-Ray** |
| "visualizar as **dependências** entre serviços" | **X-Ray** (service map) |
| "**workload visibility**" (termo do guia) | **X-Ray** |
| "a CPU está alta" | **CloudWatch** |
| "quem fez a chamada" | **CloudTrail** |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[CloudWatch]] · [[Lambda]] · [[API Gateway]] · [[ECS]] · [[04 - Fora de escopo (nao estude isso)]]
