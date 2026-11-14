---
tags: [saa-c03, outposts, detalhes]
servico: AWS Outposts
atualizado: 2026-11-08
---

# Outposts — Detalhes

## 1. O que é, concretamente

A AWS entrega, instala e **opera** o hardware no seu datacenter. Você consome pela **mesma API, SDK e console** da região; a diferença é onde os recursos rodam.

O **plano de controle** continua na **região** à qual o Outpost está ancorado — então ele precisa de conectividade (via **Direct Connect** ou VPN) para operações de gerenciamento. Cargas **já em execução** continuam se o link cair; criar e modificar recursos, não.

## 2. Os três requisitos que o justificam

**Latência.** Um MES de fábrica, um sistema de trading, um PACS de hospital que precisa de resposta em **único dígito de ms** não tolera a ida até a região.

**Residência de dados.** Quando a regulação exige que o dado **não saia** do prédio, cidade ou país sem região AWS, o processamento e o armazenamento (**S3 on Outposts**, **EBS**) ficam locais.

**Operação desconectada.** Fábricas, navios, plataformas e sites remotos precisam continuar operando sem link.

Sem nenhum desses três, a resposta é a **região** — Outposts é caro e traz responsabilidade física (espaço, energia, refrigeração, rede).

## 3. Outposts × Local Zones × Wavelength

| | **Outposts** | **Local Zones** | **Wavelength** |
|---|---|---|---|
| Hardware | **Seu** datacenter | AWS, perto da cidade | Rede **5G** |
| Você gerencia espaço/energia | **Sim** | Não | Não |
| Residência no **seu** prédio | **Sim** | Não | Não |
| Funciona desconectado | **Sim** (cargas em execução) | Não | Não |
| Custo e compromisso | Alto (contrato, instalação) | Pague pelo uso | Pague pelo uso |

**Local Zone** é a resposta para "latência baixa para usuários de uma **cidade**" sem hardware próprio. Só **Outposts** atende "o dado não pode sair do **nosso** prédio".

## 4. Capacidade finita — o que muda na arquitetura

| Na região | No Outpost |
|---|---|
| Capacidade praticamente ilimitada | **Capacidade do rack** |
| Auto Scaling sobe o que precisar | Limitado ao hardware instalado |
| Multi-AZ nativo | Um Outpost é **um** local |
| Todos os serviços | **Subconjunto** |

Dimensionar capacidade deixa de ser configuração e passa a ser **decisão de compra**.

## 5. Desenho híbrido típico

```
       SEU DATACENTER                          REGIÃO AWS
┌──────────────────────────┐          ┌──────────────────────────┐
│  Sistemas legados        │          │  S3, DynamoDB, Lambda    │
│         ↕ latência 1ms   │  Direct  │  Analytics, ML           │
│  AWS OUTPOST             │◄────────►│  Plano de controle       │
│   EC2 · EBS · RDS · ECS  │  Connect │  Backup (AWS Backup)     │
└──────────────────────────┘          └──────────────────────────┘
```

Carga sensível a **latência ou residência** fica no Outpost; **analytics, backup e serviços gerenciados** ficam na região.

## 6. Alternativas que costumam ser a resposta certa

| Necessidade real | Alternativa |
|---|---|
| Acesso de **arquivo** local, dado na AWS | **Storage Gateway (File Gateway)** |
| Acesso de **bloco** local | **Volume Gateway** |
| Latência para usuários de uma cidade | **Local Zones** |
| Container orquestrado localmente | **ECS/EKS Anywhere** |
| Transferência de dados em massa | **DataSync** / **Snow Family** |
| Rodar vSphere | **VMware Cloud on AWS** |

## Links

- [[3 - Performance (24%)/Outposts/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/Outposts/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/Outposts/4 - Questoes|4 - Questoes]]
- [[3 - Performance (24%)/EC2/1 - O que e|EC2]] · [[3 - Performance (24%)/EBS/1 - O que e|EBS]] · [[3 - Performance (24%)/Storage Gateway/1 - O que e|Storage Gateway]] · [[3 - Performance (24%)/Direct Connect/1 - O que e|Direct Connect]] · [[9 - Fundamentos e apoio/Regioes, AZs e infraestrutura global/1 - O que e|Regioes, AZs e infraestrutura global]]
