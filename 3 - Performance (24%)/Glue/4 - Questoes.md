---
tags: [saa-c03, glue, questoes]
servico: AWS Glue
atualizado: 2026-11-08
---

# Glue — Questões

> [!question] Q1. Um pipeline precisa converter CSV em Parquet particionado, diariamente, **sem gerenciar cluster**.
> **A)** EMR com Spark e cluster transiente
> **B)** AWS Glue job com trigger agendado
> **C)** Lambda com pandas
> **D)** Athena CTAS manual
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"serverless data integration service"* (serviço serverless de integração de dados) — ETL agendado sem cluster.
> > **A errada**: funciona, mas você gerencia o cluster (ainda que transiente).
> > **C errada**: Lambda tem teto de 15 min e 10 GB; não escala para ETL grande.
> > **D errada**: CTAS funciona, mas é manual e menos adequado para pipeline recorrente.

> [!question] Q2. Dados novos chegam ao S3 com schema que muda ao longo do tempo. Como manter o catálogo atualizado?
> **A)** Editar o DDL manualmente
> **B)** Glue crawler agendado
> **C)** Athena `MSCK REPAIR TABLE`
> **D)** Lake Formation
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"automatically infer schema information and integrate it into your AWS Glue Data Catalog"* (inferir automaticamente as informações de schema e integrá-las ao seu AWS Glue Data Catalog).
> > **C errada**: atualiza **partições**, não o schema.

> [!question] Q3. O time precisa de uma versão específica do **HBase** e de bibliotecas customizadas no cluster.
> **A)** Glue job com Ray
> **B)** Amazon EMR
> **C)** Glue Studio
> **D)** Athena Spark
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: EMR *"gives you full control over the configuration of your clusters and the software installed on them"* (dá a você controle total sobre a configuração dos clusters e sobre o software instalado neles), e roda HBase.
> > **A errada**: o Glue não dá controle do cluster nem instala HBase.

> [!question] Q4. Analistas de negócio precisam limpar e normalizar planilhas **sem escrever código**.
> **A)** Glue job em PySpark
> **B)** AWS Glue DataBrew
> **C)** Athena
> **D)** Glue crawler
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"A visual data preparation tool... without writing any code"* (uma ferramenta visual de preparação de dados... sem escrever código).

> [!question] Q5. Athena, Redshift Spectrum e EMR precisam compartilhar a **mesma** definição de tabelas.
> **A)** Um bucket de metadados em JSON
> **B)** AWS Glue Data Catalog
> **C)** Lake Formation
> **D)** DynamoDB como metastore
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é o catálogo que os três consomem.
> > **C errada**: Lake Formation é a **camada de autorização** sobre o catálogo, não o catálogo.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Glue e EMR fazem o mesmo | Glue é **serverless**; EMR dá **controle do cluster** e frameworks específicos |
| Lake Formation substitui o Glue Data Catalog | É a **camada de autorização** sobre ele |
| Crawler atualiza só partições | Infere **schema** e registra partições |
| `MSCK REPAIR` atualiza o schema | Atualiza **partições** |
| Glue só faz batch | Há **streaming ETL** (*"transform streaming data in transit"* (transformar dados de streaming em trânsito)) |
| Glue não tem interface gráfica | **Glue Studio** (jobs) e **DataBrew** (preparação visual) |
| Glue cobra por TB | Cobra por **DPU-hora** |
| EMR não usa o catálogo do Glue | **Pode** usá-lo como metastore |

## Links

- [[3 - Performance (24%)/Glue/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/Glue/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/Glue/3 - Detalhes|3 - Detalhes]]
