---
tags: [saa-c03, cloudhsm, decorar]
servico: AWS CloudHSM
atualizado: 2026-11-08
---

# CloudHSM — Decorar

## KMS × CloudHSM (a tabela que decide a questão)

| | **AWS KMS** | **AWS CloudHSM** |
|---|---|---|
| Tenancy | Multi-tenant gerenciado | *"general purpose, single tenant"* |
| FIPS | — | **140-2 ou 140-3 nível 3** (em FIPS mode) |
| Gestão de usuários | **IAM** | **Você**, fora do IAM |
| AWS vê o material? | Não vê, mas gerencia o serviço | *"E2E encryption is not visible to AWS"* |
| Integração nativa com serviços AWS | **Sim**, quase todos | Via **custom key store** da KMS, ou direto na app |
| Interfaces | API da AWS | **PKCS #11, JCE, CNG, KSP** |
| Esforço operacional | Baixo | *"you have more responsibility"* |

## Fatos para decorar

| Item | Detalhe |
|---|---|
| Modos de cluster | **FIPS mode** (só algoritmos validados FIPS) e **non-FIPS mode** (todos os suportados) |
| Alta disponibilidade | Cluster de HSMs; você distribui entre AZs |
| O que você faz | *"generate, store, import, export, manage, and use cryptographic keys"* |
| Integração com KMS | **Custom key store** — a KMS usa o seu cluster CloudHSM como backing |
| Alternativa para pagamentos | **AWS Payment Cryptography** |

## A citação que resolve o empate

Da própria doc do CloudHSM:

> *"If you want a managed service for creating and controlling your encryption keys but you don't want or need to operate your own HSMs, consider using AWS Key Management Service."*

Tradução para a prova: **sem gatilho explícito de HSM dedicado/FIPS nível 3, escolha KMS.**

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
