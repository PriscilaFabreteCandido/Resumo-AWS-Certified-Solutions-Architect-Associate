---
tags: [saa-c03, global-accelerator, questoes]
servico: AWS Global Accelerator
atualizado: 2026-11-08
---

# Global Accelerator — Questões

> [!question]- Q1. Um jogo online usa **UDP** e os clientes precisam de **IPs fixos** para liberar em firewalls corporativos, com failover entre três regiões em segundos.
> **A)** CloudFront com origin group
> **B)** **AWS Global Accelerator** ✅
> **C)** Route 53 com failover routing
> **D)** NLB em cada região com latency routing
>
> **Por que B**: dois IPv4 **anycast**, suporte a **UDP**, e *"reacts instantly to changes in health or configuration"*.
> **A errada**: CloudFront é HTTP/HTTPS.
> **C errada**: DNS depende de **TTL** e cache do resolver — não garante "segundos", e o IP muda.
> **D errada**: os IPs dos NLBs são por AZ/região; o cliente teria que liberar todos, e o failover ainda dependeria de DNS.

> [!question]- Q2. O failover por DNS entre regiões está levando minutos; o requisito é segundos.
> **A)** Reduzir o TTL para 0
> **B)** **AWS Global Accelerator** ✅
> **C)** Multivalue answer no Route 53
> **D)** Mais health checks
>
> **Por que B**: o cliente mantém o **mesmo IP**; o accelerator troca o destino por trás, sem esperar DNS.
> **A errada**: resolvers não respeitam TTL zero de forma confiável, e o volume de consultas explode.

> [!question]- Q3. Usuários globais baixam vídeos grandes de um bucket S3. Qual acelera mais?
> **A)** Global Accelerator na frente do bucket
> **B)** **CloudFront com o bucket como origem** ✅
> **C)** S3 Transfer Acceleration
> **D)** Route 53 latency routing
>
> **Por que B**: conteúdo **estático** repetido é caso de **cache**. O Global Accelerator **não cacheia** — o ganho seria muito menor, e o egress pelo CloudFront é mais barato.
> **C errada**: Transfer Acceleration é para **upload**.

> [!question]- Q4. Uma API de **escrita** (POST) tem usuários em 4 continentes e latência ruim. Cache não ajuda.
> **A)** CloudFront com TTL zero
> **B)** **Global Accelerator na frente do ALB** ✅
> **C)** Route 53 geolocation
> **D)** API Gateway edge-optimized
>
> **Por que B**: o ganho vem de **entrar na rede da AWS** no POP mais próximo — serve para escrita, que não se cacheia.
> **A errada**: CloudFront com TTL zero ainda ajuda pela terminação TLS na borda, mas o Global Accelerator é o serviço posicionado para latência de **rede**.
> **D errada**: edge-optimized já usa a borda do CloudFront e é uma resposta razoável — mas só se a API estiver no API Gateway, e não resolve IP fixo nem failover regional.

> [!question]- Q5. Num jogo multiplayer, cada jogador precisa ser roteado para a **instância específica** da sua partida.
> **A)** Standard accelerator com endpoint weight
> **B)** **Custom routing accelerator** ✅
> **C)** ALB com sticky sessions
> **D)** NLB com flow hash
>
> **Por que B**: *"map one or more users to a specific destination among many destinations"*, roteando para **IPs privados** de subnets de VPC.
> **A errada**: standard manda para qualquer endpoint saudável do grupo.

> [!question]- Q6. Migrar 10% do tráfego para a nova região antes de completar a mudança.
> **A)** Weighted routing no Route 53
> **B)** **Traffic dial no endpoint group do Global Accelerator** ✅
> **C)** Custom routing
> **D)** Origin group do CloudFront
>
> **Por que B**: o traffic dial controla o **percentual** por endpoint group.
> **A**: também funciona, e é resposta válida se o cenário for de DNS — mas depende de TTL e não mantém IP fixo.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Global Accelerator é um CDN | **Não cacheia** |
| Serve conteúdo estático melhor que o CloudFront | Para estático repetido, **CloudFront** (cache + egress mais barato) |
| CloudFront serve UDP | HTTP/HTTPS só |
| Os IPs podem ser recuperados após deletar | *"Deleting an accelerator loses its static IPs"* |
| Failover por DNS é equivalente | DNS depende de **TTL** e cache; o accelerator reage *"instantly"* |
| Standard accelerator roteia para IP privado | Isso é o **custom routing** |
| Só existe um tipo de accelerator | **Standard** e **custom routing** |
| Global Accelerator substitui o ELB | Ele fica **na frente** do ELB (ou EC2/EIP) |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
