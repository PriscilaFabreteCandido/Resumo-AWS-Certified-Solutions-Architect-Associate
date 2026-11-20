---
servico: Amazon Macie
fonte: "[[1 - Seguranca (30%)/Macie/2 - Decorar|2 - Decorar]]"
---

# Macie — Flashcards

#flashcards/saa-c03/d1-seguranca/macie

O que o Macie faz?::Descobre **dado sensível** usando **machine learning** e **pattern matching**

Escopo do Macie?::**Somente Amazon S3** (buckets de uso geral)

Macie analisa EBS, RDS, DynamoDB ou EFS?::**Não**

Três funções do Macie?::**Inventário** de buckets, **avaliação de risco** de acesso e **descoberta** de dado sensível no conteúdo

O que o inventário de buckets do Macie mostra?::Se o bucket é **público**, **criptografado** ou **compartilhado**

Tipos de dado que os identificadores gerenciados do Macie encontram?::CPF e equivalentes, cartão de crédito, chave de API, credencial AWS, dado de saúde e financeiro

Como detectar um padrão próprio no Macie?::**Identificadores customizados** por **regex**

"PII", "LGPD", "classificar dados" no enunciado: qual serviço?::**Macie**

Atividade maliciosa, IP suspeito: qual serviço?::**GuardDuty**

A que Task do guia o Macie se conecta além da 1.2?::**Task 1.3**: retenção e classificação de dados
