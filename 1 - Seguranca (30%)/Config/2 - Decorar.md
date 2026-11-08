---
tags: [saa-c03, config, decorar]
servico: AWS Config
atualizado: 2026-11-08
---

# AWS Config — Decorar

## Prevenir × detectar (a tabela que mais cai)

| Objetivo | Serviço |
|---|---|
| **Impedir** que a ação aconteça | **SCP** (Organizations) ou **IAM policy** |
| **Detectar** desvio e **remediar** | **AWS Config** |
| **Aplicar e manter** a proteção em várias contas | **Firewall Manager** (para WAF/SG/NACL/Shield) |
| **Agregar achados** de segurança e medir postura | **Security Hub** |

## Quem depende do Config

| Serviço | Dependência |
|---|---|
| **Security Hub** | Os **controles** rodam via **service-linked rules do Config** |
| **Firewall Manager** | Usa o Config para o **inventário** de recursos |
| **Control Tower** | Habilita Config em toda a organização; os controls *detective* são Config rules |

> [!warning] Sem Config habilitado, Security Hub e Firewall Manager ficam cegos
> É pré-requisito que aparece como alternativa em prova.

## Config rules — os dois tipos

| Tipo | O que é |
|---|---|
| **Managed rules** | Prontas da AWS (centenas), ex.: `restricted-ssh`, `s3-bucket-public-read-prohibited`, `encrypted-volumes`, `rds-multi-az-support` |
| **Custom rules** | Sua lógica, em **Lambda** ou **Guard** |

Modos de avaliação: **change-triggered** (quando o recurso muda) e **periodic** (de hora em hora, diariamente…).

## Remediação

Config rule noncompliant → **remediation action** (um documento do **SSM Automation**) → o recurso é corrigido. Pode ser automática ou manual.

## Aggregator

Consolida **multi-conta e multi-região** numa visão só. É a resposta para "ver a conformidade das 40 contas num lugar".

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
