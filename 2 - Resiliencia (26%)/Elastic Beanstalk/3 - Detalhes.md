---
tags: [saa-c03, beanstalk, detalhes]
servico: AWS Elastic Beanstalk
atualizado: 2026-11-08
---

# Elastic Beanstalk — Detalhes

## 1. Onde ele se encaixa no espectro

```
Mais controle ◄───────────────────────────────────► Menos esforço operacional

EC2 na mão   ECS no EC2   Beanstalk   ECS/EKS Fargate   Lambda
```

O Beanstalk fica no meio: você não dimensiona nem patcheia a plataforma, mas **mantém acesso** aos recursos (pode entrar na instância, ver o ASG, ajustar o ELB).

É a escolha quando a aplicação é **web tradicional** e o time quer entregar código sem montar a infraestrutura — sem adotar containers ou serverless.

## 2. As políticas de deploy em detalhe

**All at once** — atualiza todas as instâncias de uma vez. Rápido, sem custo extra, mas com **downtime**. Se falhar, o rollback é um novo deploy (lento). Só para dev/teste.

**Rolling** — atualiza em lotes. Sem downtime, mas a **capacidade cai** durante o deploy (um lote fora de serviço por vez). Se falhar no meio, o ambiente fica com versões mistas.

**Rolling with additional batch** — igual ao rolling, mas **sobe um lote extra** antes de começar, mantendo a capacidade total. Custo: instâncias extras durante o deploy.

**Immutable** — sobe uma **fleet nova completa** com a versão nova, valida, e só então move o tráfego e desliga a antiga. Zero downtime, **rollback rápido** (descarta a fleet nova), ao custo de dobrar as instâncias temporariamente. É a política mais segura.

**Traffic splitting** — como immutable, mas envia uma **porcentagem** do tráfego para a fleet nova (canary) antes de completar. Permite avaliar com tráfego real.

**Blue/green** — não é política, é procedimento: ambiente novo + **swap de CNAME**. Dá o rollback mais rápido de todos (swap de volta) e permite validar o ambiente inteiro, inclusive mudanças de plataforma e de configuração que uma política de deploy não cobre.

## 3. Worker environment

Para processamento assíncrono, o Beanstalk cria um **worker environment**: ele provisiona uma **fila SQS**, roda um daemon (`sqsd`) nas instâncias que lê a fila e entrega as mensagens à aplicação por HTTP local.

É o padrão desacoplado pronto: **web environment** recebe a requisição e publica na fila; **worker environment** processa e escala pela profundidade da fila.

## 4. Configuração com `.ebextensions`

Arquivos `.config` no diretório `.ebextensions/` do código permitem:

- Definir opções do environment (tipo de instância, variáveis, health check)
- Criar **recursos adicionais** (uma fila, uma tabela, um alarme) via sintaxe CloudFormation
- Rodar comandos no deploy

É o mecanismo para o que a console não expõe — e a razão pela qual o Beanstalk não é uma caixa-preta.

## 5. Banco de dados: dentro ou fora

| Onde | Consequência |
|---|---|
| **Dentro** do environment | Criado e gerenciado junto. ⚠️ **Apagar o environment apaga o banco** |
| **Fora** (RDS separado) | Sobrevive ao ciclo de vida do environment; endpoint passado por **variável de ambiente** |

Para produção, **sempre fora**. É pergunta direta de prova.

## 6. Beanstalk × as alternativas

| Enunciado | Resposta |
|---|---|
| App web tradicional, foco no código, menor esforço | **Beanstalk** |
| Orientado a evento, curto | **Lambda** |
| Container sem gerenciar servidor | **ECS/EKS + Fargate** |
| Precisa de controle fino (kernel, GPU, daemon) | **EC2** / **ECS no EC2** |
| Templates self-service para times de plataforma | **AWS Proton** |
| Catálogo de produtos aprovados | **Service Catalog** |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[EC2]] · [[Auto Scaling (EC2)]] · [[ELB (Load Balancers)]] · [[SQS]] · [[CloudFormation]] · [[RDS]]
