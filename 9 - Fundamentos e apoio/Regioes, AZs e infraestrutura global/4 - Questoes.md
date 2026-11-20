---
tags: [saa-c03, regioes, az, questoes]
conceito: Regiões, Zonas de Disponibilidade e infraestrutura global
atualizado: 2026-11-08
---

# Regiões e AZs — Questões

> [!question] Q1. Qual é a distância máxima entre AZs da mesma Região?
> **A)** 10 km
> **B)** 100 km (60 milhas)
> **C)** 500 km
> **D)** Não há limite definido
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"AZs are physically separated by a meaningful distance, many kilometers, from any other AZ, although all are within 100 km (60 miles) of each other."* (as AZs são separadas fisicamente por uma distância significativa, de muitos quilômetros, de qualquer outra AZ — embora todas fiquem a até 100 km (60 milhas) umas das outras)
> > É esse teto que permite **replicação sincrônica** (RDS Multi-AZ, Aurora) sem latência inviável.

> [!question] Q2. Um volume EBS está em `us-east-1a`. A instância que precisa dele está em `us-east-1b`.
> **A)** Anexar normalmente — EBS é regional
> **B)** Habilitar multi-attach
> **C)** Criar um snapshot e, a partir dele, um volume em `us-east-1b`
> **D)** Mover o volume pela console
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: **EBS é zonal**; o **snapshot é regional**, e é ele que atravessa AZs (e, copiado, Regiões).
> > **B errada**: Multi-Attach anexa um volume io1/io2 a várias instâncias — **todas na mesma AZ**.

> [!question] Q3. A empresa quer sobreviver à indisponibilidade de uma **Região** inteira.
> **A)** RDS Multi-AZ
> **B)** ASG em 3 AZs atrás de um ALB
> **C)** Replicação para outra Região (ex.: Aurora Global Database ou S3 CRR) com failover no Route 53
> **D)** Aumentar o número de AZs para 6
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: **Multi-AZ não protege contra falha regional**. É a pegadinha nº 1 do domínio 2.
> > **A e B erradas**: resolvem falha de **AZ**.

> [!question] Q4. Qual destes recursos é **global**?
> **A)** Security Group
> **B)** IAM role
> **C)** Subnet
> **D)** VPC
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: IAM (users, roles, policies) é global. Também globais: **Route 53, CloudFront, Organizations, Global Accelerator**.
> > **A e D erradas**: regionais. **C errada**: zonal.

> [!question] Q5. O certificado criado no ACM não aparece para associar à distribuição do CloudFront.
> **A)** O certificado precisa ser importado, não emitido
> **B)** Para CloudFront, o certificado tem de estar em `us-east-1`
> **C)** CloudFront só aceita certificado de terceiros
> **D)** Falta validar por e-mail
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: CloudFront é global e lê certificados de **us-east-1** (N. Virginia). O mesmo vale para o **WAF com escopo CLOUDFRONT**.

> [!question] Q6. Um jogo precisa de latência de **milissegundo único** para jogadores de uma única metrópole.
> **A)** CloudFront
> **B)** Global Accelerator
> **C)** AWS Local Zones
> **D)** Mais AZs na Região
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: Local Zones existem exatamente para *single-digit millisecond latency* em metrópoles.
> > **A errada**: CloudFront acelera conteúdo **cacheável**, não computação com estado.
> > **B errada**: melhora o caminho de rede até a Região, mas a computação continua lá.

> [!question] Q7. Uma VPC com subnets em 3 AZs tem **um** NAT Gateway na AZ A. A AZ A falha.
> **A)** O NAT Gateway migra automaticamente
> **B)** As instâncias privadas das AZs B e C perdem a saída para a internet
> **C)** Nada acontece — NAT Gateway é regional
> **D)** O ALB assume o roteamento
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: **NAT Gateway é zonal**. A boa prática é **um por AZ**, com a route table de cada subnet privada apontando para o da sua própria AZ — isso também evita cobrança de tráfego entre AZs.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Multi-AZ protege de desastre regional | Protege de falha de **AZ**; desastre regional pede **Multi-Region** |
| AZ = um data center | **"um ou mais"** data centers |
| EBS é regional | **Zonal** — o **snapshot** é que é regional |
| Uma subnet pode abranger AZs | Uma subnet = **uma AZ** |
| NAT Gateway cobre a VPC | **Zonal** — um **por AZ** |
| `us-east-1a` é o mesmo data center em toda conta | Mapeamento randomizado; use o **AZ ID** (`use1-az1`) |
| Certificado ACM de qualquer Região serve ao CloudFront | Precisa ser **us-east-1** |
| Recursos replicam entre Regiões sozinhos | **Nada** atravessa Região sem você configurar |
| Tráfego entre AZs é grátis | **É cobrado** (embora criptografado) |

## Links

- [[9 - Fundamentos e apoio/Regioes, AZs e infraestrutura global/1 - O que e|1 - O que e]] · [[9 - Fundamentos e apoio/Regioes, AZs e infraestrutura global/2 - Decorar|2 - Decorar]] · [[9 - Fundamentos e apoio/Regioes, AZs e infraestrutura global/3 - Detalhes|3 - Detalhes]]
