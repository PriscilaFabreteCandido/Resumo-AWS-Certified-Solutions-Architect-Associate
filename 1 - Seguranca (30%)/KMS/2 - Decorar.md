---
tags: [saa-c03, kms, decorar]
servico: AWS KMS
atualizado: 2026-11-08
---

# KMS — Decorar

## O número que mais cai

| Item | Valor |
|---|---|
| **`Encrypt`: tamanho máximo do plaintext** | **4.096 bytes** |
| Acima disso | **`GenerateDataKey`** (envelope encryption) |

Por algoritmo assimétrico, o limite é **menor** ainda: RSA_2048 com OAEP SHA-256 → **190 bytes** · RSA_4096 → **446 bytes** · SM2PKE → 1.024 bytes.

## Rotação

| Chave | Rotação |
|---|---|
| **Customer managed, simétrica, origem `AWS_KMS`** | **Opcional**. Padrão **365 dias** (`RotationPeriodInDays`) |
| **AWS managed** | **Obrigatória, anual (~365 dias)**. Não se liga nem desliga |
| **Assimétrica, HMAC, custom key store** | **Só manual** |
| On-demand (`RotateKeyOnDemand`) | Simétrica `AWS_KMS` e simétrica `EXTERNAL` (importada) |

**Rotação NÃO recriptografa os dados**: *"Key rotation has no effect on the data that the KMS key protects. It does not rotate the data keys that the KMS key generated or re-encrypt any data protected by the KMS key."*
E o decrypt usa a versão correta: *"AWS KMS uses the same version of the key material that was used to encrypt it."*

## Controle de acesso — três camadas

| Mecanismo | Papel |
|---|---|
| **Key policy** | **Obrigatória.** Vive na chave. **Precisa liberar o principal explicitamente** |
| **IAM policy** | Concede permissão de uso a identidades |
| **Grant** | Delegação **temporária e granular** (usada por serviços AWS internamente) |

> [!warning] Key policy é exceção à regra da união
> A doc do IAM: *"IAM role trust policies and KMS key policies are exceptions... they must explicitly allow access for principals."*
> Sem o principal na key policy, **nenhuma** policy IAM resolve. É a causa nº 1 de `AccessDeniedException` em KMS.

## Simétrica × assimétrica

| | Simétrica | Assimétrica |
|---|---|---|
| Chave | Uma, nunca sai da KMS | Par público/privado; **a privada nunca sai** |
| Serviços AWS integrados | **Só simétrica** | **Não suportam** |
| Rotação automática | **Sim** | **Não** |
| Encryption context | **Sim** | **Não** |
| Use quando | Padrão, tudo na AWS | *"encryption outside of AWS by users who cannot call AWS KMS"* |

Tipos assimétricos: **RSA** (cifrar **ou** assinar, não ambos) · **ECC** (assinar **ou** derivar segredo) · **ML-DSA** (assinar) · **ML-KEM** (encapsular) · **SM2** (só China).

## Outros fatos

| Item | Detalhe |
|---|---|
| **Multi-Region key** | ID com prefixo **`mrk-`**. Rotação configurada **só na primária** |
| **Encryption context** | Par chave-valor no AAD. Só em simétrica. *"strongly recommended"* |
| **Alias** | `aws/<serviço>` para AWS managed; `alias/meu-nome` para as suas |
| **Deleção** | Tem período de espera (agendamento). *"AWS KMS deletes key material only when you delete the KMS key"* |
| **Custom key store** | KMS usando **CloudHSM** ou HSM externo como backing |

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[02 - Numeros para decorar]]
