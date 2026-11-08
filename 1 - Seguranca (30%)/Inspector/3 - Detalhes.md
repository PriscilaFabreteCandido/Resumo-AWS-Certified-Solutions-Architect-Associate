---
tags: [saa-c03, inspector, detalhes]
servico: Amazon Inspector
atualizado: 2026-11-08
---

# Inspector — Detalhes

## 1. O ciclo completo de vulnerabilidade

A prova gosta de testar a divisão de trabalho:

```
Inspector               →  descobre o workload e acha a CVE
Security Hub            →  consolida o achado com os demais
EventBridge             →  dispara a automação
Systems Manager         →  Patch Manager aplica o patch
                           (ou Automation recria a instância)
EC2 Image Builder       →  gera AMI nova já corrigida
Auto Scaling            →  instance refresh substitui a fleet
```

O último par é o padrão de **immutable infrastructure** citado no guia (*Task 2.2*): em vez de corrigir a instância, você gera uma AMI nova e troca a fleet.

## 2. Descoberta automática e varredura contínua

Diferente de um scanner tradicional, o Inspector *"automatically discovers workloads and continually scans them"*. Em EC2 isso depende do **SSM Agent** (a instância precisa ser um managed node do Systems Manager) — o que é um pré-requisito que a prova às vezes esconde na alternativa.

Para **ECR**, a varredura acontece no push da imagem e continuamente depois, conforme novas CVEs são publicadas. Isso importa: uma imagem que estava limpa ontem pode ter achado hoje, sem você fazer nada.

## 3. Exposição de rede

Além de CVE, o Inspector avalia **alcançabilidade de rede**: ele entende security groups, NACLs, route tables, internet gateways e load balancers para dizer se uma porta vulnerável é realmente **alcançável da internet**.

Isso muda a priorização: uma CVE crítica numa instância sem rota de entrada é menos urgente que uma média numa instância exposta.

## 4. Multi-conta

Modelo **administrador/membro** via AWS Organizations, como GuardDuty, Macie e Security Hub.

## 5. O que o Inspector NÃO faz

| Pergunta | Serviço |
|---|---|
| **Aplicar** o patch | **SSM Patch Manager** |
| Há malware no disco? | **GuardDuty** Malware Protection |
| Há PII no bucket? | **Macie** |
| Esse recurso está fora de conformidade? | **AWS Config** |
| Alguém está explorando a falha agora? | **GuardDuty** |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[Systems Manager (e Parameter Store)]] · [[Security Hub]] · [[GuardDuty]] · [[ECS]]
