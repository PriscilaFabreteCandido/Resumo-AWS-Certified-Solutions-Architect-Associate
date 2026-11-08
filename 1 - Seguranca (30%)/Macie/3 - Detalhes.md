---
tags: [saa-c03, macie, detalhes]
servico: Amazon Macie
atualizado: 2026-11-08
---

# Macie — Detalhes

## 1. Por que o Macie existe

As outras ferramentas respondem perguntas de **configuração** e **comportamento**. Nenhuma responde a pergunta que a LGPD e a GDPR fazem: **que dado pessoal nós temos, e onde?**

Em um data lake com milhões de objetos, essa pergunta não tem resposta manual. O Macie inspeciona o conteúdo e classifica.

## 2. As duas camadas

**Camada 1 — postura dos buckets (contínua, barata).** O Macie mantém um inventário de todos os buckets da conta e avalia: está público? criptografado? compartilhado com outra conta? com acesso anônimo? Isso roda sempre, sem olhar objeto.

**Camada 2 — descoberta de dado sensível (job, cobrada por volume).** Você cria *sensitive data discovery jobs* que inspecionam o conteúdo. Pode ser one-time ou agendado, e você escolhe escopo (buckets, prefixos, tipos de arquivo, tamanho).

A consequência de prova: Macie dá visibilidade **imediata** de risco de bucket, e visibilidade de **conteúdo** sob demanda.

## 3. Resposta automatizada

Achados do Macie vão para **EventBridge** e para o **Security Hub**. O padrão de arquitetura que a prova usa:

```
Macie acha PII em bucket público
      ↓ (achado)
EventBridge rule
      ↓
Lambda  →  aplica Block Public Access / move o objeto / notifica via SNS
```

Isso é a *"automated protection against those risks"* da definição oficial.

## 4. Multi-conta

Como GuardDuty e Security Hub, o Macie tem modelo **administrador/membro** via AWS Organizations — uma conta vê os achados de todas.

## 5. O que o Macie NÃO faz

| Pergunta | Serviço correto |
|---|---|
| Esse bucket está público? | Macie avalia, mas quem **impede** é **Block Public Access** (e quem detecta configuração em geral é **AWS Config**) |
| Tem dado sensível no meu RDS? | Macie **não** olha RDS. Não há equivalente direto; use classificação na aplicação |
| Alguém acessou esse objeto de forma anômala? | **GuardDuty** (S3 Protection) |
| Esse bucket cumpre o CIS? | **Security Hub** |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[S3]] · [[GuardDuty]] · [[Security Hub]] · [[Config]]
