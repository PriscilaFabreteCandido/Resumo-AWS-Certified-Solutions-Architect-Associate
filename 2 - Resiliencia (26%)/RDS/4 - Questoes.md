---
tags: [saa-c03, rds, questoes]
servico: Amazon RDS
atualizado: 2026-11-08
---

# RDS — Questões

> [!question]- Q1. RDS MySQL com CPU alta por relatórios de leitura, e o negócio exige failover automático entre AZs.
> **A)** Multi-AZ DB instance e apontar os relatórios para o standby
> **B)** **Multi-AZ DB instance (HA) + read replicas (relatórios)** ✅
> **C)** Só read replicas em duas AZs
> **D)** Aumentar a instance class
>
> **Por que B**: são **dois requisitos distintos** — Multi-AZ resolve failover, read replica resolve leitura.
> **A errada**: *"You can't use a standby replica to serve read traffic."* É a pegadinha central.
> **C errada**: read replica **não** faz failover automático.
> **D errada**: trata o sintoma, com teto e sem HA.
> ⚠️ Se **Multi-AZ DB cluster** estiver entre as opções e o engine for MySQL/PostgreSQL, ele é a resposta mais elegante: os 2 readers atendem leitura **e** dão failover em < 35 s.

> [!question]- Q2. Qual configuração dá failover automático **e** capacidade de leitura, em MySQL, com o menor tempo de indisponibilidade?
> **A)** Multi-AZ DB instance + 2 read replicas
> **B)** **Multi-AZ DB cluster** ✅
> **C)** Aurora com 15 réplicas
> **D)** Read replica cross-Region promovida manualmente
>
> **Por que B**: 1 writer + 2 readers **legíveis** em 3 AZs, failover *"typically under 35 seconds"*, e menor latência de escrita.
> **A errada**: funciona, mas o standby não lê e o tempo de failover não é documentado.
> **C errada**: Aurora é outra arquitetura — resposta válida se o enunciado aceitar migrar, mas *"Multi-AZ DB clusters aren't the same as Aurora DB clusters"*.
> **D errada**: promoção manual, RTO alto.

> [!question]- Q3. Uma instância RDS foi deletada e não havia snapshot manual. Os backups automáticos servem?
> **A)** Sim, ficam retidos pelo período configurado
> **B)** **Não: os backups automáticos são removidos com a instância; só o snapshot manual sobrevive** ✅
> **C)** Sim, por 35 dias
> **D)** Só se era Multi-AZ
>
> **Por que B**: é a distinção clássica entre backup automático e snapshot manual.
> ⚠️ Se o recurso estivesse num **backup plan do AWS Backup**, a cópia no **vault** sobreviveria — razão para centralizar.

> [!question]- Q4. Uma função Lambda com alta concorrência esgota as conexões do banco.
> **A)** Aumentar `max_connections` no parameter group
> **B)** **RDS Proxy entre a Lambda e o banco** ✅
> **C)** Adicionar read replicas
> **D)** Reserved concurrency na Lambda
>
> **Por que B**: o proxy faz *"pool and share database connections"* e faz load shedding no excesso.
> **A errada**: empurra o problema; conexões consomem memória do banco.
> **C errada**: ajuda em leitura, não no esgotamento de conexões de escrita.
> **D errada**: estrangula a aplicação em vez de resolver.

> [!question]- Q5. Um relatório precisa ler dados gravados há **1 segundo** e não tolera dado antigo.
> **A)** Read replica
> **B)** **Ler da instância primária (ou do writer)** ✅
> **C)** Read replica cross-Region
> **D)** Multi-AZ standby
>
> **Por que B**: read replica é **assíncrona** — há lag. Leitura que exige consistência forte vai no primário.
> **D errada**: o standby **não aceita leitura**.

> [!question]- Q6. Precisa habilitar criptografia em repouso num RDS que foi criado sem ela.
> **A)** Habilitar na console, com reboot
> **B)** **Criar um snapshot, copiá-lo com criptografia, e restaurar uma nova instância a partir dele** ✅
> **C)** Mudar o parameter group
> **D)** Não é possível
>
> **Por que B**: a criptografia é definida na **criação**. O caminho é snapshot → cópia criptografada → restore.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Standby do Multi-AZ lê | **Não lê** (no Multi-AZ *instance*) |
| Multi-AZ escala leitura | Não. Escalar leitura = **read replica** ou **Multi-AZ cluster** |
| Multi-AZ DB cluster é Aurora | *"aren't the same as Aurora DB clusters"* |
| Read replica é síncrona | **Assíncrona** |
| Read replica faz failover automático | Promoção é **manual** |
| Read replica tem autoscaling | *"RDS doesn't support autoscaling of read replicas"* |
| Qualquer engine permite réplica de réplica | **Db2, Oracle e SQL Server não** |
| Backup automático sobrevive à exclusão | **Só o snapshot manual** |
| Instância parada não custa nada | O **storage continua cobrando** |
| Dá para habilitar criptografia depois | Só via **snapshot → cópia criptografada → restore** |
| RDS Proxy funciona com read replica | *"only with the writer DB instance, not a read replica"* |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
