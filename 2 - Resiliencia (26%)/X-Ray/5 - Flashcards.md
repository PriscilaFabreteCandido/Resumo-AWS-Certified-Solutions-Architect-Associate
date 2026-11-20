---
servico: AWS X-Ray
fonte: "[[2 - Resiliencia (26%)/X-Ray/2 - Decorar|2 - Decorar]]"
---

# X-Ray — Flashcards

#flashcards/saa-c03/d2-resiliencia/x-ray

O que é um trace no X-Ray?::O caminho completo de **uma requisição** pelo sistema

O que é um segment no X-Ray?::O trabalho de **um serviço** dentro do trace

O que é um subsegment no X-Ray?::Uma **chamada dentro do segmento** (query no banco, chamada HTTP)

Annotation × metadata no X-Ray: qual é indexada e filtrável?::**Annotation**; metadata não é indexada

Quero buscar traces por customer_id: annotation ou metadata?::**Annotation**

Para que serve uma sampling rule no X-Ray?::Definir **quantas requisições rastrear**, sem instrumentar 100% e explodir custo

O que é o service map do X-Ray?::Grafo de **serviços (nós)** e **chamadas (arestas)**, com latência e taxa de erro

O que o service map mostra sobre cada serviço?::**Latência** (p50, p90, p99), **erro** (4xx), **falha** (5xx), **throttle** e onde o tempo se concentra

Qual ferramenta de Developer Tools está em escopo na SAA-C03?::Só o **AWS X-Ray**

Qual tipo de API do API Gateway integra com X-Ray?::**REST API** (HTTP API não)
