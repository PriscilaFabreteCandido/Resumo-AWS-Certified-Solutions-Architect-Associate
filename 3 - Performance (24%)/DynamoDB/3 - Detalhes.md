---
tags: [saa-c03, dynamodb, detalhes]
servico: Amazon DynamoDB
atualizado: 2026-11-08
---

# DynamoDB — Detalhes

## 1. Modelagem: a partition key define tudo

A **partition key** determina em qual partição física o item mora. Isso tem duas consequências:

**Distribuição.** Uma partition key com poucos valores distintos (ou com um valor muito mais usado que os outros) cria uma **hot partition**: o throughput se concentra e você recebe throttle mesmo com capacidade sobrando na tabela. A resposta é escolher uma chave de **alta cardinalidade** (ou adicionar um sufixo de dispersão).

**Acesso.** Toda **Query** exige a partition key. Se você precisa buscar por outro atributo, precisa de um **índice** — ou vai fazer **Scan**.

Chaves aceitam só **escalares**: string, number ou binary. Partition key de **1 a 2048 bytes**, sort key de **1 a 1024 bytes**, aninhamento até **32 níveis**, item até **400 KB**.

## 2. Query × Scan — a diferença que custa dinheiro

**Query** usa a chave e lê **só a partição necessária**. **Scan** lê a **tabela inteira** e filtra depois.

E o detalhe decisivo: o **`FilterExpression` é aplicado depois da leitura**. Você paga pelo que foi **lido**, não pelo que voltou. Um Scan com filtro que devolve 10 itens numa tabela de 10 milhões consome capacidade de 10 milhões.

Sintoma de prova: *"performance ruim"*, *"consumo alto de RCU"*, *"a aplicação faz Scan"* → a resposta é **modelar um GSI e usar Query**, não aumentar a capacidade.

Ambos devolvem no máximo **1 MB** por chamada (com paginação).

## 3. GSI × LSI — a tabela que decide

| | **GSI** | **LSI** |
|---|---|---|
| Partition key | **qualquer** atributo | **a mesma** da tabela base |
| Quando criar | **na criação ou depois** | **só na criação** |
| Deletar | **sim** | **não** |
| Tamanho | *"no size restrictions"* | **10 GB** por valor de partition key |
| Consistência | *"Queries on global secondary indexes support eventual consistency only"* | **eventual ou forte** |
| Capacidade | **própria** (RCU/WCU do índice) | consome a da **tabela base** |
| Atributo fora da projeção | **não devolve** — *"DynamoDB does not fetch any attributes from the table"* | **busca na tabela** automaticamente |

Na prática: **GSI** resolve "preciso consultar por outro atributo" e é o que você vai usar em 90% dos casos. **LSI** só faz sentido quando você precisa de **leitura forte** num sort key alternativo — e tem que decidir isso **antes de criar a tabela**.

## 4. On-demand × provisionado

**On-demand** é *"the default and recommended throughput option for most DynamoDB workloads"*: pay-per-request, escala sozinho, zero planejamento.

**Provisionado** você define RCU/WCU, com **auto scaling** (alvo recomendado **70%**, dispara após **2 minutos** consecutivos acima do alvo). Sai mais barato por unidade em tráfego **constante e previsível**, e permite comprar **reserved capacity**.

Regras de troca: provisionado → on-demand **4 vezes** em 24 h rolantes; on-demand → provisionado **a qualquer momento**.

| Perfil | Modo |
|---|---|
| Imprevisível, picos, dev/teste, ocioso | **On-demand** |
| Constante e previsível, volume alto | **Provisionado + auto scaling** (e reserved capacity) |

## 5. Features de dado

**Streams** capturam as mudanças da tabela; os registros *"have a lifetime of 24 hours"*. São a base de: replicação, invalidação de cache, materialização de views, e integração com **Lambda** e **EventBridge Pipes**.

**PITR** retém de **1 a 35 dias** (`RecoveryPeriodInDays`), restaurando *"to any point in time"* até `LatestRestorableDateTime`, que é *"typically five minutes before the current time"*. E o ponto crítico: *"The point-in-time recovery process always restores to a new table."*
Detalhe de custo: *"The configured maximum recovery period doesn't impact the price"* — o preço vem do **tamanho** da tabela. Tabela deletada mantém um backup de sistema por **35 dias**, sem custo.

**TTL** é *"a cost-effective method for deleting items that are no longer relevant"*. O atributo precisa ser **Number** em epoch de **segundos**; a exclusão ocorre *"within a few days after their expiration"*, e a primeira exclusão **não consome WCU**. ⚠️ Itens expirados mas não apagados **ainda aparecem** — *"Use filter expressions to remove expired items from Scan and Query results."*

**Global Tables** é *"multi-Region, and multi-active"* — *"Any global table replica can serve reads and writes"* (qualquer réplica de uma global table pode atender leituras e escritas). Dois modos: **MREC** (eventual, **padrão**) e **MRSC** (forte). Resolução de conflito **last-writer-wins**. E: *"You cannot change a global table's consistency mode after creation."*

## 6. Performance e cache

Para leitura repetida de itens, **DAX** é o cache nativo (na VPC, API compatível). ⚠️ Mas **leitura fortemente consistente passa direto e não é cacheada**.

Para padrões que o DynamoDB não atende bem (agregação, busca textual), o padrão é **Streams → Lambda → OpenSearch / Redshift**.

## 7. Custo

| Alavanca | Detalhe |
|---|---|
| Modo correto | On-demand para irregular; provisionado + auto scaling para constante |
| **Reserved capacity** | Até 1.000.000 de unidades provisionadas por conta |
| **Standard-IA table class** | Dado acessado raramente, com storage dominando o custo |
| **TTL** | Apaga o que não serve mais, sem consumir WCU na 1ª exclusão |
| **Projeção enxuta** nos índices | GSI com KEYS_ONLY custa muito menos que ALL |
| **Evitar Scan** | A maior economia de todas |

## Links

- [[3 - Performance (24%)/DynamoDB/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/DynamoDB/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/DynamoDB/4 - Questoes|4 - Questoes]]
- [[3 - Performance (24%)/DAX/1 - O que e|DAX]] · [[3 - Performance (24%)/ElastiCache/1 - O que e|ElastiCache]] · [[3 - Performance (24%)/OpenSearch Service/1 - O que e|OpenSearch Service]] · [[2 - Resiliencia (26%)/Lambda/1 - O que e|Lambda]] · [[1 - Seguranca (30%)/AWS Backup/1 - O que e|AWS Backup]] · [[4 - Custo (20%)/04 - Dominio 4 - Design Cost-Optimized Architectures (20%)|Custo (dominio 4)]]
- [Índices secundários](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/SecondaryIndexes.html)
