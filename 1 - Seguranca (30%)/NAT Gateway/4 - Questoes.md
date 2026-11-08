---
tags: [saa-c03, nat-gateway, questoes]
servico: NAT Gateway
atualizado: 2026-11-08
---

# NAT Gateway — Questões

> [!question]- Q1. Uma aplicação em 3 AZs usa **um** NAT gateway e envia 50 TB/mês para um bucket S3 na mesma região. Qual mudança reduz mais o custo?
> **A)** Criar um NAT gateway por AZ
> **B)** **Gateway endpoint para o S3 nas route tables das subnets privadas** ✅
> **C)** Substituir o NAT gateway por NAT instances
> **D)** Habilitar Transfer Acceleration no bucket
>
> **Por que B**: elimina os 50 TB do GB processado do NAT **e** o cross-AZ, sem custo adicional de endpoint.
> **A errada**: corta o cross-AZ, mas você continua pagando por GB no NAT.
> **C errada**: troca uma cobrança por outra e adiciona esforço de HA e patch.
> **D errada**: **adiciona** custo, e é para upload de fora da AWS.

> [!question]- Q2. Como restringir o tráfego que sai pelo NAT gateway usando security group?
> **A)** Associar um SG ao NAT gateway
> **B)** **Não é possível: aplique o SG nos recursos atrás do NAT, ou uma NACL na subnet dele** ✅
> **C)** Usar uma NACL no NAT gateway
> **D)** Usar o Network Firewall no lugar do SG
>
> **Por que B**: *"You cannot associate security groups with NAT gateways."*
> **C errada**: a NACL se associa à **subnet**, não ao gateway.
> **D errada**: Network Firewall é a resposta para **inspeção** de saída, mas não é "usar security group".

> [!question]- Q3. Após a perda de uma AZ, instâncias privadas de outra AZ perderam acesso à internet. Por quê?
> **A)** O internet gateway falhou
> **B)** **Havia um único NAT gateway, que vivia na AZ que caiu** ✅
> **C)** A NACL bloqueou
> **D)** O Elastic IP foi liberado
>
> **Por que B**: o NAT gateway é **zonal** — *"Create a NAT gateway in each Availability Zone to ensure zone-independent architecture."*
> **A errada**: o internet gateway é regional e redundante.

> [!question]- Q4. Instâncias em subnet privada precisam de saída **IPv6** para a internet, sem aceitar conexões de entrada.
> **A)** NAT gateway
> **B)** **Egress-only internet gateway** ✅
> **C)** Internet gateway com NACL restritiva
> **D)** NAT instance com IPv6
>
> **Por que B**: *"is for use with IPv6 traffic only. To enable outbound-only internet communication over IPv4, use a NAT gateway instead."*

> [!question]- Q5. Um time quer usar o NAT gateway também como bastion para acessar as instâncias privadas por SSH.
> **A)** Configurar port forwarding no NAT gateway
> **B)** **Não é suportado; use SSM Session Manager (ou um bastion dedicado)** ✅
> **C)** Associar um Elastic IP adicional
> **D)** Usar NAT instance em modo bastion
>
> **Por que B**: a tabela oficial marca **bastion** e **port forwarding** como *"Not supported"* no NAT gateway. A solução moderna é Session Manager, *"without the need to open inbound ports, maintain bastion hosts, or manage SSH keys"*.
> **D errada**: funciona tecnicamente (NAT instance suporta bastion), mas é a resposta pior — você volta a gerenciar HA, patch e chave SSH.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| NAT gateway aceita security group | **Não aceita** |
| Um NAT gateway é HA | É **zonal**. HA = um por AZ |
| NAT gateway cobra só por hora | **Hora + GB processado** |
| NAT gateway serve saída IPv6 | IPv6 = **egress-only internet gateway** |
| NAT gateway pode ser bastion | **Não suportado** (nem port forwarding) |
| NAT gateway fica na subnet privada | Fica na subnet **pública**, com Elastic IP |
| NAT instance é sempre pior | Em volume baixo pode ser mais barato — ao preço de HA e manutenção manuais |
| NAT gateway fragmenta TCP | Só **UDP**; TCP e ICMP fragmentados são **descartados** |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
