---
tags: [saa-c03, snow, questoes]
servico: AWS Snow Family
atualizado: 2026-11-08
---

# Snow Family — Questões

> [!question]- Q1. 80 TB num NAS, link de 100 Mbps, migração em **duas semanas**.
> **A)** DataSync pela internet
> **B)** **AWS Snow Family (dispositivo físico)** ✅
> **C)** S3 Transfer Acceleration com multipart
> **D)** Direct Connect de 1 Gbps
>
> **Por que B**: faça a conta — 80 TB em 100 Mbps passa de **70 dias**. Link insuficiente é o gatilho.
> **A errada**: o DataSync é limitado pelo link.
> **C errada**: acelera, mas não cria banda.
> **D errada**: provisionar DX leva *"up to 72 business hours"* (até 72 horas úteis) só para a porta, mais o circuito do parceiro — não cabe em 2 semanas.

> [!question]- Q2. 20 TB para o S3, com link de 1 Gbps disponível e sem prazo apertado.
> **A)** Snowball Edge
> **B)** **AWS DataSync** ✅
> **C)** Snowmobile
> **D)** Transfer Family
>
> **Por que B**: 20 TB em 1 Gbps cabe em ~2 dias — não há motivo para dispositivo físico, e a própria AWS aponta o DataSync para *"online transfers"*.

> [!question]- Q3. Qual a capacidade usável do **Snowball Edge Storage Optimized**?
> **A)** 80 TB
> **B)** **210 TB** ✅
> **C)** 100 TB
> **D)** 28 TB
>
> **Por que B**: *"210 TB usable (for object and NFS data transfer)"* (210 TB utilizáveis (para transferência de objetos e NFS)).
> **D errada**: **28 TB** é o NVMe SSD do **Compute Optimized**, dedicado às instâncias.

> [!question]- Q4. Uma plataforma de petróleo precisa processar dados localmente, sem conectividade confiável, de forma permanente.
> **A)** Snowball Edge Compute Optimized
> **B)** **AWS Outposts** ✅
> **C)** Snowcone
> **D)** DataSync
>
> **Por que B**: a própria doc aponta: *"For edge computing, explore AWS Outposts."* (para computação na borda, considere o AWS Outposts) E o suporte ao Snowball encerra em **31/12/2026** — não serve para necessidade **permanente**.

> [!question]- Q5. Quantos dispositivos num cluster Snowball Edge, e para quê?
> **A)** 2 a 8, para velocidade
> **B)** **3 a 16, para durabilidade do dado no site** ✅
> **C)** 1 a 10, para capacidade
> **D)** Não existe cluster
>
> **Por que B**: *"cluster Snowball Edge devices for local storage and compute jobs to achieve data durability across 3 to 16 devices"* (agrupar dispositivos Snowball Edge em cluster, para armazenamento e processamento local, obtendo durabilidade de dados entre 3 e 16 dispositivos).

> [!question]- Q6. Um cliente novo precisa de transferência física segura de grande volume. O que a AWS recomenda?
> **A)** Snowball Edge
> **B)** **AWS Data Transfer Terminal (ou soluções de parceiros); DataSync para transferência online** ✅
> **C)** Snowmobile
> **D)** Storage Gateway
>
> **Por que B**: *"AWS Snowball Edge is no longer available to new customers. New customers should explore AWS DataSync for online transfers, AWS Data Transfer Terminal for secure physical transfers, or AWS Partner solutions."* (o AWS Snowball Edge não está mais disponível para novos clientes; eles devem considerar o AWS DataSync para transferências online, o AWS Data Transfer Terminal para transferências físicas seguras, ou soluções de parceiros da AWS)

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Snow é a resposta para "muitos TB" | Só quando o **link** não dá conta no prazo |
| O Snowball continua disponível para novos clientes | *"no longer available to new customers"*; suporte até **31/12/2026** |
| Snowball Edge serve para edge computing permanente | A AWS aponta **Outposts** |
| Storage Optimized tem 80 TB | **210 TB** usáveis |
| Compute Optimized tem 210 TB | **28 TB** de NVMe para as instâncias |
| Snowcone tem especificação na doc atual | **Não aparece** na documentação que conferi |
| Direct Connect resolve prazo curto | Provisionar leva **semanas** |
| A Snow Family saiu do escopo da prova | **Continua** na lista oficial de serviços em escopo |

## Links

- [[4 - Custo (20%)/Snow Family/1 - O que e|1 - O que e]] · [[4 - Custo (20%)/Snow Family/2 - Decorar|2 - Decorar]] · [[4 - Custo (20%)/Snow Family/3 - Detalhes|3 - Detalhes]]
