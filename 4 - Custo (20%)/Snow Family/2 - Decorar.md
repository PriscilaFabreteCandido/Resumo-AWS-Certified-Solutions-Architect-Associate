---
tags: [saa-c03, snow, decorar]
servico: AWS Snow Family
atualizado: 2026-11-08
---

# Snow Family — Decorar

## Os dispositivos documentados

| Dispositivo | Storage | Compute |
|---|---|---|
| **Snowball Edge Storage Optimized 210 TB** | *"210 TB usable (for object and NFS data transfer)"* (210 TB utilizáveis (para transferência de objetos e NFS)), NVMe | **104 vCPUs**, **416 GB** de RAM |
| **Snowball Edge Compute Optimized** | **28 TB** NVMe SSD para as instâncias | *"up to 104 vCPUs, 416 GB of memory"* (512 GB físicos, 416 GB utilizáveis) |

⚠️ **Snowcone** e **Snowmobile**: as especificações **não aparecem** na documentação atual que conferi — coerente com a descontinuação.

## Fatos documentados

| Item | Valor |
|---|---|
| **Cluster** | *"3 to 16 devices"* (de 3 a 16 dispositivos), para durabilidade local |
| **Protocolos** | *"NFSv3, NFSv4, NFSv4.1, Amazon S3 over HTTP or HTTPS"* (NFSv3, NFSv4, NFSv4.1, Amazon S3 sobre HTTP ou HTTPS) |
| **Rede** | *"transfer speeds of up to 100 Gbit/second"* |
| Criptografia | KMS, no dispositivo |

## As datas

| Evento | Data |
|---|---|
| Disponibilidade para **novos clientes** | **Encerrada** |
| **Fim do suporte** (regiões comerciais) | **31/12/2026** |
| GovCloud e ADC com jobs ativos | Não afetados |

A própria AWS aponta as alternativas: *"AWS DataSync for online transfers, AWS Data Transfer Terminal for secure physical transfers, or AWS Partner solutions. For edge computing, explore AWS Outposts."*

## A tabela de transferência

| Enunciado | Serviço |
|---|---|
| **Banda insuficiente** para o prazo, dezenas/centenas de TB | **Snow Family** |
| Mover pela rede, uma vez ou agendado | **DataSync** |
| On-premises **continua** acessando | **Storage Gateway** |
| **Terceiro envia** por SFTP/FTPS/FTP/AS2 | **Transfer Family** |
| Upload global de clientes para um bucket | **S3 Transfer Acceleration** |
| **Compute na borda** (fábrica, navio) | **Outposts** (antes: Snowball Edge Compute Optimized) |

## A conta que a prova espera

```
Tempo ≈ Volume ÷ Banda útil
```

| Volume | Banda | Tempo |
|---|---|---|
| 10 TB | 1 Gbps | ~1 dia |
| 80 TB | 100 Mbps | **> 70 dias** |
| 100 TB | 10 Gbps | ~1 dia |
| 500 TB | 1 Gbps | ~46 dias |

## Links

- [[4 - Custo (20%)/Snow Family/1 - O que e|1 - O que e]] · [[4 - Custo (20%)/Snow Family/3 - Detalhes|3 - Detalhes]] · [[4 - Custo (20%)/Snow Family/4 - Questoes|4 - Questoes]]
