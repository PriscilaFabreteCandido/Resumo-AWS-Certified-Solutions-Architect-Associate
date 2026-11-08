---
tags: [saa-c03, s3, storage]
servico: Amazon S3
tipo: Armazenamento de objetos
dominios: [1, 3, 4]
atualizado: 2026-11-08
---

# Amazon S3 — O que é

> [!info] Em uma frase
> Armazenamento de **objetos** com **11 noves de durabilidade** (99,999999999%), acessado por API HTTP, com capacidade praticamente ilimitada e várias **classes de preço** conforme a frequência de acesso.

## O que é, em palavras simples

Um "balde" (*bucket*) onde você joga arquivos (*objetos*). Cada objeto tem uma **chave** (o caminho/nome), o **conteúdo** e **metadados**. Você não monta o S3 como um disco: você faz `PUT` e `GET` por HTTP.

Três coisas definem o S3 na prova:

1. **Durabilidade altíssima** — a AWS replica cada objeto em pelo menos 3 AZs (exceto nas classes "One Zone").
2. **Classes de armazenamento** — o mesmo objeto pode custar 10x mais ou menos dependendo da classe.
3. **É a base de quase tudo** — data lake, backup, site estático, origem do CloudFront, destino do Firehose, log de outros serviços.

## O que o S3 **não** é

| Não é | Por quê |
|---|---|
| **Disco** (bloco) | Não tem sistema de arquivos. Para disco de instância, use **EBS** |
| **Compartilhamento de arquivos** (POSIX/SMB) | Para isso, use **EFS** (Linux) ou **FSx** (Windows/Lustre) |
| **Banco de dados** | Não tem query por registro. Para SQL sobre o S3, use **Athena** |

## Onde aparece na prova

| Domínio | Como aparece |
|---|---|
| **1 – Segurança** | Criptografia (SSE-S3, SSE-KMS, SSE-C), Block Public Access, Object Lock, versionamento, bucket policy |
| **3 – Performance** | Taxa de requisição por prefixo, multipart upload, Transfer Acceleration |
| **4 – Custo** | Escolha de classe, lifecycle, tiering, Requester Pays |
| **2 – Resiliência** | Replicação (CRR/SRR), durabilidade, backup |

## Vocabulário mínimo

- **Bucket** — o contêiner. Nome **globalmente único**.
- **Objeto** — o arquivo. Máximo **48,8 TiB**.
- **Chave (key)** — o nome completo do objeto (`fotos/2026/praia.jpg`).
- **Prefixo** — a parte da chave antes do último `/`. É a **unidade de performance** do S3.
- **Versão** — com versionamento ligado, cada escrita cria uma versão nova.
- **Classe de armazenamento** — a faixa de preço/latência do objeto.

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[00 - START HERE (indice da prova)]]
- [Documentação oficial do S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html)
