---
tags: [saa-c03, cloudhsm, detalhes]
servico: AWS CloudHSM
atualizado: 2026-11-08
---

# CloudHSM — Detalhes

## 1. O que "single-tenant" muda

No KMS, o HSM por trás é compartilhado entre clientes (com isolamento criptográfico). No CloudHSM, o HSM é **seu**: *"HSMs are general purpose, single tenant, and either FIPS 140-2 level-3 or FIPS 140-3 level-3 validated for clusters in FIPS mode."*

Consequências práticas:

- **Você cria e gerencia os usuários do HSM** (crypto officer, crypto user), fora do IAM.
- **Se você perder as credenciais do HSM, a AWS não recupera** — o material não é visível para ela.
- **Você é responsável por backup lógico, rotação e procedimentos operacionais.**

É exatamente o trade-off que a doc enuncia: controle total em troca de responsabilidade.

## 2. FIPS mode × non-FIPS mode

| Modo | O que muda |
|---|---|
| **FIPS mode** | *"only Federal Information Processing Standard (FIPS) validated keys and algorithms can be used"* |
| **Non-FIPS mode** | *"all the keys and algorithms that are supported by AWS CloudHSM, regardless of FIPS approval"* |

Se o requisito regulatório cita **FIPS 140-2/140-3 nível 3**, o cluster precisa estar em FIPS mode. Esse é o cenário em que o KMS **não** basta.

## 3. Custom key store — o melhor dos dois mundos

A KMS permite criar um **custom key store** apoiado num cluster CloudHSM. Assim:

- As chaves vivem no **seu** HSM dedicado
- Mas os serviços AWS continuam usando a **API da KMS** normalmente

É a resposta quando o enunciado pede **HSM dedicado** **e** **integração com serviços AWS** (S3, EBS, RDS). Detalhe de prova: chave em custom key store **não** suporta rotação automática.

## 4. Interfaces e migração

O CloudHSM expõe interfaces padrão de indústria: **PKCS #11**, **JCE** (Java), **CNG** e **KSP** (Windows). A doc: cargas que já usam essas interfaces *"can migrate to AWS CloudHSM with fewer changes"*.

Casos típicos:
- **Autoridade certificadora privada** própria (chave raiz num HSM)
- **Assinatura de documentos** ou de código com exigência regulatória
- **Oracle TDE** ou SQL Server EKM apontando para HSM
- **Offload de SSL/TLS** com a chave privada no HSM

## 5. Quando NÃO usar

| Situação | Use |
|---|---|
| Criptografia de S3, EBS, RDS, DynamoDB sem exigência de HSM | **KMS** |
| Guardar senha de banco com rotação | **Secrets Manager** |
| Guardar parâmetro de configuração | **Parameter Store** |
| Certificado TLS | **ACM** |
| HSM para pagamento (PIN, EMV) | **AWS Payment Cryptography** |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[KMS]] · [[ACM (Certificate Manager)]] · [[Secrets Manager]]
