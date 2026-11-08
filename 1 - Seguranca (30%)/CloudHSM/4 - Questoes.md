---
tags: [saa-c03, cloudhsm, questoes]
servico: AWS CloudHSM
atualizado: 2026-11-08
---

# CloudHSM — Questões

> [!question]- Q1. Requisito: HSM dedicado, FIPS 140-3 nível 3, e a AWS não pode acessar o material da chave.
> **A)** KMS com customer managed key e rotação anual
> **B)** **AWS CloudHSM** ✅
> **C)** KMS com multi-Region key
> **D)** Secrets Manager com chave própria
>
> **Por que B**: os três gatilhos juntos. *"single tenant"*, FIPS nível 3, *"E2E encryption is not visible to AWS"*.
> **A e C erradas**: KMS é multi-tenant e gerenciado pela AWS.
> **D errada**: Secrets Manager guarda secret, não é cofre de chave em HSM.

> [!question]- Q2. A empresa precisa de HSM dedicado **e** que o S3 continue usando SSE-KMS normalmente. Como?
> **A)** Só CloudHSM, com criptografia client-side
> **B)** **KMS com custom key store apoiado num cluster CloudHSM** ✅
> **C)** KMS com customer managed key
> **D)** Dois sistemas em paralelo
>
> **Por que B**: custom key store põe a chave no seu HSM e mantém a API da KMS para os serviços.
> **A errada**: funciona, mas obriga a aplicação a criptografar tudo e abandona o SSE-KMS.
> **C errada**: não atende "HSM dedicado".
> ⚠️ Chave em custom key store **não** suporta rotação automática.

> [!question]- Q3. Uma aplicação Java usa JCE para falar com um HSM on-premises e será migrada para a AWS com mínima alteração de código.
> **A)** Reescrever para a API do KMS
> **B)** **AWS CloudHSM, que expõe PKCS #11, JCE, CNG e KSP** ✅
> **C)** Secrets Manager
> **D)** KMS com envelope encryption
>
> **Por que B**: a doc diz que cargas com essas interfaces *"can migrate to AWS CloudHSM with fewer changes"*.
> **A e D erradas**: exigem reescrever a camada de criptografia.

> [!question]- Q4. Sem requisito de HSM dedicado nem FIPS, qual serviço a AWS recomenda para criar e controlar chaves?
> **A)** CloudHSM em non-FIPS mode
> **B)** **AWS KMS** ✅
> **C)** Parameter Store com SecureString
> **D)** CloudHSM com custom key store
>
> **Por que B**: citação direta — *"If you want a managed service for creating and controlling your encryption keys but you don't want or need to operate your own HSMs, consider using AWS Key Management Service."*

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| CloudHSM é "KMS mais caro" | **Single-tenant**, FIPS nível 3, você gerencia os usuários |
| A AWS recupera minhas chaves se eu perder o acesso | **Não.** O material não é visível para ela |
| CloudHSM integra nativamente com S3/EBS/RDS | Via **custom key store** da KMS, ou na própria aplicação |
| CloudHSM é sempre FIPS nível 3 | Só **em FIPS mode** |
| CloudHSM substitui o Secrets Manager | São coisas diferentes: chave criptográfica × secret de aplicação |
| Chave em custom key store rotaciona automaticamente | **Não** — só manual |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
