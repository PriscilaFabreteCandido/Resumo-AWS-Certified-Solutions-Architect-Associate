---
tags: [saa-c03, glacier, detalhes]
servico: S3 Glacier
atualizado: 2026-11-08
---

# S3 Glacier — Detalhes

## 1. As três classes, e por que existem três

**Glacier Instant Retrieval** é o "arquivo quente": custo de arquivamento, mas acesso em **milissegundos**, sem restore. A doc: *"Data in this storage class is available for real-time access."*
Caso de uso: imagens médicas, mídia, backups que podem ser requisitados a qualquer momento mas raramente são.

**Glacier Flexible Retrieval** troca latência por preço: precisa de `RestoreObject` e entrega em **minutos a horas**. Mas oferece **Expedited (1-5 min)** quando você precisa de pressa, e **Bulk grátis** quando não.
Caso de uso: backup de longo prazo, arquivos de conformidade acessados algumas vezes por ano.

**Glacier Deep Archive** é o mais barato: **180 dias** de mínimo e restore em **horas** (12 h no Standard, 48 h no Bulk). **Não tem Expedited.**
Caso de uso: retenção regulatória de 7 a 10 anos, substituição de fita magnética.

## 2. Restore — o mecanismo

Para Flexible Retrieval e Deep Archive, o objeto **não está disponível** para `GET`. Você chama `RestoreObject` com um **`Tier`** e um número de dias; o S3 cria uma **cópia temporária** acessível por aquele período. O objeto original permanece na classe de arquivo.

Isso tem duas implicações de prova:

1. **Você paga a cópia temporária** pelo tempo que ela existir, além da taxa de retrieval.
2. **A aplicação precisa lidar com a espera** — não é um `GET` que demora, é um fluxo assíncrono (requisita, espera notificação, lê).

O **Standard** é o tier padrão quando você não especifica.

## 3. Provisioned capacity — quando garantir o Expedited

O Expedited pode ser **recusado** em períodos de alta demanda: *"Expedited retrievals might not be accepted during periods of high demand."*

Para garantir, você compra **provisioned capacity**, e cada unidade garante *"at least three Expedited retrievals can be performed every 5 minutes"* com até **300 MB/s**.

⚠️ Detalhe fino: aplica-se **só ao Glacier Flexible Retrieval** (porque Deep Archive não tem Expedited). E as unidades pertencem à **conta do requisitante**: *"the requester... should purchase the provisioned capacity unit, not the bucket owner"* — relevante em bucket com **Requester Pays**.

## 4. O overhead de 40 KB

Para Flexible Retrieval e Deep Archive, cada objeto arquivado carrega **40 KB** de metadado: **32 KB** cobrados na taxa do Glacier (índice e metadado) e **8 KB** na taxa do **S3 Standard** (nome e metadado).

Consequência prática: arquivar **objetos pequenos** pode custar mais em overhead que em dado. A resposta de arquitetura é **agregar** (empacotar muitos arquivos pequenos em poucos grandes) antes de arquivar.

## 5. Lifecycle e os mínimos

Os mínimos de armazenamento são cobrados **integralmente** mesmo se você apagar antes:

| Classe | Mínimo |
|---|---|
| Glacier Instant Retrieval | **90 dias** |
| Glacier Flexible Retrieval | **90 dias** |
| Glacier Deep Archive | **180 dias** |

E a regra de transição: *"You can't create a single Lifecycle rule that transitions objects from one storage class to another before the minimum storage duration period has passed."* (não é possível criar uma única regra de lifecycle que transicione objetos de uma classe para outra antes de cumprido o período mínimo de armazenamento) O exemplo da doc: objeto que foi para Glacier IR no dia 4 só pode ir para Deep Archive no dia **94**.

A cascata também é restrita: *"Objects that are stored in the S3 Glacier Flexible Retrieval storage class can only be transitioned to the S3 Glacier Deep Archive storage class"*, e de Deep Archive **não sai** por lifecycle.

## 6. Escala de recuperação

| Item | Valor |
|---|---|
| Taxa de requisição | **1.000 transações/s** |
| Throughput por conta | *"up to 1–2 petabytes per day per customer account"* |
| Objetos > 5 TB | até **300 MB/s** |
| Exemplo oficial | *"a 50-terabyte S3 Glacier Flexible Retrieval object could take up to 48 hours"* |

Para restaurar **muitos** objetos de uma vez, use **S3 Batch Operations** com uma operação de restore — e note que o Standard com Batch Operations aparece na tabela como *"Minutes–5 hours"*.

## 7. Conformidade

Para retenção regulatória, combine a classe de arquivo com:

- **S3 Object Lock** em modo **Compliance** (nem o root apaga) + **versionamento**
- Bucket em **outra conta** (isolamento)
- **AWS Backup** com **Vault Lock** se o dado vier de outros serviços

A classe de armazenamento é **custo**; a imutabilidade é **Object Lock**. Confundir as duas é armadilha.

## Links

- [[3 - Performance (24%)/S3 Glacier/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/S3 Glacier/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/S3 Glacier/4 - Questoes|4 - Questoes]]
- [[3 - Performance (24%)/S3/1 - O que e|S3]] · [[3 - Performance (24%)/S3/2 - Decorar|S3 - protecao de dados]] · [[3 - Performance (24%)/S3/2 - Decorar|S3 - classes e lifecycle]] · [[1 - Seguranca (30%)/AWS Backup/1 - O que e|AWS Backup]]
