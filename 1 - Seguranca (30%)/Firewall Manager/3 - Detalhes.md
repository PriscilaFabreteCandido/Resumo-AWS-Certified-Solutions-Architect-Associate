---
tags: [saa-c03, firewall-manager, detalhes]
servico: AWS Firewall Manager
atualizado: 2026-11-08
---

# Firewall Manager — Detalhes

## 1. O problema que resolve

Numa única conta, você associa uma web ACL ao seu ALB e pronto. Em 60 contas, três coisas falham:

1. **Cobertura incompleta** — alguém sobe um ALB novo sem WAF
2. **Deriva** — cada time escreve sua própria web ACL
3. **Auditoria impossível** — "todos os ALBs estão protegidos?" exige varrer tudo

O Firewall Manager resolve aplicando a política **de cima**, de forma contínua: recurso novo que casa com o escopo da policy recebe a proteção **automaticamente**.

## 2. Security group policies — os três modos

Este é o recurso menos conhecido e que mais aparece em questão de governança:

| Modo | O que faz |
|---|---|
| **Common security group** | Aplica um SG **padrão** (por exemplo, o que libera o tráfego do balanceador) a todos os recursos no escopo |
| **Audit security group** | Encontra SGs que **violam** regras definidas (ex.: "nenhum SG pode ter 0.0.0.0/0 na porta 22") e pode corrigir |
| **Usage audit** | Encontra SGs **órfãos ou redundantes** (não associados a nada) |

O modo **Audit** é a resposta para "encontrar e corrigir security groups permissivos em todas as contas, continuamente" — melhor que Config rule quando o requisito é **aplicar o padrão**, não apenas detectar.

## 3. Escopo da policy

Uma policy define:

- **Quais contas** — toda a organização, OUs específicas, ou exclusões
- **Quais recursos** — por tipo (ALB, CloudFront, EC2…) e por **tag** (incluir ou excluir)
- **Modo de remediação** — automático ou apenas relatório

O escopo por **tag** é importante: permite excluir ambientes que legitimamente precisam de configuração diferente.

## 4. Pré-requisitos

| Requisito | Por quê |
|---|---|
| **AWS Organizations** com all features | É o perímetro de aplicação |
| Conta **administradora** designada | Onde as policies vivem |
| **AWS Config** habilitado | Fornece o inventário e o estado dos recursos |

Se o Config não está habilitado numa conta/região, a policy não tem o que avaliar ali.

## 5. Firewall Manager × as alternativas

| Abordagem | Problema |
|---|---|
| **SCP** negando `elasticloadbalancing:CreateLoadBalancer` sem WAF | SCP nega ações; não consegue condicionar à existência de uma web ACL |
| **Config rule** com remediação | Detecta **depois** e você escreve a remediação |
| **CloudFormation StackSets** | Distribui recursos, mas não garante que um recurso criado **fora** do stack receba proteção |
| **Firewall Manager** | Aplica continuamente, inclusive a recursos criados fora de qualquer pipeline |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[WAF]] · [[Shield]] · [[Security Groups]] · [[Config]] · [[Organizations e Control Tower]]
