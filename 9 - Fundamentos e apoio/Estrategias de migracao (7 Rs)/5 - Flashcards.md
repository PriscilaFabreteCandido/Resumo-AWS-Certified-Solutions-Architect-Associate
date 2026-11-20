---
servico: Estratégias de migração (7 Rs)
fonte: "[[9 - Fundamentos e apoio/Estrategias de migracao (7 Rs)/2 - Decorar|2 - Decorar]]"
---

# 7 Rs — Flashcards

#flashcards/saa-c03/fundamentos/estrategias-migracao

Quais são os 7 Rs de migração?::**Retire, Retain, Rehost, Relocate, Repurchase, Replatform, Refactor**

"Lift and shift", sem alterar a aplicação, o mais rápido possível: qual R?::**Rehost**

Serviço típico do Rehost?::**AWS Application Migration Service (MGN)** (também VM Import/Export)

Mover o ambiente VMware sem comprar hardware nem mudar operação: qual R?::**Relocate** (ex.: **VMware Cloud on AWS**)

Substituir pelo equivalente SaaS: qual R?::**Repurchase**

Manter o mesmo engine sem gerenciar servidores: qual R?::**Replatform** (ex.: **RDS/Aurora**, **DMS**)

Redesenhar para serverless/microsserviços: qual R?::**Refactor** (Lambda, API Gateway, DynamoDB, SQS/SNS...)

Aplicação que ninguém usa / obsoleta: qual R?::**Retire**

Depende de hardware/licença que não vai para a nuvem: qual R?::**Retain**

Qual R tem esforço alto e muda o código?::**Refactor**

DMS × SCT: o que cada um migra?::**DMS = dados**; **SCT = schema** (entre engines diferentes)

Petabytes sem rede suficiente: qual serviço?::**Snow Family** (Snowball Edge, Snowmobile)

Quais são as fases oficiais da migração?::**Assess → Mobilize → Migrate and modernize**

Ferramentas da fase Assess?::**Application Discovery Service** e **Migration Evaluator**

Qual serviço é o painel único para acompanhar a migração?::**Migration Hub**
