---
tags: [saa-c03, cloudtrail, questoes]
servico: AWS CloudTrail
atualizado: 2026-11-08
---

# CloudTrail — Questões

> [!question]- Q1. Auditoria quer saber qual usuário deletou um bucket S3 há 45 dias. Onde procurar?
> **A)** CloudWatch Logs
> **B)** **CloudTrail event history** ✅
> **C)** AWS Config
> **D)** VPC Flow Logs
>
> **Por que B**: `DeleteBucket` é **management event**, gravado por padrão, e o event history cobre os **últimos 90 dias** sem custo.
> **A errada**: CloudWatch Logs guarda logs que você envia.
> **C errada**: Config mostraria que o bucket deixou de existir e como estava configurado — mas **não quem** fez a chamada.
> **D errada**: Flow Logs registram tráfego de rede.

> [!question]- Q2. "Quem baixou aquele objeto do S3 no mês passado?" O CloudTrail não mostra nada. Por quê?
> **A)** O event history só guarda 7 dias
> **B)** **`GetObject` é data event, e data events não são gravados por padrão** ✅
> **C)** Falta habilitar o AWS Config
> **D)** O bucket está em outra região
>
> **Por que B**: data events precisam ser habilitados **antes** do fato, e são cobrados.
> **A errada**: o event history guarda **90 dias** — mas só de management events.

> [!question]- Q3. Guardar e consultar 7 anos de eventos do CloudTrail com SQL, para auditoria regulatória.
> **A)** CloudWatch Logs com retenção estendida
> **B)** **CloudTrail Lake** ✅
> **C)** Amazon Detective
> **D)** Event history
>
> **Por que B**: retém *"up to 3,653 days (about 10 years)"* (ou 2.557 dias, ~7 anos) e permite consulta SQL.
> **C errada**: Detective retém **até 1 ano** e é ferramenta de investigação.
> **D errada**: 90 dias.
> ⚠️ Alternativa igualmente válida: **trail → S3** com lifecycle para Glacier e consulta via **Athena** — mais barato, menos conveniente.

> [!question]- Q4. Auditar as chamadas de API de 40 contas numa visão única, sem que as contas possam desabilitar.
> **A)** Um trail em cada conta, com bucket próprio
> **B)** **Organization trail criado na management account, gravando num bucket na conta de Log Archive** ✅
> **C)** CloudWatch cross-account observability
> **D)** Security Hub
>
> **Por que B**: o organization trail não pode ser desabilitado pelas contas membro e consolida tudo num bucket.
> **A errada**: 40 configurações para manter, e cada conta pode desligar a sua.
> **C errada**: CloudWatch trata métricas e logs, não chamadas de API.
> **D errada**: Security Hub agrega achados de segurança.

> [!question]- Q5. Garantir que os logs do CloudTrail não possam ser apagados por ninguém, nem pelo root, por 5 anos.
> **A)** Bucket policy com Deny em `s3:DeleteObject`
> **B)** **Versionamento + S3 Object Lock em modo Compliance com retenção de 5 anos, em bucket de outra conta** ✅
> **C)** MFA Delete
> **D)** Glacier Deep Archive
>
> **Por que B**: só o modo **Compliance** impede o root — *"can't be overwritten or deleted by any user, including the root user"*.
> **A errada**: quem edita a policy remove o Deny.
> **C errada**: quem tem o MFA do root apaga.
> **D errada**: classe de armazenamento é custo, não imutabilidade.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| CloudTrail mostra métricas de performance | Isso é **CloudWatch** |
| CloudTrail mostra o que mudou na configuração | Isso é **AWS Config** (o CloudTrail mostra **quem** chamou) |
| Data events vêm ligados | **Não.** E são cobrados |
| Event history guarda tudo | **90 dias** e **só management events** |
| Um trail por região é obrigatório | Um trail pode ser **multi-região** (e organization-wide) |
| Contas membro podem desabilitar o organization trail | **Não podem** |
| CloudTrail é serviço de detecção | Ele **registra**; quem interpreta é GuardDuty/Detective |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
