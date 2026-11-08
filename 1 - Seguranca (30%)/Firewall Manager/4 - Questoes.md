---
tags: [saa-c03, firewall-manager, questoes]
servico: AWS Firewall Manager
atualizado: 2026-11-08
---

# Firewall Manager — Questões

> [!question]- Q1. Garantir que **toda** distribuição CloudFront nova nas 60 contas receba a web ACL corporativa.
> **A)** SCP exigindo WAF
> **B)** **Firewall Manager com policy de WAF aplicada à organização** ✅
> **C)** AWS Config rule com remediação
> **D)** CloudFormation StackSets distribuindo a web ACL
>
> **Por que B**: aplica e **mantém** a proteção continuamente, inclusive em recursos criados fora de pipeline.
> **A errada**: SCP nega ações; não associa recursos nem condiciona à existência da web ACL.
> **C errada**: detecta e remedia **depois**, e você escreve a remediação.
> **D errada**: cria a web ACL, mas não garante a **associação** a recursos novos feitos à mão.

> [!question]- Q2. Encontrar e corrigir, continuamente e em todas as contas, security groups que liberem a porta 3389 para `0.0.0.0/0`.
> **A)** SCP negando `ec2:AuthorizeSecurityGroupIngress`
> **B)** **Firewall Manager com security group policy em modo Audit** ✅
> **C)** NACL em todas as subnets
> **D)** Inspector
>
> **Por que B**: o modo **Audit** encontra SGs que violam o padrão e pode corrigir, em toda a organização.
> **A errada**: bloquearia todo uso legítimo da API.
> **C errada**: bloquearia RDP legítimo e não corrige o SG errado.
> **D errada**: Inspector acha CVE e exposição de rede, não padroniza SG.
> ⚠️ **AWS Config rule** (`restricted-rdp`) também é resposta aceitável quando o requisito é apenas **detectar e remediar**; Firewall Manager é a resposta quando é **aplicar o padrão**.

> [!question]- Q3. O Firewall Manager foi configurado, mas não detecta recursos em duas contas. O que verificar?
> **A)** Se o Shield Advanced está assinado
> **B)** **Se o AWS Config está habilitado naquelas contas e regiões** ✅
> **C)** Se o WAF está na mesma região
> **D)** Se as contas têm um ALB
>
> **Por que B**: o Config fornece o inventário de recursos ao Firewall Manager.

> [!question]- Q4. Qual destes o Firewall Manager **não** gerencia?
> **A)** AWS WAF
> **B)** Security groups
> **C)** **IAM policies** ✅
> **D)** Route 53 Resolver DNS Firewall
>
> **Por que C**: a lista é WAF, Shield Advanced, security groups, NACLs, Network Firewall e DNS Firewall. IAM é governado por **SCP** e IAM.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| Firewall Manager é um firewall | É o **gerenciador central** de outras proteções |
| Funciona sem AWS Config | **Precisa** do Config para o inventário |
| Funciona sem Organizations | **Precisa** de Organizations com all features |
| Gerencia IAM policies | **Não.** Isso é SCP/IAM |
| É grátis como Organizations e RAM | **É cobrado** por policy e por recurso |
| Substitui o AWS Config | **Usa** o Config |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
