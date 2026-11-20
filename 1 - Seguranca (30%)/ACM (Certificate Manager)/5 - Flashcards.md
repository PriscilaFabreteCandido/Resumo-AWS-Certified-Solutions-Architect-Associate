---
servico: AWS Certificate Manager (ACM)
fonte: "[[1 - Seguranca (30%)/ACM (Certificate Manager)/2 - Decorar|2 - Decorar]]"
---

# ACM — Flashcards

#flashcards/saa-c03/d1-seguranca/acm

Quanto custa um certificado público do ACM?::É **grátis**

Certificado do ACM pode ser copiado para outra região?::Não. Ele é **regional** e não se copia entre regiões

Em qual região o certificado precisa estar para usar no CloudFront?::**us-east-1** (N. Virginia)

Exceção da regra de região do CloudFront?::HTTPS entre CloudFront e a **origem ELB**: o certificado pode estar em **qualquer** região

Como associar um certificado do ACM diretamente a uma instância EC2?::Só com **Nitro Enclaves**; para servidor comum em EC2, a doc aponta o protocolo **ACME**

Certificado emitido pelo ACM com validação por DNS: como é a renovação?::**Automática** (gerenciada pelo ACM)

Certificado emitido pelo ACM validado por e-mail renova sozinho?::Não, **requer ação** sua

Quem renova um certificado importado no ACM?::**Você**: renova e **reimporta**

Para CloudFront, com quanta antecedência renovar ou reimportar o certificado?::Pelo menos **24 horas** antes do `NotAfter`

Requisitos para importar certificado no ACM?::Formato **X.509 PEM** e chave privada **sem senha**

Tamanho máximo de chave RSA que o ACM emite?::**2048 bits**

Quantos subdomínios um certificado wildcard do ACM protege?::**Ilimitados** (ex.: `*.exemplo.com`)

O que o CloudFront devolve se o certificado da origem for incompatível?::**502 Bad Gateway**

Para alternate domain name no CloudFront, o que o campo SAN precisa conter?::**Correspondência exata** do domínio ou um **wildcard no mesmo nível**
