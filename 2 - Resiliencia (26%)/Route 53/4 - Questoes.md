---
tags: [saa-c03, route53, questoes]
servico: Amazon Route 53
atualizado: 2026-11-08
---

# Route 53 — Questões

> [!question]- Q1. `exemplo.com` (ápice) precisa apontar para uma distribuição CloudFront.
> **A)** Registro CNAME para o domínio do CloudFront
> **B)** **Registro alias de tipo A apontando para a distribuição** ✅
> **C)** Registro A com o IP da distribuição
> **D)** Registro NS delegando para o CloudFront
>
> **Por que B**: alias é o único que funciona no **ápice** — *"you can create an alias record at the top node of a DNS namespace"* — e não é cobrado.
> **A errada**: *"You can't create a CNAME record that has the same name as the hosted zone."*
> **C errada**: CloudFront não publica IP fixo.

> [!question]- Q2. Site em três regiões, servindo cada usuário pela região de menor latência, com failover automático.
> **A)** Geolocation routing com health checks
> **B)** **Latency-based routing com health checks nos endpoints de cada região** ✅
> **C)** Failover routing com três registros
> **D)** Simple routing com os três IPs
>
> **Por que B**: latency escolhe *"the Region that provides the best latency"*, e com health check configura **ativo-ativo** (*"any routing policy... other than failover"*).
> **A errada**: geolocation roteia por **localização**, não por latência medida.
> **C errada**: failover é **ativo-passivo**.
> **D errada**: *"they are not health checked"*.

> [!question]- Q3. Requisito de compliance: usuários da União Europeia devem ser atendidos **sempre** pela região de Frankfurt.
> **A)** Latency-based routing
> **B)** **Geolocation routing** ✅
> **C)** Geoproximity com bias
> **D)** Weighted routing
>
> **Por que B**: geolocation roteia *"based on the location of your users"* — é a política para requisito legal/regulatório.
> **A errada**: latência pode mandar um usuário europeu para outra região.
> **C errada**: geoproximity parte da localização dos **recursos** e serve para **deslocar** carga, não para garantir origem.

> [!question]- Q4. Migrar gradualmente o tráfego do ambiente antigo para o novo, começando com 5%.
> **A)** Latency routing
> **B)** **Weighted routing** ✅
> **C)** Multivalue answer
> **D)** Failover routing
>
> **Por que B**: *"in proportions that you specify"* — é o mecanismo de canary e migração gradual.

> [!question]- Q5. O endpoint a monitorar está numa subnet privada, sem IP público. Como fazer health check?
> **A)** Endpoint health check pelo IP privado
> **B)** **Health check do tipo CloudWatch alarm, baseado numa métrica da aplicação** ✅
> **C)** Calculated health check
> **D)** Não é possível
>
> **Por que B**: o endpoint health check vem da internet e não alcança IP privado. O tipo **CloudWatch alarm** usa uma métrica como critério de saúde.
> **C errada**: calculated combina **outros** health checks — ainda precisaria de um que funcionasse.

> [!question]- Q6. O failover por DNS está levando minutos. O requisito é segundos.
> **A)** Reduzir o TTL para 0
> **B)** **AWS Global Accelerator (IP anycast, failover quase instantâneo)** ✅
> **C)** Multivalue answer
> **D)** Mais health checks
>
> **Por que B**: DNS depende de TTL e de cache do resolver. O Global Accelerator *"reacts instantly to changes in health or configuration"*, e o cliente mantém o mesmo IP.
> **A errada**: TTL baixo ajuda, mas resolvers não respeitam TTL zero de forma confiável, e aumenta muito o volume de consultas.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| CNAME funciona no ápice | **Não.** Alias funciona |
| Alias é cobrado | Alias para recurso AWS é **grátis** |
| Posso definir o TTL do alias | Route 53 usa o TTL **do recurso** |
| Simple routing faz health check | **Não faz** |
| Failover routing é ativo-ativo | É **ativo-passivo** |
| Latency routing escolhe o mais perto | Escolhe a **menor latência medida** |
| Geoproximity = geolocation | Geoproximity parte dos **recursos** e usa **bias** |
| Multivalue answer é um load balancer | Devolve **até 8** registros saudáveis, aleatórios — não distribui carga de verdade |
| Failover por DNS é instantâneo | Depende de **TTL** e cache. Para segundos: **Global Accelerator** |
| Health check alcança subnet privada | Não. Use o tipo **CloudWatch alarm** |
| NACL pode bloquear o DNS da VPC | Não. Use **Resolver DNS Firewall** |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
