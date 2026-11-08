---
tags: [saa-c03, governanca, questoes]
servico: Artifact, Trusted Advisor e Service Catalog
atualizado: 2026-11-08
---

# Governança — Questões

> [!question]- Q1. O auditor pediu o relatório **SOC 2 da AWS**. Onde obter?
> **A)** Security Hub
> **B)** AWS Config
> **C)** **AWS Artifact** ✅
> **D)** AWS Audit Manager
>
> **Por que C**: Artifact é o portal dos relatórios de compliance **da AWS**.
> **A e B erradas**: medem a **sua** postura e configuração.
> **D errada**: Audit Manager coleta evidência do **seu** ambiente contra frameworks.

> [!question]- Q2. Times devem poder subir ambientes de teste sozinhos, mas só com tipos de instância aprovados e sem receber `ec2:*`.
> **A)** SCP limitando tipos de instância
> **B)** **AWS Service Catalog, com products, constraints e launch role** ✅
> **C)** CloudFormation com templates no S3
> **D)** IAM policy com condição em `ec2:InstanceType`
>
> **Por que B**: o usuário ganha permissão de **lançar o produto**; os recursos são criados pela **launch role**. Constraints limitam os parâmetros.
> **A errada**: é guardrail, mas não oferece self-service nem padroniza a arquitetura.
> **C errada**: padroniza, mas o usuário ainda precisaria de permissão para criar os recursos.
> **D errada**: ainda concede permissão direta de EC2 ao usuário.

> [!question]- Q3. A empresa quer recomendações prontas de custo, segurança e tolerância a falha, sem construir nada.
> **A)** **AWS Trusted Advisor** ✅
> **B)** AWS Config
> **C)** Compute Optimizer
> **D)** Cost Explorer
>
> **Por que A**: checagens prontas nos cinco pilares.
> **B errada**: Config avalia regras que **você** define (ou conformance packs).
> **C errada**: Compute Optimizer é **só rightsizing**, baseado em utilização.
> **D errada**: Cost Explorer mostra e prevê gasto.

> [!question]- Q4. Como ser notificado de manutenção programada que afeta instâncias específicas da sua conta?
> **A)** CloudWatch alarme
> **B)** **AWS Health Dashboard (Your account health), com EventBridge para automação** ✅
> **C)** Trusted Advisor
> **D)** AWS Config
>
> **Por que B**: a visão "Your account health" mostra eventos que afetam **os seus** recursos, e gera eventos no EventBridge.

> [!question]- Q5. Compartilhar um portfólio do Service Catalog com outras 10 contas da organização.
> **A)** Copiar os templates para cada conta
> **B)** **Compartilhar o portfólio via AWS RAM** ✅
> **C)** SCP permitindo acesso
> **D)** Bucket S3 com os templates
>
> **Por que B**: portfólios do Service Catalog estão entre os recursos compartilháveis pelo RAM.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Artifact mostra a conformidade da minha conta | Mostra a conformidade **da AWS** |
| Trusted Advisor corrige os problemas | Só **recomenda** |
| Trusted Advisor é completo em qualquer plano | Checagens completas exigem **Business** ou **Enterprise** |
| Compute Optimizer e Trusted Advisor são a mesma coisa | Compute Optimizer é **só rightsizing** por utilização |
| Service Catalog exige dar permissão ampla ao usuário | A **launch role** cria os recursos; o usuário só lança |
| Health Dashboard é igual ao Service Health | "Your account health" mostra o que afeta **seus** recursos |
| Service Quotas e Trusted Advisor são a mesma coisa | Trusted Advisor **avisa**; **Service Quotas** é onde se pede aumento |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
