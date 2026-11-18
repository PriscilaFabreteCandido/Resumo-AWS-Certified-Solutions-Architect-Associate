---
tags: [saa-c03, criptografia, detalhes]
conceito: Criptografia em repouso e em trânsito
atualizado: 2026-11-08
---

# Criptografia — Detalhes

## 1. Envelope encryption — o mecanismo do KMS

O KMS **não cifra seus dados**. Ele cifra **chaves**. O limite é explícito: a operação `Encrypt` aceita no máximo **4.096 bytes**.

O fluxo real, que todo serviço integrado usa:

```
1. Serviço chama GenerateDataKey na KMS key
2. KMS devolve DUAS coisas:
   ├─ a data key em CLARO  (plaintext)
   └─ a data key CIFRADA   (ciphertext blob)
3. Serviço cifra o dado com a data key em claro (AES-256, localmente)
4. Serviço DESCARTA a data key em claro da memória
5. Serviço guarda a data key CIFRADA junto do dado

Para ler:
6. Chama Decrypt com a data key cifrada → KMS devolve em claro
7. Decifra o dado localmente
```

Consequências de prova:
- O dado **nunca** passa pelo KMS. Só a chave.
- **Revogar o acesso à KMS key torna o dado ilegível**, mesmo que o arquivo continue lá. É a base da resposta "como garantir que ninguém leia os snapshots antigos".
- Cada `Decrypt` é uma chamada à API → conta para a **quota de requisições** e aparece no **CloudTrail**.
- **S3 Bucket Keys** reduzem drasticamente as chamadas ao KMS (e o custo) em buckets com muitos objetos SSE-KMS.

## 2. Em repouso: o que exige qual chave

| Requisito do enunciado | Resposta |
|---|---|
| *"encrypted at rest"* (criptografado em repouso), sem mais nada | A opção **padrão** do serviço já serve |
| *"we must control who can use the key"* | **Customer managed key** (tem **key policy**) |
| *"audit every use of the key"* | **SSE-KMS** / CMK → **CloudTrail** registra cada `Decrypt` |
| *"rotate keys annually"* | **AWS managed** já faz; CMK com rotação **habilitada** |
| *"rotate on our own schedule"* / *"revoke"* | **Customer managed key** |
| *"share encrypted snapshot with another account"* | **Customer managed key** (não é possível com AWS managed) |
| *"keys must never leave hardware we control"*, *"FIPS 140-3 Level 3"*, *"single-tenant HSM"* (HSM de inquilino único) | **CloudHSM** |
| *"AWS must never have access to the plaintext"* | **Client-side encryption** (ou **SSE-C**) |
| *"double encryption"* | **DSSE-KMS** |

> [!warning] As duas pegadinhas de chave
> 1. **Compartilhar snapshot cifrado entre contas só funciona com customer managed key.** Com `aws/ebs` (AWS managed) o compartilhamento é bloqueado.
> 2. **Deletar uma KMS key é irreversível e assíncrono**: período de espera de **7 a 30 dias** (padrão 30). Se o requisito é "parar o acesso **agora**, podendo voltar atrás", a resposta é **desabilitar** a chave ou alterar a policy — não deletar.

## 3. O caso do RDS — a pegadinha mais cobrada

Criptografia em repouso no RDS/Aurora **só pode ser habilitada na criação**. Um banco já existente não cifrado não se converte no lugar. O caminho oficial:

```
snapshot do banco → COPIAR o snapshot habilitando a criptografia
                  → restaurar a cópia (nova instância, cifrada)
                  → apontar a aplicação para o novo endpoint
```

E o inverso também vale: **não se remove** a criptografia de um banco cifrado.

Note o contraste:

| Serviço | Pode cifrar depois? |
|---|---|
| **S3** | Sim — mudar a configuração do bucket (afeta objetos **novos**; os antigos exigem **copiar sobre si** ou **S3 Batch Operations**) |
| **EBS** | **Não no volume**; snapshot → copiar cifrado → novo volume |
| **RDS / Aurora** | **Não**; snapshot → copiar cifrado → restaurar |
| **EFS** | **Não**; novo filesystem + **DataSync** |
| **DynamoDB** | Já é sempre cifrado; **pode trocar o tipo de chave** depois |

## 4. Em trânsito

**TLS** é a resposta quase sempre, e o **ACM** é quem fornece o certificado:

- Certificado **público** do ACM: **gratuito** e com **renovação automática** (quando a validação é por DNS e o registro CNAME permanece).
- O ACM **não exporta** a chave privada de um certificado público — só certificados do **ACM Private CA** podem ser exportados. Se o enunciado diz *"instalar o certificado numa instância EC2"* ou num servidor on-premises, o certificado público do ACM **não serve**; é Private CA ou certificado de terceiros importado.
- Para **CloudFront**, o certificado tem de estar em **us-east-1**.

**Forçar** o uso de TLS:

| Serviço | Como |
|---|---|
| **S3** | Bucket policy com `Deny` quando `"aws:SecureTransport": "false"` |
| **RDS MySQL/Aurora MySQL** | `require_secure_transport = ON` |
| **RDS PostgreSQL** | `rds.force_ssl = 1` |
| **ALB** | Listener 80 com regra de **redirect para 443** |
| **CloudFront** | Viewer protocol policy **Redirect HTTP to HTTPS** ou **HTTPS only** |
| **API Gateway** | TLS obrigatório; defina a **TLS security policy** mínima |

**End-to-end**: o enunciado que pede *"criptografado em todo o caminho"* exige HTTPS **também** entre o load balancer e os alvos (target group em HTTPS) ou o uso de **NLB com TCP passthrough**, deixando o TLS terminar na própria instância.

**Rede híbrida**:

| Conexão | Cifrada? |
|---|---|
| **Site-to-Site VPN** | **Sim** — IPsec |
| **Direct Connect** | **Não por padrão** → **MACsec** (onde suportado) ou **VPN IPsec sobre o DX** |
| Entre AZs da mesma Região | **Sim**, pela AWS |
| Dentro da VPC entre instâncias Nitro | Cifrado pela AWS entre tipos suportados — mas o requisito de aplicação ainda é TLS |

## 5. O que não é criptografia (e a prova mistura)

| Serviço | O que realmente faz |
|---|---|
| **Secrets Manager** | Guarda e **rotaciona** segredos (cifrados com KMS). Não cifra seus dados de aplicação |
| **Parameter Store SecureString** | Guarda parâmetro cifrado com KMS — **sem rotação gerenciada** |
| **Macie** | **Descobre** dado sensível no S3; não cifra |
| **ACM** | Emite/gerencia **certificados**; não cifra em repouso |
| **CloudHSM** | HSM **single-tenant**, FIPS 140-3 nível 3, chave sob **seu** controle exclusivo |
| **Object Lock** | **Imutabilidade** (WORM), não confidencialidade |

## Links

- [[9 - Fundamentos e apoio/Criptografia em repouso e em transito/1 - O que e|1 - O que e]] · [[9 - Fundamentos e apoio/Criptografia em repouso e em transito/2 - Decorar|2 - Decorar]] · [[9 - Fundamentos e apoio/Criptografia em repouso e em transito/4 - Questoes|4 - Questoes]]
- [[1 - Seguranca (30%)/KMS/1 - O que e|KMS]] · [[1 - Seguranca (30%)/CloudHSM/1 - O que e|CloudHSM]] · [[1 - Seguranca (30%)/ACM (Certificate Manager)/1 - O que e|ACM (Certificate Manager)]] · [[1 - Seguranca (30%)/Secrets Manager/1 - O que e|Secrets Manager]] · [[1 - Seguranca (30%)/Systems Manager (e Parameter Store)/1 - O que e|Systems Manager (e Parameter Store)]] · [[1 - Seguranca (30%)/Macie/1 - O que e|Macie]] · [[3 - Performance (24%)/S3/1 - O que e|S3]] · [[2 - Resiliencia (26%)/RDS/1 - O que e|RDS]] · [[3 - Performance (24%)/Direct Connect/1 - O que e|Direct Connect]] · [[3 - Performance (24%)/VPN (Site-to-Site)/1 - O que e|VPN (Site-to-Site)]]
