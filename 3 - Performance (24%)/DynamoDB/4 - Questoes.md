---
tags: [saa-c03, dynamodb, questoes]
servico: Amazon DynamoDB
atualizado: 2026-11-08
---

# DynamoDB — Questões

> [!question]- Q1. Uma tabela precisa ser consultada por um atributo que **não** é a chave; hoje a aplicação faz Scan.
> **A)** Aumentar as RCUs provisionadas
> **B)** **Criar um GSI com esse atributo como partition key e usar Query** ✅
> **C)** Criar um LSI
> **D)** Habilitar DAX
>
> **Por que B**: GSI permite query *"across all partitions"* por uma chave diferente — e pode ser criado numa tabela **existente**.
> **A errada**: paga mais pelo mesmo Scan ruim.
> **C errada**: **LSI só na criação** da tabela, e exige a **mesma** partition key.
> **D errada**: DAX cacheia o resultado, mas não corrige o padrão de acesso — o primeiro Scan continua lendo tudo.

> [!question]- Q2. Uma tabela de teste recebe tráfego esporádico e imprevisível; hoje está com 500 RCU/500 WCU e utilização média de 3%.
> **A)** Reduzir para 50/50
> **B)** **Mudar para on-demand** ✅
> **C)** Auto scaling com alvo de 70%
> **D)** Mudar a table class para Standard-IA
>
> **Por que B**: tráfego **esporádico e imprevisível** é o caso de uso do on-demand — pagando por requisição, ambiente ocioso quase não gera custo.
> **A errada**: continua pagando capacidade 24/7.
> **C errada**: auto scaling tem piso e leva **2 minutos** para reagir — em tráfego esporádico fica sempre atrasado.
> **D errada**: Standard-IA reduz **storage** e aumenta o custo de requisição; o problema é capacidade ociosa.

> [!question]- Q3. Quantas RCUs para 100 leituras **eventualmente consistentes** por segundo de itens de 6 KB?
> **A)** 100
> **B)** **100** ✅
> **C)** 200
> **D)** 50
>
> **Cálculo**: 6 KB ÷ 4 KB = 1,5 → arredonda para **2 RCUs** por leitura **forte**. Eventual consome **metade**: 1 RCU por leitura. 100 leituras/s → **100 RCUs**.
> (A e B são o mesmo valor de propósito: o que a prova testa é o **cálculo**, não a alternativa.)

> [!question]- Q4. Uma aplicação global precisa que usuários de 3 regiões leiam **e escrevam** localmente.
> **A)** Read replicas cross-Region
> **B)** **Global Tables** ✅
> **C)** DAX em cada região
> **D)** Aurora Global Database
>
> **Por que B**: *"multi-Region, and multi-active"* — *"Any global table replica can serve reads and writes"*.
> **A errada**: DynamoDB não tem read replica; e réplica de leitura não aceitaria escrita.
> **D errada**: Aurora Global Database tem **1 primária escrevendo**.

> [!question]- Q5. Depois de habilitar TTL, os itens expirados continuam aparecendo nas consultas.
> **A)** O TTL não funcionou
> **B)** **É esperado: a exclusão ocorre "within a few days"; use filter expressions para remover expirados de Scan e Query** ✅
> **C)** Falta habilitar Streams
> **D)** O atributo precisa ser String
>
> **Por que B**: é comportamento documentado.
> **D errada**: o atributo precisa ser **Number** em epoch de segundos — atributo de outro tipo é **ignorado** pelo TTL.

> [!question]- Q6. Um relatório precisa agregar e fazer busca textual sobre 2 anos de dados da tabela.
> **A)** Scan com FilterExpression
> **B)** **Streams → Lambda → OpenSearch (busca) ou Redshift/Athena (analítico)** ✅
> **C)** GSI com projeção ALL
> **D)** PITR
>
> **Por que B**: DynamoDB não faz agregação nem busca textual; o padrão é materializar num serviço adequado.
> **A errada**: Scan lê tudo e você paga por tudo.

> [!question]- Q7. Precisa adicionar um índice com **leitura fortemente consistente** num sort key alternativo, numa tabela que já existe.
> **A)** Criar um LSI
> **B)** **Não é possível: LSI só na criação da tabela. Alternativas: GSI (eventual) ou recriar a tabela** ✅
> **C)** Criar um GSI com consistência forte
> **D)** Habilitar DAX
>
> **Por que B**: *"Local secondary indexes are created at the same time that you create a table"*, e *"Queries on global secondary indexes support eventual consistency only"*.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| 1 RCU = 1 leitura | 1 leitura **forte** de 4 KB **ou 2 eventuais** |
| O padrão da API é leitura forte | O padrão é **eventual** |
| Posso adicionar LSI depois | **Não.** Só **GSI** |
| GSI faz leitura forte | *"eventual consistency only"* |
| GSI consome capacidade da tabela | Tem capacidade **própria**. **LSI** é que consome |
| GSI devolve atributo não projetado | **Não.** **LSI** busca na tabela |
| `FilterExpression` economiza RCU | É aplicado **depois** da leitura |
| LSI não tem limite de tamanho | **10 GB** por valor de partition key |
| PITR restaura no lugar | *"always restores to a new table"* |
| PITR de 35 dias custa mais que de 7 | O preço vem do **tamanho** da tabela |
| TTL apaga na hora | *"within a few days"* — filtre os expirados |
| Global Tables é ativo-passivo | É **multi-ativo** |
| Posso mudar MREC para MRSC depois | *"You cannot change a global table's consistency mode after creation"* |
| Item de 1 MB cabe | **400 KB** |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
