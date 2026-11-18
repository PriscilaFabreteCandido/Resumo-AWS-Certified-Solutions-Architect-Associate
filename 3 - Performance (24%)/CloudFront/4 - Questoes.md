---
tags: [saa-c03, cloudfront, questoes]
servico: Amazon CloudFront
atualizado: 2026-11-08
---

# CloudFront — Questões

> [!question]- Q1. Clientes na Ásia, Europa e América do Sul reclamam de lentidão ao baixar vídeos de um bucket em `us-east-1`.
> **A)** Replicar o bucket para três regiões com latency routing
> **B)** **CloudFront com o bucket como origem** ✅
> **C)** S3 Transfer Acceleration
> **D)** Global Accelerator na frente do bucket
>
> **Por que B**: conteúdo estático global é o caso canônico de CDN — e *"data transfer from your origin to CloudFront is always free"* (a transferência da sua origem para o CloudFront é sempre gratuita) com origem S3.
> **A errada**: triplica armazenamento e exige sincronização.
> **C errada**: Transfer Acceleration é para **upload**.
> **D errada**: Global Accelerator **não cacheia** — o ganho seria muito menor.

> [!question]- Q2. Um bucket criptografado com **SSE-KMS** precisa ser servido pelo CloudFront, sem acesso público.
> **A)** Origin Access Identity (OAI)
> **B)** **Origin Access Control (OAC), com a key policy do KMS liberando `cloudfront.amazonaws.com`** ✅
> **C)** Bucket público com geo restriction
> **D)** Presigned URL gerada no backend
>
> **Por que B**: **SSE-KMS** é uma das capacidades que **só o OAC** tem.
> **A errada**: OAI é *"legacy, not recommended"* (geração antiga, não recomendado) e não suporta SSE-KMS.
> ⚠️ Lembre também: Object Ownership em **Bucket owner enforced** e condição `AWS:SourceArn` na bucket policy.

> [!question]- Q3. O certificado foi importado em `sa-east-1` e não aparece na console do CloudFront.
> **A)** Falta validar por DNS
> **B)** CloudFront só aceita certificados emitidos pela ACM
> **C)** **O certificado precisa estar em `us-east-1`** ✅
> **D)** Falta habilitar SNI
>
> **Por que C**: regra literal da doc, para HTTPS viewer↔CloudFront.
> ⚠️ Para CloudFront↔**origem ELB**, o certificado pode estar em **qualquer** região.

> [!question]- Q4. Dar acesso a todos os segmentos de um vídeo em HLS, sem alterar as URLs existentes.
> **A)** Signed URL por segmento
> **B)** **Signed cookies** ✅
> **C)** Geo restriction
> **D)** OAC
>
> **Por que B**: *"You want to provide access to multiple restricted files, for example, all of the files for a video in HLS format"* (você quer dar acesso a vários arquivos restritos — por exemplo, todos os arquivos de um vídeo em formato HLS) e *"You don't want to change your current URLs"* (você não quer mudar suas URLs atuais).
> **A errada**: exigiria assinar centenas de URLs e mudar os manifests.

> [!question]- Q5. Reescrever a URL e normalizar headers em **milhões de requisições por segundo**, com custo mínimo.
> **A)** Lambda@Edge em viewer request
> **B)** **CloudFront Functions em viewer request** ✅
> **C)** ALB com regras de redirect
> **D)** Lambda no origin request
>
> **Por que B**: Functions roda em **submilissegundo** e escala para *"millions of requests per second"* (milhões de requisições por segundo); Lambda@Edge para em *"10,000 requests per second per Region"* (10.000 requisições por segundo por Região).
> ⚠️ Mas Functions **não** tem acesso a rede nem ao body — se precisasse chamar uma API, seria Lambda@Edge.

> [!question]- Q6. Bloquear o país X **exceto** para o caminho `/status`.
> **A)** Geo restriction do CloudFront
> **B)** **WAF com geo match rule combinada com condição de path** ✅
> **C)** NACL por faixa de IP
> **D)** Route 53 geolocation
>
> **Por que B**: a geo restriction do CloudFront vale para a **distribuição toda**.
> **D errada**: geolocation routing escolhe **para onde** mandar, não bloqueia.

> [!question]- Q7. Um site estático no S3 usa o **website endpoint** (com index document). O time quer torná-lo privado com OAC.
> **A)** Habilitar OAC na distribuição
> **B)** **Não é possível com website endpoint: use o REST endpoint do bucket como origem, com OAC** ✅
> **C)** Usar OAI
> **D)** Habilitar Block Public Access e OAC
>
> **Por que B**: *"you must set it up with CloudFront as a custom origin. That means you can't use OAC (or OAI)"*. Para origem privada, use o **REST endpoint**.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Certificado do CloudFront pode ser regional | **us-east-1** para viewer↔CloudFront |
| CloudFront↔ELB também exige us-east-1 | **Qualquer** região |
| OAI e OAC são equivalentes | OAC suporta **SSE-KMS**, PUT/DELETE e todas as regiões |
| Website endpoint do S3 funciona com OAC | **Não.** Vira custom origin |
| Regional edge cache acelera tudo | **Não** para PUT/POST/PATCH/OPTIONS/DELETE nem conteúdo dinâmico |
| Origin failover é sticky | *"routes all incoming requests to the primary origin, even when a previous request failed over"* |
| Signed URL e signed cookie são iguais | URL = arquivo individual; cookie = vários sem mudar URL. **URL tem precedência** |
| CloudFront serve UDP | HTTP/HTTPS só. UDP = **Global Accelerator** |
| CloudFront encarece | Origem AWS → CloudFront é **grátis**; egress pela borda é mais barato |
| TTL tem máximo | Mínimo 0 s, **sem máximo**; padrão **24 h** |
| Lambda@Edge escala como Functions | **10.000 req/s por região**, contra *"millions"* das Functions |

## Links

- [[3 - Performance (24%)/CloudFront/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/CloudFront/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/CloudFront/3 - Detalhes|3 - Detalhes]]
