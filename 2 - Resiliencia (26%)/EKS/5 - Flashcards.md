---
servico: Amazon EKS
fonte: "[[2 - Resiliencia (26%)/EKS/2 - Decorar|2 - Decorar]]"
---

# EKS — Flashcards

#flashcards/saa-c03/d2-resiliencia/eks

Control plane do ECS × do EKS: qual é cobrado?::**EKS**, por hora, por cluster; o do **ECS** é grátis

Enunciado pede containers com menor esforço operacional, sem citar Kubernetes: ECS ou EKS?::**ECS**

Gatilhos no enunciado que apontam para EKS?::**Kubernetes**, **portabilidade** (multi-nuvem, on-premises), **Helm**, operators

Como decidir quais pods do EKS rodam no Fargate?::**Fargate profiles**, com seletores por **namespace** e **label**

Limitações do Fargate no EKS?::**Um pod por nó**, sem **DaemonSet**, sem **privileged**, sem **GPU**

Managed node groups × self-managed nodes no EKS?::**Managed**: a AWS provisiona e faz upgrade do ASG de EC2. **Self-managed**: você cuida de tudo

Como rodar EKS on-premises com plano de controle local?::**EKS Anywhere**

Como dar uma IAM role a um pod do EKS?::**IRSA** (IAM Roles for Service Accounts), equivalente à task role do ECS

Componente do EKS que cria ALB (Ingress) e NLB (Service type LoadBalancer)?::**AWS Load Balancer Controller**

Por que um cluster EKS grande pode esgotar a subnet?::O **VPC CNI** dá a cada pod um **IP da VPC**

Como fornecer volumes persistentes aos pods do EKS?::Drivers **EBS CSI** e **EFS CSI**

Ferramentas que escalam os nós do EKS?::**Cluster Autoscaler** ou **Karpenter**
