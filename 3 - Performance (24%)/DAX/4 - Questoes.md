---
tags: [saa-c03, dax, questoes]
servico: Amazon DynamoDB Accelerator (DAX)
atualizado: 2026-11-08
---

# DAX — Questões

> [!question]- Q1. Uma tabela atende leitura intensa de itens individuais em milissegundos, mas o time precisa de **microssegundos** sem mudar o modelo de dados.
> **A)** Aumentar as RCUs
> **B)** **Adicionar um cluster DAX na frente da tabela** ✅
> **C)** ElastiCache for Redis como cache-aside
> **D)** Global Tables
>
> **Por que B**: é o cache nativo do DynamoDB, com **API compatível** (mudança mínima) e write-through.
> **A errada**: RCU resolve **throughput**, não latência.
> **C errada**: funciona, mas você implementa cache-aside, invalidação e serialização à mão.
> **D errada**: Global Tables resolve **geografia**, não latência local.
> ⚠️ E a ressalva: se a aplicação exigir **leitura forte**, o DAX **não** ajuda.

> [!question]- Q2. A aplicação exige leitura **fortemente consistente**. O DAX reduz a latência?
> **A)** Sim, para todas as leituras
> **B)** **Não: leitura forte passa direto para o DynamoDB e não é cacheada** ✅
> **C)** Sim, se o TTL for zero
> **D)** Sim, com réplicas de leitura no cluster
>
> **Por que B**: *"DAX passes the request through to DynamoDB. The results from DynamoDB are not cached in DAX."* (o DAX repassa a requisição ao DynamoDB, e os resultados vindos do DynamoDB não são armazenados em cache no DAX)

> [!question]- Q3. Depois de uma escrita, uma consulta `Query` pelo DAX devolve o resultado antigo.
> **A)** O write-through falhou
> **B)** **O query cache guarda o conjunto de resultados e não é invalidado pela escrita; reduza o TTL do query cache (ou desative com zero)** ✅
> **C)** Falta habilitar Streams
> **D)** O item cache está cheio
>
> **Por que B**: write-through atualiza o **item cache**; o **query cache** guarda resultados de consulta e expira por TTL.

> [!question]- Q4. Uma função Lambda precisa usar o DAX. O que é necessário?
> **A)** Nada, o DAX é público
> **B)** **A Lambda precisa estar na VPC, com security group liberando o cluster DAX** ✅
> **C)** Um gateway endpoint para o DAX
> **D)** Um NAT gateway
>
> **Por que B**: o DAX é *"designed to run within an Amazon Virtual Private Cloud"* (projetado para rodar dentro de uma Amazon Virtual Private Cloud) — é alcançável só de dentro da VPC.
> **C errada**: gateway endpoint existe só para **S3 e DynamoDB**.

> [!question]- Q5. Carga de **escrita intensa** com pouca leitura. DAX ajuda?
> **A)** Sim, write-through acelera a escrita
> **B)** **Não: o write-through adiciona um hop de latência na escrita, e há pouca leitura para se beneficiar do cache** ✅
> **C)** Sim, se o TTL for alto
> **D)** Sim, com mais réplicas
>
> **Por que B**: DAX é para carga **read-heavy**.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| DAX acelera leitura forte | **Passa direto** e **não cacheia** |
| DAX é fora da VPC | Roda **dentro** da VPC |
| DAX serve para RDS/Aurora | Só **DynamoDB**. Relacional = **ElastiCache** |
| Write-through invalida o query cache | Atualiza o **item cache**; o query cache expira por **TTL** |
| TTL do item cache é configurável sem limite | Padrão **5 min**; evicção **LRU** não é configurável |
| DAX substitui o DynamoDB | É uma **camada na frente** |
| DAX lida com CreateTable/UpdateTable | **Não** — APIs de gerenciamento vão direto ao DynamoDB |
| DAX acelera escrita | É para carga **read-heavy** |

## Links

- [[3 - Performance (24%)/DAX/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/DAX/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/DAX/3 - Detalhes|3 - Detalhes]]
