---
tags: [saa-c03, cloudhsm, criptografia]
servico: AWS CloudHSM
tipo: HSM dedicado
dominios: [1]
atualizado: 2026-11-08
---

# AWS CloudHSM — O que é

> [!info] Em uma frase
> **HSM (hardware security module) single-tenant** na nuvem, validado **FIPS 140-2/140-3 nível 3**, onde **você** gerencia os usuários e as chaves — e a AWS **não** tem acesso ao material criptográfico.

## O que é, em palavras simples

É o cofre físico dedicado. A doc: *"AWS CloudHSM combines the benefits of the AWS cloud with the security of hardware security modules (HSMs)"*, dando *"complete control over high availability HSMs that are in the AWS Cloud"*.

A diferença essencial em relação ao KMS está numa frase: *"Because your data plane is end-to-end (E2E) encrypted and not visible to AWS, you control your own user management (outside of IAM roles). The trade off for this control is you have more responsibility than if you used a managed AWS service."*

## Os três gatilhos de prova

Só três frases no enunciado puxam CloudHSM. Fora delas, a resposta é **KMS**:

1. **"FIPS 140-2 / 140-3 level 3"**
2. **"single-tenant HSM"** / "HSM dedicado"
3. **"a AWS não pode ter acesso nenhum ao material da chave"**

Um quarto gatilho: a aplicação usa **PKCS #11, JCE, CNG ou KSP** — a doc diz que essas cargas *"can migrate to AWS CloudHSM with fewer changes"*.

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[KMS]] · [[Criptografia em repouso e em transito]]
- [Introdução ao CloudHSM](https://docs.aws.amazon.com/cloudhsm/latest/userguide/introduction.html)
