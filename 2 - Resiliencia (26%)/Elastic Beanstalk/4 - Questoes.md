---
tags: [saa-c03, beanstalk, questoes]
servico: AWS Elastic Beanstalk
atualizado: 2026-11-08
---

# Elastic Beanstalk — Questões

> [!question]- Q1. Deploy com **zero downtime** e **rollback rápido** se a versão nova falhar.
> **A)** All at once
> **B)** Rolling
> **C)** **Immutable** ✅
> **D)** Rolling with additional batch
>
> **Por que C**: sobe uma fleet nova completa e só move o tráfego depois de validar; o rollback descarta a fleet nova.
> **A errada**: tem **downtime**.
> **B errada**: sem downtime, mas com **capacidade reduzida** e versões mistas em caso de falha no meio.
> **D errada**: mantém a capacidade, mas o rollback ainda é um redeploy.
> ⚠️ **Blue/green com swap de CNAME** é igualmente válido — e dá o rollback mais rápido (swap de volta).

> [!question]- Q2. O environment de produção foi apagado por engano e o banco RDS foi junto. Como evitar?
> **A)** Snapshot diário
> **B)** **Criar o RDS fora do environment e passar o endpoint por variável de ambiente** ✅
> **C)** Usar Multi-AZ
> **D)** Habilitar termination protection no environment
>
> **Por que B**: RDS criado **dentro** do environment compartilha o ciclo de vida dele.
> **A errada**: ajuda a recuperar, mas não evita.
> **D errada**: reduz o risco de acidente, mas o acoplamento permanece.

> [!question]- Q3. Avaliar a versão nova com **10% do tráfego real** antes de completar o deploy.
> **A)** Immutable
> **B)** **Traffic splitting** ✅
> **C)** Rolling
> **D)** All at once
>
> **Por que B**: traffic splitting envia uma **porcentagem** do tráfego para a fleet nova (canary).

> [!question]- Q4. Uma aplicação web precisa de processamento assíncrono de tarefas longas, desacoplado do front-end.
> **A)** Um único environment com threads de background
> **B)** **Web server environment publicando numa fila + worker environment consumindo** ✅
> **C)** All at once deploy
> **D)** Lambda com 15 minutos
>
> **Por que B**: o **worker environment** provisiona a fila SQS e o daemon que entrega as mensagens à aplicação.
> **D errada**: pode servir, mas muda a arquitetura e tem teto de 15 min.

> [!question]- Q5. Criar um alarme do CloudWatch e uma fila SQS junto com o environment, versionados com o código.
> **A)** Console do Beanstalk
> **B)** **Arquivos `.config` em `.ebextensions/`** ✅
> **C)** Saved configuration
> **D)** CloudFormation separado
>
> **Por que B**: `.ebextensions` permite criar recursos adicionais com sintaxe CloudFormation, versionados junto ao código.
> **C errada**: saved configuration guarda **opções**, não recursos novos.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Beanstalk é caixa-preta | Você mantém **acesso total** aos recursos (EC2, ASG, ELB) |
| Beanstalk é cobrado | **Grátis**; paga só os recursos |
| Blue/green é uma política de deploy | É um **procedimento** (ambiente novo + **swap de CNAME**) |
| Rolling mantém a capacidade | **Reduz** a capacidade. Quem mantém é *rolling with additional batch* |
| RDS do environment sobrevive ao delete | **Não.** Crie o banco **fora** para produção |
| Beanstalk substitui ECS/EKS | Para containers com orquestração, é **ECS/EKS** |
| Immutable é mais barato | Dobra as instâncias **temporariamente** |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
