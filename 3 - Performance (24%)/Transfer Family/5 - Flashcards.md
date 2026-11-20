---
servico: AWS Transfer Family
fonte: "[[3 - Performance (24%)/Transfer Family/2 - Decorar|2 - Decorar]]"
---

# Transfer Family — Flashcards

#flashcards/saa-c03/d3-performance/transfer-family

Protocolos suportados pelo Transfer Family?::**SFTP, FTPS, FTP, AS2** e transferência por **navegador**

Backends de armazenamento do Transfer Family?::**S3** e **EFS**

Terceiro envia arquivos por SFTP para a AWS: qual serviço?::**Transfer Family**

O que é AS2 e por que aponta para o Transfer Family?::Protocolo de **EDI B2B** (documentos comerciais com assinatura e recibo MDN); só o Transfer Family faz

Quantas AZs o Transfer Family suporta?::Até **3 AZs**

O que são os MFTW no Transfer Family?::**Managed File Transfer Workflows**: pós-processamento serverless (validar, descompactar, mover, notificar)

Opções de identidade do Transfer Family?::**Service-managed**, **Directory Service** ou **custom identity provider** (Lambda/API Gateway)

Tipos de endpoint do Transfer Family?::**Público** ou **VPC** (interno, com IPs fixos)

Você move dados uma vez ou agendado: Transfer Family ou outro?::**DataSync**

Volume grande sem banda disponível: qual serviço?::**Snow Family**
