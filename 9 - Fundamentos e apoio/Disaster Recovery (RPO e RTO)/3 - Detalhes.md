---
tags: [saa-c03, disaster-recovery, detalhes]
conceito: Disaster Recovery (RPO e RTO)
atualizado: 2026-11-08
---

# DR — Detalhes

## 1. Primeiro: DR não é alta disponibilidade

É a distinção que o domínio 2 testa sem avisar.

| | **Alta disponibilidade (HA)** | **Disaster Recovery (DR)** |
|---|---|---|
| Protege de | falha de **componente** ou de **AZ** | **evento regional**, desastre, corrupção em massa |
| Escopo | **dentro** de uma Região (Multi-AZ) | **outra Região** (ou outro provedor/on-premises) |
| Ação | **automática** (ELB, ASG, failover Multi-AZ) | **plano** — pode ter passo manual |
| Exemplo | RDS Multi-AZ, ASG em 3 AZs | Aurora Global Database, S3 CRR, DRS |

**Multi-AZ não é DR.** Se o enunciado fala em *"regional outage"*, *"disaster"* ou *"another Region"*, descarte toda alternativa que só adiciona AZs.

## 2. RPO e RTO, com rigor

**RPO (Recovery Point Objective)** — a janela de dados que você aceita perder. Define a **frequência de replicação ou backup**:

| RPO exigido | Mecanismo |
|---|---|
| 24 horas | Backup diário |
| 1 hora | Snapshot/backup horário |
| **Minutos** | **Replicação assíncrona** (read replica, S3 CRR) |
| **Segundos** | **Aurora Global Database**, **DynamoDB Global Tables**, **DRS** |
| **Zero** | **Replicação sincrônica** — na prática, dentro da Região (Multi-AZ); entre Regiões a distância torna o custo de latência inviável |

**RTO (Recovery Time Objective)** — o tempo até voltar a operar. Define **quanta infraestrutura precisa estar pronta**:

| RTO exigido | Precisa |
|---|---|
| 24 horas | Só os backups e um runbook |
| **Dezenas de minutos** | Infra **definida** (CloudFormation) + dados já lá |
| **Minutos** | Infra **ligada**, em escala reduzida |
| **Quase zero** | Infra **completa atendendo tráfego** |

## 3. As quatro estratégias, em detalhe

### Backup and restore

> *"Backup and restore is a suitable approach for mitigating against data loss or corruption."*

Backups copiados para outra Região; no desastre você **provisiona tudo** e restaura.

- **Peças**: AWS Backup com **cross-Region copy**, snapshots e AMIs copiados, S3 CRR, CloudFormation para a infra.
- **Vale notar**: é a única estratégia que também protege contra **corrupção e exclusão lógica** — as outras **replicam o erro**. Daí o combo **versionamento do S3 + Object Lock** para ransomware.
- **RTO/RPO**: horas.

### Pilot light

> *"you replicate your data from one Region to another and provision a copy of your core workload infrastructure. Resources required to support data replication and backup, such as databases and object storage, are always on. Other elements, such as application servers, are loaded with application code and configurations, but are switched off..."*

A chave da pegadinha está nessa citação: **banco e storage ligados; servidores de aplicação desligados**.

- **Peças**: cross-Region read replica (RDS) ou Aurora Global Database, S3 CRR, AMIs prontas, ASG com capacidade desejada **0**, Route 53 com failover.
- **Failover**: promover a réplica, subir o ASG, redirecionar o DNS.
- **RPO** minutos; **RTO** dezenas de minutos.

### Warm standby

> *"ensuring that there is a scaled down, but fully functional, copy of your production environment in another Region"*

Diferença de uma palavra em relação ao pilot light: **functional**. O ambiente **está no ar**, só pequeno.

- **Failover**: **escalar** (ASG) e apontar o tráfego. Não há "ligar do zero".
- **Vantagem de prova**: como está no ar, pode receber **tráfego de teste** continuamente — resolve o requisito *"queremos validar o DR sem exercício manual"*.
- **RPO** segundos; **RTO** minutos.

### Multi-site active/active

> *"you can run your workload simultaneously in multiple Regions... this is the most complex and costly approach"*

Ambas as Regiões **servem produção**.

- **Peças**: **DynamoDB Global Tables** (escrita em ambas) ou Aurora Global Database com **write forwarding**, Route 53 latency-based ou **Global Accelerator**, replicação bidirecional.
- **Dificuldade real**: **conflito de escrita** e consistência. Por isso a AWS chama de *"most complex"*.
- **RPO/RTO**: quase zero.

## 4. Como a prova formula

**Forma 1 — dão RPO e RTO, pedem a estratégia.** Mapeie na tabela e escolha a **mais barata que atende**.

**Forma 2 — dão a estratégia, perguntam as peças.** "Pilot light" implica **dados replicados + servidores desligados**; qualquer alternativa com frota ligada é warm standby (caro demais) e qualquer uma só com backup é backup-and-restore (lento demais).

**Forma 3 — custo.** *"A mais econômica que atende um RTO de 15 minutos"*: backup-and-restore não atende (horas); warm standby atende e **é mais caro**; **pilot light** é a resposta.

**Forma 4 — o detalhe que invalida.** O enunciado traz uma restrição que elimina a resposta "óbvia":

| Restrição | Elimina |
|---|---|
| *"RTO de 30 minutos"* | Backups em **Glacier Deep Archive** (12–48 h para recuperar) |
| *"proteger contra exclusão acidental"* | Replicação (ela **copia** a exclusão) → **versionamento / Object Lock / backup** |
| *"não podemos pagar computação ociosa"* | Warm standby e active/active |
| *"zero downtime no failover"* | Tudo abaixo de **active/active** |
| *"precisamos validar o DR regularmente"* | Backup-and-restore sem teste; favorece **warm standby** |

## 5. O erro de planejamento que a prova adora

**Quotas de serviço são por conta e por Região.** O plano que diz "subimos 200 instâncias na Região de DR" falha se a quota lá é de 20. Confira e solicite aumento **antes** (Service Quotas). Vale também para Elastic IPs, VPCs e capacidade de tipos de instância.

Outros detalhes operacionais que entram em questão:

| Detalhe | Consequência |
|---|---|
| **AMIs e snapshots** não existem na outra Região até serem **copiados** | O pilot light não sobe |
| **Chave KMS** é **regional** | Snapshot cifrado só restaura na Região de destino com a chave de lá (ou **multi-Region key**) |
| **TTL do Route 53** alto | Clientes continuam no endpoint velho mesmo após o failover |
| **Health check** do Route 53 ausente | Nenhum failover automático |
| **Certificado ACM** não existe na Região de DR | HTTPS cai no failover |

## 6. Serviços de DR que valem o nome

| Serviço | Para quê |
|---|---|
| **AWS Backup** | Backup central, **cross-Region** e **cross-account**, com **Vault Lock** |
| **AWS Elastic Disaster Recovery (DRS)** | Replicação **contínua em nível de bloco** de servidores (on-premises ou AWS) — RPO de **segundos**, RTO de **minutos**, pagando pouco até o failover |
| **Route 53** | Failover de DNS com health check |
| **Global Accelerator** | Failover com **IP estático**, sem depender de TTL de DNS |
| **CloudFormation / StackSets** | Recriar a infra, de forma repetível, em outra Região |
| **Aurora Global Database** | RPO ~1 s, RTO de failover gerenciado **< 1 min** |
| **DynamoDB Global Tables** | Multi-Região **multi-ativo** |
| **S3 CRR / SRR** | Replicação de objetos (com **Replication Time Control** para SLA de 15 min) |

> [!tip] DRS é a resposta quando o enunciado diz "servidores"
> *"Replicar nossos servidores on-premises (ou EC2) para outra Região com RPO de segundos, sem pagar a frota parada"* → **AWS Elastic Disaster Recovery**.

## Links

- [[9 - Fundamentos e apoio/Disaster Recovery (RPO e RTO)/1 - O que e|1 - O que e]] · [[9 - Fundamentos e apoio/Disaster Recovery (RPO e RTO)/2 - Decorar|2 - Decorar]] · [[9 - Fundamentos e apoio/Disaster Recovery (RPO e RTO)/4 - Questoes|4 - Questoes]]
- [[9 - Fundamentos e apoio/Regioes, AZs e infraestrutura global/1 - O que e|Regioes, AZs e infraestrutura global]] · [[1 - Seguranca (30%)/AWS Backup/1 - O que e|AWS Backup]] · [[2 - Resiliencia (26%)/Route 53/1 - O que e|Route 53]] · [[3 - Performance (24%)/Global Accelerator/1 - O que e|Global Accelerator]] · [[2 - Resiliencia (26%)/Aurora/1 - O que e|Aurora]] · [[3 - Performance (24%)/DynamoDB/1 - O que e|DynamoDB]] · [[3 - Performance (24%)/S3/1 - O que e|S3]] · [[2 - Resiliencia (26%)/CloudFormation/1 - O que e|CloudFormation]] · [[9 - Fundamentos e apoio/Estrategias de migracao (7 Rs)/1 - O que e|Estrategias de migracao (7 Rs)]]
- [Estratégias de DR](https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html)
