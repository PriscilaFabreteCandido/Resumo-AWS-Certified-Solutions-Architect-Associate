---
tags: [saa-c03, security-group, questoes]
servico: Security Groups
atualizado: 2026-11-08
---

# Security Groups — Questões

> [!question]- Q1. Como bloquear um único IP malicioso que está atacando as instâncias?
> **A)** Regra de deny no security group
> **B)** **Regra DENY na NACL da subnet, com número menor que o allow mais amplo** ✅
> **C)** Remover o IP do SG
> **D)** Security group com `0.0.0.0/0` exceto aquele IP
>
> **Por que B**: SG **não tem deny**. A NACL tem, e avalia *"in ascending order until a match for the traffic is found"* — por isso o deny precisa ter número **menor**.
> **A errada**: *"Allow rules only"*.
> **C errada**: não há o que remover; o IP nunca foi listado individualmente.
> **D errada**: SG não permite exceção — não existe "exceto".
> ⚠️ Se o ataque for na camada 7 (SQL injection, flood HTTP), a resposta vira **AWS WAF**.

> [!question]- Q2. O banco deve aceitar conexões só da camada de aplicação, que está em Auto Scaling.
> **A)** SG do banco liberando o CIDR da subnet da aplicação
> **B)** **SG do banco liberando o SG da aplicação como source** ✅
> **C)** NACL liberando os IPs atuais das instâncias
> **D)** Lista de prefixos com os IPs das instâncias
>
> **Por que B**: acompanha o scaling automaticamente e é o menor privilégio.
> **A errada**: autoriza qualquer recurso que suba na subnet.
> **C e D erradas**: os IPs mudam a cada evento de scaling — manutenção impossível.

> [!question]- Q3. Uma instância tem dois security groups: um libera a porta 80 de `0.0.0.0/0`, outro não libera nada. A porta 80 está acessível?
> **A)** Não, porque o segundo SG restringe
> **B)** **Sim: com vários SGs, a permissão é a união das regras** ✅
> **C)** Depende da ordem de associação
> **D)** Só se os dois liberarem
>
> **Por que B**: o SG *"Evaluates all rules before deciding whether to allow traffic"*, e múltiplos SGs se somam. SG não tem deny, então um SG vazio não restringe nada.
> **C errada**: não existe ordem em SG.

> [!question]- Q4. Por que não é necessário liberar portas efêmeras no security group?
> **A)** Porque a AWS libera automaticamente a faixa 1024-65535
> **B)** **Porque o SG é stateful: a resposta a uma conexão permitida volta independentemente das regras** ✅
> **C)** Porque o SG opera na camada 7
> **D)** Porque o NAT gateway faz a tradução
>
> **Por que B**: *"Responses to allowed inbound traffic are allowed to leave the instance, regardless of the outbound rules."*
> **A errada**: não há liberação implícita de faixa — há **rastreamento de estado**.
> **C errada**: SG opera em protocolo/porta/endereço.
> **D errada**: o NAT não tem papel nisso (e o comportamento vale também sem NAT).

> [!question]- Q5. A equipe de segurança quer garantir que nenhuma conta da organização crie SG com a porta 22 aberta para `0.0.0.0/0`, com correção automática.
> **A)** SCP negando `ec2:AuthorizeSecurityGroupIngress`
> **B)** **AWS Config rule (`restricted-ssh`) com remediação automática, agregada nas contas** ✅
> **C)** Security group default modificado
> **D)** NACL negando a porta 22 em todas as subnets
>
> **Por que B**: o enunciado pede **detectar e corrigir** — função de Config rule + remediation.
> **A errada**: SCP **preveniria**, mas bloquearia todo uso legítimo da API.
> **C errada**: o default não impede criar outros SGs.
> **D errada**: NACL em todas as subnets bloquearia SSH legítimo e não "corrige" o SG errado.
> ⚠️ Para **aplicar e auditar SGs centralmente** em várias contas, a resposta também pode ser **Firewall Manager**.

## ⚠️ Armadilhas

| Parece | É |
|---|---|
| SG pode negar um IP | **Só allow.** Deny é NACL (ou WAF) |
| SG avalia regras em ordem | **Avalia todas juntas**; não há numeração |
| Preciso liberar portas efêmeras no SG | **Não.** SG é **stateful** |
| Vários SGs restringem uns aos outros | As permissões se **somam** (união) |
| SG protege a subnet | SG é **nível de recurso**. Subnet é **NACL** |
| SG bloqueia o IMDS e o DNS da VPC | **Não filtra** nenhum dos dois |
| SG pode ser usado em outra VPC | É **por VPC** (mas pode ser **referenciado** via peering) |
| SG default nega tudo | Nega entrada **de fora do próprio SG**, mas libera **todo** o outbound |
| SG default pode ser deletado | **Não pode** |
| SG custa dinheiro | *"no additional charge"* |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[3 - Detalhes]]
- [[03 - Pegadinhas mestre]]
