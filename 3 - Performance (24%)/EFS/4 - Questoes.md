---
tags: [saa-c03, efs, questoes]
servico: Amazon EFS
atualizado: 2026-11-08
---

# EFS — Questões

> [!question]- Q1. Dez instâncias EC2 Linux precisam ler e gravar no mesmo diretório, com crescimento imprevisível.
> **A)** EBS gp3 com Multi-Attach
> **B)** **Amazon EFS** ✅
> **C)** S3 montado via FUSE
> **D)** FSx for Windows File Server
>
> **Por que B**: NFS compartilhado, elástico e multi-AZ.
> **A errada**: **gp3 não suporta Multi-Attach**, e Multi-Attach não é file system compartilhado.
> **C errada**: S3 não é POSIX; FUSE tem semântica e performance ruins para escrita concorrente.
> **D errada**: SMB/Windows; os clientes são Linux.

> [!question]- Q2. Um file system EFS de 50 GiB em modo Bursting fica lento depois de alguns minutos de carga intensa.
> **A)** Mudar para Max I/O
> **B)** **Mudar para Elastic (ou Provisioned), porque o baseline do Bursting é proporcional ao tamanho armazenado** ✅
> **C)** Aumentar o número de clientes
> **D)** Mudar para One Zone
>
> **Por que B**: o baseline do Bursting é **50 MiBps por TiB** — 50 GiB dá um baseline minúsculo, e os créditos esgotam.
> **A errada**: Max I/O aumenta throughput agregado mas **piora a latência** por operação — e não é suportado com Elastic.

> [!question]- Q3. A carga tem picos curtos e fica quase ociosa o resto do tempo (relação média/pico de ~2%).
> **A)** Provisioned
> **B)** **Elastic** ✅
> **C)** Bursting
> **D)** Max I/O
>
> **Por que B**: o critério oficial é *"average-to-peak ratio of 5% or less"* → **Elastic**.
> **A errada**: Provisioned é para *"5% or more"* (carga constante) e você pagaria o pico 24 h.

> [!question]- Q4. Um file system One Zone precisa de Max I/O para mais throughput agregado.
> **A)** Habilitar Max I/O nas configurações
> **B)** **Não é possível: One Zone usa sempre General Purpose, e Max I/O não é suportado em One Zone nem com Elastic** ✅
> **C)** Migrar para Provisioned primeiro
> **D)** Criar um segundo mount target
>
> **Por que B**: *"One Zone file systems always use the General Purpose performance mode"* e Max I/O é *"not supported for One Zone file systems or file systems that use Elastic throughput"*.

> [!question]- Q5. As instâncias não conseguem montar o EFS.
> **A)** Falta um Elastic IP
> **B)** **O security group do mount target não libera NFS (porta 2049) a partir do SG dos clientes** ✅
> **C)** Falta habilitar Max I/O
> **D)** Falta um gateway endpoint
>
> **Por que B**: é o erro de configuração mais comum — o mount target tem ENI com security group próprio.

> [!question]- Q6. Reduzir o custo de um EFS com 8 TiB, dos quais 90% não são acessados há meses.
> **A)** Mudar para One Zone
> **B)** **Habilitar lifecycle management para mover para EFS IA e Archive** ✅
> **C)** Mudar para Bursting
> **D)** Reduzir o número de mount targets
>
> **Por que B**: o lifecycle move arquivos frios para classes muito mais baratas automaticamente.
> **A errada**: reduz o preço por GB, mas abandona a resiliência multi-AZ de todo o file system.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| EFS serve para Windows | É **NFS/Linux**. Windows = **FSx for Windows** |
| EFS One Zone suporta Elastic | **Não.** One Zone usa sempre General Purpose |
| Max I/O é sempre melhor | Mais throughput agregado, **pior latência** por operação — e é geração anterior |
| Bursting é bom para FS pequeno | Baseline é **por TiB armazenado** |
| Dá para voltar de Provisioned na hora | **24 horas** de espera |
| EFS cobra IOPS | Cobra **throughput** (requisição conta como 4 KB ou o tamanho real, o maior) |
| EFS substitui o EBS | EBS é **bloco** para uma instância; EFS é **arquivo** compartilhado |
| EFS tem a latência do EBS | ~1 ms leitura (Standard); IA e Archive em **dezenas de ms** |

## Links

- [[3 - Performance (24%)/EFS/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/EFS/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/EFS/3 - Detalhes|3 - Detalhes]]
