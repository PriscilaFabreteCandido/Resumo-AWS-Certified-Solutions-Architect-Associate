---
tags: [saa-c03, dominio-3, cloudfront, global-accelerator, direct-connect, vpn, transit-gateway]
dominio: 3
tasks: [3.4]
atualizado: 2026-11-08
---

# Rede e borda — CloudFront, Global Accelerator e conectividade híbrida

## 🧩 Em 30 segundos

- **CloudFront**: CDN. **Cacheia**. TTL padrão **24 h**. Certificado ACM **em us-east-1**. **OAC** (não OAI) para S3 privado.
- **Global Accelerator**: **2 IPs estáticos anycast**, TCP/UDP, **não cacheia**, failover regional quase instantâneo.
- **Direct Connect**: banda dedicada e previsível. Dedicada **1/10/100/400 Gbps**; hosted **50 Mbps a 25 Gbps**. **Não** é criptografado por padrão.
- **Site-to-Site VPN**: **2 túneis**, **1,25 Gbps** por túnel (5 Gbps com Large Bandwidth Tunnel + TGW).
- **Transit Gateway**: hub para centenas de VPCs, **até 5.000 attachments**. **VPC peering** não é transitivo.

## 🧠 Teste-se primeiro

> [!question]- CloudFront × Global Accelerator
> | | **CloudFront** | **Global Accelerator** |
> |---|---|---|
> | Cacheia? | **Sim** | **Não** |
> | Protocolo | HTTP/HTTPS | **TCP e UDP** |
> | Endereço | DNS name | **2 IPs estáticos anycast** (4 em dual-stack) |
> | Origens / endpoints | S3, ELB, API Gateway, MediaPackage, HTTP server | **NLB, ALB, EC2, Elastic IP** (standard); subnet de VPC (custom routing) |
> | Failover | Origin group (2 origens) | *"reacts instantly to changes in health or configuration"* |
> | Use quando | Conteúdo estático/dinâmico HTTP, cache, borda | Jogo, VoIP, IoT, MQTT, qualquer TCP/UDP, IP fixo para allowlist, failover regional rápido |
>
> ⚠️ Deletar um accelerator **perde** os IPs estáticos.

> [!question]- O que são regional edge caches e quando NÃO são usados?
> *"CloudFront also has regional edge caches that bring more of your content closer to your viewers, even when the content is not popular enough to stay at a POP"* — ficam **entre a origem e os POPs**, com cache maior.
> **Não** passam por eles: métodos **PUT, POST, PATCH, OPTIONS, DELETE** (*"go directly to the origin from the POPs"*), requisições **dinâmicas**, e quando a origem é **S3 na mesma região** do regional edge cache ótimo.

> [!question]- Signed URL × signed cookie
> **Signed URL**: *"You want to restrict access to individual files, for example, an installation download"*, ou o cliente **não suporta cookie**.
> **Signed cookie**: *"You want to provide access to multiple restricted files, for example, all of the files for a video in HLS format"*, ou você **não quer mudar as URLs**.
> *"Signed URLs take precedence over signed cookies."* Recomendação: usar **trusted key groups**.

> [!question]- CloudFront Functions × Lambda@Edge
> | | **CloudFront Functions** | **Lambda@Edge** |
> |---|---|---|
> | Linguagem | **JavaScript** (ECMAScript 5.1) | **Node.js e Python** |
> | Triggers | **viewer request / response** | **viewer + origin** request/response (4) |
> | Duração | **submilissegundo** | até **30 s** |
> | Memória | **2 MB** | 128 MB (viewer) / **10 GB** (origin) |
> | Código | **10 KB** | 50 MB |
> | Acesso à rede | **Não** | **Sim** |
> | Acesso ao body | **Não** | **Sim** |
> | Geolocalização/device | **Sim** | Só em origin request/response |
> | Escala | *"millions of requests per second"* | *"10,000 requests per second per Region"* |
>
> Decisão: manipulação simples de header/URL/redirect em altíssima escala → **Functions**. Precisa chamar API, ler o body ou usar biblioteca → **Lambda@Edge**.

## CloudFront — outros detalhes

| Item | Valor |
|---|---|
| TTL padrão | **24 horas**; mínimo 0 s, sem máximo |
| Certificado ACM | **us-east-1** para HTTPS viewer↔CloudFront. Para CloudFront↔origem com ELB, **qualquer** região |
| Origin group | **2** origens (primária + secundária) |
| Status de failover | **400, 403, 404, 416, 429, 500, 502, 503, 504** — só para `GET`, `HEAD`, `OPTIONS` |
| Timeouts da origem | conexão **10 s** (1-10) · tentativas **3** (1-3) · resposta **30 s** (1-120) |
| Delay típico de failover | *"as long as 30 seconds (3 connection attempts of 10 seconds each)"* |
| Geo restriction | allowlist ou denylist por **país**; devolve **403**; precisão declarada **99,8%** |
| OAC × OAI | OAC suporta **todas as regiões**, **SSE-KMS** e *"Dynamic requests (PUT and DELETE)"*. OAI é *"legacy, not recommended"* |
| Pré-requisito do OAC | Object Ownership em **Bucket owner enforced** |
| Data transfer | origem AWS → CloudFront é **grátis** |
| Erro de certificado na origem | **502 Bad Gateway** |

> [!warning] Site estático no S3 por *website endpoint* não aceita OAC nem OAI
> *"you must set it up with CloudFront as a custom origin. That means you can't use OAC (or OAI)."* Se o enunciado exige bucket privado, use o **REST endpoint** do bucket como origem, com OAC.

## Conectividade híbrida

| Opção | Banda | Criptografia | Observação |
|---|---|---|---|
| **Site-to-Site VPN** | **1,25 Gbps** por túnel; **5 Gbps** com Large Bandwidth Tunnel (só com TGW/Cloud WAN) | **IPsec** nativa | **2 túneis** por conexão. Rápido de montar. Não suporta Path MTU Discovery. IPv6 não funciona em **virtual private gateway** |
| **Direct Connect dedicada** | **1, 10, 100, 400 Gbps** | **Não** por padrão | Você provisiona; *"up to 72 business hours"* para a AWS liberar a porta; LOA-CFA em 7 dias |
| **Direct Connect hosted** | **50 Mbps a 25 Gbps** | Não por padrão | Provisionada por **parceiro**; você precisa **aceitar**; sujeita a traffic policing |
| **DX + VPN** | — | **IPsec sobre linha privada** | Padrão para "banda previsível **e** criptografado" |

**Virtual interfaces (VIF) do DX**:
- **Private VIF**: acessa VPC por IP privado. Uma VPC por VIF, ou **várias** via **Direct Connect gateway** (*"multiple virtual private gateways across any account and AWS Region"*).
- **Public VIF**: acessa **serviços públicos** da AWS por IP público.
- **Transit VIF**: acessa **Transit Gateways** associados a um Direct Connect gateway.

Requisitos: fibra monomodo, **802.1Q VLAN**, **BGP** com MD5, BFD opcional. MTU **1522 ou 9023**. Cobrança: **port hours + data transfer out**.

> [!tip] HA em Direct Connect
> Uma conexão DX é ponto único de falha. As respostas aceitas pela prova, em ordem de robustez:
> 1. **Duas** conexões DX em **locais diferentes** (ideal)
> 2. Duas conexões no mesmo local (protege contra falha de porta/roteador, não do local)
> 3. **DX + Site-to-Site VPN de backup** (mais econômico)
> 4. Uma DX só → **não** é HA

## Topologia

| Opção | Transitivo? | CIDR sobreposto | Escala |
|---|---|---|---|
| **VPC peering** | **Não** (A↔B e B↔C não dá A↔C) | Não suportado | 1:1, cross-account e cross-Region. **Sem custo de criação**; dados na mesma AZ **grátis** |
| **Transit Gateway** | **Sim** (hub com route tables) | Não recomendado | **Até 5.000 attachments**. Cobra **por attachment/hora + por GB** |
| **PrivateLink** | — | **Irrelevante** (não roteia redes, expõe serviço) | Um serviço por endpoint |

**Transit Gateway**: attachments de VPC, **Connect** (SD-WAN), **Direct Connect gateway**, peering com outro TGW, VPN, Client VPN. Rotas de VPC e peering são **estáticas**; VPN e DX gateway propagam por **BGP**. MTU **8.500** (1.500 em VPN). Peering inter-region é criptografado na camada física.

> [!tip] PrivateLink quando CIDR se sobrepõe
> Se duas redes têm CIDR sobreposto e só precisam que **uma consuma um serviço da outra**, PrivateLink resolve sem renumerar: ele expõe o serviço por uma ENI na VPC consumidora, sem rotear as redes.

## ❓ Questões de prova

> [!example]- Q1 — Um jogo online usa UDP e os clientes precisam de **IPs fixos** para liberar em firewalls corporativos, com failover entre três regiões em segundos. Qual serviço?
> **A)** CloudFront com origin group
> **B)** **AWS Global Accelerator** ✅
> **C)** Route 53 com failover routing
> **D)** NLB em cada região com latency routing
>
> **Por que B**: dois IPv4 estáticos **anycast**, suporte a **UDP**, e *"reacts instantly to changes in health or configuration"*.
> **A errada**: CloudFront é HTTP/HTTPS; não serve UDP.
> **C errada**: DNS depende de TTL e cache do resolver — não é "segundos" garantidos, e o IP muda.
> **D errada**: os IPs dos NLBs são por AZ/região; o cliente teria que liberar todos, e o failover ainda dependeria de DNS.

> [!example]- Q2 — Um bucket S3 criptografado com **SSE-KMS** precisa ser servido por CloudFront, sem acesso público direto. Qual configuração?
> **A)** Origin Access Identity (OAI)
> **B)** **Origin Access Control (OAC), com a key policy do KMS permitindo `cloudfront.amazonaws.com`** ✅
> **C)** Bucket público com geo restriction
> **D)** Presigned URL gerada no backend
>
> **Por que B**: a doc lista **SSE-KMS** como uma das capacidades que **só o OAC** tem. Além da bucket policy, a **key policy** precisa liberar `kms:Decrypt`, `kms:Encrypt` e `kms:GenerateDataKey*` para o principal do CloudFront.
> **A errada**: OAI é legado e **não suporta SSE-KMS**.
> **C errada**: viola o requisito de não ser público.
> **D errada**: presigned URL dá acesso direto ao S3, não "via CloudFront".

> [!example]- Q3 — A empresa precisa de 2 Gbps consistentes para on-premises, **criptografados**, sem passar pela internet. Qual solução?
> **A)** Site-to-Site VPN com dois túneis
> **B)** Direct Connect dedicada de 10 Gbps
> **C)** **Direct Connect + IPsec VPN sobre a conexão Direct Connect** ✅
> **D)** Transit Gateway com peering inter-region
>
> **Por que C**: DX dá banda previsível fora da internet; a documentação **não** afirma que o DX é criptografado por padrão, então a camada IPsec é o que atende o requisito de criptografia. O whitepaper descreve exatamente essa opção: *"IPsec VPN connection over private lines"*.
> **A errada**: VPN é criptografada, mas trafega **pela internet** e cada túnel entrega 1,25 Gbps (sem TGW), com banda não previsível.
> **B errada**: resolve banda, mas não o requisito de criptografia.
> **D errada**: TGW é topologia **dentro** da AWS; não conecta on-premises por si.

> [!example]- Q4 — Cinco VPCs precisam se comunicar entre si e com o datacenter, com crescimento previsto para 50 VPCs. Qual topologia?
> **A)** VPC peering full mesh
> **B)** **Transit Gateway com attachments de VPC e do Direct Connect gateway** ✅
> **C)** PrivateLink entre todas as VPCs
> **D)** VPN entre cada VPC e o datacenter
>
> **Por que B**: TGW é o *"network transit hub used to interconnect virtual private clouds (VPCs) and on-premises networks"*, com roteamento transitivo e até **5.000 attachments**.
> **A errada**: peering **não é transitivo**; 50 VPCs em full mesh = 1.225 conexões para manter.
> **C errada**: PrivateLink expõe **serviço**, não conecta redes inteiras.
> **D errada**: 50 VPNs para gerenciar, e as VPCs não se falariam entre si.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Global Accelerator é CDN | **Não cacheia** |
| CloudFront serve UDP | HTTP/HTTPS só |
| Certificado do CloudFront pode ser regional | **us-east-1**, sempre (exceto CloudFront↔ELB na origem) |
| OAI e OAC são equivalentes | OAC suporta SSE-KMS, PUT/DELETE e todas as regiões |
| Website endpoint do S3 funciona com OAC | **Não.** Vira custom origin, sem OAC/OAI |
| Direct Connect é criptografado | A doc **não afirma** isso. Use IPsec sobre DX |
| Uma conexão DX é HA | Ponto único de falha |
| VPN tem 1 túnel | **2**, para HA |
| VPC peering é transitivo | **Não é** |
| Transit Gateway resolve CIDR sobreposto | Não resolve. **PrivateLink** contorna |
| Transit Gateway é grátis | Cobra **por attachment/hora + por GB** |
| Regional edge cache acelera tudo | **Não** para PUT/POST/PATCH/OPTIONS/DELETE, nem para conteúdo dinâmico |
| Signed cookie e signed URL são iguais | URL = arquivo individual. Cookie = vários arquivos sem mudar URL. **URL tem precedência** |

## Links

- [[03 - Dominio 3 - Design High-Performing Architectures (24%)]]
- [[Alta disponibilidade - ELB, Auto Scaling e Route 53]]
- [[Rede segura - SG, NACL e endpoints]]
- [[Custo de rede e transferencia de dados]]
- [Como o CloudFront funciona](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/HowCloudFrontWorks.html)
- [O que é o Global Accelerator](https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html)
- [Opções de conectividade com a VPC](https://docs.aws.amazon.com/whitepapers/latest/aws-vpc-connectivity-options/network-to-amazon-vpc-connectivity-options.html)
