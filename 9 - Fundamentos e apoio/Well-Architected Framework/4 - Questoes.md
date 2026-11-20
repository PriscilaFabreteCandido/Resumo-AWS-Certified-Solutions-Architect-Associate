---
tags: [saa-c03, well-architected, questoes]
conceito: AWS Well-Architected Framework
atualizado: 2026-11-08
---

# Well-Architected — Questões

> [!question] Q1. Quantos pilares tem o framework, e quais?
> **A)** 5: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization
> **B)** 6: os cinco acima + Sustainability
> **C)** 4, correspondendo aos domínios da prova
> **D)** 7
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"operational excellence, security, reliability, performance efficiency, cost optimization, and sustainability"* (excelência operacional, segurança, confiabilidade, eficiência de performance, otimização de custo e sustentabilidade). Material antigo lista cinco.

> [!question] Q2. Uma aplicação precisa armazenar métricas de sensores, consultadas por janela de tempo.
> **A)** RDS PostgreSQL com índice no timestamp
> **B)** Amazon Timestream
> **C)** DynamoDB com sort key de timestamp
> **D)** S3 com Athena
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é o princípio *"Using purpose-built AWS services for workloads"* (usar serviços da AWS feitos sob medida para cada carga de trabalho), citado **duas vezes** no guia. O guia também pede, em Task 4.3, *"cost-effective AWS database types (for example, time series format...)"* (tipos de banco da AWS mais econômicos (por exemplo, formato de série temporal...)).
> > **A errada**: relacional genérico adaptado — funciona, custa mais e escala pior.

> [!question] Q3. O enunciado diz *"com o menor esforço operacional"*. Qual pilar está em jogo, e o que isso elimina?
> **A)** Cost Optimization; elimina serviços caros
> **B)** Operational Excellence; elimina script manual, cron em EC2 e "atualizar no lugar"
> **C)** Reliability; elimina Single-AZ
> **D)** Security; elimina acesso público
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: a hierarquia é **serverless gerenciado > gerenciado com instância > você gerencia a instância**.

> [!question] Q4. Duas alternativas atendem o RPO e o RTO: pilot light e multi-site active/active. O enunciado diz *"a mais econômica que atende"*.
> **A)** Multi-site active/active, por ser mais robusta
> **B)** Pilot light
> **C)** Backup and restore
> **D)** Warm standby
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: quando os pilares conflitam, o **qualificador do enunciado** decide. "A mais econômica que atende" é Cost Optimization vencendo — e o active/active é *"the most complex and costly approach"* (a abordagem mais complexa e mais cara).
> > **C errada**: o enunciado diz que pilot light **atende**; backup and restore pode não atender.

> [!question] Q5. Qual ferramenta conduz a revisão Well-Architected?
> **A)** Trusted Advisor
> **B)** AWS Well-Architected Tool
> **C)** AWS Config
> **D)** Security Hub
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é o serviço específico, na lista oficial em escopo.
> > **A errada**: Trusted Advisor dá checagens prontas nos 5 pilares de **custo, performance, segurança, tolerância a falha e limites** — útil, mas não é a revisão do framework.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| São 5 pilares | **Seis** (Sustainability desde 2021) |
| Os pilares nunca conflitam | Conflitam sempre — o **qualificador do enunciado** decide |
| "Highly available" sempre vence | Se o enunciado diz *"menor custo"*, Cost Optimization vence |
| Trusted Advisor faz a revisão Well-Architected | A ferramenta é a **Well-Architected Tool** |
| Sustainability é só marketing | Tem área própria de **Region selection** e reforça rightsizing |
| Serviço genérico adaptado é aceitável | *"Using purpose-built AWS services"* (usar serviços da AWS feitos sob medida) é citado **duas vezes** no guia |

## Links

- [[9 - Fundamentos e apoio/Well-Architected Framework/1 - O que e|1 - O que e]] · [[9 - Fundamentos e apoio/Well-Architected Framework/2 - Decorar|2 - Decorar]] · [[9 - Fundamentos e apoio/Well-Architected Framework/3 - Detalhes|3 - Detalhes]]
