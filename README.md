# Resumo — AWS Certified Solutions Architect – Associate (SAA-C03)

Resumo de estudo completo para a prova **AWS Certified Solutions Architect – Associate**, organizado pelos **quatro domínios do guia oficial**, com os números que caem, as palavras-chave de enunciado e as pegadinhas de cada tema.

> Todo o conteúdo foi conferido contra a documentação oficial em **`docs.aws.amazon.com`** em **08/11/2026**, a partir do **exam guide SAA-C03, versão 1.1 (publicada em 29/10/2026)**.
> Onde a documentação oficial não afirma um número, a nota diz isso explicitamente em vez de repetir um valor de terceiros.

## Como usar

Este repositório é um **vault do Obsidian**. Clone dentro do seu vault (ou abra a pasta como vault) para que os links `[[assim]]` e os callouts dobráveis funcionem:

```bash
git clone https://github.com/PriscilaFabreteCandido/Resumo-AWS-Certified-Solutions-Architect-Associate.git
```

Cada nota segue a mesma estrutura, desenhada para **recuperação ativa** em vez de releitura:

| Seção | O que fazer |
|---|---|
| 🧩 **Em 30 segundos** | O essencial. Na véspera da prova, leia só isso em todas as notas. |
| 🧠 **Teste-se primeiro** | Perguntas dobráveis. Responda de cabeça **antes** de abrir. |
| **Conteúdo** | Blocos curtos, com os números e as citações oficiais. |
| ❓ **Questões de prova** | Alternativas A–D, com **por que cada errada está errada**. |
| ⚠️ **Armadilhas** | Tabela "o que parece × o que é". |

## A prova em números

| Item | Valor |
|---|---|
| Código | **SAA-C03** |
| Questões que contam nota | **50** (+ 15 não pontuadas, não identificadas) |
| Nota mínima | **720** (escala de 100 a 1.000) |
| Modelo de nota | **Compensatório** — só o total importa |
| Questão em branco | Conta como errada |

| # | Domínio | Peso |
|---|---|---|
| 1 | Design Secure Architectures | **30%** |
| 2 | Design Resilient Architectures | **26%** |
| 3 | Design High-Performing Architectures | **24%** |
| 4 | Design Cost-Optimized Architectures | **20%** |

## Índice

### Comece aqui

- [00 - START HERE (indice da prova)](00%20-%20START%20HERE%20%28indice%20da%20prova%29.md)
- [01 - Palavras-chave (decoder de enunciado)](01%20-%20Palavras-chave%20%28decoder%20de%20enunciado%29.md)
- [02 - Numeros para decorar](02%20-%20Numeros%20para%20decorar.md)
- [03 - Pegadinhas mestre](03%20-%20Pegadinhas%20mestre.md)
- [04 - Fora de escopo (nao estude isso)](04%20-%20Fora%20de%20escopo%20%28nao%20estude%20isso%29.md)
- [05 - Plano de estudo (e como praticar sem levar susto na fatura)](05%20-%20Plano%20de%20estudo%20%28e%20como%20praticar%20sem%20levar%20susto%20na%20fatura%29.md)

### Domínio 1 — Segurança (30%)

- [01 - Dominio 1 - Design Secure Architectures (30%)](1%20-%20Seguranca%20%2830%25%29/01%20-%20Dominio%201%20-%20Design%20Secure%20Architectures%20%2830%25%29.md)
- [Backup, retencao e AWS Backup](1%20-%20Seguranca%20%2830%25%29/Backup%2C%20retencao%20e%20AWS%20Backup.md)
- [Criptografia - KMS, CloudHSM e ACM](1%20-%20Seguranca%20%2830%25%29/Criptografia%20-%20KMS%2C%20CloudHSM%20e%20ACM.md)
- [Deteccao - GuardDuty, Macie, Inspector, Security Hub e Detective](1%20-%20Seguranca%20%2830%25%29/Deteccao%20-%20GuardDuty%2C%20Macie%2C%20Inspector%2C%20Security%20Hub%20e%20Detective.md)
- [IAM, STS e Organizations](1%20-%20Seguranca%20%2830%25%29/IAM%2C%20STS%20e%20Organizations.md)
- [Identidade de aplicacao - Cognito e Directory Service](1%20-%20Seguranca%20%2830%25%29/Identidade%20de%20aplicacao%20-%20Cognito%20e%20Directory%20Service.md)
- [Protecao de borda - WAF, Shield e Firewall Manager](1%20-%20Seguranca%20%2830%25%29/Protecao%20de%20borda%20-%20WAF%2C%20Shield%20e%20Firewall%20Manager.md)
- [Protecao de dados no S3](1%20-%20Seguranca%20%2830%25%29/Protecao%20de%20dados%20no%20S3.md)
- [Rede segura - SG, NACL e endpoints](1%20-%20Seguranca%20%2830%25%29/Rede%20segura%20-%20SG%2C%20NACL%20e%20endpoints.md)
- [Secrets Manager e Parameter Store](1%20-%20Seguranca%20%2830%25%29/Secrets%20Manager%20e%20Parameter%20Store.md)

### Domínio 2 — Resiliência (26%)

- [02 - Dominio 2 - Design Resilient Architectures (26%)](2%20-%20Resiliencia%20%2826%25%29/02%20-%20Dominio%202%20-%20Design%20Resilient%20Architectures%20%2826%25%29.md)
- [API Gateway](2%20-%20Resiliencia%20%2826%25%29/API%20Gateway.md)
- [Alta disponibilidade - ELB, Auto Scaling e Route 53](2%20-%20Resiliencia%20%2826%25%29/Alta%20disponibilidade%20-%20ELB%2C%20Auto%20Scaling%20e%20Route%2053.md)
- [Bancos resilientes - RDS, Aurora e read replicas](2%20-%20Resiliencia%20%2826%25%29/Bancos%20resilientes%20-%20RDS%2C%20Aurora%20e%20read%20replicas.md)
- [Containers e serverless - ECS, EKS, Fargate, Lambda e Step Functions](2%20-%20Resiliencia%20%2826%25%29/Containers%20e%20serverless%20-%20ECS%2C%20EKS%2C%20Fargate%2C%20Lambda%20e%20Step%20Functions.md)
- [Desacoplamento - SQS, SNS e EventBridge](2%20-%20Resiliencia%20%2826%25%29/Desacoplamento%20-%20SQS%2C%20SNS%20e%20EventBridge.md)
- [Disaster Recovery (RTO e RPO)](2%20-%20Resiliencia%20%2826%25%29/Disaster%20Recovery%20%28RTO%20e%20RPO%29.md)

### Domínio 3 — Performance (24%)

- [03 - Dominio 3 - Design High-Performing Architectures (24%)](3%20-%20Performance%20%2824%25%29/03%20-%20Dominio%203%20-%20Design%20High-Performing%20Architectures%20%2824%25%29.md)
- [Armazenamento - S3, EBS, EFS e FSx](3%20-%20Performance%20%2824%25%29/Armazenamento%20-%20S3%2C%20EBS%2C%20EFS%20e%20FSx.md)
- [Bancos de alta performance - DynamoDB, DAX, ElastiCache e Redshift](3%20-%20Performance%20%2824%25%29/Bancos%20de%20alta%20performance%20-%20DynamoDB%2C%20DAX%2C%20ElastiCache%20e%20Redshift.md)
- [Computacao elastica - EC2 e placement groups](3%20-%20Performance%20%2824%25%29/Computacao%20elastica%20-%20EC2%20e%20placement%20groups.md)
- [Ingestao e transformacao - Kinesis, Glue, Athena e EMR](3%20-%20Performance%20%2824%25%29/Ingestao%20e%20transformacao%20-%20Kinesis%2C%20Glue%2C%20Athena%20e%20EMR.md)
- [Rede e borda - CloudFront, Global Accelerator e conectividade hibrida](3%20-%20Performance%20%2824%25%29/Rede%20e%20borda%20-%20CloudFront%2C%20Global%20Accelerator%20e%20conectividade%20hibrida.md)

### Domínio 4 — Custo (20%)

- [04 - Dominio 4 - Design Cost-Optimized Architectures (20%)](4%20-%20Custo%20%2820%25%29/04%20-%20Dominio%204%20-%20Design%20Cost-Optimized%20Architectures%20%2820%25%29.md)
- [Custo de armazenamento - classes do S3 e lifecycle](4%20-%20Custo%20%2820%25%29/Custo%20de%20armazenamento%20-%20classes%20do%20S3%20e%20lifecycle.md)
- [Custo de banco de dados](4%20-%20Custo%20%2820%25%29/Custo%20de%20banco%20de%20dados.md)
- [Custo de computacao - Spot, RI e Savings Plans](4%20-%20Custo%20%2820%25%29/Custo%20de%20computacao%20-%20Spot%2C%20RI%20e%20Savings%20Plans.md)
- [Custo de rede e transferencia de dados](4%20-%20Custo%20%2820%25%29/Custo%20de%20rede%20e%20transferencia%20de%20dados.md)
- [Ferramentas de custo - Cost Explorer, Budgets e CUR](4%20-%20Custo%20%2820%25%29/Ferramentas%20de%20custo%20-%20Cost%20Explorer%2C%20Budgets%20e%20CUR.md)

### Fundamentos e apoio

- [Migracao e hibrido - 7 Rs, Snow, DataSync, Storage Gateway e DMS](9%20-%20Fundamentos%20e%20apoio/Migracao%20e%20hibrido%20-%207%20Rs%2C%20Snow%2C%20DataSync%2C%20Storage%20Gateway%20e%20DMS.md)
- [Observabilidade - CloudWatch, CloudTrail e Config](9%20-%20Fundamentos%20e%20apoio/Observabilidade%20-%20CloudWatch%2C%20CloudTrail%20e%20Config.md)
- [Well-Architected e responsabilidade compartilhada](9%20-%20Fundamentos%20e%20apoio/Well-Architected%20e%20responsabilidade%20compartilhada.md)

## Fontes oficiais

- [Exam guide SAA-C03](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html)
- [Serviços em escopo](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/saa-03-in-scope-services.html)
- [Serviços fora de escopo](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/saa-03-out-of-scope-services.html)
- [Revisões do guia](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/saa-03-revisions.html)

> A AWS avisa no guia: *"Exam guide updates will be published approximately one month before updates will be reflected on your exam."* Vale reconferir o guia um mês antes da sua data.
