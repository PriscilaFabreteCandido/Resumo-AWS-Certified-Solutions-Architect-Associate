---
tags: [saa-c03, auto-scaling, asg]
servico: Amazon EC2 Auto Scaling
tipo: Escala horizontal e substituição de instâncias
dominios: [2, 3, 4]
atualizado: 2026-11-08
---

# EC2 Auto Scaling — O que é

> [!info] Em uma frase
> Mantém um número desejado de instâncias saudáveis, **substitui** as que falham, e **escala horizontalmente** conforme a demanda — distribuindo entre as AZs habilitadas.

## As três funções (nesta ordem de importância na prova)

1. **Resiliência** — substitui instância doente automaticamente e equilibra entre AZs
2. **Elasticidade** — sobe e desce capacidade conforme métrica
3. **Economia** — não paga capacidade ociosa; permite misturar On-Demand e **Spot**

## Os cinco modos de escala

| Modo | Para quê |
|---|---|
| **Manter número fixo** | Só resiliência: substitui o que falha |
| **Manual** | Você muda o desired capacity |
| **Scheduled** | Padrão previsível por hora/dia ("todo dia útil às 8h, sobe para 10") |
| **Dynamic** | Reage a métrica: **target tracking**, **step scaling**, **simple scaling** |
| **Predictive** | *"in advance of daily and weekly patterns"* — provisiona **antes** do pico |

## A recomendação oficial

> *"As a best practice, we recommend that you do not use simple scaling policies and scaling cooldowns. A target tracking scaling policy or a step scaling policy is better for scaling performance... we recommend target tracking over either simple scaling or step scaling."*

**Target tracking é quase sempre a resposta.**

## A armadilha nº 1 do tema

O ASG tem **cinco tipos** de health check, e só um vem ligado:

| Tipo | Padrão |
|---|---|
| **EC2 status checks e scheduled events** | **Ligado sempre** |
| **Elastic Load Balancing health checks** | **Precisa ativar** |
| **VPC Lattice health checks** | Precisa ativar |
| **Amazon EBS health checks** | Precisa ativar |
| **Custom health checks** | Você marca via API |

Sem o **ELB health check**, a instância cujo processo da aplicação morreu continua "saudável" para o ASG — porque o SO está no ar.

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[ELB (Load Balancers)]] · [[EC2]] · [[CloudWatch]] · [[Opcoes de compra do EC2 (Spot, RI, Savings Plans)]]
- [Escalar o grupo](https://docs.aws.amazon.com/autoscaling/ec2/userguide/scale-your-group.html)
