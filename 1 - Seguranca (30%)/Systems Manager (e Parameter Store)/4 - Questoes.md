---
tags: [saa-c03, systems-manager, questoes]
servico: AWS Systems Manager
atualizado: 2026-11-08
---

# Systems Manager — Questões

> [!question]- Q1. Auditoria exige acabar com bastion hosts e chaves SSH, com log das sessões, em instâncias privadas **sem acesso à internet**.
> **A)** NAT gateway + SSH com chave rotacionada por Lambda
> **B)** **SSM Session Manager, com interface endpoints do Systems Manager na VPC e log em S3/CloudWatch Logs** ✅
> **C)** EC2 Instance Connect
> **D)** VPN cliente para a subnet privada
>
> **Por que B**: resolve os três requisitos — *"without the need to open inbound ports, maintain bastion hosts, or manage SSH keys"* — e os endpoints evitam depender de internet.
> **A errada**: mantém porta 22, chave e NAT.
> **C errada**: Instance Connect ainda usa SSH na 22.
> **D errada**: dá rede, mas não elimina SSH, chave nem bastion, e não registra a sessão.

> [!question]- Q2. 2.000 parâmetros de configuração, versionados, com o **menor custo possível**.
> **A)** Secrets Manager
> **B)** **Parameter Store, tier Standard** ✅
> **C)** DynamoDB
> **D)** Arquivo JSON no S3
>
> **Por que B**: cabe nos 10.000 parâmetros e 4 KB do Standard, tem versionamento (100 versões) e **não tem cobrança adicional**.
> **A errada**: cobra **por secret por mês**.

> [!question]- Q3. A política exige rotação automática da senha do banco a cada 30 dias.
> **A)** Parameter Store `SecureString` com Lambda agendada
> **B)** **Secrets Manager com rotação habilitada** ✅
> **C)** Parameter Store Advanced com parameter policy
> **D)** KMS com rotação anual
>
> **Por que B**: Parameter Store tem rotação **"None"**.
> **C errada**: parameter policy faz expiração e notificação, **não** rotaciona a credencial.
> **D errada**: KMS rotaciona **chave**, não senha.

> [!question]- Q4. Uma instância EC2 não aparece no Session Manager. O que verificar?
> **A)** Se a porta 22 está aberta no security group
> **B)** **Se o SSM Agent está instalado, se a instance profile tem a policy do SSM, e se há rota até o serviço (NAT ou endpoints)** ✅
> **C)** Se a instância tem Elastic IP
> **D)** Se o CloudTrail está habilitado
>
> **Por que B**: são os três requisitos de um **managed node**.
> **A errada**: o Session Manager **não** usa porta de entrada.

> [!question]- Q5. Migrar as instâncias de Ubuntu 20.04 para 22.04 em escala.
> **A)** Patch Manager com patch baseline atualizada
> **B)** **Não é Patch Manager: construir AMI nova (EC2 Image Builder) e substituir a fleet via Auto Scaling instance refresh** ✅
> **C)** Run Command com `apt upgrade`
> **D)** Automation com documento de upgrade
>
> **Por que B**: *"Patch Manager... doesn't support upgrading major versions of operating systems."* A troca de versão maior é substituição imutável.
> **C errada**: `apt upgrade` não faz release upgrade, e fazê-lo in-place em escala é frágil.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Session Manager precisa da porta 22 | **Nenhuma porta de entrada** |
| Session Manager loga tudo | **Não** loga sessões via port forwarding ou SSH |
| Parameter Store rotaciona SecureString | **"None"** — não rotaciona |
| Advanced tier pode voltar para Standard | *"Not downgradeable"* |
| Patch Manager faz upgrade de versão do SO | *"doesn't support upgrading major versions"* |
| A AWS testa os patches | *"AWS doesn't test patches before making them available"* |
| SSM funciona sem instance profile | Precisa de role com a policy do SSM |
| Host Management do Quick Setup instala patches | **Só scan** |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
