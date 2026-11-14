---
tags: [saa-c03, direct-connect, questoes]
servico: AWS Direct Connect
atualizado: 2026-11-08
---

# Direct Connect — Questões

> [!question]- Q1. A empresa precisa de 2 Gbps consistentes para on-premises, **criptografados**, sem passar pela internet.
> **A)** Site-to-Site VPN com dois túneis
> **B)** Direct Connect dedicada de 10 Gbps
> **C)** **Direct Connect + IPsec VPN sobre a conexão Direct Connect** ✅
> **D)** Transit Gateway com peering inter-region
>
> **Por que C**: o DX dá banda previsível fora da internet; a documentação **não afirma** criptografia por padrão, então a camada IPsec atende esse requisito. O whitepaper descreve a opção: *"IPsec VPN connection over private lines"*.
> **A errada**: criptografada, mas trafega **pela internet**, com banda não previsível.
> **B errada**: resolve banda, não criptografia.
> **D errada**: TGW é topologia **dentro** da AWS.

> [!question]- Q2. Um único Direct Connect atende a produção. Como torná-lo tolerante a falhas com o **menor custo**?
> **A)** Segunda conexão DX em outro local
> **B)** **Site-to-Site VPN como backup, com BGP para failover automático** ✅
> **C)** LAG com duas conexões
> **D)** Transit Gateway
>
> **Por que B**: é o padrão mais econômico — a VPN assume (com banda degradada) se o DX cair.
> **A errada**: é o desenho **mais robusto**, mas o enunciado pede **menor custo**.
> **C errada**: LAG exige conexões *"on the same AWS device"* — não protege contra falha do dispositivo ou do local.

> [!question]- Q3. Um private VIF precisa alcançar **12 VPCs** em 3 regiões e 4 contas.
> **A)** Um private VIF por VPC
> **B)** **Direct Connect gateway associado ao private VIF** ✅
> **C)** Public VIF
> **D)** VPC peering entre as 12
>
> **Por que B**: o DX gateway liga a *"multiple virtual private gateways across any account and AWS Region"* — e *"There are no additional charges to use a multi-account AWS Direct Connect gateway."*
> **A errada**: *"directly to a single VPC per private virtual interface"* — 12 VIFs para manter.
> ⚠️ Se as VPCs já estiverem atrás de um **Transit Gateway**, a resposta é **transit VIF** + DX gateway.

> [!question]- Q4. Precisa alcançar o **S3** pelo link privado, sem internet.
> **A)** Private VIF
> **B)** **Public VIF (ou interface endpoint do S3 sobre o DX)** ✅
> **C)** Transit VIF
> **D)** Gateway endpoint
>
> **Por que B**: o **public VIF** alcança *"all AWS public services using public IP addresses"* sem internet. A alternativa moderna é **interface endpoint** do S3 alcançado pelo DX (IP privado).
> **D errada**: **gateway endpoint funciona só de dentro da VPC** — não de on-premises.

> [!question]- Q5. A empresa quer começar com 500 Mbps e entregar rápido.
> **A)** Dedicated de 1 Gbps
> **B)** **Hosted connection** ✅
> **C)** Dedicated de 10 Gbps
> **D)** VPN
>
> **Por que B**: hosted vai de **50 Mbps a 25 Gbps**, é provisionada pelo **parceiro** e entrega muito mais rápido. Dedicated começa em **1 Gbps** e leva *"up to 72 business hours"* só para a porta.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Direct Connect é criptografado | A doc **não afirma** isso. Use **IPsec sobre DX** (ou MACsec) |
| Uma conexão DX é HA | **Ponto único de falha** |
| LAG dá HA de local | Exige conexões *"on the same AWS device"* |
| Dedicated começa em 50 Mbps | **Dedicated: 1/10/100/400 Gbps.** Hosted: 50 Mbps a 25 Gbps |
| Um private VIF alcança várias VPCs | **Uma** por VIF — várias só via **DX gateway** |
| Gateway endpoint funciona de on-premises | **Não.** Só de dentro da VPC. Use **interface endpoint** |
| DX sempre aumenta o custo | O **egress por GB é menor**: *"Reduced bandwidth costs"* |
| DX gateway multi-conta é cobrado | *"no additional charges"* |
| Posso aumentar a velocidade da dedicated | Exige **nova conexão** |

## Links

- [[3 - Performance (24%)/Direct Connect/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/Direct Connect/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/Direct Connect/3 - Detalhes|3 - Detalhes]]
