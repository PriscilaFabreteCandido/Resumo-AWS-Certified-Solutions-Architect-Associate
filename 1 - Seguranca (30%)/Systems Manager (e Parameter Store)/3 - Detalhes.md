---
tags: [saa-c03, systems-manager, detalhes]
servico: AWS Systems Manager
atualizado: 2026-11-08
---

# Systems Manager — Detalhes

## 1. Session Manager — por que é sempre a resposta

O desenho tradicional de acesso administrativo tem três fraquezas: uma **porta 22 aberta** (mesmo que restrita), um **bastion host** para patchear e monitorar, e **chaves SSH** para distribuir e rotacionar.

A doc coloca o problema assim: deixar *"inbound SSH ports and remote PowerShell ports open... greatly increases the risk"*.

O Session Manager inverte: o **agente** na instância abre uma conexão **de saída** para o serviço, e a sessão trafega por ali. Resultado:

| Antes | Depois |
|---|---|
| Porta 22 aberta no SG | **Nenhuma porta de entrada** |
| Bastion em subnet pública | **Nenhum bastion** |
| Chave SSH distribuída | **Autenticação por IAM** |
| Log de sessão artesanal | Log em **S3 / CloudWatch Logs**, auditoria no **CloudTrail** |

Para instâncias **sem IP público e sem NAT**, a doc cita *"AWS PrivateLink support for managed nodes without public IP addresses"* — ou seja, **interface endpoints** do SSM (`ssm`, `ssmmessages`, `ec2messages`).

Também suporta **port forwarding** (túnel para um banco, por exemplo) — mas atenção: *"Logging isn't available for Session Manager sessions that connect through port forwarding or SSH"*.

## 2. Parameter Store — quando usar em vez do Secrets Manager

A comparação oficial resume: Parameter Store **não rotaciona** (*"None"*), Secrets Manager rotaciona *"Automatic, with native database integrations"*. E o custo: Standard é **grátis**, Secrets Manager é *"Billed per secret per month and per API call"*.

Regra de decisão:

| Tipo de dado | Serviço |
|---|---|
| Senha de banco, token, API key | **Secrets Manager** (rotação) |
| Endpoint, nome de bucket, ARN, feature flag | **Parameter Store Standard** (grátis) |
| Secret que **não** precisa rotacionar, e custo importa | **Parameter Store `SecureString`** |
| Chave criptográfica | **KMS** |

Recursos do Parameter Store que aparecem:
- **Hierarquia** por `/` (`/prod/app/db/host`) — permite policy IAM por prefixo
- **Versionamento** (100 versões)
- **Parameter policies** (só Advanced): expiração, notificação de não-uso
- Integração com **CloudFormation** (`{{resolve:ssm:...}}`) e com ECS/Lambda

## 3. Patch Manager

Automatiza o ciclo de patch, mas com duas ressalvas que a prova explora:

**Não faz upgrade de versão maior de SO**: *"doesn't support upgrading major versions of operating systems"*. Migrar de Ubuntu 20 para 22 não é Patch Manager.

**A AWS não testa os patches**: *"AWS doesn't test patches before making them available in Patch Manager."* A validação é sua, via **patch baseline** com janela de aprovação (aprovar patches com N dias de idade).

A conformidade é definida pelo **patch baseline** que você escolhe, e os relatórios saem em **CSV para o S3**.

Quatro formas de rodar: **patch policy** via Quick Setup (recomendado), **Host Management** via Quick Setup (**só scan**, não instala), **maintenance window**, e **"Patch now"** sob demanda.

## 4. O ciclo de vulnerabilidade completo

Aqui o SSM se encaixa com os outros serviços:

```
Inspector        → acha a CVE
Security Hub     → consolida
EventBridge      → dispara
SSM Patch Manager→ aplica o patch
   ou
EC2 Image Builder→ AMI nova corrigida
Auto Scaling     → instance refresh troca a fleet  (immutable infrastructure)
```

## 5. Run Command e Automation

**Run Command** executa um comando ou script em N instâncias de uma vez, selecionadas por tag — sem SSH e com log no CloudTrail. É a resposta para "rodar um script em 200 instâncias".

**Automation** executa **runbooks** (documentos SSM) com vários passos: criar AMI, aplicar patch e reiniciar, remediar um recurso noncompliant. É o motor de **remediação do AWS Config**.

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[Secrets Manager]] · [[KMS]] · [[Inspector]] · [[Config]] · [[EC2]] · [[VPC Endpoints e PrivateLink]]
- [Session Manager](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html)
- [Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html)
