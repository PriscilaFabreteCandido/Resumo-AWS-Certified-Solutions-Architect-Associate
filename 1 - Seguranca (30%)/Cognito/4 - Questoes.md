---
tags: [saa-c03, cognito, questoes]
servico: Amazon Cognito
atualizado: 2026-11-08
---

# Cognito — Questões

> [!question]- Q1. Um app mobile precisa que usuários autenticados com conta Google gravem fotos em um prefixo próprio no S3.
> **A)** IAM user por usuário, com access key no app
> **B)** **Cognito user pool federado com o Google + identity pool trocando o token por credencial AWS, com role restrita por prefixo** ✅
> **C)** API Gateway com API key por usuário
> **D)** Bucket público com nomes de pasta aleatórios
>
> **Por que B**: user pool autentica (incluindo federação social), identity pool entrega a credencial AWS.
> **A errada**: IAM user não escala para usuário final e põe credencial de longo prazo no dispositivo.
> **C errada**: API key é controle de **uso**, não identidade.
> **D errada**: segurança por obscuridade.

> [!question]- Q2. O app já autentica via user pool. Por que ele ainda não consegue ler o DynamoDB diretamente?
> **A)** Falta habilitar MFA
> **B)** **O user pool só emite JWT; é preciso um identity pool para obter credencial AWS** ✅
> **C)** O DynamoDB não aceita Cognito
> **D)** Falta um VPC endpoint
>
> **Por que B**: é a pegadinha central do tema.

> [!question]- Q3. Uma API no API Gateway REST precisa validar o token emitido pelo Cognito antes de invocar a Lambda.
> **A)** API key no usage plan
> **B)** **Cognito authorizer no método do API Gateway** ✅
> **C)** IAM authorizer
> **D)** Resource policy
>
> **Por que B**: o Cognito authorizer valida o JWT do user pool nativamente.
> **A errada**: API key mede e limita uso; não autentica.
> **C errada**: IAM authorizer é para chamador que assina com SigV4 (principal AWS).
> ⚠️ Na **HTTP API**, o equivalente é o **JWT authorizer**.

> [!question]- Q4. O endpoint de login está sofrendo credential stuffing. O que colocar na frente?
> **A)** NACL negando os IPs
> **B)** **AWS WAF com rate-based rule associado ao Cognito user pool** ✅
> **C)** Shield Advanced
> **D)** Security group restritivo
>
> **Por que B**: a lista oficial de recursos do WAF inclui **Amazon Cognito user pool**, e rate-based rule é o controle para flood por IP.
> **C errada**: Shield é DDoS volumétrico, não abuso de credencial.

> [!question]- Q5. Usuários **não autenticados** precisam de acesso de leitura a um bucket público-restrito. É possível com Cognito?
> **A)** Não
> **B)** **Sim: o identity pool emite credencial para guest users** ✅
> **C)** Só com user pool
> **D)** Só com IAM user anônimo
>
> **Por que B**: *"An identity pool can also issue limited-privilege credentials to guest users who haven't signed in."*

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| User pool dá acesso ao S3 | Dá **JWT**. Credencial AWS vem do **identity pool** |
| Identity pool precisa de user pool | São **independentes** |
| Cognito serve para funcionários | Funcionários = **IAM Identity Center** |
| Cognito substitui o IAM | O IAM continua autorizando a credencial temporária |
| Guest não tem acesso nenhum | Identity pool emite credencial para **guest** |
| WAF não funciona no Cognito | **Funciona** — user pool está na lista oficial |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
