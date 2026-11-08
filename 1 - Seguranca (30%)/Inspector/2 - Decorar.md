---
tags: [saa-c03, inspector, decorar]
servico: Amazon Inspector
atualizado: 2026-11-08
---

# Inspector — Decorar

## A tabela que decide a questão

| Serviço | Verbo | Fonte de dados | Gatilho no enunciado |
|---|---|---|---|
| **GuardDuty** | Detecta **ameaça** | CloudTrail · VPC Flow Logs · DNS logs | "atividade maliciosa", "mineração de cripto", "IP suspeito" |
| **Macie** | Descobre **dado sensível** | Buckets **S3** | "PII", "CPF", "cartão", "classificar dados", "LGPD" |
| **Inspector** | Encontra **vulnerabilidade** | EC2 · ECR · Lambda | "CVE", "vulnerabilidade de software", "patch pendente" |
| **Security Hub** | **Agrega** e mede postura | Os outros + AWS Config | "painel único", "várias contas", "CIS/PCI", "postura" |
| **Detective** | **Investiga** causa raiz | CloudTrail · VPC Flow Logs · GuardDuty | "causa raiz", "investigar", "correlacionar" |

> [!tip] O atalho
> **Comportamento** → GuardDuty. **Conteúdo do dado** → Macie. **Software desatualizado** → Inspector. **Consolidar** → Security Hub. **Entender o incidente** → Detective.

## Definição oficial

> *"Amazon Inspector is a vulnerability management service that automatically discovers workloads and continually scans them for software vulnerabilities and unintended network exposure."*

## O que ele varre

| Recurso | O que procura |
|---|---|
| **Instâncias EC2** | CVE em pacotes do SO e de aplicação; exposição de rede não intencional |
| **Imagens de container no ECR** | CVE nas camadas da imagem |
| **Funções Lambda** | CVE nas dependências do código e das layers |

**Descoberta automática** e varredura **contínua** — não é job agendado por você.

## As duas palavras-chave

| No enunciado | Resposta |
|---|---|
| **CVE**, "vulnerabilidade de software", "pacote desatualizado", "CVSS" | **Inspector** |
| "exposição de rede não intencional" (porta aberta alcançável da internet) | **Inspector** |

## O que NÃO é Inspector

| Enunciado | Serviço |
|---|---|
| **Aplicar** o patch | **Systems Manager Patch Manager** |
| Malware em volume EBS | **GuardDuty** (Malware Protection) |
| Comportamento anômalo | **GuardDuty** |
| Dado sensível | **Macie** |
| Configuração fora de padrão | **AWS Config** |

> [!warning] Inspector acha, Patch Manager corrige
> É a troca mais comum: "varrer e **corrigir** vulnerabilidades" → Inspector **detecta**, Patch Manager **aplica**. Se a alternativa diz que o Inspector corrige, está errada.

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
