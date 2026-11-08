---
tags: [saa-c03, dominio-2, dr, rto, rpo]
dominio: 2
tasks: [2.2]
atualizado: 2026-11-08
---

# Disaster Recovery — RTO e RPO

## 🧩 Em 30 segundos

- **RPO** = quanto **dado** você aceita perder (olha para trás). **RTO** = quanto **tempo** você aceita ficar fora (olha para frente).
- Quatro estratégias oficiais, do mais barato ao mais caro: **Backup and restore → Pilot light → Warm standby → Multi-site active/active**.
- A prova dá RPO e RTO no enunciado e pede **a mais econômica que atende**. Nunca escolha a mais robusta por reflexo.
- Roteamento do failover: **Route 53**, **Global Accelerator** ou **CloudFront origin failover**.
- Em qualquer estratégia: *"you should always deploy using infrastructure as code (IaC)"*.

## 🧠 Teste-se primeiro

> [!question]- As quatro estratégias, com as citações oficiais
> **Backup and restore** — para *"mitigating against data loss or corruption"*, e também *"against a regional disaster by replicating data to other AWS Regions"*. Exige **reimplantar** infraestrutura, configuração e código na região de recuperação.
> **Pilot light** — *"replicate your data from one Region to another and provision a copy of your core workload infrastructure... Resources required to support data replication and backup, such as databases and object storage, are always on"*, mas os servidores de aplicação ficam *"switched off"*. *"minimizes the ongoing cost of disaster recovery"*. ⚠️ *"cannot process requests without additional action taken first"*.
> **Warm standby** — *"a scaled down, but fully functional, copy of your production environment in another Region"*; *"can handle traffic (at reduced capacity levels) immediately"*; escala com EC2 Auto Scaling.
> **Multi-site active/active** — *"serves traffic from all regions to which it is deployed"*; *"the most complex and costly approach... but it can reduce your recovery time to near zero for most disasters"*.

> [!question]- O que é "hot standby" e por que a AWS prefere warm?
> Hot standby *"uses an active/passive configuration where users are only directed to a single region"* — ou seja, uma cópia **em escala total** parada. A doc diz: *"Warm Standby offers a more economical and operationally less complex approach."*

> [!question]- Quais mecanismos de replicação existem por serviço?
> **S3** → CRR (+ **RTC** com SLA de 15 min) · **RDS** → read replica cross-Region ou cópia de snapshot · **Aurora** → **Global Database** (RPO em segundos) · **DynamoDB** → **Global Tables** (multi-ativo) · **EBS/AMI** → cópia de snapshot entre regiões · **EFS/FSx** → **AWS Backup** cross-Region · **ECR** → replicação de imagem.

> [!question]- Por que configurar service quotas no ambiente de standby?
> Porque quota **não** acompanha o desastre. O guia oficial lista literalmente, em *Task 2.2*: *"Service quotas and throttling (for example, how to configure the service quotas for a workload in a standby environment)"*.
> Pilot light e warm standby rodam pequenos; no dia do desastre precisam escalar — e se a quota de vCPU, Elastic IP ou concorrência de Lambda da região secundária for a padrão, o failover **falha**. Peça o aumento **antes**.

## Tabela de decisão

| Requisito no enunciado | Estratégia |
|---|---|
| RPO de horas, RTO de horas, **menor custo possível** | **Backup and restore** |
| RPO de minutos, RTO de dezenas de minutos a ~1 h | **Pilot light** |
| RPO de minutos, RTO de minutos, "aceitar tráfego degradado imediatamente" | **Warm standby** |
| RPO e RTO "quase zero", "zero downtime", "servir das duas regiões" | **Multi-site active/active** |

> [!tip] O atalho que funciona
> Procure no enunciado o que está **ligado** na região secundária:
> - Nada (só backup) → backup and restore
> - Banco/dados ligados, aplicação desligada → **pilot light**
> - Tudo ligado, mas pequeno → **warm standby**
> - Tudo ligado e **recebendo tráfego** → **active/active**

## Roteamento do failover

| Mecanismo | Quando |
|---|---|
| **Route 53** com failover routing + health check | Padrão para DNS; TTL afeta o tempo de propagação |
| **Route 53** com latency/weighted/multivalue + health check | Ativo-ativo |
| **AWS Global Accelerator** | Failover **mais rápido** que DNS (IP anycast, *"reacts instantly to changes in health"*), e cliente não depende de cache DNS |
| **CloudFront origin failover** | Origin group com 2 origens; dispara em 400, 403, 404, 416, 429, 500, 502, 503, 504, e só para GET/HEAD/OPTIONS |

> [!warning] Failover automático exige cuidado
> A própria doc avisa: *"Automatic failover... should be used with caution."* Em cenários com banco replicado assincronamente, um failover automático indevido causa divergência de dados. É por isso que o Aurora Global Database separa **switchover** (planejado, RPO 0) de **failover** (desastre, `--allow-data-loss`).

## ❓ Questões de prova

> [!example]- Q1 — RPO de 1 hora e RTO de 8 horas, orçamento muito restrito. Qual estratégia entre regiões?
> **A)** **Backup and restore: snapshots e backups replicados para a região secundária, com a infraestrutura definida em IaC** ✅
> **B)** Pilot light
> **C)** Warm standby
> **D)** Multi-site active/active
>
> **Por que A**: RPO de 1 h e RTO de 8 h são folgados; é a estratégia *"low cost and low complexity"* que atende. O IaC é o que torna o RTO de 8 h factível.
> **B, C e D erradas**: atendem, mas custam mais do que o necessário. Com "orçamento muito restrito" no enunciado, a resposta é sempre a mais barata **que atende**.

> [!example]- Q2 — Uma aplicação precisa continuar aceitando tráfego **imediatamente** após a perda de uma região, mesmo em capacidade reduzida, com RTO de minutos. Qual estratégia?
> **A)** Pilot light
> **B)** **Warm standby** ✅
> **C)** Backup and restore com automação
> **D)** Multi-site active/active
>
> **Por que B**: *"can handle traffic (at reduced capacity levels) immediately"* é a definição literal de warm standby.
> **A errada**: pilot light *"cannot process requests without additional action taken first"* — os servidores estão desligados.
> **C errada**: RTO incompatível.
> **D errada**: atende, mas o enunciado não pede RTO zero nem servir das duas regiões; é mais caro e complexo do que o necessário.

> [!example]- Q3 — Uma empresa faz DR com pilot light em `eu-west-1`. No teste de failover, o Auto Scaling não conseguiu subir as 40 instâncias necessárias. Qual a causa mais provável?
> **A)** O AMI não foi copiado para a região
> **B)** **A quota de vCPU on-demand da região secundária é a padrão e não suporta 40 instâncias** ✅
> **C)** O Route 53 não tinha health check
> **D)** O snapshot do RDS não estava atualizado
>
> **Por que B**: é exatamente o cenário que o guia aponta em *"how to configure the service quotas for a workload in a standby environment"*. A região secundária roda pequena no dia a dia, então a quota nunca foi exercitada.
> **A errada**: seria um erro de configuração que apareceria antes (falha ao lançar qualquer instância), não ao escalar para 40.
> **C errada**: health check afeta roteamento, não capacidade.
> **D errada**: afetaria o RPO, não o lançamento de instâncias.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| RPO e RTO são a mesma coisa | RPO = **dado** perdido. RTO = **tempo** fora |
| Pilot light aceita tráfego na hora | **Não.** *"cannot process requests without additional action taken first"* |
| Hot standby é melhor que warm | A AWS recomenda warm: *"more economical and operationally less complex"* |
| Replicação é estratégia de DR suficiente | Replicação cuida do **dado**; falta a infraestrutura, a configuração e o roteamento |
| Multi-site é sempre a resposta certa | É *"the most complex and costly"*. A prova pede a mais econômica que atende |
| Quota de serviço é global | É **por região** e precisa ser aumentada **antes** do desastre |
| Failover automático é sempre desejável | *"should be used with caution"* |
| Snapshot de EBS/RDS já está na outra região | Snapshot é **regional**. Você precisa **copiar** (ou usar AWS Backup cross-Region) |
| DNS failover é instantâneo | Depende de **TTL** e de cache do resolver. Para failover rápido: **Global Accelerator** |

## Links

- [[02 - Dominio 2 - Design Resilient Architectures (26%)]]
- [[Bancos resilientes - RDS, Aurora e read replicas]]
- [[Backup, retencao e AWS Backup]]
- [Opções de DR na nuvem (whitepaper)](https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html)
