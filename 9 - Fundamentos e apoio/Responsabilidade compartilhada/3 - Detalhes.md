---
tags: [saa-c03, responsabilidade-compartilhada, detalhes]
conceito: Modelo de responsabilidade compartilhada
atualizado: 2026-11-08
---

# Responsabilidade compartilhada — Detalhes

## 1. A ideia central

O pilar de Segurança resume o benefício:

> *"Because AWS physically secures the infrastructure that supports our cloud services, as an AWS customer you can focus on using services to accomplish your goals."*

Você não audita data center, não troca disco, não configura roteador de borda. Em troca, **tudo o que você configura é seu problema** — e a maioria dos incidentes de segurança em nuvem vem de configuração do cliente, não de falha do provedor.

## 2. A fronteira móvel — o que a prova testa

O erro comum é decorar uma linha fixa. A linha **muda por serviço**:

```
IaaS                    PaaS                      SaaS / Serverless
EC2                     RDS                       S3 · DynamoDB · Lambda
│                       │                         │
├ você: SO, patch       ├ AWS: SO e engine        ├ AWS: tudo da plataforma
├ você: runtime         ├ você: usuários, schema  ├ você: dados, IAM,
├ você: aplicação       ├ você: parameter group   │        configuração
└ você: dados, IAM      └ você: dados, IAM        └
```

Exemplos concretos:

| Tarefa | **EC2** | **RDS** | **DynamoDB** |
|---|---|---|---|
| Patch do SO | **Você** | AWS | AWS |
| Patch do engine do banco | **Você** | **AWS** | — |
| Backup | **Você** (ou AWS Backup) | AWS (automático) + você (snapshot manual) | AWS (PITR, se habilitado por **você**) |
| Criptografia em repouso | **Você** habilita (KMS) | **Você** habilita (na criação) | **Você** (padrão ativo) |
| Patch de vulnerabilidade de SO | **Você** (SSM Patch Manager) | AWS | AWS |
| Usuários e permissões do banco | **Você** | **Você** | **Você** (IAM) |

## 3. O que é **sempre** seu, em qualquer serviço

| Responsabilidade | Por quê |
|---|---|
| **Seus dados** | A AWS não sabe o que eles significam |
| **Classificação** dos dados | Só você sabe o que é sensível (**Macie** ajuda a descobrir) |
| **IAM** | Quem pode o quê |
| **Configuração** do serviço | Bucket público, SG aberto, criptografia desligada |
| **Criptografia do lado do cliente** | Se você escolher usá-la |
| Conformidade do **seu** uso | A AWS prova a dela; você prova a sua |

## 4. Como isso vira questão

**Forma 1 — atribuição direta.** *"Quem é responsável por aplicar patches no sistema operacional de uma instância EC2?"* → **você**. Note que uma AMI da AWS **não** transfere a responsabilidade contínua; a AWS oferece a **ferramenta** (SSM Patch Manager), não o serviço de patch.

**Forma 2 — escolha de serviço.** *"least operational overhead"* é, no fundo, "empurre a fronteira". A hierarquia:

```
serverless gerenciado  >  gerenciado com instância  >  você gerencia a instância
Lambda / Fargate          RDS / Aurora / ECS           EC2
```

**Forma 3 — compliance.** *"O auditor pediu o SOC 2"* → **AWS Artifact** (conformidade **da AWS**). *"Meus recursos estão conformes?"* → **AWS Config**. *"Minha postura?"* → **Security Hub**.

## 5. O que a AWS **não** faz por você, nem em serverless

Mesmo no S3, Lambda e DynamoDB:

| A AWS não | Você precisa |
|---|---|
| Decide quem pode acessar | Configurar **IAM** e policies de recurso |
| Impede bucket público | Habilitar **Block Public Access** |
| Classifica dado sensível | Usar **Macie** e decidir a retenção |
| Escolhe sua chave de criptografia | Decidir entre SSE-S3, SSE-KMS, customer managed |
| Garante que seu código é seguro | Revisar, usar **Inspector** nas dependências |
| Define sua estratégia de DR | Escolher RPO/RTO e implementar |

## 6. A relação com os outros conceitos

| Conceito | Ligação |
|---|---|
| **Well-Architected** | O pilar de Segurança cita o modelo nominalmente |
| **AWS Artifact** | A prova da parte da **AWS** |
| **Config / Security Hub / Audit Manager** | A prova da **sua** parte |
| **"Least operational overhead"** | Escolher o serviço que move a fronteira |
| **Patch Manager / Inspector** | As ferramentas da **sua** parte em EC2 |

## Links

- [[9 - Fundamentos e apoio/Responsabilidade compartilhada/1 - O que e|1 - O que e]] · [[9 - Fundamentos e apoio/Responsabilidade compartilhada/2 - Decorar|2 - Decorar]] · [[9 - Fundamentos e apoio/Responsabilidade compartilhada/4 - Questoes|4 - Questoes]]
- [[9 - Fundamentos e apoio/Well-Architected Framework/1 - O que e|Well-Architected Framework]] · [[1 - Seguranca (30%)/Governanca (Artifact, Trusted Advisor, Service Catalog)/1 - O que e|Governanca (Artifact, Trusted Advisor, Service Catalog)]] · [[1 - Seguranca (30%)/Config/1 - O que e|Config]] · [[1 - Seguranca (30%)/Security Hub/1 - O que e|Security Hub]] · [[1 - Seguranca (30%)/Systems Manager (e Parameter Store)/1 - O que e|Systems Manager (e Parameter Store)]] · [[1 - Seguranca (30%)/Inspector/1 - O que e|Inspector]]
