---
tags: [saa-c03, security-group, detalhes]
servico: Security Groups
atualizado: 2026-11-08
---

# Security Groups — Detalhes

## 1. Stateful, e o que isso significa na prática

A doc: *"Security groups are stateful. For example, if you send a request from an instance, the response traffic for that request is allowed to reach the instance regardless of the inbound security group rules. Responses to allowed inbound traffic are allowed to leave the instance, regardless of the outbound rules."*

Consequência: **você nunca precisa pensar em portas efêmeras com SG**. Libere a porta do serviço na entrada, e a resposta volta sozinha. Essa é a diferença mais testada entre SG e NACL.

## 2. Referência SG-para-SG — o padrão que a prova premia

Em vez de liberar um CIDR, você libera **outro security group** como source. Exemplo: o SG do banco libera a porta 5432 com source = SG da aplicação.

Três vantagens:

1. **Acompanha o Auto Scaling.** Instância nova entra no SG da aplicação e é automaticamente autorizada — sem editar regra.
2. **É menor privilégio real.** Liberar o CIDR da subnet autoriza **qualquer** recurso que exista ou venha a existir ali.
3. **Documenta a intenção.** A regra diz "a camada de aplicação fala com o banco", não "a faixa 10.0.2.0/24 fala com o banco".

A doc reconhece isso como diferencial: *"Security groups are more versatile than network ACLs, due to their ability to perform stateful packet filtering and create rules that reference other security groups."*

> [!tip] Quando a questão oferece as duas opções
> "Liberar o CIDR da subnet da aplicação" **versus** "liberar o security group da aplicação" → a segunda é a resposta.

## 3. Como as regras são avaliadas

O SG *"Evaluates all rules before deciding whether to allow traffic"*. Não existe ordem nem numeração. Se **qualquer** regra permite, o tráfego passa.

Com vários SGs no mesmo recurso, a permissão é a **união** de todas as regras de todos os SGs.

E como não há deny, **não é possível criar exceção**: você não consegue dizer "libere 10.0.0.0/8 exceto 10.0.5.7". Para isso, NACL.

## 4. Quando usar NACL em vez de (ou além de) SG

A recomendação oficial é clara: *"Use security groups as the primary mechanism"*, e a NACL *"provide[s] stateless, coarse-grain network control"*.

Use NACL quando:
- Precisa **negar** um IP ou faixa específica
- Quer um controle de subnet que valha para **tudo** que subir ali, independentemente do SG
- Quer defesa em camadas por exigência de compliance

## 5. O que o SG não protege

A doc lista o tráfego que **não** passa pelo filtro do SG: Amazon DNS, DHCP, **instance metadata (IMDS)**, metadados de task do ECS, ativação de licença Windows, Amazon Time Sync Service e os endereços reservados do router da VPC.

Implicação de segurança: o **IMDS** (`169.254.169.254`) não pode ser bloqueado por SG nem NACL. Se a aplicação tem vulnerabilidade de SSRF, o atacante alcança as credenciais da role. A mitigação é **IMDSv2** (que exige um token obtido por PUT) e limitar o hop limit.

## 6. Escopo e limites

- SG é **regional** e pertence a **uma VPC**. Não dá para usar o mesmo SG em duas VPCs.
- Em **VPC peering**, você **pode** referenciar um SG da VPC pareada (mesma região, ou cross-region com restrições) — útil para manter o padrão SG-para-SG em arquiteturas multi-VPC.
- **Prefix lists** (gerenciadas pela AWS, como a do S3, ou suas próprias) podem ser usadas como source/destination, evitando listas longas de CIDR.
- **AWS Firewall Manager** aplica e audita SGs centralmente em várias contas da organização.

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[NACL (Network ACL)]] · [[VPC]] · [[Firewall Manager]] · [[WAF]]
- [Comparação oficial SG × NACL](https://docs.aws.amazon.com/vpc/latest/userguide/infrastructure-security.html)
