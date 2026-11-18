---
tags: [saa-c03, datasync, questoes]
servico: AWS DataSync
atualizado: 2026-11-08
---

# DataSync — Questões

> [!question]- Q1. Migrar 20 TB de um NAS on-premises para o S3, com link de 1 Gbps, validando a integridade.
> **A)** `aws s3 sync` num cron
> **B)** **AWS DataSync** ✅
> **C)** Snow Family
> **D)** Storage Gateway
>
> **Por que B**: *"high-speed file transfer service"* (serviço de transferência de arquivos de alta velocidade) com *"automatic encryption and data integrity validation"* (criptografia automática e validação de integridade dos dados) e arquitetura paralela multi-thread.
> **A errada**: sequencial, sem validação nem preservação de metadados.
> **C errada**: 20 TB em 1 Gbps cabe em ~2 dias — não precisa de dispositivo físico.
> **D errada**: Gateway é **acesso contínuo**, não migração.

> [!question]- Q2. Migrar 80 TB com link de 100 Mbps, em **duas semanas**.
> **A)** DataSync pela internet
> **B)** **Snow Family (dispositivo físico)** ✅
> **C)** S3 Transfer Acceleration
> **D)** Direct Connect de 1 Gbps
>
> **Por que B**: 80 TB em 100 Mbps passa de **70 dias**. Link insuficiente é o gatilho do dispositivo físico.
> **A errada**: o DataSync é limitado pelo link.
> **C errada**: acelera, mas não cria banda.
> **D errada**: provisionar DX leva semanas, e depois ainda levaria ~8 dias.
> ⚠️ O suporte ao Snowball encerra em **31/12/2026** — mas o cenário "link insuficiente + prazo curto" continua apontando Snow Family na prova.

> [!question]- Q3. Aplicações on-premises precisam **continuar** gravando em SMB, com o dado indo para o S3.
> **A)** DataSync agendado a cada hora
> **B)** **S3 File Gateway** ✅
> **C)** Transfer Family
> **D)** DataSync contínuo
>
> **Por que B**: o requisito é **continuar acessando** com protocolo local — caminho permanente, não migração.
> **A e D erradas**: copiam, mas a fonte de verdade continua local, com defasagem.

> [!question]- Q4. Arquivar 50 TB de dado frio do NAS direto para a classe mais barata, sem pagar Standard no caminho.
> **A)** DataSync para o S3 Standard + lifecycle
> **B)** **DataSync gravando direto no S3 Glacier Deep Archive** ✅
> **C)** Storage Gateway em modo cached
> **D)** Snow Family
>
> **Por que B**: a doc cita arquivar para *"S3 Glacier Flexible Retrieval or S3 Glacier Deep Archive"* (S3 Glacier Flexible Retrieval ou S3 Glacier Deep Archive) — evita pagar Standard e a requisição de transição por objeto.
> ⚠️ Atenção ao mínimo de **180 dias** e ao **overhead de 40 KB por objeto**.

> [!question]- Q5. Sincronizar diariamente um compartilhamento NFS on-premises com um EFS.
> **A)** Storage Gateway
> **B)** **DataSync com tarefa agendada** ✅
> **C)** rsync via VPN
> **D)** Transfer Family
>
> **Por que B**: transferência **incremental agendada**, com validação de integridade.

> [!question]- Q6. Migrar dados do **Azure Blob Storage** para o S3.
> **A)** Snow Family
> **B)** **DataSync** ✅
> **C)** Storage Gateway
> **D)** S3 Replication
>
> **Por que B**: a doc lista **Azure Blob, Azure Files, Google Cloud Storage, Wasabi** entre as origens suportadas.
> **D errada**: a replicação do S3 funciona entre buckets S3.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| DataSync e Storage Gateway são equivalentes | DataSync **move** (termina); Gateway dá **acesso contínuo** |
| DataSync substitui o Transfer Family | Transfer Family é para **terceiros enviarem** por SFTP/FTPS/FTP/AS2 |
| DataSync resolve link insuficiente | É limitado pela **banda**. Sem banda: **Snow Family** |
| DataSync só vai para o S3 | Vai para **S3, EFS e os quatro FSx** |
| DataSync não lê outras nuvens | Lê **Azure Blob/Files, Google Cloud Storage, Wasabi** |
| Precisa de agente sempre | Entre serviços **AWS**, não precisa |
| Transferir só para Standard | Pode gravar **direto** em Glacier FR e Deep Archive |

## Links

- [[3 - Performance (24%)/DataSync/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/DataSync/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/DataSync/3 - Detalhes|3 - Detalhes]]
