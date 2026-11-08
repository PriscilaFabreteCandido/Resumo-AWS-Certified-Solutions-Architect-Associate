---
tags: [saa-c03, ram, questoes]
servico: AWS Resource Access Manager (RAM)
atualizado: 2026-11-08
---

# AWS RAM — Questões

> [!question]- Q1. Vários times precisam lançar recursos em subnets gerenciadas pelo time de rede, sem criar uma VPC por conta.
> **A)** VPC peering entre todas as contas
> **B)** **AWS RAM compartilhando as subnets da VPC do time de rede** ✅
> **C)** Transit Gateway
> **D)** PrivateLink
>
> **Por que B**: é VPC sharing — reduz VPCs, NAT gateways e conexões, mantendo o isolamento de conta.
> **C errada**: TGW conecta VPCs **separadas**; o enunciado quer evitar criá-las.
> **D errada**: PrivateLink expõe **serviço**, não subnet.

> [!question]- Q2. Uma empresa quer que o time de rede governe a topologia do Transit Gateway, mas cada conta anexe sua própria VPC.
> **A)** Criar um TGW em cada conta
> **B)** **Compartilhar o Transit Gateway via AWS RAM; cada conta cria o attachment da sua VPC** ✅
> **C)** VPC peering full mesh
> **D)** Compartilhar as subnets via RAM
>
> **Por que B**: é o padrão de rede multi-conta — governança central, autonomia local.
> **A errada**: TGWs separados não se falam sem peering de TGW, e multiplicam custo por attachment.

> [!question]- Q3. Reduzir o custo de NAT gateway em 20 contas que hoje têm uma VPC cada.
> **A)** Um NAT gateway compartilhado via peering
> **B)** **VPC sharing via RAM: uma VPC central com NAT por AZ, compartilhada com as 20 contas** ✅
> **C)** NAT instance em cada conta
> **D)** Gateway endpoint em cada VPC
>
> **Por que B**: consolida de 20 conjuntos de NAT gateway para um, mantendo as contas separadas.
> **A errada**: peering **não** permite usar o NAT gateway de outra VPC (o tráfego não é roteável para a internet por ali).
> **D errada**: ajuda muito se o destino for S3/DynamoDB, mas não resolve a saída geral para a internet.

> [!question]- Q4. O AWS RAM pode ser usado para dar a outra conta permissão de ler um bucket S3?
> **A)** Sim, compartilhando o bucket
> **B)** **Não: o S3 não é compartilhado via RAM; use bucket policy (e IAM na conta de origem)** ✅
> **C)** Sim, com RAM managed permissions
> **D)** Só dentro da mesma organização
>
> **Por que B**: RAM compartilha tipos de recurso suportados (subnet, TGW, resolver rules, licenças…). Acesso a bucket é **policy de recurso** + policy de identidade.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| RAM compartilha permissão | RAM compartilha **recurso**; permissão é IAM/SCP |
| RAM é cobrado | *"no additional charges"* |
| A conta participante pode alterar a VPC compartilhada | **Não.** Só lançar recursos nas subnets |
| Posso compartilhar bucket S3 via RAM | **Não.** Use bucket policy |
| Compartilhar dentro da organização exige convite | **Não** (exige o sharing com Organizations ativado). Fora dela, **sim** |
| VPC sharing junta as contas | As contas seguem **separadas** para IAM, billing e isolamento |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
