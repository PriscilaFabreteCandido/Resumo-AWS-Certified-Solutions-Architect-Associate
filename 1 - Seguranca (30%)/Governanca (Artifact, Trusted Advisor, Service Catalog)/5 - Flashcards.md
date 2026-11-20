---
servico: Governança (AWS Artifact, Trusted Advisor, Service Catalog)
fonte: "[[1 - Seguranca (30%)/Governanca (Artifact, Trusted Advisor, Service Catalog)/2 - Decorar|2 - Decorar]]"
---

# Governança — Flashcards

#flashcards/saa-c03/d1-seguranca/governanca

Onde baixar relatórios SOC/PCI/ISO da AWS para o auditor?::**AWS Artifact**

Onde aceitar o BAA da HIPAA?::**AWS Artifact**

Serviço que dá recomendações de custo, performance, segurança, tolerância a falha e limites?::**Trusted Advisor**

Cinco categorias de checagem do Trusted Advisor?::**Cost optimization**, **performance**, **security**, **fault tolerance**, **service limits**

Que plano de suporte libera as checagens completas do Trusted Advisor?::**Business** ou **Enterprise** (o básico libera só um subconjunto)

"Estou perto do limite de serviço?": quais serviços respondem?::**Trusted Advisor** ou **Service Quotas**

Times devem lançar só arquiteturas aprovadas, em self-service com governança: qual serviço?::**Service Catalog**

O que é um product no Service Catalog?::Um **template CloudFormation** versionado

O que é um portfolio no Service Catalog?::Conjunto de **products**, com permissões

Quem cria de fato os recursos lançados pelo Service Catalog?::A **launch role**; o usuário só tem permissão de lançar o produto

O que uma constraint do Service Catalog limita?::Tipos de instância permitidos, **região**, **role de lançamento**

A AWS tem um incidente afetando meus recursos: onde ver?::**AWS Health Dashboard**

Rightsizing de instância: qual serviço?::**Compute Optimizer**

Artifact mede a conformidade de quem?::**Da AWS** (Config, Security Hub e Audit Manager medem a **sua**)

Rastrear licenças de software: qual serviço?::**License Manager**
