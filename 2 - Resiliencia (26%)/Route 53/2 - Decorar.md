---
tags: [saa-c03, route53, decorar]
servico: Amazon Route 53
atualizado: 2026-11-08
---

# Route 53 — Decorar

## Alvos possíveis de um alias record (lista oficial)

- **API Gateway** (custom regional ou edge-optimized)
- **VPC interface endpoint**
- **CloudFront distribution**
- **App Runner service**
- **Elastic Beanstalk environment**
- **Elastic Load Balancing** (*"includes Application Load Balancer, Classic Load Balancer and, Network Load Balancer"*)
- **AWS Global Accelerator accelerator**
- **OpenSearch Service custom domain**
- **S3 bucket configurado como site estático**
- **Outro registro do mesmo tipo na mesma hosted zone**
- **AWS AppSync domain name**

## As citações que decidem

| Fato | Citação |
|---|---|
| Alias no ápice | *"Unlike a CNAME record, you can create an alias record at the top node of a DNS namespace, also known as the zone apex."* |
| CNAME no ápice | *"You can't create a CNAME record that has the same name as the hosted zone (the zone apex)."* |
| Custo | *"Route 53 doesn't charge for alias queries to AWS resources."* / *"Route 53 charges for CNAME queries."* |
| TTL do alias | *"If an alias record points to an AWS resource, you can't set the time to live (TTL); Route 53 uses the default TTL for the resource."* |
| Simple sem health check | *"although you can specify multiple IP addresses, they are not health checked"* |

## Health checks — os três tipos

| Tipo | O que monitora |
|---|---|
| **Endpoint** | IP ou domínio (HTTP, HTTPS, TCP) |
| **Calculated** | **Outros health checks** combinados |
| **CloudWatch alarm** | Um alarme do CloudWatch |

Limitações do tipo CloudWatch alarm: só métrica de **resolução padrão**; estatísticas Average, Minimum, Maximum, Sum, SampleCount; **sem** *"M out of N"*; **sem** metric math; **mesma conta**. E: *"Route 53 doesn't wait for the CloudWatch alarm to go into the ALARM state."*

Para registro **alias**, em vez de anexar health check você liga **Evaluate Target Health**.

## Ativo-ativo × ativo-passivo

| | Como configurar |
|---|---|
| **Ativo-passivo** | Política **failover** (primary + secondary) |
| **Ativo-ativo** | *"using any routing policy (or combination of routing policies) other than failover"* — weighted, latency, multivalue, geolocation |

⚠️ Em weighted usado como passivo: *"All the records with nonzero weights must be unhealthy before Route 53 starts to respond to DNS queries using records that have weights of zero."*

## Hosted zone pública × privada

| | **Pública** | **Privada** |
|---|---|---|
| Resolve para | Internet | **Dentro da VPC** |
| Requer | — | `enableDnsSupport` e `enableDnsHostnames` |
| Uso | Domínio externo | Nomes internos (`db.interno`) |

## Números

| Item | Valor |
|---|---|
| Multivalue answer | até **8** registros saudáveis, aleatórios |
| TTL do DNS de um ELB | **60 s** |
| Resolver da VPC | **VPC+2** — não passa por SG nem NACL |

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
