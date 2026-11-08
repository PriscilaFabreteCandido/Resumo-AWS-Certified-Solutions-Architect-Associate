---
tags: [saa-c03, ecs, detalhes]
servico: Amazon ECS
atualizado: 2026-11-08
---

# ECS — Detalhes

## 1. A anatomia de uma aplicação no ECS

```
TASK DEFINITION  (o blueprint, versionado)
   ├── imagem no ECR
   ├── cpu / memory
   ├── portas, variáveis, secrets (do Secrets Manager / Parameter Store)
   ├── task role            → o que a APLICAÇÃO pode chamar na AWS
   ├── task execution role  → puxar imagem do ECR, escrever log
   └── log configuration    → CloudWatch Logs
        │
        ▼
SERVICE  (mantém N tasks rodando)
   ├── desired count
   ├── capacity provider (FARGATE / FARGATE_SPOT / ASG de EC2)
   ├── target group do ALB/NLB
   └── Service Auto Scaling
        │
        ▼
CLUSTER  (a infraestrutura)
```

## 2. Escolhendo a capacidade

**Fargate** quando o critério é **menor esforço operacional**. Elimina patch, dimensionamento e bin packing; você paga vCPU e memória **da task**.

**EC2** quando precisa de algo que o Fargate não dá: **GPU**, **instance store**, **daemon** por host, tipo de instância específico, licença por core — ou quando a carga é **constante e densa** e o desconto de **Reserved Instances / Savings Plans** com bin packing bom sai mais barato.

**ECS Managed Instances** é o meio-termo: mantém EC2 (com GPU e instance store) mas a AWS cuida de provisionamento, patch e escala.

**ECS Anywhere** roda o agente nos seus servidores on-premises, com o plano de controle na AWS.

## 3. Escala

**Service Auto Scaling** (via Application Auto Scaling) faz target tracking em:

| Métrica | Quando |
|---|---|
| `ECSServiceAverageCPUUtilization` | Carga CPU-bound |
| `ECSServiceAverageMemoryUtilization` | Carga memory-bound |
| `ALBRequestCountPerTarget` | Web atrás de ALB — costuma ser melhor que CPU |
| **Custom metric** (profundidade de fila) | **Worker de SQS** — a métrica certa não é CPU |

Para o cluster em **EC2**, o **capacity provider** com *managed scaling* ajusta o ASG conforme a demanda de tasks.

## 4. Rede e integração com load balancer

Em **Fargate** (e em EC2 com network mode `awsvpc`), cada task recebe a sua **ENI** com IP privado — e portanto o seu próprio **security group**. Isso permite regras por task, não por instância.

O **service** registra as tasks num **target group**. Com **ALB**, você ganha roteamento por path/host e health check de camada 7; com **NLB**, IP estático e camada 4.

Padrão de prova: **ALB → ECS service em Fargate, em subnets privadas**, com o SG das tasks aceitando só o SG do ALB.

## 5. Deploy

| Estratégia | Como |
|---|---|
| **Rolling update** | Padrão do ECS: substitui tasks respeitando `minimumHealthyPercent` e `maximumPercent` |
| **Blue/green** | Via CodeDeploy (⚠️ **CodeDeploy está fora de escopo** na SAA, mas o **conceito** de blue/green cai) |
| **Nova task definition** | Cada deploy é uma revisão nova — é deploy **imutável** |

## 6. Segurança

| Controle | Detalhe |
|---|---|
| **Task role** | Credencial temporária para a aplicação. **Nunca** access key no container |
| **Task execution role** | Permissão para puxar do ECR e logar |
| **Secrets** | Injetados do **Secrets Manager** ou **Parameter Store** na task definition |
| **Security group por task** | Com network mode `awsvpc` |
| **Imagem** | **ECR** com scan de vulnerabilidade (**Amazon Inspector** varre imagens no ECR) |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[Fargate]] · [[EKS]] · [[ELB (Load Balancers)]] · [[Secrets Manager]] · [[Inspector]] · [[SQS]]
