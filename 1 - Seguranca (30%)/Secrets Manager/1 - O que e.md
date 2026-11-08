---
tags: [saa-c03, secrets-manager, seguranca]
servico: AWS Secrets Manager
tipo: Gestão de secrets
dominios: [1]
atualizado: 2026-11-08
---

# AWS Secrets Manager — O que é

> [!info] Em uma frase
> Guarda **secrets** (senha de banco, API key, token) criptografados com KMS, e os **rotaciona automaticamente** com integração nativa para bancos de dados.

## O que é, em palavras simples

É o cofre de senhas da aplicação. Em vez de a senha do banco estar no código, numa variável de ambiente ou num arquivo de configuração, ela fica no Secrets Manager e a aplicação a busca por API em tempo de execução.

O diferencial sobre o Parameter Store é **um só**, e a prova gira em torno dele: **rotação automática**.

A tabela oficial da doc do Parameter Store coloca assim:

| Credential rotation | |
|---|---|
| **Parameter Store** | **"None"** |
| **Secrets Manager** | **"Automatic, with native database integrations"** |

## Quando é a resposta

| Enunciado diz | Resposta |
|---|---|
| "rotação automática a cada N dias" | **Secrets Manager** |
| "senha de banco", "credencial", "API key", "token" | **Secrets Manager** (recomendação oficial) |
| "replicar o secret para outra região" | **Secrets Manager** |
| "menor custo" + é **configuração**, não secret | **Parameter Store** (tier Standard é grátis) |

A recomendação oficial: *"For secrets such as database credentials, API keys, or tokens, we recommend AWS Secrets Manager, which provides purpose built security controls including automatic rotation and cross-region replication."*

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[Systems Manager (e Parameter Store)]] · [[KMS]] · [[RDS]] · [[RDS Proxy]]
