---
servico: AWS Fargate
fonte: "[[2 - Resiliencia (26%)/Fargate/2 - Decorar|2 - Decorar]]"
---

# Fargate — Flashcards

#flashcards/saa-c03/d2-resiliencia/fargate

Quais são as quatro opções de capacidade do ECS?::**AWS Fargate**, **ECS Managed Instances**, **EC2 instances** e **ECS Anywhere**

Opção de capacidade do ECS para servidores e VMs on-premises?::**Amazon ECS Anywhere**

Opção do ECS em que a AWS gerencia provisionamento, patch e escala de instâncias EC2?::**Amazon ECS Managed Instances**

Duração máxima de execução no Lambda × Fargate?::Lambda **15 min**; Fargate **sem limite**

Fargate suporta GPU ou acesso ao host?::**Não** (só EC2 tem)

Unidade de execução e cobrança do Fargate?::**Container (task/pod)**, cobrado por **vCPU e memória da task, por segundo**

No Fargate, quem gerencia o SO?::A **AWS**

Onde se define a subnet de uma task Fargate?::No **run-task** ou na criação do **service**

Como uma task numa subnet privada acessa a internet?::Pelo **NAT gateway** (outra opção citada: **AWS PrivateLink**)

Para que tipo de workload usar Fargate Spot?::Só workload **tolerante a interrupção** (capacidade com desconto)

Combinação típica de capacity provider strategy com Fargate?::**FARGATE** como base garantida e **FARGATE_SPOT** como excedente barato
