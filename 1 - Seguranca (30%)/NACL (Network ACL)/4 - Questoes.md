---
tags: [saa-c03, nacl, questoes]
servico: Network ACL (NACL)
atualizado: 2026-11-08
---

# NACL — Questões

> [!question]- Q1. Instâncias privadas iniciam HTTPS para a internet, mas as respostas não chegam. A NACL tem só `outbound ALLOW TCP 443`. O que falta?
> **A)** Mudar o SG para stateful
> **B)** **`inbound ALLOW TCP 1024-65535`** ✅
> **C)** Rota para o internet gateway
> **D)** Elastic IP nas instâncias
>
> **Por que B**: NACL é stateless — *"responses to that traffic are not automatically allowed"*. A resposta HTTPS volta para uma **porta efêmera** da instância.
> **A errada**: SG **já é** stateful.
> **C errada**: o enunciado diz que as conexões **saem**, então a rota existe.
> **D errada**: instância privada não usa EIP.

> [!question]- Q2. Esta NACL deveria bloquear `203.0.113.7`, mas o IP continua acessando. Por quê?
> ```
> 100  ALLOW  TCP 443  de 0.0.0.0/0
> 200  DENY   TCP 443  de 203.0.113.7/32
> ```
> **A)** Falta aplicar a NACL na subnet
> **B)** **A regra 100 casa primeiro e a avaliação para; o DENY precisa ter número menor** ✅
> **C)** NACL não bloqueia por IP de origem
> **D)** Falta a regra de outbound
>
> **Por que B**: *"As soon as a rule matches traffic, it's applied regardless of any higher-numbered rule that might contradict it."* O DENY precisa ser, por exemplo, a regra **50**.
> **C errada**: NACL bloqueia por IP de origem — é justamente o que SG não faz.

> [!question]- Q3. Um time criou uma NACL nova e a associou à subnet de produção. Todo o tráfego parou. Por quê?
> **A)** A NACL foi associada a mais de uma subnet
> **B)** **Uma NACL criada pelo usuário começa apenas com a regra `*` DENY; nada é permitido até você escrever as regras** ✅
> **C)** A NACL conflitou com os security groups
> **D)** Faltou reiniciar as instâncias
>
> **Por que B**: só a NACL **default** nasce com ALLOW tudo. A customizada nasce fechada.
> **C errada**: SG e NACL são avaliados de forma independente; não "conflitam" — ambos precisam permitir.

> [!question]- Q4. Qual a diferença de escopo entre SG e NACL?
> **A)** SG é por VPC, NACL é por região
> **B)** **SG é por recurso (instance level); NACL é por subnet (subnet level)** ✅
> **C)** SG é por subnet, NACL é por instância
> **D)** Ambos são por subnet
>
> **Por que B**: é a primeira linha da tabela oficial de comparação.

> [!question]- Q5. Duas instâncias estão na **mesma** subnet. A NACL nega todo tráfego na porta 3306. Elas conseguem se comunicar nessa porta?
> **A)** Não, a NACL bloqueia
> **B)** **Sim: a NACL só avalia o tráfego que entra e sai da subnet** ✅
> **C)** Depende da ordem das regras
> **D)** Só se estiverem no mesmo SG
>
> **Por que B**: *"We evaluate the network ACL rules when traffic enters and leaves the subnet, not as it is routed within a subnet."* Quem controla aí é o **security group**.

> [!question]- Q6. É possível bloquear as consultas DNS da VPC usando NACL?
> **A)** Sim, negando a porta 53
> **B)** **Não: o tráfego do Route 53 Resolver (VPC+2) não passa pela NACL; use Route 53 Resolver DNS Firewall** ✅
> **C)** Sim, negando o IP VPC+2
> **D)** Só com security group
>
> **Por que B**: a doc lista explicitamente que as requisições DNS do Resolver não são filtradas e indica *"use Route 53 Resolver DNS Firewall instead"*.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| NACL é stateful | É **stateless** — libere as portas efêmeras |
| NACL avalia todas as regras | **Para na primeira** que casa, da menor numeração para a maior |
| Posso pôr o DENY depois do ALLOW | O DENY precisa de número **menor** |
| NACL nova já libera tudo | Começa **só com `*` DENY**. Só a **default** vem liberada |
| Uma subnet pode ter 2 NACLs | **Uma** por vez (mas uma NACL cobre várias subnets) |
| NACL filtra tráfego dentro da subnet | Só na **fronteira** da subnet |
| NACL aceita prefix list | *"You can't reference prefix lists in network ACL rules"* |
| NACL bloqueia o DNS da VPC e o IMDS | **Não bloqueia** nenhum dos dois |
| NACL substitui o security group | A recomendação é *"Use security groups as the primary mechanism"*; NACL é controle **grosseiro** |
| Posso deletar a regra `*` | **Não pode** |
| NACL custa dinheiro | *"no additional charge"* |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
- [[03 - Pegadinhas mestre]]
