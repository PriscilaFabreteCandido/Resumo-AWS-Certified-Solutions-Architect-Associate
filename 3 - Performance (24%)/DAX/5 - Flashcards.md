---
servico: Amazon DynamoDB Accelerator (DAX)
fonte: "[[3 - Performance (24%)/DAX/2 - Decorar|2 - Decorar]]"
---

# DAX — Flashcards

#flashcards/saa-c03/d3-performance/dax

Quais são os dois caches do DAX e que operações cada um guarda?::**Item cache** (GetItem, BatchGetItem) e **query cache** (Query, Scan)

TTL padrão do item cache do DAX?::**5 minutos**

Quando é definido o TTL do query cache do DAX?::Na **criação do cluster**

O que acontece com TTL zero no query cache do DAX?::A resposta da consulta **não é cacheada**

O que acontece com TTL zero no item cache do DAX?::Itens só saem por **LRU** ou por write-through

Política de evicção do DAX e se é configurável?::**LRU** nos dois caches; **não** é configurável

Quando uma escrita via DAX é considerada bem-sucedida?::Só quando grava na **tabela e no DAX** (write-through)

O que o DAX faz com uma leitura fortemente consistente?::**Repassa** ao DynamoDB e **não cacheia** o resultado

Onde o cluster DAX roda?::Dentro de uma **VPC**

O DAX trata APIs de gerenciamento de tabela (CreateTable, UpdateTable)?::**Não**

Precisa reescrever a aplicação DynamoDB para usar DAX?::**Não**: API compatível com o DynamoDB

Ganho típico de latência ao colocar DAX na frente do DynamoDB?::De **milissegundos** para **microssegundos**

Carga com escrita intensa e leitura rara: DAX ajuda?::**Não**: o write-through adiciona latência

Cache de banco relacional, sessão ou leaderboard: DAX ou outro?::**ElastiCache**
