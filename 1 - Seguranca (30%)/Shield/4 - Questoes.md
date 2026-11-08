---
tags: [saa-c03, shield, questoes]
servico: AWS Shield
atualizado: 2026-11-08
---

# Shield — Questões

> [!question]- Q1. Durante um DDoS volumétrico, a empresa quer acesso direto a especialistas da AWS e mitigação assistida.
> **A)** Plano de suporte Business
> **B)** **Assinatura do AWS Shield Advanced** ✅
> **C)** Shield Standard com um caso de suporte urgente
> **D)** WAF com managed rule group anti-DDoS
>
> **Por que B**: o SRT e o engajamento proativo são benefícios do **Advanced**.
> **A errada**: o Advanced exige plano Business ou Enterprise, mas o plano sozinho não dá acesso ao SRT.
> **C errada**: o Standard não dá acesso ao SRT.
> **D errada**: ajuda na camada 7, mas não fornece equipe nem mitigação volumétrica assistida.

> [!question]- Q2. É preciso habilitar e pagar algo para ter proteção contra DDoS de camada 3 e 4?
> **A)** Sim, o Shield Standard precisa ser habilitado
> **B)** **Não: o Shield Standard é automático e sem custo adicional** ✅
> **C)** Sim, é preciso Shield Advanced
> **D)** Sim, é preciso WAF
>
> **Por que B**: *"provided automatically and at no extra charge when you use AWS"* e *"AWS automatically mitigates network and transport layer (layer 3 and layer 4) DDoS attacks"*.

> [!question]- Q3. Quais recursos o Shield Advanced protege?
> **A)** Qualquer recurso da conta
> **B)** **EC2, Elastic Load Balancing, CloudFront, Route 53 hosted zones e Global Accelerator standard accelerators** ✅
> **C)** Só CloudFront e Route 53
> **D)** Apenas recursos numa VPC
>
> **Por que B**: é a lista oficial.

> [!question]- Q4. A aplicação sofre flood de requisições HTTP válidas de milhares de IPs distintos, com payload legítimo.
> **A)** Só Shield Standard
> **B)** **WAF com rate-based rule (agrupando por header/token, não só por IP) + Shield Advanced para mitigação automática de camada 7** ✅
> **C)** NACL negando os IPs
> **D)** Security group restritivo
>
> **Por que B**: flood de camada 7 distribuído precisa de filtro de aplicação; com milhares de IPs, agrupar o rate por IP é fraco — agrupar por token/header é o ajuste. O Advanced adiciona a mitigação automática de L7.
> **C errada**: milhares de IPs rotativos tornam a lista impraticável.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Shield Standard precisa ser contratado | Vem **automático e grátis** |
| Shield resolve SQL injection | Isso é **WAF** |
| Shield Advanced substitui o WAF | **Complementa** (e cobre o custo padrão do WAF até 1.500 WCUs) |
| Shield Advanced protege qualquer recurso | Lista fechada: EC2, ELB, CloudFront, Route 53, Global Accelerator |
| O time é "DRT" | A doc atual diz **SRT (Shield Response Team)** |
| Plano de suporte Business já dá acesso ao SRT para DDoS | É a **assinatura do Advanced** que dá |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
