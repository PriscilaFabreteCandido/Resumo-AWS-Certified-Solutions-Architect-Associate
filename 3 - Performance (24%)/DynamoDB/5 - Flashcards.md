---
servico: Amazon DynamoDB
fonte: "[[3 - Performance (24%)/DynamoDB/2 - Decorar|2 - Decorar]]"
---

# DynamoDB — Flashcards

#flashcards/saa-c03/d3-performance/dynamodb

O que 1 RCU compra no DynamoDB?::1 leitura **forte** de até **4 KB**, ou **2 leituras eventuais**

O que 1 WCU compra no DynamoDB?::1 escrita de até **1 KB**

Quantas RCU consome uma leitura forte de um item de 3 KB?::**1 RCU** (3 ÷ 4 = 0,75, arredonda para cima)

Tamanho máximo de um item no DynamoDB?::**400 KB** (nome + valor dos atributos contam)

Tamanho máximo da partition key e da sort key?::Partition key **2048 bytes**; sort key **1024 bytes**

Quanto dado uma chamada de Query ou Scan devolve no máximo?::**1 MB** por chamada

Limites de uma transação no DynamoDB?::**100 itens** e **4 MB**

Limite de itens do BatchGetItem × BatchWriteItem?::BatchGetItem **100** itens; BatchWriteItem **25** itens (ambos 16 MB)

Quota padrão de throughput por tabela e por conta (provisionado)?::Tabela: **40.000 RCU/WCU**; conta: **80.000 RCU/WCU**

Quantas vezes por dia dá para reduzir a capacidade provisionada de uma tabela?::**4 por dia** + 1 por hora, até **27** por dia (UTC)

Quantas vezes dá para trocar de provisionado para on-demand?::**4 vezes** em 24 h rolantes (on-demand → provisionado: a qualquer momento)

Alvo de utilização recomendado do auto scaling do DynamoDB?::**70%** (dispara após 2 min consecutivos)

Quantos GSI e quantos LSI por tabela?::**20 GSI** e **5 LSI**

Quando dá para criar um LSI e um GSI?::LSI **só na criação** da tabela (não deletável); GSI na criação **ou depois**

Qual índice suporta leitura fortemente consistente?::**LSI** (GSI só tem consistência **eventual**)

Limite de tamanho do LSI e de onde vem a capacidade de cada índice?::LSI: **10 GB** por valor de partition key, usa capacidade da **tabela base**; GSI tem capacidade **própria**

Retenção dos registros do DynamoDB Streams?::**24 horas**

Janela do PITR e onde ele restaura?::**1 a 35 dias**; sempre em **tabela nova**

Formato do atributo de TTL e custo da exclusão?::**Number** em epoch de **segundos**; a exclusão **não consome WCU** (ocorre em poucos dias)

Modos de consistência das Global Tables e resolução de conflito?::**MREC** (eventual, padrão) ou **MRSC** (forte); conflito por **last-writer-wins**
