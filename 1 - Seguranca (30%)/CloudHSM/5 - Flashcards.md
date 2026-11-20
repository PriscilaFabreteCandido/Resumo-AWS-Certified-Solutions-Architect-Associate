---
servico: AWS CloudHSM
fonte: "[[1 - Seguranca (30%)/CloudHSM/2 - Decorar|2 - Decorar]]"
---

# CloudHSM — Flashcards

#flashcards/saa-c03/d1-seguranca/cloudhsm

Tenancy do CloudHSM × KMS?::CloudHSM é **single tenant**; KMS é **multi-tenant** gerenciado

Nível FIPS do CloudHSM em FIPS mode?::**140-2 ou 140-3 nível 3**

Quem gerencia os usuários do CloudHSM?::**Você**, fora do IAM

Interfaces do CloudHSM?::**PKCS #11, JCE, CNG, KSP**

Como usar o CloudHSM com serviços AWS integrados à KMS?::Via **custom key store** da KMS (o cluster CloudHSM serve de backing)

Dois modos de cluster do CloudHSM?::**FIPS mode** (só algoritmos validados FIPS) e **non-FIPS mode** (todos os suportados)

Como ter alta disponibilidade no CloudHSM?::**Cluster** de HSMs distribuído entre **AZs** (você distribui)

A AWS enxerga o material de chave no CloudHSM?::Não, a criptografia ponta a ponta **não é visível para a AWS**

Alternativa da AWS para criptografia de pagamentos?::**AWS Payment Cryptography**

Sem gatilho de HSM dedicado ou FIPS nível 3, escolher KMS ou CloudHSM?::**KMS**

Qual tem menor esforço operacional, KMS ou CloudHSM?::**KMS**; no CloudHSM você tem mais responsabilidade
