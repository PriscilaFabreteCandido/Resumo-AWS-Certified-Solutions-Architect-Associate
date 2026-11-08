---
tags: [saa-c03, detective, detalhes]
servico: Amazon Detective
atualizado: 2026-11-08
---

# Detective — Detalhes

## 1. O problema que ele resolve

O GuardDuty diz: *"credencial da instância i-abc123 usada de um IP fora da AWS"*. Ótimo. Agora o analista precisa responder:

- Essa credencial foi usada em que mais?
- Quando o comportamento começou a desviar do normal?
- Que outros recursos aquele IP tocou?
- Que chamadas de API aconteceram antes e depois?

Responder isso com CloudTrail Lake e Logs Insights é possível, mas significa escrever consultas, juntar fontes diferentes e construir a correlação à mão. O Detective já entrega o grafo montado.

## 2. Grafo de comportamento

O Detective ingere continuamente CloudTrail, VPC Flow Logs e achados do GuardDuty, e constrói um **behavior graph** ligando entidades: contas, usuários, roles, instâncias, IPs, chamadas de API.

Para cada entidade ele mantém **baseline** de comportamento, o que permite responder "isso é normal para este role?" — e não apenas "isso aconteceu".

A retenção de **até um ano** é o que torna possível investigar um incidente descoberto tarde.

## 3. Detective × CloudTrail Lake × Logs Insights

| Ferramenta | Natureza |
|---|---|
| **Detective** | Correlação **pronta** entre entidades, com baseline. Esforço operacional baixo |
| **CloudTrail Lake** | Consulta **SQL** sobre eventos do CloudTrail. Retenção de até ~10 anos, mas você escreve a consulta e monta a correlação |
| **CloudWatch Logs Insights** | Consulta sobre log groups. Não correlaciona entidades de segurança |

Na prova: quando o enunciado diz **"com o menor esforço operacional"** ou **"correlacionado automaticamente"**, é Detective. Quando diz "consulta SQL ad-hoc em 7 anos de CloudTrail", é **CloudTrail Lake**.

## 4. Pré-requisito

Detective é projetado para funcionar junto com o **GuardDuty** — a doc diz que ele ingere os achados dele. Na prática, o fluxo completo exige GuardDuty habilitado, e historicamente o Detective pede um período mínimo de GuardDuty ativo antes de ser habilitado.

Também tem modelo **administrador/membro** via AWS Organizations.

## 5. O que ele NÃO faz

| Pergunta | Serviço |
|---|---|
| Detectar a ameaça | **GuardDuty** |
| Consolidar postura e padrões | **Security Hub** |
| Achar CVE | **Inspector** |
| Achar PII | **Macie** |
| Bloquear o atacante | **WAF**, **NACL**, revogação de credencial (IAM/STS) |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[GuardDuty]] · [[Security Hub]] · [[CloudTrail]] · [[VPC]]
