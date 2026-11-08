---
tags: [saa-c03, dominio-2, elb, alb, nlb, auto-scaling, route53]
dominio: 2
tasks: [2.1, 2.2]
atualizado: 2026-11-08
---

# Alta disponibilidade — ELB, Auto Scaling e Route 53

## 🧩 Em 30 segundos

- **ALB = camada 7** (HTTP), roteia por **host e path**, aceita **Lambda** como target, integra com **WAF**, exige **2+ AZs**, cross-zone **sempre ligado** no nível do LB.
- **NLB = camada 4** (TCP/UDP/TLS/QUIC), **IP estático** por AZ, cross-zone **desligado por padrão**.
- **GWLB = camada 3**, para appliance de inspeção, **GENEVE na porta 6081**.
- **ASG**: target tracking é a política recomendada; o health check do **ELB não vem ligado**; equilíbrio entre AZs tem precedência sobre política de terminação.
- **Route 53**: 8 políticas. **Alias** funciona no ápice do domínio e é grátis; **CNAME** não funciona no ápice e é cobrado.

## 🧠 Teste-se primeiro

> [!question]- ALB × NLB × GWLB: a tabela essencial
> | | **ALB** | **NLB** | **GWLB** |
> |---|---|---|---|
> | Camada OSI | **7** (application) | **4** (transport) | **3** (network) |
> | Protocolos | HTTP/0.9, 1.0, 1.1, **HTTP/2** (só em listener HTTPS), gRPC no backend, WebSocket | TCP, UDP, TCP_UDP, TLS, **QUIC**, TCP_QUIC | **todos os pacotes IP, todas as portas** |
> | Endereço | DNS name | **IP estático por AZ** (+ EIP opcional) | — |
> | Cross-zone | **sempre ligado** no LB (desligável por target group) | **desligado por padrão** | **desligado por padrão** |
> | Targets | EC2, container, **IP** (inclusive fora da VPC), **Lambda** | instance ID, IP, **um ALB** | appliances virtuais |
> | Roteamento | **host, path**, header HTTP, query string, source IP; redirect e fixed response | hash de fluxo (5-tuple) | hash de fluxo para o appliance |
> | WAF | **✅** | ❌ | ❌ |
> | AZs mínimas | *"at least two or more"* | — | — |
>
> MTU: ALB/NLB jumbo **9001**, GWLB **8500**. TTL do DNS do LB: **60 s**. Algoritmo padrão do ALB: round robin (ou *least outstanding requests*). NLB: *"Each individual TCP connection is routed to a single target for the life of the connection."*

> [!question]- Quais são os tipos de health check do Auto Scaling, e qual vem ligado?
> **EC2 status checks e scheduled events** → **o padrão, sempre ligado**.
> **Elastic Load Balancing health checks** → precisa ser **ativado**.
> **VPC Lattice health checks** → ativar.
> **Amazon EBS health checks** → ativar.
> **Custom health checks** → você marca via API.
>
> ⚠️ É a pegadinha nº 1 do ASG: a instância passa no status check da EC2 (o SO está vivo) mas a **aplicação** morreu. Sem o ELB health check habilitado, o ASG nunca substitui.

> [!question]- Grace period do ASG: qual o padrão?
> *"In the console, by default, the health check grace period is 300 seconds... Its default value is 0 seconds when you create an Auto Scaling group using the AWS CLI or an SDK."*
> E: se a instância **sai** do estado `running` durante o grace period, é marcada Unhealthy **imediatamente**.

> [!question]- Alias × CNAME no Route 53
> **Alias**: aponta para recursos AWS (**CloudFront, ELB, S3 website, API Gateway, Global Accelerator, interface endpoint, Elastic Beanstalk, App Runner, AppSync, OpenSearch custom domain**, ou outro registro da mesma zona). Funciona no **ápice** (*"you can create an alias record at the top node of a DNS namespace, also known as the zone apex"*). **Grátis** (*"Route 53 doesn't charge for alias queries to AWS resources"*). **Sem TTL próprio** — usa o do recurso.
> **CNAME**: aponta para qualquer nome DNS, **não** no ápice (*"You can't create a CNAME record that has the same name as the hosted zone"*), **cobrado**, responde a qualquer tipo de consulta.

## Auto Scaling — o que cai

| Item | Detalhe |
|---|---|
| Políticas dinâmicas | **Target tracking** (recomendada) · **Step scaling** · **Simple scaling** (a AWS recomenda **não** usar) |
| Outras | **Scheduled** (padrão previsível por hora/dia) · **Predictive** (*"in advance of daily and weekly patterns"*) |
| Cooldown | padrão **300 s**, e só se aplica a **simple scaling** |
| Warm-up | target tracking e step usam **instance warmup**, e *"can initiate a scale-out activity immediately without waiting for the cooldown period"* |
| Instância doente | substituída **sem** esperar cooldown |
| Lifecycle hooks | timeout padrão **1 hora**; global **48 h**. Resultado `continue` ou `abandon`. Usado para bootstrap antes de registrar no ELB |
| Terminação padrão | AZ com mais instâncias → launch configuration → launch template diferente do atual → versão mais antiga do template atual → mais próxima da próxima hora de cobrança |
| Precedência | *"Maintaining Zonal balance takes precedence over the termination policy"* |
| Rebalanceamento | lança **antes** de terminar; pode exceder o máximo em **10%** (ou 1 instância) |
| Throttle de substituição | acima de 90% da capacidade desejada, substitui no máximo **10%** por vez |
| Instance refresh | troca a fleet por uma nova versão do launch template — é a forma de **immutable infrastructure** citada no guia |

> [!tip] Target tracking é quase sempre a resposta
> Citação oficial: *"we recommend target tracking over either simple scaling or step scaling"*. Se a alternativa oferecer "simple scaling policy com cooldown", desconfie.

## Route 53 — as 8 políticas (texto oficial)

| Política | Uso |
|---|---|
| **Simple** | *"a single resource that performs a given function for your domain"*. ⚠️ Não faz health check |
| **Failover** | *"active-passive failover"* |
| **Geolocation** | *"route traffic based on the location of your users"* |
| **Geoproximity** | *"based on the location of your resources"*, com **bias** para deslocar tráfego |
| **Latency** | *"the Region that provides the best latency"* |
| **IP-based** | por **faixa de IP** de origem |
| **Multivalue answer** | *"up to eight healthy records selected at random"* |
| **Weighted** | *"in proportions that you specify"* |

Health checks: **endpoint** (IP ou domínio), **calculated** (combina outros health checks) e **CloudWatch alarm**. Para registro alias, em vez de health check você liga **Evaluate Target Health**.

- **Ativo-ativo**: *"using any routing policy (or combination of routing policies) other than failover"*.
- **Ativo-passivo**: política **failover**.
- CloudWatch alarm como health check: só métrica de resolução padrão, sem *"M out of N"*, sem metric math, mesma conta — e *"Route 53 doesn't wait for the CloudWatch alarm to go into the ALARM state"*.

## ❓ Questões de prova

> [!example]- Q1 — Um ASG mantém instâncias rodando, mas os usuários recebem erro 502. O processo da aplicação travou; o SO está no ar. Por que o ASG não substituiu as instâncias?
> **A)** O cooldown está muito longo
> **B)** **O health check do ELB não está habilitado no Auto Scaling group; só o EC2 status check está ativo** ✅
> **C)** O grace period é 0
> **D)** O target group está com cross-zone desligado
>
> **Por que B**: o EC2 status check valida **hipervisor e SO**, não a aplicação. O health check do ELB é o que testa a porta/caminho da aplicação — e **precisa ser ativado**.
> **A errada**: *"does not wait for the cooldown period to end before replacing the unhealthy instance"* — cooldown não impede substituição de instância doente.
> **C errada**: grace period 0 faria o ASG checar **mais cedo**, não menos.
> **D errada**: cross-zone afeta distribuição de tráfego, não detecção de falha.

> [!example]- Q2 — Uma aplicação TCP de alta performance precisa de **IPs estáticos** para serem liberados em firewalls de clientes, com latência mínima. Qual load balancer?
> **A)** ALB
> **B)** **NLB** ✅
> **C)** Classic Load Balancer
> **D)** ALB atrás do Global Accelerator
>
> **Por que B**: *"Elastic Load Balancing creates a network interface for each Availability Zone you enable, and uses it to get a static IP address"* — e opcionalmente um EIP por AZ. Camada 4, latência mínima.
> **A errada**: ALB expõe **DNS name**, não IP fixo, e é camada 7 (overhead desnecessário para TCP puro).
> **C errada**: geração anterior; a AWS recomenda migrar.
> **D errada**: Global Accelerator **também** dá IPs estáticos anycast e é uma resposta válida em cenários globais — mas aqui adiciona custo e complexidade; o requisito se resolve com NLB. Se o enunciado dissesse "usuários em vários continentes com failover regional", a resposta mudaria.

> [!example]- Q3 — `exemplo.com` (ápice) precisa apontar para uma distribuição CloudFront. Como configurar no Route 53?
> **A)** Registro CNAME para o domínio do CloudFront
> **B)** **Registro alias de tipo A apontando para a distribuição CloudFront** ✅
> **C)** Registro A com o IP da distribuição
> **D)** Registro NS delegando para o CloudFront
>
> **Por que B**: alias é o único que funciona no **ápice** e aponta para recursos AWS, inclusive CloudFront — e não é cobrado.
> **A errada**: CNAME não pode ter o mesmo nome da hosted zone.
> **C errada**: CloudFront não publica IP fixo.
> **D errada**: NS delega zona; não tem nada a ver.

> [!example]- Q4 — Um site precisa servir usuários de três regiões pela região de menor latência, com failover automático se uma região ficar indisponível. Qual configuração do Route 53?
> **A)** Geolocation routing com health checks
> **B)** **Latency-based routing com health checks nos endpoints de cada região** ✅
> **C)** Failover routing com três registros
> **D)** Simple routing com os três IPs
>
> **Por que B**: latency routing escolhe *"the Region that provides the best latency"*, e com health check o Route 53 para de responder com o endpoint doente — o que configura **ativo-ativo** (*"any routing policy... other than failover"*).
> **A errada**: geolocation roteia por **localização do usuário**, não por latência medida — nem sempre é o mais rápido.
> **C errada**: failover é **ativo-passivo**, com um primário só.
> **D errada**: *"although you can specify multiple IP addresses, they are not health checked"*.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| ALB tem IP estático | **DNS name.** IP estático é NLB |
| NLB roteia por path | Só **ALB** (camada 7) |
| Cross-zone é padrão em todos | **ALB sim** (no LB), **NLB e GWLB não** |
| WAF funciona em NLB | Não. ALB, CloudFront, API Gateway REST, AppSync, Cognito user pool, App Runner, Verified Access, Amplify |
| Lambda é target de NLB | É target de **ALB** |
| ALB pode rodar em 1 AZ | Exige **2+** |
| ASG já checa a aplicação | Só com **ELB health check habilitado** |
| Cooldown atrasa a substituição de instância doente | Não atrasa |
| Grace period é sempre 300 s | **300 s no console, 0 s via CLI/SDK** |
| ASG respeita a política de terminação acima de tudo | **Equilíbrio entre AZs** tem precedência |
| Simple scaling é o jeito normal | A AWS recomenda **não** usar; prefira target tracking |
| CNAME funciona no ápice | **Não.** Alias funciona |
| Alias é cobrado | Alias para recurso AWS é **grátis** |
| Simple routing faz health check | **Não faz** |
| Failover routing é ativo-ativo | É **ativo-passivo** |

## Links

- [[02 - Dominio 2 - Design Resilient Architectures (26%)]]
- [[Computacao elastica - EC2 e placement groups]]
- [[Rede e borda - CloudFront, Global Accelerator e conectividade hibrida]]
- [Como o ELB funciona](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/how-elastic-load-balancing-works.html)
- [Políticas de roteamento do Route 53](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html)
