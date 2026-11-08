---
tags: [saa-c03, detective, questoes]
servico: Amazon Detective
atualizado: 2026-11-08
---

# Detective — Questões

> [!question]- Q1. Após um incidente, o analista precisa ver todas as chamadas de API e o tráfego de rede de um role comprometido nos últimos 30 dias, correlacionados automaticamente.
> **A)** CloudTrail Lake com query SQL
> **B)** **Amazon Detective** ✅
> **C)** Security Hub
> **D)** CloudWatch Logs Insights
>
> **Por que B**: *"helps you analyze, investigate, and quickly identify the root cause"*, correlacionando CloudTrail + VPC Flow Logs + achados do GuardDuty num grafo, com até **1 ano** de histórico.
> **A errada**: dá para fazer, mas você escreve as consultas e monta a correlação — mais esforço operacional.
> **C errada**: Security Hub mostra o **achado**, não a investigação.
> **D errada**: consulta logs; não correlaciona entidades de segurança.

> [!question]- Q2. Qual a ordem correta dos serviços num incidente?
> **A)** Detective → GuardDuty → Security Hub
> **B)** **GuardDuty detecta → Security Hub consolida → Detective investiga** ✅
> **C)** Security Hub detecta → Detective consolida → GuardDuty investiga
> **D)** Inspector detecta → Detective corrige
>
> **Por que B**: cada um tem um verbo. Detective entra **depois** da detecção.

> [!question]- Q3. A empresa precisa guardar e consultar 7 anos de eventos do CloudTrail com SQL, para auditoria regulatória.
> **A)** Amazon Detective
> **B)** **CloudTrail Lake** ✅
> **C)** CloudWatch Logs com retenção estendida
> **D)** Security Hub
>
> **Por que B**: o CloudTrail Lake retém *"up to 3,653 days (about 10 years)"* (ou 2.557 dias na outra opção) e permite consulta SQL.
> **A errada**: Detective retém **até 1 ano** e é ferramenta de investigação, não de arquivo de auditoria.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Detective detecta | **Investiga.** Detecção é GuardDuty |
| Detective substitui o CloudTrail | Ele **consome** CloudTrail e VPC Flow Logs |
| Detective guarda anos de histórico | **Até 1 ano.** Para mais, CloudTrail Lake |
| Detective bloqueia o atacante | Ele explica; a contenção é WAF/NACL/revogação de credencial |
| Detective funciona sem GuardDuty | É desenhado para ingerir achados do GuardDuty |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
