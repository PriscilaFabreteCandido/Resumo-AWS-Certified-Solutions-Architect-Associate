---
servico: Elastic Load Balancing
fonte: "[[2 - Resiliencia (26%)/ELB (Load Balancers)/2 - Decorar|2 - Decorar]]"
---

# ELB — Flashcards

#flashcards/saa-c03/d2-resiliencia/elb

Camada OSI de ALB, NLB e GWLB?::ALB **7**, NLB **4**, GWLB **3**

Qual load balancer oferece IP estático por AZ (com EIP opcional)?::**NLB**

Qual load balancer suporta AWS WAF?::Só o **ALB**

Tipos de roteamento que o ALB faz?::Por **host**, **path**, header HTTP, query string e source IP; além de redirect e fixed response

Cross-zone load balancing padrão em ALB, NLB e GWLB?::ALB: **sempre ligado** no LB. NLB e GWLB: **desligado** por padrão

Qual load balancer pode ter uma função Lambda como target?::**ALB**

Qual load balancer pode ter um ALB como target?::**NLB**

Protocolos suportados pelo NLB?::**TCP**, **UDP**, TCP_UDP, **TLS** e **QUIC**

Para que serve o GWLB e que protocolo/porta usa?::Distribuir tráfego para **appliances virtuais**; **GENEVE** na porta **6081**

TTL do DNS de um load balancer?::**60 segundos**

Connection draining (deregistration delay) padrão do ELB?::**300 s**

Quantas AZs no mínimo um ALB exige?::**2**

Por que um ALB funciona no ápice do domínio no Route 53?::Pode ser alvo de **alias record** (CNAME não funciona no ápice)

Onde se configura o health check do ELB?::No **target group** (protocolo, porta, caminho, intervalo, threshold)

O health check do ELB vem ligado no Auto Scaling?::**Não**, precisa ativar; senão o ASG não substitui instância com a **aplicação** morta
