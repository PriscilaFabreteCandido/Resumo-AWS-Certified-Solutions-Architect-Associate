---
servico: Amazon ElastiCache
fonte: "[[3 - Performance (24%)/ElastiCache/2 - Decorar|2 - Decorar]]"
---

# ElastiCache — Flashcards

#flashcards/saa-c03/d3-performance/elasticache

Qual engine do ElastiCache tem replicação, failover automático e Multi-AZ?::**Redis** (Memcached não tem)

Qual engine do ElastiCache tem snapshot e persistência?::**Redis**

Qual engine do ElastiCache é multithread?::**Memcached**

Estruturas de dados do Redis que o Memcached não tem?::List, set, **sorted set**, hash, stream (Memcached é só chave-valor)

Como cada engine do ElastiCache faz sharding?::Redis: **cluster mode**; Memcached: **adicionar nós**

Leaderboard ou ranking: qual engine?::**Redis** (sorted set)

Sessão que não pode ser perdida: qual engine?::**Redis** (replicação e failover)

Cache simples, que pode perder dados, multithread: qual engine?::**Memcached**

Como funciona o lazy loading (cache-aside)?::Lê do cache; em **miss** busca no banco e grava no cache

Desvantagem do lazy loading?::1º acesso **lento** e o dado pode **envelhecer**

Como funciona o write-through e seu custo?::Grava no cache a **cada escrita** no banco; gasta espaço com dado nunca lido e encarece a escrita

Combinação de estratégias de cache mais comum?::**Lazy loading + TTL**, com write-through para o dado quente

Cache para DynamoDB, para conteúdo na borda e para resposta de API?::**DAX**; **CloudFront**; **API Gateway** (por stage, só REST)

Por que guardar sessão no ElastiCache?::Torna a aplicação **stateless**: permite escala horizontal sem **sticky sessions**
