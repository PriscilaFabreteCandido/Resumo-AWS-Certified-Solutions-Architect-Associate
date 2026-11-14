---
tags: [saa-c03, outposts, questoes]
servico: AWS Outposts
atualizado: 2026-11-08
---

# Outposts — Questões

> [!question]- Q1. Um sistema de controle de fábrica precisa de resposta em **1 dígito de ms** a partir do próprio galpão, e deve continuar operando se o link com a AWS cair.
> **A)** Local Zones
> **B)** **AWS Outposts** ✅
> **C)** Direct Connect de 10 Gbps
> **D)** Wavelength
>
> **Por que B**: dois gatilhos juntos — latência local e **operação desconectada**. Só o Outpost roda **dentro** do galpão.
> **A errada**: Local Zone é infraestrutura **da AWS**, fora do seu prédio.
> **C errada**: link rápido não elimina a latência física nem resolve desconexão.
> **D errada**: Wavelength é rede 5G de operadora.

> [!question]- Q2. Regulação exige que dados de pacientes **não saiam do prédio do hospital**.
> **A)** Região da AWS com criptografia KMS
> **B)** **Outposts com S3 on Outposts e EBS locais** ✅
> **C)** Local Zone na mesma cidade
> **D)** Volume Gateway em modo stored
>
> **Por que B**: residência de dados no **próprio prédio** só se resolve com hardware no prédio.
> **D errada**: stored mantém o dado local, mas envia **snapshots** para o S3 — o dado sai.

> [!question]- Q3. Usuários de uma cidade precisam de latência de 1 dígito de ms, e a empresa **não quer** gerenciar hardware.
> **A)** Outposts servers
> **B)** **AWS Local Zones** ✅
> **C)** Wavelength
> **D)** CloudFront
>
> **Por que B**: latência metropolitana **sem** hardware seu.
> **D errada**: CloudFront acelera **conteúdo HTTP em cache**, não compute de baixa latência.

> [!question]- Q4. Um ASG no Outpost para de escalar em 20 instâncias, com a métrica alta.
> **A)** Cota de vCPU da região
> **B)** **A capacidade do Outpost é finita — é o hardware instalado** ✅
> **C)** Falta cross-zone
> **D)** Placement group limitando a 7 por AZ
>
> **Por que B**: capacidade no Outpost é **decisão de compra**, não de configuração.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Outposts é igual a Local Zone | Outposts fica **no seu** datacenter; Local Zone é da AWS, perto da cidade |
| Outposts tem capacidade elástica | É o **hardware do rack** |
| Outposts roda todos os serviços | **Subconjunto**; plano de controle na região |
| Outposts funciona totalmente offline | Cargas **em execução** continuam; criar recursos exige o link |
| Outposts dá multi-AZ local | Um Outpost é **um** local |
| gp3 no Outpost tem os limites da região | **16 TiB / 16.000 IOPS / 1.000 MiB/s** |
| "Latência baixa" sempre é Outposts | Cidade → **Local Zones**; mobile 5G → **Wavelength** |
| VMware Cloud on AWS é como Outposts | É o **inverso**: vSphere **na AWS** |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
