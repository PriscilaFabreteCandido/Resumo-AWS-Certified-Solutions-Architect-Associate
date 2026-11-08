---
tags: [saa-c03, vpc, questoes]
servico: Amazon VPC
atualizado: 2026-11-08
---

# Amazon VPC — Questões

> [!question]- Q1. Quantos IPs utilizáveis tem uma subnet `/28`?
> **A)** 16
> **B)** 14
> **C)** **11** ✅
> **D)** 13
>
> **Por que C**: 16 endereços totais, menos os **5** reservados pela AWS (os 4 primeiros e o último) = **11**.
> **B errada**: 14 seria o cálculo de rede tradicional (menos rede e broadcast). A AWS reserva **cinco**, não dois.

> [!question]- Q2. Instâncias privadas iniciam HTTPS para a internet, mas as respostas não chegam. A NACL tem só uma regra outbound TCP 443. O que falta?
> **A)** Mudar o security group para stateful
> **B)** **Regra inbound na NACL liberando as portas efêmeras (1024-65535)** ✅
> **C)** Rota para o internet gateway
> **D)** Elastic IP nas instâncias
>
> **Por que B**: NACL é **stateless** — *"responses to that traffic are not automatically allowed"*. A resposta volta para uma porta efêmera da instância, não para a 443.
> **A errada**: SG **já é** stateful.
> **C errada**: o enunciado diz que as conexões **saem**, então a rota existe (via NAT).
> **D errada**: instância privada não leva EIP; a saída é pelo NAT gateway.

> [!question]- Q3. O banco RDS deve aceitar conexões **apenas** das instâncias da aplicação, que escalam automaticamente.
> **A)** SG do RDS liberando o CIDR da subnet da aplicação
> **B)** **SG do RDS liberando, na porta do banco, o security group da aplicação como source** ✅
> **C)** NACL liberando os IPs das instâncias
> **D)** SG do RDS em `0.0.0.0/0`, protegido por NACL
>
> **Por que B**: referência SG-para-SG acompanha o Auto Scaling e é o menor privilégio possível.
> **A errada**: libera **qualquer** recurso que suba naquela subnet, agora ou depois.
> **C errada**: IPs mudam a cada scaling.
> **D errada**: expõe o banco; NACL é controle grosseiro e stateless.

> [!question]- Q4. Instâncias privadas precisam gravar num bucket S3 da mesma região, sem internet e **sem custo adicional**.
> **A)** NAT gateway em cada AZ
> **B)** Interface endpoint (PrivateLink) para o S3
> **C)** **Gateway endpoint para o S3** ✅
> **D)** Internet gateway com rota restrita
>
> **Por que C**: *"There is no additional charge for using gateway endpoints."*
> **A errada**: funciona, mas NAT gateway cobra **por hora + por GB**.
> **B errada**: funciona, mas é **cobrado** por hora e por GB. Justifica-se quando o acesso vem de **on-premises**.
> **D errada**: coloca a subnet na internet.

> [!question]- Q5. Duas VPCs com CIDR sobreposto. A VPC A precisa consumir uma API hospedada na VPC B. O que usar?
> **A)** VPC peering
> **B)** Transit Gateway
> **C)** **AWS PrivateLink (interface endpoint para o endpoint service da VPC B)** ✅
> **D)** Renumerar a VPC A
>
> **Por que C**: PrivateLink **não roteia redes** — expõe um serviço por uma ENI na VPC consumidora, então o CIDR sobreposto é irrelevante.
> **A e B erradas**: peering e TGW roteiam redes e exigem CIDRs não sobrepostos.
> **D errada**: funciona, mas é a opção mais custosa e disruptiva; a prova premia a solução que evita renumerar.

> [!question]- Q6. Uma aplicação IPv6 em subnet privada precisa baixar atualizações da internet, sem aceitar conexões de entrada.
> **A)** NAT gateway
> **B)** **Egress-only internet gateway** ✅
> **C)** Internet gateway com NACL restritiva
> **D)** NAT instance com IPv6
>
> **Por que B**: *"is for use with IPv6 traffic only. To enable outbound-only internet communication over IPv4, use a NAT gateway instead."*
> **A errada**: NAT gateway é a resposta para **IPv4**.
> **C errada**: IGW é bidirecional; depender de NACL para simular saída-somente é frágil.
> **D errada**: não é o mecanismo suportado para IPv6 de saída.

## ⚠️ Armadilhas da VPC

| Parece | É |
|---|---|
| Subnet reserva 2 IPs | **5** (4 primeiros + o último) |
| Um `/28` dá 16 utilizáveis | Dá **11** |
| Existe um "flag de subnet pública" | Pública = tem rota `0.0.0.0/0` para o **IGW** |
| Subnet pode abranger 2 AZs | É **zonal** |
| NACL é stateful | É **stateless** — libere as portas efêmeras |
| SG pode negar um IP | SG **só** tem allow. Deny é NACL (ou WAF) |
| NAT gateway aceita SG | **Não aceita** |
| 1 NAT gateway é HA | É **zonal**. HA = um por AZ |
| NAT gateway serve IPv6 de saída | Saída IPv6 = **egress-only IGW** |
| Gateway endpoint serve qualquer serviço | **Só S3 e DynamoDB** |
| Interface endpoint é grátis | **Só o gateway endpoint é grátis** |
| NACL pode bloquear o DNS da VPC | **Não.** O resolver (VPC+2) e o IMDS não passam por SG/NACL |
| NACL criada por mim já libera tudo | Começa **negando tudo**. Só a **default** vem liberada |
| Flow Logs capturam o conteúdo | Capturam **metadados**. Conteúdo = **Traffic Mirroring** |
| Transit Gateway resolve CIDR sobreposto | Não resolve. **PrivateLink** contorna |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
- [[03 - Pegadinhas mestre]]
