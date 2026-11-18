---
tags: [saa-c03, systems-manager, decorar]
servico: AWS Systems Manager
atualizado: 2026-11-08
---

# Systems Manager — Decorar

## Parameter Store — a tabela de tiers (oficial)

| | **Standard** | **Advanced** |
|---|---|---|
| Parâmetros por conta/região | **10.000** | **100.000** |
| Tamanho máximo do valor | **4 KB** | **8 KB** |
| Parameter policies (expiração, notificação) | Não suportado | **Suportado** |
| Compartilhamento cross-account | Não suportado | **Suportado** |
| Mudança de tier | Upgradeable | **Não downgradeable** |
| Custo | **Sem cobrança adicional** | **Cobrado** |

Tipos: **`String`**, **`StringList`**, **`SecureString`** (*"Parameter Store encrypts the values using AWS Key Management Service"* (o Parameter Store criptografa os valores usando o AWS Key Management Service)).
Versionamento: guarda as **100** versões mais recentes.

## Parameter Store × Secrets Manager (oficial)

| | **Parameter Store** | **Secrets Manager** |
|---|---|---|
| **Rotação de credencial** | **"None"** | **"Automatic, with native database integrations"** (automático, com integrações nativas ao banco) |
| **Custo** | *"Standard tier free; advanced tier and higher throughput billed"* (camada Standard gratuita; camada Advanced e throughput maior são cobrados) | *"Billed per secret per month and per API call"* (cobrado por segredo por mês e por chamada de API) |

> Recomendação oficial: *"For secrets such as database credentials, API keys, or tokens, we recommend AWS Secrets Manager."* (para segredos como credenciais de banco, chaves de API ou tokens, recomendamos o AWS Secrets Manager)

## Session Manager

| Fato | Detalhe |
|---|---|
| Portas de entrada | **Nenhuma** |
| Bastion | **Não precisa** |
| Chave SSH | **Não precisa** |
| Criptografia | **TLS 1.2** (+ chave KMS opcional) |
| Log | CloudTrail, S3, CloudWatch Logs, EventBridge/SNS |
| ⚠️ Limitação de log | *"Logging isn't available for Session Manager sessions that connect through port forwarding or SSH"* (o registro em log não está disponível para sessões do Session Manager que conectam por port forwarding ou SSH) |
| Sem IP público | *"AWS PrivateLink support for managed nodes without public IP addresses"* (suporte a AWS PrivateLink para nós gerenciados sem endereço IP público) |
| SOs | Windows, Linux, macOS, EC2 e **não-EC2** (híbrido, multicloud, edge) |

## Patch Manager

| Fato | Detalhe |
|---|---|
| O que faz | *"automates the process of patching managed nodes with both security-related updates and other types of updates"* |
| Modos | **Scan** (só relatório) ou **Scan and install** |
| ⚠️ Limite | *"doesn't support upgrading major versions of operating systems"* (não oferece suporte a upgrade de versões maiores de sistema operacional) |
| ⚠️ Teste | *"AWS doesn't test patches before making them available in Patch Manager"* (a AWS não testa os patches antes de disponibilizá-los no Patch Manager) |
| Compliance | Definida pelo **patch baseline**, não pela AWS |
| Métodos | Patch policy (Quick Setup, recomendado) · Host Management (**só scan**) · maintenance window · "Patch now" |

## Links

- [[1 - Seguranca (30%)/Systems Manager (e Parameter Store)/1 - O que e|1 - O que e]] · [[1 - Seguranca (30%)/Systems Manager (e Parameter Store)/3 - Detalhes|3 - Detalhes]] · [[1 - Seguranca (30%)/Systems Manager (e Parameter Store)/4 - Questoes|4 - Questoes]]
