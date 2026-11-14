---
tags: [saa-c03, ebs, questoes]
servico: Amazon EBS
atualizado: 2026-11-08
---

# EBS — Questões

> [!question]- Q1. Um banco em EC2 precisa de 100.000 IOPS sustentados e durabilidade de 99,999%.
> **A)** gp3 com IOPS máximo
> **B)** **io2 Block Express** ✅
> **C)** io1 com Multi-Attach
> **D)** Dois gp3 em RAID 0
>
> **Por que B**: chega a **256.000 IOPS**, **4.000 MiB/s**, e é o único com **99,999%** de durabilidade.
> **A errada**: gp3 para em **80.000 IOPS** e tem 99,8–99,9%.
> **C errada**: io1 para em **64.000 IOPS**; Multi-Attach não aumenta IOPS.
> **D errada**: RAID 0 soma IOPS mas **piora** a durabilidade — o oposto do requisito.
> ⚠️ Confirme que a instância é **Nitro**: as outras chegam a **32.000 IOPS**.

> [!question]- Q2. Dez instâncias Linux precisam ler e gravar no **mesmo diretório**.
> **A)** gp3 com Multi-Attach
> **B)** **Amazon EFS** ✅
> **C)** io2 com Multi-Attach
> **D)** S3 montado via FUSE
>
> **Por que B**: EFS é NFS compartilhado, elástico e multi-AZ.
> **A errada**: **gp3 não suporta Multi-Attach**.
> **C errada**: Multi-Attach dá disco **bruto** compartilhado — não é file system; exigiria GFS2/OCFS2 e é limitado a uma AZ.

> [!question]- Q3. Reduzir custo de 200 volumes gp2 de 1 TiB cada, usados a 150 GiB, sem perder performance.
> **A)** Reduzir o tamanho dos volumes para 200 GiB
> **B)** **Migrar para gp3 e provisionar IOPS/throughput independentemente do tamanho** ✅
> **C)** Migrar para sc1
> **D)** Migrar para io2
>
> **Por que B**: no gp2 o tamanho era inflado só para ganhar IOPS; no gp3 você desacopla e paga menos.
> **A errada**: em gp2, reduzir o tamanho **reduz os IOPS**.
> **C errada**: sc1 é HDD com 250 IOPS — mataria a performance.

> [!question]- Q4. Um processamento de log faz leitura **sequencial** de arquivos grandes, com o menor custo.
> **A)** gp3
> **B)** io2 Block Express
> **C)** **st1** ✅
> **D)** instance store
>
> **Por que C**: st1 entrega **500 MiB/s** com custo por GB muito menor que SSD, otimizado para sequencial.
> ⚠️ st1 **não** serve como boot volume.

> [!question]- Q5. Um snapshot criptografado foi compartilhado com outra conta, que não consegue restaurá-lo.
> **A)** Snapshot criptografado não pode ser compartilhado
> **B)** **A key policy da chave KMS não libera a conta destino (e a chave precisa ser customer managed)** ✅
> **C)** Falta copiar o snapshot para a região da outra conta
> **D)** Falta habilitar criptografia por padrão
>
> **Por que B**: key policy é exceção que *"must explicitly allow access for principals"*; e a **AWS managed key não é compartilhável**.

> [!question]- Q6. Depois de restaurar um volume de snapshot, a primeira leitura está lenta.
> **A)** O volume está com IOPS baixo
> **B)** **O restore faz lazy load: os blocos vêm do backing store na primeira leitura** ✅
> **C)** O snapshot está corrompido
> **D)** Falta pré-aquecer com dd
>
> **Por que B**: é comportamento esperado. Para eliminar, existe **Fast Snapshot Restore** (com custo).

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| gp3 suporta Multi-Attach | Só **io1 e io2** |
| Multi-Attach é file system compartilhado | É **disco bruto**; precisa de FS de cluster. Compartilhar arquivos = **EFS/FSx** |
| HDD serve de boot volume | **st1 e sc1 não** |
| EBS é replicado entre AZs | Volume é **zonal**; snapshot é **regional** |
| Restaurar snapshot é instantâneo | Blocos vêm **sob demanda** (lazy load) |
| Qualquer instância atinge o IOPS provisionado | Não-Nitro chega a **32.000** |
| Volume desanexado não cobra | **Cobra** enquanto existir |
| gp2 é mais barato que gp3 | **gp3 é mais barato** para a mesma performance |
| RAID 0 melhora a durabilidade | **Piora** (falha de um volume derruba o array) |
| Instance store é "EBS rápido" | É **efêmero**: perde no stop/hibernate/falha do host |

## Links

- [[3 - Performance (24%)/EBS/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/EBS/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/EBS/3 - Detalhes|3 - Detalhes]]
