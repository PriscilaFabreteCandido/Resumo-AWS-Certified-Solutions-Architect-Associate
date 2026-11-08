---
tags: [saa-c03, waf, questoes]
servico: AWS WAF
atualizado: 2026-11-08
---

# WAF — Questões

> [!question]- Q1. Uma API exposta por **Network Load Balancer** sofre SQL injection. O que fazer?
> **A)** Associar uma web ACL do WAF ao NLB
> **B)** **Colocar um ALB (ou CloudFront) na frente e associar o WAF a ele** ✅
> **C)** Ativar Shield Advanced no NLB
> **D)** NACL negando os IPs de origem
>
> **Por que B**: WAF **não** se associa a NLB. Precisa de um recurso de camada 7 na frente.
> **C errada**: Shield é DDoS, não filtro de payload.
> **D errada**: não detecta SQL injection, e o atacante troca de IP.

> [!question]- Q2. Picos de requisição de um único IP estão derrubando a aplicação atrás de um ALB.
> **A)** Security group restringindo portas
> **B)** **WAF com rate-based rule no ALB** ✅
> **C)** Shield Standard
> **D)** Aumentar o Auto Scaling
>
> **Por que B**: rate-based rule bloqueia ou conta requisições que *"exceed a specified number of requests in a minute or in five minutes"*.
> **A errada**: SG trabalha em porta/protocolo/IP, não em taxa de requisição.
> **D errada**: trata o sintoma e aumenta o custo; não bloqueia o abuso.

> [!question]- Q3. O time quer medir quantas requisições uma nova regra bloquearia, sem afetar os usuários.
> **A)** Associar a web ACL em modo de teste
> **B)** **Configurar a ação da regra como `Count`** ✅
> **C)** Usar CloudWatch Logs Insights
> **D)** Criar a regra em outra web ACL
>
> **Por que B**: `Count` *"só conta"* — é exatamente o modo de avaliação sem impacto.

> [!question]- Q4. Bloquear requisições do país X **exceto** para o caminho `/status`.
> **A)** Geo restriction do CloudFront
> **B)** **WAF com geo match rule combinada com condição de path** ✅
> **C)** NACL por faixa de IP do país
> **D)** Route 53 geolocation routing
>
> **Por que B**: a geo restriction do CloudFront vale para a **distribuição toda**; a combinação país + path é do WAF.
> **D errada**: geolocation routing escolhe **para onde** mandar, não bloqueia.

> [!question]- Q5. Garantir que **toda** distribuição CloudFront nova nas 60 contas receba a web ACL corporativa.
> **A)** SCP exigindo WAF
> **B)** **AWS Firewall Manager com policy de WAF aplicada à organização** ✅
> **C)** AWS Config rule com remediação
> **D)** CloudFormation StackSets
>
> **Por que B**: é o caso de uso do Firewall Manager — aplicar WAF/Shield/SG/NACL centralmente.
> **A errada**: SCP nega ações; não **associa** recursos.
> **C errada**: detecta e remedia depois, com mais peças.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| WAF funciona em NLB | **Não.** ALB, CloudFront, API Gateway **REST**, AppSync, Cognito user pool, App Runner, Verified Access, Amplify |
| WAF funciona na HTTP API | **Só na REST API** |
| Rate-based rule é por segundo | **Por minuto ou por 5 minutos** |
| `Count` bloqueia | **Só conta** |
| WAF resolve DDoS volumétrico | Camada 7 sim; volumétrico de rede é **Shield** |
| Shield Advanced substitui o WAF | **Complementa** (e cobre o custo padrão do WAF até 1.500 WCUs) |
| Block devolve 404 | Devolve **403** (ou resposta customizada) |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
