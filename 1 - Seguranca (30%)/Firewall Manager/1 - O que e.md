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

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[WAF]] · [[Shield]] · [[Security Groups]] · [[NACL (Network ACL)]] · [[Config]] · [[Organizations e Control Tower]]
