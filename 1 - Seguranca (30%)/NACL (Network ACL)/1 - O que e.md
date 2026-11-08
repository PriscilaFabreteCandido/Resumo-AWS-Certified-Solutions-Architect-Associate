---
tags: [saa-c03, nacl, rede, seguranca]
servico: Network ACL (NACL)
tipo: Firewall de subnet (stateless)
dominios: [1]
atualizado: 2026-11-08
---

# NACL (Network ACL) — O que é

> [!info] Em uma frase
> Firewall **no nível da subnet**, **stateless**, com regras **numeradas** que podem **permitir ou negar** — avaliadas em ordem crescente, parando na primeira que casa.

## O que é, em palavras simples

A NACL é a "portaria da subnet". A doc oficial: *"allows or denies specific inbound or outbound traffic at the subnet level."*

Ela existe porque o security group tem duas limitações: não consegue **negar** nada, e protege o recurso, não a rede. A NACL cobre as duas.

Três propriedades definem tudo:

**1. É stateless.** *"NACLs are stateless, which means that information about previously sent or received traffic is not saved... responses to that traffic are not automatically allowed."* Se você libera a saída na porta 443, ainda precisa liberar a **entrada nas portas efêmeras** para a resposta chegar. Essa é a pegadinha mais antiga da certificação.

**2. Tem allow e deny.** *"Each rule can either allow or deny traffic."*

**3. É ordenada.** *"Each rule has a number from 1 to 32766"*, e *"Rules are evaluated starting with the lowest numbered rule. As soon as a rule matches traffic, it's applied regardless of any higher-numbered rule that might contradict it."*

## Onde se aplica

Em **subnets**. *"Each subnet in your VPC must be associated with a network ACL."* Uma subnet tem **uma** NACL por vez; uma NACL pode cobrir **várias** subnets. Subnet sem associação explícita fica com a NACL **default**.

A avaliação acontece na **fronteira** da subnet: *"We evaluate the network ACL rules when traffic enters and leaves the subnet, not as it is routed within a subnet."* Ou seja: duas instâncias na **mesma** subnet conversam sem passar pela NACL.

## Links

- [[2 - Decorar]] · [[3 - Detalhes]] · [[4 - Questoes]]
- [[Security Groups]] · [[VPC]]
- [Documentação oficial](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html)
