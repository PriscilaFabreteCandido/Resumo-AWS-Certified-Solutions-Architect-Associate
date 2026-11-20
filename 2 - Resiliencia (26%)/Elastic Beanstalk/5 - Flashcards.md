---
servico: AWS Elastic Beanstalk
fonte: "[[2 - Resiliencia (26%)/Elastic Beanstalk/2 - Decorar|2 - Decorar]]"
---

# Elastic Beanstalk — Flashcards

#flashcards/saa-c03/d2-resiliencia/elastic-beanstalk

Política de deploy do Beanstalk de menor custo, que aceita indisponibilidade?::**All at once**

Política de deploy do Beanstalk com zero downtime e rollback rápido?::**Immutable** (ou **blue/green** com swap de CNAME)

Política de deploy do Beanstalk para canary ou porcentagem de tráfego?::**Traffic splitting**

Rolling × rolling with additional batch: qual mantém a capacidade total?::**Rolling with additional batch** (sobe instâncias extras temporárias); o rolling reduz a capacidade

Como funciona o rollback na política immutable?::É **rápido**: basta descartar a fleet nova

Como se faz blue/green no Elastic Beanstalk?::Cria um **ambiente novo**, valida e faz **swap de CNAME**; rollback = swap de volta

Blue/green é uma política de deploy do Beanstalk?::**Não**, é um **procedimento** manual

Como customizar recursos e opções do Beanstalk pelo código?::Arquivos **`.config`** na pasta **`.ebextensions`**

Quanto custa o Elastic Beanstalk e o que usa por baixo?::O serviço é **grátis** (paga os recursos) e usa **CloudFormation**

O que acontece com um RDS criado dentro do environment quando ele é apagado?::O **banco é apagado** junto; em produção, crie o RDS **fora** e passe o endpoint por variável de ambiente

Como salvar o conjunto de opções de um environment do Beanstalk?::**Saved configuration**
