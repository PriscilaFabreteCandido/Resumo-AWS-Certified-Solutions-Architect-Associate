---
tags: [saa-c03, config, detalhes]
servico: AWS Config
atualizado: 2026-11-08
---

# AWS Config — Detalhes

## 1. O que ele grava

Para cada recurso suportado, o Config grava um **configuration item** — um retrato com os atributos, as tags e as **relações** com outros recursos (esta instância usa este SG, que pertence a esta VPC). A doc destaca justamente isso: *"This includes how the resources are related to one another and how they were configured in the past."*

A linha do tempo resultante responde perguntas que nem o CloudTrail nem o CloudWatch respondem:
- "Este security group já teve a porta 22 aberta?"
- "Quando este bucket deixou de ter versionamento?"
- "Que instâncias usavam esta AMI vulnerável no mês passado?"

## 2. Rules, packs e remediação

Uma **Config rule** avalia o configuration item e marca o recurso como **COMPLIANT** ou **NON_COMPLIANT**.

As regras **gerenciadas** cobrem a maior parte dos casos de prova:

| Regra | O que verifica |
|---|---|
| `restricted-ssh` | SG com porta 22 aberta para `0.0.0.0/0` |
| `s3-bucket-public-read-prohibited` | Bucket público |
| `s3-bucket-versioning-enabled` | Versionamento |
| `encrypted-volumes` | Volume EBS criptografado |
| `rds-storage-encrypted` | Storage do RDS criptografado |
| `rds-multi-az-support` | RDS em Multi-AZ |
| `iam-password-policy` | Política de senha |
| `cloudtrail-enabled` | CloudTrail ativo |

**Conformance packs** agrupam regras por framework (CIS, PCI DSS, HIPAA, NIST), entregando um placar de conformidade pronto.

**Remediação** usa documentos do **SSM Automation**. O padrão de prova:

```
Config rule detecta SG com 22 aberta
        ↓
Remediation action (SSM Automation)
        ↓
Revoga a regra do SG  +  notifica via SNS
```

## 3. Prevenir × detectar — por que a distinção importa

A prova monta questões em que as duas abordagens parecem válidas. O desempate está no verbo do enunciado:

| Enunciado | Resposta | Por quê |
|---|---|---|
| *"**impedir** que qualquer conta crie recursos fora de us-east-1"* | **SCP** | A ação nunca acontece |
| *"**detectar** recursos fora de us-east-1 e **remover**"* | **Config** + remediação | A ação acontece e é corrigida |
| *"**garantir** que todo ALB novo tenha WAF"* | **Firewall Manager** | Aplica e mantém continuamente |

Vale notar o trade-off: SCP é absoluto mas **grosseiro** (bloqueia a API inteira, inclusive usos legítimos); Config é **cirúrgico** mas **reativo** (há uma janela em que o recurso existe errado).

## 4. Aggregator e multi-conta

O **aggregator** consolida configuration items e status de conformidade de várias contas e regiões numa conta agregadora. Com AWS Organizations, você agrega a organização inteira de uma vez.

É o que torna possível responder "quantos buckets públicos existem na empresa?" sem entrar em 40 contas.

## 5. Custo

O Config cobra por **configuration item registrado** e por **avaliação de regra**. Em ambientes com muita mudança (Auto Scaling agressivo, por exemplo), isso aparece na fatura — por isso você escolhe **quais tipos de recurso** gravar.

## 6. Config × as alternativas

| Ferramenta | Natureza |
|---|---|
| **AWS Config** | Estado de configuração, histórico, conformidade, remediação |
| **CloudTrail** | **Quem** fez a chamada |
| **Security Hub** | Agrega achados e mede postura (usando o Config por baixo) |
| **Audit Manager** | Coleta **evidência** de auditoria contra frameworks |
| **Trusted Advisor** | Checagens pontuais de custo, performance, segurança, tolerância a falha e limites |
| **AWS Artifact** | Relatórios de compliance **da AWS** |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[CloudTrail]] · [[Security Hub]] · [[Firewall Manager]] · [[Systems Manager (e Parameter Store)]] · [[Governanca (Artifact, Trusted Advisor, Service Catalog)]]
