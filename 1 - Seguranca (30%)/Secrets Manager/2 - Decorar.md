---
tags: [saa-c03, secrets-manager, decorar]
servico: AWS Secrets Manager
atualizado: 2026-11-08
---

# Secrets Manager — Decorar

## Secrets Manager × Parameter Store (tabela oficial)

| | **Secrets Manager** | **Parameter Store** |
|---|---|---|
| **Rotação de credencial** | **"Automatic, with native database integrations"** | **"None"** |
| **Custo** | *"Billed per secret per month and per API call"* | *"Standard tier free; advanced tier and higher throughput billed"* |
| Tamanho do valor | — | Standard **4 KB** · Advanced **8 KB** |
| Quantidade | — | Standard **10.000** · Advanced **100.000** |
| Replicação cross-Region | **Sim** | Não (cross-**account** só no Advanced) |
| Criptografia | **KMS** | KMS (no tipo `SecureString`) |
| Tipos | Secret (JSON de pares chave-valor) | `String`, `StringList`, `SecureString` |

## A regra de decisão em uma linha

> Pediu **rotação** → Secrets Manager. Pediu **menor custo** e é **configuração** → Parameter Store.

## Rotação

| Item | Detalhe |
|---|---|
| Integração nativa | RDS, Aurora, Redshift, DocumentDB (e outros bancos AWS) |
| Secret customizado | Função **Lambda de rotação** que você fornece |
| Estratégias | **single user** (troca a senha do próprio usuário) e **alternating users** (alterna entre dois usuários, sem janela de indisponibilidade) |
| Versionamento | Estágios `AWSCURRENT`, `AWSPENDING`, `AWSPREVIOUS` |

## Integrações que caem

| Com | Para quê |
|---|---|
| **RDS Proxy** | O proxy busca a credencial no Secrets Manager — até **200 secrets por proxy** |
| **KMS** | Criptografa o secret (AWS managed `aws/secretsmanager` ou customer managed) |
| **Resource policy** | Compartilhar o secret com **outra conta** |
| **CloudFormation** | `{{resolve:secretsmanager:...}}` para não colocar senha no template |

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
