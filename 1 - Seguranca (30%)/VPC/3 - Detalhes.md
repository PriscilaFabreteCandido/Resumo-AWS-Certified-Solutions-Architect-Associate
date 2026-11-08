---
tags: [saa-c03, vpc, detalhes]
servico: Amazon VPC
atualizado: 2026-11-08
---

# Amazon VPC — Detalhes

## 1. Endereçamento

A doc diz: *"The allowed IPv4 CIDR block size for a subnet is between a `/28` netmask and `/16` netmask."*

**Cinco** endereços são reservados em cada subnet: *"The first four IP addresses and the last IP address in each subnet CIDR block are not available for your use."* O exemplo oficial para `10.0.0.0/24`:

- `10.0.0.0` — Network address
- `10.0.0.1` — *"Reserved by AWS for the VPC router"*
- `10.0.0.2` — *"Reserved by AWS. The IP address of the DNS server is the base of the VPC network range plus two."* E a doc complementa: *"We also reserve the base of each subnet range plus two for all CIDR blocks in the VPC."*
- `10.0.0.3` — *"Reserved by AWS for future use"*
- `10.0.0.255` — *"Network broadcast address. We do not support broadcast in a VPC, therefore we reserve this address."*

Para **BYOIP**, a regra muda: *"you can use all of the IP addresses in the range, including the first address... and the last address."*

Em IPv6, as máscaras vão de **/44 a /64** em incrementos de /4; são reservados os quatro primeiros e o último endereço, mais `FE80::/10` (link-local) e `FE80:ec2::1` (router da VPC).

> [!tip] Planejamento de CIDR é decisão difícil de reverter
> Escolha uma faixa **ampla e não sobreposta** com o on-premises e com as outras VPCs. O whitepaper de conectividade recomenda: *"We recommend allocating a single, contiguous, non-overlapping CIDR block to be used by each VPC."*
> CIDR sobreposto impede peering e Transit Gateway. O único contorno é **PrivateLink**, que expõe serviço em vez de rotear redes.

## 2. Arquitetura em camadas (o desenho que a prova espera)

```
          Internet
              │
      ┌───────▼───────┐
      │ Internet GW   │
      └───────┬───────┘
   ┌──────────┴──────────┐
   │  Subnets PÚBLICAS   │   ALB (2+ AZs) · NAT Gateway (1 por AZ)
   │  (rota 0.0.0.0/0    │
   │   para o IGW)       │
   └──────────┬──────────┘
   ┌──────────▼──────────┐
   │  Subnets PRIVADAS   │   Aplicação (ASG multi-AZ)
   │  (rota 0.0.0.0/0    │   SG: aceita só do SG do ALB
   │   para o NAT GW)    │
   └──────────┬──────────┘
   ┌──────────▼──────────┐
   │  Subnets de DADOS   │   RDS Multi-AZ
   │  (sem rota de saída)│   SG: aceita só do SG da aplicação
   └─────────────────────┘
```

Três princípios nesse desenho:

1. **Duas AZs no mínimo** — o ALB *"it is a requirement that you enable at least two or more Availability Zones"*.
2. **SG referenciando SG**, nunca CIDR — acompanha o Auto Scaling automaticamente e é o menor privilégio. A doc: *"Security groups are more versatile than network ACLs, due to their ability to perform stateful packet filtering and create rules that reference other security groups."*
3. **Camada de dados sem rota de saída** — o banco não precisa alcançar a internet.

## 3. Roteamento

Cada subnet está associada a **uma** route table (a *main* se você não associar outra). As rotas usam **longest-prefix match**: a rota mais específica ganha.

Isso explica o comportamento do gateway endpoint: *"If there is a route that sends all internet traffic (0.0.0.0/0) to an internet gateway, the endpoint route takes precedence for traffic destined for the service... in the current Region."* Tráfego para o serviço em **outra região** continua saindo pelo IGW.

Destinos possíveis de uma rota: internet gateway, NAT gateway, egress-only IGW, virtual private gateway, transit gateway, peering connection, VPC endpoint (via prefix list), ENI, Gateway Load Balancer endpoint, local (sempre presente, para a própria VPC).

## 4. Saída para a internet

**Internet Gateway** — entrada e saída. A instância precisa de IP público (ou Elastic IP) e a subnet precisa da rota.

**NAT Gateway** — só saída, para subnets privadas. Fica numa subnet **pública** com Elastic IP. Escala *"up to 100 Gbps"*. É **zonal**: *"Create a NAT gateway in each Availability Zone to ensure zone-independent architecture."* **Não aceita security group.** Não suporta port forwarding nem bastion.

**Egress-only Internet Gateway** — *"allows outbound communication over IPv6 from instances in your VPC to the internet, and prevents the internet from initiating an IPv6 connection with your instances"*. É *"for use with IPv6 traffic only"*, stateful, sem SG, e o gateway em si não é cobrado.

**NAT privado** — variante sem Elastic IP, para alcançar on-premises sem passar pela internet.

## 5. DNS

Dois atributos da VPC: **`enableDnsSupport`** (o resolver da AWS responde no VPC+2) e **`enableDnsHostnames`** (instâncias recebem nome DNS público). Ambos precisam estar ligados para que o DNS privado de **interface endpoints** funcione.

O resolver (VPC+2) **não pode ser bloqueado** por SG ou NACL. Para filtrar DNS, use **Route 53 Resolver DNS Firewall**. Para resolver nomes do on-premises, use **Route 53 Resolver endpoints** (inbound e outbound).

## 6. Observabilidade

**VPC Flow Logs** registram metadados do tráfego (origem, destino, portas, bytes, ACCEPT/REJECT) para CloudWatch Logs, S3 ou Firehose. Não capturam **payload**.

São a resposta para "descobrir por que o tráfego está sendo bloqueado" e são fonte fundacional do **GuardDuty**.

**Traffic Mirroring** copia o pacote inteiro para um appliance de inspeção — é a opção quando o enunciado pede análise de conteúdo, não de metadado.

## 7. Compartilhamento e multi-conta

**VPC sharing** via **AWS RAM**: a conta dona compartilha **subnets** com outras contas da organização. Os participantes lançam recursos nas subnets compartilhadas, mas não gerenciam a VPC. Reduz número de VPCs, NAT gateways e conexões — é resposta de custo e de simplificação.

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[Security Groups]] · [[NACL (Network ACL)]] · [[NAT Gateway]] · [[VPC Endpoints e PrivateLink]] · [[AWS RAM]]
- [Sizing de subnet](https://docs.aws.amazon.com/vpc/latest/userguide/subnet-sizing.html)
