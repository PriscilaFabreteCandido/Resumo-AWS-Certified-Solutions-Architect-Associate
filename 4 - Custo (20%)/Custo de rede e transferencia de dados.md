---
tags: [saa-c03, dominio-4, nat-gateway, data-transfer, custo, rede]
dominio: 4
tasks: [4.4]
atualizado: 2026-11-08
---

# Custo de rede e transferência de dados

## 🧩 Em 30 segundos

- **Entrada (ingress) na AWS é geralmente grátis. Saída (egress) custa.** Quanto mais longe, mais caro.
- **Gateway endpoint (S3/DynamoDB) é grátis** e tira o tráfego do NAT gateway — a economia mais citada na prova.
- **NAT gateway** cobra **por hora + por GB processado**. Um por AZ evita tráfego cross-AZ (que também é cobrado).
- **Origem AWS → CloudFront é grátis**; servir pelo CloudFront é mais barato que servir direto do S3 em volume.
- **VPC peering na mesma AZ é grátis**; **Transit Gateway** cobra por attachment/hora + por GB.

## 🧠 Teste-se primeiro

> [!question]- Onde o data transfer é cobrado e onde não é?
> **Grátis**: entrada na AWS · dentro da **mesma AZ** via IP privado · origem AWS (S3, ELB, API Gateway) → **CloudFront** · replicação de read replica na **mesma região** · tráfego em **gateway endpoint**.
> **Cobrado**: saída para a internet · **entre AZs** · **entre regiões** · através de **NAT gateway** (por GB) · através de **Transit Gateway** (por GB) · **interface endpoint** (por hora e por GB) · peering **cross-AZ** e **cross-Region**.
> Citação do peering: *"All data transfer over a VPC peering connection that stays within an Availability Zone is free, even if it's between different accounts. Charges apply for data transfer... that cross Availability Zones and Regions."*

> [!question]- NAT gateway × NAT instance, pela tabela oficial
> | Atributo | **NAT gateway** | **NAT instance** |
> |---|---|---|
> | Disponibilidade | *"Highly available... implemented with redundancy"* (dentro da AZ) | *"Use a script to manage failover between instances"* |
> | Banda | *"Scale up to 100 Gbps"* | depende do tipo de instância |
> | Manutenção | *"Managed by AWS"* | **você** patcheia |
> | Custo | número de gateways + duração + **GB processado** | número de instâncias + duração + tipo/tamanho |
> | Security group | **não aceita** | aceita |
> | Port forwarding / bastion | **não suportado** | suportado |
>
> Recomendação oficial: *"We recommend that you use NAT gateways because they provide better availability and bandwidth and require less effort on your part to administer."*
> **Onde a NAT instance ganha em custo**: volume de tráfego baixo e constante, em que a tarifa por GB do NAT gateway pesa mais que uma instância pequena. A prova aceita isso só quando o enunciado for explícito sobre custo **e** tolerar o esforço operacional.

> [!question]- Um NAT gateway compartilhado ou um por AZ?
> O guia pede literalmente: *"Configuring appropriate NAT gateway types for a network (for example, a single shared NAT gateway compared with NAT gateways for each Availability Zone)"*.
> **Um por AZ**: evita tráfego **cross-AZ** (que é cobrado) e dá zona-independência — *"Create a NAT gateway in each Availability Zone to ensure zone-independent architecture"*. Custa mais em horas de gateway.
> **Um compartilhado**: menos horas de gateway, mas todo o tráfego das outras AZs vira **cross-AZ cobrado** e o gateway é ponto único de falha.
> Regra prática: **volume alto → um por AZ** (a economia de cross-AZ supera as horas extras). **Volume muito baixo e ambiente não crítico → um compartilhado**.

## As cinco economias de rede que a prova testa

| # | Situação | Economia |
|---|---|---|
| 1 | Subnet privada gravando muito no **S3/DynamoDB** via NAT gateway | **Gateway endpoint** (grátis) — tira o volume do NAT |
| 2 | Muito download do S3 para a internet | **CloudFront** — origem AWS → CloudFront é grátis, e o egress pela borda é mais barato |
| 3 | Tráfego entre AZs desnecessário | Manter cliente e servidor na **mesma AZ**; um NAT por AZ; cross-zone LB consciente |
| 4 | Dezenas de VPCs em peering full mesh | **Transit Gateway** reduz complexidade (mas cobra por attachment — compare) |
| 5 | Replicação ou backup entre regiões sem necessidade | Revisar se o requisito realmente é multi-região |

> [!tip] A pergunta que resolve quase toda questão de custo de rede
> "**Esse byte precisa atravessar uma fronteira cobrada?**" As fronteiras cobradas são: internet, AZ, região, NAT gateway, Transit Gateway e interface endpoint. Se existe um caminho que não cruza nenhuma delas (gateway endpoint, mesma AZ, CloudFront a partir de origem AWS), é a resposta.

## Conectividade híbrida e custo

| Opção | Perfil de custo |
|---|---|
| **Internet / VPN** | Sem custo de porta; paga egress. Rápido de montar, barato para volume baixo |
| **Direct Connect** | **Port hours + data transfer out**. Egress pelo DX é **mais barato por GB** que pela internet — a partir de certo volume, o DX se paga |
| **DX hosted (50 Mbps a 25 Gbps)** | Degrau de entrada barato, provisionado por parceiro |
| **DX dedicada (1/10/100/400 Gbps)** | Para volume alto e banda previsível |

> [!important] Quando o Direct Connect reduz custo
> O whitepaper lista *"Reduced bandwidth costs"* entre as vantagens do DX. O raciocínio de prova: transferência de **saída** constante e volumosa para on-premises fica mais barata por GB no DX do que pela internet, e você ganha previsibilidade. Para volume baixo, a VPN é mais econômica (sem port hours).

## Throttling como controle de custo

O guia pede *"Selecting an appropriate throttling strategy"* dentro de **custo de rede**:

- **API Gateway**: throttle por stage, por método e por cliente (**usage plan**) — evita que um consumidor gere custo ilimitado de backend.
- **WAF rate-based rule**: corta flood antes de chegar na aplicação.
- **Reserved concurrency do Lambda**: teto de concorrência (e, com valor 0, desliga) — *"incurs no additional charges"*.
- **DynamoDB provisionado com auto scaling**: teto de capacidade em vez de on-demand ilimitado.
- **SQS como buffer**: converte pico em fila, permitindo processar com menos capacidade.

## ❓ Questões de prova

> [!example]- Q1 — Uma aplicação em 3 AZs usa um único NAT gateway e envia 50 TB/mês para um bucket S3 na mesma região. Qual mudança reduz mais o custo?
> **A)** Criar um NAT gateway por AZ
> **B)** **Criar um gateway endpoint para o S3 nas route tables das subnets privadas** ✅
> **C)** Substituir o NAT gateway por NAT instances
> **D)** Habilitar Transfer Acceleration no bucket
>
> **Por que B**: elimina os 50 TB do processamento do NAT gateway **e** o tráfego cross-AZ para alcançá-lo, sem custo adicional de endpoint.
> **A errada**: corta o cross-AZ, mas você continua pagando por GB processado no NAT para 50 TB.
> **C errada**: troca uma cobrança por outra e adiciona esforço operacional e risco de HA.
> **D errada**: **adiciona** custo, e é para upload de fora da AWS.

> [!example]- Q2 — Um site serve 200 TB/mês de vídeos a partir de um bucket S3 diretamente para a internet. Qual mudança reduz o custo de transferência?
> **A)** Mudar os objetos para Standard-IA
> **B)** **Servir pelo CloudFront, com o bucket como origem** ✅
> **C)** Habilitar Requester Pays no bucket
> **D)** Replicar o bucket para três regiões
>
> **Por que B**: *"The data transfer from your origin to CloudFront is always free when using AWS origins like Amazon S3"*, e o egress pela borda tem tarifa menor — além do cache reduzir as requisições à origem.
> **A errada**: IA reduz o preço de **armazenamento** e **adiciona** taxa de retrieval; não mexe no egress.
> **C errada**: transfere o custo para o requisitante (o que muda o modelo de negócio) e **proíbe acesso anônimo** — inviável para site público.
> **D errada**: triplica armazenamento e não reduz egress.

> [!example]- Q3 — Doze VPCs em quatro contas precisam se comunicar. Hoje são 30 conexões de peering, difíceis de manter. O time quer reduzir complexidade sabendo que vai crescer. Qual o trade-off correto?
> **A)** Manter o peering, que é mais barato
> **B)** **Migrar para Transit Gateway, aceitando o custo por attachment/hora e por GB em troca de roteamento transitivo e escala até 5.000 attachments** ✅
> **C)** PrivateLink entre todas as VPCs
> **D)** Uma VPC única compartilhada por RAM
>
> **Por que B**: é o trade-off que a prova quer que você reconheça — peering é mais barato por byte (grátis na mesma AZ) mas **não é transitivo** e cresce em O(n²); o TGW cobra, e paga-se por isso em operabilidade e escala.
> **A errada**: 12 VPCs em full mesh = 66 conexões; é insustentável e o enunciado já diz que vai crescer.
> **C errada**: PrivateLink expõe **serviço**, não conecta redes.
> **D errada**: VPC compartilhada via RAM é uma opção real de arquitetura, mas não é "conectar 12 VPCs existentes" — exigiria replanejar tudo.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Data transfer dentro da AWS é grátis | **Cross-AZ e cross-Region são cobrados** |
| Entrada na AWS é cobrada | Entrada é **geralmente grátis**; a saída custa |
| Gateway endpoint custa | **Grátis.** O interface endpoint é que cobra |
| NAT gateway cobra só por hora | **Hora + GB processado** |
| Um NAT gateway é mais barato sempre | Em volume alto, o **cross-AZ** supera a economia de horas |
| NAT instance é sempre mais caro | Em volume baixo pode sair mais barato — ao preço de HA e manutenção manuais |
| CloudFront encarece | Origem AWS → CloudFront é **grátis**, e o egress pela borda é mais barato |
| Transit Gateway é grátis como o peering | Cobra **por attachment/hora + por GB** |
| Direct Connect só aumenta o custo | Reduz o custo por GB de egress em volume alto (*"Reduced bandwidth costs"*) |
| Throttling é só segurança | O guia o lista como controle de **custo** |

## Links

- [[04 - Dominio 4 - Design Cost-Optimized Architectures (20%)]]
- [[Rede e borda - CloudFront, Global Accelerator e conectividade hibrida]]
- [[Rede segura - SG, NACL e endpoints]]
- [NAT gateway × NAT instance](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-comparison.html)
