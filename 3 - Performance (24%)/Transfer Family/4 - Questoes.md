---
tags: [saa-c03, transfer-family, questoes]
servico: AWS Transfer Family
atualizado: 2026-11-08
---

# Transfer Family — Questões

> [!question]- Q1. Parceiros enviam arquivos diários por **SFTP**. A empresa quer eliminar o servidor SFTP em EC2.
> **A)** DataSync
> **B)** **AWS Transfer Family** ✅
> **C)** S3 File Gateway
> **D)** S3 Transfer Acceleration
>
> **Por que B**: endpoint **SFTP gerenciado** sobre S3/EFS — sem patch, HA ou disco para manter.
> **A errada**: DataSync é **você** movendo dados, não terceiro enviando.
> **C errada**: File Gateway é acesso **local** por NFS/SMB.
> **D errada**: acelera upload para o S3, mas não fala SFTP.

> [!question]- Q2. A empresa precisa trocar documentos **EDI** com fornecedores, com assinatura e recibo.
> **A)** Transfer Family com SFTP
> **B)** **Transfer Family com AS2** ✅
> **C)** S3 com presigned URL
> **D)** Amazon MQ
>
> **Por que B**: **AS2** é o protocolo de EDI B2B, e está na lista oficial do Transfer Family. Nenhum outro serviço da AWS o oferece.

> [!question]- Q3. Um parceiro bancário exige **IPs fixos** para liberar no firewall dele.
> **A)** Endpoint público do Transfer Family
> **B)** **Endpoint de VPC com Elastic IPs** ✅
> **C)** CloudFront na frente
> **D)** Global Accelerator
>
> **Por que B**: o endpoint em VPC permite associar **Elastic IPs**, que o parceiro coloca na allowlist.
> **A errada**: o hostname público não garante IPs fixos.

> [!question]- Q4. Após o upload por SFTP, o arquivo precisa ser validado, descompactado e movido.
> **A)** DataSync
> **B)** **Managed File Transfer Workflows (ou S3 event notification → Lambda)** ✅
> **C)** Storage Gateway
> **D)** Glue crawler
>
> **Por que B**: o MFTW encadeia passos após o upload; a alternativa nativa é **S3 event → Lambda/EventBridge/Step Functions**.

> [!question]- Q5. Os usuários do SFTP devem se autenticar com as credenciais do **Active Directory** corporativo.
> **A)** Service-managed users
> **B)** **Integração com AWS Directory Service** ✅
> **C)** Cognito user pool
> **D)** IAM users
>
> **Por que B**: o Transfer Family integra com o Directory Service para reaproveitar as identidades do AD.
> **C errada**: Cognito é identidade de **usuário final de app**.

> [!question]- Q6. Qual a diferença essencial entre Transfer Family e DataSync?
> **A)** Transfer Family é mais rápido
> **B)** **Transfer Family é um endpoint para terceiros enviarem (SFTP/FTPS/FTP/AS2); DataSync é você movendo dados entre storages** ✅
> **C)** DataSync não criptografa
> **D)** Transfer Family só funciona com EFS
>
> **Por que B**: o divisor é **quem inicia** a transferência e **qual protocolo**.
> **D errada**: funciona com **S3 e EFS**.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Transfer Family é para migração em massa | É **endpoint** para terceiros enviarem/receberem |
| DataSync substitui o Transfer Family | DataSync não fala **SFTP/FTPS/FTP/AS2** |
| Só suporta SFTP | **SFTP, FTPS, FTP, AS2** e navegador |
| Grava só no S3 | **S3 e EFS** |
| Endpoint público dá IP fixo | IP fixo = endpoint de **VPC com Elastic IP** |
| Autenticação só com usuários do serviço | Também **Directory Service** e **custom identity provider** |
| EDI se faz com SFTP | **AS2** é o protocolo de EDI |

## Links

- [[3 - Performance (24%)/Transfer Family/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/Transfer Family/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/Transfer Family/3 - Detalhes|3 - Detalhes]]
