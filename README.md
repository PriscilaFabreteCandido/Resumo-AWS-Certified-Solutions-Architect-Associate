# Resumo — AWS Certified Solutions Architect – Associate (SAA-C03)

Resumo de estudo para a prova **AWS Certified Solutions Architect – Associate**, com **uma pasta por serviço e por conceito**, agrupadas pelo domínio da prova em que cada uma mais pesa.

> Conteúdo conferido contra **`docs.aws.amazon.com`** em **08/11/2026**, a partir do **exam guide SAA-C03, versão 1.1 (29/10/2026)**.
> Onde a documentação oficial não afirma um número, a nota diz isso em vez de repetir valores de terceiros.

## Estrutura

Cada serviço é uma pasta com **quatro notas**:

| Nota | Para quê |
|---|---|
| **1 - O que e** | O serviço em uma frase, para que serve, e onde cai na prova |
| **2 - Decorar** | Só número e tabela. É a nota da véspera |
| **3 - Detalhes** | A explicação longa, com as citações oficiais |
| **4 - Questoes** | Questões A–D com **o porquê de cada alternativa errada**, e a tabela de armadilhas |

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
- [README](README.md)

## Progresso

| Domínio | Pastas preenchidas |
|---|---|
| 1 - Seguranca (30%) | **29 / 29** |
| 2 - Resiliencia (26%) | **2 / 21** |
| 3 - Performance (24%) | **2 / 29** |
| 4 - Custo (20%) | **0 / 5** |
| 9 - Fundamentos e apoio | **0 / 7** |
| **Total** | **33 / 91** |

## Índice por domínio

### Domínio 1 — Segurança (30%)

- [01 - Dominio 1 - Design Secure Architectures (30%)](1%20-%20Seguranca%20%2830%25%29/01%20-%20Dominio%201%20-%20Design%20Secure%20Architectures%20%2830%25%29.md) — visão do domínio, task statements oficiais e índice

- [ACM (Certificate Manager)](1%20-%20Seguranca%20%2830%25%29/ACM%20%28Certificate%20Manager%29/1%20-%20O%20que%20e.md)
- [AWS Backup](1%20-%20Seguranca%20%2830%25%29/AWS%20Backup/1%20-%20O%20que%20e.md)
- [AWS RAM](1%20-%20Seguranca%20%2830%25%29/AWS%20RAM/1%20-%20O%20que%20e.md)
- [CloudHSM](1%20-%20Seguranca%20%2830%25%29/CloudHSM/1%20-%20O%20que%20e.md)
- [CloudTrail](1%20-%20Seguranca%20%2830%25%29/CloudTrail/1%20-%20O%20que%20e.md)
- [Cognito](1%20-%20Seguranca%20%2830%25%29/Cognito/1%20-%20O%20que%20e.md)
- [Config](1%20-%20Seguranca%20%2830%25%29/Config/1%20-%20O%20que%20e.md)
- [Detective](1%20-%20Seguranca%20%2830%25%29/Detective/1%20-%20O%20que%20e.md)
- [Directory Service](1%20-%20Seguranca%20%2830%25%29/Directory%20Service/1%20-%20O%20que%20e.md)
- [Firewall Manager](1%20-%20Seguranca%20%2830%25%29/Firewall%20Manager/1%20-%20O%20que%20e.md)
- [Governanca (Artifact, Trusted Advisor, Service Catalog)](1%20-%20Seguranca%20%2830%25%29/Governanca%20%28Artifact%2C%20Trusted%20Advisor%2C%20Service%20Catalog%29/1%20-%20O%20que%20e.md)
- [GuardDuty](1%20-%20Seguranca%20%2830%25%29/GuardDuty/1%20-%20O%20que%20e.md)
- [IAM](1%20-%20Seguranca%20%2830%25%29/IAM/1%20-%20O%20que%20e.md)
- [IAM Identity Center](1%20-%20Seguranca%20%2830%25%29/IAM%20Identity%20Center/1%20-%20O%20que%20e.md)
- [Inspector](1%20-%20Seguranca%20%2830%25%29/Inspector/1%20-%20O%20que%20e.md)
- [KMS](1%20-%20Seguranca%20%2830%25%29/KMS/1%20-%20O%20que%20e.md)
- [Macie](1%20-%20Seguranca%20%2830%25%29/Macie/1%20-%20O%20que%20e.md)
- [NACL (Network ACL)](1%20-%20Seguranca%20%2830%25%29/NACL%20%28Network%20ACL%29/1%20-%20O%20que%20e.md)
- [NAT Gateway](1%20-%20Seguranca%20%2830%25%29/NAT%20Gateway/1%20-%20O%20que%20e.md)
- [Organizations e Control Tower](1%20-%20Seguranca%20%2830%25%29/Organizations%20e%20Control%20Tower/1%20-%20O%20que%20e.md)
- [STS](1%20-%20Seguranca%20%2830%25%29/STS/1%20-%20O%20que%20e.md)
- [Secrets Manager](1%20-%20Seguranca%20%2830%25%29/Secrets%20Manager/1%20-%20O%20que%20e.md)
- [Security Groups](1%20-%20Seguranca%20%2830%25%29/Security%20Groups/1%20-%20O%20que%20e.md)
- [Security Hub](1%20-%20Seguranca%20%2830%25%29/Security%20Hub/1%20-%20O%20que%20e.md)
- [Shield](1%20-%20Seguranca%20%2830%25%29/Shield/1%20-%20O%20que%20e.md)
- [Systems Manager (e Parameter Store)](1%20-%20Seguranca%20%2830%25%29/Systems%20Manager%20%28e%20Parameter%20Store%29/1%20-%20O%20que%20e.md)
- [VPC](1%20-%20Seguranca%20%2830%25%29/VPC/1%20-%20O%20que%20e.md)
- [VPC Endpoints e PrivateLink](1%20-%20Seguranca%20%2830%25%29/VPC%20Endpoints%20e%20PrivateLink/1%20-%20O%20que%20e.md)
- [WAF](1%20-%20Seguranca%20%2830%25%29/WAF/1%20-%20O%20que%20e.md)

### Domínio 2 — Resiliência (26%)

- [02 - Dominio 2 - Design Resilient Architectures (26%)](2%20-%20Resiliencia%20%2826%25%29/02%20-%20Dominio%202%20-%20Design%20Resilient%20Architectures%20%2826%25%29.md) — visão do domínio, task statements oficiais e índice

- API Gateway  *(a escrever)*
- AWS Batch  *(a escrever)*
- Aurora  *(a escrever)*
- Auto Scaling (EC2)  *(a escrever)*
- CloudFormation  *(a escrever)*
- CloudWatch  *(a escrever)*
- ECS  *(a escrever)*
- EKS  *(a escrever)*
- ELB (Load Balancers)  *(a escrever)*
- Elastic Beanstalk  *(a escrever)*
- EventBridge  *(a escrever)*
- Fargate  *(a escrever)*
- Lambda  *(a escrever)*
- Mensageria gerenciada (Amazon MQ e MSK)  *(a escrever)*
- RDS  *(a escrever)*
- RDS Proxy  *(a escrever)*
- Route 53  *(a escrever)*
- [SNS](2%20-%20Resiliencia%20%2826%25%29/SNS/1%20-%20O%20que%20e.md)
- [SQS](2%20-%20Resiliencia%20%2826%25%29/SQS/1%20-%20O%20que%20e.md)
- Step Functions  *(a escrever)*
- X-Ray  *(a escrever)*

### Domínio 3 — Performance (24%)

- [03 - Dominio 3 - Design High-Performing Architectures (24%)](3%20-%20Performance%20%2824%25%29/03%20-%20Dominio%203%20-%20Design%20High-Performing%20Architectures%20%2824%25%29.md) — visão do domínio, task statements oficiais e índice

- Athena  *(a escrever)*
- Bancos especializados (Neptune, DocumentDB, Keyspaces, Timestream)  *(a escrever)*
- CloudFront  *(a escrever)*
- DAX  *(a escrever)*
- DataSync  *(a escrever)*
- Direct Connect  *(a escrever)*
- DynamoDB  *(a escrever)*
- EBS  *(a escrever)*
- [EC2](3%20-%20Performance%20%2824%25%29/EC2/1%20-%20O%20que%20e.md)
- EFS  *(a escrever)*
- EMR  *(a escrever)*
- ElastiCache  *(a escrever)*
- FSx  *(a escrever)*
- Global Accelerator  *(a escrever)*
- Glue  *(a escrever)*
- Kinesis Data Firehose  *(a escrever)*
- Kinesis Data Streams  *(a escrever)*
- Lake Formation  *(a escrever)*
- OpenSearch Service  *(a escrever)*
- Outposts  *(a escrever)*
- Placement Groups  *(a escrever)*
- Redshift  *(a escrever)*
- [S3](3%20-%20Performance%20%2824%25%29/S3/1%20-%20O%20que%20e.md)
- S3 Glacier  *(a escrever)*
- Storage Gateway  *(a escrever)*
- Transfer Family  *(a escrever)*
- Transit Gateway  *(a escrever)*
- VPC Peering  *(a escrever)*
- VPN (Site-to-Site)  *(a escrever)*

### Domínio 4 — Custo (20%)

- [04 - Dominio 4 - Design Cost-Optimized Architectures (20%)](4%20-%20Custo%20%2820%25%29/04%20-%20Dominio%204%20-%20Design%20Cost-Optimized%20Architectures%20%2820%25%29.md) — visão do domínio, task statements oficiais e índice

- Compute Optimizer  *(a escrever)*
- DMS (Database Migration Service)  *(a escrever)*
- Ferramentas de custo (Cost Explorer, Budgets, CUR)  *(a escrever)*
- Opcoes de compra do EC2 (Spot, RI, Savings Plans)  *(a escrever)*
- Snow Family  *(a escrever)*

### Fundamentos e apoio

- [09 - Fundamentos e apoio](9%20-%20Fundamentos%20e%20apoio/09%20-%20Fundamentos%20e%20apoio.md) — visão do domínio, task statements oficiais e índice

- Criptografia em repouso e em transito  *(a escrever)*
- Disaster Recovery (RPO e RTO)  *(a escrever)*
- Estrategias de migracao (7 Rs)  *(a escrever)*
- Regioes, AZs e infraestrutura global  *(a escrever)*
- Responsabilidade compartilhada  *(a escrever)*
- Tipos de armazenamento (objeto, arquivo, bloco)  *(a escrever)*
- Well-Architected Framework  *(a escrever)*

## Fontes oficiais

- [Exam guide SAA-C03](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html)
- [Serviços em escopo](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/saa-03-in-scope-services.html)
- [Serviços fora de escopo](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/saa-03-out-of-scope-services.html)
