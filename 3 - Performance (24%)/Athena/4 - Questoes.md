---
tags: [saa-c03, athena, questoes]
servico: Amazon Athena
atualizado: 2026-11-08
---

# Athena — Questões

> [!question]- Q1. Logs em CSV no S3 somam 3 TB/mês e são consultados ad-hoc com SQL. A conta do Athena está alta. O que reduz o custo com o menor esforço?
> **A)** Migrar para Redshift
> **B)** **Converter para Parquet comprimido e particionar por data** ✅
> **C)** Usar EMR com Spark
> **D)** Reduzir a retenção dos logs
>
> **Por que B**: a cobrança é por **TB escaneado**. No exemplo oficial, 3 TB de texto (US$ 15) vira **US$ 1,25** em Parquet lendo uma coluna — e a partição reduz outra ordem de magnitude.
> **A errada**: traz cluster e custo fixo para consulta **ad-hoc**.
> **C errada**: mais esforço operacional, não menos.
> **D errada**: perde dado — é redução de escopo, não otimização.

> [!question]- Q2. Consultar os logs do CloudTrail e do VPC Flow Logs que já estão no S3, pontualmente, sem provisionar nada.
> **A)** Redshift com COPY
> **B)** **Athena** ✅
> **C)** OpenSearch Service
> **D)** EMR
>
> **Por que B**: *"analyze data directly in Amazon S3"* (analisar dados diretamente no Amazon S3), serverless, *"you pay only for the queries you run"*.
> **C errada**: OpenSearch é melhor para **busca textual** e dashboards contínuos — e exige domínio.

> [!question]- Q3. Uma tabela tem 100.000 partições e o `MSCK REPAIR TABLE` demora demais.
> **A)** Remover o particionamento
> **B)** **Usar partition projection** ✅
> **C)** Migrar para Redshift Spectrum
> **D)** Aumentar o workgroup
>
> **Por que B**: a partition projection calcula os prefixos a partir de um **padrão**, sem consultar o catálogo — *"can significantly reduce query runtimes"* (pode reduzir significativamente o tempo de execução das consultas).

> [!question]- Q4. Analistas de um time devem ver apenas **algumas colunas** de uma tabela do data lake, e a restrição deve valer no Athena **e** no Redshift Spectrum.
> **A)** Bucket policy por prefixo
> **B)** **AWS Lake Formation com permissão em nível de coluna** ✅
> **C)** IAM policy com condição de tag
> **D)** Workgroup separado no Athena
>
> **Por que B**: o Lake Formation dá controle *"at the column, row, and cell-levels"*, respeitado por *"Amazon Athena, Amazon Quick, Amazon Redshift Spectrum, Amazon EMR, and AWS Glue"*.
> **A errada**: S3 controla objeto/prefixo, não coluna.

> [!question]- Q5. Limitar quanto cada equipe pode escanear por mês, com cobrança separada.
> **A)** IAM policy por usuário
> **B)** **Workgroups do Athena, com limite de dados escaneados** ✅
> **C)** AWS Budgets
> **D)** Capacity Reservations
>
> **Por que B**: workgroups isolam equipes, aplicam limite de escaneamento e separam a cobrança.
> **C errada**: Budgets **alerta**, não limita a query.

> [!question]- Q6. A equipe quer custo **previsível** para o Athena, em vez de pagar por TB.
> **A)** Workgroups
> **B)** **Capacity Reservations (US$ 0,30 por DPU-hora)** ✅
> **C)** Query result reuse
> **D)** Partition projection
>
> **Por que B**: reserva capacidade dedicada, cobrada por DPU-hora em vez de por TB escaneado.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Athena precisa carregar os dados | Consulta o **S3 direto** |
| Athena cobra por consulta | Cobra por **TB escaneado** |
| Athena cobra storage | *"no additional storage charges"* — o storage é do S3 |
| Compressão basta para otimizar | **Parquet + partição** vai muito além (US$ 15 → US$ 1,25) |
| Athena e Redshift são intercambiáveis | Athena = **ad-hoc serverless**; Redshift = **warehouse** com joins e concorrência |
| Spectrum dispensa cluster | É **feature do Redshift** |
| `FilterExpression`/`WHERE` sempre reduz o escaneamento | Só se a coluna for **partição** (ou o formato for colunar) |
| Athena não respeita Lake Formation | **Respeita** — está na lista oficial |
| Consulta federada cobra igual | Tem **mínimo de 10 MB por consulta** |

## Links

- [[3 - Performance (24%)/Athena/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/Athena/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/Athena/3 - Detalhes|3 - Detalhes]]
