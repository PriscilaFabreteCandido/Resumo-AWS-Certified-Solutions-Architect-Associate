# Resumo — AWS Certified Solutions Architect – Associate (SAA-C03)

Resumo de estudo para a prova **AWS Certified Solutions Architect – Associate**, com **uma pasta por serviço e por conceito**, agrupadas pelo domínio da prova em que cada uma mais pesa.

> Conteúdo conferido contra **`docs.aws.amazon.com`** em **08/11/2026**, a partir do **exam guide SAA-C03, versão 1.1 (29/10/2026)**.
> Onde a documentação oficial não afirma um número, a nota diz isso em vez de repetir valores de terceiros.

## Estrutura

Cada serviço é uma pasta com **cinco notas**:

| Nota | Para quê |
|---|---|
| **1 - O que e** | O serviço em uma frase, para que serve, e onde cai na prova |
| **2 - Decorar** | Só número e tabela. É a nota da véspera |
| **3 - Detalhes** | A explicação longa, com as citações oficiais |
| **4 - Questoes** | Questões A–D com a resposta **recolhida**, **o porquê de cada alternativa errada** e a tabela de armadilhas |
| **5 - Flashcards** | Os números da Decorar em pergunta e resposta, para o plugin [Spaced Repetition](https://github.com/st3v3nmw/obsidian-spaced-repetition) |

Além das pastas de serviço:

| Pasta / nota | Para quê |
|---|---|
| **06 - Simulados** | Questões **misturadas** de vários serviços: um simulado por domínio e 5 simulados gerais de 65 questões. Geradas por `scripts/gerar-simulados.mjs` |
| **07 - Flashcards - Pegadinhas** | As tabelas "parece × é" das pegadinhas em formato de flashcard |
| **scripts/** | `esconder-respostas.mjs` (deixa a resposta recolhida nas questões novas) e `gerar-simulados.mjs` (refaz os simulados). Rode com `node scripts/<nome>.mjs` na raiz do vault |

```
1 - Seguranca (30%)/
    IAM/
        1 - O que e.md
        2 - Decorar.md
        3 - Detalhes.md
        4 - Questoes.md
    KMS/ ...
    NACL (Network ACL)/ ...
```

É um **vault do Obsidian** — clone dentro do seu vault para os links `[[assim]]` e os callouts dobráveis funcionarem:

```bash
git clone https://github.com/PriscilaFabreteCandido/Resumo-AWS-Certified-Solutions-Architect-Associate.git
```

## A prova em números

| Item | Valor |
|---|---|
| Código | **SAA-C03** |
| Questões que contam nota | **50** (+ 15 não pontuadas) |
| Nota mínima | **720** (escala 100–1.000) |
| Modelo | **Compensatório** — só o total importa |
| Questão em branco | Conta como errada |

| # | Domínio | Peso |
|---|---|---|
| 1 | Design Secure Architectures | **30%** |
| 2 | Design Resilient Architectures | **26%** |
| 3 | Design High-Performing Architectures | **24%** |
| 4 | Design Cost-Optimized Architectures | **20%** |

## Comece aqui

- [00 - START HERE (indice da prova)](00%20-%20START%20HERE%20%28indice%20da%20prova%29.md)
- [01 - Palavras-chave (decoder de enunciado)](01%20-%20Palavras-chave%20%28decoder%20de%20enunciado%29.md)
- [02 - Numeros para decorar](02%20-%20Numeros%20para%20decorar.md)
- [03 - Pegadinhas mestre](03%20-%20Pegadinhas%20mestre.md)
- [04 - Fora de escopo (nao estude isso)](04%20-%20Fora%20de%20escopo%20%28nao%20estude%20isso%29.md)
- [05 - Plano de estudo (e como praticar sem levar susto na fatura)](05%20-%20Plano%20de%20estudo%20%28e%20como%20praticar%20sem%20levar%20susto%20na%20fatura%29.md)
- [06 - Simulados](06%20-%20Simulados/Simulado%20geral%2001.md)
- [07 - Flashcards - Pegadinhas](07%20-%20Flashcards%20-%20Pegadinhas.md)
- [README](README.md)

## Progresso

| Domínio | Pastas preenchidas |
|---|---|
| 1 - Seguranca (30%) | **29 / 29** |
| 2 - Resiliencia (26%) | **21 / 21** |
| 3 - Performance (24%) | **29 / 29** |
| 4 - Custo (20%) | **5 / 5** |
| 9 - Fundamentos e apoio | **7 / 7** |
| **Total** | **91 / 91** ✅ |

## Índice por domínio

Cada pasta tem as **5 notas**: `1 - O que e`, `2 - Decorar`, `3 - Detalhes`, `4 - Questoes`, `5 - Flashcards`.

### Domínio 1 — Segurança (30%)

- [01 - Dominio 1 - Design Secure Architectures (30%)](1%20-%20Seguranca%20%2830%25%29/01%20-%20Dominio%201%20-%20Design%20Secure%20Architectures%20%2830%25%29.md) — visão do domínio, task statements oficiais e índice

- **ACM (Certificate Manager)** — [O que e](1%20-%20Seguranca%20%2830%25%29/ACM%20%28Certificate%20Manager%29/1%20-%20O%20que%20e.md) · [Decorar](1%20-%20Seguranca%20%2830%25%29/ACM%20%28Certificate%20Manager%29/2%20-%20Decorar.md) · [Detalhes](1%20-%20Seguranca%20%2830%25%29/ACM%20%28Certificate%20Manager%29/3%20-%20Detalhes.md) · [Questoes](1%20-%20Seguranca%20%2830%25%29/ACM%20%28Certificate%20Manager%29/4%20-%20Questoes.md)
- **AWS Backup** — [O que e](1%20-%20Seguranca%20%2830%25%29/AWS%20Backup/1%20-%20O%20que%20e.md) · [Decorar](1%20-%20Seguranca%20%2830%25%29/AWS%20Backup/2%20-%20Decorar.md) · [Detalhes](1%20-%20Seguranca%20%2830%25%29/AWS%20Backup/3%20-%20Detalhes.md) · [Questoes](1%20-%20Seguranca%20%2830%25%29/AWS%20Backup/4%20-%20Questoes.md)
- **AWS RAM** — [O que e](1%20-%20Seguranca%20%2830%25%29/AWS%20RAM/1%20-%20O%20que%20e.md) · [Decorar](1%20-%20Seguranca%20%2830%25%29/AWS%20RAM/2%20-%20Decorar.md) · [Detalhes](1%20-%20Seguranca%20%2830%25%29/AWS%20RAM/3%20-%20Detalhes.md) · [Questoes](1%20-%20Seguranca%20%2830%25%29/AWS%20RAM/4%20-%20Questoes.md)
- **CloudHSM** — [O que e](1%20-%20Seguranca%20%2830%25%29/CloudHSM/1%20-%20O%20que%20e.md) · [Decorar](1%20-%20Seguranca%20%2830%25%29/CloudHSM/2%20-%20Decorar.md) · [Detalhes](1%20-%20Seguranca%20%2830%25%29/CloudHSM/3%20-%20Detalhes.md) · [Questoes](1%20-%20Seguranca%20%2830%25%29/CloudHSM/4%20-%20Questoes.md)
- **CloudTrail** — [O que e](1%20-%20Seguranca%20%2830%25%29/CloudTrail/1%20-%20O%20que%20e.md) · [Decorar](1%20-%20Seguranca%20%2830%25%29/CloudTrail/2%20-%20Decorar.md) · [Detalhes](1%20-%20Seguranca%20%2830%25%29/CloudTrail/3%20-%20Detalhes.md) · [Questoes](1%20-%20Seguranca%20%2830%25%29/CloudTrail/4%20-%20Questoes.md)
- **Cognito** — [O que e](1%20-%20Seguranca%20%2830%25%29/Cognito/1%20-%20O%20que%20e.md) · [Decorar](1%20-%20Seguranca%20%2830%25%29/Cognito/2%20-%20Decorar.md) · [Detalhes](1%20-%20Seguranca%20%2830%25%29/Cognito/3%20-%20Detalhes.md) · [Questoes](1%20-%20Seguranca%20%2830%25%29/Cognito/4%20-%20Questoes.md)
- **Config** — [O que e](1%20-%20Seguranca%20%2830%25%29/Config/1%20-%20O%20que%20e.md) · [Decorar](1%20-%20Seguranca%20%2830%25%29/Config/2%20-%20Decorar.md) · [Detalhes](1%20-%20Seguranca%20%2830%25%29/Config/3%20-%20Detalhes.md) · [Questoes](1%20-%20Seguranca%20%2830%25%29/Config/4%20-%20Questoes.md)
- **Detective** — [O que e](1%20-%20Seguranca%20%2830%25%29/Detective/1%20-%20O%20que%20e.md) · [Decorar](1%20-%20Seguranca%20%2830%25%29/Detective/2%20-%20Decorar.md) · [Detalhes](1%20-%20Seguranca%20%2830%25%29/Detective/3%20-%20Detalhes.md) · [Questoes](1%20-%20Seguranca%20%2830%25%29/Detective/4%20-%20Questoes.md)
- **Directory Service** — [O que e](1%20-%20Seguranca%20%2830%25%29/Directory%20Service/1%20-%20O%20que%20e.md) · [Decorar](1%20-%20Seguranca%20%2830%25%29/Directory%20Service/2%20-%20Decorar.md) · [Detalhes](1%20-%20Seguranca%20%2830%25%29/Directory%20Service/3%20-%20Detalhes.md) · [Questoes](1%20-%20Seguranca%20%2830%25%29/Directory%20Service/4%20-%20Questoes.md)
- **Firewall Manager** — [O que e](1%20-%20Seguranca%20%2830%25%29/Firewall%20Manager/1%20-%20O%20que%20e.md) · [Decorar](1%20-%20Seguranca%20%2830%25%29/Firewall%20Manager/2%20-%20Decorar.md) · [Detalhes](1%20-%20Seguranca%20%2830%25%29/Firewall%20Manager/3%20-%20Detalhes.md) · [Questoes](1%20-%20Seguranca%20%2830%25%29/Firewall%20Manager/4%20-%20Questoes.md)
- **Governanca (Artifact, Trusted Advisor, Service Catalog)** — [O que e](1%20-%20Seguranca%20%2830%25%29/Governanca%20%28Artifact%2C%20Trusted%20Advisor%2C%20Service%20Catalog%29/1%20-%20O%20que%20e.md) · [Decorar](1%20-%20Seguranca%20%2830%25%29/Governanca%20%28Artifact%2C%20Trusted%20Advisor%2C%20Service%20Catalog%29/2%20-%20Decorar.md) · [Detalhes](1%20-%20Seguranca%20%2830%25%29/Governanca%20%28Artifact%2C%20Trusted%20Advisor%2C%20Service%20Catalog%29/3%20-%20Detalhes.md) · [Questoes](1%20-%20Seguranca%20%2830%25%29/Governanca%20%28Artifact%2C%20Trusted%20Advisor%2C%20Service%20Catalog%29/4%20-%20Questoes.md)
- **GuardDuty** — [O que e](1%20-%20Seguranca%20%2830%25%29/GuardDuty/1%20-%20O%20que%20e.md) · [Decorar](1%20-%20Seguranca%20%2830%25%29/GuardDuty/2%20-%20Decorar.md) · [Detalhes](1%20-%20Seguranca%20%2830%25%29/GuardDuty/3%20-%20Detalhes.md) · [Questoes](1%20-%20Seguranca%20%2830%25%29/GuardDuty/4%20-%20Questoes.md)
- **IAM** — [O que e](1%20-%20Seguranca%20%2830%25%29/IAM/1%20-%20O%20que%20e.md) · [Decorar](1%20-%20Seguranca%20%2830%25%29/IAM/2%20-%20Decorar.md) · [Detalhes](1%20-%20Seguranca%20%2830%25%29/IAM/3%20-%20Detalhes.md) · [Questoes](1%20-%20Seguranca%20%2830%25%29/IAM/4%20-%20Questoes.md)
- **IAM Identity Center** — [O que e](1%20-%20Seguranca%20%2830%25%29/IAM%20Identity%20Center/1%20-%20O%20que%20e.md) · [Decorar](1%20-%20Seguranca%20%2830%25%29/IAM%20Identity%20Center/2%20-%20Decorar.md) · [Detalhes](1%20-%20Seguranca%20%2830%25%29/IAM%20Identity%20Center/3%20-%20Detalhes.md) · [Questoes](1%20-%20Seguranca%20%2830%25%29/IAM%20Identity%20Center/4%20-%20Questoes.md)
- **Inspector** — [O que e](1%20-%20Seguranca%20%2830%25%29/Inspector/1%20-%20O%20que%20e.md) · [Decorar](1%20-%20Seguranca%20%2830%25%29/Inspector/2%20-%20Decorar.md) · [Detalhes](1%20-%20Seguranca%20%2830%25%29/Inspector/3%20-%20Detalhes.md) · [Questoes](1%20-%20Seguranca%20%2830%25%29/Inspector/4%20-%20Questoes.md)
- **KMS** — [O que e](1%20-%20Seguranca%20%2830%25%29/KMS/1%20-%20O%20que%20e.md) · [Decorar](1%20-%20Seguranca%20%2830%25%29/KMS/2%20-%20Decorar.md) · [Detalhes](1%20-%20Seguranca%20%2830%25%29/KMS/3%20-%20Detalhes.md) · [Questoes](1%20-%20Seguranca%20%2830%25%29/KMS/4%20-%20Questoes.md)
- **Macie** — [O que e](1%20-%20Seguranca%20%2830%25%29/Macie/1%20-%20O%20que%20e.md) · [Decorar](1%20-%20Seguranca%20%2830%25%29/Macie/2%20-%20Decorar.md) · [Detalhes](1%20-%20Seguranca%20%2830%25%29/Macie/3%20-%20Detalhes.md) · [Questoes](1%20-%20Seguranca%20%2830%25%29/Macie/4%20-%20Questoes.md)
- **NACL (Network ACL)** — [O que e](1%20-%20Seguranca%20%2830%25%29/NACL%20%28Network%20ACL%29/1%20-%20O%20que%20e.md) · [Decorar](1%20-%20Seguranca%20%2830%25%29/NACL%20%28Network%20ACL%29/2%20-%20Decorar.md) · [Detalhes](1%20-%20Seguranca%20%2830%25%29/NACL%20%28Network%20ACL%29/3%20-%20Detalhes.md) · [Questoes](1%20-%20Seguranca%20%2830%25%29/NACL%20%28Network%20ACL%29/4%20-%20Questoes.md)
- **NAT Gateway** — [O que e](1%20-%20Seguranca%20%2830%25%29/NAT%20Gateway/1%20-%20O%20que%20e.md) · [Decorar](1%20-%20Seguranca%20%2830%25%29/NAT%20Gateway/2%20-%20Decorar.md) · [Detalhes](1%20-%20Seguranca%20%2830%25%29/NAT%20Gateway/3%20-%20Detalhes.md) · [Questoes](1%20-%20Seguranca%20%2830%25%29/NAT%20Gateway/4%20-%20Questoes.md)
- **Organizations e Control Tower** — [O que e](1%20-%20Seguranca%20%2830%25%29/Organizations%20e%20Control%20Tower/1%20-%20O%20que%20e.md) · [Decorar](1%20-%20Seguranca%20%2830%25%29/Organizations%20e%20Control%20Tower/2%20-%20Decorar.md) · [Detalhes](1%20-%20Seguranca%20%2830%25%29/Organizations%20e%20Control%20Tower/3%20-%20Detalhes.md) · [Questoes](1%20-%20Seguranca%20%2830%25%29/Organizations%20e%20Control%20Tower/4%20-%20Questoes.md)
- **STS** — [O que e](1%20-%20Seguranca%20%2830%25%29/STS/1%20-%20O%20que%20e.md) · [Decorar](1%20-%20Seguranca%20%2830%25%29/STS/2%20-%20Decorar.md) · [Detalhes](1%20-%20Seguranca%20%2830%25%29/STS/3%20-%20Detalhes.md) · [Questoes](1%20-%20Seguranca%20%2830%25%29/STS/4%20-%20Questoes.md)
- **Secrets Manager** — [O que e](1%20-%20Seguranca%20%2830%25%29/Secrets%20Manager/1%20-%20O%20que%20e.md) · [Decorar](1%20-%20Seguranca%20%2830%25%29/Secrets%20Manager/2%20-%20Decorar.md) · [Detalhes](1%20-%20Seguranca%20%2830%25%29/Secrets%20Manager/3%20-%20Detalhes.md) · [Questoes](1%20-%20Seguranca%20%2830%25%29/Secrets%20Manager/4%20-%20Questoes.md)
- **Security Groups** — [O que e](1%20-%20Seguranca%20%2830%25%29/Security%20Groups/1%20-%20O%20que%20e.md) · [Decorar](1%20-%20Seguranca%20%2830%25%29/Security%20Groups/2%20-%20Decorar.md) · [Detalhes](1%20-%20Seguranca%20%2830%25%29/Security%20Groups/3%20-%20Detalhes.md) · [Questoes](1%20-%20Seguranca%20%2830%25%29/Security%20Groups/4%20-%20Questoes.md)
- **Security Hub** — [O que e](1%20-%20Seguranca%20%2830%25%29/Security%20Hub/1%20-%20O%20que%20e.md) · [Decorar](1%20-%20Seguranca%20%2830%25%29/Security%20Hub/2%20-%20Decorar.md) · [Detalhes](1%20-%20Seguranca%20%2830%25%29/Security%20Hub/3%20-%20Detalhes.md) · [Questoes](1%20-%20Seguranca%20%2830%25%29/Security%20Hub/4%20-%20Questoes.md)
- **Shield** — [O que e](1%20-%20Seguranca%20%2830%25%29/Shield/1%20-%20O%20que%20e.md) · [Decorar](1%20-%20Seguranca%20%2830%25%29/Shield/2%20-%20Decorar.md) · [Detalhes](1%20-%20Seguranca%20%2830%25%29/Shield/3%20-%20Detalhes.md) · [Questoes](1%20-%20Seguranca%20%2830%25%29/Shield/4%20-%20Questoes.md)
- **Systems Manager (e Parameter Store)** — [O que e](1%20-%20Seguranca%20%2830%25%29/Systems%20Manager%20%28e%20Parameter%20Store%29/1%20-%20O%20que%20e.md) · [Decorar](1%20-%20Seguranca%20%2830%25%29/Systems%20Manager%20%28e%20Parameter%20Store%29/2%20-%20Decorar.md) · [Detalhes](1%20-%20Seguranca%20%2830%25%29/Systems%20Manager%20%28e%20Parameter%20Store%29/3%20-%20Detalhes.md) · [Questoes](1%20-%20Seguranca%20%2830%25%29/Systems%20Manager%20%28e%20Parameter%20Store%29/4%20-%20Questoes.md)
- **VPC** — [O que e](1%20-%20Seguranca%20%2830%25%29/VPC/1%20-%20O%20que%20e.md) · [Decorar](1%20-%20Seguranca%20%2830%25%29/VPC/2%20-%20Decorar.md) · [Detalhes](1%20-%20Seguranca%20%2830%25%29/VPC/3%20-%20Detalhes.md) · [Questoes](1%20-%20Seguranca%20%2830%25%29/VPC/4%20-%20Questoes.md)
- **VPC Endpoints e PrivateLink** — [O que e](1%20-%20Seguranca%20%2830%25%29/VPC%20Endpoints%20e%20PrivateLink/1%20-%20O%20que%20e.md) · [Decorar](1%20-%20Seguranca%20%2830%25%29/VPC%20Endpoints%20e%20PrivateLink/2%20-%20Decorar.md) · [Detalhes](1%20-%20Seguranca%20%2830%25%29/VPC%20Endpoints%20e%20PrivateLink/3%20-%20Detalhes.md) · [Questoes](1%20-%20Seguranca%20%2830%25%29/VPC%20Endpoints%20e%20PrivateLink/4%20-%20Questoes.md)
- **WAF** — [O que e](1%20-%20Seguranca%20%2830%25%29/WAF/1%20-%20O%20que%20e.md) · [Decorar](1%20-%20Seguranca%20%2830%25%29/WAF/2%20-%20Decorar.md) · [Detalhes](1%20-%20Seguranca%20%2830%25%29/WAF/3%20-%20Detalhes.md) · [Questoes](1%20-%20Seguranca%20%2830%25%29/WAF/4%20-%20Questoes.md)

### Domínio 2 — Resiliência (26%)

- [02 - Dominio 2 - Design Resilient Architectures (26%)](2%20-%20Resiliencia%20%2826%25%29/02%20-%20Dominio%202%20-%20Design%20Resilient%20Architectures%20%2826%25%29.md) — visão do domínio, task statements oficiais e índice

- **API Gateway** — [O que e](2%20-%20Resiliencia%20%2826%25%29/API%20Gateway/1%20-%20O%20que%20e.md) · [Decorar](2%20-%20Resiliencia%20%2826%25%29/API%20Gateway/2%20-%20Decorar.md) · [Detalhes](2%20-%20Resiliencia%20%2826%25%29/API%20Gateway/3%20-%20Detalhes.md) · [Questoes](2%20-%20Resiliencia%20%2826%25%29/API%20Gateway/4%20-%20Questoes.md)
- **AWS Batch** — [O que e](2%20-%20Resiliencia%20%2826%25%29/AWS%20Batch/1%20-%20O%20que%20e.md) · [Decorar](2%20-%20Resiliencia%20%2826%25%29/AWS%20Batch/2%20-%20Decorar.md) · [Detalhes](2%20-%20Resiliencia%20%2826%25%29/AWS%20Batch/3%20-%20Detalhes.md) · [Questoes](2%20-%20Resiliencia%20%2826%25%29/AWS%20Batch/4%20-%20Questoes.md)
- **Aurora** — [O que e](2%20-%20Resiliencia%20%2826%25%29/Aurora/1%20-%20O%20que%20e.md) · [Decorar](2%20-%20Resiliencia%20%2826%25%29/Aurora/2%20-%20Decorar.md) · [Detalhes](2%20-%20Resiliencia%20%2826%25%29/Aurora/3%20-%20Detalhes.md) · [Questoes](2%20-%20Resiliencia%20%2826%25%29/Aurora/4%20-%20Questoes.md)
- **Auto Scaling (EC2)** — [O que e](2%20-%20Resiliencia%20%2826%25%29/Auto%20Scaling%20%28EC2%29/1%20-%20O%20que%20e.md) · [Decorar](2%20-%20Resiliencia%20%2826%25%29/Auto%20Scaling%20%28EC2%29/2%20-%20Decorar.md) · [Detalhes](2%20-%20Resiliencia%20%2826%25%29/Auto%20Scaling%20%28EC2%29/3%20-%20Detalhes.md) · [Questoes](2%20-%20Resiliencia%20%2826%25%29/Auto%20Scaling%20%28EC2%29/4%20-%20Questoes.md)
- **CloudFormation** — [O que e](2%20-%20Resiliencia%20%2826%25%29/CloudFormation/1%20-%20O%20que%20e.md) · [Decorar](2%20-%20Resiliencia%20%2826%25%29/CloudFormation/2%20-%20Decorar.md) · [Detalhes](2%20-%20Resiliencia%20%2826%25%29/CloudFormation/3%20-%20Detalhes.md) · [Questoes](2%20-%20Resiliencia%20%2826%25%29/CloudFormation/4%20-%20Questoes.md)
- **CloudWatch** — [O que e](2%20-%20Resiliencia%20%2826%25%29/CloudWatch/1%20-%20O%20que%20e.md) · [Decorar](2%20-%20Resiliencia%20%2826%25%29/CloudWatch/2%20-%20Decorar.md) · [Detalhes](2%20-%20Resiliencia%20%2826%25%29/CloudWatch/3%20-%20Detalhes.md) · [Questoes](2%20-%20Resiliencia%20%2826%25%29/CloudWatch/4%20-%20Questoes.md)
- **ECS** — [O que e](2%20-%20Resiliencia%20%2826%25%29/ECS/1%20-%20O%20que%20e.md) · [Decorar](2%20-%20Resiliencia%20%2826%25%29/ECS/2%20-%20Decorar.md) · [Detalhes](2%20-%20Resiliencia%20%2826%25%29/ECS/3%20-%20Detalhes.md) · [Questoes](2%20-%20Resiliencia%20%2826%25%29/ECS/4%20-%20Questoes.md)
- **EKS** — [O que e](2%20-%20Resiliencia%20%2826%25%29/EKS/1%20-%20O%20que%20e.md) · [Decorar](2%20-%20Resiliencia%20%2826%25%29/EKS/2%20-%20Decorar.md) · [Detalhes](2%20-%20Resiliencia%20%2826%25%29/EKS/3%20-%20Detalhes.md) · [Questoes](2%20-%20Resiliencia%20%2826%25%29/EKS/4%20-%20Questoes.md)
- **ELB (Load Balancers)** — [O que e](2%20-%20Resiliencia%20%2826%25%29/ELB%20%28Load%20Balancers%29/1%20-%20O%20que%20e.md) · [Decorar](2%20-%20Resiliencia%20%2826%25%29/ELB%20%28Load%20Balancers%29/2%20-%20Decorar.md) · [Detalhes](2%20-%20Resiliencia%20%2826%25%29/ELB%20%28Load%20Balancers%29/3%20-%20Detalhes.md) · [Questoes](2%20-%20Resiliencia%20%2826%25%29/ELB%20%28Load%20Balancers%29/4%20-%20Questoes.md)
- **Elastic Beanstalk** — [O que e](2%20-%20Resiliencia%20%2826%25%29/Elastic%20Beanstalk/1%20-%20O%20que%20e.md) · [Decorar](2%20-%20Resiliencia%20%2826%25%29/Elastic%20Beanstalk/2%20-%20Decorar.md) · [Detalhes](2%20-%20Resiliencia%20%2826%25%29/Elastic%20Beanstalk/3%20-%20Detalhes.md) · [Questoes](2%20-%20Resiliencia%20%2826%25%29/Elastic%20Beanstalk/4%20-%20Questoes.md)
- **EventBridge** — [O que e](2%20-%20Resiliencia%20%2826%25%29/EventBridge/1%20-%20O%20que%20e.md) · [Decorar](2%20-%20Resiliencia%20%2826%25%29/EventBridge/2%20-%20Decorar.md) · [Detalhes](2%20-%20Resiliencia%20%2826%25%29/EventBridge/3%20-%20Detalhes.md) · [Questoes](2%20-%20Resiliencia%20%2826%25%29/EventBridge/4%20-%20Questoes.md)
- **Fargate** — [O que e](2%20-%20Resiliencia%20%2826%25%29/Fargate/1%20-%20O%20que%20e.md) · [Decorar](2%20-%20Resiliencia%20%2826%25%29/Fargate/2%20-%20Decorar.md) · [Detalhes](2%20-%20Resiliencia%20%2826%25%29/Fargate/3%20-%20Detalhes.md) · [Questoes](2%20-%20Resiliencia%20%2826%25%29/Fargate/4%20-%20Questoes.md)
- **Lambda** — [O que e](2%20-%20Resiliencia%20%2826%25%29/Lambda/1%20-%20O%20que%20e.md) · [Decorar](2%20-%20Resiliencia%20%2826%25%29/Lambda/2%20-%20Decorar.md) · [Detalhes](2%20-%20Resiliencia%20%2826%25%29/Lambda/3%20-%20Detalhes.md) · [Questoes](2%20-%20Resiliencia%20%2826%25%29/Lambda/4%20-%20Questoes.md)
- **Mensageria gerenciada (Amazon MQ e MSK)** — [O que e](2%20-%20Resiliencia%20%2826%25%29/Mensageria%20gerenciada%20%28Amazon%20MQ%20e%20MSK%29/1%20-%20O%20que%20e.md) · [Decorar](2%20-%20Resiliencia%20%2826%25%29/Mensageria%20gerenciada%20%28Amazon%20MQ%20e%20MSK%29/2%20-%20Decorar.md) · [Detalhes](2%20-%20Resiliencia%20%2826%25%29/Mensageria%20gerenciada%20%28Amazon%20MQ%20e%20MSK%29/3%20-%20Detalhes.md) · [Questoes](2%20-%20Resiliencia%20%2826%25%29/Mensageria%20gerenciada%20%28Amazon%20MQ%20e%20MSK%29/4%20-%20Questoes.md)
- **RDS** — [O que e](2%20-%20Resiliencia%20%2826%25%29/RDS/1%20-%20O%20que%20e.md) · [Decorar](2%20-%20Resiliencia%20%2826%25%29/RDS/2%20-%20Decorar.md) · [Detalhes](2%20-%20Resiliencia%20%2826%25%29/RDS/3%20-%20Detalhes.md) · [Questoes](2%20-%20Resiliencia%20%2826%25%29/RDS/4%20-%20Questoes.md)
- **RDS Proxy** — [O que e](2%20-%20Resiliencia%20%2826%25%29/RDS%20Proxy/1%20-%20O%20que%20e.md) · [Decorar](2%20-%20Resiliencia%20%2826%25%29/RDS%20Proxy/2%20-%20Decorar.md) · [Detalhes](2%20-%20Resiliencia%20%2826%25%29/RDS%20Proxy/3%20-%20Detalhes.md) · [Questoes](2%20-%20Resiliencia%20%2826%25%29/RDS%20Proxy/4%20-%20Questoes.md)
- **Route 53** — [O que e](2%20-%20Resiliencia%20%2826%25%29/Route%2053/1%20-%20O%20que%20e.md) · [Decorar](2%20-%20Resiliencia%20%2826%25%29/Route%2053/2%20-%20Decorar.md) · [Detalhes](2%20-%20Resiliencia%20%2826%25%29/Route%2053/3%20-%20Detalhes.md) · [Questoes](2%20-%20Resiliencia%20%2826%25%29/Route%2053/4%20-%20Questoes.md)
- **SNS** — [O que e](2%20-%20Resiliencia%20%2826%25%29/SNS/1%20-%20O%20que%20e.md) · [Decorar](2%20-%20Resiliencia%20%2826%25%29/SNS/2%20-%20Decorar.md) · [Detalhes](2%20-%20Resiliencia%20%2826%25%29/SNS/3%20-%20Detalhes.md) · [Questoes](2%20-%20Resiliencia%20%2826%25%29/SNS/4%20-%20Questoes.md)
- **SQS** — [O que e](2%20-%20Resiliencia%20%2826%25%29/SQS/1%20-%20O%20que%20e.md) · [Decorar](2%20-%20Resiliencia%20%2826%25%29/SQS/2%20-%20Decorar.md) · [Detalhes](2%20-%20Resiliencia%20%2826%25%29/SQS/3%20-%20Detalhes.md) · [Questoes](2%20-%20Resiliencia%20%2826%25%29/SQS/4%20-%20Questoes.md)
- **Step Functions** — [O que e](2%20-%20Resiliencia%20%2826%25%29/Step%20Functions/1%20-%20O%20que%20e.md) · [Decorar](2%20-%20Resiliencia%20%2826%25%29/Step%20Functions/2%20-%20Decorar.md) · [Detalhes](2%20-%20Resiliencia%20%2826%25%29/Step%20Functions/3%20-%20Detalhes.md) · [Questoes](2%20-%20Resiliencia%20%2826%25%29/Step%20Functions/4%20-%20Questoes.md)
- **X-Ray** — [O que e](2%20-%20Resiliencia%20%2826%25%29/X-Ray/1%20-%20O%20que%20e.md) · [Decorar](2%20-%20Resiliencia%20%2826%25%29/X-Ray/2%20-%20Decorar.md) · [Detalhes](2%20-%20Resiliencia%20%2826%25%29/X-Ray/3%20-%20Detalhes.md) · [Questoes](2%20-%20Resiliencia%20%2826%25%29/X-Ray/4%20-%20Questoes.md)

### Domínio 3 — Performance (24%)

- [03 - Dominio 3 - Design High-Performing Architectures (24%)](3%20-%20Performance%20%2824%25%29/03%20-%20Dominio%203%20-%20Design%20High-Performing%20Architectures%20%2824%25%29.md) — visão do domínio, task statements oficiais e índice

- **Athena** — [O que e](3%20-%20Performance%20%2824%25%29/Athena/1%20-%20O%20que%20e.md) · [Decorar](3%20-%20Performance%20%2824%25%29/Athena/2%20-%20Decorar.md) · [Detalhes](3%20-%20Performance%20%2824%25%29/Athena/3%20-%20Detalhes.md) · [Questoes](3%20-%20Performance%20%2824%25%29/Athena/4%20-%20Questoes.md)
- **Bancos especializados (Neptune, DocumentDB, Keyspaces, Timestream)** — [O que e](3%20-%20Performance%20%2824%25%29/Bancos%20especializados%20%28Neptune%2C%20DocumentDB%2C%20Keyspaces%2C%20Timestream%29/1%20-%20O%20que%20e.md) · [Decorar](3%20-%20Performance%20%2824%25%29/Bancos%20especializados%20%28Neptune%2C%20DocumentDB%2C%20Keyspaces%2C%20Timestream%29/2%20-%20Decorar.md) · [Detalhes](3%20-%20Performance%20%2824%25%29/Bancos%20especializados%20%28Neptune%2C%20DocumentDB%2C%20Keyspaces%2C%20Timestream%29/3%20-%20Detalhes.md) · [Questoes](3%20-%20Performance%20%2824%25%29/Bancos%20especializados%20%28Neptune%2C%20DocumentDB%2C%20Keyspaces%2C%20Timestream%29/4%20-%20Questoes.md)
- **CloudFront** — [O que e](3%20-%20Performance%20%2824%25%29/CloudFront/1%20-%20O%20que%20e.md) · [Decorar](3%20-%20Performance%20%2824%25%29/CloudFront/2%20-%20Decorar.md) · [Detalhes](3%20-%20Performance%20%2824%25%29/CloudFront/3%20-%20Detalhes.md) · [Questoes](3%20-%20Performance%20%2824%25%29/CloudFront/4%20-%20Questoes.md)
- **DAX** — [O que e](3%20-%20Performance%20%2824%25%29/DAX/1%20-%20O%20que%20e.md) · [Decorar](3%20-%20Performance%20%2824%25%29/DAX/2%20-%20Decorar.md) · [Detalhes](3%20-%20Performance%20%2824%25%29/DAX/3%20-%20Detalhes.md) · [Questoes](3%20-%20Performance%20%2824%25%29/DAX/4%20-%20Questoes.md)
- **DataSync** — [O que e](3%20-%20Performance%20%2824%25%29/DataSync/1%20-%20O%20que%20e.md) · [Decorar](3%20-%20Performance%20%2824%25%29/DataSync/2%20-%20Decorar.md) · [Detalhes](3%20-%20Performance%20%2824%25%29/DataSync/3%20-%20Detalhes.md) · [Questoes](3%20-%20Performance%20%2824%25%29/DataSync/4%20-%20Questoes.md)
- **Direct Connect** — [O que e](3%20-%20Performance%20%2824%25%29/Direct%20Connect/1%20-%20O%20que%20e.md) · [Decorar](3%20-%20Performance%20%2824%25%29/Direct%20Connect/2%20-%20Decorar.md) · [Detalhes](3%20-%20Performance%20%2824%25%29/Direct%20Connect/3%20-%20Detalhes.md) · [Questoes](3%20-%20Performance%20%2824%25%29/Direct%20Connect/4%20-%20Questoes.md)
- **DynamoDB** — [O que e](3%20-%20Performance%20%2824%25%29/DynamoDB/1%20-%20O%20que%20e.md) · [Decorar](3%20-%20Performance%20%2824%25%29/DynamoDB/2%20-%20Decorar.md) · [Detalhes](3%20-%20Performance%20%2824%25%29/DynamoDB/3%20-%20Detalhes.md) · [Questoes](3%20-%20Performance%20%2824%25%29/DynamoDB/4%20-%20Questoes.md)
- **EBS** — [O que e](3%20-%20Performance%20%2824%25%29/EBS/1%20-%20O%20que%20e.md) · [Decorar](3%20-%20Performance%20%2824%25%29/EBS/2%20-%20Decorar.md) · [Detalhes](3%20-%20Performance%20%2824%25%29/EBS/3%20-%20Detalhes.md) · [Questoes](3%20-%20Performance%20%2824%25%29/EBS/4%20-%20Questoes.md)
- **EC2** — [O que e](3%20-%20Performance%20%2824%25%29/EC2/1%20-%20O%20que%20e.md) · [Decorar](3%20-%20Performance%20%2824%25%29/EC2/2%20-%20Decorar.md) · [Detalhes](3%20-%20Performance%20%2824%25%29/EC2/3%20-%20Detalhes.md) · [Questoes](3%20-%20Performance%20%2824%25%29/EC2/4%20-%20Questoes.md)
- **EFS** — [O que e](3%20-%20Performance%20%2824%25%29/EFS/1%20-%20O%20que%20e.md) · [Decorar](3%20-%20Performance%20%2824%25%29/EFS/2%20-%20Decorar.md) · [Detalhes](3%20-%20Performance%20%2824%25%29/EFS/3%20-%20Detalhes.md) · [Questoes](3%20-%20Performance%20%2824%25%29/EFS/4%20-%20Questoes.md)
- **EMR** — [O que e](3%20-%20Performance%20%2824%25%29/EMR/1%20-%20O%20que%20e.md) · [Decorar](3%20-%20Performance%20%2824%25%29/EMR/2%20-%20Decorar.md) · [Detalhes](3%20-%20Performance%20%2824%25%29/EMR/3%20-%20Detalhes.md) · [Questoes](3%20-%20Performance%20%2824%25%29/EMR/4%20-%20Questoes.md)
- **ElastiCache** — [O que e](3%20-%20Performance%20%2824%25%29/ElastiCache/1%20-%20O%20que%20e.md) · [Decorar](3%20-%20Performance%20%2824%25%29/ElastiCache/2%20-%20Decorar.md) · [Detalhes](3%20-%20Performance%20%2824%25%29/ElastiCache/3%20-%20Detalhes.md) · [Questoes](3%20-%20Performance%20%2824%25%29/ElastiCache/4%20-%20Questoes.md)
- **FSx** — [O que e](3%20-%20Performance%20%2824%25%29/FSx/1%20-%20O%20que%20e.md) · [Decorar](3%20-%20Performance%20%2824%25%29/FSx/2%20-%20Decorar.md) · [Detalhes](3%20-%20Performance%20%2824%25%29/FSx/3%20-%20Detalhes.md) · [Questoes](3%20-%20Performance%20%2824%25%29/FSx/4%20-%20Questoes.md)
- **Global Accelerator** — [O que e](3%20-%20Performance%20%2824%25%29/Global%20Accelerator/1%20-%20O%20que%20e.md) · [Decorar](3%20-%20Performance%20%2824%25%29/Global%20Accelerator/2%20-%20Decorar.md) · [Detalhes](3%20-%20Performance%20%2824%25%29/Global%20Accelerator/3%20-%20Detalhes.md) · [Questoes](3%20-%20Performance%20%2824%25%29/Global%20Accelerator/4%20-%20Questoes.md)
- **Glue** — [O que e](3%20-%20Performance%20%2824%25%29/Glue/1%20-%20O%20que%20e.md) · [Decorar](3%20-%20Performance%20%2824%25%29/Glue/2%20-%20Decorar.md) · [Detalhes](3%20-%20Performance%20%2824%25%29/Glue/3%20-%20Detalhes.md) · [Questoes](3%20-%20Performance%20%2824%25%29/Glue/4%20-%20Questoes.md)
- **Kinesis Data Firehose** — [O que e](3%20-%20Performance%20%2824%25%29/Kinesis%20Data%20Firehose/1%20-%20O%20que%20e.md) · [Decorar](3%20-%20Performance%20%2824%25%29/Kinesis%20Data%20Firehose/2%20-%20Decorar.md) · [Detalhes](3%20-%20Performance%20%2824%25%29/Kinesis%20Data%20Firehose/3%20-%20Detalhes.md) · [Questoes](3%20-%20Performance%20%2824%25%29/Kinesis%20Data%20Firehose/4%20-%20Questoes.md)
- **Kinesis Data Streams** — [O que e](3%20-%20Performance%20%2824%25%29/Kinesis%20Data%20Streams/1%20-%20O%20que%20e.md) · [Decorar](3%20-%20Performance%20%2824%25%29/Kinesis%20Data%20Streams/2%20-%20Decorar.md) · [Detalhes](3%20-%20Performance%20%2824%25%29/Kinesis%20Data%20Streams/3%20-%20Detalhes.md) · [Questoes](3%20-%20Performance%20%2824%25%29/Kinesis%20Data%20Streams/4%20-%20Questoes.md)
- **Lake Formation** — [O que e](3%20-%20Performance%20%2824%25%29/Lake%20Formation/1%20-%20O%20que%20e.md) · [Decorar](3%20-%20Performance%20%2824%25%29/Lake%20Formation/2%20-%20Decorar.md) · [Detalhes](3%20-%20Performance%20%2824%25%29/Lake%20Formation/3%20-%20Detalhes.md) · [Questoes](3%20-%20Performance%20%2824%25%29/Lake%20Formation/4%20-%20Questoes.md)
- **OpenSearch Service** — [O que e](3%20-%20Performance%20%2824%25%29/OpenSearch%20Service/1%20-%20O%20que%20e.md) · [Decorar](3%20-%20Performance%20%2824%25%29/OpenSearch%20Service/2%20-%20Decorar.md) · [Detalhes](3%20-%20Performance%20%2824%25%29/OpenSearch%20Service/3%20-%20Detalhes.md) · [Questoes](3%20-%20Performance%20%2824%25%29/OpenSearch%20Service/4%20-%20Questoes.md)
- **Outposts** — [O que e](3%20-%20Performance%20%2824%25%29/Outposts/1%20-%20O%20que%20e.md) · [Decorar](3%20-%20Performance%20%2824%25%29/Outposts/2%20-%20Decorar.md) · [Detalhes](3%20-%20Performance%20%2824%25%29/Outposts/3%20-%20Detalhes.md) · [Questoes](3%20-%20Performance%20%2824%25%29/Outposts/4%20-%20Questoes.md)
- **Placement Groups** — [O que e](3%20-%20Performance%20%2824%25%29/Placement%20Groups/1%20-%20O%20que%20e.md) · [Decorar](3%20-%20Performance%20%2824%25%29/Placement%20Groups/2%20-%20Decorar.md) · [Detalhes](3%20-%20Performance%20%2824%25%29/Placement%20Groups/3%20-%20Detalhes.md) · [Questoes](3%20-%20Performance%20%2824%25%29/Placement%20Groups/4%20-%20Questoes.md)
- **Redshift** — [O que e](3%20-%20Performance%20%2824%25%29/Redshift/1%20-%20O%20que%20e.md) · [Decorar](3%20-%20Performance%20%2824%25%29/Redshift/2%20-%20Decorar.md) · [Detalhes](3%20-%20Performance%20%2824%25%29/Redshift/3%20-%20Detalhes.md) · [Questoes](3%20-%20Performance%20%2824%25%29/Redshift/4%20-%20Questoes.md)
- **S3** — [O que e](3%20-%20Performance%20%2824%25%29/S3/1%20-%20O%20que%20e.md) · [Decorar](3%20-%20Performance%20%2824%25%29/S3/2%20-%20Decorar.md) · [Detalhes](3%20-%20Performance%20%2824%25%29/S3/3%20-%20Detalhes.md) · [Questoes](3%20-%20Performance%20%2824%25%29/S3/4%20-%20Questoes.md)
- **S3 Glacier** — [O que e](3%20-%20Performance%20%2824%25%29/S3%20Glacier/1%20-%20O%20que%20e.md) · [Decorar](3%20-%20Performance%20%2824%25%29/S3%20Glacier/2%20-%20Decorar.md) · [Detalhes](3%20-%20Performance%20%2824%25%29/S3%20Glacier/3%20-%20Detalhes.md) · [Questoes](3%20-%20Performance%20%2824%25%29/S3%20Glacier/4%20-%20Questoes.md)
- **Storage Gateway** — [O que e](3%20-%20Performance%20%2824%25%29/Storage%20Gateway/1%20-%20O%20que%20e.md) · [Decorar](3%20-%20Performance%20%2824%25%29/Storage%20Gateway/2%20-%20Decorar.md) · [Detalhes](3%20-%20Performance%20%2824%25%29/Storage%20Gateway/3%20-%20Detalhes.md) · [Questoes](3%20-%20Performance%20%2824%25%29/Storage%20Gateway/4%20-%20Questoes.md)
- **Transfer Family** — [O que e](3%20-%20Performance%20%2824%25%29/Transfer%20Family/1%20-%20O%20que%20e.md) · [Decorar](3%20-%20Performance%20%2824%25%29/Transfer%20Family/2%20-%20Decorar.md) · [Detalhes](3%20-%20Performance%20%2824%25%29/Transfer%20Family/3%20-%20Detalhes.md) · [Questoes](3%20-%20Performance%20%2824%25%29/Transfer%20Family/4%20-%20Questoes.md)
- **Transit Gateway** — [O que e](3%20-%20Performance%20%2824%25%29/Transit%20Gateway/1%20-%20O%20que%20e.md) · [Decorar](3%20-%20Performance%20%2824%25%29/Transit%20Gateway/2%20-%20Decorar.md) · [Detalhes](3%20-%20Performance%20%2824%25%29/Transit%20Gateway/3%20-%20Detalhes.md) · [Questoes](3%20-%20Performance%20%2824%25%29/Transit%20Gateway/4%20-%20Questoes.md)
- **VPC Peering** — [O que e](3%20-%20Performance%20%2824%25%29/VPC%20Peering/1%20-%20O%20que%20e.md) · [Decorar](3%20-%20Performance%20%2824%25%29/VPC%20Peering/2%20-%20Decorar.md) · [Detalhes](3%20-%20Performance%20%2824%25%29/VPC%20Peering/3%20-%20Detalhes.md) · [Questoes](3%20-%20Performance%20%2824%25%29/VPC%20Peering/4%20-%20Questoes.md)
- **VPN (Site-to-Site)** — [O que e](3%20-%20Performance%20%2824%25%29/VPN%20%28Site-to-Site%29/1%20-%20O%20que%20e.md) · [Decorar](3%20-%20Performance%20%2824%25%29/VPN%20%28Site-to-Site%29/2%20-%20Decorar.md) · [Detalhes](3%20-%20Performance%20%2824%25%29/VPN%20%28Site-to-Site%29/3%20-%20Detalhes.md) · [Questoes](3%20-%20Performance%20%2824%25%29/VPN%20%28Site-to-Site%29/4%20-%20Questoes.md)

### Domínio 4 — Custo (20%)

- [04 - Dominio 4 - Design Cost-Optimized Architectures (20%)](4%20-%20Custo%20%2820%25%29/04%20-%20Dominio%204%20-%20Design%20Cost-Optimized%20Architectures%20%2820%25%29.md) — visão do domínio, task statements oficiais e índice

- **Compute Optimizer** — [O que e](4%20-%20Custo%20%2820%25%29/Compute%20Optimizer/1%20-%20O%20que%20e.md) · [Decorar](4%20-%20Custo%20%2820%25%29/Compute%20Optimizer/2%20-%20Decorar.md) · [Detalhes](4%20-%20Custo%20%2820%25%29/Compute%20Optimizer/3%20-%20Detalhes.md) · [Questoes](4%20-%20Custo%20%2820%25%29/Compute%20Optimizer/4%20-%20Questoes.md)
- **DMS (Database Migration Service)** — [O que e](4%20-%20Custo%20%2820%25%29/DMS%20%28Database%20Migration%20Service%29/1%20-%20O%20que%20e.md) · [Decorar](4%20-%20Custo%20%2820%25%29/DMS%20%28Database%20Migration%20Service%29/2%20-%20Decorar.md) · [Detalhes](4%20-%20Custo%20%2820%25%29/DMS%20%28Database%20Migration%20Service%29/3%20-%20Detalhes.md) · [Questoes](4%20-%20Custo%20%2820%25%29/DMS%20%28Database%20Migration%20Service%29/4%20-%20Questoes.md)
- **Ferramentas de custo (Cost Explorer, Budgets, CUR)** — [O que e](4%20-%20Custo%20%2820%25%29/Ferramentas%20de%20custo%20%28Cost%20Explorer%2C%20Budgets%2C%20CUR%29/1%20-%20O%20que%20e.md) · [Decorar](4%20-%20Custo%20%2820%25%29/Ferramentas%20de%20custo%20%28Cost%20Explorer%2C%20Budgets%2C%20CUR%29/2%20-%20Decorar.md) · [Detalhes](4%20-%20Custo%20%2820%25%29/Ferramentas%20de%20custo%20%28Cost%20Explorer%2C%20Budgets%2C%20CUR%29/3%20-%20Detalhes.md) · [Questoes](4%20-%20Custo%20%2820%25%29/Ferramentas%20de%20custo%20%28Cost%20Explorer%2C%20Budgets%2C%20CUR%29/4%20-%20Questoes.md)
- **Opcoes de compra do EC2 (Spot, RI, Savings Plans)** — [O que e](4%20-%20Custo%20%2820%25%29/Opcoes%20de%20compra%20do%20EC2%20%28Spot%2C%20RI%2C%20Savings%20Plans%29/1%20-%20O%20que%20e.md) · [Decorar](4%20-%20Custo%20%2820%25%29/Opcoes%20de%20compra%20do%20EC2%20%28Spot%2C%20RI%2C%20Savings%20Plans%29/2%20-%20Decorar.md) · [Detalhes](4%20-%20Custo%20%2820%25%29/Opcoes%20de%20compra%20do%20EC2%20%28Spot%2C%20RI%2C%20Savings%20Plans%29/3%20-%20Detalhes.md) · [Questoes](4%20-%20Custo%20%2820%25%29/Opcoes%20de%20compra%20do%20EC2%20%28Spot%2C%20RI%2C%20Savings%20Plans%29/4%20-%20Questoes.md)
- **Snow Family** — [O que e](4%20-%20Custo%20%2820%25%29/Snow%20Family/1%20-%20O%20que%20e.md) · [Decorar](4%20-%20Custo%20%2820%25%29/Snow%20Family/2%20-%20Decorar.md) · [Detalhes](4%20-%20Custo%20%2820%25%29/Snow%20Family/3%20-%20Detalhes.md) · [Questoes](4%20-%20Custo%20%2820%25%29/Snow%20Family/4%20-%20Questoes.md)

### Fundamentos e apoio

- [09 - Fundamentos e apoio](9%20-%20Fundamentos%20e%20apoio/09%20-%20Fundamentos%20e%20apoio.md) — visão do domínio, task statements oficiais e índice

- **Criptografia em repouso e em transito** — [O que e](9%20-%20Fundamentos%20e%20apoio/Criptografia%20em%20repouso%20e%20em%20transito/1%20-%20O%20que%20e.md) · [Decorar](9%20-%20Fundamentos%20e%20apoio/Criptografia%20em%20repouso%20e%20em%20transito/2%20-%20Decorar.md) · [Detalhes](9%20-%20Fundamentos%20e%20apoio/Criptografia%20em%20repouso%20e%20em%20transito/3%20-%20Detalhes.md) · [Questoes](9%20-%20Fundamentos%20e%20apoio/Criptografia%20em%20repouso%20e%20em%20transito/4%20-%20Questoes.md)
- **Disaster Recovery (RPO e RTO)** — [O que e](9%20-%20Fundamentos%20e%20apoio/Disaster%20Recovery%20%28RPO%20e%20RTO%29/1%20-%20O%20que%20e.md) · [Decorar](9%20-%20Fundamentos%20e%20apoio/Disaster%20Recovery%20%28RPO%20e%20RTO%29/2%20-%20Decorar.md) · [Detalhes](9%20-%20Fundamentos%20e%20apoio/Disaster%20Recovery%20%28RPO%20e%20RTO%29/3%20-%20Detalhes.md) · [Questoes](9%20-%20Fundamentos%20e%20apoio/Disaster%20Recovery%20%28RPO%20e%20RTO%29/4%20-%20Questoes.md)
- **Estrategias de migracao (7 Rs)** — [O que e](9%20-%20Fundamentos%20e%20apoio/Estrategias%20de%20migracao%20%287%20Rs%29/1%20-%20O%20que%20e.md) · [Decorar](9%20-%20Fundamentos%20e%20apoio/Estrategias%20de%20migracao%20%287%20Rs%29/2%20-%20Decorar.md) · [Detalhes](9%20-%20Fundamentos%20e%20apoio/Estrategias%20de%20migracao%20%287%20Rs%29/3%20-%20Detalhes.md) · [Questoes](9%20-%20Fundamentos%20e%20apoio/Estrategias%20de%20migracao%20%287%20Rs%29/4%20-%20Questoes.md)
- **Regioes, AZs e infraestrutura global** — [O que e](9%20-%20Fundamentos%20e%20apoio/Regioes%2C%20AZs%20e%20infraestrutura%20global/1%20-%20O%20que%20e.md) · [Decorar](9%20-%20Fundamentos%20e%20apoio/Regioes%2C%20AZs%20e%20infraestrutura%20global/2%20-%20Decorar.md) · [Detalhes](9%20-%20Fundamentos%20e%20apoio/Regioes%2C%20AZs%20e%20infraestrutura%20global/3%20-%20Detalhes.md) · [Questoes](9%20-%20Fundamentos%20e%20apoio/Regioes%2C%20AZs%20e%20infraestrutura%20global/4%20-%20Questoes.md)
- **Responsabilidade compartilhada** — [O que e](9%20-%20Fundamentos%20e%20apoio/Responsabilidade%20compartilhada/1%20-%20O%20que%20e.md) · [Decorar](9%20-%20Fundamentos%20e%20apoio/Responsabilidade%20compartilhada/2%20-%20Decorar.md) · [Detalhes](9%20-%20Fundamentos%20e%20apoio/Responsabilidade%20compartilhada/3%20-%20Detalhes.md) · [Questoes](9%20-%20Fundamentos%20e%20apoio/Responsabilidade%20compartilhada/4%20-%20Questoes.md)
- **Tipos de armazenamento (objeto, arquivo, bloco)** — [O que e](9%20-%20Fundamentos%20e%20apoio/Tipos%20de%20armazenamento%20%28objeto%2C%20arquivo%2C%20bloco%29/1%20-%20O%20que%20e.md) · [Decorar](9%20-%20Fundamentos%20e%20apoio/Tipos%20de%20armazenamento%20%28objeto%2C%20arquivo%2C%20bloco%29/2%20-%20Decorar.md) · [Detalhes](9%20-%20Fundamentos%20e%20apoio/Tipos%20de%20armazenamento%20%28objeto%2C%20arquivo%2C%20bloco%29/3%20-%20Detalhes.md) · [Questoes](9%20-%20Fundamentos%20e%20apoio/Tipos%20de%20armazenamento%20%28objeto%2C%20arquivo%2C%20bloco%29/4%20-%20Questoes.md)
- **Well-Architected Framework** — [O que e](9%20-%20Fundamentos%20e%20apoio/Well-Architected%20Framework/1%20-%20O%20que%20e.md) · [Decorar](9%20-%20Fundamentos%20e%20apoio/Well-Architected%20Framework/2%20-%20Decorar.md) · [Detalhes](9%20-%20Fundamentos%20e%20apoio/Well-Architected%20Framework/3%20-%20Detalhes.md) · [Questoes](9%20-%20Fundamentos%20e%20apoio/Well-Architected%20Framework/4%20-%20Questoes.md)

## Fontes oficiais

- [Exam guide SAA-C03](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html)
- [Serviços em escopo](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/saa-03-in-scope-services.html)
- [Serviços fora de escopo](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/saa-03-out-of-scope-services.html)
