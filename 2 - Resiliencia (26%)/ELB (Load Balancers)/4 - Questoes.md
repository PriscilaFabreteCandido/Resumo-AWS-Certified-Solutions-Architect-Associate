---
tags: [saa-c03, elb, questoes]
servico: Elastic Load Balancing
atualizado: 2026-11-08
---

# ELB — Questões

> [!question]- Q1. Aplicação TCP de alta performance precisa de **IPs estáticos** para liberar em firewalls de clientes, com latência mínima.
> **A)** ALB
> **B)** **NLB** ✅
> **C)** Classic Load Balancer
> **D)** ALB atrás do Global Accelerator
>
> **Por que B**: *"Elastic Load Balancing creates a network interface for each Availability Zone you enable, and uses it to get a static IP address"*, com EIP opcional. Camada 4, latência mínima.
> **A errada**: ALB expõe **DNS name**, e camada 7 é overhead para TCP puro.
> **C errada**: geração anterior.
> **D errada**: Global Accelerator **também** dá IPs estáticos e é válido em cenário global — mas aqui adiciona custo sem necessidade.

> [!question]- Q2. Um domínio precisa servir `/api/*` por um conjunto de instâncias e `/*` por outro.
> **A)** Dois NLBs com Route 53 weighted
> **B)** **Um ALB com regras de roteamento por path** ✅
> **C)** CloudFront com dois origins
> **D)** Um NLB com dois target groups
>
> **Por que B**: *"Support for Path conditions"* é recurso do ALB (camada 7).
> **D errada**: NLB não entende path.
> **C errada**: CloudFront **consegue** rotear por path behavior e é válido se houver requisito de CDN — mas introduz cache e borda sem o enunciado pedir.

> [!question]- Q3. Uma API atrás de **NLB** sofre SQL injection. O que fazer?
> **A)** Associar uma web ACL do WAF ao NLB
> **B)** **Pôr um ALB (ou CloudFront) na frente e associar o WAF a ele** ✅
> **C)** Shield Advanced no NLB
> **D)** NACL negando os IPs
>
> **Por que B**: WAF **não** se associa a NLB. (E o NLB aceita **um ALB** como target, o que permite manter o IP estático.)

> [!question]- Q4. Um ASG mantém instâncias rodando, mas usuários recebem 502. O processo da aplicação travou; o SO está no ar.
> **A)** O cooldown está longo
> **B)** **O health check do ELB não está habilitado no Auto Scaling group** ✅
> **C)** O grace period é 0
> **D)** Cross-zone está desligado
>
> **Por que B**: o EC2 status check valida hipervisor e SO, não a aplicação. O **ELB health check** precisa ser ativado no ASG.
> **A errada**: *"does not wait for the cooldown period to end before replacing the unhealthy instance"*.

> [!question]- Q5. Um NLB distribui desigualmente: a AZ com 2 instâncias recebe metade do tráfego, a AZ com 8 recebe a outra metade.
> **A)** Mudar para ALB
> **B)** **Habilitar cross-zone load balancing (ou equilibrar a capacidade entre AZs)** ✅
> **C)** Adicionar um target group
> **D)** Reduzir o TTL do DNS
>
> **Por que B**: no NLB, cross-zone é *"disabled by default"* — cada nó serve só a sua AZ. Habilitar distribui uniformemente (ao custo de tráfego cross-AZ).

> [!question]- Q6. O tráfego precisa passar por um firewall virtual de terceiro antes de chegar à aplicação.
> **A)** ALB com regras de bloqueio
> **B)** **Gateway Load Balancer com GWLB endpoints, encaminhando por GENEVE na porta 6081** ✅
> **C)** NLB com TLS termination
> **D)** Network Firewall
>
> **Por que B**: o GWLB existe para appliances de inspeção de terceiro.
> **D errada**: Network Firewall é o firewall **gerenciado pela AWS** — resposta válida se o enunciado não exigir appliance de terceiro.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| ALB tem IP estático | **DNS name.** IP estático é **NLB** |
| NLB roteia por path | Só **ALB** (camada 7) |
| Cross-zone é padrão em todos | **ALB sim** (no LB); **NLB e GWLB não** |
| WAF funciona em NLB | Não. ALB, CloudFront, API Gateway **REST**, AppSync, Cognito user pool, App Runner, Verified Access, Amplify |
| Lambda é target de NLB | É target de **ALB** |
| ALB pode rodar em 1 AZ | Exige **2+** |
| ASG já checa a aplicação | Só com **ELB health check habilitado** |
| GWLB usa porta 443 | **GENEVE na 6081** |
| Sticky session é a solução de estado | A resposta arquitetural é **stateless** com sessão no ElastiCache/DynamoDB |
| Posso usar o IP resolvido do ALB | O DNS tem TTL de **60 s** e os IPs mudam |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
