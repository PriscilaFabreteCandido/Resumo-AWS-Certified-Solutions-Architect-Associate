---
servico: AWS Directory Service
fonte: "[[1 - Seguranca (30%)/Directory Service/2 - Decorar|2 - Decorar]]"
---

# Directory Service — Flashcards

#flashcards/saa-c03/d1-seguranca/directory-service

Qual opção do Directory Service é um AD real (Windows Server AD)?::**AWS Managed Microsoft AD**

O que é o AD Connector?::Um **proxy** para o AD on-premises, sem cache na nuvem

Em que se baseia o Simple AD?::**Samba 4**

RDS for SQL Server com Windows Authentication exige qual opção?::Somente **AWS Managed Microsoft AD**

O que o Simple AD não suporta?::**Trust**, **MFA**, **LDAPS** e **schema extension**

Como o AD Connector suporta MFA?::Via **RADIUS**

Capacidade da edição Standard do Managed Microsoft AD?::Até **5.000** funcionários / **30.000** objetos

Capacidade da edição Enterprise do Managed Microsoft AD?::Até **500.000** objetos

Pré-requisitos de rede do AD Connector?::**VPN ou Direct Connect**; **2 subnets** em AZs diferentes

Portas exigidas pelo AD Connector?::**53** DNS, **88** Kerberos, **389** LDAP

Cadeia para SSO nas contas AWS usando o AD existente?::AD on-premises → **AD Connector** → **IAM Identity Center** → **permission sets**

Vários domínios/florestas ou login com o link caído: qual opção?::**Managed Microsoft AD**

O IAM Identity Center funciona com Simple AD?::**Não**

Com AD Connector, onde se faz reset de senha?::Só **dentro do AD** (não pelo portal da AWS)

Aplicação que precisa falar LDAP/Kerberos com um AD: qual serviço?::**Directory Service**
