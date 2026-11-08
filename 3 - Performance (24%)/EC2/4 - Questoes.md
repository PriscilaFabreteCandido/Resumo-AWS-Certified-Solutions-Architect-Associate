---
tags: [saa-c03, ec2, questoes]
servico: Amazon EC2
atualizado: 2026-11-08
---

# Amazon EC2 — Questões

> [!question]- Q1. Carga de produção 24/7 em m6i. O time ainda não decidiu se migra para Graviton nem para outra região. Qual compra?
> **A)** Reserved Instances Standard de 3 anos
> **B)** **Compute Savings Plans** ✅
> **C)** EC2 Instance Savings Plans
> **D)** Spot com capacity rebalancing
>
> **Por que B**: aplica-se *"regardless of instance family, instance size, OS, tenancy, or AWS Region"* e cobre Fargate e Lambda. É a opção que sobrevive à indecisão.
> **A errada**: Standard RI *"can't be exchanged"* e amarra tipo e região por 3 anos.
> **C errada**: amarra **família e região** — exatamente o que está em aberto.
> **D errada**: produção 24/7 não tolera interrupção.

> [!question]- Q2. Pipeline de renderização: milhares de frames independentes, pode reiniciar um frame perdido, custo é prioridade.
> **A)** On-Demand com Auto Scaling
> **B)** **Spot via EC2 Fleet com `price capacity optimized` e capacity rebalancing** ✅
> **C)** Reserved Instances de 1 ano
> **D)** Spot Fleet com `lowest price`
>
> **Por que B**: trabalho idempotente e reiniciável é o caso de uso do Spot; *price capacity optimized* é a estratégia **recomendada**.
> **A errada**: paga preço cheio sem necessidade.
> **C errada**: compromisso de 1 ano para carga variável.
> **D errada**: `lowest-price` está marcada *"(not recommended)"* e *"has the highest risk of interruption"* — é o default da CLI, por isso aparece tanto.

> [!question]- Q3. Aplicação legada licenciada **por socket físico**. Como rodar na AWS atendendo o licenciamento?
> **A)** Dedicated Instances
> **B)** **Dedicated Hosts, integrados ao AWS License Manager** ✅
> **C)** Reserved Instances com tenancy dedicada
> **D)** EC2 em cluster placement group
>
> **Por que B**: só o Dedicated Host expõe sockets e cores e permite *"bring your existing per-socket, per-core, or per-VM software licenses"*.
> **A e C erradas**: dão hardware single-tenant, mas **sem** visibilidade de socket.
> **D errada**: placement group é topologia de rede — e Dedicated Hosts nem podem entrar em um.

> [!question]- Q4. Simulação HPC com MPI, 40 nós, menor latência possível entre eles.
> **A)** Spread placement group em 3 AZs
> **B)** **Cluster placement group numa AZ, mesmo tipo de instância, com EFA** ✅
> **C)** Partition placement group
> **D)** Instâncias em AZs diferentes atrás de um NLB
>
> **Por que B**: cluster *"packs instances close together inside an Availability Zone"*, com 10 Gbps de fluxo único; EFA é o adaptador para MPI.
> **A errada**: spread **distribui** (o oposto) e limita a 7 por AZ.
> **C errada**: partition separa em racks — serve para dado distribuído, não para latência mínima.
> **D errada**: tráfego entre AZs adiciona latência; NLB não participa de comunicação MPI.

> [!question]- Q5. Cluster Cassandra de 12 nós: a falha de um rack não pode derrubar mais que uma fração dos nós.
> **A)** Cluster
> **B)** Spread
> **C)** **Partition** ✅
> **D)** Nenhum; basta distribuir em 3 AZs
>
> **Por que C**: partition é a estratégia desenhada para *"HDFS, HBase, Cassandra, Kafka, Hadoop"* — cada partição tem racks próprios.
> **A errada**: concentra no mesmo bloco de hardware.
> **B errada**: garante hardware distinto por instância, mas o teto de 7 por AZ e a falta de noção de grupo de réplicas não casam com o Cassandra.
> **D errada**: ajuda, mas sem noção de rack dentro da AZ.

> [!question]- Q6. Uma aplicação em t3.medium fica lenta após ~20 minutos de carga constante. O que corrigir?
> **A)** Aumentar o volume EBS
> **B)** **Migrar para uma família não-burstable (M ou C) dimensionada para a carga sustentada** ✅
> **C)** Habilitar enhanced networking
> **D)** Mudar para instance store
>
> **Por que B**: a família T é burstable — esgota créditos de CPU sob carga constante acima do baseline.
> **A errada**: o gargalo é CPU, não disco.
> **C errada**: enhanced networking afeta rede.
> **D errada**: afeta I/O local.
> ⚠️ Alternativa paliativa real: ligar o modo *unlimited* do T — mas aí você paga o excedente, e a prova prefere a família correta.

> [!question]- Q7. Processamento de vídeo precisa de disco local de altíssimo IOPS para arquivos temporários.
> **A)** EBS io2 Block Express
> **B)** **Instance store NVMe** ✅
> **C)** EFS com throughput Provisioned
> **D)** EBS gp3 com 16.000 IOPS
>
> **Por que B**: dado **temporário** com IOPS máximo é o caso do instance store — anexado ao host, sem latência de rede e sem custo de volume.
> **A errada**: IOPS alto, mas é volume de rede pago; desnecessário para scratch.
> **C errada**: EFS é compartilhado via rede, latência maior.
> **D errada**: menos IOPS e custo de volume para dado descartável.

> [!question]- Q8. Auditoria exige acabar com bastion hosts e chaves SSH, com registro das sessões administrativas em instâncias privadas sem internet.
> **A)** NAT gateway + SSH com chave rotacionada por Lambda
> **B)** **SSM Session Manager com interface endpoints do Systems Manager na VPC e log em S3/CloudWatch Logs** ✅
> **C)** EC2 Instance Connect
> **D)** VPN cliente para a subnet privada
>
> **Por que B**: resolve os três requisitos — sem porta aberta, sem chave, com log. Os endpoints evitam depender de internet.
> **A errada**: mantém porta 22, chave e NAT.
> **C errada**: Instance Connect ainda usa SSH na 22.
> **D errada**: dá rede, mas não elimina SSH, chave nem bastion.

## ⚠️ Armadilhas do EC2

| Parece | É |
|---|---|
| Spot avisa 5 minutos antes | **2 minutos** |
| Savings Plans cobre Spot | *"Spot Instances are not covered by Savings Plans"* |
| Savings Plans tem 3 tipos | **Quatro** (Compute, Database, EC2 Instance, SageMaker AI) |
| Compute SP dá o maior desconto | **EC2 Instance SP** chega a 72%; Compute vai a 66% com mais flexibilidade |
| RI reserva capacidade | Só a **zonal** |
| RI pode ser cancelada | **Não.** Standard: modificar ou vender. Convertible: trocar |
| Convertible dá mais desconto | Dá **menos**, em troca de flexibilidade |
| `lowest-price` é a melhor estratégia de Spot | Marcada **"(not recommended)"** |
| Dedicated Host = Dedicated Instance | Host = licença por socket/core e controle do hardware |
| Instance store sobrevive ao stop | **Não.** Efêmero |
| Família T serve para carga constante | Esgota créditos. Use **M** ou **C** |
| Qualquer instância atinge o IOPS provisionado | Instâncias **não-Nitro** chegam a **32.000** |
| Cluster placement group é multi-AZ | **Uma AZ só** |
| Spread aceita quantas instâncias eu quiser | **7 por AZ** |
| Placement group é cobrado | **Grátis** |
| Dedicated Host pode entrar em placement group | **Não pode** |
| Hibernação é grátis | Continua pagando o **EBS** |
| SG e NACL protegem o IMDS | **Não filtram** o IMDS. Use **IMDSv2** |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
- [[03 - Pegadinhas mestre]]
