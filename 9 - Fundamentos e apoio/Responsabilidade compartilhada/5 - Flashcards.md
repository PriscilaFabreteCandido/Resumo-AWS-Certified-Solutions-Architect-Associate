---
servico: Modelo de responsabilidade compartilhada
fonte: "[[9 - Fundamentos e apoio/Responsabilidade compartilhada/2 - Decorar|2 - Decorar]]"
---

# Responsabilidade compartilhada — Flashcards

#flashcards/saa-c03/fundamentos/responsabilidade-compartilhada

Segurança DA nuvem × segurança NA nuvem: de quem é cada uma?::**DA** nuvem: **AWS**. **NA** nuvem: **você**

Quem faz o patch do SO numa instância EC2?::**Você**

Quem faz o patch do hipervisor?::**AWS**

Quem faz o patch do engine do RDS?::**AWS**

No RDS/Aurora, o que continua sendo responsabilidade sua?::**Usuários do banco** e **schema**

No ECS sobre EC2, quem patcheia o SO das instâncias? E no Fargate?::ECS no EC2: **você**. Fargate: **AWS**

Quem configura security group e criptografia dos seus objetos no S3?::**Você**

Quem cuida do descarte seguro de disco e da segurança física do data center?::**AWS**

Regra geral sobre serviço gerenciado e responsabilidade?::**Mais gerenciado = menos responsabilidade sua**

Pergunta de "menor esforço operacional": qual alternativa escolher?::A que **empurra mais responsabilidade para a AWS**

Onde obter os relatórios de conformidade da AWS (SOC, PCI, ISO)?::**AWS Artifact**

Qual serviço avalia a conformidade dos seus recursos?::**AWS Config**

Qual serviço agrega sua postura de segurança?::**Security Hub**

Qual serviço coleta evidência para um framework de auditoria?::**AWS Audit Manager**
