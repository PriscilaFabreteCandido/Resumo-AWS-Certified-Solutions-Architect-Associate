---
servico: AWS Compute Optimizer
fonte: "[[4 - Custo (20%)/Compute Optimizer/2 - Decorar|2 - Decorar]]"
---

# Compute Optimizer — Flashcards

#flashcards/saa-c03/d4-custo/compute-optimizer

Janela de análise padrão do Compute Optimizer?::**14 dias** de métricas

Janela de análise do Compute Optimizer com enhanced infrastructure metrics?::**93 dias**

O Compute Optimizer aplica a mudança de tamanho sozinho?::**Não.** Ele só **recomenda** (rightsizing)

Quais recursos o Compute Optimizer analisa?::**EC2**, **Auto Scaling groups**, **volumes EBS**, **Lambda** e **ECS no Fargate** (entre outros)

Além de recomendar tamanho, o que mais o Compute Optimizer identifica?::**Recursos ociosos**

Em que base o Compute Optimizer faz as recomendações?::Métricas de utilização do **CloudWatch** (14 ou 93 dias)

Qual serviço responde "a instância está do tamanho certo?"::**Compute Optimizer**

Qual serviço faz checagens amplas de custo, segurança, performance, tolerância a falha e limites?::**Trusted Advisor** (5 categorias de checagem)

Compute Optimizer × Trusted Advisor: qual tem mais profundidade no sizing?::**Compute Optimizer** (recomenda tipo específico); o Trusted Advisor só sinaliza instância ociosa

Que plano de suporte exige as checagens completas do Trusted Advisor?::**Business** ou **Enterprise**

Qual serviço usar para pedir aumento de quota?::**Service Quotas**

Como saber quanto cada time gastou?::**Cost allocation tags**, ativadas no **Billing**
