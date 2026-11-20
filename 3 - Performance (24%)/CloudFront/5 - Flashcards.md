---
servico: Amazon CloudFront
fonte: "[[3 - Performance (24%)/CloudFront/2 - Decorar|2 - Decorar]]"
---

# CloudFront — Flashcards

#flashcards/saa-c03/d3-performance/cloudfront

TTL padrão do cache do CloudFront (e mínimo/máximo)?::**24 horas**; mínimo 0 s, **sem máximo**

Em que região o certificado ACM precisa estar para HTTPS viewer ↔ CloudFront?::**us-east-1 (N. Virginia)**, obrigatoriamente

Exceção à regra de região do certificado ACM no CloudFront?::Entre CloudFront e **origem ELB**: o certificado pode estar em **qualquer** região

Quantas origens tem um origin group e quais métodos fazem failover?::**2** origens (primária + secundária); failover só em **GET, HEAD, OPTIONS**

Timeout de conexão, tentativas e timeout de resposta padrão da origem no CloudFront?::Conexão **10 s**, **3** tentativas, resposta **30 s** (failover pode levar até ~30 s)

Geo restriction do CloudFront: bloqueia por quê e devolve qual status?::Por **país**; devolve **403** (precisão declarada de 99,8%)

Quais requisições NÃO passam pelos regional edge caches?::Métodos de proxy (**PUT, POST, PATCH, OPTIONS, DELETE**) e requisições **dinâmicas**; vão direto do POP à origem

OAC × OAI: qual suporta SSE-KMS, todas as regiões e PUT/DELETE?::**OAC** (recomendado); OAI é legado

Pré-requisito do OAC no bucket S3?::Object Ownership em **Bucket owner enforced**; bucket policy com principal do CloudFront e condição **`AWS:SourceArn`**

S3 website endpoint aceita OAC ou OAI?::**Não**: vira **custom origin** e não aceita nenhum dos dois

Signed URL ou signed cookie: qual para vários arquivos restritos sem mudar URLs?::**Signed cookie** (signed URL é para arquivo individual ou cliente sem cookie)

CloudFront Functions: linguagem, triggers e limites de memória/código?::**JavaScript**; só **viewer** request/response; **2 MB** de memória, **10 KB** de código; submilissegundo

Lambda@Edge: linguagens, triggers e duração máxima?::**Node.js e Python**; **4** triggers (viewer + origin); até **30 s**

Qual das duas (Functions ou Lambda@Edge) acessa rede e body da requisição?::**Lambda@Edge**

Escala de CloudFront Functions × Lambda@Edge?::Functions: **milhões** de req/s; Lambda@Edge: **10.000 req/s por Região**
