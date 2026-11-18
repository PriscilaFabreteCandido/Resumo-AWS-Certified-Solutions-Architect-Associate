---
tags: [saa-c03, athena, detalhes]
servico: Amazon Athena
atualizado: 2026-11-08
---

# Athena — Detalhes

## 1. O modelo que muda tudo: pagar por escaneamento

O Athena não tem cluster. Você define uma **tabela** (metadado no Glue Data Catalog) que aponta para um prefixo no S3, e consulta com SQL. A cobrança é por **TB escaneado**.

Consequência: **otimizar a query é otimizar o custo**. Não existe "o cluster já está pago, então a query é grátis" — cada consulta ruim custa dinheiro.

As três alavancas, com os números do exemplo oficial (3 TB, US$ 5/TB):

| Otimização | Escaneado | Custo | Redução |
|---|---|---|---|
| Nada (texto) | 3 TB | **US$ 15** | — |
| **GZIP 3:1** | 1 TB | **US$ 5** | 67% |
| **Parquet 3:1 + 1 de 4 colunas** | 0,25 TB | **US$ 1,25** | **92%** |

E a quarta, multiplicativa: **particionamento**. Com partição por data e `WHERE dt='2026-11-01'`, *"Athena scans the data only from that partition"* — o que pode reduzir outra ordem de magnitude.

É por isso que o guia pede, em **Task 3.5**: *"Transforming data between formats (for example, .csv to .parquet)"* (transformar dados entre formatos (por exemplo, de .csv para .parquet)).

## 2. Particionamento e partition projection

**Particionamento** organiza o S3 em prefixos que viram colunas virtuais:

```
s3://bucket/logs/year=2026/month=11/day=01/arquivo.parquet
```

Com `WHERE year=2026 AND month=11`, o Athena lê **só** aquele prefixo.

Quando há **muitas** partições, descobri-las (via `MSCK REPAIR TABLE` ou crawler) fica lento. Aí entra a **partition projection**: você descreve o **padrão** das partições (faixa de datas, lista de valores) e o Athena calcula os prefixos sem consultar o catálogo — *"can significantly reduce query runtimes"* (pode reduzir significativamente o tempo de execução das consultas).

## 3. O catálogo compartilhado

> *"Athena integrates with the AWS Glue Data Catalog."*

Esse catálogo é o mesmo usado por **Redshift Spectrum**, **EMR** e **Glue** — então **um** metadado serve o data lake inteiro. Os **crawlers** do Glue descobrem o schema e as partições automaticamente.

E as permissões: **Lake Formation** aplica controle fino (coluna, linha, célula) que o Athena **respeita** — a lista oficial de engines que o respeitam é *"Amazon Athena, Amazon Quick, Amazon Redshift Spectrum, Amazon EMR, and AWS Glue"*.

## 4. Athena × Redshift × EMR × Spectrum

| Critério | **Athena** | **Redshift** | **EMR** | **Spectrum** |
|---|---|---|---|---|
| Infraestrutura | **Nenhuma** | Cluster (ou Serverless) | Cluster | **Precisa do Redshift** |
| Cobrança | **TB escaneado** | Nós (ou RPU) | Instâncias | Do Redshift + TB |
| Melhor para | **Ad-hoc**, exploração, eventual | BI recorrente, joins, concorrência | **Código** Spark/Hadoop | Alcançar o S3 do Redshift |
| Esforço | **Mínimo** | Médio | Alto | Médio |

A doc do EMR ajuda a separar: use EMR *"if you use custom code to process and analyze extremely large datasets with the latest big data processing frameworks such as Spark, Hadoop, Presto, or Hbase"*. E: *"Amazon Athena supports many of the same data formats as Amazon EMR"* (o Amazon Athena oferece suporte a muitos dos mesmos formatos de dados do Amazon EMR) — Athena pode consultar o que o EMR processou.

## 5. Casos de uso canônicos

| Caso | Por quê |
|---|---|
| Consultar **logs** (ALB, CloudFront, VPC Flow, CloudTrail) no S3 | Já estão no S3; Athena consulta sem mover |
| Consultar o **CUR** (Cost and Usage Report) | O CUR é entregue no S3 e a doc indica integração com Athena |
| Explorar um **data lake** antes de modelar | Sem provisionar nada |
| Validar dados depois de um ETL do **Glue** | SQL direto no resultado |
| Consulta **eventual** sobre dado arquivado | Mais barato que manter cluster |

## 6. Recursos adicionais

| Recurso | Detalhe |
|---|---|
| **Workgroups** | Isolam equipes, com limites de dados escaneados e cobrança separada |
| **Query result reuse** | Reaproveita resultado recente, sem reescanear |
| **Apache Spark no Athena** | Notebooks Spark serverless (**US$ 0,35 por DPU-hora**) |
| **Capacity Reservations** | Capacidade dedicada (**US$ 0,30 por DPU-hora**) em vez de por TB |
| **Federated query** | Consulta fontes fora do S3 (RDS, DynamoDB) via conectores Lambda — cobrada por TB, com **mínimo de 10 MB por consulta** |
| **CTAS** | `CREATE TABLE AS SELECT` para materializar em Parquet particionado |

## Links

- [[3 - Performance (24%)/Athena/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/Athena/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/Athena/4 - Questoes|4 - Questoes]]
- [[3 - Performance (24%)/Glue/1 - O que e|Glue]] · [[3 - Performance (24%)/Lake Formation/1 - O que e|Lake Formation]] · [[3 - Performance (24%)/Redshift/1 - O que e|Redshift]] · [[3 - Performance (24%)/EMR/1 - O que e|EMR]] · [[3 - Performance (24%)/S3/1 - O que e|S3]] · [[3 - Performance (24%)/Kinesis Data Firehose/1 - O que e|Kinesis Data Firehose]] · [[4 - Custo (20%)/Ferramentas de custo (Cost Explorer, Budgets, CUR)/1 - O que e|Ferramentas de custo (Cost Explorer, Budgets, CUR)]]
