---
tags: [saa-c03, responsabilidade-compartilhada, questoes]
conceito: Modelo de responsabilidade compartilhada
atualizado: 2026-11-08
---

# Responsabilidade compartilhada — Questões

> [!question] Q1. Quem é responsável por aplicar patches de segurança no **sistema operacional** de uma instância EC2?
> **A)** AWS
> **B)** O cliente
> **C)** Compartilhado igualmente
> **D)** AWS, se a instância usar uma AMI da AWS
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: EC2 é IaaS — a AWS cuida da infraestrutura **da** nuvem (hipervisor, hardware, rede física); o SO convidado é do cliente.
> > **D errada**: a AMI ser da AWS não transfere a responsabilidade **contínua**. A AWS oferece a **ferramenta** (**SSM Patch Manager**), não o serviço de patch.

> [!question] Q2. E no **RDS**, quem patcheia o engine do banco?
> **A)** O cliente
> **B)** A AWS
> **C)** Compartilhado
> **D)** Depende do engine
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: no RDS a AWS gerencia o SO subjacente e o engine. Ao cliente cabem **usuários, schema, parameter group, criptografia e os dados**.
> > ⚠️ É a demonstração de que a fronteira **se move com o serviço**.

> [!question] Q3. O auditor pediu o relatório **SOC 2 da AWS**. Onde obter?
> **A)** AWS Config
> **B)** Security Hub
> **C)** AWS Artifact
> **D)** AWS Audit Manager
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: Artifact entrega a conformidade **da AWS** — o lado dela no modelo.
> > **A e B erradas**: medem a conformidade e a postura **dos seus** recursos.

> [!question] Q4. Um bucket S3 foi exposto publicamente e houve vazamento. De quem é a responsabilidade?
> **A)** Da AWS, por não impedir
> **B)** Do cliente: a configuração de acesso é responsabilidade dele
> **C)** Compartilhada
> **D)** Da AWS, se o bucket usava SSE-S3
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: configuração é sempre do cliente. A AWS oferece **Block Public Access** (recomendando *"turn on all four settings"* (ative as quatro configurações)), **Config**, **Macie** e **Security Hub** — mas a decisão é sua.

> [!question] Q5. Qual destas tarefas é **sempre** do cliente, em qualquer serviço?
> **A)** Patch do SO
> **B)** Gerenciar IAM e a configuração do serviço
> **C)** Descarte seguro de mídia
> **D)** Patch do hipervisor
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: mesmo em S3, Lambda e DynamoDB, **IAM, dados e configuração** são do cliente.
> > **A errada**: é do cliente **só** em EC2 (e similares).

> [!question] Q6. O time quer reduzir ao máximo a responsabilidade operacional de um banco relacional.
> **A)** MySQL em EC2 com scripts de backup
> **B)** RDS MySQL
> **C)** Aurora Serverless v2
> **D)** DynamoDB
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: dentro de "banco relacional", é o que empurra mais a fronteira para a AWS (sem instância para dimensionar, cobrado por segundo).
> > **D errada**: reduziria ainda mais a responsabilidade, mas **não é relacional** — mudaria o modelo de dados.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| A AWS cuida da segurança, ponto | A AWS cuida **da** nuvem; você cuida **na** nuvem |
| A fronteira é fixa | **Move com o serviço**: EC2 ≠ RDS ≠ Lambda |
| AMI da AWS significa patch pela AWS | A responsabilidade contínua é **sua** |
| AWS Artifact mostra a conformidade da minha conta | Mostra a **da AWS** |
| Em serverless nada é meu | **Dados, IAM e configuração** continuam seus |
| A AWS impede bucket público | Oferece **Block Public Access**; a decisão é sua |
| A frase "security OF/IN the cloud" é citação da doc | É a formulação consagrada, mas **não aparece** nas páginas que conferi |

## Links

- [[9 - Fundamentos e apoio/Responsabilidade compartilhada/1 - O que e|1 - O que e]] · [[9 - Fundamentos e apoio/Responsabilidade compartilhada/2 - Decorar|2 - Decorar]] · [[9 - Fundamentos e apoio/Responsabilidade compartilhada/3 - Detalhes|3 - Detalhes]]
