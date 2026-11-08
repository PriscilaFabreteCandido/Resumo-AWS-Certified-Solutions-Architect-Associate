---
tags: [saa-c03, firewall-manager, decorar]
servico: AWS Firewall Manager
atualizado: 2026-11-08
---

# Firewall Manager — Decorar

## O que ele gerencia (decore a lista)

**WAF** · **Shield Advanced** · **security groups** · **NACLs** · **Network Firewall** · **Route 53 Resolver DNS Firewall**

## Tipos de policy

| Tipo | Para quê |
|---|---|
| **WAF policy** | Aplica a mesma web ACL a ALBs, distribuições CloudFront e APIs REST |
| **Shield Advanced policy** | Inscreve recursos no Advanced automaticamente |
| **Security group policy** | **Common** (aplica um SG padrão), **Audit** (encontra SG fora de padrão), **Usage audit** (encontra SG órfão) |
| **Network ACL policy** | Padroniza NACLs |
| **Network Firewall policy** | Distribui firewall na VPC |
| **DNS Firewall policy** | Distribui regras de DNS |

## Pré-requisitos (caem em prova)

1. **AWS Organizations** com todas as features habilitadas
2. Conta **administradora** do Firewall Manager designada
3. **AWS Config** habilitado nas contas e regiões

> [!warning] Sem AWS Config, o Firewall Manager não enxerga os recursos
> É o mesmo padrão do Security Hub: o Config é o fornecedor de inventário.

## Firewall Manager × SCP × Config

| Objetivo | Serviço |
|---|---|
| **Impedir** uma ação em todas as contas | **SCP** |
| **Detectar** desvio e **remediar** | **AWS Config** |
| **Aplicar e manter** a proteção (WAF/SG/NACL/Shield) em todas as contas | **Firewall Manager** |

## Custo

Cobrado por policy e por recurso protegido. Organizations e RAM são grátis; **Firewall Manager não é**.

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
