---
tags: [saa-c03, storage, questoes]
conceito: Tipos de armazenamento (objeto, arquivo, bloco)
atualizado: 2026-11-08
---

# Tipos de armazenamento — Questões

> [!question] Q1. Uma frota de 40 instâncias Linux precisa **ler e escrever os mesmos arquivos**, com semântica POSIX.
> **A)** Um volume EBS gp3 compartilhado
> **B)** Amazon EFS
> **C)** S3 com Mountpoint
> **D)** FSx for Windows File Server
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é armazenamento de **arquivo**, NFS, regional, montável por milhares de clientes.
> > **A errada**: EBS é **bloco e zonal** — anexa a uma instância (Multi-Attach chega a 16, **na mesma AZ**, e exige filesystem com suporte a cluster).
> > **C errada**: Mountpoint é otimizado para **leitura** sequencial; não dá semântica POSIX completa de escrita concorrente.
> > **D errada**: SMB/Windows.

> [!question] Q2. Aplicação precisa do **maior IOPS possível** para um cache temporário que pode ser reconstruído.
> **A)** io2 Block Express
> **B)** Instance store
> **C)** gp3 com 16.000 IOPS
> **D)** EFS com throughput provisionado
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: disco **físico** da máquina hospedeira — o menor caminho possível. O enunciado diz **temporário e reconstruível**, que é exatamente o perfil dele.
> > **A errada**: entrega muito IOPS, mas é desnecessário (e caro) quando o dado é descartável.

> [!question] Q3. Um file share **Windows** com autenticação no **Active Directory** e ACLs NTFS.
> **A)** EFS
> **B)** FSx for Windows File Server
> **C)** FSx for Lustre
> **D)** S3 File Gateway
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: SMB nativo + integração com AD + ACLs NTFS.
> > **A errada**: EFS é **NFS**, para Linux.

> [!question] Q4. Cluster de HPC precisa processar um dataset que **já está no S3**, com latência de sub-milissegundo.
> **A)** EFS com Elastic Throughput
> **B)** Copiar para EBS io2 em cada nó
> **C)** FSx for Lustre vinculado ao bucket S3
> **D)** Ler direto do S3 com Mountpoint
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: Lustre é o filesystem de HPC da AWS e **integra com o S3** — apresenta os objetos como arquivos e grava os resultados de volta.
> > **B errada**: cada nó teria sua cópia, sem compartilhamento.

> [!question] Q5. Uma instância EC2 foi terminada, mas a fatura do EBS continua.
> **A)** Erro de cobrança
> **B)** O volume não tinha "delete on termination" e continua provisionado — EBS cobra por GB provisionado, mesmo desanexado
> **C)** Snapshots automáticos
> **D)** EBS cobra 30 dias mínimos
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: EBS cobra **capacidade provisionada**, independentemente de uso ou de estar anexado. Volumes órfãos são um achado clássico do **Trusted Advisor** e do **Cost Explorer**.

> [!question] Q6. Milhões de arquivos de **50 KB** cada, acessados raramente. O time quer o menor custo.
> **A)** S3 Standard-IA
> **B)** S3 One Zone-IA
> **C)** Avaliar: com objetos de 50 KB, as classes IA cobram o mínimo de 128 KB por objeto — S3 Standard (ou agregar os arquivos) pode sair mais barato
> **D)** Glacier Deep Archive
>
> > [!success]- Resposta
> > **Resposta: C**
> >
> > **Por que C**: as classes infrequentes cobram por **no mínimo 128 KB** por objeto e por um **mínimo de dias** (30 em Standard-IA e One Zone-IA). Para objetos de 50 KB você pagaria por 128 KB.
> > **D errada**: além dos mínimos (180 dias), a recuperação leva horas.

> [!question] Q7. Um servidor on-premises deve continuar gravando por **NFS**, mas os dados precisam ficar no S3.
> **A)** Montar o bucket com Mountpoint no servidor
> **B)** S3 File Gateway (Storage Gateway)
> **C)** DataSync
> **D)** Direct Connect + EFS
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: o File Gateway expõe **NFS/SMB** localmente e grava como **objeto no S3**, com cache local.
> > **C errada**: DataSync **transfere** dados (one-off ou agendado); não é um share contínuo.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| EBS pode ser compartilhado entre AZs | **Zonal**; Multi-Attach = até **16** instâncias, **mesma AZ** |
| "Maior IOPS" é sempre io2 | Se o dado é **temporário/descartável** → **instance store** |
| S3 serve como disco de banco de dados | Sem escrita parcial, latência de API — use **EBS** |
| EFS serve para Windows/SMB | EFS é **NFS**; Windows → **FSx for Windows** |
| Classe fria é sempre mais barata | Mínimo de **128 KB** por objeto e de **30/90/180 dias** pode inverter a conta |
| Instance store persiste | Some ao **parar/hibernar/terminar** (reboot preserva) |
| EBS só cobra quando usado | Cobra por **GB provisionado**, mesmo desanexado |
| One Zone-IA tem a mesma resiliência | Fica em **uma AZ** — disponibilidade **99,5%** |
| DataSync e Storage Gateway são a mesma coisa | DataSync **transfere**; Gateway dá **acesso contínuo** por protocolo local |

## Links

- [[9 - Fundamentos e apoio/Tipos de armazenamento (objeto, arquivo, bloco)/1 - O que e|1 - O que e]] · [[9 - Fundamentos e apoio/Tipos de armazenamento (objeto, arquivo, bloco)/2 - Decorar|2 - Decorar]] · [[9 - Fundamentos e apoio/Tipos de armazenamento (objeto, arquivo, bloco)/3 - Detalhes|3 - Detalhes]]
