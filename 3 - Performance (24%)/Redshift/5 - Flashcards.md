---
servico: Amazon Redshift
fonte: "[[3 - Performance (24%)/Redshift/2 - Decorar|2 - Decorar]]"
---

# Redshift — Flashcards

#flashcards/saa-c03/d3-performance/redshift

Natureza do Redshift e em que é baseado?::**OLAP**, colunar, baseado em **PostgreSQL**

Quando o Redshift tem leader node?::Quando há **2 ou mais** compute nodes

Em que os compute nodes do Redshift são divididos?::**Node slices**

Onde o Redshift Managed Storage guarda os dados?::No **S3**, com cache local em SSD (compute e storage escalam separados)

O que o Redshift Spectrum faz?::Consulta arquivos no **S3 sem carregar** em tabelas do Redshift

Onde o Spectrum roda num cluster RA3?::Numa **frota dedicada fora do cluster**

Catálogos que o Redshift Spectrum pode usar?::**Glue Data Catalog**, catálogo do Athena ou Hive metastore próprio

Limitação do Spectrum em tabelas externas?::**Não** suporta **update**

O que o concurrency scaling faz?::Adiciona capacidade automática para picos de consultas de **leitura e escrita**, em vez de enfileirar

Como o concurrency scaling é cobrado?::Só pelo tempo **executando consultas**

Onde se configura o concurrency scaling?::Por fila do **WLM** (modo `auto`)

Quantos clusters de concurrency scaling há por padrão?::**Um** (`max_concurrency_scaling_clusters`)

Onde o concurrency scaling NÃO é suportado?::Cluster de **nó único**, interleaved sort keys, tabelas temporárias, UDFs Python e Lambda

Estilos de distribuição do Redshift?::**KEY, ALL, EVEN, AUTO**

Alavanca do Redshift que acelera filtro por faixa?::**Sort key** (ordem física dos dados)
