---
tags: [saa-c03, disaster-recovery, questoes]
conceito: Disaster Recovery (RPO e RTO)
atualizado: 2026-11-08
---

# DR — Questões

> [!question]- Q1. RPO de 5 minutos, RTO de 20 minutos, e a empresa **não quer pagar servidores de aplicação ociosos**.
> **A)** Backup and restore com cópia cross-Region
> **B)** **Pilot light** ✅
> **C)** Warm standby
> **D)** Multi-site active/active
>
> **Por que B**: é exatamente a definição — *"Resources required to support data replication and backup, such as databases and object storage, are always on. Other elements, such as application servers, are loaded with application code and configurations, but are switched off."*
> **A errada**: RTO em horas.
> **C e D erradas**: atendem, mas mantêm computação ligada — contrariam a restrição de custo.

> [!question]- Q2. Qual a diferença essencial entre **pilot light** e **warm standby**?
> **A)** Pilot light fica na mesma Região
> **B)** **No warm standby o ambiente é uma cópia reduzida mas totalmente funcional e ligada; no pilot light os servidores de aplicação estão desligados** ✅
> **C)** Pilot light não replica dados
> **D)** Warm standby não precisa de DNS failover
>
> **Por que B**: a palavra da doc é *"fully functional"* (totalmente funcional) para warm standby, contra *"switched off"* no pilot light.
> **C errada**: pilot light **replica** os dados — é o que o define.

> [!question]- Q3. O requisito é *"proteger contra a exclusão acidental ou maliciosa de objetos no S3"*.
> **A)** Cross-Region Replication
> **B)** **Versionamento + MFA Delete (e Object Lock, se for exigida imutabilidade)** ✅
> **C)** S3 Standard-IA
> **D)** Multi-site active/active
>
> **Por que B**: proteção contra **erro lógico** não vem de replicação.
> **A errada**: a replicação **propaga** o problema — é a pegadinha. (Com versionamento no destino a deleção não é replicada como permanente, mas o mecanismo de proteção é o **versionamento**, não a replicação.)

> [!question]- Q4. RTO de **30 minutos**, e os backups estão em **Glacier Deep Archive**.
> **A)** Está adequado, é a classe mais barata
> **B)** **Inadequado: a recuperação do Deep Archive leva 12 h (standard) a 48 h (bulk)** ✅
> **C)** Basta usar recuperação expedited
> **D)** Adequado se usar o S3 Transfer Acceleration
>
> **Por que B**: Deep Archive **não oferece** expedited. Para um RTO de 30 min, o backup precisa estar em **Standard/Standard-IA** ou **Glacier Instant Retrieval** (acesso em milissegundos).
> **C errada**: expedited (1–5 min) existe no **Glacier Flexible Retrieval**, não no Deep Archive.

> [!question]- Q5. Requisito: *"RPO e RTO próximos de zero; usuários na América e na Europa devem ser atendidos localmente"*.
> **A)** Warm standby na Europa
> **B)** **Multi-site active/active** ✅
> **C)** Pilot light na Europa
> **D)** CloudFront com origem única
>
> **Por que B**: as duas Regiões **servem produção** — atende latência e DR ao mesmo tempo. A doc avisa que é *"the most complex and costly approach"* (a abordagem mais complexa e mais cara), mas o enunciado pediu zero.
> **D errada**: CloudFront acelera conteúdo cacheável; não dá DR da aplicação nem do banco.

> [!question]- Q6. O plano de DR prevê subir 150 instâncias na Região secundária. O que foi esquecido?
> **A)** Nada — basta o CloudFormation
> **B)** **Verificar as quotas de serviço na Região de DR (são por conta e por Região) e testar o failover** ✅
> **C)** Copiar os security groups
> **D)** Criar a VPC com o mesmo CIDR
>
> **Por que B**: quotas são **por conta e por Região** — é a falha clássica, descoberta só durante o desastre. Junte a isso: AMIs e snapshots **copiados**, chave **KMS** na Região de destino e **certificado ACM** lá.

> [!question]- Q7. Replicar **servidores** (on-premises e EC2) para outra Região com RPO de **segundos**, sem pagar a frota parada.
> **A)** AWS Backup com cópia cross-Region
> **B)** **AWS Elastic Disaster Recovery (DRS)** ✅
> **C)** Snapshots EBS a cada hora copiados entre Regiões
> **D)** Warm standby
>
> **Por que B**: DRS faz replicação **contínua em nível de bloco**, com RPO de segundos e RTO de minutos, cobrando pouco até o failover.
> **C errada**: RPO de 1 hora.
> **D errada**: atende o RPO, mas **paga a frota ligada**.

> [!question]- Q8. Um banco RDS é **Multi-AZ**. A Região inteira fica indisponível.
> **A)** O failover Multi-AZ resolve
> **B)** **Multi-AZ não protege contra falha regional — é necessária uma read replica cross-Region (ou Aurora Global Database)** ✅
> **C)** O backup automático restaura em outra Região automaticamente
> **D)** O Route 53 redireciona sozinho
>
> **Por que B**: Multi-AZ é **HA dentro da Região**. Para DR regional: **cross-Region read replica** promovível, **Aurora Global Database** ou **cópia cross-Region de backups**.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Multi-AZ é DR | É **HA** dentro da Região; DR regional precisa de **outra Região** |
| RPO é tempo até voltar | **RPO = dado perdido**; **RTO = tempo até voltar** |
| Replicação protege de exclusão acidental | **Propaga** a exclusão → **versionamento / Object Lock / backup** |
| Pilot light mantém a aplicação ligada | Dados **ligados**, servidores **desligados** |
| Warm standby é só pilot light maior | Warm standby é *"fully functional"* (totalmente funcional) e **no ar** |
| Deep Archive serve para RTO curto | **12–48 h** para recuperar |
| O plano de DR está pronto quando foi escrito | Só está pronto quando foi **testado**, e com as **quotas** conferidas na Região de DR |
| Snapshot cifrado restaura em qualquer Região | A **chave KMS é regional** (ou use **multi-Region key**) |
| Active/active é sempre a melhor resposta | É a **mais complexa e cara**; só quando o enunciado pede RPO/RTO ~zero |
| O failover de DNS é instantâneo | Depende do **TTL** e do **health check** |

## Links

- [[9 - Fundamentos e apoio/Disaster Recovery (RPO e RTO)/1 - O que e|1 - O que e]] · [[9 - Fundamentos e apoio/Disaster Recovery (RPO e RTO)/2 - Decorar|2 - Decorar]] · [[9 - Fundamentos e apoio/Disaster Recovery (RPO e RTO)/3 - Detalhes|3 - Detalhes]]
