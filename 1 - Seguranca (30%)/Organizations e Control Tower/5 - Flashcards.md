---
servico: AWS Organizations e AWS Control Tower
fonte: "[[1 - Seguranca (30%)/Organizations e Control Tower/2 - Decorar|2 - Decorar]]"
---

# Organizations e Control Tower — Flashcards

#flashcards/saa-c03/d1-seguranca/organizations-control-tower

SCP concede permissão?::**Não**; só define o teto

SCP afeta usuários e roles da management account?::**Não**; só as **contas-membro**

SCP afeta service-linked roles?::**Não**

SCP afeta o root das contas-membro?::**Sim**

SCP, permissions boundary e policy de identidade combinam como?::**Interseção**: todos precisam permitir

SCP × RCP: qual lado cada uma limita?::SCP: lado do **principal**. RCP: lado do **recurso**

Policy do Organizations para padronizar tags?::**Tag policy**

Policy do Organizations que nega uso dos seus dados para melhorar serviços de IA?::**AI services opt-out policy**

Quanto custa o AWS Organizations?::**Sem cobrança adicional**

Como é cobrado o Control Tower?::Sem taxa do serviço; você paga os **recursos provisionados** (Config, CloudTrail, S3)

Contas que a landing zone do Control Tower cria?::**Log Archive** e **Audit**

Recurso do Control Tower para provisionar contas novas no padrão?::**Account Factory**

Três tipos de controls do Control Tower e o que implementa cada um?::**Preventive** (SCP), **detective** (Config rule), **proactive** (CloudFormation hooks)

Nome antigo dos controls do Control Tower?::**Guardrails**

"Impedir" × "detectar e corrigir": qual serviço para cada?::Impedir → **SCP**; detectar/corrigir → **AWS Config**
