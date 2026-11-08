---
tags: [saa-c03, vpc-endpoint, questoes]
servico: VPC Endpoints e AWS PrivateLink
atualizado: 2026-11-08
---

# VPC Endpoints — Questões

> [!question]- Q1. Instâncias privadas precisam gravar num bucket S3 da mesma região, sem internet e **sem custo adicional**.
> **A)** NAT gateway em cada AZ
> **B)** Interface endpoint para o S3
> **C)** **Gateway endpoint para o S3** ✅
> **D)** Internet gateway com rota restrita
>
> **Por que C**: *"There is no additional charge for using gateway endpoints."*
> **A errada**: NAT gateway cobra por hora **e por GB**.
> **B errada**: funciona, mas é **cobrado**.
> **D errada**: coloca a subnet na internet.

> [!question]- Q2. Servidores **on-premises** precisam alcançar o S3 por link privado, via Direct Connect.
> **A)** Gateway endpoint para o S3
> **B)** **Interface endpoint para o S3** ✅
> **C)** NAT gateway na VPC
> **D)** VPC peering
>
> **Por que B**: o gateway endpoint funciona apenas **de dentro da VPC** (é uma rota em route table). O interface endpoint tem IP privado alcançável de on-premises.
> **A errada**: é a troca que a prova testa.

> [!question]- Q3. Duas VPCs com **CIDR sobreposto**: a VPC A precisa consumir uma API hospedada na VPC B.
> **A)** VPC peering
> **B)** Transit Gateway
> **C)** **AWS PrivateLink: endpoint service na VPC B (atrás de um NLB) + interface endpoint na VPC A** ✅
> **D)** Renumerar a VPC A
>
> **Por que C**: PrivateLink **não roteia redes** — expõe um serviço por uma ENI, então o CIDR sobreposto é irrelevante.
> **A e B erradas**: exigem CIDRs não sobrepostos.
> **D errada**: funciona, mas é a opção mais custosa e disruptiva.

> [!question]- Q4. Impedir que, pelo endpoint do S3, alguém copie dados para um bucket de fora da organização.
> **A)** Security group no gateway endpoint
> **B)** **Endpoint policy restringindo os recursos (ex.: condição `aws:PrincipalOrgID`), e bucket policy exigindo `aws:SourceVpce`** ✅
> **C)** NACL negando o CIDR do S3
> **D)** SCP negando `s3:PutObject`
>
> **Por que B**: endpoint policy limita **o que pode ser feito através do endpoint**; a condição `aws:SourceVpce` na bucket policy fecha o outro lado.
> **A errada**: gateway endpoint não é ENI — não tem security group.
> **C errada**: bloquearia o S3 por completo.
> **D errada**: impediria gravar em qualquer bucket, inclusive os legítimos.

> [!question]- Q5. Um interface endpoint foi criado, mas a aplicação continua chamando o endpoint público do serviço.
> **A)** Falta a rota na route table
> **B)** **Falta habilitar o DNS privado do endpoint (e `enableDnsSupport`/`enableDnsHostnames` na VPC)** ✅
> **C)** Falta um Elastic IP
> **D)** Falta associar um NAT gateway
>
> **Por que B**: o interface endpoint não usa rota — ele depende de **DNS** resolver o nome público para o IP privado da ENI.
> **A errada**: rota é o mecanismo do **gateway** endpoint.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Gateway endpoint serve qualquer serviço | **Só S3 e DynamoDB** |
| Interface endpoint é grátis | **Só o gateway endpoint é grátis** |
| Gateway endpoint funciona de on-premises | **Não.** Só de dentro da VPC |
| Interface endpoint usa rota | Usa **ENI + DNS** |
| Gateway endpoint aceita security group | Não é ENI; não aceita |
| Endpoint resolve tráfego para outra região | Só para o serviço **da região atual** |
| NACL pode referenciar prefix list | *"You can't reference prefix lists in network ACL rules"* |
| PrivateLink conecta redes | Expõe **um serviço**; não roteia a rede |
| Transit Gateway resolve CIDR sobreposto | Não resolve. **PrivateLink** contorna |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
