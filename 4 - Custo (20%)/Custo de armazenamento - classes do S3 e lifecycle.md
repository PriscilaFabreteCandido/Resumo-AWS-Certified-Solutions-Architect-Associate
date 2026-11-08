---
tags: [saa-c03, dominio-4, s3, lifecycle, ebs, custo]
dominio: 4
tasks: [4.1]
atualizado: 2026-11-08
---

# Custo de armazenamento — classes do S3, lifecycle e EBS

## 🧩 Em 30 segundos

- Escolher a classe pelo **padrão de acesso**: conhecido → classe fixa. Desconhecido/variável → **Intelligent-Tiering**.
- **Lifecycle** é cascata, só de quente para frio, e respeita os mínimos (**30 / 90 / 180 dias**).
- Objeto **< 128 KB** não transiciona por padrão, e em IA/Glacier IR é **cobrado como 128 KB**.
- **gp3 é mais barato que gp2** para a mesma performance (IOPS e throughput independentes do tamanho).
- Versionamento sem lifecycle de versões antigas é fonte silenciosa de custo: **cada versão é um objeto cobrado**.

## 🧠 Teste-se primeiro

> [!question]- Qual classe para cada padrão de acesso?
> **Mais de 1x/mês** → Standard
> **~1x/mês**, tolera taxa de retrieval → **Standard-IA**
> **~1x/mês, dado reproduzível** (pode perder) → **One Zone-IA** (1 AZ, ~20% mais barato que IA)
> **~1x/trimestre, precisa em milissegundos** → **Glacier Instant Retrieval**
> **~1x/ano, aceita minutos a horas** → **Glacier Flexible Retrieval**
> **menos de 1x/ano, aceita horas** → **Glacier Deep Archive**
> **padrão imprevisível** → **Intelligent-Tiering**

> [!question]- Quando Intelligent-Tiering NÃO é a escolha econômica?
> 1. Quando o padrão de acesso é **conhecido** — a taxa de monitoramento por objeto é desperdício.
> 2. Quando há **muitos objetos pequenos** — a taxa é **por objeto**, e objeto < 128 KB *"is not monitored and not eligible for auto-tiering"*, ficando sempre no Frequent Access.
> 3. Quando o dado já nasce frio e vai direto para arquivo.

> [!question]- As três armadilhas de custo do lifecycle
> 1. **Mínimo de dias**: apagar antes de 30 (IA), 90 (Glacier IR/FR) ou 180 (Deep Archive) **cobra o período inteiro**.
> 2. **Transição antecipada é inválida**: *"You can't create a single Lifecycle rule that transitions objects from one storage class to another before the minimum storage duration period has passed."* Glacier IR no dia 4 → Deep Archive só no dia **94**.
> 3. **Objeto pequeno**: *"Objects smaller than 128 KB will not transition by default to any storage class"* (desde set/2024), e **cada objeto transicionado é uma requisição cobrada** — mover milhões de objetos minúsculos pode custar mais que a economia.

> [!question]- Qual o overhead de armazenamento do Glacier Flexible Retrieval e do Deep Archive?
> **40 KB por objeto**: **32 KB** cobrados na taxa do Glacier (índice e metadado) + **8 KB** na taxa do **S3 Standard** (nome e metadado).
> É por isso que arquivar milhões de objetos pequenos no Deep Archive pode não compensar — o overhead passa do tamanho do dado.

## Lifecycle — caminhos permitidos

```
Standard ──┬─> Standard-IA ──┬─> Intelligent-Tiering
           │                  ├─> One Zone-IA
           ├─> Intelligent-   ├─> Glacier Instant Retrieval
           │   Tiering        ├─> Glacier Flexible Retrieval
           ├─> One Zone-IA    └─> Glacier Deep Archive
           ├─> Glacier IR ──> Glacier FR / Deep Archive
           ├─> Glacier FR ──> Deep Archive (e SÓ Deep Archive)
           └─> Deep Archive ──> (saída: nenhuma)
```

- *"Objects that are stored in the S3 Glacier Flexible Retrieval storage class can only be transitioned to the S3 Glacier Deep Archive storage class."*
- *"You cannot use an S3 Lifecycle configuration rule to convert the storage class of an object from S3 Glacier Deep Archive to any other storage class."*
- A cobrança da classe de destino começa **quando a regra é satisfeita**, não quando a movimentação física acontece (exceção: Intelligent-Tiering).

## Ações de lifecycle que economizam e são esquecidas

| Ação | O que evita |
|---|---|
| `AbortIncompleteMultipartUpload` | Uploads multipart inacabados **continuam sendo cobrados** até serem completados ou abortados |
| `NoncurrentVersionTransition` / `NoncurrentVersionExpiration` | Versões antigas acumulando como objetos completos |
| `ExpiredObjectDeleteMarker` | Delete markers órfãos |
| `Expiration` | Dado que simplesmente não precisa mais existir |

> [!warning] A regra que todo bucket deveria ter
> `AbortIncompleteMultipartUpload` depois de 7 dias. A própria doc recomenda: uploads incompletos *"are billed until completed or stopped"* e ficam invisíveis na listagem normal do bucket.

## Visibilidade

| Ferramenta | Para quê |
|---|---|
| **S3 Storage Class Analysis** | *"analyze storage access patterns to help you decide when to transition the right data to the right storage class"*. ⚠️ Recomenda **apenas Standard → Standard-IA**, precisa de **30 dias ou mais** de observação, até 1.000 filtros por bucket |
| **S3 Storage Lens** | Painel de uso e atividade em toda a organização, com recomendações |
| **Requester Pays** | *"the requester pays the cost of the request and the data download"*; dono paga o armazenamento. ⚠️ Proíbe acesso anônimo |

## Custo de EBS

| Decisão | Economia |
|---|---|
| **gp2 → gp3** | gp3 desacopla IOPS/throughput do tamanho: você para de superdimensionar o volume só para ganhar IOPS |
| **io1/io2 → gp3** | Se o workload cabe em 80.000 IOPS / 2.000 MiB/s, gp3 sai bem mais barato que Provisioned IOPS |
| **st1 / sc1** | HDD para throughput sequencial e dado frio — bem mais barato por GB que SSD. ⚠️ Não serve de boot volume |
| **Volumes órfãos** | Volume `available` (desanexado) continua cobrando |
| **Snapshots acumulados** | Incrementais, mas acumulam. Use **Data Lifecycle Manager** ou **AWS Backup** com retenção |
| **Rightsizing** | **Compute Optimizer** também recomenda para volumes EBS |

## Transferir dado para a AWS com o menor custo

O guia pede literalmente *"Determining the lowest cost method of transferring data for a workload to AWS storage"*:

| Volume e situação | Opção |
|---|---|
| GBs, link bom, contínuo/agendado | **DataSync** |
| Parceiro envia por SFTP/FTPS/FTP/AS2 | **Transfer Family** |
| On-premises precisa continuar vendo como arquivo | **Storage Gateway** |
| Dezenas de TB, link ruim ou caro | **Snow Family** ⚠️ (suporte encerra **31/12/2026**) |
| Upload global de muitos clientes, arquivos grandes | **S3 Transfer Acceleration** |
| Muitos arquivos pequenos | **Upload em lote** — o guia cita *"batch uploads to Amazon S3 compared with individual uploads"*: cada PUT é uma requisição cobrada |

## ❓ Questões de prova

> [!example]- Q1 — 500 TB de imagens médicas precisam ficar 10 anos. Acesso quase nulo, e quando ocorre pode esperar 24 horas. Qual a configuração mais econômica?
> **A)** Glacier Flexible Retrieval com retrieval Bulk
> **B)** **Glacier Deep Archive** ✅
> **C)** One Zone-IA
> **D)** Intelligent-Tiering com Deep Archive Access ativado
>
> **Por que B**: é a classe mais barata e o requisito de 24 h cabe folgado (Standard até 12 h, Bulk até 48 h). Mínimo de 180 dias não é problema para retenção de 10 anos.
> **A errada**: Flexible Retrieval custa mais que Deep Archive, e o requisito não precisa da velocidade.
> **C errada**: One Zone-IA é bem mais caro que arquivamento e tem 1 AZ — ruim para dado médico de retenção longa.
> **D errada**: adiciona taxa de monitoramento por objeto sem ganho, já que o padrão de acesso é **conhecido** (quase nulo).

> [!example]- Q2 — Um bucket com versionamento habilitado cresceu 4x em um ano, apesar de o volume de dados novos ser estável. Qual a causa e a correção?
> **A)** Falta compressão; habilitar compressão no S3
> **B)** **Versões antigas acumulando; criar regra de lifecycle com `NoncurrentVersionTransition` e `NoncurrentVersionExpiration`** ✅
> **C)** Replicação duplicando objetos
> **D)** Mudar para One Zone-IA
>
> **Por que B**: cada versão é cobrada como um objeto completo. O lifecycle de versões não atuais é o controle específico para isso.
> **A errada**: o S3 não comprime objetos.
> **C errada**: o enunciado não menciona replicação; e replicação iria para outro bucket.
> **D errada**: reduz o preço por GB mas não o **volume**, que é o problema — e One Zone-IA em bucket versionado de produção é risco.

> [!example]- Q3 — Uma regra de lifecycle move objetos para Glacier Instant Retrieval no dia 5 e para Deep Archive no dia 30. A configuração é rejeitada. Por quê?
> **A)** Glacier IR não aceita transição para Deep Archive
> **B)** **O mínimo de 90 dias do Glacier Instant Retrieval não foi respeitado; a transição para Deep Archive precisa ser no dia 95 ou depois** ✅
> **C)** Deep Archive exige versionamento
> **D)** Só é permitida uma transição por regra
>
> **Por que B**: regra literal da doc — não se pode transicionar antes do mínimo da classe atual. 5 + 90 = **95**.
> **A errada**: Glacier IR **pode** ir para Glacier FR e Deep Archive.
> **C errada**: não exige.
> **D errada**: múltiplas transições por regra são normais.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| One Zone-IA é só "IA mais barato" | É **1 AZ** |
| Intelligent-Tiering é sempre mais barato | Cobra monitoramento **por objeto**; objeto < 128 KB não é tierizado |
| Posso transicionar quando quiser | Respeita os mínimos de **30 / 90 / 180 dias** |
| Glacier FR vai para qualquer classe | **Só Deep Archive** |
| De Deep Archive dá para voltar por lifecycle | **Não dá** |
| Apagar antes do mínimo economiza | **Cobra o período inteiro** |
| Arquivar objeto pequeno no Deep Archive é sempre bom | **40 KB de overhead por objeto** (32 KB Glacier + 8 KB Standard) |
| Multipart incompleto não custa | **Custa** até ser completado ou abortado |
| Storage Class Analysis recomenda qualquer classe | Só **Standard → Standard-IA** |
| gp2 é mais barato que gp3 | **gp3 é mais barato** para a mesma performance |
| Volume desanexado não cobra | **Cobra** enquanto existir |
| Transfer Acceleration reduz custo | **Adiciona** custo de transferência |

## Links

- [[04 - Dominio 4 - Design Cost-Optimized Architectures (20%)]]
- [[Armazenamento - S3, EBS, EFS e FSx]]
- [[Migracao e hibrido - 7 Rs, Snow, DataSync, Storage Gateway e DMS]]
- [Considerações de transição de lifecycle](https://docs.aws.amazon.com/AmazonS3/latest/userguide/lifecycle-transition-general-considerations.html)
