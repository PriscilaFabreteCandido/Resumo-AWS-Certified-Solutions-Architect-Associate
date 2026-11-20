---
servico: Amazon EC2 Auto Scaling
fonte: "[[2 - Resiliencia (26%)/Auto Scaling (EC2)/2 - Decorar|2 - Decorar]]"
---

# Auto Scaling — Flashcards

#flashcards/saa-c03/d2-resiliencia/auto-scaling-ec2

Cooldown padrão do Auto Scaling e a que tipo de política se aplica?::**300 s (5 min)**, só em **simple scaling**

Health check grace period padrão no console e via CLI/SDK?::**300 s** no console; **0 s** via CLI/SDK

Timeout padrão do lifecycle hook e o limite global?::**1 hora** (heartbeat); global de **48 h** ou 100 vezes o heartbeat

No rebalanceamento entre AZs, quanto o grupo pode exceder o máximo?::**10%** (ou 1 instância)

Qual health check vem ligado por padrão no Auto Scaling, e qual precisa ativar para tirar instância que falha no ALB?::Ligado: **EC2 status checks**. Precisa ativar: **Elastic Load Balancing**

Primeiro critério da ordem padrão de terminação do Auto Scaling?::A **AZ com mais instâncias** (equilíbrio entre zonas tem precedência)

Dentro da AZ escolhida, qual instância sai primeiro na terminação padrão?::A de **configuração mais antiga** (launch configuration, depois template diferente, depois versão antiga); depois a mais próxima da **próxima hora de cobrança**

Instância marcada unhealthy espera o cooldown para ser substituída?::**Não**, é substituída **sem esperar cooldown**

Cooldown × instance warmup: quais políticas usam cada um?::**Cooldown**: simple scaling. **Warmup**: **target tracking** e **step scaling**

Target tracking e step scaling precisam esperar o cooldown para expandir?::**Não**, podem iniciar scale-out **imediatamente**

Métrica de escala para um consumidor de fila SQS?::**`ApproximateNumberOfMessagesVisible`** (backlog por instância)

Métrica de escala para web síncrona atrás de ALB?::**CPU** ou **`RequestCountPerTarget`**

Connection draining padrão do ELB?::**300 s**
