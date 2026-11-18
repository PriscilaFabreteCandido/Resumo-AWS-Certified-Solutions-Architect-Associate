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

A KMS não criptografa seus arquivos. Ela guarda a **chave que criptografa chaves**. A doc chama isso de *wrapping key*: *"KMS keys are most often used as wrapping keys, also known as key-encryption keys. Instead of encrypting data, wrapping keys encrypt the data keys that encrypt your data."* (as chaves do KMS são usadas na maior parte das vezes como wrapping keys, também chamadas de chaves de criptografia de chave: em vez de criptografar dados, elas criptografam as data keys que criptografam seus dados)

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
> Quando o enunciado pede **auditar o uso da chave**, **controlar quem pode usá-la**, **compartilhar entre contas** ou **definir rotação própria**. A AWS owned key você *"cannot change their policies, you cannot audit activities on these keys, and you cannot delete them"* (não é possível alterar as policies delas, auditar as atividades nessas chaves, nem excluí-las).

## Onde aparece na prova

Em **Task 1.3**, citado nominalmente: *"Encrypting data at rest (for example, AWS KMS)"* (criptografar dados em repouso (por exemplo, com o AWS KMS)), *"Implementing access policies for encryption keys"* (implementar políticas de acesso para chaves de criptografia) e *"Rotating encryption keys and renewing certificates"* (rotacionar chaves de criptografia e renovar certificados).

## Links

- [[1 - Seguranca (30%)/KMS/2 - Decorar|2 - Decorar]] · [[1 - Seguranca (30%)/KMS/3 - Detalhes|3 - Detalhes]] · [[1 - Seguranca (30%)/KMS/4 - Questoes|4 - Questoes]]
- [[1 - Seguranca (30%)/CloudHSM/1 - O que e|CloudHSM]] · [[1 - Seguranca (30%)/ACM (Certificate Manager)/1 - O que e|ACM (Certificate Manager)]] · [[9 - Fundamentos e apoio/Criptografia em repouso e em transito/1 - O que e|Criptografia em repouso e em transito]] · [[3 - Performance (24%)/S3/1 - O que e|S3]]
- [Conceitos do KMS](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html)
