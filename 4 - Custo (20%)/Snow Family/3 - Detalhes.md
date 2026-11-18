---
tags: [saa-c03, snow, detalhes]
servico: AWS Snow Family
atualizado: 2026-11-08
---

# Snow Family — Detalhes

## 1. O estado atual do serviço — leia primeiro

A documentação do Snowball Edge abre com:

> *"AWS Snowball Edge is no longer available to new customers. New customers should explore AWS DataSync for online transfers, AWS Data Transfer Terminal for secure physical transfers, or AWS Partner solutions. For edge computing, explore AWS Outposts."* (o AWS Snowball Edge não está mais disponível para novos clientes; novos clientes devem considerar o AWS DataSync para transferências online, o AWS Data Transfer Terminal para transferências físicas seguras, ou soluções de parceiros da AWS — e, para computação na borda, o AWS Outposts)

E a página do produto:

> *"On December 31, 2026, AWS will discontinue support for AWS Snowball devices in all AWS commercial Regions. This includes both the AWS Snowball Edge Storage Optimized and Compute Optimized devices."* (em 31 de dezembro de 2026, a AWS vai encerrar o suporte aos dispositivos Snowball em todas as Regiões comerciais, incluindo os modelos Snowball Edge Storage Optimized e Compute Optimized)

(GovCloud e ADC Regions com jobs ativos não são afetados.)

**Como isso afeta a prova**: a **AWS Snow Family** permanece na lista oficial de serviços **em escopo** do SAA-C03, então o cenário "link insuficiente + prazo curto" continua apontando para ela. Mas a leitura inteligente da alternativa mudou:

| Enunciado | Resposta |
|---|---|
| Fala de **link insuficiente** e prazo | **Snow Family** |
| Fala só de "migrar X TB" sem restrição de banda | **DataSync** |
| Fala de **compute na borda** | **Outposts** |

## 2. A decisão é uma conta

```
Tempo ≈ Volume ÷ Banda útil
```

Considere que a banda útil real é menor que a nominal (overhead, concorrência com o tráfego de produção).

| Volume | 100 Mbps | 1 Gbps | 10 Gbps |
|---|---|---|---|
| 10 TB | ~9 dias | ~1 dia | ~2 h |
| 50 TB | ~46 dias | ~5 dias | ~11 h |
| **80 TB** | **> 70 dias** | ~7 dias | ~18 h |
| 500 TB | ~1,3 ano | ~46 dias | ~5 dias |

Se o resultado não cabe no prazo **e** não dá para aumentar a banda em tempo (provisionar Direct Connect leva semanas), é dispositivo físico.

⚠️ E não esqueça: migrar pela rede **consome a banda de produção**. Um link de 1 Gbps compartilhado com a operação não entrega 1 Gbps para a migração.

## 3. Os dispositivos — o que a doc informa

**Snowball Edge Storage Optimized 210 TB**: *"210 TB usable (for object and NFS data transfer)"* (210 TB utilizáveis (para transferência de objetos e NFS)) em NVMe, com **104 vCPUs** e **416 GB** de RAM utilizável.

**Snowball Edge Compute Optimized**: *"up to 104 vCPUs, 416 GB of memory, and 28 TB of dedicated NVMe SSD for compute instances"* (a tabela lista 512 GB físicos, com 416 GB utilizáveis).

Recursos comuns:
- **Cluster** de *"3 to 16 devices"* (de 3 a 16 dispositivos) — dá durabilidade ao dado **enquanto está no seu site**
- Protocolos: *"NFSv3, NFSv4, NFSv4.1, Amazon S3 over HTTP or HTTPS"* (a API S3 é compatível com AWS CLI **1.16.14 ou anterior**)
- Rede: *"up to 100 Gbit/second"* (até 100 Gbit/s)
- Criptografia com **KMS**, feita no dispositivo

⚠️ As especificações de **Snowcone** e **Snowmobile** **não aparecem** na documentação atual que conferi.

## 4. Storage Optimized × Compute Optimized

| | **Storage Optimized** | **Compute Optimized** |
|---|---|---|
| Para quê | **Transferir** dados | **Processar** na borda |
| Storage | **210 TB** usáveis | **28 TB** NVMe para as instâncias |
| Caso de uso | Migração de NAS, arquivo, data lake | Inferência de ML, pré-processamento em local remoto |

Para **compute na borda** hoje, a própria AWS aponta **Outposts**.

## 5. O fluxo de um job

```
1. Criar o job no console (escolher dispositivo, bucket de destino, chave KMS)
2. A AWS envia o dispositivo
3. Conectar na rede local e copiar (NFS ou API S3)
4. Devolver (etiqueta de retorno inclusa; E Ink mostra o endereço)
5. A AWS importa para o S3 e apaga o dispositivo
```

O dado é criptografado **no dispositivo**, com chave do **KMS** — a AWS não tem a chave em trânsito.

## 6. Snow × as alternativas, em resumo

| Objetivo | Serviço |
|---|---|
| **Banda insuficiente**, volume grande, prazo curto | **Snow Family** (⚠️ suporte até 31/12/2026) |
| Mover pela rede (uma vez ou agendado) | **DataSync** |
| **Continuar acessando** com protocolo local | **Storage Gateway** |
| **Terceiro envia** arquivos | **Transfer Family** |
| Upload global para um bucket | **S3 Transfer Acceleration** |
| Banda dedicada e previsível de longo prazo | **Direct Connect** |
| **Compute na borda** | **Outposts** |
| Transferência física segura (novos clientes) | **AWS Data Transfer Terminal** |

## Links

- [[4 - Custo (20%)/Snow Family/1 - O que e|1 - O que e]] · [[4 - Custo (20%)/Snow Family/2 - Decorar|2 - Decorar]] · [[4 - Custo (20%)/Snow Family/4 - Questoes|4 - Questoes]]
- [[3 - Performance (24%)/DataSync/1 - O que e|DataSync]] · [[3 - Performance (24%)/Storage Gateway/1 - O que e|Storage Gateway]] · [[3 - Performance (24%)/Transfer Family/1 - O que e|Transfer Family]] · [[3 - Performance (24%)/S3/1 - O que e|S3]] · [[3 - Performance (24%)/Direct Connect/1 - O que e|Direct Connect]] · [[3 - Performance (24%)/Outposts/1 - O que e|Outposts]] · [[9 - Fundamentos e apoio/Estrategias de migracao (7 Rs)/1 - O que e|Estrategias de migracao (7 Rs)]] · [[04 - Fora de escopo (nao estude isso)]]
