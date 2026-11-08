---
tags: [saa-c03, nacl, decorar]
servico: Network ACL (NACL)
atualizado: 2026-11-08
---

# NACL — Decorar

## A tabela oficial SG × NACL

| Característica | Security group | **Network ACL** |
|---|---|---|
| Nível de operação | Instance level | **Subnet level** |
| Escopo | Recursos associados ao SG | Todas as instâncias nas subnets associadas |
| Tipo de regra | Allow rules only | **Allow e deny** |
| Avaliação | Avalia todas as regras | **Em ordem crescente, para na primeira que casa** |
| Tráfego de retorno | Automático (stateful) | **Precisa ser liberado (stateless)** |

## Números

| Item | Valor |
|---|---|
| Faixa de numeração das regras | **1 a 32766** |
| Regra final implícita | `*` → **DENY** tudo (não pode ser removida) |
| NACLs por subnet | **1** |
| Subnets por NACL | várias |
| Incremento recomendado | **de 10 em 10 ou de 100 em 100** |
| Custo | *"There is no additional charge for using network ACLs"* |

## A NACL **default** (vem liberada)

| # | Direção | Regra |
|---|---|---|
| 100 | Inbound | `0.0.0.0/0` → **ALLOW** tudo |
| 101 | Inbound | `::/0` → ALLOW tudo (só se a VPC tiver IPv6) |
| `*` | Inbound | `0.0.0.0/0` → **DENY** |
| 100 | Outbound | `0.0.0.0/0` → **ALLOW** tudo |
| 101 | Outbound | `::/0` → ALLOW tudo |
| `*` | Outbound | `0.0.0.0/0` → **DENY** |

> [!warning] NACL que **você** cria começa negando TUDO
> Só a NACL **default** vem liberada. Uma NACL nova tem apenas a regra `*` DENY — associá-la a uma subnet em produção corta todo o tráfego.

## Portas efêmeras (a razão nº 1 de NACL quebrada)

Quando a instância abre uma conexão de saída, a resposta volta para uma **porta efêmera alta** dela, não para a porta do serviço. Então, numa NACL:

```
Saída HTTPS:  outbound  ALLOW  TCP 443      -> destino
Volta:        inbound   ALLOW  TCP alta     <- origem
```

Faixas usuais: Linux **32768-60999** · Windows Server 2008+ **49152-65535** · NLB e Lambda **1024-65535**. Liberar **1024-65535** cobre todos.

## Ordem importa: deny precisa vir antes

A doc: *"Be sure to give the deny rule a lower number than the rule that allows the wider range of port traffic."*

```
# CERTO
 50  DENY   TCP 443  de 203.0.113.7/32
100  ALLOW  TCP 443  de 0.0.0.0/0

# ERRADO (o allow casa primeiro e o deny nunca é avaliado)
100  ALLOW  TCP 443  de 0.0.0.0/0
200  DENY   TCP 443  de 203.0.113.7/32
```

## O que NACL **não** consegue bloquear

- **Route 53 Resolver / DNS da VPC (VPC+2)** → use **Route 53 Resolver DNS Firewall**
- **IMDS** (metadados da instância) → use **IMDSv2**
- DHCP, Amazon Time Sync, ativação de licença Windows, metadados de task do ECS
- E: *"You can't reference prefix lists in network ACL rules"*

## Links

- [[1 - O que e]] · [[3 - Detalhes]] · [[4 - Questoes]]
