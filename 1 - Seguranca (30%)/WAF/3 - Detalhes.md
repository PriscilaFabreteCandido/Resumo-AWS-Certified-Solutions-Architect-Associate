---
tags: [saa-c03, waf, detalhes]
servico: AWS WAF
atualizado: 2026-11-08
---

# WAF — Detalhes

## 1. Onde associar a web ACL

A escolha do ponto de associação muda o comportamento:

| Associado a | Efeito |
|---|---|
| **CloudFront** | Filtra na **borda**, antes de o tráfego chegar à região. Melhor para ataque global e para proteger origem |
| **ALB** | Filtra na região, com visibilidade de todos os headers já processados |
| **API Gateway REST** | Filtra a API. ⚠️ Só REST — **HTTP API não suporta WAF** |
| **Cognito user pool** | Protege o **endpoint de login** (credential stuffing) |

Para aplicação global, o padrão é **WAF no CloudFront** — o bloqueio acontece no POP mais próximo do atacante.

## 2. Managed rule groups

Em vez de escrever regras, você habilita grupos prontos:

- **AWSManagedRulesCommonRuleSet** — OWASP Top 10 básico
- **AWSManagedRulesSQLiRuleSet** — SQL injection
- **AWSManagedRulesKnownBadInputsRuleSet** — payloads conhecidos
- **AWSManagedRulesBotControlRuleSet** — classificação de bots
- **AWSManagedRulesATPRuleSet** — account takeover prevention (protege login)
- **Layer 7 Anti-DDoS** — incluído na assinatura do Shield Advanced

A prova raramente pede o nome exato; pede o **conceito**: "usar regras gerenciadas em vez de escrever as próprias" é a resposta de menor esforço operacional.

## 3. Rate-based rule — detalhes

A janela é de **1 ou 5 minutos**, e o agrupamento pode ser por **IP de origem**, por header, por cookie, ou por valor derivado da requisição. Isso permite, por exemplo, limitar por **token de API** em vez de por IP — importante quando os clientes estão atrás de NAT.

Combinação típica de prova:

```
Regra 1 (Block)  → SQL injection (managed rule group)
Regra 2 (Block)  → rate-based: > 2000 req / 5 min por IP
Regra 3 (Allow)  → IP set de parceiros confiáveis, com prioridade maior
```

A **ordem (prioridade)** das regras importa: a avaliação segue a prioridade e a primeira ação terminal (Allow ou Block) encerra.

## 4. Geo restriction: WAF × CloudFront

As duas existem e a prova compara:

| | **CloudFront geo restriction** | **WAF geo match rule** |
|---|---|---|
| Granularidade | **Toda a distribuição** | Por **regra**, combinável com outros critérios |
| Flexibilidade | Allow list ou block list de países | País **+** path **+** header **+** rate, etc. |
| Resposta | **403** | Configurável |

Se o enunciado pede "bloquear um país **exceto** para um caminho específico", é **WAF**. Se é "bloquear países para o site todo", a geo restriction do CloudFront basta.

## 5. Logging e automação

Logs da web ACL vão para **CloudWatch Logs**, **S3** ou **Data Firehose**. Dali, o padrão de arquitetura é: Firehose → S3 → **Athena** para análise, e métricas no CloudWatch para alarme.

## 6. Multi-conta

**AWS Firewall Manager** aplica e audita web ACLs em **todas** as contas de uma AWS Organizations, garantindo que qualquer ALB ou distribuição nova receba a política corporativa automaticamente.

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[Shield]] · [[Firewall Manager]] · [[CloudFront]] · [[API Gateway]] · [[Cognito]]
