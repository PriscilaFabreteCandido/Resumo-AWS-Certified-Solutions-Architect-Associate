---
tags: [saa-c03, dominio-1, waf, shield, firewall-manager, ddos]
dominio: 1
tasks: [1.2]
atualizado: 2026-11-08
---

# Proteção de borda — WAF, Shield e Firewall Manager

## 🧩 Em 30 segundos

- **WAF = camada 7.** Inspeciona requisição HTTP/HTTPS: SQL injection, XSS, IP, país, header, string, regex, tamanho — e **rate-based rule** para flood.
- **Shield Standard = DDoS camada 3/4, automático e grátis.** **Shield Advanced = pago**, com SRT, engajamento proativo e mitigação automática na camada 7.
- **Firewall Manager = aplicar tudo isso em várias contas** da Organization de uma vez.
- WAF **não** funciona em **NLB**. Funciona em ALB, CloudFront, API Gateway REST, AppSync, Cognito user pool, App Runner, Verified Access e Amplify.

## 🧠 Teste-se primeiro

> [!question]- Em quais recursos o WAF pode ser associado?
> Lista oficial: **CloudFront distribution** · **API Gateway REST API** · **Application Load Balancer** · **AWS AppSync GraphQL API** · **Amazon Cognito user pool** · **AWS App Runner service** · **Amazon Bedrock AgentCore Gateway** · **AWS Verified Access instance** · **AWS Amplify**.
> **Não** inclui NLB nem EC2 diretamente.

> [!question]- Quais ações uma regra de WAF pode tomar?
> **Allow** · **Block** (403 Forbidden, ou resposta customizada) · **Count** (só conta, para testar a regra sem bloquear) · **CAPTCHA** ou **silent challenge**.
> `Count` é a resposta quando o enunciado diz "avaliar o impacto da regra antes de ativar".

> [!question]- Shield Standard × Advanced: o que o Advanced adiciona?
> Standard: *"provided automatically and at no extra charge"*, mitiga camada 3/4 e vetores conhecidos.
> Advanced (**pago**): mitigação automática de DDoS na **camada 7**, visibilidade detalhada de eventos, **Shield Response Team (SRT)** e **engajamento proativo** (*"the SRT can proactively contact you"*).
> Protege: **EC2, ELB, CloudFront, Route 53 hosted zones e Global Accelerator (standard accelerators)**.

> [!question]- Quando a resposta é Firewall Manager e não WAF?
> Quando o enunciado fala de **várias contas** ou **aplicação centralizada de política**. Firewall Manager gerencia, de forma central na Organization: **WAF**, **Shield Advanced**, **security groups e NACLs de VPC**, **Network Firewall** e **Route 53 Resolver DNS Firewall**.

## WAF — detalhes que caem

| Item | Detalhe |
|---|---|
| O que inspeciona | *"the HTTP and HTTPS requests that are forwarded to your protected web application resources"* |
| Critérios | IP, país, valor de header, string e regex, tamanho da requisição, **SQL injection**, **cross-site scripting** |
| Rate-based rule | Bloqueia ou conta requisições que *"exceed a specified number of requests in a minute or in five minutes"* |
| Managed rule groups | Regras prontas da AWS e de parceiros (inclui o grupo **Layer 7 Anti-DDoS** incluído no Shield Advanced) |
| Web ACL | O container de regras, associado ao recurso |
| WCU | Unidade de capacidade de uma web ACL. O Shield Advanced cobre o custo padrão de WAF até **1.500 WCUs** |

> [!warning] A pegadinha WAF × Shield × SG × NACL
> Leia **o que** o atacante está fazendo:
> - Payload malicioso (SQL injection, XSS), flood HTTP de um IP → **WAF**
> - Flood volumétrico de rede (SYN flood, UDP reflection) → **Shield** (Standard já cobre; Advanced para ataque grande com suporte)
> - Porta ou protocolo errado chegando na instância → **security group**
> - Bloquear um bloco de IP na subnet inteira → **NACL**

## Shield Advanced — o que mais cai

- **Billing numa Organization**: *"AWS bills the Shield Advanced subscriptions against the payer account for the organization."*
- A assinatura inclui o custo padrão do WAF nos recursos protegidos (web ACL, por regra, preço base por milhão de requisições) até **1.500 WCUs**, e até **50 bilhões** de requisições por mês.
- A mitigação automática de camada 7 adiciona um rule group de **150 WCUs**.
- Camada 3/4: *"AWS automatically mitigates network and transport layer (layer 3 and layer 4) DDoS attacks"* — isso é o Standard, para todo mundo.

> [!note] Sobre "cost protection" (créditos por escalonamento durante DDoS)
> Esse benefício é muito citado em cursinhos. As páginas de documentação que conferi **não o afirmam** — ele aparece na página de preços do Shield, que não foi verificada aqui. Se a questão oferecer essa alternativa, ela normalmente **é** a correta no contexto do Shield Advanced; mas não a trate como fato documentado.

## ❓ Questões de prova

> [!example]- Q1 — Uma API exposta por Network Load Balancer está sofrendo SQL injection. O time quer filtrar as requisições maliciosas. O que fazer?
> **A)** Associar uma web ACL do WAF ao NLB
> **B)** **Colocar um Application Load Balancer (ou CloudFront) na frente e associar o WAF a ele** ✅
> **C)** Ativar Shield Advanced no NLB
> **D)** Criar NACL negando os IPs de origem
>
> **Por que B**: WAF **não** se associa a NLB. Precisa de um recurso de camada 7 na frente — ALB, CloudFront ou API Gateway REST.
> **A errada**: NLB não está na lista de recursos suportados pelo WAF.
> **C errada**: Shield é DDoS, não filtro de payload. E o NLB não está na lista de recursos do Shield Advanced (que cobre EC2, ELB, CloudFront, Route 53 e Global Accelerator — ELB aqui inclui NLB, mas isso não dá filtro de SQL injection).
> **D errada**: não detecta o ataque e o atacante troca de IP.

> [!example]- Q2 — A empresa tem 60 contas numa Organization e quer garantir que **toda** distribuição CloudFront nova receba automaticamente a web ACL corporativa. Qual serviço?
> **A)** SCP exigindo WAF
> **B)** **AWS Firewall Manager com uma policy de WAF aplicada à Organization** ✅
> **C)** AWS Config rule com remediação
> **D)** Script no CloudTrail + Lambda
>
> **Por que B**: é exatamente o caso de uso do Firewall Manager — aplicar WAF/Shield/SG/NACL/Network Firewall centralmente nas contas da Organization.
> **A errada**: SCP nega ações; não **cria nem associa** recursos.
> **C errada**: Config detecta e remedia depois, com mais peças para manter.
> **D errada**: solução caseira; o enunciado típico pede "least operational overhead".

> [!example]- Q3 — Durante um ataque DDoS volumétrico, a empresa quer acesso direto a especialistas da AWS e mitigação assistida. O que é necessário?
> **A)** Plano de suporte Business
> **B)** **Assinatura do AWS Shield Advanced** ✅
> **C)** Shield Standard com um caso de suporte urgente
> **D)** WAF com managed rule group de anti-DDoS
>
> **Por que B**: o SRT (Shield Response Team) e o engajamento proativo são benefícios do **Advanced**.
> **A errada**: plano de suporte não dá SRT. (O Advanced exige plano Business ou Enterprise, mas o plano sozinho não basta.)
> **C errada**: o Standard não dá acesso ao SRT.
> **D errada**: ajuda na camada 7, mas não fornece equipe nem mitigação volumétrica assistida.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| WAF funciona em NLB | **Não.** Precisa de ALB, CloudFront, API Gateway REST, AppSync, Cognito user pool, App Runner, Verified Access ou Amplify |
| Shield Standard precisa ser contratado | Vem automático e **grátis** |
| Shield Advanced substitui o WAF | **Complementa**: inclui o custo padrão de WAF até 1.500 WCUs e um managed rule group anti-DDoS, mas as regras de aplicação continuam sendo WAF |
| WAF resolve DDoS volumétrico | Camada 7 sim; volumétrico de rede é Shield |
| Rate-based rule bloqueia por segundo | Por **minuto** ou por **5 minutos** |
| Count bloqueia | **Count só conta.** É o modo de teste |
| Firewall Manager é um firewall | É o **gerenciador central** de WAF, Shield Advanced, SG/NACL, Network Firewall e DNS Firewall em várias contas |
| Network Firewall e WAF são a mesma camada | **Network Firewall** é firewall de rede na VPC (camada 3/4 com inspeção); **WAF** é camada 7 na borda da aplicação |

## Links

- [[01 - Dominio 1 - Design Secure Architectures (30%)]]
- [[Rede segura - SG, NACL e endpoints]]
- [[Deteccao - GuardDuty, Macie, Inspector, Security Hub e Detective]]
- [O que é o AWS WAF](https://docs.aws.amazon.com/waf/latest/developerguide/what-is-aws-waf.html)
- [Proteção DDoS na AWS](https://docs.aws.amazon.com/waf/latest/developerguide/ddos-overview.html)
