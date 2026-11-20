---
servico: AWS Security Hub
fonte: "[[1 - Seguranca (30%)/Security Hub/2 - Decorar|2 - Decorar]]"
---

# Security Hub — Flashcards

#flashcards/saa-c03/d1-seguranca/security-hub

O que o Security Hub faz?::**Agrega** achados de segurança e mede a **postura** (CSPM)

Que sigla descreve o Security Hub no título da doc?::**CSPM** (Cloud Security Posture Management)

De quais serviços o Security Hub agrega achados?::**GuardDuty**, **Inspector**, **Macie** e produtos de parceiros

Formato único em que o Security Hub normaliza os achados?::**ASFF**

Como rodam os controles próprios do Security Hub?::Via **service-linked rules do AWS Config**

O que acontece com os controles do Security Hub sem o Config habilitado?::**Não avaliam nada** (Config é pré-requisito)

Quatro padrões que o Security Hub avalia?::**AWS Foundational Security Best Practices**, **CIS AWS Foundations**, **PCI DSS**, **NIST SP 800-53**

Como o Security Hub cobre várias contas?::Modelo **administrador/membro** via **Organizations**

"Painel único de segurança" e "aderência ao CIS/PCI": qual serviço?::**Security Hub**

Causa raiz de um incidente: Security Hub ou outro?::**Detective**

Software desatualizado e CVE: qual serviço?::**Inspector**
