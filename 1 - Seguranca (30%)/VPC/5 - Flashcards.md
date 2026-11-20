---
servico: Amazon VPC
fonte: "[[1 - Seguranca (30%)/VPC/2 - Decorar|2 - Decorar]]"
---

# VPC — Flashcards

#flashcards/saa-c03/d1-seguranca/vpc

Quantos IPs a AWS reserva em toda subnet?::**5**

Quantos IPs utilizáveis tem uma subnet /28?::**11** (de 16)

Para que é reservado o IP base+1 da subnet?::**Router da VPC**

Para que é reservado o IP base+2 da subnet?::**DNS** da VPC

A VPC suporta broadcast?::**Não** (o último IP fica reservado mesmo assim)

Faixa de máscara permitida para subnet IPv4?::**/28 a /16**

Faixa de máscara para subnet IPv6?::**/44 a /64**, em incrementos de /4

Subnet é regional ou zonal?::**Zonal** (vive em uma AZ)

Componente para tráfego de entrada e saída da internet?::**Internet Gateway**

Saída para a internet só em IPv6: qual componente?::**Egress-only Internet Gateway**

Componente para VPN com on-premises?::**Virtual Private Gateway**

Hub de VPCs e on-premises: qual componente?::**Transit Gateway**

Que serviços o gateway endpoint suporta e quanto custa?::**Só S3 e DynamoDB**; **grátis**

Como é cobrado o interface endpoint?::Por **hora** e por **GB**
