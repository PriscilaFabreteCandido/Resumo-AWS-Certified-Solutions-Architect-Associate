---
tags: [saa-c03, inspector, questoes]
servico: Amazon Inspector
atualizado: 2026-11-08
---

# Inspector — Questões

> [!question]- Q1. Saber continuamente se instâncias EC2 e imagens no ECR têm CVEs conhecidas, sem instalar agente manualmente.
> **A)** **Amazon Inspector** ✅
> **B)** AWS Security Hub
> **C)** GuardDuty com Malware Protection
> **D)** AWS Config
>
> **Por que A**: varredura contínua de vulnerabilidade em EC2, ECR e Lambda, com descoberta automática.
> **B errada**: Security Hub **agrega** achados (inclusive do Inspector); não faz o scan.
> **C errada**: Malware Protection procura **malware em volumes EBS**, não CVE em pacotes.
> **D errada**: Config é configuração e conformidade.

> [!question]- Q2. Depois de o Inspector achar uma CVE crítica em 200 instâncias, como corrigir com menor esforço?
> **A)** O Inspector corrige automaticamente
> **B)** **Systems Manager Patch Manager com patch policy, ou AMI nova + instance refresh no Auto Scaling** ✅
> **C)** Recriar as instâncias manualmente
> **D)** Security Hub com remediação
>
> **Por que B**: Inspector **detecta**; a correção é Patch Manager (in-place) ou substituição imutável da fleet.
> **A errada**: o Inspector não aplica patch.
> **D errada**: Security Hub consolida achados; a remediação vem de Config/SSM.

> [!question]- Q3. Por que uma instância EC2 não aparece nos resultados do Inspector?
> **A)** Falta habilitar o GuardDuty
> **B)** **A instância não é um managed node do Systems Manager (SSM Agent ausente ou sem permissão/rota)** ✅
> **C)** A instância está em subnet privada
> **D)** Falta o AWS Config
>
> **Por que B**: a varredura de EC2 depende de a instância ser gerenciada pelo Systems Manager.
> **C errada**: subnet privada é normal — basta o SSM alcançar o serviço (via NAT ou interface endpoints).

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Inspector corrige a vulnerabilidade | Só **detecta**. Correção é **Patch Manager** |
| Inspector só cobre EC2 | Cobre **EC2, ECR e Lambda** |
| Inspector detecta malware | Malware em EBS é **GuardDuty** |
| Inspector é job que eu agendo | Descoberta e varredura são **contínuas** |
| Inspector funciona sem SSM Agent em EC2 | A instância precisa ser **managed node** |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
