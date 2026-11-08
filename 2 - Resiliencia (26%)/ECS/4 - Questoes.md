---
tags: [saa-c03, ecs, questoes]
servico: Amazon ECS
atualizado: 2026-11-08
---

# ECS — Questões

> [!question]- Q1. Rodar containers em produção com o **menor esforço operacional**, e o time não usa Kubernetes.
> **A)** EKS com managed node groups
> **B)** **ECS com Fargate** ✅
> **C)** ECS no EC2 com Auto Scaling group
> **D)** EC2 com Docker e scripts
>
> **Por que B**: ECS é o orquestrador mais simples na AWS, e o Fargate elimina o gerenciamento de servidor.
> **A errada**: traz o plano de controle Kubernetes para operar sem necessidade.
> **C errada**: você volta a gerenciar AMI, patch e capacidade.

> [!question]- Q2. Um container precisa ler um bucket S3. O que configurar?
> **A)** Access key nas variáveis de ambiente da task
> **B)** **Task role com permissão de leitura no bucket** ✅
> **C)** Task execution role com permissão no bucket
> **D)** Instance profile da EC2
>
> **Por que B**: a **task role** é a credencial da aplicação.
> **C errada**: a **task execution role** serve para o agente puxar a imagem do ECR e escrever logs.
> **D errada**: não funciona em Fargate, e em EC2 daria a permissão a **todas** as tasks do host.

> [!question]- Q3. Um worker de SQS em ECS não escala no pico; a CPU fica baixa e a fila acumula.
> **A)** Aumentar a memória da task
> **B)** **Service Auto Scaling com target tracking sobre a profundidade da fila (custom metric)** ✅
> **C)** Mudar para EC2
> **D)** Aumentar o desired count fixo
>
> **Por que B**: a métrica precisa refletir o **trabalho pendente**, não a CPU.
> **D errada**: paga capacidade de pico o tempo todo.

> [!question]- Q4. Um agente de monitoramento precisa rodar **em cada host** do cluster.
> **A)** Fargate com desired count alto
> **B)** **ECS no EC2, com a estratégia de scheduling `daemon`** ✅
> **C)** Lambda agendada
> **D)** Service com 1 task
>
> **Por que B**: "um por host" exige acesso ao host e a estratégia **daemon** — que o Fargate não oferece.

> [!question]- Q5. As tasks precisam de security groups diferentes entre si, na mesma subnet.
> **A)** Não é possível; o SG é da instância
> **B)** **Usar network mode `awsvpc` (padrão no Fargate): cada task recebe a própria ENI e o próprio SG** ✅
> **C)** Criar um cluster por grupo de tasks
> **D)** Usar NACL por task
>
> **Por que B**: com `awsvpc`, cada task tem ENI e SG próprios.
> **D errada**: NACL é por **subnet**.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Fargate é um serviço separado do ECS | É **launch type / capacity provider** do ECS (e do EKS) |
| Fargate oferece GPU e instance store | **Não oferece** nenhum dos dois |
| Fargate suporta daemon por host | **Não** |
| Task role = task execution role | Task role é da **aplicação**; execution role é do **agente** (ECR, logs) |
| Service e task são a mesma coisa | **Task** roda e para; **service** mantém N rodando |
| SG é sempre da instância | Com `awsvpc`, é **por task** |
| Escalar container é por CPU | Para worker de fila, é pela **profundidade da fila** |
| EKS é sempre melhor que ECS | EKS traz Kubernetes — mais poder e **mais esforço operacional** |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
