---
servico: AWS Global Accelerator
fonte: "[[3 - Performance (24%)/Global Accelerator/2 - Decorar|2 - Decorar]]"
---

# Global Accelerator — Flashcards

#flashcards/saa-c03/d3-performance/global-accelerator

Quantos IPs estáticos o Global Accelerator fornece?::**2 IPv4** (4 endereços no total em dual-stack)

Natureza dos IPs do Global Accelerator?::**Anycast** da borda da AWS

O que acontece com os IPs ao deletar o accelerator?::São **perdidos**

Dá para usar IPs próprios no Global Accelerator?::**Sim**: **BYOIP** para IPv4

Endpoints suportados pelo accelerator standard?::**NLB, ALB, instâncias EC2 e Elastic IP**

Endpoints e uso do accelerator custom routing?::**Só subnets de VPC**; mapeia usuários a um destino específico em IPs privados

Tráfego TCP/UDP, jogos, VoIP, MQTT: CloudFront ou Global Accelerator?::**Global Accelerator**

Conteúdo estático com cache para usuários globais: qual serviço?::**CloudFront**

IP estático para allowlist em firewall de cliente, alcance global?::**Global Accelerator** (ou **NLB**, se for regional)

Failover entre regiões em segundos × tolerando minutos?::Segundos: **Global Accelerator**; minutos: **Route 53** (failover routing, sujeito a TTL)

Baixa latência de rede para API dinâmica de escrita: qual serviço?::**Global Accelerator**

Escopo e IP estático: NLB × Global Accelerator?::NLB: **regional**, IP estático **por AZ**; GA: **global**, **2 IPs anycast**

O Global Accelerator é protegido pelo Shield Advanced?::**Sim**, os **standard accelerators**
