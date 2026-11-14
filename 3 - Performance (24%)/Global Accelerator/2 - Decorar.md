---
tags: [saa-c03, global-accelerator, decorar]
servico: AWS Global Accelerator
atualizado: 2026-11-08
---

# Global Accelerator — Decorar

## Os números

| Item | Valor |
|---|---|
| **IPs estáticos** | **2 IPv4** (e **4 endereços** no total em dual-stack) |
| Natureza dos IPs | **Anycast** da borda da AWS |
| **BYOIP** | Disponível para IPv4 |
| ⚠️ Deletar o accelerator | **Perde** os IPs estáticos |
| Reação a mudança de saúde | *"reacts instantly to changes in health or configuration"* |

## Os dois tipos de accelerator

| Tipo | O que faz | Endpoints |
|---|---|---|
| **Standard** | *"directs traffic over the AWS global network to endpoints in the nearest Region to the client"* | **NLB, ALB, EC2 instances, Elastic IP** |
| **Custom routing** | *"map one or more users to a specific destination among many destinations"* | **Só subnets de VPC**, roteando para IPs privados |

## A tabela de decisão

| Enunciado | Resposta |
|---|---|
| Conteúdo **estático**, cache, usuários globais | **CloudFront** |
| **TCP/UDP**, jogo, VoIP, MQTT | **Global Accelerator** |
| **IP estático** para allowlist em firewall de cliente | **Global Accelerator** (ou **NLB**, se for regional) |
| Failover **entre regiões** em segundos | **Global Accelerator** |
| Failover entre regiões, tolerando minutos | **Route 53** (failover routing) |
| Latência de **download** de arquivo grande | **CloudFront** |
| Latência de **rede** para API dinâmica de escrita | **Global Accelerator** |

## Global Accelerator × NLB × Route 53

| | **NLB** | **Global Accelerator** | **Route 53** |
|---|---|---|---|
| Escopo | **Regional** | **Global** | **Global (DNS)** |
| IP estático | **Sim** (por AZ) | **Sim** (2 anycast) | Não |
| Failover entre **regiões** | Não | **Sim, instantâneo** | Sim, **sujeito a TTL** |
| Camada | 4 | 4 (rede) | DNS |

## Shield Advanced

Os **standard accelerators** estão na lista de recursos protegidos pelo **Shield Advanced** (junto com EC2, ELB, CloudFront e Route 53 hosted zones).

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
