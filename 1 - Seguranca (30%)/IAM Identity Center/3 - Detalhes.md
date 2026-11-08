---
tags: [saa-c03, identity-center, detalhes]
servico: AWS IAM Identity Center
atualizado: 2026-11-08
---

# IAM Identity Center — Detalhes

## 1. O problema que resolve

Com IAM users por conta, três coisas dão errado em escala:

1. **Offboarding falha.** Alguém sai da empresa e sobra um IAM user em 3 das 15 contas.
2. **Credencial de longo prazo proliferam.** Cada user tende a ganhar uma access key, que vaza em repositório ou laptop.
3. **Auditoria é fragmentada.** "Quem tem acesso admin a produção?" exige varrer todas as contas.

Identity Center centraliza: a identidade vive **num lugar** (seu diretório), o acesso é concedido por **grupo**, e a credencial é **temporária**.

## 2. Fontes de identidade — qual escolher

| Situação | Identity source |
|---|---|
| Empresa já tem **Active Directory** on-premises | **AD Connector** ou **trust** com AWS Managed Microsoft AD |
| Empresa usa **Okta / Entra ID / Ping** | **IdP externo** via SAML 2.0 + SCIM |
| Empresa pequena, sem diretório | Diretório **do próprio Identity Center** |

**SCIM** importa: sem ele, usuários e grupos têm de ser criados à mão no Identity Center. Com SCIM, o IdP provisiona e desprovisiona automaticamente — é o que fecha o ciclo do offboarding.

## 3. Identity Center × federação SAML "clássica"

Antes do Identity Center, o padrão era: IdP → `AssumeRoleWithSAML` → role em **cada** conta. Isso continua funcionando, e ainda aparece como alternativa em prova.

| | **Identity Center** | **SAML direto para IAM** |
|---|---|---|
| Roles | Permission sets propagados automaticamente | Você cria role + trust policy em **cada** conta |
| Portal | Pronto, multi-conta | Você monta |
| Atribuição | Por grupo, numa interface central | Mapeamento de atributos SAML por conta |
| Esforço operacional | **Baixo** | Alto |

Em questão de "menor esforço operacional" com várias contas, **Identity Center** ganha.

## 4. Attribute-based access control (ABAC)

O Identity Center pode propagar atributos do diretório (departamento, projeto, centro de custo) como **tags de sessão**. As políticas então usam condições como `aws:PrincipalTag/Projeto` para liberar só os recursos com a tag correspondente.

Efeito: **um** permission set atende N times, em vez de um por time. É a resposta quando o enunciado fala de "modelo de autorização flexível" — que é literalmente a skill *"Designing a flexible authorization model"* da **Task 1.1**.

## 5. O que ele não é

| Enunciado | Serviço |
|---|---|
| Usuários finais de app mobile/web | **Cognito** |
| Aplicação chamando a AWS | **IAM role** |
| App que precisa falar **LDAP/Kerberos** com um AD | **Directory Service** |
| Guardrail de "nenhuma conta usa a região X" | **SCP** |

## Links

- [[1 - O que e]] · [[2 - Decorar]] · [[4 - Questoes]]
- [[IAM]] · [[STS]] · [[Directory Service]] · [[Organizations e Control Tower]] · [[Cognito]]
