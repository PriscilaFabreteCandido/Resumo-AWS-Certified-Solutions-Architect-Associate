---
tags: [saa-c03, numeros, quotas, alta-prioridade]
atualizado: 2026-11-08
fonte: docs.aws.amazon.com, conferido em 08/11/2026
---

# 🔢 Números para decorar

> [!important] Tudo aqui foi conferido na documentação oficial em 08/11/2026
> Onde a doc **não** afirma um número, está escrito "a doc não informa" em vez de um palpite. Isso importa: metade dos números errados em cursinhos vem de valores antigos que a AWS já mudou.

## 🧩 Em 30 segundos — os 12 números que mais caem

| Número | O quê |
|---|---|
| **720 / 1.000** | Nota mínima. 50 questões valem nota, 15 não. |
| **5 IPs** | Reservados pela AWS em **toda** subnet (os 4 primeiros + o último). |
| **/16 a /28** | Faixa de máscara permitida para uma **subnet**. |
| **2 túneis** | Toda conexão Site-to-Site VPN. 1,25 Gbps por túnel (padrão). |
| **6 cópias em 3 AZs** | Aurora. Até **15** réplicas. |
| **400 KB** | Item máximo no DynamoDB. |
| **4 KB / 1 KB** | 1 RCU = leitura forte de 4 KB. 1 WCU = escrita de 1 KB. |
| **11 noves (99,999999999%)** | Durabilidade de **todas** as classes do S3 (exceto Reduced Redundancy). |
| **30 / 90 / 180 dias** | Mínimo de armazenamento: IA / Glacier IR e Flexible / Deep Archive. |
| **128 KB** | Objeto mínimo cobrado em IA/Glacier IR, e abaixo disso lifecycle não transiciona. |
| **900 s (15 min)** | Timeout máximo do Lambda. |
| **1 MB/s por shard** | Escrita no Kinesis Data Streams (leitura: 2 MB/s). |

---

## 🧠 Teste-se primeiro

> [!question]- Quantos IPs a AWS reserva por subnet, e quais?
> **5.** Em `10.0.0.0/24`: `.0` (endereço de rede), `.1` (router da VPC), `.2` (DNS — base da faixa + 2), `.3` (uso futuro) e `.255` (broadcast, que a VPC não suporta).
> Logo um `/28` (16 IPs) dá só **11 utilizáveis**.

> [!question]- Mínimo de armazenamento e tamanho mínimo cobrado de cada classe do S3?
> Standard: nenhum / nenhum. **Standard-IA e One Zone-IA: 30 dias / 128 KB.** **Glacier Instant Retrieval: 90 dias / 128 KB.** **Glacier Flexible Retrieval: 90 dias.** **Deep Archive: 180 dias.** Intelligent-Tiering: nenhum / nenhum (mas objeto < 128 KB nunca sai do tier Frequent Access).

> [!question]- Quanto tempo leva cada tier de restore do Glacier?
> **Flexible Retrieval**: Expedited 1-5 min · Standard 3-5 h · Bulk 5-12 h.
> **Deep Archive**: Expedited **não existe** · Standard até 12 h · Bulk até 48 h.
> Glacier **Instant** Retrieval não precisa de restore: é `GET` direto, em milissegundos.

> [!question]- Failover: RDS Multi-AZ cluster, Aurora com réplica, Aurora sem réplica?
> Multi-AZ **DB cluster**: *"typically under 35 seconds"*.
> Aurora **com** Aurora Replica: *"less than 60 seconds, and often less than 30 seconds"*.
> Aurora **sem** réplica: recria a instância, *"typically takes less than 10 minutes"*.
> Multi-AZ **DB instance**: a doc da AWS **não informa** um tempo típico.

---

## 1. S3

| Item | Valor |
|---|---|
| Durabilidade (todas as classes, exceto RRS) | 99,999999999% (11 noves) |
| Disponibilidade projetada | Standard **99,99%** · Standard-IA **99,9%** · Intelligent-Tiering **99,9%** · One Zone-IA **99,5%** · Express One Zone **99,95%** · Glacier IR **99,9%** · Glacier FR e Deep Archive **99,99% (após restaurar)** |
| AZs | ≥ 3 em tudo, **exceto** One Zone-IA e Express One Zone (**1 AZ**) |
| Mínimo de armazenamento | IA e One Zone-IA **30 dias** · Glacier IR e Glacier FR **90 dias** · Deep Archive **180 dias** |
| Tamanho mínimo cobrado | 128 KB em Standard-IA, One Zone-IA e Glacier IR |
| Overhead de arquivo (Glacier FR / Deep Archive) | **40 KB** por objeto: 32 KB na taxa do Glacier + 8 KB na taxa do Standard |
| Objeto máximo | **48,8 TiB** |
| Multipart upload | Recomendado a partir de **100 MB**. Partes de **5 MiB a 5 GiB**, no máximo **10.000** partes |
| Taxa de requisição por prefixo | **3.500** PUT/COPY/POST/DELETE e **5.500** GET/HEAD por segundo, **por prefixo** (sem limite de prefixos) |
| Latência típica | 100-200 ms para objeto pequeno |
| Intelligent-Tiering (transições automáticas) | Infrequent Access após **30** dias sem acesso · Archive Instant Access após **90** · Archive Access (opt-in) **mín. 90** · Deep Archive Access (opt-in) **mín. 180** |
| Lifecycle: objeto pequeno | Objetos **< 128 KB** não transicionam por padrão (desde set/2024) |
| S3 Replication Time Control | *"99.9 percent of those objects within 15 minutes"* |
| Versionamento | 3 estados: Unversioned (padrão) · Enabled · Suspended. **Enabled nunca volta a Unversioned** |

> [!warning] Caminho de transição do lifecycle é "cascata", de quente para frio
> Glacier **Flexible Retrieval** só transiciona para **Deep Archive**. E de **Deep Archive não sai** por lifecycle para nenhuma outra classe.
> Você também **não pode** criar uma regra que mova o objeto antes do mínimo da classe atual: se foi para Glacier IR no dia 4, a transição para Deep Archive precisa ser no dia **94** ou depois (4 + 90).

## 2. EBS

| Tipo | IOPS máx/volume | Throughput máx/volume | Tamanho | Multi-Attach | Boot |
|---|---|---|---|---|---|
| **gp3** (SSD, padrão) | 80.000 | 2.000 MiB/s | 1 GiB – 64 TiB | ❌ | ✅ |
| **gp2** (SSD, legado) | 16.000 | 250 MiB/s | 1 GiB – 16 TiB | ❌ | ✅ |
| **io1** (SSD) | 64.000 | 1.000 MiB/s | 4 GiB – 16 TiB | ✅ | ✅ |
| **io2 Block Express** (SSD) | 256.000 | 4.000 MiB/s | 4 GiB – 64 TiB | ✅ | ✅ |
| **st1** (HDD throughput) | 500 | 500 MiB/s | 125 GiB – 16 TiB | ❌ | ❌ |
| **sc1** (HDD cold) | 250 | 250 MiB/s | 125 GiB – 16 TiB | ❌ | ❌ |

- Durabilidade: **99,8%-99,9%** em gp2/gp3/io1/st1/sc1. **io2 Block Express: 99,999%**.
- Instâncias **não-Nitro** chegam a 32.000 IOPS mesmo com volume provisionado acima disso.
- **HDD (st1/sc1) não serve como boot volume.** Pegadinha recorrente.

## 3. EFS

- Modos de **throughput**: **Elastic** (recomendado), **Provisioned**, **Bursting**.
- Modos de **performance**: **General Purpose** (padrão) e **Max I/O** (geração anterior).
- Bursting: baseline **50 MiB/s por TiB**; burst até **100 MiB/s por TiB** (mínimo 100 MiB/s).
- Latência de primeiro byte: **~1 ms leitura / ~2,7 ms escrita** (Standard). IA e Archive: dezenas de ms.
- One Zone usa **sempre** General Purpose e **não** suporta Max I/O nem Elastic.

## 4. VPC e rede

| Item | Valor |
|---|---|
| IPs reservados por subnet | **5** (4 primeiros + último) |
| Máscara de subnet IPv4 | **/28** (16 IPs) a **/16** |
| Máscara de subnet IPv6 | /44 a /64, em incrementos de /4 |
| Regras de NACL | numeradas de **1 a 32766**, avaliadas da menor para a maior; regra `*` = DENY final |
| NAT gateway | escala até **100 Gbps**; vive em subnet **pública**; **não aceita security group** |
| Site-to-Site VPN | **2 túneis** por conexão; **1,25 Gbps** por túnel (padrão) ou **5 Gbps** com Large Bandwidth Tunnel (só com Transit Gateway / Cloud WAN) |
| Direct Connect — dedicada | **1, 10, 100 e 400 Gbps** (provisionada por você; até **72 h úteis** para a AWS liberar a porta) |
| Direct Connect — hosted | **50 Mbps a 25 Gbps** (provisionada por um parceiro) |
| Transit Gateway | até **5.000** attachments; MTU **8.500** entre VPCs, **1.500** sobre VPN |
| Gateway endpoint | **sem custo adicional**; só **S3 e DynamoDB** |
| Route 53 | **8** políticas de roteamento; multivalue devolve até **8** registros saudáveis |
| TTL do DNS do ELB | **60 segundos** |
| Global Accelerator | **2** IPv4 estáticos (4 endereços no total em dual-stack) |

## 5. EC2 e Auto Scaling

| Item | Valor |
|---|---|
| Spot: aviso de interrupção | **2 minutos** |
| Reserved Instances | **1 ou 3 anos**; All / Partial / No Upfront; **Standard** (maior desconto, só modificável) × **Convertible** (trocável) |
| Savings Plans | *"up to 72%"*. Compute **até 66%** · EC2 Instance **até 72%** · SageMaker AI **até 64%** · Database **até 35%** |
| Placement group — **partition** | máximo **7 partições por AZ** (2 com Dedicated Instances) |
| Placement group — **spread** | máximo **7 instâncias por AZ** (3 AZs = 21) |
| Placement group — **cluster** | 1 AZ só; fluxo único até **10 Gbps** dentro do grupo (5 Gbps fora) |
| ASG: cooldown padrão | **300 s (5 min)** — só se aplica a *simple scaling* |
| ASG: health check grace period | **300 s** no console, **0 s** via CLI/SDK |
| ASG: rebalanceamento entre AZs | pode exceder o máximo em **10%** (ou 1 instância) temporariamente |
| ASG: lifecycle hook timeout | **1 hora** (heartbeat); global **48 h** |
| ELB: connection draining | **300 s** por padrão |
| Spot Fleet: `launch-before-terminate` delay | **120 s a 7.200 s** |

> [!tip] Ordem padrão de terminação do ASG (cai em prova)
> 1. AZ com **mais** instâncias (e pelo menos uma sem proteção de scale-in)
> 2. Dentro dela: launch **configuration** antes de launch template → template diferente do atual → **versão mais antiga** do template atual
> 3. Por fim, a mais próxima da próxima hora de cobrança
>
> **Equilíbrio entre AZs tem precedência sobre a política de terminação.** Instância marcada *unhealthy* é substituída **sem esperar cooldown**.

## 6. Bancos de dados

| Item | Valor |
|---|---|
| RDS Multi-AZ **instance** | 1 standby, **síncrono**, **não lê**; tempo de failover: a doc não informa |
| RDS Multi-AZ **DB cluster** | 1 writer + **2 readers**, **3 AZs**, **semi-síncrono**, failover *"typically under 35 seconds"* |
| Read replica | **assíncrona**; pode ser cross-Region; pode ser promovida; aumento de storage mínimo de **10%** |
| Aurora: cópias | **6 cópias em 3 AZs** (volume até **128 TiB**, com até **256 TiB** em versões específicas) |
| Aurora: réplicas | até **15** Aurora Replicas; prioridade de failover **tier 0 (maior) a 15 (menor)** |
| Aurora: failover | com réplica **< 60 s, frequentemente < 30 s**; sem réplica **< 10 min** |
| Aurora Global Database | 1 região primária + **até 10 secundárias**; lag *"typically under a second"*; **RPO em segundos, RTO em minutos**; *switchover* planejado = **RPO 0**; cluster secundário suporta **16** readers |
| Aurora Serverless v2 | **1 ACU ≈ 2 GiB** de memória; mínimo **0,5 ACU** (ou **0 ACU** para pausar); escala em passos de **0,5 ACU**; cobrado **por segundo** |
| Aurora I/O-Optimized | vale a pena quando I/O é **≥ 25%** da fatura; troca permitida a cada **30 dias** |
| DynamoDB: item | **400 KB** (nome + valor do atributo contam) |
| DynamoDB: chaves | partition key **1-2048 bytes**, sort key **1-1024 bytes**; aninhamento até **32 níveis** |
| DynamoDB: índices | **20 GSIs** e **5 LSIs** por tabela |
| DynamoDB: LSI | **10 GB** por valor de partition key. GSI **não tem** limite de tamanho |
| DynamoDB: capacidade | 40.000 RCU e 40.000 WCU por tabela; 80.000 por conta (provisionado) |
| DynamoDB: Query/Scan | resultado limitado a **1 MB** por chamada |
| DynamoDB: transação | até **100** itens e **4 MB** |
| DynamoDB: Batch | `BatchGetItem` **100** itens / 16 MB · `BatchWriteItem` **25** itens / 16 MB |
| DynamoDB: PITR | **1 a 35 dias**; restaura **sempre para uma tabela nova**; `LatestRestorableDateTime` ≈ **5 min** atrás |
| DynamoDB Streams | registros vivem **24 horas** |
| DAX: TTL do item cache | **5 minutos** por padrão |
| RDS Proxy | **20** proxies por conta; **200** secrets por proxy; reduz tempo de failover *"by up to 66%"* para Aurora Multi-AZ |

## 7. Mensageria

| Item | Valor |
|---|---|
| SQS: retenção | padrão **4 dias**; faixa **60 s a 14 dias** |
| SQS: visibility timeout | padrão **30 s**; máximo **12 horas** (contados do primeiro recebimento) |
| SQS: long polling | máximo **20 s** de espera |
| SQS: delay | **0 s** padrão, máximo **15 minutos** |
| SQS: tamanho de mensagem | **1 MiB (1.048.576 bytes)** pela página de quotas atual. ⚠️ Material antigo diz 256 KB — veja a armadilha abaixo |
| SQS: batch | **10** mensagens |
| SQS: in-flight (standard) | ~**120.000** mensagens |
| SQS FIFO: throughput | **300 TPS** por ação de API, ou **3.000 msg/s com batch de 10**. Modo high-throughput: muito mais (varia por região) |
| SNS: tamanho de mensagem | **262.144 bytes (256 KiB)** |
| SNS: retry para SQS/Lambda | até **100.015** tentativas, ao longo de **23 dias** |
| SNS: retry para SMS/push/e-mail | **50** tentativas em **6 horas** |
| Kinesis Data Streams: escrita | **1 MB/s ou 1.000 registros/s por shard** |
| Kinesis Data Streams: leitura | **2 MB/s ou 2.000 registros/s por shard**; **5** chamadas `GetRecords`/s |
| Kinesis: registro máximo | **1 MiB** (o limite documentado de PutRecord é 10 MiB por requisição com múltiplos registros) |
| Kinesis: retenção | mínimo **24 h**, máximo **8.760 h (365 dias)** |
| Kinesis: enhanced fan-out | **2 MB/s por consumidor por shard**, até **20** consumidores registrados; latência média **~70 ms** (vs ~200 ms com 1 consumidor compartilhado e ~1.000 ms com 5) |
| Firehose: buffer para S3 | **1-128 MB** (padrão **5 MB**) e **0-900 s** (padrão **300 s**); `0` = entrega em segundos |
| Firehose: registro máximo | **1.000 KB** |
| Step Functions Standard | até **1 ano**; **exactly-once**; 2.000 execuções/s; histórico **90 dias** |
| Step Functions Express | até **5 minutos**; **at-least-once** (assíncrono) / at-most-once (síncrono); 100.000 execuções/s |

> [!warning] A pegadinha do tamanho da mensagem SQS
> A página de quotas atual da AWS diz **1 MiB**. Simulados e cursos escritos antes da mudança dizem **256 KB**. Se a questão oferecer as duas, prefira o que o enunciado sugerir; se for pergunta direta, **1 MiB** é o valor oficial hoje.
> O que **não** mudou: para payload acima do limite, use a **Extended Client Library** com S3 (até **2 GB**) — e ela só existe para **Java**.

## 8. Lambda e containers

| Item | Valor |
|---|---|
| Memória | **128 MB a 10.240 MB**, em passos de 1 MB. **1.769 MB ≈ 1 vCPU** |
| Timeout | **900 s (15 min)** |
| `/tmp` | **512 MB a 10.240 MB** |
| Pacote .zip | **50 MB** compactado · **250 MB** descompactado (inclui layers) · imagem de container **10 GB** |
| Payload | síncrono **6 MB** request e response · assíncrono **1 MB** · response streaming **200 MB** |
| Layers | **5** por função |
| Concorrência padrão | **1.000** execuções simultâneas por região (ajustável) |
| Escala | **1.000** novos ambientes a cada **10 s**, por função |
| Variáveis de ambiente | **4 KB** no total |
| API Gateway: throttle padrão | **10.000** requisições/s |

> [!tip] Reserved × Provisioned concurrency
> **Reserved**: define o **teto e o piso** de concorrência da função. **Sem custo adicional.** Serve para garantir cota e para **estrangular** (reserved = 0 desliga a função).
> **Provisioned**: ambientes **pré-inicializados**, resposta em "double-digit millisecond". **Tem custo adicional.** Serve contra cold start.

## 9. Segurança

| Item | Valor |
|---|---|
| KMS `Encrypt`: tamanho máximo do plaintext | **4.096 bytes**. Acima disso: `GenerateDataKey` (envelope encryption) |
| KMS: rotação automática | padrão **365 dias**; só em chaves **simétricas** com material gerado pela KMS (`AWS_KMS`) |
| KMS: AWS managed keys | rotação **obrigatória, anual**, não desligável; alias `aws/<serviço>` |
| CloudHSM | **single-tenant**, FIPS 140-2 / 140-3 **nível 3** |
| Parameter Store | Standard **10.000** parâmetros, valor **4 KB**, **grátis** · Advanced **100.000**, **8 KB**, **cobrado** |
| Parameter Store: versões | guarda as **100** versões mais recentes |
| NACL vs SG | NACL **stateless**, regras allow **e deny**, avaliadas por número. SG **stateful**, **só allow**, todas as regras avaliadas juntas |
| Shield Advanced | assinatura cobre custos padrão do WAF até **1.500 WCUs** e **50 bilhões** de requisições/mês |
| CloudTrail: event history grátis | **90 dias** de management events |
| Compute Optimizer: janela de análise | **14 dias** (93 dias com enhanced infrastructure metrics) |

## 10. CloudFront

| Item | Valor |
|---|---|
| TTL padrão | **24 horas** (mínimo 0 s, sem máximo) |
| Certificado ACM | **obrigatoriamente em us-east-1 (N. Virginia)** para HTTPS viewer↔CloudFront |
| Origin group | **2** origens (primária + secundária) |
| Status que disparam failover | 400, 403, 404, 416, 429, 500, 502, 503, 504 — e só para `GET`, `HEAD`, `OPTIONS` |
| Timeouts da origem | conexão **10 s** (1-10), tentativas **3** (1-3), resposta **30 s** (1-120) |
| Geo restriction | bloqueio por **país**; devolve **403**; precisão declarada **99,8%** |
| CloudFront Functions | JavaScript · **viewer request/response** só · **submilissegundo** · **2 MB** memória · **10 KB** de código · **sem** acesso a rede nem ao body |
| Lambda@Edge | Node.js e Python · **4** triggers · até **30 s** · até **10 GB** (origin) · **com** acesso a rede e ao body |

## 11. Custo

| Item | Valor |
|---|---|
| Cost Explorer: histórico | **13 meses** |
| Cost Explorer: forecast | **18 meses** |
| Cost Explorer: atualização | pelo menos a cada **24 h**; chamada de API custa **US$ 0,01** |
| Budgets: tipos | **6** (cost, usage, RI utilization, RI coverage, SP utilization, SP coverage) |
| Budgets: atualização | até **3x por dia** |
| CUR: granularidade | **hora, dia ou mês**; CSV num bucket S3 seu; atualizado **≥ 1x/dia** |
| Athena | o exemplo oficial de preço usa **US$ 5 por TB escaneado** |
| Organizations | **sem custo adicional** |
| AWS RAM | **sem custo adicional** |

---

## ⚠️ Armadilhas numéricas

| Parece | É |
|---|---|
| Subnet reserva 2 IPs (rede e broadcast) | **5.** A AWS reserva 4 no começo e 1 no fim. |
| Glacier Deep Archive tem restore Expedited | **Não existe.** Só Standard (até 12 h) e Bulk (até 48 h). |
| Standard-IA tem 1 AZ | **Não.** Standard-IA tem ≥ 3 AZs. **One Zone-IA** é que tem 1. |
| Glacier Instant Retrieval precisa de restore | **Não.** É `GET` direto em milissegundos. Só Flexible e Deep Archive precisam de `RestoreObject`. |
| Multi-AZ do RDS serve para escalar leitura | **Não.** O standby do Multi-AZ *instance* **não aceita leitura**. Para ler, use read replica (ou Multi-AZ **DB cluster**, cujos 2 readers leem). |
| Read replica é síncrona | **Assíncrona.** O síncrono é o standby do Multi-AZ. |
| Aurora tem 3 cópias | **6 cópias, em 3 AZs.** |
| Gateway endpoint custa dinheiro | **Não.** *"There is no additional charge for using gateway endpoints."* Interface endpoint (PrivateLink) é que é cobrado. |
| DynamoDB: 1 RCU = 1 leitura | 1 RCU = **1 leitura forte** de até 4 KB **ou 2 leituras eventuais**. O padrão da API é **eventual**. |
| Posso adicionar LSI depois | **Não.** LSI só na criação da tabela. **GSI** pode ser adicionado e removido depois. |
| Spot avisa 5 minutos antes | **2 minutos.** |
| Lambda roda até 5 minutos | **15 minutos (900 s).** O limite de 5 min é o do Step Functions **Express**. |

## Links

- [[01 - Palavras-chave (decoder de enunciado)]]
- [[03 - Pegadinhas mestre]]
