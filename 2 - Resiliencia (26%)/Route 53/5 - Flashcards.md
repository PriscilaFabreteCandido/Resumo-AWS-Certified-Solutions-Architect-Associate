---
servico: Amazon Route 53
fonte: "[[2 - Resiliencia (26%)/Route 53/2 - Decorar|2 - Decorar]]"
---

# Route 53 — Flashcards

#flashcards/saa-c03/d2-resiliencia/route-53

Que tipo de registro funciona no ápice do domínio (zone apex) apontando para recurso AWS?::**Alias record** (CNAME não pode ter o mesmo nome da hosted zone)

Consultas alias × CNAME: qual o Route 53 cobra?::Cobra **CNAME**; alias para recursos AWS é **grátis**

Dá para definir o TTL de um alias que aponta para recurso AWS?::**Não**; o Route 53 usa o TTL padrão do recurso

Cite alvos possíveis de um alias record.::**ELB** (ALB, NLB, CLB), **CloudFront**, **API Gateway**, **S3 site estático**, **Global Accelerator**, **Elastic Beanstalk**, VPC interface endpoint

A política simple com vários IPs faz health check?::**Não**

Quais são os três tipos de health check do Route 53?::**Endpoint** (IP ou domínio), **calculated** (combina outros health checks) e **CloudWatch alarm**

Em vez de anexar health check a um alias, o que se liga?::**Evaluate Target Health**

Limitações do health check baseado em alarme do CloudWatch?::Só métrica de **resolução padrão**, sem **M de N**, sem **metric math**, só na **mesma conta**

Como configurar ativo-passivo no Route 53?::Política **failover** (primary + secondary)

Como configurar ativo-ativo no Route 53?::Qualquer política **exceto failover** (weighted, latency, multivalue, geolocation)

Em weighted, quando os registros de peso zero passam a responder?::Só quando **todos** os de peso diferente de zero estão **não saudáveis**

O que uma hosted zone privada exige na VPC?::**enableDnsSupport** e **enableDnsHostnames**

Quantos registros saudáveis o multivalue answer retorna?::Até **8**, aleatórios

Endereço do Resolver da VPC e se passa por SG/NACL?::**VPC+2**; **não** passa por SG nem NACL
