---
tags: [saa-c03, nacl, detalhes]
servico: Network ACL (NACL)
atualizado: 2026-11-08
---

# NACL — Detalhes

## 1. Stateless: o que muda na prática

É a propriedade que gera mais erro. Com **security group**, você libera a porta do serviço e esquece: o retorno é rastreado. Com **NACL**, cada direção é independente.

Exemplo completo de uma subnet privada cujas instâncias precisam baixar pacotes por HTTPS:

| Direção | # | Tipo | Porta | Origem/Destino | Ação |
|---|---|---|---|---|---|
| Outbound | 100 | TCP | **443** | `0.0.0.0/0` | ALLOW |
| Inbound | 100 | TCP | **1024-65535** | `0.0.0.0/0` | ALLOW |

Sem a regra **inbound de portas efêmeras**, a conexão sai e a resposta é descartada. O sintoma clássico de prova: *"as instâncias conseguem iniciar conexões, mas as respostas não chegam"*.

E vale nos dois sentidos: para um ALB público receber HTTPS, a NebACL da subnet pública precisa de `inbound ALLOW 443` **e** `outbound ALLOW 1024-65535`.

## 2. Avaliação ordenada

*"Rules are evaluated starting with the lowest numbered rule. As soon as a rule matches traffic, it's applied regardless of any higher-numbered rule that might contradict it."*

Isso tem duas consequências:

**Deny específico antes de allow amplo.** A doc recomenda: *"Be sure to give the deny rule a lower number than the rule that allows the wider range of port traffic."*

**Deixe espaço entre os números.** *"increments (for example, increments of 10 or 100)"* — assim você insere regras depois sem renumerar tudo.

A regra `*` (asterisco) é o DENY final implícito, e *"You can't delete a rule where the rule number is an asterisk."*

## 3. Default × customizada

| | NACL **default** | NACL **criada por você** |
|---|---|---|
| Inbound | ALLOW tudo (regra 100) | **Só a regra `*` DENY** |
| Outbound | ALLOW tudo (regra 100) | **Só a regra `*` DENY** |
| Efeito prático | Transparente | **Bloqueia tudo** até você escrever as regras |

Você pode modificar a default *"by adding rules or removing the default numbered rules"*.

> [!important] O erro operacional mais comum
> Criar uma NACL "para endurecer a segurança" e associá-la a uma subnet de produção. Como ela nasce só com o DENY implícito, **tudo para na hora**. Construa as regras primeiro, teste numa subnet isolada, e só depois associe.

## 4. Quando usar NACL

A recomendação oficial é usar SG como mecanismo primário; a NACL entra para o que o SG não faz:

| Necessidade | Por que NACL |
|---|---|
| **Negar** um IP ou faixa | SG não tem deny |
| Controle que vale para **tudo** na subnet | Independe de quem configurou o SG do recurso |
| Defesa em camadas por compliance | Dois controles independentes |
| Bloquear uma porta em toda uma camada | Uma regra, em vez de editar N security groups |

A doc resume o papel: a NACL *"provide[s] stateless, coarse-grain network control"* — controle **grosseiro**. Granularidade fina é SG.

## 5. Limites e o que escapa do filtro

Avaliação só na **fronteira** da subnet: *"not as it is routed within a subnet"*. Duas instâncias na mesma subnet não são filtradas pela NACL (mas são pelos SGs).

**Não** é possível referenciar prefix lists: *"You can't reference prefix lists in network ACL rules."* Isso importa para gateway endpoints — a doc do endpoint avisa que *"The network ACLs... must also allow traffic"* para os CIDRs do serviço, e você precisa listar os CIDRs na mão (ou liberar amplamente).

**Não** passa pelo filtro: Route 53 Resolver (VPC+2) — *"use Route 53 Resolver DNS Firewall instead"* —, o **IMDS**, DHCP, Amazon Time Sync, ativação de licença Windows e metadados de task do ECS.

## 6. Gestão em escala

**AWS Firewall Manager** gerencia NACLs (e SGs, WAF, Shield Advanced, Network Firewall, DNS Firewall) centralmente nas contas de uma AWS Organizations — é a resposta quando o enunciado fala de **muitas contas**.

Para inspeção de conteúdo (não só permitir/negar por porta e IP), a camada certa é **AWS Network Firewall** (firewall gerenciado na VPC, com regras Suricata) ou **Gateway Load Balancer** + appliance de terceiro.

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[Security Groups]] · [[VPC]] · [[Firewall Manager]] · [[VPC Endpoints e PrivateLink]]
- [Regras de NACL](https://docs.aws.amazon.com/vpc/latest/userguide/nacl-rules.html)
- [Comparação oficial](https://docs.aws.amazon.com/vpc/latest/userguide/infrastructure-security.html)
