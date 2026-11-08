---
tags: [saa-c03, waf, borda, seguranca]
servico: AWS WAF
tipo: Firewall de aplicação (camada 7)
dominios: [1]
atualizado: 2026-11-08
---

# AWS WAF — O que é

> [!info] Em uma frase
> Firewall de aplicação web: inspeciona **requisições HTTP/HTTPS** e permite, bloqueia, conta ou desafia, conforme regras — incluindo **SQL injection**, **XSS** e **rate limiting** por IP.

## O que ele inspeciona

> *"the HTTP and HTTPS requests that are forwarded to your protected web application resources."*

Critérios disponíveis: **IP de origem**, **país**, valores de **header**, strings e **regex**, **tamanho** da requisição, **SQL injection** e **cross-site scripting**.

## A onde se associa (lista oficial completa)

| Recurso |
|---|
| **Amazon CloudFront distribution** |
| **Amazon API Gateway REST API** |
| **Application Load Balancer** |
| AWS AppSync GraphQL API |
| **Amazon Cognito user pool** |
| AWS App Runner service |
| Amazon Bedrock AgentCore Gateway |
| AWS Verified Access instance |
| AWS Amplify |

> [!warning] WAF **não** funciona em NLB nem em EC2 direto
> Se a aplicação está atrás de um **Network Load Balancer**, você precisa pôr um ALB ou CloudFront na frente para usar o WAF. É a pegadinha nº 1 do tema.

## WAF × Shield × SG × NACL

| O atacante está fazendo | Serviço |
|---|---|
| Payload malicioso (SQL injection, XSS), flood HTTP de um IP | **WAF** |
| Flood volumétrico de rede (SYN flood, UDP reflection) | **Shield** |
| Batendo em porta/protocolo que não deveria estar aberto | **Security group** |
| Precisa ser bloqueado por IP na subnet inteira | **NACL** |

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[Shield]] · [[Firewall Manager]] · [[CloudFront]] · [[ELB (Load Balancers)]]
- [O que é o AWS WAF](https://docs.aws.amazon.com/waf/latest/developerguide/what-is-aws-waf.html)
