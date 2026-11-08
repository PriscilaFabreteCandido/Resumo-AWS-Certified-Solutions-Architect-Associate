---
tags: [saa-c03, config, questoes]
servico: AWS Config
atualizado: 2026-11-08
---

# AWS Config — Questões

> [!question]- Q1. Detectar, em 30 contas, qualquer security group que libere a porta 22 para `0.0.0.0/0`, e corrigir automaticamente.
> **A)** SCP negando `ec2:AuthorizeSecurityGroupIngress`
> **B)** **Config rule (`restricted-ssh`) com remediação automática, com aggregator nas 30 contas** ✅
> **C)** GuardDuty
> **D)** Security Hub com controles habilitados
>
> **Por que B**: o enunciado pede **detectar e corrigir** — é a função de Config rule + remediation.
> **A errada**: SCP **preveniria**, mas bloquearia todo uso legítimo da API.
> **C errada**: GuardDuty detecta **ameaça**, não desvio de configuração.
> **D errada**: Security Hub **mostraria** o achado (ele roda controles via Config), mas a remediação configurada é do **Config**.

> [!question]- Q2. "Impedir que qualquer conta crie recursos fora de us-east-1 e sa-east-1."
> **A)** Config rule com remediação
> **B)** **SCP com `Deny` condicionado a `aws:RequestedRegion`** ✅
> **C)** IAM policy em todos os roles
> **D)** Firewall Manager
>
> **Por que B**: o verbo é **impedir** → guardrail preventivo.
> **A errada**: Config detecta **depois** da criação.
> **C errada**: inviável manter em todas as contas, e não alcança o root.

> [!question]- Q3. O Security Hub foi habilitado, mas os controles não mostram dados. O que falta?
> **A)** Habilitar o GuardDuty
> **B)** **Habilitar o AWS Config, de onde vêm as service-linked rules dos controles** ✅
> **C)** Criar um trail do CloudTrail
> **D)** Assinar o Shield Advanced
>
> **Por que B**: os controles do Security Hub rodam via **AWS Config**.

> [!question]- Q4. Descobrir que instâncias usavam uma AMI vulnerável há três semanas.
> **A)** CloudTrail event history
> **B)** **AWS Config, consultando o histórico de configuração** ✅
> **C)** Inspector
> **D)** CloudWatch Logs
>
> **Por que B**: o Config mantém o **histórico de configuração** e as relações entre recursos.
> **A errada**: o CloudTrail mostra as **chamadas** (quem lançou), mas reconstruir o inventário histórico a partir delas é trabalhoso.
> **C errada**: Inspector mostra a vulnerabilidade **agora**, não o inventário passado.

> [!question]- Q5. Um auditor pede evidência de que os buckets estiveram criptografados durante todo o trimestre.
> **A)** AWS Artifact
> **B)** **AWS Config: histórico de configuração + conformance pack, ou AWS Audit Manager para montar a evidência** ✅
> **C)** CloudTrail Lake
> **D)** Security Hub
>
> **Por que B**: histórico de conformidade ao longo do tempo é exatamente o que o Config guarda; o Audit Manager empacota como evidência.
> **A errada**: Artifact traz a conformidade **da AWS**, não a sua.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Config previne configuração errada | **Detecta e remedia.** Prevenir é **SCP/IAM** |
| Config mostra quem fez a mudança | Mostra **o que** mudou e **quando**. Quem fez é **CloudTrail** |
| Security Hub substitui o Config | Security Hub **usa** o Config |
| Config é grátis | Cobra por **configuration item** e por **avaliação de regra** |
| Config detecta ameaças | Ameaça é **GuardDuty** |
| Config entrega o relatório de compliance da AWS | Isso é **AWS Artifact** |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
