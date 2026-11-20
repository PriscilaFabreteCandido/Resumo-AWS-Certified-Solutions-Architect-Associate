---
servico: Security Groups
fonte: "[[1 - Seguranca (30%)/Security Groups/2 - Decorar|2 - Decorar]]"
---

# Security Groups — Flashcards

#flashcards/saa-c03/d1-seguranca/security-groups

Em que nível o security group opera?::**Instance level**

Security group é stateful ou stateless?::**Stateful**: retorno permitido automaticamente

Security group aceita regra de deny?::**Não**, só **allow**

Como o security group avalia as regras?::Avalia **todas** antes de decidir

Regra inbound do SG default da VPC?::Source = **o próprio SG**, todos os protocolos e portas

Regra outbound do SG default da VPC?::Tudo liberado para **0.0.0.0/0** (e todo o IPv6 se a VPC tiver)

O SG default pode ser deletado?::**Não** (erro `Client.CannotDelete`); pode ser modificado

Sources possíveis numa regra de SG?::**CIDR**, **prefix list** ou **outro security group**

Escopo do security group?::**Regional**; não atravessa VPC nem região

Um recurso pode ter vários SGs?::**Sim**; as regras **se somam**

Quanto custa usar security group?::**Sem cobrança adicional**

SG filtra tráfego para o IMDS ou para o DNS da VPC (VPC+2)?::**Não**

Boa prática para portas 22 e 3389?::Autorizar apenas **faixas de IP específicas**
