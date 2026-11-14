---
tags: [saa-c03, snow, migracao, transferencia]
servico: AWS Snow Family
tipo: Transferência física de dados
dominios: [4, 3]
atualizado: 2026-11-08
---

# AWS Snow Family — O que é

> [!info] Em uma frase
> **Dispositivos físicos** que a AWS envia para você copiar os dados localmente e devolver — para quando o **link de rede não dá conta** do volume no prazo.

> [!warning] Fim de suporte anunciado
> A doc do Snowball Edge avisa: *"AWS Snowball Edge is no longer available to new customers. New customers should explore AWS DataSync for online transfers, AWS Data Transfer Terminal for secure physical transfers, or AWS Partner solutions. For edge computing, explore AWS Outposts."*
>
> E: *"On December 31, 2026, AWS will discontinue support for AWS Snowball devices in all AWS commercial Regions."*
>
> **Para a prova**: a **AWS Snow Family** continua na lista oficial de serviços **em escopo** do SAA-C03, então reconheça o cenário. Mas se **DataSync** estiver entre as alternativas e o enunciado **não** falar de link insuficiente, DataSync é a resposta moderna.

## O gatilho único

**Banda insuficiente para o prazo.** A conta:

```
Tempo ≈ Volume ÷ Banda útil
```

| Volume | Banda | Tempo |
|---|---|---|
| 10 TB | 1 Gbps | ~1 dia |
| **80 TB** | **100 Mbps** | **> 70 dias** |
| 500 TB | 1 Gbps | ~46 dias |

Se o tempo não cabe no prazo → **dispositivo físico**.

## Links

- [[4 - Custo (20%)/Snow Family/2 - Decorar|2 - Decorar]] · [[4 - Custo (20%)/Snow Family/3 - Detalhes|3 - Detalhes]] · [[4 - Custo (20%)/Snow Family/4 - Questoes|4 - Questoes]]
- [[3 - Performance (24%)/DataSync/1 - O que e|DataSync]] · [[3 - Performance (24%)/Storage Gateway/1 - O que e|Storage Gateway]] · [[3 - Performance (24%)/S3/1 - O que e|S3]] · [[9 - Fundamentos e apoio/Estrategias de migracao (7 Rs)/1 - O que e|Estrategias de migracao (7 Rs)]] · [[3 - Performance (24%)/Outposts/1 - O que e|Outposts]]
- [O que é o Snowball Edge](https://docs.aws.amazon.com/snowball/latest/developer-guide/whatisedge.html)
