---
tags: [saa-c03, dominio-1, vpc, security-group, nacl, endpoints]
dominio: 1
tasks: [1.2]
atualizado: 2026-11-08
---

# Rede segura — SG, NACL, subnets e endpoints

## 🧩 Em 30 segundos

- **SG é stateful, nível de instância, só allow, avalia tudo junto.** **NACL é stateless, nível de subnet, allow e deny, avalia em ordem e para na primeira regra que casa.**
- Stateless significa: você precisa liberar **as portas efêmeras** no retorno. É a pegadinha mais antiga da prova.
- **Toda subnet tem 5 IPs reservados.** Máscara de /28 a /16.
- Saída da subnet privada: **NAT gateway** (IPv4), **egress-only internet gateway** (IPv6), ou **endpoint** quando o destino é serviço AWS.
- **Gateway endpoint é grátis e só serve S3 e DynamoDB.** Interface endpoint (PrivateLink) é cobrado e serve o resto.

## 🧠 Teste-se primeiro

> [!question]- A tabela oficial SG × NACL, de cabeça
> | Característica | Security group | Network ACL |
> |---|---|---|
> | Nível | Instance level | Subnet level |
> | Escopo | Todas as instâncias associadas ao SG | Todas as instâncias nas subnets associadas |
> | Tipo de regra | **Allow rules only** | **Allow and deny rules** |
> | Avaliação | **Avalia todas as regras** antes de decidir | **Avalia em ordem crescente até achar match** |
> | Tráfego de retorno | **Automaticamente permitido (stateful)** | **Precisa ser explicitamente permitido (stateless)** |
>
> A recomendação oficial: *"Use security groups as the primary mechanism"*; NACL dá *"stateless, coarse-grain network control"*.

> [!question]- Quais são os 5 IPs reservados em 10.0.0.0/24?
> `.0` endereço de rede · `.1` **router da VPC** · `.2` **DNS** (base da faixa + 2) · `.3` reservado para uso futuro · `.255` broadcast (a VPC não suporta broadcast).
> Logo: `/28` → 16 endereços → **11 utilizáveis**.

> [!question]- Como negar um único IP malicioso?
> **NACL com regra DENY** de número **menor** que o allow mais amplo (a avaliação para na primeira que casa). SG **não tem deny**.
> Se for ataque na camada 7 (SQL injection, flood HTTP), a resposta vira **AWS WAF**.

> [!question]- Qual o comportamento padrão do SG default e da NACL default?
> **SG default**: inbound libera tráfego **do próprio SG** (source = o ID dele mesmo); outbound libera **tudo** (`0.0.0.0/0`). Não pode ser deletado.
> **NACL default**: regra 100 ALLOW tudo inbound, regra 100 ALLOW tudo outbound, e regra `*` DENY tudo no fim. Já uma NACL **criada por você** começa negando tudo.

## Subnets e segmentação

| Item | Regra |
|---|---|
| IPs reservados | **5** por subnet (4 primeiros + o último) |
| Máscara IPv4 de subnet | **/28 a /16** |
| Máscara IPv6 de subnet | /44 a /64, em incrementos de /4 |
| Subnets na mesma VPC | **Não podem sobrepor** |
| Subnet pública | Tem rota `0.0.0.0/0` → **internet gateway** |
| Subnet privada | Não tem rota direta para IGW. Sai por **NAT gateway** ou **endpoint** |
| Subnet é zonal | Vive em **uma AZ**. Multi-AZ = uma subnet por AZ |

**Arquitetura de 3 camadas que a prova espera**: ALB em subnets **públicas** (2+ AZs) → app em subnets **privadas** → banco em subnets privadas **sem rota de saída**, com SG do banco aceitando tráfego **apenas do SG da aplicação** (referência SG-para-SG, não CIDR).

> [!tip] SG referenciando SG é a resposta "menor privilégio"
> *"Security groups are more versatile than network ACLs, due to their ability to perform stateful packet filtering and create rules that reference other security groups."*
> Quando a alternativa oferece "liberar o CIDR da subnet da aplicação" **versus** "liberar o security group da aplicação", a segunda é a correta: o CIDR abrange qualquer coisa que subir naquela subnet.

## NAT gateway e egress-only IGW

| Item | Valor |
|---|---|
| Onde fica | Subnet **pública**, com **Elastic IP** (tipo public) |
| Banda | *"Scale up to 100 Gbps"* |
| Escopo | Zonal — vive em **uma AZ**. *"Create a NAT gateway in each Availability Zone to ensure zone-independent architecture"* |
| Security group | **Não aceita.** Controle por NACL na subnet dele ou por SG nos recursos atrás |
| HA | Redundante **dentro** da AZ, não entre AZs |
| Não suporta | **Port forwarding** e **bastion**. Para isso: NAT instance — ou melhor, **SSM Session Manager** |
| Timeout | Devolve **RST** (NAT instance devolve FIN) |
| IPv6 de saída | O correto é **egress-only internet gateway** (stateful, sem SG, sem custo pelo gateway) |
| NAT privado | Existe (`Private`), sem EIP, para alcançar on-premises sem passar pela internet |

A própria AWS: *"We recommend that you use NAT gateways because they provide better availability and bandwidth and require less effort on your part to administer."*

## Endpoints

| Tipo | Serviços | Como roteia | Custo |
|---|---|---|---|
| **Gateway endpoint** | **Só S3 e DynamoDB** | Rota com **prefix list** na route table | *"There is no additional charge"* |
| **Interface endpoint** (PrivateLink) | Quase todos os serviços AWS, serviços de parceiros e **o seu próprio** serviço | **ENI com IP privado** na sua subnet, resolvida por DNS | Cobrado por hora e por GB |
| **Gateway Load Balancer endpoint** | Appliance de inspeção de terceiro | Route table → GWLB | Cobrado |

Detalhes que caem:

- **Longest-prefix match**: *"If there is a route that sends all internet traffic (0.0.0.0/0) to an internet gateway, the endpoint route takes precedence for traffic destined for the service... in the current Region."* Tráfego para o serviço em **outra região** continua saindo pelo IGW.
- A **NACL** da subnet precisa permitir o tráfego para os CIDRs do serviço, e *"You can't reference prefix lists in network ACL rules"*.
- Subnet cuja route table **não** tem a rota do endpoint continua usando o endpoint **público** do serviço.
- Interface endpoint para S3 se justifica quando o acesso vem de **on-premises** (via DX/VPN), porque gateway endpoint só funciona de dentro da VPC.

> [!important] Economia clássica de prova
> Workload em subnet privada escrevendo muito no S3 **através do NAT gateway** paga por GB processado. Trocar por **gateway endpoint** elimina esse custo e tira o S3 do caminho da internet. Isso aparece tanto no domínio 1 (segurança) quanto no 4 (custo).

## ❓ Questões de prova

> [!example]- Q1 — Instâncias numa subnet privada conseguem iniciar conexões HTTPS para a internet, mas as respostas não chegam. A NACL da subnet tem apenas uma regra outbound permitindo TCP 443. O que falta?
> **A)** Mudar o security group para stateful
> **B)** **Adicionar regra inbound na NACL permitindo as portas efêmeras (1024-65535)** ✅
> **C)** Adicionar rota para o internet gateway
> **D)** Associar um Elastic IP às instâncias
>
> **Por que B**: NACL é **stateless** — *"responses to that traffic are not automatically allowed"*. A resposta HTTPS volta para uma **porta efêmera** da instância, não para a 443.
> **A errada**: SG **já é** stateful; o problema não está nele.
> **C errada**: o enunciado diz que as conexões **saem**, então a rota existe (via NAT).
> **D errada**: instância em subnet privada não leva EIP; a saída é pelo NAT gateway.

> [!example]- Q2 — Uma empresa quer que o banco RDS aceite conexões **apenas** das instâncias da camada de aplicação, que escalam automaticamente. Qual configuração?
> **A)** SG do RDS liberando o CIDR da subnet da aplicação
> **B)** **SG do RDS liberando, na porta do banco, o security group da aplicação como source** ✅
> **C)** NACL na subnet do banco liberando os IPs das instâncias
> **D)** SG do RDS liberando `0.0.0.0/0` na porta do banco, protegido por NACL
>
> **Por que B**: referência SG-para-SG acompanha o Auto Scaling automaticamente e é o menor privilégio possível.
> **A errada**: funciona, mas libera **qualquer** recurso que suba naquela subnet, agora ou depois.
> **C errada**: IPs mudam a cada scaling; manutenção impossível.
> **D errada**: expõe o banco; NACL é controle grosseiro e stateless.

> [!example]- Q3 — Para reduzir custo, um time precisa que instâncias privadas gravem em um bucket S3 da mesma região sem tráfego pela internet e **sem** custo adicional de endpoint. Solução?
> **A)** Interface endpoint para o S3
> **B)** **Gateway endpoint para o S3 na route table das subnets privadas** ✅
> **C)** NAT gateway compartilhado numa única AZ
> **D)** VPC peering com uma VPC que tenha internet gateway
>
> **Por que B**: gateway endpoint não tem cobrança adicional e mantém o tráfego fora da internet.
> **A errada**: tecnicamente correto, mas **cobrado** — contraria "sem custo adicional".
> **C errada**: NAT gateway é a fonte do custo que se quer eliminar, e um NAT só já quebra a zona-independência.
> **D errada**: continua indo para a internet, com peering e NAT no caminho.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| SG pode negar um IP | SG **só** tem allow. Deny é NACL (ou WAF) |
| NACL avalia todas as regras | Para na **primeira** que casa, da menor numeração para a maior |
| NACL é stateful | É **stateless**: libere as portas efêmeras no retorno |
| NAT gateway aceita SG | Não aceita |
| 1 NAT gateway é HA | É **zonal**. HA = um por AZ |
| NAT gateway serve para IPv6 | Saída IPv6 = **egress-only internet gateway** |
| NAT gateway pode ser bastion | Não suporta bastion nem port forwarding |
| Interface endpoint é grátis como o gateway | **Só o gateway endpoint é grátis** |
| Gateway endpoint serve qualquer serviço | **Só S3 e DynamoDB** |
| Um /28 dá 16 IPs utilizáveis | Dá **11** |
| SG default nega tudo | Nega o inbound de **fora do próprio SG**, mas libera **todo** o outbound |
| NACL que eu criar começa permitindo | Começa **negando tudo**. Só a NACL **default** vem liberada |
| NACL pode bloquear o DNS da VPC | *"Route 53 Resolver (VPC+2) DNS requests"* e o IMDS **não** passam por NACL/SG. Para filtrar DNS, use **Route 53 Resolver DNS Firewall** |

## Links

- [[01 - Dominio 1 - Design Secure Architectures (30%)]]
- [[Protecao de borda - WAF, Shield e Firewall Manager]]
- [[Rede e borda - CloudFront, Global Accelerator e conectividade hibrida]]
- [Comparação oficial SG × NACL](https://docs.aws.amazon.com/vpc/latest/userguide/infrastructure-security.html)
- [Sizing de subnet](https://docs.aws.amazon.com/vpc/latest/userguide/subnet-sizing.html)
