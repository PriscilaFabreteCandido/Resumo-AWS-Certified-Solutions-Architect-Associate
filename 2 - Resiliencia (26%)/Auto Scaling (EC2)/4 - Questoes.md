---
tags: [saa-c03, auto-scaling, questoes]
servico: Amazon EC2 Auto Scaling
atualizado: 2026-11-08
---

# Auto Scaling — Questões

> [!question]- Q1. Instâncias continuam rodando, mas usuários recebem 502. O processo da aplicação travou; o SO está no ar.
> **A)** O cooldown está muito longo
> **B)** **O health check do ELB não está habilitado no ASG; só o EC2 status check está ativo** ✅
> **C)** O grace period é 0
> **D)** O target group está com cross-zone desligado
>
> **Por que B**: o EC2 status check valida **hipervisor e SO**, não a aplicação. O ELB health check **precisa ser ativado**.
> **A errada**: *"does not wait for the cooldown period to end before replacing the unhealthy instance"*.
> **C errada**: grace period 0 faria o ASG checar **mais cedo**.
> **D errada**: cross-zone afeta distribuição, não detecção.

> [!question]- Q2. O consumidor de fila em ASG não escala no pico; a CPU fica em 20% e a fila acumula.
> **A)** Instâncias com mais CPU
> **B)** **Target tracking sobre o backlog da fila (mensagens visíveis por instância)** ✅
> **C)** Aumentar o cooldown
> **D)** Habilitar long polling
>
> **Por que B**: a métrica precisa refletir o **trabalho pendente**. CPU baixa com fila cheia é o sintoma de métrica errada.
> **C errada**: cooldown maior escala **menos**.

> [!question]- Q3. O tráfego tem um padrão diário conhecido: sobe às 8h e cai às 19h. Qual configuração reduz latência no início do dia e custo à noite?
> **A)** Simple scaling com cooldown curto
> **B)** **Scheduled scaling (ou predictive scaling) combinado com target tracking** ✅
> **C)** Step scaling por CPU
> **D)** Aumentar o desired capacity fixo
>
> **Por que B**: scheduled trata o padrão **conhecido**; predictive provisiona *"in advance of daily and weekly patterns"*; target tracking cobre o imprevisto.
> **A errada**: a AWS recomenda **não usar** simple scaling.
> **C errada**: reage **depois** do pico começar.
> **D errada**: paga capacidade de pico 24 h.

> [!question]- Q4. Instâncias recém-lançadas estão sendo terminadas pelo ASG antes de terminar a inicialização (que leva 4 minutos).
> **A)** Mudar a política para step scaling
> **B)** **Aumentar o health check grace period (e usar lifecycle hook para registrar no ELB só após o bootstrap)** ✅
> **C)** Desabilitar o ELB health check
> **D)** Aumentar o cooldown
>
> **Por que B**: grace period curto (ou 0, se o grupo foi criado via CLI) faz o ASG avaliar a instância antes de ela estar pronta.
> **C errada**: desligaria a detecção real de falha da aplicação.

> [!question]- Q5. É preciso aplicar uma AMI corrigida em toda a fleet, sem downtime e sem alterar instâncias no lugar.
> **A)** Run Command aplicando o patch
> **B)** **Nova versão do launch template com a AMI nova + instance refresh** ✅
> **C)** Terminar as instâncias manualmente
> **D)** Aumentar o desired capacity
>
> **Por que B**: é **immutable infrastructure** — citado no guia em Task 2.2. O instance refresh troca em lotes, respeitando saúde mínima.
> **A errada**: corrige in-place, deixando a fleet heterogênea (e não resolve upgrade de versão maior de SO).

> [!question]- Q6. Durante scale-in, o ASG está terminando instâncias de uma AZ que já tem menos instâncias que as outras. Possível?
> **A)** Sim, se a política for `NewestInstance`
> **B)** **Não: o equilíbrio entre AZs tem precedência sobre a política de terminação** ✅
> **C)** Sim, se o cooldown estiver ativo
> **D)** Sim, sempre que houver proteção de scale-in
>
> **Por que B**: *"Maintaining Zonal balance takes precedence over the termination policy."*

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| ASG já checa a aplicação | Só com **ELB health check habilitado** |
| Grace period é sempre 300 s | **300 s no console, 0 s via CLI/SDK** |
| Cooldown atrasa a substituição de instância doente | **Não atrasa** |
| Cooldown vale para todas as políticas | Só para **simple scaling** |
| Simple scaling é o jeito normal | A AWS recomenda **não** usar |
| ASG respeita a política de terminação acima de tudo | **Equilíbrio entre AZs** tem precedência |
| CPU é a métrica de escala | Para consumidor de fila, é a **profundidade da fila** |
| O ASG nunca passa do máximo | No **rebalanceamento** pode exceder em **10%** |
| Lifecycle hook impede interrupção de Spot | *"does not prevent an instance from terminating"* |
| Launch configuration e launch template são equivalentes | Launch **configuration** é legado: sem versionamento, sem mix de Spot/On-Demand |
| ASG escala verticalmente | Escala **horizontalmente** (mais instâncias) |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
