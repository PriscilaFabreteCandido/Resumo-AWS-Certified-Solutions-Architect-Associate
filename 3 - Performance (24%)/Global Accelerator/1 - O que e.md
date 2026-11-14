---
tags: [saa-c03, global-accelerator, borda, rede]
servico: AWS Global Accelerator
tipo: Aceleração de rede anycast
dominios: [3, 2]
atualizado: 2026-11-08
---

# AWS Global Accelerator — O que é

> [!info] Em uma frase
> Dá **2 IPs estáticos anycast** à sua aplicação e roteia o tráfego pela **rede da AWS** até o endpoint mais próximo e saudável — **sem cachear nada**.

## Definição oficial

> *"service in which you create accelerators to improve the performance of your applications for local and global users."*

E os IPs: *"Global Accelerator provides you with static IP addresses... The static IP addresses are anycast from the AWS edge network. For IPv4, Global Accelerator provides two static IPv4 addresses. For dual-stack, Global Accelerator provides a total of four addresses."*

## Os três motivos para usá-lo

| Motivo | Por quê |
|---|---|
| **IP estático** | Clientes precisam liberar IPs em firewall; o IP não muda ao trocar de região |
| **TCP e UDP** | Jogos, VoIP, MQTT, qualquer coisa que não seja HTTP |
| **Failover regional quase instantâneo** | *"reacts instantly to changes in health or configuration"* — sem depender de TTL de DNS |

## CloudFront × Global Accelerator — a comparação central

| | **CloudFront** | **Global Accelerator** |
|---|---|---|
| **Cacheia** | **Sim** | **Não** |
| Protocolo | HTTP/HTTPS | **TCP e UDP** |
| Endereço | DNS name | **2 IPs estáticos anycast** |
| Endpoints | S3, ELB, API Gateway, MediaPackage, HTTP server | **NLB, ALB, EC2, Elastic IP** |
| Use para | Conteúdo estático/dinâmico HTTP | Jogo, VoIP, IoT, IP fixo, failover regional |

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[CloudFront]] · [[ELB (Load Balancers)]] · [[Route 53]] · [[Disaster Recovery (RPO e RTO)]]
- [O que é o Global Accelerator](https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html)
