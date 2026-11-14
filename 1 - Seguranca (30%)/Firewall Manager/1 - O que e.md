---
tags: [saa-c03, firewall-manager, multi-conta]
servico: AWS Firewall Manager
tipo: Gestão central de proteções
dominios: [1]
atualizado: 2026-11-08
---

# AWS Firewall Manager — O que é

> [!info] Em uma frase
> Aplica e audita **políticas de proteção** em **todas as contas** de uma AWS Organizations de uma vez — e garante que recursos **novos** herdem a política automaticamente.

## O que ele gerencia

| Proteção |
|---|
| **AWS WAF** (web ACLs) |
| **AWS Shield Advanced** |
| **Security groups** de VPC |
| **Network ACLs** |
| **AWS Network Firewall** |
| **Route 53 Resolver DNS Firewall** |

## O gatilho de prova

Uma palavra decide: **"várias contas"**, **"toda a organização"**, **"automaticamente em recursos novos"**.

| Enunciado | Resposta |
|---|---|
| "proteger esta aplicação contra SQL injection" | **WAF** |
| "garantir que **toda** aplicação nova nas **60 contas** tenha a web ACL corporativa" | **Firewall Manager** |
| "detectar security group com porta 22 aberta e corrigir" | **AWS Config** + remediação |
| "auditar e **padronizar** security groups em todas as contas" | **Firewall Manager** |

## Pré-requisitos

- **AWS Organizations** habilitada, com todas as features
- Uma conta designada como **administradora do Firewall Manager**
- **AWS Config** habilitado nas contas

## Links

- [[1 - Seguranca (30%)/Firewall Manager/2 - Decorar|2 - Decorar]] · [[1 - Seguranca (30%)/Firewall Manager/3 - Detalhes|3 - Detalhes]] · [[1 - Seguranca (30%)/Firewall Manager/4 - Questoes|4 - Questoes]]
- [[1 - Seguranca (30%)/WAF/1 - O que e|WAF]] · [[1 - Seguranca (30%)/Shield/1 - O que e|Shield]] · [[1 - Seguranca (30%)/Security Groups/1 - O que e|Security Groups]] · [[1 - Seguranca (30%)/NACL (Network ACL)/1 - O que e|NACL (Network ACL)]] · [[1 - Seguranca (30%)/Config/1 - O que e|Config]] · [[1 - Seguranca (30%)/Organizations e Control Tower/1 - O que e|Organizations e Control Tower]]
