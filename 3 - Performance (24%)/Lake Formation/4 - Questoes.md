---
tags: [saa-c03, lake-formation, questoes]
servico: AWS Lake Formation
atualizado: 2026-11-08
---

# Lake Formation — Questões

> [!question]- Q1. Analistas de um time devem ver apenas **algumas colunas** de uma tabela do data lake, e a restrição deve valer no Athena **e** no Redshift Spectrum.
> **A)** Bucket policy por prefixo
> **B)** **AWS Lake Formation com permissão em nível de coluna** ✅
> **C)** IAM policy com condição de tag
> **D)** Criar uma cópia da tabela só com as colunas permitidas
>
> **Por que B**: *"granular controls at the column, row, and cell-levels"* (controles granulares nos níveis de coluna, linha e célula), respeitados por *"Amazon Athena, Amazon Quick, Amazon Redshift Spectrum, Amazon EMR, and AWS Glue"*.
> **A errada**: S3 controla **objeto/prefixo**, não coluna.
> **C errada**: IAM não entende schema de tabela.
> **D errada**: duplica storage, cria defasagem e multiplica manutenção.

> [!question]- Q2. Um data lake tem 3.000 tabelas e permissões concedidas uma a uma. Como escalar?
> **A)** Um role por tabela
> **B)** **LF-Tags (attribute-based access control), concedendo por tag** ✅
> **C)** Bucket policy por prefixo
> **D)** Um catálogo por domínio
>
> **Por que B**: marcar recursos e conceder por tag faz tabela nova **já nascer** com a permissão correta.

> [!question]- Q3. Qual destes **não** respeita as permissões do Lake Formation?
> **A)** Athena
> **B)** Redshift Spectrum
> **C)** EMR
> **D)** **OpenSearch Service** ✅
>
> **Por que D**: a lista oficial é *"Amazon Athena, Amazon Quick, Amazon Redshift Spectrum, Amazon EMR, and AWS Glue"*.

> [!question]- Q4. Depois de configurar o Lake Formation, usuários continuam lendo o dado completo direto do S3.
> **A)** Falta um crawler
> **B)** **O acesso direto ao bucket precisa ser restrito: o enforcement acontece nos engines, não no S3** ✅
> **C)** Falta habilitar o Glue
> **D)** Falta criptografia
>
> **Por que B**: a filtragem é aplicada pelo **engine de consulta**. Quem lê o objeto direto do S3 contorna o Lake Formation.
> ⚠️ O **hybrid access mode** existe justamente para a transição controlada.

> [!question]- Q5. Compartilhar tabelas do data lake com outra conta, mantendo permissão por coluna.
> **A)** Bucket policy cross-account
> **B)** **Lake Formation cross-account sharing** ✅
> **C)** AWS RAM compartilhando o bucket
> **D)** Copiar os dados para a outra conta
>
> **Por que B**: é o recurso nativo, preservando a granularidade.
> **A errada**: dá acesso ao objeto inteiro.

> [!question]- Q6. Descobrir se há **CPF** nas tabelas do data lake.
> **A)** Lake Formation
> **B)** **Amazon Macie** ✅
> **C)** AWS Config
> **D)** Glue crawler
>
> **Por que B**: Macie *"discovers sensitive data by using machine learning and pattern matching"* (descobre dados sensíveis usando machine learning e correspondência de padrões) nos buckets S3.
> **A errada**: Lake Formation **controla acesso**; não descobre conteúdo.
> **D errada**: o crawler infere **schema**, não classifica conteúdo.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Lake Formation substitui o IAM | *"augments the IAM permissions model"* (complementa o modelo de permissões do IAM) |
| Lake Formation substitui o Glue Data Catalog | É a **camada de autorização** sobre ele |
| Bucket policy consegue restringir coluna | **Não.** Só objeto/prefixo |
| OpenSearch respeita Lake Formation | **Não está** na lista de engines |
| O enforcement é no S3 | É nos **engines de consulta** — restrinja o acesso direto ao bucket |
| Lake Formation descobre dado sensível | Isso é **Macie** |
| Permissão é só por tabela | **Coluna, linha e célula**, e por **LF-Tag** |

## Links

- [[3 - Performance (24%)/Lake Formation/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/Lake Formation/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/Lake Formation/3 - Detalhes|3 - Detalhes]]
