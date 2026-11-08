---
tags: [saa-c03, waf, decorar]
servico: AWS WAF
atualizado: 2026-11-08
---

# WAF — Decorar

## As 4 ações de uma regra

| Ação | O que faz |
|---|---|
| **Allow** | Deixa passar |
| **Block** | **HTTP 403 Forbidden** (ou resposta customizada) |
| **Count** | **Só conta** — modo de teste, não bloqueia |
| **CAPTCHA** / **Challenge** | Desafio visível ou silencioso |

> [!tip] "Avaliar o impacto da regra antes de ativar" → **Count**

## Rate-based rule

> *"rules can block or count web requests that not only meet the specified criteria, but also exceed a specified number of requests in a minute or in five minutes."*

Janela: **1 minuto** ou **5 minutos** — **não** por segundo.

## Recursos suportados (decore os quatro principais)

**CloudFront** · **API Gateway REST API** · **Application Load Balancer** · **Cognito user pool**
(mais AppSync, App Runner, Bedrock AgentCore Gateway, Verified Access, Amplify)

**Não suportados**: NLB, GWLB, EC2 direto, API Gateway **HTTP API**.

## Vocabulário

| Termo | O que é |
|---|---|
| **Web ACL** | O contêiner de regras, associado ao recurso |
| **Rule group** | Conjunto reutilizável de regras |
| **Managed rule group** | Regras prontas da AWS ou de parceiros (OWASP Top 10, bots, anti-DDoS L7) |
| **WCU** (web ACL capacity unit) | Unidade de capacidade da web ACL |
| **Logging** | Para CloudWatch Logs, S3 ou Firehose |

## Relação com o Shield Advanced

A assinatura do **Shield Advanced** cobre o custo padrão do WAF nos recursos protegidos (web ACL, por regra, preço base por milhão de requisições) até **1.500 WCUs**, e inclui até **50 bilhões** de requisições por mês. A mitigação automática de camada 7 adiciona um rule group de **150 WCUs**.

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
