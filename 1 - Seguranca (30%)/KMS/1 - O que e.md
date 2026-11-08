---
tags: [saa-c03, kms, criptografia, seguranca]
servico: AWS KMS
tipo: Gerenciamento de chaves
dominios: [1]
atualizado: 2026-11-08
---

# AWS KMS — O que é

> [!info] Em uma frase
> Serviço gerenciado de **chaves de criptografia**, integrado com praticamente todos os serviços da AWS. Ele guarda a chave, controla quem usa e registra cada uso no CloudTrail — mas **criptografa no máximo 4.096 bytes** por chamada.

## O que é, em palavras simples

A KMS não criptografa seus arquivos. Ela guarda a **chave que criptografa chaves**. A doc chama isso de *wrapping key*: *"KMS keys are most often used as wrapping keys, also known as key-encryption keys. Instead of encrypting data, wrapping keys encrypt the data keys that encrypt your data."*

Esse padrão tem nome: **envelope encryption**.

1. Você pede uma data key: `GenerateDataKey`
2. A KMS devolve **duas versões** — uma em texto claro e uma criptografada
3. Você criptografa o arquivo com a versão em texto claro, descarta-a da memória, e guarda a versão criptografada ao lado do arquivo
4. Para ler, manda a versão criptografada de volta para a KMS decriptar

## Os três tipos de chave

| Tipo | Quem controla | Custo | Rotação |
|---|---|---|---|
| **Customer managed** | **Você** (key policy, IAM, grants) | Tarifa mensal + por uso | **Opcional** |
| **AWS managed** (`aws/<serviço>`) | O serviço (você só visualiza) | **Sem tarifa mensal** | **Obrigatória, anual** |
| **AWS owned** | Só o serviço AWS | **Sem custo** | Definida pelo serviço |

> [!tip] Quando a resposta é **customer managed**
> Quando o enunciado pede **auditar o uso da chave**, **controlar quem pode usá-la**, **compartilhar entre contas** ou **definir rotação própria**. A AWS owned key você *"cannot change their policies, you cannot audit activities on these keys, and you cannot delete them"*.

## Onde aparece na prova

Em **Task 1.3**, citado nominalmente: *"Encrypting data at rest (for example, AWS KMS)"*, *"Implementing access policies for encryption keys"* e *"Rotating encryption keys and renewing certificates"*.

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[CloudHSM]] · [[ACM (Certificate Manager)]] · [[Criptografia em repouso e em transito]] · [[S3]]
- [Conceitos do KMS](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html)
