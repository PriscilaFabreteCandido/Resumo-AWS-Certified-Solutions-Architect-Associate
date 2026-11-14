---
tags: [saa-c03, transfer-family, detalhes]
servico: AWS Transfer Family
atualizado: 2026-11-08
---

# Transfer Family — Detalhes

## 1. O problema que resolve

Muitas empresas trocam arquivos com parceiros por **SFTP** ou **FTPS** há décadas: bancos enviam arquivos de retorno, operadoras enviam faturamento, fornecedores enviam catálogos. O parceiro **não vai** mudar de protocolo porque você migrou para a AWS.

A alternativa sem o Transfer Family é manter um **servidor SFTP em EC2**: com patch, HA, certificados, usuários, chaves, monitoramento e disco. O Transfer Family elimina tudo isso, entregando o mesmo protocolo com o dado caindo direto no **S3** ou **EFS**.

E o ganho estrutural: uma vez no S3, o arquivo entra no ecossistema — lifecycle, **Athena**, **Glue**, **Lambda** por evento, replicação.

## 2. Os protocolos — e quando cada um aparece

| Protocolo | Contexto |
|---|---|
| **SFTP** (version 3) | O mais comum; SSH File Transfer Protocol |
| **FTPS** | FTP sobre TLS; comum em ambientes corporativos antigos |
| **FTP** | Sem criptografia — só faz sentido em **endpoint de VPC** (rede interna) |
| **AS2** | **EDI B2B**: documentos comerciais com assinatura e recibo (MDN) |
| **Navegador** | Transferência web, para usuários sem cliente SFTP |

⚠️ **AS2** é o diferencial: se o enunciado menciona **EDI**, nenhum outro serviço da AWS atende.

## 3. Identidade — as três opções

| Opção | Quando |
|---|---|
| **Service-managed** | Poucos usuários; você cadastra usuário e chave pública no próprio serviço |
| **AWS Directory Service** | A empresa já tem **Active Directory** e quer reaproveitar as identidades |
| **Custom identity provider** | Autenticação contra o **seu** sistema (Lambda ou API Gateway), com lógica própria |

O custom provider é o que permite cenários como "autenticar contra o banco de parceiros" ou "aplicar regra de IP por usuário".

## 4. Endpoint público × VPC

| Tipo | Detalhe |
|---|---|
| **Público** | Acessível da internet; o parceiro se conecta ao hostname da AWS |
| **VPC (internet-facing)** | Com **Elastic IPs** — o parceiro libera **IPs fixos** no firewall dele |
| **VPC (internal)** | Só de dentro da rede (via DX/VPN) |

O endpoint **VPC com EIP** é a resposta quando o parceiro exige **allowlist de IP** — requisito comum em integrações bancárias.

Suporta *"up to 3 Availability Zones"*.

## 5. Managed File Transfer Workflows (MFTW)

Depois que o arquivo chega, normalmente é preciso fazer algo: validar, descompactar, antivírus, mover para o prefixo certo, notificar, registrar.

O **MFTW** é o motor serverless para isso, encadeando passos pré-definidos e customizados (via Lambda) após o upload — sem você construir a orquestração.

A alternativa é **S3 Event Notification → Lambda / EventBridge / Step Functions**, que também é resposta válida e aparece em prova.

## 6. Transfer Family × os outros serviços de transferência

| | **Transfer Family** | **DataSync** | **Storage Gateway** | **Snow Family** |
|---|---|---|---|---|
| Quem inicia | **Terceiro** | **Você** | A aplicação local | Você (físico) |
| Natureza | **Endpoint permanente** | Tarefa que termina | **Caminho permanente** | Dispositivo |
| Protocolo | **SFTP/FTPS/FTP/AS2** | NFS/SMB/HDFS/objeto | NFS/SMB/iSCSI/VTL | — |
| Destino | **S3, EFS** | S3, EFS, FSx | S3, FSx | S3 |

## 7. Onde é a resposta

| Enunciado | Por quê |
|---|---|
| "parceiros enviam arquivos por **SFTP**" | Protocolo nomeado |
| "trocar documentos **EDI**" | **AS2** |
| "eliminar o servidor SFTP em EC2" | Elimina patch, HA, disco |
| "o parceiro precisa de **IPs fixos** para liberar" | Endpoint **VPC com EIP** |
| "usar as identidades do **Active Directory**" | Integração com Directory Service |
| "processar o arquivo após o upload" | **MFTW** (ou S3 event → Lambda) |

## Links

- [[3 - Performance (24%)/Transfer Family/1 - O que e|1 - O que e]] · [[3 - Performance (24%)/Transfer Family/2 - Decorar|2 - Decorar]] · [[3 - Performance (24%)/Transfer Family/4 - Questoes|4 - Questoes]]
- [[3 - Performance (24%)/DataSync/1 - O que e|DataSync]] · [[3 - Performance (24%)/Storage Gateway/1 - O que e|Storage Gateway]] · [[4 - Custo (20%)/Snow Family/1 - O que e|Snow Family]] · [[3 - Performance (24%)/S3/1 - O que e|S3]] · [[3 - Performance (24%)/EFS/1 - O que e|EFS]] · [[1 - Seguranca (30%)/Directory Service/1 - O que e|Directory Service]] · [[2 - Resiliencia (26%)/Lambda/1 - O que e|Lambda]]
