---
tags: [saa-c03, elb, detalhes]
servico: Elastic Load Balancing
atualizado: 2026-11-08
---

# ELB — Detalhes

## 1. ALB — camada 7

O ALB *"functions at the application layer, the seventh layer of the OSI model"*. Por entender HTTP, ele pode rotear pelo **conteúdo da requisição**:

| Condição | Exemplo |
|---|---|
| **Path** | `/api/*` → target group da API; `/*` → target group do site |
| **Host** | `api.exemplo.com` → um target group; `app.exemplo.com` → outro |
| **Header HTTP** | Versão da API num header customizado |
| **Query string** | `?versao=beta` |
| **Source IP** | Faixa de IP do cliente |
| **Método HTTP** | — |

Também faz **redirect** (HTTP → HTTPS) e **fixed response** (devolver 503 de manutenção) sem tocar no backend.

Protocolos: front-end *"HTTP/0.9, HTTP/1.0, HTTP/1.1, and HTTP/2"*, e *"You can use HTTP/2 only with HTTPS listeners"*. Backend em HTTP/1.1 por padrão, com HTTP/2 ou **gRPC** opcionais. WebSocket é suportado via upgrade — mas atenção: *"if there is a connection upgrade, Application Load Balancer listener routing rules and AWS WAF integrations no longer apply"*.

Headers que ele adiciona: **`X-Forwarded-For`**, **`X-Forwarded-Proto`**, **`X-Forwarded-Port`** — é assim que o backend sabe o IP real do cliente.

**Lambda como target** é exclusividade do ALB: *"Support for registering Lambda functions as targets."*

## 2. NLB — camada 4

O NLB *"functions at the fourth layer"*. Não entende HTTP: roteia por **hash de fluxo**, e *"Each individual TCP connection is routed to a single target for the life of the connection."*

A característica decisiva é o **IP estático**: *"Elastic Load Balancing creates a network interface for each Availability Zone you enable, and uses it to get a static IP address."* E opcionalmente *"you can optionally associate one Elastic IP address with each network interface."*

Isso resolve dois problemas de prova:
- Clientes que precisam **liberar IPs em firewall**
- Protocolos que não são HTTP (jogos, VoIP, MQTT, bancos de dados)

Targets: *"instance IDs, IP addresses, or an Application Load Balancer"* — colocar um ALB atrás de um NLB é o padrão para ter IP estático **e** roteamento de camada 7.

Preservação do IP de origem depende do **target type**: a doc diz *"The target type also affects whether the client IP addresses are preserved."* Com target por **instance ID**, o IP do cliente chega preservado.

## 3. GWLB — camada 3

O GWLB *"operates at the third layer... the network layer"* e *"listens for all IP packets across all ports"*. Encapsula o tráfego em **GENEVE na porta 6081** e o entrega a um fleet de appliances (firewall, IDS/IPS de terceiro), que inspecionam e devolvem.

Mantém **flow stickiness** *"to a specific target appliance using 5-tuple (default), 3-tuple, or 2-tuple"* — importante porque appliances de inspeção são *stateful*.

O desenho é: subnet de workload → **GWLB endpoint** → GWLB → appliances → volta e segue para o destino.

## 4. Cross-zone load balancing — a diferença que custa dinheiro

| Tipo | Padrão |
|---|---|
| **ALB** | *"always enabled at the load balancer level"* (pode ser desligado por **target group**) |
| **NLB** | *"disabled by default"* |
| **GWLB** | *"disabled by default"* |

Com cross-zone **desligado**, cada nó do LB distribui só para targets **da sua AZ**. Isso evita tráfego cross-AZ (que é cobrado), mas exige **capacidade equilibrada** entre AZs — se uma AZ tem 2 instâncias e outra tem 8, as 2 recebem metade do tráfego.

Com cross-zone **ligado**, a distribuição é uniforme, mas há tráfego entre AZs.

## 5. Sticky sessions

O ALB suporta sessões persistentes por cookie (gerado por ele ou da aplicação), configurado no **target group**.

⚠️ Mas a prova prefere a resposta arquitetural: **a aplicação deveria ser stateless**, com sessão no **ElastiCache** ou no **DynamoDB**. Sticky session prejudica a distribuição e quebra quando a instância morre.

## 6. TLS — onde encerrar

| Encerrar em | Quando |
|---|---|
| **CloudFront** | Conteúdo global (certificado ACM em **us-east-1**) |
| **ALB** | Aplicação HTTP regional; integra com **WAF** |
| **NLB** | TLS offload na camada 4, com IP estático |
| **Na instância** (TCP passthrough no NLB) | Criptografia ponta a ponta exigida por compliance |

## 7. Alta disponibilidade

- Habilite **2+ AZs** (obrigatório no ALB)
- O LB tem **DNS name** com TTL de **60 s** — nunca use o IP resolvido (exceto os IPs fixos do NLB)
- Combine com **Auto Scaling** e habilite o **ELB health check** no ASG
- Para failover **entre regiões**: **Route 53** (DNS) ou **Global Accelerator** (anycast, mais rápido)

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[Auto Scaling (EC2)]] · [[Route 53]] · [[WAF]] · [[CloudFront]] · [[Global Accelerator]] · [[ElastiCache]]
