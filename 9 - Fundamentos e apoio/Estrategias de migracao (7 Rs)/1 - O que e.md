---
tags: [saa-c03, migracao, 7rs, fundamentos]
conceito: Estratégias de migração (7 Rs)
dominios: [4]
atualizado: 2026-11-08
---

# Estratégias de migração (7 Rs) — O que é

> [!info] Em uma frase
> São as **sete decisões possíveis** para cada aplicação de um portfólio que vai para a nuvem — de "desligar" a "reescrever" — e a prova testa se você escolhe a de **menor esforço que atende o requisito**.

## Os 7 Rs

| R | O que faz | Também chamado |
|---|---|---|
| **Retire** | **Desliga.** A aplicação não é mais necessária | — |
| **Retain** | **Não migra** (por ora): dependência, licença, hardware específico, projeto de aposentadoria | *revisit* |
| **Rehost** | Move **como está**, sem mudar o código | **lift and shift** |
| **Relocate** | Move a **infraestrutura em bloco** sem mudar o código nem comprar hardware (ex.: VMware para a AWS) | — |
| **Repurchase** | **Troca por um produto diferente**, geralmente SaaS | *drop and shop* |
| **Replatform** | Mantém o código, **troca a plataforma** por uma gerenciada (ex.: MySQL em EC2 → **RDS**) | **lift, tinker and shift** |
| **Refactor** | **Reescreve** a arquitetura para ser nativa de nuvem (ex.: monólito → serverless) | *re-architect* |

## Mnemônico

> **"Re-Re-Re-Re-Re-Re-Re"**: **Retire, Retain, Rehost, Relocate, Repurchase, Replatform, Refactor.**
> Em ordem de **esforço crescente** (depois dos dois primeiros, que não migram):
> **Rehost < Relocate < Repurchase < Replatform < Refactor**

## O que a prova cobra

| Enunciado | Resposta |
|---|---|
| *"migrar rápido, sem mudar a aplicação"* | **Rehost** |
| *"sem mudar o código, mas reduzir a administração do banco"* | **Replatform** (ex.: → RDS) |
| *"aproveitar escalabilidade e serviços nativos, podemos mudar o código"* | **Refactor** |
| *"trocar o CRM próprio por uma solução de mercado"* | **Repurchase** |
| *"mover o ambiente VMware inteiro sem refazer nada"* | **Relocate** |
| *"esse sistema ninguém mais usa"* | **Retire** |
| *"não pode sair do data center por causa de licença/compliance"* | **Retain** |

> [!important] O eixo custo × benefício
> **Rehost** é o mais rápido e o que **menos** aproveita a nuvem. **Refactor** aproveita tudo e é o **mais caro e demorado**. A prova quase sempre pede a opção **mais simples que atende o requisito citado** — leia o qualificador.

## Links

- [[9 - Fundamentos e apoio/Estrategias de migracao (7 Rs)/2 - Decorar|2 - Decorar]] · [[9 - Fundamentos e apoio/Estrategias de migracao (7 Rs)/3 - Detalhes|3 - Detalhes]] · [[9 - Fundamentos e apoio/Estrategias de migracao (7 Rs)/4 - Questoes|4 - Questoes]]
- [[4 - Custo (20%)/DMS (Database Migration Service)/1 - O que e|DMS (Database Migration Service)]] · [[4 - Custo (20%)/Snow Family/1 - O que e|Snow Family]] · [[3 - Performance (24%)/DataSync/1 - O que e|DataSync]] · [[9 - Fundamentos e apoio/Disaster Recovery (RPO e RTO)/1 - O que e|Disaster Recovery (RPO e RTO)]] · [[9 - Fundamentos e apoio/Well-Architected Framework/1 - O que e|Well-Architected Framework]]
