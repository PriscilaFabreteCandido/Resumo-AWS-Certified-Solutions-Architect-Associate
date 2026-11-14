---
tags: [saa-c03, transfer-family, decorar]
servico: AWS Transfer Family
atualizado: 2026-11-08
---

# Transfer Family — Decorar

## Protocolos e backends

| Protocolos | Backends |
|---|---|
| **SFTP** (version 3) · **FTPS** · **FTP** · **AS2** · transferência por **navegador** | **S3** · **EFS** |

## A tabela dos quatro serviços de transferência

| Quem inicia / o que se quer | Serviço |
|---|---|
| **Você** move dados (uma vez ou agendado) | **DataSync** |
| **Terceiro envia** por SFTP/FTPS/FTP/AS2 | **Transfer Family** |
| Aplicação on-premises **continua** usando NFS/SMB/iSCSI/VTL | **Storage Gateway** |
| Volume grande **sem banda** | **Snow Family** |
| Clientes do mundo fazem **upload** para um bucket | **S3 Transfer Acceleration** |

## AS2 — o detalhe que diferencia

**AS2** (Applicability Statement 2) é protocolo de **EDI B2B**: troca de documentos comerciais (pedidos, notas) com assinatura e recibo (MDN). Se o enunciado menciona **EDI** ou **AS2**, é Transfer Family — nenhum outro serviço da AWS faz isso.

## Fatos

| Item | Detalhe |
|---|---|
| AZs | *"supports up to 3 Availability Zones"* |
| **MFTW** | Managed File Transfer Workflows: pós-processamento serverless (validar, descompactar, mover, notificar) |
| Identidade | Service-managed, **Directory Service**, ou **custom identity provider** (Lambda/API Gateway) |
| Endpoint | Público, ou **VPC** (interno, com IPs fixos) |
| Transferência | Para **S3** ou **EFS** |

## Links

- [[3 - Performance (24%)/Transfer Family/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/Transfer Family/3 - Detalhes|3 - Detalhes]] · [[3 - Performance (24%)/Transfer Family/4 - Questoes|4 - Questoes]]
