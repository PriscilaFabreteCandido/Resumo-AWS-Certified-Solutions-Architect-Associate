---
servico: VPC Endpoints e AWS PrivateLink
fonte: "[[1 - Seguranca (30%)/VPC Endpoints e PrivateLink/2 - Decorar|2 - Decorar]]"
---

# VPC Endpoints e PrivateLink — Flashcards

#flashcards/saa-c03/d1-seguranca/vpc-endpoints-privatelink

Serviços suportados pelo gateway endpoint?::**S3 e DynamoDB** apenas

Mecanismo do gateway endpoint × interface endpoint?::Gateway: **rota** com prefix list. Interface: **ENI** com IP privado

Qual tipo de endpoint usa PrivateLink?::**Interface endpoint**

Custo do gateway endpoint × interface endpoint?::Gateway: **grátis**. Interface: por **hora** e por **GB**

Qual endpoint funciona a partir de on-premises (via DX/VPN)?::**Interface endpoint** (gateway endpoint não)

Qual tipo de endpoint aceita security group?::**Interface endpoint** (é uma ENI)

Rota 0.0.0.0/0 para IGW coexiste com rota do gateway endpoint: qual vence para o serviço?::A do **endpoint** (longest-prefix match), na **região atual**

Tráfego para S3 de outra região usa o gateway endpoint?::**Não**, continua saindo pelo internet gateway

Subnet sem a rota do gateway endpoint acessa o serviço como?::Pelo endpoint **público** do serviço

Posso modificar as rotas criadas pelo gateway endpoint?::**Não** diretamente; a AWS as cria

Quantas ENIs um interface endpoint cria?::**Uma por subnet** indicada

Para expor seu serviço via PrivateLink, que load balancer o produtor usa?::**NLB** (ou GWLB), atrás de um **endpoint service**

CIDR sobreposto entre produtor e consumidor impede o PrivateLink?::**Não**; não há roteamento de redes

A NACL precisa permitir o tráfego para os CIDRs do serviço do endpoint?::**Sim** (e NACL não aceita prefix list)
