---
servico: Disaster Recovery (RPO e RTO)
fonte: "[[9 - Fundamentos e apoio/Disaster Recovery (RPO e RTO)/2 - Decorar|2 - Decorar]]"
---

# Disaster Recovery — Flashcards

#flashcards/saa-c03/fundamentos/disaster-recovery

Backup and restore: RPO, RTO e o que fica ligado no DR?::RPO e RTO de **horas** (até 24 h); **nada** ligado; custo mais baixo

Pilot light: RPO, RTO e o que fica ligado?::RPO de **minutos**, RTO de **dezenas de minutos**; **banco e storage** ligados, servidores **desligados**

Warm standby: RPO, RTO e o que fica ligado?::RPO de **segundos**, RTO de **minutos**; **tudo ligado em escala reduzida**

Multi-site active/active: RPO e RTO?::**~zero** nos dois; tudo ligado atendendo tráfego

RTO de 24 horas com menor custo possível: qual estratégia?::**Backup and restore**

RTO de 10 a 30 minutos sem pagar servidores ociosos: qual estratégia?::**Pilot light**

RTO de minutos, podendo servir tráfego degradado: qual estratégia?::**Warm standby**

Aurora Global Database: lag típico e RTO do failover gerenciado?::Lag **< 1 segundo**; RTO **< 1 minuto**

RDS Multi-AZ protege de falha regional?::**Não.** Protege de falha de **AZ**

Tempos de recuperação do Glacier Deep Archive?::**12 h** (standard) / **48 h** (bulk): inviável para RTO curto

Tempos de recuperação do Glacier Flexible Retrieval?::**1–5 min** (expedited), **3–5 h** (standard), **5–12 h** (bulk)

Qual serviço faz failover de IP estático em segundos?::**Global Accelerator**

Qual serviço replica servidores continuamente com RPO de segundos?::**Elastic Disaster Recovery (DRS)**

Por que conferir as quotas na Região de DR?::Limites de serviço são **por conta e por Região**; sem quota, o failover não sobe as instâncias

Pergunta pede a estratégia "mais econômica que atende o RTO de X": como escolher?::A **menos robusta** que ainda cabe em X
