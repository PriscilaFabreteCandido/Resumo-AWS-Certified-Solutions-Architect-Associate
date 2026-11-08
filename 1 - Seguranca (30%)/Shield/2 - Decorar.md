---
tags: [saa-c03, shield, decorar]
servico: AWS Shield
atualizado: 2026-11-08
---

# Shield — Decorar

## O que só o Advanced tem

| Recurso | Detalhe |
|---|---|
| **Mitigação automática na camada 7** | Adiciona um rule group de **150 WCUs** no WAF |
| **Shield Response Team (SRT)** | *"dedicated support from the Shield Response Team (SRT)"* |
| **Engajamento proativo** | *"the SRT can proactively contact you"* e, com seu consentimento, aplica regras de WAF |
| Visibilidade de evento | Detalhada, com métricas e relatórios |
| Cobertura de custo do WAF | Até **1.500 WCUs** e **50 bilhões** de requisições/mês |

> [!note] Atenção à sigla
> A documentação atual usa **SRT (Shield Response Team)**. Material antigo diz **DRT (DDoS Response Team)** — é o mesmo time, nome atualizado.

## Recursos que o Advanced protege

**EC2 instances** · **Elastic Load Balancing load balancers** · **CloudFront distributions** · **Route 53 hosted zones** · **Global Accelerator standard accelerators**

## Billing numa organização

> *"AWS bills the Shield Advanced subscriptions against the payer account for the organization."*

## Gatilhos no enunciado

| Frase | Resposta |
|---|---|
| "proteção DDoS" sem mais detalhe | **Shield Standard** (já está ativo, de graça) |
| "acesso a especialistas da AWS durante o ataque" | **Shield Advanced** (SRT) |
| "ser contatado proativamente pela AWS" | **Shield Advanced** |
| "mitigação automática de ataque de camada 7" | **Shield Advanced** |
| SQL injection, XSS, rate limiting | **WAF** (não Shield) |

> [!warning] Sobre "cost protection"
> O benefício de **créditos por escalonamento durante DDoS** é muito citado em cursos. As páginas de documentação que conferi **não o afirmam** — ele aparece na página de preços do Shield, não verificada aqui. Em prova, essa alternativa normalmente **é** a correta no contexto do Advanced, mas não a trate como fato documentado.

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
