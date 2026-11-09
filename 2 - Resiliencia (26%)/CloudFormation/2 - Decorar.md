---
tags: [saa-c03, cloudformation, decorar]
servico: AWS CloudFormation
atualizado: 2026-11-08
---

# CloudFormation — Decorar

## Custo

| Item | Custo |
|---|---|
| **O serviço** | **Grátis** |
| Os recursos criados | Preço normal |

## Os recursos que caem

| Recurso | Para quê |
|---|---|
| **Change set** | Ver o diff **antes** de aplicar — e descobrir se um recurso será **substituído** (perda de dados) |
| **StackSets** | Mesma stack em **N contas e regiões** (usa Organizations) |
| **Nested stacks** | Reuso de componentes |
| **Drift detection** | Achar mudança feita **fora** do CloudFormation |
| **Stack policy** | Proteger recursos contra update acidental |
| **DeletionPolicy** | `Retain`, `Snapshot` ou `Delete` — **salva o banco** quando a stack é apagada |
| **Rollback** | Falha na criação/atualização → volta ao estado anterior |
| **Outputs + `Fn::ImportValue`** | Passar valor entre stacks |
| **`{{resolve:ssm:...}}` / `{{resolve:secretsmanager:...}}`** | Ler Parameter Store e Secrets Manager sem pôr segredo no template |

> [!warning] `DeletionPolicy: Retain` nos recursos com dado
> Sem isso, apagar a stack apaga o **RDS** e o **bucket**. Em prova, "proteger o banco quando a stack for removida" = **DeletionPolicy**.

## Os três tipos de update

| Tipo | Efeito |
|---|---|
| **Update sem interrupção** | O recurso é alterado no lugar |
| **Update com alguma interrupção** | O recurso reinicia |
| **Replacement** | O recurso é **recriado com novo ID** — ⚠️ **perda de dados** se for um banco ou volume |

O **change set** mostra qual será o caso **antes** de aplicar.

## CloudFormation × as alternativas

| Serviço | Papel |
|---|---|
| **CloudFormation** | IaC nativo, declarativo |
| **AWS CDK** | ⚠️ **FORA DE ESCOPO** na SAA-C03 (gera CloudFormation, mas não cai) |
| **Service Catalog** | Publica templates como **produtos** aprovados, com **launch role** |
| **AWS Proton** | Templates self-service para times de plataforma |
| **Elastic Beanstalk** | Plataforma gerenciada que **usa** CloudFormation por baixo |
| **SSM Automation** | Runbooks operacionais (não provisionamento declarativo) |

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
