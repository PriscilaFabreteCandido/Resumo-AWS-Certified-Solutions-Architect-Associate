---
tags: [saa-c03, macie, questoes]
servico: Amazon Macie
atualizado: 2026-11-08
---

# Macie — Questões

> [!question]- Q1. Identificar, em 500 buckets S3, quais contêm dados pessoais de clientes, para classificação de compliance.
> **A)** GuardDuty
> **B)** **Amazon Macie** ✅
> **C)** AWS Config com regra customizada
> **D)** Amazon Inspector
>
> **Por que B**: classificação de dado sensível no S3 é a razão de existir do Macie.
> **A errada**: GuardDuty detecta **atividade** maliciosa.
> **C errada**: Config avalia **configuração** do bucket (está público? tem versionamento?), não o **conteúdo** dos objetos.
> **D errada**: Inspector é vulnerabilidade de software.

> [!question]- Q2. O Macie pode varrer um banco RDS em busca de CPFs?
> **A)** Sim, habilitando o plano de RDS
> **B)** **Não: o Macie cobre buckets S3** ✅
> **C)** Sim, via AWS Config
> **D)** Sim, exportando para o S3 primeiro
>
> **Por que B**: o escopo do Macie é S3.
> **D errada**: tecnicamente, se você exportar o dado para o S3 o Macie o lê — mas isso não é "o Macie varrer o RDS", e a questão testa o escopo.

> [!question]- Q3. Ao achar PII em um bucket público, a empresa quer bloquear o acesso automaticamente.
> **A)** Macie bloqueia sozinho
> **B)** **Achado do Macie → EventBridge → Lambda que aplica Block Public Access e notifica por SNS** ✅
> **C)** AWS Config com remediação
> **D)** SCP negando `s3:PutBucketPolicy`
>
> **Por que B**: é o padrão de resposta automatizada; o Macie **detecta e publica o achado**, a ação é sua.
> **A errada**: Macie *"enables automated protection"* — habilita, via integração, não executa por conta própria.
> **C errada**: Config detectaria o bucket público, mas não o **PII** — o enunciado condiciona a ação ao dado sensível.
> **D errada**: previne mudanças futuras, não corrige o bucket atual.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Macie olha qualquer storage | **Só buckets S3** |
| Macie detecta ameaça | Ameaça é **GuardDuty** |
| Macie acha CVE | CVE é **Inspector** |
| AWS Config faz o que o Macie faz | Config olha **configuração**; Macie olha **conteúdo** |
| Macie bloqueia o bucket automaticamente | Ele gera o achado; a ação vem por EventBridge + Lambda |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
