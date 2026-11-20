---
servico: Amazon EC2
fonte: "[[3 - Performance (24%)/EC2/2 - Decorar|2 - Decorar]]"
---

# EC2 — Flashcards

#flashcards/saa-c03/d3-performance/ec2

Família EC2 para carga irregular e uso leve, que consome créditos?::**T** (burstable)

Família EC2 para CPU intensivo, batch, encoding, servidor de jogos?::**C**

Famílias EC2 para in-memory, banco grande, SAP HANA?::**R**, **X**, **z**

Famílias EC2 para ML, renderização e CAD?::**P**, **G**, **Inf**, **Trn**

O que indica o sufixo `g` (m7g, c7g) nas instâncias?::**Graviton** (ARM), melhor custo-benefício

Simulação HPC com MPI: qual combinação de EC2?::Família **Hpc** + **EFA** + **cluster placement group**

Desconto máximo e flexibilidade do Compute Savings Plans?::Até **66%**; qualquer família, tamanho, SO, tenancy e **região**; cobre **Fargate e Lambda**

Desconto máximo e amarração do EC2 Instance Savings Plans?::Até **72%**; amarrado a **família + região**

Standard × Convertible Reserved Instances?::Standard: **maior desconto**, não trocável; Convertible: **trocável**

Qual RI reserva capacidade: zonal ou regional?::**Zonal**; a regional é só desconto

Aviso de interrupção de uma instância Spot?::**2 minutos**

Licença própria per-socket/per-core: qual opção de compra?::**Dedicated Hosts** (integra com License Manager)

Reservar capacidade numa AZ sem compromisso de 1 a 3 anos?::**Capacity Reservations**

Instance store persiste dados em stop/hibernate?::**Não** (fica no host físico); use para cache, buffer, scratch

Limite de instâncias do spread placement group?::**7 instâncias por AZ**

Limite de partições do partition placement group?::**7 partições por AZ**

Placement group cluster: escopo de AZ e fluxo único máximo?::**1 AZ só**; fluxo único de **10 Gbps** dentro do grupo (5 Gbps fora)

ENA × EFA: para que serve cada um?::**ENA**: enhanced networking (alto PPS, baixa latência); **EFA**: HPC/ML com MPI, bypass de kernel

MTU de jumbo frames na EC2 e onde ele não vale?::**9001**; para internet e Direct Connect fica **1.500**

Endereço do serviço de metadados da instância (IMDS)?::**169.254.169.254** (não passa por SG nem NACL)
