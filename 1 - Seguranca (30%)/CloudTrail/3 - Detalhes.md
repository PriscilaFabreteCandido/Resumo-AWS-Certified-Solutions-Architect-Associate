---
tags: [saa-c03, cloudtrail, detalhes]
servico: AWS CloudTrail
atualizado: 2026-11-08
---

# CloudTrail — Detalhes

## 1. Event history × trail

O **event history** existe sem você fazer nada: *"the past 90 days of management events in an AWS Region"*, visível na console, sem custo. É suficiente para investigar algo recente.

Mas ele tem três limitações que a prova explora:
- **90 dias** apenas
- **Só management events**
- **Por região** — não é visão consolidada

Para qualquer requisito de retenção, consolidação ou data events, você precisa de um **trail**.

## 2. Management × data events

**Management events** são operações de plano de controle: `RunInstances`, `CreateBucket`, `PutBucketPolicy`, `AttachRolePolicy`, `DeleteTrail`. São gravados por padrão, e a primeira cópia é grátis.

**Data events** são operações **sobre os dados**: `GetObject`, `PutObject` e `DeleteObject` no S3; `Invoke` no Lambda; operações de item no DynamoDB. **Não** são gravados por padrão e **são cobrados** — porque o volume é ordens de magnitude maior.

Consequência prática: se ninguém habilitou data events, a pergunta "quem baixou aquele arquivo?" **não tem resposta retroativa**. Você habilita e passa a registrar dali para frente.

**Insights events** detectam desvio no padrão de chamadas de API (um pico de `RunInstances`, por exemplo) e geram um evento próprio.

## 3. Organization trail

Criado na **management account** com escopo de organização, grava os eventos de todas as contas membro num bucket central — tipicamente na conta de **Log Archive** (que o Control Tower provisiona).

Vantagens de prova:
- Contas membro **não podem** desabilitar o organization trail
- Visão única, em um bucket, para análise com Athena
- Satisfaz requisito de "auditoria centralizada de N contas"

## 4. Proteger a trilha

Esse é um cenário de questão recorrente. As camadas:

| Camada | Controle |
|---|---|
| **Impedir parar/apagar o trail** | **SCP** com `Deny` em `cloudtrail:StopLogging` e `cloudtrail:DeleteTrail` — alcança até o root das contas membro |
| **Impedir apagar os logs** | **S3 Object Lock** em modo **Compliance** (nem o root apaga) + versionamento |
| **Isolar** | Bucket em **outra conta** (Log Archive) |
| **Detectar alteração** | **Log file validation** (hash SHA-256 assinado) — CloudTrail grava um digest que prova que nenhum arquivo foi alterado |
| **Alertar** | Trail → CloudWatch Logs → metric filter → alarme → SNS |

## 5. CloudTrail × Config × CloudWatch

A tabela que resolve as questões de observabilidade:

| | **CloudTrail** | **AWS Config** | **CloudWatch** |
|---|---|---|---|
| Registra | **Chamadas de API** (quem, quando, de onde) | **Estado de configuração** e histórico | **Métricas e logs** |
| Responde | *"Quem deletou o bucket?"* | *"Como esse SG estava configurado na semana passada? Está conforme?"* | *"A CPU está alta? A fila está crescendo?"* |
| Retenção padrão grátis | **90 dias** (management events) | Histórico de configuração | Métricas por 15 meses |

Os três se complementam: o Config diz **o que** mudou, o CloudTrail diz **quem** mudou, o CloudWatch diz **qual foi o efeito**.

## 6. Quem consome o CloudTrail

| Serviço | Como usa |
|---|---|
| **GuardDuty** | CloudTrail management events é fonte **fundacional** de detecção |
| **Detective** | Extrai eventos do CloudTrail para o grafo de investigação |
| **Security Hub** | Controles verificam se o CloudTrail está habilitado e configurado |
| **Athena** | Consulta os arquivos do trail no S3 |
| **EventBridge** | Dispara automação a partir de uma chamada de API |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[Config]] · [[CloudWatch]] · [[GuardDuty]] · [[Detective]] · [[S3]] · [[Organizations e Control Tower]]
