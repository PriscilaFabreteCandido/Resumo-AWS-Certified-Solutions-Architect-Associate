---
tags: [saa-c03, bancos-especializados, questoes]
servico: Bancos especializados
atualizado: 2026-11-08
---

# Bancos especializados — Questões

> [!question]- Q1. Identificar conexões suspeitas entre contas, dispositivos e endereços, percorrendo até 5 níveis de relacionamento, com baixa latência.
> **A)** RDS PostgreSQL com CTEs recursivas
> **B)** DynamoDB com GSI
> **C)** **Amazon Neptune** ✅
> **D)** Redshift
>
> **Por que C**: percorrer arestas é a operação nativa de um banco de **grafo**.
> **A errada**: funciona, mas o custo cresce exponencialmente com a profundidade.
> **B errada**: DynamoDB não percorre grafo.
> **D errada**: Redshift é analítico, não baixa latência transacional.

> [!question]- Q2. Armazenar métricas de 50.000 sensores, consultadas por janela de tempo, com dados recentes acessados muito mais que os antigos.
> **A)** RDS PostgreSQL com índice no timestamp
> **B)** **Amazon Timestream** ✅
> **C)** DynamoDB com sort key de timestamp
> **D)** S3 com Athena
>
> **Por que B**: série temporal é o caso de uso — storage em camadas e funções de série temporal nativas. O guia cita *"time series format"* em Task 4.3.
> **A errada**: relacional genérico fica caro e lento nesse volume.
> **C errada**: é um padrão real, mas sem compressão de série temporal nem funções de janela.
> **D errada**: bom para análise em lote, não para consulta operacional.

> [!question]- Q3. Migrar uma aplicação que usa **MongoDB** para a AWS, sem reescrever o código de acesso a dados.
> **A)** DynamoDB
> **B)** **Amazon DocumentDB** ✅
> **C)** RDS PostgreSQL com JSONB
> **D)** Keyspaces
>
> **Por que B**: compatível com a **API do MongoDB** — drivers e queries continuam funcionando.
> **A errada**: DynamoDB tem API própria; exigiria reescrever.
> **D errada**: Keyspaces é **Cassandra**.

> [!question]- Q4. Uma aplicação usa **Cassandra** e o time não quer mais gerenciar o cluster.
> **A)** Cassandra em EC2 com Auto Scaling
> **B)** DocumentDB
> **C)** **Amazon Keyspaces** ✅
> **D)** DynamoDB
>
> **Por que C**: compatível com **CQL**, e serverless — elimina anéis, compaction e reparo.
> **A errada**: mantém todo o esforço operacional.
> **D errada**: resolveria o modelo, mas exigiria reescrever a camada de acesso.

> [!question]- Q5. Uma aplicação **nova** precisa guardar documentos JSON, com escala imprevisível e menor esforço operacional.
> **A)** DocumentDB
> **B)** **DynamoDB** ✅
> **C)** RDS com JSONB
> **D)** Neptune
>
> **Por que B**: aplicação **nova** não tem restrição de API — DynamoDB é serverless, escala sozinho e sai mais barato.
> **A errada**: DocumentDB existe para quem **já tem** MongoDB; aqui adiciona cluster para gerenciar.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| DocumentDB é "DynamoDB para documento" | Existe para compatibilidade com **MongoDB**; para app **nova**, DynamoDB |
| Keyspaces é DynamoDB com outro nome | É compatível com **Cassandra/CQL** |
| Neptune serve para analítico | É **grafo**, transacional. Analítico = Redshift |
| Timestream é só IoT | É **qualquer série temporal** (métricas de app, telemetria, DevOps) |
| Série temporal cabe bem no RDS | Volume de escrita e consulta por janela fazem o relacionamento genérico custar caro |
| Grafo se resolve com self-join | Custo exponencial com a profundidade |
| Esses bancos estão fora de escopo | **Todos** estão na lista oficial de serviços em escopo (categoria Database) |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
