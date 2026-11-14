---
tags: [saa-c03, elasticache, questoes]
servico: Amazon ElastiCache
atualizado: 2026-11-08
---

# ElastiCache — Questões

> [!question]- Q1. Um jogo precisa de ranking em tempo real, com ordenação por pontuação e failover automático.
> **A)** **ElastiCache for Redis** ✅
> **B)** ElastiCache for Memcached
> **C)** DynamoDB com GSI
> **D)** DAX
>
> **Por que A**: **sorted set** é estrutura nativa do Redis, que também dá replicação e failover automático.
> **B errada**: Memcached é só chave-valor, **sem** replicação e **sem** estruturas de dados.
> **C errada**: funciona, mas sem a semântica de ranking em memória; latência maior e modelagem mais complexa.
> **D errada**: DAX acelera DynamoDB; não oferece estrutura de dados.

> [!question]- Q2. A aplicação guarda sessão em disco local e, ao escalar, usuários são deslogados.
> **A)** Habilitar sticky sessions no ALB
> **B)** **Mover a sessão para o ElastiCache for Redis (ou DynamoDB), tornando a aplicação stateless** ✅
> **C)** Usar EFS para o diretório de sessão
> **D)** Reduzir o scale-in do ASG
>
> **Por que B**: é a resposta arquitetural — stateless permite escala horizontal e substituição de instância.
> **A errada**: sticky session mitiga, mas prejudica a distribuição e quebra quando a instância morre.
> **C errada**: funciona tecnicamente, mas sessão em file system compartilhado é mais lento e frágil que cache em memória.

> [!question]- Q3. O RDS está com CPU alta por consultas de leitura repetidas, e a empresa quer reduzir **custo**.
> **A)** Aumentar a instance class
> **B)** **ElastiCache na frente do banco, com lazy loading e TTL** ✅
> **C)** Multi-AZ
> **D)** Mudar para io2
>
> **Por que B**: cache costuma custar menos que subir instância ou adicionar réplicas — e o guia lista *"Caching strategies"* também em **Task 4.3 (custo)**.
> **C errada**: Multi-AZ é **HA**, e o standby **não lê**.

> [!question]- Q4. O dataset do cache não cabe num único nó e a escrita precisa escalar.
> **A)** Cluster mode disabled com réplicas
> **B)** **Redis com cluster mode enabled (sharding)** ✅
> **C)** Memcached com um nó grande
> **D)** DAX
>
> **Por que B**: cluster mode particiona os dados em **shards**, escalando memória **e** escrita.
> **A errada**: réplicas escalam **leitura**, não memória nem escrita.

> [!question]- Q5. Um cache simples, descartável, que precisa aproveitar bem um nó com muitas vCPUs.
> **A)** Redis cluster mode enabled
> **B)** **Memcached** ✅
> **C)** DAX
> **D)** CloudFront
>
> **Por que B**: Memcached é **multithread** e simples; o enunciado dispensa replicação, persistência e estruturas de dados.

> [!question]- Q6. Depois de atualizar um registro no banco, a aplicação continua lendo o valor antigo do cache.
> **A)** O cache falhou
> **B)** **É lazy loading sem invalidação: reduza o TTL, ou invalide a chave na escrita, ou use write-through** ✅
> **C)** Falta habilitar Multi-AZ
> **D)** Falta criptografia em trânsito
>
> **Por que B**: é o trade-off conhecido do cache-aside — e o **TTL** é o controle principal.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Memcached tem failover | **Não.** Sem replicação, sem persistência |
| Redis é multithread | É **single-thread por nó**; multithread é o **Memcached** |
| ElastiCache serve para cachear o DynamoDB | DynamoDB = **DAX** |
| Réplicas de leitura escalam memória | Escalam **leitura**. Memória e escrita = **cluster mode (sharding)** |
| Cache resolve carga de escrita | Cache é para **leitura repetida** |
| Lazy loading mantém o cache fresco | Pode servir dado **velho** até o TTL expirar |
| Write-through é sempre melhor | Gasta memória com dado nunca lido e encarece a escrita |
| Sticky session é a solução de estado | A resposta é **stateless** com sessão no ElastiCache/DynamoDB |
| ElastiCache é público | Vive na **VPC**, com security group |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
