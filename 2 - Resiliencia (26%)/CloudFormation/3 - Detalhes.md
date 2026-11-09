---
tags: [saa-c03, cloudformation, detalhes]
servico: AWS CloudFormation
atualizado: 2026-11-08
---

# CloudFormation — Detalhes

## 1. O ciclo de vida de uma stack

```
Template  →  CREATE_IN_PROGRESS  →  CREATE_COMPLETE
                     │ falha
                     └→ ROLLBACK_IN_PROGRESS → ROLLBACK_COMPLETE

Update:   Template novo  →  CHANGE SET (diff)  →  aplica  →  UPDATE_COMPLETE
                                                   │ falha
                                                   └→ UPDATE_ROLLBACK

Delete:   DELETE_IN_PROGRESS  →  apaga TODOS os recursos da stack
                                 (exceto os com DeletionPolicy: Retain)
```

O **rollback automático** é o que torna o CloudFormation seguro: criação parcial não deixa recursos órfãos.

## 2. Change set — por que sempre usar

O change set mostra, antes de aplicar, se cada recurso sofrerá:

| Classificação | Risco |
|---|---|
| **Modification** sem interrupção | Baixo |
| **Modification** com interrupção | O recurso reinicia |
| **Replacement** | ⚠️ **O recurso é recriado com novo ID** |

O caso crítico é **Replacement** num recurso com estado: mudar um atributo imutável de um `AWS::RDS::DBInstance` (por exemplo) faz o CloudFormation **criar um novo banco e apagar o antigo**. O change set revela isso antes.

## 3. DeletionPolicy e proteção de dados

| Valor | Efeito ao apagar a stack |
|---|---|
| **`Delete`** (padrão na maioria) | Apaga o recurso |
| **`Retain`** | **Mantém** o recurso fora da stack |
| **`Snapshot`** | Tira snapshot antes de apagar (RDS, EBS, ElastiCache, Redshift…) |

Combine com:
- **Stack policy** — nega update em recursos específicos
- **Termination protection** — impede apagar a stack por acidente

## 4. StackSets — multi-conta e multi-região

Um StackSet aplica a mesma stack a várias **contas** e **regiões** a partir de uma conta administradora. Com **AWS Organizations**, o alvo pode ser uma **OU** inteira, e contas novas recebem a stack automaticamente (*automatic deployment*).

Usos de prova: distribuir a configuração de baseline (Config recorder, CloudTrail, IAM roles, VPC padrão) por toda a organização. É também o mecanismo que o **Control Tower** usa por baixo.

## 5. Passando valores entre stacks

| Mecanismo | Quando |
|---|---|
| **`Outputs` + `Export`** e **`Fn::ImportValue`** | Acoplamento forte: a stack exportadora **não pode** ser apagada enquanto houver importação |
| **Parameter Store** (`{{resolve:ssm:...}}`) | Acoplamento fraco: a stack lê o valor no deploy |
| **Nested stacks** | Componente reusável, com parâmetros |

Para **segredo**, nunca parâmetro em texto: use `{{resolve:secretsmanager:...}}` ou `NoEcho: true`.

## 6. Drift detection

Detecta recursos alterados **fora** do CloudFormation (alguém mexeu na console). É a resposta para "garantir que a infraestrutura corresponde ao template".

Complementar: **AWS Config** detecta e remedia desvio de **configuração** de forma contínua; o drift detection é sob demanda e focado na stack.

## 7. O que está fora de escopo

⚠️ **AWS CDK está na lista oficial de serviços fora de escopo** da SAA-C03, junto com CodeBuild, CodeCommit, CodeDeploy e CodeArtifact.

A prova testa **CloudFormation** (o conceito de IaC e o serviço), não as ferramentas de desenvolvedor que o geram.

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[Disaster Recovery (RPO e RTO)]] · [[Config]] · [[Organizations e Control Tower]] · [[Governanca (Artifact, Trusted Advisor, Service Catalog)]] · [[04 - Fora de escopo (nao estude isso)]]
