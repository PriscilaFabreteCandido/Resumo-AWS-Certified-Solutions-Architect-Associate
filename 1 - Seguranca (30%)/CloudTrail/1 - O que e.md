---
tags: [saa-c03, cloudtrail, auditoria]
servico: AWS CloudTrail
tipo: Auditoria de chamadas de API
dominios: [1]
atualizado: 2026-11-08
---

# AWS CloudTrail — O que é

> [!info] Em uma frase
> Registra **quem fez cada chamada de API** na sua conta: usuário ou role, quando, de qual IP, com quais parâmetros e qual foi o resultado.

## Definição oficial

> *"AWS CloudTrail is an AWS service that helps you enable operational and risk auditing, governance, and compliance of your AWS account. Actions taken by a user, role, or an AWS service are recorded as events in CloudTrail."*

## A pergunta que ele responde

**"Quem fez isso?"**

É a distinção mais testada do grupo de observabilidade:

| Pergunta | Serviço |
|---|---|
| **Quem** chamou essa API, quando, de qual IP? | **CloudTrail** |
| A CPU está alta? Quantas mensagens na fila? | **CloudWatch** |
| Essa configuração mudou quando? Está conforme? | **AWS Config** |
| Onde a requisição gastou tempo entre microsserviços? | **X-Ray** |

## Os três tipos de evento

| Tipo | O que é | Gravado por padrão? |
|---|---|---|
| **Management events** | Operações de plano de controle: criar instância, mudar policy, deletar bucket | **Sim** |
| **Data events** | Operações **em dados**: `s3:GetObject`, `lambda:Invoke`, `dynamodb:PutItem` | **Não** (e são cobrados) |
| **Insights events** | Atividade **anômala** de API detectada automaticamente | Não |

> [!warning] Data events não vêm ligados
> "Quem baixou aquele objeto do S3?" exige **data events** habilitados **antes** do fato. É a pegadinha mais comum do CloudTrail.

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[Config]] · [[CloudWatch]] · [[GuardDuty]] · [[Detective]]
- [Guia do CloudTrail](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html)
