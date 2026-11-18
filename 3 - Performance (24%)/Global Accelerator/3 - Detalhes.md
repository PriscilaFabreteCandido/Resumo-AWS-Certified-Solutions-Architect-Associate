---
tags: [saa-c03, global-accelerator, detalhes]
servico: AWS Global Accelerator
atualizado: 2026-11-08
---

# Global Accelerator — Detalhes

## 1. Como ele acelera sem cachear

O CloudFront acelera **guardando** o conteúdo perto do usuário. O Global Accelerator acelera **mudando o caminho**: o tráfego entra na **borda da AWS** no POP mais próximo do cliente e viaja pela **rede privada da AWS** até a região — em vez de atravessar a internet pública, com seus saltos e congestionamentos imprevisíveis.

Isso significa que ele ajuda **qualquer** tráfego, inclusive:
- **Escrita** (que não se cacheia)
- **API dinâmica**
- **TCP e UDP** que não são HTTP

E não ajuda no que o CloudFront resolve melhor: entregar o **mesmo** arquivo a milhares de usuários (aí o cache é imbatível).

## 2. Os IPs estáticos anycast

> *"For IPv4, Global Accelerator provides two static IPv4 addresses. For dual-stack, Global Accelerator provides a total of four addresses."*

**Anycast** significa que os mesmos dois IPs são anunciados de **vários** POPs no mundo; o roteamento BGP leva o cliente ao mais próximo.

Isso resolve dois problemas que nem DNS nem ELB resolvem:

**Allowlist em firewall de cliente.** Com ELB, o cliente teria que liberar um DNS name (ou IPs que mudam). Com Global Accelerator, são **dois IPs fixos** — e eles continuam os mesmos mesmo que você troque a região de destino.

**Cache de DNS.** Um cliente que cacheou o IP antigo continua funcionando, porque o IP não muda — só o destino por trás dele.

⚠️ Mas: *"Deleting an accelerator loses its static IPs."* Planeje.

Há **BYOIP** para IPv4, se você precisa usar a sua própria faixa.

## 3. Failover — por que é mais rápido que DNS

O accelerator *"reacts instantly to changes in health or configuration"* (reage instantaneamente a mudanças de saúde ou configuração). O cliente mantém a conexão com o **mesmo IP**; o Global Accelerator simplesmente passa a entregar o tráfego a outro endpoint.

Compare com **Route 53 failover**: o cliente só muda de destino quando o cache DNS expira (o TTL) **e** o resolver consulta de novo. Resolvers que ignoram TTL baixo pioram isso.

| Mecanismo | Tempo de failover |
|---|---|
| **Global Accelerator** | Quase instantâneo (IP não muda) |
| **Route 53 failover** | Depende de **TTL** e cache do resolver |
| **CloudFront origin failover** | Por requisição, nos status configurados |

Para requisito de **"failover em segundos"**, a resposta é **Global Accelerator**.

## 4. Standard × custom routing

**Standard accelerator** *"directs traffic over the AWS global network to endpoints in the nearest Region to the client"*. Endpoints: *"Network Load Balancers, Application Load Balancers, Amazon EC2 instances, or Elastic IP addresses"*.

Você configura **endpoint groups** por região, com:
- **Traffic dial** — percentual do tráfego para aquele grupo (migração gradual, teste)
- **Endpoint weight** — distribuição dentro do grupo

**Custom routing accelerator** *"map one or more users to a specific destination among many destinations"* (mapear um ou mais usuários para um destino específico entre vários destinos), e *"only support Amazon VPC subnet endpoint types and route traffic to private IP addresses in that subnet"*.

Caso de uso: multiplayer de jogos e VoIP, onde cada sessão precisa ir para uma **instância específica** (a sala, a partida), não para qualquer instância saudável.

## 5. Onde ele entra na arquitetura

```
                   2 IPs ESTÁTICOS ANYCAST
                            │
            ┌───────────────┴───────────────┐
            │   AWS GLOBAL ACCELERATOR      │
            │   (rede privada da AWS)       │
            └───────┬───────────────┬───────┘
         endpoint group         endpoint group
          us-east-1              eu-west-1
              │                       │
            NLB/ALB                NLB/ALB
```

Combinações típicas:
- **Global Accelerator → NLB** (TCP/UDP com IP fixo)
- **Global Accelerator → ALB** (HTTP com failover regional rápido; o ALB ainda pode ter **WAF**)
- **CloudFront** para o estático **+** Global Accelerator para a API dinâmica

## 6. Casos em que ele é a resposta

| Enunciado | Por quê |
|---|---|
| Jogo online com **UDP** e IPs liberados em firewall | Os dois requisitos só ele atende |
| **Failover regional em segundos** | Não depende de DNS |
| Aplicação **TCP** não-HTTP com usuários globais | CloudFront não serve |
| **API de escrita** com usuários globais | Cache não ajuda; a rede ajuda |
| Migrar tráfego **gradualmente** entre regiões | **Traffic dial** |
| IoT/MQTT com dispositivos que não atualizam DNS | IP fixo |

## Links

- [[3 - Performance (24%)/Global Accelerator/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/Global Accelerator/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/Global Accelerator/4 - Questoes|4 - Questoes]]
- [[3 - Performance (24%)/CloudFront/1 - O que e|CloudFront]] · [[2 - Resiliencia (26%)/ELB (Load Balancers)/1 - O que e|ELB (Load Balancers)]] · [[2 - Resiliencia (26%)/Route 53/1 - O que e|Route 53]] · [[1 - Seguranca (30%)/Shield/1 - O que e|Shield]] · [[9 - Fundamentos e apoio/Disaster Recovery (RPO e RTO)/1 - O que e|Disaster Recovery (RPO e RTO)]]
