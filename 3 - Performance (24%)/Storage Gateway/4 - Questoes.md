---
tags: [saa-c03, storage-gateway, questoes]
servico: AWS Storage Gateway
atualizado: 2026-11-08
---

# Storage Gateway — Questões

> [!question] Q1. Aplicações on-premises precisam continuar lendo e gravando num compartilhamento **SMB**, mas o dado deve ficar no S3 para análise com Athena.
> **A)** DataSync agendado a cada hora
> **B)** S3 File Gateway expondo SMB, com os objetos gravados no S3
> **C)** FSx for Windows File Server
> **D)** Volume Gateway em modo cached
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"store and retrieve objects in Amazon S3 using industry-standard file protocols"* (armazenar e recuperar objetos no Amazon S3 usando protocolos de arquivo padrão de mercado) — a aplicação vê SMB, o Athena vê objetos.
> > **A errada**: copia, mas o storage local continua sendo a fonte de verdade, com defasagem.
> > **C errada**: FSx guarda num file system, **não** como objeto no S3 — o Athena não consultaria.
> > **D errada**: Volume Gateway é **iSCSI** (bloco), não objeto consultável.

> [!question] Q2. Um servidor de backup grava em fitas LTO. A empresa quer eliminar as fitas **sem trocar o software**.
> **A)** S3 File Gateway
> **B)** Tape Gateway
> **C)** AWS Backup
> **D)** DataSync para o S3 Glacier
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: apresenta uma **biblioteca de fitas virtual** ao software existente.
> > **A errada**: expõe NFS/SMB, não fitas.
> > **C errada**: AWS Backup protege recursos **da AWS**.
> > **D errada**: move arquivos; o software continuaria esperando fitas.

> [!question] Q3. Reduzir o storage on-premises de 500 TB para alguns TB, mantendo as aplicações que usam **iSCSI**.
> **A)** Volume Gateway em modo cached
> **B)** Volume Gateway em modo stored
> **C)** S3 File Gateway
> **D)** FSx for ONTAP
>
> > [!success]- Resposta
> > **Resposta: A**
> >
> > **Por que A**: cached mantém o dado no S3 e só um **cache** local — é o modo que reduz hardware.
> > **B errada**: stored mantém **tudo** local; não reduz storage.
> > **C errada**: expõe arquivo, não **bloco iSCSI**.

> [!question] Q4. As aplicações precisam de **latência de disco local total**, mas a empresa quer backup offsite e capacidade de levantar na AWS em desastre.
> **A)** Volume Gateway cached
> **B)** Volume Gateway stored
> **C)** S3 File Gateway
> **D)** DataSync
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: *"store all your data locally. Then asynchronously back up point-in-time snapshots of this data to Amazon S3"* (guardar todos os dados localmente e, de forma assíncrona, fazer backup de snapshots pontuais desses dados no Amazon S3) — e os snapshots criam **volumes EBS** na AWS para DR.

> [!question] Q5. Qual a diferença essencial entre DataSync e Storage Gateway?
> **A)** DataSync é mais rápido
> **B)** DataSync move os dados (operação que termina); Storage Gateway é um caminho de acesso permanente
> **C)** Storage Gateway só funciona com S3
> **D)** DataSync não criptografa
>
> > [!success]- Resposta
> > **Resposta: B**
> >
> > **Por que B**: é a distinção que a prova testa — **mover** × **continuar acessando**.
> > **C errada**: há FSx File Gateway, Volume Gateway e Tape Gateway.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Volume Gateway expõe arquivo | Expõe **iSCSI** (bloco). Arquivo é **File Gateway** |
| Cached guarda tudo local | **Cached** = dado no S3 + cache. **Stored** = tudo local + snapshots |
| File Gateway substitui o EFS | EFS é file share **nativo na AWS**; File Gateway é **ponte** para on-premises |
| Tape Gateway é só marketing | É a única forma de manter o software de backup com fitas **sem trocá-lo** |
| DataSync e Storage Gateway são equivalentes | DataSync **move**; Gateway **dá acesso contínuo** |
| AWS Backup cobre tudo do Storage Gateway | Cobre **Volume Gateway** |
| File Gateway grava em file system | Grava **objeto no S3** (é o que permite Athena, lifecycle, CRR) |

## Links

- [[3 - Performance (24%)/Storage Gateway/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/Storage Gateway/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/Storage Gateway/3 - Detalhes|3 - Detalhes]]
