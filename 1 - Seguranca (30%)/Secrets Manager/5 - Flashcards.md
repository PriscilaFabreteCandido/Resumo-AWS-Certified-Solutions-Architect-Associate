---
servico: AWS Secrets Manager
fonte: "[[1 - Seguranca (30%)/Secrets Manager/2 - Decorar|2 - Decorar]]"
---

# Secrets Manager — Flashcards

#flashcards/saa-c03/d1-seguranca/secrets-manager

Pediu rotação automática de credencial: Secrets Manager ou Parameter Store?::**Secrets Manager**

Pediu menor custo para configuração: Secrets Manager ou Parameter Store?::**Parameter Store** (Standard é grátis)

Como o Secrets Manager é cobrado?::Por **secret por mês** e por **chamada de API**

Tamanho máximo de parâmetro no Parameter Store Standard e Advanced?::Standard **4 KB**; Advanced **8 KB**

Quantidade de parâmetros no Parameter Store Standard e Advanced?::Standard **10.000**; Advanced **100.000**

Qual dos dois replica secrets entre regiões?::**Secrets Manager**

Como rotacionar um secret customizado (fora dos bancos nativos)?::Com uma **Lambda de rotação** que você fornece

Estratégia de rotação sem janela de indisponibilidade?::**Alternating users** (alterna entre dois usuários)

Estágios de versão de um secret?::`AWSCURRENT`, `AWSPENDING`, `AWSPREVIOUS`

Quantos secrets por RDS Proxy?::Até **200**

Como compartilhar um secret com outra conta?::Com **resource policy** no secret

Tipos de parâmetro do Parameter Store?::`String`, `StringList` e `SecureString` (este cifrado com KMS)

Bancos com rotação nativa no Secrets Manager?::**RDS, Aurora, Redshift, DocumentDB** (e outros bancos AWS)
