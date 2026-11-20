---
servico: S3 Glacier
fonte: "[[3 - Performance (24%)/S3 Glacier/2 - Decorar|2 - Decorar]]"
---

# S3 Glacier — Flashcards

#flashcards/saa-c03/d3-performance/s3-glacier

Tempos de restore Expedited, Standard e Bulk no Glacier Flexible Retrieval?::Expedited **1-5 min**; Standard **3-5 h**; Bulk **5-12 h**

Tempos de restore Standard e Bulk no Glacier Deep Archive?::Standard **até 12 h**; Bulk **até 48 h**

Qual tier de restore não existe no Deep Archive?::**Expedited**

Tier de restore usado quando nenhum é especificado?::**Standard**

Onde o restore Bulk é grátis?::No **Glacier Flexible Retrieval** e no **Intelligent-Tiering**

O que garante uma unidade de provisioned capacity do Glacier?::Pelo menos **3 recuperações Expedited a cada 5 min** e até **300 MB/s**

Risco de usar Expedited sem provisioned capacity?::A requisição pode **não ser aceita** em períodos de alta demanda

Quem deve comprar a provisioned capacity: o dono do bucket ou quem faz o restore?::**Quem faz a requisição** (as unidades são da conta)

Duração mínima do Glacier IR, Flexible Retrieval e Deep Archive?::IR e FR **90 dias**; Deep Archive **180 dias**

Overhead por objeto no Glacier Flexible Retrieval e Deep Archive?::**40 KB**: 32 KB na taxa do Glacier + 8 KB na do S3 Standard

Por que arquivar milhões de objetos pequenos no Deep Archive pode não compensar?::O **overhead de 40 KB** por objeto pode custar mais que o próprio dado

Para onde o Glacier Flexible Retrieval pode transicionar por lifecycle?::**Só para Deep Archive**

Qual classe não transiciona para Glacier Instant Retrieval?::**One Zone-IA**

Objeto em Glacier IR desde o dia 4: a partir de quando pode ir para Deep Archive?::Dia **94** (respeita o mínimo de 90 dias)

Taxa de requisições e throughput de restore por conta no Glacier?::**1.000 transações/s**; até **1-2 PB por dia**
