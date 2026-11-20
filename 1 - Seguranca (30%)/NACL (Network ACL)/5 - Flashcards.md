---
servico: Network ACL (NACL)
fonte: "[[1 - Seguranca (30%)/NACL (Network ACL)/2 - Decorar|2 - Decorar]]"
---

# NACL — Flashcards

#flashcards/saa-c03/d1-seguranca/nacl

Em que nível a NACL opera?::**Subnet level**

NACL é stateful ou stateless?::**Stateless**: o tráfego de retorno precisa ser liberado

Que tipos de regra a NACL aceita?::**Allow e deny**

Como a NACL avalia as regras?::Em **ordem crescente**, para na **primeira que casa**

Faixa de numeração das regras da NACL?::**1 a 32766**

Qual é a regra final implícita da NACL?::`*` → **DENY** tudo (não pode ser removida)

Quantas NACLs uma subnet pode ter?::**1** (uma NACL pode ter várias subnets)

Como vem a NACL default da VPC?::**Liberada**: regra 100 ALLOW tudo na entrada e na saída

Como vem uma NACL nova criada por você?::**Negando tudo** (só a regra `*` DENY)

Faixa de portas efêmeras que cobre Linux, Windows, NLB e Lambda?::**1024-65535**

Faixa efêmera do Linux?::**32768-60999**

Para bloquear um IP com deny numa NACL que já tem allow amplo, o que fazer?::Dar ao **deny um número menor** que o do allow

NACL consegue bloquear o DNS da VPC (VPC+2)?::**Não**; use **Route 53 Resolver DNS Firewall**

NACL pode referenciar prefix lists?::**Não**

Quanto custa usar NACL?::**Sem cobrança adicional**
