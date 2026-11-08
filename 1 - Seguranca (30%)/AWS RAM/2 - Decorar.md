---
tags: [saa-c03, ram, decorar]
servico: AWS Resource Access Manager (RAM)
atualizado: 2026-11-08
---

# AWS RAM — Decorar

## O que se compartilha (os que caem em prova)

| Recurso | Para quê |
|---|---|
| **Subnets da VPC** | **VPC sharing** — o caso nº 1 |
| **Transit Gateway** | Uma conta de rede gerencia o hub; as outras anexam suas VPCs |
| **Route 53 Resolver rules** | Resolução DNS híbrida centralizada |
| **License Manager configurations** | Licenças compartilhadas |
| **Service Catalog portfolios** | Catálogo central de produtos aprovados |
| **Aurora DB clusters** (snapshots/clusters) | Compartilhar banco entre contas |
| **Prefix lists gerenciadas** | Padronizar CIDRs em SGs e route tables |

## Dentro × fora da organização

| Escopo | Como |
|---|---|
| Contas **da organização** (ou de OUs específicas) | Direto, **sem convite** — mas o *sharing with AWS Organizations* precisa estar ativado |
| Contas **de fora** | Exige **convite** e aceite |
| **Roles e users IAM** específicos | Suportado para tipos de recurso aplicáveis |

## Fatos

| Item | Valor |
|---|---|
| Custo | **Sem cobrança adicional** |
| Região home | **us-east-1** (recursos globais) |
| Granularidade | Organização inteira, OUs específicas, contas, ou roles/users |

## RAM × as alternativas de rede

| Objetivo | Serviço |
|---|---|
| Várias contas usando **a mesma VPC** | **RAM (VPC sharing)** |
| Várias VPCs **separadas** se falando | **Transit Gateway** ou **VPC peering** |
| Expor **um serviço** entre contas | **PrivateLink** |
| Compartilhar **permissão** | **IAM role cross-account** |

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
