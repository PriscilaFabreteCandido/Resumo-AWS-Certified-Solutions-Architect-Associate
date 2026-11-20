---
servico: AWS Firewall Manager
fonte: "[[1 - Seguranca (30%)/Firewall Manager/2 - Decorar|2 - Decorar]]"
---

# Firewall Manager — Flashcards

#flashcards/saa-c03/d1-seguranca/firewall-manager

O que o Firewall Manager gerencia?::**WAF**, **Shield Advanced**, **security groups**, **NACLs**, **Network Firewall** e **Route 53 Resolver DNS Firewall**

Três pré-requisitos do Firewall Manager?::**Organizations** com todas as features, conta **administradora** designada e **AWS Config** habilitado

Por que o Firewall Manager precisa do AWS Config?::O Config fornece o **inventário** de recursos

Policy do Firewall Manager que aplica um SG padrão?::Security group policy **Common**

Policy de SG que encontra SG fora de padrão?::**Audit**

Policy de SG que encontra SG órfão?::**Usage audit**

A que recursos uma WAF policy aplica a mesma web ACL?::**ALBs**, distribuições **CloudFront** e **APIs REST**

O que faz a Shield Advanced policy?::**Inscreve recursos** no Shield Advanced automaticamente

Aplicar e manter WAF/SG/NACL/Shield em todas as contas: qual serviço?::**Firewall Manager**

Impedir uma ação em todas as contas: qual serviço?::**SCP**

Firewall Manager é grátis?::**Não**: cobrado por policy e por recurso protegido
