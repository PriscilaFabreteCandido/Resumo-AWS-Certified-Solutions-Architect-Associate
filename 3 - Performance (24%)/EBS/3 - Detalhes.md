---
tags: [saa-c03, ebs, detalhes]
servico: Amazon EBS
atualizado: 2026-11-08
---

# EBS — Detalhes

## 1. gp3 × gp2 — por que gp3 é o padrão

No **gp2**, IOPS e throughput são **proporcionais ao tamanho** (3 IOPS por GiB). Para ter 9.000 IOPS você precisava de um volume de 3 TiB — mesmo que só usasse 200 GiB.

No **gp3**, IOPS (até **80.000**) e throughput (até **2.000 MiB/s**) são **provisionados independentemente** do tamanho. Você paga pelo tamanho que usa e pela performance que precisa.

Resultado: gp3 costuma ser **mais barato que gp2** para a mesma performance. "Migrar gp2 → gp3" é resposta recorrente de otimização de custo.

## 2. Quando ir para Provisioned IOPS

Só quando o gp3 não basta:

| Requisito | Tipo |
|---|---|
| > 80.000 IOPS ou > 2.000 MiB/s | **io2 Block Express** (256.000 IOPS, 4.000 MiB/s) |
| Durabilidade de **99,999%** | **io2 Block Express** (0,001% de falha anual, contra 0,1–0,2% dos outros) |
| **Multi-Attach** | **io1** ou **io2** |
| Latência sub-milissegundo garantida | io2 Block Express: *"under 500 microseconds for 16KiB I/O"* |

⚠️ E a armadilha do tipo de instância: *"Other instance types can be attached to volumes provisioned with up to 64,000 IOPS, but can achieve up to 32,000 IOPS."* Provisionar 100.000 IOPS numa instância antiga é pagar por algo que não se entrega.

## 3. HDD — st1 e sc1

**st1** (Throughput Optimized) entrega **500 MiB/s** com apenas **500 IOPS**: é otimizado para **leitura sequencial** de arquivos grandes. Casos: big data, data warehouse, processamento de log, EMR com HDFS.

**sc1** (Cold) é a opção mais barata por GB, para dado acessado raramente.

⚠️ Os dois **não podem ser boot volume**, e os dois têm IOPS baixíssimo — qualquer carga com acesso **aleatório** (banco de dados) vai mal neles.

## 4. Multi-Attach — e o que ele não é

**Multi-Attach** permite anexar **um** volume io1/io2 a **várias** instâncias **na mesma AZ**.

Mas atenção: **não é um sistema de arquivos compartilhado**. O volume aparece como disco bruto nas instâncias, e **duas instâncias escrevendo no mesmo bloco corrompem o dado** — a menos que você use um **file system de cluster** (GFS2, OCFS2) ou uma aplicação que coordene o acesso.

Se o enunciado quer "várias instâncias lendo e gravando nos mesmos arquivos", a resposta é **EFS** (Linux) ou **FSx** (Windows/Lustre), **não** Multi-Attach.

## 5. Snapshot — o que a prova explora

Snapshots são **incrementais**: só os blocos alterados desde o último são gravados. Mas cada snapshot é **autossuficiente** — apagar um snapshot antigo não invalida os novos.

**Escopo**: o **volume** é zonal; o **snapshot** é **regional**. Para DR entre regiões, você **copia** o snapshot (ou usa AWS Backup cross-Region).

**Restore é lazy load**: o volume fica disponível em segundos, mas os blocos são buscados do backing store na primeira leitura. Resultado: a primeira passada é mais lenta. (Existe *Fast Snapshot Restore* para eliminar isso, com custo.)

**Criptografia**: volume criptografado gera snapshot criptografado. Compartilhar snapshot criptografado com outra conta exige **customer managed key** e a **key policy** liberando a conta destino — a AWS managed key não é compartilhável.

## 6. Performance e custo

| Alavanca | Detalhe |
|---|---|
| **gp2 → gp3** | Mesma performance, custo menor |
| **io1/io2 → gp3** | Se cabe em 80.000 IOPS / 2.000 MiB/s |
| **SSD → st1/sc1** | Para throughput sequencial ou dado frio |
| **Volumes órfãos** | Volume `available` (desanexado) **continua cobrando** |
| **Snapshots acumulados** | Use **DLM** ou **AWS Backup** com retenção |
| **Rightsizing** | **Compute Optimizer** também recomenda para EBS |
| **RAID 0** | Soma IOPS, mas **piora** a durabilidade |
| **Instance store** | Grátis (vem com a instância) para scratch — mas **efêmero** |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[EC2]] · [[EFS]] · [[FSx]] · [[AWS Backup]] · [[KMS]] · [[Compute Optimizer]]
