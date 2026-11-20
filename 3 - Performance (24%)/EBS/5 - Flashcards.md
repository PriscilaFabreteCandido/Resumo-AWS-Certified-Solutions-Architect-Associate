---
servico: Amazon EBS
fonte: "[[3 - Performance (24%)/EBS/2 - Decorar|2 - Decorar]]"
---

# EBS — Flashcards

#flashcards/saa-c03/d3-performance/ebs

IOPS e throughput máximos do gp3?::**80.000 IOPS** e **2.000 MiB/s**

IOPS e throughput máximos do gp2?::**16.000 IOPS** e **250 MiB/s**

IOPS e throughput máximos do io1?::**64.000 IOPS** e **1.000 MiB/s**

IOPS e throughput máximos do io2 Block Express?::**256.000 IOPS** e **4.000 MiB/s**

IOPS máximo do st1 e do sc1?::st1 **500**; sc1 **250**

Qual tipo de EBS tem durabilidade de 99,999%?::**io2 Block Express** (os outros: 99,8–99,9%)

Quais tipos de EBS suportam Multi-Attach?::**io1** e **io2 Block Express**

Quais tipos de EBS não podem ser volume de boot?::Os **HDD**: **st1** e **sc1**

IOPS máximo que uma instância não-Nitro alcança no EBS?::**32.000 IOPS**, mesmo com volume provisionado acima

Tipo de EBS para throughput sequencial barato (big data, logs)?::**st1**

Tipo de EBS para dado frio, acesso raro, menor custo por GB?::**sc1**

Scratch temporário com IOPS máximo: EBS ou outro?::**Instance store** (não é EBS)

Como funcionam os snapshots do EBS e qual o escopo?::**Incrementais**, guardados no S3; escopo **regional** (copiáveis para outra região)

O que acontece com os blocos ao restaurar um volume de snapshot?::Vêm **sob demanda** (**lazy load**)

Ferramentas para automatizar snapshots de EBS e AMIs?::**Data Lifecycle Manager** ou **AWS Backup**
