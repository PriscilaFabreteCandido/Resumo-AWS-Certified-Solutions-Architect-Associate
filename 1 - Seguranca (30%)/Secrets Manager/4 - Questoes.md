---
tags: [saa-c03, secrets-manager, questoes]
servico: AWS Secrets Manager
atualizado: 2026-11-08
---

# Secrets Manager — Questões

> [!question]- Q1. A política exige que a senha do banco troque a cada 30 dias automaticamente, sem intervenção.
> **A)** Parameter Store SecureString com Lambda agendada por EventBridge
> **B)** **AWS Secrets Manager com rotação habilitada, associado ao banco** ✅
> **C)** KMS com rotação automática anual
> **D)** IAM database authentication
>
> **Por que B**: rotação automática com integração nativa de banco é o diferencial documentado.
> **A errada**: funciona, mas você constrói e mantém a rotação.
> **C errada**: KMS rotaciona **chave de criptografia**, não senha — e não recriptografa nada.
> **D errada**: elimina a senha (boa prática), mas muda o método de autenticação; não é "rotação de secret".

> [!question]- Q2. 2.000 parâmetros de configuração, versionados, com o **menor custo possível**.
> **A)** Secrets Manager
> **B)** **Parameter Store, tier Standard** ✅
> **C)** DynamoDB
> **D)** Arquivo JSON no S3
>
> **Por que B**: cabe nos 10.000 parâmetros e 4 KB do Standard, tem versionamento nativo (100 versões) e **não tem cobrança adicional**.
> **A errada**: cobra **por secret por mês** — 2.000 secrets de configuração é desperdício.
> **C e D erradas**: você reconstrói versionamento, hierarquia e controle de acesso por item.

> [!question]- Q3. A aplicação não pode perder conexões durante a rotação da senha. Qual configuração?
> **A)** Rotação single user, de madrugada
> **B)** **Rotação alternating users, idealmente com RDS Proxy na frente** ✅
> **C)** Desabilitar a rotação
> **D)** Replicar o secret para outra região
>
> **Por que B**: alternating users mantém dois usuários válidos, então não existe instante em que a credencial antiga pare de funcionar. O RDS Proxy ainda preserva as conexões da aplicação.
> **A errada**: reduz o impacto, mas ainda há janela.
> **D errada**: replicação é para DR, não para rotação sem downtime.

> [!question]- Q4. A conta B precisa ler um secret da conta A. O acesso falha mesmo com a resource policy correta no secret. O que falta?
> **A)** Replicar o secret para a conta B
> **B)** **A key policy da chave KMS (customer managed) precisa liberar a conta B** ✅
> **C)** Habilitar rotação
> **D)** Criar um VPC endpoint
>
> **Por que B**: o secret é criptografado com KMS, e a key policy é exceção que *"must explicitly allow access for principals"*.
> ⚠️ E se o secret estiver usando a **AWS managed key** `aws/secretsmanager`, o compartilhamento cross-account **não é possível** — precisa de customer managed key.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Parameter Store rotaciona SecureString | **"None"** — não rotaciona nada |
| Secrets Manager é sempre a resposta | Se pede **menor custo** e é configuração, é Parameter Store |
| KMS rotaciona senha de banco | KMS rotaciona **chave**, não credencial |
| Secret cross-account só precisa de resource policy | Precisa também da **key policy** do KMS — e de **customer managed key** |
| Rotação sempre causa downtime | **Alternating users** evita |
| Secrets Manager funciona com Aurora Global Database | *"Secrets Manager doesn't support Aurora Global Database"* |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
