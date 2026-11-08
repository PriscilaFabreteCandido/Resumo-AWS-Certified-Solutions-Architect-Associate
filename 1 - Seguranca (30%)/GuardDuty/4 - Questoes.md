---
tags: [saa-c03, guardduty, questoes]
servico: Amazon GuardDuty
atualizado: 2026-11-08
---

# GuardDuty — Questões

> [!question]- Q1. Uma instância EC2 está minerando criptomoeda sem autorização. Qual serviço detecta?
> **A)** Inspector
> **B)** **GuardDuty** ✅
> **C)** Macie
> **D)** AWS Config
>
> **Por que B**: detecção de **comportamento anômalo** a partir de VPC Flow Logs e DNS logs — comunicação com pool de mineração é um achado nativo.
> **A errada**: Inspector acha **CVE**, não comportamento.
> **C errada**: Macie olha **conteúdo de dado no S3**.
> **D errada**: Config olha **configuração**.

> [!question]- Q2. Antes de ativar o GuardDuty, o que é preciso habilitar?
> **A)** VPC Flow Logs enviados para o CloudWatch Logs
> **B)** Um trail do CloudTrail com data events
> **C)** **Nada: CloudTrail management events, VPC Flow Logs e DNS logs são fontes fundacionais consumidas diretamente** ✅
> **D)** O AWS Config
>
> **Por que C**: as três fontes fundacionais não precisam ser habilitadas nem pagas separadamente.
> **A e B erradas**: é a armadilha — parece razoável e está errado.

> [!question]- Q3. Detectar ameaças em 40 contas de uma AWS Organizations, com visão central.
> **A)** Habilitar GuardDuty em cada conta e consolidar por script
> **B)** **Designar uma conta administradora do GuardDuty via Organizations, com as demais como membros** ✅
> **C)** Security Hub apenas
> **D)** Detective em cada conta
>
> **Por que B**: o modelo administrador/membro integrado ao Organizations é nativo.
> **C errada**: Security Hub **agrega**; sem GuardDuty habilitado, não há achado de ameaça para agregar.
> **D errada**: Detective investiga depois da detecção.

> [!question]- Q4. Varrer volumes EBS em busca de malware.
> **A)** Inspector
> **B)** **GuardDuty Malware Protection** ✅
> **C)** Macie
> **D)** Systems Manager Patch Manager
>
> **Por que B**: é o plano opcional do GuardDuty que varre **volumes EBS**.
> **A errada**: Inspector procura **CVE em pacotes**, não malware em disco.
> **D errada**: Patch Manager aplica patch, não procura malware.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| GuardDuty escaneia vulnerabilidade | CVE é **Inspector** |
| GuardDuty olha o conteúdo dos dados | Conteúdo no S3 é **Macie** |
| Preciso habilitar VPC Flow Logs primeiro | As três fontes fundacionais são consumidas **direto** |
| GuardDuty avalia conformidade com CIS | Isso é **Security Hub** |
| GuardDuty investiga o incidente | Investigação é **Detective** |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
