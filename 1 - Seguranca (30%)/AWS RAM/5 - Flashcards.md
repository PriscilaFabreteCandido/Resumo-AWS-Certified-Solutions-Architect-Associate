---
servico: AWS Resource Access Manager (RAM)
fonte: "[[1 - Seguranca (30%)/AWS RAM/2 - Decorar|2 - Decorar]]"
---

# AWS RAM — Flashcards

#flashcards/saa-c03/d1-seguranca/aws-ram

Caso de uso nº 1 do RAM na prova?::**VPC sharing**: compartilhar **subnets** da VPC entre contas

Por que compartilhar um Transit Gateway via RAM?::Uma **conta de rede** gerencia o hub e as outras contas anexam suas VPCs

Recurso do Route 53 compartilhado via RAM para DNS híbrido centralizado?::**Route 53 Resolver rules**

Compartilhar com contas da mesma organização exige convite?::Não, é direto, mas o **sharing with AWS Organizations** precisa estar ativado

Compartilhar com contas de fora da organização exige o quê?::**Convite** e aceite

Quanto custa o RAM?::**Sem cobrança adicional**

Região home do RAM para recursos globais?::**us-east-1**

Granularidades de compartilhamento do RAM?::Organização inteira, **OUs**, contas, ou **roles/users** IAM

Várias contas usando a mesma VPC: qual serviço?::**RAM** (VPC sharing)

Várias VPCs separadas se comunicando: qual serviço?::**Transit Gateway** ou **VPC peering**

Expor um único serviço entre contas: qual serviço?::**PrivateLink**

Compartilhar permissão (não recurso) entre contas?::**IAM role cross-account**

Para que compartilhar prefix lists gerenciadas via RAM?::**Padronizar CIDRs** em security groups e route tables
