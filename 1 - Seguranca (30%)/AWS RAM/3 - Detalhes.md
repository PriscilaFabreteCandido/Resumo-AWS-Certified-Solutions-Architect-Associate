---
tags: [saa-c03, ram, detalhes]
servico: AWS Resource Access Manager (RAM)
atualizado: 2026-11-08
---

# AWS RAM — Detalhes

## 1. VPC sharing, em detalhe

A conta **proprietária** cria a VPC, as subnets, as route tables, os NAT gateways e as conexões (DX, VPN, TGW). Depois compartilha **subnets específicas** com contas **participantes**.

O que cada lado pode fazer:

| | **Conta proprietária** | **Conta participante** |
|---|---|---|
| Criar/alterar VPC, subnets, route tables | **Sim** | **Não** |
| Lançar instâncias, ALBs, RDS nas subnets | Sim | **Sim** |
| Criar security groups na VPC compartilhada | Sim | **Sim** (os seus) |
| Ver recursos das outras contas | Vê os recursos nas subnets | Não vê os das outras |

Por que isso é resposta de prova:

- **Custo**: um conjunto de NAT gateways e uma conexão DX atendem N contas, em vez de N conjuntos
- **Endereçamento**: um único plano de CIDR, sem risco de sobreposição
- **Simplicidade**: elimina dezenas de peerings
- **Isolamento preservado**: as contas continuam separadas para IAM, billing e raio de explosão

## 2. Transit Gateway compartilhado

O padrão de rede multi-conta: a conta de **Network** cria o Transit Gateway e o compartilha via RAM. Cada conta de workload cria um **attachment** da sua VPC ao TGW compartilhado.

Assim, a topologia e as route tables ficam sob governança do time de rede, mas cada conta mantém autonomia sobre a sua VPC.

## 3. Route 53 Resolver rules

Numa arquitetura híbrida, o time de rede cria **outbound resolver rules** (encaminhar `corp.exemplo.com` para o DNS on-premises) e compartilha via RAM. Todas as contas passam a resolver nomes internos sem configurar nada.

## 4. Como funciona o compartilhamento

Você cria um **resource share** com: os **recursos**, os **principals** (organização, OUs, contas, roles/users) e as **RAM managed permissions** (o que o participante pode fazer com o recurso).

Dentro da organização: *"you can share resources with all the other accounts in the organization or only those accounts contained by one or more specified organizational units (OUs)"* — e isso requer que o sharing com Organizations esteja habilitado. Fora da organização, há convite.

## 5. O que o RAM não faz

| Enunciado | Serviço |
|---|---|
| Dar permissão para um principal de outra conta | **IAM role cross-account + STS** |
| Impedir ações em contas | **SCP** |
| Conectar VPCs separadas | **TGW** ou **peering** |
| Expor um serviço sem rotear redes | **PrivateLink** |
| Compartilhar um bucket S3 | **Bucket policy** (o S3 não é compartilhado via RAM) |
| Compartilhar snapshot de EBS | Permissão do snapshot + **key policy do KMS** |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[VPC]] · [[Transit Gateway]] · [[Organizations e Control Tower]] · [[IAM]] · [[Route 53]]
