---
servico: Amazon ECS
fonte: "[[2 - Resiliencia (26%)/ECS/2 - Decorar|2 - Decorar]]"
---

# ECS — Flashcards

#flashcards/saa-c03/d2-resiliencia/ecs

ECS task × service: qual mantém o desired count e integra com ELB?::**Service** (aplicação longa, sem estado); a **task** faz o trabalho e para

Para job em lote, migração ou tarefa pontual no ECS, task ou service?::**Task**

Recursos que só o launch type EC2 do ECS oferece (não o Fargate)?::**GPU**, **instance store** e estratégia **daemon** (1 por host)

No Fargate, quem faz patch do SO e dimensiona o cluster?::A **AWS**; você só declara **vCPU e memória** da task

Como o Fargate é cobrado?::Por **vCPU e memória da task**, por segundo

De onde vem a subnet da task no launch type EC2 e no Fargate?::EC2: subnet **da instância**. Fargate: definida no **run-task** ou na criação do **service**

Como uma task em subnet privada sai para a internet?::Via **NAT gateway** (outra opção citada: **AWS PrivateLink**)

Task role × task execution role no ECS?::**Task role**: permissões da **aplicação**. **Execution role**: do **agente ECS** (puxar imagem do ECR, enviar logs)

Como misturar capacidade base estável com excedente barato no ECS?::**Capacity provider strategy** com **FARGATE** (base) e **FARGATE_SPOT** (excedente)

Compute Savings Plans cobrem Fargate?::**Sim**

Métricas de target tracking do ECS Service Auto Scaling?::**CPU**, **memória** ou **`ALBRequestCountPerTarget`**

Registro de imagens padrão para o ECS?::**Amazon ECR**
