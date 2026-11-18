---
tags: [saa-c03, dax, detalhes]
servico: Amazon DynamoDB Accelerator (DAX)
atualizado: 2026-11-08
---

# DAX — Detalhes

## 1. Por que existe um cache só para o DynamoDB

O DynamoDB já entrega **milissegundos de único dígito**. Para a maioria das aplicações isso basta. O DAX existe para os casos em que **não basta**: leitura muito repetida dos mesmos itens, com requisito de latência ainda menor.

A vantagem sobre montar um cache genérico é a **compatibilidade de API**: você troca o endpoint e o cliente, e a aplicação continua chamando `GetItem` e `Query`. Com ElastiCache, você implementaria **cache-aside** à mão (ler do cache, em caso de miss ler do banco, gravar no cache, invalidar na escrita).

## 2. Os dois caches

**Item cache** guarda resultados de `GetItem` e `BatchGetItem`, com **TTL de 5 minutos** por padrão. Com TTL zero, os itens só saem por **LRU** ou quando uma escrita write-through os atualiza.

**Query cache** guarda resultados de `Query` e `Scan` — ou seja, o **conjunto de resultados**, não os itens individuais. O TTL é definido na criação do cluster, e **zero desativa** esse cache.

A evicção é **LRU** nos dois e *"not user-configurable"* (não é configurável pelo usuário).

⚠️ Consequência do query cache: uma escrita que deveria alterar o resultado de uma Query **não invalida** o query cache automaticamente. Quem depende de resultados de Query sempre frescos precisa de TTL curto — ou não usar o query cache.

## 3. Write-through — e o que isso implica

As escritas passam pelo DAX, que grava na tabela **e** no cache: *"The operation is successful only if the data is successfully written to both the table and to DAX."* (a operação só é bem-sucedida se o dado for gravado com sucesso tanto na tabela quanto no DAX)

Vantagem: o cache fica **consistente** com a tabela para os itens escritos por ali.
Custo: a escrita ganha um **hop** adicional de latência.

Por isso o DAX é para carga **read-heavy**. Em carga de escrita intensa com pouca leitura, ele adiciona latência sem ganho.

## 4. A limitação que mais cai: leitura forte

> *"DAX passes the request through to DynamoDB. The results from DynamoDB are not cached in DAX."* (o DAX repassa a requisição ao DynamoDB, e os resultados vindos do DynamoDB não são armazenados em cache no DAX)

Se a aplicação faz leitura **fortemente consistente**, o DAX não ajuda **nada** — a requisição vai direto ao DynamoDB.

Isso significa que "adicionar DAX" só resolve latência se a aplicação tolerar **leitura eventualmente consistente**. É a pegadinha central do tema: a alternativa oferece DAX para uma aplicação que o enunciado diz exigir consistência forte.

## 5. Arquitetura

O DAX é um **cluster** de nós **dentro da VPC** (*"designed to run within an Amazon Virtual Private Cloud"* (projetado para rodar dentro de uma Amazon Virtual Private Cloud)), com:

- **Nó primário** (escritas) e **réplicas de leitura**
- Distribuição entre **AZs** para disponibilidade
- **Security group** próprio (é ENI na sua subnet)
- **Subnet group** definindo onde os nós ficam
- IAM para autorização

Como está na VPC, uma **Lambda** que use DAX precisa estar **na VPC** também — o que traz as implicações de ENI e de acesso à internet (NAT ou endpoints).

O DAX **não** lida com APIs de gerenciamento de tabela: `CreateTable`, `UpdateTable` e afins continuam indo direto ao DynamoDB.

## 6. DAX × ElastiCache × cache do API Gateway

| Pergunta | Serviço |
|---|---|
| Acelerar leitura do **DynamoDB** com mudança mínima | **DAX** |
| Acelerar leitura de **RDS/Aurora** | **ElastiCache** |
| Guardar **sessão**, leaderboard, pub/sub | **ElastiCache for Redis** |
| Cachear **resposta da API** | **cache do API Gateway** (por stage, só REST) |
| Cachear **conteúdo na borda** | **CloudFront** |

## Links

- [[3 - Performance (24%)/DAX/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/DAX/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/DAX/4 - Questoes|4 - Questoes]]
- [[3 - Performance (24%)/DynamoDB/1 - O que e|DynamoDB]] · [[3 - Performance (24%)/ElastiCache/1 - O que e|ElastiCache]] · [[1 - Seguranca (30%)/VPC/1 - O que e|VPC]] · [[2 - Resiliencia (26%)/Lambda/1 - O que e|Lambda]] · [[2 - Resiliencia (26%)/API Gateway/1 - O que e|API Gateway]] · [[3 - Performance (24%)/CloudFront/1 - O que e|CloudFront]]
