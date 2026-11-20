---
servico: AWS Key Management Service (KMS)
fonte: "[[1 - Seguranca (30%)/KMS/2 - Decorar|2 - Decorar]]"
---

# KMS — Flashcards

#flashcards/saa-c03/d1-seguranca/kms

Tamanho máximo do plaintext na operação `Encrypt` do KMS?::**4.096 bytes**

Como cifrar dados maiores que o limite do `Encrypt`?::**`GenerateDataKey`** (envelope encryption)

Rotação de chave customer managed simétrica: obrigatória? período padrão?::**Opcional**; padrão **365 dias**

Rotação de chave AWS managed?::**Obrigatória e anual**; não se liga nem desliga

Como rotacionar chaves assimétricas, HMAC ou de custom key store?::**Só manualmente**

A rotação de chave recriptografa os dados?::**Não**; o decrypt usa a mesma versão do material que cifrou

Qual mecanismo de acesso do KMS é obrigatório e precisa liberar o principal explicitamente?::A **key policy**

Mecanismo do KMS para delegação temporária e granular, usado por serviços AWS?::**Grant**

Causa nº 1 de `AccessDeniedException` no KMS?::Principal **ausente na key policy** (nenhuma policy IAM resolve)

Serviços AWS integrados suportam chave simétrica ou assimétrica?::**Só simétrica**

Quando usar chave assimétrica?::Para cifrar **fora da AWS** por quem não pode chamar o KMS

Prefixo do ID de uma Multi-Region key?::**`mrk-`** (rotação configurada só na primária)

Encryption context: o que é e em que tipo de chave existe?::Par chave-valor no **AAD**; só em chave **simétrica**

Formato de alias de chave AWS managed?::`aws/<serviço>`

O que é custom key store no KMS?::KMS usando **CloudHSM** ou HSM externo como backing
