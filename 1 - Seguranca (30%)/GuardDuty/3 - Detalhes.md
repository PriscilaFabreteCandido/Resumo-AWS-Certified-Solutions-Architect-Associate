---
tags: [saa-c03, guardduty, detalhes]
servico: Amazon GuardDuty
atualizado: 2026-11-08
---

# GuardDuty — Detalhes

## 1. O que ele detecta, na prática

GuardDuty correlaciona três sinais: **o que foi chamado** (CloudTrail), **com quem a instância conversou** (VPC Flow Logs) e **que nomes ela resolveu** (DNS logs). A partir disso identifica padrões como:

- Instância EC2 comunicando com servidor de **mineração de criptomoeda**
- Credencial de instância sendo usada **de fora da AWS**
- Acesso de console de **IP ou geografia anômala**
- Varredura de portas partindo da sua VPC
- Chamadas de API de reconhecimento (enumeração de permissões)
- Comunicação com domínio de **command and control**

Não é um scanner e não é um agente: é análise de **telemetria que já existe**.

## 2. Planos de proteção opcionais

Além das três fontes fundacionais, você pode ativar:

| Plano | O que cobre |
|---|---|
| **S3 Protection** | Data events do S3 — acesso anômalo a objetos |
| **EKS Protection** | Audit logs do Kubernetes |
| **RDS Protection** | Tentativas de login anômalas no banco |
| **Malware Protection** | Varre **volumes EBS** em busca de malware |
| **Lambda Protection** | Tráfego de rede das funções |

**Malware Protection** é o único que faz varredura de conteúdo — e mesmo assim é **malware em volume EBS**, não CVE (que é Inspector) nem PII (que é Macie).

## 3. Multi-conta

GuardDuty tem modelo **administrador/membro**, integrado com AWS Organizations: a conta administradora habilita o serviço em todas as contas membro e vê os achados centralizadamente. É a resposta para "detectar ameaças em 40 contas".

Os achados fluem naturalmente para o **Security Hub** (consolidação) e para o **Detective** (investigação), e podem disparar **EventBridge** → Lambda/SNS para resposta automatizada.

## 4. O que ele NÃO faz

| Pergunta | Serviço correto |
|---|---|
| Esta instância tem uma CVE? | **Inspector** |
| Este bucket tem CPF? | **Macie** |
| Estou aderente ao CIS? | **Security Hub** |
| Como esse ataque se desenrolou? | **Detective** |
| Esse security group está errado? | **AWS Config** |
| Quem fez essa chamada de API? | **CloudTrail** |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[Security Hub]] · [[Detective]] · [[CloudTrail]] · [[Config]]
