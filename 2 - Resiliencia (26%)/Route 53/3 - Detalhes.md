---
tags: [saa-c03, route53, detalhes]
servico: Amazon Route 53
atualizado: 2026-11-08
---

# Route 53 — Detalhes

## 1. Escolhendo a política

```
O que decide para onde mandar?
├── Um recurso só                          → SIMPLE
├── Um primário e um reserva               → FAILOVER (ativo-passivo)
├── Proporção definida por mim             → WEIGHTED  (canary, blue/green, migração)
├── Menor latência medida                  → LATENCY   (multi-região ativo-ativo)
├── País/continente do usuário             → GEOLOCATION (compliance, idioma, licença)
├── Localização dos meus recursos + bias   → GEOPROXIMITY (deslocar carga)
├── Faixa de IP do usuário                 → IP-BASED  (ISP conhecido, CGNAT)
└── Vários IPs com health check            → MULTIVALUE ANSWER
```

Distinções que a prova explora:

**Latency × geolocation**: latency escolhe a região de **menor latência medida**, que não é necessariamente a mais próxima geograficamente. Geolocation escolhe pela **localização do usuário** — serve para requisito de **compliance** ("dados de usuários europeus devem ser servidos da Irlanda") ou de idioma/licenciamento.

**Weighted** é o mecanismo de **canary** e de **migração gradual**: 95% para o ambiente antigo, 5% para o novo, e você vai mudando.

**Multivalue answer × simple com vários IPs**: o simple devolve vários valores *"in random order"* mas **sem health check**. O multivalue devolve *"up to eight healthy records selected at random"* — ou seja, **com** health check. Para balanceamento rudimentar com detecção de falha, é multivalue.

## 2. Alias — por que sempre preferir

Quatro vantagens sobre CNAME:

1. **Funciona no ápice** — `exemplo.com` pode apontar para um ALB ou CloudFront
2. **É grátis** — *"Route 53 doesn't charge for alias queries to AWS resources"*
3. **Acompanha o recurso** — se o ALB troca de IP, o alias segue
4. **Evaluate Target Health** — health check implícito, sem configurar

A limitação: o alias só aponta para **recursos AWS** (a lista oficial) ou para outro registro da mesma hosted zone. Para um host externo, é CNAME.

E o TTL não é seu: *"Route 53 uses the default TTL for the resource"*. Se apontar para outro registro da mesma zona, usa o TTL do registro alvo.

## 3. Failover e DR

O padrão de **ativo-passivo** entre regiões:

```
exemplo.com (A, alias)
├── PRIMARY   → ALB em us-east-1   + health check
└── SECONDARY → ALB em sa-east-1   (ou site estático no S3, para "modo degradado")
```

O Route 53 *"includes only the healthy primary resources"* nas respostas; quando o primário falha no health check, passa a responder com o secundário.

⚠️ O failover por DNS **não é instantâneo**: depende do **TTL** e do cache dos resolvers. Se o requisito é failover em segundos, a resposta é **AWS Global Accelerator** (IP anycast, *"reacts instantly to changes in health or configuration"*) ou **CloudFront origin failover**.

Para **ativo-ativo**, use latency, weighted ou multivalue com health checks em todos os endpoints.

## 4. Health checks em detalhe

**Endpoint health check** monitora um IP ou domínio por HTTP/HTTPS/TCP, de vários pontos do mundo. Pode avaliar **string no corpo** da resposta.

**Calculated health check** combina outros ("saudável se ao menos 2 de 3 estiverem saudáveis") — útil para um conjunto de serviços dependentes.

**CloudWatch alarm health check** permite usar **qualquer** métrica como critério de saúde: profundidade de fila, erro 5xx no ALB, latência do banco. É a ponte entre métrica de aplicação e roteamento DNS.

Para endpoint em **subnet privada** (sem IP público), o health check direto não alcança — use o tipo **CloudWatch alarm**.

## 5. Route 53 Resolver — DNS híbrido

| Componente | Para quê |
|---|---|
| **Resolver (VPC+2)** | Resolve nomes da AWS e públicos dentro da VPC |
| **Inbound endpoint** | On-premises consulta nomes da **AWS** |
| **Outbound endpoint + rules** | A VPC consulta nomes do **on-premises** |
| **Resolver DNS Firewall** | Bloqueia domínios (exfiltração, C2) — o que **NACL não consegue** |

As **resolver rules** podem ser compartilhadas entre contas via **AWS RAM**, centralizando a resolução híbrida.

## 6. Hosted zone privada

Resolve nomes **só dentro das VPCs associadas**. Pré-requisito: `enableDnsSupport` e `enableDnsHostnames` ligados.

Uso de prova: dar nomes estáveis a recursos internos (`db.interno.exemplo.com` → endpoint do RDS), de modo que um failover ou uma troca de endpoint não exija mudar a aplicação.

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[ELB (Load Balancers)]] · [[CloudFront]] · [[Global Accelerator]] · [[Disaster Recovery (RPO e RTO)]] · [[VPC]] · [[AWS RAM]]
- [Alias × non-alias](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resource-record-sets-choosing-alias-non-alias.html)
