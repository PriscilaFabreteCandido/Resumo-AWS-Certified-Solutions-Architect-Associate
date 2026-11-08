---
tags: [saa-c03, secrets-manager, detalhes]
servico: AWS Secrets Manager
atualizado: 2026-11-08
---

# Secrets Manager — Detalhes

## 1. Por que não basta "criptografar a senha"

O Parameter Store também criptografa (`SecureString` com KMS). O problema não é a criptografia: é que **uma senha que nunca muda é uma senha que vai vazar**.

Secrets Manager resolve o ciclo de vida:

1. Gera a nova senha
2. Aplica no banco
3. Testa a nova credencial
4. Promove a nova versão a `AWSCURRENT`
5. A aplicação, que sempre pede o `AWSCURRENT`, passa a usar a nova sem nenhuma alteração

Sem isso, "rotacionar senha" exige janela de manutenção e coordenação manual — exatamente o esforço operacional que a prova penaliza.

## 2. As duas estratégias de rotação

| Estratégia | Como funciona | Quando usar |
|---|---|---|
| **Single user** | Troca a senha do mesmo usuário do banco | Simples; há uma janela curta em que conexões antigas podem falhar |
| **Alternating users** | Mantém **dois** usuários e alterna entre eles | **Zero downtime**: o usuário antigo continua válido enquanto o novo é promovido |

Para aplicação que não tolera falha de conexão durante a rotação, a resposta é **alternating users** — e, no banco, **RDS Proxy** por cima, que preserva as conexões da aplicação durante trocas.

## 3. Versionamento por estágio

Um secret tem versões identificadas por **staging labels**:

- **`AWSCURRENT`** — a versão que a aplicação deve usar
- **`AWSPENDING`** — a versão nova, ainda em teste durante a rotação
- **`AWSPREVIOUS`** — a anterior, mantida para rollback

A aplicação chama `GetSecretValue` sem especificar versão e recebe o `AWSCURRENT`. Isso é o que torna a rotação transparente.

## 4. Acesso e compartilhamento

| Mecanismo | Uso |
|---|---|
| **IAM policy** | Quem pode `secretsmanager:GetSecretValue` |
| **Resource policy** no secret | Compartilhar com **outra conta** |
| **KMS key policy** | Se o secret usa **customer managed key**, a outra conta precisa de `kms:Decrypt` |
| **VPC endpoint** (interface) | Buscar o secret sem sair para a internet |

> [!warning] Cross-account exige os dois lados **mais** o KMS
> Para a conta B ler um secret da conta A: policy IAM na conta B + **resource policy** no secret + a **key policy** da chave KMS liberando a conta B. Esquecer o KMS é o erro clássico.
> E note: secret criptografado com a **AWS managed key** (`aws/secretsmanager`) **não** pode ser compartilhado entre contas — precisa de customer managed key. É o mesmo padrão do S3 com SSE-KMS.

## 5. Replicação cross-Region

O Secrets Manager replica o secret para outras regiões, mantendo as réplicas sincronizadas com a primária. É o que permite que uma aplicação em DR (pilot light, warm standby) leia a credencial na região secundária sem chamada cross-region.

⚠️ Detalhe de prova: a doc do **Aurora Global Database** avisa que *"Secrets Manager doesn't support Aurora Global Database. When you add a Region to a global database, you must first turn off Secrets Manager integration for the DB instance."*

## 6. Custo — por que não usar para tudo

Secrets Manager é *"Billed per secret per month and per API call"*. Para 2.000 parâmetros de configuração (endpoints, flags, nomes de bucket), isso é desperdício: o **Parameter Store Standard** guarda 10.000 parâmetros de até 4 KB **sem cobrança adicional**.

Regra prática:

| Tipo de dado | Serviço |
|---|---|
| Senha, token, API key, certificado privado | **Secrets Manager** |
| Endpoint, nome de bucket, feature flag, ARN | **Parameter Store** |
| Chave criptográfica | **KMS** (ou CloudHSM) |

## 7. Alternativa que elimina o secret

Em vez de rotacionar a senha, você pode **não ter senha**: **IAM database authentication** (RDS/Aurora) gera um token de 15 minutos a partir das credenciais IAM. O guia cita *"Application configuration and credentials security"* em Task 1.2, e essa é a opção mais forte quando a aplicação pode ser alterada.

O Secrets Manager continua sendo a resposta quando a aplicação **não** pode mudar o método de autenticação.

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[Systems Manager (e Parameter Store)]] · [[KMS]] · [[RDS Proxy]] · [[RDS]]
