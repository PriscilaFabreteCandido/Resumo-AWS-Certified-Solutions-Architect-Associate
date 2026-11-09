---
tags: [saa-c03, x-ray, decorar]
servico: AWS X-Ray
atualizado: 2026-11-08
---

# X-Ray — Decorar

## O vocabulário

| Termo | O que é |
|---|---|
| **Trace** | O caminho completo de **uma** requisição pelo sistema |
| **Segment** | O trabalho de **um** serviço dentro do trace |
| **Subsegment** | Uma chamada dentro do segmento (query no banco, chamada HTTP) |
| **Service map** | O grafo visual: nós (serviços) e arestas (chamadas), com latência e taxa de erro |
| **Sampling rule** | Quantas requisições rastrear (para não instrumentar 100% e explodir custo) |
| **Annotation** | Par chave-valor **indexado** — dá para **filtrar** por ele |
| **Metadata** | Par chave-valor **não indexado** — não filtra |

> [!tip] Annotation × metadata
> Se você quer **buscar** traces por aquele valor (`customer_id`, `tenant`), é **annotation**. Se é só contexto para leitura, é **metadata**.

## O que o service map mostra

- **Latência** por serviço (p50, p90, p99)
- **Taxa de erro** (4xx), **falha** (5xx) e **throttle**
- O **nó** onde o tempo se concentra

## Onde está em escopo

| Categoria | Em escopo? |
|---|---|
| **AWS X-Ray** | **✅ Sim** (único de Developer Tools) |
| AWS CDK | ❌ |
| CodeBuild, CodeCommit, CodeDeploy, CodeArtifact | ❌ |
| CloudShell, Fault Injection Simulator | ❌ |
| AWS Distro for OpenTelemetry | ❌ |

## Integração com API Gateway

| Tipo | X-Ray |
|---|---|
| **REST API** | **✅** |
| **HTTP API** | **❌** |
| WebSocket API | — |

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
