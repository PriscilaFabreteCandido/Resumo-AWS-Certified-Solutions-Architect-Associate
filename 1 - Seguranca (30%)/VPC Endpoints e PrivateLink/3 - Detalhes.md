---
tags: [saa-c03, vpc-endpoint, detalhes]
servico: VPC Endpoints e AWS PrivateLink
atualizado: 2026-11-08
---

# VPC Endpoints e PrivateLink — Detalhes

## 1. Gateway endpoint — como funciona

A doc: ele *"provide[s] reliable connectivity to Amazon S3 and DynamoDB without requiring an internet gateway or a NAT device for your VPC."*

Quando você cria, a AWS adiciona uma rota em cada route table que você selecionar: destino = **prefix list** do serviço, target = o endpoint. Essas rotas são gerenciadas pela AWS — você não as edita.

Três pontos de atenção:

**Escopo regional.** Pela regra de longest-prefix match, tráfego para o S3 **da região atual** vai pelo endpoint; para o S3 de **outra região**, sai pelo internet gateway.

**NACL precisa permitir.** *"The network ACLs... must also allow traffic"* para os CIDRs do serviço. E como *"You can't reference prefix lists in network ACL rules"*, você precisa listar os CIDRs ou liberar amplamente.

**Só de dentro da VPC.** Se o acesso vem de **on-premises** via Direct Connect ou VPN, o gateway endpoint não serve — use **interface endpoint**.

## 2. Interface endpoint — como funciona

A AWS cria uma **ENI** com IP privado em cada subnet que você escolher: *"For each subnet that you specify when you create a VPC endpoint, we create an endpoint network interface in the subnet."* As ENIs são *"requester-managed"*.

Com **DNS privado** habilitado, o nome público do serviço (`secretsmanager.sa-east-1.amazonaws.com`) resolve para o IP privado da ENI — então a aplicação não muda nada. Para isso, a VPC precisa de `enableDnsSupport` e `enableDnsHostnames`.

Como é uma ENI, você **pode** associar **security group** — e é assim que se restringe quem na VPC usa o endpoint.

E como é cobrado **por hora por AZ** mais **por GB**, criar interface endpoints para muitos serviços em muitas AZs tem custo real. A prova explora isso: se o serviço é S3 ou DynamoDB e o acesso é de dentro da VPC, **gateway endpoint** é a resposta de custo.

## 3. Endpoint policy

Tanto gateway quanto interface endpoint aceitam **endpoint policy**: uma política de recurso que limita **o que pode ser feito através daquele endpoint**.

Uso clássico de prova: impedir **exfiltração de dados**. Uma endpoint policy pode permitir acesso **apenas** aos buckets da sua organização:

```json
{
  "Statement": [{
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:*",
    "Resource": "*",
    "Condition": {"StringEquals": {"aws:PrincipalOrgID": "o-exemplo"}}
  }]
}
```

Do outro lado, a **bucket policy** pode exigir que o acesso venha de um endpoint específico, com a condição **`aws:SourceVpce`** (ou `aws:SourceVpc`). Juntas, as duas garantem que o dado não sai nem entra por fora do caminho privado.

## 4. PrivateLink para o seu próprio serviço

O produtor coloca o serviço atrás de um **Network Load Balancer** e publica um **endpoint service**. O consumidor cria um **interface endpoint** apontando para aquele service name.

Vantagens sobre peering e Transit Gateway:

| | **PrivateLink** | **Peering / TGW** |
|---|---|---|
| O que expõe | **Um serviço** | **A rede inteira** |
| CIDR sobreposto | **Irrelevante** | **Impede** |
| Direção | Unidirecional (consumidor → produtor) | Bidirecional |
| Escala | Um endpoint por consumidor | Rotas e route tables |

É por isso que PrivateLink é a resposta para **"CIDR sobreposto"** e para **"expor um serviço a centenas de clientes sem conectar as redes"**.

## 5. Gateway Load Balancer endpoint

Encaminha tráfego para um **GWLB** que distribui para appliances de inspeção (firewall, IDS/IPS de terceiro), usando **GENEVE na porta 6081**. É a peça do desenho de inspeção centralizada:

```
Subnet de workload  → GWLB endpoint → GWLB → appliances → volta e segue
```

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[VPC]] · [[NAT Gateway]] · [[S3]] · [[ELB (Load Balancers)]] · [[VPC Peering]] · [[Transit Gateway]]
- [Gateway endpoints](https://docs.aws.amazon.com/vpc/latest/privatelink/gateway-endpoints.html)
