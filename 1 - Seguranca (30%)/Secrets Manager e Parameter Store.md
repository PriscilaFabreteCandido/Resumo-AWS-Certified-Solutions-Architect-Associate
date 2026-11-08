---
tags: [saa-c03, dominio-1, secrets-manager, parameter-store, systems-manager]
dominio: 1
tasks: [1.2]
atualizado: 2026-11-08
---

# Secrets Manager × Parameter Store (e o resto do Systems Manager)

## 🧩 Em 30 segundos

| | **Secrets Manager** | **Parameter Store** |
|---|---|---|
| Rotação automática | **Sim**, nativa para bancos | **Nenhuma** |
| Custo | **Por secret/mês + por chamada de API** | Tier **Standard grátis**; Advanced cobrado |
| Tamanho do valor | — | Standard **4 KB** · Advanced **8 KB** |
| Quantidade | — | Standard **10.000** · Advanced **100.000** |
| Replicação cross-Region | Sim | Não (cross-account só no Advanced) |
| Tipos | Secret (JSON) | `String`, `StringList`, `SecureString` |

**Regra de decisão**: o enunciado fala em **rotação automática** → Secrets Manager. Fala em **menor custo** e é configuração → Parameter Store.

## 🧠 Teste-se primeiro

> [!question]- Qual a frase oficial que separa os dois?
> Na tabela de comparação da própria doc do Parameter Store:
> **Credential rotation** → Parameter Store: **"None"** · Secrets Manager: **"Automatic, with native database integrations"**.
> **Cost** → Parameter Store: *"Standard tier free; advanced tier and higher throughput billed"* · Secrets Manager: *"Billed per secret per month and per API call"*.
>
> E a recomendação: *"For secrets such as database credentials, API keys, or tokens, we recommend AWS Secrets Manager."*

> [!question]- SecureString do Parameter Store é criptografado? Então por que não usar sempre?
> É criptografado — *"Parameter Store encrypts the values using AWS Key Management Service"*. O que falta é **rotação automática** e a integração nativa com RDS/Aurora/Redshift/DocumentDB.
> Se o enunciado não pedir rotação, SecureString + KMS é uma resposta legítima e **mais barata**.

> [!question]- Como acessar uma instância EC2 em subnet privada sem bastion e sem porta 22 aberta?
> **Systems Manager Session Manager**: *"provides secure node management without the need to open inbound ports, maintain bastion hosts, or manage SSH keys."*
> Pré-requisito: o **SSM Agent** instalado e com rota para o serviço (NAT gateway ou **interface endpoints** do SSM — a doc cita *"AWS PrivateLink support for managed nodes without public IP addresses"*).

## Parameter Store — tabela de tiers (oficial)

| | Standard | Advanced |
|---|---|---|
| Parâmetros por conta/região | 10.000 | 100.000 |
| Tamanho máximo do valor | **4 KB** | **8 KB** |
| Parameter policies (expiração, notificação) | Não suportado | **Suportado** |
| Compartilhamento cross-account | Não suportado | **Suportado** |
| Mudança de tier | Upgradeable | **Não downgradeable** |
| Custo | **Sem cobrança adicional** | **Cobrado** |

Guarda as **100 versões** mais recentes de cada parâmetro. Hierarquia por `/` (`/prod/app/db/host`) é o padrão esperado em prova.

## Systems Manager — os componentes que caem

| Componente | Para quê |
|---|---|
| **Session Manager** | Shell sem porta aberta, sem bastion, sem chave SSH. Log em CloudTrail, S3, CloudWatch Logs |
| **Patch Manager** | *"automates the process of patching managed nodes"*. Scan, ou scan and install. Patch baseline define o que é compliant. ⚠️ *"doesn't support upgrading major versions of operating systems"* |
| **Run Command** | Executar comando em massa, sem SSH |
| **Parameter Store** | Configuração e secrets simples |
| **Automation** | Runbooks (criar AMI, aplicar patch, remediar) |
| **Inventory / Fleet Manager** | Inventário de software e gestão de nós |

Pré-requisito comum: o nó precisa ser **managed**, o que significa *"SSM Agent is installed on the machine and the agent can communicate with the Systems Manager service"* — e precisa de uma **instance profile** com a policy do SSM.

## ❓ Questões de prova

> [!example]- Q1 — A política de segurança exige que a senha do banco troque a cada 30 dias automaticamente, sem intervenção. Qual serviço, e o que mais é necessário?
> **A)** Parameter Store SecureString com Lambda agendada por EventBridge
> **B)** **Secrets Manager com rotação habilitada e o secret associado ao banco** ✅
> **C)** KMS com rotação automática anual
> **D)** IAM database authentication
>
> **Por que B**: rotação automática com integração nativa de banco é exatamente o diferencial documentado do Secrets Manager.
> **A errada**: funciona, mas você constrói e mantém a rotação — mais esforço operacional, que é o critério implícito.
> **C errada**: KMS rotaciona **chave de criptografia** (anualmente), não senha de banco. E não recriptografa nada.
> **D errada**: elimina a senha (usa token IAM), mas muda a forma de autenticar; não é "rotação de secret".

> [!example]- Q2 — Um time precisa guardar 2.000 parâmetros de configuração (endpoints, flags, nomes de bucket) de forma centralizada, versionada e **com o menor custo possível**. Qual serviço?
> **A)** Secrets Manager
> **B)** **Parameter Store, tier Standard** ✅
> **C)** DynamoDB com uma tabela de configuração
> **D)** Arquivo JSON no S3 lido no boot
>
> **Por que B**: 2.000 parâmetros cabem no limite de 10.000 do Standard, valores de configuração cabem em 4 KB, há versionamento nativo (100 versões) — e o tier Standard **não tem cobrança adicional**.
> **A errada**: Secrets Manager cobra **por secret por mês**; 2.000 secrets de configuração é desperdício.
> **C errada**: funciona, mas você constrói versionamento, hierarquia e integração à mão.
> **D errada**: sem versionamento, sem controle de acesso granular por parâmetro.

> [!example]- Q3 — Auditoria exige acabar com os bastion hosts e com chaves SSH, mantendo registro de todas as sessões administrativas em instâncias de subnets privadas sem acesso à internet. Qual solução?
> **A)** NAT gateway + SSH com chave rotacionada por Lambda
> **B)** **SSM Session Manager, com interface endpoints do Systems Manager na VPC e log das sessões no S3/CloudWatch Logs** ✅
> **C)** EC2 Instance Connect
> **D)** VPN cliente para a subnet privada
>
> **Por que B**: resolve os três requisitos de uma vez — sem porta aberta, sem chave, com log. Os endpoints evitam depender de internet.
> **A errada**: mantém a porta 22, a chave e o NAT.
> **C errada**: Instance Connect ainda usa SSH na porta 22 e depende de alcançabilidade de rede.
> **D errada**: dá rede, mas não elimina SSH, chave nem bastion, e não registra a sessão.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Parameter Store rotaciona SecureString | **Não rotaciona nada** |
| Secrets Manager é sempre a resposta | Se o enunciado pede **menor custo** e não fala de rotação, é Parameter Store |
| Advanced tier pode voltar para Standard | *"Not downgradeable"* |
| Session Manager precisa de porta 22 | Precisa do **SSM Agent** e de rota para o serviço. Porta nenhuma de inbound |
| Session Manager loga tudo sempre | *"Logging isn't available for Session Manager sessions that connect through port forwarding or SSH"* |
| Patch Manager atualiza versão do SO | *"doesn't support upgrading major versions of operating systems"* |
| SSM funciona sem instance profile | Precisa de role com a policy do SSM na instância |

## Links

- [[01 - Dominio 1 - Design Secure Architectures (30%)]]
- [[Criptografia - KMS, CloudHSM e ACM]]
- [Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html)
- [Session Manager](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html)
