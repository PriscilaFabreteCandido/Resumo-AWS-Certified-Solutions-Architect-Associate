---
tags: [saa-c03, governanca, detalhes]
servico: Artifact, Trusted Advisor e Service Catalog
atualizado: 2026-11-08
---

# Governança — Detalhes

## 1. AWS Artifact — o lado da AWS do contrato

No **modelo de responsabilidade compartilhada**, a AWS é responsável pela segurança **da** nuvem. O Artifact é onde você obtém a **prova** disso: relatórios de auditoria de terceiros (SOC 1, SOC 2, SOC 3, PCI DSS, ISO 27001/27017/27018, FedRAMP) e acordos (BAA para HIPAA, acordos de proteção de dados).

Uso típico de prova: *"o auditor pediu evidência de que o provedor de nuvem é certificado PCI DSS"* → **Artifact**.

O que o Artifact **não** faz: dizer se **o seu** ambiente está conforme. Isso é **Config** (recursos), **Security Hub** (postura) e **Audit Manager** (evidência).

Esse par aparece em **Task 1.3** como skill: *"Aligning AWS technologies to meet compliance requirements"*.

## 2. Trusted Advisor — recomendação, não ação

O Trusted Advisor roda checagens prontas e classifica cada uma em verde, amarelo ou vermelho, nos cinco pilares: custo, performance, segurança, tolerância a falha e limites de serviço.

Exemplos de checagem que aparecem em questão:
- Instâncias EC2 **subutilizadas** (custo)
- **Elastic IP** não associado (custo)
- Load balancer **sem instâncias** (tolerância a falha)
- RDS **sem Multi-AZ** (tolerância a falha)
- Security group com **porta aberta ao mundo** (segurança)
- **MFA ausente no root** (segurança)
- Uso próximo da **quota** de um serviço

Distinções que a prova faz:

| Objetivo | Serviço |
|---|---|
| Recomendação ampla, pronta, nos 5 pilares | **Trusted Advisor** |
| **Rightsizing** baseado em métricas de utilização | **Compute Optimizer** (janela de **14 dias**, 93 com enhanced metrics) |
| **Aumentar** uma quota | **Service Quotas** |
| Visualizar e prever gasto | **Cost Explorer** |
| **Alertar** sobre gasto | **AWS Budgets** |

## 3. Service Catalog — self-service com guardrail

O problema: times querem autonomia para subir ambientes, mas dar `ec2:*` e `rds:*` a todo mundo é inaceitável.

A solução do Service Catalog:

```
Time de plataforma          Time de produto
──────────────────          ───────────────
Cria PRODUCT                Vê o portfólio
 (template CFN)                    │
Agrupa em PORTFOLIO                │
Define CONSTRAINTS                 │
 (só t3.*, só sa-east-1)           │
Define LAUNCH ROLE   ──────>  Lança o produto
                              (sem ter ec2:*)
```

O usuário só precisa de permissão para **lançar o produto**. Os recursos são criados pela **launch role**, que tem as permissões necessárias. As **constraints** limitam parâmetros (tipos de instância, regiões, tags obrigatórias).

Comparação de prova:

| Abordagem | Resultado |
|---|---|
| Dar permissão ampla + confiar no processo | Deriva e risco |
| **SCP** restringindo tipos de instância | Funciona como guardrail, mas não oferece self-service nem padronização de arquitetura |
| **CloudFormation** direto | Padroniza, mas o usuário precisa de permissão para criar os recursos |
| **Service Catalog** | Padroniza **e** remove a necessidade de permissão ampla |
| **AWS Proton** | Mesma ideia, voltada a times de plataforma e aplicações containerizadas/serverless |

Portfólios podem ser **compartilhados entre contas via AWS RAM**.

## 4. Well-Architected Tool e Health Dashboard

**Well-Architected Tool** conduz a revisão na console: você responde perguntas por pilar e recebe um plano de melhoria. É a materialização do framework que a prova inteira usa como base.

**AWS Health Dashboard** mostra eventos de saúde da AWS, com duas visões: **Service health** (status geral dos serviços) e **Your account health** (eventos que afetam **os seus** recursos — manutenção programada, degradação numa AZ onde você tem instâncias). A segunda é a que importa em prova, e pode disparar **EventBridge** para automação.

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[Config]] · [[Security Hub]] · [[Compute Optimizer]] · [[Ferramentas de custo (Cost Explorer, Budgets, CUR)]] · [[Responsabilidade compartilhada]] · [[Well-Architected Framework]]
