---
tags: [moc, saa-c03, dominio-1, seguranca]
dominio: 1
peso: 30%
atualizado: 2026-11-08
---

# 🔐 Domínio 1 — Design Secure Architectures (30%)

> [!info] O maior peso da prova
> **30% do conteúdo pontuado** — cerca de **15 das 50 questões** que valem nota.
> Três task statements. O domínio é sobre **acesso** (quem pode o quê), **perímetro** (o que entra e sai) e **dados** (criptografia e retenção).

## 🧩 Em 30 segundos — a espinha dorsal do domínio

| Pergunta da prova | Resposta estrutural |
|---|---|
| Quem pode fazer o quê? | **IAM** (identidade) + **policy de recurso** + **SCP** (teto) + **permissions boundary** (interseção) |
| Como dar acesso entre contas? | **IAM role + STS AssumeRole**. Nunca credencial de longo prazo |
| Como dar acesso a pessoas? | **IAM Identity Center** (SSO), federado com o diretório corporativo |
| Como dar acesso a usuário final de app? | **Cognito** (user pool autentica, identity pool dá credencial AWS) |
| O que pode entrar na subnet? | **Security group** (stateful, instância) + **NACL** (stateless, subnet) |
| Como sair sem expor? | Subnet privada + **NAT gateway** (IPv4) ou **endpoint** (serviços AWS) |
| Como proteger a camada 7? | **WAF** (+ **Shield** para DDoS, + **Firewall Manager** para multi-conta) |
| Como criptografar em repouso? | **KMS** (envelope encryption) |
| Como criptografar em trânsito? | **TLS com certificado do ACM** |
| Como saber que algo está errado? | **GuardDuty** (ameaça) · **Inspector** (CVE) · **Macie** (PII) · **Security Hub** (postura) · **Detective** (investigação) |

---

## Task 1.1 — Design secure access to AWS resources

> [!quote] Knowledge of (guia oficial)
> - Access controls and management across multiple accounts
> - AWS federated access and identity services (for example, IAM, AWS IAM Identity Center)
> - AWS global infrastructure (for example, Availability Zones, AWS Regions)
> - AWS security best practices (for example, the principle of least privilege)
> - The AWS shared responsibility model

> [!quote] Skills in
> - Applying AWS security best practices to IAM users and root users (for example, MFA)
> - Designing a flexible authorization model that includes IAM users, groups, roles, and policies
> - Designing a role-based access control strategy (for example, AWS STS, role switching, cross-account access)
> - Designing a security strategy for multiple AWS accounts (for example, AWS Control Tower, service control policies [SCPs])
> - Determining the appropriate use of resource policies for AWS services
> - Determining when to federate a directory service with IAM roles


## Task 1.2 — Design secure workloads and applications

> [!quote] Knowledge of
> - Application configuration and credentials security
> - AWS service endpoints
> - Control ports, protocols, and network traffic on AWS
> - Secure application access
> - Security services with appropriate use cases (for example, Amazon Cognito, Amazon GuardDuty, Amazon Macie)
> - Threat vectors external to AWS (for example, DDoS, SQL injection)

> [!quote] Skills in
> - Designing VPC architectures with security components (for example, security groups, route tables, network ACLs, NAT gateways)
> - Determining network segmentation strategies (for example, using public subnets and private subnets)
> - Integrating AWS services to secure applications (for example, AWS Shield, AWS WAF, IAM Identity Center, AWS Secrets Manager)
> - Securing external network connections to and from the AWS Cloud (for example, VPN, AWS Direct Connect)


## Task 1.3 — Determine appropriate data security controls

> [!quote] Knowledge of
> - Data access and governance
> - Data recovery
> - Data retention and classification
> - Encryption and appropriate key management

> [!quote] Skills in
> - Aligning AWS technologies to meet compliance requirements
> - Encrypting data at rest (for example, AWS KMS)
> - Encrypting data in transit (for example, AWS Certificate Manager [ACM] using TLS)
> - Implementing access policies for encryption keys
> - Implementing data backups and replications
> - Implementing policies for data access, lifecycle, and protection
> - Rotating encryption keys and renewing certificates


---

## 🧠 Teste-se primeiro

> [!question]- Um usuário tem policy IAM que permite `s3:*`, mas a SCP da OU dele só permite EC2. Ele acessa o S3?
> **Não.** A permissão efetiva é a **interseção**: a SCP é um teto. *"the boundary, the SCP, and the identity-based policy must all allow the action"*.
> E o contrário também vale: SCP permitindo tudo + IAM sem nada = **nenhum acesso**. *"A user without any IAM permission policies has no access, even if the applicable SCPs allow all services and all actions."*

> [!question]- Qual é a ordem de avaliação de uma requisição no IAM?
> 1. **Deny explícito** em qualquer política → **nega e para**
> 2. **RCPs** (resource control policies) precisam ter um Allow
> 3. **SCPs** precisam ter um Allow
> 4. **Policy de recurso** — pode conceder sozinha **no mesmo account** (exceto trust policy de role e key policy do KMS)
> 5. **Policy de identidade**
> 6. **Permissions boundary**
> 7. **Session policy**
>
> Regra de abertura: *"By default, all requests are implicitly denied with the exception of the AWS account root user."*

> [!question]- Preciso dar acesso a um bucket da conta B para um role da conta A. O que configuro?
> **Os dois lados.** *"the requester in the trusted AccountA must have an identity-based policy... Additionally, the resource-based policy in AccountB must allow the requester."*
> A pegadinha é achar que a bucket policy sozinha resolve — isso só vale **dentro da mesma conta**.

> [!question]- Diferença de uma frase entre GuardDuty, Inspector e Macie?
> **GuardDuty** = ameaça/comportamento (CloudTrail + VPC Flow Logs + DNS logs).
> **Inspector** = vulnerabilidade de software (CVE) e exposição de rede em EC2, ECR e Lambda.
> **Macie** = dado sensível (PII) em buckets S3.

> [!question]- Preciso criptografar um arquivo de 50 MB com KMS. Como?
> **Envelope encryption.** `Encrypt` aceita no máximo **4.096 bytes**. Use `GenerateDataKey`: a KMS devolve a data key em texto claro (para criptografar o arquivo) **e** criptografada (para guardar junto). A KMS é a *wrapping key*, não a chave que toca o dado.

---

## ❓ Questões de prova

> [!example]- Q1 — Uma empresa tem 40 contas AWS numa organização. O compliance exige que **nenhuma** conta possa desabilitar o CloudTrail, nem mesmo o usuário root da conta. Qual solução?
> **A)** Policy IAM com `Deny` em `cloudtrail:StopLogging` anexada a todos os usuários
> **B)** **SCP com `Deny` em `cloudtrail:StopLogging` e `cloudtrail:DeleteTrail` aplicada à raiz da organização** ✅
> **C)** Permissions boundary em todos os roles
> **D)** AWS Config rule que reativa o CloudTrail
>
> **Por que B**: SCP é o único controle que alcança o **root de uma conta membro**. *"SCPs affect the root user of member accounts."*
> **A errada**: policy IAM não se aplica ao root. Além disso, você teria que acertar todos os principals, para sempre.
> **C errada**: permissions boundary se aplica a users e roles IAM, não ao root, e é limite de delegação, não guardrail organizacional.
> **D errada**: Config **detecta e remedia depois** — não **impede**. O enunciado pede prevenção.
>
> ⚠️ Lembre: a SCP **não** afeta a **conta de gerenciamento**. Boa prática é não rodar workload nela.

> [!example]- Q2 — Instâncias EC2 numa subnet privada precisam baixar objetos de um bucket S3 na mesma região. A empresa quer **o menor custo** e que o tráfego **não saia para a internet**. O que fazer?
> **A)** NAT gateway em cada AZ
> **B)** Interface endpoint (PrivateLink) para o S3
> **C)** **Gateway endpoint para o S3** ✅
> **D)** Internet gateway com rota restrita
>
> **Por que C**: gateway endpoint é a opção para S3/DynamoDB e *"There is no additional charge for using gateway endpoints."* O tráfego não passa por internet gateway nem NAT.
> **A errada**: funciona, mas NAT gateway cobra **por hora + por GB**. É a resposta errada mais atraente da prova.
> **B errada**: funciona, mas interface endpoint é **cobrado por hora e por GB**. Só se justifica quando o acesso vem de **on-premises** ou de outra VPC.
> **D errada**: coloca a subnet na internet, violando o requisito.

> [!example]- Q3 — Uma aplicação web atrás de um ALB sofre tentativas de SQL injection e picos de requisição de um único IP. O que resolve?
> **A)** Security group restringindo portas
> **B)** NACL negando o IP de origem
> **C)** **AWS WAF no ALB, com regra de SQL injection e rate-based rule** ✅
> **D)** Shield Advanced
>
> **Por que C**: WAF inspeciona **HTTP/HTTPS** e tem critério de SQL injection e XSS, além de **rate-based rules** que *"block or count web requests that... exceed a specified number of requests in a minute or in five minutes"*.
> **A errada**: SG trabalha em porta/protocolo/IP, não no conteúdo da requisição.
> **B errada**: NACL bloqueia um IP, mas não detecta SQL injection — e o atacante troca de IP.
> **D errada**: Shield é **DDoS** (camada 3/4 e volumétrico na 7), não filtro de payload. O Shield Advanced até inclui WAF, mas a resposta mínima para o problema descrito é o WAF.

> [!example]- Q4 — Credenciais de banco estão hardcoded na aplicação. A empresa quer rotação automática a cada 30 dias, **sem alterar código** além da chamada de recuperação. Qual serviço?
> **A)** Parameter Store, tier Standard
> **B)** **AWS Secrets Manager** ✅
> **C)** KMS com chave customer managed
> **D)** IAM database authentication
>
> **Por que B**: a própria doc do Parameter Store diz, na comparação: credential rotation em Parameter Store = **"None"**; em Secrets Manager = **"Automatic, with native database integrations"**.
> **A errada**: Parameter Store (inclusive SecureString) **não rotaciona**. É grátis no tier Standard — o distrator é "menor custo".
> **C errada**: KMS guarda **chave de criptografia**, não secret de aplicação.
> **D errada**: boa prática, mas muda a forma de autenticar (token IAM) e não é "rotação de secret".
>
> ⚠️ Se o enunciado **não** pedir rotação e pedir **menor custo**, a resposta vira **Parameter Store**.

---

## ⚠️ Armadilhas do domínio 1

| Parece | É |
|---|---|
| SCP concede permissão | É **teto**. *"No permissions are granted by an SCP."* |
| SCP alcança a conta de gerenciamento | **Não alcança.** Só contas membro |
| SCP limita service-linked role | *"SCPs do not affect any service-linked role."* |
| Bucket policy resolve cross-account sozinha | Só **dentro da mesma conta**. Cross-account exige os dois lados |
| Permissions boundary dá permissão | É **interseção**, nunca concessão |
| MFA é só para usuários | A boa prática oficial inclui o **root user**. Guarde o root com MFA e não use |
| KMS criptografa arquivos grandes | **4.096 bytes.** Acima disso, envelope encryption |
| Rotação de chave recriptografa os dados | Não. A KMS guarda as versões antigas e usa a correta no decrypt |
| ACM funciona em qualquer região para CloudFront | **us-east-1**, sempre |
| Shield Standard precisa ser habilitado | Vem *"automatically and at no extra charge"* |
| Security Hub detecta ameaças | **Agrega** achados e avalia postura. Detecção é GuardDuty/Inspector/Macie |
| Cognito user pool dá acesso ao S3 | User pool **autentica**; identity pool entrega **credencial AWS temporária** |

---

## 🗂 Serviços e conceitos deste domínio

Cada pasta tem **quatro notas**: `1 - O que e` · `2 - Decorar` · `3 - Detalhes` · `4 - Questoes`.

- [[1 - Seguranca (30%)/ACM (Certificate Manager)/1 - O que e|ACM (Certificate Manager)]]
- [[1 - Seguranca (30%)/AWS Backup/1 - O que e|AWS Backup]]
- [[1 - Seguranca (30%)/AWS RAM/1 - O que e|AWS RAM]]
- [[1 - Seguranca (30%)/CloudHSM/1 - O que e|CloudHSM]]
- [[1 - Seguranca (30%)/CloudTrail/1 - O que e|CloudTrail]]
- [[1 - Seguranca (30%)/Cognito/1 - O que e|Cognito]]
- [[1 - Seguranca (30%)/Config/1 - O que e|Config]]
- [[1 - Seguranca (30%)/Detective/1 - O que e|Detective]]
- [[1 - Seguranca (30%)/Directory Service/1 - O que e|Directory Service]]
- [[1 - Seguranca (30%)/Firewall Manager/1 - O que e|Firewall Manager]]
- [[1 - Seguranca (30%)/Governanca (Artifact, Trusted Advisor, Service Catalog)/1 - O que e|Governanca (Artifact, Trusted Advisor, Service Catalog)]]
- [[1 - Seguranca (30%)/GuardDuty/1 - O que e|GuardDuty]]
- [[1 - Seguranca (30%)/IAM/1 - O que e|IAM]]
- [[1 - Seguranca (30%)/IAM Identity Center/1 - O que e|IAM Identity Center]]
- [[1 - Seguranca (30%)/Inspector/1 - O que e|Inspector]]
- [[1 - Seguranca (30%)/KMS/1 - O que e|KMS]]
- [[1 - Seguranca (30%)/Macie/1 - O que e|Macie]]
- [[1 - Seguranca (30%)/NACL (Network ACL)/1 - O que e|NACL (Network ACL)]]
- [[1 - Seguranca (30%)/NAT Gateway/1 - O que e|NAT Gateway]]
- [[1 - Seguranca (30%)/Organizations e Control Tower/1 - O que e|Organizations e Control Tower]]
- [[1 - Seguranca (30%)/STS/1 - O que e|STS]]
- [[1 - Seguranca (30%)/Secrets Manager/1 - O que e|Secrets Manager]]
- [[1 - Seguranca (30%)/Security Groups/1 - O que e|Security Groups]]
- [[1 - Seguranca (30%)/Security Hub/1 - O que e|Security Hub]]
- [[1 - Seguranca (30%)/Shield/1 - O que e|Shield]]
- [[1 - Seguranca (30%)/Systems Manager (e Parameter Store)/1 - O que e|Systems Manager (e Parameter Store)]]
- [[1 - Seguranca (30%)/VPC/1 - O que e|VPC]]
- [[1 - Seguranca (30%)/VPC Endpoints e PrivateLink/1 - O que e|VPC Endpoints e PrivateLink]]
- [[1 - Seguranca (30%)/WAF/1 - O que e|WAF]]

## Links

- [[00 - START HERE (indice da prova)]]
- [[03 - Pegadinhas mestre]]
- [Domínio 1 no guia oficial](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03-domain1.html)
