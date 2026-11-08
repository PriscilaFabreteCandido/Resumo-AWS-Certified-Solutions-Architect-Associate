---
tags: [saa-c03, shield, detalhes]
servico: AWS Shield
atualizado: 2026-11-08
---

# Shield — Detalhes

## 1. O que você não precisa fazer

O Standard *"is provided automatically and at no extra charge when you use AWS"*. Não há o que habilitar, configurar ou pagar. Ele mitiga as camadas 3 e 4 e vetores conhecidos e zero-day na camada 7.

Isso significa que, numa questão de DDoS **volumétrico simples**, a resposta pode ser "nada a fazer, o Shield Standard já cobre" — e a alternativa que oferece Advanced é um upsell desnecessário.

## 2. Quando o Advanced se justifica

Três requisitos o puxam:

**Acesso ao SRT.** Durante um ataque de camada 7, casos críticos de clientes do Advanced *"are routed directly to DDoS experts"*.

**Engajamento proativo.** *"When AWS Shield Advanced detects a large application layer attack against one of your applications, the SRT can proactively contact you. The SRT triages the DDoS event and creates AWS WAF mitigations. The SRT contacts you and, with your consent, can apply the AWS WAF rules."*

**Mitigação automática na camada 7.** O Advanced adiciona ao WAF um rule group de anti-DDoS de camada 7 (**150 WCUs**) que se ajusta ao padrão de tráfego.

## 3. A arquitetura de defesa em profundidade

A prova espera que você combine as camadas:

```
                 Internet
                     │
   Shield (3/4)  ────┤  automático, sempre
                     │
            ┌────────▼────────┐
            │   CloudFront    │  ← reduz superfície: a origem não fica exposta
            │   + WAF         │  ← filtra payload e aplica rate limiting na BORDA
            └────────┬────────┘
                     │
            ┌────────▼────────┐
            │  ALB + WAF      │  ← segunda camada, regional
            └────────┬────────┘
                     │
            Subnets privadas  ← SG e NACL
```

Dois princípios desse desenho:

1. **Reduzir a superfície**: pôr CloudFront ou Global Accelerator na frente esconde os IPs da origem. Com Shield Advanced, esses são justamente os recursos protegidos.
2. **Filtrar o mais cedo possível**: WAF no CloudFront bloqueia no POP, antes de consumir banda e capacidade na região.

## 4. Shield × WAF — a divisão exata

| Pergunta | Serviço |
|---|---|
| O atacante está mandando **volume** para esgotar banda ou conexões? | **Shield** |
| O atacante está mandando **requisições malformadas ou maliciosas**? | **WAF** |
| O atacante está mandando **muitas requisições válidas** de um IP? | **WAF** (rate-based rule) |
| Preciso de **gente da AWS** ajudando durante o ataque? | **Shield Advanced** |

## 5. Pré-requisito e escopo

O Shield Advanced exige plano de suporte **Business ou Enterprise** para o engajamento com o SRT — mas o plano de suporte sozinho **não** dá acesso ao SRT para DDoS. É a assinatura do Advanced que dá.

Em organização, a cobrança vai para a **payer account**.

## 6. Multi-conta

**AWS Firewall Manager** gerencia o Shield Advanced centralmente: aplica a proteção a recursos novos automaticamente em todas as contas da organização.

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[WAF]] · [[Firewall Manager]] · [[CloudFront]] · [[Global Accelerator]] · [[Route 53]]
