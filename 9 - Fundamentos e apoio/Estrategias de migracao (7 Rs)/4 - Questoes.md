---
tags: [saa-c03, migracao, 7rs, questoes]
conceito: Estratégias de migração (7 Rs)
atualizado: 2026-11-08
---

# 7 Rs — Questões

> [!question] Q1. O data center fecha em **3 meses** e a equipe **não pode alterar as aplicações**.
> **A)** Refactor para serverless
> **B)** Rehost (lift and shift) com o AWS Application Migration Service
> **C)** Replatform de tudo para serviços gerenciados
> **D)** Repurchase por equivalentes SaaS
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: prazo curto + nenhuma mudança de código = **rehost**. O MGN replica os servidores em nível de bloco com cutover de minutos.
> > **A e C erradas**: exigem tempo e alterações que o enunciado proíbe.

> [!question] Q2. A empresa quer **manter o mesmo engine MySQL e o código da aplicação**, mas **parar de administrar backup, patch e failover do banco**.
> **A)** Rehost: MySQL numa instância EC2
> **B)** Replatform: migrar para o Amazon RDS for MySQL
> **C)** Refactor: migrar para o DynamoDB
> **D)** Retain
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é a definição de **replatform** — pouca ou nenhuma mudança no código, plataforma gerenciada. A combinação *"sem reescrever"* + *"reduzir sobrecarga operacional"* é a assinatura dele.
> > **A errada**: continuaria administrando tudo.
> > **C errada**: DynamoDB mudaria o modelo de dados e exigiria reescrever a aplicação.

> [!question] Q3. Migrar um banco **Oracle** on-premises para **Aurora PostgreSQL** com **downtime mínimo**.
> **A)** Só DMS
> **B)** Só SCT
> **C)** SCT para converter o schema e o código, e DMS com CDC para os dados
> **D)** Snowball Edge
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: é migração **heterogênea** — engines diferentes. **SCT = schema**, **DMS = dados**, e o **CDC** mantém a sincronia durante a migração, permitindo um cutover curto.
> > **A errada**: o DMS não converte procedures, views e funções entre engines diferentes.

> [!question] Q4. Um sistema interno de relatórios **não é acessado por ninguém** há mais de um ano.
> **A)** Rehost, por segurança
> **B)** Retain
> **C)** Retire
> **D)** Replatform
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: é o R de **maior retorno** — custo e esforço zero. O **Application Discovery Service** é o que revela esses casos no inventário.

> [!question] Q5. A empresa quer **aproveitar ao máximo os recursos nativos da nuvem**, com **escala para zero** fora do horário comercial, e **aceita reescrever** a aplicação.
> **A)** Rehost
> **B)** Replatform para Elastic Beanstalk
> **C)** Refactor para Lambda + API Gateway + DynamoDB
> **D)** Relocate para VMware Cloud on AWS
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: *"máximo dos recursos nativos"* + *"escala para zero"* + *"aceita reescrever"* = **refactor**. É o único R que entrega custo **por invocação**.
> > **B errada**: Beanstalk reduz operação, mas as instâncias continuam ligadas.

> [!question] Q6. Migrar **600 TB** de arquivos. A banda disponível é de **500 Mbps** e o prazo é de **2 semanas**.
> **A)** DataSync pela internet
> **B)** Transferência offline da Snow Family
> **C)** S3 Transfer Acceleration
> **D)** Direct Connect novo
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: 600 TB a 500 Mbps levaria **mais de 100 dias** — muito além do prazo. Quando o tempo pela rede excede o prazo, a resposta é **offline**.
> > **D errada**: provisionar um Direct Connect leva semanas e, mesmo a 1 Gbps, não cabe em 2 semanas.
> > ⚠️ Saiba que o **Snowball Edge** não está mais disponível para novos clientes e o suporte termina em **31/12/2026** — a AWS aponta para **DataSync**, **Data Transfer Terminal** ou **Outposts**.

> [!question] Q7. A aplicação depende de um **appliance de hardware** que não tem equivalente na nuvem, e o contrato dele vai até 2029.
> **A)** Refactor para remover a dependência
> **B)** Retain, com Direct Connect para integrar o que já está na AWS
> **C)** Rehost
> **D)** Retire
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: **retain** é uma decisão legítima, não uma falha de planejamento. O Direct Connect (ou o Outposts) permite conviver.

> [!question] Q8. Qual a diferença entre **rehost** e **relocate**?
> **A)** São sinônimos
> **B)** No rehost a VM se torna uma instância EC2; no relocate a infraestrutura de virtualização vai junto (ex.: VMware Cloud on AWS), sem mudar operação nem comprar hardware
> **C)** Relocate exige mudança de código
> **D)** Rehost só funciona para Windows
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: nenhum dos dois muda o **código** — a diferença está em **o que acontece com a plataforma de virtualização**.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| São 6 Rs | **Sete**: Retire, Retain, Rehost, **Relocate**, Repurchase, Replatform, Refactor |
| Refactor é sempre a melhor resposta | É o **mais caro e demorado**; só quando o enunciado permite reescrever |
| Rehost aproveita a nuvem | É o que **menos** aproveita — leva os desperdícios junto |
| DMS converte o schema | **DMS = dados**; **SCT = schema** (só em migração heterogênea) |
| Retain é erro de planejamento | É uma **decisão válida** (licença, hardware, aposentadoria próxima) |
| Replatform exige reescrever | É *"lift, tinker and shift"* (levantar, ajustar um pouco e mover) — mudança **mínima** |
| DataSync serve para qualquer volume | Se o tempo pela rede estoura o prazo → **offline (Snow)** |
| Snowball é a resposta moderna para bulk | **Indisponível para novos clientes**, suporte até **31/12/2026** |
| Migration Hub migra os dados | É o **painel** de acompanhamento; quem migra é MGN/DMS/DataSync |

## Links

- [[9 - Fundamentos e apoio/Estrategias de migracao (7 Rs)/1 - O que e|1 - O que e]] · [[9 - Fundamentos e apoio/Estrategias de migracao (7 Rs)/2 - Decorar|2 - Decorar]] · [[9 - Fundamentos e apoio/Estrategias de migracao (7 Rs)/3 - Detalhes|3 - Detalhes]]
